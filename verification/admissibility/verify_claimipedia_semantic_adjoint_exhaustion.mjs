import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const source = JSON.parse(readFileSync(new URL("corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json", root), "utf8"));
const evidence = JSON.parse(readFileSync(new URL("evidence/data/claimipedia-semantic-adjoint-exhaustion-v1.json", root), "utf8"));
const types = [...new Set(source.edges.map(edge => edge[2]))].sort();

function permutations(values) {
  if (values.length < 2) return [values];
  return values.flatMap((value, i) => permutations([...values.slice(0, i), ...values.slice(i + 1)]).map(rest => [value, ...rest]));
}

const multiplicities = new Map();
for (const edge of source.edges) {
  const key = JSON.stringify(edge);
  multiplicities.set(key, (multiplicities.get(key) ?? 0) + 1);
}

const results = permutations(types).map(permutation => {
  const map = new Map(types.map((type, i) => [type, permutation[i]]));
  const involutive = types.every(type => map.get(map.get(type)) === type);
  const matched = source.edges.filter(([u, v, type]) => multiplicities.has(JSON.stringify([v, u, map.get(type)])));
  return { map: Object.fromEntries(map), involutive, matched };
}).sort((a, b) => b.matched.length - a.matched.length);

const involutions = results.filter(result => result.involutive);
const best = involutions[0].matched.length;
const bestInvolutions = involutions.filter(result => result.matched.length === best);
const matchedKeys = new Set(bestInvolutions.flatMap(result => result.matched.map(edge => JSON.stringify(edge))));
const onlyMatched = [...matchedKeys].map(key => JSON.parse(key)).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

assert.equal(source.sourceHash, evidence.sourceHash);
assert.deepEqual(types, evidence.search.relationTypes);
assert.equal(results.length, evidence.search.allTypePermutations);
assert.equal(involutions.length, evidence.search.involutiveTypePermutations);
assert.equal(best, evidence.search.bestReverseMatchedRecords);
assert.equal(source.edges.length - best, evidence.search.unmatchedRecordsAtBest);
assert.equal(bestInvolutions.length, evidence.bestInvolutions.length);
assert.deepEqual(onlyMatched, [...evidence.onlyMatchedRecords].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))));
assert.equal(evidence.search.globalAdjointExists, false);
assert.equal(evidence.decision.currentSourceRouteExhausted, true);

const riverNodes = new Set(["claim.instrumentCalibration", "claim.riverNitrate", "claim.riverFlow"]);
const riverEdges = source.edges.filter(([u, v, type]) => riverNodes.has(u) && riverNodes.has(v) && type === "DependsOn");
assert.equal(riverEdges.length, 3);
assert(riverEdges.every(([u, v]) => !source.edges.some(([x, y]) => x === v && y === u)));

console.log(JSON.stringify({
  result: "pass",
  packet: evidence.packet,
  permutations: results.length,
  involutions: involutions.length,
  bestReverseMatchedRecords: best,
  unmatchedRecordsAtBest: source.edges.length - best,
  onlyReciprocalCell: "Spin-Temple Supports/Qualifies",
  currentSourceRouteExhausted: true,
  reopeningDatum: evidence.reopeningDatum
}, null, 2));
