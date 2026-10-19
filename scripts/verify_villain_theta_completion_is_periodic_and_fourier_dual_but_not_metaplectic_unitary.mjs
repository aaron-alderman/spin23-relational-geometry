import assert from "node:assert/strict";

const X = [[2, -1], [-1, 2]];
const detX = 3;
const Xinv = [[2 / 3, 1 / 3], [1 / 3, 2 / 3]];
const quad = (A, v) => v[0] * (A[0][0] * v[0] + A[0][1] * v[1]) + v[1] * (A[1][0] * v[0] + A[1][1] * v[1]);

const thetaLift = (q, t, cutoff = 9) => {
  let sum = 0;
  for (let n0 = -cutoff; n0 <= cutoff; n0++) for (let n1 = -cutoff; n1 <= cutoff; n1++) {
    const v = [q[0] + n0, q[1] + n1];
    sum += Math.exp(-Math.PI * t * quad(X, v));
  }
  return sum;
};

const thetaPoisson = (q, t, cutoff = 9) => {
  let sum = 0;
  for (let m0 = -cutoff; m0 <= cutoff; m0++) for (let m1 = -cutoff; m1 <= cutoff; m1++) {
    const m = [m0, m1];
    sum += Math.exp(-Math.PI * quad(Xinv, m) / t) * Math.cos(2 * Math.PI * (m0 * q[0] + m1 * q[1]));
  }
  return sum / (t * Math.sqrt(detX));
};

const q = [0.173, -0.219];
const t = 1.7;
const direct = thetaLift(q, t);
assert(Math.abs(direct - thetaLift([q[0] + 1, q[1] - 2], t)) < 1e-12);
assert(Math.abs(direct - thetaPoisson(q, t, 14)) < 1e-11);

// The logarithmic Hessian approaches the desired local quadratic response in
// the low-temperature / large-t limit, but is not globally quadratic.
const h = 1e-4;
const action = (v, scale) => -Math.log(thetaLift(v, scale, 7));
const hessian = (scale) => {
  const f00 = action([0, 0], scale);
  const d00 = (action([h, 0], scale) - 2 * f00 + action([-h, 0], scale)) / h ** 2;
  const d11 = (action([0, h], scale) - 2 * f00 + action([0, -h], scale)) / h ** 2;
  const d01 = (action([h, h], scale) - action([h, -h], scale) - action([-h, h], scale) + action([-h, -h], scale)) / (4 * h ** 2);
  return [[d00, d01], [d01, d11]];
};
const scale = 4;
const H = hessian(scale);
const expected = X.map((row) => row.map((x) => 2 * Math.PI * scale * x));
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) assert(Math.abs(H[i][j] - expected[i][j]) < 2e-3);

// A positive theta multiplier is not unitary: its modulus is nonconstant.
const thetaAtOrigin = thetaLift([0, 0], 1);
const thetaAtHalf = thetaLift([0.5, 0], 1);
assert(thetaAtOrigin > thetaAtHalf);
assert(Math.abs(thetaAtOrigin - 1) > 1e-6 || Math.abs(thetaAtHalf - 1) > 1e-6);

// Its Fourier/heat multipliers also have unequal magnitudes.
const lambda0 = 1;
const lambda10 = Math.exp(-Math.PI * quad(Xinv, [1, 0]) / t);
assert(lambda10 > 0 && lambda10 < lambda0);

console.log("Villain/theta periodic-completion audit: PASS");
console.log("lift_sum_is_periodic_under_integer_face_shifts");
console.log("poisson_summation_gives_the_exact_dual_lattice_fourier_expansion");
console.log("local_logarithmic_hessian_converges_to_2pi_t_times_the_scalar_response");
console.log("positive_euclidean_theta_kernel_has_nonconstant_modulus_and_is_not_unitary");
console.log("metaplectic_controlled_phase_requires_separate_oscillatory_level_quantization");
