import assert from "node:assert/strict";

const omega = { re: -0.5, im: Math.sqrt(3) / 2 };
const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mulc = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, x) => C(a.re * x, a.im * x);
const abs = (a) => Math.hypot(a.re, a.im);
const powOmega = (n) => {
  const k = ((n % 3) + 3) % 3;
  return k === 0 ? C(1, 0) : k === 1 ? omega : mulc(omega, omega);
};
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mulc(x, B[k][j])), C())));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const close = (A, B, tol = 1e-10) => A.every((row, i) => row.every((x, j) => abs(add(x, scale(B[i][j], -1))) < tol));

// A2 discriminant form: D=L*/L=Z/3, q(a)=a^2/3 mod 1.
const qNumerator = (a) => ((a * a) % 3 + 3) % 3;
assert.deepEqual([0, 1, 2].map(qNumerator), [0, 1, 1]);

// Weil S and T matrices, up to the signature-dependent global phase.
const S = Array.from({ length: 3 }, (_, a) => Array.from({ length: 3 }, (_, b) => scale(powOmega(a * b), 1 / Math.sqrt(3))));
const T = Array.from({ length: 3 }, (_, a) => Array.from({ length: 3 }, (_, b) => a === b ? powOmega(qNumerator(a)) : C()));
assert(close(matMul(S, dagger(S)), eye(3)));
assert(close(matMul(T, dagger(T)), eye(3)));

// Qutrit Weyl pair and projective Clifford normalization.
const Xshift = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => C()));
for (let a = 0; a < 3; a++) Xshift[(a + 1) % 3][a] = C(1);
const Zphase = Array.from({ length: 3 }, (_, a) => Array.from({ length: 3 }, (_, b) => a === b ? powOmega(a) : C()));
const mpow = (A, n) => { let R = eye(A.length); for (let i = 0; i < n; i++) R = matMul(R, A); return R; };
const projectivelyEqual = (A, B, tol = 1e-9) => {
  let ratio = null;
  for (let i = 0; i < A.length && ratio === null; i++) for (let j = 0; j < A.length; j++) {
    if (abs(B[i][j]) > tol) {
      if (abs(A[i][j]) < tol) return false;
      ratio = mulc(A[i][j], C(B[i][j].re / (abs(B[i][j]) ** 2), -B[i][j].im / (abs(B[i][j]) ** 2)));
      break;
    } else if (abs(A[i][j]) > tol) return false;
  }
  if (ratio === null) return A.every((row) => row.every((x) => abs(x) < tol));
  return A.every((row, i) => row.every((x, j) => abs(add(x, scale(mulc(ratio, B[i][j]), -1))) < tol));
};
const isWeyl = (A) => {
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (projectivelyEqual(A, matMul(mpow(Xshift, i), mpow(Zphase, j)))) return true;
  return false;
};
for (const U of [S, T]) for (const W of [Xshift, Zphase]) assert(isWeyl(matMul(matMul(U, W), dagger(U))));

// Doubling gives a nine-dimensional two-qutrit configuration space, but the
// direct-sum quadratic phase factorizes and the mutual controlled phase does not.
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
  assert.deepEqual(powOmega(a * a + b * b), mulc(powOmega(a * a), powOmega(b * b)));
}
const coefficient = Array.from({ length: 3 }, (_, a) => Array.from({ length: 3 }, (_, b) => powOmega(a * b)));
// The coefficient matrix is the unnormalised Fourier matrix and has rank 3:
// its rows are mutually orthogonal. Hence the cross phase entangles |+>|+>.
for (let a = 0; a < 3; a++) for (let c = 0; c < 3; c++) {
  let inner = C();
  for (let b = 0; b < 3; b++) inner = add(inner, mulc(conj(coefficient[a][b]), coefficient[c][b]));
  assert(abs(add(inner, C(a === c ? -3 : 0))) < 1e-9);
}

// The canonical orthogonal automorphisms of q+(a,b)=a^2+b^2 are only signed
// permutations, so the direct-sum discriminant form supplies no hidden SUM.
const mod = (x) => ((x % 3) + 3) % 3;
const det = (A) => mod(A[0][0] * A[1][1] - A[0][1] * A[1][0]);
const qPlus = (v) => mod(v[0] ** 2 + v[1] ** 2);
const apply = (A, v) => [mod(A[0][0] * v[0] + A[0][1] * v[1]), mod(A[1][0] * v[0] + A[1][1] * v[1])];
const orthogonal = [];
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) for (let d = 0; d < 3; d++) {
  const A = [[a, b], [c, d]];
  if (det(A) === 0) continue;
  let ok = true;
  for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) if (qPlus(apply(A, [x, y])) !== qPlus([x, y])) ok = false;
  if (ok) orthogonal.push(A);
}
assert.equal(orthogonal.length, 8);
for (const A of orthogonal) {
  assert.equal(A[0].filter(Boolean).length, 1);
  assert.equal(A[1].filter(Boolean).length, 1);
}

// Same-sign doubling is anisotropic; opposite-sign doubling has a diagonal
// isotropic subgroup whose maximal gluing removes the discriminant entirely.
const nonzero = [];
const splitIsotropic = [];
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) if (a || b) {
  if (mod(a * a + b * b) === 0) nonzero.push([a, b]);
  if (mod(a * a - b * b) === 0) splitIsotropic.push([a, b]);
}
assert.deepEqual(nonzero, []);
assert.equal(splitIsotropic.length, 4);

console.log("A2 discriminant Weil-representation audit: PASS");
console.log("one_A2_discriminant_form_supplies_one_qutrit_and_one_finite_canonical_pair");
console.log("its_S_and_T_matrices_are_qutrit_Clifford_generators_up_to_global_phase");
console.log("same_sign_doubling_supplies_two_qutrits_but_only_factorized_quadratic_phases");
console.log("canonical_discriminant_automorphisms_are_signed_permutations_and_supply_no_SUM");
console.log("the_mutual_phase_has_Schmidt_rank_three_and_requires_a_genuine_cross_relationship");
console.log("opposite_sign_isotropic_gluing_exists_but_maximal_gluing_consumes_the_discriminant_sector");
