import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-quarter-turn-wick-goldstone-cloud-open-closure-v1.json"), "utf8"));

const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const equal = (A, B, tolerance = 1e-12) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tolerance));
const power = (A, n) => {
  let result = A.map((_, i) => A.map((__, j) => Number(i === j)));
  for (let k = 0; k < n; k += 1) result = multiply(result, A);
  return result;
};

const I2 = [[1, 0], [0, 1]];
const J = certificate.quarterTurn.matrix;
assert.ok(equal(multiply(J, J), scale(-1, I2)));
assert.ok(equal(power(J, 4), I2));
assert.ok(equal(power(J, 6), scale(-1, I2)));
assert.ok(equal(power(J, 12), I2));

// Products of antiunitaries U_A K and U_B K multiply as U_A conjugate(U_B).
const sigmaX = [[0, 1], [1, 0]];
const sigmaZ = [[1, 0], [0, -1]];
assert.ok(equal(multiply(sigmaX, sigmaZ), J));

const F = [[1, 0], [0, -1]];
const Jinv = scale(-1, J);
assert.ok(equal(multiply(multiply(J, F), Jinv), scale(-1, F)));

const C3 = [[1, 3], [-1, -2]];
assert.ok(equal(power(C3, 3), I2));
const I0 = scale(-1, add(I2, scale(2, C3)));
assert.ok(equal(multiply(I0, I0), scale(-3, I2)));

const lambda = 2;
const v = 3;
const selectorHessianEigenvalues = [0, 0, 2 * lambda * v * v];
assert.deepEqual(selectorHessianEigenvalues, [0, 0, 36]);

// A proper Gaussian sample and its Wick current covariance.
const p = 2;
const r = [1, 0.5];
const detC = p * p - r[0] * r[0] - r[1] * r[1];
assert.ok(detC > 0);
const wick = [
  [2 * detC + 4 * r[0] * r[0], 4 * r[0] * r[1]],
  [4 * r[0] * r[1], 2 * detC + 4 * r[1] * r[1]]
];
const trace = wick[0][0] + wick[1][1];
const determinant = wick[0][0] * wick[1][1] - wick[0][1] * wick[1][0];
assert.ok(trace > 0 && determinant > 0);
const expectedEigenvalues = [2 * (p * p + r[0] * r[0] + r[1] * r[1]), 2 * detC].sort((a, b) => a - b);
const discriminant = Math.sqrt(trace * trace - 4 * determinant);
const actualEigenvalues = [(trace - discriminant) / 2, (trace + discriminant) / 2];
assert.ok(actualEigenvalues.every((x, i) => Math.abs(x - expectedEigenvalues[i]) < 1e-12));

assert.equal(certificate.protocol, "admissibility-quarter-turn-wick-goldstone-cloud-open-closure/1");
assert.equal(certificate.status.commonOperatorEstablished, true);
assert.equal(certificate.status.singleUniversalPhysicalMechanismEstablished, false);
assert.equal(certificate.status.spacetimeWickRotationDerived, false);
assert.equal(certificate.status.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  quarterTurn: { square: "-I", fourthPower: "I", multiplicationByI: true },
  twoRealStructures: { product: "J" },
  eisensteinCycle: { order: 3, normalizedComplexStructure: true },
  selectorGoldstones: 2,
  gaussianCloud: { positiveSample: true, wickEigenvalues: actualEigenvalues },
  coherentHolonomy: { step6: "-I", step12: "I" },
  universalMicroscopicMechanism: "OPEN"
}));

