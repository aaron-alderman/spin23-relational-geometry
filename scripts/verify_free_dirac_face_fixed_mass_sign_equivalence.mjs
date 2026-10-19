#!/usr/bin/env node

// Exact/numerical certificate that the free Dirac H2(R) kernel realizes the
// finite Peirce faces, but its arrow sign is changed by a face-preserving
// chiral redefinition.  Trace normalization fixes projector shape, not the
// physical pole residue or the Yukawa mass magnitude.

import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sm=(s,A)=>A.map(r=>r.map(x=>s*x));
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const I=[[1,0],[0,1]],sz=[[1,0],[0,-1]],sx=[[0,1],[1,0]];
const h=(k,m)=>add(sm(k,sz),sm(m,sx));
const projector=(k,m)=>{const w=Math.hypot(k,m);return sm(.5,add(I,sm(1/w,h(k,m))));};

const k=1.7,m=.43,w=Math.hypot(k,m),P=projector(k,m),Pm=projector(k,-m);
assert(maxDiff(mm(h(k,m),h(k,m)),sm(w*w,I))<1e-11);
assert(maxDiff(mm(P,P),P)<1e-11);
assert(maxDiff(mm(mm(sz,h(k,m)),sz),h(k,-m))<1e-11);
assert(maxDiff(mm(mm(sz,P),sz),Pm)<1e-11);

// The two diagonal population projectors are fixed by sz, while E12 and E21
// change sign under conjugation.
const p=[[1,0],[0,0]],q=[[0,0],[0,1]],e12=[[0,1],[0,0]],e21=[[0,0],[1,0]];
assert(maxDiff(mm(mm(sz,p),sz),p)<1e-11);
assert(maxDiff(mm(mm(sz,q),sz),q)<1e-11);
assert(maxDiff(mm(mm(sz,e12),sz),sm(-1,e12))<1e-11);
assert(maxDiff(mm(mm(sz,e21),sz),sm(-1,e21))<1e-11);

const t=(P[0][0]+P[1][1])/2,x=(P[0][0]-P[1][1])/2,y=P[0][1];
assert(Math.abs(t-.5)<1e-11);
assert(Math.abs(x/t-k/w)<1e-11);
assert(Math.abs(y/t-m/w)<1e-11);
assert(Math.abs(t*t-x*x-y*y)<1e-11);

// A positive wave-function/pole residue multiplies the whole projector and is
// not fixed by idempotence of the normalized spectral direction.
const residues=[.2,1,3.7].map(Z=>sm(Z,P));
assert(residues.every((R,j)=>Math.abs((R[0][0]+R[1][1])-[.2,1,3.7][j])<1e-11));

const report={
  protocol:'free-dirac-face-fixed-mass-sign-equivalence/1',
  kernel:'P_+(k,m)=(I+(k sigma_z+m sigma_x)/omega)/2',
  finiteCarrierMap:{p:'left population',q:'right population',symmetricArrow:'mass relation'},
  facePreservingEquivalence:'sigma_z P_+(k,m) sigma_z = P_+(k,-m)',
  populationsFixed:true,
  arrowSignFlipped:true,
  normalizedCoordinates:{t,x,y,ratios:{xOverT:x/t,yOverT:y/t},nullDeterminant:true},
  poleResidue:'Z P_+ with arbitrary positive Z; trace/projector normalization does not predict Z',
  consequence:'The free OS kernel realizes the H2(R) carrier but cannot turn the one-generation mass sign or response normalization into a prediction.',
  passed:true,
};
console.log(JSON.stringify(report,null,2));
