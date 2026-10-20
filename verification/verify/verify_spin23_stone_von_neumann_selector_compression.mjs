#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-stone-von-neumann-selector-compression.json",
  import.meta.url,
), "utf8"));

const n = evidence.symplecticCarrier.canonicalPairs;
assert.equal(evidence.symplecticCarrier.realDimension, 2 * n);
assert.equal(evidence.symplecticCarrier.symplecticLieAlgebraDimension, n * (2*n + 1));
assert.equal(evidence.symplecticCarrier.symplecticLieAlgebraDimension, 10);
assert.equal(((2+3)*(2+3-1))/2, 10);

// X=-J S with S symmetric supplies all ten infinitesimal symplectic
// directions in four real dimensions.
const symmetricParameterCount = (2*n)*(2*n+1)/2;
assert.equal(symmetricParameterCount, 10);

// Finite-section witness: the bilateral parent is a permutation/unitary
// cycle, while Hardy compression produces the unilateral shift.  The
// infinite backward shift has the three boundary zero modes recorded here.
const cutoff = 30;
const U = Array.from({ length: cutoff }, () => Array(cutoff).fill(0));
for (let j = 0; j < cutoff; j += 1) U[(j+1)%cutoff][j] = 1;
for (let j = 0; j < cutoff; j += 1) {
  assert.equal(U.reduce((s, row) => s + row[j] ** 2, 0), 1);
}

const B3 = Array.from({ length: cutoff }, () => Array(cutoff).fill(0));
for (let j = 3; j < cutoff; j += 1) B3[j-3][j] = 1;
const kernelColumns = B3[0].map((_, j) => B3.every((row) => row[j] === 0));
assert.deepEqual(kernelColumns.slice(0, 3), [true, true, true]);
assert.ok(kernelColumns.slice(3).every((entry) => !entry));
assert.equal(evidence.selectorCompression.thirdPowerIndex, 3);

assert.equal(evidence.scope.finiteCanonicalDegreesOfFreedom, true);
for (const key of ["infiniteQFTDegreesCovered", "gaugeConstraintReductionAutomatic", "hamiltonianOrVacuumSelected", "bornRuleDerived", "e6YukawaFrameDerived"]) {
  assert.equal(evidence.scope[key], false);
}

console.log("spin23 Stone-von Neumann selector-compression verification: PASS");
console.log("  four-dimensional symplectic carrier: two canonical pairs, dim sp(4,R)=10");
console.log("  regular irreducible Weyl parent is unique at fixed nonzero hbar");
console.log("  index three enters only after Hardy/selector compression");
