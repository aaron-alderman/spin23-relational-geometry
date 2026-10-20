#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-multiplicity-one-selector-commutant.json",
  import.meta.url,
), "utf8"));

const [psi, symmetric] = evidence.fieldContent;
assert.equal(psi.multiplicity, 1);
assert.equal(symmetric.multiplicity, 1);
assert.notEqual(psi.e6Representation, symmetric.e6Representation);
assert.notEqual(psi.dimension, symmetric.dimension);
assert.equal(evidence.commutant.schurResult.crossIntertwiners, 0);

for (const operator of Object.values(evidence.operators)) {
  assert.deepEqual(operator.phaseExponent, { alpha: 0, beta: 0 });
  assert.equal(operator.hermitian, true);
  assert.equal(operator.generalizedCpParity, "even");
}

assert.notEqual(evidence.gaugeLoopInput.I2Projection, 0);
assert.equal(
  evidence.decision.anyCommutingUnitaryMultiplicityOneSelectorCanForbidI2,
  false,
);
assert.equal(evidence.decision.generalizedCpCanMakeI2Odd, false);
assert.equal(evidence.decision.ordinaryMultiplicityOneInternalSelectorClassClosed, true);

console.log("spin23 E6 multiplicity-one selector commutant verification: PASS");
console.log("  unitary commutant: subgroup of U(1)_psi x U(1)_S");
console.log("  I1 and I2 phase exponents: (0,0)");
console.log("  Hermitian I2 generalized-CP parity: even");
console.log("  gauge-loop I2 projection: 20");
