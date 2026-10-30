import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { sha256, stableStringify } from "../../tooling/search/belief_state.mjs";
import { assembleBlindedLongitudinalRun, createBlindedScorecard, finalizeLongitudinalPlan, signBlindedScorecard, verifyLongitudinalRun } from "../../tooling/search/longitudinal_evaluation.mjs";

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

test("preregistered opaque scorecards are signed before exact post-score unblinding", () => {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const secret = "42".repeat(32);
  const plan = finalizeLongitudinalPlan(template, {
    evaluatorIdentity: "independent-blind-fixture",
    evaluatorPublicKeyPem: publicKey.export({ type: "spki", format: "pem" }),
    selectionHost: "observatory-selection-fixture",
    blindingCommitmentSha256: sha256(secret),
  });
  const outcomes = plan.tasks.filter(task => task.phase === "evaluation").map((task, index) => {
    const family = sha256(`blind-family-${index}`);
    const arm = (name, answer) => ({
      contextReceiptSha256: sha256(`${name}-context-${index}`),
      answerReceiptSha256: sha256(`${name}-receipt-${index}`),
      evidenceSha256: sha256(`${name}-evidence-${index}`),
      evidenceFamilySha256: family,
      unsupportedCitations: 0,
      sourcePaths: [`corpus/${name}-${index}.md`],
      answerText: answer,
      answerSha256: sha256(answer),
    });
    return { taskId: task.id, baseline: arm("baseline", `baseline answer ${index}`), adaptive: arm("adaptive", `adaptive answer ${index}`) };
  });
  const draft = { protocol: "spin23-context-hub-longitudinal-answer-draft/1", planSha256: plan.planSha256, selectionHost: plan.selectionHost, corpusContentSha256: hash("c"), model: { name: "fixed-blind-fixture" }, outcomes };
  const scorecard = createBlindedScorecard(plan, draft, secret);
  assert.equal(JSON.stringify(scorecard).includes('"baseline"'), false);
  assert.equal(JSON.stringify(scorecard).includes('"adaptive"'), false);
  for (const item of scorecard.outcomes) for (const arm of item.arms) {
    arm.score = arm.answerText.startsWith("adaptive") ? 0.8 : 0.6;
    arm.notes = "Scored under an opaque arm label.";
  }
  const signed = signBlindedScorecard(plan, scorecard, privateKey.export({ type: "pkcs8", format: "pem" }));
  const run = assembleBlindedLongitudinalRun(plan, signed, secret, { safety: { rollbackRestored: true, freezeRefused: true, sourceDriftRefused: true } });
  const report = verifyLongitudinalRun(plan, run);
  assert.equal(report.passed, true);
  assert.equal(report.metrics.meanPairedDelta > 0, true);
  const tampered = structuredClone(run);
  tampered.blindedEvaluation.outcomes[0].arms[0].score = 1;
  assert.throws(() => verifyLongitudinalRun(plan, tampered), /signature/iu);
  assert.throws(() => assembleBlindedLongitudinalRun(plan, signed, "24".repeat(32), { safety: run.safety }), /commitment/iu);
});
