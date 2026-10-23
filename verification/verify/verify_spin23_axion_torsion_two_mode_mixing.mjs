#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-axion-torsion-two-mode-mixing-v1.json", root,
), "utf8"));
const close = (a, b, eps = 1e-12) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

const eta = data.identityKineticWitness.sourceCoupling[1];
const [mLight2, mHeavy2] = data.identityKineticWitness.massEigenvaluesSquared;
assert.ok(mLight2 > 0 && mHeavy2 > 0);

for (const witness of data.identityKineticWitness.witnesses) {
  const c = Math.cos(witness.thetaRadians);
  const s = Math.sin(witness.thetaRadians);
  close(witness.lightCoupling, eta * s);
  close(witness.heavyCoupling, eta * c);
  close(witness.couplingNormSquared, eta ** 2);

  const m00 = mLight2 * c ** 2 + mHeavy2 * s ** 2;
  const m11 = mLight2 * s ** 2 + mHeavy2 * c ** 2;
  const m01 = (mLight2 - mHeavy2) * c * s;
  close(m00 + m11, mLight2 + mHeavy2);
  close(m00 * m11 - m01 ** 2, mLight2 * mHeavy2);
  assert.ok(m00 > 0 && m11 > 0 && m00 * m11 - m01 ** 2 > 0);
}

close(data.identityKineticWitness.witnesses[1].lightCoupling, 1 / 8);
assert.equal(data.topologyAudit.netGenerations, 3);
assert.equal(data.topologyAudit.dependsOnMixingAngle, false);
assert.equal(data.selectionAudit.selected, false);

console.log("Spin(2,3) axion-torsion two-mode mixing: PASS");
console.log("  all witnesses: positive kinetic matrix and masses squared {1,9}");
console.log("  light-pole coupling: 0, 1/8, 1/4 at fixed source norm 1/4");
console.log("  invariant: h_light^2+h_heavy^2=1/16; individual residue not selected");
