import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const file = path.join(root, "corpus/programmes/dynatology/muqarnas_mathematics_literature_map_v1.json");
const map = JSON.parse(fs.readFileSync(file, "utf8"));

assert.equal(map.schema, "dynatology-muqarnas-mathematics-literature-map/1");
assert.equal(map.authority, "novelty_requires_more_than_relabeling_established_formalisms");
assert.deepEqual(map.statuses, ["established_direct", "established_transfer", "new_application", "open_new_math"]);
assert.equal(map.entries.length, 12);

const ids = map.entries.map((entry) => entry.id);
assert.deepEqual(ids, ids.map((_, i) => `MML-${String(i + 1).padStart(3, "0")}`));
for (const entry of map.entries) {
  assert.ok(map.statuses.includes(entry.status), `${entry.id}: status`);
  for (const field of ["topic", "currentUse", "noveltyBoundary"]) {
    assert.ok(typeof entry[field] === "string" && entry[field].trim(), `${entry.id}: ${field}`);
  }
}

const counts = Object.fromEntries(map.statuses.map((status) => [status, map.entries.filter((entry) => entry.status === status).length]));
assert.deepEqual(counts, {established_direct: 3, established_transfer: 5, new_application: 2, open_new_math: 2});
assert.equal(map.directSearchOutcome.result, "no_direct_scholarly_bridge_located_in_targeted_web_search");
assert.equal(map.directSearchOutcome.caveat, "not_a_database_complete_proof_of_absence");

console.log("Dynatology muqarnas mathematics literature map: PASS");
console.log(JSON.stringify(counts));

