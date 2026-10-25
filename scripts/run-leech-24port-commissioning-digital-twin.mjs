#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-gram-first-ideal-network-manifest-v1.json'), 'utf8'));
const protocol = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-24port-admittance-commissioning-packet-v1.json'), 'utf8'));
const G = manifest.targetGramMatrix.map(row => row.map(Number));
const n = G.length;

function mul(A, x) { return A.map(row => row.reduce((sum, value, j) => sum + value * x[j], 0)); }
function frobenius(A) { return Math.sqrt(A.reduce((sum, row) => sum + row.reduce((s, x) => s + x * x, 0), 0)); }
function subtract(A, B) { return A.map((row, i) => row.map((x, j) => x - B[i][j])); }
function scale(A, factor) { return A.map(row => row.map(x => factor * x)); }
function symmetrize(A) { return A.map((row, i) => row.map((_, j) => (A[i][j] + A[j][i]) / 2)); }
function identity(size) { return Array.from({length: size}, (_, i) => Array.from({length: size}, (_, j) => Number(i === j))); }

function jacobi(A) {
  const M = A.map(row => [...row]);
  const V = identity(A.length);
  for (let iteration = 0; iteration < 200 * A.length * A.length; iteration += 1) {
    let p = 0; let q = 1; let largest = 0;
    for (let i = 0; i < A.length; i += 1) for (let j = i + 1; j < A.length; j += 1) {
      if (Math.abs(M[i][j]) > largest) { largest = Math.abs(M[i][j]); p = i; q = j; }
    }
    if (largest < 1e-13) break;
    const angle = 0.5 * Math.atan2(2 * M[p][q], M[q][q] - M[p][p]);
    const c = Math.cos(angle); const s = Math.sin(angle);
    const app = c * c * M[p][p] - 2 * s * c * M[p][q] + s * s * M[q][q];
    const aqq = s * s * M[p][p] + 2 * s * c * M[p][q] + c * c * M[q][q];
    for (let k = 0; k < A.length; k += 1) if (k !== p && k !== q) {
      const mkp = c * M[k][p] - s * M[k][q];
      const mkq = s * M[k][p] + c * M[k][q];
      M[k][p] = M[p][k] = mkp;
      M[k][q] = M[q][k] = mkq;
    }
    M[p][p] = app; M[q][q] = aqq; M[p][q] = M[q][p] = 0;
    for (let k = 0; k < A.length; k += 1) {
      const vkp = c * V[k][p] - s * V[k][q];
      const vkq = s * V[k][p] + c * V[k][q];
      V[k][p] = vkp; V[k][q] = vkq;
    }
  }
  return M.map((row, i) => ({value: row[i], vector: V.map(vrow => vrow[i])})).sort((a, b) => a.value - b.value);
}

function inverse(A) {
  const aug = A.map((row, i) => [...row, ...identity(A.length)[i]]);
  for (let col = 0; col < A.length; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < A.length; row += 1) if (Math.abs(aug[row][col]) > Math.abs(aug[pivot][col])) pivot = row;
    if (Math.abs(aug[pivot][col]) < 1e-14) throw new Error('singular matrix');
    [aug[col], aug[pivot]] = [aug[pivot], aug[col]];
    const divisor = aug[col][col];
    for (let j = 0; j < 2 * A.length; j += 1) aug[col][j] /= divisor;
    for (let row = 0; row < A.length; row += 1) if (row !== col) {
      const factor = aug[row][col];
      for (let j = 0; j < 2 * A.length; j += 1) aug[row][j] -= factor * aug[col][j];
    }
  }
  return aug.map(row => row.slice(A.length));
}

function spectralNormSymmetric(A) { return Math.max(...jacobi(symmetrize(A)).map(item => Math.abs(item.value))); }
function dot(a, b) { return a.reduce((sum, x, i) => sum + x * b[i], 0); }
function norm(x) { return Math.sqrt(dot(x, x)); }

let randomState = 8675309;
function uniform() { randomState = (1664525 * randomState + 1013904223) >>> 0; return (randomState + 0.5) / 2 ** 32; }
function gaussian() { return Math.sqrt(-2 * Math.log(uniform())) * Math.cos(2 * Math.PI * uniform()); }

const frequencies = protocol.schedule.frequenciesInUnitsOfCommissioningCenter;
const repeats = protocol.schedule.repeatsPerConfiguration;
const targetNorm = spectralNormSymmetric(G);
const smallest = jacobi(G)[0];
const softVector = smallest.vector.map(x => x / norm(smallest.vector));
const rankOne = softVector.map(x => softVector.map(y => x * y));

function runCase(id, trueC, seedOffset) {
  randomState = (8675309 + seedOffset) >>> 0;
  const lossTangent = 1e-4;
  const perAcquisitionRelativeNoise = 2e-5;
  const meanNoise = perAcquisitionRelativeNoise / Math.sqrt(repeats);
  const capacitanceByFrequency = [];
  const lossByFrequency = [];
  let maximumReciprocity = 0;
  for (const omega of frequencies) {
    const imaginary = trueC.map(row => row.map(value => omega * value + omega * targetNorm * meanNoise * gaussian() / n));
    const real = trueC.map(row => row.map(value => omega * lossTangent * value + omega * targetNorm * meanNoise * gaussian() / n));
    maximumReciprocity = Math.max(maximumReciprocity, frobenius(subtract(imaginary, imaginary.map((_, i) => imaginary.map(row => row[i])))) / frobenius(imaginary));
    capacitanceByFrequency.push(scale(symmetrize(imaginary), 1 / omega));
    lossByFrequency.push(scale(symmetrize(real), 1 / omega));
  }
  const average = matrices => scale(matrices.reduce((sum, matrix) => sum.map((row, i) => row.map((x, j) => x + matrix[i][j])), Array.from({length: n}, () => Array(n).fill(0))), 1 / matrices.length);
  const fittedC = average(capacitanceByFrequency);
  const fittedLoss = average(lossByFrequency);
  const alpha = fittedC.reduce((sum, row, i) => sum + dot(row, G[i]), 0) / G.reduce((sum, row) => sum + dot(row, row), 0);
  const scaledTarget = scale(G, alpha);
  const inverseError = spectralNormSymmetric(subtract(inverse(fittedC), inverse(scaledTarget))) / spectralNormSymmetric(inverse(scaledTarget));
  const eigenvalues = jacobi(fittedC).map(item => item.value);
  const lossRatio = Math.max(...frequencies.map((_, i) => spectralNormSymmetric(lossByFrequency[i]) / spectralNormSymmetric(capacitanceByFrequency[i])));
  let dispersion = 0;
  for (let i = 0; i < capacitanceByFrequency.length; i += 1) for (let j = i + 1; j < capacitanceByFrequency.length; j += 1) {
    dispersion = Math.max(dispersion, spectralNormSymmetric(subtract(capacitanceByFrequency[i], capacitanceByFrequency[j])) / spectralNormSymmetric(fittedC));
  }
  let heldOutWorstRelativeError = 0;
  const heldOut = [];
  for (let fi = 0; fi < frequencies.length; fi += 1) for (let drive = 0; drive < protocol.schedule.heldOutRademacherMultiportDrivesPerFrequency; drive += 1) {
    const voltage = Array.from({length: n}, () => uniform() < 0.5 ? -1 : 1);
    const trueImaginaryCurrent = mul(scale(trueC, frequencies[fi]), voltage);
    const predictedImaginaryCurrent = mul(scale(fittedC, frequencies[fi]), voltage);
    const relative = norm(trueImaginaryCurrent.map((x, i) => x - predictedImaginaryCurrent[i])) / norm(trueImaginaryCurrent);
    heldOutWorstRelativeError = Math.max(heldOutWorstRelativeError, relative);
    heldOut.push(relative);
  }
  const gates = {
    reciprocity: maximumReciprocity <= 1e-3,
    passivity: Math.min(...jacobi(fittedLoss).map(item => item.value)) >= -1e-8,
    loss: lossRatio <= 1e-3,
    dispersion: dispersion <= 0.005,
    positiveDefinite: Math.min(...eigenvalues) > 0,
    inverseMetric: inverseError <= 0.01,
    heldOutDrive: heldOutWorstRelativeError <= 0.01
  };
  return {
    id,
    injected: {lossTangent, perAcquisitionRelativeNoise, repeats},
    reconstruction: {alpha, maximumReciprocity, lossRatio, dispersion, minimumEigenvalue: Math.min(...eigenvalues), inverseMetricError: inverseError, heldOutWorstRelativeError},
    gates,
    allPass: Object.values(gates).every(Boolean)
  };
}

const counterfeitStrength = 2e-5;
const counterfeit = G.map((row, i) => row.map((value, j) => value + counterfeitStrength * targetNorm * rankOne[i][j]));
const idealResult = runCase('ideal-gram-first', G, 0);
const counterfeitResult = runCase('soft-mode-counterfeit', counterfeit, 1000);
const output = {
  schemaVersion: 'leech-24port-commissioning-digital-twin-v1',
  date: '2026-10-26',
  inputs: [manifest.schemaVersion, protocol.schemaVersion],
  schedule: {frequencies: frequencies.length, singlePortConfigurations: protocol.schedule.singlePortConfigurations, heldOutConfigurations: protocol.schedule.heldOutConfigurations, repeats, totalComplexAcquisitions: protocol.schedule.totalComplexAcquisitions},
  counterfeit: {construction: 'positive rank-one perturbation aligned with the softest Gram-first eigenvector', relativeSpectralStrength: counterfeitStrength, targetMinimumEigenvalue: smallest.value},
  cases: [idealResult, counterfeitResult],
  decision: {
    idealAccepted: idealResult.allPass,
    counterfeitRejectedByInverseMetric: !counterfeitResult.gates.inverseMetric,
    counterfeitPassesOrdinaryLinearChecks: counterfeitResult.gates.reciprocity && counterfeitResult.gates.passivity && counterfeitResult.gates.loss && counterfeitResult.gates.dispersion && counterfeitResult.gates.positiveDefinite && counterfeitResult.gates.heldOutDrive,
    implication: 'the executable recovery accepts the declared ideal carrier and distinguishes predictive reconstruction from Leech provenance: a flat passive model can predict held-out drives yet fail the inverse metric'
  },
  boundary: 'This is a deterministic synthetic digital twin with Gaussian acquisition noise, not measured hardware data. It validates the analysis path and one adversarial counterfeit only.'
};

if (process.argv.includes('--write')) fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-24port-commissioning-digital-twin-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output, null, 2));
