#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-canonical-pseudoscalar-legendre-map-v1.json",
  import.meta.url,
),"utf8"));

const primary=(b2,b3,kappa,RcircPerp,RperpCirc)=>(
  -(b2+b3)*RperpCirc-(b2-b3)*RcircPerp
)/kappa;

for(const witness of [
  {b3:-2,kappa:3,Rc:5,Rp:7},
  {b3:4,kappa:9,Rc:-3,Rp:11},
  {b3:-7,kappa:2,Rc:0.5,Rp:-1.25},
]){
  const Y=witness.Rc-witness.Rp;
  const B=-witness.b3/witness.kappa;
  const pOverJ=primary(0,witness.b3,witness.kappa,witness.Rc,witness.Rp);
  assert.ok(Math.abs(pOverJ-witness.b3*Y/witness.kappa)<1e-12);
  assert.ok(Math.abs(pOverJ+B*Y)<1e-12);
}

const logMeasureY=(Y,B,m)=>3*Math.log(m*m+B*B*Y*Y/36);
for(const [B,m] of [[2,3],[0.5,4],[7,1.5]]){
  const predicted=B*B/(6*m*m);
  const errors=[4e-2,2e-2,1e-2].map(h=>{
    const numeric=(logMeasureY(h,B,m)-2*logMeasureY(0,B,m)+logMeasureY(-h,B,m))/(h*h);
    return Math.abs(numeric-predicted);
  });
  assert.ok(errors[1]<errors[0]);
  assert.ok(errors[2]<errors[1]);
  assert.ok(errors.at(-1)<2e-4);
}

const permutationSign=indices=>{
  if(new Set(indices).size!==4)return 0;
  let inversions=0;
  for(let i=0;i<4;i+=1)for(let j=i+1;j<4;j+=1)if(indices[i]>indices[j])inversions+=1;
  return inversions%2?-1:1;
};
const epsilonUpper=(a,b,c,d)=>-permutationSign([a,b,c,d]);
const component=(basis,a,b,c,d)=>{
  const [p,q,r,s]=basis;
  if(new Set([a,b]).size<2||new Set([c,d]).size<2)return 0;
  const first=(a===p&&b===q)?1:(a===q&&b===p)?-1:0;
  const second=(c===r&&d===s)?1:(c===s&&d===r)?-1:0;
  return first*second;
};
const pairs=[];for(let a=0;a<4;a+=1)for(let b=a+1;b<4;b+=1)pairs.push([a,b]);
for(const first of pairs)for(const second of pairs){
  const basis=[...first,...second];
  let P=0,RcircPerp=0,RperpCirc=0;
  for(let a=0;a<4;a+=1)for(let b=0;b<4;b+=1)
    for(let c=0;c<4;c+=1)for(let d=0;d<4;d+=1)
      P+=epsilonUpper(a,b,c,d)*component(basis,a,b,c,d);
  for(let i=1;i<4;i+=1)for(let j=1;j<4;j+=1)for(let k=1;k<4;k+=1){
    const epsilon=epsilonUpper(i,j,k,0);
    RcircPerp+=epsilon*component(basis,i,j,k,0);
    RperpCirc+=epsilon*component(basis,0,i,j,k);
  }
  const Y=RcircPerp-RperpCirc;
  const Xhat=P/2;
  assert.equal(P,2*Y);
  assert.equal(Xhat,Y);
}

assert.equal(evidence.cX,1);
assert.equal(evidence.dimensionalRegularizationValue,0);
assert.equal(evidence.packetMSbarPoleFromConstraintMeasureSlice,0);
assert.deepEqual(evidence.sourceEquations,["3.23a","4.25","4.26a"]);

console.log("Spin(2,3) canonical pseudoscalar Legendre map: PASS");
console.log("  critical relation: pPi/J=(b3/kappa)Y=-B Y");
console.log("  log-measure second Y response: B^2/(6 m^2)");
console.log("  component/form normalization: Y=Xhat on 36/36 curvature basis elements");
console.log("  ultralocal functional trace: zero MS-bar pole in dimensional regularization");
