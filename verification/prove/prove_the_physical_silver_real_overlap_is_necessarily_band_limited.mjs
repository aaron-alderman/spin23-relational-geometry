import assert from 'node:assert/strict';

const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (z) => C(z.re, -z.im);
const div = (a, b) => {
  const d = b.re ** 2 + b.im ** 2;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const abs2 = (z) => z.re ** 2 + z.im ** 2;
const gammaN = 1 + Math.SQRT2;
const gammaT = Math.SQRT2 - 1;
const response = (omega, gamma, ell) => {
  const r = div(C(omega, -gamma * Math.exp(-ell)), C(omega, gamma * Math.exp(ell)));
  return mul(r, r);
};
const realMargin = (omega, ell) => {
  const fn = response(omega, gammaN, ell);
  const ft = response(omega, gammaT, ell);
  const center = mul(conj(ft), fn);
  return (1 - abs2(fn)) * (1 - abs2(ft)) - center.im ** 2;
};
const bisectLog = (ell, left, right) => {
  let a = left, b = right, fa = realMargin(a, ell);
  for (let k = 0; k < 90; k += 1) {
    const mid = Math.sqrt(a * b);
    const fm = realMargin(mid, ell);
    if (fa * fm <= 0) b = mid;
    else { a = mid; fa = fm; }
  }
  return Math.sqrt(a * b);
};
const roots = (ell) => {
  const out = [];
  let x0 = 1e-6, y0 = realMargin(x0, ell);
  for (let n = 1; n <= 30000; n += 1) {
    const x1 = 10 ** (-6 + 12 * n / 30000);
    const y1 = realMargin(x1, ell);
    if (y0 * y1 < 0) out.push(bisectLog(ell, x0, x1));
    x0 = x1; y0 = y1;
  }
  return out;
};

const samples = [];
for (const ell of [0.01, 0.05, 0.1, 0.2, 0.3, 0.5, 0.7, 1, 1.5, 2]) {
  const t = Math.exp(-ell);
  const atZero = realMargin(0, ell);
  assert.ok(Math.abs(atZero - (1 - t ** 8) ** 2) < 2e-10);
  assert.ok(realMargin(1, ell) > 0);
  const omega = 1e6;
  const scaledTail = omega ** 2 * realMargin(omega, ell);
  const expectedTail = -64 * Math.cosh(ell) ** 2;
  assert.ok(Math.abs(scaledTail - expectedTail) < 5e-5);
  assert.ok(realMargin(omega, ell) < 0);
  const crossings = roots(ell);
  assert.ok(crossings.length >= 1);
  samples.push({ ell, crossings });
}

console.log(JSON.stringify({
  protocol: 'physical-silver-real-overlap-band-limit/1',
  realIntersectionMargin: 'H=(1-|fn|^2)(1-|ft|^2)-Im(conjugate(ft)fn)^2',
  zeroFrequency: 'H(0)=(1-exp(-8ell))^2>0',
  silverCheckpoint: 'H(1)>0',
  highFrequency: 'H(omega)~-64 cosh(ell)^2/omega^2<0',
  consequence: 'no pointwise-real overlap exists over the entire real-frequency axis for strict loss',
  sampleCrossings: samples,
  repairBranches: ['finite protected band', 'complex overlap with s(-omega)=conjugate(s(omega))'],
  passed: true,
}, null, 2));
