import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const result = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-admissibility-assessment-v0.json"), "utf8"));

assert.equal(result.protocol, "prophetic-admissibility/programme-assessment/0");
assert.equal(result.programmeOperational, true);
assert.equal(result.evidenceState.primaryPredictiveCases, 0);
assert.equal(result.rankings.retrospectiveControlRanking.winner, "skeptical-terminal-null");
assert.equal(result.rankings.positivePredictiveHermeneuticRanking.identified, false);
assert.equal(result.frozenRankingApplication.status, "partial-adverse-only");
assert.equal(result.completionState.schemaAndExecutionComplete, true);
assert.equal(result.completionState.positiveValidationComplete, false);

const newton = result.frozenRankingApplication.majorCandidates.find((entry) => entry.id === "newton-day-year-2060");
assert.equal(newton.temporalClaim.kind, "lower-bound");
assert.equal(newton.temporalClaim.earliestYear, 2060);
assert.equal(newton.temporalClaim.latestYear, null);
assert.equal(newton.predictiveWeight, null);

console.log(JSON.stringify({
  result: "pass",
  protocol: result.protocol,
  programmeOperational: result.programmeOperational,
  predictiveRankingIdentified: result.rankings.positivePredictiveHermeneuticRanking.identified,
  frozenRankingApplication: result.frozenRankingApplication.status,
  newton2060: result.answer.newton2060
}, null, 2));
