#!/usr/bin/env node

const alpha=1,beta=10,k=1;
// Variable order (a,d,b,c,e,f) around K0=k[e1,e2].
const H=[
  [8*(alpha+beta)*k*k,8*(alpha-beta)*k*k,0,0,0,0],
  [8*(alpha-beta)*k*k,8*(alpha+beta)*k*k,0,0,0,0],
  [0,0,8*beta*k*k,8*beta*k*k,0,0],
  [0,0,8*beta*k*k,8*beta*k*k,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0]
];
const mul=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const eqVec=(a,b)=>a.every((x,i)=>x===b[i]);
const modes=[
  {name:"radial",v:[1,1,0,0,0,0],eigenvalue:16*alpha*k*k},
  {name:"singular-value anisotropy",v:[1,-1,0,0,0,0],eigenvalue:16*beta*k*k},
  {name:"symmetric shear",v:[0,0,1,1,0,0],eigenvalue:16*beta*k*k},
  {name:"in-plane rotation Goldstone",v:[0,0,1,-1,0,0],eigenvalue:0},
  {name:"normal tilt 1 Goldstone",v:[0,0,0,0,1,0],eigenvalue:0},
  {name:"normal tilt 2 Goldstone",v:[0,0,0,0,0,1],eigenvalue:0}
];
for(const m of modes)m.verified=eqVec(mul(H,m.v),m.v.map(x=>x*m.eigenvalue));
const report={
  protocol:"locking-potential-hessian/1",
  potential:"alpha(tr K^T K-v^2)^2 + beta[(tr K^T K)^2-4 det(K^T K)]",
  parameters:{alpha,beta,k,vSquared:2*k*k},
  hessian:H,
  modes,
  physicalAfterGauging:{
    lightRadialMassSquared:16*alpha*k*k,
    twoExtraMassSquared:16*beta*k*k,
    hierarchyRatio:beta/alpha,
    eatenGoldstones:3
  },
  conclusion:[
    "The isotropic vacuum has exactly three Goldstone zero modes.",
    "The three amplitude modes split into one radial mode controlled by alpha and two degenerate isotropy-restoring modes controlled by beta.",
    "beta much larger than alpha decouples the two extra scalars, but the hierarchy is a free potential choice until derived."
  ]
};
report.passed=modes.every(m=>m.verified)&&report.physicalAfterGauging.hierarchyRatio===10;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
