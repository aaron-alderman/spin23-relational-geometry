#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const scale = (s, A) => A.map(r => r.map(x => s * x));
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const multiply = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const trace2 = A => A[0][0] + A[1][1];
const zero = () => [[0, 0], [0, 0]];
const identity = [[1, 0], [0, 1]];
const close = (A, B, tol = 1e-8) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const norm2 = A => A.flat().reduce((s, x) => s + x * x, 0);
const psd2 = A => close(A, transpose(A)) && A[0][0] >= -eps && A[1][1] >= -eps && det2(A) >= -eps;
const pinv2psd = A => {
  const d = det2(A);
  if (d > eps) return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
  const tr = trace2(A);
  if (tr <= eps) return zero();
  return scale(1 / (tr * tr), A); // rank-one PSD: A=lambda uu^T
};

const w = [3, 3, 1, 1];
const C = [
  [[1, 0], [0, 0]],
  [[0, 0], [0, 2]],
  [[1, 1], [1, 1]],
  [[2, -1], [-1, 0.5]],
];
const seedR = [
  [[1, 2], [0, 1]],
  [[2, -1], [1, 0]],
  [[0, 1], [3, 1]],
  [[1, 0], [-1, 2]],
];
const X = C.map((Cf, f) => multiply(seedR[f], Cf));

assert(C.every(psd2), "all pivots must be PSD");
assert(C.every(Cf => Math.abs(det2(Cf)) < eps), "test pivots should be singular");

// Exact range conditions X_f = X_f C_f^+ C_f.
for (let f = 0; f < C.length; f++) {
  const recovered = multiply(multiply(X[f], pinv2psd(C[f])), C[f]);
  assert(close(X[f], recovered), `range condition failed in channel ${f}`);
}

let Ctot = zero();
let Xtot = zero();
let local = zero();
for (let f = 0; f < w.length; f++) {
  Ctot = add(Ctot, scale(w[f], C[f]));
  Xtot = add(Xtot, scale(w[f], X[f]));
  local = add(local, scale(w[f], multiply(multiply(X[f], pinv2psd(C[f])), transpose(X[f]))));
}
const CtotPlus = pinv2psd(Ctot);
assert(close(Xtot, multiply(multiply(Xtot, CtotPlus), Ctot)), "aggregate range condition failed");
const Rbar = multiply(Xtot, CtotPlus);
const aggregate = multiply(multiply(Xtot, CtotPlus), transpose(Xtot));
const discrepancy = sub(local, aggregate);

let covariance = zero();
for (let f = 0; f < w.length; f++) {
  const Rf = multiply(X[f], pinv2psd(C[f]));
  const delta = sub(Rf, Rbar);
  covariance = add(covariance, scale(w[f], multiply(multiply(delta, C[f]), transpose(delta))));
}
assert(close(discrepancy, covariance), "singular covariance identity failed");
assert(psd2(discrepancy), "singular covariance must be PSD");

// Support-aligned equality: full operators R P_f differ, but all X_f=R C_f.
const commonR = [[1, 2], [-1, 0.5]];
const alignedX = C.map(Cf => multiply(commonR, Cf));
let aC = zero(), aX = zero(), aLocal = zero();
for (let f = 0; f < w.length; f++) {
  aC = add(aC, scale(w[f], C[f]));
  aX = add(aX, scale(w[f], alignedX[f]));
  aLocal = add(aLocal, scale(w[f], multiply(multiply(alignedX[f], pinv2psd(C[f])), transpose(alignedX[f]))));
}
const aAggregate = multiply(multiply(aX, pinv2psd(aC)), transpose(aX));
assert(close(aLocal, aAggregate), "support-aligned equality failed");

// A coupling to a null vector violates the necessary PSD block range condition.
const Cbad = [[1, 0], [0, 0]];
const Xbad = [[0, 1], [0, 0]];
const rangeResidual = sub(Xbad, multiply(multiply(Xbad, pinv2psd(Cbad)), Cbad));
assert(norm2(rangeResidual) > eps, "bad coupling should violate the range condition");

console.log("Singular-channel Schur covariance certificate: PASS");
const reportedDet = Math.abs(det2(discrepancy)) < eps ? 0 : det2(discrepancy);
console.log(`channel_range_conditions=true; aggregate_range_condition=true; covariance_psd=true; det=${reportedDet.toFixed(6)}`);
console.log("equality_is_support_alignment=true; null_coupling_range_violation_detected=true");
