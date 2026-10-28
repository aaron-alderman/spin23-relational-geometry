import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const crosswalkPath = path.join(root, "corpus/programmes/moonshine-program-lattice/monster-baby-tits-corpus-crosswalk-v1.json");
const crosswalkDir = path.dirname(crosswalkPath);
const crosswalk = JSON.parse(fs.readFileSync(crosswalkPath, "utf8"));
const occurrences = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/monster_baby_tits_occurrence_register_v1.json"), "utf8"));
const branching = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/monster_baby_tits_branching_register_v1.json"), "utf8"));
const bridge = fs.readFileSync(path.join(crosswalkDir, "monster-baby-tits-corpus-bridge.md"), "utf8");

assert.equal(crosswalk.schema, "monster-baby-tits-corpus-crosswalk/1");
assert.equal(crosswalk.authority, "corpus_integration_crosswalk_not_new_group_theory");

for (const relativePath of Object.values(crosswalk.upstream)) {
  assert.ok(fs.existsSync(path.resolve(crosswalkDir, relativePath)), `missing upstream ${relativePath}`);
}
for (const contact of crosswalk.corpusContacts) {
  assert.ok(fs.existsSync(path.resolve(crosswalkDir, contact.path)), `${contact.id}: missing corpus contact ${contact.path}`);
  assert.ok(contact.connection.length > 0 && contact.boundary.length > 0, `${contact.id}: connection and boundary required`);
}

const occurrenceIds = new Set(occurrences.occurrences.map((occurrence) => occurrence.id));
for (const occurrenceId of crosswalk.selectedPath) assert.ok(occurrenceIds.has(occurrenceId), `unknown selected occurrence ${occurrenceId}`);
for (const distinction of crosswalk.distinctions) {
  for (const side of [distinction.left, distinction.right]) {
    if (side.startsWith("occ:")) assert.ok(occurrenceIds.has(side), `${distinction.id}: unknown occurrence ${side}`);
  }
}

const branchingIds = new Set(branching.openComputations.map((task) => task.id));
for (const measurement of crosswalk.measurements) {
  assert.ok(branchingIds.has(measurement.branchingTask), `${measurement.id}: unknown branching task ${measurement.branchingTask}`);
  assert.ok(measurement.outputs.length > 0, `${measurement.id}: outputs required`);
}

for (const requiredBoundary of [
  "an_E8_current_or_gauge_symmetry",
  "a_Tits_order_23_rail",
  "a_physical_carrier_or_dynamical_selector",
  "the_remaining_Monster_Tits_conjugacy_class_identification"
]) assert.ok(crosswalk.promotionBoundary.doesNotEstablish.includes(requiredBoundary), `missing promotion boundary ${requiredBoundary}`);

for (const phrase of [
  "local spectral microscope",
  "These are different 96256-dimensional objects",
  "is not Monster `2A`",
  "cannot contain the order-23 rail",
  "not a new theory"
]) assert.ok(bridge.includes(phrase), `bridge missing required statement: ${phrase}`);

console.log(`Monster--Baby--Tits corpus crosswalk: PASS contacts=${crosswalk.corpusContacts.length}; distinctions=${crosswalk.distinctions.length}; measurements=${crosswalk.measurements.length}`);
