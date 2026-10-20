import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-commutant-projector-support-closure.json','utf8'));

const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((row,i)=>row.map((x,j)=>x-B[i][j]));
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const comm=(A,B)=>sub(mul(A,B),mul(B,A));
const kron=(A,B)=>A.flatMap(row=>B.map(brow=>row.flatMap(x=>brow.map(y=>x*y))));
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const I2=[[1,0],[0,1]];

const pP=kron(I2,[[1,0],[0,0]]);
const pQ=kron(I2,[[0,0],[0,1]]);
const rho=a=>kron(a,I2);

// pP is not in rho(M2): every rho(a) has equal family-diagonal entries
// within each internal index, whereas pP has 1 and 0.
assert.notEqual(pP[0][0],pP[1][1]);
for(const a of [
  [[1,0],[0,0]],[[0,1],[0,0]],[[0,0],[1,0]],[[0,0],[0,1]],
]){
  const A=rho(a);
  assert.equal(A[0][0],A[1][1]);
  assert.deepEqual(comm(A,pP),zero());
  assert.deepEqual(comm(A,pQ),zero());
}

// A family-block-diagonal D with different internal dynamics on P and Q.
const D=[
  [1,0,2,0],
  [0,4,0,3],
  [2,0,5,0],
  [0,3,0,7],
];
assert.deepEqual(mul(mul(pP,D),pQ),zero());

const a1=rho([[1,2],[0,1]]),b1=rho([[0,1],[1,0]]);
const a2=rho([[2,0],[1,1]]),b2=rho([[1,-1],[0,2]]);
const A1=add(mul(a1,comm(D,b1)),mul(a2,comm(D,b2)));
assert.deepEqual(mul(mul(pP,A1),pQ),zero());

const ha1=rho([[1,0],[3,1]]),hb1=rho([[2,1],[0,1]]);
const ha2=rho([[0,1],[-1,0]]),hb2=rho([[1,0],[2,1]]);
const A2=add(mul(ha1,comm(A1,hb1)),mul(ha2,comm(A1,hb2)));
assert.deepEqual(mul(mul(pP,A2),pQ),zero());

assert.equal(evidence.theorem.coordinateMembershipRequired,false);
assert.equal(evidence.theorem.commutationWithBothActionsSuffices,true);
assert.equal(evidence.categoryFork.commutantRoute.preservesSupportMask,true);
assert.equal(evidence.categoryFork.commutantRoute.producesInnerFamilyGaugeField,false);

console.log('PASS 1500: a family projector outside the coordinate algebra but inside both action commutants preserves the null mask under A_(1) and A_(2), without adjoining tensor coordinates.');
