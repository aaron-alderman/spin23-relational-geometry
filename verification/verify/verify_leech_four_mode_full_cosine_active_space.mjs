import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-four-mode-full-cosine-active-space-v1.json"
), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "../../scripts/analyze-leech-four-mode-cosine-active-space.mjs")
], {encoding: "utf8", maxBuffer: 2 ** 22}));
const mixing = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-one-quantum-quartic-mixing-v1.json"
), "utf8"));

assert.equal(record.schemaVersion, "leech-four-mode-full-cosine-active-space-v1");
assert.equal(run.scans.length, record.scans.length);
const close = (first, second, tolerance = 3e-14) =>
  assert.ok(Math.abs(first - second) < tolerance * Math.max(1, Math.abs(second)), `${first} != ${second}`);
for (let scanIndex = 0; scanIndex < record.scans.length; scanIndex += 1) {
  const frozen = record.scans[scanIndex];
  const actual = run.scans[scanIndex];
  assert.equal(frozen.chargingToCosineRatio, actual.chargingToCosineRatio);
  assert.equal(frozen.rungs.length, actual.rungs.length);
  for (let rungIndex = 0; rungIndex < frozen.rungs.length; rungIndex += 1) {
    const expected = frozen.rungs[rungIndex];
    const observed = actual.rungs[rungIndex];
    assert.equal(expected.totalExcitationCutoff, observed.totalExcitationCutoff);
    assert.equal(expected.evenDimension, observed.evenDimension);
    assert.equal(expected.oddDimension, observed.oddDimension);
    assert.equal(expected.firstExcitationParity, "odd");
    assert.equal(observed.firstExcitationParity, "odd");
    close(expected.groundEnergy, observed.groundEnergy);
    close(expected.gap, observed.gap);
    close(expected.maximumRitzResidual, observed.maximumReportedRitzResidual);
  }
  const penultimate = actual.rungs.at(-2).gap;
  const final = actual.rungs.at(-1).gap;
  const relativeCutoffChange = Math.abs(final - penultimate) / final;
  close(frozen.cutoff6To8RelativeGapChange, relativeCutoffChange);
  const mixingScan = mixing.scans.find((entry) =>
    entry.chargingToCosineRatio === frozen.chargingToCosineRatio);
  const quartic = mixingScan.mixedTransitionsAscending[0];
  assert.equal(frozen.projectedQuarticBlockSoftestTransition, quartic);
  close(frozen.fullCosineGapRelativeToProjectedQuarticBlock, (final - quartic) / quartic);
}
assert.ok(record.boundary.includes("not the full 24-mode compact spectrum"));
assert.ok(record.boundary.includes("does not prove active-mode-count convergence"));

console.log(JSON.stringify({
  status: "PASS",
  activeModes: 4,
  fullCosine: true,
  scans: record.scans.map((scan) => ({
    chargingToCosineRatio: scan.chargingToCosineRatio,
    convergedGap: scan.rungs.at(-1).gap,
    cutoff6To8RelativeChange: scan.cutoff6To8RelativeGapChange,
    versusProjectedQuarticBlock: scan.fullCosineGapRelativeToProjectedQuarticBlock
  })),
  full24ModeGapEstablished: false,
  epistemicStatus: record.epistemicStatus
}));
