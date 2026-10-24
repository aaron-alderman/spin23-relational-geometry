import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("evidence/data/alp-linear-ufo-intervention-rank-audit-v1.json", "utf8"));

assert.equal(data.protocol, "alp-linear-ufo-intervention-rank-audit/1");
assert.equal(data.packet, "AZ-113");
assert.deepEqual(data.targets, ["OT-047", "OT-048"]);
assert.equal(data.sources.archiveSha256, "d5c27f76bcf87d84cba09c4ca30d852c68eb18962cd9da148973d9deb7373a7b");
assert.deepEqual(data.export.alpExternalParameters, ["fa", "CGtil", "CWtil", "CBtil", "CaPhi"]);
assert.deepEqual(data.sourceDependencies.interventionMatrix, [[1, 0], [-1, 0], [0, 1]]);
assert.equal(data.sourceDependencies.interventionRank, 2);
assert.equal(data.sourceDependencies.reachableConstraint, "c_b = -c_t");
assert.equal(data.factorialCeiling.declaredThreeSourceSettings, 27);
assert.equal(data.factorialCeiling.reachableSettings, 9);
assert.equal(data.factorialCeiling.unreachableSettings, 18);
assert.equal(data.factorialCeiling.generalSymmetricKernelCoefficients, 6);
assert.equal(data.factorialCeiling.identifiableRestrictedCombinations, 3);
assert.equal(data.factorialCeiling.unidentifiedKernelDirections, 3);
assert.equal(data.decision.publishedUfoCanRunCaPhiCwSlice, true);
assert.equal(data.decision.publishedUfoCanRunIndependentCtCbCwTriangle, false);
assert.equal(data.decision.publishedUfoCanExecuteAz074Design, false);
assert.equal(data.decision.amplitudeComputed, false);
assert.equal(data.decision.physicsNoGoEstablished, false);
assert.equal(data.decision.modelExtensionRequired, true);
assert.equal(data.implementationContract.length, 6);

console.log("verified ALP linear UFO intervention-rank boundary");
