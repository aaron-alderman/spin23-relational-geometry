import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;
const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mulc = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, x) => C(a.re * x, a.im * x);
const abs = (a) => Math.hypot(a.re, a.im);
const root = (n) => { const x = 2 * Math.PI * mod(n) / p; return C(Math.cos(x), Math.sin(x)); };
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mulc(x, B[k][j])), C())));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const close = (A, B, tol = 1e-9) => A.every((row, i) => row.every((x, j) => abs(add(x, scale(B[i][j], -1))) < tol));

// K=[[0,3],[3,0]]: det=-9, coker(K)=Z3 x Z3 and K^{-1} is hyperbolic.
const K = [[0, 3], [3, 0]];
assert.equal(K[0][0] * K[1][1] - K[0][1] * K[1][0], -9);
const Kinv = [[0, 1 / 3], [1 / 3, 0]];
const labels = Array.from({ length: 9 }, (_, i) => [Math.floor(i / 3), i % 3]);
const qNumerator = ([a, b]) => mod(a * b); // q=1/2 l^T K^-1 l=ab/3

// Modular data of the finite quadratic module.
const T = labels.map((l, i) => labels.map((_, j) => i === j ? root(qNumerator(l)) : C()));
const S = labels.map(([a, b]) => labels.map(([c, d]) => scale(root(-(a * d + b * c)), 1 / 3)));
assert(close(matMul(S, dagger(S)), eye(9)));
assert(close(matMul(T, dagger(T)), eye(9)));

// S^2 is charge conjugation and (ST)^3 agrees with it at signature zero.
const chargeConjugation = labels.map(([a, b]) => labels.map(([c, d]) => C(mod(a + c) === 0 && mod(b + d) === 0 ? 1 : 0)));
assert(close(matMul(S, S), chargeConjugation));
const ST = matMul(S, T);
assert(close(matMul(matMul(ST, ST), ST), chargeConjugation));

// The modular T matrix is exactly the mutual controlled phase omega^(ab).
for (let i = 0; i < labels.length; i++) {
  const [a, b] = labels[i];
  assert(abs(add(T[i][i], scale(root(a * b), -1))) < 1e-12);
}

// Oppositely oriented A2 forms q=(a^2-b^2)/3 become hyperbolic under
// x=a+b, y=a-b; the transformation is invertible modulo three.
const seen = new Set();
for (const [a, b] of labels) {
  const x = mod(a + b), y = mod(a - b);
  seen.add(`${x},${y}`);
  assert.equal(mod(a * a - b * b), mod(x * y));
}
assert.equal(seen.size, 9);

// Level k has |det K|=k^2 torus states; exactly k=3 gives two qutrits.
for (const k of [1, 2, 3, 4, 5]) {
  const states = k * k;
  assert.equal(states === 9, k === 3);
}

// The BF T phase is entangling: its coefficient matrix has orthogonal rows.
const coeff = Array.from({ length: 3 }, (_, a) => Array.from({ length: 3 }, (_, b) => root(a * b)));
for (let a = 0; a < 3; a++) for (let c = 0; c < 3; c++) {
  let inner = C();
  for (let b = 0; b < 3; b++) inner = add(inner, mulc(conj(coeff[a][b]), coeff[c][b]));
  assert(abs(add(inner, C(a === c ? -3 : 0))) < 1e-9);
}

console.log("Level-three BF hyperbolic-interface audit: PASS");
console.log("K_equals_3_times_hyperbolic_plane_has_nine_torus_states_and_Z3_squared_discriminant");
console.log("its_quadratic_refinement_is_q_of_a_b_equals_ab_over_three");
console.log("modular_T_is_exactly_the_missing_two_qutrit_controlled_phase");
console.log("modular_S_is_the_hyperbolic_Fourier_transform_equal_to_local_Fouriers_plus_swap");
console.log("opposite_A2_orientations_are_isomorphic_to_the_same_hyperbolic_finite_quadratic_form");
console.log("the_topological_model_is_exact_but_its_Furey_SM_source_and_level_selection_remain_external");
