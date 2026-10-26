import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-detector-null-budget-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-detector-null-budget-v1");
assert.equal(record.conventionalChannels.length,8);
assert.deepEqual(record.conventionalChannels.map(item=>item.id),["G1","G2","G3","G4","G5","G6","G7","G8"]);
assert.equal(record.statusSummary.exactZeroControls,8);
assert.equal(record.decisionRule.retainAnomalyWhen.length,7);
assert.match(record.measuredModel.residual,/y_geometry/);
assert.match(record.suggestedExperiment.heldOutTest,/before unblinding/);
assert.match(record.verdict,/all eight typed conventional channels/);

console.log(JSON.stringify({
  status:"PASS",
  channels:record.statusSummary.channels,
  exactControls:record.statusSummary.exactZeroControls,
  experiment:"same-device coherent loop with held-out complex-response prediction",
  decision:"Q power alone is not new physics",
}));

