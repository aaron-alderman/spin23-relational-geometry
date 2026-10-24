import assert from "node:assert/strict";

const EPS = 1e-10;
const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const matrix = (rows) => rows.map((row) => row.map((x) => Array.isArray(x) ? C(x[0], x[1]) : C(x, 0)));
const mm = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C()),
));
const commutator = (A, B) => mm(A, B).map((row, i) => row.map((value, j) => sub(value, mm(B, A)[i][j])));
const flattenReal = (A) => A.flat().flatMap((value) => [value.re, value.im]);
const rank = (vectors) => {
  if (!vectors.length) return 0;
  const A = vectors.map((row) => row.slice());
  let pivotRow = 0;
  for (let col = 0; col < A[0].length && pivotRow < A.length; col += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < A.length; row += 1) {
      if (Math.abs(A[row][col]) > Math.abs(A[pivot][col])) pivot = row;
    }
    if (Math.abs(A[pivot][col]) < EPS) continue;
    [A[pivotRow], A[pivot]] = [A[pivot], A[pivotRow]];
    const divisor = A[pivotRow][col];
    A[pivotRow] = A[pivotRow].map((value) => value / divisor);
    for (let row = 0; row < A.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = A[row][col];
      A[row] = A[row].map((value, j) => value - factor * A[pivotRow][j]);
    }
    pivotRow += 1;
  }
  return pivotRow;
};
const pairwiseCommutators = (basis) => {
  const result = [];
  for (let i = 0; i < basis.length; i += 1) {
    for (let j = i + 1; j < basis.length; j += 1) {
      result.push(flattenReal(commutator(basis[i], basis[j])));
    }
  }
  return result;
};

const pauli = [
  matrix([[0, 1], [1, 0]]),
  matrix([[0, [0, -1]], [[0, 1], 0]]),
  matrix([[1, 0], [0, -1]]),
];

const s3 = Math.sqrt(3);
const gellMann = [
  matrix([[0, 1, 0], [1, 0, 0], [0, 0, 0]]),
  matrix([[0, [0, -1], 0], [[0, 1], 0, 0], [0, 0, 0]]),
  matrix([[1, 0, 0], [0, -1, 0], [0, 0, 0]]),
  matrix([[0, 0, 1], [0, 0, 0], [1, 0, 0]]),
  matrix([[0, 0, [0, -1]], [0, 0, 0], [[0, 1], 0, 0]]),
  matrix([[0, 0, 0], [0, 0, 1], [0, 1, 0]]),
  matrix([[0, 0, 0], [0, 0, [0, -1]], [0, [0, 1], 0]]),
  matrix([[1 / s3, 0, 0], [0, 1 / s3, 0], [0, 0, -2 / s3]]),
];

const pauliBracketRank = rank(pairwiseCommutators(pauli));
const gellMannBracketRank = rank(pairwiseCommutators(gellMann));

const sym = (n) => (n * (n + 1)) / 2;
const exterior = (n) => (n * (n - 1)) / 2;
const jordanDimension = sym(8) + sym(3);
const exteriorDimension = exterior(8) + exterior(3);

assert.equal(jordanDimension, 42);
assert.equal(exteriorDimension, 31);
assert.equal(pauliBracketRank, 3);
assert.equal(gellMannBracketRank, 8);

const targetNumerator = 79 + 48 * Math.sqrt(2) + 42 * Math.sqrt(3) + 3 * Math.sqrt(6);
const readoutDimension = 31104;
const fullBracketImageNumerator = targetNumerator + gellMannBracketRank * Math.sqrt(6);

console.log(JSON.stringify({
  status: "PASS",
  degreeTwoDecomposition: {
    jordanSymmetricSquares: {
      qutrit: sym(8),
      qubit: sym(3),
      total: jordanDimension,
    },
    lieExteriorSquares: {
      qutrit: exterior(8),
      qubit: exterior(3),
      total: exteriorDimension,
    },
  },
  commutatorImages: {
    su2Rank: pauliBracketRank,
    su3Rank: gellMannBracketRank,
  },
  targetRule: {
    retainedCommutatorRank: 3,
    excludedQutritBracketRank: gellMannBracketRank,
    reasonClaimedByTarget: "only sign-valued anticommutation becomes an additional record",
  },
  diagnosticAlternative: {
    assumption: "also retain the full su3 commutator image with the both-exchanges amplitude weight",
    recordCount: 180,
    inverse: readoutDimension / fullBracketImageNumerator,
    warning: "this is a discriminator, not a derived replacement model",
  },
  verdict:
    "the coefficient 42 is the Jordan symmetric-square sector, but exclusive retention of the three-dimensional su2 bracket is a physical sign-only epistemic rule rather than generic Jordan-Lie closure",
}));
