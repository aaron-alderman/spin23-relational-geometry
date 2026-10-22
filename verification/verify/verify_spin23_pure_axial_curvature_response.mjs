#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-pure-axial-curvature-response-v1.json",
  import.meta.url,
),"utf8"));

const close=(actual,expected,tolerance=1e-12)=>
  assert.ok(Math.abs(actual-expected)<tolerance*Math.max(1,Math.abs(expected)));

for(const witness of [
  {A:2.1,bX:0.8,Ct:-3.4,R:-12},
  {A:0.7,bX:1.9,Ct:4.2,R:5},
]){
  const massSquared=witness.A/witness.bX;
  const scalarPole=-massSquared+witness.R/6;
  const differentiated=-witness.A*scalarPole/witness.bX**2;
  const expected=witness.A**2/witness.bX**3
    -witness.A*witness.R/(6*witness.bX**2);
  close(differentiated,expected);

  const lambda4=-2*witness.bX**2/(9*witness.Ct);
  const deltaXiR=-lambda4*witness.A/(48*witness.bX**2);
  const fromCt=witness.A/(216*witness.Ct);
  close(deltaXiR,fromCt);
}

for(const witness of [
  {A:1.3,a1:2,kappa:0.9},
  {A:3.1,a1:0.4,kappa:1.7},
]){
  const Ct=-2*(witness.a1+1)/(3*witness.kappa);
  const general=witness.A/(216*Ct);
  const critical=-witness.kappa*witness.A/(144*(witness.a1+1));
  close(general,critical);
}

assert.equal(evidence.responses["deltaXiRic_p-loop"],0);
assert.match(evidence.scalarCoincidentPole,/R\/6/);

console.log("Spin(2,3) pure axial curvature response: PASS");
console.log("  minimal-scalar a1 coefficient: R/6");
console.log("  pure-axial deltaXiR: -lambda4*A/(48*pi^2*epsilon*bX^2)");
console.log("  pure-axial deltaXiRic: zero");
console.log("  remaining: mixed metric-axial curvature responses");
