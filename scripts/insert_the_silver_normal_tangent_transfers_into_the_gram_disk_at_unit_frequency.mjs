import assert from 'node:assert/strict';

const tol = 2e-9;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (z) => C(z.re, -z.im);
const div = (a, b) => {
  const d = b.re ** 2 + b.im ** 2;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const abs2 = (z) => z.re ** 2 + z.im ** 2;
const response = (gamma, ell) => {
  const r = div(C(1, -gamma * Math.exp(-ell)), C(1, gamma * Math.exp(ell)));
  return mul(r, r);
};
const gramDeterminant = (f0, f1, s) =>
  1 - abs2(f0) - abs2(f1) - s ** 2 + 2 * s * mul(mul(conj(f0), f1), C(1)).re;
const closedDeterminant = (t) => {
  const t2 = t ** 2;
  return ((1 - t2) ** 2 * (1 + t2) ** 2 * (1 + 12 * t2 + 5 * t2 ** 2 - 2 * t2 ** 3)) /
    (t2 ** 2 + 6 * t2 + 1) ** 2;
};

const gammaN = 1 + Math.SQRT2;
const gammaT = Math.SQRT2 - 1;
assert.ok(close(gammaN * gammaT, 1));
assert.ok(close(gammaN ** 2 + gammaT ** 2, 6));

for (let n = 0; n <= 5000; n += 1) {
  const ell = 2 * n / 5000;
  const t = Math.exp(-ell);
  const fn = response(gammaN, ell);
  const ft = response(gammaT, ell);
  const s = -(t ** 2);
  const magnitudeProduct = Math.sqrt(abs2(fn) * abs2(ft));
  assert.ok(close(magnitudeProduct, t ** 4));
  assert.ok(close(s ** 2, magnitudeProduct));
  const det = gramDeterminant(fn, ft, s);
  assert.ok(close(det, closedDeterminant(t), 2e-8));
  assert.ok(det >= -2e-9);
  if (n > 0) assert.ok(det > 0);
}

console.log(JSON.stringify({
  protocol: 'silver-normal-tangent-unit-frequency-gram-disk/1',
  checkpoint: 'omega=1',
  scales: ['gamma_n=1+sqrt(2)', 'gamma_t=sqrt(2)-1'],
  reciprocalIdentities: ['gamma_n gamma_t=1', 'gamma_n^2+gamma_t^2=6'],
  exactMagnitudeProduct: '|f_n||f_t|=exp(-4 ell)',
  selectedRealOverlap: 's_*=-exp(-2 ell)=-sqrt(|f_n||f_t|)',
  gramDeterminant: '(1-t^2)^2(1+t^2)^2(1+12t^2+5t^4-2t^6)/(t^4+6t^2+1)^2, t=exp(-ell)',
  strictLossRank: 3,
  losslessEndpoint: 's_*=-1 and Gram rank collapses',
  lockingSuppression: 's_*^6=exp(-12 ell)',
  remainingGate: 'classify the full frequency band and construct the causal rational environment vectors',
  passed: true,
}, null, 2));
