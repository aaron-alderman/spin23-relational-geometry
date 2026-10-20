import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-e6-bidoublet-inert-alignment-audit.json','utf8'));

assert.equal(evidence.schema,'spin23.e6-bidoublet-inert-alignment-audit/1');

// A determinant-zero 2x2 matrix generically has a mixed null eigenvector.
const A=2,B=3,C=B*B/A;
assert.equal(A*C-B*B,0);
const v=[-B/A,1];
assert.equal(A*v[0]+B*v[1],0);
assert.equal(B*v[0]+C*v[1],0);
assert.notEqual(v[0],0);
assert.equal(evidence.reducedMassMatrix.determinantTuningImpliesInertness,false);

// The pure second-basis vector is an eigenvector exactly when B=0.
const apply=(a,b,c,x)=>[a*x[0]+b*x[1],b*x[0]+c*x[1]];
assert.deepEqual(apply(4,0,7,[0,1]),[0,7]);
assert.notDeepEqual(apply(4,2,7,[0,1]),[0,7]);
assert.equal(evidence.reducedMassMatrix.pureS351EigenvectorIff,'B=0');
assert.equal(evidence.reducedMassMatrix.pureMasslessS351Iff,'B=0 and C=0');

// Explicit Z5 charge witness.
const mod=(x,n)=>((x%n)+n)%n;
const {matter27:f,H27:h,S351:s}=evidence.discreteWitness.charges;
assert.equal(mod(2*f+h,5),0);
assert.equal(mod(2*f+s,5),0);
assert.notEqual(mod(2*h+s,5),0);
assert.equal(evidence.discreteWitness.matterMatterH27,0);
assert.equal(evidence.discreteWitness.matterMatterS351,0);
assert.equal(evidence.discreteWitness.H27H27S351,4);
assert.equal(evidence.discreteWitness.allowsBothYukawas,true);
assert.equal(evidence.discreteWitness.forbidsMixedScalarInvariant,true);

assert.equal(evidence.parentSources.genericMixingGivesAtLeastTwoSourceDirections,true);
assert.equal(evidence.parentSources.oneInvariantRequiresAlphaZero,true);
assert.equal(evidence.sourceBoundedVacuum.knownRealisticConstructionUsesMixedSystem,true);
assert.equal(evidence.sourceBoundedVacuum.protectedInertVacuumInMinimalSystemEstablished,false);
assert.equal(evidence.decision.inertAlignmentAlgebraicallyPossible,true);
assert.equal(evidence.decision.ordinaryDeterminantFineTuningSufficient,false);
assert.equal(evidence.decision.portalWardLineDerived,false);

console.log('PASS 1565: a pure symmetric-parent light bidoublet requires zero 27--351 mixing, not merely determinant tuning; a Z5 witness can forbid the mixed invariant while retaining both Yukawas, but the known minimal realistic E6 vacuum uses the mixed scalar system, so protected complete breaking remains a new construction.');
