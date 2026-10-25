import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-z2-block-dmrg-bond-convergence-v1.json"), "utf8"));

assert.equal(record.schemaVersion, "leech-z2-block-dmrg-bond-convergence-v1");
assert.deepEqual(record.bondLadder.map(item => item.bond), [16, 24]);
for (const item of record.bondLadder) {
  assert.ok(Math.abs(item.oddEnergy - item.evenEnergy - item.gap) < 1e-14);
  assert.equal(item.solverConvergedAtTolerance, false);
}
const [low, high] = record.bondLadder;
const shift = record.bond16To24;
assert.ok(Math.abs(high.evenEnergy - low.evenEnergy - shift.evenEnergyShift) < 1e-14);
assert.ok(Math.abs(high.oddEnergy - low.oddEnergy - shift.oddEnergyShift) < 1e-14);
assert.ok(Math.abs(high.gap - low.gap - shift.gapShift) < 1e-14);
assert.ok(shift.evenEnergyShift < 0 && shift.oddEnergyShift < 0);
assert.ok(shift.relativeGapShift < 6e-5);
assert.ok(record.penaltyComparatorAtBond24.relativeDifference < 3.2e-4);
assert.ok(record.boundary.includes("do not establish asymptotic bond convergence"));

console.log(JSON.stringify({
  status: "PASS",
  bonds: record.bondLadder.map(item => item.bond),
  gaps: record.bondLadder.map(item => item.gap),
  relativeGapShift: shift.relativeGapShift,
  bothVariationalEnergiesDecrease: shift.bothVariationalEnergiesDecrease,
  gapCertified: false,
  epistemicStatus: record.epistemicStatus
}));
