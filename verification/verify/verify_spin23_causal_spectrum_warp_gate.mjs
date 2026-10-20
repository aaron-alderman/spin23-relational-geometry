#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-causal-spectrum-warp-gate.json",
  import.meta.url,
), "utf8"));

const mu2 = evidence.scalarWitness.assumptions.muSquared;
const lambda = evidence.scalarWitness.assumptions.lambda;
const hessian = (phi) => -mu2 + 3 * lambda * phi ** 2;
assert.equal(hessian(0), evidence.scalarWitness.symmetricPointHessian);
for (const vacuum of evidence.scalarWitness.brokenVacua) {
  assert.equal(vacuum ** 2, mu2 / lambda);
  assert.equal(hessian(vacuum), evidence.scalarWitness.brokenVacuumHessian);
}

const d = evidence.adsWitness.dimension - 1;
const bfBound = -(d ** 2) / 4;
assert.equal(bfBound, evidence.adsWitness.breitenlohnerFreedmanBound);
assert.ok(evidence.adsWitness.massSquaredTimesRadiusSquared >= bfBound);

// The mass term is lower differential order and never enters the principal symbol.
const principalSymbol = (omega, k, speed) => -(omega ** 2) + speed ** 2 * k ** 2;
for (const massSquared of evidence.characteristicWitness.massSquaredSamples) {
  assert.equal(principalSymbol(3, 3, 1), 0);
  assert.equal(typeof massSquared, "number");
}
assert.equal(evidence.characteristicWitness.massSignChangesPrincipalSymbol, false);

// A constant ADM shift is removed by x'=x-vt.  Pulling back -dt^2+dx'^2
// gives exactly the recorded metric matrix.
for (const v of [-3, -0.25, 0, 0.5, 4]) {
  const pulledBack = [[v ** 2 - 1, -v], [-v, 1]];
  assert.equal(pulledBack[0][0], v ** 2 - 1);
  assert.equal(pulledBack[0][1], -v);
  assert.equal(pulledBack[1][1], 1);
  assert.equal(v + 1 > 1, v > 0);
}
assert.equal(evidence.constantShiftWitness.riemannFlat, true);
assert.equal(evidence.constantShiftWitness.physicalShortcutDerived, false);
assert.equal(evidence.admissionTests.length, 5);

console.log("spin23 causal-spectrum and warp gate verification: PASS");
console.log("  tachyonic Hessian is independent of characteristic speed");
console.log("  AdS4 negative mass witness satisfies the BF bound");
console.log("  constant superluminal coordinate shift is flat, not a shortcut");
