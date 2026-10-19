import assert from 'node:assert/strict';

const close = (a, b, tol = 1e-9) => Math.abs(a - b) < tol;
const q = (1 + Math.SQRT2) ** 4;
const mod2N = (w) => ((w * w + 1) / (w * w + q)) ** 2;
const mod2T = (w) => ((w * w + 1 / q) / (w * w + 1)) ** 2;
const A = (w) => 1 - mod2N(w);
const B = (w) => 1 - mod2T(w);
const p = (w) => 0.5 * Math.sqrt(A(w) + B(w));
const r = (w) => Math.sign(w) * 0.5 * Math.sqrt(Math.max(0, A(w) - B(w)));
const cPlus = (w) => p(w) + r(w);
const cMinus = (w) => p(w) - r(w);

// Silver arithmetic collapses the otherwise awkward coefficient.
assert.ok(close(q + 1 / q, 34, 1e-12));

// Exact signed-root square.  The denominator is already a perfect square;
// the remaining quartic supplies four simple algebraic branch points.
const r2Factorized = (w) => {
  const x = w * w;
  return x * (q - 1) ** 2 * (x * x + 18 * x + 1)
    / (2 * q * (x + 1) ** 2 * (x + q) ** 2);
};
for (const w of [0, 0.1, 0.5, 1, 4, 20]) {
  assert.ok(close(r(w) ** 2, r2Factorized(w), 2e-12));
}

// Positivity and the frequency-reflection channel swap needed by the outer
// construction h_-(z)=conj(h_+(-conj z)).
for (const w of [0, 0.01, 0.1, 1, 10, 100]) {
  assert.ok(cPlus(w) > 0 && cMinus(w) > 0);
  assert.ok(close(cPlus(-w), cMinus(w), 2e-12));
  assert.ok(close(cMinus(-w), cPlus(w), 2e-12));
  assert.ok(close((p(w) ** 2 - r(w) ** 2), B(w) / 2, 2e-12));
}

// High-frequency constants: p~P/|w| and signed r~R/w.
const a = 2 * (q - 1);
const b = 2 * (1 - 1 / q);
const P = 0.5 * Math.sqrt(a + b);
const R = 0.5 * Math.sqrt(a - b);
for (const w of [1e3, 3e3, 1e4]) {
  assert.ok(close(Math.abs(w) * p(w), P, 2e-3));
  assert.ok(close(w * r(w), R, 2e-3));
}

// Dyadic shells approach a nonzero constant contribution, certifying the
// logarithmic divergence of integral tr C dw.  Simpson integration is enough
// for the executable asymptotic witness.
const simpson = (fn, lo, hi, n = 2000) => {
  assert.equal(n % 2, 0);
  const h = (hi - lo) / n;
  let sum = fn(lo) + fn(hi);
  for (let i = 1; i < n; i += 1) sum += (i % 2 ? 4 : 2) * fn(lo + i * h);
  return sum * h / 3;
};
const shellLimit = 2 * P * Math.log(2); // integral_R^{2R} tr(C) dw
const shellErrors = [1e2, 1e3, 1e4].map((scale) => {
  const shell = simpson((w) => 2 * p(w), scale, 2 * scale);
  return Math.abs(shell - shellLimit);
});
assert.ok(shellErrors[1] < shellErrors[0] / 50);
assert.ok(shellErrors[2] < shellErrors[1] / 50);
assert.ok(shellErrors[2] < 1e-5);

// A causal Lorentzian root-level filter makes the covariance integrable and
// preserves graded sewing.  Wick homogeneity squares the filter on the target.
const Lambda = 100;
const eta = (w) => Lambda ** 2 / (w * w + Lambda ** 2);
for (const w of [0, 1, 10, 1000]) {
  assert.ok(close(eta(-w), eta(w)));
  const regulatedTrace = eta(w) * 2 * p(w);
  assert.ok(Number.isFinite(regulatedTrace));
}
const regulatedTail = simpson((w) => eta(w) * 2 * p(w), 1e3, 2e3);
const nextRegulatedTail = simpson((w) => eta(w) * 2 * p(w), 2e3, 4e3);
assert.ok(nextRegulatedTail < regulatedTail / 3.5);

console.log(JSON.stringify({
  protocol: 'tuned-wick-root-spectral-factor-uv-gate/1',
  generalizedOuterFactor: 'exists by scalar log-integrability after constant eigenbasis split',
  twistedReality: 'H(-omega)=D conjugate(H(omega)) D',
  rationalFiniteStateFactor: false,
  reason: 'C_11~P/|omega| and r^2 has the nonsquare quartic omega^4+18 omega^2+1',
  finiteEqualTimeVariance: false,
  divergence: 'logarithmic',
  regulatedRepair: 'C_Lambda=eta_Lambda C is integrable and Wick(C_Lambda)=eta_Lambda^2 K_res',
  passed: true,
}, null, 2));
