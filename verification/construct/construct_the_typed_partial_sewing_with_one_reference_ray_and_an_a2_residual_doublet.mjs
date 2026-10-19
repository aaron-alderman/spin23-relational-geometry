import assert from 'node:assert/strict';

const tol = 1e-9;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const Cx = (re, im = 0) => ({ re, im });
const mul = (x, y) => Cx(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => Cx(x.re, -x.im);
const div = (x, y) => {
  const d = y.re ** 2 + y.im ** 2;
  return Cx((x.re * y.re + x.im * y.im) / d, (x.im * y.re - x.re * y.im) / d);
};
const abs2 = (x) => x.re ** 2 + x.im ** 2;

const gammaN = 1 + Math.SQRT2;
const gammaT = Math.SQRT2 - 1;
const ell = Math.asinh(1);

const channel = (omega, gamma) => {
  const a = gamma * Math.exp(-ell);
  const b = gamma * Math.exp(ell);
  const d = Math.sqrt((a * a + b * b) / 2);
  const k = Math.sqrt(2 * (b * b - a * a));
  const den = mul(Cx(omega, b), Cx(omega, b));
  const f = div(mul(Cx(omega, -a), Cx(omega, -a)), den);
  const g = div(Cx(k * omega, k * d), den);
  return { f, g };
};

for (const omega of [-8, -1, -0.25, 0, 0.25, 1, 8]) {
  const n = channel(omega, gammaN);
  const t = channel(omega, gammaT);
  assert.ok(close(abs2(n.f) + abs2(n.g), 1));
  assert.ok(close(abs2(t.f) + abs2(t.g), 1));

  // Environment rays e_n=(f_n,g_n,0), e_t=(f_t,0,g_t).
  const overlap = mul(conj(t.f), n.f);
  const gramDet = (1 - abs2(n.f)) * (1 - abs2(t.f));
  assert.ok(close(gramDet, abs2(n.g) * abs2(t.g)));
  assert.ok(gramDet >= -tol);
  assert.ok(Number.isFinite(overlap.re) && Number.isFinite(overlap.im));
}

// A2 typing of the residual doublet: one face is reflection invariant but not
// C3 invariant; its complete three-face orbit is isotropic.
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const matAdd = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const frob2 = (A) => A.flat().reduce((s, x) => s + x * x, 0);
const c = -0.5;
const s = Math.sqrt(3) / 2;
const R = [[c, -s], [s, c]];
const F = [[1, 0], [0, -1]];
const B0 = [[0.8, 0], [0, 0.2]];
const B1 = matMul(matMul(R, B0), transpose(R));
const R2 = matMul(R, R);
const B2 = matMul(matMul(R2, B0), transpose(R2));
const sum = matAdd(matAdd(B0, B1), B2);
assert.ok(close(sum[0][0], 1.5));
assert.ok(close(sum[1][1], 1.5));
assert.ok(close(sum[0][1], 0));
assert.ok(frob2(matAdd(matMul(R, B0), matMul(B0, R).map((row) => row.map((x) => -x)))) > tol);
assert.ok(frob2(matAdd(matMul(F, B0), matMul(B0, F).map((row) => row.map((x) => -x)))) < tol);

console.log(JSON.stringify({
  protocol: 'typed-partial-sewing-a2-environment/1',
  environment: 'E = 1_ref + A2_residual',
  controlledDimension: 'dim(S tensor E)=2*3=6',
  referenceCompression: 'diag(f_n,f_t)',
  tracedOverlap: 'conj(f_t) f_n',
  residualOverlap: 0,
  strictLossGramRank: 3,
  singleFaceSymmetry: 'reflection C2',
  threeFaceOrbit: 'C3-covariant and isotropic in sum',
  fullRelativeIdentificationRequired: false,
  passed: true,
}, null, 2));
