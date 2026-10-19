import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const diag = (values) => values.map((x, i) => values.map((_, j) => C(i === j ? x : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const conjugateMatrix = (a) => a.map((row) => row.map(conj));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));

const s12 = 0.23, s23 = 0.041, s13 = 0.0037, delta = 1.2;
const c12 = Math.sqrt(1 - s12 ** 2), c23 = Math.sqrt(1 - s23 ** 2), c13 = Math.sqrt(1 - s13 ** 2);
const ep = C(Math.cos(delta), Math.sin(delta)), em = conj(ep);
const V = [
  [C(c12 * c13), C(s12 * c13), scale(s13, em)],
  [add(C(-s12 * c23), scale(-c12 * s23 * s13, ep)), add(C(c12 * c23), scale(-s12 * s23 * s13, ep)), C(s23 * c13)],
  [add(C(s12 * s23), scale(-c12 * c23 * s13, ep)), add(C(-c12 * s23), scale(-s12 * c23 * s13, ep)), C(c23 * c13)],
];
assert(norm(madd(mmul(dagger(V), V), mscale(-1, eye(3)))) < 1e-9);
const Hu = diag([1, 4, 11]);
const Hd = mmul(mmul(V, diag([2, 7, 19])), dagger(V));
const Kcomm = comm(Hu, Hd);
const cubic = trace(mmul(mmul(Kcomm, Kcomm), Kcomm)).im;
assert(Math.abs(cubic) > 1e-6);

// Sector antiunitary J=A K acts on H as A conjugate(H) A^dagger.
const Au = eye(3);
const Ad = mmul(V, transpose(V));
const antiSquare = (A) => mmul(A, conjugateMatrix(A));
const antiAct = (A, H) => mmul(mmul(A, conjugateMatrix(H)), dagger(A));
assert(norm(madd(antiSquare(Au), mscale(-1, eye(3)))) < 1e-10);
assert(norm(madd(antiSquare(Ad), mscale(-1, eye(3)))) < 1e-9);
assert(norm(madd(antiAct(Au, Hu), mscale(-1, Hu))) < 1e-10);
assert(norm(madd(antiAct(Ad, Hd), mscale(-1, Hd))) < 1e-8);
assert(norm(madd(antiAct(Au, Hd), mscale(-1, Hd))) > 1e-4);

// Relative product J_u J_d has linear part A_u conjugate(A_d), and is nontrivial.
const relative = mmul(Au, conjugateMatrix(Ad));
assert(norm(madd(relative, mscale(-1, eye(3)))) > 1e-4);

// Orthogonal conjugation preserves real symmetric / imaginary antisymmetric sectors.
const theta = 0.4, c = Math.cos(theta), s = Math.sin(theta);
const O = [[C(c), C(s), C(0)], [C(-s), C(c), C(0)], [C(0), C(0), C(1)]];
const iK = [[C(0), C(0, 1), C(0, -0.3)], [C(0, -1), C(0), C(0, 0.5)], [C(0, 0.3), C(0, -0.5), C(0)]];
const rotatedByO = mmul(mmul(O, iK), dagger(O));
assert(rotatedByO.flat().every((z) => Math.abs(z.re) < 1e-12));

// Generic complex V mixes the imaginary-antisymmetric sector with real-symmetric components.
const rotatedByV = mmul(mmul(V, iK), dagger(V));
assert(rotatedByV.flat().some((z) => Math.abs(z.re) > 1e-5));

// A CP-real comparison pair has zero commutator cubic.
const HdReal = mmul(mmul(O, diag([2, 7, 19])), dagger(O));
const realComm = comm(Hu, HdReal);
assert(Math.abs(trace(mmul(mmul(realComm, realComm), realComm)).im) < 1e-12);

console.log("Universal versus sector flavor real structures: PASS");
console.log("projective_orthogonal_transformations_preserve_5_plus_3_real_split");
console.log("generic_complex_U3_rotation_mixes_symmetric_and_imaginary_antisymmetric_sectors");
console.log(`complex_pair_ImTr_commutator_cubed=${cubic}`);
console.log("one_universal_fixed_antiunitary_implies_Jarlskog_zero");
console.log("each_sector_has_its_own_involutive_antiunitary");
console.log("relative_sector_antiunitary_product=nontrivial_unitary_mismatch");
