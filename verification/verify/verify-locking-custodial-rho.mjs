#!/usr/bin/env node

const matMul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const A3=[[0,-1,0],[1,0,0],[0,0,0]];
const E=[[0,-1],[1,0]];
const K0=[[1,0],[0,1],[0,0]];
const internal=matMul(A3,K0);
const external=matMul(K0,E).map(r=>r.map(x=>-x));
const locked=add(internal,external);

// Numerical exact checkpoint. The ratios are coupling independent.
const g=3,gPrime=4,k=1;
const mW2=g*g*k*k;
const mZ2=2*k*k*(g*g+gPrime*gPrime);
const cos2=g*g/(g*g+gPrime*gPrime);
const rho=mW2/(mZ2*cos2);
const report={
  protocol:"locking-complex-triplet-custodial-rho/1",
  realField:"K in Mat(3,2;R)",
  complexField:"Phi=K_col1+i K_col2, a complex SU(2) adjoint triplet",
  vacuum:"Phi0=k(e1+i e2)",
  generatorActions:{internalOnPhi0:"-i Phi0",externalOnPhi0:"+i Phi0"},
  hyperchargeMagnitudeRequired:1,
  unbrokenGenerator:"Q=T3+Y (up to simultaneous sign convention)",
  lockedVariation:locked,
  masses:{mW2,mZ2,cosThetaSquared:cos2},
  custodialRho:rho,
  standardModelTreeRho:1,
  interpretation:"As the sole electroweak-breaking field, the lock is a complex |Y|=1 triplet and predicts rho=1/2, not the observed doublet value 1.",
  scope:"The obstruction applies only if the locking SO(3)xSO(2) is identified directly with SU(2)_LxU(1)_Y and K supplies the electroweak vacuum."
};
report.passed=eq(locked,[[0,0],[0,0],[0,0]])&&rho===0.5;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
