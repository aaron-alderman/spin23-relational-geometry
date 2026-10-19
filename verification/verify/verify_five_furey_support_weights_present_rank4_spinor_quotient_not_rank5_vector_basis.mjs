import assert from "node:assert/strict";

const fields = ["u^c_1", "d_1", "e", "nu", "d^c_1"];
const W = [
  [1, -1, -1, 1, 1],
  [-1, 1, 1, -1, 1],
  [-1, -1, -1, -1, 1],
  [-1, -1, -1, 1, -1],
  [1, -1, -1, -1, -1],
];
const det = (A) => A.length === 0 ? 1 : A.length === 1 ? A[0][0] : A[0].reduce((s, x, j) => s + (j % 2 ? -1 : 1) * x * det(A.slice(1).map((r) => r.filter((_, k) => k !== j))), 0);
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const combinations = (n, k, start = 0, prefix = [], out = []) => {
  if (prefix.length === k) {
    out.push(prefix);
    return out;
  }
  for (let i = start; i < n; i++) combinations(n, k, i + 1, [...prefix, i], out);
  return out;
};
const determinantalDivisors = [];
for (let k = 1; k <= 5; k++) {
  let g = 0;
  for (const rows of combinations(5, k)) for (const cols of combinations(5, k)) {
    const minor = rows.map((i) => cols.map((j) => W[i][j]));
    g = gcd(g, Math.abs(det(minor)));
  }
  determinantalDivisors.push(g);
}
assert.deepEqual(determinantalDivisors, [1, 2, 4, 8, 0]);
const smithNonzero = [
  determinantalDivisors[0],
  determinantalDivisors[1] / determinantalDivisors[0],
  determinantalDivisors[2] / determinantalDivisors[1],
  determinantalDivisors[3] / determinantalDivisors[2],
];
assert.deepEqual(smithNonzero, [1, 2, 2, 2]);

const relation = [1, 2, -1, 1, 1];
for (let j = 0; j < 5; j++) assert.equal(relation.reduce((s, c, i) => s + c * W[i][j], 0), 0);
assert.equal(relation.reduce(gcd), 1);

const zD = [1, 1, -1, 0, 0];
const zC = [0, 1, -1, 0, 1];
const zSum = [0, 0, -1, -1, 0];
assert.deepEqual(zD.map((x, i) => x + zC[i] - zSum[i]), relation);

const gram = W.map((a) => W.map((b) => a.reduce((s, x, i) => s + x * b[i], 0)));
assert.deepEqual(gram, [
  [5, -3, 1, 1, 1],
  [-3, 5, 1, -3, -3],
  [1, 1, 5, 1, 1],
  [1, -3, 1, 5, 1],
  [1, -3, 1, 1, 5],
]);
assert.equal(det(gram), 0);
for (let i = 0; i < 5; i++) assert.equal(relation.reduce((s, c, j) => s + c * gram[j][i], 0), 0);

const targetM = [
  [2, 0, 0, 0, 0],
  [0, -2, 0, 0, 0],
  [0, 0, -2, 0, 0],
  [0, 0, 0, 0, -3],
  [0, 0, 0, -3, 0],
];
assert.equal(det(targetM), -72);

console.log("five_Furey_support_weights_rank4_quotient: PASS");
console.log("fields=" + fields.join(","));
console.log("unique_primitive_relation=uc1_plus_2d1_minus_e_plus_nu_plus_dc1_equals_zero");
console.log("transvection_representatives_obey_zD_plus_zC_minus_zSum_equals_the_same_relation");
console.log("weight_matrix_rank=4,determinantal_divisors=1,2,4,8,0,Smith_nonzero=1,2,2,2");
console.log("charge_image_has_index_8_in_its_saturation_with_three_binary_elementary_divisors");
console.log("compact_weight_Gram_is_positive_semidefinite_rank4_and_cannot_equal_signature_2_3_target_M");
console.log("natural_candidate_is_Z5_mod_relation_isomorphic_to_Z4_symplectic_spinor_not_five_independent_vector_basis");
console.log("a_source_derived_unimodular_alternating_form_on_the_rank4_quotient_remains_required");

