import assert from "node:assert/strict";
import fs from "node:fs";
const r=JSON.parse(fs.readFileSync(new URL("../../evidence/data/translation-free-e8-kinetic-metric-perturbation-v1.json",import.meta.url),"utf8"));
const K=[[2,-1,0,0,0,0,0,0],[-1,2,-1,0,0,0,0,0],[0,-1,2,-1,0,0,0,-1],[0,0,-1,2,-1,0,0,0],[0,0,0,-1,2,-1,0,0],[0,0,0,0,-1,2,-1,0],[0,0,0,0,0,-1,2,0],[0,0,-1,0,0,0,0,2]];
const G=K.map((row,i)=>row.map((x,j)=>x*r.kineticScales[i]*r.kineticScales[j]));
const L=Array.from({length:8},()=>Array(8).fill(0));
for(let i=0;i<8;i++)for(let j=0;j<=i;j++){let x=G[i][j];for(let k=0;k<j;k++)x-=L[i][k]*L[j][k];if(i===j){assert.ok(x>0);L[i][j]=Math.sqrt(x);}else L[i][j]=x/L[j][j];}
const rel=(a,b)=>Math.abs(b-a)/a;
assert.equal(r.schemaVersion,"translation-free-e8-kinetic-metric-perturbation-v1");
assert.ok(r.kineticScales.every(x=>x>0));
assert.ok(Math.abs(r.kineticScales.reduce((p,x)=>p*x*x,1)-r.metricDeterminant)<2e-15);
for(let i=0;i<2;i++){assert.ok(Math.abs(rel(r.gaps[i],r.gaps[i+1])-r.successiveRelativeDrifts[i])<2e-15);assert.ok(r.successiveRelativeDrifts[i]<0.01);}
assert.ok(r.finalMaximumLowFourBoundaryProbability<9e-6);
assert.ok(Math.max(...r.finalFirstThreeResiduals)<3e-11);
assert.deepEqual(r.finalParities,[1,-1,1,-1]);
assert.ok(Math.max(...r.firstExcitedSineWeights)>1e20*r.maximumFirstExcitedCosineWeight);
assert.ok(Math.max(...r.secondExcitedCosineWeights)>0);
assert.equal(r.promoted,true);
assert.match(r.boundary,/not an open stability tube/u);
console.log(JSON.stringify({status:"PASS",positiveDefinite:true,maximumMetricScaleDeviation:r.maximumFractionalScaleDeviation,gap:r.gaps.at(-1),successiveRelativeDrifts:r.successiveRelativeDrifts,relativeGapShift:r.finalRelativeGapShift,openStabilityTubeCertified:false},null,2));
