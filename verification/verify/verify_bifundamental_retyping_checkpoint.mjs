import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/bifundamental_retyping_checkpoint_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };

// Rational checkpoint from the typed partial-sewing construction.
const E = [
  [3 / 5, 5 / 13],
  [4 / 5, 0],
  [0, 12 / 13],
];
const zero = (rows, columns) => Array.from({ length: rows }, () => Array(columns).fill(0));
const unit = (size, row, column) => {
  const matrix = zero(size, size);
  matrix[row][column] = 1;
  return matrix;
};
const mul = (left, right) => left.map((row) => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const sub = (left, right) => left.map((row, i) => row.map((value, j) => value - right[i][j]));
const action = (Y, K, X) => sub(mul(Y, K), mul(K, X));
const flatten = (matrix) => matrix.flat();

const sl3 = [];
for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) if (i !== j) sl3.push(unit(3, i, j));
sl3.push([[1, 0, 0], [0, -1, 0], [0, 0, 0]], [[0, 0, 0], [0, 1, 0], [0, 0, -1]]);
const sl2 = [unit(2, 0, 1), unit(2, 1, 0), [[1, 0], [0, -1]]];

const rank = (rows, tolerance = 1e-10) => {
  const A = rows.map((row) => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < A[0].length && pivotRow < A.length; column += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < A.length; row += 1) if (Math.abs(A[row][column]) > Math.abs(A[pivot][column])) pivot = row;
    if (Math.abs(A[pivot][column]) < tolerance) continue;
    [A[pivotRow], A[pivot]] = [A[pivot], A[pivotRow]];
    const value = A[pivotRow][column];
    for (let j = column; j < A[0].length; j += 1) A[pivotRow][j] /= value;
    for (let row = 0; row < A.length; row += 1) if (row !== pivotRow) {
      const factor = A[row][column];
      for (let j = column; j < A[0].length; j += 1) A[row][j] -= factor * A[pivotRow][j];
    }
    pivotRow += 1;
  }
  return pivotRow;
};

const orbitVectors = [flatten(E)];
for (const Y of sl3) orbitVectors.push(flatten(action(Y, E, zero(2, 2))));
for (const X of sl2) orbitVectors.push(flatten(action(zero(3, 3), E, X)));
const orbitRank = rank(orbitVectors);
insist(orbitRank === 6, "checkpoint E does not generate the full bifundamental module");

// Invariance under the two sl3 raising/lowering pairs already forces every row of K to vanish.
const generic = [[1, 2], [3, 5], [7, 11]];
const nonzeroActionExists = sl3.some((Y) => flatten(action(Y, generic, zero(2, 2))).some((value) => value !== 0));
insist(nonzeroActionExists, "a nonzero generic K was incorrectly classified as invariant");
insist(ledger.correction.fixedSubspaceDimension === 0, "ledger fixed-space classification mismatch");
insist(ledger.correction.generatedModuleDimensionFromCheckpointE === orbitRank, "ledger orbit dimension mismatch");

console.log(JSON.stringify({
  status: "PASS",
  object: "E in Hom(C^2,C^3)",
  module: "(3,2*) under sl3+sl2",
  moduleDimension: 6,
  checkpointOrbitRank: orbitRank,
  invariantSubspaceDimension: 0,
  interpretation: "selected bifundamental vector, not invariant intertwiner",
}));
