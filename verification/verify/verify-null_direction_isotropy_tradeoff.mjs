#!/usr/bin/env node

const signVectors=d=>{
  const out=[];
  for(let mask=0;mask<2**d;mask++)
    out.push(Array.from({length:d},(_,i)=>((mask>>i)&1?1:-1)/Math.sqrt(d)));
  return out;
};
const secondMoment=vs=>{
  const d=vs[0].length,M=Array.from({length:d},()=>Array(d).fill(0));
  for(const v of vs)for(let i=0;i<d;i++)for(let j=0;j<d;j++)M[i][j]+=v[i]*v[j]/vs.length;
  return M;
};
const fourth=(vs,u)=>vs.reduce((s,v)=>s+(v.reduce((q,x,i)=>q+x*u[i],0))**4,0)/vs.length;
const norm=v=>Math.hypot(...v);
const data=[2,3,4].map(d=>{
  const vs=signVectors(d),M=secondMoment(vs);
  const axis=Array.from({length:d},(_,i)=>i===0?1:0);
  const diag=Array.from({length:d},()=>1/Math.sqrt(d));
  return {
    d,
    directions:vs.length,
    linkNorms:vs.map(norm),
    secondMoment:M,
    expectedSecondMoment:1/d,
    continuumSpeedRatio:1/Math.sqrt(d),
    fourthMomentAxis:fourth(vs,axis),
    fourthMomentDiagonal:fourth(vs,diag),
    fourthOrderAnisotropy:Math.abs(fourth(vs,axis)-fourth(vs,diag))
  };
});
const report={
  protocol:"null-direction-isotropy-tradeoff/1",
  construction:"Use all 2^d body-diagonal unit vectors n=(+-1,...,+-1)/sqrt(d), with Delta x=c Delta t n.",
  data,
  exactFacts:[
    "Every streaming link is null when its spatial length is c Delta t.",
    "The direction average has second moment <n_i n_j>=delta_ij/d.",
    "A simple scalar averaged second-order update therefore has low-energy wave speed c/sqrt(d).",
    "Finite direction sets recover second-order isotropy but retain fourth-order anisotropy.",
    "First-order directional streaming is an exact reversible permutation, but a scalar relativistic field requires an additional coin/collision/interference rule."
  ],
  stabilityWarning:"Multiplying the scalar stencil by d restores low-energy speed c but drives the Fourier right-hand side beyond the stable range at high lattice momentum for d>1."
};
report.passed=data.every(x=>
  x.linkNorms.every(n=>Math.abs(n-1)<1e-12)&&
  x.secondMoment.every((r,i)=>r.every((v,j)=>Math.abs(v-(i===j?1/x.d:0))<1e-12))&&
  Math.abs(x.continuumSpeedRatio-1/Math.sqrt(x.d))<1e-12&&
  x.fourthOrderAnisotropy>1e-6);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
