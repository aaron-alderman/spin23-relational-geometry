import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/translation-free-e8-quasicrystal-backplane-bridge-v1.json",
  import.meta.url,
), "utf8"));

assert.equal(record.schemaVersion, "translation-free-e8-quasicrystal-backplane-bridge-v1");
assert.match(record.sourceProposal.observedBlobSha, /^[a-f0-9]{40}$/u);
assert.equal(record.sourceProposal.quarantinedHypotheses.length, 4);

const layers = Object.fromEntries(record.typedLayers.map(layer => [layer.id, layer]));
assert.deepEqual(Object.keys(layers), ["Q0","Q1","Q2","Q3","Q4"]);
assert.match(layers.Q0.doesNotEstablish, /E8 current algebra/u);
assert.match(layers.Q4.doesNotEstablish, /conventional backgrounds/u);

const design = record.factorialDesign;
assert.deepEqual(design.backplanes, ["periodic","quasicrystal","amorphous"]);
assert.deepEqual(design.relationPrograms, ["identity","E8"]);
assert.equal(design.totalPrimaryDevices, design.backplanes.length * design.relationPrograms.length * design.replicatesPerCell);
assert.equal(design.blindedLabels, true);
assert.ok(design.matchedVariables.length >= 8);

const cells = design.backplanes.flatMap(backplane => design.relationPrograms.map(program => `${backplane}:${program}`));
assert.equal(cells.length, 6);
assert.equal(new Set(cells).size, 6);

const measurements = Object.fromEntries(record.measurementLadder.map(item => [item.id,item]));
assert.deepEqual(Object.keys(measurements), ["M0","M1","M2","M3","M4","M5","M6"]);
assert.match(measurements.M4.pass, /remaining 232 E8 currents/u);
assert.match(measurements.M6.pass, /electromagnetic, acoustic, thermal, vibrational and Newtonian/u);

const fabrication = record.fabricationLadder;
assert.deepEqual(fabrication.map(item => item.id), ["F0","F1","F2","F3","F4","F5","F6"]);
assert.equal(fabrication[0].claimCeiling, "field pattern only");
assert.match(fabrication.at(-1).claimCeiling, /upper bound or anomaly/u);

assert.equal(record.decisionRules.length, 6);
assert.ok(record.decisionRules.some(rule => /quasicrystal is not required/u.test(rule.conclusion)));
assert.ok(record.decisionRules.some(rule => /useful hardware substrate, not an E8 source/u.test(rule.conclusion)));
assert.ok(record.decisionRules.some(rule => /replicate independently/u.test(rule.conclusion)));

for (const required of [
  /diffraction is not evidence of E8/u,
  /H4-to-E8 mathematics does not supply a material Hamiltonian/u,
  /not an additional gravitational source/u,
  /held-out records/u,
]) assert.ok(record.hardFirewalls.some(rule => required.test(rule)), required.toString());

assert.ok(record.primaryAnchors.length >= 5);
assert.ok(record.primaryAnchors.every(anchor => /^10\./u.test(anchor.doi)));

console.log(JSON.stringify({
  status: "PASS",
  sourceBlob: record.sourceProposal.observedBlobSha,
  typedLayers: Object.keys(layers),
  factorialCells: cells,
  devices: design.totalPrimaryDevices,
  measurements: Object.keys(measurements),
  heldOutE8Currents: 232,
  gravityGatePosition: "last, after material, mixer, gap, edge and root-tomography gates",
  verdict: "quasicrystal is admitted as a controlled backplane variable, never as automatic E8 or new gravity",
}));
