import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {dipoleMatrix} from '../../scripts/lib/e8-charge-dipole.mjs';
const read=p=>JSON.parse(fs.readFileSync(p));
const score=read('evidence/data/translation-free-e8-refined-holdout-score-v1.json');
for(const [path,hash] of Object.entries(score.sources))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex'),hash);
const [line,curve]=score.predictionPackets.map(read);
assert.equal(line.targetAbsentAtFreeze,true);
assert.equal(curve.referenceCurveAbsentAtFreeze,true);
assert.equal(line.calibrationCount,2);
assert.equal(score.firstLineCalibrationCount,2);
const dict=read(score.referenceDictionary),response=read(score.referenceCurve);
const D=dipoleMatrix(dict.projectedChargeMatrices,Array.from({length:8},(_,i)=>i-3.5));
const gaps=dict.levels.map(x=>x.energy-dict.levels[0].energy);
const retained=Array.from({length:11},(_,i)=>i+1);
const W=dict.projectedDipoleSquaredMatrix[0][0]-retained.reduce((s,j)=>s+D[j][0]**2,0),delta=gaps[12];
assert.ok(W>=0);
for(const row of response.records){
 assert.ok(Math.max(...row.relativeResiduals)<1e-8);
 assert.ok(row.omega<delta);
 const partial=retained.reduce((s,j)=>s+2*gaps[j]*D[j][0]**2/(gaps[j]**2-row.omega**2),0);
 const upper=partial+2*delta*W/(delta**2-row.omega**2);
 assert.ok(row.response>=partial-1e-8&&row.response<=upper+1e-8,'independent spectral-tail envelope');
}
const moments=read('evidence/data/translation-free-e8-full-shell-local-charge-tail-shell14-v1.json');
assert.ok(Math.abs(response.records[0].response/moments.fullShellStatic-1)<1e-9);
assert.ok(Math.abs(moments.firstMomentDirect/moments.firstMomentDoubleCommutator-1)<1e-10);
const original=read('evidence/data/translation-free-e8-multifrequency-replay-v1.json');
assert.equal(score.originalCoarseReplayPassed,original.summary.chargeModelNumericalReplayPass);
assert.equal(score.originalCoarseReplayPassed,false);
assert.equal(score.selectorSpecificPhysicalPredictionEstablished,false);
assert.equal(score.lines.length,6);assert.equal(score.rows.length,5);
for(const row of score.lines){
 assert.ok(Math.abs(row.referenceGap/gaps[row.state]-1)<1e-12);
 assert.ok(Math.abs(row.referenceWeight/D[row.state][0]**2-1)<1e-12);
 assert.ok(Math.abs(row.weightRelativeError-(row.predictedWeight/row.referenceWeight-1))<1e-14);
}
const metrics={
 maxHeldOutEnergyError:Math.max(...score.lines.map(x=>Math.abs(x.gapRelativeError))),
 maxHeldOutStrengthError:Math.max(...score.lines.map(x=>Math.abs(x.weightRelativeError))),
 maxHeldOutResponseError:Math.max(...score.rows.map(x=>Math.abs(x.relativeError))),
 staticRelativeError:curve.moments.static/moments.fullShellStatic-1,
 slopeRelativeError:curve.moments.slope/moments.fullShellSlope-1,
 energyWeightedStrengthRelativeError:curve.moments.energyWeightedStrength/moments.firstMomentDirect-1
};
for(const [key,value] of Object.entries(metrics))assert.ok(Math.abs(score.summary[key]-value)<1e-14);
assert.equal(score.summary.numericalHoldoutPass,Object.values(metrics).every(x=>Math.abs(x)<score.tolerance));
console.log(JSON.stringify({passed:true,checks:['prediction and reference hashes','two shared calibration factors','independent spectral-tail envelope','static inverse solve','energy-weighted double-commutator sum rule','all-line score recomputation','original failure preserved'],scope:'Finite supplied-model computational consistency; no physical selector validation'},null,2));
