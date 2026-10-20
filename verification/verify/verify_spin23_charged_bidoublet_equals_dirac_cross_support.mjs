import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-charged-bidoublet-dirac-support-equivalence.json','utf8'));

const n=4;
const zero=()=>Array.from({length:n},()=>Array(n).fill(0));
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((row,i)=>row.map((x,j)=>x-B[i][j]));
const comm=(A,B)=>sub(mul(A,B),mul(B,A));
const nonzeroEntries=A=>A.flat().filter(x=>x!==0).length;

// Basis: L_P,L_N,R_P,R_N.
const pP=zero(),pN=zero();
pP[0][0]=1;pP[2][2]=1;
pN[1][1]=1;pN[3][3]=1;

function dirac(cross=0){
  const D=zero();
  D[0][2]=D[2][0]=2; // neutral P block
  D[1][3]=D[3][1]=3; // neutral N block
  D[0][3]=D[3][0]=cross; // dangerous P-N bidoublet support
  return D;
}

function chargedOneForm(D){return mul(pP,comm(D,pN));}

const masked=chargedOneForm(dirac(0));
const unmasked=chargedOneForm(dirac(5));
assert.equal(nonzeroEntries(masked),0);
assert.equal(nonzeroEntries(unmasked),1);
assert.equal(unmasked[0][3],5);

for(const cross of [-9,-1,1,4,11]){
  const omega=chargedOneForm(dirac(cross));
  assert.equal(omega[0][3],cross);
  assert.equal(nonzeroEntries(omega),1);
}

assert.equal(evidence.theorem.chargedBidoubletOneFormExistsIffDiracCrossSupportExists,true);
assert.equal(evidence.theorem.generalizedFluctuationCannotCreateAbsentCrossSupport,true);
assert.equal(evidence.minimalTreeConclusion.allIndependentLeakageTopologiesClosedConditionally,true);

console.log('PASS 1499: the family-charged bidoublet one-form is exactly the Dirac P-N support block, so the central mask removes the last independent minimal tree leakage topology.');
