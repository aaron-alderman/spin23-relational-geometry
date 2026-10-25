import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const atlas = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/mystery_atlas_register_v1.json"), "utf8"));
const collision = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/mystery_collision_register_v1.json"), "utf8"));

assert.equal(collision.schema, "dynatology-mystery-collision/1");
assert.equal(collision.authority, "corpus_contact_does_not_change_evidence_zone");
assert.deepEqual(collision.contactTypes, ["direct", "candidate", "methodological", "analogy_only", "none"]);

const atlasIds = atlas.entries.map((entry) => entry.id);
const collisionIds = collision.entries.map((entry) => entry.mysteryId);
assert.deepEqual(collisionIds, atlasIds, "every mystery must have exactly one ordered collision assessment");
assert.equal(new Set(collisionIds).size, collisionIds.length);

const allowed = new Set(collision.contactTypes);
for (const entry of collision.entries) {
  assert.ok(allowed.has(entry.contactType), `${entry.mysteryId}: contactType`);
  for (const field of ["corpusMechanism", "result", "immediateTest"]) {
    assert.ok(typeof entry[field] === "string" && entry[field].trim(), `${entry.mysteryId}: ${field}`);
  }
  assert.ok(Array.isArray(entry.sourceRefs) && entry.sourceRefs.length > 0, `${entry.mysteryId}: sourceRefs`);
  for (const ref of entry.sourceRefs) {
    assert.ok(fs.existsSync(path.join(root, ref)), `${entry.mysteryId}: missing ${ref}`);
  }
}

const counts = Object.fromEntries(collision.contactTypes.map((type) => [type, collision.entries.filter((entry) => entry.contactType === type).length]));
assert.deepEqual(counts, {direct: 4, candidate: 4, methodological: 12, analogy_only: 2, none: 0});
assert.ok(atlas.entries.every((entry) => !["M4", "M5"].includes(entry.zone)), "collision audit must not silently promote a mystery");

console.log("Dynatology mystery collision: PASS");
console.log(JSON.stringify(counts));
