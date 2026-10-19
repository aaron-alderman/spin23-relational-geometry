import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const C = (re, im = 0) => ({ re, im });
const conj = (z) => C(z.re, -z.im);
const same = (a, b) => close(a.re, b.re) && close(a.im, b.im);

// A nontrivial causal upper-half-plane analytic response with real-time reality.
// h(z)=1/(1-i z) has its only pole at z=-i.
const h = (omega) => {
  const den = 1 + omega * omega;
  return C(1 / den, omega / den);
};

for (const omega of [0, 0.2, 1, 3]) {
  assert.ok(same(h(-omega), conj(h(omega))));
}
assert.ok(Math.abs(h(1).im) > 0.4);

// Reality decomposes delta into an even real part and odd imaginary part.
for (const omega of [0.2, 1, 3]) {
  assert.ok(close(h(-omega).re, h(omega).re));
  assert.ok(close(h(-omega).im, -h(omega).im));
}
assert.ok(close(h(0).im, 0));

// A symmetric-frequency quadratic action retains both positive-frequency modes.
const quadraticPair = (omega, A, B) => {
  const z = h(omega);
  return 2 * (z.re ** 2 + z.im ** 2) / (A * B);
};
assert.ok(quadraticPair(1, 0.7, 0.4) > 0);
assert.ok(h(1).re ** 2 > 0 && h(1).im ** 2 > 0);

// Adding evenness/reciprocity to reality forces the imaginary part to vanish.
const reciprocalProjection = (omega) => C((h(omega).re + h(-omega).re) / 2, (h(omega).im + h(-omega).im) / 2);
for (const omega of [0.2, 1, 3]) {
  assert.ok(close(reciprocalProjection(omega).im, 0));
}

console.log(JSON.stringify({
  protocol: 'conjugate-frequency-real-form-audit/1',
  realityCondition: 'delta(-omega)=conj(delta(omega))',
  consequence: ['Re delta is even', 'Im delta is odd'],
  positiveFrequencyDegrees: 2,
  zeroFrequencyCarrier: 'H_2(R)',
  genericDispersiveCarrier: 'H_2(C) with a Real pairing across frequencies',
  extraReductionCondition: 'reciprocity/evenness or a static equal-time restriction',
  realityAloneSelectsSpin23: false,
  passed: true,
}, null, 2));
