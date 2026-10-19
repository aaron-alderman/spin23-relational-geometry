import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const map = JSON.parse(fs.readFileSync(path.join(root, "programme_lane_continuation_map.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "programme_lane_expansion_manifest.json"), "utf8"));
assert.equal(map.schema_version, 1);
assert.equal(map.lanes.length, manifest.lanes.length);
const ids = new Set(map.lanes.map((x) => x.id));
assert.equal(ids.size, map.lanes.length);
for (const lane of manifest.lanes) assert(ids.has(lane.id), `missing continuation for ${lane.id}`);
for (const lane of map.lanes) {
  for (const key of ["landscape_question", "landscape_value", "decision_test", "go_signal", "no_go_signal"]) {
    assert(lane[key]?.length > 40, `${lane.id} weak ${key}`);
  }
  assert.equal(lane.continuations.length, 3, `${lane.id} needs three-step continuation`);
  for (const step of lane.continuations) assert(step.length > 40, `${lane.id} weak continuation`);
}
console.log("PASS landscape-first continuation map");
console.log(`lanes=${map.lanes.length}`);
console.log(`continuation_steps=${map.lanes.reduce((n, x) => n + x.continuations.length, 0)}`);
console.log("separate_ledgers=landscape,closure");
