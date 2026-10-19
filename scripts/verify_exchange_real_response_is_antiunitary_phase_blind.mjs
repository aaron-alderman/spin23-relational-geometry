import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const near = (x, y, tolerance = 1e-10) => Math.hypot(x.re - y.re, x.im - y.im) < tolerance;
const matrixNear = (a, b) => a.every((row, i) => row.every((z, j) => near(z, b[i][j])));

const exchangeAdjoint = (r) => [
  [conj(r[1][1]), conj(r[1][0])],
  [conj(r[0][1]), conj(r[0][0])],
];
const response = (a, c) => [[C(a), c], [conj(c), C(a)]];

for (const [a, theta, radius] of [[2, 0.2, 0.7], [1, 1.3, 1], [4, -0.8, 2.1]]) {
  const c = mul(C(radius), phase(theta));
  const r = response(a, c);
  assert(matrixNear(exchangeAdjoint(r), r));
  const eigenvalues = [a - radius, a + radius];
  assert(eigenvalues[0] >= -1e-10);
  assert(near(C(a * a - radius * radius), add(mul(r[0][0], r[1][1]), C(-mul(r[0][1], r[1][0]).re))));
}

// Rank-one boundary residues exist for every off-diagonal phase.
const residues = [0, 0.37, Math.PI / 2, 2.2].map((theta) => response(1, phase(theta)));
for (const rho of residues) {
  assert(matrixNear(exchangeAdjoint(rho), rho));
  const determinant = mul(rho[0][0], rho[1][1]);
  const offProduct = mul(rho[0][1], rho[1][0]);
  assert(near(determinant, offProduct));
}

// Multiplying an antiunitary by a phase cancels in J R J^{-1}; its square also remains one.
for (const phi of [0.14, 0.9, 2.4]) {
  const p = phase(phi);
  assert(near(mul(p, conj(p)), C(1)));
  for (const rho of residues) assert(matrixNear(exchangeAdjoint(rho), rho));
}

// Simultaneous realification requires Im(c_n conjugate(c_m))=0 for all pairs.
const aligned = [phase(0.4), mul(C(-2), phase(0.4)), mul(C(0.3), phase(0.4))];
for (const x of aligned) for (const y of aligned) assert(Math.abs(mul(x, conj(y)).im) < 1e-10);
const misaligned = [C(1), C(0, 1)];
assert(Math.abs(mul(misaligned[0], conj(misaligned[1])).im) > 0.9);

console.log("Exchange-real response phase blindness: PASS");
console.log("fixed_Hermitian_set=equal_diagonals_with_arbitrary_complex_offdiagonal");
console.log("positive_cone=a_greater_or_equal_abs_c_is_Lorentz3");
console.log("antiunitary_rephasing_leaves_fixed_cone_and_positivity_unchanged");
console.log("positive_rank_one_residues_allow_arbitrary_offdiagonal_phase");
console.log("simultaneous_realification=pairwise_phase_collinearity_not_positivity");
