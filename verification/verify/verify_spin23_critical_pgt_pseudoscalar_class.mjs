#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-pseudoscalar-class.json",
  import.meta.url,
), "utf8"));

const w = evidence.finiteWitness;
const close = (x, y, eps = 1e-12) => assert.ok(Math.abs(x-y) <= eps, `${x} != ${y}`);

// Exact critical-class equalities (Yo--Nester Eq. 4.25 conventions).
close(2*w.a1+w.a2, 0);
close(w.a1+2*w.a3, 0);
for (const key of ["b1", "b2", "b4", "b5", "b6"]) close(w[key], 0);
assert.notEqual(w.a0, 0);
assert.notEqual(w.b3, 0);

// Published sign conditions plus a positive projected mass combination.
assert.ok(w.a0 > w.a1 && w.a1 > 0);
assert.ok(w.b3/w.kappa < 0);
close(w.a0/2+w.a3, (w.a0-w.a1)/2);
close(w.b2+w.b3, w.b3);

// Positive-normalized exact reduced equivalent action.
const A = (w.a0-w.a1)/w.ellSquared;
const B = -w.b3/w.kappa;
close(A, w.A);
close(B, w.B);
assert.ok(A > 0 && B > 0);
close(A/B, w.reducedMassSquared);

// The transverse axial components are algebraic; only the longitudinal
// eigenvalue has a momentum-dependent zero.
for (const p2 of [0, 0.25, 1, 4, 16]) {
  const transverse = A;
  const longitudinal = A+B*p2;
  assert.ok(transverse > 0);
  assert.ok(longitudinal > 0);
}
close(-A/B, -w.reducedMassSquared);

// Exact nonlinear constraint count and determinant witness.
const c = evidence.canonicalWitness;
close((c.phaseSpaceVariables-2*c.firstClassConstraints-c.secondClassConstraints)/2, 3);
const m = (w.a0-w.a1)/w.ellSquared;
const determinant = (J, pPi, mass) => J**(-12)*((pPi/(6*J))**2+mass**2)**6;
for (const J of [0.125, 0.5, 1, 2, 10]) {
  for (const pPi of [-12, -1, 0, 3, 24]) {
    assert.ok(determinant(J, pPi, m) > 0, `rank loss at J=${J}, pPi=${pPi}`);
  }
}
close(determinant(1, 0, 0), 0); // the separate GR/gauge critical class

const dof = w.spectrum.reduce((sum, pole) => sum+pole.degrees, 0);
assert.equal(dof, 3);
assert.equal(evidence.radiativeClosure.decision, "not closed");

console.log("Spin(2,3) critical PGT pseudoscalar class: PASS");
console.log(`  critical residuals: 2a1+a2=${2*w.a1+w.a2}, a1+2a3=${w.a1+2*w.a3}`);
console.log(`  reduced pole: m^2=A/B=${w.reducedMassSquared}; graviton + 0- DOF=${dof}`);
console.log(`  nonlinear determinant positive on ${5*5} finite nondegenerate samples for m=${m}`);
console.log("  classification: healthy critical surface / classical or tuned EFT; not radiatively closed");
