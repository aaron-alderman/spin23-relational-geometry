#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-positive-charging-enclosure-v1.json", import.meta.url)
));

assert.equal(record.sites, 24);
assert.equal(record.results.length, 3);
for (const row of record.results) {
  const N = row.cutoff;
  const even = 1 - Math.cos(Math.PI / (2 * N + 2));
  const odd = 1 - Math.cos(Math.PI / (N + 1));
  assert.ok(Math.abs(row.localPotentialEigenvalues.lowestEven - even) < 1e-14);
  assert.ok(Math.abs(row.localPotentialEigenvalues.lowestOdd - odd) < 1e-14);
  assert.ok(Math.abs(row.sectorIntervals.even.lower - 24 * even) < 1e-13);
  assert.ok(Math.abs(row.sectorIntervals.odd.lower - (23 * even + odd)) < 1e-13);
  assert.ok(row.sectorIntervals.even.lower <= row.sectorIntervals.even.upper);
  assert.ok(row.sectorIntervals.odd.lower <= row.sectorIntervals.odd.upper);
  assert.ok(Math.abs(row.gapInterval.lower
    - (row.sectorIntervals.odd.lower - row.sectorIntervals.even.upper)) < 1e-13);
  assert.ok(Math.abs(row.gapInterval.upper
    - (row.sectorIntervals.odd.upper - row.sectorIntervals.even.lower)) < 1e-13);
}

const [cutoffOne, cutoffTwo, cutoffThree] = record.results;
assert.equal(cutoffOne.positiveGapCertifiedByThisBound, true);
assert.ok(cutoffOne.gapInterval.lower > 0.37);
assert.equal(cutoffTwo.positiveGapCertifiedByThisBound, false);
assert.equal(cutoffThree.positiveGapCertifiedByThisBound, false);
assert.ok(cutoffTwo.missingOddLowerMargin > 0.29);
assert.ok(cutoffThree.missingOddLowerMargin > 0.72);

console.log(JSON.stringify({
  status: "PASS",
  cutoffOneGapInterval: cutoffOne.gapInterval,
  cutoffTwoMissingOddLowerMargin: cutoffTwo.missingOddLowerMargin,
  cutoffThreeMissingOddLowerMargin: cutoffThree.missingOddLowerMargin,
  established: record.established
}));
