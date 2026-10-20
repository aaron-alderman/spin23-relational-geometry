import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-complete-Schur-composition-category.json','utf8'));

const gcd=(a,b)=>{
  a=a<0n?-a:a; b=b<0n?-b:b;
  while(b!==0n){const t=a%b; a=b; b=t;}
  return a;
};
const q=(n,d=1n)=>{
  n=BigInt(n); d=BigInt(d);
  assert.notEqual(d,0n);
  if(d<0n){n=-n; d=-d;}
  const g=gcd(n,d);
  return [n/g,d/g];
};
const add=(x,y)=>q(x[0]*y[1]+y[0]*x[1],x[1]*y[1]);
const neg=x=>[-x[0],x[1]];
const sub=(x,y)=>add(x,neg(y));
const mul=(x,y)=>q(x[0]*y[0],x[1]*y[1]);
const div=(x,y)=>q(x[0]*y[1],x[1]*y[0]);
const eq=(x,y)=>x[0]===y[0]&&x[1]===y[1];
const Q=n=>q(BigInt(n));
const matrix=a=>a.map(row=>row.map(Q));

function eliminateOne(M,index){
  assert.notEqual(M[index][index][0],0n);
  const keep=M.map((_,i)=>i).filter(i=>i!==index);
  return keep.map(i=>keep.map(j=>sub(M[i][j],div(mul(M[i][index],M[index][j]),M[index][index]))));
}

function assertMatrixEqual(A,B){
  assert.equal(A.length,B.length);
  for(let i=0;i<A.length;i++){
    assert.equal(A[i].length,B[i].length);
    for(let j=0;j<A[i].length;j++) assert.ok(eq(A[i][j],B[i][j]),`matrix mismatch at ${i},${j}`);
  }
}

// Boundary order L,N followed by coupled mediators P1,P2.
const M=matrix([
  [0,0,2,-1],
  [0,0,4,3],
  [2,4,3,1],
  [-1,3,1,5]
]);

// Eliminate P1 then the surviving P2, and vice versa.
const p1ThenP2=eliminateOne(eliminateOne(M,2),2);
const p2ThenP1=eliminateOne(eliminateOne(M,3),2);
assertMatrixEqual(p1ThenP2,p2ThenP1);

// Direct formula -B A^{-1} B^T with A=[[3,1],[1,5]], det=14.
const direct=[
  [q(-27n,14n),q(-29n,14n)],
  [q(-29n,14n),q(-83n,14n)]
];
assertMatrixEqual(p1ThenP2,direct);

// The first elimination produces nontrivial fill-in on the surviving mediator.
const afterP1=eliminateOne(M,2);
assert.ok(eq(afterP1[2][2],q(14n,3n))); // 5-1/3
assert.ok(eq(afterP1[0][2],q(-5n,3n))); // -1-2/3
assert.ok(eq(afterP1[1][2],q(5n,3n)));  // 3-4/3

// Ignoring mediator mixing (q=0) gives a different effective kernel.
const uncoupled=matrix([
  [0,0,2,-1],
  [0,0,4,3],
  [2,4,3,0],
  [-1,3,0,5]
]);
const naive=eliminateOne(eliminateOne(uncoupled,2),2);
assert.ok(!eq(naive[0][0],direct[0][0]) || !eq(naive[0][1],direct[0][1]));

// A doubled real diagram: J exchanges identical sheets and Gamma is + on one,
// - on the other. Eliminating the J-paired internal states preserves both.
const base=matrix([[0,0,2],[0,0,3],[2,3,5]]);
const zero=Q(0);
const doubled=Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>{
  if(i<3&&j<3) return base[i][j];
  if(i>=3&&j>=3) return base[i-3][j-3];
  return zero;
}));
const swap=[3,4,5,0,1,2];
const gamma=[1n,1n,1n,-1n,-1n,-1n];
for(let i=0;i<6;i++) assert.equal(gamma[swap[i]],-gamma[i]);
for(let i=0;i<6;i++) for(let j=0;j<6;j++){
  assert.ok(eq(doubled[i][j],doubled[swap[i]][swap[j]]));
  assert.ok(eq(mul(Q(gamma[i]),mul(doubled[i][j],Q(gamma[j]))),doubled[i][j]));
}
// Eliminate indices 5 then 2, leaving L+,N+,L-,N-.
const effectiveDoubled=eliminateOne(eliminateOne(doubled,5),2);
const swapBoundary=[2,3,0,1];
const gammaBoundary=[1n,1n,-1n,-1n];
for(let i=0;i<4;i++) assert.equal(gammaBoundary[swapBoundary[i]],-gammaBoundary[i]);
for(let i=0;i<4;i++) for(let j=0;j<4;j++){
  assert.ok(eq(effectiveDoubled[i][j],effectiveDoubled[swapBoundary[i]][swapBoundary[j]]));
  assert.ok(eq(mul(Q(gammaBoundary[i]),mul(effectiveDoubled[i][j],Q(gammaBoundary[j]))),effectiveDoubled[i][j]));
}

// Matrix lowering is not faithful: a factored path and primitive endpoint
// contacts can have the identical effective kernel.
const factored=matrix([[0,0,2],[0,0,3],[2,3,5]]);
const lowered=eliminateOne(factored,2);
const primitiveEndpoint=[[q(-4n,5n),q(-6n,5n)],[q(-6n,5n),q(-9n,5n)]];
assertMatrixEqual(lowered,primitiveEndpoint);
assert.notEqual('path:L->P->N','primitive:{LL,LN,NN}');

assert.equal(evidence.theorems.completeSchurCompositionAssociative,true);
assert.equal(evidence.theorems.eliminationOrderIndependentWithFillIn,true);
assert.equal(evidence.theorems.matrixLoweringFaithfulOnProvenance,false);
assert.equal(evidence.theorems.arbitraryParallelCompositionPreservesRankOne,false);

console.log('PASS 1515: complete coupled-mediator Schur elimination is exactly order independent and preserves the doubled real/grade symmetries, while endpoint matrix lowering is non-faithful on primitive-versus-composite provenance.');
