import assert from "node:assert/strict";

const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const det = (A) => {
  if (A.length === 1) return A[0][0];
  return A[0].reduce((s, x, j) => s + (j % 2 ? -1 : 1) * x * det(A.slice(1).map((r) => r.filter((_, k) => k !== j))), 0);
};

// N = U + U + <-2>, the standard signature-(2,3) orthogonal lattice.
const N = [
  [0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, -2],
];
// Columns: v=e1+f1, w=e1-f1, r, e2, -3f2.
const B = [
  [1, 1, 0, 0, 0],
  [1, -1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, -3],
  [0, 0, 1, 0, 0],
];
const induced = mul(transpose(B), mul(N, B));
const target = [
  [2, 0, 0, 0, 0],
  [0, -2, 0, 0, 0],
  [0, 0, -2, 0, 0],
  [0, 0, 0, 0, -3],
  [0, 0, 0, -3, 0],
];
assert.deepEqual(induced, target);
assert.equal(det(N), -2);
assert.equal(det(B), 6);
assert.equal(det(target), det(N) * det(B) ** 2);
assert.equal(det(target), -72);

// Selector complement inside M is exactly the previously found L.
const L = target.slice(1).map((row) => row.slice(1));
assert.deepEqual(L, [
  [-2, 0, 0, 0],
  [0, -2, 0, 0],
  [0, 0, 0, -3],
  [0, 0, -3, 0],
]);
assert.equal(det(L), -36);

// The primitive complement v^perp in N is <-2> + <-2> + U;
// L has index 3 there, while the v,w splitting contributes index 2.
const primitiveComplement = [
  [-2, 0, 0, 0],
  [0, -2, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
];
assert.equal(det(primitiveComplement), -4);
assert.equal(Math.abs(det(L) / det(primitiveComplement)), 9);

console.log("cross_prime_lattice_embedding_in_standard_spin23_lattice: PASS");
console.log("N=U+U+<-2>,determinant=-2,signature=(2,3)");
console.log("M=<2>+<-2>+<-2>+U(-3),determinant=-72,signature=(2,3)");
console.log("M_is_index_6_in_N_with_basis_v=e1+f1,w=e1-f1,r,e2,-3f2");
console.log("index_factorization=2_from_selector_split_times_3_from_qutrit_null_leg");
console.log("selector_v_has_norm_2_and_complement_in_M_is_L=<-2>+<-2>+U(-3)");
console.log("L_is_index_3_in_the_primitive_selector_complement_<-2>+<-2>+U");
console.log("real_spin_group=Spin(2,3)_isomorphic_to_Sp4_R;integral_subgroup_identification_requires_separate_arithmetic_proof");

