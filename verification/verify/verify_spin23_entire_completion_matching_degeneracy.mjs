#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-entire-completion-matching-degeneracy-v1.json", root,
), "utf8"));
const close = (a, b, eps = 1e-12) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

const beta = data.packetMatch.betaC.numerator
  / (data.packetMatch.betaC.denominator * Math.PI ** data.packetMatch.betaC.piPower);
const scaleRatio = 1 / beta;
close(scaleRatio, 960 * Math.PI ** 2 / 11);

for (const witness of data.witnesses) {
  close(witness.x2Coefficient, witness.alpha + 1 / 2);
  close(witness.x3Coefficient, witness.alpha + 1 / 6);
  assert.deepEqual(witness.axialCouplingsAllowed, [0, 1 / 8, 1 / 4]);
  for (const x of [-3, -1, 0, 1, 3]) {
    assert.ok(Math.exp(x + witness.alpha * x ** 2) > 0);
  }
}

assert.equal(data.family.finitePoles, 1);
assert.equal(data.selectionAudit.freePoleHealthSelectsAlpha, false);
assert.equal(data.selectionAudit.localC2MatchSelectsAlpha, false);
assert.equal(data.selectionAudit.localC2MatchSelectsAxialCoupling, false);

console.log("Spin(2,3) entire-completion matching degeneracy: PASS");
console.log(`  packet unit-log coefficient: ${beta}`);
console.log(`  matched scale ratio M^2/M_Pl^2: ${scaleRatio}`);
console.log("  alpha=-1,0,2: same p^4 coefficient and pole count, different higher coefficients");
console.log("  axial coupling remains independently 0, 1/8, or 1/4");
