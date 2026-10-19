import assert from "node:assert/strict";

const lambda = [5, 5, 1, 1, 1, 0];
const q = [1, -1, -1, -3, 3, 3];
const multiplicity = [6, 3, 3, 2, 1, 1];
const edges = [
  [1, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 1],
];
const dot = (x, y) => x.reduce((s, xi, i) => s + xi * y[i], 0);
assert.deepEqual(edges.map((e) => dot(e, lambda)), [10, 6, 2, 1]);
assert.deepEqual(edges.map((e) => dot(e, q)), [0, 0, 0, 0]);

const columnsTimesSix = [
  [10, 20, 0, 0, 0, 0],
  [6, 0, 12, 0, 0, 0],
  [0, 0, 0, 6, 12, 0],
  [0, 0, 0, 3, 0, 6],
  lambda.map((x) => -6 * x),
  q.map((x) => -6 * x),
];
const matrix = Array.from({length: 6}, (_, i) => columnsTimesSix.map((c) => BigInt(c[i])));

function bareissDet(input) {
  const A = input.map((r) => r.slice());
  let sign = 1n;
  let previous = 1n;
  for (let k = 0; k < A.length - 1; k++) {
    let pivotRow = k;
    while (pivotRow < A.length && A[pivotRow][k] === 0n) pivotRow++;
    if (pivotRow === A.length) return 0n;
    if (pivotRow !== k) {
      [A[k], A[pivotRow]] = [A[pivotRow], A[k]];
      sign = -sign;
    }
    const pivot = A[k][k];
    for (let i = k + 1; i < A.length; i++) {
      for (let j = k + 1; j < A.length; j++) {
        A[i][j] = (A[i][j] * pivot - A[i][k] * A[k][j]) / previous;
      }
    }
    previous = pivot;
  }
  return sign * A.at(-1).at(-1);
}

const determinant = bareissDet(matrix);
assert.equal(determinant, -8087040n);

function breakingImage(weights, x) {
  const violations = edges.map((e) => dot(e, x));
  return x.map((_, i) => edges.reduce((s, e, a) => s + e[i] * weights[a] * violations[a], 0) / multiplicity[i]);
}
assert.deepEqual(breakingImage([1, 2, 3, 4], q), [0, 0, 0, 0, 0, 0]);

console.log("PASS Yukawa-breaking source-plane nonclosure");
console.log(`determinant=${determinant}`);
console.log("nonzero_weight_solution=false");
console.log("interpretation=spurion_form_not_full_anomalous_dimension");
