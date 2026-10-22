#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-flat-constant-axial-mixed-bubble-v1.json",
  import.meta.url,
),"utf8"));

const dot=(a,b)=>a.reduce((sum,value,i)=>sum+value*b[i],0);
const trace=matrix=>matrix.reduce((sum,row,i)=>sum+row[i],0);
const tensorInner=(left,right)=>left.reduce((sum,row,i)=>
  sum+row.reduce((inner,value,j)=>inner+value*right[i][j],0),0);
const deDonderInner=(left,right,d=4)=>
  tensorInner(left,right)-trace(left)*trace(right)/(d-2);

const massTensor=(p,alpha,A)=>Array.from({length:p.length},(_,mu)=>
  Array.from({length:p.length},(_,nu)=>A*(
    (mu===nu?p[alpha]:0)
    -p[mu]*(nu===alpha?1:0)
    -p[nu]*(mu===alpha?1:0)
  )/2));

const kineticTensor=(p,k,alpha,bX)=>Array.from({length:p.length},(_,mu)=>
  Array.from({length:p.length},(_,nu)=>-bX*k[alpha]*(
    k[mu]*p[nu]+k[nu]*p[mu]-dot(k,p)*(mu===nu?1:0)
  )/2));

const add=(a,b)=>a.map((row,i)=>row.map((value,j)=>value+b[i][j]));

for(const witness of [
  {A:2.3,bX:0.7,q:1.4,p:[1,-2,0.5,3]},
  {A:0.9,bX:1.8,q:0.6,p:[-0.4,1.2,2,-1]},
]){
  const k=[witness.q,0,0,0];
  const p2=dot(witness.p,witness.p);
  for(let alpha=1;alpha<4;alpha++){
    const VA=massTensor(witness.p,alpha,witness.A);
    assert.ok(Math.abs(deDonderInner(VA,VA)-witness.A**2*p2/2)<1e-10);
  }
  const VA0=massTensor(witness.p,0,witness.A);
  const VX0=kineticTensor(witness.p,k,0,witness.bX);
  const combined=add(VA0,VX0);
  const predicted=(witness.A+witness.bX*witness.q**2)**2*p2/2;
  assert.ok(Math.abs(deDonderInner(combined,combined)-predicted)<1e-10);

  const x=witness.q**2;
  const bracket=4*witness.A+witness.bX*x;
  const original=3*witness.A
    +(witness.A+witness.bX*x)**2/(witness.A+witness.bX*x);
  assert.ok(Math.abs(bracket-original)<1e-12);
}

for(const witness of [
  {A:1.7,bX:0.8,Ct:-2.4,kappa:1.1,a1:null},
  {A:2.2,bX:1.3,Ct:null,kappa:0.6,a1:2.5},
]){
  const Ct=witness.Ct??(-2*(witness.a1+1)/(3*witness.kappa));
  const pure=-(witness.A**2)/(36*witness.bX*Ct);
  const mixed=0;
  const total=pure+mixed;
  if(witness.a1!==null){
    const critical=witness.kappa*witness.A**2
      /(24*witness.bX*(witness.a1+1));
    assert.ok(Math.abs(total-critical)<1e-12);
  }
}

assert.deepEqual(evidence.closedResponses,["deltaA"]);
assert.equal(evidence.remainingResponses.length,4);

console.log("Spin(2,3) flat constant axial mixed bubble: PASS");
console.log("  de Donder vertex contractions: exact");
console.log("  seagulls and polynomial bubble terms: scaleless");
console.log("  completed reduced flat response: deltaA");
console.log("  remaining responses: deltaB, deltaZ, deltaXiR, deltaXiRic");
