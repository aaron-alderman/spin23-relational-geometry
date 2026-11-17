import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const sourcePaths=[
 'corpus/syntheses/grand-synthesis/aarons_spin23_research_thesis.md',
 'corpus/claims/0300-0399/313_the_yukawa_zero_mode_extends_to_a_massless_dirac_type_cone.md',
 'corpus/claims/0300-0399/341_a_phi4_field_generates_the_fredholm_wall_but_the_rp2_selector_requires_a_loop_lift.md',
 'corpus/claims/0300-0399/345_the_full_selector_has_a_four_component_local_clifford_lift_but_needs_eight_for_a_global_aiii_grading.md',
 'corpus/claims/0300-0399/378_correction_ledger_for_selector_index_parity_and_primitive_deck_claims.md',
 'corpus/claims/1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md',
 'corpus/claims/1600-1699/1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md',
 'corpus/claims/1600-1699/1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md',
 'corpus/programmes/frontier/parallel/frontier_parallel_qft_08_action_gate_for_the_dressed_electron_functor.md',
 'evidence/data/t1-t2-action-source-checks-v1.json',
 'scripts/audit-t1-t2-action-mass-gap.mjs'
];
const receipts=JSON.parse(fs.readFileSync(sourcePaths.at(-2),'utf8'));
for(const check of receipts.checks){
 assert.equal(check.exitCode,0);
 sourcePaths.push(check.command.replace(/^node /,''));
}
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const parameters={units:'hbar=c=1',mu:2,lambda:4,Zphi:3,Zpsi:2};
const v=parameters.mu/Math.sqrt(parameters.lambda);
const family=[0,1,2].map(y=>({y,v,restGap:Math.abs(y*v/parameters.Zpsi),
 scalarFrequencySquared:2*parameters.mu**2/parameters.Zphi,
 commonProjectors:true,commonCliffordAlgebra:true,commonScalarVacuum:true,positiveKineticTerms:true}));
assert.equal(family[2].restGap,2*family[1].restGap);
const report={
 schemaVersion:'t1-t2-action-mass-gap-audit-v1',date:'2026-11-08',
 authority:'Bounded corpus-source audit, analytic support identity and classical supplied-action counterfamily. No physical T1/T2 derivation or admission.',
 evidenceFamily:'corpus-selector-action-audit',
 sources:Object.fromEntries([...new Set(sourcePaths)].sort().map(p=>[p,sha(p)])),
 sourceVerificationReceipt:'evidence/data/t1-t2-action-source-checks-v1.json',
 supportDerivation:{
  assumptions:['positive Hilbert space','orthogonal complementary projectors','B Hermitian and purely cross-sector','A=P1-P2'],
  identity:'{A,B}=0; B^2=diag(M M^dagger,M^dagger M)',
  propagationIdentificationDerived:false,
  crossSectorSupportDerivedFromPhysicalAction:false,
  commonSingleGapRequires:'Equal sector dimensions and all singular values of M equal to the same positive Delta',
  finiteUniformRestGap:'sigma_min(M)>0 for equal square sectors',
  rectangularKernelLowerBound:'abs(dim(P1)-dim(P2))'
 },
 classicalUniformActionCounterfamily:{parameters,rows:family,
  fixedNormalization:true,freeDatum:'real Yukawa coefficient y',
  derivation:'v=mu/sqrt(lambda); Delta=abs(y)*v/Zpsi; scalarFrequencySquared=2*mu^2/Zphi',
  conclusion:'Nonzero y and 2y preserve the displayed structural constraints while doubling the gap; y=0 removes mixing.',
  scope:'Uniform classical background. No self-consistent quantum vacuum or T1/T2 intertwiner asserted.'},
 corpusBranches:{
  cliffordSymbol313:'Exact conditional Clifford extension; physical Lorentz/gauge/locality realization remains open.',
  scalarWall341:{profileGeneratedFromScalarEOM:true,yukawaAndVacuumScaleSupplied:true,
   bulkRestGap:'abs(g*v)',fullWallSpectrumHasZeroMode:true,selectorRP2IdentificationEstablished:false},
  selectorLift345:{localDimension:4,ordinaryGlobalGradingDimension:8,physicalExtraFactorIdentified:false,massCoefficientSupplied:true},
  minimalSpin23Action1596:{physicalGravitonHelicities:2,selectorRadialModes:0,additionalMassiveVacuumPoles:0,
   torsionSquareAddsMomentumDependence:false,scope:'Fixed-norm parity-even two-derivative SW/MM action and stated torsion-square deformation.'},
  criticalTorsion1622:{positivePoleFormula:'m^2=A/B with A,B>0',healthyClassicalCriticalSector:true,
   coefficientsSelectedByT1T2:false,identifiedAsT1T2MassMixing:false,radiativeClosureEstablished:false}
 },
 verdict:{anticommutingPhysicalT1T2OperatorsDerived:false,positivePhysicalT1T2RestGapDerived:false,
  gapMagnitudePredictedWithoutFreeCoupling:false,conditionalPositiveGapMechanismsExist:true,
  universalSpin23MassNoGo:false,
  nextDiscriminator:'One joined carrier/source action fixes the principal symbol, pure cross block, normalization, stable vacuum and nonzero singular-value bound; excludes the free Yukawa rescaling.'}
};
const out='evidence/data/t1-t2-action-mass-gap-audit-v1.json';
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({written:out,sourceHashes:Object.keys(report.sources).length,verdict:report.verdict},null,2));
