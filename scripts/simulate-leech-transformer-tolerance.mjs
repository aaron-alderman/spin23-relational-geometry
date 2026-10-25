#!/usr/bin/env node
import fs from "node:fs";

const K = JSON.parse(fs.readFileSync(
  new URL("../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url), "utf8"
)).K.map((row) => row.map(BigInt));
const frontier = JSON.parse(fs.readFileSync(
  new URL("../evidence/data/leech-hardware-basis-pareto-frontier-v1.json", import.meta.url), "utf8"
));
const selected = frontier.sub1000EngineeringShortlist.find((entry) => entry.id === "gram-first");
const n = K.length;
const draws = Number(process.argv[2] ?? 2000);
const seed = Number(process.argv[3] ?? 271828) >>> 0;
const sigmas = (process.argv[4] ?? "0.00001,0.0001,0.0003,0.001,0.002,0.003,0.005,0.01")
  .split(",").map(Number);
const errorModel = process.argv[5] ?? "iid";
const correlationFraction = Number(process.argv[6] ?? 0.9);
if (!["iid", "row-block", "smooth-gradient"].includes(errorModel)) throw new Error(`unknown error model: ${errorModel}`);
if (!(correlationFraction >= 0 && correlationFraction <= 1)) throw new Error("correlation fraction must lie in [0,1]");

const permutationAtTrial = (initialSeed, target) => {
  let state = initialSeed >>> 0;
  const random = () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  let permutation;
  for (let trial = 0; trial <= target; trial += 1) {
    permutation = Array.from({length: n}, (_, i) => i);
    for (let i = n - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
  }
  return permutation;
};

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

const reducedGram = () => {
  const permutation = permutationAtTrial(frontier.scan.seed, selected.trialZeroBased);
  const U = Array.from({length: n}, (_, i) =>
    Array.from({length: n}, (_, j) => i === permutation[j] ? 1n : 0n));
  const G = permutation.map((i) => permutation.map((j) => K[i][j]));
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
  const swap = (first, second) => {
    for (let row = 0; row < n; row += 1) [U[row][first], U[row][second]] = [U[row][second], U[row][first]];
    [G[first], G[second]] = [G[second], G[first]];
    for (let row = 0; row < n; row += 1) [G[row][first], G[row][second]] = [G[row][second], G[row][first]];
  };
  let cursor = 1;
  while (cursor < n) {
    let decomposition = gramSchmidt(G);
    for (let source = cursor - 1; source >= 0; source -= 1) {
      const coefficient = Math.round(decomposition.mu[cursor][source]);
      if (coefficient !== 0) { reduceColumn(cursor, source, coefficient); decomposition = gramSchmidt(G); }
    }
    const mu = decomposition.mu[cursor][cursor - 1];
    if (decomposition.norm[cursor]
      >= (selected.lovaszDelta - mu ** 2) * decomposition.norm[cursor - 1]) cursor += 1;
    else { swap(cursor, cursor - 1); cursor = Math.max(1, cursor - 1); }
  }
  return G.map((row) => row.map(Number));
};

const ldl = (G) => {
  const L = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));
  const D = Array(n).fill(0);
  for (let j = 0; j < n; j += 1) {
    let diagonal = G[j][j];
    for (let k = 0; k < j; k += 1) diagonal -= L[j][k] ** 2 * D[k];
    D[j] = diagonal;
    for (let i = j + 1; i < n; i += 1) {
      let value = G[i][j];
      for (let k = 0; k < j; k += 1) value -= L[i][k] * L[j][k] * D[k];
      L[i][j] = value / D[j];
    }
  }
  return {L, D};
};

const compose = (L, D) => Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => {
  let value = 0;
  for (let k = 0; k < n; k += 1) value += L[i][k] * D[k] * L[j][k];
  return value;
}));
const invert = (input) => {
  const work = input.map((row, i) => [...row, ...Array.from({length: n}, (_, j) => i === j ? 1 : 0)]);
  for (let column = 0; column < n; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < n; row += 1) if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    [work[column], work[pivot]] = [work[pivot], work[column]];
    const scale = work[column][column];
    for (let j = 0; j < 2 * n; j += 1) work[column][j] /= scale;
    for (let row = 0; row < n; row += 1) if (row !== column) {
      const factor = work[row][column];
      for (let j = 0; j < 2 * n; j += 1) work[row][j] -= factor * work[column][j];
    }
  }
  return work.map((row) => row.slice(n));
};
const symmetricNorm = (input) => {
  const work = input.map((row) => [...row]);
  for (let iteration = 0; iteration < 20000; iteration += 1) {
    let p = 0; let q = 1; let largest = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(work[i][j]) > largest) { largest = Math.abs(work[i][j]); p = i; q = j; }
    }
    if (largest < 1e-11) break;
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
  return Math.max(...work.map((row, i) => Math.abs(row[i])));
};
const frobeniusInner = (A, B) => A.reduce((sum, row, i) =>
  sum + row.reduce((line, value, j) => line + value * B[i][j], 0), 0);
const quantile = (sorted, probability) => sorted[Math.min(sorted.length - 1,
  Math.max(0, Math.ceil(probability * sorted.length) - 1))];
const wilson95 = (successes, count) => {
  const z = 1.959963984540054;
  const fraction = successes / count;
  const denominator = 1 + z ** 2 / count;
  const center = (fraction + z ** 2 / (2 * count)) / denominator;
  const halfWidth = z * Math.sqrt(fraction * (1 - fraction) / count
    + z ** 2 / (4 * count ** 2)) / denominator;
  return {lower: Math.max(0, center - halfWidth), upper: Math.min(1, center + halfWidth)};
};

const G = reducedGram();
const base = ldl(G);
const Ginv = invert(G);
const GinvNorm = symmetricNorm(Ginv);
const gramSquared = frobeniusInner(G, G);
const nonzeroL = [];
for (let i = 0; i < n; i += 1) for (let j = 0; j < i; j += 1) if (Math.abs(base.L[i][j]) > 1e-12) nonzeroL.push([i, j]);

let randomState = seed;
const uniform = () => {
  randomState = (1664525 * randomState + 1013904223) >>> 0;
  return (randomState + 0.5) / 2 ** 32;
};
let spare;
const normal = () => {
  if (spare !== undefined) { const value = spare; spare = undefined; return value; }
  const radius = Math.sqrt(-2 * Math.log(uniform()));
  const angle = 2 * Math.PI * uniform();
  spare = radius * Math.sin(angle);
  return radius * Math.cos(angle);
};

const results = [];
for (const sigma of sigmas) {
  const errors = [];
  const scaleErrors = [];
  for (let draw = 0; draw < draws; draw += 1) {
    const L = base.L.map((row) => [...row]);
    const D = [...base.D];
    const blockShocks = errorModel === "row-block"
      ? Array.from({length: 6}, normal) : [];
    const gradientShock = errorModel === "smooth-gradient" ? normal() : 0;
    const rowCoordinate = (row) => {
      const raw = row - (n - 1) / 2;
      const rms = Math.sqrt((n ** 2 - 1) / 12);
      return raw / rms;
    };
    const componentShock = (row) => {
      if (errorModel === "iid") return normal();
      if (errorModel === "row-block") return Math.sqrt(correlationFraction)
        * blockShocks[Math.floor(row / 4)] + Math.sqrt(1 - correlationFraction) * normal();
      return Math.sqrt(correlationFraction) * gradientShock * rowCoordinate(row)
        + Math.sqrt(1 - correlationFraction) * normal();
    };
    const componentVariance = (row) => errorModel === "smooth-gradient"
      ? correlationFraction * rowCoordinate(row) ** 2 + 1 - correlationFraction : 1;
    for (const [i, j] of nonzeroL) L[i][j] *= Math.exp(
      sigma * componentShock(i) - sigma ** 2 * componentVariance(i) / 2
    );
    for (let i = 0; i < n; i += 1) D[i] *= Math.exp(
      sigma * componentShock(i) - sigma ** 2 * componentVariance(i) / 2
    );
    const measured = compose(L, D);
    const fittedScale = frobeniusInner(measured, G) / gramSquared;
    const measuredInverse = invert(measured);
    const difference = measuredInverse.map((row, i) => row.map((value, j) =>
      fittedScale * value - Ginv[i][j]));
    errors.push(symmetricNorm(difference) / GinvNorm);
    scaleErrors.push(Math.abs(fittedScale - 1));
  }
  errors.sort((a, b) => a - b);
  scaleErrors.sort((a, b) => a - b);
  const passCount = errors.filter((value) => value <= 0.01).length;
  results.push({
    componentLogSigma: sigma,
    draws,
    passThreshold: 0.01,
    passCount,
    passFraction: passCount / draws,
    passFractionWilson95: wilson95(passCount, draws),
    inverseError: {
      median: quantile(errors, 0.5),
      p90: quantile(errors, 0.9),
      p95: quantile(errors, 0.95),
      p99: quantile(errors, 0.99),
      maximum: errors.at(-1)
    },
    fittedGlobalScaleAbsoluteError: {
      median: quantile(scaleErrors, 0.5),
      p95: quantile(scaleErrors, 0.95)
    }
  });
}

console.log(JSON.stringify({
  schemaVersion: "leech-transformer-tolerance-monte-carlo-run-v1",
  model: {
    selectedBasis: selected.id,
    independentParameters: nonzeroL.length + n,
    nonzeroTransformerRatios: nonzeroL.length,
    diagonalCapacitors: n,
    perturbation: errorModel === "iid"
      ? "independent mean-one lognormal multiplicative error on every nonzero L ratio and D capacitor"
      : errorModel === "row-block"
        ? "mean-one lognormal multiplicative error with six four-row shared process shocks plus independent residuals"
        : "mean-one lognormal multiplicative error with one normalized linear row-gradient shock plus independent residuals",
    errorModel,
    correlationFraction: errorModel === "iid" ? 0 : correlationFraction,
    calibration: "least-squares removal of one positive global capacitance scale",
    metric: "relative spectral norm error of the calibrated inverse capacitance matrix",
    passThreshold: 0.01
  },
  seed,
  results
}, null, 2));
