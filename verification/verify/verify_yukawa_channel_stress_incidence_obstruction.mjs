#!/usr/bin/env node

// Exact incidence audit for attempts to derive four Yukawa-channel weights
// from an additive stress tensor by assigning every participating field's
// complete free-field multiplicity to every channel in which it occurs.

const channels = ["u", "d", "e", "nu"];
const fields = ["Q", "L", "H", "u", "d", "e", "nu"];

const incidence = {
  Q:  [1, 1, 0, 0],
  L:  [0, 0, 1, 1],
  H:  [1, 1, 1, 1],
  u:  [1, 0, 0, 0],
  d:  [0, 1, 0, 0],
  e:  [0, 0, 1, 0],
  nu: [0, 0, 0, 1],
};

const multiply = (row, w) => row.reduce((s, x, i) => s + x * w[i], 0);
const loads = w => Object.fromEntries(fields.map(f => [f, multiply(incidence[f], w)]));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

// The four singlet rows form the identity, so any requested singlet loads
// uniquely fix the channel weights.
const colorWeights = [3, 3, 1, 1];
const induced = loads(colorWeights);

assert(induced.u === 3 && induced.d === 3, "quark-singlet multiplicities failed");
assert(induced.e === 1 && induced.nu === 1, "lepton-singlet multiplicities failed");
assert(induced.Q === 6, "Q multiplicity relation failed");
assert(induced.L === 2, "L multiplicity relation failed");
assert(induced.H === 8, "shared-Higgs overcount was not exposed");

// In complex-component counting the Standard-Model Higgs doublet has two
// components. No w can satisfy both the four singlet rows and H=2, because
// the identity singlet block already fixes w=(3,3,1,1), hence H=sum(w)=8.
const target = { Q: 6, L: 2, H: 2, u: 3, d: 3, e: 1, nu: 1 };
const residual = Object.fromEntries(fields.map(f => [f, induced[f] - target[f]]));
assert(residual.Q === 0 && residual.L === 0, "doublet rows should match");
assert(residual.u === 0 && residual.d === 0 && residual.e === 0 && residual.nu === 0,
  "singlet rows should match");
assert(residual.H === 6, "Higgs incompatibility should be exactly six complex units");

// Positivity cannot select weights: two distinct positive choices both give
// positive sums for arbitrary positive-semidefinite channel matrices.
const positiveWeightExamples = [
  [3, 3, 1, 1],
  [1, 2, 4, 8],
];
assert(positiveWeightExamples.every(w => w.every(x => x > 0)), "positive examples failed");
assert(positiveWeightExamples.some((w, i) => i > 0 && w.some((x, j) => x !== positiveWeightExamples[0][j])),
  "distinct positive weights required");

console.log("Yukawa-channel stress-incidence obstruction certificate: PASS");
console.log("singlet_rows_fix_weights=(3,3,1,1); Q=6; L=2; induced_H=8; physical_H_complex_components=2");
console.log("naive_additive_cycle_partition=false; Higgs_partition_or_correlator_kernel_required=true; positivity_selects_weights=false");
