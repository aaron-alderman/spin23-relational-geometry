import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-joined-cell-mpo-certificate-architecture-v1.json"), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [path.join(root,
  "scripts/analyze-leech-joined-cell-mpo.mjs")], {encoding: "utf8"}));

assert.equal(record.schemaVersion, "leech-joined-cell-mpo-certificate-architecture-v1");
assert.equal(run.channels, 24);
assert.equal(run.exactMetric.nonzeroOffDiagonalPairs,
  record.exactMetric.nonzeroOffDiagonalPairsInInverse);
assert.equal(run.automatonMpo.exactBondDimensionUpperBound,
  record.exactMpo.automatonBondDimensionUpperBound);
assert.deepEqual(run.crossCutRanks, record.exactMpo.crossCutRanks);
assert.equal(run.maximumCrossCutRank, 12);
assert.equal(run.compressedQuadraticBondDimensionTarget, 14);
assert.deepEqual(run.exhaustiveChecks, record.denseReconstructionChecks);
assert.ok(run.exhaustiveChecks.every((check) => check.maximumMatrixElementError < 1e-14));
assert.ok(run.exhaustiveChecks.every((check) => check.maximumParityCommutatorElement === 0));
assert.ok(record.boundary.includes("No spectral gap is certified"));
assert.ok(record.certificateProtocol.some((step) => step.includes("lower enclosures")));

console.log(JSON.stringify({
  status: "PASS",
  channels: 24,
  exactMpoBondDimensionUpperBound: 26,
  maximumCrossCutRank: 12,
  denseReconstructionChecks: record.denseReconstructionChecks.length,
  joinedGapCertified: false,
  epistemicStatus: record.epistemicStatus
}));
