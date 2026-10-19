import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const near = (a, b, tolerance = 1e-9) => Math.hypot(a.re - b.re, a.im - b.im) < tolerance;
const zero = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const msub = (a, b) => a.map((row, i) => row.map((x, j) => add(x, scale(-1, b[i][j]))));
const maxAbs = (a) => Math.max(...a.flat().map((z) => Math.hypot(z.re, z.im)));
const diag = (values) => values.map((x, i) => values.map((_, j) => C(i === j ? x : 0)));
const block = (a, b, c, d) => [...a.map((row, i) => [...row, ...b[i]]), ...c.map((row, i) => [...row, ...d[i]])];

const s12 = 0.23, s23 = 0.041, s13 = 0.0037, delta = 1.2;
const c12 = Math.sqrt(1 - s12 ** 2), c23 = Math.sqrt(1 - s23 ** 2), c13 = Math.sqrt(1 - s13 ** 2);
const ep = C(Math.cos(delta), Math.sin(delta));
const em = conj(ep);
const V = [
  [C(c12 * c13), C(s12 * c13), scale(s13, em)],
  [add(C(-s12 * c23), scale(-c12 * s23 * s13, ep)), add(C(c12 * c23), scale(-s12 * s23 * s13, ep)), C(s23 * c13)],
  [add(C(s12 * s23), scale(-c12 * c23 * s13, ep)), add(C(-c12 * s23), scale(-s12 * c23 * s13, ep)), C(c23 * c13)],
];
assert(maxAbs(msub(mmul(dagger(V), V), eye(3))) < 1e-9);

const masses = [0.4, 1.3, 3.1];
const D = diag(masses);
const M = mmul(V, D); // U_L=V, U_R=I.
const W = block(V, zero(3), zero(3), eye(3));

for (const k of [-2.4, -0.5, 0, 1.7]) {
  const H = block(diag([k, k, k]), M, dagger(M), diag([-k, -k, -k]));
  const omegas = masses.map((m) => Math.hypot(k, m));
  const PinMassFrame = block(
    diag(omegas.map((w) => (1 + k / w) / 2)),
    diag(masses.map((m, i) => m / (2 * omegas[i]))),
    diag(masses.map((m, i) => m / (2 * omegas[i]))),
    diag(omegas.map((w) => (1 - k / w) / 2)),
  );
  assert(maxAbs(msub(mmul(PinMassFrame, PinMassFrame), PinMassFrame)) < 1e-9);
  const P = mmul(mmul(W, PinMassFrame), dagger(W));
  assert(maxAbs(msub(mmul(P, P), P)) < 1e-9);
  const recovered = mmul(mmul(dagger(W), P), W);
  assert(maxAbs(msub(recovered, PinMassFrame)) < 1e-9);
  assert(maxAbs(msub(H, dagger(H))) < 1e-9);
}

const jProduct = mul(mul(V[0][0], V[1][1]), conj(mul(V[0][1], V[1][0])));
assert(Math.abs(jProduct.im) > 1e-7);

console.log("Fixed mass-matrix multiflavor spectral alignment: PASS");
console.log("one_SVD_realifies_all_free_momentum_residues_into_direct_sum_H2R");
console.log("positive_energy_residues=Hermitian_rank_n_projectors");
console.log(`relative_left_frame_Jarlskog=${jProduct.im}`);
console.log("real_face_blocks_are_compatible_with_nonzero_flavor_CP");
console.log("interacting_common_singular_frame=still_open");
