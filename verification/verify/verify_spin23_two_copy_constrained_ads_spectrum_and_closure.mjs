#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-two-copy-constrained-ads-spectrum-and-closure-v1.json",
  import.meta.url,
), "utf8"));

const rank = (matrix, tolerance = 1e-12) => {
  const a = matrix.map((row) => row.map(Number));
  let pivotRow = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && pivotRow < a.length; col += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < a.length; row += 1) {
      if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) pivot = row;
    }
    if (Math.abs(a[pivot][col]) <= tolerance) continue;
    [a[pivotRow], a[pivot]] = [a[pivot], a[pivotRow]];
    const scale = a[pivotRow][col];
    for (let j = col; j < a[pivotRow].length; j += 1) a[pivotRow][j] /= scale;
    for (let row = 0; row < a.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = a[row][col];
      for (let j = col; j < a[row].length; j += 1) {
        a[row][j] -= factor*a[pivotRow][j];
      }
    }
    pivotRow += 1;
  }
  return pivotRow;
};

const ell = Math.sqrt(evidence.healthyWitness.ellSquared);

// Columns are (delta V^0,...,delta V^4,delta W^0,...,delta W^4).
const normRow = Array(10).fill(0);
normRow[4] = -2*ell;
const copyRows = Array.from({ length: 5 }, (_, index) => {
  const row = Array(10).fill(0);
  row[5 + index] = 1;
  return row;
});
const constraintJacobian = [normRow, ...copyRows];
assert.equal(rank(constraintJacobian), 6);

const unitaryGaugeRows = Array.from({ length: 4 }, (_, index) => {
  const row = Array(10).fill(0);
  row[index] = ell;
  return row;
});
assert.equal(rank([...constraintJacobian, ...unitaryGaugeRows]), 10);
assert.equal(evidence.compensatorRank.physicalDegrees, 10 - 6 - 4);

const brokenFp = Array.from({ length: 4 }, (_, i) =>
  Array.from({ length: 4 }, (_, j) => i === j ? ell : 0));
assert.equal(rank(brokenFp), 4);

const B = evidence.healthyWitness.B;
const axialVelocityHessian = [
  [B, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
assert.equal(rank(axialVelocityHessian), 1);

const audit = evidence.constraintAudit;
const configurationDegrees = (
  audit.phaseSpaceVariables
  - 2*audit.firstClassConstraints
  - audit.secondClassConstraints
)/2;
assert.equal(configurationDegrees, 3);
assert.equal(configurationDegrees, evidence.healthyWitness.totalPhysicalDegrees);

const physicalDegrees = evidence.quadraticSectors.reduce(
  (sum, sector) => sum + sector.degrees,
  0,
);
assert.equal(physicalDegrees, 3);

const A = evidence.healthyWitness.A;
const massSquared = A/B;
assert.ok(evidence.healthyWitness.planckSquared > 0);
assert.ok(A > 0);
assert.ok(B > 0);
assert.equal(massSquared, evidence.healthyWitness.torsionMassSquared);
const bfMargin = massSquared*evidence.healthyWitness.ellSquared + 9/4;
assert.equal(bfMargin, evidence.healthyWitness.bfMargin);
assert.ok(bfMargin > 0);

for (const J of [0.1, 1, 3, 100]) {
  for (const pseudoMomentum of [-100, -1, 0, 2, 50]) {
    const determinant = J**-12*((pseudoMomentum/(6*J))**2 + 1)**6;
    assert.ok(Number.isFinite(determinant) && determinant > 0);
  }
}

const heatKernel = evidence.oneLoopObstruction.minimalPseudoscalarHeatKernel;
const parseFraction = (value) => {
  const [numerator, denominator] = value.split("/").map(Number);
  return numerator/denominator;
};
assert.notEqual(parseFraction(heatKernel.C2), 0);
assert.notEqual(parseFraction(heatKernel.R2), 0);
assert.equal(evidence.oneLoopObstruction.criticalEqualities.length, 7);
assert.equal(evidence.oneLoopObstruction.criticalSurfaceCodimension, 7);

console.log("Spin(2,3) two-copy constrained AdS spectrum and closure: PASS");
console.log("  compensator: rank 6 constraints + rank 4 broken gauge = 10/10 resolved");
console.log("  physical spectrum: 2 massless graviton helicities + 1 massive 0- torsion mode");
console.log(`  witness: m^2 ell^2=${massSquared*ell**2}, BF margin=${bfMargin}`);
console.log("  nonlinear critical constraint determinant: positive on sampled J>0 domain");
console.log("  one-loop closure: FAIL (nonzero C^2 and R^2 heat-kernel coefficients)");
console.log("  epistemic boundary: W=0 is imposed; no protecting multiplicity symmetry is derived");
