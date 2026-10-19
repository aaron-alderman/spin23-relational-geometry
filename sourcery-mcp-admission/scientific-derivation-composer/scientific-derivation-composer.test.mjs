import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { executeProcess } from "file:///C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/2026-10-17-generated-view-materializer-v8r3/surface-async-process.mjs";

const model = JSON.parse(await readFile(new URL("./scientific-derivation-process.json", import.meta.url), "utf8"));
const pilot = JSON.parse(await readFile(new URL("./standard-model-stress-pilot.json", import.meta.url), "utf8"));

async function compose(request = { graph: pilot.graph, query: pilot.query }) {
  const env = await executeProcess(model.program, { model, request: structuredClone(request) }, { compute: {}, ports: {} });
  return env.result;
}

test("finds both bounded Standard Model stress-to-spectrum paths", async () => {
  const result = await compose();
  assert.equal(result.candidates.length, 2);
  assert.deepEqual(result.candidates.map(x => x.steps.at(-1)).sort(), ["canonical-spectral-discontinuity", "rotated-spectral-discontinuity"]);
  assert.ok(result.candidates.every(x => x.losses.includes("subtraction-polynomial information")));
  assert.equal(result.receipt.entails, false);
  assert.equal(result.receipt.applicationAdmission, false);
  assert.equal(result.receipt.dimensionGate, "required-si-base-exponent-delta");
  assert.equal(result.receipt.dimensionRejectedTransformationCount, 1);
  assert.equal(result.workbench.protocol, "claimipedia-scientific-derivation-workbench/1");
  assert.equal(result.workbench.mode, "read-only-proposal-review");
  assert.equal(result.workbench.panes.candidatePaths.length, 2);
  assert.equal(result.workbench.panes.assumptionLossLedger.length, 2);
  assert.equal(result.workbench.reviewHandoff.claimipediaStage, "Triage");
  assert.equal(result.workbench.reviewHandoff.automaticCorpusAdmission, false);
});

test("retains counterexamples and rejects rank, contact and analogy violations", async () => {
  const result = await compose();
  const byId = new Map(result.invalidRules.map(x => [x.rule.id, x]));
  assert.equal(byId.get("counterexample-rank-mismatch").fromSignatureMatches, false);
  assert.equal(byId.get("counterexample-contact-unsafe").contactSafe, false);
  assert.equal(byId.get("counterexample-analogy-firewall").notAnalogy, false);
  assert.equal(byId.get("counterexample-undeclared-regime-order-cp").fromSignatureMatches, false);
  assert.equal(byId.get("counterexample-dimensionally-invalid").fromSignatureMatches, true);
  assert.equal(byId.get("counterexample-dimensionally-invalid").fromDimensionMatches, true);
  assert.equal(byId.get("counterexample-dimensionally-invalid").toDimensionMatches, true);
  assert.equal(byId.get("counterexample-dimensionally-invalid").dimensionRuleRecognized, true);
  assert.equal(byId.get("counterexample-dimensionally-invalid").dimensionallyValid, false);
  assert.equal(result.workbench.panes.rejectionReceipt.length, 5);
});

test("fails closed when a path edge omits its dimensional rule", async () => {
  const graph = structuredClone(pilot.graph);
  const metricVariation = graph.transformations.find(x => x.id === "metric-variation");
  delete metricVariation.dimensionRule;
  const result = await compose({ graph, query: pilot.query });
  const rejected = result.invalidRules.find(x => x.rule.id === "metric-variation");
  assert.equal(rejected.dimensionRuleRecognized, false);
  assert.equal(result.receipt.dimensionRejectedTransformationCount, 1);
  assert.equal(result.candidates.length, 0);
  assert.equal(result.receipt.proposalOnly, true);
  assert.equal(result.receipt.entails, false);
});

test("rejects a dimension delta that does not reach the declared target units", async () => {
  const graph = structuredClone(pilot.graph);
  const metricVariation = graph.transformations.find(x => x.id === "metric-variation");
  metricVariation.dimensionDelta.length = -2;
  const result = await compose({ graph, query: pilot.query });
  const rejected = result.invalidRules.find(x => x.rule.id === "metric-variation");
  assert.equal(rejected.fromDimensionMatches, true);
  assert.equal(rejected.toDimensionMatches, true);
  assert.equal(rejected.dimensionallyValid, false);
  assert.equal(result.receipt.dimensionRejectedTransformationCount, 2);
  assert.equal(result.candidates.length, 0);
});

test("requires nonzero dimension changes to be declared", async () => {
  const graph = structuredClone(pilot.graph);
  const metricVariation = graph.transformations.find(x => x.id === "metric-variation");
  metricVariation.changes = metricVariation.changes.filter(x => x !== "dimension");
  const result = await compose({ graph, query: pilot.query });
  const rejected = result.invalidRules.find(x => x.rule.id === "metric-variation");
  assert.equal(rejected.dimensionallyValid, true);
  assert.equal(rejected.dimensionChangeDeclared, false);
  assert.equal(result.candidates.length, 0);
});

test("fails closed for a missing source and preserves proposal-only authority", async () => {
  await assert.rejects(() => compose({ graph: pilot.graph, query: { ...pilot.query, source: "missing" } }), /derivation-source-object-invalid/);
  const result = await compose();
  assert.ok(result.candidates.every(x => x.claimStatus === "derived-claim-proposal" && x.empiricalAuthority === false));
});
