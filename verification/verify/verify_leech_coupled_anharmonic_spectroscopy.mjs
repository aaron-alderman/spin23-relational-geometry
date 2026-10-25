import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-coupled-anharmonic-spectroscopy-v1.json"
), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "../../scripts/analyze-leech-coupled-anharmonicity.mjs")
], {encoding: "utf8", maxBuffer: 2 ** 22}));

assert.equal(record.schemaVersion, "leech-coupled-anharmonic-spectroscopy-v1");
assert.ok(run.maximumEigenResidual < 1e-12);
assert.ok(Math.abs(run.maximumEigenResidual
  - record.perturbationTheory.maximumEigenResidual) < 1e-25);
const expected = record.scaleFreeFractionalCoefficientsAscendingFrequency;
assert.equal(expected.length, 24);
assert.equal(run.scaleFreeFractionalCoefficientsAscendingFrequency.length, 24);
for (let index = 0; index < 24; index += 1) {
  assert.ok(expected[index] > 0);
  assert.ok(Math.abs(expected[index]
    - run.scaleFreeFractionalCoefficientsAscendingFrequency[index]) < 2e-15);
}
assert.ok(Math.min(...expected) > 0.17);
assert.ok(Math.max(...expected) < 0.32);

assert.equal(run.scans.length, record.semiclassicalScans.length);
for (let index = 0; index < run.scans.length; index += 1) {
  const actual = run.scans[index];
  const frozen = record.semiclassicalScans[index];
  assert.equal(actual.chargingToCosineRatio, frozen.chargingToCosineRatio);
  assert.ok(Math.abs(actual.maximumNormalModeVariance
    - frozen.maximumNormalModeVariance) < 2e-15);
  assert.ok(Math.abs(actual.maximumPhysicalCoordinateVariance
    - frozen.maximumPhysicalCoordinateVariance) < 2e-15);
  assert.ok(Math.abs(actual.softestMode.fractionalCorrection
    - frozen.softestModeFractionalCorrection) < 2e-15);
  assert.ok(Math.abs(actual.largestAbsoluteFractionalCorrection
    - frozen.largestAbsoluteFractionalCorrection) < 2e-15);
  assert.ok(Math.abs(actual.softestMode.fractionalCorrection
    + expected[0] * Math.sqrt(actual.chargingToCosineRatio)) < 2e-15);
}
for (let index = 1; index < record.semiclassicalScans.length; index += 1) {
  const previous = record.semiclassicalScans[index - 1];
  const current = record.semiclassicalScans[index];
  const predictedScale = Math.sqrt(current.chargingToCosineRatio
    / previous.chargingToCosineRatio);
  assert.ok(Math.abs(current.largestAbsoluteFractionalCorrection
    / previous.largestAbsoluteFractionalCorrection - predictedScale) < 2e-14);
}
assert.ok(record.boundary.includes("not the exact nonlinear gap"));

console.log(JSON.stringify({
  status: "PASS",
  modes: expected.length,
  coefficientRange: [Math.min(...expected), Math.max(...expected)],
  scans: record.semiclassicalScans,
  allLeadingShiftsDownward: true,
  exactNonlinearGapEstablished: false,
  epistemicStatus: record.epistemicStatus
}));
