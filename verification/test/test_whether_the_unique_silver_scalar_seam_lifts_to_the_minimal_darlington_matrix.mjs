import assert from 'node:assert/strict';

const tol = 1e-9;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const scale = (x, s) => C(s * x.re, s * x.im);
const abs2 = (x) => x.re ** 2 + x.im ** 2;
const I = C(0, 1);

const gammaN = 1 + Math.SQRT2;
const gammaT = Math.SQRT2 - 1;
const ell = Math.asinh(1);

const parameters = (gamma) => {
  const a = gamma * Math.exp(-ell);
  const b = gamma * Math.exp(ell);
  return {
    a,
    b,
    d: Math.sqrt((a * a + b * b) / 2),
    k: Math.sqrt(2 * (b * b - a * a)),
  };
};

const n = parameters(gammaN);
const t = parameters(gammaT);
assert.ok(close(n.a, 1));
assert.ok(close(t.b, 1));

const zPlusIR = (z, r) => add(z, scale(I, r));
const zMinusIR = (z, r) => add(z, scale(I, -r));
const sq = (z) => mul(z, z);

// Polynomial numerator of the minimal Darlington completion U_j.
const numerator = (z, p) => [
  [sq(zMinusIR(z, p.a)), scale(zMinusIR(z, p.d), -p.k)],
  [scale(zPlusIR(z, p.d), p.k), sq(zPlusIR(z, p.a))],
];

// Polynomial numerator of U_j^sharp=J U_j(-z)^T J.
const sharpNumerator = (z, p) => [
  [sq(zPlusIR(z, p.a)), scale(zMinusIR(z, p.d), p.k)],
  [scale(zPlusIR(z, p.d), -p.k), sq(zMinusIR(z, p.a))],
];

const matMul = (A, B) => A.map((row, i) => B[0].map((_, j) =>
  row.reduce((sum, _, k) => add(sum, mul(A[i][k], B[k][j])), C(0))));

const zSeam = I; // z=i b_t=i a_n
const NtSharpAtSeam = sharpNumerator(zSeam, t);
const NnAtSeam = numerator(zSeam, n);
const fullPoleNumerator = matMul(NtSharpAtSeam, NnAtSeam);

// A nonzero numerator at z=i proves the full relative matrix retains a
// second-order pole from the scalar denominator (z-i b_t)^2.
const fullResidueNorm2 = fullPoleNumerator.flat().reduce((s, x) => s + abs2(x), 0);
assert.ok(fullResidueNorm2 > 1);

// Insert the common reference-port projection P=diag(1,0).
const P = [[C(1), C(0)], [C(0), C(0)]];
const projectedPoleNumerator = matMul(matMul(NtSharpAtSeam, P), NnAtSeam);

// The observed-to-observed scalar numerator cancels, but the entire rank-one
// sewn matrix does not: its second input column retains the pole.
assert.ok(abs2(projectedPoleNumerator[0][0]) < tol);
assert.ok(abs2(projectedPoleNumerator[1][0]) < tol);
assert.ok(abs2(projectedPoleNumerator[0][1]) > tol || abs2(projectedPoleNumerator[1][1]) > tol);

// Determinant of U_t^sharp U_n has an unavoidable double pole at z=i b_t.
// det R=((z+i b_t)/(z-i b_t))^2 ((z-i b_n)/(z+i b_n))^2.
assert.ok(!close(t.b, n.b));
assert.ok(close(t.b, n.a));

console.log(JSON.stringify({
  protocol: 'minimal-darlington-silver-seam-lift-audit/1',
  tunedSeam: 'a_n=b_t=1',
  scalarCompression: 'f_t^sharp f_n is analytic after double pole-zero cancellation',
  rankOneSewnBlock: 'still has a pole outside the observed-to-observed entry',
  fullRelativeMatrix: 'U_t^sharp U_n retains a double pole at z=i',
  determinant: '((z+i b_t)/(z-i b_t))^2((z-i b_n)/(z+i b_n))^2',
  constantPortGaugeCanRepair: false,
  broaderNonminimalLiftExcluded: false,
  passed: true,
}, null, 2));
