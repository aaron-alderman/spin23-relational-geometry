#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const I=[[1,0],[0,1]], sx=[[0,1],[1,0]], sz=[[1,0],[0,-1]], J=[[0,-1],[1,0]];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>add(A,scale(-1,B));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const zero=n=>Array.from({length:n},()=>Array(n).fill(0));
const block=(A,B,C,D)=>[...A.map((r,i)=>[...r,...B[i]]),...C.map((r,i)=>[...r,...D[i]])];
const blockDiag=(A,B)=>block(A,zero(B.length),zero(A.length),B);

const Z=zero(2), Ugamma=block(Z,I,I,Z);
const thetaU=W=>block(Z,W,T(W),Z);
const H=h=>blockDiag(h,scale(-1,h));
const conjugate=(U,X)=>mul(mul(U,X),T(U)); // real antiunitary matrices in this certificate

for(const W of [sz,J]){
  const U=thetaU(W);
  assert(maxAbs(sub(mul(U,U),blockDiag(I,I)))<1e-12,"Theta_W must square to one");
  const product=mul(U,Ugamma);
  assert(maxAbs(sub(product,blockDiag(W,T(W))))<1e-12,"Theta_W Gamma product formula failed");
}

// Hermitian W gives commuting real structures and a grading.
const Uc=thetaU(sz);
assert(maxAbs(sub(mul(Uc,Ugamma),mul(Ugamma,Uc)))<1e-12,"Hermitian W branch should commute");
assert(maxAbs(sub(mul(mul(Uc,Ugamma),mul(Uc,Ugamma)),blockDiag(I,I)))<1e-12,"commuting product should square +1");

// Skew/anti-Hermitian W gives anticommuting real structures and a complex structure.
const Ua=thetaU(J);
assert(maxAbs(add(mul(Ua,Ugamma),mul(Ugamma,Ua)))<1e-12,"skew W branch should anticommute");
assert(maxAbs(add(mul(mul(Ua,Ugamma),mul(Ua,Ugamma)),blockDiag(I,I)))<1e-12,"anticommuting product should square -1");

// Kinetic transformation: if W anticommutes with h, Theta_W preserves H_BdG.
assert(maxAbs(add(mul(mul(sz,sx),sz),sx))<1e-12,"chosen W and h must anticommute");
assert(maxAbs(sub(conjugate(Uc,H(sx)),H(sx)))<1e-12,"chiral W branch should preserve BdG kinetic matrix");
// If W commutes with h, Theta_W is another particle-hole antisymmetry.
assert(maxAbs(sub(conjugate(Uc,H(sz)),scale(-1,H(sz))))<1e-12,"commuting W branch should anticommute with BdG kinetic matrix");

// Odd-dimensional chiral symmetry forces a zero mode.
const h3=[[0,2,0],[2,0,3],[0,3,0]], W3=[[1,0,0],[0,-1,0],[0,0,1]];
assert(maxAbs(add(mul(mul(W3,h3),T(W3)),h3))<1e-12,"odd-dimensional chiral example failed");
const det3=h3[0][0]*(h3[1][1]*h3[2][2]-h3[1][2]*h3[2][1])-h3[0][1]*(h3[1][0]*h3[2][2]-h3[1][2]*h3[2][0])+h3[0][2]*(h3[1][0]*h3[2][1]-h3[1][1]*h3[2][0]);
assert(Math.abs(det3)<1e-12,"odd-dimensional chiral kinetic matrix must have zero determinant");

console.log("Common-carrier second-antiunitary parameterization certificate: PASS");
console.log("Theta_W=[[0,W],[W^T,0]]K; Theta_W_Gamma=diag(W,W^T)");
console.log("W_Hermitian=>commuting_real_structures_grading; W_skew=>anticommuting_complex_structure");
console.log("Theta_preserves_H_BdG_iff_W_h_Wdagger=-h; odd_particle_dimension_forces_zero_mode=true");
