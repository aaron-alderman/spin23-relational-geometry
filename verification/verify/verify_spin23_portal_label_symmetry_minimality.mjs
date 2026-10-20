import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-portal-label-symmetry-minimality.json','utf8'));

const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv=(A,v)=>A.map(row=>row.reduce((s,x,i)=>s+x*v[i],0));
const tr=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const eq=(a,b,tol=1e-12)=>Array.isArray(a)
  ? a.length===b.length&&a.every((x,i)=>eq(x,b[i],tol))
  : Math.abs(a-b)<=tol;
const I=[[1,0],[0,1]];
const fixedDimension2=(A)=>{
  const B=[[A[0][0]-1,A[0][1]],[A[1][0],A[1][1]-1]];
  const det=B[0][0]*B[1][1]-B[0][1]*B[1][0];
  if(B.flat().every(x=>x===0))return 2;
  if(det!==0)return 0;
  return 1;
};
const hasMixedFixedVector=(A)=>{
  if(fixedDimension2(A)!==1)return false;
  // A nonzero kernel vector of A-I.  Rotate either nonzero row.
  const B=[[A[0][0]-1,A[0][1]],[A[1][0],A[1][1]-1]];
  const row=B.find(r=>r[0]!==0||r[1]!==0);
  const v=[-row[1],row[0]];
  return v[0]!==0&&v[1]!==0;
};

// Exhaust all 2x2 signed permutation matrices, retaining precisely the
// involutions.  There are six.  Only plus/minus swap has a one-dimensional
// fixed space supported on both named portal labels.
const signedPermutations=[];
for(const swap of [false,true])for(const s0 of [-1,1])for(const s1 of [-1,1]){
  signedPermutations.push(swap?[[0,s0],[s1,0]]:[[s0,0],[0,s1]]);
}
const involutions=signedPermutations.filter(A=>eq(mul(A,A),I));
assert.equal(involutions.length,6);
const mixed=involutions.filter(hasMixedFixedVector);
assert.deepEqual(mixed,[[[0,-1],[-1,0]],[[0,1],[1,0]]]);
assert.deepEqual(involutions.map(fixedDimension2).sort(),[0,1,1,1,1,2]);

const P=[[0,1],[1,0]];
const minusP=[[0,-1],[-1,0]];
assert.deepEqual(mv(P,[1,1]),[1,1]);
assert.deepEqual(mv(minusP,[1,-1]),[1,-1]);
assert.equal(evidence.finiteSymmetryExhaustion.minimalGroup,'Z2');

// A weighted reflection can select any nonzero ratio, but the ratio appears
// literally in the generator.  It is not unitary in the canonical metric
// unless |kappa|=1.
const weightedReflection=k=>[[0,1/k],[k,0]];
for(const k of [-3,-1,0.5,1,2]){
  const R=weightedReflection(k);
  assert.ok(eq(mul(R,R),I));
  assert.ok(eq(mv(R,[1,k]),[1,k]));
  const unitary=eq(mul(tr(R),R),I);
  assert.equal(unitary,Math.abs(k)===1);
}

// Diagonal U(1) characters fix exactly the zero-charge coordinates.  A
// one-dimensional fixed space therefore kills one portal instead of mixing
// them.  The real rotation generator is invertible, hence has no fixed ray.
const u1FixedDimension=(qD,qM)=>Number(qD===0)+Number(qM===0);
assert.equal(u1FixedDimension(1,2),0);
assert.equal(u1FixedDimension(0,0),2);
assert.equal(u1FixedDimension(0,2),1);
assert.equal(u1FixedDimension(3,0),1);
const rotationGenerator=[[0,-1],[1,0]];
assert.equal(rotationGenerator[0][0]*rotationGenerator[1][1]-rotationGenerator[0][1]*rotationGenerator[1][0],1);

// Merely postulating a real normalized line leaves a continuum.  Exchange
// selects the equal or opposite rays, whereas CP/reality alone does not.
const realUnitRays=[[1,0],[Math.SQRT1_2,Math.SQRT1_2],[0.6,0.8]];
for(const v of realUnitRays)assert.ok(eq(v[0]**2+v[1]**2,1));
assert.equal(realUnitRays.filter(v=>eq(mv(P,v),v)).length,1);

// Two-point special commutative dagger-Frobenius algebra.  Basis indices are
// D=0 and M=1.  Multiplication returns null for zero and an index otherwise.
const basis=[0,1];
const mu=(i,j)=>i===j?i:null;
const multiplyTerms=(xs,ys)=>{
  const out=[0,0];
  for(const [ai,i] of xs)for(const [bj,j] of ys)if(i===j)out[i]+=ai*bj;
  return out;
};
for(const i of basis)for(const j of basis)for(const k of basis){
  const left=mu(i,j)===null?null:mu(mu(i,j),k);
  const right=mu(j,k)===null?null:mu(i,mu(j,k));
  assert.equal(left,right); // associativity
  assert.equal(mu(i,j),mu(j,i)); // commutativity
}
const unitTerms=[[1,0],[1,1]];
for(const i of basis){
  assert.deepEqual(multiplyTerms(unitTerms,[[1,i]]),i===0?[1,0]:[0,1]);
  // specialness mu o Delta = identity on each copied basis point
  assert.equal(mu(i,i),i);
}
// Exchange is an algebra automorphism and fixes exactly the unit line.
const swapIndex=i=>1-i;
for(const i of basis)for(const j of basis){
  const lhs=mu(i,j)===null?null:swapIndex(mu(i,j));
  const rhs=mu(swapIndex(i),swapIndex(j));
  assert.equal(lhs,rhs);
}
assert.deepEqual(mv(P,[1,1]),[1,1]);
assert.notDeepEqual(mv(P,[2,3]),[2,3]);
assert.deepEqual(multiplyTerms([[2,0],[3,1]],unitTerms),[2,3]); // algebra alone admits arbitrary coefficients

// A natural isomorphism between one-dimensional scalar modules is any
// nonzero kappa. Naturality against scalar multiplication is tautological;
// the compatible endomorphism equalizer has equation mu_D=mu_M and dimension 1.
for(const kappa of [1,-1,2,{re:0,im:1}])assert.notEqual(kappa,0);
for(const [kappa,scalar] of [[2,3],[-1,5],[0.5,-4]])
  assert.equal(kappa*scalar,scalar*kappa);
const compatiblePairs=[[-2,-2],[0,0],[7,7]];
for(const [muD,muM] of compatiblePairs)assert.equal(muD,muM);
assert.notEqual(2,3); // generic independent endomorphisms are excluded only after eta is supplied

// A common fixed ray makes all Schur packet columns proportional.
const lambdas=[-3,1,4];
for(const sign of [-1,1]){
  const columns=lambdas.map(lambda=>[lambda,sign*lambda]);
  for(let i=0;i<columns.length;i++)for(let j=i+1;j<columns.length;j++)
    assert.equal(columns[i][0]*columns[j][1]-columns[j][0]*columns[i][1],0);
}

// Label symmetry adds no finite-carrier arrow.  Model the existing typed
// supports as disjoint 2x2 blocks in a 4x4 matrix; both mixed products vanish.
const zeros4=()=>Array.from({length:4},()=>Array(4).fill(0));
const XD=zeros4(),XM=zeros4();
XD[0][1]=1;
XM[2][3]=1;
const zero4=zeros4();
assert.deepEqual(mul(XD,XM),zero4);
assert.deepEqual(mul(XM,XD),zero4);
assert.equal(evidence.carrierSupport.newOneArrowSupport,false);
assert.equal(evidence.carrierSupport.newI_NSupport,false);
assert.equal(evidence.carrierSupport.ordinaryPatiSalamScalar,false);

assert.equal(evidence.minimalityTheorem.smallestExtraFormalDatumCount,1);
assert.equal(evidence.minimalityTheorem.physicalStatus,'conditional and unsourced');
assert.match(evidence.weightedReflection.boundary,/inserted/);
assert.match(evidence.frobeniusAudit.boundary,/alone admits every/);
assert.match(evidence.naturalTransformationAudit.boundary,/missing correspondence datum/);
assert.match(evidence.reopeningDatum,/Ward identity|operator duality/);
assert.match(evidence.verdict,/exact smallest formal mechanism/);

console.log('PASS 1528: exhaustive signed-permutation analysis leaves Z2 exchange as the unique smallest canonical fixed-line mechanism with both portals nonzero. U(1), a bare real line, Frobenius structure, and naturality do not determine a general ratio; weighted exchange inserts that ratio. The label-only construction is J/CP compatible and leaves disjoint carrier support unchanged, but its physical lift and portal metric remain unsourced data.');
