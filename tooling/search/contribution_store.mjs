import { closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync, writeSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { basename, join, resolve } from "node:path";
import { sha256, stableStringify } from "./belief_state.mjs";

const PROTOCOL = "spin23-context-hub-contribution-event/1";
const idPattern = /^contrib_[0-9a-f]{16}$/u;
const eventTypes = new Set(["contribution.proposed", "contribution.claimed", "contribution.released", "contribution.accepted", "contribution.rejected", "contribution.impact-recorded"]);
const impactKinds = new Set(["documentation", "test", "episode-proposal", "linked-work", "no-change"]);

function payloadForHash(event) {
  const { eventSha256, ...payload } = event;
  return payload;
}
function validateId(contributionId) {
  if (typeof contributionId !== "string" || !idPattern.test(contributionId)) throw new Error("contributionId is invalid");
  return contributionId;
}
function text(value, name, maximum, required = true) {
  const normalized = typeof value === "string" ? value.trim() : "";
  if ((required && !normalized) || normalized.length > maximum) throw new Error(`${name} is invalid`);
  return normalized || null;
}
function appendDurably(path, line) {
  const descriptor = openSync(path, "a");
  try { writeSync(descriptor, line); fsyncSync(descriptor); }
  finally { closeSync(descriptor); }
}
function reduce(events) {
  let disposition = "pending";
  let claim = null;
  let decision = null;
  const impacts = [];
  for (const event of events.slice(1)) {
    if (event.type === "contribution.claimed") {
      if (disposition !== "pending" || claim) throw new Error("contribution cannot be claimed in its current state");
      claim = { ...event.payload, claimedAt: event.recordedAt, revision: event.revision };
    } else if (event.type === "contribution.released") {
      if (disposition !== "pending" || !claim || event.payload.actor !== claim.actor) throw new Error("contribution release does not match the active claim");
      claim = null;
    } else if (event.type === "contribution.accepted" || event.type === "contribution.rejected") {
      if (disposition !== "pending") throw new Error("contribution already has a disposition");
      disposition = event.type.replace("contribution.", "");
      decision = { ...event.payload, recordedAt: event.recordedAt, revision: event.revision };
      claim = null;
    } else if (event.type === "contribution.impact-recorded") {
      if (disposition === "pending") throw new Error("downstream impact requires a recorded disposition");
      impacts.push({ ...event.payload, recordedAt: event.recordedAt, revision: event.revision, eventSha256: event.eventSha256 });
    }
  }
  return { disposition, claim, decision, impacts };
}
function view(record) {
  const state = reduce(record.events);
  const proposed = record.events[0].payload;
  return {
    protocol: "spin23-context-hub-contribution/2",
    contributionId: record.contributionId,
    revision: record.revision,
    headSha256: record.headSha256,
    ...state,
    proposed,
    dependencies: proposed.dependsOn ?? [],
    attribution: {
      proposedBy: proposed.contributor,
      claimedBy: state.claim?.actor ?? null,
      decidedBy: state.decision?.actor ?? null,
      impactActors: [...new Set(state.impacts.map(item => item.actor))],
    },
    timeline: record.events.map(event => ({ revision: event.revision, type: event.type, recordedAt: event.recordedAt, actor: event.payload.actor ?? null, eventSha256: event.eventSha256, previousEventSha256: event.previousEventSha256 })),
    authority: { proposalOnly: true, changesTruthStatus: false, corpusPromotion: false, modelWeightTraining: false, admissionEffect: false },
  };
}

export function createContributionStore({ root = resolve(process.cwd(), ".context-hub", "contributions"), now = () => new Date().toISOString(), idFactory = () => `contrib_${randomBytes(8).toString("hex")}` } = {}) {
  const storeRoot = resolve(root);
  const pathFor = contributionId => join(storeRoot, `${validateId(contributionId)}.jsonl`);

  function load(contributionId) {
    const path = pathFor(contributionId);
    if (!existsSync(path)) throw new Error(`contribution ${contributionId} does not exist`);
    if (statSync(path).size > 2 * 1024 * 1024) throw new Error("contribution exceeds the 2 MiB safety bound");
    const lines = readFileSync(path, "utf8").split(/\r?\n/u).filter(Boolean);
    if (lines.length < 1 || lines.length > 100) throw new Error("contribution event count is outside the safety bound");
    let previous = null;
    const events = lines.map((line, index) => {
      let event;
      try { event = JSON.parse(line); } catch { throw new Error(`contribution event ${index + 1} is not valid JSON`); }
      if (event.protocol !== PROTOCOL || event.contributionId !== contributionId || event.revision !== index + 1 || !eventTypes.has(event.type)) throw new Error(`contribution event ${index + 1} has invalid identity`);
      if ((index === 0) !== (event.type === "contribution.proposed") || event.previousEventSha256 !== previous || sha256(payloadForHash(event)) !== event.eventSha256) throw new Error(`contribution event ${index + 1} fails integrity verification`);
      previous = event.eventSha256;
      return event;
    });
    reduce(events);
    return { contributionId, path, revision: events.length, headSha256: previous, events };
  }

  function submit(payload, { contributionId = idFactory(), recordedAt = now() } = {}) {
    validateId(contributionId);
    mkdirSync(storeRoot, { recursive: true });
    const event = { protocol: PROTOCOL, contributionId, revision: 1, type: "contribution.proposed", recordedAt, previousEventSha256: null, payload };
    const sealed = { ...event, eventSha256: sha256(event) };
    writeFileSync(pathFor(contributionId), `${stableStringify(sealed)}\n`, { encoding: "utf8", flag: "wx" });
    return view(load(contributionId));
  }

  function append(contributionId, type, payload, guard) {
    const lockPath = `${pathFor(contributionId)}.lock`;
    let lock;
    try { lock = openSync(lockPath, "wx"); } catch { throw new Error("contribution is locked by another writer"); }
    try {
      const current = load(contributionId);
      guard(reduce(current.events));
      const event = { protocol: PROTOCOL, contributionId, revision: current.revision + 1, type, recordedAt: now(), previousEventSha256: current.headSha256, payload };
      const sealed = { ...event, eventSha256: sha256(event) };
      appendDurably(current.path, `${stableStringify(sealed)}\n`);
      return view(load(contributionId));
    } finally {
      if (lock !== undefined) closeSync(lock);
      if (existsSync(lockPath)) unlinkSync(lockPath);
    }
  }

  function claim(contributionId, { actor, note = null } = {}) {
    const payload = { actor: text(actor, "claim actor", 200), note: text(note, "claim note", 2000, false) };
    return append(contributionId, "contribution.claimed", payload, state => {
      if (state.disposition !== "pending") throw new Error("contribution already has a disposition");
      if (state.claim) throw new Error(`contribution is already claimed by ${state.claim.actor}`);
    });
  }

  function release(contributionId, { actor, reason = null } = {}) {
    const payload = { actor: text(actor, "release actor", 200), reason: text(reason, "release reason", 2000, false) };
    return append(contributionId, "contribution.released", payload, state => {
      if (!state.claim || state.claim.actor !== payload.actor) throw new Error("only the active claimant can release this contribution");
    });
  }

  function decide(contributionId, { decision, reason = null, actor = null } = {}) {
    if (decision !== "accept" && decision !== "reject") throw new Error("decision must be accept or reject");
    const payload = { decision, reason: text(reason, "decision reason", 2000, false), actor: text(actor, "decision actor", 200, false), admissionEffect: false };
    return append(contributionId, decision === "accept" ? "contribution.accepted" : "contribution.rejected", payload, state => {
      if (state.disposition !== "pending") throw new Error("contribution already has a disposition");
    });
  }

  function recordImpact(contributionId, { kind, actor, target, note = null, receiptSha256 = null } = {}) {
    if (!impactKinds.has(kind)) throw new Error("impact kind is invalid");
    if (receiptSha256 !== null && (typeof receiptSha256 !== "string" || !/^[0-9a-f]{64}$/u.test(receiptSha256))) throw new Error("impact receiptSha256 is invalid");
    const payload = { kind, actor: text(actor, "impact actor", 200), target: text(target, "impact target", 1000), note: text(note, "impact note", 2000, false), receiptSha256, admissionEffect: false };
    return append(contributionId, "contribution.impact-recorded", payload, state => {
      if (state.disposition === "pending") throw new Error("downstream impact requires a recorded disposition");
    });
  }

  function list() {
    if (!existsSync(storeRoot)) return [];
    return readdirSync(storeRoot, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith(".jsonl") && idPattern.test(basename(entry.name, ".jsonl")))
      .map(entry => view(load(basename(entry.name, ".jsonl"))))
      .sort((left, right) => right.timeline[0].recordedAt.localeCompare(left.timeline[0].recordedAt));
  }

  return Object.freeze({ root: storeRoot, submit, claim, release, decide, recordImpact, get: contributionId => view(load(contributionId)), list });
}
