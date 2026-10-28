import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const result = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-operator-tournament-v0.json"), "utf8"));

assert.equal(result.protocol, "prophetic-admissibility/operator-tournament/0");
assert.deepEqual(result.trainingIds.sort(), [
  "miller-1843-1844",
  "smith-south-carolina-war-1832",
  "southcott-shiloh-1814"
].sort());
assert.deepEqual(result.heldOutIds.sort(), [
  "camping-2011",
  "rutherford-1925-patriarchs",
  "whisenant-rapture-1988"
].sort());
assert.equal(result.winner, "skeptical-terminal-null");
assert.equal(result.positiveHermeneuticRankingIdentified, false);
assert.ok(result.ranking[0].meanBrier < result.ranking[1].meanBrier);
assert.ok(result.ranking[1].meanBrier < result.ranking[2].meanBrier);
assert.match(result.design.limitation, /not sampled from a defined forecast population/);

console.log(JSON.stringify({
  result: "pass",
  protocol: result.protocol,
  winner: result.winner,
  heldOutCount: result.heldOutIds.length,
  positiveHermeneuticRankingIdentified: result.positiveHermeneuticRankingIdentified,
  boundary: result.authorityBoundary
}, null, 2));

