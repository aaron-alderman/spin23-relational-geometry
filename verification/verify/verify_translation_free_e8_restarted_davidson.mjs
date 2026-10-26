import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here=path.dirname(fileURLToPath(import.meta.url));
const record=JSON.parse(fs.readFileSync(path.join(here,
  "../../evidence/data/translation-free-e8-restarted-davidson-v1.json"),"utf8"));
const recon=JSON.parse(fs.readFileSync(path.join(here,
  "../../evidence/data/translation-free-e8-joined-rotor-cutoff-recon-v1.json"),"utf8"));
const solver=path.join(here,"../../scripts/solve-translation-free-e8-joined-rotor.mjs");
const fresh=JSON.parse(execFileSync(process.execPath,[solver,"--cutoffs=2","--method=davidson","--maxSubspace=32","--cycles=120"],{
  encoding:"utf8",maxBuffer:4*1024*1024,
}));

assert.equal(record.schemaVersion,"translation-free-e8-restarted-davidson-v1");
for(const actual of fresh.records){
  const reference=recon.records.find(item=>item.cutoff===2&&item.branch===actual.branch);
  assert.ok(reference);
  for(let i=0;i<2;i+=1)assert.ok(Math.abs(actual.levels[i].energy-reference.levels[i])<2e-10);
  assert.ok(actual.levels[0].residual<1e-9);
  assert.ok(actual.levels[1].residual<1e-8);
}
for(const result of record.cutoff8){
  assert.equal(result.basisStates,340321);
  assert.ok(result.firstTwoMaximumResidual<2e-11);
  assert.ok(result.levels[1]>result.levels[0]);
  assert.ok(Math.abs(result.gaps[1]-(result.levels[1]-result.levels[0]))<2e-15);
}
const assessment=record.cutoffAssessment;
const drift=(oldValue,newValue)=>Math.abs(newValue-oldValue)/oldValue;
assert.ok(Math.abs(drift(assessment.cartanGapCutoff6,assessment.cartanGapCutoff8)-assessment.cartanRelativeDrift6to8)<2e-15);
assert.ok(Math.abs(drift(assessment.inverseGapCutoff6,assessment.inverseGapCutoff8)-assessment.inverseRelativeDrift6to8)<2e-15);
assert.ok(assessment.cartanRelativeDrift6to8>assessment.promotionTolerance);
assert.ok(assessment.inverseRelativeDrift6to8>assessment.promotionTolerance);
assert.equal(assessment.cartanKernelPromoted,false);
assert.equal(assessment.inverseKernelPromoted,false);
assert.ok(record.resourceComparison.cartanDavidsonBasisPlusImagesCeilingMiB
  <record.resourceComparison.fullLanczos180VectorBasisMiBAtCutoff8/3);

console.log(JSON.stringify({
  status:"PASS",
  davidsonReferenceRecomputed:true,
  cutoff8Basis:340321,
  cutoff6to8GapDrift:{cartan:assessment.cartanRelativeDrift6to8,inverse:assessment.inverseRelativeDrift6to8},
  continuumGapPromoted:false,
  nextGate:record.nextGate,
},null,2));
