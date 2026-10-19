import assert from "node:assert/strict";

const mod = (x, q) => ((x % q) + q) % q;
const I4 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const mul = (A, B, q) => A.map((row) => B[0].map((_, j) =>
  mod(row.reduce((sum, x, k) => sum + x * B[k][j], 0), q)));
const key = (A) => A.flat().join(",");
const C = (t) => [[0, -1], [1, t]];
const embed = (A, h) => h === 0
  ? [[A[0][0], 0, A[0][1], 0], [0, 1, 0, 0], [A[1][0], 0, A[1][1], 0], [0, 0, 0, 1]]
  : [[1, 0, 0, 0], [0, A[0][0], 0, A[0][1]], [0, 0, 1, 0], [0, A[1][0], 0, A[1][1]]];
const U = [[1, 0, 0, 0], [0, 1, 0, 0], [3, 2, 1, 0], [2, 3, 0, 1]];

function lieMatrix(v) {
  const [a11, a12, a21, a22, b11, b12, b22, c11, c12, c22] = v;
  return [
    [a11, a12, b11, b12],
    [a21, a22, b12, b22],
    [c11, c12, a11, a21],
    [c12, c22, a12, a22],
  ];
}

const ellVector = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1];
const ell = (v) => v.reduce((sum, x, i) => sum ^ (x & ellVector[i]), 0);

function enumerate(generators, q) {
  const identity = I4.map((row) => row.slice());
  const seen = new Map([[key(identity), identity]]);
  const queue = [identity];
  for (let head = 0; head < queue.length; head++) {
    for (const generator of generators) {
      const next = mul(generator, queue[head], q);
      if (!seen.has(key(next))) {
        seen.set(key(next), next);
        queue.push(next);
      }
    }
  }
  return seen;
}

function enumerateWithCharacter(labelledGenerators, q) {
  const identity = I4.map((row) => row.slice());
  const seen = new Map([[key(identity), { matrix: identity, character: 0 }]]);
  const queue = [identity];
  for (let head = 0; head < queue.length; head++) {
    const current = seen.get(key(queue[head]));
    for (const { matrix: generator, character } of labelledGenerators) {
      const next = mul(generator, current.matrix, q);
      const nextCharacter = current.character ^ character;
      const nextKey = key(next);
      if (!seen.has(nextKey)) {
        seen.set(nextKey, { matrix: next, character: nextCharacter });
        queue.push(next);
      } else {
        assert.equal(seen.get(nextKey).character, nextCharacter, "character assignment must respect every relation");
      }
    }
  }
  return seen;
}

const equalGenerators = [embed(C(3), 0), embed(C(3), 1), U].map((M) => M.map((row) => row.map((x) => mod(x, 4))));
const equalGroup = enumerate(equalGenerators, 4);
assert.equal(equalGroup.size, 9216);
const forbiddenPrincipalShear = [[1, 0, 0, 0], [0, 1, 0, 0], [2, 0, 1, 0], [0, 0, 0, 1]];

const kernelBasis = [...Array(10).keys()].map((i) => {
  const coordinates = [...Array(10).keys()].map((j) => Number(i === j));
  const X = lieMatrix(coordinates);
  const matrix = I4.map((row, r) => row.map((x, c) => mod(x + 2 * X[r][c], 4)));
  return { matrix, character: ell(coordinates) };
});

const preimage = enumerateWithCharacter([
  ...equalGenerators.map((matrix) => ({ matrix, character: 0 })),
  ...kernelBasis,
], 4);
assert.equal(preimage.size, 18432);

const minimalPreimageGenerators = enumerate([...equalGenerators, forbiddenPrincipalShear], 4);
assert.equal(minimalPreimageGenerators.size, 18432);
for (const matrixKey of preimage.keys()) assert.ok(minimalPreimageGenerators.has(matrixKey));

const characterKernel = new Set([...preimage.entries()].filter(([, value]) => value.character === 0).map(([matrixKey]) => matrixKey));
assert.equal(characterKernel.size, 9216);
assert.equal(characterKernel.size, equalGroup.size);
for (const matrixKey of equalGroup.keys()) assert.ok(characterKernel.has(matrixKey));

const reductionKeys = new Set([...preimage.values()].map(({ matrix }) => key(matrix.map((row) => row.map((x) => x % 2)))));
assert.equal(reductionKeys.size, 18);

// Closed formula on every symmetric lower shear in this preimage.  Its mod-2
// diagonal must be (k,k), while its off-diagonal entry must be even.
const shearChecks = [];
for (let k11 = 0; k11 < 4; k11++) for (let k22 = 0; k22 < 4; k22++) for (const k12 of [0, 2]) {
  if (k11 % 2 !== k22 % 2) continue;
  const K = [[k11, k12], [k12, k22]];
  const shear = [[1, 0, 0, 0], [0, 1, 0, 0], [k11, k12, 1, 0], [k12, k22, 0, 1]];
  const entry = preimage.get(key(shear));
  assert.ok(entry);
  const commonParity = k11 % 2;
  const formula = mod((k11 + k22) / 2 + commonParity, 2);
  assert.equal(entry.character, formula);
  shearChecks.push({ K, character: entry.character });
}
assert.equal(shearChecks.length, 16);

console.log(`matched_binary_preimage_order=${preimage.size}`);
console.log(`equal_discriminant_five_mod4_order=${equalGroup.size}`);
console.log("equal_discriminant_five_group=kernel_of_the_unique_Z2_quotient_character_with_that_kernel");
console.log("character_restricts_to_ell_on_principal_mod2_kernel");
console.log("symmetric_lower_shear_formula=chi(S_K)=trace(K)/2+common_diagonal_parity_mod_2");
console.log("verified_symmetric_lower_shears=" + shearChecks.length);
console.log("full_preimage_generated_by_two_trace_three_companions_positive_mutual_shear_and_one_forbidden_principal_shear");
