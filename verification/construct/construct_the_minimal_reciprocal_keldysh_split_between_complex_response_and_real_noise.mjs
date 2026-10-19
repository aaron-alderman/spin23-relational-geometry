import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const C = (re, im = 0) => ({ re, im });
const conj = (z) => C(z.re, -z.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const div2i = (z) => C(z.im / 2, -z.re / 2);
const dagger = (M) => M[0].map((_, j) => M.map((row) => conj(row[j])));
const spectral = (K) => {
  const Kd = dagger(K);
  return K.map((row, i) => row.map((z, j) => div2i(sub(z, Kd[i][j]))));
};
const detHermitian2 = (M) => M[0][0].re * M[1][1].re - (M[0][1].re ** 2 + M[0][1].im ** 2);

// Reciprocal complex retarded boundary value: K^T=K.
const Kr = [
  [C(2, 0.8), C(0.3, 0.2)],
  [C(0.3, 0.2), C(1.5, 0.5)],
];
const rho = spectral(Kr);
for (const row of rho) for (const z of row) assert.ok(close(z.im, 0));
assert.ok(close(rho[0][1].re, rho[1][0].re));
assert.ok(rho[0][0].re > 0 && detHermitian2(rho) > 0);

// A scalar common-temperature KMS multiplier preserves reality and positivity.
const kms = 2.4;
const noise = rho.map((row) => row.map((z) => C(kms * z.re, kms * z.im)));
for (const row of noise) for (const z of row) assert.ok(close(z.im, 0));
assert.ok(detHermitian2(noise) > 0);

// A generic nonreciprocal response gives a complex Hermitian spectral/noise matrix.
const Knr = [
  [C(2, 0.8), C(0.3, 0.2)],
  [C(0.1, 0.2), C(1.5, 0.5)],
];
const rhoNr = spectral(Knr);
assert.ok(Math.abs(rhoNr[0][1].im) > 0.09);
assert.ok(close(rhoNr[1][0].im, -rhoNr[0][1].im));
assert.ok(detHermitian2(rhoNr) > 0);

// The noise log determinant at fixed diagonal is minimized at zero cross-noise.
const A = noise[0][0].re;
const B = noise[1][1].re;
const action = (x) => -Math.log(A * B - x * x);
assert.ok(action(0) < action(noise[0][1].re));

console.log(JSON.stringify({
  protocol: 'reciprocal-keldysh-real-noise-split/1',
  retardedKernel: 'complex reciprocal K^R',
  advancedKernel: 'K^A=K^{R dagger}',
  reciprocalSpectralKernel: 'real symmetric positive',
  commonTemperatureNoise: 'N=coth(beta omega/2) rho in H_2(R)_+',
  nonreciprocalNoise: 'generically complex Hermitian in H_2(C)_+',
  logDetCentre: 'zero residual cross-noise at fixed diagonal',
  microscopicFureyDerivation: false,
  passed: true,
}, null, 2));
