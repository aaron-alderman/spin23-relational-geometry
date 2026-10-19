#!/usr/bin/env node

const Z=(re=0,im=0)=>({re,im});
const add=(a,b)=>Z(a.re+b.re,a.im+b.im);
const sub=(a,b)=>Z(a.re-b.re,a.im-b.im);
const mul=(a,b)=>Z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const eq=(a,b)=>a.re===b.re&&a.im===b.im;
const zero=Z();
const matMul=(A,B)=>A.map((row,i)=>B[0].map((_,j)=>row.reduce((s,x,k)=>add(s,mul(x,B[k][j])),zero)));
const matSub=(A,B)=>A.map((row,i)=>row.map((x,j)=>sub(x,B[i][j])));
const trace=A=>A.reduce((s,row,i)=>add(s,row[i]),zero);
const det3=A=>{
  const p1=mul(A[0][0],sub(mul(A[1][1],A[2][2]),mul(A[1][2],A[2][1])));
  const p2=mul(A[0][1],sub(mul(A[1][0],A[2][2]),mul(A[1][2],A[2][0])));
  const p3=mul(A[0][2],sub(mul(A[1][0],A[2][1]),mul(A[1][1],A[2][0])));
  return add(sub(p1,p2),p3);
};
const comm=(A,B)=>matSub(matMul(A,B),matMul(B,A));
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>i===j?Z(x):Z()));
const fmt=z=>z.im===0?String(z.re):z.re===0?String(z.im)+"i":String(z.re)+(z.im>0?"+":"")+String(z.im)+"i";
const fmtM=A=>A.map(r=>r.map(fmt));

const Hu=diag([1,2,4]);
const HdReal=[
  [Z(10),Z(1),Z(1)],
  [Z(1),Z(11),Z(1)],
  [Z(1),Z(1),Z(12)]
];
const HdComplex=[
  [Z(10),Z(1),Z(0,-1)],
  [Z(1),Z(11),Z(1)],
  [Z(0,1),Z(1),Z(12)]
];
const Cr=comm(Hu,HdReal),Cc=comm(Hu,HdComplex);
const Cr3=matMul(matMul(Cr,Cr),Cr),Cc3=matMul(matMul(Cc,Cc),Cc);
const realData={commutator:fmtM(Cr),determinant:fmt(det3(Cr)),traceCube:fmt(trace(Cr3))};
const complexData={commutator:fmtM(Cc),determinant:fmt(det3(Cc)),traceCube:fmt(trace(Cc3))};
const report={
  protocol:"real-yukawa-cp-obstruction/1",
  invariant:"Im det([H_u,H_d]) equivalently Im Tr([H_u,H_d]^3)",
  realHermitianPair:realData,
  complexHermitianPair:complexData,
  positivityNote:"Both sample H_d matrices are strictly diagonally dominant with positive diagonal, hence positive definite.",
  conclusion:[
    "If one antiunitary basis makes both Yukawa Hermitian squares real, their commutator is a real 3x3 antisymmetric matrix and the CP-odd determinant vanishes.",
    "A complex Hermitian positive pair can have nonzero CP-odd invariant.",
    "Therefore a real selector cannot extend unbroken to the complete observed flavor/Yukawa sector."
  ]
};
report.passed=eq(det3(Cr),Z(0))&&eq(trace(Cr3),Z(0))&&
  eq(det3(Cc),Z(0,12))&&eq(trace(Cc3),Z(0,36));
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
