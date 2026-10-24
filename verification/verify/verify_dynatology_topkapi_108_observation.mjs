import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const file = path.join(root, "corpus/programmes/dynatology/topkapi_drawing_108_observation_v0.json");
const observation = JSON.parse(fs.readFileSync(file, "utf8"));

assert.equal(observation.schema, "dynatology-topkapi-muqarnas-observation/0");
assert.equal(observation.status, "source_locked_visual_observation_not_vector_transcription");
assert.equal(observation.source.pdfSha256.length, 64);
assert.equal(observation.source.pdfBytes, 31445355);
assert.equal(observation.source.pdfPage, 296);
assert.equal(observation.source.catalogueDrawing, 108);
assert.equal(observation.layers.length, 4);
assert.deepEqual(observation.layers.map((layer) => layer.id), ["T108-L1", "T108-L2", "T108-L3", "T108-L4"]);

for (const layer of observation.layers) {
  for (const field of ["name", "content", "evidence", "warning"]) {
    assert.ok(typeof layer[field] === "string" && layer[field].trim(), `${layer.id}: ${field}`);
  }
}

assert.equal(observation.documentedCounts.principalRadii, 11);
assert.equal(observation.documentedCounts.impliedHalfVaultRadialSymmetry, 24);
assert.match(observation.selectedFrame.octonionBoundary, /no map.*Im\(O\)/i);
assert.ok(observation.antiRetrofittingControls.includes("no_privileged_sevenfold_motif_is_documented"));
assert.ok(observation.antiRetrofittingControls.length >= 5);
assert.ok(observation.nextTranscriptionObjects.length >= 8);
assert.match(observation.currentVerdict, /no current evidence of a Fano-plane/i);

console.log("Dynatology Topkapi drawing 108 observation: PASS");
console.log(JSON.stringify({layers: observation.layers.length, controls: observation.antiRetrofittingControls.length, nextObjects: observation.nextTranscriptionObjects.length}));

