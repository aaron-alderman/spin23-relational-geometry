import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));

const joined = load("../../evidence/data/moonshine-joined-bridge-map-v1.json");
const galois = load("../../evidence/data/moonshine-order46-galois-orientation-v1.json");
const mixed = load("../../evidence/data/moonshine-mixed-level46-seam-v1.json");
const quarterTurn = load("../../evidence/data/moonshine-quarter-turn-metaplectic-gate-v1.json");
const projectiveNoGo = load("../../evidence/data/moonshine-order23-projective-centralizer-no-go-v1.json");
const scalarNoGo = load("../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json");
const eta = load("../../evidence/data/moonshine-dedekind-eta-relation-phase-v1.json");
const seamAction = load("../../evidence/data/moonshine-relation-defect-seam-permutation-v1.json");
const freeMajorana = load("../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json");
const babyGate = load("../../evidence/data/moonshine-baby-monster-genus-two-source-gate-v1.json");
const moonshine = load("../../evidence/data/moonshine-program-lattice-bridge-v1.json");
const fermionic = load("../../evidence/data/lattice-subroutine-monster-fermionization-bridge-v1.json");
const igusa = load("../../evidence/data/lattice-subroutine-igusa-seam-completion-v1.json");
const seam = load("../../evidence/data/lattice-subroutine-genus-two-seam-closure-v1.json");

const gcd = (a0, b0) => {
  let a = a0;
  let b = b0;
  while (b !== 0) [a, b] = [b, a % b];
  return a;
};
const orderOfPower = (order, power) => order / gcd(order, power);

// Every order-46 representative supplies a commuting order-23/involution pair.
assert.equal(orderOfPower(46, 2), 23);
assert.equal(orderOfPower(46, 23), 2);
assert.equal(joined.order46Junction.rootOrder, 46);
assert.deepEqual(joined.order46Junction.leechRootClasses, ["46A", "46B"]);
assert.deepEqual(joined.order46Junction.fermionicRootClasses, ["46C", "46D"]);
assert.equal(joined.order46Junction.leechInvolutionClass, "2B");
assert.equal(joined.order46Junction.fermionicInvolutionClass, "2A");
assert.deepEqual(
  new Set(joined.order46Junction.allRootClassesAbove23AB),
  new Set(["46A", "46B", "46C", "46D"]),
);

// Powers of one cyclic generator commute: h^(2+23)=h^(23+2).
assert.equal((2 + 23) % 46, (23 + 2) % 46);

// Resolve the two rails through the canonical involution centralizers.
// ATLAS orders give C_M(2A)=2.B and C_M(2B)=2^(1+24).Co1.
const babyMonsterOrder = 4154781481226426191177580544000000n;
const monsterTwoACentralizerOrder = 8309562962452852382355161088000000n;
const conwayOneOrder = 4157776806543360000n;
const monsterTwoBCentralizerOrder = 139511839126336328171520000n;
assert.equal(monsterTwoACentralizerOrder / babyMonsterOrder, 2n);
assert.equal(monsterTwoBCentralizerOrder / conwayOneOrder, 2n ** 25n);
const lifts = joined.centralizerLiftResolution;
assert.equal(lifts.twoA.rootCentralizerOrderInMonster, 92);
assert.equal(lifts.twoA.quotientOrder23CentralizerOrderInBabyMonster, 46);
assert.equal(92 / 46, 2);
assert.equal(lifts.twoB.rootCentralizerOrderInMonster, 184);
assert.equal(lifts.twoB.quotientOrder23CentralizerOrderInCo1, 23);
assert.equal(184 / 23, 8);
assert.equal(lifts.twoB.centralizerProjectionKernelOrder, 8);
assert.equal(lifts.twoB.normalTwoGroupOrder, 2 ** 25);

// Cross-ledger consistency of the order-23 carrier.
assert.equal(moonshine.order23DefectChannel.moduleCount, 23 ** 2);
assert.equal(joined.joinedCarriers.order23TwistChargeLabels, 23 ** 2);
assert.equal(joined.joinedCarriers.order23NonzeroLabels, 23 ** 2 - 1);
assert.equal(joined.joinedCarriers.order23ProjectiveDirections, (23 ** 2 - 1) / (23 - 1));
assert.deepEqual(joined.joinedCarriers.order23ProjectiveOrbitSizes, [2, 22]);
assert.equal(joined.joinedCarriers.order23ProjectiveOrbitSizes.reduce((a, b) => a + b, 0), 24);
assert.equal(joined.joinedCarriers.inversePairedGeneratorPowers, (23 - 1) / 2);
assert.equal(joined.joinedCarriers.identityPlusInversePairs, 1 + (23 - 1) / 2);
assert.equal(joined.joinedCarriers.conditionalSo3DefectRank, moonshine.parafermionRefinementBoundary.repSo3Rank);
assert.equal(joined.joinedCarriers.genusX1_25, moonshine.parafermionRefinementBoundary.modularCurveGenus);

// Cross-ledger consistency of the fermionic genus-two carrier.
const spin = fermionic.established.genusTwoCarrier;
assert.equal(joined.joinedCarriers.genusTwoSpinStructures, spin.allSpinStructures);
assert.equal(joined.joinedCarriers.evenSpinStructures, spin.evenPotentiallyNonzero);
assert.equal(joined.joinedCarriers.oddSpinStructures, spin.oddVanishingFromMajoranaZeroMode);
assert.equal(spin.allSpinStructures, spin.evenPotentiallyNonzero + spin.oddVanishingFromMajoranaZeroMode);
assert.equal(joined.joinedCarriers.evenSpinStructures, seam.finiteModularQuotient.evenCharacteristics.length);
assert.equal(joined.joinedCarriers.evenSpinStructures, igusa.characteristics.evenTotal);
assert.equal(joined.joinedCarriers.evenCarrierSumZeroDimension, spin.evenPotentiallyNonzero - 1);

// The nearby counts are deliberately not identified.
assert.notEqual(joined.joinedCarriers.identityPlusInversePairs, joined.joinedCarriers.evenSpinStructures);
assert.equal(igusa.igusa.chi5.hasCharacter, true);
assert.equal(igusa.igusa.chi10.fullScalarModularForm, true);
assert.equal(seam.finiteModularQuotient.setwisePairStabilizerOrder, 16);
assert.equal(seam.finiteModularQuotient.characteristicOrbitSize, 10);

// The joined map must explicitly retain every compression gate and both
// research boundaries: no automatic real Spin lift and no physical dynamics.
assert.equal(joined.admissibilityLosses.length, 6);
for (const gate of joined.admissibilityLosses) {
  assert.equal(typeof gate.source, "string");
  assert.equal(typeof gate.quotient, "string");
  assert.equal(typeof gate.lost, "string");
}
assert(joined.forbiddenPromotions.some((entry) => entry.includes("Spin_0(2,3)")));
assert(joined.forbiddenPromotions.some((entry) => entry.includes("real-time dynamics")));
assert.equal(joined.generalizedMoonshineTarget.fourCases.length, 4);
assert.equal(
  joined.generalizedMoonshineTarget.noncyclicAugmentation.maximumOrientedNonidentityTraces,
  galois.traceInventory.orientedNonidentityTracesMaximum,
);
assert(joined.generalizedMoonshineTarget.noncyclicAugmentation.orientationTransport.includes("not Monster conjugation"));
assert.equal(
  joined.generalizedMoonshineTarget.mixedLevelSeam.smallestProductCarrier,
  mixed.labelResolutions.projective.productLabels,
);
assert(joined.generalizedMoonshineTarget.mixedLevelSeam.boundary.includes("non-factorized"));
assert(joined.generalizedMoonshineTarget.mixedLevelSeam.signRetainingScalarCoupling.includes("ruled out"));
assert.equal(quarterTurn.couplingChannels.metaplecticLift.genuine, false);
assert.equal(scalarNoGo.metaplecticNoGo.simultaneousIAndGenuineCenterPossible, false);
assert.equal(eta.relationDefect.phase, "i");
assert(joined.generalizedMoonshineTarget.mixedLevelSeam.signRetainingScalarCoupling.includes("free-Majorana"));
assert(joined.generalizedMoonshineTarget.mixedLevelSeam.signRetainingScalarCoupling.includes("Baby-Monster"));
assert.equal(freeMajorana.etaNormalizedCycleData.determinant, "-1");
assert.deepEqual(seamAction.cycleType, [3, 3, 3, 1]);
assert.equal(projectiveNoGo.genusOneOutcome.orientationRecovered, false);
assert(joined.generalizedMoonshineTarget.mixedLevelSeam.genusOneCentralizerRepresentationStatus.includes("exhausted"));
assert.equal(babyGate.established.sumCentralCharge, 24);
assert(joined.openGates.some((entry) => entry.includes("Baby-Monster torus one-point")));
assert.equal(joined.openGates.length, 6);

console.log(JSON.stringify({
  order46Diamond: {
    leechRail: "46A/B -> (23AB,2B)",
    fermionicRail: "46C/D -> (23AB,2A)",
    commutingPair: "(h^2,h^23)",
  },
  centralizerLifts: {
    twoA: "46C/D in 2.B -> Baby Monster 23AB; 92=2*46",
    twoB: "46A/B in 2^(1+24).Co1 -> Conway 23AB; 184=8*23",
  },
  order23Carrier: {
    labels: joined.joinedCarriers.order23TwistChargeLabels,
    projectiveDirections: joined.joinedCarriers.order23ProjectiveDirections,
    inversePairsPlusIdentity: joined.joinedCarriers.identityPlusInversePairs,
  },
  genusTwoSpinCarrier: {
    all: joined.joinedCarriers.genusTwoSpinStructures,
    even: joined.joinedCarriers.evenSpinStructures,
    odd: joined.joinedCarriers.oddSpinStructures,
    sumZeroDimension: joined.joinedCarriers.evenCarrierSumZeroDimension,
  },
  labelwiseBridgePossible: false,
  nextObservable: joined.generalizedMoonshineTarget.observable,
}, null, 2));
console.log("PASS verify_moonshine_joined_bridge_map");
