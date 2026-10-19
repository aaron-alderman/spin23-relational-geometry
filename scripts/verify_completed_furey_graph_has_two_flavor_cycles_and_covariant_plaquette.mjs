import assert from "node:assert/strict";

const vertices = ["O2", "H", "C", "D", "E"];
const edges = [
  { name: "Q", source: "H", target: "O2" },
  { name: "uc", source: "O2", target: "C" },
  { name: "dc", source: "O2", target: "D" },
  { name: "L", source: "E", target: "H" },
  { name: "ec", source: "C", target: "E" },
  { name: "nuc", source: "D", target: "E" },
];
assert.equal(edges.length - vertices.length + 1, 2);
assert.equal(edges.filter((e) => e.name !== "nuc").length - vertices.length + 1, 1);

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
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
const det3 = (a) => add(
  add(mul(a[0][0], add(mul(a[1][1], a[2][2]), scale(-1, mul(a[1][2], a[2][1])))), scale(-1, mul(a[0][1], add(mul(a[1][0], a[2][2]), scale(-1, mul(a[1][2], a[2][0])))))),
  mul(a[0][2], add(mul(a[1][0], a[2][1]), scale(-1, mul(a[1][1], a[2][0])))),
);

const Hc = [[C(0.2), C(0), C(0)], [C(0), C(0.7), C(0)], [C(0), C(0), C(1.3)]];
const Hd = [
  [C(0.5), C(0.12, 0.08), C(-0.04, 0.03)],
  [C(0.12, -0.08), C(0.9), C(0.07, -0.05)],
  [C(-0.04, -0.03), C(0.07, 0.05), C(1.4)],
];
const Uc = expm(mscale(0.31, imul(Hc)));
const Ud = expm(mscale(0.31, imul(Hd)));
const transports = { Q: eye(3), uc: eye(3), dc: eye(3), L: eye(3), ec: Uc, nuc: Ud };
const cycleC = (t) => mmul(mmul(mmul(t.L, t.ec), t.uc), t.Q);
const cycleD = (t) => mmul(mmul(mmul(t.L, t.nuc), t.dc), t.Q);
const plaquette = (u, v) => mmul(mmul(mmul(u, v), dagger(u)), dagger(v));
const UC = cycleC(transports), UD = cycleD(transports), W = plaquette(UC, UD);

const generators = {
  O2: expm(mscale(0.17, imul(Hd))),
  H: expm(mscale(-0.23, imul(Hc))),
  C: expm(mscale(0.11, imul(Hc))),
  D: expm(mscale(-0.19, imul(Hd))),
  E: expm(mscale(0.07, imul(Hd))),
};
const transformed = {};
for (const edge of edges) transformed[edge.name] = mmul(mmul(generators[edge.target], transports[edge.name]), dagger(generators[edge.source]));
const UCP = cycleC(transformed), UDP = cycleD(transformed), WP = plaquette(UCP, UDP);
const conjugatedUC = mmul(mmul(generators.H, UC), dagger(generators.H));
const conjugatedUD = mmul(mmul(generators.H, UD), dagger(generators.H));
const conjugatedW = mmul(mmul(generators.H, W), dagger(generators.H));
assert(norm(madd(UCP, mscale(-1, conjugatedUC))) < 1e-9);
assert(norm(madd(UDP, mscale(-1, conjugatedUD))) < 1e-9);
assert(norm(madd(WP, mscale(-1, conjugatedW))) < 1e-9);
assert(Math.hypot(trace(WP).re - trace(W).re, trace(WP).im - trace(W).im) < 1e-9);
assert(Math.hypot(det3(W).re - 1, det3(W).im) < 1e-9);

console.log("Completed Furey graph flavor holonomy: PASS");
console.log("vertices=5 edges=6 connected_cycle_rank=2");
console.log("puncturing_nu_c_edge_cycle_rank=1");
console.log("C_and_D_cycle_holonomies=vertex_gauge_covariant");
console.log("cycle_group_commutator_trace=vertex_gauge_invariant");
console.log("plaquette_determinant=1");
console.log("physical_edge_transport_derivation=still_open");
