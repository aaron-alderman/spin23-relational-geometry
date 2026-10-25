#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-pair-block-enclosure-no-go-v1.json", import.meta.url)
));
assert.equal(record.pairCount, 12);
assert.equal(record.gramDiagonal, 4);
assert.equal(record.maximumGramCoupling, 2);
assert.equal(record.minimumPairGramEigenvalue, 2);
assert.equal(record.maximumPairShortedNorm, 0.5);
assert.equal(record.tripleFrontier.principalMinorCount, 2024);
assert.ok(Math.abs(record.tripleFrontier.minimumEigenvalue
  - (4 - 2 * Math.SQRT2)) < 1e-12);
assert.ok(Math.abs(record.tripleFrontier.maximizingShortedNorm
  - (2 + Math.SQRT2) / 4) < 1e-12);
assert.equal(record.tripleFrontier.ruledOutByThisCeiling, false);
assert.equal(record.firstNotExcludedDisjointBlockSize, 3);

for (const row of record.results) {
  const expected = 0.01 / 2 * 12 * 0.5 * 2 * row.cutoff ** 2;
  assert.ok(Math.abs(row.maximumAddedLowerEnergy - expected) < 1e-14);
  assert.ok(Math.abs(row.bestPossiblePairGapLowerCeiling
    - (row.universalPairOddCeiling - row.evenRitzUpper)) < 1e-13);
}
const cutoffOne = record.results.find((row) => row.cutoff === 1);
const cutoffTwo = record.results.find((row) => row.cutoff === 2);
const cutoffThree = record.results.find((row) => row.cutoff === 3);
assert.equal(cutoffOne.pairBlockClosureRuledOut, false);
assert.equal(cutoffTwo.pairBlockClosureRuledOut, true);
assert.equal(cutoffThree.pairBlockClosureRuledOut, true);
assert.ok(cutoffTwo.bestPossiblePairGapLowerCeiling < -0.05);
assert.ok(cutoffThree.bestPossiblePairGapLowerCeiling < -0.18);

console.log(JSON.stringify({
  status: "PASS",
  maximumPairShortedNorm: record.maximumPairShortedNorm,
  cutoffTwoPairGapCeiling: cutoffTwo.bestPossiblePairGapLowerCeiling,
  cutoffThreePairGapCeiling: cutoffThree.bestPossiblePairGapLowerCeiling,
  firstNotExcludedDisjointBlockSize: record.firstNotExcludedDisjointBlockSize,
  cutoffTwoTripleGapCeiling: record.tripleFrontier.cutoffTwoGapLowerCeiling,
  conclusion: record.conclusion
}));
