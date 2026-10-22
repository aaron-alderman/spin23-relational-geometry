#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-axial-trace-schur-reduction-v1.json",
  import.meta.url,
),"utf8"));

const dot=(a,b)=>a.reduce((sum,value,i)=>sum+value*b[i],0);
for(const witness of [
  {Ct:3,bX:2,p:[1,-2,0.5,3],Ds:1.25,X:-0.75,s:[2,1,-1,0.25]},
  {Ct:-5,bX:0.7,p:[-1,4,2,-3],Ds:-2,X:1.5,s:[0.5,-2,3,1]},
]){
  const current=witness.p.map((value,i)=>(2*witness.bX/3)*(value*witness.Ds+witness.X*witness.s[i]));
  const stationary=current.map(value=>-value/witness.Ct);
  const original=witness.Ct*dot(stationary,stationary)/2+dot(stationary,current);
  const schur=-dot(current,current)/(2*witness.Ct);
  const compact=-2*witness.bX*witness.bX/(9*witness.Ct)
    *dot(witness.p.map((value,i)=>value*witness.Ds+witness.X*witness.s[i]),
      witness.p.map((value,i)=>value*witness.Ds+witness.X*witness.s[i]));
  assert.ok(Math.abs(original-schur)<1e-12);
  assert.ok(Math.abs(schur-compact)<1e-12);
}

assert.equal(evidence.tensorDerivativeOrder,0);
assert.equal(evidence.directAuxiliaryMsbarPole,0);
assert.equal(evidence.remaining.length,3);

console.log("Spin(2,3) axial-trace Schur reduction: PASS");
console.log("  auxiliary stationary-point and Schur formulas agree");
console.log("  direct trace/tensor determinant MS-bar poles: zero");
console.log("  surviving insertion: -(2 bX^2/(9 Ct))*(pbar Ds+Xbar s)^2");
console.log("  next operation: Ct calibration, coframe completion, reduced trace");
