import assert from "node:assert/strict";
import fs from "node:fs";

const evidence=JSON.parse(fs.readFileSync(new URL("../../evidence/data/five-channel-microwave-drift-envelope-v1.json",import.meta.url)));
const ledger=JSON.parse(fs.readFileSync(new URL("../../corpus/programmes/frontier/wave-7/five_channel_microwave_drift_frontier_v1.json",import.meta.url)));
const near=(a,b,e=1e-12)=>Math.abs(a-b)<e;
const row=scale=>evidence.rows.find(x=>x.scale===scale);

assert.equal(evidence.trialsPerScale,1000);
assert.ok(row(3).maximum<=evidence.allowance);
assert.ok(row(3.5).p95<=evidence.allowance);
assert.ok(row(3.5).maximum>evidence.allowance);
assert.ok(row(3.75).p95>evidence.allowance);
assert.ok(near(ledger.conservativeEnvelope.couplerAngleDegrees,row(3).couplerAngleDegrees));
assert.ok(near(ledger.conservativeEnvelope.phaseStateDegrees,row(3).phaseStateDegrees));
assert.ok(near(ledger.conservativeEnvelope.amplitudeStateDb,row(3).amplitudeStateDb));
assert.ok(near(ledger.conservativeEnvelope.maximumShapeError,row(3).maximum));

const d=evidence.dynamicRange;
const base=d.phasePathLossDb+d.weakestCrossRelativeDb+20;
assert.ok(near(base,66.23766721957749));
for(const x of d.examples)assert.ok(near(x.requiredDynamicRangeDb,base+x.ancillaryLossDb));
assert.ok(near(ledger.dynamicRange.maximumAncillaryLossAtDesignTargetDb,ledger.dynamicRange.designTargetDb-base));

console.log(JSON.stringify({
  status:"PASS",
  conservativeEnvelope:ledger.conservativeEnvelope,
  statisticalBoundary:{lastP95Pass:row(3.5),firstP95Fail:row(3.75)},
  dynamicRange:ledger.dynamicRange,
  verdict:"the frozen eight-bit words have a nonempty drift window; static measured/full-wave mixer compilation remains the pre-build gate"
}));

