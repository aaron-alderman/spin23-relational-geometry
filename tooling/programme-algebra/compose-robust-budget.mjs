import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rmdir, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const replay = lane + "/fresh-agent-run-budget/replay.json";
const memoryPath = lane + "/run-budget-learned-operation.json";
const planner = "tooling/programme-algebra/compose-trial-budget.mjs";
const sourceType = "minimum-trials-for-one-true-registration";
const targetType = "minimum-trials-across-calibration-box";
const condition = "shared-calibration-endpoint-box";
const read = async path => JSON.parse(await readFile(resolve(root, path), "utf8"));

async function pin(path) {
  const bytes = await readFile(resolve(root, path));
  return { path, sha256: createHash("sha256").update(bytes).digest("hex") };
}

async function checkPins(pins) {
  for (const expected of pins) assert.deepEqual(await pin(expected.path), expected);
}

async function recordRunBudget() {
  const evidence = await read(replay);
  await checkPins(evidence.localPins);
  const observed = Object.fromEntries(Object.entries(evidence.runs).map(([setup, arm]) => {
    const run = arm.composed.stdout;
    assert.equal(run.status, "executed");
    assert.ok(run.chanceOneFewer < run.targetProbability && run.chanceAtMinimum >= run.targetProbability);
    return [setup, { perTrial: run.perTrial.probability, minimumTrials: run.minimumTrials }];
  }));
  return {
    id: "run-budget/minimum-over-shared-calibration-box",
    origin: {
      sources: [await pin(replay)],
      observed,
      missingFromNominalBudget: "Uncertainty in one calibration is shared by the run. A nominal per-trial value alone cannot bound the chance across plausible calibrations."
    },
    operation: {
      inputType: sourceType,
      outputType: targetType,
      condition,
      calculation: "Choose the longest mean lifetime, smallest absolute detector acceptance, smallest selected exit weight and largest competing weights. Use the existing run planner at that corner."
    },
    limits: "A conditional minimum over the declared box for the same independent-trial model at each fixed calibration. Reported error bars used as endpoints do not give coverage for the box. Shared calibration drift or correlated trial outcomes require other models."
  };
}

function validRange(value, range, min = 0, max = Infinity) {
  return Array.isArray(range) && range.length === 2 &&
    Number.isFinite(value) && range.every(Number.isFinite) &&
    min <= range[0] && range[0] <= value && value <= range[1] && range[1] <= max;
}

function leastFavorable(facts, bounds) {
  const relativeRates = facts.branching.relativeRates;
  if (typeof bounds.source !== "string" || !bounds.source.trim() ||
      !validRange(facts.lifetime.seconds, bounds.meanLifetimeSeconds, Number.MIN_VALUE) ||
      !validRange(facts.detector.probability, bounds.detectorProbability, 0, 1) ||
      !bounds.relativeRates || Object.keys(bounds.relativeRates).length !== Object.keys(relativeRates).length ||
      Object.entries(relativeRates).some(([key, value]) => !validRange(value, bounds.relativeRates[key]))) {
    return null;
  }
  const sumAt = endpoint => Object.values(bounds.relativeRates).reduce((sum, range) => sum + range[endpoint], 0);
  if (!(sumAt(0) > 0 && Number.isFinite(sumAt(1)))) return null;
  const rates = Object.fromEntries(Object.keys(relativeRates).map(branch => [
    branch, bounds.relativeRates[branch][branch === facts.requestedBranch ? 0 : 1]
  ]));
  const lifetimeSeconds = bounds.meanLifetimeSeconds[1];
  const detectorProbability = bounds.detectorProbability[0];
  return {
    corner: { lifetimeSeconds, detectorProbability, relativeRates: rates },
    facts: {
      ...facts,
      lifetime: { ...facts.lifetime, seconds: lifetimeSeconds, reportedUncertaintySeconds: 0 },
      detector: { ...facts.detector, probability: detectorProbability },
      branching: { ...facts.branching, relativeRates: rates }
    }
  };
}

async function evaluateBudget(example, { dir, label, inputType, omitted }) {
  const file = join(dir, label + ".json");
  const { calibrationBox, ...facts } = example.facts;
  try {
    await writeFile(file, JSON.stringify({ ...example, targetType: inputType, facts }));
    return JSON.parse(execFileSync(process.execPath, [
      resolve(root, planner), "plan", file, ...(omitted ? [omitted] : [])
    ], { encoding: "utf8" }));
  } finally {
    await unlink(file).catch(error => { if (error.code !== "ENOENT") throw error; });
  }
}

async function plan(path, omitted) {
  const example = await read(resolve(process.cwd(), path));
  assert.ok(!("plans" in example) && !("routes" in example), "Provide facts only.");
  const base = { case: example.id, question: example.question, suppliedRoutes: 0 };
  if (example.targetType !== targetType) return { ...base, status: "target-inapplicable" };
  const memory = omitted === "--omit-envelope" ? null : await read(memoryPath);
  if (memory) await checkPins(memory.origin.sources);
  const inputType = memory?.operation.inputType ?? sourceType;
  const dir = await mkdtemp(join(tmpdir(), "robust-budget-"));
  try {
    const nominal = await evaluateBudget(example, { dir, label: "nominal", inputType, omitted: memory ? omitted : null });
    if (!memory || nominal.status !== "executed") return { ...base, status: "no-complete-chain", nominal };
    const bounds = example.facts.calibrationBox;
    const worst = bounds?.type === memory.operation.condition ? leastFavorable(example.facts, bounds) : null;
    if (!worst) return { ...base, status: "calibration-box-inapplicable", nominal };
    const bound = await evaluateBudget({ ...example, facts: worst.facts }, { dir, label: "bound", inputType });
    return {
      ...base,
      status: bound.status,
      discovered: [...nominal.discovered, memory.id],
      nominal,
      corner: worst.corner,
      bound,
      ...(bound.status === "executed" ? {
        minimumTrialsAcrossBox: bound.minimumTrials,
        extraTrialsOverNominal: bound.minimumTrials - nominal.minimumTrials
      } : {}),
      work: { learnedOperationsExecuted: nominal.work.learnedOperationsExecuted + 1, upstreamBudgetReplays: 2, microscopicDynamicsRuns: 0 }
    };
  } finally {
    await rmdir(dir);
  }
}

const [command, path, omitted] = process.argv.slice(2);
let output;
if (command === "record-run-budget" && !path) {
  output = await recordRunBudget();
} else if (command === "plan" && path &&
    [undefined, "--omit-helium", "--omit-calcium", "--omit-detector", "--omit-trials", "--omit-envelope"].includes(omitted)) {
  output = await plan(path, omitted);
} else {
  throw new Error("Usage: compose-robust-budget.mjs record-run-budget | plan FACTS [--omit-helium | --omit-calcium | --omit-detector | --omit-trials | --omit-envelope]");
}
console.log(JSON.stringify(output, null, 2));
