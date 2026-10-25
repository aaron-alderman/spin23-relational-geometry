#!/usr/bin/env node
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const analyzer = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "analyze-leech-pareto-transformers.mjs"), "--full"
], {encoding: "utf8"}));
const gram = analyzer.results.find(({id}) => id === "gram-first").gram.map(
  (row) => row.map(BigInt));
const channels = gram.length;

const gcd = (first, second) => {
  first = first < 0n ? -first : first;
  second = second < 0n ? -second : second;
  while (second !== 0n) [first, second] = [second, first % second];
  return first;
};
const q = (numerator, denominator = 1n) => {
  if (denominator < 0n) { numerator = -numerator; denominator = -denominator; }
  const divisor = gcd(numerator, denominator);
  return {numerator: numerator / divisor, denominator: denominator / divisor};
};
const sub = (a, b) => q(a.numerator * b.denominator - b.numerator * a.denominator,
  a.denominator * b.denominator);
const mul = (a, b) => q(a.numerator * b.numerator, a.denominator * b.denominator);
const div = (a, b) => q(a.numerator * b.denominator, a.denominator * b.numerator);
const inverseInteger = (matrix) => {
  const size = matrix.length;
  const augmented = matrix.map((row, i) => [
    ...row.map((value) => q(value)),
    ...Array.from({length: size}, (_, j) => q(i === j ? 1n : 0n))
  ]);
  for (let column = 0; column < size; column += 1) {
    const pivot = augmented.findIndex((row, index) =>
      index >= column && row[column].numerator !== 0n);
    if (pivot < 0) throw new Error("singular Gram matrix");
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const pivotValue = augmented[column][column];
    augmented[column] = augmented[column].map((value) => div(value, pivotValue));
    for (let row = 0; row < size; row += 1) if (row !== column) {
      const factor = augmented[row][column];
      augmented[row] = augmented[row].map((value, index) =>
        sub(value, mul(factor, augmented[column][index])));
    }
  }
  const inverse = augmented.map((row) => row.slice(size));
  if (!inverse.flat().every(({denominator}) => denominator === 1n)) {
    throw new Error("expected integral unimodular inverse");
  }
  return inverse.map((row) => row.map(({numerator}) => numerator));
};
const inverse = inverseInteger(gram);
const metric = inverse.map((row) => row.map(Number));

const rationalRank = (integerMatrix) => {
  if (!integerMatrix.length || !integerMatrix[0].length) return 0;
  const matrix = integerMatrix.map((row) => row.map((value) => q(value)));
  const rows = matrix.length;
  const columns = matrix[0].length;
  let rank = 0;
  for (let column = 0; column < columns && rank < rows; column += 1) {
    const pivot = matrix.findIndex((row, index) =>
      index >= rank && row[column].numerator !== 0n);
    if (pivot < 0) continue;
    [matrix[rank], matrix[pivot]] = [matrix[pivot], matrix[rank]];
    const pivotValue = matrix[rank][column];
    for (let entry = column; entry < columns; entry += 1) {
      matrix[rank][entry] = div(matrix[rank][entry], pivotValue);
    }
    for (let row = rank + 1; row < rows; row += 1) {
      const factor = matrix[row][column];
      for (let entry = column; entry < columns; entry += 1) {
        matrix[row][entry] = sub(matrix[row][entry], mul(factor, matrix[rank][entry]));
      }
    }
    rank += 1;
  }
  return rank;
};

const crossCutRanks = Array.from({length: channels - 1}, (_, cut) => rationalRank(
  inverse.slice(0, cut + 1).map((row) => row.slice(cut + 1))));

const addTerm = (site, from, to, coefficient, operator) => {
  const key = `${from},${to}`;
  if (!site.has(key)) site.set(key, []);
  site.get(key).push({coefficient, operator});
};
const buildAutomatonMpo = (size, U = 0.01, u = 1) => {
  const bondDimension = size + 2;
  const end = bondDimension - 1;
  return Array.from({length: size}, (_, siteIndex) => {
    const site = new Map();
    addTerm(site, 0, 0, 1, "I");
    addTerm(site, end, end, 1, "I");
    addTerm(site, 0, end, U * metric[siteIndex][siteIndex] / 2, "n2");
    addTerm(site, 0, end, u, "I");
    addTerm(site, 0, end, -u / 2, "shift");
    addTerm(site, 0, siteIndex + 1, 1, "n");
    for (let earlier = 0; earlier < siteIndex; earlier += 1) {
      addTerm(site, earlier + 1, earlier + 1, 1, "I");
      addTerm(site, earlier + 1, end, U * metric[earlier][siteIndex], "n");
    }
    return {bondDimension, entries: site};
  });
};
const localElement = (operator, bra, ket, cutoff) => {
  const charge = ket - cutoff;
  if (operator === "I") return bra === ket ? 1 : 0;
  if (operator === "n") return bra === ket ? charge : 0;
  if (operator === "n2") return bra === ket ? charge * charge : 0;
  if (operator === "shift") return Math.abs(bra - ket) === 1 ? 1 : 0;
  throw new Error(`unknown operator ${operator}`);
};
const mpoElement = (mpo, bra, ket, cutoff) => {
  const dimension = mpo[0].bondDimension;
  let boundary = Array(dimension).fill(0);
  boundary[0] = 1;
  for (let siteIndex = 0; siteIndex < mpo.length; siteIndex += 1) {
    const next = Array(dimension).fill(0);
    for (const [key, terms] of mpo[siteIndex].entries) {
      const [from, to] = key.split(",").map(Number);
      if (boundary[from] === 0) continue;
      const value = terms.reduce((sum, {coefficient, operator}) => sum
        + coefficient * localElement(operator, bra[siteIndex], ket[siteIndex], cutoff), 0);
      next[to] += boundary[from] * value;
    }
    boundary = next;
  }
  return boundary[dimension - 1];
};
const directElement = (size, bra, ket, cutoff, U = 0.01, u = 1) => {
  const changed = [];
  for (let site = 0; site < size; site += 1) if (bra[site] !== ket[site]) changed.push(site);
  if (changed.length === 1 && Math.abs(bra[changed[0]] - ket[changed[0]]) === 1) return -u / 2;
  if (changed.length) return 0;
  const charge = ket.map((value) => value - cutoff);
  let kinetic = 0;
  for (let i = 0; i < size; i += 1) for (let j = 0; j < size; j += 1) {
    kinetic += charge[i] * metric[i][j] * charge[j];
  }
  return U * kinetic / 2 + size * u;
};
const decode = (index, size, localDimension) => {
  const state = Array(size);
  for (let site = size - 1; site >= 0; site -= 1) {
    state[site] = index % localDimension;
    index = Math.floor(index / localDimension);
  }
  return state;
};

const exhaustiveChecks = [];
for (let size = 1; size <= 4; size += 1) {
  const cutoff = 1;
  const localDimension = 2 * cutoff + 1;
  const dimension = localDimension ** size;
  const mpo = buildAutomatonMpo(size);
  let maximumError = 0;
  let parityError = 0;
  for (let row = 0; row < dimension; row += 1) for (let column = 0; column < dimension; column += 1) {
    const bra = decode(row, size, localDimension);
    const ket = decode(column, size, localDimension);
    const direct = directElement(size, bra, ket, cutoff);
    const represented = mpoElement(mpo, bra, ket, cutoff);
    maximumError = Math.max(maximumError, Math.abs(direct - represented));
    const invertedBra = bra.map((value) => 2 * cutoff - value);
    const invertedKet = ket.map((value) => 2 * cutoff - value);
    parityError = Math.max(parityError, Math.abs(direct
      - directElement(size, invertedBra, invertedKet, cutoff)));
  }
  exhaustiveChecks.push({channels: size, cutoff, HilbertDimension: dimension,
    maximumMatrixElementError: maximumError, maximumParityCommutatorElement: parityError});
}

const nonzeroMetricPairs = inverse.reduce((count, row, i) => count
  + row.slice(i + 1).filter((value) => value !== 0n).length, 0);
const maximumCrossCutRank = Math.max(...crossCutRanks);
console.log(JSON.stringify({
  schemaVersion: "leech-joined-cell-mpo-run-v1",
  channels,
  Hamiltonian: "H=(U/2)n^T G^-1 n+u sum_i(1-cos theta_i)",
  exactMetric: {inverseIntegral: true, nonzeroOffDiagonalPairs: nonzeroMetricPairs},
  automatonMpo: {
    exactBondDimensionUpperBound: channels + 2,
    construction: "start one charge channel at site i, propagate identity, and close it at site j with U(G^-1)_ij n_j; local diagonal and cosine terms take the direct start-to-end path"
  },
  crossCutRanks,
  maximumCrossCutRank,
  compressedQuadraticBondDimensionTarget: maximumCrossCutRank + 2,
  parity: "global inversion n_i -> -n_i is exact and splits the lowest even and odd levels",
  exhaustiveChecks,
  certificationProtocol: [
    "optimize the lowest even and odd MPS independently while increasing bond dimension and local cutoff",
    "freeze normalized tensors and compute Rayleigh values plus full MPO residual norms",
    "obtain lower enclosures using a validated block-Lanczos or Lehmann-Goerisch/inertia step, not residual proximity alone",
    "require disjoint even-ground and odd-first intervals and convergence under cutoff, bond dimension and site ordering",
    "rebuild strip thermal, stability and hopping packets only from the resulting joined-cell interval"
  ],
  boundary: "The MPO identity is exact, but DMRG Ritz values alone are upper bounds. No spectral gap is certified until the stated lower-enclosure step is executed."
}, null, 2));
