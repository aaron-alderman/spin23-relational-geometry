import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
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
const kron = (a, b) => {
  const out = zero(a.length * b.length, a[0].length * b[0].length);
  for (let i = 0; i < a.length; i += 1) for (let j = 0; j < a[0].length; j += 1)
    for (let k = 0; k < b.length; k += 1) for (let l = 0; l < b[0].length; l += 1)
      out[i * b.length + k][j * b[0].length + l] = mul(a[i][j], b[k][l]);
  return out;
};
const transform = (l, x, r) => mmul(mmul(l, x), dagger(r));
const ternary = (x, y, z) => mmul(mmul(x, dagger(y)), z);

const Hu = [[C(0.2), C(0), C(0)], [C(0), C(0.7), C(0)], [C(0), C(0), C(1.3)]];
const Hd = [
  [C(0.5), C(0.12, 0.08), C(-0.04, 0.03)],
  [C(0.12, -0.08), C(0.9), C(0.07, -0.05)],
  [C(-0.04, -0.03), C(0.07, 0.05), C(1.4)],
];
const t = 0.31;
const W = mmul(mmul(mmul(expm(mscale(t, imul(Hu))), expm(mscale(t, imul(Hd)))), expm(mscale(-t, imul(Hu)))), expm(mscale(-t, imul(Hd))));
assert(norm(madd(mmul(dagger(W), W), mscale(-1, eye(3)))) < 1e-10);

const L = kron(eye(2), W);
const R = W;
const make = (offset) => Array.from({ length: 6 }, (_, i) => Array.from({ length: 3 }, (_, j) => C(
  Math.sin(0.31 * (i + 1) * (j + 2) + offset),
  Math.cos(0.23 * (i + 2) * (j + 1) - offset),
)));
const X = make(0.1), Y = make(0.7), Z = make(1.4);
const lhs = transform(L, ternary(X, Y, Z), R);
const rhs = ternary(transform(L, X, R), transform(L, Y, R), transform(L, Z, R));
assert(norm(madd(lhs, mscale(-1, rhs))) < 1e-9);

// Gauge-index and flavor-index actions commute as Kronecker factors.
const G = [[C(0), C(1)], [C(1), C(0)]];
const gaugeAction = kron(G, eye(3));
const flavorAction = kron(eye(2), W);
assert(norm(madd(mmul(gaugeAction, flavorAction), mscale(-1, mmul(flavorAction, gaugeAction)))) < 1e-10);

console.log("Generation-amplified TRO flavor plaquette: PASS");
console.log("amplified_component=M_2x1_tensor_M3_is_M_6x3");
console.log("two_sided_flavor_plaquette_action=exact_ternary_automorphism");
console.log("universal_flavor_action_commutes_with_gauge_index_action");
console.log("one_generation_TRO_does_not_derive_generation_multiplicity_or_Hu_Hd");
console.log("global_sector_dependent_linking_graph_gluing=next_gate");
