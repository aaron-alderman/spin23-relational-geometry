#!/usr/bin/env node
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const analyzer = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "analyze-leech-pareto-transformers.mjs"), "--full"
], {encoding: "utf8"}));
const G = analyzer.results.find(({id}) => id === "gram-first").gram;
const channels = G.length;
const argument = (name, fallback) => {
  const prefix = `--${name}=`;
  const match = process.argv.find((entry) => entry.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
};

const jacobi = (matrix, tolerance = 1e-13, maxRotations = 200000) => {
  const dimension = matrix.length;
  const A = matrix.map((row) => [...row]);
  const V = Array.from({length: dimension}, (_, i) => Array.from(
    {length: dimension}, (_, j) => i === j ? 1 : 0
  ));
  for (let rotation = 0; rotation < maxRotations; rotation += 1) {
    let p = 0;
    let q = Math.min(1, dimension - 1);
    let maximum = 0;
    for (let i = 0; i < dimension; i += 1) for (let j = i + 1; j < dimension; j += 1) {
      if (Math.abs(A[i][j]) > maximum) { maximum = Math.abs(A[i][j]); p = i; q = j; }
    }
    if (maximum < tolerance || dimension === 1) return A.map((row, index) => ({
      eigenvalue: row[index], vector: V.map((vRow) => vRow[index])
    })).sort((a, b) => a.eigenvalue - b.eigenvalue);
    const angle = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const app = A[p][p];
    const aqq = A[q][q];
    const apq = A[p][q];
    for (let k = 0; k < dimension; k += 1) if (k !== p && k !== q) {
      const akp = A[k][p];
      const akq = A[k][q];
      A[k][p] = A[p][k] = c * akp - s * akq;
      A[k][q] = A[q][k] = s * akp + c * akq;
    }
    A[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    A[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    A[p][q] = A[q][p] = 0;
    for (let k = 0; k < dimension; k += 1) {
      const vkp = V[k][p];
      const vkq = V[k][q];
      V[k][p] = c * vkp - s * vkq;
      V[k][q] = s * vkp + c * vkq;
    }
  }
  throw new Error("Jacobi eigensolver did not converge");
};

const gramPairs = jacobi(G);
const activeCount = Number(argument("active-count", "4"));
if (!Number.isInteger(activeCount) || activeCount < 1 || activeCount > channels) {
  throw new Error("active-count must be an integer from 1 to 24");
}
const activePairs = [...gramPairs].sort((a, b) =>
  1 / Math.sqrt(a.eigenvalue) - 1 / Math.sqrt(b.eigenvalue)).slice(0, activeCount);

const compositions = (parts, maximum) => {
  const output = [];
  const visit = (prefix, remainingParts, remaining) => {
    if (remainingParts === 1) {
      for (let value = 0; value <= remaining; value += 1) output.push([...prefix, value]);
      return;
    }
    for (let value = 0; value <= remaining; value += 1) {
      visit([...prefix, value], remainingParts - 1, remaining - value);
    }
  };
  visit([], parts, maximum);
  return output;
};

const laguerre = (order, alpha, value) => {
  if (order === 0) return 1;
  if (order === 1) return 1 + alpha - value;
  let previous = 1;
  let current = 1 + alpha - value;
  for (let index = 2; index <= order; index += 1) {
    const next = ((2 * index - 1 + alpha - value) * current
      - (index - 1 + alpha) * previous) / index;
    previous = current;
    current = next;
  }
  return current;
};

const logFactorial = [0];
for (let index = 1; index <= 32; index += 1) logFactorial[index] =
  logFactorial[index - 1] + Math.log(index);
const exponentialElement = (bra, ket, x) => {
  const lower = Math.min(bra, ket);
  const upper = Math.max(bra, ket);
  const difference = upper - lower;
  const amplitude = Math.exp(-x * x / 2
    + (logFactorial[lower] - logFactorial[upper]) / 2)
    * x ** difference * laguerre(lower, difference, x * x);
  return {amplitude, phase: difference % 4};
};

const thetaSquaredElement = (bra, ket, coefficients, variances) => {
  const different = bra.map((value, index) => index).filter((index) => bra[index] !== ket[index]);
  if (different.length === 0) return bra.reduce((sum, occupation, index) =>
    sum + coefficients[index] ** 2 * variances[index] * (2 * occupation + 1), 0);
  if (different.length === 1) {
    const mode = different[0];
    if (Math.abs(bra[mode] - ket[mode]) !== 2) return 0;
    const lower = Math.min(bra[mode], ket[mode]);
    return coefficients[mode] ** 2 * variances[mode]
      * Math.sqrt((lower + 1) * (lower + 2));
  }
  if (different.length === 2 && different.every((mode) =>
    Math.abs(bra[mode] - ket[mode]) === 1)) {
    const [first, second] = different;
    return 2 * coefficients[first] * coefficients[second]
      * Math.sqrt(variances[first] * variances[second])
      * Math.sqrt(Math.max(bra[first], ket[first]) * Math.max(bra[second], ket[second]));
  }
  return 0;
};

const lowestLanczos = (matrix, requested = 2) => {
  const dimension = matrix.length;
  const iterations = Math.min(dimension, 140);
  const vectors = [];
  const alpha = [];
  const beta = [];
  let q = Float64Array.from({length: dimension}, (_, i) =>
    Math.sin((i + 1) * Math.SQRT2) + Math.cos((i + 1) * Math.sqrt(3)));
  let norm = Math.hypot(...q);
  q = Float64Array.from(q, (value) => value / norm);
  let previous = new Float64Array(dimension);
  let previousBeta = 0;
  let trailingBeta = 0;
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    vectors.push(q);
    const work = new Float64Array(dimension);
    for (let row = 0; row < dimension; row += 1) {
      let value = 0;
      for (let column = 0; column < dimension; column += 1) value += matrix[row][column] * q[column];
      work[row] = value - previousBeta * previous[row];
    }
    const diagonal = work.reduce((sum, value, index) => sum + value * q[index], 0);
    alpha.push(diagonal);
    for (let index = 0; index < dimension; index += 1) work[index] -= diagonal * q[index];
    for (let pass = 0; pass < 2; pass += 1) for (const basis of vectors) {
      const projection = work.reduce((sum, value, index) => sum + value * basis[index], 0);
      for (let index = 0; index < dimension; index += 1) work[index] -= projection * basis[index];
    }
    trailingBeta = Math.hypot(...work);
    if (trailingBeta < 1e-13) { trailingBeta = 0; break; }
    if (iteration < iterations - 1) beta.push(trailingBeta);
    previous = q;
    previousBeta = trailingBeta;
    q = Float64Array.from(work, (value) => value / trailingBeta);
  }
  const tridiagonal = alpha.map((value, row) => alpha.map((_, column) =>
    row === column ? value : Math.abs(row - column) === 1 ? beta[Math.min(row, column)] : 0));
  const ritz = jacobi(tridiagonal, 1e-14, 500000).slice(0, requested);
  return ritz.map(({eigenvalue, vector}) => ({
    energy: eigenvalue,
    residual: Math.abs(trailingBeta * vector.at(-1))
  }));
};

const build = (ratio, cutoff, parity) => {
  const U = ratio;
  const u = 1;
  const frequenciesAll = gramPairs.map(({eigenvalue}) => Math.sqrt(U * u / eigenvalue));
  const variancesAll = gramPairs.map(({eigenvalue}) => 0.5 * Math.sqrt(U / (u * eigenvalue)));
  const activeIndices = activePairs.map((pair) => gramPairs.indexOf(pair));
  const activeFrequencies = activeIndices.map((index) => frequenciesAll[index]);
  const activeVariances = activeIndices.map((index) => variancesAll[index]);
  const states = compositions(activeCount, cutoff).filter((state) =>
    state.reduce((sum, value) => sum + value, 0) % 2 === parity);
  const matrix = Array.from({length: states.length}, () => new Float64Array(states.length));
  for (let row = 0; row < states.length; row += 1) for (let column = 0; column <= row; column += 1) {
    const bra = states[row];
    const ket = states[column];
    let value = row === column ? bra.reduce((sum, occupation, mode) =>
      sum + activeFrequencies[mode] * (occupation + 0.5), 0) : 0;
    for (let coordinate = 0; coordinate < channels; coordinate += 1) {
      const coefficients = activePairs.map(({vector}) => vector[coordinate]);
      const omittedVariance = gramPairs.reduce((sum, pair, index) =>
        sum + (activeIndices.includes(index) ? 0 : pair.vector[coordinate] ** 2 * variancesAll[index]), 0);
      let exponentialAmplitude = 1;
      let phase = 0;
      for (let mode = 0; mode < activeCount; mode += 1) {
        const element = exponentialElement(
          bra[mode], ket[mode], coefficients[mode] * Math.sqrt(activeVariances[mode])
        );
        exponentialAmplitude *= element.amplitude;
        phase = (phase + element.phase) % 4;
      }
      const cosine = phase % 2 === 0 ? exponentialAmplitude * (phase === 0 ? 1 : -1) : 0;
      const delta = row === column ? 1 : 0;
      const thetaSquared = thetaSquaredElement(bra, ket, coefficients, activeVariances);
      value += u * (delta * (1 - omittedVariance / 2)
        - Math.exp(-omittedVariance / 2) * cosine - thetaSquared / 2);
    }
    matrix[row][column] = matrix[column][row] = value;
  }
  return {states: states.length, spectrum: lowestLanczos(matrix, 2)};
};

const ratios = argument("ratios", "0.001,0.01").split(",").map(Number);
const cutoffs = argument("cutoffs", "2,4,6,8").split(",").map(Number);
if (ratios.some((value) => !(value > 0))
  || cutoffs.some((value) => !Number.isInteger(value) || value < 1)) {
  throw new Error("ratios must be positive and cutoffs positive integers");
}
const scans = ratios.map((ratio) => {
  const rungs = cutoffs.map((cutoff) => {
    const even = build(ratio, cutoff, 0);
    const odd = build(ratio, cutoff, 1);
    const ground = even.spectrum[0].energy;
    const candidates = [
      {parity: "odd", energy: odd.spectrum[0].energy, residual: odd.spectrum[0].residual},
      {parity: "even", energy: even.spectrum[1].energy, residual: even.spectrum[1].residual}
    ].sort((a, b) => a.energy - b.energy);
    return {
      totalExcitationCutoff: cutoff,
      evenDimension: even.states,
      oddDimension: odd.states,
      groundEnergy: ground,
      firstExcitationParity: candidates[0].parity,
      gap: candidates[0].energy - ground,
      maximumReportedRitzResidual: Math.max(even.spectrum[0].residual,
        even.spectrum[1].residual, odd.spectrum[0].residual)
    };
  });
  return {chargingToCosineRatio: ratio, rungs};
});

console.log(JSON.stringify({
  schemaVersion: "leech-full-cosine-active-space-run-v1",
  activeModeCount: activeCount,
  activeModes: `${activeCount} lowest harmonic frequencies`,
  omittedModes: `${channels - activeCount} modes projected onto their harmonic vacuum, including Debye-Waller factors`,
  potential: "full cosine in the active modes; no polynomial truncation",
  basis: `${activeCount}-mode Fock states with total excitation at or below the declared cutoff, split by parity`,
  scans
}, null, 2));
