import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-full-cosine-active-mode-ladder-v1.json"
), "utf8"));
const script = path.join(here, "../../scripts/analyze-leech-four-mode-cosine-active-space.mjs");
const run = (active, ratio, cutoff) => JSON.parse(execFileSync(process.execPath, [
  script, `--active-count=${active}`, `--ratios=${ratio}`, `--cutoffs=${cutoff}`
], {encoding: "utf8", maxBuffer: 2 ** 22})).scans[0].rungs[0];

assert.equal(record.schemaVersion, "leech-full-cosine-active-mode-ladder-v1");
const close = (first, second, tolerance = 4e-13) =>
  assert.ok(Math.abs(first - second) < tolerance * Math.max(1, Math.abs(second)), `${first} != ${second}`);

// Recompute one expensive cutoff-converged rung and one expensive mode-count rung.
const sixMode = run(6, 0.01, 8);
const eightMode = run(8, 0.01, 6);
const frozenSix = record.scans[1].activeModeRungs.find(({activeModes}) => activeModes === 6);
const frozenEight = record.scans[1].activeModeRungs.find(({activeModes}) => activeModes === 8);
for (const [actual, frozen] of [[sixMode, frozenSix], [eightMode, frozenEight]]) {
  assert.equal(actual.evenDimension, frozen.evenDimension);
  assert.equal(actual.oddDimension, frozen.oddDimension);
  assert.equal(actual.firstExcitationParity, "odd");
  close(actual.gap, frozen.gap);
  assert.ok(actual.maximumReportedRitzResidual < 1e-12);
}

for (const scan of record.scans) {
  assert.deepEqual(scan.activeModeRungs.map(({activeModes}) => activeModes), [2, 4, 6, 8]);
  assert.ok(scan.activeModeRungs.every(({gap}) => gap > 0));
  const [two, four, six, eight] = scan.activeModeRungs;
  close(scan.relativeModeCountChanges.twoToFour, (four.gap - two.gap) / four.gap);
  close(scan.relativeModeCountChanges.fourToSix, (six.gap - four.gap) / six.gap);
  close(scan.relativeModeCountChanges.sixToEightAtCutoff6, (eight.gap - (
    scan.chargingToCosineRatio === 0.001 ? 0.006659671830988791 : 0.020739196196149584
  )) / eight.gap);
  assert.ok(Math.max(...Object.values(scan.relativeModeCountChanges).map(Math.abs)) < 3e-5);
  assert.equal(six.cutoffStatus, "converged");
  assert.equal(eight.cutoffStatus, "reconnaissance");
}
assert.ok(record.boundary.includes("do not establish the 24-mode gap"));

console.log(JSON.stringify({
  status: "PASS",
  recomputedExpensiveRungs: [
    {activeModes: 6, ratio: 0.01, cutoff: 8, gap: sixMode.gap},
    {activeModes: 8, ratio: 0.01, cutoff: 6, gap: eightMode.gap}
  ],
  maximumObservedRelativeModeCountChange: Math.max(...record.scans.flatMap((scan) =>
    Object.values(scan.relativeModeCountChanges).map(Math.abs))),
  full24ModeGapEstablished: false,
  epistemicStatus: record.epistemicStatus
}));
