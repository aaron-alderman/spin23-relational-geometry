#!/usr/bin/env node

// V=-mu2 S+kappa det L+lambda1 S^2+lambda2 Q at L=k I3.
const k=2,kappa=3,lambda1=5,lambda2=7;
const mu2=kappa*k/2+6*lambda1*k*k+2*lambda2*k*k;
const m1= kappa*k+24*lambda1*k*k+8*lambda2*k*k;
const m3=0;
const m5=-2*kappa*k+8*lambda2*k*k;
const multiplicities={custodialSinglet:1,goldstoneTriplet:3,custodialFiveplet:5};
const trace=Array(9).fill(0);trace[0]=trace[4]=trace[8]=1/Math.sqrt(3);
const antisymmetric=[0,1/Math.sqrt(2),0,-1/Math.sqrt(2),0,0,0,0,0];
const symmetricTraceless=[1/Math.sqrt(2),0,0,0,-1/Math.sqrt(2),0,0,0,0];
const norm=v=>v.reduce((s,x)=>s+x*x,0);
const unflatten=v=>Array.from({length:3},(_,i)=>v.slice(3*i,3*i+3));
const flatten=M=>M.flat();
const transpose=M=>M[0].map((_,j)=>M.map(r=>r[j]));
const applyH=v=>{
  const X=unflatten(v),XT=transpose(X),t=X[0][0]+X[1][1]+X[2][2];
  const out=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>{
    const delta=i===j?1:0;
    return -2*mu2*X[i][j]
      +kappa*k*(t*delta-XT[i][j])
      +lambda1*(8*k*k*t*delta+12*k*k*X[i][j])
      +4*lambda2*k*k*(2*X[i][j]+XT[i][j]);
  }));
  return flatten(out);
};
const eigenCheck=(v,e)=>applyH(v).every((x,i)=>Math.abs(x-e*v[i])<1e-9);
const report={
  protocol:"full-lock-custodial-hessian/1",
  potential:"-mu^2 S+kappa det L+lambda1 S^2+lambda2 tr[(L^T L)^2]",
  parameters:{k,kappa,lambda1,lambda2,mu2FromStationarity:mu2},
  decomposition:"Mat(3,R)=1_symmetric-trace + 3_antisymmetric + 5_symmetric-traceless",
  normalizedModeChecks:{trace:norm(trace),antisymmetric:norm(antisymmetric),symmetricTraceless:norm(symmetricTraceless)},
  directHessianEigenvectorChecks:{singlet:eigenCheck(trace,m1),triplet:eigenCheck(antisymmetric,m3),fiveplet:eigenCheck(symmetricTraceless,m5)},
  hessianEigenvalues:{singlet:m1,triplet:m3,fiveplet:m5},
  multiplicities,
  physicalElectricCharges:{custodialSinglet:[0],custodialFiveplet:[-2,-1,0,1,2]},
  totalDimension:Object.values(multiplicities).reduce((a,b)=>a+b,0),
  analyticFormulas:{singlet:"kappa k +24 lambda1 k^2+8 lambda2 k^2",triplet:"0",fiveplet:"-2 kappa k+8 lambda2 k^2"},
  stabilityConditions:["m1^2>0","m5^2>0"],
  interpretation:"The antisymmetric custodial triplet is exactly the Goldstone orbit; the physical bitriplet amplitudes are one singlet and one degenerate fiveplet."
};
report.passed=Math.abs(report.normalizedModeChecks.trace-1)<1e-12&&Math.abs(report.normalizedModeChecks.antisymmetric-1)<1e-12&&Math.abs(report.normalizedModeChecks.symmetricTraceless-1)<1e-12&&Object.values(report.directHessianEigenvectorChecks).every(Boolean)&&m1===710&&m5===212&&m3===0&&report.totalDimension===9;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
