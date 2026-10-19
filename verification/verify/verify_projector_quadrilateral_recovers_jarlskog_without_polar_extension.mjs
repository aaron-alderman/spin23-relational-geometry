import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const diag = (values) => values.map((x, i) => values.map((_, j) => C(i === j ? x : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const outer = (v) => v.map((vi) => v.map((vj) => mul(vi, conj(vj))));
const column = (a, j) => a.map((row) => row[j]);
const conjugateMatrix = (a) => a.map((row) => row.map(conj));

const s12 = 0.55, s23 = 0.64, s13 = 0.15, delta = 1.1;
const c12 = Math.sqrt(1 - s12 ** 2), c23 = Math.sqrt(1 - s23 ** 2), c13 = Math.sqrt(1 - s13 ** 2);
const ep = C(Math.cos(delta), Math.sin(delta)), em = conj(ep);
const U = [
  [C(c12 * c13), C(s12 * c13), scale(s13, em)],
  [add(C(-s12 * c23), scale(-c12 * s23 * s13, ep)), add(C(c12 * c23), scale(-s12 * s23 * s13, ep)), C(s23 * c13)],
  [add(C(s12 * s23), scale(-c12 * c23 * s13, ep)), add(C(-c12 * s23), scale(-s12 * c23 * s13, ep)), C(c23 * c13)],
];
const Pe = [outer([C(1), C(0), C(0)]), outer([C(0), C(1), C(0)]), outer([C(0), C(0), C(1)])];
const Pn = [0, 1, 2].map((j) => outer(column(U, j)));
const B = trace(mmul(mmul(mmul(Pe[0], Pn[0]), Pe[1]), Pn[1]));
const quartet = mul(mul(U[0][0], conj(U[1][0])), mul(U[1][1], conj(U[0][1])));
assert(Math.hypot(B.re - quartet.re, B.im - quartet.im) < 1e-12);
assert(Math.abs(B.im) > 1e-4);

const a = [0.2, 0.8, 1.7], b = [0, 0.3 ** 2, 1.1 ** 2];
const He = diag(a);
const Hn = mmul(mmul(U, diag(b)), dagger(U));
const K = comm(He, Hn);
const cubic = trace(mmul(mmul(K, K), K)).im;
const vandermonde = (x) => (x[0] - x[1]) * (x[0] - x[2]) * (x[1] - x[2]);
const predictedMagnitude = Math.abs(6 * B.im * vandermonde(a) * vandermonde(b));
assert(Math.abs(Math.abs(cubic) - predictedMagnitude) < 1e-10);

const Ucp = conjugateMatrix(U);
const PnCP = [0, 1, 2].map((j) => outer(column(Ucp, j)));
const Bcp = trace(mmul(mmul(mmul(Pe[0], PnCP[0]), Pe[1]), PnCP[1]));
assert(Math.abs(Bcp.im + B.im) < 1e-12);

// Rephasing the massless first column leaves every projector unchanged.
const phi = C(Math.cos(0.83), Math.sin(0.83));
const Urephased = U.map((row) => [mul(row[0], phi), row[1], row[2]]);
const PnRephased = [0, 1, 2].map((j) => outer(column(Urephased, j)));
for (let i = 0; i < 3; i += 1) {
  const diff = madd(Pn[i], mscale(-1, PnRephased[i]));
  assert(Math.sqrt(diff.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0)) < 1e-12);
}

console.log("Projector-quadrilateral Jarlskog holonomy: PASS");
console.log(`Im_projector_quadrilateral=${B.im}`);
console.log(`ImTr_mass_squared_commutator_cubed=${cubic}`);
console.log("commutator_cubic_magnitude=6_times_quartet_times_two_Vandermondes");
console.log("massless_eigenline_rephasing=projectors_and_quadrilateral_unchanged");
console.log("CP_conjugation=quadrilateral_imaginary_part_sign_reversed");
console.log("full_unitary_polar_extension=not_required");
