#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsionful-loop-source-order-readiness-v1.json",
  import.meta.url,
),"utf8"));

assert.equal(evidence.sectors.length,4);
for(const sector of evidence.sectors){
  assert.notEqual(sector.zeroSource,"missing");
  assert.equal(sector.firstSourceDerivative,"missing");
  assert.equal(sector.secondSourceDerivative,"missing");
}

const required=evidence.sectors.length*2;
const available=evidence.sectors.reduce((count,sector)=>count
  +(sector.firstSourceDerivative!=="missing"?1:0)
  +(sector.secondSourceDerivative!=="missing"?1:0),0);
assert.equal(evidence.requiredSourceDerivativeObjects,required);
assert.equal(evidence.availableSourceDerivativeObjects,available);
assert.equal(required,8);
assert.equal(available,0);
assert.equal(evidence.nextPayload.length,required);
assert.equal(new Set(evidence.nextPayload).size,required);
assert.equal(evidence.targetResponses.length,5);
assert.equal(evidence.responsesDeterminedByExistingZeroSourceData,0);

// Finite-dimensional check of the epsilon^2 log-determinant coefficient.
const det2=m=>m[0][0]*m[1][1]-m[0][1]*m[1][0];
const mul=(a,b)=>a.map((row,i)=>b[0].map((_,j)=>row.reduce((s,x,k)=>s+x*b[k][j],0)));
const trace=m=>m.reduce((s,row,i)=>s+row[i],0);
const add=(a,b,scale=1)=>a.map((row,i)=>row.map((x,j)=>x+scale*b[i][j]));
const h0=[[3,1],[1,2]],h1=[[2,-1],[-1,4]],h2=[[1,2],[2,-3]];
const inv0=[[2/5,-1/5],[-1/5,3/5]];
const predicted=trace(mul(inv0,h2))-trace(mul(mul(mul(inv0,h1),inv0),h1))/2;
const logdet=e=>Math.log(det2(add(add(h0,h1,e),h2,e*e)));
const errors=[1e-2,1e-3,5e-4,2.5e-4].map(e=>{
  const numeric=(logdet(e)+logdet(-e)-2*logdet(0))/(2*e*e);
  return Math.abs(numeric-predicted);
});
for(let i=1;i<errors.length;i+=1)assert.ok(errors[i]<errors[i-1]);
assert.ok(errors.at(-1)<5e-6);

console.log("Spin(2,3) torsionful loop source-order readiness: PASS");
console.log("  determinant/measure sectors: 4");
console.log("  required source derivatives: 8; available: 0");
console.log("  axial loop responses fixed by zero-source data: 0/5");
console.log("  exhaustion boundary: construct the torsionful source-expanded operators");
