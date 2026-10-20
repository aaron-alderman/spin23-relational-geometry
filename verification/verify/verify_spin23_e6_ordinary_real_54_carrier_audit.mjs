import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-e6-ordinary-real-54-carrier-audit.json','utf8'));
assert.equal(evidence.schema,'spin23.e6-ordinary-real-54-carrier-audit/1');

const r27=evidence.branching.twentySeven;
const rb27=evidence.branching.barTwentySeven;
const dim=xs=>xs.reduce((s,x)=>s+x.dimension,0);
assert.equal(dim(r27),27);
assert.equal(dim(rb27),27);
assert.equal(dim(r27)+dim(rb27),54);
assert.deepEqual(evidence.branching.dimensionChecks,{twentySeven:27,barTwentySeven:27,total:54});

// Conjugation reverses the complex Spin(10) spinor and U(1)_psi charge,
// but leaves the real 10 and semisimple-real Pati-Salam 6 and (2,2) types.
const byId=new Map([...r27,...rb27].map(x=>[x.id,x]));
for(const [a,b] of evidence.ordinaryReality.jPairs){
  const x=byId.get(a),y=byId.get(b);
  assert.ok(x&&y);
  assert.equal(x.dimension,y.dimension);
  assert.equal(x.qPsi,-y.qPsi);
}
assert.equal(evidence.ordinaryReality.ordinaryGaugeEquivariantJExists,true);
assert.equal(evidence.ordinaryReality.singleTwentySevenOrdinaryJClosed,false);
assert.equal(evidence.ordinaryReality.linearE6CrossIntertwinerDimension,0);

// The conventional 16_1 + 10_-2 + 1_4 charge ledger cancels all U(1)_psi
// anomalies internal to one 27.  The mixed index normalization is
// T(16)=2 T(10).
const q=evidence.anomalies.u1PsiOnTwentySeven;
assert.equal(q.weightedGravitationalTerms.reduce((a,b)=>a+b,0),0);
assert.equal(q.weightedCubicTerms.reduce((a,b)=>a+b,0),0);
assert.equal(q.spin10SquaredU1TermsUsingT16Equals2T10.reduce((a,b)=>a+b,0),0);
assert.equal(q.weightedGravitationalTotal,0);
assert.equal(q.weightedCubicTotal,0);
assert.equal(q.spin10SquaredU1Total,0);

// The Pati-Salam family cancels SU(4)^3; the real 6 adds zero.  The family
// supplies four doublets per weak factor and the bidoublet supplies two,
// leaving both Witten counts even.
const ps=evidence.anomalies.patiSalamOnTwentySeven;
assert.equal(ps.su4CubicTerms.reduce((a,b)=>a+b,0),0);
assert.equal(ps.su2LDoubletCount,4+2);
assert.equal(ps.su2RDoubletCount,4+2);
assert.deepEqual([ps.su2LDoubletCount%2,ps.su2RDoubletCount%2],ps.wittenParities);
assert.equal(evidence.anomalies.e6PerturbativeGaugeAnomaly,0);

// Tensor-product dimensions independently check the three standard E6
// decompositions used by the mass and Yukawa audit.
assert.equal(27*27,27+351+351);
assert.equal(27*27,1+78+650);
assert.equal(27*28/2,27+351); // symmetric square: bar27 + bar351'
assert.equal(27*26/2,351);    // alternating square: bar351
assert.equal(evidence.invariantTensors.shared351PrimeParentCoefficientDimensionForOneFamily,1);

assert.equal(evidence.exoticMassAudit.unbrokenE6CanLiftOnlyTenPlusOne,false);
assert.equal(evidence.exoticMassAudit.lightChiralFamilyFromCarrierWithoutExtraProjection,'UNSAT');
assert.equal(evidence.orientedCorrespondence.e6InvariantProjectorOntoSixteenExists,false);
assert.equal(evidence.orientedCorrespondence.exceptionalCubicClosesOnSixteen,false);
assert.equal(evidence.orientedCorrespondence.linearOrientedTransporterVerdict,
  'UNSAT at unbroken E6 because Hom_E6(27,bar27)=0');

// A shared parent coefficient is not equality of normalized broken-phase
// couplings: independent Clebsches, vevs and wave-function/threshold factors
// remain.  This is the exact distinction between the near miss and a Ward line.
assert.equal(evidence.typedPortalWardLine.oneFamilyParentInvariantCoefficient,'SAT');
assert.equal(evidence.typedPortalWardLine.typedOperatorExchange,false);
assert.equal(evidence.typedPortalWardLine.selectedSupportProtected,false);
assert.match(evidence.typedPortalWardLine.wardDecision,
  /no broken-phase portal ray or selected normalized portal Ward line is derived/);

assert.equal(evidence.verdict.ordinaryReality,'SAT');
assert.equal(evidence.verdict.auditedPerturbativeAndPatiSalamAnomalies,'SAT');
assert.equal(evidence.verdict.automaticLightChiralSpectrum,'UNSAT');
assert.equal(evidence.verdict.orientedSupportClosure,'UNSAT');
assert.equal(evidence.verdict.sharedParentYukawaTensor,'SAT for one family');
assert.equal(evidence.verdict.normalizedTypedPortalWardLine,'UNSAT');
assert.equal(evidence.verdict.physicalCarrier,'CONDITIONAL');

console.log('PASS 1561: 27 + bar27 is a 54-dimensional ordinary-real E6 carrier passing the audited perturbative/local anomaly checks, but its singlet mass is all-or-nothing, its E6 action/cubic reopen the 10+1 complement, and Hom_E6(27,bar27)=0.  A one-family 351-prime channel supplies one parent invariant coefficient with fixed Clebsch projections; it does not derive a broken-phase portal ray or normalized typed Ward line.');
