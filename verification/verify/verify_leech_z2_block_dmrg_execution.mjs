import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-z2-block-dmrg-execution-v1.json"), "utf8"));
const source = fs.readFileSync(path.join(root,
  "scripts/smoke-leech-z2-block-dmrg.py"), "utf8");

assert.equal(record.schemaVersion, "leech-z2-block-dmrg-execution-v1");
assert.equal(record.heldOutExactValidations.length, 3);
const errors = record.heldOutExactValidations.flatMap(item =>
  Object.entries(item).filter(([key]) => key.includes("AbsoluteError")).map(([, value]) => value));
assert.ok(Math.max(...errors) < 8e-12);

const run = record.fullCarrierRun;
assert.equal(run.sites, 24);
assert.equal(run.cutoff, 1);
assert.equal(run.blockMpo, true);
assert.equal(run.blockSparseMps, true);
assert.ok(Math.abs((run.oddEnergy - run.evenEnergy) - run.gap) < 1e-14);

const comparator = record.independentPenaltyComparator;
assert.ok(Math.abs((comparator.gap + comparator.gapDifference) - run.gap) < 1e-14);
assert.ok(Math.abs(comparator.gapDifference) < 2e-4);
assert.ok(comparator.relativeGapDifference < 2.6e-4);

for (const token of ["class Z2DMRG2", "sr.Z2Array.from_dense",
  "sr.MPS_abelian_rand", "isblocksparse", "--skip-exact", "--order"]) {
  assert.ok(source.includes(token), `missing implementation token: ${token}`);
}
assert.ok(record.boundary.includes("neither a certified spectral enclosure"));

console.log(JSON.stringify({
  status: "PASS",
  exactControls: record.heldOutExactValidations.length,
  maximumExactControlError: Math.max(...errors),
  fullCarrierGap: run.gap,
  relativePenaltyComparatorDifference: comparator.relativeGapDifference,
  epistemicStatus: record.epistemicStatus
}));
