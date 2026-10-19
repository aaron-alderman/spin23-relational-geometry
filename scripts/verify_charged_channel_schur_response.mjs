import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, q) => z(a.re * q, a.im * q);
const conj = a => z(a.re, -a.im);
const eq = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const matMul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const same = (A, B) => A.every((row, i) => row.every((x, j) => eq(x, B[i][j])));
const det2 = A => sub(mul(A[0][0], A[1][1]), mul(A[0][1], A[1][0]));
const det3 = A => add(sub(
  mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))),
  mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))
), mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))));

// Prescribe a positive Schur response R and construct K with c=4 and
// A=R+bb^dagger/c, guaranteeing K congruent to diag(R,c).
const R = [[z(3), z(1, 2)], [z(1, -2), z(5)]];
assert(eq(det2(R), z(10)));
const b = [[z(1, 1)], [z(2, -1)]];
const c = 4;
const bb = matMul(b, dagger(b));
const A = R.map((row, i) => row.map((x, j) => add(x, scale(bb[i][j], 1 / c))));
const K = [
  [A[0][0], A[0][1], b[0][0]],
  [A[1][0], A[1][1], b[1][0]],
  [conj(b[0][0]), conj(b[1][0]), z(c)],
];
assert(same(K, dagger(K)));

const schur = (AA, bbv, cc) => {
  const corr = matMul(bbv, dagger(bbv));
  return AA.map((row, i) => row.map((x, j) => sub(x, scale(corr[i][j], 1 / cc))));
};
assert(same(schur(A, b, c), R));
assert(eq(det3(K), scale(det2(R), c)));

// Gauge the eliminated channel; b picks up a common phase and bb^dagger is invariant.
const theta = 0.617;
const phase = z(Math.cos(theta), -Math.sin(theta));
const bg = b.map(([x]) => [mul(x, phase)]);
assert(same(schur(A, bg, c), R));

// Reciprocal projection is positive: leading diagonal and determinant are positive.
const realR = R.map(row => row.map(x => z(x.re)));
assert(realR[0][0].re > 0 && realR[1][1].re > 0);
assert(eq(det2(realR), z(14)));

// A real microscopic kernel gives a real response directly.
const R0 = [[z(2), z(1)], [z(1), z(3)]];
const b0 = [[z(1)], [z(2)]];
const A0corr = matMul(b0, dagger(b0));
const A0 = R0.map((row, i) => row.map((x, j) => add(x, scale(A0corr[i][j], 1 / c))));
assert(same(schur(A0, b0, c), R0));

console.log('Charged-channel Schur-response certificate: PASS');
console.log('positive, gauge invariant, determinant preserving, reciprocity-compatible neutral response');

