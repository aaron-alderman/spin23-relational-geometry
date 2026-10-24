import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const register = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/sacred_geometry_bridge_register_v1.json"), "utf8"));

assert.equal(register.schema, "dynatology-sacred-geometry-bridge/1");
assert.equal(register.authority, "formal_historical_physical_and_sacred_statuses_are_distinct");
assert.deepEqual(register.statuses, ["exact_corpus_contact", "partial_contact", "named_gap"]);
assert.ok(Array.isArray(register.entries) && register.entries.length >= 15);

const ids = register.entries.map((entry) => entry.id);
assert.deepEqual(ids, ids.map((_, i) => `SG-${String(i + 1).padStart(3, "0")}`));
assert.equal(new Set(ids).size, ids.length);

const statuses = new Set(register.statuses);
for (const entry of register.entries) {
  for (const field of ["motif", "formalObject", "physicalBoundary"]) {
    assert.ok(typeof entry[field] === "string" && entry[field].trim(), `${entry.id}: ${field}`);
  }
  assert.ok(statuses.has(entry.status), `${entry.id}: status`);
  assert.ok(Array.isArray(entry.sourceRefs) && entry.sourceRefs.length > 0, `${entry.id}: sourceRefs`);
  for (const ref of entry.sourceRefs) {
    assert.ok(fs.existsSync(path.join(root, ref)), `${entry.id}: missing ${ref}`);
  }
}

const counts = Object.fromEntries(register.statuses.map((status) => [status, register.entries.filter((entry) => entry.status === status).length]));
assert.deepEqual(counts, {exact_corpus_contact:6, partial_contact:6, named_gap:3});
assert.ok(register.entries.some((entry) => /Flower of Life/i.test(entry.motif)), "Flower of Life gap must be explicit");
assert.ok(register.entries.some((entry) => /mandalas/i.test(entry.motif)), "mandala/yantra gap must be explicit");
assert.ok(register.entries.some((entry) => /tetrahedron/i.test(entry.motif) && entry.status === "exact_corpus_contact"), "tetrahedral exact contact must be retained");
assert.ok(register.entries.some((entry) => /muqarnas/i.test(entry.motif) && entry.status === "partial_contact"), "muqarnas generative bridge must be explicit");

console.log("Dynatology sacred geometry bridge: PASS");
console.log(JSON.stringify(counts));
