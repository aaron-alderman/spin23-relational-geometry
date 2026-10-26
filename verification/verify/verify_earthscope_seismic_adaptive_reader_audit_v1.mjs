import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(readFileSync(new URL("evidence/data/earthscope-seismic-adaptive-reader-audit-v1.json", root), "utf8"));
const hash = path => createHash("sha256").update(readFileSync(new URL(path, root))).digest("hex");

assert.equal(data.status, "real elastic-wave adaptive reader audit");
assert.equal(data.source.station, "IU.ANMO.00");
assert.equal(data.observations.sampleRateHz, 20);
assert.ok(data.observations.alignedSamples > 30000);
assert.equal(data.observations.gapsOverOneAndHalfSamples, 0);
assert.ok(data.observations.peakToBaselineRms > 2);
assert.ok(data.observations.spectrum.peakFrequencyHz > 0);
assert.ok(data.observations.polarization.concentration > 1/3);
for (const [channel, source] of Object.entries(data.source.channels)) {
  assert.match(channel, /^BH[12Z]$/);
  assert.equal(hash(source.path), source.sha256);
  assert.ok(source.uniqueSamples > 30000);
}
assert.equal(hash(data.source.stationMetadata.path), data.source.stationMetadata.sha256);
assert.deepEqual(data.readerAudit.trace.map(x => x.readerId), ["R5", "R6", "R7"]);
assert.equal(data.readerAudit.trace[0].status, "admitted");
assert.equal(data.readerAudit.trace[1].status, "unavailable");
assert.equal(data.readerAudit.trace[2].status, "unavailable");
assert.equal(data.readerAudit.termination, "abstain");
assert.deepEqual(data.readerAudit.finalCandidates, ["classical_pressure_wave", "phonon_focusing", "riemann_shock_without_cusp"]);
assert.equal(data.verdict.adaptiveMechanismIdentificationEstablished, false);
assert.equal(hash(data.figure.path), data.figure.sha256);
assert.equal(data.glassBox.noLlmRequired, true);
console.log("EarthScope seismic adaptive reader audit v1 verification passed");
