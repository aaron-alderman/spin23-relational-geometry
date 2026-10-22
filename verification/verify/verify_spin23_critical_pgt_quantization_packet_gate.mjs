#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-quantization-packet-gate-v1.json",
  import.meta.url,
), "utf8"));

const statuses = ["available", "partial", "missing"];
const derived = Object.fromEntries(statuses.map((status) => [
  status,
  evidence.requirements.filter((item) => item.status === status).length,
]));

assert.equal(evidence.requirements.length, evidence.counts.total);
for (const status of statuses) {
  assert.equal(derived[status], evidence.counts[status]);
}
assert.equal(
  evidence.counts.available + evidence.counts.partial + evidence.counts.missing,
  evidence.counts.total,
);
assert.deepEqual(evidence.counts, {
  available: 3,
  partial: 3,
  missing: 8,
  total: 14,
});

const byId = new Map(evidence.requirements.map((item) => [item.id, item]));
for (const blocker of [
  "irreducible-projector-dictionary",
  "background-split-gauge-fermion",
  "functional-measure-jacobians",
  "second-class-measure",
  "euclidean-contours",
  "renormalization-redundancy-convention",
]) {
  assert.equal(byId.get(blocker)?.status, "missing");
}
assert.equal(evidence.classicallyInvisibleChoices.length, 4);
assert.match(evidence.logicalConsequence, /not a unique off-shell Hessian/);
assert.match(evidence.reopenCondition, /fourteen quantization-packet classes/);

console.log("Spin(2,3) critical-PGT quantization-packet gate: PASS");
console.log("  requirements: 14");
console.log("  available: 3; partial: 3; missing: 8");
console.log("  result: no unique off-shell Hessian or beta vector is presently defined");
console.log("  next step: freeze and validate the packet before evaluating the loop");
