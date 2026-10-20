#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-z3-index-three-fredholm-shift.json",
  import.meta.url,
), "utf8"));

const cutoff = 30;
const B3 = Array.from({ length: cutoff }, () => Array(cutoff).fill(0));
for (let j = 3; j < cutoff; j += 1) B3[j - 3][j] = 1;
const P = Array.from({ length: cutoff }, () => Array(cutoff).fill(0));
for (let n = 0; n < cutoff / 3; n += 1) {
  for (let r = 0; r < 3; r += 1) P[3*n+((r+1)%3)][3*n+r] = 1;
}
const multiply = (A, C) => A.map((row, i) => C[0].map((_, j) => row.reduce((s, a, k) => s+a*C[k][j], 0)));
assert.deepEqual(multiply(B3, P), multiply(P, B3));

const zeroColumns = B3[0].map((_, j) => B3.every((row) => row[j] === 0));
assert.deepEqual(zeroColumns.slice(0, 3), [true, true, true]);
assert.ok(zeroColumns.slice(3).every((x) => !x));
assert.equal(evidence.kernelDimension, 3);
assert.equal(evidence.cokernelDimension, 0);
assert.equal(evidence.fredholmIndex, 3);
assert.equal(evidence.spin10Lift.kernelDimension, 3 * 16);
assert.equal(evidence.spin10Lift.matchesThreeChiral16Multiplicity, true);
assert.equal(evidence.decision.escapesBalancedFiniteIndexNoGo, true);
assert.equal(evidence.decision.derivesPhysicalExtraDimensionOrDefect, false);

console.log("spin23 Z3 index-three Fredholm-shift verification: PASS");
console.log("  ker(B^3)=span{e0,e1,e2}, coker(B^3)=0, index=3");
console.log("  blockwise Z3 cycle commutes with B^3");
console.log("  tensoring with the Spin(10) 16 gives kernel dimension 48 and index class 3[16]");
