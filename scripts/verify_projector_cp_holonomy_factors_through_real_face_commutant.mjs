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
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const outer = (v) => v.map((vi) => v.map((vj) => mul(vi, conj(vj))));
const column = (a, j) => a.map((row) => row[j]);
const kron = (a, b) => {
  const out = zero(a.length * b.length, a[0].length * b[0].length);
  for (let i = 0; i < a.length; i += 1) for (let j = 0; j < a[0].length; j += 1)
    for (let k = 0; k < b.length; k += 1) for (let l = 0; l < b[0].length; l += 1)
      out[i * b.length + k][j * b[0].length + l] = mul(a[i][j], b[k][l]);
  return out;
};
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));

const s12 = 0.55, s23 = 0.64, s13 = 0.15, delta = 1.1;
const c12 = Math.sqrt(1 - s12 ** 2), c23 = Math.sqrt(1 - s23 ** 2), c13 = Math.sqrt(1 - s13 ** 2);
const ep = C(Math.cos(delta), Math.sin(delta)), em = conj(ep);
const U = [
  [C(c12 * c13), C(s12 * c13), scale(s13, em)],
  [add(C(-s12 * c23), scale(-c12 * s23 * s13, ep)), add(C(c12 * c23), scale(-s12 * s23 * s13, ep)), C(s23 * c13)],
  [add(C(s12 * s23), scale(-c12 * c23 * s13, ep)), add(C(-c12 * s23), scale(-s12 * c23 * s13, ep)), C(c23 * c13)],
];
const Pe0 = outer([C(1), C(0), C(0)]), Pe1 = outer([C(0), C(1), C(0)]);
const Pn0 = outer(column(U, 0)), Pn1 = outer(column(U, 1));
const flavorB = trace(mmul(mmul(mmul(Pe0, Pn0), Pe1), Pn1));
assert(Math.abs(flavorB.im) > 1e-4);

const f = [C(0.6), C(0.8)];
const p = outer(f);
assert(norm(madd(mmul(p, p), mscale(-1, p))) < 1e-12);
const combined = [Pe0, Pn0, Pe1, Pn1].map((P) => kron(p, P));
const combinedB = trace(mmul(mmul(mmul(combined[0], combined[1]), combined[2]), combined[3]));
assert(Math.hypot(combinedB.re - flavorB.re, combinedB.im - flavorB.im) < 1e-12);

const S1 = [[C(1.2), C(0.2)], [C(0.2), C(0.9)]];
const S2 = [[C(0.8), C(-0.1)], [C(-0.1), C(1.1)]];
const S3 = [[C(1.0), C(0.15)], [C(0.15), C(0.7)]];
const S4 = [[C(0.9), C(0.05)], [C(0.05), C(1.3)]];
const faceFactor = trace(mmul(mmul(mmul(S1, S2), S3), S4));
assert(Math.abs(faceFactor.im) < 1e-12);
const X = [kron(S1, Pe0), kron(S2, Pn0), kron(S3, Pe1), kron(S4, Pn1)];
const total = trace(mmul(mmul(mmul(X[0], X[1]), X[2]), X[3]));
assert(Math.hypot(total.re - mul(faceFactor, flavorB).re, total.im - mul(faceFactor, flavorB).im) < 1e-10);

const faceAction = kron(S1, eye(3));
const flavorAction = kron(eye(2), Pn0);
assert(norm(madd(mmul(faceAction, flavorAction), mscale(-1, mmul(flavorAction, faceAction)))) < 1e-12);

// Partial flavor trace of p tensor rank-one P returns p.
const combinedResidue = kron(p, Pn0);
const marginal = zero(2);
for (let a = 0; a < 2; a += 1) for (let b = 0; b < 2; b += 1)
  for (let j = 0; j < 3; j += 1) marginal[a][b] = add(marginal[a][b], combinedResidue[3 * a + j][3 * b + j]);
assert(norm(madd(marginal, mscale(-1, p))) < 1e-12);

console.log("Projector CP holonomy through real face commutant: PASS");
console.log(`flavor_quadrilateral_imaginary_part=${flavorB.im}`);
console.log("rank_one_real_face_ray=reproduces_flavor_quadrilateral_exactly");
console.log("general_factor_local_trace=real_face_factor_times_complex_flavor_factor");
console.log("face_Jordan_action_commutes_with_flavor_projectors");
console.log("flavor_partial_trace_preserves_H2R_face_marginal");
console.log("interacting_face_flavor_entanglement=remaining_gate");
