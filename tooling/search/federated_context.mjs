import { createHash } from "node:crypto";

export const FEDERATION_LANES = Object.freeze(["canonical-corpus", "claimipedia", "sourcery-derivation", "publication", "external-literature"]);
const laneSet = new Set(FEDERATION_LANES);
const relationKinds = new Set(["same-source", "authored-link", "revision-pinned-join", "structurally-inferred", "query-generated"]);
const sha256 = value => createHash("sha256").update(value).digest("hex");
const exactHash = value => typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);

function validateResult(result, lane) {
  if (!result || Array.isArray(result) || typeof result !== "object") throw new Error(`federation ${lane} result must be an object`);
  if (typeof result.objectId !== "string" || !result.objectId || result.objectId.length > 500) throw new Error(`federation ${lane} objectId is invalid`);
  if (!exactHash(result.contentSha256) || typeof result.revision !== "string" || !result.revision || result.revision.length > 500) throw new Error(`federation ${lane} result lacks immutable content and revision identity`);
  if (typeof result.status !== "string" || !result.status || result.status.length > 1000) throw new Error(`federation ${lane} status is invalid`);
  if (typeof result.withinLaneScore !== "number" || !Number.isFinite(result.withinLaneScore) || result.withinLaneScore < 0) throw new Error(`federation ${lane} withinLaneScore is invalid`);
  if (!result.relation || !relationKinds.has(result.relation.kind) || typeof result.relation.target !== "string" || !result.relation.target) throw new Error(`federation ${lane} relation is invalid`);
  if (result.readAuthority !== true || result.promotionAuthority !== false) throw new Error(`federation ${lane} authority must be read-only and non-promoting`);
  return { ...result, lane };
}

export function composeFederatedContext({ lanes, quotas = {}, crossingPenalties = {}, maxSources = 12 } = {}) {
  if (!lanes || Array.isArray(lanes) || typeof lanes !== "object") throw new Error("federation lanes must be an object");
  if (!Number.isSafeInteger(maxSources) || maxSources < 1 || maxSources > 50) throw new Error("federation maxSources must be from 1 to 50");
  const declared = Object.entries(lanes).map(([lane, results]) => {
    if (!laneSet.has(lane) || !Array.isArray(results)) throw new Error(`federation lane ${lane} is invalid`);
    const quota = quotas[lane] ?? results.length;
    const penalty = crossingPenalties[lane] ?? (lane === "canonical-corpus" ? 0 : 0.15);
    if (!Number.isSafeInteger(quota) || quota < 0 || quota > 25 || typeof penalty !== "number" || !Number.isFinite(penalty) || penalty < 0 || penalty > 1) throw new Error(`federation controls for ${lane} are invalid`);
    const normalized = results.map(result => validateResult(result, lane)).sort((left, right) => right.withinLaneScore - left.withinLaneScore || left.objectId.localeCompare(right.objectId));
    return { lane, quota, penalty, results: normalized.slice(0, quota) };
  }).sort((left, right) => FEDERATION_LANES.indexOf(left.lane) - FEDERATION_LANES.indexOf(right.lane));
  const selected = [];
  const identities = new Set();
  let round = 0;
  while (selected.length < maxSources) {
    let added = false;
    for (const lane of declared) {
      const candidate = lane.results[round];
      if (!candidate) continue;
      const identity = `${candidate.relation.target}\0${candidate.contentSha256}`;
      if (identities.has(identity)) continue;
      identities.add(identity);
      selected.push({ ...candidate, withinLaneRank: round + 1, crossingPenalty: lane.penalty, packetOrder: selected.length + 1 });
      added = true;
      if (selected.length === maxSources) break;
    }
    if (!added) break;
    round += 1;
  }
  const laneReceipts = declared.map(lane => ({ lane: lane.lane, quota: lane.quota, crossingPenalty: lane.penalty, supplied: lane.results.length, selected: selected.filter(item => item.lane === lane.lane).length }));
  const receiptBasis = { selected: selected.map(item => ({ lane: item.lane, objectId: item.objectId, revision: item.revision, contentSha256: item.contentSha256, relation: item.relation, withinLaneRank: item.withinLaneRank })), laneReceipts };
  return {
    protocol: "spin23-identity-preserving-federated-context/1",
    sources: selected,
    laneReceipts,
    receiptSha256: sha256(JSON.stringify(receiptBasis)),
    authority: { readOnly: true, globalScalarRank: false, changesTruthStatus: false, corpusPromotion: false, crossLanePromotion: false },
  };
}
