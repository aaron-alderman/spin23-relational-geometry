import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/observer-horizon-channel-audit-v1.json", root), "utf8"));

assert.deepEqual(evidence.packets, ["AZ-136", "AZ-137", "AZ-138", "AZ-139", "AZ-140"]);
assert.equal(evidence.unruh.rows.length, 9);
assert.ok(evidence.unruh.maximumDetailedBalanceResidual < 1e-12);
assert.equal(evidence.kerr.rows.length, 4);
assert.ok(evidence.kerr.maximumSchwarzschildTemperatureResidual < 1e-12);
assert.equal(evidence.kerr.scatteringRows[0].amplified, true);
assert.equal(evidence.kerr.scatteringRows[1].amplified, false);
assert.equal(evidence.kerr.scatteringRows[2].amplified, false);
assert.ok(evidence.kerr.rows.every(row => row.equatorialErgoregionThickness >= -1e-12));
assert.ok(evidence.kerr.rows.slice(1).every(row => row.equatorialErgoregionThickness > 0));

const fixedGenerator = evidence.seamChannelIndependence.fixedGenerator;
assert.ok(fixedGenerator.every(row => row.discriminant === fixedGenerator[0].discriminant));
assert.ok(new Set(fixedGenerator.map(row => row.goldenRuleWidth)).size === fixedGenerator.length);
const fixedChannel = evidence.seamChannelIndependence.fixedChannel;
assert.ok(fixedChannel.every(row => Math.abs(row.goldenRuleWidth - fixedChannel[0].goldenRuleWidth) < 1e-15));
assert.ok(new Set(fixedChannel.map(row => row.discriminant)).size === fixedChannel.length);
for (const implication of Object.values(evidence.boundaries)) assert.equal(implication, false);

for (const file of [
  "corpus/programmes/admissibility/admissibility_136_acceleration_changes_detector_closure_not_the_global_vacuum.md",
  "corpus/programmes/admissibility/admissibility_137_hawking_flux_requires_state_horizon_channel_and_detector.md",
  "corpus/programmes/admissibility/admissibility_138_kerr_separates_horizon_ergosurface_and_superradiant_channel.md",
  "corpus/programmes/admissibility/admissibility_139_nuclear_open_systems_calibrate_seam_channel_and_record.md",
  "corpus/programmes/admissibility/admissibility_140_observer_horizon_channel_atlas_and_exhaustion.md"
]) {
  const text = readFileSync(new URL(file, root), "utf8");
  assert.ok(text.includes("##"), `${file} lacks sections`);
  assert.ok(/Boundary|firewall|does not|not /.test(text), `${file} lacks an epistemic boundary`);
  assert.ok(/go\/no-go|Go\/no-go|Stop rule|Decision/.test(text), `${file} lacks a decision rule`);
}

console.log(JSON.stringify({
  result: "pass",
  packets: evidence.packets,
  detailedBalanceRows: evidence.unruh.rows.length,
  kerrGeometryRows: evidence.kerr.rows.length,
  prohibitedImplications: Object.keys(evidence.boundaries).length,
  nextGate: evidence.nextGate
}, null, 2));
