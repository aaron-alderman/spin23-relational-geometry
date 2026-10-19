import assert from 'node:assert/strict';

const matMul=(A,B)=>A.map((r,i)=>B[0].map((_,j)=>r.reduce((s,_,k)=>s+A[i][k]*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const J0=[[0,1],[-1,0]];
const blockDiag=(a,b)=>[
  [0,a,0,0],[-a,0,0,0],[0,0,0,b],[0,0,-b,0],
];
const H=[[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0]];
const evalPoly=(cs,s)=>cs.reduce((v,c,k)=>v+c*s**k,0);
const aCoefficients=[3,5,7,-2,11,-13];
const bCoefficients=aCoefficients.map((c,k)=>k%2===0?c:-c);
for(const s of [-2,-0.7,0,0.4,3]){
  const a=evalPoly(aCoefficients,s);
  const b=evalPoly(bCoefficients,s);
  const lhs=matMul(transpose(H),matMul(blockDiag(a,b),H));
  const rhs=blockDiag(evalPoly(aCoefficients,-s),evalPoly(bCoefficients,-s));
  assert.deepEqual(lhs,rhs);
}
assert.equal(evalPoly(aCoefficients,0),evalPoly(bCoefficients,0));

const meanCoefficients=aCoefficients.map((c,k)=>k%2===0?c:0);
const halfSplitCoefficients=aCoefficients.map((c,k)=>k%2===1?c:0);
assert.deepEqual(meanCoefficients,[3,0,7,0,11,0]);
assert.deepEqual(halfSplitCoefficients,[0,5,0,-2,0,-13]);

console.log(JSON.stringify({
  protocol:'left-right-handle-response-spurion-parity/1',
  carrier:'two oriented 2-planes with J(a,b)=diag(a J0,b J0)',
  exchangeMatrix:H,
  covarianceLaw:'H^T J(s) H = J(-s)',
  coefficientLaw:'b(s)=a(-s)',
  exchangeEvenMean:'(a(s)+b(s))/2 contains only even powers of s',
  exchangeOddSplitting:'(a(s)-b(s))/2 contains only odd powers of s',
  symmetricPhase:'s=0 implies a=b',
  genericBrokenPhase:'a-b = 2 a1 s + O(s^3); linear splitting is allowed',
  logicalBoundary:'The theorem applies physically only if the matter-to-carrier map intertwines the left-right Weyl action with H.',
  passed:true,
},null,2));
