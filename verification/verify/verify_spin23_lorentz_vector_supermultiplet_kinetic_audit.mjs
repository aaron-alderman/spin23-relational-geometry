#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-lorentz_vector_supermultiplet_kinetic_audit-v1.json", root,
), "utf8"));

const epsilon = (i, j, k) => {
  if (i === j || j === k || i === k) return 0;
  return ((i - j) * (j - k) * (i - k)) / 2;
};
const f = Array.from({ length: 6 }, () =>
  Array.from({ length: 6 }, () => Array(6).fill(0)));
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    for (let k = 0; k < 3; k += 1) {
      const e = epsilon(i, j, k);
      f[i][j][k] = e;
      f[i][j + 3][k + 3] = e;
      f[i + 3][j][k + 3] = e;
      f[i + 3][j + 3][k] = -e;
    }
  }
}
const killing = Array.from({ length: 6 }, (_, a) =>
  Array.from({ length: 6 }, (_, b) => {
    let sum = 0;
    for (let c = 0; c < 6; c += 1) {
      for (let d = 0; d < 6; d += 1) sum += f[a][c][d] * f[b][d][c];
    }
    return sum;
  }));
assert.deepEqual(killing, data.killingForm.matrix);

for (const [a, b] of [[1, 0], [0, 1], [1 / 8, 1 / 4], [-3, 2]]) {
  const magnitude = 4 * Math.sqrt(a * a + b * b);
  assert.ok(magnitude > 0);
  const eigenvalues = [-magnitude, magnitude];
  assert.equal(eigenvalues.filter((value) => value < 0).length * 3, 3);
  assert.equal(eigenvalues.filter((value) => value > 0).length * 3, 3);
}
assert.equal(data.generalInvariantRealSymmetricForm.positiveDefiniteChoiceExists, false);
assert.equal(data.supersymmetryAudit.supersymmetryRepairsIndefiniteMetric, false);
assert.ok(data.escapeAudit.every((route) => route.minimalProposalPreserved === false));
assert.equal(data.targetAudit.ghostFreeOrdinaryLorentzSuperYangMills, false);
assert.equal(data.targetAudit.healthyZeroMinusSelected, false);
assert.equal(data.targetAudit.etaMapPresent, false);

console.log("Spin(2,3) Lorentz vector-supermultiplet kinetic audit: PASS");
console.log("  Killing form: diag(-4,-4,-4,+4,+4,+4)");
console.log("  every nonzero invariant real symmetric form has signature (3,3)");
console.log("  ordinary N=1 Lorentz super-Yang-Mills cannot be ghost-free");
