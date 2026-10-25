#!/usr/bin/env node
import fs from "node:fs";

const K = JSON.parse(fs.readFileSync(
  new URL("../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url), "utf8"
)).K.map((row) => row.map(BigInt));
const frontier = JSON.parse(fs.readFileSync(
  new URL("../evidence/data/leech-hardware-basis-pareto-frontier-v1.json", import.meta.url), "utf8"
));
const n = K.length;
const fullOutput = process.argv.includes("--full");

const permutationAtTrial = (seed, target) => {
  let state = seed >>> 0;
  const random = () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  let selected;
  for (let trial = 0; trial <= target; trial += 1) {
    selected = Array.from({length: n}, (_, i) => i);
    for (let i = n - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }
  }
  return selected;
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

const reduce = (permutation, delta) => {
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
    if (decomposition.norm[cursor] >= (delta - mu ** 2) * decomposition.norm[cursor - 1]) cursor += 1;
    else { swap(cursor, cursor - 1); cursor = Math.max(1, cursor - 1); }
  }
  return {U, G};
};

const gcd = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
};
const rational = (numerator, denominator = 1n) => {
  if (denominator < 0n) { numerator = -numerator; denominator = -denominator; }
  const divisor = gcd(numerator, denominator);
  return {numerator: numerator / divisor, denominator: denominator / divisor};
};
const subtract = (a, b) => rational(
  a.numerator * b.denominator - b.numerator * a.denominator,
  a.denominator * b.denominator
);
const add = (a, b) => rational(
  a.numerator * b.denominator + b.numerator * a.denominator,
  a.denominator * b.denominator
);
const multiply = (a, b) => rational(a.numerator * b.numerator, a.denominator * b.denominator);
const divide = (a, b) => rational(a.numerator * b.denominator, a.denominator * b.numerator);
const number = (value) => Number(value.numerator) / Number(value.denominator);
const text = (value) => value.denominator === 1n
  ? value.numerator.toString() : `${value.numerator}/${value.denominator}`;

const factor = (G) => {
  const L = Array.from({length: n}, (_, i) => Array.from(
    {length: n}, (_, j) => rational(i === j ? 1n : 0n)
  ));
  const D = [];
  for (let j = 0; j < n; j += 1) {
    let diagonal = rational(G[j][j]);
    for (let k = 0; k < j; k += 1) diagonal = subtract(
      diagonal, multiply(multiply(L[j][k], L[j][k]), D[k])
    );
    D[j] = diagonal;
    for (let i = j + 1; i < n; i += 1) {
      let value = rational(G[i][j]);
      for (let k = 0; k < j; k += 1) value = subtract(
        value, multiply(multiply(L[i][k], L[j][k]), D[k])
      );
      L[i][j] = divide(value, D[j]);
    }
  }
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    let reconstructed = rational(0n);
    for (let k = 0; k < n; k += 1) reconstructed = add(
      reconstructed, multiply(multiply(L[i][k], D[k]), L[j][k])
    );
    const target = rational(G[i][j]);
    if (reconstructed.numerator !== target.numerator
      || reconstructed.denominator !== target.denominator) throw new Error(`factor mismatch at ${i},${j}`);
  }
  let nonzero = 0;
  let maximumAbsolute = rational(0n);
  let maximumNumerator = 0n;
  let maximumDenominator = 0n;
  const distinct = new Set();
  for (let i = 0; i < n; i += 1) for (let j = 0; j < i; j += 1) {
    const value = L[i][j];
    if (value.numerator === 0n) continue;
    nonzero += 1;
    distinct.add(text(value));
    const absoluteNumerator = value.numerator < 0n ? -value.numerator : value.numerator;
    if (absoluteNumerator * maximumAbsolute.denominator
      > maximumAbsolute.numerator * value.denominator) maximumAbsolute = rational(absoluteNumerator, value.denominator);
    if (absoluteNumerator > maximumNumerator) maximumNumerator = absoluteNumerator;
    if (value.denominator > maximumDenominator) maximumDenominator = value.denominator;
  }
  const diagonalValues = D.map(number);
  return {
    positiveDiagonalCapacitances: D.every((value) => value.numerator > 0n),
    diagonalCapacitances: D.map(text),
    diagonalDynamicRange: Math.max(...diagonalValues) / Math.min(...diagonalValues),
    nonzeroTransformerRatios: nonzero,
    distinctSignedTransformerRatios: distinct.size,
    maximumAbsoluteTransformerRatio: text(maximumAbsolute),
    maximumRatioNumeratorMagnitude: Number(maximumNumerator),
    maximumRatioDenominator: Number(maximumDenominator)
  };
};

const results = frontier.sub1000EngineeringShortlist.map((candidate) => {
  const permutation = permutationAtTrial(frontier.scan.seed, candidate.trialZeroBased);
  const {G} = reduce(permutation, candidate.lovaszDelta);
  const result = {id: candidate.id, trialZeroBased: candidate.trialZeroBased, ...factor(G)};
  if (fullOutput) result.gram = G.map((row) => row.map(Number));
  return result;
});
console.log(JSON.stringify({
  schemaVersion: "leech-pareto-transformer-analysis-run-v1",
  source: frontier.schemaVersion,
  results
}, null, 2));
