import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const evidence = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/claimipedia-d02-common-algebra2-migration-v1.json"), "utf8"));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.protocol === "claimipedia-d02-common-algebra2-migration/1", "unexpected evidence protocol");
check(evidence.exactRun.protocol === "scientific-derivation-composition/2", "common-algebra-2 result protocol missing");
check(evidence.exactRun.positiveCandidateCount === 1, "expected one local candidate");
check(evidence.exactRun.positiveSteps.length === 4, "expected four-step local path");
check(evidence.exactRun.validTransformationCount === 4, "expected four valid transformations");
check(evidence.exactRun.dimensionRejectedTransformationCount === 0, "exact graph has a dimension rejection");
check(evidence.exactRun.globalCandidateCount === 0, "global no-go unexpectedly opened");
check(evidence.exactRun.invalidRuleIds.length === 2, "invalid fixture count changed");
check(evidence.exactRun.assumptionCount > 0 && evidence.exactRun.lossCount > 0 && evidence.exactRun.evidenceReferenceCount > 0, "ALE ledger incomplete");
check(evidence.exactRun.authority.proposalOnly === true && evidence.exactRun.authority.entails === false && evidence.exactRun.authority.empiricalAuthority === false && evidence.exactRun.authority.applicationAdmission === false, "authority firewall changed");
check(Object.values(evidence.dimensionConvention.siBaseExponentVector).every(value => value === 0), "record dimension must be the SI zero vector");
check(evidence.dimensionConvention.physicalQuantityCalibrationClosed === false, "record typing was promoted to physical calibration");
check(evidence.strictNegativeControls.missingDimensionRule.candidateCount === 0 && evidence.strictNegativeControls.missingDimensionRule.dimensionRuleRecognized === false, "missing-rule control did not fail closed");
check(evidence.strictNegativeControls.invalidDimensionDelta.candidateCount === 0 && evidence.strictNegativeControls.invalidDimensionDelta.dimensionallyValid === false, "invalid-delta control did not fail closed");
check(evidence.decision.liveV1CompatibilityRechecked === true && evidence.decision.liveV1DimensionProjectionRequired === true, "live v1 dimension projection was not rechecked");
for (const key of ["otherD02FamiliesMigrated", "physicalResponseUnitsAssigned", "heldOutProductIdentityPredicted", "physicalOperatorAssignmentExtracted", "detectorRecordPredicted", "ot026Closed", "ot027Closed"]) check(evidence.decision[key] === false, `${key} was overclaimed`);

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", protocol: evidence.exactRun.protocol, steps: evidence.exactRun.positiveSteps, conclusion: evidence.implication }, null, 2));
