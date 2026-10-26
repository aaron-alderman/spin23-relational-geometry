import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-topology-cut-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-topology-cut-v1");
assert.deepEqual(record.carriers.circle.betti,[1,1]);
assert.deepEqual(record.carriers.interval.betti,[1,0]);
assert.equal(record.gluingMap.chainMapResidual,0);
assert.equal(record.gluingMap.cochainPullbackResidual,0);
assert.equal(record.recordTransfer.circleD0WithOneFormRank-record.recordTransfer.circleD0Rank,1);
assert.equal(record.recordTransfer.exactnessResidual,0);
assert.equal(record.recordTransfer.circlePeriod,record.recordTransfer.endpointMismatch);
assert.ok(record.compactU1Extension.gaugeHolonomyResidual<1e-12);
assert.ok(record.compactU1Extension.cutGaugeFlattensEveryLinkResidual<1e-12);
assert.ok(record.compactU1Extension.transitionHolonomyResidual<1e-12);
assert.match(record.verdict,/holonomy into boundary mismatch/);

console.log(JSON.stringify({
  status:"PASS",
  topology:"circle H1=1 becomes interval H1=0",
  transport:"cut pullback is a cochain map",
  record:"Wilson period becomes endpoint potential mismatch",
  implication:"topology updates require boundary/gluing detectors",
}));

