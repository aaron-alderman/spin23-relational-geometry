import { createHash, createPublicKey, createPrivateKey, sign as createSignature, verify as verifySignature } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { sha256, stableStringify } from "./belief_state.mjs";

const templateProtocol = "spin23-context-hub-longitudinal-template/1";
const planProtocol = "spin23-context-hub-longitudinal-plan/1";
const runProtocol = "spin23-context-hub-longitudinal-run/1";
const draftProtocol = "spin23-context-hub-longitudinal-answer-draft/1";
const scorecardProtocol = "spin23-context-hub-longitudinal-blinded-scorecard/1";
const hashPattern = /^[0-9a-f]{64}$/u;

const planPayload = plan => {
  const { planSha256, ...payload } = plan;
  return payload;
};
const runPayload = run => {
  const { evaluatorSignature, ...payload } = run;
  return payload;
};
const keyFingerprint = publicKeyPem => createHash("sha256").update(createPublicKey(publicKeyPem).export({ type: "spki", format: "der" })).digest("hex");
const scorecardPayload = scorecard => {
  const { evaluatorSignature, ...payload } = scorecard;
  return payload;
};
const armFields = arm => ({
  contextReceiptSha256: arm.contextReceiptSha256,
  answerReceiptSha256: arm.answerReceiptSha256,
  evidenceSha256: arm.evidenceSha256,
  evidenceFamilySha256: arm.evidenceFamilySha256,
  score: arm.score,
  unsupportedCitations: arm.unsupportedCitations,
  sourcePaths: arm.sourcePaths,
});
const baselineLabel = (secret, taskId) => parseInt(sha256(`${secret}\0${taskId}`).slice(0, 2), 16) % 2 === 0 ? "arm-a" : "arm-b";

function validateTasks(tasks) {
  if (!Array.isArray(tasks) || tasks.length < 8 || tasks.length > 100) throw new Error("longitudinal plan requires 8 to 100 tasks");
  const ids = new Set();
  const text = new Set();
  for (const [index, task] of tasks.entries()) {
    if (!task || typeof task !== "object" || !/^LT-[0-9]{3}$/u.test(task.id ?? "") || ids.has(task.id)) throw new Error(`longitudinal task ${index + 1} has an invalid or duplicate id`);
    if (task.phase !== "calibration" && task.phase !== "evaluation") throw new Error(`longitudinal task ${task.id} has an invalid phase`);
    if (typeof task.task !== "string" || task.task.length < 2 || task.task.length > 500 || text.has(task.task)) throw new Error(`longitudinal task ${task.id} has invalid or duplicate text`);
    ids.add(task.id);
    text.add(task.task);
  }
  if (tasks.filter(task => task.phase === "calibration").length < 4 || tasks.filter(task => task.phase === "evaluation").length < 4) throw new Error("longitudinal plan requires at least four calibration and four evaluation tasks");
}

export function finalizeLongitudinalPlan(template, { evaluatorIdentity, evaluatorPublicKeyPem, selectionHost, blindingCommitmentSha256 } = {}) {
  if (!template || template.protocol !== templateProtocol) throw new Error("longitudinal template protocol is invalid");
  validateTasks(template.tasks);
  if (typeof evaluatorIdentity !== "string" || evaluatorIdentity.trim().length < 2 || evaluatorIdentity.length > 200) throw new Error("independent evaluator identity is required");
  if (typeof evaluatorPublicKeyPem !== "string") throw new Error("independent evaluator public key is required");
  const payload = {
    protocol: planProtocol,
    status: "preregistered-before-context-generation",
    objective: template.objective,
    profile: template.profile,
    tasks: template.tasks,
    thresholds: template.thresholds,
    evaluator: { identity: evaluatorIdentity.trim(), publicKeySha256: keyFingerprint(evaluatorPublicKeyPem), publicKeyPem: evaluatorPublicKeyPem },
    ...(selectionHost || blindingCommitmentSha256 ? {
      selectionHost: typeof selectionHost === "string" && selectionHost.trim().length >= 2 && selectionHost.length <= 200 ? selectionHost.trim() : (() => { throw new Error("selection host identity is required for blinded evaluation"); })(),
      blinding: { algorithm: "sha256-secret-task-parity-v1", commitmentSha256: hashPattern.test(blindingCommitmentSha256 ?? "") ? blindingCommitmentSha256 : (() => { throw new Error("blinding commitment is required for blinded evaluation"); })() },
    } : {}),
    authority: template.authority,
  };
  return { ...payload, planSha256: sha256(payload) };
}

function validateDraftArm(arm, taskId, name) {
  validateArm({ ...arm, score: 0 }, taskId, name);
  if (typeof arm.answerText !== "string" || arm.answerText.length > 200000 || !hashPattern.test(arm.answerSha256 ?? "") || sha256(arm.answerText) !== arm.answerSha256) throw new Error(`${taskId} ${name} answer text identity is invalid`);
}

export function createBlindedScorecard(plan, draft, blindingSecret) {
  if (!plan?.blinding || !hashPattern.test(blindingSecret ?? "") || sha256(blindingSecret) !== plan.blinding.commitmentSha256) throw new Error("blinding secret does not match the preregistered commitment");
  if (!draft || draft.protocol !== draftProtocol || draft.planSha256 !== plan.planSha256 || draft.selectionHost !== plan.selectionHost || !hashPattern.test(draft.corpusContentSha256 ?? "")) throw new Error("longitudinal answer draft identity is invalid");
  const tasks = plan.tasks.filter(task => task.phase === "evaluation");
  if (!Array.isArray(draft.outcomes) || draft.outcomes.length !== tasks.length) throw new Error("longitudinal answer draft does not contain every evaluation task");
  const byId = new Map(draft.outcomes.map(item => [item.taskId, item]));
  if (byId.size !== tasks.length || tasks.some(task => !byId.has(task.id))) throw new Error("longitudinal answer draft task identities are invalid");
  const outcomes = tasks.map(task => {
    const item = byId.get(task.id);
    validateDraftArm(item.baseline, task.id, "baseline");
    validateDraftArm(item.adaptive, task.id, "adaptive");
    if (item.baseline.evidenceFamilySha256 !== item.adaptive.evidenceFamilySha256) throw new Error(`${task.id} draft arms must share one evaluation family`);
    const baseLabel = baselineLabel(blindingSecret, task.id);
    const label = arm => arm === "baseline" ? baseLabel : baseLabel === "arm-a" ? "arm-b" : "arm-a";
    return {
      taskId: task.id,
      task: task.task,
      arms: ["baseline", "adaptive"].map(name => ({ label: label(name), ...item[name], score: null, notes: null })).sort((left, right) => left.label.localeCompare(right.label)),
    };
  });
  return { protocol: scorecardProtocol, planSha256: plan.planSha256, evaluator: plan.evaluator.identity, selectionHost: plan.selectionHost, corpusContentSha256: draft.corpusContentSha256, model: draft.model, outcomes, authority: plan.authority };
}

function validateScoredScorecard(plan, scorecard, requireSignature = true) {
  if (!scorecard || scorecard.protocol !== scorecardProtocol || scorecard.planSha256 !== plan.planSha256 || scorecard.evaluator !== plan.evaluator.identity || scorecard.selectionHost !== plan.selectionHost || !hashPattern.test(scorecard.corpusContentSha256 ?? "")) throw new Error("blinded scorecard identity is invalid");
  const tasks = plan.tasks.filter(task => task.phase === "evaluation");
  const byId = new Map((scorecard.outcomes ?? []).map(item => [item.taskId, item]));
  if (byId.size !== tasks.length || tasks.some(task => !byId.has(task.id))) throw new Error("blinded scorecard task identities are invalid");
  for (const task of tasks) {
    const item = byId.get(task.id);
    if (!Array.isArray(item.arms) || item.arms.length !== 2 || new Set(item.arms.map(arm => arm.label)).size !== 2 || item.arms.some(arm => !["arm-a", "arm-b"].includes(arm.label))) throw new Error(`${task.id} blinded arm labels are invalid`);
    for (const arm of item.arms) {
      validateArm(arm, task.id, arm.label);
      if (typeof arm.answerText !== "string" || sha256(arm.answerText) !== arm.answerSha256) throw new Error(`${task.id} ${arm.label} answer text identity is invalid`);
      if (arm.notes !== null && arm.notes !== undefined && (typeof arm.notes !== "string" || arm.notes.length > 4000)) throw new Error(`${task.id} ${arm.label} notes are invalid`);
    }
  }
  if (requireSignature) {
    const signature = scorecard.evaluatorSignature;
    if (!signature || signature.algorithm !== "Ed25519" || typeof signature.signatureBase64 !== "string" || !verifySignature(null, Buffer.from(stableStringify(scorecardPayload(scorecard))), createPublicKey(plan.evaluator.publicKeyPem), Buffer.from(signature.signatureBase64, "base64"))) throw new Error("blinded evaluator signature is invalid");
  }
}

export function signBlindedScorecard(plan, scorecard, evaluatorPrivateKeyPem) {
  validateScoredScorecard(plan, scorecard, false);
  const signatureBase64 = createSignature(null, Buffer.from(stableStringify(scorecardPayload(scorecard))), createPrivateKey(evaluatorPrivateKeyPem)).toString("base64");
  return { ...scorecardPayload(scorecard), evaluatorSignature: { algorithm: "Ed25519", signatureBase64 } };
}

export function assembleBlindedLongitudinalRun(plan, signedScorecard, blindingSecret, { safety } = {}) {
  validateScoredScorecard(plan, signedScorecard, true);
  if (!hashPattern.test(blindingSecret ?? "") || sha256(blindingSecret) !== plan.blinding?.commitmentSha256) throw new Error("blinding secret does not match the preregistered commitment");
  const outcomes = plan.tasks.filter(task => task.phase === "evaluation").map(task => {
    const item = signedScorecard.outcomes.find(candidate => candidate.taskId === task.id);
    const base = baselineLabel(blindingSecret, task.id);
    const byLabel = new Map(item.arms.map(arm => [arm.label, arm]));
    return { taskId: task.id, baseline: armFields(byLabel.get(base)), adaptive: armFields(byLabel.get(base === "arm-a" ? "arm-b" : "arm-a")) };
  });
  return {
    protocol: runProtocol,
    planSha256: plan.planSha256,
    corpusContentSha256: signedScorecard.corpusContentSha256,
    selectionHost: plan.selectionHost,
    evaluator: plan.evaluator.identity,
    model: signedScorecard.model,
    outcomes,
    safety,
    authority: { corpusPromotion: false, changesTruthStatus: false, modelWeightTraining: false },
    blindingSecret,
    blindedEvaluation: signedScorecard,
  };
}

function validateArm(arm, taskId, name) {
  if (!arm || typeof arm !== "object" || !hashPattern.test(arm.contextReceiptSha256 ?? "") || !hashPattern.test(arm.answerReceiptSha256 ?? "") || !hashPattern.test(arm.evidenceSha256 ?? "") || !hashPattern.test(arm.evidenceFamilySha256 ?? "")) throw new Error(`${taskId} ${name} arm lacks exact receipts`);
  if (typeof arm.score !== "number" || !Number.isFinite(arm.score) || arm.score < 0 || arm.score > 1) throw new Error(`${taskId} ${name} score is invalid`);
  if (!Number.isSafeInteger(arm.unsupportedCitations) || arm.unsupportedCitations < 0) throw new Error(`${taskId} ${name} unsupported-citation count is invalid`);
  if (!Array.isArray(arm.sourcePaths) || arm.sourcePaths.some(path => typeof path !== "string" || path.includes("..") || path.includes("\\"))) throw new Error(`${taskId} ${name} source paths are invalid`);
}

export function verifyLongitudinalRun(plan, run) {
  if (!plan || plan.protocol !== planProtocol || !hashPattern.test(plan.planSha256 ?? "") || sha256(planPayload(plan)) !== plan.planSha256) throw new Error("longitudinal plan identity is invalid");
  validateTasks(plan.tasks);
  if (keyFingerprint(plan.evaluator.publicKeyPem) !== plan.evaluator.publicKeySha256) throw new Error("longitudinal evaluator key does not match the preregistration");
  if (!run || run.protocol !== runProtocol || run.planSha256 !== plan.planSha256 || run.evaluator !== plan.evaluator.identity) throw new Error("longitudinal run identity is invalid");
  if (plan.selectionHost && run.selectionHost !== plan.selectionHost) throw new Error("longitudinal selection host does not match the preregistration");
  if (run.selectionHost === run.evaluator) throw new Error("longitudinal evaluator must be independent of the selection host");
  if (!hashPattern.test(run.corpusContentSha256 ?? "") || !run.authority || run.authority.corpusPromotion !== false || run.authority.changesTruthStatus !== false || run.authority.modelWeightTraining !== false) throw new Error("longitudinal run authority is invalid");
  if (plan.blinding) {
    validateScoredScorecard(plan, run.blindedEvaluation, true);
    const assembled = assembleBlindedLongitudinalRun(plan, run.blindedEvaluation, run.blindingSecret, { safety: run.safety });
    if (stableStringify(assembled.outcomes) !== stableStringify(run.outcomes) || assembled.corpusContentSha256 !== run.corpusContentSha256) throw new Error("unblinded longitudinal outcomes do not match the signed scorecard");
  } else {
    const signature = run.evaluatorSignature;
    if (!signature || signature.algorithm !== "Ed25519" || typeof signature.signatureBase64 !== "string" || !verifySignature(null, Buffer.from(stableStringify(runPayload(run))), createPublicKey(plan.evaluator.publicKeyPem), Buffer.from(signature.signatureBase64, "base64"))) throw new Error("longitudinal evaluator signature is invalid");
  }
  const evaluationTasks = plan.tasks.filter(task => task.phase === "evaluation");
  if (!Array.isArray(run.outcomes) || run.outcomes.length !== evaluationTasks.length) throw new Error("longitudinal run does not contain every evaluation task exactly once");
  const byId = new Map(run.outcomes.map(outcome => [outcome.taskId, outcome]));
  if (byId.size !== run.outcomes.length || evaluationTasks.some(task => !byId.has(task.id))) throw new Error("longitudinal outcome task identities do not match the plan");
  const familyUses = new Set();
  const rows = evaluationTasks.map(task => {
    const outcome = byId.get(task.id);
    validateArm(outcome.baseline, task.id, "baseline");
    validateArm(outcome.adaptive, task.id, "adaptive");
    if (outcome.baseline.evidenceFamilySha256 !== outcome.adaptive.evidenceFamilySha256) throw new Error(`${task.id} arms were not judged in one causal evaluation family`);
    if (familyUses.has(outcome.baseline.evidenceFamilySha256)) throw new Error("one causal evaluation family was reused across tasks");
    familyUses.add(outcome.baseline.evidenceFamilySha256);
    return { taskId: task.id, baseline: outcome.baseline.score, adaptive: outcome.adaptive.score, delta: outcome.adaptive.score - outcome.baseline.score, baselineUnsupported: outcome.baseline.unsupportedCitations, adaptiveUnsupported: outcome.adaptive.unsupportedCitations, adaptiveSources: outcome.adaptive.sourcePaths };
  });
  const mean = key => rows.reduce((sum, row) => sum + row[key], 0) / rows.length;
  const wins = rows.filter(row => row.delta > 0).length;
  const losses = rows.filter(row => row.delta < 0).length;
  const sourceCounts = new Map();
  let adaptiveSelections = 0;
  for (const row of rows) for (const path of row.adaptiveSources) { sourceCounts.set(path, (sourceCounts.get(path) ?? 0) + 1); adaptiveSelections += 1; }
  const maximumSourceShare = adaptiveSelections ? Math.max(...sourceCounts.values()) / adaptiveSelections : 1;
  const metrics = {
    evaluationTasks: rows.length,
    baselineMeanScore: mean("baseline"),
    adaptiveMeanScore: mean("adaptive"),
    meanPairedDelta: mean("delta"),
    wins,
    losses,
    ties: rows.length - wins - losses,
    catastrophicLosses: rows.filter(row => row.delta < -plan.thresholds.catastrophicLossMargin).length,
    baselineUnsupportedCitations: rows.reduce((sum, row) => sum + row.baselineUnsupported, 0),
    adaptiveUnsupportedCitations: rows.reduce((sum, row) => sum + row.adaptiveUnsupported, 0),
    maximumAdaptiveSourceShare: maximumSourceShare,
    independentEvidenceFamilies: familyUses.size,
  };
  const gates = {
    minimumUtilityGain: metrics.meanPairedDelta >= plan.thresholds.minimumMeanPairedDelta,
    winsAtLeastLosses: wins >= losses,
    noCatastrophicLoss: metrics.catastrophicLosses === 0,
    noCitationRegression: metrics.adaptiveUnsupportedCitations <= metrics.baselineUnsupportedCitations,
    sourceConcentrationBounded: metrics.maximumAdaptiveSourceShare <= plan.thresholds.maximumAdaptiveSourceShare,
    rollbackControlPassed: run.safety?.rollbackRestored === true,
    freezeControlPassed: run.safety?.freezeRefused === true,
    sourceDriftControlPassed: run.safety?.sourceDriftRefused === true,
    authorityPreserved: true,
  };
  return { protocol: "spin23-context-hub-longitudinal-report/1", planSha256: plan.planSha256, corpusContentSha256: run.corpusContentSha256, evaluator: run.evaluator, rows, metrics, gates, passed: Object.values(gates).every(Boolean), authority: { scientificTruthEstablished: false, corpusPromotion: false, modelWeightTraining: false } };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [planPath, runPath] = process.argv.slice(2);
  if (!planPath || !runPath) throw new Error("usage: node tooling/search/longitudinal_evaluation.mjs <plan.json> <signed-run.json>");
  const report = verifyLongitudinalRun(JSON.parse(readFileSync(resolve(planPath), "utf8")), JSON.parse(readFileSync(resolve(runPath), "utf8")));
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.passed) process.exitCode = 1;
}
