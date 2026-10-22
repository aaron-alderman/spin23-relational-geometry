#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-exact-trace-torsion-elimination-v1.json",
  import.meta.url,
),"utf8"));

const dot=(a,b)=>a.reduce((sum,value,i)=>sum+value*b[i],0);
const lagrangian=(t,p,Y0,Ct,bX)=>Ct*dot(t,t)/2+bX*(Y0+(2/3)*dot(t,p))**2/2;

for(const witness of [
  {p:[1,-2,0.5,3],Y0:1.25,Ct:4,bX:0.7},
  {p:[-1,0.25,2,-0.5],Y0:-2,Ct:-6,bX:0.4},
]){
  const p2=dot(witness.p,witness.p);
  const delta=witness.Ct+4*witness.bX*p2/9;
  assert.ok(Math.abs(delta)>1e-8);
  const tStar=witness.p.map(value=>-(2*witness.bX/3)*witness.Y0*value/delta);
  const gradient=tStar.map((value,i)=>witness.Ct*value
    +(2*witness.bX/3)*witness.p[i]*(witness.Y0+(2/3)*dot(tStar,witness.p)));
  assert.ok(gradient.every(value=>Math.abs(value)<1e-12));
  const reduced=(witness.bX/2)*(witness.Ct/delta)*witness.Y0**2;
  assert.ok(Math.abs(lagrangian(tStar,witness.p,witness.Y0,witness.Ct,witness.bX)-reduced)<1e-12);
  const determinant=witness.Ct**4*(1+4*witness.bX*p2/(9*witness.Ct));
  assert.ok(Math.abs(determinant-witness.Ct**3*delta)<1e-12*Math.max(1,Math.abs(determinant)));
}

for(const witness of [{a1:1,kappa:2,bX:3},{a1:4,kappa:0.5,bX:0.25}]){
  const Ct=-2*(witness.a1+1)/(3*witness.kappa);
  const lambda=-2*witness.bX**2/(9*Ct);
  const critical=witness.kappa*witness.bX**2/(3*(witness.a1+1));
  const pStar2=3*(witness.a1+1)/(2*witness.kappa*witness.bX);
  assert.ok(Math.abs(lambda-critical)<1e-12);
  assert.ok(Math.abs(Ct+4*witness.bX*pStar2/9)<1e-12);
}

// Verify the quadratic-background expansion of p^2*(Dp)^2.
const pbar=[1,-2,0.5,3],s=[-0.25,2,1,-1],Xbar=0.7,Ds=-1.3;
const f=epsilon=>dot(pbar.map((value,i)=>value+epsilon*s[i]),pbar.map((value,i)=>value+epsilon*s[i]))
  *(Xbar+epsilon*Ds)**2;
const predicted=dot(pbar,pbar)*Ds**2+4*dot(pbar,s)*Xbar*Ds+dot(s,s)*Xbar**2;
const h=1e-4;
const numeric=(f(h)-2*f(0)+f(-h))/(2*h*h);
assert.ok(Math.abs(numeric-predicted)<1e-6);

assert.equal(evidence.traceDeterminantMsbarPole,0);
assert.match(evidence.criticalQuarticCoefficient,/a1\+1/);

console.log("Spin(2,3) exact trace-torsion elimination: PASS");
console.log("  stationary trace and rational reduced action: exact");
console.log("  covariant quartic coefficient: kappa bX^2/(3(a1+1))");
console.log("  trace multiplication determinant MS-bar pole: zero");
console.log("  next operation: metric-axial one-loop trace and response projection");
