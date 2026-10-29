import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const input = JSON.parse(await readFile(resolve(root, "evidence/data/newton-combinatorial-input-v1.json"), "utf8"));
const result = JSON.parse(await readFile(resolve(root, "evidence/data/newton-combinatorial-analysis-v1.json"), "utf8"));

assert.equal(result.protocol, "prophetic-admissibility/newton-combinatorial-analysis/1");
assert.equal(input.grammar.maximumTermsIncludingAnchor, 3);
assert.ok(result.generated.every((candidate) => candidate.termCount <= 3));
assert.equal(result.enumeration.generatedCount, 11);
assert.equal(result.terminalFilter.beforeWindowCount, 3);
assert.equal(result.terminalFilter.afterWindowCount, 5);
assert.equal(result.terminalFilter.retainedCount, 3);
assert.equal(result.rankedClusters.length, 2);
assert.equal(result.rankedClusters[0].earliestYear, 2060);
assert.equal(result.rankedClusters[0].newtonExplicit, true);

const cluster2090 = result.rankedClusters.find((cluster) => cluster.earliestYear === 2090);
assert.equal(cluster2090.rawDerivationCount, 2);
assert.equal(cluster2090.independentLineageCount, 1);
assert.equal(cluster2090.duplicateInflation, 1);

const beyond = result.generated.filter((candidate) => candidate.filterDisposition === "after-window");
assert.ok(beyond.some((candidate) => candidate.result.earliestYear === 2135));
assert.ok(beyond.some((candidate) => candidate.operatorId === "day-millennium"));

console.log(JSON.stringify({
  result: "pass",
  protocol: result.protocol,
  generated: result.enumeration.generatedCount,
  retained: result.terminalFilter.retainedCount,
  dominantYear: result.dominantSignal.earliestYear,
  secondaryYear: cluster2090.earliestYear,
  duplicateInflationAtSecondary: cluster2090.duplicateInflation
}, null, 2));
