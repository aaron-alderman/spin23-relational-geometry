import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { runRobustPlanner } from "./replay-budget-cache.mjs";
import { cornerProbes } from "./corner-probes.mjs";
import { sampledReturn, sampledChainType } from "./sampled-return.mjs";

const root = resolve(import.meta.dirname, "../..");
const lane = "corpus/programmes/programme-algebra/learning";
const caseDir = lane + "/fresh-agent-calibration-box";
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const read = async path => JSON.parse(await readFile(path, "utf8"));

async function pin(path) {
  return { path, sha256: hash(await readFile(resolve(root, path))) };
}

async function loadHeldQualification(context) {
  const { sourcesByContext } = await read(resolve(root, lane, "sampled-return-held-qualification.json"));
  if (!Object.hasOwn(sourcesByContext, context)) return {};
  const source = sourcesByContext[context];
  const bytes = await readFile(resolve(root, source.path));
  assert.equal(hash(bytes), source.sha256, "Held qualification receipt changed.");
  const report = JSON.parse(bytes);
  for (const expected of report.sources) assert.deepEqual(await pin(expected.path), expected);
  assert.equal(report.scope.evidenceFamily, context);
  return { report, pin: source };
}

async function loadOperations() {
  const names = ["helium", "calcium", "iron57", "detector-run", "run-budget", "population-half-life"];
  const paths = names.map(name => lane + "/" + name + "-learned-operation.json");
  const sampledPath = lane + "/sampled-return-learned-operations.json";
  const memories = await Promise.all(paths.map(path => read(resolve(root, path))));
  const sampled = await read(resolve(root, sampledPath));
  for (const memory of memories) {
    for (const expected of memory.origin.sources) assert.deepEqual(await pin(expected.path), expected);
  }
  const operations = memories.map(memory => memory.operation);
  for (let i = 1; i < 5; i++) assert.equal(operations[i - 1].outputType, operations[i].inputType);
  assert.equal(operations[0].bridge, "constant-hazard-survival");
  assert.equal(operations[0].conditions.survivalModel, "constant-total-hazard");
  assert.deepEqual(operations.slice(1, 5).map(operation => operation.condition), [
    "constant-competing-absorbing-exits", "absolute-peak-acceptance",
    "independent-identical-bernoulli", "shared-calibration-endpoint-box"
  ]);
  const halfLife = operations[5];
  assert.equal(halfLife.inputType, "measured-population-half-life");
  for (const key of ["bridge", "outputType", "conditions"]) assert.deepEqual(halfLife[key], operations[0][key]);
  for (const expected of sampled.origin.sources) assert.deepEqual(await pin(expected.path), expected);
  for (const record of sampled.operations) assert.equal(record.operation.inputType, sampledChainType);
  const producers = Map.groupBy([...memories, ...sampled.operations], memory => memory.operation.outputType);
  return {
    producers, inputType: operations[0].inputType, halfLifeInput: halfLife.inputType,
    pins: await Promise.all([...paths, sampledPath].map(pin))
  };
}

function discover(target, memory, visited = new Set()) {
  if ([memory.inputType, memory.halfLifeInput, sampledChainType].includes(target)) return [[]];
  if (visited.has(target)) return [];
  const seen = new Set(visited).add(target);
  return (memory.producers.get(target) ?? []).flatMap(producer =>
    discover(producer.operation.inputType, memory, seen).map(chain => [...chain, producer])
  );
}

function measuredTiming(facts, operation, branch) {
  const exitFacts = branch ? { ...facts, eventType: "any-exit-from-prepared-state" } : facts;
  if (operation.requires.some(key => exitFacts[key] == null) ||
      Object.entries(operation.conditions).some(([key, value]) => exitFacts[key] !== value) ||
      !Number.isFinite(facts.timeSeconds) || facts.timeSeconds < 0) return null;
  let measurement = facts.lifetime;
  if (operation.inputType === "measured-population-half-life") {
    const half = facts.populationHalfLife;
    if (half?.type !== operation.inputType || typeof half.source !== "string" || !half.source.trim() ||
        !Number.isFinite(half.nanoseconds) || !Number.isFinite(half.uncertaintyNanoseconds) ||
        half.uncertaintyNanoseconds < 0 || half.nanoseconds <= half.uncertaintyNanoseconds) return null;
    measurement = {
      type: half.type,
      seconds: half.nanoseconds * 1e-9 / Math.LN2,
      reportedUncertaintySeconds: half.uncertaintyNanoseconds * 1e-9 / Math.LN2
    };
  }
  if (measurement?.type !== operation.inputType || !Number.isFinite(measurement.seconds) ||
      !Number.isFinite(measurement.reportedUncertaintySeconds) || measurement.reportedUncertaintySeconds < 0 ||
      measurement.seconds <= measurement.reportedUncertaintySeconds) return null;
  return measurement;
}

function validRange(value, range, min = 0, max = Infinity) {
  return Array.isArray(range) && range.length === 2 && range.every(Number.isFinite) &&
    min <= range[0] && range[0] <= value && value <= range[1] && range[1] <= max;
}

// These guards mirror the pinned planner chain. The interval endpoints and
// numeric inputs below are selected without evaluating a probability.
async function admit(example, [, branch, detector, trials, box], lifetime) {
  const source = await pin(example.source);
  const { facts } = example;
  const { timeSeconds, branching, requestedBranch, lineEnergyKeV, calibrationBox } = facts;
  const incomplete = reason => ({ status: "no-complete-chain", reason, source });
  const rates = branching?.relativeRates;
  const entries = Object.entries(rates ?? {});
  const total = entries.reduce((sum, [, rate]) => sum + rate, 0);
  if (branch && (branching?.type !== branch.condition || !branching.source || facts.eventType !== "specific-absorbing-exit" ||
      entries.length < 2 || !Object.hasOwn(rates, requestedBranch) ||
      entries.some(([, rate]) => !Number.isFinite(rate) || rate < 0) || !Number.isFinite(total) || total <= 0)) {
    return incomplete("branch");
  }
  if (!lifetime) return incomplete("survival");
  const nominal = { lifetimeSeconds: lifetime.seconds, relativeRates: rates };
  const prepared = { status: "admitted", source, timeSeconds, requestedBranch, nominal };
  if (!detector) return prepared;
  const peak = facts.detector;
  if (peak?.type !== detector.condition || !peak.source || !peak.geometry ||
      peak.eventSelection !== "emission-window-eventual-peak" || peak.branch !== requestedBranch ||
      !Number.isFinite(lineEnergyKeV) || lineEnergyKeV <= 0 || peak.lineEnergyKeV !== lineEnergyKeV ||
      !Number.isFinite(peak.probability) || peak.probability < 0 || peak.probability > 1) {
    return incomplete("detector");
  }
  nominal.detectorProbability = peak.probability;
  if (!trials) return prepared;
  const target = facts.trials?.targetProbability;
  if (facts.trials?.type !== trials.condition || !Number.isFinite(target) || target <= 0 || target >= 1) {
    return incomplete("trial-model");
  }
  if (!box) return { ...prepared, target };
  const bounds = calibrationBox;
  if (bounds?.type !== box.condition || typeof bounds.source !== "string" || !bounds.source.trim() ||
      !validRange(lifetime.seconds, bounds.meanLifetimeSeconds, Number.MIN_VALUE) ||
      !validRange(peak.probability, bounds.detectorProbability, 0, 1) ||
      !bounds.relativeRates || Object.keys(bounds.relativeRates).length !== entries.length ||
      entries.some(([channel, rate]) => !validRange(rate, bounds.relativeRates[channel]))) {
    return { status: "calibration-box-inapplicable", reason: "calibration-box", source };
  }
  const endpointSum = endpoint => entries.reduce((sum, [channel]) => sum + bounds.relativeRates[channel][endpoint], 0);
  if (!(endpointSum(0) > 0 && Number.isFinite(endpointSum(1)))) {
    return { status: "calibration-box-inapplicable", reason: "calibration-box", source };
  }
  const corner = {
    lifetimeSeconds: bounds.meanLifetimeSeconds[1],
    detectorProbability: bounds.detectorProbability[0],
    relativeRates: Object.fromEntries(entries.map(([channel]) =>
      [channel, bounds.relativeRates[channel][channel === requestedBranch ? 0 : 1]]
    ))
  };
  return { ...prepared, target, corner };
}

function calculation(work, cache) {
  const remember = (stage, parts, calculate) => {
    const key = JSON.stringify(parts);
    const table = cache?.[stage];
    if (table?.has(key)) return table.get(key);
    work[stage]++;
    const result = calculate();
    table?.set(key, result);
    return result;
  };
  const exit = (timeSeconds, lifetimeSeconds) => {
    const ratio = timeSeconds / lifetimeSeconds;
    return remember("exits", [String(ratio)], () => -Math.expm1(-ratio));
  };
  const share = (requestedBranch, relativeRates, rates) =>
    remember("branches", [requestedBranch, rates], () =>
      relativeRates[requestedBranch] / rates.reduce((sum, [, rate]) => sum + rate, 0)
    );
  const branch = ({ timeSeconds, requestedBranch }, { lifetimeSeconds, relativeRates }) =>
    exit(timeSeconds, lifetimeSeconds) * share(requestedBranch, relativeRates, Object.entries(relativeRates));
  const registration = ({ timeSeconds, requestedBranch }, { lifetimeSeconds, detectorProbability, relativeRates }) => {
    const ratio = timeSeconds / lifetimeSeconds;
    const rates = Object.entries(relativeRates);
    return remember("registrations", [String(ratio), requestedBranch, rates, detectorProbability], () => {
      const probability = exit(timeSeconds, lifetimeSeconds) *
        share(requestedBranch, relativeRates, rates) * detectorProbability;
      return { probability, logMiss: Math.log1p(-probability) };
    });
  };
  return { exit, branch, registration };
}

function budget({ probability, logMiss }, target) {
  if (probability === 0) return { status: "unattainable-with-positive-target" };
  if (probability === 1) return { status: "executed", minimumTrials: 1, probability, chanceAtMinimum: 1, chanceOneFewer: 0 };
  const allowed = Math.log1p(-target);
  let minimumTrials = Math.ceil(allowed / logMiss);
  if (!Number.isSafeInteger(minimumTrials)) return { status: "outside-safe-integer-range" };
  if ((minimumTrials - 1) * logMiss <= allowed) minimumTrials--;
  if (minimumTrials * logMiss > allowed) minimumTrials++;
  if (!Number.isSafeInteger(minimumTrials)) return { status: "outside-safe-integer-range" };
  return {
    status: "executed", minimumTrials, probability,
    chanceAtMinimum: -Math.expm1(minimumTrials * logMiss),
    chanceOneFewer: -Math.expm1((minimumTrials - 1) * logMiss)
  };
}

async function plan(example, memory, cache) {
  assert.ok(!("plans" in example) && !("routes" in example), "Provide facts only.");
  const work = { exits: 0, branches: 0, registrations: 0 };
  const routes = discover(example.targetType, memory).filter(chain => chain.length);
  if (!routes.length) {
    return { case: example.id, suppliedRoutes: 0, work, status: "target-inapplicable", reason: "target" };
  }
  const [only] = routes;
  if (only[0].operation.inputType === sampledChainType) {
    assert.ok(routes.length === 1 && only.length === 1, "Sampled chain operations answer one observable at a time.");
    const source = await pin(example.source);
    const qualification = example.facts.requireHeldQualification === true
      ? await loadHeldQualification(example.facts.sampledChain?.context)
      : undefined;
    return { ...sampledReturn(example, only[0], cache?.sampled, qualification), source };
  }
  const candidates = routes.map(chain => ({
    chain, timing: measuredTiming(example.facts, chain[0].operation, chain.length > 1)
  }));
  const eligible = candidates.filter(candidate => candidate.timing);
  const preferred = eligible.find(candidate => candidate.chain[0].operation.inputType === memory.inputType);
  const { chain, timing } = preferred ?? eligible[0] ?? candidates[0];
  const admitted = await admit(example, chain.map(item => item.operation), timing);
  const base = { case: example.id, suppliedRoutes: 0, source: admitted.source, work };
  if (Object.hasOwn(example.facts, "populationHalfLife")) {
    base.timingEvidence = {
      admitted: eligible.map(candidate => candidate.chain[0].id),
      refused: candidates.filter(candidate => !candidate.timing).map(candidate => candidate.chain[0].id)
    };
  }
  if (admitted.status !== "admitted") return { ...base, status: admitted.status, reason: admitted.reason };
  const different = (a, b) => Math.abs(a - b) > 32 * Number.EPSILON * Math.max(Math.abs(a), Math.abs(b));
  if (eligible.some(candidate =>
    different(candidate.timing.seconds, timing.seconds) ||
    different(candidate.timing.reportedUncertaintySeconds, timing.reportedUncertaintySeconds)
  )) {
    return { ...base, status: "conflicting-timing-evidence", reason: "survival" };
  }
  if (base.timingEvidence) base.timingEvidence.selected = chain[0].id;
  const evaluate = calculation(work, cache);
  const discovered = chain.map(item => item.id);
  if (chain.length <= 3) {
    const { nominal, timeSeconds } = admitted;
    const probability = chain.length === 1 ? evaluate.exit(timeSeconds, nominal.lifetimeSeconds)
      : chain.length === 2 ? evaluate.branch(admitted, nominal)
      : evaluate.registration(admitted, nominal).probability;
    return { ...base, status: "executed", discovered, probability };
  }
  const nominal = budget(evaluate.registration(admitted, admitted.nominal), admitted.target);
  if (chain.length === 4) return { ...base, discovered, ...nominal, targetProbability: admitted.target };
  if (nominal.status !== "executed") return { ...base, status: "no-complete-chain", nominal };
  const bound = budget(evaluate.registration(admitted, admitted.corner), admitted.target);
  return {
    ...base, status: bound.status, discovered, targetProbability: admitted.target,
    nominal, bound, corner: admitted.corner, minimumTrialsAcrossBox: bound.minimumTrials
  };
}

const createCache = () => ({ exits: new Map(), branches: new Map(), registrations: new Map(), sampled: new Map() });

function expectedBudget(reply) {
  return {
    status: reply.status, minimumTrials: reply.minimumTrials, probability: reply.perTrial.probability,
    chanceAtMinimum: reply.chanceAtMinimum, chanceOneFewer: reply.chanceOneFewer
  };
}

async function replay(memory) {
  const archivePath = caseDir + "/replay.json";
  const archive = await read(resolve(root, archivePath));
  for (const expected of archive.localPins) assert.deepEqual(await pin(expected.path), expected);
  const [bart, lorax] = await Promise.all(["bart", "lorax"].map(name => read(resolve(root, caseDir, name + ".json"))));
  const probes = cornerProbes(archive, bart, lorax);
  const controls = [
    ["beam-on", facts => { facts.regime = "beam-on"; }],
    ["unknown-branch", facts => { facts.requestedBranch = "unknown"; }],
    ["reversed-box", facts => { facts.calibrationBox.detectorProbability.reverse(); }],
    ["zero-corner-acceptance", facts => { facts.calibrationBox.detectorProbability[0] = 0; }]
  ];
  for (const [label, mutate] of controls) {
    const example = structuredClone(bart);
    example.id += "-" + label;
    mutate(example.facts);
    probes.push({ label, example });
  }
  const cache = createCache();
  const rows = [];
  for (const { label, example, priorAdmission } of probes) {
    const reference = priorAdmission ?? await runRobustPlanner(example);
    const reused = await plan(example, memory, cache);
    const fresh = await plan(example, memory);
    assert.equal(reused.status, reference.status, label);
    assert.deepEqual({ ...reused, work: fresh.work }, fresh, label);
    if (reference.bound) {
      assert.deepEqual(reused.nominal, expectedBudget(reference.nominal));
      const expected = reference.bound.status === "executed"
        ? expectedBudget(reference.bound)
        : { status: reference.bound.status };
      assert.deepEqual(reused.bound, expected);
      assert.deepEqual(reused.corner, reference.corner);
      assert.equal(reused.minimumTrialsAcrossBox, reference.minimumTrialsAcrossBox);
    } else {
      assert.deepEqual(reused.work, { exits: 0, branches: 0, registrations: 0 });
    }
    rows.push({ label, factsSha256: hash(JSON.stringify(example)), reused, freshWork: fresh.work });
  }
  const work = field => Object.fromEntries(["exits", "branches", "registrations"].map(stage => [
    stage, rows.reduce((sum, row) => sum + field(row)[stage], 0)
  ]));
  return {
    evidence: [
      await pin(lane + "/corner-dependencies-replay.json"), await pin(archivePath), ...memory.pins
    ],
    work: { fresh: work(row => row.freshWork), reused: work(row => row.reused.work) },
    rows
  };
}

async function transfer(memory) {
  const evidence = [];
  const contextDrift = [];
  async function saved(relative) {
    const path = lane + "/" + relative;
    evidence.push(await pin(path));
    return read(resolve(root, path));
  }
  async function archive(dir) {
    const receipt = await saved(dir + "/replay.json");
    for (const expected of receipt.localPins ?? receipt.inputs) {
      const current = await pin(expected.path);
      // The old detector replay also pinned the agent's navigation guide.
      // Its hash is provenance for discovery, independent of numeric replay.
      if (dir === "fresh-agent-detector" && expected.path === lane + "/README.md" &&
          current.sha256 !== expected.sha256) {
        contextDrift.push({ expected, current });
      } else {
        assert.deepEqual(current, expected);
      }
    }
    return receipt;
  }

  const heliumReference = await saved("az-127-helium-replay.json");
  const { plans, ...helium } = await saved("az-127-helium.json");
  const calcium = await archive("fresh-agent-calcium");
  const branch = await archive("fresh-agent-iron57");
  const detector = await archive("fresh-agent-detector");
  const budgets = await archive("fresh-agent-run-budget");
  const robust = await archive("fresh-agent-calibration-box");
  const nominalBart = await saved("fresh-agent-run-budget/bart.json");
  const detectorQuestion = {
    ...nominalBart,
    id: nominalBart.id + "/single-preparation",
    question: "What is the probability of one true registration in a single preparation?",
    targetType: memory.producers.get(nominalBart.targetType)[0].operation.inputType
  };
  const nominalReference = budgets.runs.BART.composed.stdout;
  const probes = [
    ["helium survival", helium, heliumReference.withLesson, 1],
    ["calcium survival", await saved("fresh-agent-calcium/free.json"), calcium.freeWithOperation, 1],
    ["calcium driven", await saved("fresh-agent-calcium/quench.json"), calcium.quenchWithOperation, 0],
    ["iron-57 branch", await saved("fresh-agent-iron57/iron57.json"), branch.runs.composed.stdout, 2],
    ["BART robust budget", await saved("fresh-agent-calibration-box/bart.json"), robust.runs.BART.composed.stdout, 5],
    ["BART detector", await saved("fresh-agent-detector/bart.json"), detector.runs.BART.composed.stdout, 3],
    ["LORAX detector", await saved("fresh-agent-detector/lorax.json"), detector.runs.LORAX.composed.stdout, 3],
    ["BART single-preparation sub-question", detectorQuestion, nominalReference.perTrial, 3],
    ["BART nominal budget", nominalBart, nominalReference, 4],
    ["LORAX nominal budget", await saved("fresh-agent-run-budget/lorax.json"), budgets.runs.LORAX.composed.stdout, 4]
  ];
  const cache = createCache();
  const rows = [];
  for (const [label, example, reference, stages] of probes) {
    const result = await plan(example, memory, cache);
    const uncached = await plan(example, memory);
    assert.deepEqual({ ...result, work: uncached.work }, uncached, label);
    assert.equal(result.discovered?.length ?? 0, stages, label);
    assert.equal(result.suppliedRoutes, 0);
    if (stages === 0) {
      assert.equal(reference.status, "operation-inapplicable");
      assert.equal(result.reason, "survival");
      assert.deepEqual(result.work, { exits: 0, branches: 0, registrations: 0 });
    } else {
      assert.equal(result.status, reference.status);
      if (reference.discovered) assert.deepEqual(result.discovered, reference.discovered);
      if (stages <= 3) assert.equal(result.probability, reference.probability);
      else if (stages === 4) {
        const { status, probability, minimumTrials, chanceAtMinimum, chanceOneFewer } = result;
        assert.deepEqual({ status, probability, minimumTrials, chanceAtMinimum, chanceOneFewer }, expectedBudget(reference));
      } else {
        assert.deepEqual(result.bound, expectedBudget(reference.bound));
        assert.deepEqual(result.nominal, expectedBudget(reference.nominal));
      }
    }
    rows.push({ label, factsSha256: hash(JSON.stringify(example)), stages, result, freshWork: uncached.work });
  }
  const row = label => rows.find(entry => entry.label === label);
  assert.equal(row("BART detector").result.work.branches, 0);
  assert.equal(row("BART nominal budget").result.work.registrations, 0);
  assert.equal(row("LORAX nominal budget").result.work.registrations, 1);
  const omitted = { ...memory, producers: new Map(memory.producers) };
  omitted.producers.delete(detectorQuestion.targetType);
  const disconnected = await plan(nominalBart, omitted, cache);
  assert.equal(disconnected.status, "target-inapplicable");
  assert.deepEqual(disconnected.work, { exits: 0, branches: 0, registrations: 0 });
  assert.equal((await plan(helium, omitted, cache)).status, "executed");
  return {
    evidence: [...evidence, ...memory.pins],
    contextDrift,
    operation: {
      sourceTypes: [memory.inputType, memory.halfLifeInput],
      discovery: "Walk backward from the requested output through each producer's declared input type.",
      limits: "Installed kernels for the constant-hazard, absorbing-branch, matched calibration, independent-trials, and endpoint-box operations. The execution path admits each case before consulting numeric caches."
    },
    omission: { removedProducerFor: detectorQuestion.targetType, disconnected, heliumStillExecutes: true },
    rows
  };
}

async function timingRoutes(memory) {
  const families = [
    ["fresh-agent-iron57", "iron57.json", receipt => receipt.runs.composed.stdout],
    ["fresh-agent-calibration-box", "bart.json", receipt => receipt.runs.BART.composed.stdout]
  ];
  const evidence = [];
  const rows = [];
  for (const [family, file, recorded] of families) {
    const directory = lane + "/" + family;
    const replayPath = directory + "/replay.json";
    const factsPath = directory + "/" + file;
    const archived = await read(resolve(root, replayPath));
    for (const expected of archived.localPins) assert.deepEqual(await pin(expected.path), expected);
    evidence.push(await pin(replayPath), await pin(factsPath));
    const original = await read(resolve(root, factsPath));
    const { lifetime, ...inputs } = original.facts;
    const half = lifetime.measuredPopulationHalfLife ?? lifetime.evaluatedPopulationHalfLife;
    const populationHalfLife = { ...half, type: memory.halfLifeInput, source: lifetime.source };
    const mean = { ...original, facts: { ...inputs, lifetime } };
    const halfOnly = { ...original, facts: { ...inputs, populationHalfLife } };
    const both = { ...original, facts: { ...inputs, lifetime, populationHalfLife } };
    const conflicting = {
      ...both, facts: { ...both.facts, populationHalfLife: { ...populationHalfLife, nanoseconds: half.nanoseconds * 1.1 } }
    };
    const neither = { ...original, facts: { ...inputs, populationHalfLife: { ...populationHalfLife, type: "branch-half-life" } } };
    const cache = createCache();
    const reference = recorded(archived);
    const entry = discover(original.targetType, memory).map(chain => chain[0].id);
    assert.equal(entry.length, 2);
    const [direct, converted] = entry;
    for (const [name, input, status, routes, selected] of [
      ["mean lifetime", mean, "executed", 1, direct],
      ["population half-life", halfOnly, "executed", 1, converted],
      ["equivalent measurements", both, "executed", 2, direct],
      ["conflicting measurements", conflicting, "conflicting-timing-evidence", 2, undefined],
      ["neither input fits", neither, "no-complete-chain", 0, undefined]
    ]) {
      const result = await plan(input, memory, cache);
      assert.equal(result.status, status);
      assert.equal(result.suppliedRoutes, 0);
      if (result.timingEvidence) {
        assert.equal(result.timingEvidence.admitted.length, routes);
        assert.equal(result.timingEvidence.selected, selected);
      }
      if (status === "executed") {
        assert.equal(result.discovered[0], selected);
        if (reference.bound) assert.deepEqual(result.bound, expectedBudget(reference.bound));
        else assert.equal(result.probability, reference.probability);
      }
      if (name !== "mean lifetime") assert.deepEqual(result.work, { exits: 0, branches: 0, registrations: 0 });
      rows.push({ family, probe: name, factsSha256: hash(JSON.stringify(input)), result });
    }
  }
  return {
    evidence: [...evidence, ...memory.pins],
    choice: "When both representations are valid and numerically equivalent, retain both timing routes and use the recorded mean lifetime for evaluation. Refuse conflicting values before computing a probability.",
    rows
  };
}

async function returnRoutes(memory) {
  const calibrationPath = lane + "/return-path-delft-calibration.json";
  const measuredPath = lane + "/return-path-delft-thinning-result.json";
  const [calibration, measured] = await Promise.all([calibrationPath, measuredPath].map(path => read(resolve(root, path))));
  const fit = calibration.ratesByStartingLevel[0];
  const sampledChain = {
    type: sampledChainType, context: calibration.evidenceFamily, source: calibrationPath,
    decoder: "frozen-five-native-sample-IQ-decoder",
    periodSeconds: calibration.binnedSamplePeriodSeconds,
    lowToHigh: fit.sampledLowToHigh, highToLow: fit.sampledHighToLow
  };
  assert.equal(measured.evidenceFamily, sampledChain.context);
  assert.equal(measured.calibration.sha256, calibration.acquisition.sha256);
  assert.equal(measured.windowSteps * sampledChain.periodSeconds, measured.windowSeconds);
  const cache = createCache();
  const rows = [];
  const endpoint = "changed-endpoint-probability";
  const first = "first-observed-exit-probability";
  function factsOnly(replicate, startLevel, stride, output) {
    return {
      id: `Delft-repeat-${replicate}-level-${startLevel}-stride-${stride}/${output}`,
      source: calibrationPath, targetType: output,
      facts: {
        sampledChain, acquisition: { context: sampledChain.context, decoder: sampledChain.decoder },
        eventType: output === endpoint ? "changed-state-at-readout" : "first-observed-exit",
        startLevel, windowSteps: measured.windowSteps, observationStride: stride
      }
    };
  }
  for (const trace of measured.scoreTraces.filter(row => measured.newScoreReplicateIndices.includes(row.acquisition.replicateIndex))) {
    const replicate = trace.acquisition.replicateIndex;
    for (const level of trace.byStartingLevel) {
      for (const grid of level.grids) {
        const prediction = grid.predictions.find(row => row.fitLag === 1);
        for (const [output, observed, previous] of [
          [endpoint, level.changedEndpoint, prediction.changedEndpoint],
          [first, grid.firstObservedExit, prediction.firstObservedExit]
        ]) {
          const example = factsOnly(replicate, level.initialLevel, grid.stride, output);
          const result = await plan(example, memory, cache);
          const fresh = await plan(example, memory);
          assert.equal(result.status, "executed");
          assert.deepEqual({ ...result, work: fresh.work }, fresh);
          assert.ok(Math.abs(result.probability - previous) <= 64 * Number.EPSILON);
          rows.push({
            replicate, target: output, observed, windows: level.windowCount,
            signedError: result.probability - observed, result, freshWork: fresh.work
          });
        }
      }
    }
  }
  const high = rows.filter(row => row.replicate === measured.newScoreReplicateIndices[0] && row.result.startLevel === 1);
  const ends = high.filter(row => row.target === endpoint);
  assert.equal(new Set(ends.map(row => row.result.probability)).size, 1);
  const paths = high.filter(row => row.target === first);
  assert.ok(paths.find(row => row.result.observationStride === 1).result.probability >
    paths.find(row => row.result.observationStride === 10).result.probability);
  const probes = [
    ["observable substitution", "observable", example => { example.facts.eventType = "first-observed-exit"; }],
    ["incorrect decoder", "sampled-calibration", example => { example.facts.acquisition.decoder = "other"; }],
    ["off-grid endpoint", "observation-grid", example => { example.facts.observationStride = 3; }],
    ["continuous first exit", "target", example => { example.targetType = "continuous-first-exit-probability"; }]
  ];
  const refused = [];
  for (const [label, reason, alter] of probes) {
    const example = factsOnly(measured.newScoreReplicateIndices[0], 1, 1, endpoint);
    alter(example);
    const result = await plan(example, memory, cache);
    assert.equal(result.reason, reason);
    assert.ok(Object.values(result.work).every(count => count === 0));
    refused.push({ label, result });
  }
  const work = field => Object.fromEntries(["transitionEvaluations", "pathEvaluations"].map(key => [
    key, rows.reduce((sum, row) => sum + field(row)[key], 0)
  ]));
  return {
    sources: [await pin(calibrationPath), await pin(measuredPath), await pin(lane + "/sampled-return-learned-operations.json")],
    sampledChain,
    work: { fresh: work(row => row.freshWork), reused: work(row => row.result.work) },
    rows, refused
  };
}

const [command, path, ...extra] = process.argv.slice(2);
const memory = await loadOperations();
let output;
if (command === "replay" && !path) {
  output = await replay(memory);
} else if (command === "transfer" && !path) {
  output = await transfer(memory);
} else if (command === "timing-routes" && !path) {
  output = await timingRoutes(memory);
} else if (command === "return-routes" && !path) {
  output = await returnRoutes(memory);
} else if (command === "plan" && path && extra.length === 0) {
  output = await plan(await read(resolve(path)), memory, createCache());
} else if (command === "stream" && path && extra.length === 0) {
  const files = await read(resolve(path));
  assert.ok(Array.isArray(files) && files.every(file => typeof file === "string"), "Provide an array of facts file paths.");
  const cache = createCache();
  output = [];
  for (const file of files) output.push(await plan(await read(resolve(dirname(resolve(path)), file)), memory, cache));
} else {
  throw new Error("Usage: plan-admitted-budget.mjs plan FACTS | stream FILES | replay | transfer | timing-routes | return-routes");
}
console.log(JSON.stringify(output, null, 2));
