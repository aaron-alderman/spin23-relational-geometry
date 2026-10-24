import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../../evidence/data/five-coordinate-three-edge-factorial-gate-v1.json", import.meta.url)));
assert.equal(data.protocol, "five-coordinate-three-edge-factorial-gate/1");
assert.deepEqual(data.targets, ["OT-047", "OT-048"]);
assert.equal(data.parent, "AZ-073");
assert.equal(data.factorialDesign.totalSamples, 27);
assert.equal(data.factorialDesign.fitSamples, 19);
assert.equal(data.factorialDesign.heldOutSamples, 8);
assert.equal(data.factorialDesign.recoveredCoefficients, 10);
assert.equal(data.factorialDesign.pairPlaneClosureResiduals, 9);
assert.deepEqual(data.syntheticCertificate.extracted.linear, data.syntheticCertificate.declaredParameters.linear);
assert.deepEqual(data.syntheticCertificate.extracted.kernel, data.syntheticCertificate.declaredParameters.kernel);
for (const residuals of Object.values(data.syntheticCertificate.pairResiduals)) {
  for (const value of Object.values(residuals)) assert(Math.abs(value) < 1e-12);
}
for (const value of Object.values(data.syntheticCertificate.heldOutResiduals)) assert(Math.abs(value) < 1e-12);
assert.deepEqual(data.syntheticCertificate.normalizedEdges, {
  "v_u:v_d": -0.5,
  "v_u:a_2": 0.5,
  "v_d:a_2": -0.5
});
assert.deepEqual(data.syntheticCertificate.positivity.pairPrincipalMinors, {
  "v_u:v_d": 27,
  "v_u:a_2": 108,
  "v_d:a_2": 48
});
assert.equal(data.syntheticCertificate.positivity.determinant, 288);
assert.equal(data.syntheticCertificate.positivity.positiveSemidefinitePass, true);
assert.equal(data.syntheticCertificate.signedCycle.nodeRephasingsChecked, 8);
assert.equal(data.syntheticCertificate.signedCycle.determinantInvariant, true);
assert.equal(data.syntheticCertificate.signedCycle.cycleInvariant, true);
assert.match(data.sourceNativeEvidence.fermionEdge.admittedStatement, /mixed c_t c_b terms/);
assert.match(data.oneFamilyCandidate.exactStatus, /not been published or computed here/);
assert.match(data.interpretation.nonClaim, /not evidence for/);
console.log("PASS five-coordinate three-edge factorial gate");
console.log(`fit_samples=${data.factorialDesign.fitSamples}`);
console.log(`held_out_samples=${data.factorialDesign.heldOutSamples}`);
console.log(`determinant=${data.syntheticCertificate.positivity.determinant}`);
