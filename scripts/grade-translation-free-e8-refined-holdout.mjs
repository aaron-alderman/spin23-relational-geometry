import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {dipoleMatrix} from './lib/e8-charge-dipole.mjs';
const linePath='evidence/data/translation-free-e8-refined-frozen-predictions-v1.json';
const curvePath='evidence/data/translation-free-e8-refined-frozen-response-v1.json';
const line=JSON.parse(fs.readFileSync(linePath)),curve=JSON.parse(fs.readFileSync(curvePath));
const target=JSON.parse(fs.readFileSync(line.targetPath));
const referenceCurve=JSON.parse(fs.readFileSync(curve.targetCurve));
const moments=JSON.parse(fs.readFileSync('evidence/data/translation-free-e8-full-shell-local-charge-tail-shell14-v1.json'));
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(line.modelSource)).digest('hex'),line.modelSha256);
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(curve.sourceCurve)).digest('hex'),curve.sourceCurveSha256);
const D=dipoleMatrix(target.projectedChargeMatrices,Array.from({length:8},(_,i)=>i-3.5));
const lines=line.lines.map(p=>{
 assert.equal(target.parities[p.state],-1);
 const gap=target.levels[p.state].energy-target.levels[0].energy,weight=D[p.state][0]**2;
 return {...p,referenceGap:gap,referenceWeight:weight,gapRelativeError:p.predictedGap/gap-1,weightRelativeError:p.predictedWeight/weight-1};
});
const rows=curve.rows.map((p,i)=>{
 const r=referenceCurve.records[i];assert.equal(p.fractionOfFirstGap,r.fractionOfFirstGap);
 return {...p,referenceResponse:r.response,relativeError:p.predictedResponse/r.response-1};
});
const summary={maxHeldOutEnergyError:Math.max(...lines.map(x=>Math.abs(x.gapRelativeError))),
 maxHeldOutStrengthError:Math.max(...lines.map(x=>Math.abs(x.weightRelativeError))),
 maxHeldOutResponseError:Math.max(...rows.map(x=>Math.abs(x.relativeError))),
 staticRelativeError:curve.moments.static/moments.fullShellStatic-1,
 slopeRelativeError:curve.moments.slope/moments.fullShellSlope-1,
 energyWeightedStrengthRelativeError:curve.moments.energyWeightedStrength/moments.firstMomentDirect-1};
summary.numericalHoldoutPass=Object.values(summary).every(x=>Math.abs(x)<line.tolerance);
const original=JSON.parse(fs.readFileSync('evidence/data/translation-free-e8-multifrequency-replay-v1.json'));
const report={schemaVersion:'e8-refined-computational-holdout-score-v1',
 sources:Object.fromEntries([linePath,curvePath,line.modelSource,line.trainingSource,line.targetPath,curve.sourceCurve,curve.targetCurve,
  'evidence/data/translation-free-e8-full-shell-local-charge-tail-shell14-v1.json'].map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')])),
 predictionPackets:[linePath,curvePath],referenceDictionary:line.targetPath,referenceCurve:curve.targetCurve,
 firstLineCalibrationCount:2,tolerance:line.tolerance,lines,rows,summary,
 originalCoarseReplayPassed:original.summary.chargeModelNumericalReplayPass,
 selectorSpecificPhysicalPredictionEstablished:false,
 interpretation:'This scores a fixed supplied Hamiltonian and source, with predictions saved before the newly computed higher-line and frequency targets. It tests numerical predictivity after two shared calibrations, not physical selector uniqueness or agreement with independent observations.',
 nextPhysicalGate:['Derive an independently typed selector-to-electromagnetic-source action and constitutive kernel.',
   'Fix device geometry, physical source calibration, contacts, damping and instrument resolution.',
   'Score unseen measured additional resonance energies, integrated strengths and response curves without per-line refits.']};
const out='evidence/data/translation-free-e8-refined-holdout-score-v1.json';
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({output:out,summary,lines},null,2));
