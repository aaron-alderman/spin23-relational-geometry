#!/usr/bin/env node

const Z=(re=0,im=0)=>({re,im});
const add=(a,b)=>Z(a.re+b.re,a.im+b.im);
const sub=(a,b)=>Z(a.re-b.re,a.im-b.im);
const mul=(a,b)=>Z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>Z(a.re,-a.im);
const zero=()=>Z();
const matMul=(A,B)=>A.map(row=>B[0].map((_,j)=>
  row.reduce((s,x,k)=>add(s,mul(x,B[k][j])),zero())));
const matSub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),zero());
const det3=A=>{
  const p1=mul(A[0][0],sub(mul(A[1][1],A[2][2]),mul(A[1][2],A[2][1])));
  const p2=mul(A[0][1],sub(mul(A[1][0],A[2][2]),mul(A[1][2],A[2][0])));
  const p3=mul(A[0][2],sub(mul(A[1][0],A[2][1]),mul(A[1][1],A[2][0])));
  return add(sub(p1,p2),p3);
};
const comm=(A,B)=>matSub(matMul(A,B),matMul(B,A));
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>i===j?Z(x):Z()));
const kron=(A,B)=>A.flatMap(aRow=>
  B.map(bRow=>aRow.flatMap(a=>bRow.map(b=>mul(a,b)))));
const identity=n=>Array.from({length:n},(_,i)=>
  Array.from({length:n},(_,j)=>Z(i===j?1:0)));
const maxAbs=A=>Math.max(...A.flat().map(z=>Math.hypot(z.re,z.im)));

const Hu=diag([1,2,4]);
const Hd=[
  [Z(10),Z(1),Z(0,-1)],
  [Z(1),Z(11),Z(1)],
  [Z(0,1),Z(1),Z(12)]
];
const C=comm(Hu,Hd),C3=matMul(matMul(C,C),C);
const cpDet=det3(C),cpTraceCube=trace(C3);
const S=[[Z(2),Z(1)],[Z(1),Z(1)]];
const Sflavor=kron(S,identity(3));
const HdCombined=kron(identity(2),Hd);
const tensorCommutator=comm(Sflavor,HdCombined);
const HdConjugate=Hd.map(r=>r.map(conj));
const fullRealityWouldChangeFlavor=maxAbs(matSub(Hd,HdConjugate))>1e-12;
const report={
  protocol:"face-flavor-cp-factorization/1",
  carrier:"H2(R), three real face coordinates",
  flavor:"Herm_3(C), nine real flavor-observable coordinates",
  tensorRealDimension:27,
  sampleFlavorPair:{Hu,Hd},
  cpOddInvariant:{
    determinantOfCommutator:cpDet,
    traceCommutatorCube:cpTraceCube,
    nonzero:Math.abs(cpDet.im)>1e-12&&Math.abs(cpTraceCube.im)>1e-12
  },
  carrierFlavorCommutation:{
    realCarrierMatrix:S,
    maxAbsCommutator:maxAbs(tensorCommutator),
    commute:maxAbs(tensorCommutator)<1e-12
  },
  realityScope:{
    fullEntrywiseRealityWouldChangeFlavor:fullRealityWouldChangeFlavor,
    carrierOnlyReality:"Complex conjugation/fixed-real selection is applied to the two-face carrier basis only; flavor Hermitian coefficients are left complex.",
    consequence:"A real Jordan carrier need not force CKM/PMNS-type Hermitian flavor data to be real."
  },
  algebraicModel:"H2(R) tensor_R Herm_3(C), with carrier transformations S tensor I_3 and flavor observables I_2 tensor H_f.",
  limitation:"Generic interacting response blocks need not factor as a single tensor product; the required condition is that carrier operations lie in the commutant of the full flavor algebra.",
  conclusion:"Sector-limited reality on the two-face index is compatible with a nonzero CP-odd flavor invariant. The earlier CP no-go applies only when the same antiunitary reality condition is extended to the flavor matrices."
};
report.passed=report.cpOddInvariant.nonzero&&
  report.carrierFlavorCommutation.commute&&
  fullRealityWouldChangeFlavor&&report.tensorRealDimension===27;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
