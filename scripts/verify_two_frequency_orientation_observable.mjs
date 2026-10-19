import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const conj = a => ({ re: a.re, im: -a.im });
const phase = x => ({ re: Math.cos(x), im: Math.sin(x) });
const scale = (a, x) => ({ re: a.re * x, im: a.im * x });
const abs2 = a => a.re * a.re + a.im * a.im;

const spectral = [
  { omega: 1.2, d1: 4, d2: 9, z: { re: 2.1, im: 1.5 } },
  { omega: 2.7, d1: 5, d2: 8, z: { re: -0.4, im: 3.2 } },
];

for (const r of spectral) {
  assert(r.d1 >= 0 && r.d2 >= 0);
  assert(abs2(r.z) <= r.d1 * r.d2);
}

const coherence = r => scale(r.z, 1 / Math.sqrt(r.d1 * r.d2));
const area = (a, b) => mul(coherence(a), conj(coherence(b))).im;
const A = area(spectral[0], spectral[1]);
assert(Math.abs(A) <= 1);
assert(close(area(spectral[1], spectral[0]), -A));
assert(close(area(spectral[0], spectral[0]), 0));

// A constant relative channel phase cancels.
const delta = 0.73;
const rephased = spectral.map(r => ({ ...r, z: mul(phase(delta), r.z) }));
assert(close(area(rephased[0], rephased[1]), A));

// Face exchange conjugates the coherence and reverses orientation.
const exchanged = spectral.map(r => ({ omega: r.omega, d1: r.d2, d2: r.d1, z: conj(r.z) }));
assert(close(area(exchanged[0], exchanged[1]), -A));

// Independent positive, frequency-independent channel gains cancel.
const gain1 = 2.3;
const gain2 = 0.6;
const gained = spectral.map(r => ({
  ...r,
  d1: gain1 * gain1 * r.d1,
  d2: gain2 * gain2 * r.d2,
  z: scale(r.z, gain1 * gain2),
}));
assert(close(area(gained[0], gained[1]), A));

// The bound can be saturated by unit coherences separated by pi/2.
const saturatedA = { omega: 0, d1: 1, d2: 1, z: { re: 1, im: 0 } };
const saturatedB = { omega: 1, d1: 1, d2: 1, z: { re: 0, im: 1 } };
assert(close(area(saturatedA, saturatedB), -1));

// Finite-difference limit: A(w,w+dw) / dw -> -r^2 theta'(w).
const rmag = 0.7;
const theta0 = 0.2;
const thetaPrime = 0.45;
const dw = 1e-6;
const makeUnitDiag = (omega, theta) => ({
  omega, d1: 1, d2: 1, z: scale(phase(theta), rmag),
});
const localA = area(
  makeUnitDiag(1, theta0),
  makeUnitDiag(1 + dw, theta0 + thetaPrime * dw),
);
assert(close(localA / dw, -rmag * rmag * thetaPrime, 1e-7));

console.log('Two-frequency orientation-observable certificate: PASS');
console.log(`A=${A}; bound=1; rephasing_invariant=true; exchange_odd=true; curvature_limit=true`);
