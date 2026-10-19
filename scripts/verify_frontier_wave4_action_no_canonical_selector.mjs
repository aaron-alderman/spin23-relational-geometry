import assert from "node:assert/strict";

const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, v) => A.map(r => r.reduce((s, x, i) => s + x * v[i], 0));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const outer = (u, v) => u.map(x => v.map(y => x * y));
const isZero = A => A.every(r => r.every(x => x === 0));
const isParallel = (u, v) => {
  for (let i = 0; i < u.length; i++) for (let j = i + 1; j < u.length; j++) {
    if (u[i] * v[j] !== u[j] * v[i]) return false;
  }
  return true;
};
const isScalarMatrix = A => A.every((r, i) => r.every((x, j) => x === (i === j ? A[0][0] : 0)));

function couplings(h, f) {
  return [
    [h, f, f],
    [2 * h, -2 * f, 2 * f],
    [-2 * h, 0, 0],
  ];
}
const gram = C => mul(transpose(C), C);

const q = [1, 1, 1];
const safe = [-2, 1, 1];
const K1 = gram(couplings(1, 1));
const K2 = gram(couplings(2, 1));
assert.deepEqual(K1, [[9, -3, 5], [-3, 5, -3], [5, -3, 5]]);
assert.deepEqual(K2, [[36, -6, 10], [-6, 5, -3], [10, -3, 5]]);
assert.equal(isScalarMatrix(K1), false);
assert.equal(isParallel(mv(K1, q), q), false, "q_QQ is not an eigenvector of the complete benchmark kernel");
assert.equal(isParallel(mv(K1, safe), safe), false, "the algebraic safe vector is not a mass eigenvector");

const commutator = sub(mul(K1, K2), mul(K2, K1));
assert.equal(isZero(commutator), false, "same-support allowed Yukawa points have incompatible eigenbases");

const Kqq = outer(q, q);
assert.equal(isParallel(mv(Kqq, q), q), true, "QQ-only truncation imports the desired row");
const qUnequal = [2, 1, 1];
assert.equal(isParallel(qUnequal, q), false, "an allowed Yukawa ratio rotates even the QQ-only danger line");

const delta = [[0, 1, 0], [1, 0, 0], [0, 0, 0]];
assert.equal(isParallel(mv(add(Kqq, delta), q), q), false, "an allowed Hermitian finite term rotates q");

// Identical full support, but incompatible positive spectral operators.
const D1 = [[1, 1, 1], [1, 2, 1], [1, 1, 3]];
const D2 = [[2, 1, 1], [1, 3, 2], [1, 2, 1]];
assert.deepEqual(D1.map(r => r.map(Boolean)), D2.map(r => r.map(Boolean)));
const H1 = gram(D1);
const H2 = gram(D2);
assert.equal(isZero(sub(mul(H1, H2), mul(H2, H1))), false, "support does not determine a common eigenbasis");

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const lambdaD = [5, 5, 1, 1, 1, 0, 0];
const lambdaM = [5, 5, 1, 1, 3, 0, 0];
assert.deepEqual(mv(V, lambdaD), [10, 6, 2, 1]);
assert.deepEqual(mv(V, lambdaM), [10, 6, 4, 1]);
assert.deepEqual(K1, gram(couplings(1, 1)), "the same exceptional kernel is compatible with either source incidence ray");

console.log("PASS wave-4 action audit: non-scalar kernels exist, but action/support/counterterms do not canonically orient W or select an incidence ray");
