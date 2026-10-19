import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const spec = JSON.parse(await readFile(new URL("../../evidence/data/spin23-xi-normalization-exhaustion.json", import.meta.url), "utf8"));
assert.equal(spec.documentId, 1396);
const xiConformal = d => (d - 2) / (4 * (d - 1));
assert.ok(Math.abs(xiConformal(3) - 1 / 8) < spec.acceptance.maximumConformalFormulaError);
assert.ok(Math.abs(xiConformal(4) - 1 / 6) < spec.acceptance.maximumConformalFormulaError);
assert.notEqual(xiConformal(3), xiConformal(4));

const { sitesPerCycle: N, mass: M, beta } = spec.parameters;
const theta = h => 2 * Math.PI * h / 3;
const coth = x => 1 / Math.tanh(x);
const add = (A, B, ca = 1, cb = 1) => [
  [ca * A[0][0] + cb * B[0][0], ca * A[0][1] + cb * B[0][1]],
  [ca * A[1][0] + cb * B[1][0], ca * A[1][1] + cb * B[1][1]]
];
const scale = (A, c) => A.map(row => row.map(x => c * x));
const frob = A => Math.hypot(A[0][0], A[1][1], Math.SQRT2 * A[0][1]);
const exchange = A => [[A[1][1], A[1][0]], [A[0][1], A[0][0]]];
const outer = (v, w) => [[w * v[0] ** 2, w * v[0] * v[1]], [w * v[0] * v[1], w * v[1] ** 2]];

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
const vertex = (m, xi) => [(m.Kx + (2 * xi - 1) * m.E ** 2) / m.E, (m.Ky + (2 * xi - 1) * m.E ** 2) / m.E];
const integrated = (h, xi, orientation = "x") => modes(h, orientation).reduce((S, m) => add(S, outer(vertex(m, xi), m.thermal)), [[0, 0], [0, 0]]);
const orientationOdd = xi => scale(add(integrated(1, xi, "x"), integrated(1, xi, "y"), 1, -1), 0.5);

// Minimal and conformal values are both admissible choices and yield different
// trace-traceless cross responses; neither is selected by the present action.
const candidateResponses = {
  minimal: orientationOdd(0),
  conformal3d: orientationOdd(xiConformal(3)),
  bulkConformal4dImportedWithoutMatching: orientationOdd(xiConformal(4))
};
assert.ok(frob(add(candidateResponses.minimal, candidateResponses.conformal3d, 1, -1)) > 1e-6);

// An allowed xi exists that erases the integrated third direction.
const D0 = orientationOdd(0);
const D1 = orientationOdd(1);
const slope = D1[0][0] - D0[0][0];
const xiRoot = -D0[0][0] / slope;
const rootResidual = frob(orientationOdd(xiRoot));
assert.ok(rootResidual < spec.acceptance.maximumRootResidual);

// The traceless matrix element and its support remain xi independent.
let maximumTracelessXiDrift = 0;
for (const m of modes(1)) {
  const reference = (m.Kx - m.Ky) / m.E;
  for (const xi of [-4, 0, 1 / 8, 1 / 6, xiRoot, 4]) {
    const v = vertex(m, xi);
    maximumTracelessXiDrift = Math.max(maximumTracelessXiDrift, Math.abs((v[0] - v[1]) - reference));
  }
}
assert.ok(maximumTracelessXiDrift < spec.acceptance.maximumTracelessXiDrift);
const firstTracelessThreshold = h => Math.min(...modes(h).filter(m => Math.abs(m.Kx - m.Ky) > 1e-12).map(m => m.omega));
const thresholds = [0, 1, 2].map(firstTracelessThreshold);
assert.ok(thresholds[0] - thresholds[1] > spec.acceptance.minimumThresholdSeparation);
assert.ok(Math.abs(thresholds[1] - thresholds[2]) < 1e-12);
assert.deepEqual(thresholds, [spec.responseVerdict.robustThresholdsForFixture.h0, spec.responseVerdict.robustThresholdsForFixture.h1, spec.responseVerdict.robustThresholdsForFixture.h2]);

// RG fixed-point structure does not determine a finite-scale value without a
// trajectory/boundary condition. Two UV values remain distinct at finite flow time.
const runLinearized = (xi0, xiStar, gamma, logMuRatio) => xiStar + (xi0 - xiStar) * Math.exp(gamma * logMuRatio);
const xiAtScaleA = runLinearized(0, 1 / 8, 0.3, -2);
const xiAtScaleB = runLinearized(0.4, 1 / 8, 0.3, -2);
assert.notEqual(xiAtScaleA, xiAtScaleB);

const principles = new Map(spec.principles.map(p => [p.id, p]));
for (const id of ["minimal-coupling", "defect-conformal-coupling", "curved-space-rg", "spectral-action", "defect-weyl-symmetry", "equivalence-principle"]) {
  assert.equal(principles.get(id).fixesXiInCurrentProgramme, false);
}
assert.equal(principles.get("operational-renormalization").fixesXiInCurrentProgramme, true);
assert.equal(principles.get("operational-renormalization").predictsXi, false);
assert.equal(spec.claimBoundary.xiPredicted, false);
assert.equal(spec.claimBoundary.betaXiComputed, false);
assert.equal(spec.claimBoundary.thirdMatrixDirectionSchemeInvariant, false);
assert.equal(spec.claimBoundary.tracelessThresholdSchemeInvariant, true);
assert.equal(spec.claimBoundary.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: spec.documentId,
  conformalXi3d: xiConformal(3),
  conformalXi4d: xiConformal(4),
  candidateOrientationOddMatrices: candidateResponses,
  improvementThatErasesIntegratedThirdDirection: xiRoot,
  rootResidual,
  maximumTracelessXiDrift,
  schemeInvariantTracelessThresholds: { h0: thresholds[0], h1: thresholds[1], h2: thresholds[2] },
  illustrativeRunningFromXi0: xiAtScaleA,
  illustrativeRunningFromXiPoint4: xiAtScaleB,
  currentPrinciplesPredictXi: false,
  operationalConditionCanFixButNotPredictXi: true,
  robustPrimaryObservable: spec.stoppingRule.defaultPrimaryObservable,
  physicalAdmission: false
}, null, 2));

