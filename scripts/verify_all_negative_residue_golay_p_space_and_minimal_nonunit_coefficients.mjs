import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;

const rref = (matrix) => {
  const a = matrix.map((row) => row.map(mod));
  let rank = 0;
  const pivots = [];
  for (let col = 0; col < (a[0]?.length ?? 0) && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const inv = a[rank][col] === 1 ? 1 : 2;
    for (let j = col; j < a[rank].length; j += 1) a[rank][j] = mod(inv * a[rank][j]);
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col] !== 0) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) a[i][j] = mod(a[i][j] - factor * a[rank][j]);
    }
    pivots.push(col);
    rank += 1;
  }
  return { rows: a.slice(0, rank), pivots };
};

const nullspace = (matrix) => {
  const { rows, pivots } = rref(matrix);
  const width = matrix[0].length;
  const pivotSet = new Set(pivots);
  const free = Array.from({ length: width }, (_, i) => i).filter((i) => !pivotSet.has(i));
  return free.map((freeColumn) => {
    const vector = Array(width).fill(0);
    vector[freeColumn] = 1;
    for (let i = 0; i < pivots.length; i += 1) vector[pivots[i]] = mod(-rows[i][freeColumn]);
    return vector;
  });
};

const dot = (a, b) => mod(a.reduce((sum, x, i) => sum + x * b[i], 0));
const weight = (a) => a.filter((x) => mod(x) !== 0).length;
const sum = (a) => mod(a.reduce((total, x) => total + x, 0));

// GUAVA convention for the cyclic ternary Golay [11,6,5] code:
// g(x)=2+x^2+2x^3+x^4+x^5.
const generatorPolynomial = [2, 0, 1, 2, 1, 1];
const golay = Array.from({ length: 6 }, (_, shift) => Array.from({ length: 11 }, (_, coordinate) => {
  const i = coordinate - shift;
  return i >= 0 && i < generatorPolynomial.length ? generatorPolynomial[i] : 0;
}));
assert.equal(rref(golay).rows.length, 6);

const S = nullspace(golay);
assert.equal(S.length, 5);
assert(S.every((a) => S.every((b) => dot(a, b) === 0)));
assert(S.every((row) => sum(row) === 0));

const enumerateCode = (basis) => {
  const out = [];
  for (let code = 0; code < p ** basis.length; code += 1) {
    let digits = code;
    const word = Array(basis[0].length).fill(0);
    for (const row of basis) {
      const coefficient = digits % p;
      digits = Math.floor(digits / p);
      for (let j = 0; j < word.length; j += 1) word[j] = mod(word[j] + coefficient * row[j]);
    }
    out.push(word);
  }
  return out;
};

const golayWords = enumerateCode(golay);
const dualWords = enumerateCode(S);
const distribution = (words) => {
  const counts = {};
  for (const word of words) counts[weight(word)] = (counts[weight(word)] ?? 0) + 1;
  return counts;
};
const golayWeightDistribution = distribution(golayWords);
const dualWeightDistribution = distribution(dualWords);
assert.equal(Math.min(...golayWords.filter((word) => weight(word) > 0).map(weight)), 5);
assert.equal(Math.min(...dualWords.filter((word) => weight(word) > 0).map(weight)), 6);

const logicalWords = golayWords.filter((word) => sum(word) !== 0);
const pDistance = Math.min(...logicalWords.map(weight));
assert.equal(pDistance, 5);
const logicalWitness = logicalWords.find((word) => weight(word) === pDistance);

const residuePopulations = (target) => Array.from({ length: 12 }, (_, plus) => plus)
  .filter((plus) => mod(2 * plus - 11) === mod(target));
assert.deepEqual(residuePopulations(1), [0, 3, 6, 9]);
assert.deepEqual(residuePopulations(-1), [2, 5, 8, 11]);

// In the all-negative residue class, mu_i=-1+3k_i and sum(mu_i)=1 imply
// sum(k_i)=4. The least-L1 solution is four +2 entries and seven -1 entries.
const minimalMu = [2, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1];
assert.equal(minimalMu.reduce((a, b) => a + b, 0), 1);
assert(minimalMu.every((x) => mod(x) === 2));
assert.equal(minimalMu.reduce((a, b) => a + Math.abs(b), 0), 15);

console.log(JSON.stringify({
  protocol: "all-negative-residue-golay-p-space/1",
  ternaryGolay: {
    parameters: "[11,6,5]_3",
    cyclicGeneratorPolynomial: generatorPolynomial,
    generatorMatrix: golay,
    weightDistribution: golayWeightDistribution,
  },
  pSpace: {
    basis: S,
    dimension: S.length,
    selfOrthogonal: true,
    rowSumsZero: true,
    dualParameters: "[11,5,6]_3",
    dualWeightDistribution,
    pDistance,
    logicalWitness,
    logicalWitnessSum: sum(logicalWitness),
  },
  exactCoefficientTargets: {
    residuePopulationsForNPlusOne: residuePopulations(1),
    residuePopulationsForNMinusOne: residuePopulations(-1),
    minimalAllNegativeResidueNPlusOne: minimalMu,
    minimalL1Norm: 15,
  },
  conclusion: "The finite ternary Golay P-space survives in the all-negative residue class. The next obstruction is purely integral: lift its five generators with four coefficients +2 and seven coefficients -1, up to permutation, while satisfying the exact weighted linear and quadratic identities.",
  passed: true,
}, null, 2));
