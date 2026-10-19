import assert from "node:assert/strict";

const mod = (x, p) => ((x % p) + p) % p;
const inv = (a, p) => {
  for (let x = 1; x < p; x++) if (mod(a * x, p) === 1) return x;
  throw new Error(`${a} is not invertible modulo ${p}`);
};
const det2 = (K) => K[0][0] * K[1][1] - K[0][1] * K[1][0];
const ratioMod = (K, p) => mod(K[0][1] ** 2 * inv(mod(K[0][0] * K[1][1], p), p), p);
const X = [[2, -1], [-1, 2]];

// The rational invariant c^2/(ab)=1/4 reduces coherently at every odd prime.
for (const p of [3, 5, 7, 11, 13, 17, 19]) {
  assert.equal(ratioMod(X, p), inv(4, p));
  assert.equal(mod(det2(X), p), mod(3, p));
}

// The qutrit shadow is exceptional: 1/4=1 and X has rank one modulo 3.
assert.equal(ratioMod(X, 3), 1);
assert.equal(mod(det2(X), 3), 0);
assert.deepEqual(X.map((r) => r.map((x) => mod(x, 3))), [[2, 2], [2, 2]]);

// Independent positive port-unit congruences preserve the real ratio.
const ratioReal = (K) => K[0][1] ** 2 / (K[0][0] * K[1][1]);
const scaled = [[2 / 4, -1 / 6], [-1 / 6, 2 / 9]]; // D=diag(2,3)
assert.equal(ratioReal(X), 1 / 4);
assert(Math.abs(ratioReal(scaled) - 1 / 4) < 1e-12);

// Allowed local self-shear addition changes the ratio, so it cannot label a
// logical-code orbit once diagonal shears are available.
const shifted = [[3, -1], [-1, 2]];
assert.equal(ratioReal(shifted), 1 / 6);
const mutualOnly = [[0, -1], [-1, 0]];
assert.deepEqual([
  [X[0][0] - 2, X[0][1]],
  [X[1][0], X[1][1] - 2],
], mutualOnly);

// In the positive H_2(R) cone the ratio is continuous and rank one occurs
// only at the boundary value one; the cone itself does not select 1/4.
for (const rho of [0, 1 / 16, 1 / 4, 1 / 2, 15 / 16, 1]) {
  const K = [[1, Math.sqrt(rho)], [Math.sqrt(rho), 1]];
  assert(Math.abs(ratioReal(K) - rho) < 1e-12);
  assert(det2(K) >= -1e-12);
  if (rho === 1) assert(Math.abs(det2(K)) < 1e-12);
}

console.log("Scale-free mutual-ratio comparison: PASS");
console.log("r_squared_equals_one_quarter_and_reduces_coherently_at_all_odd_primes");
console.log("modulo_three_the_ratio_equals_one_and_the_response_matrix_is_rank_one");
console.log("independent_port_rescaling_preserves_the_ratio");
console.log("allowed_diagonal_self_shears_change_the_ratio_so_it_is_not_a_code_orbit_invariant");
console.log("the_positive_H2R_cone_contains_a_continuum_of_ratios_and_does_not_select_one_quarter");
