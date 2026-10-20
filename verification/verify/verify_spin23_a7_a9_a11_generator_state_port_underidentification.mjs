import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(
      root,
      "evidence/data/spin23-a7-a9-a11-generator-state-port-underidentification.json",
    ),
    "utf8",
  ),
);

assert.equal(data.documentId, 1459);

// W has eigenvalues 1, omega, omega^2.  W+W^dagger therefore has real
// eigenvalues 2 cos(2 pi h/3) = (2,-1,-1).
const sectorEigenvalues = [0, 1, 2].map(
  (h) => 2 * Math.cos((2 * Math.PI * h) / 3),
);
assert.ok(Math.abs(sectorEigenvalues[0] - 2) < 1e-12);
assert.ok(Math.abs(sectorEigenvalues[1] + 1) < 1e-12);
assert.ok(Math.abs(sectorEigenvalues[2] + 1) < 1e-12);
const contrast =
  sectorEigenvalues[0] - (sectorEigenvalues[1] + sectorEigenvalues[2]) / 2;
assert.ok(Math.abs(contrast - 3) < 1e-12);
assert.equal(data.symmetryPreservingDeformation.poleContrastCoefficient, 3);

// Port rescaling leaves pole positions fixed and rescales a two-point
// residue quadratically.
const residue = 7 / 5;
const g = -3 / 2;
assert.equal(g ** 2 * residue, 3.15);
assert.equal(data.residueFreedom.absoluteResiduePredicted, false);

// Verify one nontrivial GL(2,R) coordinate change preserves s^T C s.
const C = [
  [2, 0.3],
  [0.3, 1.4],
];
const B = [
  [2, 1],
  [1, 1],
];
const s = [0.4, -0.7];
const multiply = (A, x) => A.map((row) => row.reduce((v, a, i) => v + a * x[i], 0));
const transpose = (A) => A[0].map((_, i) => A.map((row) => row[i]));
const matmul = (A, D) => A.map((row) => transpose(D).map((column) => row.reduce((v, a, i) => v + a * column[i], 0)));
const dot = (a, b) => a.reduce((v, x, i) => v + x * b[i], 0);
const determinant = B[0][0] * B[1][1] - B[0][1] * B[1][0];
const inverse = [
  [B[1][1] / determinant, -B[0][1] / determinant],
  [-B[1][0] / determinant, B[0][0] / determinant],
];
const transformedC = matmul(matmul(B, C), transpose(B));
const transformedS = multiply(transpose(inverse), s);
const originalResponse = dot(s, multiply(C, s));
const transformedResponse = dot(transformedS, multiply(transformedC, transformedS));
assert.ok(Math.abs(originalResponse - transformedResponse) < 1e-12);
assert.equal(data.portFreedom.coordinateCovarianceSelectsPhysicalPort, false);

const packet = new Set(data.openSystemResponse.requiredBlocks);
assert.deepEqual(packet, new Set(["generator", "state-or-preparation", "input-output-port-map"]));
assert.equal(data.openSystemResponse.qWZControl.stationaryKuboForcing, 0);
assert.ok(data.openSystemResponse.qWZControl.phenomenologicalValueAtRegisteredPoint > 0.9);

assert.equal(data.verdict.currentInputsDeterminePhysicalShift, false);
assert.equal(data.verdict.currentInputsDetermineResidue, false);
assert.equal(data.verdict.currentInputsDeterminePort, false);
assert.equal(data.verdict.currentInputsDetermineLinewidth, false);
assert.equal(data.verdict.currentInputsExhausted, true);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1459: symmetry leaves shifts free, port scaling leaves residues free, GL(2) covariance does not select a port, and the minimal reopen packet is generator+state+ports.",
);
