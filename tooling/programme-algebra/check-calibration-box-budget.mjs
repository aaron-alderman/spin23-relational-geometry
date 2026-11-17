import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const caseDir = lane + "/fresh-agent-calibration-box";
const evidencePath = caseDir + "/replay.json";
const priorPath = lane + "/fixed-trial-budget-replay.json";
const planner = "tooling/programme-algebra/compose-robust-budget.mjs";
const names = ["BART", "LORAX"];
const margin = 64 * Number.EPSILON;

async function pinnedRead(path) {
  const bytes = await readFile(resolve(root, path));
  return {
    bytes,
    pin: { path, sha256: createHash("sha256").update(bytes).digest("hex") }
  };
}

async function admittedCase(name, evidence) {
  assert.ok(names.includes(name), "Use an admitted BART or LORAX calibration box.");
  const path = caseDir + "/" + name.toLowerCase() + ".json";
  const { bytes, pin } = await pinnedRead(path);
  assert.deepEqual(pin, evidence.localPins.find(entry => entry.path === path));
  const example = JSON.parse(bytes);
  const prior = evidence.runs[name].composed.stdout;
  assert.equal(prior.status, "executed");
  assert.equal(prior.case, example.id);
  assert.equal(prior.minimumTrialsAcrossBox, evidence.runs[name].independentCheck.bound.minimumTrials);
  return { name, path, facts: example.facts, prior };
}

function exactDecision(admitted, trials) {
  const result = JSON.parse(execFileSync(process.execPath, [
    resolve(root, planner), "plan", resolve(root, admitted.path)
  ], { cwd: root, encoding: "utf8" }));
  assert.equal(result.status, "executed");
  assert.deepEqual(result.corner, admitted.prior.corner);
  const chance = p => -Math.expm1(trials * Math.log1p(-p));
  return {
    meetsTarget: trials >= result.minimumTrialsAcrossBox,
    nominalProbability: chance(result.nominal.perTrial.probability),
    cornerProbability: chance(result.bound.perTrial.probability),
    robustPlannerCalls: 1,
    upstreamBudgetReplays: result.work.upstreamBudgetReplays
  };
}

function ceilings({ facts, prior }, trials) {
  const { lifetimeSeconds, relativeRates, detectorProbability } = prior.corner;
  const x = facts.timeSeconds / lifetimeSeconds;
  const fraction = relativeRates[facts.requestedBranch] /
    Object.values(relativeRates).reduce((sum, rate) => sum + rate, 0);
  const scale = fraction * detectorProbability;
  const linear = Math.min(1, x) * scale;
  // The degree-seven Taylor polynomial bounds 1-exp(-x) from above.
  // On the recorded case's interval 0 <= x <= 1 it also tightens the linear bound.
  let taylor = linear;
  if (x <= 1) {
    let tail = 1;
    for (let order = 7; order >= 2; order--) tail = 1 - x * tail / order;
    taylor = x * tail * scale;
  }
  const logMissUpper = p => trials * p / (1 - p);
  return {
    linearUnion: Math.min(1, trials * linear),
    taylorUnion: Math.min(1, trials * taylor),
    linearLogMiss: logMissUpper(linear),
    taylorLogMiss: logMissUpper(taylor)
  };
}

function checkBudget(admitted, trials) {
  assert.ok(Number.isSafeInteger(trials) && trials > 0, "Use a positive safe-integer budget.");
  const target = admitted.facts.trials.targetProbability;
  const requiredLogMiss = -Math.log1p(-target);
  const upper = ceilings(admitted, trials);
  const screens = {
    linearUnion: upper.linearUnion + margin < target,
    taylorUnion: upper.taylorUnion + margin < target,
    linearLogMiss: upper.linearLogMiss + margin < requiredLogMiss,
    taylorLogMiss: upper.taylorLogMiss + margin < requiredLogMiss
  };
  const screening = { case: admitted.name, trials, target, requiredLogMiss, upper, screens };
  if (screens.taylorLogMiss) {
    return {
      ...screening, decision: "ruled-out-at-corner", meetsTarget: false,
      robustPlannerCalls: 0, upstreamBudgetReplays: 0
    };
  }
  return { ...screening, decision: "exact", ...exactDecision(admitted, trials) };
}

const [command, name, count, ...extra] = process.argv.slice(2);
const input = await pinnedRead(evidencePath);
const evidence = JSON.parse(input.bytes);
for (const expected of evidence.localPins) {
  assert.deepEqual((await pinnedRead(expected.path)).pin, expected);
}

if (command === "check" && name && /^\d+$/.test(count ?? "") && extra.length === 0) {
  console.log(JSON.stringify(checkBudget(await admittedCase(name, evidence), Number(count)), null, 2));
} else if (command === "replay" && name === undefined) {
  const rows = [];
  for (const detector of names) {
    const admitted = await admittedCase(detector, evidence);
    const { nominal, minimumTrialsAcrossBox } = admitted.prior;
    for (const trials of [1000, 2000, nominal.minimumTrials, minimumTrialsAcrossBox - 1, minimumTrialsAcrossBox]) {
      const guarded = checkBudget(admitted, trials);
      const exact = exactDecision(admitted, trials);
      assert.equal(guarded.meetsTarget, exact.meetsTarget);
      assert.equal(exact.meetsTarget, trials >= minimumTrialsAcrossBox);
      for (const screened of Object.values(guarded.screens)) {
        if (screened) assert.equal(exact.meetsTarget, false);
      }
      rows.push({ guarded, exact });
    }
  }
  const screenCounts = Object.fromEntries(Object.keys(rows[0].guarded.screens).map(method => [
    method, rows.filter(row => row.guarded.screens[method]).length
  ]));
  const receipt = {
    operation: {
      id: "calibration-box/reject-at-admitted-corner",
      inputType: "admitted-shared-calibration-endpoint-box",
      outputType: "fixed-budget-robust-target-decision",
      condition: "Use a least favorable corner from the pinned box admission. The detector acceptance and branch share must bound a true registration and trials must be independent and identical at that calibration.",
      calculation: "Upper-bound the exit probability by its degree-seven Taylor polynomial on [0,1] and by the linear cap outside that interval. Multiply by the branch share and acceptance to get u. Reject when n*u/(1-u) lies below -log(1-target), with a numerical margin. Otherwise use the exact planner.",
      limits: "Only a rejection follows from the ceiling. Ranges describe sensitivity at fixed calibration. The screen cannot admit a new box or substitute for a model of drift, dead time, or trial dependence."
    },
    origin: { sources: [(await pinnedRead(priorPath)).pin, input.pin] },
    work: {
      decisions: rows.length,
      screenCounts,
      guardedRobustPlannerCalls: rows.reduce((sum, row) => sum + row.guarded.robustPlannerCalls, 0),
      guardedUpstreamBudgetReplays: rows.reduce((sum, row) => sum + row.guarded.upstreamBudgetReplays, 0),
      unconditionalUpstreamBudgetReplays: rows.reduce((sum, row) => sum + row.exact.upstreamBudgetReplays, 0)
    },
    rows
  };
  console.log(JSON.stringify(receipt, null, 2));
} else {
  throw new Error("Usage: check-calibration-box-budget.mjs check BART|LORAX TRIALS | replay");
}
