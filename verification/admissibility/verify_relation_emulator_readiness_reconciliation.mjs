import assert from"node:assert/strict";import{readFileSync}from"node:fs";
const root=new URL("../../",import.meta.url),e=JSON.parse(readFileSync(new URL("evidence/data/relation-emulator-readiness-reconciliation-v1.json",root),"utf8"));
assert.equal(e.protocol,"relation-emulator-readiness-reconciliation/1");assert.equal(e.packet,"AZ-110");assert.equal(e.target,"OT-024");
assert.equal(e.frozenContract.modes,16);assert.equal(e.frozenContract.directedLinks,24);assert.equal(e.frozenContract.compositionRank,23);assert.equal(e.frozenContract.completedRank,24);
assert.equal(e.frozenContract.minimalChannels,24);assert.equal(e.frozenContract.pathChannels,9);assert.equal(e.frozenContract.triangleChannels,14);assert.equal(e.frozenContract.directChannels,1);
assert.equal(e.frozenContract.absoluteDeterminant,1);assert.equal(e.frozenContract.withheldNonzeroCompositionWitnesses,33);assert.equal(e.frozenContract.wallLeakageSlope,4);
assert.ok(e.frozenContract.visibleGap>0.45);assert.ok(e.frozenContract.conditionNumber<10);assert.equal(e.readiness.networkChosen,true);assert.equal(e.readiness.minimalDetectorScheduleProved,true);assert.equal(e.readiness.physicalDeviceBuilt,false);
assert.equal(e.decision.ot024DesignLayerClosed,true);assert.equal(e.decision.ot024ShouldBeActiveNotGated,true);assert.equal(e.decision.ot024ClosureConditionMet,false);assert.equal(e.decision.physicsPromotionGatePassed,false);
console.log(JSON.stringify({result:"pass",nextGate:e.nextGate},null,2));
