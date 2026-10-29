import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const catalogue = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/mathematical_group_catalogue_v1.json"), "utf8"));
const register = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/monster_baby_tits_occurrence_register_v1.json"), "utf8"));

assert.equal(register.schema, "monster-baby-tits-occurrence-register/1");

const groupIds = new Set(catalogue.groups.map((group) => group.id));
const sourceIds = new Set(catalogue.sources.map((source) => source.id));
const occurrences = new Map();
for (const occurrence of register.occurrences) {
  assert.ok(!occurrences.has(occurrence.id), `duplicate occurrence ${occurrence.id}`);
  assert.ok(groupIds.has(occurrence.groupId), `${occurrence.id}: unknown group ${occurrence.groupId}`);
  for (const sourceId of occurrence.provenance) assert.ok(sourceIds.has(sourceId), `${occurrence.id}: unknown source ${sourceId}`);
  occurrences.set(occurrence.id, occurrence);
}
for (const occurrence of register.occurrences) {
  if (occurrence.ambientOccurrenceId) assert.ok(occurrences.has(occurrence.ambientOccurrenceId), `${occurrence.id}: unknown ambient occurrence`);
  if (occurrence.sameOccurrenceAs) assert.ok(occurrences.has(occurrence.sameOccurrenceAs), `${occurrence.id}: unknown same-occurrence reference`);
  for (const distinctId of occurrence.distinctFrom ?? []) assert.ok(occurrences.has(distinctId), `${occurrence.id}: unknown distinct occurrence ${distinctId}`);
}

const order = (groupId) => BigInt(catalogue.groups.find((group) => group.id === groupId).order);
assert.equal(order("grp:Tits"), 17_971_200n);
assert.equal(order("grp:C2xTits"), 2n * order("grp:Tits"));
assert.equal(order("grp:C2xTits"), order("grp:TitsAut"), "same order must not be mistaken for same extension type");

const certificate = register.pullbackCertificate;
assert.equal(certificate.extension.central, true);
assert.equal(certificate.status, "derived_established");
assert.ok(certificate.premises.some((premise) => premise.id === "premise:Tits-Schur-multiplier-order" && premise.value === "1"));
assert.ok(certificate.premises.some((premise) => premise.id === "premise:Tits-abelianization-order" && premise.value === "1"));
for (const deduction of [
  "the_preimage_extension_splits",
  "the_preimage_is_isomorphic_to_C2_times_Tits",
  "the_complement_is_unique_relative_to_the_selected_preimage",
  "the_complement_embeds_compatibly_through_2B_into_the_Monster"
]) assert.ok(certificate.deductions.includes(deduction), `missing deduction ${deduction}`);

const monster2A = occurrences.get("occ:C2:M-2A-Ising");
const centralKernel = occurrences.get("occ:C2:2B-central-kernel");
const titsOuter = occurrences.get("occ:C2:Tits-outer");
assert.equal(centralKernel.sameOccurrenceAs, monster2A.id, "the 2.B kernel must retain the selected Monster 2A occurrence");
assert.ok(titsOuter.distinctFrom.includes(monster2A.id), "the outer Tits involution must remain distinct from Monster 2A");

const compatibleLift = occurrences.get("occ:Tits:M-compatible-lift");
const classifiedTits = occurrences.get("occ:Tits:M-classified-unspecified");
assert.equal(classifiedTits.notYetIdentifiedWith, compatibleLift.id, "classification-level and pullback-level Monster occurrences must not collapse without conjugacy evidence");

assert.deepEqual(register.openGates.map((gate) => gate.id), ["gate:identify-compatible-Tits-Monster-class"]);
for (const gateId of ["gate:full-B-local-preimage-structure", "gate:S4-preimage-cover-type"]) {
  const gate = register.resolvedGates.find((candidate) => candidate.id === gateId);
  assert.ok(gate, `missing resolved gate ${gateId}`);
  for (const sourceId of gate.provenance) assert.ok(sourceIds.has(sourceId), `${gateId}: unknown source ${sourceId}`);
}
assert.equal(register.literatureRecovery.status, "library_chain_recovered");
for (const edge of register.literatureRecovery.characterTableChain) {
  assert.equal(edge.status, "stored_fusion");
  for (const sourceId of edge.provenance) assert.ok(sourceIds.has(sourceId), `fusion ${edge.source} -> ${edge.target}: unknown source ${sourceId}`);
}

console.log(`Monster--Baby--Tits occurrence pullback: PASS occurrences=${occurrences.size}; split=C2xT; uniqueComplement=true; openGates=${register.openGates.length}`);
