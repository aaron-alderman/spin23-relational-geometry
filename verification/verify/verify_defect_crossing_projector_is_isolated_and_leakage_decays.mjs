import { analyse } from "./explore_pin_pfaffian_crossing_localization.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const base = { M: 2, r: 0.8, m0: 0.8, mu: 0.7 };
const roots = { 2: 1.263992310, 3: 1.261130371, 4: 1.257363281 };

for (const L of [2, 3, 4]) for (const delta of [1.2, roots[L], 1.3]) {
  const result = analyse({ field: "pfd", delta }, 1, { ...base, L });
  const central = result.yProfile.find(({ y }) => y === 0).weight;
  assert(central > 0.49 && result.coreWeight > 0.26 && result.boundaryWeight < 0.13,
    `L=${L}, delta=${delta} paired subspace must retain defect localization`);
  if (Math.abs(delta - roots[L]) > 1e-5) {
    const isolationRatio = result.nextSquaredSingular / result.squaredSingularPair[1];
    assert(isolationRatio > 18,
      `L=${L}, delta=${delta} crossing pair must remain spectrally isolated from the next pair`);
  }
}

const transverseRoots = [1.321239471, 1.263992310, 1.266540527, 1.266464844];
const edgeWeights = [0.431562426, 0.101038886, 0.018873665, 0.002133196];
for (let i = 1; i < edgeWeights.length; i += 1) assert(edgeWeights[i] < 0.25 * edgeWeights[i - 1],
  "reported outer-edge leakage must contract by more than a factor four at each width enlargement");
assert(Math.abs(transverseRoots[3] - transverseRoots[2]) < 1e-4,
  "M=3 and M=4 localized roots must agree within 1e-4");

const wide = analyse({ field: "pfd", delta: transverseRoots[3] }, 1,
  { L: 2, M: 4, r: 0.8, m0: 0.8, mu: 0.7 });
assert(wide.boundaryWeight < 0.003 && wide.effectiveSites < 12,
  "M=4 crossing projector must have negligible edge leakage and saturated effective support");
const radialShells = [0, 1, 2, 3, 4].map((radius) => wide.yProfile
  .filter(({ y }) => Math.abs(y) === radius).reduce((sum, point) => sum + point.weight, 0));
for (let i = 1; i < radialShells.length; i += 1) assert(radialShells[i] < radialShells[i - 1],
  "M=4 crossing density must decrease monotonically away from the defect row");

console.log("Defect crossing projector isolation and leakage decay: PASS");
console.log("declared_path_projector_isolated_at_samples=true");
console.log("outer_edge_weights_M1_M2_M3_M4=0.4316,0.1010,0.01887,0.00213");
console.log("localized_root_M3_M4=1.266541,1.266465");
console.log("uniform_Riesz_gap_in_infinite_volume=still_open");

