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

const identity = (size) => Array.from({length: size}, (_, i) =>
  Array.from({length: size}, (_, j) => i === j ? 1 : 0));
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
const multiply = (first, second) => first.map((row) => second[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * second[index][column], 0)));
const jacobi = (input, tolerance = 1e-13, maximumRotations = 200000) => {
  const size = input.length;
  if (size === 1) return {values: [input[0][0]], vectors: [[1]]};
  const matrix = input.map((row) => [...row]);
  const vectors = identity(size);
  for (let rotation = 0; rotation < maximumRotations; rotation += 1) {
    let p = 0;
    let q = 1;
    let maximum = 0;
    for (let i = 0; i < size; i += 1) for (let j = i + 1; j < size; j += 1) {
      if (Math.abs(matrix[i][j]) > maximum) { maximum = Math.abs(matrix[i][j]); p = i; q = j; }
    }
    if (maximum < tolerance) return {values: matrix.map((row, i) => row[i]), vectors};
    const angle = 0.5 * Math.atan2(2 * matrix[p][q], matrix[q][q] - matrix[p][p]);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const app = matrix[p][p];
    const aqq = matrix[q][q];
    const apq = matrix[p][q];
    for (let k = 0; k < size; k += 1) if (k !== p && k !== q) {
      const akp = matrix[k][p];
      const akq = matrix[k][q];
      matrix[k][p] = matrix[p][k] = cosine * akp - sine * akq;
      matrix[k][q] = matrix[q][k] = sine * akp + cosine * akq;
    }
    matrix[p][p] = cosine ** 2 * app - 2 * sine * cosine * apq + sine ** 2 * aqq;
    matrix[q][q] = sine ** 2 * app + 2 * sine * cosine * apq + cosine ** 2 * aqq;
    matrix[p][q] = matrix[q][p] = 0;
    for (let k = 0; k < size; k += 1) {
      const vkp = vectors[k][p];
      const vkq = vectors[k][q];
      vectors[k][p] = cosine * vkp - sine * vkq;
      vectors[k][q] = sine * vkp + cosine * vkq;
    }
  }
  throw new Error("Jacobi eigensolver did not converge");
};
const matrixPower = (matrix, power) => {
  const {values, vectors} = jacobi(matrix);
  const diagonal = values.map((value, i) => Array.from({length: values.length}, (_, j) =>
    i === j ? value ** power : 0));
  return multiply(multiply(vectors, diagonal), transpose(vectors));
};

// Overall U/u factors cancel from X_A P_A, so set them to one.
const X = matrixPower(G, -0.5).map((row) => row.map((value) => value / 2));
const P = matrixPower(G, 0.5).map((row) => row.map((value) => value / 2));
const submatrix = (matrix, indices) => indices.map((i) => indices.map((j) => matrix[i][j]));
const entropyCache = new Map();
const entropy = (rawIndices) => {
  let indices = [...rawIndices].sort((a, b) => a - b);
  if (indices.length > channels / 2) {
    const selected = new Set(indices);
    indices = Array.from({length: channels}, (_, index) => index)
      .filter((index) => !selected.has(index));
  }
  const key = indices.join(",");
  if (entropyCache.has(key)) return entropyCache.get(key);
  const x = submatrix(X, indices);
  const p = submatrix(P, indices);
  const sqrtX = matrixPower(x, 0.5);
  const symmetricProduct = multiply(multiply(sqrtX, p), sqrtX);
  const symplectic = jacobi(symmetricProduct).values.map((value) =>
    Math.sqrt(Math.max(value, 0.25)));
  const value = symplectic.reduce((sum, nu) => {
    const plus = nu + 0.5;
    const minus = Math.max(0, nu - 0.5);
    return sum + plus * Math.log(plus) - (minus === 0 ? 0 : minus * Math.log(minus));
  }, 0);
  entropyCache.set(key, value);
  return value;
};
const profile = (order) => Array.from({length: channels - 1}, (_, cut) =>
  entropy(order.slice(0, cut + 1)));
const summarize = (order, entropies) => ({
  orderOneBased: order.map((index) => index + 1),
  cutEntropies: entropies,
  maximumCutEntropy: Math.max(...entropies),
  sumCutEntropy: entropies.reduce((sum, value) => sum + value, 0),
  harmonicSchmidtLowerBoundAtMaximumCut: Math.exp(Math.max(...entropies))
});
const score = (entropies) => Math.max(...entropies)
  + 0.002 * entropies.reduce((sum, value) => sum + value, 0);

let randomState = 0x6d2b79f5;
const random = () => {
  randomState ^= randomState << 13;
  randomState ^= randomState >>> 17;
  randomState ^= randomState << 5;
  return (randomState >>> 0) / 2 ** 32;
};
const naturalOrder = Array.from({length: channels}, (_, index) => index);
const naturalEntropies = profile(naturalOrder);
let currentOrder = [...naturalOrder];
let currentEntropies = [...naturalEntropies];
let currentScore = score(currentEntropies);
let bestOrder = [...currentOrder];
let bestEntropies = [...currentEntropies];
let bestScore = currentScore;
const iterations = 80000;
for (let iteration = 0; iteration < iterations; iteration += 1) {
  const position = Math.floor(random() * (channels - 1));
  const candidateOrder = [...currentOrder];
  [candidateOrder[position], candidateOrder[position + 1]] =
    [candidateOrder[position + 1], candidateOrder[position]];
  const candidateEntropies = [...currentEntropies];
  candidateEntropies[position] = entropy(candidateOrder.slice(0, position + 1));
  const candidateScore = score(candidateEntropies);
  const temperature = 0.08 * (1 - iteration / iterations) + 1e-5;
  if (candidateScore <= currentScore || random() < Math.exp((currentScore - candidateScore) / temperature)) {
    currentOrder = candidateOrder;
    currentEntropies = candidateEntropies;
    currentScore = candidateScore;
    if (currentScore < bestScore) {
      bestOrder = [...currentOrder];
      bestEntropies = [...currentEntropies];
      bestScore = currentScore;
    }
  }
}

const natural = summarize(naturalOrder, naturalEntropies);
const optimized = summarize(bestOrder, bestEntropies);
console.log(JSON.stringify({
  schemaVersion: "leech-joined-cell-mps-order-run-v1",
  model: "harmonic ground state of the Gram-first joined cell",
  ratioIndependence: "the overall U/u covariance scales cancel from every reduced symplectic eigenvalue",
  entropyUnits: "nats",
  optimizer: {type: "deterministic adjacent-transposition annealing", iterations,
    seedHex: "6d2b79f5", score: "maximum cut entropy + 0.002 times sum cut entropy"},
  natural,
  optimized,
  improvement: {
    maximumCutEntropyFraction: 1 - optimized.maximumCutEntropy / natural.maximumCutEntropy,
    sumCutEntropyFraction: 1 - optimized.sumCutEntropy / natural.sumCutEntropy,
    maximumCutSchmidtProxyFactor: natural.harmonicSchmidtLowerBoundAtMaximumCut
      / optimized.harmonicSchmidtLowerBoundAtMaximumCut
  },
  boundary: "This is an exact harmonic Gaussian ordering diagnostic, not a nonlinear MPS convergence result or a spectral-gap certificate."
}, null, 2));
