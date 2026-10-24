import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const evidence = JSON.parse(await readFile(resolve(root, "evidence/data/claimipedia-d02-physical-admittance-witness-v1.json"), "utf8"));

assert.equal(evidence.protocol, "claimipedia-d02-physical-admittance-witness/1");
assert.equal(evidence.decision.passed, true);
assert.deepEqual(evidence.composition.steps, ["apply-local-support-schur-theorem-to-calibrated-rc-network", "apply-calibrated-voltage-probe"]);
assert.equal(evidence.composition.dimensionRejectedTransformationCount, 0);
assert.equal(evidence.negativeControls.missingProbeCandidateCount, 0);
assert.equal(evidence.negativeControls.wrongVoltageDimensionCandidateCount, 0);
assert.equal(evidence.negativeControls.wrongVoltageDimensionRejected, true);
assert.ok(evidence.heldOutPrediction.schurAdmittanceS.re > 0);
assert.ok(evidence.heldOutPrediction.predictionErrorA < 1e-15);
assert.equal(evidence.decision.physicalResponseUnitsAssigned, true);
assert.equal(evidence.decision.portNormalizationDeclared, true);
assert.equal(evidence.decision.physicalOperatorAssignmentExtracted, true);
assert.equal(evidence.decision.computationallyHeldOutCurrentPredicted, true);
assert.equal(evidence.decision.independentlyMeasuredDetectorRecordPredicted, false);
assert.equal(evidence.decision.jordanProductExtracted, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);
assert.equal(evidence.decision.ot026Closed, false);
assert.equal(evidence.decision.ot027Closed, false);

console.log(JSON.stringify({ result: "pass", protocol: evidence.protocol, graphSha256: evidence.graphSha256, predictionErrorA: evidence.heldOutPrediction.predictionErrorA, boundary: "one calibrated RC operator witness; Jordan product, measured detector record and new physics remain open" }, null, 2));
