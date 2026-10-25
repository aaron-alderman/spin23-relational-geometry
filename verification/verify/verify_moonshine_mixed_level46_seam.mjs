import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const mixed = load("../../evidence/data/moonshine-mixed-level46-seam-v1.json");
const moonshine = load("../../evidence/data/moonshine-program-lattice-bridge-v1.json");
const seam = load("../../evidence/data/lattice-subroutine-genus-two-seam-closure-v1.json");
const galois = load("../../evidence/data/moonshine-order46-galois-orientation-v1.json");
const quarterTurn = load("../../evidence/data/moonshine-quarter-turn-metaplectic-gate-v1.json");
const projectiveNoGo = load("../../evidence/data/moonshine-order23-projective-centralizer-no-go-v1.json");
const congruenceLift = load("../../evidence/data/moonshine-metaplectic-congruence-lift-gate-v1.json");
const scalarNoGo = load("../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json");
const eta = load("../../evidence/data/moonshine-dedekind-eta-relation-phase-v1.json");

const sp4Order = (q) => q ** 4 * (q ** 2 - 1) * (q ** 4 - 1);

// Level two has no 11-torsion.
assert.equal(sp4Order(2), 720);
assert.equal(sp4Order(2) % 11, 5);
assert.equal(mixed.obstructions.level2.order11DividesGroupOrder, false);
assert.equal(seam.finiteModularQuotient.order, sp4Order(2));
assert.equal(seam.finiteModularQuotient.characteristicOrbitSize, 10);

// A nontrivial order-11 rational/integral matrix needs Phi_11, degree 10,
// which cannot occur in dimension four.
assert.equal(11 - 1, 10);
assert(mixed.obstructions.integral.cyclotomicDegree > mixed.obstructions.integral.matrixDimension);
assert.equal(mixed.obstructions.integral.hasOrder11Torsion, false);

// Characteristic 23 does contain the required finite transition group.
assert.equal(sp4Order(23) % 11, 0);
assert(moonshine.finiteTransitionSkeleton.generatedGroup.includes("Dic_11 of order 44"));
assert(moonshine.finiteTransitionSkeleton.finiteSpinAdjacency.includes("Sp(4,23)"));

// CRT separates the spin and orientation factors and their sign behavior.
assert.deepEqual(mixed.crtCarrier.ringFactors, ["F2", "F23"]);
assert.equal((-1 + 2) % 2, 1);
assert.equal((-1 + 23) % 23, 22);
assert(mixed.crtCarrier.centralSign.includes("identity in the F2 factor"));

const labels = mixed.labelResolutions;
assert.equal(labels.full.spinLabels, seam.finiteModularQuotient.characteristicOrbitSize);
assert.equal(labels.full.order23Labels, moonshine.order23DefectChannel.moduleCount);
assert.equal(labels.full.productLabels, labels.full.spinLabels * labels.full.order23Labels);
assert.equal(labels.nonzeroSignRetaining.order23Labels, labels.full.order23Labels - 1);
assert.equal(
  labels.nonzeroSignRetaining.productLabels,
  labels.nonzeroSignRetaining.spinLabels * labels.nonzeroSignRetaining.order23Labels,
);
assert.equal(labels.projective.order23Directions, 24);
assert.equal(labels.projective.productLabels, labels.projective.spinLabels * labels.projective.order23Directions);
assert.equal(mixed.candidate.smallestInitialCarrier, labels.projective.productLabels);
assert.equal(mixed.candidate.scalarBoundaryChannelsRemaining, 0);
assert.equal(mixed.candidate.genusOneCentralizerRepresentationChannelsRemaining, 0);
assert.equal(mixed.candidate.directFiniteDic11IntegralLift, false);
assert.equal(congruenceLift.congruencePreimage.split, false);
assert.equal(projectiveNoGo.anomalyTransgression.projectiveClassOnCentralizer, "trivial");
assert.equal(galois.traceInventory.scalarSearchStatus, "exhausted");
assert.equal(mixed.analyticBoundary.thetaMultiplierRequiresMetaplecticLift, true);
assert(mixed.candidate.scalarCouplingGate.projective.includes("C2"));
assert(mixed.candidate.scalarCouplingGate.signRetaining.includes("ruled out"));
assert.equal(quarterTurn.couplingChannels.metaplecticLift.genuine, false);
assert.equal(scalarNoGo.outcome.projective240Route.includes("remains admissible"), true);
assert.equal(eta.classification.genuineScalarEtaLineExists, true);
assert(mixed.candidate.scalarCouplingGate.signRetaining.includes("K phase i"));
assert(mixed.physicalBoundary.includes("does not select real Spin(2,3)"));

console.log(JSON.stringify({
  obstruction: {
    sp4F2Order: sp4Order(2),
    elevenTorsionAtLevel2: false,
    elevenTorsionInSp4Z: false,
  },
  mixedCongruenceGroup: mixed.crtCarrier.groupFactorization,
  carrierSizes: {
    full: labels.full.productLabels,
    nonzeroSignRetaining: labels.nonzeroSignRetaining.productLabels,
    projective: labels.projective.productLabels,
  },
  scalarBoundaryChannelsRemaining: mixed.candidate.scalarBoundaryChannelsRemaining,
  genusOneCentralizerRepresentationChannelsRemaining:
    mixed.candidate.genusOneCentralizerRepresentationChannelsRemaining,
  analyticKernelConstructed: false,
}, null, 2));
console.log("PASS verify_moonshine_mixed_level46_seam");
