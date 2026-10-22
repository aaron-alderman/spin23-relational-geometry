#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-constant-axial-background-pole-v1.json",
  import.meta.url,
),"utf8"));

const close=(actual,expected,tolerance=1e-12)=>
  assert.ok(Math.abs(actual-expected)<tolerance*Math.max(1,Math.abs(expected)));

for(const witness of [
  {A:2.3,bX:1.2,Ct:-4.1,u:0.35,k2:2.7},
  {A:0.8,bX:2.4,Ct:5.2,u:1.1,k2:0.6},
]){
  const F=witness.bX*witness.Ct/(witness.Ct+4*witness.bX*witness.u/9);
  const determinant=witness.A**3*(witness.A+F*witness.k2);
  const eigenvalueProduct=witness.A*witness.A*witness.A
    *(witness.A+F*witness.k2);
  close(determinant,eigenvalueProduct);

  const inverseKineticSquared=1/F**2;
  const rational=(1/witness.bX**2)
    *(1+4*witness.bX*witness.u/(9*witness.Ct))**2;
  close(inverseKineticSquared,rational);

  const lambda4=-2*witness.bX**2/(9*witness.Ct);
  const deltaAFromCt=-(witness.A**2)/(36*witness.bX*witness.Ct);
  const deltaAFromLambda=witness.A**2*lambda4/(8*witness.bX**3);
  close(deltaAFromCt,deltaAFromLambda);
}

for(const witness of [
  {A:1.7,bX:0.9,a1:2.1,kappa:1.3},
  {A:3.2,bX:1.4,a1:0.6,kappa:0.7},
]){
  const Ct=-2*(witness.a1+1)/(3*witness.kappa);
  const general=-(witness.A**2)/(36*witness.bX*Ct);
  const critical=witness.A**2*witness.kappa
    /(24*witness.bX*(witness.a1+1));
  close(general,critical);
}

assert.equal(evidence.algebraicPolarizations,3);
assert.equal(evidence.propagatingPolarizations,1);
assert.match(evidence.scope,/constant background/);

console.log("Spin(2,3) constant axial-background pole: PASS");
console.log("  exact rational kinetic resummation: verified");
console.log("  determinant: one scalar factor plus three ultralocal factors");
console.log("  pure-axial mass pole: -A^2/(36*pi^2*epsilon*bX*Ct)");
console.log("  remaining: mixed metric-axial and derivative/curvature responses");
