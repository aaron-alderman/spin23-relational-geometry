import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-charge-to-picard-functor-classification.json"), "utf8"));

assert.equal(data.documentId, 1470);
const s = data.sterileSlice;
assert.equal(s.uniqueK * s.selectedCharge, s.requiredSelectedDegree);
assert.equal(Math.abs(s.uniqueK * s.complementCharge), s.requiredComplementDegree);
assert.equal(s.uniqueK, -1);
assert.equal(s.alignmentExists, true);
assert.equal(s.causalGenerationClaim, false);

const charges = Object.values(data.fullSelectedChargeTable);
const target = data.requiredUniversalSelectedDegree;
const candidates = [];
for (let k = -12; k <= 12; k += 1) {
  if (charges.every((q) => k * q === target)) candidates.push(k);
}
assert.deepEqual(candidates, data.integerKSolutionsForFullTable);
assert.deepEqual(candidates, []);
assert.ok(charges.includes(0));
assert.ok(charges.includes(1) && charges.includes(-1));
assert.equal(data.smallestRepair.derivedFromCurrentFureyOrGaugeData, false);
assert.equal(data.verdict.sterileDictionaryExact, true);
assert.equal(data.verdict.fullA6BundleSplitDerived, false);
assert.equal(data.verdict.a6Passed, false);
assert.equal(data.verdict.physicalAdmissionChanged, false);

console.log("PASS 1470: d(q)=-q uniquely maps the sterile (-3,0) charges to (O(3),O(0)), but no tensor-compatible charge-to-degree map sends the full selected Standard Model charge table uniformly to O(3).");
