#!/usr/bin/env node

const eps=1e-9;
const assert=(c,m)=>{if(!c)throw new Error(m);};
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const kron=(A,B)=>A.flatMap(rA=>B.map(rB=>rA.flatMap(x=>rB.map(y=>x*y))));
const I2=[[1,0],[0,1]], sx=[[0,1],[1,0]], sz=[[1,0],[0,-1]];
const tx=sx, tz=sz;
const I4=kron(I2,I2), X=kron(sx,tx), Z=kron(sz,tz), XZ=multiply(X,Z);
const frob=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));

// Partial transpose on the first (face) factor for 2x2 flavor blocks.
const partialTransposeFace=A=>{
  const out=Array.from({length:4},()=>Array(4).fill(0));
  for(let i=0;i<2;i++)for(let j=0;j<2;j++)for(let a=0;a<2;a++)for(let b=0;b<2;b++)
    out[j*2+a][i*2+b]=A[i*2+a][j*2+b];
  return out;
};
const faceReal=A=>frob(sub(partialTransposeFace(A),A))<eps;

const a=4,b=1,c=0.7;
const M=add(add(scale(a,I4),scale(b,X)),scale(c,Z));
assert(faceReal(M),"input must be face-partial-transpose real");
const eigenvalues=[];
for(const x of [-1,1])for(const z of [-1,1])eigenvalues.push(a+b*x+c*z);
assert(Math.min(...eigenvalues)>0,"input must be positive definite");

// Since X and Z commute and square to I, invert in their joint eigenbasis.
let alpha=0,beta=0,gamma=0,delta=0;
for(const x of [-1,1])for(const z of [-1,1]){
  const inv=1/(a+b*x+c*z);
  alpha+=inv/4; beta+=x*inv/4; gamma+=z*inv/4; delta+=x*z*inv/4;
}
const Minv=add(add(add(scale(alpha,I4),scale(beta,X)),scale(gamma,Z)),scale(delta,XZ));
assert(frob(sub(multiply(M,Minv),I4))<eps,"inverse reconstruction failed");
assert(Math.abs(delta)>eps,"noncommuting flavor coefficients must generate a cross term");
assert(!faceReal(Minv),"inverse should leave the face-real subspace");

// The leakage term is odd under face partial transpose.
assert(frob(add(partialTransposeFace(XZ),XZ))<eps,"cross term must be partial-transpose odd");

// If one flavor coefficient is identity, the corresponding tensor generators
// anticommute and the inverse has no product leakage.
const Zcomm=kron(sz,I2);
const Mcomm=add(add(scale(a,I4),scale(b,X)),scale(c,Zcomm));
const denom=a*a-b*b-c*c;
const McommInv=scale(1/denom,add(add(scale(a,I4),scale(-b,X)),scale(-c,Zcomm)));
assert(frob(sub(multiply(Mcomm,McommInv),I4))<eps,"commuting-flavor inverse failed");
assert(faceReal(McommInv),"commuting flavor coefficients should preserve face reality");

console.log("Flavor-noncommutative face-real Schur-closure certificate: PASS");
console.log(`input_positive=true; input_face_partial_transpose_fixed=true; inverse_cross_coefficient=${delta.toFixed(8)}; inverse_face_real=false`);
console.log("flavor_commutator_leakage=true; commuting_flavor_coefficients_preserve_inverse_face_reality=true");
