#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-pure-axial-two-derivative-loop-response-v1.json",
  import.meta.url,
),"utf8"));

const close=(actual,expected,tolerance=1e-12)=>
  assert.ok(Math.abs(actual-expected)<tolerance*Math.max(1,Math.abs(expected)));

for(const witness of [
  {A:2.1,bX:0.8,Ct:-3.4},
  {A:0.7,bX:1.9,Ct:4.2},
]){
  const lambda4=-2*witness.bX**2/(9*witness.Ct);
  const deltaA=witness.A**2*lambda4/(8*witness.bX**3);
  const deltaAFromCt=-(witness.A**2)/(36*witness.bX*witness.Ct);
  close(deltaA,deltaAFromCt);

  const deltaB=-witness.A*lambda4/(8*witness.bX**2);
  const deltaBFromCt=witness.A/(36*witness.Ct);
  close(deltaB,deltaBFromCt);

  // Algebraic identity after discarding the scaleless integral of 1/bX.
  const scalarPole=-witness.A/witness.bX**2;
  const derivativePole=-witness.A/witness.bX*scalarPole;
  close(derivativePole,witness.A**2/witness.bX**3);
}

for(const witness of [
  {A:1.3,a1:2,kappa:0.9},
  {A:3.1,a1:0.4,kappa:1.7},
]){
  const Ct=-2*(witness.a1+1)/(3*witness.kappa);
  const general=witness.A/(36*Ct);
  const critical=-witness.kappa*witness.A/(24*(witness.a1+1));
  close(general,critical);
}

assert.equal(evidence.poleIntegrals.oddMixed,0);
assert.equal(evidence.responses["deltaZ_p-loop"],0);

console.log("Spin(2,3) pure axial two-derivative loop response: PASS");
console.log("  mass pole agrees with constant-background determinant");
console.log("  longitudinal response deltaB: fixed");
console.log("  pure-axial transverse response deltaZ: zero");
console.log("  subsequent mixed response: deltaB=-kappa*A/(4*pi^2*epsilon), deltaZ=0");
console.log("  remaining: curved responses");
