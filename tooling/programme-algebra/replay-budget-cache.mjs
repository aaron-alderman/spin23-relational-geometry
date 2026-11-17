import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rmdir, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const caseDir = lane + "/fresh-agent-calibration-box";
const planner = resolve(root, "tooling/programme-algebra/compose-robust-budget.mjs");
const read = async path => JSON.parse(await readFile(path, "utf8"));
const sha256 = text => createHash("sha256").update(text).digest("hex");

function canonical(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  return "{" + Object.keys(value).sort().map(key => JSON.stringify(key) + ":" + canonical(value[key])).join(",") + "}";
}

function keyFor(example) {
  const { id, question, facts, ...context } = example;
  const { trials, ...inputs } = facts;
  const { targetProbability, ...trialModel } = trials;
  return canonical({ ...context, facts: { ...inputs, trials: trialModel } });
}

export async function runRobustPlanner(example) {
  const dir = await mkdtemp(join(tmpdir(), "budget-cache-"));
  const path = join(dir, "facts.json");
  try {
    await writeFile(path, JSON.stringify(example), "utf8");
    return JSON.parse(execFileSync(process.execPath, [planner, "plan", path], {
      cwd: root, encoding: "utf8"
    }));
  } finally {
    await unlink(path).catch(error => { if (error.code !== "ENOENT") throw error; });
    await rmdir(dir);
  }
}

async function exact(example, trials) {
  const reply = await runRobustPlanner(example);
  if (reply.status !== "executed") return { status: reply.status };
  return {
    status: reply.status,
    meetsTarget: trials >= reply.minimumTrialsAcrossBox,
    cornerProbabilityPerTrial: reply.bound.perTrial.probability
  };
}

async function decide(cache, { example, trials, targetProbability }) {
  assert.ok(!("routes" in example) && !("plans" in example), "Provide facts only.");
  assert.ok(Number.isSafeInteger(trials) && trials > 0, "Use a positive safe-integer budget.");
  const target = targetProbability ?? example.facts.trials.targetProbability;
  assert.ok(Number.isFinite(target) && target > 0 && target < 1, "Use a target strictly between zero and one.");
  const key = keyFor(example);
  const observation = cache.get(key);
  const base = { case: example.id, trials, targetProbability: target, factsSha256: sha256(key) };
  if (observation) {
    const required = -Math.log1p(-target);
    const achieved = trials * observation.negativeLogMiss;
    const margin = 64 * Number.EPSILON * Math.max(1, required);
    const estimatedMinimum = required / observation.negativeLogMiss;
    if (estimatedMinimum < Number.MAX_SAFE_INTEGER - 1 && Math.abs(achieved - required) > margin) {
      return {
        ...base, status: "executed", work: "reused", plannerCalls: 0, meetsTarget: achieved >= required
      };
    }
  }
  const facts = { ...example.facts, trials: { ...example.facts.trials, targetProbability: target } };
  const result = await exact({ ...example, facts }, trials);
  if (result.status === "executed") {
    cache.set(key, { negativeLogMiss: -Math.log1p(-result.cornerProbabilityPerTrial) });
  }
  return {
    ...base, ...result, work: observation ? "numeric-fallback" : "planner", plannerCalls: 1
  };
}

async function replay() {
  const sources = [
    lane + "/budget-decision-kernels-replay.json",
    caseDir + "/replay.json",
    caseDir + "/bart.json",
    caseDir + "/lorax.json"
  ];
  const inputs = await Promise.all(sources.map(path => readFile(resolve(root, path))));
  const pins = inputs.map((bytes, i) => ({ path: sources[i], sha256: sha256(bytes) }));
  const [lesson, admission, bart, lorax] = inputs.map(bytes => JSON.parse(bytes));
  for (const pin of admission.localPins) {
    assert.equal(sha256(await readFile(resolve(root, pin.path))), pin.sha256, pin.path);
  }
  for (const observation of lesson.boundary) {
    assert.deepEqual(observation.facts, pins.find(pin => pin.path === observation.facts.path));
  }
  const [b, l] = [bart, lorax].map(example => (
    lesson.boundary.find(record => record.facts.path.endsWith("/" + example.facts.detector.name.toLowerCase() + ".json"))
  ));
  const change = (example, mutate) => {
    const copy = structuredClone(example);
    mutate(copy.facts);
    return copy;
  };
  const reordered = {
    ...bart, id: bart.id + "-renamed",
    question: "Can the same calibration meet a differently worded request?",
    facts: Object.fromEntries(Object.entries(bart.facts).reverse())
  };
  const shorter = change(bart, facts => { facts.timeSeconds *= 0.98; });
  const lowerAcceptance = change(bart, facts => { facts.calibrationBox.detectorProbability[0] *= 0.98; });
  const heavierCompetition = change(lorax, facts => { facts.calibrationBox.relativeRates["gamma-136.47-keV"][1] *= 1.02; });
  const changedModel = change(bart, facts => { facts.trials.type = "dependent-preparations"; });
  const invalidBox = change(bart, facts => { facts.calibrationBox.detectorProbability.reverse(); });
  const equalTarget = -Math.expm1(-b.minimum * b.cornerNegativeLogMissPerTrial);
  const probes = [
    ["original BART", bart, b.minimum, undefined, "planner", true],
    ["original LORAX", lorax, l.minimum, undefined, "planner", true],
    ["different trial count", bart, b.minimum - 1, undefined, "reused", false],
    ["lower requested target", lorax, l.minimum - 1, 0.95, "reused", true],
    ["higher requested target", bart, b.minimum, 0.995, "reused", false],
    ["metadata and order only", reordered, b.minimum, undefined, "reused", true],
    ["shorter window", shorter, b.minimum, undefined, "planner", false],
    ["same shorter window", shorter, b.minimum - 1, undefined, "reused", false],
    ["weaker detector corner", lowerAcceptance, b.minimum, undefined, "planner", false],
    ["heavier competing branch", heavierCompetition, l.minimum, undefined, "planner", false],
    ["unchanged source revisited", bart, b.minimum, undefined, "reused", true],
    ["invalid trial model", changedModel, b.minimum, undefined, "planner", undefined],
    ["same invalid trial model", changedModel, b.minimum, undefined, "planner", undefined],
    ["invalid calibration box", invalidBox, b.minimum, undefined, "planner", undefined],
    ["target at numerical boundary", bart, b.minimum, equalTarget, "numeric-fallback", null],
    ["LORAX revisited", lorax, l.minimum - 1, undefined, "reused", false]
  ];
  const cache = new Map();
  const idOnly = new Map();
  const rows = [];
  for (const [probe, example, trials, targetProbability, expectedWork, expectedDecision] of probes) {
    const request = { example, trials, targetProbability };
    const cached = await decide(cache, request);
    const control = await decide(new Map(), request);
    assert.equal(cached.status, control.status, probe);
    assert.equal(cached.meetsTarget, control.meetsTarget, probe);
    assert.equal(cached.work, expectedWork, probe);
    if (expectedDecision !== null) assert.equal(control.meetsTarget, expectedDecision, probe);
    const previous = idOnly.get(example.id);
    const idOnlyBroken = previous !== undefined && (
      control.status !== "executed" ||
      (trials * previous >= -Math.log1p(-cached.targetProbability)) !== control.meetsTarget
    );
    if (!idOnly.has(example.id) && control.status === "executed") {
      idOnly.set(example.id, -Math.log1p(-control.cornerProbabilityPerTrial));
    }
    rows.push({ probe, cached, control, idOnlyBroken });
  }
  return {
    operation: lesson.learnedOperation.id,
    sources: pins,
    work: {
      requests: rows.length,
      cachedPlannerCalls: rows.reduce((n, row) => n + row.cached.plannerCalls, 0),
      unconditionalPlannerCalls: rows.length,
      caseIdOnlyErrors: rows.filter(row => row.idOnlyBroken).length
    },
    rows
  };
}

if (import.meta.main) {
  const [command, input, ...extra] = process.argv.slice(2);
  let output;
  if (command === "replay" && input === undefined) {
    output = await replay();
  } else if (command === "stream" && input && extra.length === 0) {
    const path = resolve(input);
    const requests = await read(path);
    assert.ok(Array.isArray(requests), "Supply an array of requests.");
    const cache = new Map();
    output = [];
    for (const request of requests) {
      const example = await read(resolve(dirname(path), request.factsFile));
      output.push(await decide(cache, { ...request, example }));
    }
  } else {
    throw new Error("Usage: replay-budget-cache.mjs replay | stream REQUESTS");
  }
  console.log(JSON.stringify(output, null, 2));
}
