import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const evidence = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/claimipedia-d02-common-algebra2-family-migration-v1.json"), "utf8"));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(evidence.protocol === "claimipedia-d02-common-algebra2-family-migration/1", "unexpected protocol");
check(evidence.families.length === 4, "expected four families");
check(evidence.totals.admittedPositivePaths === 4 && evidence.totals.namedPositiveSteps === 16, "positive path totals changed");
check(evidence.totals.negativeQueries === 14 && evidence.totals.negativeCandidates === 0, "negative-query boundary changed");
check(evidence.totals.invalidRuleFixtures === 15, "invalid-rule total changed");
check(evidence.totals.dimensionRejectedPositiveTransformations === 0, "positive transformations were dimension rejected");
check(Object.values(evidence.dimensionConvention.siBaseExponentVector).every(value => value === 0), "record dimension convention changed");
check(evidence.dimensionConvention.physicalQuantityCalibrationClosed === false, "record dimensions were promoted to physical calibration");
for (const family of evidence.families) {
  check(family.resultProtocol === "scientific-derivation-composition/2", `${family.id} did not run v2`);
  check(family.positiveCandidateCount === 1 && family.positiveSteps.length === 4, `${family.id} positive path changed`);
  check(family.assumptionCount > 0 && family.lossCount > 0 && family.evidenceReferenceCount > 0, `${family.id} ALE ledger incomplete`);
  check(family.negativeCandidateCount === 0 && family.invalidRuleIds.length === family.expectedInvalidRuleCount, `${family.id} rejection boundary changed`);
  check(family.liveV1.passed && family.liveV1.sourceGraphMatches && family.liveV1.projectionOperation === "erase-dimension-metadata-for-legacy-host", `${family.id} live projection mismatch`);
  check(family.strictNegativeControls.missingDimensionRule.candidateCount === 0 && family.strictNegativeControls.missingDimensionRule.dimensionRuleRecognized === false, `${family.id} missing-rule mutation did not fail closed`);
  check(family.strictNegativeControls.invalidDimensionDelta.candidateCount === 0 && family.strictNegativeControls.invalidDimensionDelta.dimensionallyValid === false, `${family.id} invalid-delta mutation did not fail closed`);
  check(family.authority.proposalOnly && !family.authority.entails && !family.authority.empiricalAuthority && !family.authority.applicationAdmission, `${family.id} authority firewall changed`);
}
check(evidence.decision.allFourRecordLayerMigrationsClosed === true, "four-family migration not closed");
check(evidence.decision.allFourLiveV1ProjectionsRechecked === true, "live projections not all checked");
check(evidence.decision.commonAlgebra2DimensionMigrationOpen === false, "record-level migration still marked open");
for (const key of ["physicalResponseUnitsAssigned", "heldOutProductIdentityPredicted", "physicalOperatorAssignmentExtracted", "detectorRecordPredicted", "ot026Closed", "ot027Closed"]) check(evidence.decision[key] === false, `${key} was overclaimed`);

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", totals: evidence.totals, conclusion: evidence.implication }, null, 2));
