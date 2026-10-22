#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-inserted-graviton-einstein-response-v1.json",
  import.meta.url,
),"utf8"));

const d=4;
const delta=(i,j)=>i===j?1:0;
const close=(x,y)=>assert.ok(Math.abs(x-y)<1e-10*Math.max(1,Math.abs(y)));

const contract=(Ric,Pv)=>{
  let R=0;
  for(let i=0;i<d;i++) R+=Ric[i][i];
  const riemann=(i,a,j,b)=>{
    const ric=(
      delta(i,j)*Ric[b][a]-delta(i,b)*Ric[j][a]
      -delta(a,j)*Ric[b][i]+delta(a,b)*Ric[j][i]
    )/(d-2);
    const scalar=-R*(
      delta(i,j)*delta(a,b)-delta(i,b)*delta(a,j)
    )/((d-1)*(d-2));
    return ric+scalar;
  };
  const J=(v,m,n)=>0.5*Pv[v]*delta(m,n)
    -0.5*(delta(v,m)*Pv[n]+delta(v,n)*Pv[m]);
  const P=(m,n,r,s)=>0.5*(delta(m,r)*delta(n,s)+delta(m,s)*delta(n,r))
    -delta(m,n)*delta(r,s)/(d-2);
  const I=(r,s,a,b)=>0.5*(delta(r,a)*delta(s,b)+delta(r,b)*delta(s,a));
  const V=(r,s,a,b)=>riemann(r,a,s,b)+riemann(r,b,s,a);

  let result=0;
  for(let v=0;v<d;v++) for(let m=0;m<d;m++) for(let n=0;n<d;n++)
  for(let r=0;r<d;r++) for(let s=0;s<d;s++) for(let a=0;a<d;a++)
  for(let b=0;b<d;b++) result+=J(v,m,n)*P(m,n,r,s)
    *(R*I(r,s,a,b)/6+V(r,s,a,b))*J(v,a,b);

  let p2=0;
  let ricPP=0;
  for(let i=0;i<d;i++){
    p2+=Pv[i]*Pv[i];
    for(let j=0;j<d;j++) ricPP+=Pv[i]*Ric[i][j]*Pv[j];
  }
  return {result,R,p2,ricPP};
};

for(const sample of [
  {Ric:[[1,0,0,0],[0,2,0,0],[0,0,3,0],[0,0,0,4]],P:[1,0,0,0]},
  {Ric:[[1,0,0,0],[0,2,0,0],[0,0,3,0],[0,0,0,4]],P:[0,1,0,0]},
  {Ric:[[2,0,0,0],[0,2,0,0],[0,0,2,0],[0,0,0,2]],P:[1,2,0,0]},
]){
  const x=contract(sample.Ric,sample.P);
  close(x.result,x.R*x.p2/3-2*x.ricPP);
}

const einstein=contract(
  [[3,0,0,0],[0,3,0,0],[0,0,3,0],[0,0,0,3]],
  [1,-2,3,1],
);
close(einstein.result,-einstein.R*einstein.p2/6);

// -(A/4) * [4 kappa/(16 pi^2 eps)] * [-R P^2/6]
// = +kappa A R P^2/(96 pi^2 eps), and matching 1/2 q R P^2
// gives q=kappa A/(48 pi^2 eps).
const normalizedPole=-(1/4)*4*(-1/6)/16;
close(normalizedPole,1/96);
close(2*normalizedPole,1/48);

assert.match(evidence.parallelJetEinsteinCombination,/48\*pi\^2\*epsilon/);
assert.equal(evidence.remaining.length,2);

console.log("Spin(2,3) inserted graviton Einstein response: PASS");
console.log("  general contraction: (R/3) P^2-2 Ric(P,P)");
console.log("  Einstein contraction: -(R/6) P^2");
console.log("  parallel-jet q_mix: kappa*A/(48*pi^2*epsilon)");
console.log("  remaining: curvature-integrability defect");
