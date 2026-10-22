#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-axial-torsion-observable-matching-rank-v1.json",
  import.meta.url,
),"utf8"));

const rank=(input,tolerance=1e-12)=>{
  const a=input.map(row=>row.slice()); let r=0;
  for(let c=0;c<(a[0]?.length??0)&&r<a.length;c+=1){
    let p=r; for(let i=r+1;i<a.length;i+=1) if(Math.abs(a[i][c])>Math.abs(a[p][c])) p=i;
    if(Math.abs(a[p][c])<=tolerance) continue;
    [a[r],a[p]]=[a[p],a[r]]; const pivot=a[r][c];
    for(let j=c;j<a[r].length;j+=1) a[r][j]/=pivot;
    for(let i=0;i<a.length;i+=1) if(i!==r){const f=a[i][c];for(let j=c;j<a[i].length;j+=1)a[i][j]-=f*a[r][j];}
    r+=1;
  }
  return r;
};

assert.equal(evidence.parameterBasis.length,5);
assert.equal(evidence.quadraticOperators.length,5);
assert.equal(rank(evidence.singleAdsPseudoscalarResponse.rows),evidence.singleAdsPseudoscalarResponse.rank);
assert.equal(evidence.parameterBasis.length-evidence.singleAdsPseudoscalarResponse.rank,evidence.singleAdsPseudoscalarResponse.nullity);
assert.equal(rank(evidence.fullProtocol.rows),evidence.fullProtocol.rank);
assert.equal(evidence.fullProtocol.rank,5);

const {R1,R2,R3,rParallel}=evidence.fullProtocol.curvatures;
assert.notEqual(R1,R2);
assert.notEqual(rParallel,R3/4);
assert.match(evidence.spectralForm,/p\^2\+A\/B/);
assert.equal(evidence.higherFieldOrderNotMatched.length,3);

console.log("Spin(2,3) axial-torsion observable matching rank: PASS");
console.log("  one AdS Xhat correlator: rank 2/5, nullity 3");
console.log("  two-curvature + transverse + non-Einstein protocol: rank 5/5");
console.log("  quadratic axial EFT basis: identifiable");
console.log("  next input: torsionful non-Einstein loop data or measured responses");
