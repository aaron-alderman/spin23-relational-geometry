import assert from "node:assert/strict";
import fs from "node:fs";

const read = (name) => JSON.parse(fs.readFileSync(new URL(
  `../../evidence/data/${name}`, import.meta.url
), "utf8"));
const record = read("leech-nonlinear-commissioning-packet-v1.json");
const harmonic = read("leech-coupled-metric-pendulum-gap-audit-v1.json");
const anharmonic = read("leech-coupled-anharmonic-spectroscopy-v1.json");
const mixing = read("leech-one-quantum-quartic-mixing-v1.json");
const order = read("leech-24mode-full-cosine-order-two-v1.json");
const winding = read("leech-compact-winding-action-bound-v1.json");

assert.equal(record.schemaVersion, "leech-nonlinear-commissioning-packet-v1");
assert.equal(harmonic.harmonicSmallOscillationCertificate.scaleFreeFrequencyRatiosToSoftest.length, 24);
assert.equal(anharmonic.scaleFreeFractionalCoefficientsAscendingFrequency.length, 24);
assert.ok(mixing.scans.every(({mixedTransitionsAscending}) => mixedTransitionsAscending.length === 24));
assert.equal(record.modeSplit.oneBasedCalibrationModes.length, 12);
assert.equal(record.modeSplit.oneBasedHeldOutModes.length, 12);
assert.deepEqual([...record.modeSplit.oneBasedCalibrationModes,
  ...record.modeSplit.oneBasedHeldOutModes].sort((a, b) => a - b),
Array.from({length: 24}, (_, index) => index + 1));
assert.equal(new Set([...record.modeSplit.oneBasedCalibrationModes,
  ...record.modeSplit.oneBasedHeldOutModes]).size, 24);

const configurations = record.configurations;
assert.equal(configurations.weakDriveModeSpectroscopy,
  record.settings.precisionRatios.length * 24);
assert.equal(configurations.twoToneAnharmonicSpectroscopy,
  record.settings.anharmonicRatios.length * 24);
assert.equal(configurations.offsetPhaseWeakestCoordinate,
  record.settings.precisionRatios.length * record.settings.offsetPhasePointsPerRatio);
assert.equal(configurations.total, configurations.weakDriveModeSpectroscopy
  + configurations.twoToneAnharmonicSpectroscopy
  + configurations.offsetPhaseWeakestCoordinate + configurations.parityAndPowerControls);
assert.equal(configurations.totalRepeatedAcquisitions,
  configurations.total * record.settings.repeatsPerConfiguration);
assert.equal(configurations.totalRepeatedAcquisitions, 22800);

assert.deepEqual(record.gates.map(({id}) => id), ["N1","N2","N3","N4","N5","N6"]);
assert.ok(record.modeSplit.rule.includes("no mode-specific Kerr or frequency refits"));
assert.ok(record.gates.find(({id}) => id === "N5").pass.includes("no absolute amplitude promotion"));
const discrepancies = order.scans.filter((scan) => scan.relativeDifferenceFromEightModeGap)
  .map((scan) => scan.relativeDifferenceFromEightModeGap);
assert.ok(Math.max(...discrepancies) < 0.001);
assert.ok(record.boundary.includes("0.0082-0.0852 percent theory-ladder discrepancies"));
assert.equal(winding.exactMetricData.minimumCoordinateOneBased, 2);
assert.ok(record.notPromoted.includes("Monster defects"));

console.log(JSON.stringify({
  status: "PASS",
  configurations: configurations.total,
  repeatedAcquisitions: configurations.totalRepeatedAcquisitions,
  calibrationModes: record.modeSplit.oneBasedCalibrationModes,
  heldOutModes: record.modeSplit.oneBasedHeldOutModes,
  gates: record.gates.map(({id, name}) => ({id, name})),
  largestKnownTheoryLadderDiscrepancy: Math.max(...discrepancies),
  weakestCompactCoordinate: winding.exactMetricData.minimumCoordinateOneBased,
  promotionAfterPass: record.promotionAfterPass,
  notPromoted: record.notPromoted,
  epistemicStatus: record.epistemicStatus
}));
