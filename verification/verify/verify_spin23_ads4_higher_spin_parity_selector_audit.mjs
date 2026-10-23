#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-ads4-higher-spin-parity-selector-audit-v1.json", root,
), "utf8"));
const close = (a, b, eps = 1e-14) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

for (const sample of data.commonConventionWitness.samples) {
  close(sample.lambda, sample.N / sample.k);
  close(sample.thetaOverPi, sample.lambda / 2);
}
assert.equal(data.higherSpinParent.evadesColemanMandulaFiniteSpeciesAssumption, true);
assert.equal(data.torsionIdentityAudit.higherSpinScalarAutomaticallyPgtTorsion, false);
assert.equal(data.torsionIdentityAudit.massiveLongitudinalZeroMinusEstablished, false);
assert.equal(data.torsionIdentityAudit.fermionAxialMatchingMapPresent, false);
assert.equal(data.selectionAudit.higherSpinConsistencyFixesParityPhaseUniquely, false);
assert.equal(data.selectionAudit.oneEighthSelected, false);

console.log("Spin(2,3) AdS4 higher-spin parity selector audit: PASS");
console.log("  genuine finite-species/S-matrix loophole: infinite AdS higher-spin tower");
console.log("  common convention: theta0/pi=lambda/2 remains continuous at planar large N");
console.log("  no field or matching map identifies the scalar with the PGT 0-minus portal");
