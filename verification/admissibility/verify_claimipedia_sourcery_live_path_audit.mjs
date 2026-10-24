import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const audit = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/claimipedia-sourcery-live-path-audit-v1.json"), "utf8"));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(audit.protocol === "claimipedia-sourcery-live-path-audit/1", "unexpected audit protocol");
check(audit.families.length === 4, "expected four D02 path families");
check(audit.totals.admittedPositivePaths === 4, "expected four admitted positive paths");
check(audit.totals.namedPositiveSteps === 16 && audit.totals.distinctNamedPositiveSteps === 16, "expected sixteen distinct named steps");
check(audit.totals.zeroCandidateNegativeQueries === 14 && audit.totals.negativeCandidates === 0, "negative-query rejection boundary changed");
check(audit.totals.invalidRuleFixturesRetained === 15 && audit.totals.distinctInvalidRuleFixtures === 15, "invalid-rule fixture count changed");
check(JSON.stringify(audit.protocolBoundary.activeResultProtocols) === JSON.stringify(["scientific-derivation-composition/1"]), "active protocol changed");
check(audit.protocolBoundary.stricterLocalProtocol === "scientific-derivation-composition/common-algebra-2", "local strict protocol changed");
check(audit.protocolBoundary.stricterDimensionChecksPresent.length === 5, "strict dimension checks missing");
check(JSON.stringify(audit.protocolBoundary.runnersSupplyingAllRequiredDimensionFields) === JSON.stringify(["local", "operator", "rank-change", "boundary"]), "four-family dimension migration missing or scope drifted");
check(Object.values(audit.decision).filter(value => value === undefined).length === 0, "decision field missing");
check(audit.decision.liveV1SourceNativeAdmissionClosed === true, "live v1 admission must pass");
check(audit.decision.sourceNativeAssumptionLossEvidenceLedgersRetained === true, "ALE ledgers must be retained");
check(audit.decision.authorityFirewallRetained === true, "authority firewall must remain closed");
check(audit.decision.heldOutNegativeControlsRetained === true, "negative controls must remain retained");
check(audit.decision.wave72GraphOnlyNoGoUnchanged === true, "graph-only no-go must remain unchanged");
check(audit.decision.primaryCommonAlgebra2DimensionMigrationClosed === true, "primary common-algebra-2 migration must be closed");
check(audit.decision.allFourCommonAlgebra2RecordMigrationsClosed === true, "four-family common-algebra-2 migration must be closed");
check(audit.decision.commonAlgebra2DimensionMigrationOpen === false, "record-level dimension migration must be closed");
for (const key of ["jordanProductExtracted", "physicalOperatorAssignmentExtracted", "detectorRecordPredicted", "ot026Closed", "ot027Closed"]) {
  check(audit.decision[key] === false, `${key} was overclaimed`);
}
for (const family of audit.families) {
  check(fs.existsSync(path.join(root, family.review)), `${family.id} review missing`);
  check(fs.existsSync(path.join(root, family.runner)), `${family.id} runner missing`);
  check(family.passed && family.positiveCandidateCount === 1 && family.positiveSteps.length === 4, `${family.id} positive path changed`);
  check(family.candidateLedger.assumptionCount > 0 && family.candidateLedger.lossCount > 0 && family.candidateLedger.evidenceReferenceCount > 0, `${family.id} ledger incomplete`);
}

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", totals: audit.totals, conclusion: audit.implication }, null, 2));
