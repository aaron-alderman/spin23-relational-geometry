import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-z2-matrix-free-bond40-v1.json"), "utf8"));

assert.equal(record.schemaVersion, "leech-z2-matrix-free-bond40-v1");
assert.deepEqual(record.stabilizedBondLadder.map(x => x.bond), [24, 32, 40]);
for (const point of record.stabilizedBondLadder) {
  assert.ok(Math.abs(point.oddEnergy - point.evenEnergy - point.gap) < 1e-14);
}
for (let i = 1; i < record.stabilizedBondLadder.length; i += 1) {
  assert.ok(record.stabilizedBondLadder[i].evenEnergy < record.stabilizedBondLadder[i - 1].evenEnergy);
  assert.ok(record.stabilizedBondLadder[i].oddEnergy < record.stabilizedBondLadder[i - 1].oddEnergy);
}
const corrections = record.bondCorrections;
assert.ok(Math.abs((record.stabilizedBondLadder[1].gap - record.stabilizedBondLadder[0].gap) - corrections.bond24To32) < 1e-14);
assert.ok(Math.abs((record.stabilizedBondLadder[2].gap - record.stabilizedBondLadder[1].gap) - corrections.bond32To40) < 1e-14);
assert.ok(corrections.absoluteCorrectionRatio > 0.5 && corrections.absoluteCorrectionRatio < 0.505);
assert.ok(record.stabilizedBondLadder[2].finalFixedBondRelativeGapShift < 1.81e-5);
assert.equal(record.scaling.effectiveMatrixMaterialized, false);
assert.ok(record.scaling.maximumSectorDimension >= 20060);
assert.ok(record.quarantinedHeuristic.admissibility.includes("not a bound"));
assert.ok(record.boundary.includes("no lower enclosure"));

console.log(JSON.stringify({status:"PASS", bonds:[24,32,40],
  gaps:record.stabilizedBondLadder.map(x => x.gap),
  correctionRatio:corrections.absoluteCorrectionRatio,
  bond40FixedDrift:record.stabilizedBondLadder[2].finalFixedBondGapShift,
  maximumSectorDimension:record.scaling.maximumSectorDimension,
  aitkenPromoted:false, gapCertified:false,
  epistemicStatus:record.epistemicStatus}));
