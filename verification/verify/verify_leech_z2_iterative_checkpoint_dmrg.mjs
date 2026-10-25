import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-z2-iterative-checkpoint-dmrg-v1.json"), "utf8"));
const source = fs.readFileSync(path.join(root,
  "scripts/smoke-leech-z2-block-dmrg.py"), "utf8");

assert.equal(record.schemaVersion, "leech-z2-iterative-checkpoint-dmrg-v1");
assert.equal(record.iterativeExactControls.length, 3);
const errors = record.iterativeExactControls.flatMap(control =>
  [control.evenAbsoluteError, control.oddAbsoluteError]);
assert.ok(Math.max(...errors) < 8e-12);
assert.ok(Math.max(...record.iterativeExactControls.map(x => x.maximumLocalResidual)) < 1.2e-10);
assert.equal(record.checkpointRoundTrip.freshProcessReload, true);
assert.equal(record.checkpointRoundTrip.blockSparseAfterReload, true);
assert.equal(record.checkpointRoundTrip.hamiltonianSignatureValidated, true);
assert.equal(record.checkpointRoundTrip.mismatchedOrderRejected, true);
assert.ok(Math.abs(record.fullCarrierDenseIterativeEquivalence.gapDifference) < 3e-12);

const [bond24, bond32] = record.checkpointedCutoffOneLadder;
for (const item of [bond24, bond32]) {
  assert.ok(Math.abs(item.oddEnergy - item.evenEnergy - item.gap) < 1e-14);
}
assert.ok(record.bond24To32.evenEnergyShift < 0);
assert.ok(record.bond24To32.oddEnergyShift < 0);
assert.ok(record.bond24To32.relativeGapShift < 1.6e-5);
assert.ok(Math.abs(bond32.fixedBondFinalGapShift) < 6e-8);

for (const token of ["scipy.sparse.linalg.eigsh", "LinearOperator",
  "save_checkpoint", "load_checkpoint", "--state-prefix-in",
  "--state-prefix-out", "--eigensolver"]) {
  assert.ok(source.includes(token), `missing engine token: ${token}`);
}
assert.ok(record.boundary.includes("not a fully matrix-free DMRG"));

console.log(JSON.stringify({status:"PASS", exactControls:3,
  maximumExactError:Math.max(...errors), denseIterativeGapDifference:
  record.fullCarrierDenseIterativeEquivalence.gapDifference,
  cutoffOneBonds:[bond24.bond,bond32.bond], cutoffOneGaps:[bond24.gap,bond32.gap],
  fullyMatrixFree:false, gapCertified:false, epistemicStatus:record.epistemicStatus}));
