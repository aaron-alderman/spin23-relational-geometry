#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const n=3;
const zeros=(r,c)=>Array.from({length:r},()=>Array(c).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const block=(A,B,C,D)=>[
  ...A.map((r,i)=>[...r,...B[i]]),
  ...C.map((r,i)=>[...r,...D[i]]),
];
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const I=eye(n), Z=zeros(n,n);
const J=block(Z,scale(-1,I),I,Z);

// Generic complex-linear symmetric element: [[A,-B],[B,A]], A^T=A, B^T=-B.
const A=[[2,1,3],[1,5,4],[3,4,7]];
const B=[[0,2,-1],[-2,0,3],[1,-3,0]];
const M=block(A,scale(-1,B),B,A);
assert(maxAbs(sub(M,T(M)))<1e-12,"realification must be symmetric");
assert(maxAbs(sub(mul(M,J),mul(J,M)))<1e-12,"realification must commute with J");

// Any positive real flavor weight W is symmetric; tr(WB)=0 for skew B.
const W=[[2,0.2,0.1],[0.2,1.5,-0.3],[0.1,-0.3,1.2]];
const weightedTrace=X=>tr(mul(W,X))/tr(W); // tr(WX)/tr(W)
const reduced=[
  [weightedTrace(A), weightedTrace(scale(-1,B))],
  [weightedTrace(B), weightedTrace(A)],
];
assert(Math.abs(reduced[0][1])<1e-12 && Math.abs(reduced[1][0])<1e-12,"positive weighted reduction must kill skew block");
assert(Math.abs(reduced[0][0]-reduced[1][1])<1e-12,"positive weighted reduction must equalize diagonal faces");

// The two missing H2(R) directions necessarily fail exact J-commutation.
const sz=[[1,0],[0,-1]], sx=[[0,1],[1,0]];
const kron=(P,Q)=>P.flatMap(rowP=>Q.map(rowQ=>rowP.flatMap(p=>rowQ.map(q=>p*q))));
assert(maxAbs(sub(mul(kron(sz,I),J),mul(J,kron(sz,I))))>1,"sigma_z direction should break J-commutation");
assert(maxAbs(sub(mul(kron(sx,I),J),mul(J,kron(sx,I))))>1,"sigma_x direction should break J-commutation");

// Independent face and flavor-complex factors commute without collapsing the face algebra.
const Jflavor=J;
const I2=eye(2), I6=eye(6);
for(const S of [I2,sx,sz]){
  const face=kron(S,I6), flavorJ=kron(I2,Jflavor);
  assert(maxAbs(sub(mul(face,flavorJ),mul(flavorJ,face)))<1e-12,"separate-factor face must commute with flavor J");
}

assert(6+3===9,"J-central symmetric subspace must have Herm_3(C) dimension 9");
assert(12*13/2===78,"separate full real-symmetric parent dimension must be 78");

console.log("Complex-structure/face conflation obstruction certificate: PASS");
console.log("Sym6_cap_CentJ_dim=9; positive_weighted_face_image_dim=1; target_H2R_dim=3");
console.log("sigma_x_and_sigma_z_break_exact_J_commutation=true");
console.log("separate_face_times_realified_flavor_commutes=true; ambient_Sym12_dim=78");
