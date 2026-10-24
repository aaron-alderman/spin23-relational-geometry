import assert from "node:assert/strict";
import fs from "node:fs";

const base=new URL("../../evidence/data/",import.meta.url);
const load=name=>JSON.parse(fs.readFileSync(new URL(name,base)));
const v66=load("five-channel-microwave-ideal-compile-v1.json");
const v67=load("five-channel-microwave-ideal-compile-6layer-7bit-v1.json");
const v76=load("five-channel-microwave-ideal-compile-7layer-6bit-v1.json");
const v68=load("five-channel-microwave-ideal-compile-6layer-8bit-v1.json");
const ledger=JSON.parse(fs.readFileSync(new URL("../../corpus/programmes/frontier/wave-7/five_channel_microwave_compile_decision_v1.json",import.meta.url)));
const worst=x=>Math.max(...Object.values(x.results).map(y=>y.discreteError));
const names=x=>Object.keys(x.results).sort();

for(const x of [v66,v67,v76,v68])assert.deepEqual(names(x),["H","HR","R","RH","S_plus"]);
assert.equal(v66.architecture.phaseBits,6);
assert.equal(v67.architecture.phaseBits,7);
assert.equal(v76.architecture.phaseLayers,7);
assert.equal(v68.architecture.phaseBits,8);
assert.equal(v66.passed,false);
assert.equal(v67.passed,true);
assert.equal(v76.passed,false);
assert.equal(v68.passed,true);
assert.ok(worst(v68)<worst(v67));
assert.ok(worst(v67)<v67.threshold);
assert.ok(worst(v66)>v66.threshold);
assert.ok(worst(v76)>v76.threshold);

const near=(a,b,e=1e-12)=>Math.abs(a-b)<e;
assert.ok(near(ledger.variants.sixLayerSixBit.worstError,worst(v66)));
assert.ok(near(ledger.variants.sixLayerSevenBit.worstError,worst(v67)));
assert.ok(near(ledger.variants.sevenLayerSixBit.worstError,worst(v76)));
assert.ok(near(ledger.variants.sixLayerEightBit.worstError,worst(v68)));
assert.equal(ledger.decision.phaseElements,30);
assert.equal(ledger.decision.phasePathLossDb,ledger.decision.phaseElementLossDb*6);
assert.equal(ledger.decision.purchaseAuthorized,false);

console.log(JSON.stringify({
  status:"PASS",
  threshold:v66.threshold,
  worstErrors:{sixLayerSixBit:worst(v66),sixLayerSevenBit:worst(v67),sevenLayerSixBit:worst(v76),sixLayerEightBit:worst(v68)},
  selected:ledger.decision.selected,
  pathLossDb:ledger.decision.phasePathLossDb,
  nextGate:ledger.nextGate,
  verdict:"phase resolution, not continuous reachability or one extra mixing plane, controls the ideal five-channel gate"
}));

