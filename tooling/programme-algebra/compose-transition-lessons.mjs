import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rmdir, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const helium = lane + "/helium-learned-operation.json";
const calcium = lane + "/calcium-learned-operation.json";
const replay = lane + "/fresh-agent-calcium/replay.json";
const runner = "tooling/programme-algebra/replay-transition-lesson.mjs";
const read = async path => JSON.parse(await readFile(resolve(root, path), "utf8"));

async function pin(path) {
  const bytes = await readFile(resolve(root, path));
  return { path, sha256: createHash("sha256").update(bytes).digest("hex") };
}

async function checkPins(pins) {
  for (const expected of pins) assert.deepEqual(await pin(expected.path), expected);
}

async function recordCalcium() {
  const trial = await read(replay);
  await checkPins([trial.runner, trial.operation, ...trial.inputs]);
  assert.equal(trial.freeWithOperation.status, "executed");
  const failure = trial.quenchWithOperation;
  assert.equal(failure.status, "operation-inapplicable");
  assert.ok(failure.mismatches.some(item => item.key === "regime"));
  assert.ok(failure.missing.includes("survivalModel"));
  assert.ok(!("probability" in failure));

  return {
    id: "AZ-127-calcium/resolve-exit-branch",
    origin: {
      case: failure.case,
      refusal: failure.status,
      missing: failure.missing,
      mismatches: failure.mismatches,
      sources: await Promise.all([replay, lane + "/fresh-agent-calcium/README.md", failure.source.path].map(pin))
    },
    lesson: "Specify the event before using a survival curve. A return or an unobserved exit can make loss from the prepared state differ from the requested event.",
    operation: {
      inputType: "finite-window-event-probability",
      outputType: "finite-window-branch-probability",
      condition: "constant-competing-absorbing-exits",
      calculation: "Normalize the complete relative exit rates, then multiply the selected branch share by the probability of any exit in the window."
    },
    limits: "Use a calibrated complete list of mutually exclusive absorbing exits with constant shares in this preparation and regime. For unresolved return, feeding, time-dependent shares, or detector counts, obtain an appropriate model or readout calibration.",
    authority: "The calcium refusal motivates the event guard. The branch calculation follows from conditional probability under the stated model; the calcium beam-on rate remains unmeasured in this case."
  };
}

async function evaluateAnyExit(example, heliumMemory) {
  const dir = await mkdtemp(join(tmpdir(), "transition-compose-"));
  const file = join(dir, "any-exit.json");
  try {
    await writeFile(file, JSON.stringify({
      id: example.id + "/any-exit",
      question: "What is the probability of any intrinsic exit in the same window?",
      source: example.source,
      targetType: heliumMemory.operation.outputType,
      facts: {
        timeSeconds: example.facts.timeSeconds,
        lifetime: example.facts.lifetime,
        survivalModel: example.facts.survivalModel,
        regime: example.facts.regime,
        eventType: "any-exit-from-prepared-state"
      }
    }));
    return JSON.parse(execFileSync(process.execPath, [
      resolve(root, runner), "reuse", file, resolve(root, helium)
    ], { encoding: "utf8" }));
  } finally {
    await unlink(file).catch(error => { if (error.code !== "ENOENT") throw error; });
    await rmdir(dir);
  }
}

async function compose(path, omitted) {
  const example = await read(resolve(process.cwd(), path));
  assert.ok(!("plans" in example) && !("routes" in example), "Provide facts only.");
  const { facts, targetType } = example;
  const base = {
    case: example.id,
    question: example.question,
    source: await pin(example.source),
    suppliedRoutes: 0
  };
  const heliumMemory = omitted === "--omit-helium" ? null : await read(helium);
  const calciumMemory = omitted === "--omit-calcium" ? null : await read(calcium);
  if (calciumMemory) await checkPins(calciumMemory.origin.sources);
  const discovered = [heliumMemory, calciumMemory].filter(Boolean).map(memory => memory.id);
  if (!heliumMemory || !calciumMemory) {
    return { ...base, discovered, status: "no-complete-chain" };
  }
  if (heliumMemory.operation.outputType !== calciumMemory.operation.inputType ||
      calciumMemory.operation.outputType !== targetType) {
    return { ...base, discovered, status: "no-complete-chain" };
  }

  const { branching, requestedBranch } = facts;
  if (branching?.type !== calciumMemory.operation.condition || !branching.source ||
      facts.eventType !== "specific-absorbing-exit") {
    return { ...base, discovered, status: "branch-evidence-inapplicable" };
  }
  const rates = branching.relativeRates;
  if (!rates || Object.keys(rates).length < 2 || !Object.hasOwn(rates, requestedBranch) ||
      Object.values(rates).some(rate => !Number.isFinite(rate) || rate < 0)) {
    return { ...base, discovered, status: "branch-evidence-inapplicable" };
  }
  const total = Object.values(rates).reduce((sum, rate) => sum + rate, 0);
  if (!(total > 0 && Number.isFinite(total))) {
    return { ...base, discovered, status: "branch-evidence-inapplicable" };
  }
  const anyExit = await evaluateAnyExit(example, heliumMemory);
  if (anyExit.status !== "executed") return { ...base, discovered, status: "survival-inapplicable", anyExit };
  const conditionalBranchShare = rates[requestedBranch] / total;
  return {
    ...base,
    discovered,
    status: "executed",
    anyExit,
    branch: { requested: requestedBranch, relativeRates: rates, conditionalBranchShare, source: branching.source },
    probability: anyExit.probability * conditionalBranchShare,
    probabilityAtReportedLifetimeEndpoints: anyExit.probabilityAtReportedLifetimeEndpoints.map(p => p * conditionalBranchShare),
    work: { learnedOperationsExecuted: 2, nominalExponentialEvaluations: 1, microscopicDynamicsRuns: 0 }
  };
}

const [command, path, omitted] = process.argv.slice(2);
let output;
if (command === "record-calcium" && !path) {
  output = await recordCalcium();
} else if (command === "compose" && path && [undefined, "--omit-helium", "--omit-calcium"].includes(omitted)) {
  output = await compose(path, omitted);
} else {
  throw new Error("Usage: compose-transition-lessons.mjs record-calcium | compose FACTS [--omit-helium | --omit-calcium]");
}
console.log(JSON.stringify(output, null, 2));
