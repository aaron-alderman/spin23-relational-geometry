import { closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync, writeSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { basename, join, resolve } from "node:path";
import { sha256, stableStringify } from "./belief_state.mjs";

const EVENT_PROTOCOL = "spin23-context-hub-event/1";
const episodePattern = /^ep_[0-9a-f]{16}$/u;
const eventTypes = new Set([
  "episode.created",
  "episode.controls-changed",
  "episode.frozen",
  "episode.unfrozen",
  "turn.planned",
  "answer.recorded",
  "update.proposed",
  "update.approved",
  "update.rejected",
  "update.rolled-back",
  "replay.completed",
]);

function eventPayload(event) {
  const { eventSha256, ...payload } = event;
  return payload;
}
function validateEpisodeId(episodeId) {
  if (typeof episodeId !== "string" || !episodePattern.test(episodeId)) throw new Error("episodeId is invalid");
  return episodeId;
}
function validateEvent(event, expectedEpisodeId, expectedRevision, expectedPrevious) {
  if (!event || Array.isArray(event) || typeof event !== "object") throw new Error("episode event must be an object");
  if (event.protocol !== EVENT_PROTOCOL || event.episodeId !== expectedEpisodeId || event.revision !== expectedRevision) throw new Error(`episode event ${expectedRevision} has invalid identity or revision`);
  if (!eventTypes.has(event.type)) throw new Error(`episode event ${expectedRevision} has an invalid type`);
  if (event.previousEventSha256 !== expectedPrevious) throw new Error(`episode event ${expectedRevision} breaks the hash chain`);
  if (!/^[0-9a-f]{64}$/u.test(event.eventSha256 ?? "") || sha256(eventPayload(event)) !== event.eventSha256) throw new Error(`episode event ${expectedRevision} fails integrity verification`);
  if (typeof event.recordedAt !== "string" || Number.isNaN(Date.parse(event.recordedAt))) throw new Error(`episode event ${expectedRevision} has an invalid timestamp`);
  if (!event.payload || Array.isArray(event.payload) || typeof event.payload !== "object") throw new Error(`episode event ${expectedRevision} has an invalid payload`);
  return event;
}
function appendDurably(path, line) {
  const descriptor = openSync(path, "a");
  try {
    writeSync(descriptor, line);
    fsyncSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}
export function createEpisodeStore({ root = resolve(process.cwd(), ".context-hub", "episodes"), now = () => new Date().toISOString(), idFactory = () => `ep_${randomBytes(8).toString("hex")}` } = {}) {
  const storeRoot = resolve(root);
  const pathFor = episodeId => join(storeRoot, `${validateEpisodeId(episodeId)}.jsonl`);

  function load(episodeId) {
    const path = pathFor(episodeId);
    if (!existsSync(path)) throw new Error(`episode ${episodeId} does not exist`);
    if (statSync(path).size > 50 * 1024 * 1024) throw new Error("episode exceeds the 50 MiB local safety bound");
    const lines = readFileSync(path, "utf8").split(/\r?\n/u).filter(Boolean);
    if (!lines.length || lines.length > 10000) throw new Error("episode must contain 1 to 10000 events");
    const events = [];
    let previous = null;
    for (let index = 0; index < lines.length; index += 1) {
      let event;
      try { event = JSON.parse(lines[index]); }
      catch { throw new Error(`episode event ${index + 1} is not valid JSON`); }
      validateEvent(event, episodeId, index + 1, previous);
      previous = event.eventSha256;
      events.push(event);
    }
    return { episodeId, path, revision: events.length, headSha256: previous, events };
  }

  function create(payload, { episodeId = idFactory(), recordedAt = now() } = {}) {
    validateEpisodeId(episodeId);
    mkdirSync(storeRoot, { recursive: true });
    const event = {
      protocol: EVENT_PROTOCOL,
      episodeId,
      revision: 1,
      type: "episode.created",
      recordedAt,
      previousEventSha256: null,
      payload,
    };
    const sealed = { ...event, eventSha256: sha256(event) };
    writeFileSync(pathFor(episodeId), `${stableStringify(sealed)}\n`, { encoding: "utf8", flag: "wx" });
    return load(episodeId);
  }

  function append(episodeId, type, payload, { expectedRevision, recordedAt = now() } = {}) {
    if (!eventTypes.has(type) || type === "episode.created") throw new Error("append event type is invalid");
    mkdirSync(storeRoot, { recursive: true });
    const lockPath = `${pathFor(episodeId)}.lock`;
    let lock;
    try {
      lock = openSync(lockPath, "wx");
    } catch {
      throw new Error("episode is locked by another writer");
    }
    try {
      writeSync(lock, `${process.pid}\n${recordedAt}\n`);
      const current = load(episodeId);
      if (!Number.isInteger(expectedRevision) || expectedRevision !== current.revision) throw new Error(`episode revision conflict: expected ${expectedRevision}, current ${current.revision}`);
      const event = {
        protocol: EVENT_PROTOCOL,
        episodeId,
        revision: current.revision + 1,
        type,
        recordedAt,
        previousEventSha256: current.headSha256,
        payload,
      };
      const sealed = { ...event, eventSha256: sha256(event) };
      appendDurably(current.path, `${stableStringify(sealed)}\n`);
      return load(episodeId);
    } finally {
      if (lock !== undefined) closeSync(lock);
      if (existsSync(lockPath)) unlinkSync(lockPath);
    }
  }

  function list() {
    if (!existsSync(storeRoot)) return [];
    return readdirSync(storeRoot, { withFileTypes: true })
      .filter(entry => entry.isFile() && episodePattern.test(basename(entry.name, ".jsonl")) && entry.name.endsWith(".jsonl"))
      .map(entry => load(basename(entry.name, ".jsonl")))
      .sort((left, right) => right.events.at(-1).recordedAt.localeCompare(left.events.at(-1).recordedAt));
  }

  return Object.freeze({ root: storeRoot, create, append, load, list });
}
