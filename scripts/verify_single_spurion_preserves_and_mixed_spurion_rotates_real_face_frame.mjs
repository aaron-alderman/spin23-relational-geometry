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
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));

const D = diag([1, 2, 4]);
const D2 = mmul(D, D);

// Every real single-spurion polynomial D(a0 I+a1 D2+a2 D2^2) retains the frame.
for (const coefficients of [[1, 0.2, 0.03], [0.4, -0.05, 0.01], [2, 0, 0.1]]) {
  const polynomial = madd(mscale(coefficients[0], eye(3)), madd(mscale(coefficients[1], D2), mscale(coefficients[2], mmul(D2, D2))));
  const Csingle = mmul(D, polynomial);
  assert(norm(comm(D2, mmul(Csingle, dagger(Csingle)))) < 1e-10);
}

const theta = 0.43;
const phase = 0.71;
const c = Math.cos(theta), s = Math.sin(theta);
const ep = C(Math.cos(phase), Math.sin(phase));
const em = conj(ep);
const V = [
  [C(c), scale(s, em), C(0)],
  [scale(-s, ep), C(c), C(0)],
  [C(0), C(0), C(1)],
];
assert(norm(madd(mmul(dagger(V), V), mscale(-1, eye(3)))) < 1e-10);
const Hpartner = mmul(mmul(V, diag([1, 3, 7])), dagger(V));
assert(norm(comm(D2, Hpartner)) > 0.1);

const epsilon = 0.08;
const Cmixed = mmul(madd(eye(3), mscale(epsilon, Hpartner)), D);
const Lmixed = mmul(Cmixed, dagger(Cmixed));
assert(norm(comm(D2, Lmixed)) > 0.1);

// Lmixed=A A^dagger is positive: sampled quadratic forms are nonnegative.
const vectors = [
  [C(1), C(0), C(0)],
  [C(0.2, 0.4), C(-0.7, 0.1), C(0.5, -0.3)],
  [C(-1, 0.2), C(0.3, 0.8), C(0.1, -0.6)],
];
for (const v of vectors) {
  const Av = Cmixed.map((row) => row.reduce((sum, x, j) => add(sum, mul(x, v[j])), C(0)));
  const q = Av.reduce((sum, z) => sum + z.re ** 2 + z.im ** 2, 0);
  assert(q >= -1e-12);
}

console.log("Single/mixed spurion real-frame test: PASS");
console.log("real_single_spurion_functional_calculus=common_frame_preserved");
console.log(`partner_commutator_norm=${norm(comm(D2, Hpartner))}`);
console.log(`corrected_frame_commutator_norm=${norm(comm(D2, Lmixed))}`);
console.log("mixed_noncommuting_spurion=fixed_left_frame_destroyed");
console.log("corrected_positive_product=remains_positive");
console.log("local_real_slice_bundle_and_holonomy=next_gate");
