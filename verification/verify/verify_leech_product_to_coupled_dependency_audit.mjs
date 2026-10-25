import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const record = JSON.parse(read("evidence/data/leech-product-to-coupled-dependency-audit-v1.json"));
const orderTwo = JSON.parse(read("evidence/data/leech-24mode-full-cosine-order-two-v1.json"));
const wave = (number, suffix) => read(`corpus/programmes/frontier/wave-7/frontier_wave7_${number}_${suffix}.md`);

assert.equal(record.schemaVersion, "leech-product-to-coupled-dependency-audit-v1");
assert.equal(record.correctedCarrier.channelsPerCell, 24);
assert.equal(record.correctedCarrier.nonzeroOffDiagonalGramPairs, 179);
assert.ok(record.correctedCarrier.stripFactorization.includes("not 24(Y-1)"));

const oldGap = String(record.correctedCarrier.obsoleteImportedGap).slice(0, 10);
for (const source of [
  wave(160, "leech_rotor_native_pendulum_gap"),
  wave(161, "leech_rotor_strip_gap_and_edge_count"),
  wave(163, "leech_fixed_cutoff_local_gap_stability"),
  wave(164, "leech_pendulum_excitation_hopping_stress_lane")
]) assert.ok(source.includes(oldGap), `missing historical gap ${oldGap}`);

const byWave = new Map(record.dependencyClassification
  .filter((entry) => Number.isInteger(entry.wave)).map((entry) => [entry.wave, entry]));
assert.equal(byWave.get(161).status, "partly-survives");
assert.ok(byWave.get(161).survives.some((item) => item.includes("48")));
assert.ok(byWave.get(161).doesNotTransport.some((item) => item.includes("0.878424")));
assert.equal(byWave.get(162).status, "survives-conditionally");
assert.equal(byWave.get(163).status, "theorem-template-survives-conditionally");
assert.ok(byWave.get(166).doesNotTransport.some((item) => item.includes("17-level")));

const scans = new Map(orderTwo.scans.map((scan) => [scan.chargingToCosineRatio, scan]));
assert.equal(record.replacementNumericalAnchors.gapAtUOveru0p001,
  scans.get(0.001).gapThroughOrderTwo);
assert.equal(record.replacementNumericalAnchors.gapAtUOveru0p01,
  scans.get(0.01).gapThroughOrderTwo);
assert.ok(record.replacementNumericalAnchors.type.includes("not rigorous"));
assert.ok(record.promotionRule.includes("No Wave 7.160 value"));
assert.ok(record.nextCertificate.includes("lowest even and odd eigenvalue"));

console.log(JSON.stringify({
  status: "PASS",
  correctedCellsPerY: "Y-1",
  channelsPerCell: 24,
  exactEdgeCountSurvives: true,
  obsoleteImportedGap: record.correctedCarrier.obsoleteImportedGap,
  joinedGapCertificateOpen: true,
  epistemicStatus: record.epistemicStatus
}));
