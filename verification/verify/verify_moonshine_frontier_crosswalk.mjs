import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const crosswalk = load("../../evidence/data/moonshine-frontier-crosswalk-v1.json");
const register = load("../../corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json");
const joined = load("../../evidence/data/moonshine-joined-bridge-map-v1.json");
const moonshine = load("../../evidence/data/moonshine-program-lattice-bridge-v1.json");

const declaredTargetIds = new Set(register.coreTargets.map((target) => target.id));
const mappedIds = crosswalk.targets.map((target) => target.id);
assert.deepEqual(mappedIds, ["FPT-002", "FPT-007", "FPT-009", "FPT-010", "FPT-017", "FPT-019", "FPT-022"]);
assert.equal(new Set(mappedIds).size, mappedIds.length);
assert(mappedIds.every((id) => declaredTargetIds.has(id)));

for (const target of crosswalk.targets) {
  assert.equal(typeof target.reach, "string");
  assert.equal(typeof target.asset, "string");
  assert.equal(typeof target.nextGate, "string");
  assert.equal(typeof target.killTest, "string");
}

// Exact assets used by the target crosswalk must remain present in the
// underlying ledgers rather than becoming prose-only correspondences.
assert.equal(moonshine.order23DefectChannel.moduleCount, 529);
assert.equal(moonshine.finiteTransitionSkeleton.generatedGroup, "dicyclic group Dic_11 of order 44 inside SL(2,23)");
assert.equal(moonshine.projectiveTransitionQuotient.centralReduction.includes("dihedral group D_11 of order 22"), true);
assert.equal(joined.order46Junction.allRootClassesAbove23AB.length, 4);
assert.equal(joined.centralizerLiftResolution.twoB.centralizerProjectionKernelOrder, 8);
assert.equal(joined.joinedCarriers.identityPlusInversePairs, 12);
assert.equal(joined.joinedCarriers.evenSpinStructures, 10);
assert.notEqual(joined.joinedCarriers.identityPlusInversePairs, joined.joinedCarriers.evenSpinStructures);

// The computational tranches must precede physical promotion, and the first
// two explicitly require no new experiment.
assert.deepEqual(crosswalk.rankedTranches.map((tranche) => tranche.rank), [1, 2, 3, 4]);
assert.equal(crosswalk.rankedTranches[0].requiresNewExperiment, false);
assert.equal(crosswalk.rankedTranches[1].requiresNewExperiment, false);
assert.equal(crosswalk.rankedTranches[2].requiresNewExperiment, true);
assert.equal(crosswalk.rankedTranches[3].requiresNewExperiment, true);
assert(crosswalk.epistemicBoundary.includes("not evidence"));

console.log(JSON.stringify({
  mappedTargets: mappedIds,
  immediateWithoutNewExperiment: crosswalk.rankedTranches
    .filter((tranche) => !tranche.requiresNewExperiment)
    .map((tranche) => tranche.name),
  exactFiniteAssets: {
    twistChargeLabels: moonshine.order23DefectChannel.moduleCount,
    reversibleSkeleton: "Dic_11 order 44",
    projectiveShadow: "D_11 order 22",
    order46RootClasses: joined.order46Junction.allRootClassesAbove23AB,
    leechLiftKernelOrder: joined.centralizerLiftResolution.twoB.centralizerProjectionKernelOrder,
  },
  physicalPromotion: false,
}, null, 2));
console.log("PASS verify_moonshine_frontier_crosswalk");
