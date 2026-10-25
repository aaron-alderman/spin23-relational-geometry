import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const crosswalk = load("../../evidence/data/moonshine-frontier-crosswalk-v1.json");
const register = load("../../corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json");
const joined = load("../../evidence/data/moonshine-joined-bridge-map-v1.json");
const moonshine = load("../../evidence/data/moonshine-program-lattice-bridge-v1.json");
const galois = load("../../evidence/data/moonshine-order46-galois-orientation-v1.json");
const mixed = load("../../evidence/data/moonshine-mixed-level46-seam-v1.json");
const quarterTurn = load("../../evidence/data/moonshine-quarter-turn-metaplectic-gate-v1.json");
const projectiveNoGo = load("../../evidence/data/moonshine-order23-projective-centralizer-no-go-v1.json");
const scalarNoGo = load("../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json");
const eta = load("../../evidence/data/moonshine-dedekind-eta-relation-phase-v1.json");
const seamAction = load("../../evidence/data/moonshine-relation-defect-seam-permutation-v1.json");
const freeMajorana = load("../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json");
const babyGate = load("../../evidence/data/moonshine-baby-monster-genus-two-source-gate-v1.json");

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
assert.equal(
  crosswalk.rankedTranches[0].smallestFiniteProductCarrier,
  mixed.labelResolutions.projective.productLabels,
);
assert.equal(galois.traceInventory.scalarSearchStatus, "exhausted");
assert(crosswalk.targets.find(({id}) => id === "FPT-002").nextGate.includes("cross-grade"));
assert.equal(
  crosswalk.rankedTranches[1].genusOneCentralizerRepresentationChannelsRemaining,
  0,
);
assert.deepEqual(
  crosswalk.rankedTranches[0].scalarCouplingSequence,
  ["C2 projective sign survives", "finite C4 metaplectic lift ruled out", "genuine eta line has K phase i", "level-2 K permutation has cycle type 3^3 1", "eta-normalized free-Majorana cycles have products 1,1,1 with fixed odd-odd eigenvalue -1", "compute fermionic Baby-Monster K action and combine the monomial factors"],
);
assert.equal(quarterTurn.couplingChannels.metaplecticLift.quarterTurnImage, "i");
assert.equal(quarterTurn.couplingChannels.metaplecticLift.genuine, false);
assert.equal(scalarNoGo.outcome.projective240Route.includes("remains admissible"), true);
assert.equal(eta.relationDefect.phase, "i");
assert.deepEqual(seamAction.cycleType, [3, 3, 3, 1]);
assert.equal(freeMajorana.interpretation.freeMajoranaFactorComplete, true);
assert.equal(freeMajorana.interpretation.completeMonster2AActionKnown, false);
assert.equal(crosswalk.rankedTranches[0].babyMonsterSourcePacketKnown, false);
assert.equal(babyGate.sourceStatus.explicitOrder23TwinedBabyMonsterGenusTwoSpinVector, false);
assert.equal(projectiveNoGo.anomalyTransgression.projectiveClassOnCentralizer, "trivial");
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
