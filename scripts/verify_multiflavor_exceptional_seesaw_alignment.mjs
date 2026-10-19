import assert from 'node:assert/strict';

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => { const d = b.re ** 2 + b.im ** 2; return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const scale = (a, x) => C(a.re * x, a.im * x);
const conj = a => C(a.re, -a.im);
const abs = a => Math.hypot(a.re, a.im);
const Z = (n, m) => Array.from({ length: n }, () => Array.from({ length: m }, () => C(0)));
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const dagger = A => T(A).map(row => row.map(conj));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const ms = (A, z) => A.map(row => row.map(x => mul(x, z)));
const madd = (A, B, sign = 1) => A.map((row, i) => row.map((x, j) => sign === 1 ? add(x, B[i][j]) : sub(x, B[i][j])));
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => abs(sub(x, B[i][j])))));
const inv2 = A => {
  const det = sub(mul(A[0][0], A[1][1]), mul(A[0][1], A[1][0]));
  return [[div(A[1][1], det), div(scale(A[0][1], -1), det)], [div(scale(A[1][0], -1), det), div(A[0][0], det)]];
};
const closeM = (A, B, eps = 1e-9) => maxDiff(A, B) < eps;

const M = [[C(4.2), C(0.4, 0.3)], [C(0.4, 0.3), C(6.1, -0.2)]];
const Y = [[C(0.3, 0.1), C(-0.2, 0.4)], [C(0.5, -0.1), C(0.25, 0.2)]];
const Cx = [[C(1.3, 0.7), C(-0.2, 0.5)], [C(-0.2, 0.5), C(0.8, -0.6)]];
const V = [[C(1.1, 0.2), C(0.3, -0.1)], [C(-0.2, 0.15), C(0.9, 0.25)]];

const matched = (m, y, c) => {
  const mi = inv2(m);
  return mm(mm(mm(mm(y, mi), c), mi), T(y));
};
const K = matched(M, Y, Cx);
assert(closeM(K, T(K)));

// Congruence covariance under N=V N'.
const Mp = mm(mm(T(V), M), V);
const Cp = mm(mm(T(V), Cx), V);
const Yp = mm(Y, V);
assert(closeM(matched(Mp, Yp, Cp), K));

// Alignment C=kappa M makes K proportional to the seesaw tensor.
const kappa = C(0.6, -0.35);
const Caligned = ms(M, kappa);
const Minv = inv2(M);
const seesawCore = mm(mm(Y, Minv), T(Y));
const Kaligned = matched(M, Y, Caligned);
assert(closeM(Kaligned, ms(seesawCore, kappa)));

// Generic C is not proportional to the seesaw core.
const ratio = div(K[0][0], seesawCore[0][0]);
assert(maxDiff(K, ms(seesawCore, ratio)) > 1e-4);

// Hermitian-square commutator detects generic eigenbasis misalignment.
const Hk = mm(dagger(K), K);
const Hm = mm(dagger(seesawCore), seesawCore);
const commutator = madd(mm(Hk, Hm), mm(Hm, Hk), -1);
assert(maxDiff(commutator, Z(2, 2)) > 1e-7);

// Symmetric sterile-pair component count.
for (const [n, expected] of [[1, 1], [2, 3], [3, 6], [4, 10]]) assert.equal(n * (n + 1) / 2, expected);

// One sterile field gives a rank-one active tensor (zero 2x2 determinant).
const y1 = [[C(0.3, 0.2)], [C(-0.5, 0.1)]];
const scalarFactor = C(0.17, -0.08);
const K1 = mm(ms(y1, scalarFactor), T(y1));
const detK1 = sub(mul(K1[0][0], K1[1][1]), mul(K1[0][1], K1[1][0]));
assert(abs(detK1) < 1e-12);

console.log('Multi-flavor exceptional-seesaw alignment certificate: PASS');
console.log('basis_covariant=true; aligned_K=kappa*seesaw; generic_misalignment=true; symmetric_counts=1,3,6,10; rank_gate=true');
