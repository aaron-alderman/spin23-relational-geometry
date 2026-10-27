import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { sha256, stableStringify } from "../../tooling/search/belief_state.mjs";
import { finalizeLongitudinalPlan, verifyLongitudinalRun } from "../../tooling/search/longitudinal_evaluation.mjs";

const template = JSON.parse(readFileSync(new URL("../../tooling/search/longitudinal_evaluation_template_v1.json", import.meta.url), "utf8"));
const hash = character => character.repeat(64);

function signedFixture({ selfEvaluate = false, badSignature = false } = {}) {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" });
  const plan = finalizeLongitudinalPlan(template, { evaluatorIdentity: "independent-fixture", evaluatorPublicKeyPem: publicKeyPem });
  const outcomes = plan.tasks.filter(task => task.phase === "evaluation").map((task, index) => ({
    taskId: task.id,
    baseline: { contextReceiptSha256: hash("a"), answerReceiptSha256: sha256(`baseline-${index}`), evidenceSha256: sha256(`baseline-evidence-${index}`), evidenceFamilySha256: sha256(`family-${index}`), score: 0.6, unsupportedCitations: 0, sourcePaths: [`corpus/baseline-${index}.md`] },
    adaptive: { contextReceiptSha256: hash("b"), answerReceiptSha256: sha256(`adaptive-${index}`), evidenceSha256: sha256(`adaptive-evidence-${index}`), evidenceFamilySha256: sha256(`family-${index}`), score: 0.75, unsupportedCitations: 0, sourcePaths: [`corpus/adaptive-${index % 3}.md`] },
  }));
  const payload = { protocol: "spin23-context-hub-longitudinal-run/1", planSha256: plan.planSha256, corpusContentSha256: hash("c"), selectionHost: selfEvaluate ? "independent-fixture" : "observatory-fixture", evaluator: "independent-fixture", model: { name: "fixed-fixture" }, outcomes, safety: { rollbackRestored: true, freezeRefused: true, sourceDriftRefused: true }, authority: { corpusPromotion: false, changesTruthStatus: false, modelWeightTraining: false } };
  const signatureBase64 = sign(null, Buffer.from(stableStringify(payload)), privateKey).toString("base64");
  return { plan, privateKey, run: { ...payload, evaluatorSignature: { algorithm: "Ed25519", signatureBase64: badSignature ? Buffer.from("bad").toString("base64") : signatureBase64 } } };
}

test("signed independent paired outcomes produce the complete longitudinal safety and utility report", () => {
  const { plan, run } = signedFixture();
  const report = verifyLongitudinalRun(plan, run);
  assert.equal(report.passed, true);
  assert.equal(report.metrics.evaluationTasks, 6);
  assert.ok(report.metrics.meanPairedDelta >= 0.02);
  assert.equal(report.metrics.independentEvidenceFamilies, 6);
  assert.ok(Object.values(report.gates).every(Boolean));
  assert.equal(report.authority.scientificTruthEstablished, false);
});

test("the verifier refuses self-evaluation, signature substitution and evidence-family multiplication", () => {
  const self = signedFixture({ selfEvaluate: true });
  assert.throws(() => verifyLongitudinalRun(self.plan, self.run), /independent/iu);
  const bad = signedFixture({ badSignature: true });
  assert.throws(() => verifyLongitudinalRun(bad.plan, bad.run), /signature/iu);
  const duplicate = signedFixture();
  duplicate.run.outcomes[1].baseline.evidenceFamilySha256 = duplicate.run.outcomes[0].baseline.evidenceFamilySha256;
  duplicate.run.outcomes[1].adaptive.evidenceFamilySha256 = duplicate.run.outcomes[0].baseline.evidenceFamilySha256;
  const { evaluatorSignature, ...duplicatePayload } = duplicate.run;
  duplicate.run.evaluatorSignature.signatureBase64 = sign(null, Buffer.from(stableStringify(duplicatePayload)), duplicate.privateKey).toString("base64");
  assert.throws(() => verifyLongitudinalRun(duplicate.plan, duplicate.run), /reused across tasks/iu);
});
