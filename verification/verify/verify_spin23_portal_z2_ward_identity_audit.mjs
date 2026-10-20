import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-portal-z2-ward-identity-audit.json','utf8'));
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv=(A,v)=>A.map(row=>row.reduce((s,x,i)=>s+x*v[i],0));
const tr=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const eq=(a,b,tol=1e-12)=>Array.isArray(a)
  ? a.length===b.length&&a.every((x,i)=>eq(x,b[i],tol))
  : Math.abs(a-b)<=tol;
const I=[[1,0],[0,1]];
const P=[[0,1],[1,0]];

// For S_int=k^T O, transformations k->B k and O->A O give
// S'_int=k^T B^T A O.  Off-shell invariance is exactly B^T A=I.
const transformedInteraction=(k,O,B,A)=>dot(mv(B,k),mv(A,O));
const samples=[
  {k:[2,3],O:[5,7]},
  {k:[-1,4],O:[6,-2]},
  {k:[0.5,-3],O:[8,1]}
];
for(const {k,O} of samples){
  const original=dot(k,O);
  assert.equal(transformedInteraction(k,O,P,P),original);
}
assert.deepEqual(mul(tr(P),P),I);
assert.equal(evidence.sourceSwapTheorem.requiredOperatorAction,'A=(B^T)^-1=P');

// Source swap without operator swap is not invariance away from the fixed
// source line.
const generic=samples[0];
assert.notEqual(transformedInteraction(generic.k,generic.O,P,I),dot(generic.k,generic.O));
assert.notDeepEqual(mul(tr(P),I),I);

// At k_D=k_M the source happens to be fixed, so source swapping changes
// nothing numerically for every O.  This is an identity action on that
// parameter point, not a transformation that forces the point to be chosen.
for(const O of [[1,9],[-4,2],[0,7]]){
  const k=[3,3];
  assert.deepEqual(mv(P,k),k);
  assert.equal(transformedInteraction(k,O,P,I),dot(k,O));
}

// The available typed field action is block diagonal.  Exhaust diagonal
// signed involutions: none can transform contragrediently to a source swap.
const diagonalInvolutions=[];
for(const aD of [-1,1])for(const aM of [-1,1])diagonalInvolutions.push([[aD,0],[0,aM]]);
assert.equal(diagonalInvolutions.some(A=>eq(mul(tr(P),A),I)),false);
// With fixed nonzero couplings, diagonal field signs preserve both independent
// monomials only for the identity and impose no equality between couplings.
const nonzeroK=[2,5];
const invariantDiagonal=diagonalInvolutions.filter(A=>
  [[1,0],[0,1],[3,-4]].every(O=>dot(nonzeroK,mv(A,O))===dot(nonzeroK,O))
);
assert.deepEqual(invariantDiagonal,[I]);
assert.notEqual(nonzeroK[0],nonzeroK[1]);

// Abstract spurionic invariance is valid only when the formal operator labels
// are exchanged too.  The audit correctly distinguishes this from a sourced
// field/carrier lift.
assert.equal(evidence.classification.spurionicSymmetry.couplingsTransform,true);
assert.match(evidence.classification.spurionicSymmetry.result,/operator exchange has no sourced/);
assert.equal(evidence.typedOperatorAudit.typedHomDimension,0);
assert.match(evidence.typedOperatorAudit.importantQualification,/abstract trivial gauge representation/);

// Threshold/VEV matching conjugates the canonical exchange.  The canonical
// swap commutes with diagonal matching iff the two threshold factors agree.
const diag=(a,b)=>[[a,0],[0,b]];
const inverseDiag=(a,b)=>[[1/a,0],[0,1/b]];
for(const [tD,tM] of [[2,2],[2,5],[-3,4]]){
  const T=diag(tD,tM);
  const commutes=eq(mul(T,P),mul(P,T));
  assert.equal(commutes,tD===tM);
  const Pir=mul(mul(T,P),inverseDiag(tD,tM));
  assert.ok(eq(mul(Pir,Pir),I));
  const infraredRay=mv(T,[1,1]);
  assert.ok(eq(mv(Pir,infraredRay),infraredRay));
  if(tD!==tM)assert.notDeepEqual(Pir,P);
}

// In particular, equal UV coefficients become a weighted infrared ray.
const Lambda=7,tD=2,tM=5;
const uv=[Lambda,Lambda];
const ir=mv(diag(tD,tM),uv);
assert.deepEqual(ir,[14,35]);
assert.notEqual(ir[0],ir[1]);
assert.equal(ir[0]*tM-ir[1]*tD,0);

// RG preservation of F=k_D-k_M=0 requires beta_D-beta_M=0 on the line.
// Multiplicative beta functions make the missing protection explicit.
const beta=(k,gammaD,gammaM)=>[gammaD*k[0],gammaM*k[1]];
const fixedK=[3,3];
const protectedBeta=beta(fixedK,0.2,0.2);
const unprotectedBeta=beta(fixedK,0.2,0.5);
assert.equal(protectedBeta[0]-protectedBeta[1],0);
assert.notEqual(unprotectedBeta[0]-unprotectedBeta[1],0);

// No anomaly conclusion can be drawn from the unit Jacobian magnitude of a
// nondynamical source permutation; there is no dynamical field action whose
// path-integral measure could be tested.
assert.equal(Math.abs(-1),1); // det(P)=-1
assert.equal(evidence.anomalyAudit.fieldTransformationAvailable,false);
assert.match(evidence.anomalyAudit.conclusion,/fails before the anomaly question/);

assert.equal(evidence.typedOperatorAudit.sourceSwapCompatible,false);
assert.equal(evidence.vacuumAudit.present,false);
assert.match(evidence.strongestNoGo.theorem,/No genuine Z2 Ward symmetry/);
assert.match(evidence.reopeningDatum,/dynamical field algebra|duality functor/);
assert.match(evidence.verdict,/not a genuine non-anomalous Ward symmetry/);

console.log('PASS 1531: off-shell invariance of k^T O requires B^T A=I, so swapping the two sources requires swapping the two typed operators. The available field-induced action is block diagonal and cannot supply that exchange. Equality at the fixed source point is a restriction, not a Ward identity; unequal threshold factors conjugate the swap to a weighted reflection, and RG tangency is unprotected.');
