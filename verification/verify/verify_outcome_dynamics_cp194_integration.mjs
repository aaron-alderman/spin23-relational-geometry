import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const record = JSON.parse(await readFile(new URL("../../evidence/data/outcome-dynamics-cp194-integration.json", import.meta.url), "utf8"));

assert.equal(record.sourceCheckpoint, 194);
assert.equal(record.sourceAuditPassed, true);
assert.equal(record.method.activeElementFamily, "Q1(x,y) x Q2(z)");
assert.deepEqual(record.method.massFormulations, ["row-sum-lumped", "consistent"]);
assert.deepEqual(record.method.activeZNodes, [5, 7, 9]);
assert.equal(record.method.allOtherNumericalAndPhysicalInputsHeld, true);

const finalConsistent = record.consistentAdjacent.at(-1);
assert.equal(finalConsistent.fromActiveZNodes, 7);
assert.equal(finalConsistent.toActiveZNodes, 9);
assert.ok(finalConsistent.stressDirectionDifference < 0.02);
assert.ok(finalConsistent.chargeRelativeDifference < 0.01);
assert.ok(finalConsistent.opticalRelativeDifference < 0.01);
assert.ok(finalConsistent.generalizedDisplacementRelativeDifference < 0.01);

const finestMassSensitivity = record.massSensitivity.at(-1);
assert.equal(finestMassSensitivity.activeZNodes, 9);
assert.ok(finestMassSensitivity.stressDirectionDifference > 0.08);
assert.ok(finestMassSensitivity.chargeRelativeDifference > 0.69);
assert.ok(finestMassSensitivity.opticalRelativeDifference > 0.72);
assert.ok(finestMassSensitivity.generalizedDisplacementRelativeDifference > 0.64);

assert.equal(record.summary.consistentConverged, true);
assert.equal(record.summary.massFormulationsAgreeAtFinest, false);
assert.equal(record.summary.massRepresentationMaterialAtCurrentResolution, true);
assert.equal(record.summary.previousElementArtifactDiagnosisRetained, true);
assert.equal(record.summary.massGate, "open");
assert.equal(record.summary.nextNumericalGate, "consistent-mass-lateral-and-support-refinement");
assert.equal(record.summary.physicalAdmission, false);
assert.equal(record.summary.physicalEffectObserved, false);
assert.equal(record.validation.dedicatedNodeTestsPassed, 3);
assert.equal(record.validation.dedicatedNodeTestsFailed, 0);

for (const hash of Object.values(record.sourceHashesSha256)) assert.match(hash, /^[0-9a-f]{64}$/u);

const sourceRootArgument = process.argv[2];
let sourceHashesVerified = false;
if (sourceRootArgument) {
  for (const [relativePath, expectedHash] of Object.entries(record.sourceHashesSha256)) {
    const contents = await readFile(resolve(sourceRootArgument, relativePath));
    const actualHash = createHash("sha256").update(contents).digest("hex");
    assert.equal(actualHash, expectedHash, `source hash mismatch: ${relativePath}`);
  }
  sourceHashesVerified = true;
}

console.log(JSON.stringify({
  passed: true,
  checkpoint: record.sourceCheckpoint,
  consistentMaximumFinalObservableDifference: Math.max(
    finalConsistent.chargeRelativeDifference,
    finalConsistent.opticalRelativeDifference,
    finalConsistent.generalizedDisplacementRelativeDifference
  ),
  maximumFinestMassSensitivity: Math.max(
    finestMassSensitivity.chargeRelativeDifference,
    finestMassSensitivity.opticalRelativeDifference,
    finestMassSensitivity.generalizedDisplacementRelativeDifference
  ),
  massGate: record.summary.massGate,
  nextNumericalGate: record.summary.nextNumericalGate,
  physicalAdmission: record.summary.physicalAdmission,
  sourceHashesVerified
}));

