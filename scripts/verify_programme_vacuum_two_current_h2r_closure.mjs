import assert from "node:assert/strict";

const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((r) => r.map((x) => a * x));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const quad = (x, A) => x.reduce((s, xi, i) => s + xi * A[i].reduce((t, aij, j) => t + aij * x[j], 0), 0);
const close = (a, b, eps = 1e-11) => Math.abs(a - b) <= eps * (1 + Math.abs(a) + Math.abs(b));

// Re(v v^dagger) is the spectral atom obtained after the vacuum exchange pair
// is combined.  It is a real Gram matrix and is therefore PSD.
const atom = ([a, b], [c, d]) => [
  [a * a + b * b, a * c + b * d],
  [a * c + b * d, c * c + d * d],
];

const amplitudes = [
  [[1.0, 0.3], [0.2, -0.8]],
  [[0.4, -0.7], [1.1, 0.5]],
  [[0.9, 0.2], [-0.3, 0.6]],
];
const masses = [0.8, 2.1, 5.0];
const weights = [1.2, 0.7, 1.5];
const atoms = amplitudes.map(([v1, v2], k) => scale(weights[k], atom(v1, v2)));

for (const A of atoms) {
  assert(close(A[0][1], A[1][0]), "spectral atom must be real symmetric");
  assert(A[0][0] >= -1e-12 && A[1][1] >= -1e-12 && det2(A) >= -1e-12, "spectral atom must be PSD");
}

const zero = [[0, 0], [0, 0]];
const stieltjes = (Q2) => atoms.reduce((K, A, k) => add(K, scale(1 / (Q2 + masses[k]), A)), zero);
for (const Q2 of [0.1, 1, 10, 100]) {
  const K = stieltjes(Q2);
  assert(close(K[0][1], K[1][0]));
  assert(K[0][0] > 0 && K[1][1] > 0 && det2(K) > 0, "full-support Stieltjes response must be positive definite");
}

// Imaginary part of 1/(s-z) is y/((s-x)^2+y^2), hence a positive sum.
const herglotzImag = (x, y) => atoms.reduce((K, A, k) => {
  const kernel = y / ((masses[k] - x) ** 2 + y ** 2);
  return add(K, scale(kernel, A));
}, zero);
for (const [x, y] of [[0, 0.2], [1, 1], [4, 0.5]]) {
  const ImF = herglotzImag(x, y);
  assert(y > 0 && ImF[0][0] > 0 && ImF[1][1] > 0 && det2(ImF) > 0);
}

// A real scale/shear change preserves the cone by congruence and illustrates
// why positivity cannot calibrate the source frame.
const M = [[2, -0.375], [0, 0.8]];
for (const A of atoms) {
  const B = mul(mul(M, A), transpose(M));
  assert(close(B[0][1], B[1][0]));
  for (const x of [[1, 0], [0, 1], [1, -2], [0.3, 1.7]]) assert(quad(x, B) >= -1e-11);
}

// Ward-protected q direction: the nonlocal longitudinal block can only have
// the lambda-lambda entry in the ordered basis (lambda, q).
const longitudinal = [[3.25, 0], [0, 0]];
assert.equal(longitudinal[0][1], 0);
assert.equal(longitudinal[1][0], 0);
assert.equal(longitudinal[1][1], 0);

console.log("PASS vacuum two-current spectral closure");
console.log(`atoms=${atoms.length}`);
console.log(`det_K_Q2_1=${det2(stieltjes(1)).toFixed(12)}`);
console.log(`det_ImF=${det2(herglotzImag(1, 1)).toFixed(12)}`);
console.log("cone=Sym2(R)+ ~= H2(R)+");
console.log("thermal_KMS_and_contact_subtraction=not_closed_by_this_certificate");
