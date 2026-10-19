import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const C = (re, im = 0) => ({ re, im });
const conj = (z) => C(z.re, -z.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const inner = (u, v) => u.reduce((z, x, i) => add(z, mul(conj(x), v[i])), C(0));

const environmentVectors = (f) => {
  const r = Math.hypot(f.re, f.im);
  assert.ok(r >= 0 && r <= 1);
  if (close(r, 1)) return { r, er: [C(1), C(0), C(0)], e0: [f, C(0), C(0)], e1: [f, C(0), C(0)] };
  const u = Math.sqrt(1 - r ** 2);
  const x = r * Math.sqrt((1 - r) / (1 + r));
  const y = Math.sqrt((1 - r) * (1 + 2 * r) / (1 + r));
  return { r, er: [C(1), C(0), C(0)], e0: [f, C(u), C(0)], e1: [f, C(x), C(y)] };
};

for (const r of [0, 0.1, 0.4, 0.8, 0.999, 1]) {
  const phase = 0.73;
  const f = C(r * Math.cos(phase), r * Math.sin(phase));
  const { er, e0, e1 } = environmentVectors(f);
  assert.ok(close(inner(er, er).re, 1));
  assert.ok(close(inner(e0, e0).re, 1));
  assert.ok(close(inner(e1, e1).re, 1));
  assert.ok(close(inner(er, e0).re, f.re) && close(inner(er, e0).im, f.im));
  assert.ok(close(inner(er, e1).re, f.re) && close(inner(er, e1).im, f.im));
  assert.ok(close(inner(e1, e0).re, r) && close(inner(e1, e0).im, 0));
  if (r < 1) {
    const determinant = (1 - r) ** 2 * (1 + 2 * r);
    assert.ok(determinant > 0);
  }
}

const alpha = 0.7;
const beta = 2.1;
const omega = 1.3;
const numerator = C(omega, -alpha);
const denominator = C(omega, beta);
const div = (a, b) => {
  const d = b.re ** 2 + b.im ** 2;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const f = mul(div(numerator, denominator), div(numerator, denominator));
const r = Math.hypot(f.re, f.im);
assert.ok(close(r, (omega ** 2 + alpha ** 2) / (omega ** 2 + beta ** 2)));

console.log(JSON.stringify({
  protocol: 'minimal-pointwise-joint-loss-dephasing-dilation/1',
  isometry: '|j> -> |j>|e_j>',
  postselection: '<e_ref|e_j>=f gives transfer f I',
  traceReduction: '<e_1|e_0>=|f| gives dephasing overlap s=|f|',
  gramDeterminant: '(1-|f|)^2(1+2|f|)',
  strictLossEnvironmentDimension: 3,
  auxiliaryDirectionsBeyondReference: 2,
  endpoint: '|f|=1 collapses all environment states to one ray',
  remainingGate: 'construct a causal rational frequency-global scattering realization and treat unequal face transfers',
  passed: true,
}, null, 2));
