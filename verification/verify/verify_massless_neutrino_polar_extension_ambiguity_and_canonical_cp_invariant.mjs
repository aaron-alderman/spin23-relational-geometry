import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const diagC = (values) => values.map((x, i) => values.map((_, j) => i === j ? x : C(0)));
const diag = (values) => diagC(values.map((x) => C(x)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));
const plaquette = (u, v) => mmul(mmul(mmul(u, v), dagger(u)), dagger(v));

const s12 = 0.55, s23 = 0.64, s13 = 0.15, delta = 1.1;
const c12 = Math.sqrt(1 - s12 ** 2), c23 = Math.sqrt(1 - s23 ** 2), c13 = Math.sqrt(1 - s13 ** 2);
const ep = phase(delta), em = conj(ep);
const U = [
  [C(c12 * c13), C(s12 * c13), scale(s13, em)],
  [add(C(-s12 * c23), scale(-c12 * s23 * s13, ep)), add(C(c12 * c23), scale(-s12 * s23 * s13, ep)), C(s23 * c13)],
  [add(C(s12 * s23), scale(-c12 * c23 * s13, ep)), add(C(-c12 * s23), scale(-s12 * c23 * s13, ep)), C(c23 * c13)],
];
assert(norm(madd(mmul(dagger(U), U), mscale(-1, eye(3)))) < 1e-9);

const masses = diag([0, 0.3, 1.1]);
const Mnu = mmul(U, masses);
const Hnu = mmul(Mnu, dagger(Mnu));
const He = diag([0.2, 0.8, 1.7]);
const cubic = trace(mmul(mmul(comm(He, Hnu), comm(He, Hnu)), comm(He, Hnu))).im;
assert(Math.abs(cubic) > 1e-8);

const partial = mmul(U, diag([0, 1, 1]));
const support = diag([0, 1, 1]);
const Ue = [
  [C(0.8), C(0.6), C(0)],
  [C(-0.6), C(0.8), C(0)],
  [C(0), C(0), C(1)],
];
const characters = [];
for (const phi of [0, 0.7, 1.4]) {
  const extension = mmul(U, diagC([phase(phi), C(1), C(1)]));
  assert(norm(madd(mmul(extension, support), mscale(-1, partial))) < 1e-9);
  characters.push(trace(plaquette(extension, Ue)).im);
}
assert(Math.max(...characters) - Math.min(...characters) > 1e-5);

const quartet = (matrix) => mul(mul(matrix[0][0], matrix[1][1]), conj(mul(matrix[0][1], matrix[1][0]))).im;
const j0 = quartet(U);
for (const phi of [0.3, 1.2, 2.4]) {
  const rephased = mmul(U, diagC([phase(phi), C(1), C(1)]));
  assert(Math.abs(quartet(rephased) - j0) < 1e-12);
}

console.log("Massless-neutrino polar extension and CP invariant: PASS");
console.log(`unitary_extension_plaquette_characters=${characters.join(",")}`);
console.log(`canonical_ImTr_He_Hnu_cubed=${cubic}`);
console.log(`PMNS_Jarlskog_quartet=${j0}`);
console.log("null_column_rephasing_leaves_PMNS_quartet_invariant");
console.log("full_polar_unitary_plaquette=noncanonical_when_rank_deficient");
console.log("Hermitian_mass_squared_commutator=canonical_rank_deficient_alternative");
