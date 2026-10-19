#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const multiply = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map(r => r.map(x => s * x));
const close = (A, B, tol = 1e-7) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const outer = v => v.map(x => v.map(y => x * y));
const rotation = theta => [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
const diag = (a, b) => [[a, 0], [0, b]];

const response = (t, p, rotated = true) => {
  const O = rotated ? rotation(0.7 * t + 0.2 * t * t) : diag(1, 1);
  const D = diag(Math.pow(t, 4), 1);
  const Dplus = Math.abs(t) > eps ? diag(Math.pow(t, -4), 1) : diag(0, 1);
  const Y = [[2 * Math.pow(t, p), 1], [-1 * Math.pow(t, p), 3]];
  const C = multiply(multiply(O, D), transpose(O));
  const Cplus = multiply(multiply(O, Dplus), transpose(O));
  const X = multiply(Y, transpose(O));
  return multiply(multiply(X, Cplus), transpose(X));
};

for (const p of [1, 2, 3]) {
  for (const t of [0.2, 0.05, -0.1]) {
    assert(close(response(t, p, true), response(t, p, false)), `rotation invariance failed for p=${p}, t=${t}`);
  }
}

const regular = outer([1, 3]);
const singularCoefficient = outer([2, -1]);

// p=2: finite extra rank-one remnant beyond the pointwise pseudoinverse fiber.
const equalityLimit = response(1e-4, 2, true);
assert(close(equalityLimit, add(regular, singularCoefficient), 1e-5), "finite-remnant limit failed");
assert(close(response(0, 2, true), regular), "pointwise pseudoinverse fiber failed");
assert(!close(equalityLimit, response(0, 2, true), 1e-3), "equality case should retain a jump");

// p=3: extra term vanishes and agrees with the pointwise fiber.
assert(close(response(1e-3, 3, true), regular, 1e-5), "removable-zero limit failed");
assert(close(response(0, 3, true), regular), "removable-zero fiber failed");

// p=1: the rank-one term grows as t^-2.
const poleTrace = A => A[0][0] + A[1][1];
assert(poleTrace(response(1e-4, 1, true)) > 1e8, "pole regime failed");

console.log("Rotating-support Schur invariance certificate: PASS");
console.log("analytic_orthogonal_rotation_cancels=true; valuation_trichotomy_unchanged=true");
console.log("p=1:pole; p=2:finite_rank_one_remnant; p=3:pointwise_MP_continuous");
