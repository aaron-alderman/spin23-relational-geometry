#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-second-class-pseudoscalar-momentum-response-v1.json",
  import.meta.url,
),"utf8"));

assert.equal(evidence.pairingDeterminantJPower,-11);
assert.equal(evidence.firstDerivativeAtZero,0);
assert.equal(evidence.covariantResponseAssigned,false);
assert.equal(evidence.missingBridge.length,4);

const logMeasure=(pPi,J,m)=>-17*Math.log(J)
  +3*Math.log(m*m+(pPi/(6*J))**2);
const predictedSecond=(J,m)=>1/(6*J*J*m*m);

for(const [J,m] of [[1,2],[3,5],[0.75,1.25]]){
  assert.ok(J>0&&m!==0);
  const errors=[1e-1,5e-2,2.5e-2].map(h=>{
    const numeric=(logMeasure(h,J,m)-2*logMeasure(0,J,m)+logMeasure(-h,J,m))/(h*h);
    return Math.abs(numeric-predictedSecond(J,m));
  });
  assert.ok(errors[1]<errors[0]);
  assert.ok(errors[2]<errors[1]);
  assert.ok(errors.at(-1)<2e-6);
  const odd=(logMeasure(1e-3,J,m)-logMeasure(-1e-3,J,m))/(2e-3);
  assert.ok(Math.abs(odd)<1e-12);
}

// J exponents: sqrt(det A) contributes -6; |det E| contributes -11.
assert.equal(-6+evidence.pairingDeterminantJPower,-17);

console.log("Spin(2,3) second-class pseudoscalar-momentum response: PASS");
console.log("  log measure is even: first response at pPi=0 is zero");
console.log("  second response: 1/(6 J^2 m^2)");
console.log("  covariant EFT coefficient: deliberately unassigned");
console.log("  next operation: construct the canonical-to-covariant Legendre/source map");
