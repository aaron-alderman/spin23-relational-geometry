import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "evidence/data/spin23-a6-o3-sterile-majorana-bundle-obstruction.json"),
    "utf8",
  ),
);

const h0 = (n) => Math.max(n + 1, 0);
const h1 = (n) => Math.max(-n - 1, 0);

assert.equal(data.documentId, 1466);
assert.equal(data.sterileBilinearDegree, 2 * data.selectedBundleDegree);
assert.equal(data.requiredMajoranaCoefficientDegree, -data.sterileBilinearDegree);
assert.equal(h0(data.requiredMajoranaCoefficientDegree), data.cohomology.h0Ominus6);
assert.equal(h1(data.requiredMajoranaCoefficientDegree), data.cohomology.h1Ominus6);
assert.equal(data.cohomology.h0Ominus6, 0);
assert.equal(data.cohomology.h1Ominus6, 5);
assert.equal(data.smoothSection.signedGenericZeroIndex, data.requiredMajoranaCoefficientDegree);
assert.equal(data.smoothSection.absoluteDefectCharge, Math.abs(data.requiredMajoranaCoefficientDegree));

const mixingDegree = data.spectatorMixing.spectatorDegree - data.spectatorMixing.selectedDegree;
assert.equal(mixingDegree, data.spectatorMixing.requiredCoefficientDegree);
assert.equal(h0(mixingDegree), data.spectatorMixing.h0Ominus3);
assert.equal(data.spectatorMixing.h0Ominus3, 0);

assert.equal(data.cohomology.nonzeroRegularHolomorphicCoefficientExists, false);
assert.equal(data.smoothSection.nowhereVanishingExists, false);
assert.equal(data.smoothSection.requiresNewFieldOrBackgroundSector, true);
assert.equal(data.reduction.majoranaMatrixFixedByTopology, false);
assert.equal(data.reduction.majoranaRankGuaranteedByTopology, false);
assert.equal(data.reduction.phaseReferenceSelectedByIndex, false);
assert.equal(data.verdict.holomorphicMajoranaRouteRuledOut, true);
assert.equal(data.verdict.smoothDefectBearingRouteConditionallyPossible, true);
assert.equal(data.verdict.declaredFieldsSupplyRepair, false);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1466: O(3)^2 requires O(-6), which has no regular holomorphic section; any smooth repair carries a six-unit defect ledger and is a new sector.",
);
