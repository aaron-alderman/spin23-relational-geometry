import assert from "node:assert/strict";import{readFileSync}from"node:fs";
const root=new URL("../../",import.meta.url),e=JSON.parse(readFileSync(new URL("evidence/data/four-mode-sk-action-to-record-v1.json",root),"utf8"));
assert.equal(e.protocol,"four-mode-sk-action-to-record/1");assert.equal(e.packet,"AZ-109");assert.deepEqual(e.topics,["OT-027","OT-010"]);
assert.equal(e.certificate.frequencyCases,98);assert.ok(e.certificate.maximumEquationResidual<1e-11);assert.ok(e.certificate.maximumPowerBalanceResidual<1e-11);assert.ok(e.certificate.minimumNoiseEigenvalue>0);
assert.equal(e.certificate.operatorAmplitudeLossDetectorGeneratedTogether,true);assert.equal(e.decision.engineeredBenchActionToRecordClosed,true);
assert.equal(e.decision.claimipediaRelationToPhysicalOperatorClosed,false);assert.equal(e.decision.sourceNativeNaturalCarrierEstablished,false);assert.equal(e.decision.ot027GloballyClosed,false);assert.equal(e.decision.ot046LocalizedOperatorSupplied,false);assert.equal(e.decision.newPhysicsEvidence,false);
console.log(JSON.stringify({result:"pass",cases:e.certificate.frequencyCases,boundary:e.nextGate},null,2));
