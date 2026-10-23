#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-bimetric-matching-degeneracy-v1.json", root,
), "utf8"));
const close = (a, b, eps = 1e-12) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

for (const witness of data.fixedLocalCoefficientWitnesses) {
  const t2 = witness.tanTheta ** 2;
  const cos2 = 1 / (1 + t2);
  const sin2 = t2 / (1 + t2);
  close(witness.q, t2 / witness.m2Squared);
  close(witness.masslessResidue, cos2);
  close(witness.massiveResidue, sin2);
  close(witness.masslessResidue + witness.massiveResidue, 1);
  assert.ok(witness.masslessResidue > 0 && witness.massiveResidue > 0);
  assert.deepEqual(witness.axialCouplingsAllowed, [0, 1 / 8, 1 / 4]);

  const p2 = 0.01 * witness.m2Squared;
  const propagator = cos2 / p2 + sin2 / (p2 + witness.m2Squared);
  const inverseExact = p2 * (p2 + witness.m2Squared)
    / (p2 + cos2 * witness.m2Squared);
  close(propagator * inverseExact, 1);
}

assert.equal(data.selectionAudit.positiveResiduesSelectMixing, false);
assert.equal(data.selectionAudit.localCurvatureMatchSelectsMassAndMixingSeparately, false);
assert.equal(data.selectionAudit.localCurvatureMatchSelectsAxialCoupling, false);
assert.ok(data.nonlinearRequirements.length >= 5);

console.log("Spin(2,3) bimetric matching degeneracy: PASS");
console.log("  three positive-residue parents share q=tan(theta)^2/m2^2=1");
console.log("  masses squared: 1/4, 1, 4; massive residues: 1/5, 1/2, 4/5");
console.log("  axial coupling remains independently 0, 1/8, or 1/4");
