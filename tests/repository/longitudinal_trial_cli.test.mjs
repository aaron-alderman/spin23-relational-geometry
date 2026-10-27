import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { sha256 } from "../../tooling/search/belief_state.mjs";

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const cli = join(root, "tooling/search/longitudinal_trial_cli.mjs");
const template = join(root, "tooling/search/longitudinal_evaluation_template_v1.json");
const run = (directory, ...args) => {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
};

test("longitudinal evaluator CLI completes registration, blinded scoring, signing, assembly and verification", () => {
  const directory = mkdtempSync(join(tmpdir(), "spin23-longitudinal-kit-"));
  try {
    const path = name => join(directory, name);
    run(directory, "new-secret", "--out", path("secret.txt"));
    run(directory, "evaluator-keypair", "--private-key", path("private.pem"), "--public-key", path("public.pem"));
    run(directory, "register", "--template", template, "--evaluator", "independent-cli-fixture", "--public-key", path("public.pem"), "--selection-host", "observatory-cli-fixture", "--blinding-secret", path("secret.txt"), "--out", path("plan.json"));
    const plan = JSON.parse(readFileSync(path("plan.json"), "utf8"));
    const outcomes = plan.tasks.filter(item => item.phase === "evaluation").map((item, index) => {
      const family = sha256(`cli-family-${index}`);
      const arm = (name, answerText) => ({ contextReceiptSha256: sha256(`${name}-context-${index}`), answerReceiptSha256: sha256(`${name}-answer-${index}`), evidenceSha256: sha256(`${name}-evidence-${index}`), evidenceFamilySha256: family, unsupportedCitations: 0, sourcePaths: [`corpus/${name}-${index}.md`], answerText, answerSha256: sha256(answerText) });
      return { taskId: item.id, baseline: arm("baseline", `ordinary answer ${index}`), adaptive: arm("adaptive", `improved answer ${index}`) };
    });
    writeFileSync(path("draft.json"), `${JSON.stringify({ protocol: "spin23-context-hub-longitudinal-answer-draft/1", planSha256: plan.planSha256, selectionHost: plan.selectionHost, corpusContentSha256: "c".repeat(64), model: { name: "fixed-cli-fixture" }, outcomes }, null, 2)}\n`);
    run(directory, "scorecard", "--plan", path("plan.json"), "--draft", path("draft.json"), "--blinding-secret", path("secret.txt"), "--out", path("scorecard.json"));
    const scorecard = JSON.parse(readFileSync(path("scorecard.json"), "utf8"));
    for (const item of scorecard.outcomes) for (const arm of item.arms) {
      arm.score = arm.answerText.startsWith("improved") ? 0.8 : 0.6;
      arm.notes = "Opaque CLI fixture score.";
    }
    writeFileSync(path("scored.json"), `${JSON.stringify(scorecard, null, 2)}\n`);
    run(directory, "sign", "--plan", path("plan.json"), "--scorecard", path("scored.json"), "--private-key", path("private.pem"), "--out", path("signed.json"));
    writeFileSync(path("safety.json"), `${JSON.stringify({ rollbackRestored: true, freezeRefused: true, sourceDriftRefused: true }, null, 2)}\n`);
    const assembled = run(directory, "assemble", "--plan", path("plan.json"), "--scorecard", path("signed.json"), "--blinding-secret", path("secret.txt"), "--safety", path("safety.json"), "--out", path("run.json"));
    assert.equal(assembled.passed, true);
    const report = run(directory, "verify", "--plan", path("plan.json"), "--run", path("run.json"));
    assert.equal(report.passed, true);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
