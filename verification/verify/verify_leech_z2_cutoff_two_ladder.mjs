import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-z2-cutoff-two-ladder-v1.json"), "utf8"));

assert.equal(record.schemaVersion, "leech-z2-cutoff-two-ladder-v1");
assert.equal(record.configuration.sites, 24);
assert.equal(record.configuration.cutoff, 2);
assert.deepEqual(record.bondLadder.map(x => x.bond), [16, 24]);
for (const item of record.bondLadder) {
  assert.ok(Math.abs(item.oddEnergy - item.evenEnergy - item.gap) < 1e-14);
  assert.equal(item.solverConvergedAtTolerance, false);
}
const [low, high] = record.bondLadder;
assert.ok(Math.abs(high.evenEnergy - low.evenEnergy - record.bond16To24.evenEnergyShift) < 1e-14);
assert.ok(Math.abs(high.oddEnergy - low.oddEnergy - record.bond16To24.oddEnergyShift) < 1e-14);
assert.ok(Math.abs(high.gap - low.gap - record.bond16To24.gapShift) < 1e-14);
assert.ok(record.bond16To24.evenEnergyShift < 0 && record.bond16To24.oddEnergyShift < 0);
assert.ok(record.penaltyComparator.bond24RelativeDifference < 7.3e-4);
assert.ok(Math.abs(high.finalFixedBondGapShift / high.gap) < 5.9e-5);
assert.ok(record.boundary.includes("too large for a gap certificate"));

console.log(JSON.stringify({status:"PASS", cutoff:2, bonds:[16,24],
  gaps:record.bondLadder.map(x => x.gap),
  relativeBondCorrection:record.bond16To24.relativeGapShift,
  penaltyComparatorDifference:record.penaltyComparator.bond24RelativeDifference,
  maximumChargedBlockDimension:record.scaling.maximumChargedBlockDimension,
  gapCertified:false, epistemicStatus:record.epistemicStatus}));
