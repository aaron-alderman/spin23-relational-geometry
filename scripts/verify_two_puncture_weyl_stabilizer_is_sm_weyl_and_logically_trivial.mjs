import assert from "node:assert/strict";

const permutations = (items) => items.length === 1 ? [items]
  : items.flatMap((item, i) => permutations(items.filter((_, j) => j !== i)).map((tail) => [item, ...tail]));
const perms = permutations([0, 1, 2, 3, 4]);
const act = (permutation, vector) => permutation.map((i) => vector[i]);
const equal = (a, b) => a.every((x, i) => x === b[i]);
const qN = [1, 1, 1, 1, 1];
const qE = [1, 1, 1, -1, -1];

const stabilizer = perms.filter((permutation) => equal(act(permutation, qN), qN) && equal(act(permutation, qE), qE));
assert.equal(stabilizer.length, 12);
for (const permutation of stabilizer) {
  assert.deepEqual(new Set(permutation.slice(0, 3)), new Set([0, 1, 2]));
  assert.deepEqual(new Set(permutation.slice(3, 5)), new Set([3, 4]));
}

const mod = (x, p) => ((x % p) + p) % p;
const dot = (a, b, p) => mod(a.reduce((sum, x, i) => sum + x * b[i], 0), p);
const vectors = (p) => {
  const result = [];
  for (let a = 0; a < p; a += 1) for (let b = 0; b < p; b += 1) for (let c = 0; c < p; c += 1)
    for (let d = 0; d < p; d += 1) for (let e = 0; e < p; e += 1) result.push([a,b,c,d,e]);
  return result;
};

for (const p of [3, 5]) {
  // Evaluation on the two removed columns identifies W/A with F_p^2.
  const image = new Set(vectors(p).map((t) => `${dot(qN, t, p)},${dot(qE, t, p)}`));
  assert.equal(image.size, p ** 2);
  for (const permutation of stabilizer) for (const t of vectors(p)) {
    const before = [dot(qN, t, p), dot(qE, t, p)];
    const after = [dot(qN, act(permutation, t), p), dot(qE, act(permutation, t), p)];
    assert.deepEqual(after, before);
  }
}

// At p=2 the raw sign rows collapse; the qubit code requires the separate sign-bit construction.
const binaryImage = new Set(vectors(2).map((t) => `${dot(qN, t, 2)},${dot(qE, t, 2)}`));
assert.equal(binaryImage.size, 2);

console.log("Two-puncture Weyl stabilizer and logical action: PASS");
console.log("punctures=nu_c_all_plus_and_e_c_minus_45");
console.log("pointwise_Weyl_stabilizer=S3_x_S2_order_12");
console.log("stabilizer_preserves_the_3_plus_2_standard_model_flag");
console.log("odd_prime_logical_X_quotient=F_p_squared");
console.log("induced_pointwise_stabilizer_action_on_logical_X=identity");
console.log("full_Sp4_Fp_requires_non_Weyl_encoded_Clifford_operations");
