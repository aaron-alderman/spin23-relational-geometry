import assert from "node:assert/strict";
import test from "node:test";
import { runBeliefEvaluation } from "../../tooling/search/run_belief_evaluation.mjs";

test("belief evaluation passes learning, uncertainty, recovery and replay gates", () => {
  const report = runBeliefEvaluation({ root: new URL("../../", import.meta.url) });
  assert.equal(report.protocol, "spin23-corpus-belief-evaluation/1");
  assert.equal(report.passed, true, JSON.stringify(report.metrics));
  assert.ok(Object.values(report.gates).every(Boolean));
  assert.equal(report.authority.establishesScientificTruth, false);
});

