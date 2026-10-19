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
  assert.equal(result.workbench.panes.rejectionReceipt.length, 4);
});

test("fails closed for a missing source and preserves proposal-only authority", async () => {
  await assert.rejects(() => compose({ graph: pilot.graph, query: { ...pilot.query, source: "missing" } }), /derivation-source-object-invalid/);
  const result = await compose();
  assert.ok(result.candidates.every(x => x.claimStatus === "derived-claim-proposal" && x.empiricalAuthority === false));
});
