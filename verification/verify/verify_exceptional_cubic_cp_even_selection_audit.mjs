import assert from 'node:assert/strict';

// Exact source counts.
assert.equal(3 * 240 * (1 + 16 + 16 ** 2), 196560);
assert.equal(240 * 819, 196560);
assert.equal(819, 3 * (1 + 16 + 16 ** 2));

// The 13:27 orbit weights come from the fourth-moment equations.
const wMixed = (1 / 15) / (8 / 81);
const wAxis = 1 - wMixed;
assert(Math.abs(wAxis - 13 / 40) < 1e-14);
assert(Math.abs(wMixed - 27 / 40) < 1e-14);
assert(Math.abs(wAxis * (1 / 3) + wMixed * (11 / 81) - 1 / 5) < 1e-14);

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => z(a.re, -a.im);
const mulM = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const trace = A => A.reduce((s, row, i) => add(s, row[i]), z(0));
const star = A => A.map(row => row.map(conj));
const det3 = A => add(
  sub(mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))), mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))),
  mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))),
);
const close = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;

// A generic Hermitian element of H_3(C), the complex flag subalgebra.
const X = [
  [z(1.2), z(0.3, 0.7), z(-0.4, 0.2)],
  [z(0.3, -0.7), z(-0.6), z(0.8, -0.1)],
  [z(-0.4, -0.2), z(0.8, 0.1), z(2.1)],
];
const Xc = star(X);
const tr1 = trace(X);
const tr2 = trace(mulM(X, X));
const determinant = det3(X);
assert(Math.abs(tr1.im) < 1e-10);
assert(Math.abs(tr2.im) < 1e-10);
assert(Math.abs(determinant.im) < 1e-10);
assert(close(trace(Xc), tr1));
assert(close(trace(mulM(Xc, Xc)), tr2));
assert(close(det3(Xc), determinant));

console.log('Exceptional cubic CP-even selection audit: PASS');
console.log(`Wilson=${196560}; Jordan_roots=${819}; weights=${13}:${27}; det_conjugation_even=true`);
