import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-joined-cell-dmrg-reconnaissance-v1.json"), "utf8"));
const orderTwo = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-24mode-full-cosine-order-two-v1.json"), "utf8"));
const runner = fs.readFileSync(path.join(root,
  "scripts/reconnoiter-leech-joined-cell-dmrg.py"), "utf8");

assert.equal(record.schemaVersion, "leech-joined-cell-dmrg-reconnaissance-v1");
assert.equal(record.cutoffLadder.length, 4);
const reference = orderTwo.scans.find((scan) => scan.chargingToCosineRatio === 0.01)
  .gapThroughOrderTwo;
assert.equal(record.weakCosineReference.gapThroughOrderU2, reference);
const gaps = record.cutoffLadder.map((rung) => rung.variationalGap);
for (let index = 1; index < gaps.length; index += 1) assert.ok(gaps[index] < gaps[index - 1]);
for (let index = 0; index < gaps.length; index += 1) {
  assert.ok(Math.abs(record.cutoffLadder[index].oddEnergy
    - record.cutoffLadder[index].evenEnergy - gaps[index]) < 1e-12);
  assert.ok(Math.abs(record.derived.gapToWeakCosineRatios[index]
    - gaps[index] / reference) < 1e-12);
}
const final = record.cutoffLadder.at(-1);
assert.ok(final.evenResidualNormProxy > final.variationalGap);
assert.ok(final.oddResidualNormProxy > final.variationalGap);
assert.ok(record.orderingControlAtCutoffTwo.optimizedEvenResidual
  < record.orderingControlAtCutoffTwo.naturalEvenResidual);
assert.ok(record.orderingControlAtCutoffTwo.optimizedOddResidual
  < record.orderingControlAtCutoffTwo.naturalOddResidual);
assert.equal(record.derived.extrapolationAdmitted, false);
assert.ok(record.boundary.includes("not validated lower enclosures"));
assert.ok(runner.includes('sweep_sequence="RL"'));
assert.ok(runner.includes('choices=["both", "even", "odd"]'));

console.log(JSON.stringify({
  status: "PASS",
  channels: 24,
  cutoffs: record.cutoffLadder.map((rung) => rung.cutoff),
  variationalGaps: gaps,
  monotoneButNotConverged: true,
  gapCertified: false,
  epistemicStatus: record.epistemicStatus
}));
