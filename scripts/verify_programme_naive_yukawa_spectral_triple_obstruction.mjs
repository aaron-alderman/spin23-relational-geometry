import assert from "node:assert/strict";

const n = 6;
const gamma = [1, -1, -1, 1, -1, -1];
const edges = [[0, 1], [0, 2], [3, 4], [3, 5]];
const weights = [2, 3, 5, 7];
const D = Array.from({length: n}, () => Array(n).fill(0));
for (let k = 0; k < edges.length; k++) {
  const [i, j] = edges[k];
  D[i][j] = D[j][i] = weights[k];
}

const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B, sign = 1) => A.map((r, i) => r.map((x, j) => x + sign * B[i][j]));
const diag = (x) => x.map((xi, i) => x.map((_, j) => i === j ? xi : 0));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const zero = (A) => A.every((r) => r.every((x) => x === 0));

assert.deepEqual(D, transpose(D));
const G = diag(gamma);
assert(zero(add(mul(D, G), mul(G, D))), "D must be odd");

// Order zero for the naive J=complex conjugation: all diagonal actions commute.
const a0 = diag([1, 2, 3, 4, 5, 6]);
const b0 = diag([6, 5, 4, 3, 2, 1]);
assert(zero(add(mul(a0, b0), mul(b0, a0), -1)));

// Every nonzero Yukawa edge violates first order for endpoint projectors.
for (const [i, j] of edges) {
  const ai = Array(n).fill(0); ai[i] = 1;
  const bj = Array(n).fill(0); bj[j] = 1;
  const A = diag(ai); const B = diag(bj);
  const commDA = add(mul(D, A), mul(A, D), -1);
  const firstOrder = add(mul(commDA, B), mul(B, commDA), -1);
  assert(!zero(firstOrder), `edge ${i}-${j} should fail first order`);
  assert.notEqual(firstOrder[i][j], 0);
}

// Scalar algebra passes, illustrating the loss of internal resolution.
const scalarA = diag(Array(n).fill(2));
const scalarB = diag(Array(n).fill(-3));
const commDScalar = add(mul(D, scalarA), mul(scalarA, D), -1);
const firstScalar = add(mul(commDScalar, scalarB), mul(scalarB, commDScalar), -1);
assert(zero(firstScalar));

console.log("PASS naive Yukawa spectral-triple obstruction");
console.log("grading_and_self_adjointness=true");
console.log("order_zero=true");
console.log(`first_order_failed_edges=${edges.length}/${edges.length}`);
console.log("required_repair=bimodule-arrow Hilbert space");
