import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => z(a.re * s, a.im * s);
const conj = a => z(a.re, -a.im);
const close = (a, b, eps = 1e-9) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const mulM = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const transpose = A => A[0].map((_, i) => A.map(row => row[i]));
const star = A => A.map(row => row.map(conj));
const trace = A => A.reduce((s, row, i) => add(s, row[i]), z(0));
const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => z(i === j ? 1 : 0)));
const diag = xs => xs.map((x, i) => xs.map((_, j) => z(i === j ? x : 0)));
const diagC = xs => xs.map((x, i) => xs.map((_, j) => i === j ? x : z(0)));
const power = (A, n) => {
  let out = I(A.length);
  for (let i = 0; i < n; i++) out = mulM(out, A);
  return out;
};
const cycle = (H, M, p, q, r, s) => trace(
  [power(star(H), p), M, power(H, q), dagger(M), power(star(H), r), M, power(H, s), dagger(M)]
    .reduce((A, B) => mulM(A, B)),
);

const H = diag([0.3, 1.7, 4.2]);
const M = [
  [z(0.7, 0.2), z(-0.1, 0.5), z(0.3, -0.4)],
  [z(-0.1, 0.5), z(1.1, -0.6), z(0.2, 0.7)],
  [z(0.3, -0.4), z(0.2, 0.7), z(0.9, 0.1)],
];
assert(M.every((row, i) => row.every((x, j) => close(x, M[j][i]))));

assert(Math.abs(cycle(H, M, 0, 0, 0, 0).im) < 1e-9);
for (const exponents of [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]) {
  assert(Math.abs(cycle(H, M, ...exponents).im) < 1e-9);
}
const J = cycle(H, M, 1, 1, 0, 0).im;
assert(Math.abs(J) > 1e-6);
assert(close(z(J), z(-cycle(H, M, 1, 0, 0, 1).im)));

// Weak-basis invariance under a complex Fourier unitary.
const omega = z(-0.5, Math.sqrt(3) / 2);
const W = Array.from({ length: 3 }, (_, row) => Array.from({ length: 3 }, (_, col) => {
  let value = z(1);
  for (let n = 0; n < (row * col) % 3; n++) value = mul(value, omega);
  return scale(value, 1 / Math.sqrt(3));
}));
const Hp = mulM(mulM(dagger(W), H), W);
const Mp = mulM(mulM(transpose(W), M), W);
const Jp = cycle(Hp, Mp, 1, 1, 0, 0).im;
assert(Math.abs(Jp - J) < 1e-8);

// In the real charged-lepton frame, coefficient conjugation reverses CP sign.
const Jconjugate = cycle(H, star(M), 1, 1, 0, 0).im;
assert(Math.abs(Jconjugate + J) < 1e-9);

// Real two-flavor mixing plus one Majorana phase: no Dirac phase is present.
const theta = 0.63;
const R = [
  [z(Math.cos(theta)), z(Math.sin(theta)), z(0)],
  [z(-Math.sin(theta)), z(Math.cos(theta)), z(0)],
  [z(0), z(0), z(1)],
];
const RT = transpose(R);
const phaseMass = alpha => diagC([z(0.4), mul(z(1.3), z(Math.cos(-alpha), Math.sin(-alpha))), z(2.1)]);
const majoranaMass = alpha => mulM(mulM(R, phaseMass(alpha)), RT);
const J0 = cycle(H, majoranaMass(0), 1, 1, 0, 0).im;
const Jphase = cycle(H, majoranaMass(0.7), 1, 1, 0, 0).im;
assert(Math.abs(J0) < 1e-10);
assert(Math.abs(Jphase) > 1e-6);

console.log('Polynomial Majorana CP-invariant certificate: PASS');
console.log(`J_generic=${J}; basis_difference=${Math.abs(Jp - J)}; J_majorana_phase=${Jphase}`);
