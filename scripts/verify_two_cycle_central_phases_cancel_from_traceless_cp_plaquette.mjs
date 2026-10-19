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
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
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

const A = [[C(0.2), C(0), C(0)], [C(0), C(0.7), C(0)], [C(0), C(0), C(1.3)]];
const B = [
  [C(0.5), C(0.12, 0.08), C(-0.04, 0.03)],
  [C(0.12, -0.08), C(0.9), C(0.07, -0.05)],
  [C(-0.04, -0.03), C(0.07, 0.05), C(1.4)],
];
const U = expm(mscale(0.8, imul(A)));
const V = expm(mscale(0.8, imul(B)));
const W = plaquette(U, V);
assert(Math.abs(trace(W).im) > 1e-9);
assert(Math.hypot(det3(W).re - 1, det3(W).im) < 1e-9);

for (const [alpha, beta] of [[0.2, -0.7], [1.1, 0.4], [-2.2, 1.8]]) {
  const phasedW = plaquette(cscale(phase(alpha), U), cscale(phase(beta), V));
  assert(norm(madd(phasedW, mscale(-1, W))) < 1e-9);
}

const G = expm(mscale(0.31, imul(B)));
const Wg = plaquette(mmul(mmul(G, U), dagger(G)), mmul(mmul(G, V), dagger(G)));
assert(Math.hypot(trace(Wg).re - trace(W).re, trace(Wg).im - trace(W).im) < 1e-9);

const theta = 0.6, c = Math.cos(theta), s = Math.sin(theta);
const U2 = [[C(Math.cos(0.4), Math.sin(0.4)), C(0), C(0)], [C(0), C(Math.cos(-0.4), Math.sin(-0.4)), C(0)], [C(0), C(0), C(1)]];
const R2 = [[C(c), C(s), C(0)], [C(-s), C(c), C(0)], [C(0), C(0), C(1)]];
const V2 = mmul(mmul(R2, U2), dagger(R2));
assert(Math.abs(trace(plaquette(U2, V2)).im) < 1e-12);

console.log("Two-cycle central/traceless factorization: PASS");
console.log("two_independent_cycle_determinants=abelian_line_holonomies");
console.log("arbitrary_central_cycle_phases_cancel_from_group_commutator");
console.log("plaquette_lies_in_SU3_and_has_nonzero_three_flavor_CP_character");
console.log("embedded_SU2_plaquette_imaginary_trace=zero");
console.log("flavor_line_holonomy_to_gauge_Z6_identification=still_open");
