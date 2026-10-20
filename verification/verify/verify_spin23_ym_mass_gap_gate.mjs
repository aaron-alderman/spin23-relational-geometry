#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-ym-mass-gap-gate.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.ym-mass-gap-gate/1");
assert.match(evidence.clayProblem.gaugeGroups, /compact simple/);
assert.equal(evidence.clayProblem.spacetime, "R^4");
assert.ok(evidence.reconstructionGate.euclideanRequirements.includes("reflection positivity"));
assert.match(evidence.logicalSeparations.finiteLattice, /does not prove/);
assert.match(evidence.spin23Boundary.groupFact, /noncompact/);
assert.match(evidence.spin23Boundary.gravityConstraint, /massless spin-2/);

// One-loop dimensional transmutation: the scale is invariant along the
// one-loop running trajectory, but this finite algebraic check is not a gap proof.
const rg = evidence.oneLoopDimensionalTransmutationWitness;
const b0 = 11*rg.N/(48*Math.PI**2);
const g2 = 1/Math.sqrt(1/rg.gAtMu1**2 + 2*b0*Math.log(rg.mu2/rg.mu1));
const lambda = (mu, g) => mu*Math.exp(-1/(2*b0*g**2));
const lambda1 = lambda(rg.mu1, rg.gAtMu1);
const lambda2 = lambda(rg.mu2, g2);
assert.ok(Math.abs(g2-rg.gAtMu2OneLoop) < 1e-14);
assert.ok(Math.abs(lambda1-rg.lambdaAtMu1) < 1e-16);
assert.ok(Math.abs(lambda2-rg.lambdaAtMu2) < 1e-16);
assert.ok(Math.abs(lambda1/lambda2-1) < 1e-12);

// Leading SU(2) strong-coupling character-expansion witness.
const sc = evidence.strongCouplingWitness;
const q = sc.beta/4;
const area = sc.rectangularLoopR*sc.rectangularLoopT;
const loop = q**area;
const tension = -Math.log(q);
const energy = -Math.log(q**sc.rectangularLoopR);
assert.ok(Math.abs(q-sc.leadingPlaquetteFactor) < 1e-15);
assert.ok(Math.abs(loop-sc.leadingWilsonLoop) < 1e-20);
assert.ok(Math.abs(tension-sc.latticeStringTension) < 1e-14);
assert.ok(Math.abs(energy-sc.fixedRTransferEnergy) < 1e-14);
assert.ok(tension > 0);

// A positive two-exponential correlator has an effective mass tending to the
// lowest supplied energy. This checks the inference machinery, not Yang-Mills.
const cw = evidence.correlationGapWitness;
const correlation = (t) => Math.exp(-cw.m*t) + cw.r*Math.exp(-cw.M*t);
const effectiveMass = (t) => Math.log(correlation(t)/correlation(t+1));
const computed = cw.times.map(effectiveMass);
for (let i=0; i<computed.length; i++) {
  assert.ok(Math.abs(computed[i]-cw.effectiveMasses[i]) < 1e-14);
  assert.ok(computed[i] > cw.m);
  if (i > 0) assert.ok(computed[i] < computed[i-1]);
}
assert.ok(Math.abs(computed.at(-1)-cw.m) < 1e-6);

// Exhaustion here means every logically distinct constructive gate is named;
// it must never be confused with solving the open problem.
assert.ok(evidence.nextGates.length >= 10);
assert.match(evidence.status, /not a proof/);
assert.match(evidence.decision, /No present Spin\(2,3\) construction solves/);

console.log("Spin(2,3) / four-dimensional Yang-Mills mass-gap gate: PASS");
console.log(`  one-loop SU(3): g(${rg.mu2})=${g2.toFixed(6)}, Lambda=${lambda2.toExponential(6)}`);
console.log(`  SU(2) strong-coupling toy: W(3,4)=${loop.toExponential(6)}, sigma*a^2=${tension.toFixed(6)}`);
console.log(`  correlator: m_eff(1)=${computed[0].toFixed(6)} -> m_eff(16)=${computed.at(-1).toFixed(6)}`);
console.log("  finite witnesses remain explicitly below the continuum existence-and-gap claim");
