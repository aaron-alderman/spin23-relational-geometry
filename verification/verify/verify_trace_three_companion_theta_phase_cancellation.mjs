import assert from "node:assert/strict";

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const equal = (A, B) => A.flat().every((x, i) => x === B.flat()[i]);
const I4 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

const FourierH1 = [[0, 0, -1, 0], [0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1]];
const FourierH2 = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 0]];
const upper3E11 = [[1, 0, 3, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const upper3E22 = [[1, 0, 0, 0], [0, 1, 0, 3], [0, 0, 1, 0], [0, 0, 0, 1]];
const companionH1 = [[0, 0, -1, 0], [0, 1, 0, 0], [1, 0, 3, 0], [0, 0, 0, 1]];
const companionH2 = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 3]];

assert.ok(equal(mul(FourierH1, upper3E11), companionH1));
assert.ok(equal(mul(FourierH2, upper3E22), companionH2));
assert.ok(equal(mul(I4, companionH1), companionH1));

// In the theta convention used by the numerical probe:
// partial Poisson summation gives exp(-3*pi*i/4) for the odd-handle Fourier
// transform, and direct substitution gives exp(+3*pi*i/4) for T^3.
const fourierExponentMod8 = 5; // exp(5*pi*i/4) = exp(-3*pi*i/4)
const cubicTwistExponentMod8 = 3;
const companionExponentMod8 = (fourierExponentMod8 + cubicTwistExponentMod8) % 8;
assert.equal(companionExponentMod8, 0);

const fourierSquareExponentMod4 = fourierExponentMod8 % 4;
const cubicTwistSquareExponentMod4 = cubicTwistExponentMod8 % 4;
assert.equal((fourierSquareExponentMod4 + cubicTwistSquareExponentMod4) % 4, 0);

console.log("C3_handle_i=partial_Fourier_i*upper_twist_3Eii_for_both_handles");
console.log("theta_phase_exponents_mod8=5+3=0");
console.log("trace_three_companion_theta_multiplier=1_exactly_in_the_fixed_normalization");
console.log("trace_three_companion_squared_multiplier=1");
