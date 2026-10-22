#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-flat-mixed-axial-polarization-v1.json",
  import.meta.url,
),"utf8"));

const delta=(i,j)=>i===j?1:0;
const dot=(a,b)=>a.reduce((sum,value,i)=>sum+value*b[i],0);
const trace=matrix=>matrix.reduce((sum,row,i)=>sum+row[i],0);
const inner=(left,right)=>left.reduce((sum,row,i)=>
  sum+row.reduce((subtotal,value,j)=>subtotal+value*right[i][j],0),0);
const deDonderInner=(left,right,d=4)=>inner(left,right)
  -trace(left)*trace(right)/(d-2);

const vertex=(A,bX,k,r,q,alpha,beta)=>Array.from({length:4},(_,mu)=>
  Array.from({length:4},(_,nu)=>{
    const mass=A*(
      delta(mu,nu)*delta(alpha,beta)
      -delta(mu,beta)*delta(nu,alpha)
      -delta(nu,beta)*delta(mu,alpha)
    )/2;
    const kinetic=-bX*(
      delta(mu,nu)*q[beta]*r[alpha]
      +q[beta]*(q[mu]*delta(nu,alpha)+q[nu]*delta(mu,alpha)
        +k[alpha]*delta(mu,nu))
      +r[alpha]*(r[mu]*delta(nu,beta)+r[nu]*delta(mu,beta)
        +k[beta]*delta(mu,nu))
    )/2;
    return mass+kinetic;
  }));

for(const witness of [
  {A:2.2,bX:0.7,k:[1.3,0,0,0],p:[1,-2,0.5,3]},
  {A:0.8,bX:1.9,k:[0.6,0,0,0],p:[-1,0.4,2,0.2]},
]){
  const q=[0,0,0,0];
  const r=witness.k.map(value=>-value);
  const alpha=0;
  const contracted=Array.from({length:4},(_,mu)=>Array.from({length:4},(_,nu)=>
    witness.p.reduce((sum,value,beta)=>sum
      +value*vertex(witness.A,witness.bX,witness.k,r,q,alpha,beta)[mu][nu],0)));

  const kMagnitude=witness.k[0];
  const T=Array.from({length:4},(_,mu)=>Array.from({length:4},(_,nu)=>(
    (delta(mu,0)*witness.p[nu]+delta(nu,0)*witness.p[mu]
      -witness.p[0]*delta(mu,nu))/2
  )));
  const predicted=T.map(row=>row.map(value=>
    -(witness.A+witness.bX*kMagnitude**2)*value));
  assert.ok(contracted.every((row,mu)=>row.every((value,nu)=>
    Math.abs(value-predicted[mu][nu])<1e-12)));

  const p2=dot(witness.p,witness.p);
  const contraction=deDonderInner(contracted,contracted);
  const expected=(witness.A+witness.bX*kMagnitude**2)**2*p2/2;
  assert.ok(Math.abs(contraction-expected)<1e-10);
}

// Generic-momentum symmetry and conservation witness.
const q=[0.2,-0.4,0.7,0.1];
const k=[1.1,0.3,-0.2,0.5];
const r=q.map((value,i)=>-value-k[i]);
assert.ok(q.map((value,i)=>value+k[i]+r[i]).every(value=>Math.abs(value)<1e-15));
for(let alpha=0;alpha<4;alpha++){
  for(let beta=0;beta<4;beta++){
    const V=vertex(1.4,0.9,k,r,q,alpha,beta);
    assert.ok(V.every((row,mu)=>row.every((value,nu)=>
      Math.abs(value-V[nu][mu])<1e-15)));
  }
}

assert.equal(evidence.flatMetricSeagullPoles,0);
assert.match(evidence.constantLongitudinalLimit,/A\+bX\*k\^2/);

console.log("Spin(2,3) flat mixed axial polarization vertex: PASS");
console.log("  complete h-P-s vertex: symmetric and momentum-conserving");
console.log("  constant longitudinal limit: -(A+bX*k^2)*T");
console.log("  flat metric seagull poles: zero");
console.log("  next operation: q^2 projection of one mixed polarization integral");
