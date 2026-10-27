import { closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync, writeSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { basename, join, resolve } from "node:path";
import { sha256, stableStringify } from "./belief_state.mjs";

const PROTOCOL = "spin23-context-hub-contribution-event/1";
const idPattern = /^contrib_[0-9a-f]{16}$/u;
const eventTypes = new Set(["contribution.proposed", "contribution.accepted", "contribution.rejected"]);

function payloadForHash(event) {
  const { eventSha256, ...payload } = event;
  return payload;
}
function validateId(contributionId) {
  if (typeof contributionId !== "string" || !idPattern.test(contributionId)) throw new Error("contributionId is invalid");
  return contributionId;
}
function appendDurably(path, line) {
  const descriptor = openSync(path, "a");
  try { writeSync(descriptor, line); fsyncSync(descriptor); }
  finally { closeSync(descriptor); }
}
function view(record) {
  const disposition = record.events.at(-1).type === "contribution.proposed" ? "pending" : record.events.at(-1).type.replace("contribution.", "");
  return {
    protocol: "spin23-context-hub-contribution/1",
    contributionId: record.contributionId,
    revision: record.revision,
    headSha256: record.headSha256,
    disposition,
    proposed: record.events[0].payload,
    decision: record.events.length > 1 ? record.events.at(-1).payload : null,
    timeline: record.events.map(event => ({ revision: event.revision, type: event.type, recordedAt: event.recordedAt, eventSha256: event.eventSha256, previousEventSha256: event.previousEventSha256 })),
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
    if (lines.length < 1 || lines.length > 2) throw new Error("contribution must contain one proposal and at most one disposition");
    let previous = null;
    const events = lines.map((line, index) => {
      let event;
      try { event = JSON.parse(line); } catch { throw new Error(`contribution event ${index + 1} is not valid JSON`); }
      if (event.protocol !== PROTOCOL || event.contributionId !== contributionId || event.revision !== index + 1 || !eventTypes.has(event.type)) throw new Error(`contribution event ${index + 1} has invalid identity`);
      if ((index === 0) !== (event.type === "contribution.proposed") || event.previousEventSha256 !== previous || sha256(payloadForHash(event)) !== event.eventSha256) throw new Error(`contribution event ${index + 1} fails integrity verification`);
      previous = event.eventSha256;
      return event;
    });
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

  function decide(contributionId, { decision, reason = null } = {}) {
    if (decision !== "accept" && decision !== "reject") throw new Error("decision must be accept or reject");
    if (reason !== null && (typeof reason !== "string" || reason.length > 2000)) throw new Error("decision reason is invalid");
    const lockPath = `${pathFor(contributionId)}.lock`;
    let lock;
    try { lock = openSync(lockPath, "wx"); } catch { throw new Error("contribution is locked by another writer"); }
    try {
      const current = load(contributionId);
      if (current.revision !== 1) throw new Error("contribution already has a disposition");
      const event = { protocol: PROTOCOL, contributionId, revision: 2, type: decision === "accept" ? "contribution.accepted" : "contribution.rejected", recordedAt: now(), previousEventSha256: current.headSha256, payload: { decision, reason, admissionEffect: false } };
      const sealed = { ...event, eventSha256: sha256(event) };
      appendDurably(current.path, `${stableStringify(sealed)}\n`);
      return view(load(contributionId));
    } finally {
      if (lock !== undefined) closeSync(lock);
      if (existsSync(lockPath)) unlinkSync(lockPath);
    }
  }

  function list() {
    if (!existsSync(storeRoot)) return [];
    return readdirSync(storeRoot, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith(".jsonl") && idPattern.test(basename(entry.name, ".jsonl")))
      .map(entry => view(load(basename(entry.name, ".jsonl"))))
      .sort((left, right) => right.timeline[0].recordedAt.localeCompare(left.timeline[0].recordedAt));
  }

  return Object.freeze({ root: storeRoot, submit, decide, get: contributionId => view(load(contributionId)), list });
}
