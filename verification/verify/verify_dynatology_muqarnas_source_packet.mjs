import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const source = path.join(root, "corpus/programmes/dynatology/muqarnas_source_packet_v1.json");
const packet = JSON.parse(fs.readFileSync(source, "utf8"));

assert.equal(packet.schema, "dynatology-muqarnas-source-packet/1");
assert.equal(packet.authority, "source_relations_precede_exceptional_algebra_fit");
assert.equal(packet.transcriptionStatus, "source_selection_complete_machine_transcription_open");
assert.equal(packet.sources.length, 4);

const ids = packet.sources.map((item) => item.id);
assert.deepEqual(ids, ["MPS-001", "MPS-002", "MPS-003", "MPS-004"]);
for (const item of packet.sources) {
  for (const field of ["name", "sourceType", "url", "role", "status"]) {
    assert.ok(typeof item[field] === "string" && item[field].trim(), `${item.id}: ${field}`);
  }
  assert.match(item.url, /^https:\/\//);
  assert.ok(item.documentedFeatures.length >= 4, `${item.id}: documentedFeatures`);
}
const primary = packet.sources.find((item) => item.id === "MPS-001");
assert.ok(primary.observationRef && fs.existsSync(path.join(root, primary.observationRef)));

for (const field of ["orientation", "boundary_types", "uncertainty_and_alternatives"]) {
  assert.ok(packet.requiredFields.includes(field), `missing required field: ${field}`);
}
assert.ok(packet.admissionRules.includes("transcribe_without_octonion_labels"));
assert.ok(packet.admissionRules.includes("require_withheld_prediction_for_strong_bridge"));

console.log("Dynatology muqarnas source packet: PASS");
console.log(JSON.stringify({sources: packet.sources.length, fields: packet.requiredFields.length, rules: packet.admissionRules.length}));

