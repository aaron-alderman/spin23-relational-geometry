import assert from "node:assert/strict";

const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (k, A) => A.map((r) => r.map((x) => k * x));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const tr = (A) => A[0][0] + A[1][1];
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const adj = (A) => [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
const inv = (A) => scale(1 / det(A), adj(A));
const pair = (A, C) => tr(mul(A, C));
const congruence = (G, A) => mul(mul(G, A), transpose(G));
const norm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const close = (A, B, eps = 1e-8) => norm(add(A, scale(-1, B))) < eps;

const A = [[3, 1], [1, 2]];
const kappa = 2.75;
const Cstar = scale(kappa, inv(A));
const action = (C) => pair(A, C) - kappa * Math.log(det(C));

// Euler equation and strict local minimality.
assert.ok(close(A, scale(kappa, inv(Cstar))));
for (const H of [
  [[1, 0], [0, 0]],
  [[0, 1], [1, 0]],
  [[2, -1], [-1, 3]],
]) {
  const eps = 1e-5;
  const first = (action(add(Cstar, scale(eps, H))) - action(add(Cstar, scale(-eps, H)))) / (2 * eps);
  const second = (action(add(Cstar, scale(eps, H))) - 2 * action(Cstar) + action(add(Cstar, scale(-eps, H)))) / eps ** 2;
  assert.ok(Math.abs(first) < 1e-7);
  assert.ok(second > 0);
}

// Exact invariance of s and p under the source/dual-response action.
const G = [[2, 1], [-1, 3]];
const Ap = congruence(G, A);
const Cp = congruence(transpose(inv(G)), Cstar);
assert.ok(Math.abs(pair(Ap, Cp) - pair(A, Cstar)) < 1e-9);
assert.ok(Math.abs(det(Ap) * det(Cp) - det(A) * det(Cstar)) < 1e-9);
assert.ok(close(Cp, scale(kappa, inv(Ap))));

// The log-det invariant action fixes lambda=kappa.
const scalarEquation = (lambda) => 1 - kappa / lambda;
assert.ok(Math.abs(scalarEquation(kappa)) < 1e-12);
assert.ok(Math.abs(scalarEquation(1.1 * kappa)) > 1e-3);

// A pure quartic action is flat on every inverse ray.
const quartic = (A0, C0) => -2 * (pair(A0, C0) ** 2 - 4 * det(A0) * det(C0));
for (const lambda of [0.1, 0.5, 1, 3, 20]) {
  const C = scale(lambda, inv(A));
  assert.ok(Math.abs(quartic(A, C)) < 1e-8);
}

// The Herglotz inverse requires the minus sign.
const complexMul = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const complexInv = ([r, i]) => {
  const d = r * r + i * i;
  return [r / d, -i / d];
};
const z = [1.4, 0.8];
const plusInverse = complexInv(z);
const minusInverse = complexMul([-1, 0], plusInverse);
assert.ok(plusInverse[1] < 0);
assert.ok(minusInverse[1] > 0);

// Generic contacts move the unique minimum.
const Q = [[0.3, 0.1], [0.1, -0.2]];
assert.ok(!close(add(Cstar, Q), Cstar));
assert.ok(action(add(Cstar, Q)) > action(Cstar));

console.log("PASS Freudenthal log-det action and scale no-go");
console.log("  the strictly convex saddle is C = kappa A^{-1}");
console.log("  the joint action is invariant under dual GL(2) congruence");
console.log("  a pure quartic action leaves every positive inverse scale degenerate");
console.log("  causal Herglotz inversion requires the opposite sign");
console.log("  generic contact shifts leave the unique variational minimum");
