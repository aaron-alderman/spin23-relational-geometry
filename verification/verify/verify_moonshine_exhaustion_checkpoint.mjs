import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));

const checkpoint = load("../../evidence/data/moonshine-exhaustion-checkpoint-v1.json");
const bridge = load("../../evidence/data/moonshine-program-lattice-bridge-v1.json");
const centralizer = load("../../evidence/data/moonshine-order23-centralizer-exhaustion-v1.json");
const projective = load("../../evidence/data/moonshine-order23-projective-centralizer-no-go-v1.json");
const seam = load("../../evidence/data/moonshine-mixed-level46-seam-v1.json");
const quarterTurn = load("../../evidence/data/moonshine-quarter-turn-metaplectic-gate-v1.json");
const congruenceLift = load("../../evidence/data/moonshine-metaplectic-congruence-lift-gate-v1.json");
const scalarNoGo = load("../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json");
const eta = load("../../evidence/data/moonshine-dedekind-eta-relation-phase-v1.json");
const seamAction = load("../../evidence/data/moonshine-relation-defect-seam-permutation-v1.json");
const freeMajorana = load("../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json");
const babyGate = load("../../evidence/data/moonshine-baby-monster-genus-two-source-gate-v1.json");
const arf = load("../../evidence/data/moonshine-arf-fourier-baby-monster-reconstruction-v1.json");
const frontier = load("../../evidence/data/moonshine-frontier-crosswalk-v1.json");

assert.equal(checkpoint.closed.arithmeticAndLattice, true);
assert.equal(checkpoint.closed.scalarGenusOne, true);
assert.equal(checkpoint.closed.fullCentralizerInsertionTable, true);
assert.equal(checkpoint.closed.ordinaryGenusOneCentralizerRepresentation, true);
assert.equal(checkpoint.closed.projectiveGenusOneCentralizerRepresentation, true);
assert.equal(checkpoint.closed.wordTraceOrientationChannels, 0);

assert.equal(bridge.rule60GolayDecomposition.orderOnNonzeroImage, 2047);
assert.equal(bridge.rule60GolayDecomposition.orderFactorization, "2047 = 23 * 89");
assert.equal(bridge.rule60GolayDecomposition.primaryIdentity, "T^89 = sigma^2 on im(T)");

assert.equal(centralizer.cyclicReduction.scalarGenusOneCentralizerSearchExhausted, true);
assert.equal(centralizer.insertionClasses.length, 5);
assert(centralizer.insertionClasses.every((entry) => entry.seriesEqual));
assert.deepEqual(
  checkpoint.genusOne.insertionFamilies,
  projective.ordinaryS4.classTraceFamilies,
);
assert.equal(checkpoint.genusOne.transgressedProjectiveClass, projective.anomalyTransgression.projectiveClassOnCentralizer);
assert.equal(projective.genusOneOutcome.orientationRecovered, false);

assert.equal(checkpoint.survivingCarrier.fullLabels, seam.labelResolutions.full.productLabels);
assert.equal(checkpoint.survivingCarrier.nonzeroSignRetainingLabels, seam.labelResolutions.nonzeroSignRetaining.productLabels);
assert.equal(checkpoint.survivingCarrier.projectiveLabels, seam.labelResolutions.projective.productLabels);
assert.equal(checkpoint.survivingCarrier.ambientIsCoupling, false);

assert.equal(checkpoint.scalarBoundary.projectiveCharacter, quarterTurn.couplingChannels.projective.commonCharacter);
assert.equal(checkpoint.scalarBoundary.signRetainingCharacter, "C4");
assert.equal(checkpoint.scalarBoundary.quarterTurnImage, quarterTurn.couplingChannels.metaplecticLift.quarterTurnImage);
assert.equal(checkpoint.scalarBoundary.centralSquareImage, quarterTurn.couplingChannels.metaplecticLift.centralSquareImage);
assert(quarterTurn.couplingChannels.metaplecticLift.status.includes("ruled out"));
assert.equal(checkpoint.scalarBoundary.integralDomain, congruenceLift.congruencePreimage.exactSequence);
assert.equal(checkpoint.scalarBoundary.finiteSectionExists, congruenceLift.integralObstruction.finiteSectionExists);
assert.equal(checkpoint.scalarBoundary.finiteC4DataSufficient, congruenceLift.metaplecticPullback.finiteC4DataSufficient);
assert.equal(checkpoint.scalarBoundary.genuineScalarPromotionPossible, false);
assert.equal(checkpoint.scalarBoundary.genuineScalarPromotionPossible, scalarNoGo.metaplecticNoGo.simultaneousIAndGenuineCenterPossible);
assert.equal(checkpoint.scalarBoundary.genuineEtaScalarLineExists, true);
assert.equal(checkpoint.scalarBoundary.etaRelationDefectPhase, eta.relationDefect.phase);
assert.deepEqual(checkpoint.scalarBoundary.level2RelationDefectCycleType, seamAction.cycleType);
assert.equal(checkpoint.scalarBoundary.permutationDeterminant, seamAction.quotients.permutationSign);
assert.deepEqual(checkpoint.scalarBoundary.freeMajoranaK.etaNormalizedCycleProducts, ["1", "1", "1"]);
assert.equal(checkpoint.scalarBoundary.freeMajoranaK.fixedOddOddEigenvalue, "-1");
assert.equal(checkpoint.scalarBoundary.freeMajoranaK.determinant, freeMajorana.etaNormalizedCycleData.determinant);
assert(checkpoint.scalarBoundary.nextCarrier.includes("Baby-Monster"));
assert.equal(babyGate.sourceStatus.explicitOrder23TwinedBabyMonsterGenusTwoSpinVector, false);
assert(checkpoint.stoppingRule.resumeWhen.some((entry) => entry.includes("Baby-Monster torus one-point")));
assert(checkpoint.stoppingRule.resumeWhen.some((entry) => entry.includes("Arf-Fourier")));
assert.equal(arf.sourceStatus.sixteenTwinedMonsterBackgroundAmplitudesKnown, false);

assert.deepEqual(
  checkpoint.openSourceGated.map(({ rank }) => rank),
  [1, 2, 3, 4],
);
assert(checkpoint.openSourceGated[0].front.includes("genus-two"));
assert(checkpoint.openSourceGated[1].front.includes("cross-grade"));
assert(frontier.rankedTranches.length >= checkpoint.openSourceGated.length);
assert.deepEqual(
  checkpoint.openSourceGated.map(({ rank }) => rank),
  frontier.rankedTranches.map(({ rank }) => rank),
);
assert(checkpoint.stoppingRule.doNotRepeat.length > 0);
assert(checkpoint.stoppingRule.resumeWhen.length > 0);

console.log(JSON.stringify({
  scope: checkpoint.scope,
  genusOneOrientationChannels: checkpoint.closed.wordTraceOrientationChannels,
  survivingCarrierLabels: {
    full: checkpoint.survivingCarrier.fullLabels,
    signRetaining: checkpoint.survivingCarrier.nonzeroSignRetainingLabels,
    projective: checkpoint.survivingCarrier.projectiveLabels,
  },
  nextFront: checkpoint.openSourceGated[0].front,
  status: "source-gated",
}, null, 2));
console.log("PASS verify_moonshine_exhaustion_checkpoint");
