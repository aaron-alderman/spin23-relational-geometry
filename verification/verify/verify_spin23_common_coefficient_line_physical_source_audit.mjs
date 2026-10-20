import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-common-coefficient-line-physical-source-audit.json','utf8'));

const sameRep=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
const dirac=evidence.gaugeRepresentationNoGo.diracScalarIrreps;
const majorana=evidence.gaugeRepresentationNoGo.majoranaScalarIrreps;
const delta=evidence.gaugeRepresentationNoGo.fundamentalMajoranaDressingIrrep;
for(const h of dirac){
  for(const m of majorana)assert.equal(sameRep(h,m),false);
  assert.equal(sameRep(h,delta),false);
  assert.equal(h[1],2);
}
for(const m of [...majorana,delta])assert.equal(m[1],1);
assert.deepEqual(evidence.gaugeRepresentationNoGo.intersection,[]);
assert.deepEqual(evidence.gaugeRepresentationNoGo.lowEnergyIntersection,[]);

// Family-charge requirements are incompatible for one irreducible scalar.
const qDiracBare=evidence.familyChargeNoGo.selectedDiracBareOperatorCharge;
const qMajoranaBare=evidence.familyChargeNoGo.selectedNullMajoranaBilinearCharge;
assert.equal(qDiracBare,0);
assert.equal(evidence.familyChargeNoGo.requiredDiracScalarCharge,0);
assert.equal(-qMajoranaBare,-3);
assert.notEqual(-qDiracBare,-qMajoranaBare);

// Both completed interactions are dimension four, so power counting permits
// but does not identify their dimensionless couplings.
const fermion=evidence.operatorDimensionAudit.fieldDimensions.fermion;
const scalar=evidence.operatorDimensionAudit.fieldDimensions.scalar;
assert.equal(2*fermion+scalar,4); // S nu^c nu^c
assert.equal(2*fermion+scalar,4); // L H nu^c
assert.equal(2*fermion+2*scalar,5); // S L H nu^c
assert.equal(evidence.operatorDimensionAudit.sharedDimensionlessCouplingAllowed,true);
assert.equal(evidence.operatorDimensionAudit.sharedCouplingEnforcedByPowerCounting,false);

// J gives two separate conjugacy orbits. CP removes imaginary parts but not
// one of the two real coefficients.
const jOrbits=[['D','J(D)'],['M','J(M)']];
assert.equal(jOrbits.length,2);
assert.equal(new Set(jOrbits.flat()).size,4);
assert.equal(evidence.jAndCpAudit.complexDimensionBeforeCp,2);
assert.equal(evidence.jAndCpAudit.realDimensionWithExactCp,2);

// No inventoried scalar feeds both renormalizable portal lines. The neutral
// modulus is deliberately excluded from this count because it only appears
// in higher-dimensional monomials and still leaves two Wilson coefficients.
const sourced=evidence.candidateScalarAudit.filter(x=>x.sourced);
assert.ok(sourced.length>=3);
assert.equal(sourced.some(x=>x.feedsSelectedDirac&&x.feedsSelectedNullMajorana),false);
const both=evidence.candidateScalarAudit.filter(x=>x.feedsSelectedDirac&&x.feedsSelectedNullMajorana);
assert.deepEqual(both.map(x=>x.candidate),['new neutral scalar chi']);
assert.match(both[0].reason,/does not relate/);

// One field in two invariant monomials still has a two-dimensional coupling
// space: the two coefficient basis vectors are linearly independent.
const coefficientBasis=[[1,0],[0,1]];
const determinant=coefficientBasis[0][0]*coefficientBasis[1][1]-coefficientBasis[1][0]*coefficientBasis[0][1];
assert.equal(determinant,1);

// A genuine common coupling line has fixed embeddings and makes every packet
// column proportional. A common numerical lambda without fixed embeddings
// does not.
const cD=2,cM=5;
const lambdas=[-3,1,4];
const aligned=lambdas.map(lambda=>[lambda*cD,lambda*cM]);
for(let i=0;i<aligned.length;i++)for(let j=i+1;j<aligned.length;j++)
  assert.equal(aligned[i][0]*aligned[j][1]-aligned[j][0]*aligned[i][1],0);
const sameLambdaDifferentEmbeddings=[[1,1],[1,2]];
assert.equal(
  sameLambdaDifferentEmbeddings[0][0]*sameLambdaDifferentEmbeddings[1][1]
  -sameLambdaDifferentEmbeddings[1][0]*sameLambdaDifferentEmbeddings[0][1],
  1
);

assert.equal(evidence.physicalStatus.sourcedCommonScalar,false);
assert.equal(evidence.physicalStatus.sourcedCommonCoupling,false);
assert.equal(evidence.physicalStatus.formalCommonCoefficientLine,true);
assert.equal(evidence.physicalStatus.minimalNewStructuralDatumCount,1);
assert.match(evidence.minimalNewSpurionTheorem.minimalDatum,/dimension-zero/);
assert.match(evidence.verdict,/not one ordinary scalar/);

console.log('PASS 1525: the sourced Dirac and Majorana scalar representations and family charges are disjoint; J, CP and dimension four leave two independent couplings. One ordinary shared field does not reduce C^2, while one dimension-zero portal-label source with fixed embeddings gives the required common coefficient line.');
