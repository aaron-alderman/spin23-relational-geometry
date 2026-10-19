import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((_, j) => C(i === j ? 1 : 0)));
const diag = (values) => values.map((x, i) => values.map((_, j) => C(i === j ? x : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const bar = (a) => a.map((row) => row.map(conj));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const close = (a, b, tolerance = 1e-10) => norm(madd(a, mscale(-1, b))) < tolerance;

const theta = 0.71;
const c = Math.cos(theta), s = Math.sin(theta);
const A = [
  [C(c), C(0, s), C(0)],
  [C(0, s), C(c), C(0)],
  [C(0), C(0), C(1)],
];
const Hdeg = diag([1, 1, 3]);

assert(close(A, transpose(A)), "linear part of a conjugation must be symmetric unitary");
assert(close(mmul(A, dagger(A)), eye(3)));
assert(close(mmul(A, bar(A)), eye(3)), "A K must square to one");
assert(close(mmul(mmul(A, bar(Hdeg)), dagger(A)), Hdeg), "the conjugation must fix the degenerate spurion");
assert(!close(A, eye(3)), "degeneracy must permit non-diagonal conjugations");

// Takagi representatives U and UO define the same A=UU^T, exhibiting the O(2) quotient.
const root = Math.SQRT1_2;
const U = [
  [C(root), C(0, root), C(0)],
  [C(0, root), C(root), C(0)],
  [C(0), C(0), C(1)],
];
const phi = 0.38;
const O = [
  [C(Math.cos(phi)), C(-Math.sin(phi)), C(0)],
  [C(Math.sin(phi)), C(Math.cos(phi)), C(0)],
  [C(0), C(0), C(1)],
];
assert(close(mmul(U, transpose(U)), mmul(mmul(U, O), transpose(mmul(U, O)))));

// A generic complex partner spurion: degeneracy kills the static three-generation commutator cubic.
const V = [
  [C(0.8), C(0.3, 0.2), C(Math.sqrt(0.23), -0.1)],
  [C(-0.4, 0.1), C(0.85), C(0.2, 0.22)],
  [C(-0.35, -0.08), C(-0.28, 0.18), C(0.84)],
];
// Orthonormalize columns by a fixed Gram-Schmidt routine.
const inner = (x, y) => x.reduce((acc, value, i) => add(acc, mul(conj(value), y[i])), C(0));
const normalize = (x) => {
  const length = Math.sqrt(inner(x, x).re);
  return x.map((value) => scale(1 / length, value));
};
const columns = transpose(V);
const orthonormal = [];
for (const source of columns) {
  let vector = source.map((z) => C(z.re, z.im));
  for (const basis of orthonormal) {
    const coefficient = inner(basis, vector);
    vector = vector.map((z, i) => add(z, scale(-1, mul(coefficient, basis[i]))));
  }
  orthonormal.push(normalize(vector));
}
const W = transpose(orthonormal);
assert(close(mmul(dagger(W), W), eye(3), 1e-9));
const Hd = mmul(mmul(W, diag([2, 5, 11])), dagger(W));
const cubicDegenerate = trace(mmul(mmul(comm(Hdeg, Hd), comm(Hdeg, Hd)), comm(Hdeg, Hd))).im;
const Hsplit = diag([1, 1.2, 3]);
const cubicSplit = trace(mmul(mmul(comm(Hsplit, Hd), comm(Hsplit, Hd)), comm(Hsplit, Hd))).im;
assert(Math.abs(cubicDegenerate) < 1e-10);
assert(Math.abs(cubicSplit) > 1e-6);

console.log("Degenerate-spurion conjugation classification: PASS");
console.log("multiplicity_pattern_2_plus_1=U2_mod_O2_times_U1_mod_O1");
console.log("non_diagonal_involutive_antiunitaries_fix_the_degenerate_block");
console.log("Takagi_representatives_have_right_O2_redundancy");
console.log(`commutator_cubic_exact_degeneracy=${cubicDegenerate}`);
console.log(`commutator_cubic_after_splitting=${cubicSplit}`);
console.log("static_Jarlskog_CP=zero_at_exact_same_charge_degeneracy");
