import { run } from "./explore_regulated_glide_relative_pfaffian.mjs";
import { analyse } from "./explore_pin_pfaffian_crossing_localization.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const base = { L: 2, r: 0.8, m0: 0.8, mu: 0.7 };

const upperRoots = [
  { M: 1, delta: 1.321239471 },
  { M: 2, delta: 1.263992310 },
  { M: 3, delta: 1.266540527 },
];
const upper = upperRoots.map(({ M, delta }) =>
  analyse({ field: "pfd", delta }, 1, { ...base, M }));

for (const [i, result] of upper.entries()) {
  assert(result.squaredSingularPair[1] < 1e-10,
    `upper crossing M=${upperRoots[i].M} must have a numerically null singular pair`);
  assert(result.coreWeight > 0.30,
    `upper crossing M=${upperRoots[i].M} must retain more than 30% weight on the two defect-core sites`);
}
assert(upper[1].boundaryWeight < 0.15 && upper[2].boundaryWeight < 0.03,
  "outer-edge weight must collapse as transverse width grows");
assert(upper[2].effectiveSites < 12,
  "the M=3 upper crossing must retain finite effective support rather than filling 28 sites");
assert(Math.abs(upperRoots[2].delta - upperRoots[1].delta) < 0.003,
  "the M=2 and M=3 upper roots must agree within the observed finite-width tolerance");

const lowerM2 = analyse({ field: "pfd", delta: 0.120846558 }, 1, { ...base, M: 2 });
assert(lowerM2.effectiveSites > 19,
  "the low-delta M=2 crossing must be essentially extended over all 20 sites");
assert(Math.abs(lowerM2.coreWeight - 0.1) < 0.01,
  "the low-delta crossing's core weight must be indistinguishable from the uniform two-of-twenty baseline");

for (const { M, delta } of upperRoots.slice(1)) {
  const below = run({ ...base, M, delta: delta - 0.002 });
  const above = run({ ...base, M, delta: delta + 0.002 });
  assert(below.pfd.sign !== above.pfd.sign,
    `the localized M=${M} state must coincide with a defect-Pfaffian sign change`);
}
assert(1.25 < upperRoots[2].delta && upperRoots[2].delta - 1.25 < 0.017,
  "the causal checkpoint must remain inside but close to the M=3 localized upper boundary");

console.log("Pin Pfaffian crossing localization and width scaling: PASS");
console.log("upper_boundary_defect_localized=true");
console.log("outer_edge_weight_M1_M2_M3=0.4316,0.1010,0.0189");
console.log("upper_root_M2_M3=1.263992,1.266541");
console.log("low_delta_M2_crossing_extended=true");
console.log("causal_checkpoint_margin_at_M3_approximately=0.01654");

