import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-relation-sheet-parity-tensor-fluctuation.json','utf8'));

const zeros=(r,c=r)=>Array.from({length:r},()=>Array(c).fill(0));
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((row,i)=>row.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(row=>row.map(x=>s*x));
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const comm=(A,B)=>sub(mul(A,B),mul(B,A));
const isZero=A=>A.every(row=>row.every(x=>x===0));
const blockDiag=(A,B)=>[
  ...A.map((row,i)=>[...row,...Array(B.length).fill(0)]),
  ...B.map(row=>[...Array(A.length).fill(0),...row]),
];

const n=6;
const I6=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const Gamma=blockDiag(I6,scale(-1,I6));

// Arbitrary matrix-valued within-sheet data: each 6-dimensional sheet may
// be read as three relation vertices tensored with a 2-dimensional physical
// multiplicity.  No coefficient is required to commute internally.
const sym=x=>add(x,tr(x));
const seed=k=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>((k+2*i+3*j)%7)-3));
const D=blockDiag(sym(seed(1)),sym(seed(4)));
const a1=blockDiag(seed(2),seed(3));
const b1=blockDiag(seed(5),seed(6));
const a2=blockDiag(seed(7),seed(8));
const b2=blockDiag(seed(9),seed(10));
const ha1=blockDiag(seed(11),seed(12));
const hb1=blockDiag(seed(13),seed(14));
const ha2=blockDiag(seed(15),seed(16));
const hb2=blockDiag(seed(17),seed(18));

const A1=add(mul(a1,comm(D,b1)),mul(a2,comm(D,b2)));
const oppositeA1=add(mul(ha1,comm(D,hb1)),mul(ha2,comm(D,hb2)));
const A2=add(mul(ha1,comm(A1,hb1)),mul(ha2,comm(A1,hb2)));
const fluctuated=add(add(add(D,A1),oppositeA1),A2);

for(const X of [D,a1,b1,a2,b2,ha1,hb1,ha2,hb2,A1,oppositeA1,A2,fluctuated]){
  assert.equal(isZero(comm(Gamma,X)),true);
}

// An arbitrary cross-sheet physical block is exactly parity odd.
const C=seed(19);
const B=[
  ...zeros(n,n).map((row,i)=>[...row,...C[i]]),
  ...tr(C).map(row=>[...row,...Array(n).fill(0)]),
];
assert.equal(isZero(add(mul(mul(Gamma,B),Gamma),B)),true);
assert.equal(isZero(comm(Gamma,B)),false);

assert.equal(evidence.witness.totalDimension,12);
assert.equal(evidence.witness.evenEndomorphismDimension,72);
assert.equal(evidence.witness.oddEndomorphismDimension,72);
assert.equal(evidence.theorem.arbitraryWithinSheetMultiplicityPreservesParity,true);
assert.equal(evidence.theorem.generalizedFluctuationPreservesParity,true);
assert.equal(evidence.theorem.crossSheetPhysicalVertexIsExactObstruction,true);

console.log('PASS 1506: arbitrary 2x physical multiplicity and noncommuting within-sheet matrices remain Gamma_rel-even through A_(1), its opposite term and A_(2); an arbitrary cross-sheet block is exactly odd.');
