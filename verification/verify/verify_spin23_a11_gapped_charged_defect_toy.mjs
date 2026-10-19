import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const spec = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a11-gapped-charged-defect-toy.json", import.meta.url), "utf8"));
const { mass, inverseTemperature: beta } = spec.parameters;
const sectors = spec.parameters.holonomySectors;

const add = (A, B, a = 1, b = 1) => A.map((r, i) => r.map((x, j) => a * x + b * B[i][j]));
const coords = C => [C[0][0], C[1][1], Math.SQRT2 * C[0][1]];
const dot = (x, y) => x.reduce((s, a, i) => s + a * y[i], 0);
const norm = x => Math.hypot(...x);
const det2 = C => C[0][0] * C[1][1] - C[0][1] ** 2;
const matrixDifference = (A, B) => norm(coords(add(A, B, 1, -1)));

function matrixRank(rows, tolerance = 1e-11) {
  const A = rows.map(row => [...row]);
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

function calculate({ N, m, betaValue, h, q = 1, orientation = "x" }) {
  let logZ = 0;
  const onePoint = [0, 0];
  const C = [[0, 0], [0, 0]];
  const theta = 2 * Math.PI * q * h / 3;
  for (let nx = 0; nx < N; nx += 1) for (let ny = 0; ny < N; ny += 1) {
    const twistX = orientation === "x" ? theta : 0;
    const twistY = orientation === "y" ? theta : 0;
    const kx = (2 * Math.PI * nx + twistX) / N;
    const ky = (2 * Math.PI * ny + twistY) / N;
    const px2 = 4 * Math.sin(kx / 2) ** 2;
    const py2 = 4 * Math.sin(ky / 2) ** 2;
    const E = Math.sqrt(m ** 2 + px2 + py2);
    const occupation = 1 / Math.expm1(betaValue * E);
    const stressCharge = [px2 / E, py2 / E];
    logZ += -2 * Math.log1p(-Math.exp(-betaValue * E));
    for (let a = 0; a < 2; a += 1) {
      onePoint[a] += 2 * occupation * stressCharge[a] / N ** 2;
      for (let b = 0; b < 2; b += 1) {
        C[a][b] += 2 * betaValue * occupation * (1 + occupation) * stressCharge[a] * stressCharge[b] / N ** 2;
      }
    }
  }
  return { logZ, onePoint, C };
}

const N = spec.parameters.latticeSitesPerDirection;
const results = sectors.map(h => calculate({ N, m: mass, betaValue: beta, h }));
const [r0, r1, r2] = results;

// Positive H2 response and exact square/exchange symmetry in the trivial sector.
for (const { C } of results) {
  assert.ok(C[0][0] > 0 && C[1][1] > 0);
  assert.ok(det2(C) > spec.acceptance.minimumPositiveDeterminant);
}
assert.ok(Math.abs(r0.C[0][0] - r0.C[1][1]) < spec.acceptance.maximumExchangeResidualTrivialSector);

// CP/time-reversal conjugate sectors are exactly degenerate in the CP-even regulator.
assert.ok(Math.abs(r1.logZ - r2.logZ) < spec.acceptance.maximumCpConjugateMatrixDifference);
assert.ok(matrixDifference(r1.C, r2.C) < spec.acceptance.maximumCpConjugateMatrixDifference);
assert.ok(norm(r1.onePoint.map((x, i) => x - r2.onePoint[i])) < spec.acceptance.maximumCpConjugateMatrixDifference);

// Both the partition function and local integrated stress covariance read h=0 versus h=1.
assert.ok(Math.abs(r0.logZ - r1.logZ) > spec.acceptance.minimumHolonomyPartitionDifference);
assert.ok(matrixDifference(r0.C, r1.C) > spec.acceptance.minimumHolonomyStressDifference);
assert.ok(norm(r0.onePoint.map((x, i) => x - r1.onePoint[i])) > spec.acceptance.minimumHolonomyStressDifference);

// Relative to the exchange-symmetric toy null plane, unequal diagonals are transverse.
const w = [1 / Math.SQRT2, -1 / Math.SQRT2, 0];
const Dc = results.reduce((M, r, h) => add(M, r.C, 1, (2 / 3) * Math.cos(2 * Math.PI * h / 3)), [[0, 0], [0, 0]]);
const Ds = results.reduce((M, r, h) => add(M, r.C, 1, (2 / 3) * Math.sin(2 * Math.PI * h / 3)), [[0, 0], [0, 0]]);
const meanNorm = results.reduce((s, r) => s + norm(coords(r.C)), 0) / 3;
const transverseAmplitude = Math.hypot(dot(w, coords(Dc)), dot(w, coords(Ds))) / meanNorm;
assert.ok(transverseAmplitude > spec.acceptance.minimumTransverseAmplitude);

// The three sectors still contain only two distinct matrices at fixed temperature.
assert.equal(matrixRank(results.map(r => coords(r.C))), 2);

// Charge-three matter is blind to residual Z3 holonomy.
const q3 = sectors.map(h => calculate({ N, m: mass, betaValue: beta, h, q: 3 }));
const q3Difference = Math.max(matrixDifference(q3[0].C, q3[1].C), matrixDifference(q3[0].C, q3[2].C));
assert.ok(q3Difference < spec.acceptance.maximumChargeThreeSectorDifference);

// Averaging otherwise identical x- and y-oriented preparations erases the transverse direction.
const xOriented = r1.C;
const yOriented = calculate({ N, m: mass, betaValue: beta, h: 1, orientation: "y" }).C;
const orientationAverage = add(xOriented, yOriented, 0.5, 0.5);
const orientationAveragedResidual = Math.abs(dot(w, coords(orientationAverage))) / norm(coords(orientationAverage));
assert.ok(orientationAveragedResidual < spec.acceptance.maximumOrientationAveragedResidual);

// Winding sensitivity decouples as either the cycle or the mass gap grows.
const anisotropy = (sites, mValue) => {
  const C = calculate({ N: sites, m: mValue, betaValue: beta, h: 1 }).C;
  return Math.abs(C[0][0] - C[1][1]);
};
const sizeSequence = [3, 6, 12].map(sites => anisotropy(sites, mass));
const massSequence = [0.8, 1.2, 1.6].map(mValue => anisotropy(N, mValue));
assert.ok(sizeSequence[0] > sizeSequence[1] && sizeSequence[1] > sizeSequence[2]);
assert.ok(massSequence[0] > massSequence[1] && massSequence[1] > massSequence[2]);

assert.equal(spec.claimBoundary.derivedFromTypedAction, false);
assert.equal(spec.claimBoundary.physicalCoefficientPredicted, false);
assert.equal(spec.claimBoundary.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: spec.documentId,
  modelId: spec.modelId,
  responses: results.map((r, h) => ({ h, logZ: r.logZ, onePointStress: r.onePoint, C: r.C, determinant: det2(r.C) })),
  cpConjugateMatrixDifference: matrixDifference(r1.C, r2.C),
  holonomyResponseDifference: matrixDifference(r0.C, r1.C),
  transverseAmplitude,
  fixedTemperatureHolonomySpanRank: matrixRank(results.map(r => coords(r.C))),
  chargeThreeSectorDifference: q3Difference,
  orientationAveragedResidual,
  anisotropyByCycleSites: Object.fromEntries([3, 6, 12].map((sites, i) => [sites, sizeSequence[i]])),
  anisotropyByMass: Object.fromEntries([0.8, 1.2, 1.6].map((mValue, i) => [mValue, massSequence[i]])),
  anisotropicLocalCouplingUsed: false,
  anisotropicHolonomyPreparationUsed: true,
  physicalAdmission: false
}, null, 2));
