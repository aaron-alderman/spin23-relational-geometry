#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-functional-ym-mass-generation-audit.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.functional-ym-mass-generation-audit/1");
const close = (actual, expected, tolerance = 1e-12) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= tolerance*scale,
    "expected " + expected + ", received " + actual);
};

const propagators = evidence.sameScreeningDifferentSpectra;
close(propagators.DplusAtZero, 1);
close(propagators.DGAtZero, 1);
close(1/Math.sqrt(propagators.DplusAtZero), propagators.screeningMassBoth);
close(1/Math.sqrt(propagators.DGAtZero), propagators.screeningMassBoth);
const Cplus = (t) => 0.5*Math.exp(-Math.abs(t));
const CG = (t) => Math.exp(-Math.sqrt(3)*Math.abs(t)/2)*
  Math.cos(Math.abs(t)/2)/Math.sqrt(3);
for (const point of propagators.points) {
  close(Cplus(point.t), point.Cplus);
  close(CG(point.t), point.CG);
}
const gribovMinor = CG(0)*CG(2)-CG(1)**2;
close(gribovMinor, propagators.gribovHankel2Determinant);
assert.ok(propagators.points.at(-1).CG < 0);
assert.ok(gribovMinor < 0);

const gap = evidence.nonlinearGapEquation;
for (const point of gap.points) {
  const mass = 1/Math.sqrt(Math.exp(1/point.lambda)-1);
  close(mass, point.mOverLambda);
  close(1, point.lambda*Math.log(1+1/mass**2));
}
assert.equal(gap.zeroSolutionAlwaysPresent, true);

const schwinger = evidence.schwingerPoleTransversality;
for (const point of schwinger.vectors) {
  const [x,y] = point.q;
  const q2 = x*x+y*y;
  const projector = [
    [1-x*x/q2, -x*y/q2],
    [-x*y/q2, 1-y*y/q2],
  ];
  const contraction = [
    x*projector[0][0]+y*projector[1][0],
    x*projector[0][1]+y*projector[1][1],
  ];
  const residual = Math.max(...contraction.map(Math.abs));
  close(residual, point.maximumContractionResidual);
  close(projector[0][0]+projector[1][1], point.eigenvalues[0]+point.eigenvalues[1]);
  close(projector[0][0]*projector[1][1]-projector[0][1]*projector[1][0],
    point.eigenvalues[0]*point.eigenvalues[1]);
}

const physical = evidence.positiveGaugeInvariantTarget;
const correlator = (t) => physical.spectralWeights.reduce((sum, weight, i) =>
  sum+weight*Math.exp(-physical.spectralMasses[i]*t), 0);
for (const point of physical.points) {
  close(correlator(point.t), point.C);
  if (point.effectiveMassToNext !== null) {
    close(Math.log(correlator(point.t)/correlator(point.t+1)), point.effectiveMassToNext);
  }
}
const hankel2 = correlator(0)*correlator(2)-correlator(1)**2;
close(hankel2, physical.hankel2Determinant);
assert.ok(hankel2 > 0);
const H = Array.from({length: 3}, (_, i) =>
  Array.from({length: 3}, (_, j) => correlator(i+j)));
const determinant3 = H[0][0]*(H[1][1]*H[2][2]-H[1][2]*H[2][1])-
  H[0][1]*(H[1][0]*H[2][2]-H[1][2]*H[2][0])+
  H[0][2]*(H[1][0]*H[2][1]-H[1][1]*H[2][0]);
close(determinant3, physical.hankel3Determinant);
assert.ok(Math.abs(determinant3) < 1e-18);
for (let i=1; i<physical.points.length-1; i++) {
  assert.ok(physical.points[i].effectiveMassToNext <
    physical.points[i-1].effectiveMassToNext);
  assert.ok(physical.points[i].effectiveMassToNext > physical.spectralMasses[0]);
}

assert.equal(evidence.proofAdmissionConditions.length, 7);
assert.match(evidence.spin23MethodologyOnly.transfer, /methodology/);
assert.match(evidence.spin23MethodologyOnly.decision, /no QCD-to-Spin/);
assert.match(evidence.programmeDecision, /not a gauge-invariant Hamiltonian gap/);

console.log("Spin(2,3) functional Yang-Mills mass-generation audit: PASS");
console.log("  equal m_scr=1: positive pole C_plus(4)=" + Cplus(4).toFixed(9) +
  ", positivity-violating C_G(4)=" + CG(4).toFixed(9));
console.log("  Gribov-Stingl 2x2 reflection minor=" + gribovMinor.toFixed(9));
console.log("  nonlinear toy m/Lambda ranges from " + gap.points[0].mOverLambda.toFixed(6) +
  " to " + gap.points.at(-1).mOverLambda.toFixed(6) + " as closure strength changes");
console.log("  longitudinal pole projector is transverse for " + schwinger.vectors.length +
  " finite momenta but is not a physical-state witness");
console.log("  positive gauge-invariant toy effective mass tends to " +
  physical.spectralMasses[0] + " with positive 2x2 reflection minor");
