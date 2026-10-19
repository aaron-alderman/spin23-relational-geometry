import assert from "node:assert/strict";

const p = 3;
const mod = (x, modulus = p) => ((x % modulus) + modulus) % modulus;
const S = [
  [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
  [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
];
const rows = 5;
const columns = 11;
const variables = rows * columns;
const variable = (i, j) => i * columns + j;

const combinations = (length, size) => {
  const out = [];
  const visit = (start, chosen) => {
    if (chosen.length === size) {
      out.push(chosen);
      return;
    }
    for (let i = start; i < length; i += 1) visit(i + 1, [...chosen, i]);
  };
  visit(0, []);
  return out;
};

const solve = (A, b) => {
  const augmented = A.map((row, i) => [...row.map((x) => mod(x)), mod(b[i])]);
  let rank = 0;
  const pivots = [];
  for (let col = 0; col < variables && rank < augmented.length; col += 1) {
    let pivot = rank;
    while (pivot < augmented.length && augmented[pivot][col] === 0) pivot += 1;
    if (pivot === augmented.length) continue;
    [augmented[rank], augmented[pivot]] = [augmented[pivot], augmented[rank]];
    if (augmented[rank][col] === 2) {
      for (let j = col; j <= variables; j += 1) augmented[rank][j] = mod(2 * augmented[rank][j]);
    }
    for (let i = 0; i < augmented.length; i += 1) if (i !== rank && augmented[i][col] !== 0) {
      const factor = augmented[i][col];
      for (let j = col; j <= variables; j += 1) augmented[i][j] = mod(augmented[i][j] - factor * augmented[rank][j]);
    }
    pivots.push(col);
    rank += 1;
  }
  const consistent = augmented.every((row) => row.slice(0, variables).some((x) => x !== 0) || row[variables] === 0);
  if (!consistent) return { consistent, rank, nullity: null, solution: null };
  const solution = Array(variables).fill(0);
  for (let i = 0; i < pivots.length; i += 1) solution[pivots[i]] = augmented[i][variables];
  return { consistent, rank, nullity: variables - rank, solution };
};

const coefficientRows = [];
// Exact weighted linear equations, divided by three after reduction mod 3.
for (let a = 0; a < rows; a += 1) {
  const equation = Array(variables).fill(0);
  for (let j = 0; j < columns; j += 1) equation[variable(a, j)] = 2;
  coefficientRows.push(equation);
}
// Exact weighted Gram equations, divided by three after reduction mod 3.
for (let a = 0; a < rows; a += 1) for (let b = a; b < rows; b += 1) {
  const equation = Array(variables).fill(0);
  for (let j = 0; j < columns; j += 1) {
    equation[variable(a, j)] = mod(equation[variable(a, j)] - S[b][j]);
    equation[variable(b, j)] = mod(equation[variable(b, j)] - S[a][j]);
  }
  coefficientRows.push(equation);
}
assert.equal(coefficientRows.length, 20);

const placements = combinations(columns, 4);
const survivors = [];
for (const positivePositions of placements) {
  const positiveSet = new Set(positivePositions);
  const mu = Array.from({ length: columns }, (_, j) => positiveSet.has(j) ? 2 : -1);
  assert.equal(mu.reduce((a, b) => a + b, 0), 1);
  const rhs = [];
  for (let a = 0; a < rows; a += 1) {
    const base = S[a].reduce((sum, x, j) => sum + x * mu[j], 0);
    assert.equal(mod(base), 0);
    rhs.push(mod(-base / 3));
  }
  for (let a = 0; a < rows; a += 1) for (let b = a; b < rows; b += 1) {
    const base = S[a].reduce((sum, x, j) => sum + x * mu[j] * S[b][j], 0);
    assert.equal(mod(base), 0);
    rhs.push(mod(-base / 3));
  }
  const result = solve(coefficientRows, rhs);
  if (result.consistent) {
    const K = Array.from({ length: rows }, (_, i) => result.solution.slice(i * columns, (i + 1) * columns));
    const G = S.map((row, i) => row.map((x, j) => x + 3 * K[i][j]));
    assert(G.every((row) => mod(row.reduce((sum, x, j) => sum + x * mu[j], 0), 9) === 0));
    assert(G.every((a) => G.every((b) => mod(a.reduce((sum, x, j) => sum + x * mu[j] * b[j], 0), 9) === 0)));
    survivors.push({ positivePositions, rank: result.rank, nullity: result.nullity, sampleLiftMod9: G });
  }
}

assert.equal(placements.length, 330);
console.log(JSON.stringify({
  protocol: "minimal-golay-nonunit-lifts-mod9/1",
  coefficientMultiset: "four +2 and seven -1",
  placementsTested: placements.length,
  linearizedEquations: coefficientRows.length,
  variables,
  placementsSurvivingMod9: survivors.length,
  rankDistribution: Object.fromEntries([...new Set(survivors.map((x) => x.rank))].map((rank) => [rank, survivors.filter((x) => x.rank === rank).length])),
  firstSurvivor: survivors[0] ?? null,
  passed: true,
}, null, 2));
