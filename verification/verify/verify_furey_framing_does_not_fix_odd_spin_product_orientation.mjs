import assert from "node:assert/strict";

const mod = (x, q) => ((x % q) + q) % q;
const matrixVector = (A, v) => A.map((row) => mod(row.reduce((sum, x, i) => sum + x * v[i], 0), 2));
const nonzero = [[1, 0], [0, 1], [1, 1]];

function permutationParity(A) {
  const permutation = nonzero.map((v) => {
    const image = matrixVector(A, v);
    return nonzero.findIndex((w) => w[0] === image[0] && w[1] === image[1]);
  });
  let inversions = 0;
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) inversions += permutation[i] > permutation[j] ? 1 : 0;
  return inversions % 2;
}

const localShear = (k) => [[1, 0], [k, 1]];
const cases = [];
for (const k1 of [0, 1]) for (const k2 of [0, 1]) {
  const parity1 = permutationParity(localShear(k1));
  const parity2 = permutationParity(localShear(k2));
  assert.equal(parity1, k1);
  assert.equal(parity2, k2);
  cases.push({ k1, k2, parity1, parity2, productOrientationPreserved: (parity1 ^ parity2) === 0 });
}

assert.deepEqual(cases.filter((entry) => entry.productOrientationPreserved).map(({ k1, k2 }) => [k1, k2]), [[0, 0], [1, 1]]);
assert.deepEqual(cases.filter((entry) => !entry.productOrientationPreserved).map(({ k1, k2 }) => [k1, k2]), [[0, 1], [1, 0]]);

// The previously proved Furey longitude ambiguity contains every diagonal
// K=diag(k1,k2), so it includes both orientation-preserving and reversing
// choices.  Matched parity is the additional condition tr(K)=0 mod 2.
console.log("diagonal_framings_mod2=" + JSON.stringify(cases));
console.log("product_orientation_condition=k1+k2=trace(K)=0_mod_2");
console.log("existing_Furey_Sym2Z_framing_contains_both_signs_so_does_not_select_matched_parity");
