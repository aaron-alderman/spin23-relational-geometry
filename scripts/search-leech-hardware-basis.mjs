#!/usr/bin/env node
import fs from "node:fs";

const K = JSON.parse(fs.readFileSync(
  new URL("../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url),
  "utf8"
)).K.map((row) => row.map(BigInt));
const n = K.length;
const trials = Number(process.argv[2] ?? 200);
const seed = Number(process.argv[3] ?? 1729) >>> 0;
const summaryOnly = process.argv.includes("--summary");

const identity = (permutation) => Array.from({length: n}, (_, i) =>
  Array.from({length: n}, (_, j) => i === permutation[j] ? 1n : 0n));
const initialGram = (permutation) => permutation.map((i) => permutation.map((j) => K[i][j]));

const gramSchmidt = (G) => {
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

const reduceColumn = (U, G, target, source, coefficient) => {
  const q = BigInt(coefficient);
  const oldTargetSource = G[target][source];
  const oldTargetTarget = G[target][target];
  for (let row = 0; row < n; row += 1) U[row][target] -= q * U[row][source];
  for (let index = 0; index < n; index += 1) {
    if (index === target) continue;
    const value = G[index][target] - q * G[index][source];
    G[index][target] = value;
    G[target][index] = value;
  }
  G[target][target] = oldTargetTarget - 2n * q * oldTargetSource + q * q * G[source][source];
};

const swapColumns = (U, G, first, second) => {
  for (let row = 0; row < n; row += 1) [U[row][first], U[row][second]] = [U[row][second], U[row][first]];
  [G[first], G[second]] = [G[second], G[first]];
  for (let row = 0; row < n; row += 1) [G[row][first], G[row][second]] = [G[row][second], G[row][first]];
};

const lll = (permutation, delta) => {
  const U = identity(permutation);
  const G = initialGram(permutation);
  let cursor = 1;
  let iterations = 0;
  while (cursor < n) {
    iterations += 1;
    if (iterations > 20000) throw new Error("LLL iteration guard exceeded");
    let decomposition = gramSchmidt(G);
    for (let source = cursor - 1; source >= 0; source -= 1) {
      const coefficient = Math.round(decomposition.mu[cursor][source]);
      if (coefficient !== 0) {
        reduceColumn(U, G, cursor, source, coefficient);
        decomposition = gramSchmidt(G);
      }
    }
    const mu = decomposition.mu[cursor][cursor - 1];
    if (decomposition.norm[cursor] >= (delta - mu ** 2) * decomposition.norm[cursor - 1]) {
      cursor += 1;
    } else {
      swapColumns(U, G, cursor, cursor - 1);
      cursor = Math.max(1, cursor - 1);
    }
  }
  return {U, G, iterations};
};

const symmetricSpectrum = (input) => {
  const work = input.map((row) => row.map(Number));
  for (let iteration = 0; iteration < 200000; iteration += 1) {
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(work[i][j]) > largest) { largest = Math.abs(work[i][j]); p = i; q = j; }
    }
    if (largest < 1e-13) break;
    const angle = 0.5 * Math.atan2(2 * work[p][q], work[q][q] - work[p][p]);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const pp = work[p][p];
    const qq = work[q][q];
    const pq = work[p][q];
    work[p][p] = cosine ** 2 * pp - 2 * sine * cosine * pq + sine ** 2 * qq;
    work[q][q] = sine ** 2 * pp + 2 * sine * cosine * pq + cosine ** 2 * qq;
    work[p][q] = work[q][p] = 0;
    for (let k = 0; k < n; k += 1) if (k !== p && k !== q) {
      const kp = work[k][p];
      const kq = work[k][q];
      work[k][p] = work[p][k] = cosine * kp - sine * kq;
      work[k][q] = work[q][k] = sine * kp + cosine * kq;
    }
  }
  const values = work.map((row, i) => row[i]).sort((a, b) => a - b);
  return {minimum: values[0], maximum: values.at(-1), condition: values.at(-1) / values[0]};
};

const complexity = (U, G) => {
  let gramOffDiagonalNonzero = 0;
  let gramMaximumAbsolute = 0n;
  let transformNonzero = 0;
  let transformMaximumAbsolute = 0n;
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    const gramAbsolute = G[i][j] < 0n ? -G[i][j] : G[i][j];
    if (i !== j && G[i][j] !== 0n) gramOffDiagonalNonzero += 1;
    if (gramAbsolute > gramMaximumAbsolute) gramMaximumAbsolute = gramAbsolute;
    const transformAbsolute = U[i][j] < 0n ? -U[i][j] : U[i][j];
    if (U[i][j] !== 0n) transformNonzero += 1;
    if (transformAbsolute > transformMaximumAbsolute) transformMaximumAbsolute = transformAbsolute;
  }
  return {
    gramOffDiagonalPairs: gramOffDiagonalNonzero / 2,
    gramMaximumAbsolute: Number(gramMaximumAbsolute),
    transformNonzero,
    transformMaximumAbsolute: Number(transformMaximumAbsolute)
  };
};

let randomState = seed;
const random = () => {
  randomState = (1664525 * randomState + 1013904223) >>> 0;
  return randomState / 2 ** 32;
};
const shuffle = () => {
  const permutation = Array.from({length: n}, (_, i) => i);
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
  }
  return permutation;
};

const baselineSpectrum = symmetricSpectrum(K);
let best;
const candidates = [];
for (let trial = 0; trial < trials; trial += 1) {
  const permutation = shuffle();
  for (const delta of [0.75, 0.9, 0.99]) {
    const result = lll(permutation, delta);
    const spectrum = symmetricSpectrum(result.G);
    const candidate = {trial, delta, permutation, ...result, spectrum, complexity: complexity(result.U, result.G)};
    candidates.push({
      trial,
      delta,
      permutation,
      iterations: result.iterations,
      condition: spectrum.condition,
      gramOffDiagonalPairs: candidate.complexity.gramOffDiagonalPairs,
      transformNonzero: candidate.complexity.transformNonzero,
      transformMaximumAbsolute: candidate.complexity.transformMaximumAbsolute
    });
    if (!best || candidate.spectrum.condition < best.spectrum.condition) best = candidate;
  }
}

const dominates = (left, right) => (
  left.condition <= right.condition
  && left.gramOffDiagonalPairs <= right.gramOffDiagonalPairs
  && left.transformNonzero <= right.transformNonzero
  && (left.condition < right.condition
    || left.gramOffDiagonalPairs < right.gramOffDiagonalPairs
    || left.transformNonzero < right.transformNonzero)
);
const pareto = candidates
  .filter((candidate, index) => !candidates.some((other, otherIndex) => otherIndex !== index && dominates(other, candidate)))
  .sort((a, b) => a.condition - b.condition);

const output = {
  schemaVersion: "leech-hardware-basis-search-run-v1",
  trials,
  seed,
  deltaValues: [0.75, 0.9, 0.99],
  baseline: baselineSpectrum,
  paretoObjectives: ["condition", "gramOffDiagonalPairs", "transformNonzero"],
  pareto,
  best: {
    trial: best.trial,
    delta: best.delta,
    permutation: best.permutation,
    iterations: best.iterations,
    spectrum: best.spectrum,
    complexity: best.complexity,
    diagonal: best.G.map((row, i) => Number(row[i]))
  }
};
if (!summaryOnly) {
  output.best.transform = best.U.map((row) => row.map(Number));
  output.best.gram = best.G.map((row) => row.map(Number));
}
console.log(JSON.stringify(output, null, 2));
