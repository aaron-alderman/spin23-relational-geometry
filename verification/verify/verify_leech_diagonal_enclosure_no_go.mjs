#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-diagonal-enclosure-no-go-v1.json", import.meta.url)
));
assert.equal(record.traceCeiling, 6);
assert.equal(record.ratio, 0.01);
assert.equal(record.results.length, 3);

for (const row of record.results) {
  const expected = 0.01 * row.cutoff ** 2 * 6 / 2;
  assert.ok(Math.abs(row.maximumAddedLowerEnergy - expected) < 1e-14);
  assert.ok(Math.abs(row.universalDiagonalOddCeiling
    - row.potentialOnlyOddLower - expected) < 1e-13);
  assert.ok(Math.abs(row.bestPossibleDiagonalGapLowerCeiling
    - (row.universalDiagonalOddCeiling - row.evenRitzUpper)) < 1e-13);
}

const cutoffOne = record.results.find((row) => row.cutoff === 1);
const cutoffTwo = record.results.find((row) => row.cutoff === 2);
const cutoffThree = record.results.find((row) => row.cutoff === 3);
assert.equal(cutoffOne.diagonalClosureRuledOut, false);
assert.equal(cutoffTwo.diagonalClosureRuledOut, true);
assert.equal(cutoffThree.diagonalClosureRuledOut, true);
assert.ok(cutoffTwo.bestPossibleDiagonalGapLowerCeiling < -0.17);
assert.ok(cutoffThree.bestPossibleDiagonalGapLowerCeiling < -0.45);

console.log(JSON.stringify({
  status: "PASS",
  traceCeiling: record.traceCeiling,
  cutoffTwoDiagonalGapCeiling: cutoffTwo.bestPossibleDiagonalGapLowerCeiling,
  cutoffThreeDiagonalGapCeiling: cutoffThree.bestPossibleDiagonalGapLowerCeiling,
  conclusion: record.conclusion
}));
