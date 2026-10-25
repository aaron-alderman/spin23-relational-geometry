import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-joined-cell-sweep-convergence-v1.json"), "utf8"));

assert.equal(record.schemaVersion, "leech-joined-cell-sweep-convergence-v1");
const initialGap = record.initial.oddEnergy - record.initial.evenEnergy;
const finalGap = record.continuation.finalOddExpectation
  - record.continuation.finalEvenExpectation;
assert.ok(Math.abs(initialGap - record.initial.variationalGap) < 1e-12);
assert.ok(Math.abs(finalGap - record.continuation.finalVariationalGap) < 1e-12);
assert.ok(Math.abs(finalGap - initialGap - record.derived.gapShift) < 1e-12);
for (const shifts of [record.derived.evenPerSweepShifts,
  record.derived.oddPerSweepShifts]) {
  assert.ok(shifts.every((shift) => shift < 0));
  assert.ok(Math.abs(shifts[1]) < Math.abs(shifts[0]));
}
assert.ok(record.derived.gapShiftRelativeToPreviousBond48To64Shift < 0.18);
assert.equal(record.derived.sweepConverged, false);
assert.ok(record.boundary.includes("variational upper estimates"));
assert.ok(record.boundary.includes("do not constitute a lower spectral bound"));

console.log(JSON.stringify({
  status: "PASS",
  cutoff: 4,
  maximumBond: 64,
  initialGap,
  finalGap,
  gapShift: record.derived.gapShift,
  relativeToPreviousBondShift: record.derived.gapShiftRelativeToPreviousBond48To64Shift,
  gapCertified: false,
  epistemicStatus: record.epistemicStatus
}));
