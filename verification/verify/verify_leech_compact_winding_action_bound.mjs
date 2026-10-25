import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-compact-winding-action-bound-v1.json"
), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "../../scripts/analyze-leech-compact-winding-bound.mjs")
], {encoding: "utf8"}));

assert.equal(record.schemaVersion, "leech-compact-winding-action-bound-v1");
assert.equal(run.inverseIntegral, true);
assert.deepEqual(run.inverseDiagonal.map(Number), record.exactMetricData.inverseDiagonal);
assert.deepEqual(run.effectiveSchurMasses, record.exactMetricData.effectiveSchurMasses);
assert.equal(run.minimumEffectiveSchurMass, "1/22");
assert.deepEqual(run.minimumCoordinates, [record.exactMetricData.minimumCoordinateOneBased]);
assert.deepEqual(run.gramDiagonal, record.exactMetricData.gramDiagonal);
const close = (first, second, tolerance = 3e-14) =>
  assert.ok(Math.abs(first - second) < tolerance * Math.max(1, Math.abs(second)), `${first} != ${second}`);
for (let index = 0; index < record.scans.length; index += 1) {
  const frozen = record.scans[index];
  const actual = run.scans[index];
  assert.equal(frozen.chargingToCosineRatio, actual.chargingToCosineRatio);
  close(frozen.rigorousActionFloor, actual.rigorousActionFloorForAnyPrimitiveCoordinateWinding);
  close(frozen.bareExponentialCeilingIgnoringPrefactor,
    actual.semiclassicalExponentialCeilingIgnoringPrefactor);
  close(frozen.smallestStraightTrialAction, actual.smallestStraightCoordinateTrialAction);
  close(frozen.actionBracketRatio, actual.actionBracketRatio);
  close(frozen.rigorousActionFloor, 8 * Math.sqrt(1 / (22 * frozen.chargingToCosineRatio)));
  close(frozen.bareExponentialCeilingIgnoringPrefactor, Math.exp(-frozen.rigorousActionFloor));
}
assert.ok(record.boundary.includes("not the fluctuation determinant or total tunnelling amplitude"));

console.log(JSON.stringify({
  status: "PASS",
  inverseIntegral: true,
  minimumEffectiveSchurMass: record.exactMetricData.minimumEffectiveSchurMass,
  weakestCoordinate: record.exactMetricData.minimumCoordinateOneBased,
  scans: record.scans.map(({chargingToCosineRatio, rigorousActionFloor,
    bareExponentialCeilingIgnoringPrefactor}) => ({chargingToCosineRatio,
    rigorousActionFloor, bareExponentialCeilingIgnoringPrefactor})),
  prefactorRigorouslyBounded: false,
  epistemicStatus: record.epistemicStatus
}));
