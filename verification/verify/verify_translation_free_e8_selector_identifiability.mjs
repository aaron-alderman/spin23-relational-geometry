import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {dipoleMatrix} from '../../scripts/lib/e8-charge-dipole.mjs';
const r=JSON.parse(fs.readFileSync('evidence/data/translation-free-e8-selector-identifiability-v1.json'));
for(const [path,hash] of Object.entries(r.sources))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex'),hash);
const close=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const P=r.lockingCounterfamily.commonSurvivorProjector;
for(let i=0;i<8;i++)for(let j=0;j<8;j++)close(P[i][j],P[i].reduce((s,x,k)=>s+x*P[k][j],0));
close(P.reduce((s,row,i)=>s+row[i],0),3);
for(const c of r.lockingCounterfamily.cases){
 const expected=[0,0,0,2*c.mu,2*c.lambda,...Array(3).fill(2*(c.mu+c.lambda))].sort((a,b)=>a-b);
 c.hessianEigenvalues.forEach((x,i)=>close(x,expected[i]));
 close(c.massiveFrequencyRatios[1],Math.sqrt(c.lambda/c.mu));
 close(c.massiveFrequencyRatios[2],Math.sqrt((c.lambda+c.mu)/c.mu));
 close(c.survivorProjectorResidual,0);
}
assert.notEqual(r.lockingCounterfamily.cases[0].massiveFrequencyRatios[1],r.lockingCounterfamily.cases[1].massiveFrequencyRatios[1]);
const c=r.e8ParityCounterfamily;
const dict=JSON.parse(fs.readFileSync(c.dictionary));
const D=dipoleMatrix(dict.projectedChargeMatrices,r.chargeGeometryCounterfamily.positions);
const delta=dict.levels[1].energy-dict.levels[0].energy;
for(const x of [c.originalParityErrors,c.changedParityErrors]){
 assert.ok(x.evenEven<1e-8&&x.oddOdd<1e-8&&x.hermiticity<1e-10);
}
for(const row of c.rows){
 const ratio=(dict.levels[row.state].energy-dict.levels[0].energy)/delta;
 close(row.originalFrequencyRatio,ratio);
 close(row.changedCalibratedFrequencyRatio,ratio*(1+c.eta*ratio)/(1+c.eta));
 close(row.changedCalibratedStrengthRatio,D[row.state][0]**2/D[1][0]**2*((1+c.zeta*ratio/2)/(1+c.zeta/2))**2);
}
close(c.alpha*(1+c.eta),1);close(c.beta*(1+c.zeta/2)**2,1);
assert.ok(c.maximumFrequencyRelativeChange>.27);
assert.ok(c.maximumStrengthRelativeChange>.32);
const geom=r.chargeGeometryCounterfamily;
const D2=dipoleMatrix(dict.projectedChargeMatrices,geom.alternativePositions);
close(geom.firstLineStrengthGain*D2[1][0]**2,D[1][0]**2);
geom.rows.forEach(row=>close(row.relativeStrengthChange,geom.firstLineStrengthGain*D2[row.state][0]**2/D[row.state][0]**2-1));
assert.ok(geom.maximumRelativeStrengthChange>.6);
const log=r.logarithmCounterexample;
log.baseEnergies.forEach((x,i)=>{
 close(Math.sin(x),Math.sin(log.otherPositiveEnergies[i]));
 close(Math.cos(x),Math.cos(log.otherPositiveEnergies[i]));
});
console.log(JSON.stringify({passed:true,checks:['source hashes','identical rank-three locking survivor with different positive spectra','same finite-order unitary endpoint with different positive logarithms','E8 parity blocks preserved','first-line frequency and strength calibrations unchanged','higher-line ratios change','charge geometry changes relative strengths'],scope:'Bounded nonuniqueness audit of available constraints; no full-selector-to-E8 realization or physical no-go claimed'},null,2));
