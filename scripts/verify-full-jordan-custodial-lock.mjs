#!/usr/bin/env node

const matMul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const flatten=A=>A.flat();
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const scale=(A,c)=>A.map(r=>r.map(x=>c*x));
const J=[
  [[0,0,0],[0,0,-1],[0,1,0]],
  [[0,0,1],[0,0,0],[-1,0,0]],
  [[0,-1,0],[1,0,0],[0,0,0]]
];
const I=[[1,0,0],[0,1,0],[0,0,1]];
const g=3,gPrime=4,k=1;
const L=scale(I,k);
const variations=J.map(A=>scale(matMul(A,L),g));
variations.push(scale(matMul(L,J[2]),-gPrime));
const vecs=variations.map(flatten);
const M=vecs.map(a=>vecs.map(b=>dot(a,b)));
const mW2=M[0][0];
const neutral=[[M[2][2],M[2][3]],[M[3][2],M[3][3]]];
const mZ2=2*k*k*(g*g+gPrime*gPrime);
const cos2=g*g/(g*g+gPrime*gPrime);
const rho=mW2/(mZ2*cos2);
const report={
  protocol:"full-jordan-custodial-lock/1",
  field:"L in Mat(3,3;R) = weak adjoint tensor full H2(R) carrier",
  decompositionUnderExternalSO2:{neutralRealTriplet:3,chargedComplexTripletRealComponents:6,total:9},
  vacuum:"L0=k I3",
  gaugeGroup:"SO(3)_L x SO(2)_{R,3}",
  massMatrix:M,
  chargedMassSquared:[M[0][0],M[1][1]],
  neutralMassMatrix:neutral,
  neutralEigenvalues:[0,mZ2],
  custodialRho:rho,
  symmetryBreaking:{global:"SO(3)_L x SO(3)_R -> SO(3)_diag",goldstones:3,physicalAmplitudes:6},
  comparison:{tracelessTwoColumnLockRho:0.5,fullThreeColumnLockRho:rho},
  interpretation:"Adding the trace-axis real triplet completes the complex charged triplet into a custodial bitriplet and restores rho=1."
};
report.passed=JSON.stringify(M)===JSON.stringify([[18,0,0,0],[0,18,0,0],[0,0,18,-24],[0,0,-24,32]])&&rho===1;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
