import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const receiptPath='evidence/data/yukawa-vacuum-source-checks-v1.json';
const receipt=JSON.parse(fs.readFileSync(receiptPath,'utf8'));
const paths=[receiptPath,'scripts/audit-yukawa-vacuum-scale-selection.mjs',
 'corpus/claims/1100-1199/1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md',
 'corpus/claims/1500-1599/1542_the_six_link_potential_has_no_forced_goldstone_and_an_open_full_rank_vacuum_but_scalar_identification_does_not_derive_the_common_ray.md',
 'corpus/claims/1500-1599/1573_a_single_tilted_Yukawa_ray_rotates_the_two_copy_inert_projector_but_a_two_ray_tight_frame_can_close_it.md',
 'corpus/claims/1500-1599/1530_the_common_coefficient_line_is_RG_invariant_only_under_universal_projective_flow_and_a_fixed_ratio_requires_a_Ward_eigenline.md',
 'corpus/claims/1600-1699/1612_a_radiative_selector_portal_joins_spin23_planck_and_yang_mills_scales_but_retains_one_color_boundary.md',
 'corpus/programmes/frontier/parallel/frontier_parallel_qft_08_action_gate_for_the_dressed_electron_functor.md',
 'evidence/data/spin23-radiative-selector-portal-construction.json'];
for(const check of receipt.checks){assert.equal(check.exitCode,0);paths.push(check.command.replace(/^node /,''));}
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function spectral(s,coefficients={a:1,b:1,k:1,Lambda:1}){
 const {a,b,k,Lambda}=coefficients;
 assert(s.some(x=>x>0)&&s.every(x=>x>=0));
 assert([a,b,k,Lambda].every(x=>x>0));
 const Z=s.reduce((q,x)=>q+x*x,0),W=s.reduce((q,x)=>q+x**4,0);
 const u0=Math.sqrt(a*Lambda**2*Z/(b*W));
 return {singularValues:s,coefficients,Z,W,r:s.map(x=>x*x/Z),rho:W/Z**2,u0,
  canonicalV:Math.sqrt(k*Z)*u0,canonicalYukawas:s.map(x=>x/Math.sqrt(k*Z)),
  gaps:s.map(x=>x*u0),minimumGap:Math.min(...s)*u0};
}
const gwSource=JSON.parse(fs.readFileSync('evidence/data/spin23-radiative-selector-portal-construction.json','utf8'));
const inp=gwSource.benchmarkInputs;
const q=inp.lambdaPortal/(2*inp.lambdaS),nChi2=1/(1+q),nS2=q/(1+q);
const kX=inp.gX**2*nS2,kH=inp.lambdaPortal,kT=inp.kappa*nChi2/2,dT=6*inp.numberColorTriplets;
const divisor=64*Math.PI**2;
const B=(3*kX**2+kH**2+dT*kT**2)/divisor;
const A=(3*kX**2*(Math.log(kX)-5/6)+kH**2*(Math.log(kH)-1.5)+dT*kT**2*(Math.log(kT)-1.5))/divisor;
const ratio=Math.exp(-.25-A/(2*B));
assert(Math.abs(ratio/gwSource.oneLoopPotential.vOverMuGW-1)<1e-12);
const report={
 schemaVersion:'yukawa-vacuum-scale-selection-v1',date:'2026-11-08',
 authority:'Conditional trace-linked action comparison and bounded corpus audit. No physical T1/T2 mass prediction or scientific admission.',
 evidenceFamily:'corpus-selector-action-audit',
 sources:Object.fromEntries([...new Set(paths)].sort().map(p=>[p,sha(p)])),
 sourceVerificationReceipt:receiptPath,
 traceCompletion:{
  status:'New declared comparison using claim 1110 trace invariants; quadratic term and full physical matching are not derived there.',
  assumptions:['one real scalar coordinate u','canonical fermions with mass block u C',
   'kinetic coefficient k Tr(C^dagger C)','potential -a Lambda^2 Z u^2/2+b W u^4/4',
   'positive a,b,k,Lambda','no independent extra scalar invariants'],
  formulas:{gSquared:'r_i/k',vSquared:'(a/b) k Lambda^2/rho',gapSquared:'(a/b) Lambda^2 r_i/rho'},
  commonAmplitudeFamily:[.25,1,3].map(t=>({t,...spectral([t,2*t])})),
  interpretation:'C->t C can be absorbed by u->u/t. Canonical invariance removes a coordinate redundancy, not by itself a dynamical coupling selection.',
  shapeFamily:[spectral([Math.sqrt(.5),Math.sqrt(.5)]),spectral([Math.sqrt(.8),Math.sqrt(.2)])],
  coefficientAndScaleFamily:[spectral([1]),spectral([1],{a:2,b:1,k:1,Lambda:1}),spectral([1],{a:1,b:1,k:1,Lambda:2})],
  rankOneTwoDimensionalExample:spectral([1,0])
 },
 radiativePortal:{
  A,B,nChiSquared:nChi2,vOverMuGW:ratio,
  boundaryScaleFamily:[1,2].map(muGW=>({muGW,v:muGW*ratio,scalonMass:Math.sqrt(8*B)*muGW*ratio})),
  cartanCoupling:Math.sqrt(B/(6*inp.xi*nChi2**2)),
  cartanCouplingIdentifiedAsFermionYukawa:false,
  scope:'One-loop bosonic benchmark of claim 1612. Scaling muGW compares distinct dimensional boundary data, not a scale change on the same RG trajectory.',
  addingYukawaMatterRequiresNewLoopPotential:true
 },
 verdict:{
  commonBareAmplitudeCancelsInDeclaredTraceCompletion:true,
  cancellationIsPhysicalT1T2Derivation:false,
  singularValueShapeSelectedByInspectedConstraints:false,
  normalizedPhysicalYukawaAndVacuumScaleFixed:false,
  physicalGapOrIndependentMassRatioPredicted:false,
  independentYukawaCounterfamilyAppliesToEveryCommonAction:false,
  nextDiscriminator:'Derive one physical trace/source action and its relative coefficients; select the finite-operator shape and RG boundary, then predict Delta/Mref with threshold and counterterm control.'
 }
};
const out='evidence/data/yukawa-vacuum-scale-selection-v1.json';
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({written:out,sourceHashes:Object.keys(report.sources).length,verdict:report.verdict},null,2));
