import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const baselinePath = lane + "/fresh-agent-run-budget/replay.json";
const planner = "tooling/programme-algebra/compose-trial-budget.mjs";
const gainPath = lane + "/detector-timing-gain.md";
const cases = { BART: "bart.json", LORAX: "lorax.json" };

async function pinnedRead(path) {
  const bytes = await readFile(resolve(root, path));
  return {
    bytes,
    pin: { path, sha256: createHash("sha256").update(bytes).digest("hex") }
  };
}

async function loadAdmittedCase(name, baseline) {
  assert.ok(Object.hasOwn(cases, name), "Use an admitted BART or LORAX case.");
  const path = lane + "/fresh-agent-run-budget/" + cases[name];
  const { bytes, pin } = await pinnedRead(path);
  assert.deepEqual(pin, baseline.localPins.find(entry => entry.path === path));
  const example = JSON.parse(bytes);
  const prior = baseline.runs[name].composed.stdout;
  assert.equal(prior.status, "executed");
  assert.equal(prior.case, example.id);
  return { name, path, example, priorMinimumTrials: prior.minimumTrials };
}

function exactDecision({ path }, trials) {
  const result = JSON.parse(execFileSync(process.execPath, [
    resolve(root, planner), "plan", resolve(root, path)
  ], { cwd: root, encoding: "utf8" }));
  assert.equal(result.status, "executed");
  return {
    meetsTarget: trials >= result.minimumTrials,
    probability: -Math.expm1(trials * Math.log1p(-result.perTrial.probability)),
    exactPlannerCalls: 1
  };
}

function checkBudget(admitted, trials) {
  assert.ok(Number.isSafeInteger(trials) && trials > 0, "Use a positive safe-integer budget.");
  const { facts } = admitted.example;
  const rates = facts.branching.relativeRates;
  const selectedFraction = rates[facts.requestedBranch] /
    Object.values(rates).reduce((sum, rate) => sum + rate, 0);
  const exitUpper = Math.min(1, facts.timeSeconds / facts.lifetime.seconds);
  const perTrialUpper = exitUpper * selectedFraction * facts.detector.probability;
  const upperProbability = Math.min(1, trials * perTrialUpper);
  const target = facts.trials.targetProbability;
  const screen = { case: admitted.name, trials, target, upperProbability };
  // Keep floating-point comparisons within this margin on the exact path.
  if (upperProbability + 64 * Number.EPSILON < target) {
    return { ...screen, decision: "ruled-out-by-upper-bound", meetsTarget: false, exactPlannerCalls: 0 };
  }
  return { ...screen, decision: "exact", ...exactDecision(admitted, trials) };
}

const [command, name, count, ...extra] = process.argv.slice(2);
const baselineInput = await pinnedRead(baselinePath);
const baseline = JSON.parse(baselineInput.bytes);
for (const expected of baseline.localPins) {
  assert.deepEqual((await pinnedRead(expected.path)).pin, expected);
}

if (command === "check" && name && /^\d+$/.test(count ?? "") && extra.length === 0) {
  console.log(JSON.stringify(checkBudget(await loadAdmittedCase(name, baseline), Number(count)), null, 2));
} else if (command === "replay" && name === undefined) {
  const rows = [];
  for (const detector of Object.keys(cases)) {
    const admitted = await loadAdmittedCase(detector, baseline);
    // Common planning probes plus the two sides of the saved decision boundary.
    for (const trials of [2000, 5000, admitted.priorMinimumTrials - 1, admitted.priorMinimumTrials]) {
      const guarded = checkBudget(admitted, trials);
      const exact = exactDecision(admitted, trials);
      assert.equal(guarded.meetsTarget, exact.meetsTarget);
      assert.ok(exact.probability <= guarded.upperProbability + 64 * Number.EPSILON);
      rows.push({ guarded, exact });
    }
  }
  const receipt = {
    operation: {
      id: "run-budget/reject-below-certified-ceiling",
      inputType: "admitted-nominal-true-registration-budget",
      outputType: "fixed-budget-target-decision",
      condition: "Pinned, previously admitted constant-hazard exit, absorbing branch, matched conditional peak acceptance, and independent identical preparations.",
      calculation: "Use the union bound with per-trial ceiling min(1, time/lifetime) times the selected branch fraction and peak acceptance. Rule out targets strictly above this ceiling for the run. Otherwise execute the exact planner.",
      limits: "Certifies infeasibility only under the admitted nominal model. It does not certify feasibility or extend detector, source, or trial-model admissibility."
    },
    origin: {
      lesson: "Compare the most favorable possible result to the requested threshold before spending work on the full calculation.",
      sources: [(await pinnedRead(gainPath)).pin, baselineInput.pin]
    },
    work: {
      decisions: rows.length,
      guardedExactPlannerCalls: rows.reduce((sum, row) => sum + row.guarded.exactPlannerCalls, 0),
      unconditionalExactPlannerCalls: rows.length
    },
    rows
  };
  console.log(JSON.stringify(receipt, null, 2));
} else {
  throw new Error("Usage: check-fixed-trial-budget.mjs check BART|LORAX TRIALS | replay");
}
