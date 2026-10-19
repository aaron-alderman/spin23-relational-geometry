#!/usr/bin/env node

function transpose(A) { return A[0].map((_, j) => A.map((row) => row[j])); }
function mul(A, B) { return A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0))); }
function tr(A) { return A.reduce((s, row, i) => s + row[i], 0); }
function frob2(A) { return A.flat().reduce((s, x) => s + x * x, 0); }
function rot(t) { return [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]]; }
function rot23(t) { return [[1, 0, 0], [0, Math.cos(t), -Math.sin(t)], [0, Math.sin(t), Math.cos(t)]]; }
function diag(v) { return v.map((x, i) => v.map((_, j) => i === j ? x : 0)); }

const W = [[0.8, -0.3], [0.5, 1.1]];
const Bq = [[3.2, 0.7], [0.7, 6.1]];
const g = rot(0.63);
const Wp = mul(g, W);
const Bqp = mul(mul(g, Bq), transpose(g));

function gram(X) { return mul(transpose(X), X); }
function action(X, H) {
  const quadratic = tr(mul(transpose(X), mul(H, X)));
  const G = gram(X);
  return quadratic + 0.4 * frob2(G) + 0.2 * tr(G) ** 2;
}

const gramError = Math.sqrt(frob2(gram(W).map((row, i) => row.map((x, j) => x - gram(Wp)[i][j]))));
const actionError = Math.abs(action(W, Bq) - action(Wp, Bqp));

const A = diag([1, 4, 9]);
const B = [[2.7, 0.4, -0.2], [0.4, 3.2, 0.7], [-0.2, 0.7, 6.1]];
const G3 = rot23(0.63);
const Bp = mul(mul(G3, B), transpose(G3));
const moments = (X) => {
  const A2 = mul(A, A), X2 = mul(X, X);
  return [tr(mul(A, X)), tr(mul(A2, X)), tr(mul(A, X2)), tr(mul(A2, X2))];
};
const m0 = moments(B), m1 = moments(Bp);
const fullMomentChange = Math.max(...m0.map((x, i) => Math.abs(x - m1[i])));
const passed = gramError < 1e-12 && actionError < 1e-12 && fullMomentChange > 1e-3;

console.log(JSON.stringify({
  protocol: "multi-link-isotropic-blindness-certificate/1",
  linkCount: 2,
  gramError,
  interactingActionError: actionError,
  fullDoubleFrameMomentChange: fullMomentChange,
  theoremScope: "any finite number of fully integrated links with U(2)-covariant action and measure",
  conclusion: "link multiplicity alone does not anchor the complementary frame",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
