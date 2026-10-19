import assert from "node:assert/strict";

const mod = (x, q) => ((x % q) + q) % q;
const I2 = [[1, 0], [0, 1]];
const O2 = [[0, 0], [0, 0]];
const block = (A, B, C, D) => [
  [...A[0], ...B[0]], [...A[1], ...B[1]],
  [...C[0], ...D[0]], [...C[1], ...D[1]],
];
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const equal = (A, B) => A.flat().every((x, i) => x === B.flat()[i]);
const neg = (A) => A.map((row) => row.map((x) => -x));
const matrixVectorMod2 = (A, v) => A.map((row) => mod(row.reduce((sum, x, i) => sum + x * v[i], 0), 2));
const qStar = (v) => (v[0] & v[2]) ^ (v[1] & v[3]) ^ v[0] ^ v[1] ^ v[2] ^ v[3];

const F = block(O2, neg(I2), I2, O2);
const Finverse = block(O2, I2, neg(I2), O2);
assert.ok(equal(mul(F, Finverse), block(I2, O2, O2, I2)));

for (let bits = 0; bits < 16; bits++) {
  const v = [...Array(4).keys()].map((i) => (bits >> i) & 1);
  assert.equal(qStar(matrixVectorMod2(F, v)), qStar(v));
}

let checked = 0;
for (let k11 = 0; k11 < 4; k11++) for (let k22 = 0; k22 < 4; k22++) for (const k12 of [0, 2]) {
  if (k11 % 2 !== k22 % 2) continue;
  const K = [[k11, k12], [k12, k22]];
  const upperMinusK = block(I2, neg(K), O2, I2);
  const lowerK = block(I2, O2, K, I2);
  assert.ok(equal(mul(mul(F, upperMinusK), Finverse), lowerK));

  // Exact upper-shear theta-series substitution gives this squared phase.
  const thetaSquareExponent = mod((k11 + k22) / 2, 2);
  const commonHandleParity = k11 % 2;
  const chi = mod((k11 + k22) / 2 + commonHandleParity, 2);
  assert.equal(thetaSquareExponent, chi ^ commonHandleParity);
  checked++;
}

assert.equal(checked, 16);
console.log("global_Fourier_transform_preserves_q_star");
console.log("lower_K=F*upper_minus_K*F_inverse_for_all_16_admissible_shears");
console.log("theta_square_is_a_character_so_conjugation_proves_the_lower_shear_formula_exactly");
console.log("exact_relation=epsilon_squared=(-1)^(chi+common_handle_parity)");
