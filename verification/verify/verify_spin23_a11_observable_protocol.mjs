import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const protocol = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a11-observable-protocol.json", import.meta.url), "utf8"));
const { G2, G0, Gx } = protocol.syntheticFixtures.referenceStructures;
const sectors = protocol.design.holonomySectors;
const frequencies = protocol.syntheticFixtures.frequencyIndices;

const add = (A, B, a = 1, b = 1) => A.map((r, i) => r.map((x, j) => a * x + b * B[i][j]));
const scale = (a, A) => A.map(r => r.map(x => a * x));
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const multiply = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const congruence = (A, C) => multiply(multiply(A, C), transpose(A));
const det = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const trace = A => A[0][0] + A[1][1];
const inverse = A => scale(1 / det(A), [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]]);
const coords = A => [A[0][0], A[1][1], Math.SQRT2 * A[0][1]];
const dot = (x, y) => x.reduce((s, a, i) => s + a * y[i], 0);
const norm = x => Math.hypot(...x);
const cross = (x, y) => [x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]];
const normalize = x => scaleVector(1 / norm(x), x);
const scaleVector = (a, x) => x.map(v => a * v);
const subtractVector = (x, y) => x.map((v, i) => v - y[i]);
const rho = C => det(C) / trace(C) ** 2;
const relativePsdMargin = C => {
  const discriminant = Math.sqrt((C[0][0] - C[1][1]) ** 2 + 4 * C[0][1] ** 2);
  return (trace(C) - discriminant) / (2 * Math.max(trace(C), Number.EPSILON));
};
const matrixSum = terms => terms.reduce((A, [a, B]) => add(A, B, 1, a), [[0, 0], [0, 0]]);

function matrixRank(vectors, tolerance = 1e-10) {
  const A = vectors.map(v => [...v]);
  let rank = 0;
  for (let col = 0; col < A[0].length && rank < A.length; col += 1) {
    let pivot = rank;
    for (let row = rank + 1; row < A.length; row += 1) if (Math.abs(A[row][col]) > Math.abs(A[pivot][col])) pivot = row;
    if (Math.abs(A[pivot][col]) <= tolerance) continue;
    [A[rank], A[pivot]] = [A[pivot], A[rank]];
    const p = A[rank][col];
    for (let j = col; j < A[rank].length; j += 1) A[rank][j] /= p;
    for (let row = 0; row < A.length; row += 1) {
      if (row === rank) continue;
      const f = A[row][col];
      for (let j = col; j < A[row].length; j += 1) A[row][j] -= f * A[rank][j];
    }
    rank += 1;
  }
  return rank;
}

const wedge = cross(coords(G2), coords(G0));
assert.ok(norm(wedge) > protocol.identifiability.minimumReferenceWedgeNorm);
const w = normalize(wedge);
assert.equal(matrixRank([coords(G2), coords(G0)]), protocol.identifiability.referencePlaneRank);
assert.ok(det(G2) > 0 && det(G0) > 0 && det(Gx) > 0);
assert.ok(Math.abs(dot(w, coords(Gx))) > 1e-3, "Gx must be transverse to the frozen plane");

function buildFixture(kind) {
  return frequencies.map(fi => sectors.map(h => {
    const theta = 2 * Math.PI * h / 3;
    const a = (1 + 0.2 * fi) * (1 + 0.03 * Math.cos(theta));
    const b = (0.7 + 0.1 * fi) * (1 + 0.02 * Math.sin(theta));
    const gamma = kind === "positive" ? 0.18 * (1 + 0.1 * fi) * (1 + 0.6 * Math.cos(theta + Math.PI / 6)) : 0;
    return matrixSum([[a, G2], [b, G0], [gamma, Gx]]);
  }));
}

function statistics(fixture) {
  const byFrequency = fixture.map(responses => {
    for (const C of responses) {
      assert.ok(relativePsdMargin(C) >= -protocol.thresholds.epsilonPsdRelative);
      assert.ok(rho(C) >= -1e-12 && rho(C) <= 0.25 + 1e-12);
    }
    const Dc = matrixSum(responses.map((C, h) => [(2 / 3) * Math.cos(2 * Math.PI * h / 3), C]));
    const Ds = matrixSum(responses.map((C, h) => [(2 / 3) * Math.sin(2 * Math.PI * h / 3), C]));
    const meanNorm = responses.reduce((s, C) => s + norm(coords(C)), 0) / responses.length;
    const transverseAmplitude = Math.hypot(dot(w, coords(Dc)), dot(w, coords(Ds))) / meanNorm;
    return {
      transverseAmplitude,
      residuals: responses.map(C => dot(w, coords(C)) / norm(coords(C))),
      rho: responses.map(rho),
      rank: matrixRank(responses.map(coords))
    };
  });
  return { byFrequency, globalRank: matrixRank(fixture.flat().map(coords)) };
}

const nullFixture = buildFixture("null");
const positiveFixture = buildFixture("positive");
const nullStats = statistics(nullFixture);
const positiveStats = statistics(positiveFixture);

assert.equal(nullStats.globalRank, 2);
assert.ok(nullStats.byFrequency.every(x => x.transverseAmplitude < protocol.thresholds.maximumShamTransverseAmplitude));
assert.equal(positiveStats.globalRank, 3);
assert.ok(positiveStats.byFrequency.filter(x => x.transverseAmplitude > protocol.thresholds.minimumPositiveTransverseAmplitude).length >= protocol.identifiability.minimumFrequenciesPassing);

// A sector-independent local/contact term cancels exactly in sector contrasts.
const K = protocol.syntheticFixtures.commonContactMatrix;
for (const responses of positiveFixture) {
  const raw = responses.map(C => add(C, K));
  for (let h = 1; h < sectors.length; h += 1) {
    const spectralContrast = add(responses[h], responses[0], 1, -1);
    const rawContrast = add(raw[h], raw[0], 1, -1);
    assert.ok(norm(subtractVector(coords(spectralContrast), coords(rawContrast))) < 1e-12);
  }
}

// Common nonsingular probe recalibration preserves rank and relative congruence invariants.
const A = protocol.syntheticFixtures.commonCalibrationMap;
assert.ok(Math.abs(det(A)) > protocol.identifiability.calibrationMapMinimumAbsoluteDeterminant);
const calibrated = positiveFixture.map(row => row.map(C => congruence(A, C)));
assert.equal(matrixRank(calibrated.flat().map(coords)), positiveStats.globalRank);
for (let fi = 0; fi < frequencies.length; fi += 1) {
  const C0 = positiveFixture[fi][0];
  const AC0 = calibrated[fi][0];
  for (let h = 1; h < sectors.length; h += 1) {
    const C = positiveFixture[fi][h];
    const AC = calibrated[fi][h];
    assert.ok(Math.abs(det(C) / det(C0) - det(AC) / det(AC0)) < 1e-10);
    assert.ok(Math.abs(trace(multiply(inverse(C0), C)) - trace(multiply(inverse(AC0), AC))) < 1e-10);
  }
}

assert.equal(protocol.claimBoundary.microscopicDefectToStressCouplingDerived, false);
assert.equal(protocol.claimBoundary.physicalDataAvailable, false);
assert.equal(protocol.claimBoundary.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  protocolId: protocol.protocolId,
  referencePlaneRank: 2,
  nullFixtureRank: nullStats.globalRank,
  positiveFixtureRank: positiveStats.globalRank,
  maximumNullTransverseAmplitude: Math.max(...nullStats.byFrequency.map(x => x.transverseAmplitude)),
  minimumPositiveTransverseAmplitude: Math.min(...positiveStats.byFrequency.map(x => x.transverseAmplitude)),
  positivityPreserved: true,
  commonContactContrastInvariant: true,
  commonCalibrationRankAndRelativeInvariantsPreserved: true,
  physicalAdmission: false
}, null, 2));
