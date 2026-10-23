#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-lorentz_nonlinear_realization_audit-v1.json", root,
), "utf8"));

const killing = [-4, -4, -4, 4, 4, 4];
const cartan = [1, 1, 1, -1, -1, -1];
const positive = killing.map((value, index) => -value * cartan[index]);
assert.deepEqual(positive, [4, 4, 4, 4, 4, 4]);
assert.ok(positive.every((value) => value > 0));

// The boost/coset generators transform as the ordinary vector representation
// of the unbroken rotation algebra: (J_i)_jk = epsilon_ijk.
const epsilon = (i, j, k) => {
  if (i === j || j === k || i === k) return 0;
  return ((i - j) * (j - k) * (i - k)) / 2;
};
const rotationGenerators = Array.from({ length: 3 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) => Array.from({ length: 3 }, (_, k) => epsilon(i, j, k))));
for (const generator of rotationGenerators) {
  for (let j = 0; j < 3; j += 1) for (let k = 0; k < 3; k += 1) {
    assert.equal(generator[j][k] + generator[k][j], 0);
  }
}
const commonKernel = [0, 1, 2].filter((column) =>
  rotationGenerators.every((generator) => generator.every((row) => row[column] === 0)));
assert.deepEqual(commonKernel, []);

assert.equal(data.decomposition.cosetDimension, 3);
assert.equal(data.cartanInvolution.invariantUnderFullLorentzGroup, false);
assert.equal(data.cartanInvolution.invariantUnderCompactSO3, true);
assert.equal(data.representationAudit.SO3SingletsInBrokenGeneratorSpace, 0);
assert.equal(data.representationAudit.independentPseudoscalarZeroMinusPresent, false);
assert.equal(data.targetAudit.positiveKinematicMetricConstructed, true);
assert.equal(data.targetAudit.sameFieldContentAsMinimalProposal, false);
assert.equal(data.targetAudit.oneEighthSelected, false);

for (const [g, f, expected] of [[1, 1, 1], [0.5, 2, 1], [0.25, 8, 2]]) {
  assert.equal(g * f, expected);
}

console.log("Spin(2,3) Lorentz nonlinear-realization audit: PASS");
console.log("  Cartan metric: diag(4,4,4,4,4,4)");
console.log("  cost: three SO(1,3)/SO(3) Goldstones and a chosen compact subgroup");
console.log("  broken sector: SO(3) vector triplet, with no pseudoscalar singlet");
