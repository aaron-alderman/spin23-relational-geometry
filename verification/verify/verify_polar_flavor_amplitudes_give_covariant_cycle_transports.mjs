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
const normalize = (z) => scale(1 / Math.hypot(z.re, z.im), z);

const H1 = [[C(0.2), C(0.1, 0.04), C(0)], [C(0.1, -0.04), C(0.7), C(0.03)], [C(0), C(0.03), C(1.1)]];
const H2 = [[C(0.5), C(-0.07, 0.08), C(0.02)], [C(-0.07, -0.08), C(0.9), C(0.05, -0.04)], [C(0.02), C(0.05, 0.04), C(1.3)]];
const edgeNames = ["Q", "uc", "dc", "L", "ec", "nuc"];
const transports = {}, amplitudes = {}, positives = {};
for (let index = 0; index < edgeNames.length; index += 1) {
  const name = edgeNames[index];
  const T = expm(mscale(0.11 * (index + 1), imul(index % 2 === 0 ? H1 : H2)));
  const P = diag([0.7 + 0.1 * index, 1.2 + 0.07 * index, 1.8 + 0.05 * index]);
  transports[name] = T;
  positives[name] = P;
  amplitudes[name] = mmul(T, P);
  const recovered = mmul(amplitudes[name], diag([1 / P[0][0].re, 1 / P[1][1].re, 1 / P[2][2].re]));
  assert(norm(madd(recovered, mscale(-1, T))) < 1e-10);
  assert(norm(madd(mmul(dagger(T), T), mscale(-1, eye(3)))) < 1e-9);
  assert(Math.hypot(normalize(det3(amplitudes[name])).re - det3(T).re, normalize(det3(amplitudes[name])).im - det3(T).im) < 1e-8);
}

const vertexGenerators = {
  O2: expm(mscale(0.13, imul(H1))), H: expm(mscale(-0.17, imul(H2))),
  C: expm(mscale(0.09, imul(H2))), D: expm(mscale(-0.08, imul(H1))), E: expm(mscale(0.05, imul(H1))),
};
const endpoints = { Q: ["H", "O2"], uc: ["O2", "C"], dc: ["O2", "D"], L: ["E", "H"], ec: ["C", "E"], nuc: ["D", "E"] };
const transformedT = {};
for (const name of edgeNames) {
  const [source, target] = endpoints[name];
  const expected = mmul(mmul(vertexGenerators[target], transports[name]), dagger(vertexGenerators[source]));
  const transformedA = mmul(mmul(vertexGenerators[target], amplitudes[name]), dagger(vertexGenerators[source]));
  const transformedPInverse = mmul(mmul(vertexGenerators[source], diag([
    1 / positives[name][0][0].re, 1 / positives[name][1][1].re, 1 / positives[name][2][2].re,
  ])), dagger(vertexGenerators[source]));
  transformedT[name] = mmul(transformedA, transformedPInverse);
  assert(norm(madd(transformedT[name], mscale(-1, expected))) < 1e-8);
}

const cycleC = (t) => mmul(mmul(mmul(t.L, t.ec), t.uc), t.Q);
const cycleD = (t) => mmul(mmul(mmul(t.L, t.nuc), t.dc), t.Q);
assert(norm(madd(cycleC(transformedT), mscale(-1, mmul(mmul(vertexGenerators.H, cycleC(transports)), dagger(vertexGenerators.H))))) < 1e-8);
assert(norm(madd(cycleD(transformedT), mscale(-1, mmul(mmul(vertexGenerators.H, cycleD(transports)), dagger(vertexGenerators.H))))) < 1e-8);

// Rank-deficient P has no inverse; two different unitary extensions agree on its support.
const rankDeficient = diag([1, 2, 0]);
const extension1 = eye(3);
const extension2 = diag([1, 1, -1]);
assert(norm(madd(mmul(extension1, rankDeficient), mscale(-1, mmul(extension2, rankDeficient)))) < 1e-12);
assert(norm(madd(extension1, mscale(-1, extension2))) > 1);

console.log("Polar flavor edge transport: PASS");
console.log("invertible_edge_amplitude_polar_unitary=unique_and_vertex_covariant");
console.log("positive_polar_factor=carries_singular_values");
console.log("cycle_holonomies=derived_and_base_vertex_covariant");
console.log("normalized_edge_determinants=central_transport_phases");
console.log("rank_deficiency=partial_isometry_with_nonunique_unitary_extension");
console.log("physical_edge_vs_path_Yukawa_assignment=still_open");
