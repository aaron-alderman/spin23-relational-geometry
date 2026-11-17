import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { cpus } from "node:os";
import { performance } from "node:perf_hooks";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const caseDir = lane + "/fresh-agent-calibration-box";
const priorPath = lane + "/calibration-box-budget-screen-replay.json";
const margin = 64 * Number.EPSILON;

async function pinnedRead(path) {
  const bytes = await readFile(resolve(root, path));
  return { bytes, pin: { path, sha256: createHash("sha256").update(bytes).digest("hex") } };
}

function exitPolynomial(x, degree) {
  let tail = 1;
  for (let order = degree; order >= 2; order--) tail = 1 - x * tail / order;
  return x * tail;
}

function exactRate(x, scale) {
  return -Math.log1p(Math.expm1(-x) * scale);
}

function boundRate(x, scale, degree) {
  const low = exitPolynomial(x, degree - 1) * scale;
  const high = exitPolynomial(x, degree) * scale;
  // For k >= 3 the positive log-series tail is bounded by a geometric series.
  return {
    lower: low + low ** 2 / 2,
    upper: high + high ** 2 / 2 + high ** 3 / (3 * (1 - high))
  };
}

function screen({ lower, upper }, required, n) {
  if (n * upper + margin < required) return "fails";
  if (n * lower - margin >= required) return "passes";
  return "exact";
}

const observations = [];
const prior = await pinnedRead(priorPath);
const admission = await pinnedRead(caseDir + "/replay.json");
const evidence = JSON.parse(admission.bytes);
for (const expected of evidence.localPins) {
  assert.deepEqual((await pinnedRead(expected.path)).pin, expected);
}

for (const name of ["BART", "LORAX"]) {
  const path = caseDir + "/" + name.toLowerCase() + ".json";
  const { bytes, pin } = await pinnedRead(path);
  const { id, facts } = JSON.parse(bytes);
  const { composed, independentCheck } = evidence.runs[name];
  assert.equal(composed.stdout.status, "executed");
  assert.equal(composed.stdout.case, id);
  const { corner } = composed.stdout;
  const reference = independentCheck.bound;
  const x = facts.timeSeconds / corner.lifetimeSeconds;
  const total = Object.values(corner.relativeRates).reduce((sum, rate) => sum + rate, 0);
  const scale = corner.relativeRates[facts.requestedBranch] / total * corner.detectorProbability;
  assert.ok(x >= 0 && x <= 1 && scale >= 0 && scale < 1);
  const required = -Math.log1p(-facts.trials.targetProbability);
  const rate = exactRate(x, scale);
  assert.ok(Math.abs(Math.expm1(-rate) + reference.probabilityPerTrial) <= margin);
  const degree7 = boundRate(x, scale, 7);
  const degree9 = boundRate(x, scale, 9);
  for (const bounds of [degree7, degree9]) {
    assert.ok(bounds.lower <= rate + margin && bounds.upper >= rate - margin);
  }
  observations.push({ name, pin, x, scale, required, rate, degree7, degree9, minimum: reference.minimumTrials });
}

const policies = {
  direct: (c, n) => n * exactRate(c.x, c.scale) >= c.required,
  bounded: (c, n) => {
    const decision = screen(boundRate(c.x, c.scale, 9), c.required, n);
    return decision === "exact" ? policies.direct(c, n) : decision === "passes";
  },
  cachedDirect: (c, n) => n * c.rate >= c.required,
  cachedBounded: (c, n) => {
    const decision = screen(c.degree9, c.required, n);
    return decision === "exact" ? policies.direct(c, n) : decision === "passes";
  }
};

const probes = [];
// Interleave setups so the kernel cannot reuse the same calibration each iteration.
for (let offset = -128; offset <= 128; offset++) {
  for (const c of observations) probes.push({ c, n: c.minimum + offset });
}
for (const row of JSON.parse(prior.bytes).rows) {
  const c = observations.find(entry => entry.name === row.guarded.case);
  probes.push({ c, n: row.guarded.trials });
}

const fallbacks = { degree7: 0, degree9: 0 };
for (const { c, n } of probes) {
  const expected = n >= c.minimum;
  assert.ok(Math.abs(n * c.rate - c.required) > margin, "Ambiguous comparison needs exact threshold handling.");
  for (const decide of Object.values(policies)) assert.equal(decide(c, n), expected);
  for (const key of Object.keys(fallbacks)) {
    const decision = screen(c[key], c.required, n);
    if (decision === "exact") fallbacks[key]++;
    else assert.equal(decision === "passes", expected);
  }
}

function benchmark() {
  const entries = Object.entries(policies);
  const rounds = 8;
  const repetitions = 1600;
  const decisions = repetitions * probes.length;
  const expected = repetitions * probes.filter(({ c, n }) => n >= c.minimum).length;
  const samples = Object.fromEntries(entries.map(([name]) => [name, []]));
  function run(decide, repeats) {
    let passed = 0;
    for (let repetition = 0; repetition < repeats; repetition++) {
      for (const { c, n } of probes) passed += Number(decide(c, n));
    }
    return passed;
  }
  for (const [, decide] of entries) assert.equal(run(decide, 150), expected * 150 / repetitions);
  for (let round = 0; round < rounds; round++) {
    for (let slot = 0; slot < entries.length; slot++) {
      const [name, decide] = entries[(round + slot) % entries.length];
      const start = performance.now();
      const passed = run(decide, repetitions);
      samples[name].push((performance.now() - start) * 1e6 / decisions);
      assert.equal(passed, expected);
    }
  }
  const median = values => {
    const ordered = values.toSorted((a, b) => a - b);
    return (ordered[rounds / 2 - 1] + ordered[rounds / 2]) / 2;
  };
  return {
    node: process.version,
    cpu: cpus()[0]?.model,
    scope: "Hot in-process decision only. Input and admission checks, calibration geometry, target log, and cached quantities are prepared before timing.",
    rounds,
    decisionsPerRound: decisions,
    nanosecondsPerDecision: Object.fromEntries(entries.map(([name]) => [
      name, { samples: samples[name], median: median(samples[name]) }
    ]))
  };
}

const args = process.argv.slice(2);
assert.ok(!args.length || (args.length === 1 && args[0] === "--benchmark"), "Use --benchmark or no arguments.");
const receipt = {
  origin: { sources: [prior.pin, admission.pin] },
  learnedOperation: {
    id: "calibration-box/reuse-corner-log-miss",
    inputType: "admitted-fixed-calibration-box-and-registration-model",
    outputType: "fixed-budget-robust-target-decision",
    storedQuantity: "Negative log miss probability for one trial at the admitted least favorable corner.",
    calculation: "Multiply the stored quantity by the budget and compare to the negative log of the allowed miss probability.",
    limits: "Cache identity must cover the admitted source, preparation, event, time window, channel rates, detector, calibration box and model. Budget and target may vary while those facts stay fixed. For comparisons within numerical tolerance of equality, apply the original exact planner's threshold handling."
  },
  verifiedAgainst: "Independent recorded minimum from successive zero-count multiplication at the least favorable corner.",
  probes: probes.length,
  fallbacks,
  boundary: observations.map(c => ({
    case: c.name,
    facts: c.pin,
    requiredNegativeLogMiss: c.required,
    cornerNegativeLogMissPerTrial: c.rate,
    minimum: c.minimum,
    adjacent: [c.minimum - 1, c.minimum].map(n => ({
      trials: n,
      degree7: screen(c.degree7, c.required, n),
      degree9: screen(c.degree9, c.required, n)
    }))
  })),
  ...(args.length ? { benchmark: benchmark() } : {})
};
console.log(JSON.stringify(receipt, null, 2));
