import assert from "node:assert/strict";import fs from "node:fs";
const r=JSON.parse(fs.readFileSync(new URL("../../evidence/data/translation-free-e8-mixed-perturbation-corner-v1.json",import.meta.url),"utf8"));
const rel=(a,b)=>Math.abs(b-a)/a;
assert.equal(r.schemaVersion,"translation-free-e8-mixed-perturbation-corner-v1");
assert.ok(Math.abs(r.channelPotentials.reduce((a,b)=>a+b,0)/8-r.meanPotential)<1e-15);
assert.ok(r.channelPotentials.every(x=>x>0)&&r.kineticScales.every(x=>x>0));
for(let i=0;i<2;i++){assert.ok(Math.abs(rel(r.gaps[i],r.gaps[i+1])-r.successiveRelativeDrifts[i])<2e-15);assert.ok(r.successiveRelativeDrifts[i]<0.01);}
assert.ok(r.finalMaximumLowFourBoundaryProbability<8.1e-6);
assert.ok(Math.max(...r.finalFirstThreeResiduals)<2.5e-11);
assert.deepEqual(r.finalParities,[1,-1,1,-1]);
assert.ok(Math.max(...r.firstExcitedSineWeights)>1e20*r.maximumFirstExcitedCosineWeight);
assert.equal(r.promoted,true);assert.match(r.boundary,/finite compact-cell stencil only/u);
console.log(JSON.stringify({status:"PASS",gap:r.gaps.at(-1),successiveRelativeDrifts:r.successiveRelativeDrifts,relativeGapShift:r.finalRelativeGapShift,compactCellStencilClosed:true,continuousTubeCertified:false,intercellGapCertified:false},null,2));
