import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const cscale = (z, a) => a.map((row) => row.map((x) => mul(z, x)));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));
const expm = (a) => {
  let result = eye(a.length), term = eye(a.length);
  for (let n = 1; n <= 80; n += 1) {
    term = mscale(1 / n, mmul(term, a));
    result = madd(result, term);
  }
  return result;
};
const imul = (a) => a.map((row) => row.map((x) => mul(C(0, 1), x)));
const plaquette = (u, v) => mmul(mmul(mmul(u, v), dagger(u)), dagger(v));
const det3 = (a) => add(
  add(mul(a[0][0], add(mul(a[1][1], a[2][2]), scale(-1, mul(a[1][2], a[2][1])))), scale(-1, mul(a[0][1], add(mul(a[1][0], a[2][2]), scale(-1, mul(a[1][2], a[2][0])))))),
  mul(a[0][2], add(mul(a[1][0], a[2][1]), scale(-1, mul(a[1][1], a[2][0])))),
);

const H1 = [[C(0.2), C(0), C(0)], [C(0), C(0.7), C(0)], [C(0), C(0), C(1.2)]];
const H2 = [[C(0.5), C(0.1, 0.08), C(-0.03, 0.02)], [C(0.1, -0.08), C(0.9), C(0.04, -0.03)], [C(-0.03, -0.02), C(0.04, 0.03), C(1.4)]];
const Mu = expm(mscale(0.4, imul(H1)));
const Md = expm(mscale(0.5, imul(H2)));
const Me = expm(mscale(0.3, imul(H2)));
const Mnu = expm(mscale(0.6, imul(H1)));
const zC = phase(0.73), zD = phase(-0.41);
const Uu = cscale(zC, Mu), Ud = cscale(zD, Md);
const Ue = cscale(conj(zC), Me), Unu = cscale(conj(zD), Mnu);
assert(norm(madd(plaquette(Uu, Ud), mscale(-1, plaquette(Mu, Md)))) < 1e-9);
assert(norm(madd(plaquette(Unu, Ue), mscale(-1, plaquette(Mnu, Me)))) < 1e-9);

const expectedUuDet = mul(mul(zC, mul(zC, zC)), det3(Mu));
const expectedUdDet = mul(mul(zD, mul(zD, zD)), det3(Md));
assert(Math.hypot(det3(Uu).re - expectedUuDet.re, det3(Uu).im - expectedUuDet.im) < 1e-8);
assert(Math.hypot(det3(Ud).re - expectedUdDet.re, det3(Ud).im - expectedUdDet.im) < 1e-8);

const pairedC = mmul(Ue, Uu), pairedD = mmul(Unu, Ud);
const barePairedC = mmul(Me, Mu), barePairedD = mmul(Mnu, Md);
assert(Math.hypot(det3(pairedC).re - det3(barePairedC).re, det3(pairedC).im - det3(barePairedC).im) < 1e-8);
assert(Math.hypot(det3(pairedD).re - det3(barePairedD).re, det3(pairedD).im - det3(barePairedD).im) < 1e-8);

console.log("Flavor-blind Higgs locking: PASS");
console.log("central_hC_hD_phases_cancel_from_quark_and_lepton_plaquettes");
console.log("individual_cycle_determinants_shift_by_Higgs_phase_cubes");
console.log("paired_matter_cycle_determinants_cancel_conjugate_Higgs_phases");
console.log("nonabelian_flavor_CP_resides_in_matter_Yukawa_transports");
console.log("Higgs_magnitudes_and_two_doublet_dynamics=not_addressed_by_unitary_cancellation");
