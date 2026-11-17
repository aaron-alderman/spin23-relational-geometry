import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const tolerance = 1e-12;
const positive = value => Number.isFinite(value) && value > 0;

async function load(file) {
  const bytes = await readFile(file);
  const path = relative(root, resolve(file)).replaceAll("\\", "/");
  return { pin: { path, sha256: createHash("sha256").update(bytes).digest("hex") }, record: JSON.parse(bytes) };
}

function observation(run, receipt, location) {
  assert.equal(run.status, "executed");
  assert.equal(run.lifetime.type, "measured-intrinsic-lifetime");
  assert.equal(run.model, "constant-total-hazard");
  assert.ok(positive(run.timeSeconds) && positive(run.lifetime.seconds));
  assert.ok(run.probability > 0 && run.probability < 1);
  assert.ok(run.lifetime.source);
  return {
    receipt: receipt.pin,
    location,
    case: run.case,
    lifetimeSource: run.lifetime.source,
    windowInMeanLifetimes: run.timeSeconds / run.lifetime.seconds,
    replayProbability: run.probability
  };
}

const grammar = [
  {
    expression: "exponential",
    fit: (x, p) => -Math.log1p(-p) / x,
    evaluate: (z) => -Math.expm1(-z)
  },
  {
    expression: "clipped-linear",
    fit: (x, p) => p / x,
    evaluate: (z) => Math.min(z, 1)
  },
  {
    expression: "rational",
    fit: (x, p) => p / ((1 - p) * x),
    evaluate: (z) => z / (1 + z)
  }
];

function compare(candidate, scale, row) {
  const prediction = candidate.evaluate(scale * row.windowInMeanLifetimes);
  const absoluteError = Math.abs(row.replayProbability - prediction);
  return { case: row.case, prediction, absoluteError, passed: absoluteError <= tolerance };
}

const inputs = process.argv.slice(2);
assert.equal(inputs.length, 3, "Usage: audit-survival-proposals.mjs HELIUM_REPLAY CALCIUM_REPLAY IRON_REPLAY");
const [helium, calcium, iron] = await Promise.all(inputs.map(load));
const training = observation(helium.record.withLesson, helium, "withLesson");
const challenges = [
  observation(calcium.record.freeWithOperation, calcium, "freeWithOperation"),
  observation(iron.record.runs.composed.stdout.anyExit, iron, "runs.composed.stdout.anyExit")
];
const rows = [training, ...challenges];
assert.equal(new Set(rows.map(row => row.receipt.sha256)).size, rows.length);
assert.equal(new Set(rows.map(row => row.case)).size, rows.length);
assert.ok(challenges.every(row => Math.abs(row.windowInMeanLifetimes - training.windowInMeanLifetimes) > tolerance),
  "Transfer has to vary the time measured in lifetimes.");

const candidates = grammar.map(candidate => {
  const scale = candidate.fit(training.windowInMeanLifetimes, training.replayProbability);
  return {
    expression: candidate.expression,
    scale,
    training: compare(candidate, scale, training),
    challenges: challenges.map(row => compare(candidate, scale, row))
  };
});
const refusal = calcium.record.quenchWithOperation;
assert.equal(refusal.status, "operation-inapplicable");
assert.equal(refusal.probability, undefined);
assert.ok(refusal.mismatches.some(item => item.key === "regime"));

console.log(JSON.stringify({
  quantity: "first exit from an intrinsically decaying prepared state",
  training,
  challenges,
  maximumAbsoluteReplayError: tolerance,
  candidates,
  survivors: candidates.filter(item => item.training.passed && item.challenges.every(row => row.passed))
    .map(item => item.expression),
  failureBoundary: {
    receipt: calcium.pin,
    location: "quenchWithOperation",
    case: refusal.case,
    missing: refusal.missing,
    mismatches: refusal.mismatches
  },
  authority: "Bounded candidate extraction from software replays. Lifetimes have separate experimental or evaluated sources, while probability labels share the existing implementation."
}, null, 2));
