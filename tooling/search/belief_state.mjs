import { createHash } from "node:crypto";

const STATE_PROTOCOL = "spin23-corpus-belief-state/1";
const UPDATE_PROTOCOL = "spin23-corpus-belief-update/1";
const profiles = new Set(["all", "interpret", "choose-work", "audit", "experiment"]);
const shaPattern = /^[0-9a-f]{64}$/u;
const sourcePathPattern = /^(?:corpus|book\/edition-3\/chapters|verification)\/.+\.md$/u;

export const observationPolicy = Object.freeze({
  retrieved: Object.freeze({ value: 0.55, noiseVariance: 0.35, shockVariance: 0 }),
  "sweep-invariant": Object.freeze({ value: 0.75, noiseVariance: 0.18, shockVariance: 0 }),
  "answer-cited": Object.freeze({ value: 0.6, noiseVariance: 0.3, shockVariance: 0 }),
  "answer-stable": Object.freeze({ value: 0.8, noiseVariance: 0.15, shockVariance: 0 }),
  "answer-conflict": Object.freeze({ value: 0.2, noiseVariance: 0.12, shockVariance: 0.08 }),
  "verification-pass": Object.freeze({ value: 0.95, noiseVariance: 0.05, shockVariance: 0 }),
  "verification-fail": Object.freeze({ value: 0.05, noiseVariance: 0.05, shockVariance: 0.1 }),
  "user-rating": Object.freeze({ value: null, noiseVariance: 0.2, shockVariance: 0 }),
  "source-changed": Object.freeze({ value: 0.5, noiseVariance: 0.5, shockVariance: 0.25 }),
});

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
  return value;
}

export const stableStringify = value => JSON.stringify(stableValue(value));
export const sha256 = value => createHash("sha256").update(typeof value === "string" ? value : stableStringify(value)).digest("hex");
const round = value => Number(value.toFixed(12));
const bounded = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

function exactObject(value, name) {
  if (!value || Array.isArray(value) || typeof value !== "object") throw new Error(`${name} must be an object`);
  return value;
}

function rejectUnknown(value, allowed, name) {
  const unknown = Object.keys(value).filter(key => !allowed.has(key));
  if (unknown.length) throw new Error(`${name} contains unknown fields: ${unknown.join(", ")}`);
}

function statePayload(state) {
  const { stateSha256, ...payload } = state;
  return payload;
}

export function verifyBeliefState(state) {
  exactObject(state, "beliefState");
  rejectUnknown(state, new Set(["protocol", "episode", "policy", "sources", "innovations", "evidenceLedger", "sequence", "historySha256", "authority", "stateSha256"]), "beliefState");
  if (state.protocol !== STATE_PROTOCOL) throw new Error("beliefState protocol is invalid");
  if (!shaPattern.test(state.stateSha256 ?? "") || sha256(statePayload(state)) !== state.stateSha256) throw new Error("beliefState integrity check failed");
  exactObject(state.episode, "beliefState.episode");
  rejectUnknown(state.episode, new Set(["objective", "profile", "corpusContentSha256"]), "beliefState.episode");
  if (!shaPattern.test(state.episode?.corpusContentSha256 ?? "")) throw new Error("beliefState corpus identity is invalid");
  if (typeof state.episode?.objective !== "string" || state.episode.objective.length < 2 || state.episode.objective.length > 500) throw new Error("beliefState objective is invalid");
  if (!profiles.has(state.episode?.profile)) throw new Error("beliefState profile is invalid");
  exactObject(state.policy, "beliefState.policy");
  rejectUnknown(state.policy, new Set(["estimator", "prior", "processVariance", "observationPolicySha256"]), "beliefState.policy");
  if (state.policy.estimator !== "bounded scalar Kalman-like source-utility update") throw new Error("beliefState estimator is invalid");
  if (state.policy.observationPolicySha256 !== sha256(observationPolicy)) throw new Error("beliefState observation policy is invalid");
  if (!Number.isFinite(state.policy.processVariance) || state.policy.processVariance < 0.0001 || state.policy.processVariance > 0.1) throw new Error("beliefState process variance is invalid");
  exactObject(state.policy.prior, "beliefState.policy.prior");
  if (state.policy.prior.utilityMean !== 0.5 || state.policy.prior.utilityVariance !== 0.25) throw new Error("beliefState prior is invalid");
  if (!Number.isInteger(state.sequence) || state.sequence < 0) throw new Error("beliefState sequence is invalid");
  if (!shaPattern.test(state.historySha256 ?? "")) throw new Error("beliefState history identity is invalid");
  exactObject(state.sources, "beliefState.sources");
  for (const [path, estimate] of Object.entries(state.sources)) {
    if (!sourcePathPattern.test(path) || path.includes("..") || path.includes("\\")) throw new Error(`beliefState source path is invalid: ${path}`);
    if (!Number.isFinite(estimate.utilityMean) || estimate.utilityMean < 0 || estimate.utilityMean > 1) throw new Error(`beliefState source mean is invalid: ${path}`);
    if (!Number.isFinite(estimate.utilityVariance) || estimate.utilityVariance <= 0 || estimate.utilityVariance > 0.5) throw new Error(`beliefState source variance is invalid: ${path}`);
    if (!Number.isInteger(estimate.observations) || estimate.observations < 0) throw new Error(`beliefState source observation count is invalid: ${path}`);
    if (estimate.lastObservationType !== null && !Object.hasOwn(observationPolicy, estimate.lastObservationType)) throw new Error(`beliefState source observation type is invalid: ${path}`);
  }
  if (!Array.isArray(state.innovations) || state.innovations.length > 32) throw new Error("beliefState innovations are invalid");
  if (!Array.isArray(state.evidenceLedger) || state.evidenceLedger.length > 4096 || state.evidenceLedger.some(identity => !shaPattern.test(identity)) || new Set(state.evidenceLedger).size !== state.evidenceLedger.length) throw new Error("beliefState evidence ledger is invalid");
  exactObject(state.authority, "beliefState.authority");
  if (state.authority.externalTelosRequired !== true || state.authority.changesTruthStatus !== false || state.authority.corpusPromotion !== false || state.authority.modelWeightTraining !== false) throw new Error("beliefState authority boundary is invalid");
  return state;
}

export function initializeBeliefState({ objective, profile = "all", corpusContentSha256, processVariance = 0.01 } = {}) {
  if (typeof objective !== "string" || objective.trim().length < 2 || objective.length > 500) throw new Error("objective must contain 2 to 500 characters");
  if (!profiles.has(profile)) throw new Error("profile is invalid");
  if (!shaPattern.test(corpusContentSha256 ?? "")) throw new Error("corpusContentSha256 must be a SHA-256 identity");
  if (!Number.isFinite(processVariance) || processVariance < 0.0001 || processVariance > 0.1) throw new Error("processVariance must be from 0.0001 to 0.1");
  const payload = {
    protocol: STATE_PROTOCOL,
    episode: { objective: objective.trim(), profile, corpusContentSha256 },
    policy: {
      estimator: "bounded scalar Kalman-like source-utility update",
      prior: { utilityMean: 0.5, utilityVariance: 0.25 },
      processVariance,
      observationPolicySha256: sha256(observationPolicy),
    },
    sources: {},
    innovations: [],
    evidenceLedger: [],
    sequence: 0,
    historySha256: sha256(`${STATE_PROTOCOL}\0${objective.trim()}\0${profile}\0${corpusContentSha256}`),
    authority: { externalTelosRequired: true, changesTruthStatus: false, entails: false, empiricalAuthority: false, corpusPromotion: false, modelWeightTraining: false },
  };
  return { ...payload, stateSha256: sha256(payload) };
}

function normalizeObservation(observation, index) {
  exactObject(observation, `observations[${index}]`);
  rejectUnknown(observation, new Set(["type", "sourcePath", "value", "noiseVariance", "note", "evidenceSha256"]), `observations[${index}]`);
  const policy = observationPolicy[observation.type];
  if (!policy) throw new Error(`observations[${index}].type is invalid`);
  if (typeof observation.sourcePath !== "string" || !sourcePathPattern.test(observation.sourcePath) || observation.sourcePath.includes("..") || observation.sourcePath.includes("\\")) throw new Error(`observations[${index}].sourcePath is invalid`);
  const value = observation.value ?? policy.value;
  if (!Number.isFinite(value) || value < 0 || value > 1) throw new Error(`observations[${index}].value must be from 0 to 1`);
  if (observation.type !== "user-rating" && observation.value !== undefined && observation.value !== policy.value) throw new Error(`${observation.type} uses its declared policy value; only user-rating accepts a caller value`);
  const noiseVariance = observation.noiseVariance ?? policy.noiseVariance;
  if (!Number.isFinite(noiseVariance) || noiseVariance < 0.01 || noiseVariance > 1) throw new Error(`observations[${index}].noiseVariance must be from 0.01 to 1`);
  if (observation.type !== "user-rating" && observation.noiseVariance !== undefined && observation.noiseVariance !== policy.noiseVariance) throw new Error(`${observation.type} uses its declared policy noise; only user-rating accepts caller noise`);
  if (observation.note !== undefined && (typeof observation.note !== "string" || observation.note.length > 500)) throw new Error(`observations[${index}].note is invalid`);
  if (observation.evidenceSha256 !== undefined && !shaPattern.test(observation.evidenceSha256)) throw new Error(`observations[${index}].evidenceSha256 is invalid`);
  if (observation.type !== "user-rating" && !shaPattern.test(observation.evidenceSha256 ?? "")) throw new Error(`observations[${index}].evidenceSha256 is required for machine-derived observations`);
  return {
    type: observation.type,
    sourcePath: observation.sourcePath,
    value,
    noiseVariance,
    shockVariance: policy.shockVariance,
    note: observation.note ?? null,
    evidenceSha256: observation.evidenceSha256 ?? null,
  };
}

export function updateBeliefState({ beliefState, observations, corpusContentSha256 } = {}) {
  const prior = verifyBeliefState(beliefState);
  if (corpusContentSha256 !== undefined && corpusContentSha256 !== prior.episode.corpusContentSha256) throw new Error("beliefState corpus identity is stale; initialize a new episode before updating");
  if (!Array.isArray(observations) || observations.length < 1 || observations.length > 200) throw new Error("observations must contain 1 to 200 typed observations");
  const normalized = observations.map(normalizeObservation);
  const observationKeys = normalized.map(item => `${item.type}\0${item.sourcePath}\0${item.evidenceSha256 ?? "manual"}`);
  if (new Set(observationKeys).size !== observationKeys.length) throw new Error("duplicate observations are not allowed in one update");
  const machineEvidenceIdentities = normalized.filter(item => item.evidenceSha256).map(item => sha256(`${item.type}\0${item.sourcePath}\0${item.evidenceSha256}`));
  const replayed = machineEvidenceIdentities.filter(identity => prior.evidenceLedger.includes(identity));
  if (replayed.length) throw new Error("machine-derived observation evidence has already been applied in this episode");
  if (prior.evidenceLedger.length + machineEvidenceIdentities.length > 4096) throw new Error("beliefState evidence ledger is full; initialize a new episode");
  const sources = structuredClone(prior.sources);
  const innovations = [];
  for (const observation of normalized) {
    const previous = sources[observation.sourcePath] ?? { utilityMean: prior.policy.prior.utilityMean, utilityVariance: prior.policy.prior.utilityVariance, observations: 0, lastObservationType: null };
    if (observation.type === "source-changed") {
      const next = { utilityMean: 0.5, utilityVariance: 0.5, observations: previous.observations + 1, lastObservationType: observation.type };
      sources[observation.sourcePath] = next;
      innovations.push({ sourcePath: observation.sourcePath, type: observation.type, predictedMean: previous.utilityMean, observedValue: observation.value, residual: round(observation.value - previous.utilityMean), gain: 0, posteriorMean: next.utilityMean, posteriorVariance: next.utilityVariance, reset: true });
      continue;
    }
    const predictedVariance = bounded(previous.utilityVariance + prior.policy.processVariance, 0.000001, 0.5);
    const residual = observation.value - previous.utilityMean;
    const gain = predictedVariance / (predictedVariance + observation.noiseVariance);
    const posteriorMean = bounded(previous.utilityMean + gain * residual, 0, 1);
    const filteredVariance = (1 - gain) * predictedVariance;
    const posteriorVariance = observation.shockVariance
      ? bounded(Math.max(filteredVariance, previous.utilityVariance + observation.shockVariance), 0.000001, 0.5)
      : bounded(filteredVariance, 0.000001, 0.5);
    const next = { utilityMean: round(posteriorMean), utilityVariance: round(posteriorVariance), observations: previous.observations + 1, lastObservationType: observation.type };
    sources[observation.sourcePath] = next;
    innovations.push({ sourcePath: observation.sourcePath, type: observation.type, predictedMean: previous.utilityMean, observedValue: observation.value, residual: round(residual), gain: round(gain), posteriorMean: next.utilityMean, posteriorVariance: next.utilityVariance, reset: false });
  }
  const retainedInnovations = [...prior.innovations, ...innovations]
    .sort((left, right) => Math.abs(right.residual) - Math.abs(left.residual) || left.sourcePath.localeCompare(right.sourcePath))
    .slice(0, 32);
  const historyEvent = { priorStateSha256: prior.stateSha256, observations: normalized, innovations };
  const payload = {
    ...statePayload(prior),
    sources,
    innovations: retainedInnovations,
    evidenceLedger: [...prior.evidenceLedger, ...machineEvidenceIdentities],
    sequence: prior.sequence + 1,
    historySha256: sha256(`${prior.historySha256}\0${stableStringify(historyEvent)}`),
  };
  const state = { ...payload, stateSha256: sha256(payload) };
  const reportPayload = {
    protocol: UPDATE_PROTOCOL,
    priorStateSha256: prior.stateSha256,
    successorStateSha256: state.stateSha256,
    sequence: state.sequence,
    observations: normalized,
    innovations,
    largestAbsoluteInnovations: [...innovations].sort((left, right) => Math.abs(right.residual) - Math.abs(left.residual)).slice(0, 12),
    authority: state.authority,
  };
  return { state, report: { ...reportPayload, updateSha256: sha256(reportPayload) } };
}

