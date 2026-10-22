import assert from "node:assert/strict";

const zeros=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));
const kron=(A,B)=>A.flatMap(row=>B.map(brow=>row.flatMap(a=>brow.map(b=>a*b))));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const put=(A,r0,c0,B)=>B.forEach((r,i)=>r.forEach((x,j)=>A[r0+i][c0+j]=x));

// Exact preferred-carrier lock corner at H_(9,10):
// B changes the left factor 9->2 and C changes the right factor 10->5.
// Source and both targets have dimension 2*3=6.
const complete=(B,C)=>{
  const X=kron(B,eye(3));
  const Y=kron(eye(2),C);
  const particle=zeros(18,18), offsets=[0,6,12];
  put(particle,offsets[1],offsets[0],X);put(particle,offsets[0],offsets[1],transpose(X));
  put(particle,offsets[2],offsets[0],Y);put(particle,offsets[0],offsets[2],transpose(Y));
  const full=zeros(36,36);put(full,0,0,particle);put(full,18,18,particle);
  return full;
};

const cases=[
  {B:[[1,0],[0,1]],C:[[1,0,0],[0,1,0],[0,0,1]]},
  {B:[[1,0],[0,0]],C:[[1,0,0],[0,0,0],[0,0,0]]},
  {B:[[2,1],[1,0]],C:[[1,2,0],[0,1,1],[1,0,1]]}
].map(({B,C})=>{
  const BB=mm(transpose(B),B), CC=mm(transpose(C),C);
  const qB=tr(BB),rB=tr(mm(BB,BB)),qC=tr(CC),rC=tr(mm(CC,CC));
  const D=complete(B,C),D2=mm(D,D),traceD2=tr(D2),traceD4=tr(mm(D2,D2));
  const predicted2=12*qB+8*qC;
  const predicted4=12*rB+8*rC+8*qB*qC;
  assert.equal(traceD2,predicted2);assert.equal(traceD4,predicted4);
  return {qB,rB,qC,rC,traceD2,traceD4,predicted2,predicted4};
});

const b=2,c=3;
const radial={
  b,c,
  traceD4:24*b**4+24*c**4+48*b**2*c**2,
  factorized:24*(b**2+c**2)**2
};
assert.equal(radial.traceD4,radial.factorized);

console.log(JSON.stringify({
  protocol:"spin23-736d-dual-lock-corner/1",
  occurrence:"H_(9,10)",
  edges:["(9,10)-(10,2): left-changing weak lock (2,9)","(5,9)-(9,10): right-changing color lock (5,10)"],
  identity2:"Tr(D^2)=12 qB + 8 qC",
  identity4:"Tr(D^4)=12 rB + 8 rC + 8 qB qC",
  radialIdentity:"For B=b I2 and C=c I3, Tr(D^4)=24(b^2+c^2)^2",
  cases,
  radial,
  passed:true
},null,2));
