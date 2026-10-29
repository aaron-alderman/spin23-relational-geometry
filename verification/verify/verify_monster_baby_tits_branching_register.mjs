import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const branching = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/monster_baby_tits_branching_register_v1.json"), "utf8"));
const catalogue = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/mathematical_group_catalogue_v1.json"), "utf8"));
const external = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/mathematical_group_external_object_register_v1.json"), "utf8"));
const occurrences = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/monster_baby_tits_occurrence_register_v1.json"), "utf8"));

assert.equal(branching.schema, "monster-baby-tits-branching-register/1");
const objectIds = new Set(external.objects.map((object) => object.id));
const occurrenceIds = new Set(occurrences.occurrences.map((occurrence) => occurrence.id));
const sourceIds = new Set(catalogue.sources.map((source) => source.id));

assert.equal(branching.literatureRecovery.status, "required_tables_and_principal_fusions_available");
assert.ok(branching.literatureRecovery.availableTableIdentifiers.includes("(GL(2,3)x2F4(2)').2"));
for (const sourceId of branching.literatureRecovery.provenance) assert.ok(sourceIds.has(sourceId), `unknown literature source ${sourceId}`);
for (const edge of [
  ["2F4(2)'", "2F4(2)'.2"],
  ["S4x2F4(2)'.2", "B"],
  ["(GL(2,3)x2F4(2)').2", "2.B"],
  ["2.B", "M"]
]) assert.ok(branching.literatureRecovery.storedFusionEdges.some((candidate) => candidate[0] === edge[0] && candidate[1] === edge[1]), `missing stored fusion ${edge[0]} -> ${edge[1]}`);

for (const record of branching.knownDecompositions) {
  assert.ok(objectIds.has(record.parentRepresentation), `${record.id}: unknown parent representation`);
  assert.ok(occurrenceIds.has(record.actingGroupOccurrence), `${record.id}: unknown acting occurrence`);
  const dimension = record.summands.reduce((sum, summand) => sum + BigInt(summand.dimension) * BigInt(summand.multiplicity), 0n);
  assert.equal(dimension, BigInt(record.dimensionCheck), `${record.id}: dimension mismatch`);
}

const openIds = new Set(branching.openComputations.map((record) => record.id));
for (const record of branching.openComputations) {
  if (record.parentRepresentation) assert.ok(objectIds.has(record.parentRepresentation), `${record.id}: unknown representation`);
  if (record.sourceOccurrence) assert.ok(occurrenceIds.has(record.sourceOccurrence), `${record.id}: unknown source occurrence`);
  if (record.targetOccurrence) assert.ok(occurrenceIds.has(record.targetOccurrence), `${record.id}: unknown target occurrence`);
  for (const parent of record.parentComputations ?? []) assert.ok(openIds.has(parent), `${record.id}: unknown parent computation ${parent}`);
  assert.notEqual(record.status, "complete", `${record.id}: must not claim completion without branching outputs`);
  assert.notEqual(record.status, "open_input_missing", `${record.id}: literature recovery found the principal table inputs`);
  assert.ok(record.algorithm.length > 0 && record.requiredOutputs.length > 0, `${record.id}: incomplete computation contract`);
}

assert.equal(branching.deterministicExecutionContract.llmRequired, false);
for (const rule of [
  "all_multiplicities_are_nonnegative_integers",
  "constituent_dimensions_sum_to_the_parent_dimension",
  "central_kernel_eigenvalues_are_preserved",
  "occurrence_ids_are_never_replaced_by_abstract_group_ids_in_results"
]) assert.ok(branching.deterministicExecutionContract.admissionRules.includes(rule), `missing admission rule ${rule}`);

console.log(`Monster--Baby--Tits branching register: PASS known=${branching.knownDecompositions.length}; open=${branching.openComputations.length}; deterministic=true`);
