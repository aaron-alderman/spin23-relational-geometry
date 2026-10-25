import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-one-quantum-quartic-mixing-v1.json"
), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "../../scripts/analyze-leech-coupled-anharmonicity.mjs")
], {encoding: "utf8", maxBuffer: 2 ** 22}));

assert.equal(record.schemaVersion, "leech-one-quantum-quartic-mixing-v1");
assert.equal(record.scans.length, run.scans.length);
const close = (first, second, tolerance = 3e-15) =>
  assert.ok(Math.abs(first - second) < tolerance, `${first} != ${second}`);
for (let scanIndex = 0; scanIndex < record.scans.length; scanIndex += 1) {
  const frozen = record.scans[scanIndex];
  const actual = run.scans[scanIndex];
  assert.equal(frozen.chargingToCosineRatio, actual.chargingToCosineRatio);
  close(frozen.maximumAbsoluteOffDiagonalMixing,
    actual.maximumAbsoluteOffDiagonalTransitionMixing);
  assert.deepEqual(frozen.closestHarmonicPair.indicesAscendingFrequency, [
    actual.closestHarmonicPair.lowerIndexAscendingFrequency,
    actual.closestHarmonicPair.upperIndexAscendingFrequency
  ]);
  close(frozen.closestHarmonicPair.separation, actual.closestHarmonicPair.separation);
  close(frozen.closestHarmonicPair.mixing, actual.closestHarmonicPair.offDiagonalQuarticMixing);
  assert.deepEqual(frozen.strongestMixingPair.indicesAscendingFrequency, [
    actual.strongestMixingPair.lowerIndexAscendingFrequency,
    actual.strongestMixingPair.upperIndexAscendingFrequency
  ]);
  close(frozen.strongestMixingPair.separation, actual.strongestMixingPair.harmonicSeparation);
  close(frozen.strongestMixingPair.mixing, actual.strongestMixingPair.offDiagonalQuarticMixing);
  close(frozen.maximumAbsoluteMixedVersusDiagonalDifference,
    actual.maximumMixedVersusDiagonalOnlyTransitionDifference);
  close(frozen.maximumRelativeMixedVersusDiagonalDifference,
    actual.maximumRelativeMixedVersusDiagonalOnlyTransitionDifference);
  assert.equal(frozen.mixedTransitionsAscending.length, 24);
  for (let index = 0; index < 24; index += 1) close(
    frozen.mixedTransitionsAscending[index], actual.mixedOneQuantumTransitionsAscending[index]
  );
}
assert.ok(record.scans.at(-1).maximumRelativeMixedVersusDiagonalDifference < 0.000404);
assert.ok(record.boundary.includes("not a systematic second-order calculation"));
assert.ok(record.boundary.includes("not the exact nonlinear spectrum"));

console.log(JSON.stringify({
  status: "PASS",
  modes: 24,
  scans: record.scans.map((scan) => ({
    chargingToCosineRatio: scan.chargingToCosineRatio,
    maximumOffDiagonalMixing: scan.maximumAbsoluteOffDiagonalMixing,
    maximumRelativeResummedDifference: scan.maximumRelativeMixedVersusDiagonalDifference
  })),
  closestPairIndices: record.scans[0].closestHarmonicPair.indicesAscendingFrequency,
  strongestMixingPairIndices: record.scans[0].strongestMixingPair.indicesAscendingFrequency,
  exactNonlinearSpectrumEstablished: false,
  epistemicStatus: record.epistemicStatus
}));
