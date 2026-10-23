#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-spin2-positive-spectral-reconstruction-v1.json", root,
), "utf8"));
const close = (a, b, eps = 1e-14) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

for (const witness of data.numericWitnesses) {
  close(witness.exponentialScaledRatio, Math.exp(-witness.x));
  assert.ok(witness.exponentialScaledRatio < 1);
}
assert.equal(data.exponentialAudit.standardPositiveSpectralRepresentation, false);

for (const tanTheta of [0.5, 1, 2]) {
  const cos2 = 1 / (1 + tanTheta ** 2);
  const sin2 = 1 - cos2;
  assert.ok(cos2 > 0 && sin2 > 0);
  close(cos2 + sin2, 1);
  for (const q2 of [0.25, 1, 4]) {
    const m2 = tanTheta ** 2;
    const scaled = q2 * (cos2 / q2 + sin2 / (q2 + m2));
    assert.ok(scaled >= cos2);
  }
}
assert.equal(data.bimetricAudit.standardPositiveSpectralRepresentation, true);
assert.equal(data.axialAudit.positiveSpectralGateContainsEta, false);
assert.deepEqual(data.axialAudit.bimetricAllowedEta, [0, 1 / 8, 1 / 4]);

console.log("Spin(2,3) spin-two positive spectral reconstruction: PASS");
console.log("  exponential: Q^2 D/Z=e^-x<1 contradicts positive spectral lower bound");
console.log("  bimetric: two positive delta-function spectral weights");
console.log("  spectral gate selects no axial coupling");
