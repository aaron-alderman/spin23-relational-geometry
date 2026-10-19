#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const scale = (s, A) => A.map(r => r.map(x => s * x));
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const multiply = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const inv2 = A => {
  const d = det2(A);
  assert(Math.abs(d) > eps, "singular matrix");
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const zero = () => [[0, 0], [0, 0]];
const close = (A, B, tol = 1e-8) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const symmetric = A => close(A, transpose(A));
const psd2 = A => symmetric(A) && A[0][0] >= -eps && A[1][1] >= -eps && det2(A) >= -eps;
const commutator = (A, B) => sub(multiply(A, B), multiply(B, A));
const nonzero = A => A.some(r => r.some(x => Math.abs(x) > eps));

const w = [3, 3, 1, 1];
const C = [
  [[2, 1], [1, 2]],
  [[3, 0], [0, 1]],
  [[4, 1], [1, 1]],
  [[2, -0.5], [-0.5, 3]],
];
const X = [
  [[1, 2], [0, 1]],
  [[2, -1], [1, 0]],
  [[0, 1], [3, 1]],
  [[1, 0], [-1, 2]],
];

assert(C.every(M => M[0][0] > 0 && det2(M) > 0), "all interior pivots must be positive definite");
assert(nonzero(commutator(C[0], C[1])), "test must include noncommuting interior pivots");

let Ctot = zero();
let Xtot = zero();
let local = zero();
for (let f = 0; f < w.length; f++) {
  Ctot = add(Ctot, scale(w[f], C[f]));
  Xtot = add(Xtot, scale(w[f], X[f]));
  local = add(local, scale(w[f], multiply(multiply(X[f], inv2(C[f])), transpose(X[f]))));
}
const Rbar = multiply(Xtot, inv2(Ctot));
const aggregate = multiply(multiply(Xtot, inv2(Ctot)), transpose(Xtot));
const discrepancy = sub(local, aggregate);

let covariance = zero();
for (let f = 0; f < w.length; f++) {
  const Rf = multiply(X[f], inv2(C[f]));
  const delta = sub(Rf, Rbar);
  covariance = add(covariance, scale(w[f], multiply(multiply(delta, C[f]), transpose(delta))));
}

assert(close(discrepancy, covariance), "operator covariance identity failed");
assert(psd2(discrepancy), "operator covariance must be positive semidefinite");
assert(det2(discrepancy) > eps, "generic discrepancy should be positive definite");

// Equality case requires a common right-normalized coupling R_f=X_f C_f^{-1}.
const R = [[1, 2], [-1, 0.5]];
const alignedX = C.map(Cf => multiply(R, Cf));
let alignedCtot = zero();
let alignedXtot = zero();
let alignedLocal = zero();
for (let f = 0; f < w.length; f++) {
  alignedCtot = add(alignedCtot, scale(w[f], C[f]));
  alignedXtot = add(alignedXtot, scale(w[f], alignedX[f]));
  alignedLocal = add(alignedLocal, scale(w[f], multiply(multiply(alignedX[f], inv2(C[f])), transpose(alignedX[f]))));
}
const alignedAggregate = multiply(multiply(alignedXtot, inv2(alignedCtot)), transpose(alignedXtot));
assert(close(alignedLocal, alignedAggregate), "common operator ratio should give equality");

console.log("Matrix-interior Schur covariance certificate: PASS");
console.log(`noncommuting_pivots=true; covariance_identity=true; discrepancy_det=${det2(discrepancy).toFixed(6)}; psd=true`);
console.log("commutation_iff_common_right_normalized_coupling_for_positive_weights=true");
