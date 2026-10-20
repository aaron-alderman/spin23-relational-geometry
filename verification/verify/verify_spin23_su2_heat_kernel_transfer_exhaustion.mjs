#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-su2-heat-kernel-transfer-exhaustion.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.su2-heat-kernel-transfer-exhaustion/1");
assert.match(evidence.status, /not a four-dimensional mass-gap proof/);

const w = evidence.exactWitness;
const lambda = (j, t=w.t) => Math.exp(-t*j*(j+1));
for (const row of w.representations) {
  assert.equal(row.dimension, 2*row.j+1);
  assert.equal(row.casimir, row.j*(row.j+1));
  assert.ok(Math.abs(row.transferEigenvalue-lambda(row.j)) < 1e-15);
  assert.ok(Math.abs(row.hamiltonianEnergy-w.kappa*row.casimir) < 1e-14);
  assert.ok(row.transferEigenvalue > 0 && row.transferEigenvalue <= 1);
}

const latticeGap = -Math.log(lambda(0.5)/lambda(0));
const physicalGap = latticeGap/w.timeSpacing;
assert.ok(Math.abs(latticeGap-w.latticeGap) < 1e-15);
assert.ok(Math.abs(physicalGap-w.physicalGap) < 1e-14);
for (const row of w.fundamentalCorrelation.rows) {
  assert.ok(Math.abs(Math.exp(-row.n*latticeGap)-row.correlation) < 1e-15);
}
assert.ok(Math.abs(1/latticeGap-w.fundamentalCorrelation.latticeCorrelationLength) < 1e-14);
assert.equal(w.fundamentalCorrelation.effectiveMassAtEveryStep, w.latticeGap);

// Temporal reflection positivity is explicit in the diagonal character basis.
const normSquared = w.testCharacterCoefficients.reduce((s, x) => s+x*x, 0);
const transferForm = w.testCharacterCoefficients.reduce((s, x, n) => {
  const j = n/2;
  return s+x*x*lambda(j);
}, 0);
assert.ok(Math.abs(normSquared-w.testNormSquared) < 1e-15);
assert.ok(Math.abs(transferForm-w.positiveTransferForm) < 1e-14);
assert.ok(transferForm > 0);

// Heat-kernel sewing holds sector by sector.
for (const j of [0, 0.5, 1, 1.5, 2, 4]) {
  assert.ok(Math.abs(lambda(j, 0.11)*lambda(j, 0.19)-lambda(j, 0.30)) < 1e-15);
}

// Bound the infinite heat trace after an explicit finite diagonalization.
let trace = 0;
for (let n=0; n<200; n++) trace += lambda(n/2);
assert.ok(Math.abs(trace-w.heatTrace) < 1e-14);
let truncated = 0;
for (let n=0; n<=2*w.heatTraceTruncationJ; n++) truncated += lambda(n/2);
const firstOmittedJ = w.heatTraceTruncationJ+0.5;
const firstOmitted = lambda(firstOmittedJ);
const maxTailRatio = Math.exp(-w.t*(w.heatTraceTruncationJ+1.25));
const tailBound = firstOmitted/(1-maxTailRatio);
assert.ok(trace-truncated > 0);
assert.ok(trace-truncated < tailBound);
assert.ok(Math.abs(tailBound-w.heatTraceTailUpperBound) < 1e-15);

// The transfer gap closes linearly in the time cutoff while its logarithmic
// Hamiltonian slope stays fixed.
for (const row of evidence.timeContinuumScaling.rows) {
  assert.ok(Math.abs(row.t-row.timeSpacing*w.kappa) < 1e-15);
  const gap = 0.75*row.t;
  assert.ok(Math.abs(gap-row.latticeGap) < 1e-15);
  assert.ok(Math.abs(gap/row.timeSpacing-row.physicalGap) < 1e-14);
  assert.ok(Math.abs(row.physicalGap-w.physicalGap) < 1e-14);
}

for (const row of evidence.spatialCircleScaling.rows) {
  const gap = 3*evidence.spatialCircleScaling.couplingSquared*row.circumference/8;
  assert.ok(Math.abs(gap-row.gap) < 1e-15);
}

// Integer modified Bessel I_n from its absolutely convergent power series.
function besselI(n, x) {
  let factorial = 1;
  for (let q=2; q<=n; q++) factorial *= q;
  let term = (x/2)**n/factorial;
  let sum = term;
  for (let k=1; k<200; k++) {
    term *= x*x/(4*k*(k+n));
    sum += term;
    if (Math.abs(term) < 1e-18*Math.abs(sum)) break;
  }
  return sum;
}

const wc = evidence.wilsonCharacterCorrection;
const u = besselI(2, wc.beta)/besselI(1, wc.beta);
const seriesThroughBeta5 = wc.beta/4-wc.beta**3/96+wc.beta**5/1536;
assert.ok(Math.abs(u-wc.exactCoefficient) < 1e-15);
assert.ok(Math.abs((u-wc.leadingBetaOver4)/wc.leadingBetaOver4-wc.relativeCorrection) < 1e-15);
assert.ok(Math.abs(u**wc.rectangleArea-wc.leadingCharacterTiling) < 1e-22);
assert.ok(Math.abs(wc.leadingBetaOver4**wc.rectangleArea-wc.leadingBetaOver4Tiling) < 1e-22);
assert.ok(Math.abs(seriesThroughBeta5-u) < 1e-5);
for (const row of wc.weakCouplingRows) {
  const rowU = besselI(2, row.beta)/besselI(1, row.beta);
  assert.ok(Math.abs(rowU-row.u) < 1e-14);
  assert.ok(Math.abs(-Math.log(rowU)-row.minusLogU) < 1e-14);
  assert.equal(row.leadingAsymptotic, 1.5/row.beta);
}

const ob = evidence.oneLoopBoundaryWitness;
const b0 = 11*2/(48*Math.PI**2);
const aLambdaAtBeta4 = Math.exp(-4/(8*b0));
assert.ok(Math.abs(b0-ob.b0) < 1e-16);
assert.ok(Math.abs(aLambdaAtBeta4-ob.formalBetaEquals4AtALambda) < 1e-18);
for (const row of ob.naiveExactCoefficientTrajectory) {
  const beta = 8*b0*Math.log(1/row.aLambda);
  const rowU = besselI(2, beta)/besselI(1, beta);
  const sigmaLattice = -Math.log(rowU);
  assert.ok(Math.abs(beta-row.beta) < 1e-14);
  assert.ok(Math.abs(sigmaLattice-row.minusLogU) < 1e-14);
  assert.ok(Math.abs(sigmaLattice/row.aLambda**2/row.sigmaOverLambdaSquared-1) < 1e-14);
}

const failures = evidence.fourDimensionalObstruction;
for (const key of ["missingMagneticDynamics", "wrongDimension", "continuumRequirement", "fixedTFailure", "strongCouplingFailure", "volumeFailure", "localityFailure", "nontrivialityFailure"]) {
  assert.ok(failures[key].length > 50, `missing explicit obstruction: ${key}`);
}
assert.match(evidence.spin23Boundary.noncompactWarning, /noncompact/);
assert.match(evidence.spin23Boundary.notPermitted, /massless spin-2/);

console.log("Exact SU(2) heat-kernel transfer exhaustion: PASS");
console.log(`  spectrum: lambda_1/2=${lambda(0.5).toFixed(9)}, aE_gap=${latticeGap.toFixed(6)}, E_gap=${physicalGap.toFixed(6)}`);
console.log(`  reflection form=${transferForm.toFixed(9)} > 0; Tr(T)=${trace.toFixed(9)}`);
console.log(`  Wilson character: u(0.8)=${u.toFixed(9)} vs beta/4=${wc.leadingBetaOver4.toFixed(6)}`);
console.log("  exact 1+1D positivity and flux gap do not construct the 3+1D continuum theory");
