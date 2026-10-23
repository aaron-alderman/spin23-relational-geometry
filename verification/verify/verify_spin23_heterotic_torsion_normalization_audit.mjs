#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-heterotic-torsion-normalization-audit-v1.json", root,
), "utf8"));
const canonicalCoupling = (lambda10, ZH) => lambda10 / Math.sqrt(ZH);
for (const witness of evidence.normalizationWitnesses) {
  assert.equal(canonicalCoupling(witness.lambda10, witness.ZH), witness.lambdaCanonical);
}
assert.equal(evidence.normalizationWitnesses[0].lambda10, evidence.normalizationWitnesses[1].lambda10);
assert.notEqual(evidence.normalizationWitnesses[0].lambdaCanonical, evidence.normalizationWitnesses[1].lambdaCanonical);
assert.equal(evidence.fieldTypeAudit.canonicalIdentification, false);
assert.ok(evidence.fourDimensionalZeroMode.continuousInputs.length >= 5);
assert.ok(evidence.massAudit.requiredLift.length >= 4);

console.log("Spin(2,3) heterotic torsion normalization audit: PASS");
console.log("  fixed parent lambda gives moduli-dependent lambda/sqrt(Z_H) after canonical reduction");
console.log("  string H and independent PGT torsion require a new mixing map and mass-generating sector");
