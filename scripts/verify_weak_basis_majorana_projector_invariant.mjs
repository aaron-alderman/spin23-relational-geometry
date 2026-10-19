import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => z(a.re * s, a.im * s);
const conj = a => z(a.re, -a.im);
const close = (a, b, eps = 1e-9) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const addM = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const subM = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const scaleM = (A, s) => A.map(row => row.map(x => scale(x, s)));
const mulM = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const transpose = A => A[0].map((_, i) => A.map(row => row[i]));
const star = A => A.map(row => row.map(conj));
const trace = A => A.reduce((s, row, i) => add(s, row[i]), z(0));
const same = (A, B) => A.every((row, i) => row.every((x, j) => close(x, B[i][j])));
const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => z(i === j ? 1 : 0)));
const diag = xs => xs.map((x, i) => xs.map((_, j) => z(i === j ? x : 0)));

const lambdas = [0.3, 1.7, 4.2];
const H = diag(lambdas);
const spectralProjector = (X, alpha) => {
  let P = I(3);
  for (let gamma = 0; gamma < 3; gamma++) if (gamma !== alpha) {
    P = mulM(P, scaleM(subM(X, scaleM(I(3), lambdas[gamma])), 1 / (lambdas[alpha] - lambdas[gamma])));
  }
  return P;
};
const projectors = lambdas.map((_, a) => spectralProjector(H, a));
for (let a = 0; a < 3; a++) assert(same(projectors[a], diag([0, 0, 0].map((_, i) => i === a ? 1 : 0))));

const M = [
  [z(0.7, 0.2), z(-0.1, 0.5), z(0.3, -0.4)],
  [z(-0.1, 0.5), z(1.1, -0.6), z(0.2, 0.7)],
  [z(0.3, -0.4), z(0.2, 0.7), z(0.9, 0.1)],
];
assert(same(M, transpose(M)));

const invariant = (X, Ps, a, b) => trace(
  mulM(mulM(mulM(mulM(mulM(mulM(mulM(star(Ps[a]), X), Ps[a]), dagger(X)), star(Ps[b])), X), Ps[b]), dagger(X)),
);
const a = 0, b = 1;
const Q = invariant(M, projectors, a, b);
const expected = mul(mul(M[a][a], M[b][b]), mul(conj(M[a][b]), conj(M[a][b])));
assert(close(Q, expected));
assert(Math.abs(Q.im) > 1e-6);

// Three-dimensional Fourier unitary provides a nontrivial complex weak basis.
const omega = z(-0.5, Math.sqrt(3) / 2);
const W = Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 }, (_, c) => {
  let value = z(1);
  for (let n = 0; n < (r * c) % 3; n++) value = mul(value, omega);
  return scale(value, 1 / Math.sqrt(3));
}));
assert(same(mulM(dagger(W), W), I(3)));

const Hp = mulM(mulM(dagger(W), H), W);
const Mp = mulM(mulM(transpose(W), M), W);
assert(same(Mp, transpose(Mp)));
const Pp = lambdas.map((_, index) => spectralProjector(Hp, index));
for (let index = 0; index < 3; index++) {
  const transformed = mulM(mulM(dagger(W), projectors[index]), W);
  assert(same(Pp[index], transformed));
}
const Qp = invariant(Mp, Pp, a, b);
assert(close(Qp, Q));

console.log('Weak-basis Majorana projector invariant certificate: PASS');
console.log(`Im(Q_01)=${Q.im}; transformed_difference=${Math.hypot(Qp.re - Q.re, Qp.im - Q.im)}`);
