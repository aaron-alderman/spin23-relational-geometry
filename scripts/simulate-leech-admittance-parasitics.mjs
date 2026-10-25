#!/usr/bin/env node
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const draws = Number(process.argv[2] ?? 2000);
const seed = Number(process.argv[3] ?? 57721) >>> 0;
const strengths = (process.argv[4] ?? "0.0001,0.0003,0.001,0.003,0.01").split(",").map(Number);
const poleRatios = (process.argv[5] ?? "4,10").split(",").map(Number);
const qualityFactor = Number(process.argv[6] ?? 30);
const frequencies = [0.1,0.1778279410038923,0.31622776601683794,0.5623413251903491,1,1.7782794100389228,3.1622776601683795];
const n = 24;

const analyzer = fileURLToPath(new URL("./analyze-leech-pareto-transformers.mjs", import.meta.url));
const analyzed = spawnSync(process.execPath, [analyzer, "--full"], {encoding: "utf8", windowsHide: true});
if (analyzed.status !== 0) throw new Error(analyzed.stderr);
const G = JSON.parse(analyzed.stdout).results.find((entry) => entry.id === "gram-first").gram;

const symmetricEigenvalues = (input) => {
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
  return work.map((row, i) => row[i]).sort((a, b) => a - b);
};
const norm = (matrix) => Math.max(...symmetricEigenvalues(matrix).map(Math.abs));
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
const inner = (A, B) => A.reduce((sum, row, i) =>
  sum + row.reduce((line, value, j) => line + value * B[i][j], 0), 0);
const outer = (v) => v.map((left) => v.map((right) => left * right));
const addScaled = (A, B, scale) => A.map((row, i) => row.map((value, j) => value + scale * B[i][j]));
const quantile = (sorted, probability) => sorted[Math.min(sorted.length - 1,
  Math.max(0, Math.ceil(probability * sorted.length) - 1))];
const wilson95 = (successes, count) => {
  const z = 1.959963984540054;
  const p = successes / count;
  const denominator = 1 + z ** 2 / count;
  const center = (p + z ** 2 / (2 * count)) / denominator;
  const half = z * Math.sqrt(p * (1 - p) / count + z ** 2 / (4 * count ** 2)) / denominator;
  return {lower: Math.max(0, center - half), upper: Math.min(1, center + half)};
};

const Gnorm = norm(G);
const Ginv = invert(G);
const GinvNorm = norm(Ginv);
const GfrobeniusSquared = inner(G, G);
let state = seed;
const random = () => {
  state = (1664525 * state + 1013904223) >>> 0;
  return (state + 0.5) / 2 ** 32;
};

const results = [];
for (const poleRatio of poleRatios) for (const strength of strengths) {
  const pass = [];
  const dispersions = [];
  const losses = [];
  const inverseErrors = [];
  for (let draw = 0; draw < draws; draw += 1) {
    const vector = Array.from({length: n}, () => random() < 0.5 ? -1 / Math.sqrt(n) : 1 / Math.sqrt(n));
    const projector = outer(vector);
    const parasiticCapacitance = strength * Gnorm;
    const extractedCoefficients = [];
    const lossRatios = [];
    for (const frequency of frequencies) {
      const x = frequency / poleRatio;
      const denominatorReal = 1 - x ** 2;
      const denominatorImaginary = x / qualityFactor;
      const denominatorSquared = denominatorReal ** 2 + denominatorImaginary ** 2;
      // y/(i omega)=C_p/(1-x^2+i x/Q). Its real part enters Im(y)/omega;
      // its imaginary part produces Re(y)/omega with the opposite sign.
      const extracted = parasiticCapacitance * denominatorReal / denominatorSquared;
      const dissipativeMagnitude = parasiticCapacitance * denominatorImaginary / denominatorSquared;
      extractedCoefficients.push(extracted);
      const imaginaryAdmittanceOverOmega = addScaled(G, projector, extracted);
      lossRatios.push(dissipativeMagnitude / norm(imaginaryAdmittanceOverOmega));
    }
    const meanCoefficient = extractedCoefficients.reduce((a, b) => a + b, 0) / extractedCoefficients.length;
    const fittedScale = 1 + meanCoefficient * inner(projector, G) / GfrobeniusSquared;
    const dispersion = (Math.max(...extractedCoefficients) - Math.min(...extractedCoefficients))
      / (fittedScale * Gnorm);
    const meanCapacitance = addScaled(G, projector, meanCoefficient);
    const meanInverse = invert(meanCapacitance);
    const difference = meanInverse.map((row, i) => row.map((value, j) =>
      fittedScale * value - Ginv[i][j]));
    const inverseError = norm(difference) / GinvNorm;
    const loss = Math.max(...lossRatios);
    const passed = dispersion <= 0.005 && loss <= 0.001 && inverseError <= 0.01;
    pass.push(passed);
    dispersions.push(dispersion);
    losses.push(loss);
    inverseErrors.push(inverseError);
  }
  const sort = (values) => [...values].sort((a, b) => a - b);
  const sortedDispersion = sort(dispersions);
  const sortedLoss = sort(losses);
  const sortedInverse = sort(inverseErrors);
  const passCount = pass.filter(Boolean).length;
  results.push({
    poleFrequencyOverCenter: poleRatio,
    parasiticLowFrequencyNormOverTargetNorm: strength,
    draws,
    passCount,
    passFraction: passCount / draws,
    passFractionWilson95: wilson95(passCount, draws),
    p95Dispersion: quantile(sortedDispersion, 0.95),
    p95LossRatio: quantile(sortedLoss, 0.95),
    p95InverseError: quantile(sortedInverse, 0.95),
    maximumDispersion: sortedDispersion.at(-1),
    maximumLossRatio: sortedLoss.at(-1),
    maximumInverseError: sortedInverse.at(-1)
  });
}

console.log(JSON.stringify({
  schemaVersion: "leech-admittance-parasitic-pole-run-v1",
  model: {
    selectedBasis: "gram-first",
    frequencies,
    qualityFactor,
    couplingDirection: "uniform random Rademacher unit vector",
    parasitic: "one passive series-RLC rank-one branch",
    strengthDefinition: "low-frequency parasitic capacitance spectral norm divided by target G spectral norm",
    gates: {dispersion: 0.005, lossRatio: 0.001, inverseMetric: 0.01}
  },
  seed,
  results
}, null, 2));
