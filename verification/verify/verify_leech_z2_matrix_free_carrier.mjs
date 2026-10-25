import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-z2-matrix-free-carrier-v1.json"), "utf8"));
const source = fs.readFileSync(path.join(root,
  "scripts/smoke-leech-z2-block-dmrg.py"), "utf8");

assert.equal(record.schemaVersion, "leech-z2-matrix-free-carrier-v1");
assert.equal(record.implementation.effectiveMatrixMaterialized, false);
assert.equal(record.matrixFreeExactControls.length, 3);
const errors = record.matrixFreeExactControls.flatMap(x =>
  [x.evenAbsoluteError, x.oddAbsoluteError]);
assert.ok(Math.max(...errors) < 8e-12);
assert.ok(Math.max(...record.matrixFreeExactControls.map(x => x.maximumLocalResidual)) < 1.2e-10);

const c1 = record.fullCarrierCutoffOne;
assert.ok(Math.abs(c1.oddEnergy - c1.evenEnergy - c1.gap) < 1e-14);
assert.ok(Math.abs(c1.gapShiftFromMaterializedIterative) < 1.4e-8);
assert.equal(c1.effectiveMatrixMaterialized, false);

const c2 = record.fullCarrierCutoffTwo;
for (const point of [c2.bond24, c2.bond32]) {
  assert.ok(Math.abs(point.oddEnergy - point.evenEnergy - point.gap) < 1e-14);
}
assert.ok(c2.bond24To32.evenEnergyShift < 0 && c2.bond24To32.oddEnergyShift < 0);
assert.ok(c2.bond24To32.relativeGapShift < 9.6e-4);
assert.equal(c2.effectiveMatrixMaterialized, false);
assert.ok(c2.maximumSectorDimension >= 12832);
assert.ok(Math.abs(c2.bond32.finalFixedBondGapShift / c2.bond32.gap) < 7.2e-5);
assert.ok(record.penaltyComparatorRetyping.matrixFreeBond32Difference < 0);

for (const token of ["tn-matrix-free", "qtn.TensorNetwork",
  "charged.reshape(dims)", ".contract(all)",
  "local_eig_ham_dense\"] = eigensolver != \"tn-matrix-free\""]) {
  assert.ok(source.includes(token), `missing matrix-free token: ${token}`);
}
assert.ok(record.boundary.includes("does not certify the gap"));

console.log(JSON.stringify({status:"PASS", exactControls:3,
  maximumExactError:Math.max(...errors), cutoffOneGap:c1.gap,
  cutoffTwoBonds:[24,32], cutoffTwoGaps:[c2.bond24.gap,c2.bond32.gap],
  maximumSectorDimension:c2.maximumSectorDimension,
  effectiveMatrixMaterialized:false, gapCertified:false,
  epistemicStatus:record.epistemicStatus}));
