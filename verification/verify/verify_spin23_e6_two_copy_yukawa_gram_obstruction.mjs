#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-two-copy-yukawa-gram-obstruction.json",
  import.meta.url,
), "utf8"));

const outer = (v) => [
  [v[0] * v[0], v[0] * v[1]],
  [v[1] * v[0], v[1] * v[1]],
];
const add = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));

const tilted = [2, 3];
const gram = outer(tilted);
assert.notEqual(tilted[0], 0);
assert.notEqual(tilted[1], 0);
assert.notEqual(gram[0][1], 0);
assert.equal(gram[0][0] * gram[1][1] - gram[0][1] * gram[1][0], 0);

const q = 1 / Math.sqrt(2);
const y1 = [q, q];
const y2 = [q, -q];
const frame = add(outer(y1), outer(y2));
assert.ok(Math.abs(frame[0][0] - 1) < 1e-12);
assert.ok(Math.abs(frame[1][1] - 1) < 1e-12);
assert.ok(Math.abs(frame[0][1]) < 1e-12);
assert.ok(Math.abs(frame[1][0]) < 1e-12);

assert.equal(evidence.multiSourceCriterion.minimumGenericSourceCountForFullRank, 2);
assert.equal(
  evidence.decision.singleTiltedYukawaRayRgeClosesOrthogonalProjector,
  false,
);
assert.equal(evidence.decision.bareTwoSymmetricCopyRouteClosedUnderYukawaLoops, true);
assert.equal(evidence.decision.twoIndependentBalancedSourceRaysCanCancelRotation, true);
assert.equal(evidence.decision.balancedSourceRaysDerivedByCurrentModel, false);

console.log("spin23 E6 two-copy Yukawa Gram obstruction verification: PASS");
console.log(`  one tilted source Gram off-diagonal: ${gram[0][1]}`);
console.log("  one tilted source rank: 1");
console.log("  two-ray tight-frame witness Gram sum: identity_2");
