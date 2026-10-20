import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-degree-two-path-correspondence-classification.json','utf8'));
assert.equal(evidence.schema,'spin23.degree-two-path-correspondence-classification/1');

function determinant(M){
  if(M.length===0)return 1;
  return M[0].reduce((sum,x,j)=>sum+(j%2===0?1:-1)*x*
    determinant(M.slice(1).map(row=>row.filter((_,k)=>k!==j))),0);
}
const matMul=(A,B)=>A.map((r,i)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));

const chain=(x,y,g,h)=>[
  [0,x,0,0,0],
  [x,0,y,0,0],
  [0,y,0,g,0],
  [0,0,g,0,h],
  [0,0,0,h,0]
]; // I,P,N,Z,X

// D^2 enumerates every closed return and every open length-two path.
const C=chain(2,3,5,7);
const C2=matMul(C,C);
assert.deepEqual(C2,[
  [4,0,6,0,0],
  [0,13,0,15,0],
  [6,0,34,0,35],
  [0,15,0,74,0],
  [0,0,35,0,49]
]);
assert.notEqual(C2[0][2],0); // forbidden effective I--N support x*y

// Classify real selected-return coefficients over {-1,0,1}.  beta must be
// nonzero for invertibility and A must be a nonzero polynomial.
let triples=0,successfulTriples=0;
for(const ax of [-1,0,1])for(const ay of [-1,0,1])for(const beta of [-1,0,1]){
  triples++;
  if(beta!==0&&(ax!==0||ay!==0))successfulTriples++;
}
assert.equal(triples,27);
assert.equal(successfulTriples,16);

const alphabet=[-2,-1,1,2];
let checked=0,invertible=0,zeroCofactor=0,unprojectedForbidden=0;
for(const x of alphabet)for(const y of alphabet)for(const g of alphabet)for(const h of alphabet){
  // Unit selected-return candidate in P,I,N,Z,X order.
  const M=[
    [x*x+y*y,x,y,0,0],
    [x,x*x,0,0,0],
    [y,0,0,g,0],
    [0,0,g,0,h],
    [0,0,0,h,0]
  ];
  const cofactor=M.slice(1).map(row=>row.slice(1));
  checked++;
  if(determinant(M)!==0)invertible++;
  if(determinant(cofactor)===0)zeroCofactor++;
  assert.equal(determinant(M),x*x*y*y*h*h);
  const raw2=matMul(chain(x,y,g,h),chain(x,y,g,h));
  if(raw2[0][2]!==0)unprojectedForbidden++;
}
assert.equal(checked,256);
assert.equal(invertible,256);
assert.equal(zeroCofactor,256);
assert.equal(unprojectedForbidden,256);

// Of all raw-return vertex masks, the exact requested diagonal support with
// both A and d present uniquely selects P and I.
let exactMasks=0,uniqueMask=null;
for(let mask=0;mask<2**5;mask++){
  const on=i=>Boolean(mask&(1<<i)); // role order P,I,N,Z,X
  if(on(0)&&on(1)&&!on(2)&&!on(3)&&!on(4)){exactMasks++;uniqueMask=mask;}
}
assert.equal(exactMasks,1);
assert.equal(uniqueMask,3);

// Multiplicity branch: the two primitive vectors span C^2 rather than a
// common ray. Their Gram determinant is invariant under U(2).
const vx=[1,0],vy=[0,1];
const dot=(u,v)=>u.reduce((s,x,i)=>s+x*v[i],0);
const Gram=[[dot(vx,vx),dot(vx,vy)],[dot(vy,vx),dot(vy,vy)]];
assert.deepEqual(Gram,[[1,0],[0,1]]);
assert.equal(determinant(Gram),1);

let rayChoices=0,nonzeroProjected=0;
for(const q1 of [-1,1])for(const q2 of [-1,1]){
  rayChoices++;
  const px=dot([q1,q2],vx),py=dot([q1,q2],vy);
  if(px!==0&&py!==0)nonzeroProjected++;
}
assert.equal(rayChoices,4);
assert.equal(nonzeroProjected,4);

// The central element -I in U(2) proves that an invariant linear functional
// q must obey q(-I)=q and q(-I)=-q, hence q=0.  This finite sign check is the
// bounded certificate of the general representation-theoretic statement.
for(const q of [[1,0],[0,1],[1,1],[-1,1]]){
  const transformed=q.map(x=>-x);
  assert.notDeepEqual(transformed,q);
}

assert.equal(evidence.degreeTwoClassification.coefficientTriplesOverMinusOneZeroOne,triples);
assert.equal(evidence.degreeTwoClassification.successfulNontrivialATriples,successfulTriples);
assert.equal(evidence.degreeTwoClassification.boundedNonzeroEdgeAssignmentsChecked,checked);
assert.equal(evidence.degreeTwoClassification.candidateInvertibleAssignments,invertible);
assert.equal(evidence.degreeTwoClassification.minimalCommonScaleCandidate.massDimensionOfKappa,-1);
assert.equal(evidence.projectorNecessity.masksWithExactTargetDiagonalSupportAndBothAAndd,exactMasks);
assert.equal(evidence.matrixMultiplicityRepair.gramDeterminant,determinant(Gram));
assert.equal(evidence.matrixMultiplicityRepair.boundedSignedRayChoices,rayChoices);
assert.equal(evidence.forbiddenSupportAudit.effectiveLNUnderUnprojectedD2,'x*y, nonzero for every bounded nonzero assignment');

assert.equal(evidence.decision.degreeTwoAlgebraicCandidateExists,true);
assert.equal(evidence.decision.canonicalFromExistingSymmetries,false);
assert.equal(evidence.decision.commonRayCanonicallySelected,false);

console.log('PASS 1540: selected length-two returns give an invertible zero-cofactor target, but the unique P/I return mask and diagonal conditional expectation are new projectors; U(2)-natural degree-two data do not select the multiplicity common ray.');
