#!/usr/bin/env node

function transpose(A) { return A[0].map((_, j) => A.map((row) => row[j])); }
function mul(A, B) { return A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0))); }
function tr(A) { return A.reduce((s, row, i) => s + row[i], 0); }
function rot12(t) { return [[Math.cos(t), -Math.sin(t), 0], [Math.sin(t), Math.cos(t), 0], [0, 0, 1]]; }
function rot23(t) { return [[1, 0, 0], [0, Math.cos(t), -Math.sin(t)], [0, Math.sin(t), Math.cos(t)]]; }
function diag(v) { return v.map((x, i) => v.map((_, j) => i === j ? x : 0)); }
function moment(A, B, p, q) {
  let Ap = diag([1, 1, 1]), Bq = diag([1, 1, 1]);
  for (let i = 0; i < p; i += 1) Ap = mul(Ap, A);
  for (let i = 0; i < q; i += 1) Bq = mul(Bq, B);
  return tr(mul(Ap, Bq));
}

const P = diag([1, 0, 0]);
const Q = diag([0, 1, 1]);
const A = diag([1, 4, 9]);
const D = diag([2, 7, 11]);
const U = mul(rot12(0.53), rot23(0.81));
const B = mul(mul(U, D), transpose(U));
const g = rot23(0.47);
const Brotated = mul(mul(g, B), transpose(g));

function invariants(X) {
  const X2 = mul(X, X);
  const s = tr(mul(P, X));
  const t = tr(mul(P, X2));
  const T1 = tr(X);
  const T2 = tr(X2);
  const compression = mul(mul(Q, X), Q);
  const detCompression = compression[1][1] * compression[2][2] - compression[1][2] * compression[2][1];
  const formula = 0.5 * (T1 * T1 - T2) - T1 * s + t;
  const fullMoments = [[1, 1], [2, 1], [1, 2], [2, 2]].map(([p, q]) => moment(A, X, p, q));
  return { s, t, detCompression, formula, fullMoments };
}

const before = invariants(B);
const after = invariants(Brotated);
const determinantIdentityError = Math.max(
  Math.abs(before.detCompression - before.formula),
  Math.abs(after.detCompression - after.formula),
);
const twoMomentChange = Math.max(Math.abs(before.s - after.s), Math.abs(before.t - after.t));
const fullMomentChange = Math.max(...before.fullMoments.map((x, i) => Math.abs(x - after.fullMoments[i])));
const passed = determinantIdentityError < 1e-10 && twoMomentChange < 1e-10 && fullMomentChange > 1e-3;

console.log(JSON.stringify({
  protocol: "single-link-two-moment-no-go-certificate/1",
  before,
  afterComplementRotation: after,
  determinantIdentityError,
  twoMomentChange,
  fullMomentChange,
  conclusion: "the isotropic one-link determinant is blind to the CP1 frame completion",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
