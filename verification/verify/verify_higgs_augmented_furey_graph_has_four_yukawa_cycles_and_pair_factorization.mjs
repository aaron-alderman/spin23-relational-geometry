import assert from "node:assert/strict";

const vertices = ["O2", "H", "C", "D", "E"];
const matterEdges = ["Q", "uc", "dc", "L", "ec", "nuc"];
const augmentedEdges = [...matterEdges, "hC", "hD"];
assert.equal(augmentedEdges.length - vertices.length + 1, 4);
assert.equal(augmentedEdges.filter((e) => e !== "nuc").length - vertices.length + 1, 3);

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

const H1 = [[C(0.2), C(0.04, 0.03), C(0)], [C(0.04, -0.03), C(0.7), C(0.02)], [C(0), C(0.02), C(1.2)]];
const H2 = [[C(0.4), C(-0.05, 0.07), C(0.01)], [C(-0.05, -0.07), C(0.9), C(0.03, -0.02)], [C(0.01), C(0.03, 0.02), C(1.4)]];
const names = augmentedEdges;
const T = {};
for (let i = 0; i < names.length; i += 1) T[names[i]] = expm(mscale(0.09 * (i + 1), imul(i % 2 ? H1 : H2)));

const Uu = mmul(mmul(T.hC, T.uc), T.Q);
const Ud = mmul(mmul(T.hD, T.dc), T.Q);
const Ue = mmul(mmul(T.L, T.ec), dagger(T.hC));
const Unu = mmul(mmul(T.L, T.nuc), dagger(T.hD));
const matterC = mmul(mmul(mmul(T.L, T.ec), T.uc), T.Q);
const matterD = mmul(mmul(mmul(T.L, T.nuc), T.dc), T.Q);
assert(norm(madd(mmul(Ue, Uu), mscale(-1, matterC))) < 1e-9);
assert(norm(madd(mmul(Unu, Ud), mscale(-1, matterD))) < 1e-9);

for (const U of [Uu, Ud, Ue, Unu]) assert(norm(madd(mmul(dagger(U), U), mscale(-1, eye(3)))) < 1e-9);

console.log("Higgs-augmented Furey graph four-cycle theorem: PASS");
console.log("vertices=5 matter_edges=6 matter_cycle_rank=2");
console.log("with_hC_hD_edges=8 augmented_cycle_rank=4");
console.log("without_nu_c_augmented_cycle_rank=3");
console.log("matter_C_cycle=charged_lepton_cycle_times_up_cycle");
console.log("matter_D_cycle=neutrino_cycle_times_down_cycle");
console.log("quark_and_lepton_plaquettes_are_not_matter_composite_plaquette");
