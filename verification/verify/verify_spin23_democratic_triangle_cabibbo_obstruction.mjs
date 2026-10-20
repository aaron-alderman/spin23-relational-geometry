import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const data=JSON.parse(readFileSync(path.join(root,"evidence/data/spin23-democratic-triangle-cabibbo-obstruction.json"),"utf8"));
assert.equal(data.documentId,1484);

const ru=(.620**2-.00123**2)/(168.26**2-.00123**2);
const rd=(.05316**2-.00267**2)/(2.839**2-.00267**2);
const R=rd/ru;
const etaMax=1/(2+3*R);
assert.ok(Math.abs(R-data.targets.downToUpRatio)<1e-13);
assert.ok(Math.abs(etaMax-data.doubletExpansion.etaUpperBound)<1e-15);
assert.ok(data.targets.Vus<1/Math.sqrt(2));

// In the c=1 scale chart, the exact first-order doublet relation is
// d_edge=((1-2 eta)/3)u_edge and d_flux=eta u_flux.
for(let k=1;k<=10000;k+=1){
  const x=((k*7919)%20011)/20011-.5;
  const y=((k*3571)%20021)/20021-.5;
  const t=((k*1013)%20023)/20023-.5;
  const eta=etaMax*((k*1237)%10007)/10007;
  const u=[-Math.sqrt(3)*y/2,Math.sqrt(3)*t/3,x-y/2];
  const edge=(1-2*eta)/3;
  const d=[edge*u[0],eta*u[1],edge*u[2]];
  const dot=u.reduce((s,v,i)=>s+v*d[i],0);
  assert.ok(dot>=-1e-15);
  const un=Math.hypot(...u),dn=Math.hypot(...d);
  if(un>1e-14&&dn>1e-14){
    const overlap=Math.sqrt((1+dot/(un*dn))/2);
    assert.ok(overlap>=1/Math.sqrt(2)-1e-13);
  }
  assert.ok(eta*R<=edge+1e-14);
}

// If eta>=1/2, both component scales have magnitude at most eta, so
// |d|/|u|<=eta cannot meet |d|/|u|=eta R for the observed R>1.
assert.ok(R>1);
for(const eta of [.5,.75,1,2,10]){
  assert.ok(Math.max(Math.abs((1-2*eta)/3),eta)<=eta+1e-15);
  assert.ok(eta*R>eta);
}

assert.equal(data.verdict.democraticMiddleExplainsBothHierarchyLimits,true);
assert.equal(data.verdict.commonThirdGenerationAligned,true);
assert.equal(data.verdict.sharedHolonomyLightDoubletLimitExcludedByVus,true);
assert.equal(data.verdict.allGeneralHolonomyExcluded,false);
assert.equal(data.verdict.physicalAdmissionChanged,false);
console.log("PASS 1484: the shared-holonomy democratic hierarchy limit forces eta<=1/(2+3 rd/ru) and an acute light-doublet Bloch angle, hence liminf |Vus|>=1/sqrt(2).");
