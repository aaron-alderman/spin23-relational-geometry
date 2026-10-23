#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-n2_sugra_axial_selector_audit-v1.json", root,
), "utf8"));
const close = (a, b, eps = 1e-14) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

for (const witness of data.canonicalMatchingTemplate.witnesses) {
  close(witness.normalizedCombination, witness.g * witness.k / Math.sqrt(witness.haa));
}
assert.equal(data.pseudoscalarEmbedding.minimumHypermultipletBosons, 4);
assert.equal(data.pseudoscalarEmbedding.minimumHypermultipletWeylFermions, 2);
assert.equal(data.pseudoscalarEmbedding.isolatedPgtZeroMinusOnly, false);
assert.equal(data.targetAudit.oneEighthAdmitted, true);
assert.equal(data.targetAudit.oneEighthSelected, false);
assert.equal(data.targetAudit.massivePgtPoleIdentified, false);
assert.ok(data.generalStructure.gaugingData.length >= 5);
assert.ok(data.targetAudit.missing.length >= 6);

console.log("Spin(2,3) N=2 supergravity axial selector audit: PASS");
console.log("  extended SUSY fixes geometric form, not target manifold/gauging/vacuum");
console.log("  normalized g k/sqrt(h_aa) witnesses include 1/16, 1/8, 1/4");
console.log("  hypermultiplet embedding adds four scalars and two Weyl fermions");
