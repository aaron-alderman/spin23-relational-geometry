#!/usr/bin/env node

const assert = (condition, message) => { if (!condition) throw new Error(message); };

// Local analytic eigenchannel: c(t)=t^m, x(t)=b t^p.
// The Schur quadratic is q(t)=b^2 t^(2p-m) away from t=0.
const classify = (m, p) => {
  assert(Number.isInteger(m) && m > 0 && m % 2 === 0, "PSD crossing order m must be positive and even");
  assert(Number.isInteger(p) && p >= 1, "range condition at the crossing requires p>=1");
  const exponent = 2 * p - m;
  if (exponent < 0) return { exponent, kind: "pole", boundedBlockPossible: false, matchesPointwiseMP: false };
  if (exponent === 0) return { exponent, kind: "finite-nonzero-remnant", boundedBlockPossible: true, matchesPointwiseMP: false };
  return { exponent, kind: "removable-zero", boundedBlockPossible: true, matchesPointwiseMP: true };
};

const pole = classify(4, 1);
const remnant = classify(4, 2);
const zero = classify(4, 3);
assert(pole.kind === "pole" && pole.exponent === -2, "pole regime failed");
assert(remnant.kind === "finite-nonzero-remnant" && remnant.exponent === 0, "remnant regime failed");
assert(zero.kind === "removable-zero" && zero.exponent === 2, "zero regime failed");

// Range compatibility at t=0 only requires p>=1 and therefore does not rule
// out the pole for m=4. Uniform positivity with bounded A requires x^2/c
// bounded, equivalently 2p>=m.
assert(classify(6, 1).kind === "pole", "range-only insufficiency example failed");
assert(classify(6, 3).boundedBlockPossible, "threshold boundedness failed");
assert(classify(6, 4).matchesPointwiseMP, "strict vanishing threshold failed");

// Explicit numerical scaling ratios.
const b = 2;
const q = (t, m, p) => (b * b) * Math.pow(t, 2 * p - m);
assert(Math.abs(q(1e-3, 4, 2) - 4) < 1e-12, "finite remnant should be constant");
assert(q(1e-3, 4, 1) > 1e6, "pole should diverge");
assert(q(1e-3, 4, 3) < 1e-5, "removable-zero branch should vanish");

console.log("Rank-changing Schur trichotomy certificate: PASS");
console.log("2p<m:pole; 2p=m:finite_nonzero_analytic_remnant_but_pointwise_MP_jump; 2p>m:removable_zero_matching_MP");
console.log("crossing_range_condition_alone_insufficient=true; bounded_block_positivity_requires_2p>=m=true");
