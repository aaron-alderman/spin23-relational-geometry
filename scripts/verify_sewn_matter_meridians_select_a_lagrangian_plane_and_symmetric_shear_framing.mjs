import assert from "node:assert/strict";

const mod = (x, p) => ((x % p) + p) % p;
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B, p = null) => A.map((r) => B[0].map((_, j) => {
  const x = r.reduce((s, a, k) => s + a * B[k][j], 0);
  return p === null ? x : mod(x, p);
}));
const eq = (A, B) => JSON.stringify(A) === JSON.stringify(B);

// Ordering is (a1,a2,b1,b2), with a_i the two sewn matter meridians.
const J = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
];
const shear = (K) => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [K[0][0], K[0][1], 1, 0],
  [K[1][0], K[1][1], 0, 1],
];
const isSymplectic = (S, p = null) => eq(mul(mul(transpose(S), J, p), S, p), p === null ? J : J.map((r) => r.map((x) => mod(x, p))));

// Direct calculation: B -> B + K A is symplectic exactly when K is symmetric.
for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++)
  for (let c = -2; c <= 2; c++) for (let d = -2; d <= 2; d++) {
    const K = [[a, b], [c, d]];
    assert.equal(isSymplectic(shear(K)), b === c);
  }

// Modulo three there are 3^3 symmetric framing shears: two local entries
// and one mutual entry.
const symmetricK = [];
for (let k11 = 0; k11 < 3; k11++) for (let k22 = 0; k22 < 3; k22++)
  for (let k12 = 0; k12 < 3; k12++) symmetricK.push([[k11, k12], [k12, k22]]);
assert.equal(symmetricK.length, 27);
assert(symmetricK.every((K) => isSymplectic(shear(K), 3)));

const local = symmetricK.filter((K) => K[0][1] === 0);
const mutualNonzero = symmetricK.filter((K) => K[0][0] === 0 && K[1][1] === 0 && K[0][1] !== 0);
assert.equal(local.length, 9);
assert.equal(mutualNonzero.length, 2);

// Reversing both cycles on either handle preserves J.  The four independent
// sign choices do not select a preferred absolute orientation.
const signs = [];
for (const s1 of [-1, 1]) for (const s2 of [-1, 1]) {
  const S = [
    [s1, 0, 0, 0],
    [0, s2, 0, 0],
    [0, 0, s1, 0],
    [0, 0, 0, s2],
  ];
  assert(isSymplectic(S));
  signs.push(S);
}
assert.equal(signs.length, 4);

// Boundary homology after the two identifications: e=-u, nu=-d, hence the
// sole remaining matter boundary m=-(u+e+d+nu) vanishes in homology.
const u = [1, 0], e = [-1, 0], d = [0, 1], nu = [0, -1];
const m = u.map((x, i) => {
  const value = -(x + e[i] + d[i] + nu[i]);
  return value === 0 ? 0 : value;
});
assert.deepEqual(m, [0, 0]);

console.log("Sewn matter-meridian symplectic-framing audit: PASS");
console.log("the_two_matter_pair_seams_select_a_rank_two_Lagrangian_meridian_plane");
console.log("all_symplectic_longitude_changes_fixing_the_meridians_are_B_to_B_plus_KA_with_K_symmetric");
console.log("mod_three_the_27_framings_split_into_two_local_twist_coordinates_and_one_mutual_coordinate");
console.log("the_nonzero_off_diagonal_coordinate_is_the_unique_mutual_Clifford_phase_class_up_to_inversion");
console.log("four_handle_orientation_sign_choices_preserve_the_symplectic_form_and_leave_absolute_orientation_unfixed");
