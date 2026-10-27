#!/usr/bin/env node

import { generateKeyPairSync, randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  assembleBlindedLongitudinalRun,
  createBlindedScorecard,
  finalizeLongitudinalPlan,
  signBlindedScorecard,
  verifyLongitudinalRun,
} from "./longitudinal_evaluation.mjs";
import { sha256 } from "./belief_state.mjs";

function flags(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 2) {
    if (!argv[index]?.startsWith("--") || argv[index + 1] === undefined) throw new Error(`invalid argument: ${argv[index] ?? "missing"}`);
    result[argv[index].slice(2)] = argv[index + 1];
  }
  return result;
}
const required = (values, name) => {
  if (!values[name]) throw new Error(`--${name} is required`);
  return values[name];
};
const json = path => JSON.parse(readFileSync(resolve(path), "utf8"));
const text = path => readFileSync(resolve(path), "utf8");
const writeNew = (path, value, mode) => {
  const target = resolve(path);
  if (existsSync(target)) throw new Error(`refusing to overwrite: ${target}`);
  writeFileSync(target, value, { encoding: "utf8", flag: "wx", ...(mode ? { mode } : {}) });
  return target;
};
const writeJson = (path, value) => writeNew(path, `${JSON.stringify(value, null, 2)}\n`);

async function main() {
  const [command, ...argv] = process.argv.slice(2);
  const options = flags(argv);
  if (command === "new-secret") {
    const value = randomBytes(32).toString("hex");
    const output = writeNew(required(options, "out"), `${value}\n`, 0o600);
    process.stdout.write(`${JSON.stringify({ command, output, commitmentSha256: sha256(value) })}\n`);
    return;
  }
  if (command === "evaluator-keypair") {
    const { publicKey, privateKey } = generateKeyPairSync("ed25519");
    const privatePath = writeNew(required(options, "private-key"), privateKey.export({ type: "pkcs8", format: "pem" }), 0o600);
    const publicPath = writeNew(required(options, "public-key"), publicKey.export({ type: "spki", format: "pem" }));
    process.stdout.write(`${JSON.stringify({ command, publicKey: publicPath, privateKey: privatePath, warning: "Keep the private key on the independent evaluator's system." })}\n`);
    return;
  }
  if (command === "register") {
    const secret = text(required(options, "blinding-secret")).trim();
    const plan = finalizeLongitudinalPlan(json(required(options, "template")), {
      evaluatorIdentity: required(options, "evaluator"),
      evaluatorPublicKeyPem: text(required(options, "public-key")),
      selectionHost: required(options, "selection-host"),
      blindingCommitmentSha256: sha256(secret),
    });
    const output = writeJson(required(options, "out"), plan);
    process.stdout.write(`${JSON.stringify({ command, output, planSha256: plan.planSha256, blindingCommitmentSha256: plan.blinding.commitmentSha256 })}\n`);
    return;
  }
  if (command === "scorecard") {
    const plan = json(required(options, "plan"));
    const scorecard = createBlindedScorecard(plan, json(required(options, "draft")), text(required(options, "blinding-secret")).trim());
    const output = writeJson(required(options, "out"), scorecard);
    process.stdout.write(`${JSON.stringify({ command, output, planSha256: plan.planSha256, tasks: scorecard.outcomes.length })}\n`);
    return;
  }
  if (command === "sign") {
    const plan = json(required(options, "plan"));
    const signed = signBlindedScorecard(plan, json(required(options, "scorecard")), text(required(options, "private-key")));
    const output = writeJson(required(options, "out"), signed);
    process.stdout.write(`${JSON.stringify({ command, output, planSha256: plan.planSha256, evaluator: signed.evaluator })}\n`);
    return;
  }
  if (command === "assemble") {
    const plan = json(required(options, "plan"));
    const run = assembleBlindedLongitudinalRun(plan, json(required(options, "scorecard")), text(required(options, "blinding-secret")).trim(), { safety: json(required(options, "safety")) });
    const report = verifyLongitudinalRun(plan, run);
    const output = writeJson(required(options, "out"), run);
    process.stdout.write(`${JSON.stringify({ command, output, planSha256: plan.planSha256, passed: report.passed, gates: report.gates })}\n`);
    return;
  }
  if (command === "verify") {
    const plan = json(required(options, "plan"));
    const report = verifyLongitudinalRun(plan, json(required(options, "run")));
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    if (!report.passed) process.exitCode = 1;
    return;
  }
  throw new Error("usage: longitudinal_trial_cli.mjs <new-secret|evaluator-keypair|register|scorecard|sign|assemble|verify> [--name value ...]");
}

main().catch(error => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
