import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const diag = (values) => values.map((x, i) => values.map((_, j) => C(i === j ? x : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));

const eigenvalues = [1, 4, 16];
const Lambda = diag(eigenvalues);
const H = [
  [C(0.7), C(0.2, 0.3), C(-0.1, 0.4)],
  [C(0.2, -0.3), C(-0.4), C(0.5, -0.2)],
  [C(-0.1, -0.4), C(0.5, 0.2), C(1.1)],
];
assert(norm(madd(H, mscale(-1, dagger(H)))) < 1e-12);

const K = zero(3);
for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
  K[i][j] = scale(eigenvalues[i] + eigenvalues[j], H[i][j]);
}
const A = zero(3);
for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
  if (i !== j) A[i][j] = scale(1 / (eigenvalues[j] - eigenvalues[i]), K[i][j]);
}
assert(norm(madd(A, dagger(A))) < 1e-12);

const diagonalDerivative = madd(K, comm(Lambda, A));
for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
  if (i !== j) assert(Math.hypot(diagonalDerivative[i][j].re, diagonalDerivative[i][j].im) < 1e-12);
  else assert(Math.abs(diagonalDerivative[i][i].re - K[i][i].re) < 1e-12);
}

// On a one-dimensional base A(t)dt, both dA and A wedge A are proportional to dt wedge dt=0.
const curvatureCoefficientOfDtWedgeDt = 0;
assert.equal(curvatureCoefficientOfDtWedgeDt, 0);

console.log("Mixed-spurion frame connection: PASS");
console.log("A_ij=K_ij_over_lambda_j_minus_lambda_i");
console.log("K_plus_commutator_Lambda_A=diagonal_to_first_order");
console.log(`connection_antihermiticity_error=${norm(madd(A, dagger(A)))}`);
console.log("one_parameter_RG_curvature_two_form=identically_zero");
console.log("two_parameter_Berry_curvature=next_invariant_gate");
