import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rmdir, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const replay = lane + "/fresh-agent-detector/replay.json";
const memoryPath = lane + "/detector-run-learned-operation.json";
const upstream = "tooling/programme-algebra/compose-detector-lesson.mjs";
const sourceType = "finite-window-registered-peak-probability";
const targetType = "minimum-trials-for-one-true-registration";
const trialModel = "independent-identical-bernoulli";
const read = async path => JSON.parse(await readFile(resolve(root, path), "utf8"));

async function pin(path) {
  const bytes = await readFile(resolve(root, path));
  return { path, sha256: createHash("sha256").update(bytes).digest("hex") };
}

async function checkPins(pins) {
  for (const expected of pins) assert.deepEqual(await pin(expected.path), expected);
}

async function recordDetectorRun() {
  const evidence = await read(replay);
  await checkPins(evidence.localPins);
  const bart = evidence.runs.BART.composed.stdout;
  const lorax = evidence.runs.LORAX.composed.stdout;
  assert.equal(bart.status, "executed");
  assert.equal(lorax.status, "executed");
  assert.equal(bart.sourceEvent.probability, lorax.sourceEvent.probability);
  assert.notEqual(bart.probability, lorax.probability);
  assert.ok(bart.probability > 0 && lorax.probability > 0);
  return {
    id: "detector-run/minimum-independent-trials",
    origin: {
      sources: [await pin(replay)],
      observedSingleTrial: { BART: bart.probability, LORAX: lorax.probability },
      missingForRunPlanning: "A repetition model, a success target, and the distinction between expected counts and the probability of at least one count."
    },
    operation: {
      inputType: sourceType,
      outputType: targetType,
      condition: trialModel,
      calculation: "For independent identical trials with true-registration probability p, solve (1-p)^n <= 1-target for the smallest integer n."
    },
    limits: "Counts are true registrations from known prepared trials. Requires independence, unchanged probability and live acquisition. An unresolved shared calibration error, correlation, detector dead time, or a false-positive allowance needs a separate model.",
    authority: "The detector replay records per-trial probabilities. The run-budget operation follows from the declared Bernoulli model."
  };
}

async function singleTrial(example, inputType, omitted) {
  const dir = await mkdtemp(join(tmpdir(), "trial-budget-"));
  const file = join(dir, "single-trial.json");
  try {
    const { trials, ...facts } = example.facts;
    await writeFile(file, JSON.stringify({ ...example, targetType: inputType, facts }));
    return JSON.parse(execFileSync(process.execPath, [
      resolve(root, upstream), "detect", file, ...(omitted ? [omitted] : [])
    ], { encoding: "utf8" }));
  } finally {
    await unlink(file).catch(error => { if (error.code !== "ENOENT") throw error; });
    await rmdir(dir);
  }
}

function minimumBudget(probability, target) {
  if (probability === 0) return { status: "unattainable-with-positive-target" };
  if (probability === 1) {
    return { status: "executed", minimumTrials: 1, chanceAtMinimum: 1, chanceOneFewer: 0, expectedCounts: 1 };
  }
  const logMiss = Math.log1p(-probability);
  const logAllowedMiss = Math.log1p(-target);
  let minimumTrials = Math.ceil(logAllowedMiss / logMiss);
  if (!Number.isSafeInteger(minimumTrials)) return { status: "outside-safe-integer-range" };
  if ((minimumTrials - 1) * logMiss <= logAllowedMiss) minimumTrials--;
  if (minimumTrials * logMiss > logAllowedMiss) minimumTrials++;
  if (!Number.isSafeInteger(minimumTrials)) return { status: "outside-safe-integer-range" };
  const chance = count => -Math.expm1(count * logMiss);
  return {
    status: "executed",
    minimumTrials,
    chanceAtMinimum: chance(minimumTrials),
    chanceOneFewer: chance(minimumTrials - 1),
    expectedCounts: minimumTrials * probability
  };
}

async function plan(path, omitted) {
  const example = await read(resolve(process.cwd(), path));
  assert.ok(!("plans" in example) && !("routes" in example), "Provide facts only.");
  const base = { case: example.id, question: example.question, suppliedRoutes: 0 };
  if (example.targetType !== targetType) return { ...base, status: "target-inapplicable" };
  if (omitted === "--omit-trials") {
    return { ...base, status: "no-complete-chain", perTrial: await singleTrial(example, sourceType) };
  }
  const memory = await read(memoryPath);
  await checkPins(memory.origin.sources);
  const perTrial = await singleTrial(example, memory.operation.inputType, omitted);
  if (perTrial.status !== "executed") return { ...base, status: "no-complete-chain", perTrial };
  const { trials } = example.facts;
  const discovered = [...perTrial.discovered, memory.id];
  if (trials?.type !== memory.operation.condition ||
      !Number.isFinite(trials.targetProbability) || trials.targetProbability <= 0 ||
      trials.targetProbability >= 1) {
    return { ...base, status: "trial-model-inapplicable", discovered, perTrial };
  }
  const budget = minimumBudget(perTrial.probability, trials.targetProbability);
  return {
    ...base,
    discovered,
    perTrial,
    targetProbability: trials.targetProbability,
    ...budget,
    work: { ...perTrial.work, learnedOperationsExecuted: perTrial.work.learnedOperationsExecuted + 1 }
  };
}

const [command, path, omitted] = process.argv.slice(2);
let output;
if (command === "record-detector-run" && !path) {
  output = await recordDetectorRun();
} else if (command === "plan" && path &&
    [undefined, "--omit-helium", "--omit-calcium", "--omit-detector", "--omit-trials"].includes(omitted)) {
  output = await plan(path, omitted);
} else {
  throw new Error("Usage: compose-trial-budget.mjs record-detector-run | plan FACTS [--omit-helium | --omit-calcium | --omit-detector | --omit-trials]");
}
console.log(JSON.stringify(output, null, 2));
