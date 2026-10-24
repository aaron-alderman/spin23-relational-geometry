import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const record = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/girih_figure4f_blind_continuity_v1.json"), "utf8"));

assert.equal(record.schema, "dynatology-girih-figure4f-blind-continuity/1");
assert.equal(record.status, "partial_success_blind_discriminator_not_defect_counter");
assert.equal(record.stabilitySweep.trials, record.stabilitySweep.scalesPixelsPerPdfPoint.length * record.stabilitySweep.minimumAreasSquarePdfPoints.length);
assert.equal(record.stabilitySweep.absoluteComponentCountsStableInAllTrials, false);
assert.equal(record.stabilitySweep.registeredDeltasStableInAllTrials, true);

const {before, after} = record.stabilitySweep.representativeCountsAtScale12;
const {afterMinusBefore} = record.stabilitySweep.registeredDelta;
for (const colour of ["red", "blue"]) {
  assert.equal(after[colour] - before[colour], afterMinusBefore[colour]);
  assert.equal(afterMinusBefore[colour], 2);
}

assert.ok(record.detector.withheld.includes("yellow_annotation"));
assert.ok(record.detector.withheld.includes("caption"));
assert.match(record.verdict, /full_seam_and_defect_oracle_fails/);
assert.match(record.stopRule, /held_out_patch/);

console.log("Dynatology girih Figure 4F blind continuity: PASS");
console.log(JSON.stringify({trials: record.stabilitySweep.trials, before, after, delta: afterMinusBefore, verdict: record.verdict}));
