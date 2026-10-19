import assert from 'node:assert/strict';

const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (a, x) => C(a.re * x, a.im * x);
const abs2 = a => a.re ** 2 + a.im ** 2;
const abs = a => Math.sqrt(abs2(a));
const phase = x => C(Math.cos(x), Math.sin(x));
const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;

const t12 = 0.59;
const t13 = 0.15;
const eta = [0.42, -0.71, 1.03];
const electronBase = [Math.cos(t12) * Math.cos(t13), Math.sin(t12) * Math.cos(t13), Math.sin(t13)];
const Ue = electronBase.map((r, i) => scale(phase(eta[i] / 2), r));

const nambuResidue = (u, weight = 1) => {
  const d = weight * abs2(u);
  const z = scale(mul(u, u), weight);
  return { d, z, determinant: d * d - abs2(z) };
};
const coherence = u => scale(mul(u, u), 1 / abs2(u));
const area = (ui, uj) => mul(coherence(ui), conj(coherence(uj))).im;

for (const u of Ue) {
  const r = nambuResidue(u, 1.7);
  assert(r.d >= 0);
  assert(close(r.determinant, 0));
  assert(close(abs(coherence(u)), 1));
}

const A12 = area(Ue[0], Ue[1]);
assert(close(A12, Math.sin(eta[0] - eta[1])));

// A charged-flavor rephasing multiplies all coherences by one common doubled phase.
const phi = 0.83;
const rowRephased = Ue.map(u => mul(phase(phi), u));
assert(close(area(rowRephased[0], rowRephased[1]), A12));

// Majorana sign changes disappear after squaring.
const signed = Ue.map((u, i) => scale(u, i === 0 ? -1 : 1));
assert(close(area(signed[0], signed[1]), A12));

// CP conjugation reverses the pole area.
const cp = Ue.map(conj);
assert(close(area(cp[0], cp[1]), -A12));

// Equal Majorana phases give zero electron-row pole area.
const commonEta = 0.36;
const realigned = electronBase.map(r => scale(phase(commonEta / 2), r));
assert(close(area(realigned[0], realigned[1]), 0));

console.log('Majorana Nambu pole-area certificate: PASS');
console.log(`A12=${A12}; sin_phase_difference=${Math.sin(eta[0] - eta[1])}; row_rephasing=true; sign_invariant=true; CP_odd=true`);
