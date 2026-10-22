import assert from "node:assert/strict";

const zeros=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));
const kron=(A,B)=>A.flatMap(row=>B.map(brow=>row.flatMap(a=>brow.map(b=>a*b))));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const put=(A,r0,c0,B)=>B.forEach((r,i)=>r.forEach((x,j)=>A[r0+i][c0+j]=x));

// Unique safe (1,5)-(2,6) transverse corner at H_(2,1), dimension 2*2=4.
// R: 1x2 changes the left factor 2->6. C: 3x2 changes right factor 1->5.
const complete=(C,R)=>{
  const TC=kron(eye(2),C), TR=kron(R,eye(2));
  const particle=zeros(12,12), offsets=[0,4,10];
  put(particle,offsets[1],offsets[0],TC);put(particle,offsets[0],offsets[1],transpose(TC));
  put(particle,offsets[2],offsets[0],TR);put(particle,offsets[0],offsets[2],transpose(TR));
  const full=zeros(24,24);put(full,0,0,particle);put(full,12,12,particle);return full;
};

const tests=[
  {C:[[1,0],[0,1],[0,0]],R:[[1,0]]},
  {C:[[1,2],[0,1],[1,0]],R:[[2,1]]}
].map(({C,R})=>{
  const AC=mm(transpose(C),C),AR=mm(transpose(R),R);
  const qC=tr(AC),rC=tr(mm(AC,AC)),qR=tr(AR),rR=tr(mm(AR,AR));
  const D=complete(C,R),D2=mm(D,D),traceD2=tr(D2),traceD4=tr(mm(D2,D2));
  assert.equal(traceD2,8*qC+8*qR);assert.equal(traceD4,8*rC+8*rR+8*qC*qR);
  return {qC,rC,qR,rR,traceD2,traceD4};
});

console.log(JSON.stringify({
  protocol:"spin23-736d-highscale-colored-portal/1",
  occurrence:"H_(2,1)",
  fullDimension:24,
  identity2:"Tr(D^2)=8 qC+8 qR",
  identity4:"Tr(D^4)=8 rC+8 rR+8 qC qR",
  canonicalPotential:"-A Q-B P+Q^2/16+P^2/8+QP/8",
  canonicalPhases:[
    {condition:"A/B <= 1/2",winner:"R-only",Q:0,P:"4B"},
    {condition:"1/2 < A/B < 1",winner:"coexist",Q:"8(2A-B)",P:"8(B-A)"},
    {condition:"A/B >= 1",winner:"colored-only",Q:"8A",P:0}
  ],
  tests,
  passed:true
},null,2));
