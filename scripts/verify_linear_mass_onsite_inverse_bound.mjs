import { transverseHoppingAudit } from "./explore_regulated_glide_relative_pfaffian.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const parameters = { r: 0.8, m0: 0.8, mu: 0.7, delta: 1.2664482421875 };
const boundedSliceNorm = parameters.m0 + Math.abs(parameters.delta) + 1 + 3 * parameters.r;
const invertibilityRadius = Math.floor(boundedSliceNorm / parameters.mu) + 1;
const twoOverMuRadius = Math.ceil(2 * boundedSliceNorm / parameters.mu);

assert(Math.abs(boundedSliceNorm - 5.4664482421875) < 1e-12,
  "conservative bounded slice norm must match the reported benchmark value");
assert(invertibilityRadius === 8,
  "onsite block must be rigorously invertible from integer radius eight under the conservative norm bound");
assert(twoOverMuRadius === 16,
  "the simple two-over-mu-y inverse estimate must apply from integer radius sixteen");

for (let y = twoOverMuRadius; y <= 64; y += 1) {
  const neumannBound = 1 / (parameters.mu * y - boundedSliceNorm);
  assert(neumannBound <= 2 / (parameters.mu * y) + 1e-12,
    "Neumann inverse bound must imply the two-over-mu-y estimate in the declared tail");
}

const hopping = transverseHoppingAudit(parameters.r);
assert(hopping.invertible && hopping.inverseIdentity,
  "transverse hopping audit must remain invertible for the recurrence formulation");
const hoppingNormUpperBound = (1 + parameters.r) / 2;
const recurrenceCoefficient = 2 * hoppingNormUpperBound / parameters.mu;
assert(Math.abs(recurrenceCoefficient - 18 / 7) < 1e-12,
  "tail recurrence neighbor-sum coefficient must equal 18/7 divided by radius");

console.log("Linear-mass onsite inverse bound: PASS");
console.log(`bounded_slice_norm_upper=${boundedSliceNorm.toFixed(6)}`);
console.log(`onsite_invertible_for_integer_radius_at_least=${invertibilityRadius}`);
console.log(`inverse_norm_at_most_2_over_mu_y_for_radius_at_least=${twoOverMuRadius}`);
console.log(`two_neighbor_recurrence_coefficient_over_y=${recurrenceCoefficient.toFixed(6)}`);

