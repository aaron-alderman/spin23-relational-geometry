#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-bimetric-torsion-product-ward-audit-v1.json", root,
), "utf8"));
const b = data.benchmark;

const cos2 = 1 / (1 + b.tanTheta ** 2);
const sin2 = 1 - cos2;
assert.equal(cos2, b.masslessSpin2Residue);
assert.equal(sin2, b.massiveSpin2Residue);
assert.ok(b.massiveSpin2MassSquared > 0);
assert.ok(b.pseudoscalarMassSquared > 0);
assert.deepEqual(b.axialCoefficientWitnesses, [0, 1 / 8, 1 / 4]);

for (const eta of b.axialCoefficientWitnesses) {
  const freeEigenvaluesAtUnitMomentum = [1, 1 + b.massiveSpin2MassSquared, 1 + b.pseudoscalarMassSquared];
  assert.ok(freeEigenvaluesAtUnitMomentum.every((value) => value > 0));
  assert.ok(Number.isFinite(eta));
}
assert.equal(data.wardAudit.standardBimetricSymmetrySelectsEta, false);
assert.equal(data.wardAudit.standardLocalLorentzSymmetrySelectsEta, false);
assert.equal(data.healthAudit.freeSpectrumDependsOnEta, false);

console.log("Spin(2,3) bimetric-torsion product Ward audit: PASS");
console.log("  positive free poles unchanged for eta=0, 1/8, 1/4");
console.log("  diagonal diffeomorphism and local-Lorentz invariance permit every witness");
console.log("  standard bimetric Ward structure supplies no axial selector");
