#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-axial-torsion-matching-background-suite-v1.json",
  import.meta.url,
),"utf8"));

const [m1,m2,m3]=evidence.backgrounds;
assert.equal(m1.scalarCurvature,12*m1.sectionalCurvature);
assert.equal(m2.scalarCurvature,12*m2.sectionalCurvature);
assert.equal(m3.scalarCurvature,2*m3.factorCurvatures.reduce((a,b)=>a+b,0));
assert.equal(m3.ricciEigenvalues.reduce((a,b)=>a+b,0),m3.scalarCurvature);
assert.notEqual(m3.selectedParallelEigenvalue,m3.scalarCurvature/4);

const rank=(input,tolerance=1e-12)=>{
  const a=input.map(row=>row.slice());let r=0;
  for(let c=0;c<a[0].length&&r<a.length;c+=1){
    let p=r;for(let i=r+1;i<a.length;i+=1)if(Math.abs(a[i][c])>Math.abs(a[p][c]))p=i;
    if(Math.abs(a[p][c])<=tolerance)continue;
    [a[r],a[p]]=[a[p],a[r]];const pivot=a[r][c];
    for(let j=c;j<a[r].length;j+=1)a[r][j]/=pivot;
    for(let i=0;i<a.length;i+=1)if(i!==r){const f=a[i][c];for(let j=c;j<a[i].length;j+=1)a[i][j]-=f*a[r][j];}
    r+=1;
  }return r;
};
assert.equal(rank(evidence.responseMatrix),evidence.rank);
const expected=(m2.scalarCurvature-m1.scalarCurvature)
  *(m3.selectedParallelEigenvalue-m3.scalarCurvature/4);
assert.equal(expected,evidence.designDeterminant);
assert.notEqual(evidence.designDeterminant,0);
assert.equal(evidence.sourceModes.length,3);
assert.ok(evidence.advantages.includes("boundaryless"));
assert.ok(evidence.advantages.includes("non-Einstein Ricci projector available"));

console.log("Spin(2,3) axial matching background suite: PASS");
console.log("  Einstein curvatures: R1=-12, R2=-24");
console.log("  product background: R3=-12, r_parallel=-2 != R3/4=-3");
console.log("  design determinant: -12; rank 5/5");
console.log("  next operation: torsionful nonminimal Hessian/heat kernel");
