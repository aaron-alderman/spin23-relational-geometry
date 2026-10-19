#!/usr/bin/env node

// Full lock L=(u,v,a), with SO(3)_L acting on vectors and SO(2)_R rotating (u,v).
const dot=(x,y)=>x.reduce((s,z,i)=>s+z*y[i],0);
const cross=(x,y)=>[x[1]*y[2]-x[2]*y[1],x[2]*y[0]-x[0]*y[2],x[0]*y[1]-x[1]*y[0]];
const rotatePair=(u,v,c,s)=>[u.map((x,i)=>c*x-s*v[i]),u.map((x,i)=>s*x+c*v[i])];
const invariants=(u,v,a)=>{
  const A=dot(a,a),B=dot(u,u)+dot(v,v);
  const D=B*B-4*dot(cross(u,v),cross(u,v));
  const C=dot(a,u)**2+dot(a,v)**2;
  const P=dot(a,cross(u,v));
  return {A,B,D,C,P};
};
const u=[1,2,-1],v=[0,3,4],a=[2,-2,1];
const [ur,vr]=rotatePair(u,v,0,1);
const before=invariants(u,v,a),after=invariants(ur,vr,a);
const invariantPass=Object.keys(before).every(k=>before[k]===after[k]);

// Generic aligned-form potential on a=w e3, u=k e1, v=k e2.
const pars={lambdaA:1,lambdaAB:0.5,lambdaB:1,kappa:0,w:2,k:1};
pars.muA2=2*pars.lambdaA*pars.w**2+2*pars.lambdaAB*pars.k**2+pars.kappa*pars.k**2/(2*pars.w);
pars.muB2=pars.kappa*pars.w/2+pars.lambdaAB*pars.w**2+4*pars.lambdaB*pars.k**2;
const hww=-2*pars.muA2+12*pars.lambdaA*pars.w**2+4*pars.lambdaAB*pars.k**2;
const hkk=-4*pars.muB2+2*pars.kappa*pars.w+4*pars.lambdaAB*pars.w**2+48*pars.lambdaB*pars.k**2;
const hwk=2*pars.kappa*pars.k+8*pars.lambdaAB*pars.w*pars.k;
const detH=hww*hkk-hwk*hwk;
const report={
  protocol:"full-lock-jordan-native-invariant-potential/1",
  fieldSplit:"L=(u,v,a), where (u,v) is the external SO(2) doublet and a is the trace-axis singlet",
  invariantGenerators:{quadratic:["A=a.a","B=u.u+v.v"],cubic:["P=a.(u x v)=det L"],quartic:["A^2","AB","B^2","D=(u.u-v.v)^2+4(u.v)^2","C=(a.u)^2+(a.v)^2"]},
  so2Probe:{before,after,invariantPass},
  custodialSO3RRelations:{muA2EqualsMuB2:true,lambdaA:"lambda1+lambda2",lambdaAB:"2 lambda1",lambdaB:"lambda1+lambda2/2",lambdaD:"lambda2/2",lambdaC:"2 lambda2",kappa:"unrestricted determinant coupling"},
  genericMisalignedStationaryExample:{parameters:pars,radialHessian:[[hww,hwk],[hwk,hkk]],positiveRadialHessian:hww>0&&detH>0},
  conclusion:"Jordan-native SO(3)_L x SO(2)_R permits independent trace-axis and traceless-plane couplings. Custodial w=k alignment is not symmetry-enforced unless the coefficients satisfy the larger SO(3)_R relations or are otherwise tuned/dynamically selected."
};
report.passed=invariantPass&&pars.muA2===9&&pars.muB2===6&&hww===32&&hkk===32&&hwk===8&&detH>0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
