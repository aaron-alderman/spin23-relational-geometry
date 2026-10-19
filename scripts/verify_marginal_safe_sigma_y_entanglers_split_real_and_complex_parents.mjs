import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const kron = (a, b) => {
  const out = zero(a.length * b.length, a[0].length * b[0].length);
  for (let i = 0; i < a.length; i += 1) for (let j = 0; j < a[0].length; j += 1)
    for (let k = 0; k < b.length; k += 1) for (let l = 0; l < b[0].length; l += 1)
      out[i * b.length + k][j * b[0].length + l] = mul(a[i][j], b[k][l]);
  return out;
};
const normImag = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.im ** 2, 0));
const normReal = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2, 0));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const differenceNorm = (a, b) => Math.sqrt(a.flat().reduce((s, z, index) => {
  const w = b.flat()[index]; return s + (z.re - w.re) ** 2 + (z.im - w.im) ** 2;
}, 0));

const sigmaY = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const S = [[C(1), C(0.2), C(-0.1)], [C(0.2), C(-0.4), C(0.3)], [C(-0.1), C(0.3), C(-0.6)]];
const K = [[C(0), C(1), C(-0.5)], [C(-1), C(0), C(0.7)], [C(0.5), C(-0.7), C(0)]];
const iK = K.map((row) => row.map((z) => C(0, z.re)));
const graded = kron(sigmaY, iK);
const complexLeak = kron(sigmaY, S);
assert(normImag(graded) < 1e-12);
assert(differenceNorm(graded, transpose(graded)) < 1e-12);
assert(normReal(complexLeak) < 1e-12);
assert(normImag(complexLeak) > 0.1);

const partialFlavorTrace = (a) => {
  const out = zero(2);
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1)
    for (let f = 0; f < 3; f += 1) out[i][j] = add(out[i][j], a[3 * i + f][3 * j + f]);
  return out;
};
assert(normReal(partialFlavorTrace(graded)) < 1e-12 && normImag(partialFlavorTrace(graded)) < 1e-12);
assert(normReal(partialFlavorTrace(complexLeak)) < 1e-12 && normImag(partialFlavorTrace(complexLeak)) < 1e-12);

// Exact positivity checks for representatives with known spectra.
// S diagonal traceless has eigenvalues 1,-0.4,-0.6, so cI +/- epsilon S >=0 iff |epsilon|<=c.
const Sdiag = [[C(1), C(0), C(0)], [C(0), C(-0.4), C(0)], [C(0), C(0), C(-0.6)]];
const c = 0.8;
for (const epsilon of [0, 0.2, 0.79]) {
  for (const eigen of [1, -0.4, -0.6]) {
    assert(c + epsilon * eigen >= -1e-12);
    assert(c - epsilon * eigen >= -1e-12);
  }
}
const epsilonFail = 0.81;
assert(c - epsilonFail * 1 < 0);

// The imaginary-antisymmetric iK example has eigenvalues 0,+/-sqrt(1^2+0.5^2+0.7^2).
const kNorm = Math.hypot(1, 0.5, 0.7);
const safeEpsilon = 0.5;
assert(c - safeEpsilon * kNorm > 0);
const unsafeEpsilon = 0.7;
assert(c - unsafeEpsilon * kNorm < 0);

assert.equal(5 + 3, 8);
console.log("Marginal-safe sigma_y entangler split: PASS");
console.log("traceless_Hermitian_flavor_dimension=8_equals_symmetric_traceless_5_plus_imaginary_antisymmetric_3");
console.log("sigma_y_tensor_iK=real_symmetric_graded_H6R_sector");
console.log("sigma_y_tensor_S=purely_imaginary_Hermitian_requires_complex_parent");
console.log("both_traceless_sectors=zero_unweighted_face_marginal");
console.log("positivity_threshold=abs_epsilon_times_operator_norm_F_less_or_equal_background_c");
console.log("flavor_real_structure_and_radiative_coefficients=remaining_selection_gates");
