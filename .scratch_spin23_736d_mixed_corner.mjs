import assert from "node:assert/strict";

const zeros=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));
const kron=(A,B)=>A.flatMap(row=>B.map(brow=>row.flatMap(a=>brow.map(b=>a*b))));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const put=(A,r0,c0,B)=>B.forEach((r,i)=>r.forEach((x,j)=>A[r0+i][c0+j]=x));

// Actual preferred-carrier corner at H_(5,2):
// Phi changes the left factor 5->1 and Psi changes the right factor 2->1.
// Source dim 3*2=6; targets have dimensions 2*2=4 and 3*2=6.
const complete=(Phi,Psi)=>{
  const X=kron(Phi,eye(2));
  const Y=kron(eye(3),Psi);
  const particle=zeros(16,16), offsets=[0,6,10];
  put(particle,offsets[1],offsets[0],X);put(particle,offsets[0],offsets[1],transpose(X));
  put(particle,offsets[2],offsets[0],Y);put(particle,offsets[0],offsets[2],transpose(Y));
  const full=zeros(32,32);put(full,0,0,particle);put(full,16,16,particle);
  return full;
};

const cases=[
  {Phi:[[1,0,0],[0,1,0]],Psi:[[1,0],[0,1]]},
  {Phi:[[1,0,0],[0,0,0]],Psi:[[1,0],[0,0]]},
  {Phi:[[1,2,0],[0,1,1]],Psi:[[2,1],[1,0]]}
].map(({Phi,Psi})=>{
  const A=mm(transpose(Phi),Phi), B=mm(transpose(Psi),Psi);
  const qPhi=tr(A),rPhi=tr(mm(A,A)),qPsi=tr(B),rPsi=tr(mm(B,B));
  const D=complete(Phi,Psi),D2=mm(D,D),traceD2=tr(D2),traceD4=tr(mm(D2,D2));
  const predicted2=8*qPhi+12*qPsi;
  const predicted4=8*rPhi+12*rPsi+8*qPhi*qPsi;
  assert.equal(traceD2,predicted2);assert.equal(traceD4,predicted4);
  return {qPhi,rPhi,qPsi,rPsi,traceD2,traceD4,predicted2,predicted4};
});

console.log(JSON.stringify({
  protocol:"spin23-736d-mixed-horizontal-vertical-corner/1",
  occurrence:"H_(5,2)",
  edges:["(5,2)-(2,1): left-changing colored Phi", "(5,2)-(1,5): right-changing Psi"],
  identity2:"Tr(D^2)=8 qPhi + 12 qPsi",
  identity4:"Tr(D^4)=8 rPhi + 12 rPsi + 8 qPhi qPsi",
  crossQuartic:"8 Tr(Phi*Phi) Tr(Psi*Psi)",
  cases,
  passed:true
},null,2));
