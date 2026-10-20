import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-first-joined-physical-lift-decision.json','utf8'));

assert.equal(evidence.schema,'spin23.first-joined-physical-lift-decision/1');
assert.deepEqual(evidence.claimsIntegrated,[1556,1557,1558]);

const r=evidence.representation;
assert.equal(r.sixteenStateFamilyDimensionMatch,true);
assert.equal(r.semisimpleAnomalyGatePassed,true);
assert.equal(r.ordinaryGaugeEquivariantRealityOnSixteenStates,false);
assert.equal(r.minimumOrdinaryRealStateCount,32);
assert.equal(r.leftRightTwistedRealityOnSixteenStates,'conditional');
assert.equal(r.allSevenOddEdgesNeedBidoubletLift,true);
assert.equal(r.labelEdgesContainRightMajoranaCarrier,false);
assert.equal(r.labelEdgesCloseHighScaleBreaking,false);

const w=evidence.wardModule;
assert.equal(w.abstractParallelMasterSourceLine,true);
assert.equal(w.rgTangencyEquation,'q+d-a-b=0');
assert.equal(w.thresholdTangencyEquation,'gamma+delta-alpha-beta=0');
assert.equal(w.sourcedTypedIntertwiner,false);
assert.equal(w.leftRightTwistExchangesDiracAndMajoranaComplexes,false);
assert.equal(w.freeSpurionCountsAsDerivation,false);

const d=evidence.dynamicsAndObservable;
assert.equal(d.oneSingletStableOrdering,true);
assert.equal(d.orderingOrientationDerivedBySpin23,false);
assert.equal(d.exactEnergyReflectionSumRule,true);
assert.equal(d.orderedOffDiagonalSumRuleRequiresReciprocalRealWeights,true);
assert.equal(d.phaseRobustOffDiagonalObservable,'Re[(G^R_ij+G^R_ji)/2]');
assert.equal(d.pointwiseIntervalZero,false);
assert.equal(d.genericPhysicalDiagonalTermsPreserveMinimalChiralIdentity,false);

assert.equal(evidence.joinedDecision.completePhysicalLift,false);
assert.equal(evidence.joinedDecision.honestCarrierBranches.length,2);
assert.equal(evidence.joinedDecision.spin23CurrentlyDerivesMissingChoices,false);

for(const path of [
  'corpus/claims/1500-1599/1556_one_pati_salam_family_matches_the_sixteen_labels_but_ordinary_reality_doubles_it_and_the_link_sector_does_not_close.md',
  'corpus/claims/1500-1599/1557_the_minimal_Ward_completion_is_a_parallel_master_source_bundle_but_no_sourced_typed_intertwiner_realizes_it.md',
  'corpus/claims/1500-1599/1558_a_one_singlet_landau_extension_selects_the_anchor_chamber_while_chiral_grading_gives_only_an_energy_reflection_sum_rule.md'
]) assert.ok(existsSync(path),`missing ${path}`);

console.log('PASS 1559: the joined lift finds an anomaly-free one-family match and conditional ordering/sum-rule constructions, but ordinary reality, scalar closure and a sourced typed Ward intertwiner remain open; physical admission is false.');
