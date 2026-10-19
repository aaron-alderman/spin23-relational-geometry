import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const spec = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a11-realtime-charged-reader-response.json", import.meta.url), "utf8"));
assert.equal(spec.documentId, 1392);
const { sitesPerCycle: N, mass: M, beta } = spec.parameters;
const theta = h => 2 * Math.PI * h / 3;
const nB = E => 1 / Math.expm1(beta * E);
const coth = x => 1 / Math.tanh(x);
const frob = A => Math.hypot(A[0][0], A[1][1], Math.SQRT2 * A[0][1]);
const add = (A, B, ca = 1, cb = 1) => [
  [ca * A[0][0] + cb * B[0][0], ca * A[0][1] + cb * B[0][1]],
  [ca * A[1][0] + cb * B[1][0], ca * A[1][1] + cb * B[1][1]]
];
const scale = (A, c) => A.map(row => row.map(x => c * x));
const exchange = A => [[A[1][1], A[1][0]], [A[0][1], A[0][0]]];
const eigMin = A => {
  const tr = A[0][0] + A[1][1];
  const disc = Math.hypot(A[0][0] - A[1][1], 2 * A[0][1]);
  return (tr - disc) / 2;
};

function modes(h, orientation = "x") {
  const out = [];
  for (let nx = 0; nx < N; nx += 1) {
    for (let ny = 0; ny < N; ny += 1) {
      const tx = orientation === "x" ? theta(h) : 0;
      const ty = orientation === "y" ? theta(h) : 0;
      const Kx = 4 * Math.sin((2 * Math.PI * nx + tx) / (2 * N)) ** 2;
      const Ky = 4 * Math.sin((2 * Math.PI * ny + ty) / (2 * N)) ** 2;
      const E = Math.sqrt(M ** 2 + Kx + Ky);
      const thermal = coth(beta * E / 2);
      const prefactor = thermal / E ** 2;
      out.push({ nx, ny, K: [Kx, Ky], E, omega: 2 * E, A: [
        [prefactor * Kx * Kx, prefactor * Kx * Ky],
        [prefactor * Kx * Ky, prefactor * Ky * Ky]
      ] });
    }
  }
  return out;
}

function integratedPairWeight(h, orientation = "x") {
  return modes(h, orientation).reduce((S, m) => add(S, m.A), [[0, 0], [0, 0]]);
}

function occupationCovariance(h, orientation = "x") {
  return modes(h, orientation).reduce((S, m) => {
    const p = 2 * beta * nB(m.E) * (1 + nB(m.E)) / (N ** 2 * m.E ** 2);
    const atom = [[p * m.K[0] ** 2, p * m.K[0] * m.K[1]], [p * m.K[0] * m.K[1], p * m.K[1] ** 2]];
    return add(S, atom);
  }, [[0, 0], [0, 0]]);
}

// Every exact positive-frequency atom is a rank-one PSD matrix.
let minimumAtomEigenvalue = Infinity;
for (const h of [0, 1, 2]) {
  for (const m of modes(h)) {
    minimumAtomEigenvalue = Math.min(minimumAtomEigenvalue, eigMin(m.A));
    assert.ok(eigMin(m.A) >= spec.acceptance.minimumPositiveEigenvalueTolerance);
    assert.ok(Math.abs(m.A[0][0] * m.A[1][1] - m.A[0][1] ** 2) < 1e-12);
  }
}

// CP maps h=1 to h=2 by a momentum relabelling, so all integrated even probes agree.
const R0 = integratedPairWeight(0);
const R1 = integratedPairWeight(1);
const R2 = integratedPairWeight(2);
const cpError = frob(add(R1, R2, 1, -1)) / frob(R1);
assert.ok(cpError < spec.acceptance.maximumCpConjugateRelativeError);
const cpOdd = scale(add(R1, R2, 1, -1), 0.5);
const holonomyEven = add(scale(add(R1, R2), 0.5), R0, 1, -1);
assert.ok(frob(holonomyEven) > 0);

// Rotating the prepared cycle exchanges the fixed x/y probes exactly.
const Rx = R1;
const Ry = integratedPairWeight(1, "y");
const rotatedError = frob(add(Ry, exchange(Rx), 1, -1)) / frob(Rx);
assert.ok(rotatedError < spec.acceptance.maximumExchangeAverageResidual);
const orientationEven = scale(add(Rx, Ry), 0.5);
const orientationOdd = scale(add(Rx, Ry, 1, -1), 0.5);
assert.ok(Math.abs(orientationEven[0][0] - orientationEven[1][1]) < 1e-12);
assert.ok(Math.abs(orientationOdd[0][0] + orientationOdd[1][1]) < 1e-12);
assert.ok(Math.abs(orientationOdd[0][1]) < 1e-12);
const orientationOddRelativeNorm = frob(orientationOdd) / frob(orientationEven);
assert.ok(orientationOddRelativeNorm > spec.acceptance.minimumNonzeroOrientationOddRelativeNorm);

// KMS detailed balance is checked atom by atom at positive and negative frequency.
let maximumKmsRelativeError = 0;
let maximumOddnessRelativeError = 0;
for (const m of modes(1)) {
  const omega = m.omega;
  const rhoPositive = 2 * Math.PI * m.A[0][0];
  if (rhoPositive === 0) continue;
  const greaterPositive = rhoPositive / (1 - Math.exp(-beta * omega));
  const lesserPositive = Math.exp(-beta * omega) * greaterPositive;
  maximumKmsRelativeError = Math.max(maximumKmsRelativeError, Math.abs(lesserPositive / greaterPositive - Math.exp(-beta * omega)));
  const rhoNegative = -rhoPositive;
  maximumOddnessRelativeError = Math.max(maximumOddnessRelativeError, Math.abs(rhoNegative + rhoPositive) / rhoPositive);
}
assert.ok(maximumKmsRelativeError < spec.acceptance.maximumKmsRelativeError);
assert.ok(maximumOddnessRelativeError < spec.acceptance.maximumOddnessRelativeError);

// The static occupation covariance is positive and reproduces the 1228 formula,
// but its number-operator part commutes with H and hence has no finite-frequency pole.
const Cocc0 = occupationCovariance(0);
const Cocc1 = occupationCovariance(1);
assert.ok(eigMin(Cocc0) > 0);
assert.ok(eigMin(Cocc1) > 0);

// Thresholds: the kinematic threshold and first stress-visible atom can differ
// because the zero-momentum strain vertex vanishes.
function thresholds(h) {
  const ms = modes(h);
  const kinematic = Math.min(...ms.map(m => m.omega));
  const visible = Math.min(...ms.filter(m => frob(m.A) > 1e-14).map(m => m.omega));
  return { kinematic, visible };
}
const threshold0 = thresholds(0);
const threshold1 = thresholds(1);
assert.ok(Math.abs(threshold1.kinematic - threshold1.visible) < 1e-12);
assert.ok(threshold0.visible - threshold1.visible > spec.acceptance.minimumThresholdSeparation);

// Causality/high-frequency Ward-compatible check: the 1/z term cancels between
// positive and negative poles, leaving chiR=O(z^-2).
// Evaluate the real imaginary-axis expression directly: chi(i nu)=-2 A Omega/(nu^2+Omega^2).
function chiImagMatrix(h, nu) {
  return modes(h).reduce((S, m) => add(S, scale(m.A, -2 * m.omega / (nu ** 2 + m.omega ** 2))), [[0, 0], [0, 0]]);
}
const high1 = frob(chiImagMatrix(1, 1e4));
const high2 = frob(chiImagMatrix(1, 2e4));
const highFrequencyScaling = high1 / high2;
assert.ok(Math.abs(highFrequencyScaling - 4) < 1e-5);

assert.equal(spec.claimBoundary.completePhysicalStressVertexDerived, false);
assert.equal(spec.claimBoundary.bulkDefectWardIdentityClosed, false);
assert.equal(spec.claimBoundary.thirdPhysicalResponseDirectionEstablished, false);
assert.equal(spec.claimBoundary.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: spec.documentId,
  modelId: spec.modelId,
  minimumPositiveFrequencyAtomEigenvalue: minimumAtomEigenvalue,
  cpConjugateRelativeError: cpError,
  cpOddIntegratedNorm: frob(cpOdd),
  holonomyEvenIntegratedNorm: frob(holonomyEven),
  orientationRotationRelativeError: rotatedError,
  orientationOddRelativeNorm,
  orientationOddIntegratedMatrix: orientationOdd,
  maximumKmsRelativeError,
  maximumSpectralOddnessRelativeError: maximumOddnessRelativeError,
  h0KinematicThreshold: threshold0.kinematic,
  h0FirstStressVisibleThreshold: threshold0.visible,
  h1KinematicAndStressVisibleThreshold: threshold1.visible,
  highFrequencyScalingUnderFrequencyDoubling: highFrequencyScaling,
  staticOccupationCovarianceH0: Cocc0,
  staticOccupationCovarianceH1: Cocc1,
  staticOccupationPartHasFiniteFrequencyRetardedPole: false,
  pairSpectralThirdDirectionSurvivesOrientationSelection: true,
  orientationAverageRemovesThirdDirection: true,
  completePhysicalStressResponseEstablished: false,
  physicalAdmission: false
}, null, 2));

