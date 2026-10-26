import assert from "node:assert/strict";
import fs from "node:fs";

const r=JSON.parse(fs.readFileSync(new URL("../../evidence/data/translation-free-e8-channel-amplitude-perturbation-v1.json",import.meta.url),"utf8"));
const rel=(a,b)=>Math.abs(b-a)/a;
const mean=xs=>xs.reduce((a,b)=>a+b,0)/xs.length;
assert.equal(r.schemaVersion,"translation-free-e8-channel-amplitude-perturbation-v1");
assert.equal(r.perturbation.channelPotentials.length,8);
assert.ok(r.perturbation.channelPotentials.every(x=>x>0));
assert.ok(Math.abs(mean(r.perturbation.channelPotentials)-r.perturbation.meanPotential)<1e-15);
assert.ok(Math.abs(Math.max(...r.perturbation.channelPotentials.map(x=>Math.abs(x/r.perturbation.meanPotential-1)))-r.perturbation.maximumFractionalDeviationFromMean)<1e-15);
for(let i=0;i<2;i++){
  assert.ok(Math.abs(rel(r.cutoffLadder[i].gap,r.cutoffLadder[i+1].gap)-r.successiveRelativeGapDrifts[i])<2e-15);
  assert.ok(r.successiveRelativeGapDrifts[i]<0.01);
}
const final=r.cutoffLadder.at(-1);
assert.ok(final.gap>0.2);
assert.ok(final.maximumLowFourBoundaryProbability<6e-6);
assert.ok(Math.abs((final.gap-r.baseline.promotedGap)/r.baseline.promotedGap-r.finalRelativeGapShiftFromSymmetricBaseline)<2e-15);
assert.deepEqual(r.finalParities,[1,-1,1,-1]);
assert.ok(Math.max(...r.firstExcitedSineWeights)>1e20*r.maximumFirstExcitedCosineWeight);
assert.ok(Math.max(...r.secondExcitedCosineWeights)>0);
assert.equal(r.promoted,true);
assert.match(r.boundary,/does not certify an open perturbation ball/u);
console.log(JSON.stringify({status:"PASS",maximumAmplitudeDeviation:r.perturbation.maximumFractionalDeviationFromMean,gap:final.gap,successiveRelativeGapDrifts:r.successiveRelativeGapDrifts,relativeGapShift:r.finalRelativeGapShiftFromSymmetricBaseline,openPerturbationBallCertified:false},null,2));
