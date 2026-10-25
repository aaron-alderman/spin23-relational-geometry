import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-joined-cell-bond-convergence-v1.json"), "utf8"));
const runner = fs.readFileSync(path.join(root,
  "scripts/reconnoiter-leech-joined-cell-dmrg.py"), "utf8");

assert.equal(record.schemaVersion, "leech-joined-cell-bond-convergence-v1");
assert.deepEqual(record.rungs.map((rung) => rung.maximumBond), [32, 48, 64]);
const gaps = record.rungs.map((rung) => rung.oddEnergy - rung.evenEnergy);
for (let index = 0; index < gaps.length; index += 1) {
  assert.ok(Math.abs(gaps[index] - record.rungs[index].variationalGap) < 1e-12);
}
for (let index = 1; index < record.rungs.length; index += 1) {
  assert.ok(record.rungs[index].evenEnergy < record.rungs[index - 1].evenEnergy);
  assert.ok(record.rungs[index].oddEnergy < record.rungs[index - 1].oddEnergy);
  assert.ok(record.rungs[index].evenResidualNormProxy
    < record.rungs[index - 1].evenResidualNormProxy);
  assert.ok(record.rungs[index].oddResidualNormProxy
    < record.rungs[index - 1].oddResidualNormProxy);
}
const shifts = gaps.slice(1).map((gap, index) => gap - gaps[index]);
assert.deepEqual(shifts, record.derived.gapShifts);
assert.ok(Math.abs(Math.abs(shifts[1] / shifts[0])
  - record.derived.latestToPreviousGapShiftMagnitudeRatio) < 1e-12);
assert.ok(record.rungs.at(-1).evenResidualNormProxy > 0.8 * gaps.at(-1));
assert.ok(record.rungs.at(-1).oddResidualNormProxy > 0.9 * gaps.at(-1));
assert.equal(record.derived.converged, false);
for (const token of ["--state-prefix-in", "--state-prefix-out", "--result-prefix",
  "--skip-variance", 'choices=["both", "even", "odd"]']) assert.ok(runner.includes(token));
assert.ok(record.boundary.includes("does not supply lower spectral bounds"));

console.log(JSON.stringify({
  status: "PASS",
  cutoff: 4,
  bonds: record.rungs.map((rung) => rung.maximumBond),
  gaps: record.rungs.map((rung) => rung.variationalGap),
  latestShiftRatio: record.derived.latestToPreviousGapShiftMagnitudeRatio,
  converged: false,
  epistemicStatus: record.epistemicStatus
}));
