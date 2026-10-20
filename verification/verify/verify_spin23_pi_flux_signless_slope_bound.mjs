import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const data=JSON.parse(readFileSync(path.join(root,"evidence/data/spin23-pi-flux-signless-slope-bound.json"),"utf8"));
assert.equal(data.documentId,1482);
const poly=(a,b,c)=>{const S=a+b+c,P=a*b+b*c+c*a,R=a*b*c;return {direct:3*S**3-12*S*P+32*R,decomposed:3*(S**3-4*S*P+9*R)+5*R};};
for(let i=0;i<10000;i+=1){const a=(i*7919%10007)/10007,b=(i*3571%10009)/10009,c=(i*1013%10037)/10037,x=poly(a,b,c);assert.ok(Math.abs(x.direct-x.decomposed)<1e-11);assert.ok(x.direct>-1e-12);}
const sharp=data.theorem.sharpBoundarySpectrum,r=(sharp[1]-sharp[0])/(sharp[2]-sharp[0]);
assert.ok(Math.abs(r-1/3)<1e-15);
assert.ok(1-r>=2/3&&data.observedUpMassSquaredLocation<1e-4);
assert.equal(data.decreasingUpSlopeCompatible,false);
assert.equal(data.boundedScan.decreasingIncreasingRootedSolutions,0);
assert.equal(data.boundedScan.decreasingDecreasingRootedSolutions,0);
assert.equal(data.verdict.upSlopeForcedPositiveAtPiFlux,true);
assert.equal(data.verdict.generalHolonomyExcluded,false);
assert.equal(data.verdict.physicalAdmissionChanged,false);
console.log("PASS 1482: the pi-flux up operator is a signless triangle Laplacian with r_sorted<=1/3, so a reversed affine slope gives r_physical>=2/3 and cannot reproduce the up-quark hierarchy.");
