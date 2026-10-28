import { createHash } from "node:crypto";
import fs from "node:fs";
import { runVirtualExperiment } from "../../scripts/run-trifilar-four-mode-virtual-emulator.mjs";

const config = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-virtual-emulator-config-v1.json",
  import.meta.url,
), "utf8"));
const recorded = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-virtual-emulator-result-v1.json",
  import.meta.url,
), "utf8"));
const replay = runVirtualExperiment(config);
const tolerance = 2e-10;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function runKey(run) {
  return [run.scenario, run.control, run.gapToLoopRate].join(":");
}

const recordedByKey = new Map(recorded.runs.map((run) => [runKey(run), run]));
assert(recorded.runs.length === 24 && replay.runs.length === 24,
  "the virtual instrument must retain two scenarios, four rates and three controls");
assert(recorded.configSha256 === createHash("sha256").update(JSON.stringify(config)).digest("hex"),
  "recorded configuration digest mismatch");

for (const actual of replay.runs) {
  const expected = recordedByKey.get(runKey(actual));
  assert(expected, "missing recorded run " + runKey(actual));
  for (const field of [
    "rawTargetOverlap",
    "conditionalTargetOverlap",
    "returnedAngleDegrees",
    "singularValueRatio",
    "controllerWorkRotatingFrame",
  ]) {
    assert(Math.abs(actual[field] - expected[field]) < tolerance,
      field + " replay mismatch for " + runKey(actual));
  }
  for (const field of ["dark", "bright", "bus", "dissipatedNorm", "total", "ledgerResidual"]) {
    assert(Math.abs(actual.populations[field] - expected.populations[field]) < tolerance,
      "population " + field + " replay mismatch for " + runKey(actual));
  }
  assert(actual.populations.ledgerResidual < 1e-9,
    "population ledger failed for " + runKey(actual));
}

function select(scenario, control) {
  return recorded.runs
    .filter((run) => run.scenario === scenario && run.control === control)
    .sort((left, right) => left.gapToLoopRate - right.gapToLoopRate);
}

const idealForward = select("ideal", "forward");
const idealReverse = select("ideal", "reverse");
const idealFixed = select("ideal", "fixed");
const meteredForward = select("metered", "forward");
const meteredReverse = select("metered", "reverse");
const meteredFixed = select("metered", "fixed");

assert(idealForward.every((run, index) => index === 0
  || run.populations.bright < idealForward[index - 1].populations.bright),
"ideal bright leakage must improve as the loop is slowed");
assert(idealForward.every((run, index) =>
  Math.abs(run.returnedAngleDegrees + idealReverse[index].returnedAngleDegrees) < 1e-8),
"forward and reverse ideal angles must be antisymmetric");
assert(meteredForward.every((run, index) =>
  Math.abs(run.returnedAngleDegrees + meteredReverse[index].returnedAngleDegrees) < 2e-3),
"forward and reverse metered angles must remain antisymmetric");
assert(idealFixed.every((run) =>
  Math.abs(run.returnedAngleDegrees) < 1e-10
  && Math.abs(run.rawTargetOverlap - 1) < 1e-9
  && Math.abs(run.controllerWorkRotatingFrame) < 1e-15),
"ideal fixed-path controls must remain identity with zero controller work");
assert(meteredFixed.every((run) => Math.abs(run.controllerWorkRotatingFrame) < 1e-15),
"metered fixed-path controls must retain zero controller work");
assert(meteredForward.every((run, index) => index === 0
  || run.populations.dissipatedNorm > meteredForward[index - 1].populations.dissipatedNorm),
"metered dissipation must accumulate on slower loops");

const bestMetered = meteredForward.reduce((best, run) =>
  run.rawTargetOverlap > best.rawTargetOverlap ? run : best);
assert(bestMetered.gapToLoopRate === 8,
  "declared nonideal fixture must expose a finite optimum at gap/loop-rate eight");

console.log(JSON.stringify({
  status: "PASS",
  replayedRuns: replay.runs.length,
  exactGapPerSecond: recorded.engine.exactBrightDarkGapPerSecond,
  bestMeteredForward: {
    gapToLoopRate: bestMetered.gapToLoopRate,
    rawTargetOverlap: bestMetered.rawTargetOverlap,
    returnedAngleDegrees: bestMetered.returnedAngleDegrees,
    singularValueRatio: bestMetered.singularValueRatio,
    brightPopulation: bestMetered.populations.bright,
    dissipatedNorm: bestMetered.populations.dissipatedNorm,
  },
  idealForwardLadder: idealForward.map((run) => ({
    gapToLoopRate: run.gapToLoopRate,
    angleDegrees: run.returnedAngleDegrees,
    brightPopulation: run.populations.bright,
    busPopulation: run.populations.bus,
    controllerWorkRotatingFrame: run.controllerWorkRotatingFrame,
  })),
  meteredForwardLadder: meteredForward.map((run) => ({
    gapToLoopRate: run.gapToLoopRate,
    rawTargetOverlap: run.rawTargetOverlap,
    brightPopulation: run.populations.bright,
    dissipatedNorm: run.populations.dissipatedNorm,
  })),
  verdict: "The Node-only four-mode virtual instrument reproduces the geometric rate ladder and exposes the predicted finite optimum once measured loss and tolerances are retained.",
}, null, 2));
