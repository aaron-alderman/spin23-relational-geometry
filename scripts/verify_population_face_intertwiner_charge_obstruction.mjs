#!/usr/bin/env node

// Certificate for the face-fixed intertwiner classification.
// Fix p,q in M2(C).  Their Peirce corner p M2(C) q is C E12, so every
// nonzero face-preserving arrow map is a -> lambda E12.  TRO preservation
// forces |lambda|=1.  A neutral real source arrow cannot also intertwine the
// continuous charged U(1), while a complexified charged arrow can.

import assert from 'node:assert/strict';

const C=(re=0,im=0)=>({re,im});
const addc=(a,b)=>C(a.re+b.re,a.im+b.im);
const mulc=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conjc=a=>C(a.re,-a.im);
const absc2=a=>a.re*a.re+a.im*a.im;
const scaleC=(z,A)=>A.map(r=>r.map(x=>mulc(z,x)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>addc(x,B[i][j])));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>addc(s,mulc(x,B[k][j])),C())));
const dagger=A=>A[0].map((_,j)=>A.map(r=>conjc(r[j])));
const nearc=(a,b,e=1e-10)=>Math.abs(a.re-b.re)<e&&Math.abs(a.im-b.im)<e;
const equal=(A,B)=>A.every((r,i)=>r.every((x,j)=>nearc(x,B[i][j])));
const tro=(X,Y,Z)=>mul(mul(X,dagger(Y)),Z);

const Z=[[C(),C()],[C(),C()]];
const p=[[C(1),C()],[C(),C()]];
const q=[[C(),C()],[C(),C(1)]];
const e12=[[C(),C(1)],[C(),C()]];

// Corner classification: p X q has only the (1,2) entry for a generic X.
const X=[[C(2,.3),C(-.7,1.1)],[C(.4,-.2),C(3,.8)]];
const pXq=mul(mul(p,X),q);
assert(nearc(pXq[0][0],C())&&nearc(pXq[1][0],C())&&nearc(pXq[1][1],C()));
assert(nearc(pXq[0][1],X[0][1]));

// TRO preservation on the generator: [e12,e12,e12]=e12.
assert(equal(tro(e12,e12,e12),e12));
for(const lambda of [C(1),C(0,1),C(.6,.8)]){
  const image=scaleC(lambda,e12);
  assert(Math.abs(absc2(lambda)-1)<1e-10);
  assert(equal(tro(image,image,image),image));
}
const nonunit=C(2,.5),nonunitImage=scaleC(nonunit,e12);
assert(!equal(tro(nonunitImage,nonunitImage,nonunitImage),nonunitImage));

// Relative U(1) acts on the target arrow by a phase.  A neutral source arrow
// is fixed, so no nonzero lambda can intertwine every phase.
const phase=phi=>C(Math.cos(phi),Math.sin(phi));
const lambda=C(.6,.8),image=scaleC(lambda,e12),phi=.731;
const chargedImage=scaleC(phase(phi),image);
assert(!equal(chargedImage,image));
assert(equal(scaleC(phase(phi),Z),Z));

// Minimal charged repair: complexify the source arrow and give it the same
// weight.  F_lambda(z)=lambda*z E12 then intertwines exactly.
const z=C(.3,-1.2);
const F=z0=>scaleC(mulc(lambda,z0),e12);
assert(equal(F(mulc(phase(phi),z)),scaleC(phase(phi),F(z))));

// Entrywise-real compatibility narrows the face-fixed TRO phase to +/-1,
// neither of which repairs continuous covariance of a neutral line.
const realStructureCompatiblePhases=[C(1),C(-1)];
for(const r of realStructureCompatiblePhases){
  assert(Math.abs(absc2(r)-1)<1e-10);
  assert(!equal(scaleC(phase(phi),scaleC(r,e12)),scaleC(r,e12)));
}

const report={
  protocol:'population-face-intertwiner-charge-obstruction/1',
  faceFixedCorner:'p M2(C) q = C E12',
  facePreservingAlgebraArrowMaps:'a -> lambda E12, lambda in C^*',
  facePreservingTROEmbeddings:'a -> lambda E12 with |lambda|=1 (a U(1) family)',
  entrywiseRealCompatibleTROEmbeddings:'lambda=+1 or -1',
  neutralRealArrowAndContinuousCharge:{nonzeroIntertwiners:0,reason:'lambda=e^{i phi}lambda for every phi forces lambda=0'},
  minimalChargedRepair:{sourceArrow:'one complex line / two real quadratures',action:'z -> e^{i phi} z',intertwiners:'F_lambda(z)=lambda z E12, |lambda|=1'},
  dimensionalCost:{realSourceArrow:1,chargedSourceArrow:2,selfAdjointCarrierBefore:3,selfAdjointCarrierAfterComplexification:4},
  alternativeRepair:'Conjugate the entire real Jordan carrier by the quarter-turn, moving p,q to coherent projectors instead of fixing the population faces.',
  passed:true,
};
console.log(JSON.stringify(report,null,2));
