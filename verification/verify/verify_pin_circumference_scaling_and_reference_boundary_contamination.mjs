import { run } from "./explore_regulated_glide_relative_pfaffian.mjs";
import { analyse } from "./explore_pin_pfaffian_crossing_localization.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const base = { M: 2, r: 0.8, m0: 0.8, mu: 0.7 };

const defectRoots = [
  { L: 2, delta: 1.263992310, core: 0.3398967, edge: 0.1010389, effective: 10.7856 },
  { L: 3, delta: 1.261130371 },
  { L: 4, delta: 1.257363281 },
];
const defectProfiles = defectRoots.slice(1).map(({ L, delta }) =>
  analyse({ field: "pfd", delta }, 1, { ...base, L }));

for (const [index, result] of defectProfiles.entries()) {
  const L = defectRoots[index + 1].L;
  const uniformCore = 1 / (L * (2 * base.M + 1));
  assert(result.squaredSingularPair[1] < 1e-9,
    `L=${L} defect root must contain a numerical null pair`);
  assert(result.coreWeight / uniformCore > 4,
    `L=${L} defect root must be strongly enhanced above uniform core weight`);
  assert(result.boundaryWeight > 0.08 && result.boundaryWeight < 0.13,
    `L=${L} defect root must remain centered rather than outer-edge localized`);
  assert(result.yProfile.find(({ y }) => y === 0).weight > 0.5,
    `L=${L} defect root must place more than half its weight on the central row`);
}
assert(Math.max(...defectRoots.map(({ delta }) => delta)) - Math.min(...defectRoots.map(({ delta }) => delta)) < 0.007,
  "M=2 defect roots for L=2,3,4 must remain within the observed narrow range");
assert(defectProfiles[1].effectiveSites / 40 < defectProfiles[0].effectiveSites / 30,
  "defect-mode occupied fraction must decrease from L=3 to L=4");

const referenceRoot = 1.250488281;
const reference = analyse({ field: "pfr", delta: referenceRoot }, 1, { ...base, L: 4 });
assert(reference.squaredSingularPair[1] < 1e-9,
  "L=4 reference root must contain a numerical null pair");
assert(reference.boundaryWeight > 0.7,
  "reference crossing must be localized on the open transverse boundaries");
assert(reference.yProfile.find(({ y }) => y === 0).weight < 0.03,
  "reference crossing must be depleted from the central row");
assert(Math.max(...reference.xProfile.map(({ weight }) => Math.abs(weight - 1 / 8))) < 1e-8,
  "reference boundary crossing must be uniform around the circumference");

const below = run({ ...base, L: 4, delta: 1.25 });
const inside = run({ ...base, L: 4, delta: 1.254 });
const above = run({ ...base, L: 4, delta: 1.26 });
assert(below.relative === 1 && inside.relative === -1 && above.relative === 1,
  "L=4,M=2 relative phase must be a narrow interval between reference and defect roots");
assert(referenceRoot > 1.25 && referenceRoot - 1.25 < 0.0005,
  "the causal checkpoint must sit just below, but outside, the narrow relative phase");

console.log("Pin circumference scaling and reference-boundary contamination: PASS");
console.log("defect_roots_L2_L3_L4=1.263992,1.261130,1.257363");
console.log("defect_crossing_remains_core_localized=true");
console.log("reference_root_L4M2_boundary_localized=true");
console.log("relative_band_L4M2_approximately=(1.250488,1.257363)");
console.log("delta_1.25_relative_parity_L4M2=trivial");

