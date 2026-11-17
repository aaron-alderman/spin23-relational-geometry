import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const repository = resolve(import.meta.dirname, "../..");
const digest = value => createHash("sha256").update(value).digest("hex");
const readJson = async file => JSON.parse(await readFile(file, "utf8"));
const lane = "corpus/programmes/programme-algebra/learning";

async function sourcePin(path) {
  return { path, sha256: digest(await readFile(resolve(repository, path))) };
}

async function learn(path) {
  const raw = await readFile(path);
  const episode = JSON.parse(raw);
  const [refusal, repair] = episode.journey;
  assert.equal(refusal.disposition, "refused");
  assert.equal(repair.disposition, "verified");
  assert.equal(refusal.inputType, repair.inputType);
  assert.equal(refusal.requestedType, repair.outputType);
  assert.notEqual(refusal.inputType, refusal.requestedType);
  assert.ok(repair.bridge);

  const evidence = await readJson(resolve(repository, repair.receipt));
  const { refined, fineToRefinedRelativeCaptureChange } = evidence.convergence;
  assert.ok(refined.final.captured > 0 && refined.final.captured <= 1);
  assert.ok(Math.abs(refined.initial.norm - 1) <= 1e-12);
  assert.ok(Math.abs(refined.final.norm - 1) <= 2e-9);
  assert.ok(Math.abs(refined.final.energy - refined.initial.energy) <= 2e-9);
  assert.ok(fineToRefinedRelativeCaptureChange <= 0.005);
  assert.ok(refined.reverseAmplitudeError <= 2e-9 && refined.reversed.captured <= 1e-16);

  return {
    id: episode.id,
    authority: episode.authority,
    journeySha256: digest(raw),
    guard: {
      outputType: repair.outputType,
      requireBridgeForTypeChange: true,
      requireBridgeInputs: true
    },
    origin: { failure: refusal.id, repair: repair.id, demonstratedBridge: repair.bridge },
    evidence: await Promise.all([refusal.source, repair.source, repair.receipt].map(sourcePin)),
    observed: {
      time: evidence.parameters.totalTime,
      probability: refined.final.captured,
      relativeRefinementChange: fineToRefinedRelativeCaptureChange,
      reverseProbability: refined.reversed.captured
    }
  };
}

function assess(plan, facts, guard) {
  if (plan.outputType !== guard.outputType) return "outside-lesson-scope";
  if (guard.requireBridgeForTypeChange && plan.inputType !== plan.outputType && !plan.bridge) {
    return "refused: no typed conversion from input to requested probability";
  }
  const missing = plan.requires.filter(input => facts[input] === undefined || facts[input] === null);
  if (guard.requireBridgeInputs && missing.length) return "blocked: missing " + missing.join(", ");
  return "eligible";
}

function lifetimeArguments(facts, inputType) {
  const { timeSeconds, lifetime, survivalModel } = facts;
  assert.equal(inputType, "measured-intrinsic-lifetime");
  assert.equal(lifetime.type, inputType);
  assert.equal(survivalModel, "constant-total-hazard");
  assert.ok(Number.isFinite(timeSeconds) && timeSeconds >= 0);
  const { seconds, reportedUncertaintySeconds } = lifetime;
  assert.ok(Number.isFinite(seconds) && Number.isFinite(reportedUncertaintySeconds));
  assert.ok(reportedUncertaintySeconds >= 0 && seconds > reportedUncertaintySeconds);
  return { timeSeconds, seconds, reportedUncertaintySeconds };
}

function evaluateSurvival(facts, inputType) {
  const { timeSeconds, seconds, reportedUncertaintySeconds } = lifetimeArguments(facts, inputType);
  const probabilityAt = lifetime => -Math.expm1(-timeSeconds / lifetime);
  return {
    timeSeconds,
    lifetime: facts.lifetime,
    model: facts.survivalModel,
    probability: probabilityAt(seconds),
    probabilityAtReportedLifetimeEndpoints: [
      probabilityAt(seconds + reportedUncertaintySeconds),
      probabilityAt(seconds - reportedUncertaintySeconds)
    ]
  };
}

function midpointIntegral(timeSeconds, lifetimeSeconds, panels) {
  const width = timeSeconds / panels;
  let sum = 0;
  for (let i = 0; i < panels; i++) {
    sum += Math.exp(-(i + 0.5) * width / lifetimeSeconds) / lifetimeSeconds;
  }
  return sum * width;
}

function compareNumericalWork(result) {
  if (result.status !== "executed") return null;
  const { timeSeconds, lifetime, probability } = result;
  const seconds = lifetime.seconds;
  // The midpoint error bound uses max |f''| = 1 / lifetime^3 on [0, T].
  const tolerance = 1e-10;
  const panels = Math.max(1, Math.ceil(Math.sqrt((timeSeconds / seconds) ** 3 / (24 * tolerance))));
  const difference = Math.abs(probability - midpointIntegral(timeSeconds, seconds, panels));
  assert.ok(difference <= tolerance);
  return {
    quantity: "nominal finite-window probability",
    referenceIntegrandEvaluations: panels,
    closedFormExponentialEvaluations: 1,
    referenceAbsoluteTolerance: tolerance,
    observedAbsoluteDifference: difference
  };
}

async function apply(path, lesson) {
  const example = await readJson(path);
  const { facts, plans, targetType } = example;
  const result = { case: example.id, question: example.question, source: await sourcePin(example.source) };
  if (!lesson || lesson.guard.outputType !== targetType) {
    return { ...result, status: "unresolved-by-lesson-replay", unscreenedPlans: plans.map(plan => plan.id) };
  }

  for (const pin of lesson.evidence) {
    assert.deepEqual(await sourcePin(pin.path), pin, "Lesson source drift: " + pin.path);
  }
  const screening = plans.map(plan => ({ id: plan.id, decision: assess(plan, facts, lesson.guard) }));
  const eligible = plans.filter((_, index) => screening[index].decision === "eligible");
  const [selected] = eligible;
  const screened = { ...result, lesson: lesson.id, lessonJourneySha256: lesson.journeySha256, screening };
  if (eligible.length !== 1 || selected.bridge !== "constant-hazard-survival") {
    return { ...screened, status: "no-unique-executable-bridge" };
  }

  return {
    ...screened,
    status: "executed",
    selected: selected.id,
    ...evaluateSurvival(facts, selected.inputType),
    work: {
      candidatePlans: plans.length,
      plansStoppedBeforeDynamics: plans.length - eligible.length,
      microscopicDynamicsRuns: 0
    }
  };
}

async function recordHelium() {
  const casePin = await sourcePin(lane + "/az-127-helium.json");
  const guardPin = await sourcePin(lane + "/learned-transition-guard.json");
  const casePath = resolve(repository, casePin.path);
  const example = await readJson(casePath);
  const guard = await readJson(resolve(repository, guardPin.path));
  const result = await apply(casePath, guard);
  assert.equal(result.status, "executed");
  const selected = example.plans.find(plan => plan.id === result.selected);
  assert.equal(example.facts.regime, "unperturbed-intrinsic-decay");
  assert.equal(example.facts.eventType, "any-exit-from-prepared-state");
  const reference = compareNumericalWork(result);

  return {
    id: result.case + "/" + selected.bridge,
    origin: {
      case: result.case,
      parentLesson: result.lesson,
      sources: [casePin, guardPin, result.source, ...guard.evidence],
      measuredLifetime: result.lifetime,
      observed: { timeSeconds: result.timeSeconds, probability: result.probability, reference }
    },
    operation: {
      bridge: selected.bridge,
      inputType: selected.inputType,
      outputType: selected.outputType,
      requires: selected.requires,
      conditions: {
        survivalModel: result.model,
        regime: example.facts.regime,
        eventType: example.facts.eventType
      }
    },
    limits: "Supply a lifetime for the new system and condition. A driven exit, a specific decay branch, or detector counts require additional evidence."
  };
}

async function reuse(path, memory) {
  const example = await readJson(path);
  assert.ok(!("plans" in example) && !("routes" in example), "Provide facts only, without candidate routes.");
  const { facts, targetType } = example;
  const result = { case: example.id, question: example.question, source: await sourcePin(example.source) };
  if (!memory) return { ...result, status: "no-operation-discovered", suppliedRoutes: 0 };
  for (const pin of memory.origin.sources) {
    assert.deepEqual(await sourcePin(pin.path), pin, "Operation source drift: " + pin.path);
  }

  const operation = memory.operation;
  const missing = operation.requires.filter(key => facts[key] == null);
  const mismatches = Object.entries(operation.conditions)
    .filter(([key, value]) => facts[key] !== value)
    .map(([key, expected]) => ({ key, expected, received: facts[key] ?? null }));
  if (facts.lifetime && facts.lifetime.type !== operation.inputType) {
    mismatches.push({ key: "lifetime.type", expected: operation.inputType, received: facts.lifetime.type ?? null });
  }
  const screened = { ...result, suppliedRoutes: 0, discoveredOperation: memory.id, missing, mismatches };
  if (operation.outputType !== targetType || missing.length || mismatches.length) {
    return { ...screened, status: "operation-inapplicable" };
  }

  assert.equal(operation.bridge, "constant-hazard-survival");
  return {
    ...screened,
    status: "executed",
    ...evaluateSurvival(facts, operation.inputType),
    work: { nominalExponentialEvaluations: 1, uncertaintyEndpointEvaluations: 2, microscopicDynamicsRuns: 0 }
  };
}

const [command, inputPath, lessonPath] = process.argv.slice(2);
let output;
if (command === "learn" && inputPath && !lessonPath) {
  output = await learn(inputPath);
} else if (command === "apply" && inputPath) {
  output = await apply(inputPath, lessonPath ? await readJson(lessonPath) : null);
} else if (command === "compare" && inputPath && lessonPath) {
  const withoutLesson = await apply(inputPath, null);
  const withLesson = await apply(inputPath, await readJson(lessonPath));
  output = {
    withoutLesson,
    withLesson,
    numericalReference: compareNumericalWork(withLesson)
  };
} else if (command === "record-helium" && !inputPath) {
  output = await recordHelium();
} else if (command === "reuse" && inputPath) {
  output = await reuse(inputPath, lessonPath ? await readJson(lessonPath) : null);
} else {
  throw new Error("Usage: replay-transition-lesson.mjs learn JOURNEY | apply CASE [LESSON] | compare CASE LESSON | record-helium | reuse FACTS [OPERATION]");
}
console.log(JSON.stringify(output, null, 2));
