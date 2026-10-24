import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("evidence/data/alp-w-associated-shape-no-go-v1.json", "utf8"));

assert.equal(data.protocol, "alp-w-associated-shape-no-go/1");
assert.equal(data.packet, "AZ-114");
assert.deepEqual(data.targets, ["OT-047", "OT-048"]);
assert.equal(data.parent, "AZ-113");
assert.deepEqual(data.sourceConvention.sourceToAmplitude, [[-1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -0.5, 1]]);
assert.equal(data.sourceConvention.mapRank, 3);
assert.deepEqual(data.sourceConvention.blindDirection, [0, 0, 2, 1]);
assert.deepEqual(data.sourceConvention.blindImage, [0, 0, 0]);
assert.equal(data.pointwiseCertificate.measuredJacobianRank, 3);
assert.equal(data.pointwiseCertificate.sourceJacobianRank, 3);
assert.ok(data.pointwiseCertificate.sourceBlindResidual < 1e-12);
assert.ok(data.pointwiseCertificate.detectorBlindResidual < 1e-12);
assert.equal(data.quadraticCertificate.measuredKernelRank, 3);
assert.equal(data.quadraticCertificate.sourceKernelRank, 3);
assert.ok(data.quadraticCertificate.sourceKernelBlindResidual < 1e-12);
assert.equal(data.factorialCertificate.measuredSettings, 27);
assert.equal(data.factorialCertificate.allMeasuredSettingsReachable, true);
assert.equal(data.factorialCertificate.allShiftedRepresentativesEquivalent, true);
assert.equal(data.decision.az074StillIdentifiesThreeAmplitudeCoordinates, true);
assert.equal(data.decision.sameProcessDifferentialShapeSeparatesA2FromCww, false);
assert.equal(data.decision.polarizationOrBinningLiftsBlindDirection, false);
assert.equal(data.decision.detectorFoldingLiftsBlindDirection, false);
assert.equal(data.decision.dimensionFiveProcessClassNoGo, true);
assert.equal(data.decision.amplitudeComputed, false);
assert.equal(data.decision.newPhysicsEvidence, false);

console.log("verified W-associated same-process shape no-go");
