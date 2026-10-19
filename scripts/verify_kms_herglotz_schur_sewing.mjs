import assert from 'node:assert/strict';

const add = (A, B, sa = 1, sb = 1) => A.map((r, i) => r.map((x, j) => sa * x + sb * B[i][j]));
const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const dag = A => A[0].map((_, j) => A.map(r => ({ re: r[j].re, im: -r[j].im })));
const C = (re, im = 0) => ({ re, im });
const cadd = (x, y) => C(x.re + y.re, x.im + y.im);
const cmul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const cscale = (x, a) => C(a * x.re, a * x.im);
const cinv = x => { const d = x.re ** 2 + x.im ** 2; return C(x.re / d, -x.im / d); };
const matAdd = (A, B, sa = 1, sb = 1) => A.map((r, i) => r.map((x, j) => cadd(cscale(x, sa), cscale(B[i][j], sb))));
const matMul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => cadd(s, cmul(x, B[k][j])), C(0))));
const matDag = A => A[0].map((_, j) => A.map(r => C(r[j].re, -r[j].im)));
const inv2 = M => {
  const det = cadd(cmul(M[0][0], M[1][1]), cscale(cmul(M[0][1], M[1][0]), -1));
  const q = cinv(det);
  return [[cmul(M[1][1], q), cmul(cscale(M[0][1], -1), q)], [cmul(cscale(M[1][0], -1), q), cmul(M[0][0], q)]];
};
const imag = M => {
  const H = matAdd(M, matDag(M), 1, -1);
  return H.map(r => r.map(x => x.im / 2));
};
const psd2 = M => M[0][0] >= -1e-10 && M[1][1] >= -1e-10 && M[0][0] * M[1][1] - M[0][1] ** 2 >= -1e-10;
const realToComplex = A => A.map(r => r.map(x => C(x)));
const maxDiff = (A, B) => Math.max(...A.flatMap((r, i) => r.map((x, j) => Math.abs(x - B[i][j]))));

const A0 = [[2, 0.2], [0.2, 1.5]], A1 = [[1.2, 0.1], [0.1, 0.8]];
const D0 = [[1.7, 0.15], [0.15, 1.3]], D1 = [[0.9, 0.05], [0.05, 1.1]];
const B = [[0.35, 0.08], [0.04, 0.28]];

for (const z of [C(0.3, 0.4), C(-0.7, 1.2), C(2.1, 0.15)]) {
  const affine = (X0, X1) => X0.map((r, i) => r.map((x, j) => cadd(C(x), cmul(z, C(X1[i][j])))));
  const A = affine(A0, A1), D = affine(D0, D1), Di = inv2(D);
  const Bc = realToComplex(B), Bt = realToComplex(B[0].map((_, j) => B.map(r => r[j])));
  const S = matAdd(A, matMul(matMul(Bc, Di), Bt), 1, -1);
  assert(psd2(imag(S)));

  const rhsCorrection = mul(mul(mul(B, imag(Di).map(r => r.map(x => -x))), B[0].map((_, j) => B.map(r => r[j]))), [[1, 0], [0, 1]]);
  const predicted = add(imag(A), rhsCorrection);
  assert(maxDiff(imag(S), predicted) < 1e-9);
}

const coth = x => Math.cosh(x) / Math.sinh(x);
const omega = 1.3, beta1 = 0.8, beta2 = 1.7;
const c1 = coth(beta1 * omega / 2), c2 = coth(beta2 * omega / 2);
assert(Math.abs(c1 - c2) > 1e-3);
// Independent E11 and E22 channels require c_eff=c1 and c_eff=c2 simultaneously.
assert(!(Math.abs(c1 - c2) < 1e-12));

console.log('KMS-Herglotz Schur sewing certificate: PASS');
console.log(`upper_half_plane_samples=3; sewn_passivity=true; beta1=${beta1}; beta2=${beta2}; unequal_temperature_scalar_KMS=false`);
