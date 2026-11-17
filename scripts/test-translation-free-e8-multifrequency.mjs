import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {dipoleMatrix} from './lib/e8-charge-dipole.mjs';
const contractPath='evidence/data/translation-free-e8-multifrequency-test-contract-v1.json';
const contract=JSON.parse(fs.readFileSync(contractPath));
const source=JSON.parse(fs.readFileSync(contract.modelData));
const target=JSON.parse(fs.readFileSync(contract.referenceData));
const positions=Array.from({length:8},(_,i)=>i-3.5);
const spectrum=d=>{
 const D=dipoleMatrix(d.projectedChargeMatrices,positions);
 return d.levels.map((level,j)=>({state:j,parity:d.parities[j],gap:level.energy-d.levels[0].energy,weight:D[j][0]**2}));
};
const model=spectrum(source),reference=spectrum(target);
const odd=model.filter(x=>x.state>0&&x.parity===-1).slice(0,7);
assert.equal(odd.length,7);
const firstModel=odd[0],firstReference=reference[firstModel.state];
const alpha=firstReference.gap/firstModel.gap,beta=firstReference.weight/firstModel.weight;
const heldOutLines=odd.slice(1).map(line=>{
 const observed=reference[line.state];assert.equal(observed.parity,-1);
 const predictedGap=alpha*line.gap,predictedWeight=beta*line.weight;
 return {state:line.state,predictedGap,referenceGap:observed.gap,
   predictedWeight,referenceWeight:observed.weight,
   gapRelativeError:predictedGap/observed.gap-1,weightRelativeError:predictedWeight/observed.weight-1,
   referenceWeightOverFirst:observed.weight/firstReference.weight};
});
const curvePaths=[8,10].map(c=>`evidence/data/translation-free-e8-frequency-response-shell${c}-v1.json`);
const [curveModel,curveReference]=curvePaths.map(p=>JSON.parse(fs.readFileSync(p)));
assert.equal(curveModel.records.length,contract.withheldNumericalTargets.responseFractionsOfFirstGap.length);
const cellModel=JSON.parse(fs.readFileSync('evidence/data/translation-free-e8-charge-shell-8-audit-v1.json'));
const cellReference=JSON.parse(fs.readFileSync('evidence/data/translation-free-e8-charge-shell-10-audit-v1.json'));
const omega1=firstReference.gap,w1=firstReference.weight;
const single=w=>2*omega1*w1/(omega1*omega1-w*w);
const singleStatic=single(0),singleSlope=2*w1/omega1**3;
const c0=cellReference.static-singleStatic,c2=cellReference.slope-singleSlope;
const responseRows=curveReference.records.map((row,i)=>{
 assert.equal(row.fractionOfFirstGap,curveModel.records[i].fractionOfFirstGap);
 const fullPrediction=beta/alpha*curveModel.records[i].response;
 const predictions={chargeModel:fullPrediction,singlePole:single(row.omega),
   singlePolePlusStatic:single(row.omega)+c0,
   singlePolePlusStaticAndSlope:single(row.omega)+c0+c2*row.omega**2};
 return {fractionOfFirstGap:row.fractionOfFirstGap,referenceResponse:row.response,predictions,
   relativeErrors:Object.fromEntries(Object.entries(predictions).map(([k,v])=>[k,v/row.response-1]))};
});
const tolerance=contract.engineeringReplayTolerance;
const summary={
 calibratedFrequencyScale:alpha,calibratedWeightScale:beta,
 maxHeldOutLineEnergyError:Math.max(...heldOutLines.map(x=>Math.abs(x.gapRelativeError))),
 maxHeldOutLineWeightError:Math.max(...heldOutLines.map(x=>Math.abs(x.weightRelativeError))),
 maxHeldOutChargeResponseError:Math.max(...responseRows.map(x=>Math.abs(x.relativeErrors.chargeModel))),
 staticPrediction:beta/alpha*cellModel.static,staticReference:cellReference.static,
 slopePrediction:beta/alpha**3*cellModel.slope,slopeReference:cellReference.slope,
 singlePoleStaticRelativeError:singleStatic/cellReference.static-1,
 singlePoleSlopeRelativeError:singleSlope/cellReference.slope-1,
 selectorSpecificPhysicalPredictionEstablished:false
};
summary.chargeModelNumericalReplayPass=summary.maxHeldOutLineEnergyError<tolerance&&summary.maxHeldOutLineWeightError<tolerance&&summary.maxHeldOutChargeResponseError<tolerance;
const paths=[contractPath,contract.modelData,contract.referenceData,...curvePaths,
 'evidence/data/translation-free-e8-charge-shell-8-audit-v1.json','evidence/data/translation-free-e8-charge-shell-10-audit-v1.json'];
const report={schemaVersion:'e8-calibrated-multifrequency-replay-v1',contract:contractPath,
 sources:Object.fromEntries(paths.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')])),
 calibration:{firstModel,firstReference,alpha,beta,freeParameters:2},heldOutLines,responseRows,
 controls:{singlePole:{freeCalibrations:2},singlePolePlusStatic:{freeCalibrations:3,c0},singlePolePlusStaticAndSlope:{freeCalibrations:4,c0,c2},
   higherPolePrediction:'All single-pole-plus-polynomial controls predict no additional discrete resonance poles.'},summary,
 boundaries:['Retrospective synthetic numerical replay, not independently measured or blinded data.',
  'Both charge models use the same assumed Hamiltonian, source geometry and zero added contacts.',
  'The physical selector-to-source intertwiner and measured spectrum remain absent.',
  'Engineering replay tolerance is separate from the much wider conservative infinite-shell error estimates.']};
const output='evidence/data/translation-free-e8-multifrequency-replay-v1.json';
fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output,summary,heldOutLines,responseRows},null,2));
