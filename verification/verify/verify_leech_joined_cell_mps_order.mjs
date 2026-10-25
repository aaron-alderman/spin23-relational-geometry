import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-joined-cell-mps-order-v1.json"), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [path.join(root,
  "scripts/optimize-leech-joined-cell-mps-order.mjs")], {encoding: "utf8"}));
const close = (first, second, tolerance = 1e-12) => assert.ok(
  Math.abs(first - second) < tolerance * Math.max(1, Math.abs(second)), `${first} != ${second}`);

assert.equal(record.schemaVersion, "leech-joined-cell-mps-order-v1");
assert.equal(run.optimizer.iterations, 80000);
assert.equal(run.optimizer.seedHex, "6d2b79f5");
assert.deepEqual(run.optimized.orderOneBased, record.optimized.orderOneBased);
for (const field of ["maximumCutEntropy", "sumCutEntropy",
  "harmonicSchmidtLowerBoundAtMaximumCut"]) {
  close(run.natural[field], record.natural[field]);
  close(run.optimized[field], record.optimized[field]);
}
for (const field of ["maximumCutEntropyFraction", "sumCutEntropyFraction",
  "maximumCutSchmidtProxyFactor"]) close(run.improvement[field], record.improvement[field]);
assert.ok(record.improvement.maximumCutEntropyFraction > 0.2);
assert.ok(record.improvement.maximumCutSchmidtProxyFactor > 2.5);
assert.ok(record.boundary.includes("not a nonlinear MPS convergence result"));

console.log(JSON.stringify({
  status: "PASS",
  channels: 24,
  maximumCutEntropyReduction: record.improvement.maximumCutEntropyFraction,
  SchmidtProxyReductionFactor: record.improvement.maximumCutSchmidtProxyFactor,
  joinedGapCertified: false,
  epistemicStatus: record.epistemicStatus
}));
