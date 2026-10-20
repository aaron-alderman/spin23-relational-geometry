import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const data=JSON.parse(readFileSync(path.join(root,"evidence/data/spin23-sector-charge-holonomy-bound.json"),"utf8"));
assert.equal(data.documentId,1485);
const ru=(.620**2-.00123**2)/(168.26**2-.00123**2);
const rd=(.05316**2-.00267**2)/(2.839**2-.00267**2);
const R=rd/ru,Vus=.22501,C=2*Vus**2-1,bound=C*R;
assert.ok(Math.abs(R-data.targets.downToUpRatio)<1e-13);
assert.ok(Math.abs(C-data.targets.targetBlochCosine)<1e-13);
assert.ok(Math.abs(bound-data.firstOrderRelation.chargeRatioUpperBound)<1e-13);
assert.ok(bound<-23&&bound<-2/3);
assert.equal(-1<=bound,false);
assert.equal(-.5<=bound,false);

// CR is a convex combination of q and h(eta)=1/(3eta)-2/3.
// Since h(eta)>-2/3>CR, reaching CR requires q<=CR.
for(let k=1;k<=10000;k+=1){
  const eta=10**(-6+8*k/10000);
  const h=1/(3*eta)-2/3;
  assert.ok(h>-2/3-1e-14);
  for(const q of [-1,-.5,0,1]){
    const f=((k*7919)%10007)/10007;
    const value=h*(1-f)+q*f;
    assert.ok(value>bound);
  }
}
assert.ok(data.boundedSplitHolonomyAudit.bestEffectiveChargeRatio<bound);
assert.equal(data.verdict.scalarSectorCharacterNaturalRepairExcluded,true);
assert.equal(data.verdict.largeEmergentChargeMathematicallyExcluded,false);
assert.equal(data.verdict.physicalAdmissionChanged,false);
console.log("PASS 1485: matching the Cabibbo Bloch angle with a scalar sector charge requires q<=(2|Vus|^2-1)(rd/ru)=-23.1503, excluding q=-1 and q=-1/2.");
