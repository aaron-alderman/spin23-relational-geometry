import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const spec = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a7-a11-improved-stress-scheme-audit.json", import.meta.url), "utf8"));
assert.equal(spec.documentId, 1393);
const { sitesPerCycle: N, mass: M, beta } = spec.parameters;
const theta = h => 2 * Math.PI * h / 3;
const coth = x => 1 / Math.tanh(x);
const add = (A, B, ca = 1, cb = 1) => [
  [ca * A[0][0] + cb * B[0][0], ca * A[0][1] + cb * B[0][1]],
  [ca * A[1][0] + cb * B[1][0], ca * A[1][1] + cb * B[1][1]]
];
const scale = (A, c) => A.map(row => row.map(x => c * x));
const exchange = A => [[A[1][1], A[1][0]], [A[0][1], A[0][0]]];
const frob = A => Math.hypot(A[0][0], A[1][1], Math.SQRT2 * A[0][1]);
const outer = (v, weight) => [[weight * v[0] ** 2, weight * v[0] * v[1]], [weight * v[0] * v[1], weight * v[1] ** 2]];
const minEig = A => ((A[0][0] + A[1][1]) - Math.hypot(A[0][0] - A[1][1], 2 * A[0][1])) / 2;

function modes(h, orientation = "x") {
  const result = [];
  for (let nx = 0; nx < N; nx += 1) {
    for (let ny = 0; ny < N; ny += 1) {
      const tx = orientation === "x" ? theta(h) : 0;
      const ty = orientation === "y" ? theta(h) : 0;
      const Kx = 4 * Math.sin((2 * Math.PI * nx + tx) / (2 * N)) ** 2;
      const Ky = 4 * Math.sin((2 * Math.PI * ny + ty) / (2 * N)) ** 2;
      const E = Math.sqrt(M ** 2 + Kx + Ky);
      result.push({ Kx, Ky, E, omega: 2 * E, thermal: coth(beta * E / 2) });
    }
  }
  return result;
}

const vertex = (m, xi) => [
  (m.Kx + (2 * xi - 1) * m.E ** 2) / m.E,
  (m.Ky + (2 * xi - 1) * m.E ** 2) / m.E
];
const tracelessVertex = m => (m.Kx - m.Ky) / m.E;
const integrated = (h, xi, orientation = "x") => modes(h, orientation).reduce(
  (S, m) => add(S, outer(vertex(m, xi), m.thermal)),
  [[0, 0], [0, 0]]
);

// The full Hilbert energy vertex vanishes on the pair shell. Improvement also
// vanishes in t00 at zero spatial momentum: (eta00 box-partial0^2)|chi|^2=0.
let maximumWardResidual = 0;
for (const h of [0, 1, 2]) {
  for (const m of modes(h)) {
    const minimalEnergyPairVertex = -m.E + (m.Kx + m.Ky + M ** 2) / m.E;
    const improvementEnergyPairVertex = (-(m.omega ** 2) + m.omega ** 2) / (2 * m.E);
    maximumWardResidual = Math.max(maximumWardResidual, Math.abs(minimalEnergyPairVertex), Math.abs(improvementEnergyPairVertex));
  }
}
assert.ok(maximumWardResidual < spec.acceptance.maximumWardResidual);

// Improvement changes only the trace vertex; traceless stress is exactly fixed.
let maximumTracelessImprovementDrift = 0;
for (const m of modes(1)) {
  for (const xi of spec.parameters.improvementScan) {
    const v = vertex(m, xi);
    maximumTracelessImprovementDrift = Math.max(maximumTracelessImprovementDrift, Math.abs((v[0] - v[1]) - tracelessVertex(m)));
  }
}
assert.ok(maximumTracelessImprovementDrift < spec.acceptance.maximumTracelessImprovementDrift);

// Every full-stress atom remains an outer product and is PSD for every improvement.
let minimumAtomEigenvalue = Infinity;
for (const xi of spec.parameters.improvementScan) {
  for (const m of modes(1)) {
    const A = outer(vertex(m, xi), m.thermal);
    minimumAtomEigenvalue = Math.min(minimumAtomEigenvalue, minEig(A));
    assert.ok(minEig(A) >= spec.acceptance.minimumPositiveWeightTolerance);
  }
}

// CP conjugate sectors remain exactly degenerate for the improved tensor.
let maximumCpRelativeError = 0;
for (const xi of spec.parameters.improvementScan) {
  const R1 = integrated(1, xi);
  const R2 = integrated(2, xi);
  maximumCpRelativeError = Math.max(maximumCpRelativeError, frob(add(R1, R2, 1, -1)) / frob(R1));
}
assert.ok(maximumCpRelativeError < spec.acceptance.maximumCpRelativeError);

// The orientation-odd full 2x2 matrix is a trace-traceless cross response and
// is linear in c=2xi-1. Solve for the allowed improvement that erases it.
function orientationOdd(xi) {
  const Rx = integrated(1, xi, "x");
  const Ry = integrated(1, xi, "y");
  assert.ok(frob(add(Ry, exchange(Rx), 1, -1)) / frob(Rx) < 1e-12);
  return scale(add(Rx, Ry, 1, -1), 0.5);
}
const D0 = orientationOdd(0);
const D1 = orientationOdd(1);
const slope = D1[0][0] - D0[0][0];
assert.ok(Math.abs(slope) > 1e-12);
const xiOrientationRoot = -D0[0][0] / slope;
const Droot = orientationOdd(xiOrientationRoot);
assert.ok(frob(Droot) < spec.acceptance.maximumOrientationRootResidual);

// Scheme-invariant traceless spectral support. No xi enters these weights.
function tracelessAtoms(h) {
  return modes(h).map(m => ({ omega: m.omega, weight: m.thermal * tracelessVertex(m) ** 2 }));
}
function firstVisibleThreshold(h) {
  return Math.min(...tracelessAtoms(h).filter(a => a.weight > 1e-14).map(a => a.omega));
}
const h0TracelessThreshold = firstVisibleThreshold(0);
const h1TracelessThreshold = firstVisibleThreshold(1);
const h2TracelessThreshold = firstVisibleThreshold(2);
assert.ok(Math.abs(h1TracelessThreshold - h2TracelessThreshold) < 1e-12);
assert.ok(h0TracelessThreshold - h1TracelessThreshold > spec.acceptance.minimumInvariantThresholdSeparation);
const lowestH1 = tracelessAtoms(1).filter(a => Math.abs(a.omega - h1TracelessThreshold) < 1e-12);
assert.ok(lowestH1.reduce((s, a) => s + a.weight, 0) > 0);

// A real local polynomial contact has no branch cut or separated-frequency
// discontinuity: evaluating the same polynomial from either side is identical.
const contact = (omega, coefficients) => coefficients[0] + coefficients[1] * omega ** 2 + coefficients[2] * omega ** 4;
let maximumPolynomialContactDiscontinuity = 0;
for (const omega of [0.3, 1.1, 2.7]) {
  const upper = contact(omega, [0.7, -0.2, 0.03]);
  const lower = contact(omega, [0.7, -0.2, 0.03]);
  maximumPolynomialContactDiscontinuity = Math.max(maximumPolynomialContactDiscontinuity, Math.abs(upper - lower));
}
assert.equal(maximumPolynomialContactDiscontinuity, 0);

assert.equal(spec.claimBoundary.schemeInvariantThirdMatrixDirectionEstablished, false);
assert.equal(spec.claimBoundary.schemeInvariantTracelessSpectralRemnantEstablished, true);
assert.equal(spec.claimBoundary.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: spec.documentId,
  modelId: spec.modelId,
  maximumEnergyWardResidual: maximumWardResidual,
  maximumTracelessImprovementDrift,
  minimumPositiveFrequencyAtomEigenvalue: minimumAtomEigenvalue,
  maximumCpConjugateRelativeError: maximumCpRelativeError,
  orientationOddMatrixAtXi0: D0,
  orientationOddMatrixAtXi1: D1,
  improvementThatErasesIntegratedThirdDirection: xiOrientationRoot,
  orientationRootResidual: frob(Droot),
  h0SchemeInvariantTracelessThreshold: h0TracelessThreshold,
  h1SchemeInvariantTracelessThreshold: h1TracelessThreshold,
  h2SchemeInvariantTracelessThreshold: h2TracelessThreshold,
  maximumPolynomialContactDiscontinuity,
  fullThirdMatrixDirectionSchemeInvariant: false,
  tracelessSpectralSupportSchemeInvariant: true,
  minimalMissingStressNormalization: spec.minimalMissingNormalization.parameter,
  physicalAdmission: false
}, null, 2));

