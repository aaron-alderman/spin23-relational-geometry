import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const atlas = JSON.parse(fs.readFileSync(path.join(root, "programme_no_go_atlas.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "programme_closure_manifest.json"), "utf8"));
const allowed = new Set(["conditional", "underdetermined", "obstructed", "missing"]);
assert.equal(atlas.schema_version, 1);
assert(atlas.routes.length >= 6);

const routeIds = new Set();
const covered = new Set();
for (const route of atlas.routes) {
  assert(!routeIds.has(route.id), `duplicate route ${route.id}`);
  routeIds.add(route.id);
  assert(allowed.has(route.status), `bad route status ${route.id}`);
  for (const key of ["established_core", "first_break", "smallest_resolving_calculation", "promotion_test", "falsifier"]) {
    assert(route[key]?.length > 20, `${route.id} missing ${key}`);
  }
  for (const gate of route.gates_covered) covered.add(gate);
  for (const doc of route.evidence) assert(fs.existsSync(path.join(root, doc)), `${route.id} missing ${doc}`);
}

const openGates = manifest.gates.filter((g) => g.status !== "established").map((g) => g.id);
for (const gate of openGates) assert(covered.has(gate), `open gate ${gate} absent from atlas`);

console.log("PASS programme no-go atlas");
console.log(`routes=${atlas.routes.length}`);
console.log(`open_gates_covered=${openGates.length}/${openGates.length}`);
console.log(`route_statuses=${JSON.stringify(Object.fromEntries([...allowed].map((s) => [s, atlas.routes.filter((r) => r.status === s).length])))}`);
