import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-integral-hardware-basis-search-v1.json", import.meta.url), "utf8"
));
const K = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url), "utf8"
)).K.map((row) => row.map(BigInt));
assert.equal(record.schemaVersion, "leech-integral-hardware-basis-search-v1");
const n = K.length;

// Reproduce the declared pseudorandom input permutation independently.
let randomState = record.search.seed >>> 0;
const random = () => {
  randomState = (1664525 * randomState + 1013904223) >>> 0;
  return randomState / 2 ** 32;
};
let winningPermutation;
for (let trial = 0; trial <= record.winner.trialZeroBased; trial += 1) {
  const permutation = Array.from({length: n}, (_, i) => i);
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
  }
  if (trial === record.winner.trialZeroBased) winningPermutation = permutation;
}
assert.deepEqual(winningPermutation, record.winner.inputPermutationZeroBased);

const U = Array.from({length: n}, (_, i) =>
  Array.from({length: n}, (_, j) => i === winningPermutation[j] ? 1n : 0n));
const G = winningPermutation.map((i) => winningPermutation.map((j) => K[i][j]));
const gramSchmidt = () => {
  const mu = Array.from({length: n}, () => Array(n).fill(0));
  const norm = Array(n).fill(0);
  for (let i = 0; i < n; i += 1) {
    norm[i] = Number(G[i][i]);
    for (let j = 0; j < i; j += 1) {
      let value = Number(G[i][j]);
      for (let k = 0; k < j; k += 1) value -= mu[i][k] * mu[j][k] * norm[k];
      mu[i][j] = value / norm[j];
      norm[i] -= mu[i][j] ** 2 * norm[j];
    }
  }
  return {mu, norm};
};
const reduceColumn = (target, source, coefficient) => {
  const q = BigInt(coefficient);
  const oldTargetSource = G[target][source];
  const oldTargetTarget = G[target][target];
  for (let row = 0; row < n; row += 1) U[row][target] -= q * U[row][source];
  for (let index = 0; index < n; index += 1) if (index !== target) {
    const value = G[index][target] - q * G[index][source];
    G[index][target] = G[target][index] = value;
  }
  G[target][target] = oldTargetTarget - 2n * q * oldTargetSource + q * q * G[source][source];
};
const swapColumns = (first, second) => {
  for (let row = 0; row < n; row += 1) [U[row][first], U[row][second]] = [U[row][second], U[row][first]];
  [G[first], G[second]] = [G[second], G[first]];
  for (let row = 0; row < n; row += 1) [G[row][first], G[row][second]] = [G[row][second], G[row][first]];
};
let cursor = 1;
let iterations = 0;
while (cursor < n) {
  iterations += 1;
  let decomposition = gramSchmidt();
  for (let source = cursor - 1; source >= 0; source -= 1) {
    const coefficient = Math.round(decomposition.mu[cursor][source]);
    if (coefficient !== 0) {
      reduceColumn(cursor, source, coefficient);
      decomposition = gramSchmidt();
    }
  }
  const mu = decomposition.mu[cursor][cursor - 1];
  if (decomposition.norm[cursor]
    >= (record.winner.lovaszDelta - mu ** 2) * decomposition.norm[cursor - 1]) cursor += 1;
  else { swapColumns(cursor, cursor - 1); cursor = Math.max(1, cursor - 1); }
}
assert.equal(iterations, record.winner.lllIterations);

// Verify U^T K U exactly.
for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
  let value = 0n;
  for (let a = 0; a < n; a += 1) for (let b = 0; b < n; b += 1) value += U[a][i] * K[a][b] * U[b][j];
  assert.equal(value, G[i][j]);
}

// Bareiss determinant certificate for unimodularity.
const determinantMatrix = U.map((row) => [...row]);
let sign = 1n;
let previousPivot = 1n;
for (let k = 0; k < n - 1; k += 1) {
  let pivotRow = k;
  while (pivotRow < n && determinantMatrix[pivotRow][k] === 0n) pivotRow += 1;
  assert.ok(pivotRow < n);
  if (pivotRow !== k) {
    [determinantMatrix[k], determinantMatrix[pivotRow]] = [determinantMatrix[pivotRow], determinantMatrix[k]];
    sign = -sign;
  }
  const pivot = determinantMatrix[k][k];
  for (let i = k + 1; i < n; i += 1) for (let j = k + 1; j < n; j += 1) {
    determinantMatrix[i][j] = (determinantMatrix[i][j] * pivot
      - determinantMatrix[i][k] * determinantMatrix[k][j]) / previousPivot;
  }
  previousPivot = pivot;
}
const determinant = sign * determinantMatrix[n - 1][n - 1];
assert.ok(determinant === 1n || determinant === -1n);

const spectrum = (input) => {
  const work = input.map((row) => row.map(Number));
  for (let step = 0; step < 200000; step += 1) {
    let p = 0; let q = 1; let largest = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(work[i][j]) > largest) { largest = Math.abs(work[i][j]); p = i; q = j; }
    }
    if (largest < 1e-14) break;
    const angle = 0.5 * Math.atan2(2 * work[p][q], work[q][q] - work[p][p]);
    const c = Math.cos(angle); const s = Math.sin(angle);
    const pp = work[p][p]; const qq = work[q][q]; const pq = work[p][q];
    work[p][p] = c ** 2 * pp - 2 * s * c * pq + s ** 2 * qq;
    work[q][q] = s ** 2 * pp + 2 * s * c * pq + c ** 2 * qq;
    work[p][q] = work[q][p] = 0;
    for (let k = 0; k < n; k += 1) if (k !== p && k !== q) {
      const kp = work[k][p]; const kq = work[k][q];
      work[k][p] = work[p][k] = c * kp - s * kq;
      work[k][q] = work[q][k] = s * kp + c * kq;
    }
  }
  const values = work.map((row, i) => row[i]).sort((a, b) => a - b);
  return {minimum: values[0], maximum: values.at(-1), condition: values.at(-1) / values[0]};
};
const winnerSpectrum = spectrum(G);
const baselineSpectrum = spectrum(K);
assert.ok(Math.abs(winnerSpectrum.minimum - record.winner.minimumEigenvalue) < 2e-12);
assert.ok(Math.abs(winnerSpectrum.maximum - record.winner.maximumEigenvalue) < 2e-12);
assert.ok(Math.abs(winnerSpectrum.condition - record.winner.conditionNumber) < 2e-8);
assert.ok(Math.abs(baselineSpectrum.condition - record.baseline.conditionNumber) < 2e-8);
assert.ok(Math.abs(baselineSpectrum.condition / winnerSpectrum.condition
  - record.winner.conditionImprovementFactor) < 2e-10);

const diagonal = G.map((row, i) => Number(row[i]));
assert.ok(diagonal.every((value) => value === record.winner.allBasisVectorNorms));
let offDiagonalPairs = 0;
let gramMax = 0n;
let transformNonzero = 0;
let transformMax = 0n;
for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
  const ga = G[i][j] < 0n ? -G[i][j] : G[i][j];
  const ua = U[i][j] < 0n ? -U[i][j] : U[i][j];
  if (i < j && G[i][j] !== 0n) offDiagonalPairs += 1;
  if (ga > gramMax) gramMax = ga;
  if (U[i][j] !== 0n) transformNonzero += 1;
  if (ua > transformMax) transformMax = ua;
}
assert.equal(offDiagonalPairs, record.winner.offDiagonalNonzeroPairs);
assert.equal(Number(gramMax), record.winner.gramMaximumAbsoluteEntry);
assert.equal(transformNonzero, record.winner.unimodularTransformNonzeroEntries);
assert.equal(Number(transformMax), record.winner.unimodularTransformMaximumAbsoluteEntry);
assert.equal(record.search.globalOptimalityClaimed, false);

console.log(JSON.stringify({
  status: "PASS",
  determinant: determinant.toString(),
  baselineCondition: baselineSpectrum.condition,
  winnerCondition: winnerSpectrum.condition,
  improvementFactor: baselineSpectrum.condition / winnerSpectrum.condition,
  basisVectorNorms: [...new Set(diagonal)],
  offDiagonalPairs,
  transformNonzero,
  boundary: record.boundary
}));
