import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const results = JSON.parse(fs.readFileSync(path.join(root, "programme_lane_expansion_results.json"), "utf8"));
const expansion = JSON.parse(fs.readFileSync(path.join(root, "programme_lane_expansion_manifest.json"), "utf8"));
assert.equal(results.schema_version, 1);
assert.equal(results.lanes.length, 9);
assert.deepEqual(results.lanes.map((x) => x.id), expansion.lanes.map((x) => x.id));
const permittedLandscape = new Set(["moderate", "strong"]);
const required = [
  "established_landscape", "programme_result", "generic_universality", "novelty_status",
  "next_decision_experiment", "go_signal", "no_go_signal",
];
for (const lane of results.lanes) {
  assert.equal(lane.status, expansion.lanes.find((x) => x.id === lane.id).status);
  assert(fs.existsSync(path.join(root, lane.result_document)), `${lane.id} missing result`);
  assert(fs.existsSync(path.join(root, lane.certificate)), `${lane.id} missing certificate`);
  for (const key of required) assert(lane[key]?.length > 20, `${lane.id} weak ${key}`);
  assert(permittedLandscape.has(lane.landscape_value), `${lane.id} bad landscape ledger`);
  assert(lane.closure_value?.length > 3, `${lane.id} missing closure ledger`);
}
assert(results.paper_clusters.length >= 3);
assert(results.paper_clusters.every((x) => x.readiness && x.core && x.lanes.length));
assert(results.overall_verdict.includes("no lane presently derives"));
console.log("PASS consolidated nine-lane results");
console.log(`lanes=${results.lanes.length}`);
console.log(`advanced_conditional=${results.lanes.filter((x) => x.status === "advanced_conditional").length}`);
console.log(`seeded=${results.lanes.filter((x) => x.status === "seeded").length}`);
console.log(`paper_clusters=${results.paper_clusters.length}`);
