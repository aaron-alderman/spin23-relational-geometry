#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-axial-torsion-response-inverse-v1.json",
  import.meta.url,
),"utf8"));

const forward=(p,g)=>({
  Bobs:p.B,
  M1:p.A+g.R1*p.xiR+g.R1*p.xiRic/4,
  M2:p.A+g.R2*p.xiR+g.R2*p.xiRic/4,
  Zobs:p.Z,
  M3:p.A+g.R3*p.xiR+g.rParallel*p.xiRic,
});

const inverse=(y,g)=>{
  const deltaR=g.R2-g.R1;
  const tracelessRicci=g.rParallel-g.R3/4;
  assert.notEqual(deltaR,0);
  assert.notEqual(tracelessRicci,0);
  const q=(y.M2-y.M1)/deltaR;
  const A=y.M1-g.R1*q;
  const xiRic=(y.M3-A-g.R3*q)/tracelessRicci;
  return {A,B:y.Bobs,Z:y.Zobs,xiR:q-xiRic/4,xiRic};
};

const close=(actual,expected,tolerance=1e-10)=>{
  for(const key of evidence.parameterOrder){
    const scale=Math.max(1,Math.abs(expected[key]));
    assert.ok(Math.abs(actual[key]-expected[key])<=tolerance*scale,
      `${key}: ${actual[key]} != ${expected[key]}`);
  }
};

const geometry=evidence.geometry;
const witness=evidence.witness.parameters;
assert.deepEqual(forward(witness,geometry),evidence.witness.responses);
close(inverse(evidence.witness.responses,geometry),witness,0);

let state=0x1649;
const random=()=>{
  state=(1664525*state+1013904223)>>>0;
  return state/0x100000000;
};
for(let trial=0;trial<256;trial+=1){
  const parameters=Object.fromEntries(evidence.parameterOrder.map(key=>[key,20*random()-10]));
  const R1=-20+5*random();
  const R2=5+15*random();
  const R3=-15+30*random();
  const rParallel=R3/4+1+4*random();
  const trialGeometry={R1,R2,R3,rParallel};
  close(inverse(forward(parameters,trialGeometry),trialGeometry),parameters);
}

assert.deepEqual(evidence.singularLoci,["R2=R1","rParallel=R3/4"]);

console.log("Spin(2,3) axial-torsion response inverse: PASS");
console.log("  exact rational witness reconstructed: 5/5 coefficients");
console.log("  deterministic floating trials: 256/256");
console.log("  singular loci: R2=R1 or r_parallel=R3/4");
console.log("  next operation: compute the five torsionful one-loop responses");
