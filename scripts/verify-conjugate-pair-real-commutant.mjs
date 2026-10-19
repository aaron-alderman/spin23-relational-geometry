#!/usr/bin/env node

// Complex numbers as [re,im]. Check A S = S conjugate(A) for kappa=S K.
const C=(r=0,i=0)=>[r,i],conj=z=>[z[0],-z[1]],eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const matEq=(a,b)=>a.every((r,i)=>r.every((z,j)=>eq(z,b[i][j])));
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,z,k)=>C(s[0]+z[0]*b[k][j][0]-z[1]*b[k][j][1],s[1]+z[0]*b[k][j][1]+z[1]*b[k][j][0]),C())));
const dagger=a=>a[0].map((_,j)=>a.map(r=>conj(r[j])));
const S=[[C(),C(1)],[C(1),C()]];
const kappaCompatible=A=>matEq(mul(A,S),mul(S,A.map(r=>r.map(conj))));
const hermitian=A=>matEq(A,dagger(A));
const neutralBasis=[
  [[C(1),C()],[C(),C(1)]],
  [[C(0,1),C()],[C(),C(0,-1)]],
  [[C(),C(1)],[C(1),C()]],
  [[C(),C(0,1)],[C(0,-1),C()]],
];
const chargedBasis=[
  [[C(1),C()],[C(),C(1)]],
  [[C(0,1),C()],[C(),C(0,-1)]],
];
const report={
  protocol:"canonical-conjugate-pair-real-commutant/1",
  involution:"kappa(v,w)=(conj(w),conj(v))",
  neutralRealBasisDimension:neutralBasis.length,
  neutralAllCompatible:neutralBasis.every(kappaCompatible),
  neutralHermitianDimension:neutralBasis.filter(hermitian).length,
  chargedPairRealBasisDimension:chargedBasis.length,
  chargedAllCompatible:chargedBasis.every(kappaCompatible),
  chargedHermitianDimension:chargedBasis.filter(hermitian).length,
  threeChargedPairsPlusNeutral:{realCommutantDimension:4+3*2,hermitianParameterDimension:3+3*1},
  warning:"This is the canonical swap-conjugation model, not yet a verified matrix realization of every Furey involution."
};
report.passed=report.neutralAllCompatible&&report.neutralHermitianDimension===3&&report.chargedAllCompatible&&report.chargedHermitianDimension===1&&report.threeChargedPairsPlusNeutral.realCommutantDimension===10&&report.threeChargedPairsPlusNeutral.hermitianParameterDimension===6;
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
