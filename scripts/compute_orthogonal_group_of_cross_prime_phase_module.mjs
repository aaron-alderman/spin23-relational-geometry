import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const K = [[3, 2], [2, 3]];
const Q = (a, b) => K[0][0] * a * a + 2 * K[0][1] * a * b + K[1][1] * b * b;
const exponent12 = ([a, b]) => mod(
  3 * mod(Q(mod(a, 2), mod(b, 2)), 4)
  + 4 * mod(2 * Q(mod(a, 3), mod(b, 3)), 3),
  12,
);
const elements = Array.from({ length: 36 }, (_, n) => [Math.floor(n / 6), n % 6]);
const apply = (M, x, n = 6) => [
  mod(M[0][0] * x[0] + M[0][1] * x[1], n),
  mod(M[1][0] * x[0] + M[1][1] * x[1], n),
];
const mul = (A, B, n = 6) => A.map((row) => B[0].map((_, j) => mod(row[0] * B[0][j] + row[1] * B[1][j], n)));
const key = (M) => M.flat().join("");
const I = [[1, 0], [0, 1]];

const orthogonal = [];
for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) for (let c = 0; c < 6; c++) for (let d = 0; d < 6; d++) {
  const M = [[a, b], [c, d]];
  if (gcd(a * d - b * c, 6) !== 1) continue;
  if (elements.every((x) => exponent12(apply(M, x)) === exponent12(x))) orthogonal.push(M);
}
assert.equal(orthogonal.length, 8);
const keys = new Set(orthogonal.map(key));
for (const A of orthogonal) for (const B of orthogonal) assert.ok(keys.has(key(mul(A, B))));
for (const A of orthogonal) assert.deepEqual(mul(A, A), I);
for (const A of orthogonal) for (const B of orthogonal) assert.deepEqual(mul(A, B), mul(B, A));

const binarySwap = [[4, 3], [3, 4]]; // swap mod 2, identity mod 3
const qutritMinusI = [[5, 0], [0, 5]]; // identity mod 2, -I mod 3
const qutritSwap = [[3, 4], [4, 3]]; // identity mod 2, swap mod 3
for (const g of [binarySwap, qutritMinusI, qutritSwap]) assert.ok(keys.has(key(g)));
const generated = new Set();
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) {
  let M = I;
  if (i) M = mul(binarySwap, M);
  if (j) M = mul(qutritMinusI, M);
  if (k) M = mul(qutritSwap, M);
  generated.add(key(M));
}
assert.equal(generated.size, 8);
for (const k of generated) assert.ok(keys.has(k));

console.log("orthogonal_group_of_cross_prime_phase_module: PASS");
console.log("O(A,q)_order=8,isomorphic_to_C2_cubed");
console.log("primary_factors=O(q2)_order_2_times_Oplus_2_3_order_4");
console.log("generators_mod6=binary_swap_[[4,3],[3,4]];qutrit_minusI_5I;qutrit_swap_[[3,4],[4,3]]");
console.log("all_nonidentity_elements_have_order_two_and_all_elements_commute");
console.log("matched_binary_handle_group_order18_cannot_embed_and_its_order9_subgroup_is_invisible_to_this_phase_automorphism_group");
console.log("Sp4_F3_acts_on_four_dimensional_Heisenberg_exponents_not_as_O_q3_on_two_dimensional_state_labels");

