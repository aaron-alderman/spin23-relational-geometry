import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;
const K = [[3, 2], [2, 3]];
const qK = (a, b) => K[0][0] * a * a + 2 * K[0][1] * a * b + K[1][1] * b * b;
const qWord = (a, b) => 2 * (a + b) ** 2 + a * a + b * b;

assert.equal(qWord(2, -1), qK(2, -1));

// Qubit Clifford quadratic refinement: U_K|a,b> = i^{x^T K x}|a,b>.
const binary = [];
for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) {
  const total = mod(qWord(a, b), 4);
  const native = mod(3 * a + 3 * b, 4);
  const sumAxisSquare = mod(2 * (a + b) ** 2, 4);
  const pauliZ1Z2 = mod(2 * mod(a + b, 2), 4);
  assert.equal(total, native);
  assert.equal(sumAxisSquare, pauliZ1Z2);
  binary.push({ a, b, exponentMod4: total });
}
const f2 = (a, b) => mod(qWord(a, b), 4);
assert.equal(mod(f2(1, 1) - f2(1, 0) - f2(0, 1) + f2(0, 0), 4), 0);

// Odd-prime Weil convention: U_K|x> = omega^{(1/2)x^T K x}|x>.
const inv2mod3 = 2;
const qutrit = [];
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
  const total = mod(inv2mod3 * qWord(a, b), 3);
  const mutual = mod(2 * a * b, 3);
  assert.equal(total, mutual);
  qutrit.push({ a, b, exponentMod3: total });
}

// Characteristic transport for upper shears, m_*=(a;b)=(11;11).
const characteristicAfterUpperShear = (B, a = [1, 1], b = [1, 1]) => {
  const Ba = B.map((row) => mod(row[0] * a[0] + row[1] * a[1], 2));
  return {
    a: [...a],
    b: b.map((x, i) => mod(x - Ba[i] + B[i][i], 2)),
  };
};
const E11 = [[1, 0], [0, 0]];
const E22 = [[0, 0], [0, 1]];
const Ones = [[1, 1], [1, 1]];
const TwoOnes = [[2, 2], [2, 2]];
assert.deepEqual(characteristicAfterUpperShear(E11), { a: [1, 1], b: [1, 1] });
assert.deepEqual(characteristicAfterUpperShear(E22), { a: [1, 1], b: [1, 1] });
assert.deepEqual(characteristicAfterUpperShear(Ones), { a: [1, 1], b: [0, 0] });
assert.deepEqual(characteristicAfterUpperShear(Ones, [1, 1], [0, 0]), { a: [1, 1], b: [1, 1] });
assert.deepEqual(characteristicAfterUpperShear(TwoOnes), { a: [1, 1], b: [1, 1] });

// Exact upper-theta exponent: epsilon(T_B)=exp(pi*i*(a^T B a)/4).
const thetaExponentMod8 = (B) => mod(B[0][0] + 2 * B[0][1] + B[1][1], 8);
assert.equal(thetaExponentMod8(TwoOnes), 0);
assert.equal(thetaExponentMod8(E11), 1);
assert.equal(thetaExponentMod8(E22), 1);
assert.equal(thetaExponentMod8(K), 2); // +i for Fourier-dual upper shear.
assert.equal(mod(thetaExponentMod8(TwoOnes) + thetaExponentMod8(E11) + thetaExponentMod8(E22), 8), 2);
const lowerThetaExponentMod8 = mod(-thetaExponentMod8(K), 8);
assert.equal(lowerThetaExponentMod8, 6); // -i in the fixed Fourier normalization.

console.log("projective_integral_Kplus_word_phase: PASS");
console.log("binary_phase_exponents_mod4=" + binary.map(({ exponentMod4 }) => exponentMod4).join(","));
console.log("binary_word_equals_Sdagger_tensor_Sdagger_and_has_zero_mixed_difference");
console.log("binary_sum_axis_square_is_projectively_Z1Z2_but_symplectically_identity");
console.log("qutrit_phase_is_omega_to_2ab_for_all_nine_basis_states");
console.log("single_sum_axis_twist_leaves_selected_theta_line_but_its_square_returns");
console.log("upper_theta_multiplier=+i,code_oriented_lower_theta_multiplier=-i,squared_multiplier=-1");
console.log("raw_theta_phase_is_normalization_sensitive_and_is_not_identified_with_an_observable_code_global_phase");

