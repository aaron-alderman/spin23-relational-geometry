import assert from "node:assert/strict";

const candidates = [];
for (let a = 1; a <= 30; a++) for (let c = a; c <= 30; c++) for (let b = -a; b <= a; b++) {
  if (4 * a * c - b * b === 3) candidates.push({ a, b, c, gram: [[2 * a, b], [b, 2 * c]] });
}
assert.deepEqual(candidates, [
  { a: 1, b: -1, c: 1, gram: [[2, -1], [-1, 2]] },
  { a: 1, b: 1, c: 1, gram: [[2, 1], [1, 2]] },
]);

// The two reduced representatives are integrally equivalent by reversing one basis vector.
const A2 = [[2, -1], [-1, 2]];
const D = [[1, 0], [0, -1]];
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
assert.deepEqual(mul(mul(transpose(D), A2), D), [[2, 1], [1, 2]]);

// A2 has determinant three and exactly six roots of norm two.
assert.equal(A2[0][0] * A2[1][1] - A2[0][1] ** 2, 3);
const norm = ([x, y], G) => x * (G[0][0] * x + G[0][1] * y) + y * (G[1][0] * x + G[1][1] * y);
const roots = [];
for (let x = -4; x <= 4; x++) for (let y = -4; y <= 4; y++) if (norm([x, y], A2) === 2) roots.push([x, y]);
assert.equal(roots.length, 6);

// If evenness is dropped, determinant-three alternatives exist and cannot be
// integrally equivalent to A2 because they contain odd-norm vectors.
const oddAlternative = [[1, 0], [0, 3]];
assert.equal(oddAlternative[0][0] * oddAlternative[1][1], 3);
assert.equal(norm([1, 0], oddAlternative), 1);
for (const [x, y] of roots) assert.equal(norm([x, y], A2) % 2, 0);

console.log("Rank-two discriminant-three lattice classification: PASS");
console.log("the_only_Gauss_reduced_even_positive_forms_are_the_two_signs_of_A2");
console.log("those_signs_are_GL2Z_equivalent_by_basis_reversal");
console.log("A2_has_determinant_three_and_six_primitive_norm_two_roots");
console.log("evenness_is_essential_because_odd_integral_determinant_three_forms_also_exist");
