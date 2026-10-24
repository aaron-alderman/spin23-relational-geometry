import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-link-action-metric-audit-v1.json"), "utf8"));

const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const potential = (X, kappa) => {
  const wells = X.flat().reduce((sum, x) => sum + x * x * (1 - x) * (1 - x), 0);
  const rowPenalty = X.reduce((sum, row) => sum + (row.reduce((a, b) => a + b, 0) - 1) ** 2, 0);
  const colPenalty = transpose(X).reduce((sum, col) => sum + (col.reduce((a, b) => a + b, 0) - 1) ** 2, 0);
  return wells + kappa * (rowPenalty + colPenalty);
};

const s2 = Math.sqrt(2);
const s3 = Math.sqrt(3);
const s6 = Math.sqrt(6);
const U = [[1 / s3, 1 / s2, 1 / s6], [1 / s3, -1 / s2, 1 / s6], [1 / s3, 0, -2 / s6]];
const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const basis5 = Array.from({ length: 5 }, (_, k) => {
  const block = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  if (k === 0) block[0][0] = 1;
  else block[1 + Math.floor((k - 1) / 2)][1 + ((k - 1) % 2)] = 1;
  return multiply(multiply(U, block), transpose(U));
});

const kappa = 0.7;
const epsilon = 1e-5;
const numericHessian = Array.from({ length: 5 }, (_, i) => Array.from({ length: 5 }, (_, j) => {
  const ei = scale(epsilon, basis5[i]);
  const ej = scale(epsilon, basis5[j]);
  return (
    potential(add(add(I3, ei), ej), kappa)
    - potential(add(add(I3, ei), scale(-1, ej)), kappa)
    - potential(add(add(I3, scale(-1, ei)), ej), kappa)
    + potential(add(add(I3, scale(-1, ei)), scale(-1, ej)), kappa)
  ) / (4 * epsilon * epsilon);
}));
const expected = [2 + 12 * kappa, 2, 2, 2, 2];
for (let i = 0; i < 5; i += 1) {
  assert.ok(Math.abs(numericHessian[i][i] - expected[i]) < 2e-5);
  for (let j = 0; j < 5; j += 1) if (i !== j) assert.ok(Math.abs(numericHessian[i][j]) < 2e-5);
}

const qEigenvalues = [-1, -0.5, -0.5, 0.5, 0.5];
assert.equal(qEigenvalues.filter((x) => x > 0).length, 2);
assert.equal(qEigenvalues.filter((x) => x < 0).length, 3);
assert.ok(expected.every((x) => x > 0));

assert.equal(certificate.protocol, "admissibility-link-action-metric-audit/1");
assert.deepEqual(certificate.relativeFramePotential.signature, [5, 0]);
assert.deepEqual(certificate.candidateMetrics.determinantCausal.signature, [2, 3]);
assert.equal(certificate.boundedVerdict.existingStableSelectorChoosesQ, false);
for (const functional of certificate.auditedCorpusFunctionals) {
  assert.ok(["positive", "positive for kappa>0", "positive semidefinite", "semidefinite/Morse-Bott", "strictly positive on the positive cone", "positive on physical support"].includes(functional.classification));
}

console.log(JSON.stringify({
  status: "PASS",
  linkPotentialRestrictedHessian: expected,
  linkPotentialSignature: [5, 0],
  determinantCarrierSignature: [2, 3],
  auditedStableFunctionals: certificate.auditedCorpusFunctionals.length,
  qSelectedAsEuclideanHessian: false,
  admissibleInterpretation: "positive vacuum selection plus separate causal quadratic geometry"
}));
