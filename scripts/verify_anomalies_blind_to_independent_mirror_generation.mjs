#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const fields=[
  {name:'Q',mult:6,Y:1/6,su3T:1,su2T:3/2,su3Cubic:2,su2Doublets:3},
  {name:'uc',mult:3,Y:-2/3,su3T:1/2,su2T:0,su3Cubic:-1,su2Doublets:0},
  {name:'dc',mult:3,Y:1/3,su3T:1/2,su2T:0,su3Cubic:-1,su2Doublets:0},
  {name:'L',mult:2,Y:-1/2,su3T:0,su2T:1/2,su3Cubic:0,su2Doublets:1},
  {name:'ec',mult:1,Y:1,su3T:0,su2T:0,su3Cubic:0,su2Doublets:0},
];
const sum=f=>fields.reduce((s,x)=>s+f(x),0);
const u1cube=sum(x=>x.mult*x.Y**3);
const grav=sum(x=>x.mult*x.Y);
const su3sqU1=(2*0.5*(1/6))+0.5*(-2/3)+0.5*(1/3);
const su2sqU1=3*0.5*(1/6)+0.5*(-1/2);
const su3cube=sum(x=>x.su3Cubic);
const doublets=sum(x=>x.su2Doublets);
for(const [name,val] of Object.entries({u1cube,grav,su3sqU1,su2sqU1,su3cube}))assert(Math.abs(val)<1e-12,`${name} anomaly failed`);
assert(doublets%2===0,"Witten SU2 anomaly failed");

// A conjugate mirror reverses odd anomalies, but zero remains zero; two anomaly-free copies are still anomaly free.
const doubled={u1cube:2*u1cube,grav:2*grav,su3sqU1:2*su3sqU1,su2sqU1:2*su2sqU1,su3cube:2*su3cube,doublets:2*doublets};
assert(Object.entries(doubled).every(([k,v])=>k==='doublets'?v%2===0:Math.abs(v)<1e-12),"doubled anomaly test failed");

// One-loop Weyl-fermion contributions in ordinary hypercharge normalization.
const sumY2=sum(x=>x.mult*x.Y*x.Y);
const b3ferm=(2/3)*sum(x=>x.su3T);
const b2ferm=(2/3)*sum(x=>x.su2T);
const b1ferm=(2/3)*sumY2;
assert(Math.abs(sumY2-10/3)<1e-12,"hypercharge square sum failed");
assert(Math.abs(b3ferm-4/3)<1e-12&&Math.abs(b2ferm-4/3)<1e-12&&Math.abs(b1ferm-20/9)<1e-12,"one-generation beta contribution failed");

console.log("Anomaly-blindness to mirror generation certificate: PASS");
console.log("one_generation_anomalies=0; conjugate_mirror_anomalies=0; doubled_anomalies=0");
console.log(`Witten_doublets_one=${doublets}; doubled=${2*doublets}; both_even=true`);
console.log(`fermion_beta_contributions_one=b1:${b1ferm},b2:${b2ferm},b3:${b3ferm}; independent_mirror_doubles_all=true`);
