#!/usr/bin/env node

const factorSizes=[5,5,3,2];
const uniqueM2=factorSizes.filter(n=>n===2).length===1;
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const mul=(A,B)=>A.map((r,i)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const jordan=(A,B)=>scale(0.5,add(mul(A,B),mul(B,A)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const symmetric=A=>JSON.stringify(A)===JSON.stringify(transpose(A));
const realProjection=A=>A.map(r=>r.map(z=>Array.isArray(z)?z[0]:z));
// Complex numbers are represented only where needed as [re,im].
const hermitianExample=[
  [3,[1,1]],
  [[1,-1],2]
];
const projected=realProjection(hermitianExample);
const detHermitian=3*2-(1*1+1*1);
const detProjected=projected[0][0]*projected[1][1]-projected[0][1]**2;
const projectionPositive=detHermitian>=0&&detProjected>=detHermitian&&
  projected[0][0]>=0&&projected[1][1]>=0;
const A=[[2,1],[1,3]],B=[[1,-2],[-2,5]];
const jordanClosure=symmetric(jordan(A,B));
const lorentzCoordinates={a:3,d:2,b:1};
const t=(lorentzCoordinates.a+lorentzCoordinates.d)/2;
const x=(lorentzCoordinates.a-lorentzCoordinates.d)/2;
const y=lorentzCoordinates.b;
const determinantIdentity=Math.abs(
  lorentzCoordinates.a*lorentzCoordinates.d-lorentzCoordinates.b**2-
  (t*t-x*x-y*y)
)<1e-12;
const rotateRealOffDiagonal=theta=>({
  real:Math.cos(theta),
  imaginary:Math.sin(theta)
});
const genericRotation=rotateRealOffDiagonal(Math.PI/3);
const piRotation=rotateRealOffDiagonal(Math.PI);
const report={
  protocol:"linking-m2-real-jordan-carrier/1",
  linkingFactorization:factorSizes.map(n=>"M"+n+"(C)"),
  uniqueM2Factor:uniqueM2,
  factorOrigin:"The M2(C) component is the linking algebra of the one-dimensional E<-C (e^c) TRO edge: two scalar faces plus one complex relation.",
  dimensions:{
    M2CHermitianReal:4,
    conjugationFixedHermitian:3,
    H2R:3
  },
  positiveProjection:{
    formula:"E(A)=(A+bar(A))/2=Re(A)",
    hermitianExample,
    projected,
    determinantBefore:detHermitian,
    determinantAfter:detProjected,
    positive:projectionPositive,
    theorem:"For A=[[a,z],[z*,d]]>=0, ad>=|z|^2 implies ad>=(Re z)^2, so Re(A) is positive in H2(R)."
  },
  jordanClosure,
  lorentzDeterminant:{
    coordinates:"t=(a+d)/2, x=(a-d)/2, y=b",
    identity:"det([[a,b],[b,d]])=t^2-x^2-y^2",
    verified:determinantIdentity
  },
  hyperchargeRealSliceAudit:{
    action:"z -> exp(i theta) z on the off-diagonal E-C relation",
    genericTheta:Math.PI/3,
    genericImage:genericRotation,
    genericPreservesRealSlice:Math.abs(genericRotation.imaginary)<1e-12,
    piImage:piRotation,
    piPreservesRealSlice:Math.abs(piRotation.imaginary)<1e-12,
    stabilizer:"theta=0 or pi mod 2pi; continuous U(1) does not preserve H2(R)"
  },
  interpretation:"The unique M2(C) linking factor contains an exact H2(R) Jordan real form and positive projection, but selecting it before electroweak breaking reduces the off-diagonal U(1) phase to a Z2 stabilizer."
};
report.passed=uniqueM2&&projectionPositive&&jordanClosure&&
  determinantIdentity&&!report.hyperchargeRealSliceAudit.genericPreservesRealSlice&&
  report.hyperchargeRealSliceAudit.piPreservesRealSlice;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
