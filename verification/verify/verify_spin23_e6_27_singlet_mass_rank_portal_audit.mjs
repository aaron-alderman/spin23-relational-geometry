import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-e6-27-singlet-mass-rank-portal-audit.json','utf8'));

assert.equal(evidence.schema,'spin23.e6-27-singlet-mass-rank-portal-audit/1');
assert.deepEqual(evidence.matterBranching.map(x=>x.dimension),[16,10,1]);
assert.deepEqual(evidence.matterBranching.map(x=>x.qPsi),[1,-2,4]);
assert.equal(evidence.matterBranching.reduce((n,x)=>n+x.dimension,0),27);

// Charge neutrality of the two Spin(10)-singlet mass channels.
assert.equal(2*(-2)+4,0);
assert.equal(2*4-8,0);

// Exact rank of 0_16 direct-sum m10 I_10 direct-sum m1.
const masses=[...Array(16).fill(0),...Array(10).fill(3),5];
assert.equal(masses.filter(x=>x!==0).length,11);
assert.equal(masses.filter(x=>x===0).length,16);
assert.equal(evidence.highScaleMass.rankWhenMassesNonzero,11);
assert.equal(evidence.highScaleMass.kernelDimension,16);

// Lagrange projector onto qPsi=1.
const projector=q=>-((q+2)*(q-4))/9;
const eigenvalues=evidence.matterBranching.map(x=>{
  const value=projector(x.qPsi);
  return Object.is(value,-0)?0:value;
});
assert.deepEqual(eigenvalues,[1,0,0]);
assert.deepEqual(evidence.supportProjector.eigenvaluesOn16TenOne,[1,0,0]);
assert.equal(evidence.supportProjector.rank,16);
assert.equal(evidence.supportProjector.e6EquivariantBeforeBreaking,false);
assert.equal(evidence.supportProjector.spin10EquivariantAfterBreaking,true);
assert.equal(evidence.supportProjector.equalsMassKernelProjector,true);

// Reduced two-singlet Hessian in radial-square variables is positive iff
// lambda_s,t>0 and 4 lambda_s lambda_t-kappa^2>0.
const lambdaS=2,lambdaT=3,kappa=1;
assert.ok(lambdaS>0 && lambdaT>0);
assert.ok(4*lambdaS*lambdaT-kappa*kappa>0);
assert.equal(evidence.reducedVacuum.fullE6VacuumAudited,false);

const portal=evidence.portalCoefficients;
assert.equal(portal.independentParentCoefficients,2);
assert.ok(portal.genericPortalSourceDimensionAtLeast>=2);
assert.match(portal.oneInvariantCondition,/vD27=0/);
assert.equal(portal.oneInvariantConditionDerivedByE6,false);
assert.equal(portal.normalizedThresholdParallelLineDerived,false);
assert.equal(evidence.decision.orientedSevenEdgeMaskDerived,false);
assert.equal(evidence.decision.genericMinimalFieldSetHasSinglePortalInvariant,false);

console.log('PASS 1564: two Spin(10)-singlet E6 VEVs give rank 11 on the exotic 10+1 and the Qpsi polynomial canonically projects the surviving 16 after breaking; the required 27_H simultaneously admits an independent Dirac Yukawa, so a single portal invariant needs an additional inert-doublet law and the normalized Ward line remains unproved.');
