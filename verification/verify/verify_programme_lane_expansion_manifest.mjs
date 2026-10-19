import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "programme_lane_expansion_manifest.json"), "utf8"));
const closure = JSON.parse(fs.readFileSync(path.join(root, "programme_closure_manifest.json"), "utf8"));
const gateIds = new Set(closure.gates.map((g) => g.id));
const allowed = new Set(manifest.statuses);
assert.equal(manifest.schema_version, 1);
assert.equal(manifest.lanes.length, 9);
assert(fs.existsSync(path.join(root, manifest.continuation_map)), "missing landscape continuation map");
assert(manifest.rule.includes("landscape") && manifest.rule.includes("closure"), "two-ledger rule missing");
const ids = new Set();
for (const lane of manifest.lanes) {
  assert(!ids.has(lane.id), `duplicate ${lane.id}`); ids.add(lane.id);
  assert(allowed.has(lane.status), `bad status ${lane.id}`);
  for (const gate of lane.closure_break_addressed) assert(gateIds.has(gate), `${lane.id} unknown ${gate}`);
  for (const key of ["typed_start", "first_executable_test", "promotion_criterion", "falsifier"]) assert(lane[key]?.length > 40, `${lane.id} weak ${key}`);
  assert(lane.existing_evidence.length >= 3, `${lane.id} lacks seeds`);
  for (const doc of lane.existing_evidence) assert(fs.existsSync(path.join(root, doc)), `${lane.id} missing ${doc}`);
}
const covered = new Set(manifest.lanes.flatMap((x) => x.closure_break_addressed));
for (const gate of closure.gates.filter((g) => g.status !== "established")) assert(covered.has(gate.id), `open gate ${gate.id} uncovered`);
console.log("PASS programme lane expansion manifest");
console.log(`lanes=${manifest.lanes.length}`);
console.log(`statuses=${JSON.stringify(Object.fromEntries([...allowed].map((s) => [s, manifest.lanes.filter((x) => x.status === s).length])))}`);
console.log(`open_gates_covered=${covered.size}`);
