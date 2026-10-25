import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-24mode-quartic-second-order-v1.json"
), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "../../scripts/analyze-leech-24mode-quartic-second-order.mjs")
], {encoding: "utf8", maxBuffer: 2 ** 22}));
const wave181 = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-coupled-anharmonic-spectroscopy-v1.json"
), "utf8"));

assert.equal(record.schemaVersion, "leech-24mode-quartic-second-order-v1");
assert.equal(run.modes, 24);
const close = (first, second, tolerance = 4e-14) =>
  assert.ok(Math.abs(first - second) < tolerance * Math.max(1, Math.abs(second)), `${first} != ${second}`);
for (const sector of ["ground", "softestOneQuantum"]) {
  const actual = run.reachableStateAudit[sector];
  const frozen = record.reachableStateAudit[sector];
  assert.equal(actual.statesIncludingSource, frozen.statesIncludingSource);
  assert.deepEqual(actual.excitationSectors, frozen.virtualExcitationSectors);
  for (const excitation of frozen.virtualExcitationSectors) close(
    actual.secondOrderByExcitation[excitation], frozen.secondOrderByExcitation[excitation]
  );
}
assert.equal(record.reachableStateAudit.ground.statesIncludingSource,
  1 + 300 + 17550);
for (const [name, value] of Object.entries(record.coefficientsAtUnitRatio)) {
  if (name === "secondOrderGapDecomposition") continue;
  close(run.coefficientsAtUnitRatio[name], value);
}
const decomposition = record.coefficientsAtUnitRatio.secondOrderGapDecomposition;
close(Object.values(decomposition).reduce((sum, value) => sum + value, 0),
  record.coefficientsAtUnitRatio.secondOrderGap);

const wave181SoftCoefficient = wave181.scaleFreeFractionalCoefficientsAscendingFrequency[0];
const harmonicUnit = run.scans[0].harmonicGap / Math.sqrt(run.scans[0].chargingToCosineRatio);
close(record.coefficientsAtUnitRatio.firstOrderGap, -wave181SoftCoefficient * harmonicUnit);
for (let index = 0; index < record.scans.length; index += 1) {
  const frozen = record.scans[index];
  const actual = run.scans[index];
  for (const [name, value] of Object.entries(frozen)) close(actual[name], value);
  close(frozen.firstOrderQuarticGapCorrection,
    record.coefficientsAtUnitRatio.firstOrderGap * frozen.chargingToCosineRatio);
  close(frozen.secondOrderQuarticGapCorrection,
    record.coefficientsAtUnitRatio.secondOrderGap * frozen.chargingToCosineRatio ** 1.5);
}
assert.ok(record.boundary.includes("sextic first-order contribution"));

console.log(JSON.stringify({
  status: "PASS",
  modes: 24,
  reachableGroundStates: record.reachableStateAudit.ground.statesIncludingSource,
  reachableExcitedStates: record.reachableStateAudit.softestOneQuantum.statesIncludingSource,
  firstOrderCoefficientMatchesWave181: true,
  secondOrderGapCoefficient: record.coefficientsAtUnitRatio.secondOrderGap,
  scans: record.scans.map(({chargingToCosineRatio, secondOrderRelativeToHarmonic}) =>
    ({chargingToCosineRatio, secondOrderRelativeToHarmonic})),
  fullCosineOrderConsistent: false,
  epistemicStatus: record.epistemicStatus
}));
