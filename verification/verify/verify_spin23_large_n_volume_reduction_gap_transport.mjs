#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-large-n-volume-reduction-gap-transport.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.large-n-volume-reduction-gap-transport/1");
assert.match(evidence.status, /no finite-N R4 mass-gap transport/);

const close = (a, b, tol=1e-12) => Math.abs(a-b) < tol;
const C = (re, im=0) => ({re, im});
const cAdd = (a, b) => C(a.re+b.re, a.im+b.im);
const cMul = (a, b) => C(a.re*b.re-a.im*b.im, a.re*b.im+a.im*b.re);
const cScale = (a, x) => C(a.re*x, a.im*x);
const cAbs = (a) => Math.hypot(a.re, a.im);

// Center-symmetric SU(N) clock: determinant one and all center-charged traces vanish.
const cw = evidence.clockHolonomyWitness;
let determinant = C(1);
for (const theta of cw.eigenphases) determinant = cMul(determinant, C(Math.cos(theta), Math.sin(theta)));
assert.ok(close(determinant.re, 1));
assert.ok(close(determinant.im, 0));
for (let k=1; k<=cw.N; k++) {
  let trace = C(0);
  for (const theta of cw.eigenphases) trace = cAdd(trace, C(Math.cos(k*theta), Math.sin(k*theta)));
  const magnitude = cAbs(trace)/cw.N;
  assert.ok(close(magnitude, cw.normalizedTraceMagnitudesForPowers1Through8[k-1]));
}
const differenceBins = new Set();
for (let a=0; a<cw.N; a++) for (let b=0; b<cw.N; b++) differenceBins.add((a-b+cw.N)%cw.N);
assert.equal(differenceBins.size, cw.colorDifferenceBins);
assert.ok(close(2*Math.PI/(cw.N*cw.circumference), cw.lowestNonzeroMomentum));
assert.equal(cw.effectiveCircumference, cw.N*cw.circumference);

for (const row of evidence.ordinaryColorMomentumRows) {
  assert.equal(row.effectiveLength, row.N*row.L);
  assert.ok(close(row.lowestMomentum, 2*Math.PI/row.effectiveLength));
}

// Explicit finite Heisenberg clock/shift pair underlying the symmetric twist.
const tw = evidence.twistedOneSiteWitness;
const l = tw.explicitLHat;
const omega = C(Math.cos(2*Math.PI/l), Math.sin(2*Math.PI/l));
const zeroMatrix = () => Array.from({length:l}, () => Array.from({length:l}, () => C(0)));
const P = zeroMatrix();
const Q = zeroMatrix();
for (let j=0; j<l; j++) {
  P[j][j] = C(Math.cos(2*Math.PI*j/l), Math.sin(2*Math.PI*j/l));
  Q[(j+1)%l][j] = C(1);
}
const matMul = (a, b) => a.map((row, i) => b[0].map((_, j) => {
  let sum = C(0);
  for (let k=0; k<b.length; k++) sum = cAdd(sum, cMul(a[i][k], b[k][j]));
  return sum;
}));
const PQ = matMul(P, Q);
const QP = matMul(Q, P);
for (let i=0; i<l; i++) for (let j=0; j<l; j++) {
  assert.ok(cAbs(cAdd(PQ[i][j], cScale(cMul(omega, QP[i][j]), -1))) < 1e-12);
}
assert.equal(tw.explicitN, l**2);
assert.equal(tw.matrixDimension, tw.explicitN);
assert.equal(tw.colorBasisCount, tw.explicitN**2);
assert.equal(tw.momentumGridCount, l**4);
assert.equal(tw.identityModeRemovedCount, tw.colorBasisCount-1);
for (const row of tw.rows) {
  assert.equal(row.N, row.LHat**2);
  assert.equal(row.effectiveSites, row.LHat**4);
  assert.ok(close(row.aPMin, 2*Math.PI/row.LHat));
}

for (const family of ["fixedN", "fixedPhysicalBoxDoubleScaling", "growingBoxDoubleScaling"]) {
  for (const row of evidence.continuumOrderWitness[family]) {
    const physicalLength = row.a*Math.sqrt(row.N);
    assert.ok(close(physicalLength, row.physicalEffectiveLength));
    assert.ok(close(2*Math.PI/physicalLength, row.physicalPMin));
  }
}
assert.ok(evidence.continuumOrderWitness.fixedN.at(-1).physicalEffectiveLength <
  evidence.continuumOrderWitness.fixedN[0].physicalEffectiveLength);
assert.equal(new Set(evidence.continuumOrderWitness.fixedPhysicalBoxDoubleScaling.map((x) => x.physicalEffectiveLength)).size, 1);
assert.ok(evidence.continuumOrderWitness.growingBoxDoubleScaling.at(-1).physicalEffectiveLength >
  evidence.continuumOrderWitness.growingBoxDoubleScaling[0].physicalEffectiveLength);

// A positive spectral counterexample: pointwise planar convergence hides a
// low-energy state with 1/N^2 residue.
const pc = evidence.planarSpectralCounterexample;
const correlator = (N, t) => Math.exp(-pc.DeltaInfinity*t)+N**-2*Math.exp(-t/N);
const effectiveMass = (N, t) => Math.log(correlator(N, t)/correlator(N, t+1));
for (const row of pc.rows) {
  const epsilon = 1/row.N;
  const crossover = 2*Math.log(row.N)/(pc.DeltaInfinity-epsilon);
  assert.equal(row.epsilonN, epsilon);
  assert.ok(close(row.crossoverTime, crossover));
  assert.ok(close(row.effectiveMassAtT2, effectiveMass(row.N, 2)));
  assert.ok(row.epsilonN < pc.DeltaInfinity);
}
assert.ok(Math.abs(effectiveMass(100000, 2)-1) < 1e-8);
assert.ok(Math.abs(effectiveMass(32, 100)-1/32) < 1e-3);
assert.match(pc.noncommutation, /lim_N lim_t effectiveMass=0/);

assert.ok(evidence.loopEquationBoundary.whatDoesNotFollow.length >= 5);
assert.match(evidence.reductionStatement.planarClaim, /N=infinity/);
assert.match(evidence.routeAssessment.missingFiniteNBridge, /spectral convergence uniform near zero energy/);
assert.match(evidence.spin23Boundary.notAGroupBridge, /fixed rank and is noncompact/);

console.log("Large-N volume-reduction gap-transport gate: PASS");
console.log("  clock N=8: |Tr Omega^k|/N=0 for k=1,...,7; p_min="+cw.lowestNonzeroMomentum.toFixed(6));
console.log("  TEK N=16: 255 nonidentity color-momentum modes on an effective 4^4 grid");
console.log("  continuum: fixed N collapses a*sqrt(N); infinite volume requires faster-than-a^-2 color growth");
console.log("  planar counterexample: fixed-time gap -> 1 while every finite-N true gap is 1/N");
