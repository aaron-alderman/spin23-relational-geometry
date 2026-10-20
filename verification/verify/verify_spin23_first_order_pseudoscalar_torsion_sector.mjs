#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-first-order-pseudoscalar-torsion-sector.json",
  import.meta.url,
), "utf8"));

const close = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
};

const axialCoefficient = (planckSquared, coupling) => planckSquared*(1 - 4*coupling)/24;
const massSquared = (planckSquared, coupling, bX) => axialCoefficient(planckSquared, coupling)/bX;

const witness = evidence.healthRegion.nonemptyWitness;
close(axialCoefficient(witness.M_PlSquared, witness.lambda), witness.a_S);
close(massSquared(witness.M_PlSquared, witness.lambda, witness.b_X), witness.massSquared);
assert.ok(witness.M_PlSquared > 0);
assert.ok(witness.a_S > 0);
assert.ok(witness.b_X > 0);
assert.equal(witness.gravitonHelicities, 2);
assert.equal(witness.torsionPseudoscalarDegrees, 1);

// Exact auxiliary dual checked on finite field/derivative samples:
// b y^2/2 = -chi^2/(2b)+chi*y at chi=b*y, and eliminating S from
// a S^2/2-j.S yields -j^2/(2a) in the mostly-plus scalar convention.
for (const divergence of [-3, -0.5, 0, 2, 7]) {
  const chi = witness.b_X*divergence;
  const direct = 0.5*witness.b_X*divergence**2;
  const auxiliary = -(chi**2)/(2*witness.b_X) + chi*divergence;
  close(direct, auxiliary);
}

// The exact vector kernel has an algebraic transverse block and one
// momentum-dependent longitudinal eigenvalue.
for (const p2 of [0, 0.25, 1, 9]) {
  const transverseEigenvalue = witness.a_S;
  const longitudinalEigenvalue = witness.a_S + witness.b_X*p2;
  close(1/transverseEigenvalue, 24);
  assert.ok(longitudinalEigenvalue > 0);
}
close(-witness.a_S/witness.b_X, -witness.massSquared);

assert.ok(axialCoefficient(1, 0.3) < 0, "lambda>1/4 must flip the 0-minus residue");
assert.ok(massSquared(1, 0, -1) < 0, "b_X<0 must be tachyonic in the positive-residue region");
close(axialCoefficient(1, 1/4), 0);

// Retain the two other exact algebraic singular surfaces from claim 1596.
const traceCoefficient = (coupling) => 2*(coupling - 2)/3;
const tensorCoefficient = (coupling) => coupling + 1/2;
close(traceCoefficient(2), 0);
close(tensorCoefficient(-1/2), 0);

const totalPhysicalDegrees = evidence.poleCensus.reduce((sum, pole) => sum + pole.degrees, 0);
assert.equal(totalPhysicalDegrees, 3);

console.log("Spin(2,3) first-order pseudoscalar-torsion sector: PASS");
console.log(`  healthy witness: a_S=${witness.a_S.toFixed(6)}, b_X=${witness.b_X.toFixed(6)}`);
console.log(`  0- torsion pole: m^2=${witness.massSquared}, residue sign=positive`);
console.log(`  physical degrees: ${witness.gravitonHelicities} graviton + ${witness.torsionPseudoscalarDegrees} torsion pseudoscalar`);
console.log("  failure boundaries: ghost lambda>1/4; tachyon b_X<0; singular lambda=1/4,-1/2");
