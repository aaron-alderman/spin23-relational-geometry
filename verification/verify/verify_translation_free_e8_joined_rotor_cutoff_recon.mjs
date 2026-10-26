import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here=path.dirname(fileURLToPath(import.meta.url));
const record=JSON.parse(fs.readFileSync(path.join(here,
  "../../evidence/data/translation-free-e8-joined-rotor-cutoff-recon-v1.json"),"utf8"));
const solver=path.join(here,"../../scripts/solve-translation-free-e8-joined-rotor.mjs");
const fresh=JSON.parse(execFileSync(process.execPath,[solver,"--cutoffs=1,2","--iterations=96"],{
  encoding:"utf8",maxBuffer:4*1024*1024,
}));

assert.equal(record.schemaVersion,"translation-free-e8-joined-rotor-cutoff-recon-v1");
assert.equal(fresh.records.length,4);
for(const actual of fresh.records){
  const frozen=record.records.find(item=>item.cutoff===actual.cutoffKineticEnergy&&item.branch===actual.branch);
  assert.ok(frozen);
  assert.equal(actual.basisStates,frozen.basisStates);
  for(let i=0;i<4;i+=1){
    assert.ok(Math.abs(actual.levels[i].energy-frozen.levels[i])<2e-10);
    assert.ok(Math.abs(actual.gapsFromGround[i]-frozen.gaps[i])<2e-10);
  }
}
for(const branch of ["cartan-kernel","inverse-kernel"]){
  const branchRecords=record.records.filter(item=>item.branch===branch).sort((a,b)=>a.cutoff-b.cutoff);
  for(let i=1;i<branchRecords.length;i+=1){
    // Nested Rayleigh--Ritz ground energies must decrease as complete shells grow.
    assert.ok(branchRecords[i].levels[0]<=branchRecords[i-1].levels[0]+1e-12);
  }
  assert.ok(branchRecords.every(item=>item.maximumProjectedResidual<3e-12));
}
const assessment=record.cutoffAssessment;
const relative=(oldValue,newValue)=>Math.abs(newValue-oldValue)/oldValue;
assert.ok(Math.abs(relative(assessment.cartanKernelGapCutoff4,assessment.cartanKernelGapCutoff6)
  -assessment.cartanKernelRelativeDrift4to6)<2e-15);
assert.ok(Math.abs(relative(assessment.inverseKernelGapCutoff4,assessment.inverseKernelGapCutoff6)
  -assessment.inverseKernelRelativeDrift4to6)<2e-15);
assert.ok(assessment.cartanKernelRelativeDrift4to6>assessment.promotionTolerance);
assert.ok(assessment.inverseKernelRelativeDrift4to6>assessment.promotionTolerance);
assert.equal(assessment.cartanKernelPromoted,false);
assert.equal(assessment.inverseKernelPromoted,false);
assert.match(record.boundary,/not cutoff convergence/u);

console.log(JSON.stringify({
  status:"PASS",
  independentlyRecomputedCutoffs:[1,2],
  largestRecordedBasis:Math.max(...record.records.map(item=>item.basisStates)),
  cutoff4to6GapDrift:{
    cartanKernel:assessment.cartanKernelRelativeDrift4to6,
    inverseKernel:assessment.inverseKernelRelativeDrift4to6,
  },
  continuumGapPromoted:false,
  nextGate:record.nextGate,
},null,2));
