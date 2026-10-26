import assert from "node:assert/strict";import fs from "node:fs";
const r=JSON.parse(fs.readFileSync(new URL("../../evidence/data/translation-free-e8-cartan-ratio-spine-v1.json",import.meta.url),"utf8"));
assert.equal(r.schemaVersion,"translation-free-e8-cartan-ratio-spine-v1");
for(const p of r.promotedPoints){assert.equal(p.cutoffs.length,3);assert.equal(p.gaps.length,3);assert.ok(p.successiveRelativeDrifts.every(x=>x<0.01));assert.ok(p.maximumFinalBoundaryProbability<3e-5);for(let i=0;i<2;i++)assert.ok(Math.abs(Math.abs(p.gaps[i+1]-p.gaps[i])/p.gaps[i]-p.successiveRelativeDrifts[i])<2e-15);}
assert.deepEqual(r.promotedPoints.map(p=>p.ratio),[0.25,0.375,0.5,0.75,1]);
assert.ok(r.shell6Reconnaissance.every(p=>!p.promoted&&p.maximumBoundaryProbability>0.02));
assert.match(r.boundary,/not a proof for every r/u);
console.log(JSON.stringify({status:"PASS",promotedRatios:r.promotedPoints.map(p=>p.ratio),gaps:r.promotedPoints.map(p=>p.gaps.at(-1)),maximumFinalBoundaryWeights:r.promotedPoints.map(p=>p.maximumFinalBoundaryProbability),continuousTubeCertified:false,nextGate:r.nextGate},null,2));
