import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-joined-cell-z2-sector-compiler-v1.json"), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [path.join(root,
  "scripts/compile-leech-joined-cell-z2-sectors.mjs")], {encoding: "utf8"}));

assert.equal(record.schemaVersion, "leech-joined-cell-z2-sector-compiler-v1");
assert.equal(run.cutoffs.length, 8);
for (let index = 0; index < run.cutoffs.length; index += 1) {
  const actual = run.cutoffs[index];
  const frozen = record.cutoffs[index];
  for (const field of ["cutoff", "localDimension", "localEvenDimension",
    "localOddDimension", "globalEvenDimension", "globalOddDimension"]) {
    assert.equal(actual[field], frozen[field]);
  }
  assert.ok(actual.checks.orthogonalityError < 1e-14);
  assert.ok(actual.checks.parityDiagonalError < 1e-14);
  for (const field of ["chargeAnticommutator", "charge2Commutator",
    "shiftCommutator", "pairChargeCommutator"]) assert.equal(actual.checks[field], 0);
  const dimension = BigInt(actual.localDimension) ** 24n;
  assert.equal(BigInt(actual.globalEvenDimension) + BigInt(actual.globalOddDimension), dimension);
  assert.equal(BigInt(actual.globalEvenDimension) - BigInt(actual.globalOddDimension), 1n);
}
assert.equal(run.mpoVirtualCharges.openChargeChannels, 1);
assert.ok(record.boundary.includes("Wave 7.197"));
assert.ok(record.backendAssessment.nextImplementation.includes("matrix-free"));

console.log(JSON.stringify({
  status: "PASS",
  cutoffs: record.cutoffs.map(({cutoff}) => cutoff),
  exactLocalSelectionRules: true,
  mpoVirtualChargeCompiled: true,
  blockSparseDmrgExecutedInWave197: true,
  epistemicStatus: record.epistemicStatus
}));
