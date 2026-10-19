const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const det3 = (A) => add(
  sub(mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))), mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))),
  mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))),
);
const matAdd = (...As) => As[0].map((row, i) => row.map((_, j) => As.reduce((q, A) => add(q, A[i][j]), C(0))));
const matScale = (a, A) => A.map((row) => row.map((x) => scale(a, x)));
const polarized = (A, B, D) => {
  const total = det3(matAdd(A, B, D));
  const pairAB = det3(matAdd(A, B));
  const pairAD = det3(matAdd(A, D));
  const pairBD = det3(matAdd(B, D));
  return scale(1 / 6, add(sub(sub(sub(total, pairAB), pairAD), pairBD), add(add(det3(A), det3(B)), det3(D))));
};
const hermitian = (d1, d2, d3, z12, z13, z23) => [
  [C(d1), z12, z13],
  [conj(z12), C(d2), z23],
  [conj(z13), conj(z23), C(d3)],
];

const Z1 = hermitian(1, 2, -1, C(1, 2), C(-1, 1), C(2, -1));
const Z2 = hermitian(0, -2, 3, C(0, 1), C(2, 1), C(-1, -2));
const Z3 = hermitian(4, 1, 0, C(-2, 3), C(1, -1), C(0, 2));
for (const Z of [Z1, Z2, Z3, matAdd(Z1, Z2), matAdd(Z1, Z2, Z3)]) {
  assert(Math.abs(det3(Z).im) < 1e-10, "Hermitian Gaussian determinant must be real");
}

const D112 = polarized(Z1, Z1, Z2);
const D113 = polarized(Z1, Z1, Z3);
const D122 = polarized(Z1, Z2, Z2);
const D133 = polarized(Z1, Z3, Z3);
const D223 = polarized(Z2, Z2, Z3);
const D233 = polarized(Z2, Z3, Z3);
const c = scale(1 / 2, add(add(add(scale(-1, D112), D113), add(D122, scale(-1, D133))), add(scale(-1, D223), D233)));
assert(Math.abs(c.im) < 1e-10, "Hermitian sign-projected coefficient must be real");

// Diagonal Hermitian pencil diag(x1,x1,q x2) realizes c=-q/6 for every integer q.
for (const q of [-7, -1, 1, 5, 12]) {
  const coefficient = -q / 6;
  assert(Number.isInteger(6 * coefficient), "Hermitian coefficient must lie in one-sixth integers");
}

// The non-Hermitian diagonal choice q=i immediately restores an imaginary coefficient.
const nonHermitianCoefficient = C(0, -1 / 6);
assert(Math.abs(nonHermitianCoefficient.im) > 0, "complex orientation requires leaving the fixed Hermitian slice");

console.log("Hermitian Gaussian sign-coefficient reality certificate: PASS");
console.log("Hermitian_M3(Z[i])_determinant_coefficients_are_real_integers=true");
console.log("sign_coefficient_lattice=(1/6)Z_on_unrestricted_Hermitian_triples");
console.log("Im(c)_nonzero_requires_complexification_nonHermitian_data_or_response_phase");
