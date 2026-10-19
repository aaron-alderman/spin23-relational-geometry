import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (s, x) => C(s * x.re, s * x.im);
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const near = (x, y, tolerance = 1e-10) => Math.hypot(x.re - y.re, x.im - y.im) < tolerance;

const matrixMul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((sum, x, k) => add(sum, mul(x, b[k][j])), C(0))));
const matrixNear = (a, b) => a.every((row, i) => row.every((z, j) => near(z, b[i][j])));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const identity = [[C(1), C(0)], [C(0), C(1)]];

const massMagnitude = 2.3;
const phi = 0.63;
const mass = scale(massMagnitude, phase(phi));
const momenta = [-4, -1.2, 0, 0.7, 3.5];
const projectors = [];
const offdiagonals = [];

for (const k of momenta) {
  const omega = Math.hypot(k, massMagnitude);
  const h = [[C(k), mass], [conj(mass), C(-k)]];
  const h2 = matrixMul(h, h);
  assert(matrixNear(h2, [[C(omega * omega), C(0)], [C(0), C(omega * omega)]]));
  const p = [
    [C((1 + k / omega) / 2), scale(1 / (2 * omega), mass)],
    [scale(1 / (2 * omega), conj(mass)), C((1 - k / omega) / 2)],
  ];
  assert(matrixNear(matrixMul(p, p), p));
  const determinant = mul(p[0][0], p[1][1]);
  const offProduct = mul(p[0][1], p[1][0]);
  assert(near(determinant, offProduct));
  assert(p[0][0].re >= -1e-10 && p[1][1].re >= -1e-10);
  projectors.push(p);
  offdiagonals.push(p[0][1]);
}

for (const x of offdiagonals) for (const y of offdiagonals) {
  assert(Math.abs(mul(x, conj(y)).im) < 1e-10);
}

const d = [[phase(-phi / 2), C(0)], [C(0), phase(phi / 2)]];
for (const p of projectors) {
  const realified = matrixMul(matrixMul(d, p), dagger(d));
  assert(Math.abs(realified[0][1].im) < 1e-10);
  assert(realified[0][1].re > 0);
  assert(matrixNear(matrixMul(realified, realified), realified));
}

// Distinct effective masses with phases 0 and pi/2 fail the collinearity gate.
const m1 = C(1);
const m2 = C(0, 1);
assert(Math.abs(mul(m1, conj(m2)).im) > 0.9);

console.log("Single Dirac mass spectral alignment: PASS");
console.log("complex_mass_positive_energy_residues=rank_one_positive_projectors");
console.log("all_momenta_share_one_offdiagonal_phase=arg_mass");
console.log("one_momentum_independent_chiral_rephasing_realifies_full_family");
console.log("isolated_mass_phase=relative_convention_not_absolute_anchor");
console.log("multiple_noncollinear_mass_phases=real_slice_obstruction");
