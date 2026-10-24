import fs from "node:fs";
import { pathToFileURL } from "node:url";

const TAU = 2 * Math.PI;
const ROOT6 = Math.sqrt(6);
const DEFAULTS = {
  seed: 137036,
  channelShots: 200000,
  phaseShots: 50000,
  stateShots: 12000,
  recordShots: 10000000,
  eta: 1 / 8,
  visibility: 0.995,
  qubitPhaseError: 0.01,
  qutritPhaseError: -0.015,
  noncentrality: 0,
  model: "binary-character",
};

const parseArgs = (argv) => {
  const values = { ...DEFAULTS, write: false };
  const keys = {
    seed: "seed",
    "channel-shots": "channelShots",
    "phase-shots": "phaseShots",
    "state-shots": "stateShots",
    "record-shots": "recordShots",
    eta: "eta",
    visibility: "visibility",
    "qubit-phase-error": "qubitPhaseError",
    "qutrit-phase-error": "qutritPhaseError",
    noncentrality: "noncentrality",
    model: "model",
  };
  for (const argument of argv) {
    if (argument === "--write") {
      values.write = true;
      continue;
    }
    const match = argument.match(/^--([^=]+)=(.+)$/);
    if (!match || !(match[1] in keys)) throw new Error(`unknown argument: ${argument}`);
    const key = keys[match[1]];
    values[key] = key === "model" ? match[2] : Number(match[2]);
  }
  for (const key of ["channelShots", "phaseShots", "stateShots", "recordShots"]) {
    if (!Number.isInteger(values[key]) || values[key] <= 0) throw new Error(`${key} must be a positive integer`);
  }
  if (!Number.isInteger(values.seed)) throw new Error("seed must be an integer");
  if (values.eta < -1 / 24 || values.eta > 1 / 8) throw new Error("eta must lie in the CP interval [-1/24,1/8]");
  if (!(values.visibility > 0 && values.visibility <= 1)) throw new Error("visibility must lie in (0,1]");
  if (!Object.hasOwn(RECORD_MODELS, values.model)) throw new Error(`unknown record model: ${values.model}`);
  return values;
};

const makeRng = (seed) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const wrapAngle = (value) => mod(value + Math.PI, TAU) - Math.PI;
const points = (prime) =>
  Array.from({ length: prime }, (_, x) =>
    Array.from({ length: prime }, (_, z) => [x, z]),
  ).flat();
const isZero = (point) => point[0] === 0 && point[1] === 0;
const symplectic = ([x, z], [y, w], prime) => mod(z * y - w * x, prime);
const phase = (angle) => ({ re: Math.cos(angle), im: Math.sin(angle) });
const qubitLabels = points(2);
const qutritLabels = points(3);

const unreadProbability = (g, h, eta) =>
  (1 + eta * (4 * Number(isZero(g)) - 1) * (9 * Number(isZero(h)) - 1)) / 36;

const buildUnreadDistribution = (eta) =>
  qubitLabels.flatMap((g) =>
    qutritLabels.map((h) => ({ g, h, probability: unreadProbability(g, h, eta) })),
  );

const sampleCategorical = (distribution, rng) => {
  const draw = rng();
  let cumulative = 0;
  for (let index = 0; index < distribution.length; index += 1) {
    cumulative += distribution[index].probability;
    if (draw < cumulative || index === distribution.length - 1) return index;
  }
  return distribution.length - 1;
};

const measureMean = (expectation, shots, rng) => {
  const probabilityPlus = (1 + expectation) / 2;
  let plus = 0;
  for (let shot = 0; shot < shots; shot += 1) if (rng() < probabilityPlus) plus += 1;
  return { plus, minus: shots - plus, mean: (2 * plus - shots) / shots };
};

const measureComplex = (expected, shots, rng) => ({
  x: measureMean(expected.re, shots, rng),
  y: measureMean(expected.im, shots, rng),
  expected,
});

const runUnreadStage = (settings, rng) => {
  const distribution = buildUnreadDistribution(settings.eta);
  const counts = Array(distribution.length).fill(0);
  for (let shot = 0; shot < settings.channelShots; shot += 1) {
    counts[sampleCategorical(distribution, rng)] += 1;
  }
  const observed = counts.map((count) => count / settings.channelShots);
  const totalVariation = observed.reduce(
    (sum, value, index) => sum + Math.abs(value - distribution[index].probability),
    0,
  ) / 2;
  const estimateEigenvalue = (u, a) => {
    let re = 0;
    let im = 0;
    distribution.forEach(({ g, h }, index) => {
      const angle = TAU * (symplectic(g, u, 2) / 2 + symplectic(h, a, 3) / 3);
      const character = phase(angle);
      re += observed[index] * character.re;
      im += observed[index] * character.im;
    });
    return { re, im };
  };
  const eigenvalues = {
    scalar: estimateEigenvalue([0, 0], [0, 0]),
    qubitLocal: estimateEigenvalue([1, 0], [0, 0]),
    qutritLocal: estimateEigenvalue([0, 0], [1, 0]),
    connected: estimateEigenvalue([1, 0], [1, 0]),
  };
  const passed =
    totalVariation <= 0.02 &&
    Math.hypot(eigenvalues.qubitLocal.re, eigenvalues.qubitLocal.im) <= 0.02 &&
    Math.hypot(eigenvalues.qutritLocal.re, eigenvalues.qutritLocal.im) <= 0.02 &&
    Math.abs(eigenvalues.connected.re - settings.eta) <= 0.02 &&
    Math.abs(eigenvalues.connected.im) <= 0.02;
  return {
    shots: settings.channelShots,
    totalVariation,
    classCounts: {
      identityIdentity: distribution.reduce((sum, item, index) => sum + (isZero(item.g) && isZero(item.h) ? counts[index] : 0), 0),
      identityNonidentity: distribution.reduce((sum, item, index) => sum + (isZero(item.g) && !isZero(item.h) ? counts[index] : 0), 0),
      nonidentityIdentity: distribution.reduce((sum, item, index) => sum + (!isZero(item.g) && isZero(item.h) ? counts[index] : 0), 0),
      nonidentityNonidentity: distribution.reduce((sum, item, index) => sum + (!isZero(item.g) && !isZero(item.h) ? counts[index] : 0), 0),
    },
    eigenvalues,
    passed,
  };
};

const expectedLoopSignal = (angle, loops, visibility) => {
  const magnitude = visibility ** loops;
  return { re: magnitude * Math.cos(loops * angle), im: magnitude * Math.sin(loops * angle) };
};

const runPhaseStage = (settings, rng) => {
  const cases = {
    qubit: Math.PI + settings.qubitPhaseError,
    qutritPlus: (2 * Math.PI) / 3 + settings.qutritPhaseError,
    qutritMinus: (-2 * Math.PI) / 3 - settings.qutritPhaseError,
  };
  const results = {};
  for (const [name, angle] of Object.entries(cases)) {
    const one = measureComplex(expectedLoopSignal(angle, 1, settings.visibility), settings.phaseShots, rng);
    const three = measureComplex(expectedLoopSignal(angle, 3, settings.visibility), settings.phaseShots, rng);
    const measuredOneAngle = Math.atan2(one.y.mean, one.x.mean);
    const measuredThreeAngle = Math.atan2(three.y.mean, three.x.mean);
    results[name] = {
      angle,
      one,
      three,
      phaseClosureResidual: wrapAngle(measuredThreeAngle - 3 * measuredOneAngle),
    };
  }
  const maximumQuadratureError = Math.max(
    ...Object.values(results).flatMap((result) => [
      Math.abs(result.one.x.mean - result.one.expected.re),
      Math.abs(result.one.y.mean - result.one.expected.im),
      Math.abs(result.three.x.mean - result.three.expected.re),
      Math.abs(result.three.y.mean - result.three.expected.im),
    ]),
  );
  const maximumPhaseClosureResidual = Math.max(
    ...Object.values(results).map((result) => Math.abs(result.phaseClosureResidual)),
  );
  const passed =
    maximumQuadratureError <= 0.03 &&
    maximumPhaseClosureResidual <= 0.06 &&
    results.qubit.three.x.mean < -0.9 &&
    results.qutritPlus.three.x.mean > 0.9 &&
    results.qutritMinus.three.x.mean > 0.9;
  return { shotsPerQuadrature: settings.phaseShots, results, maximumQuadratureError, maximumPhaseClosureResidual, passed };
};

const runCentralityStage = (settings, rng) => {
  const offsets = [-1, -0.6, -0.2, 0.2, 0.6, 1];
  const base = expectedLoopSignal((2 * Math.PI) / 3 + settings.qutritPhaseError, 3, settings.visibility).re;
  const preparations = offsets.map((offset, index) => ({
    preparation: index,
    offset,
    measurement: measureMean(Math.max(-1, Math.min(1, base + settings.noncentrality * offset)), settings.stateShots, rng),
  }));
  const means = preparations.map((item) => item.measurement.mean);
  const spread = Math.max(...means) - Math.min(...means);
  return { shotsPerPreparation: settings.stateShots, preparations, spread, threshold: 0.06, passed: spread <= 0.06 };
};

const recordProbability = (bothExchangeMultiplicity) =>
  (79 / ROOT6 + 48 / Math.sqrt(3) + 42 / Math.sqrt(2) + bothExchangeMultiplicity) / 31104;

const RECORD_MODELS = {
  "no-commutator": { multiplicity: 0, probability: recordProbability(0) },
  "binary-character": { multiplicity: 3, probability: recordProbability(3) },
  "phase-complete": { multiplicity: 11, probability: recordProbability(11) },
};

const logLikelihood = (clicks, shots, probability) =>
  clicks * Math.log(probability) + (shots - clicks) * Math.log1p(-probability);

const runRecordStage = (settings, rng) => {
  const trueProbability = RECORD_MODELS[settings.model].probability;
  let clicks = 0;
  for (let shot = 0; shot < settings.recordShots; shot += 1) if (rng() < trueProbability) clicks += 1;
  const observedProbability = clicks / settings.recordShots;
  const likelihoods = Object.fromEntries(
    Object.entries(RECORD_MODELS).map(([name, model]) => [name, logLikelihood(clicks, settings.recordShots, model.probability)]),
  );
  const selectedModel = Object.entries(likelihoods).sort((left, right) => right[1] - left[1])[0][0];
  const standardError = Math.sqrt(observedProbability * (1 - observedProbability) / settings.recordShots);
  const separationFromNoCommutator = (observedProbability - RECORD_MODELS["no-commutator"].probability) / standardError;
  const recoveredInvariant = ROOT6 * observedProbability;
  const passed = selectedModel === "binary-character" && separationFromNoCommutator >= 5;
  return {
    shots: settings.recordShots,
    clicks,
    observedProbability,
    standardError,
    recoveredInvariant,
    selectedModel,
    likelihoods,
    separationFromNoCommutator,
    hypotheses: RECORD_MODELS,
    passed,
  };
};

export const runProtocol = (settings) => {
  const rng = makeRng(settings.seed);
  const exact = {
    recordSpaceDimension: 24 * 36 ** 2,
    activeRecordDimension: 79 + 48 + 42 + 3,
    finiteInvariant: (79 + 48 * Math.sqrt(2) + 42 * Math.sqrt(3) + 3 * ROOT6) / 31104,
    unreadCpInterval: [-1 / 24, 1 / 8],
    character: "chi(z)=z^3",
  };
  const stages = {
    unread: runUnreadStage(settings, rng),
    phase: runPhaseStage(settings, rng),
    centrality: runCentralityStage(settings, rng),
    record: runRecordStage(settings, rng),
  };
  const gates = {
    G0: exact.recordSpaceDimension === 31104 && exact.activeRecordDimension === 172,
    G1: stages.unread.passed,
    G2: stages.phase.maximumQuadratureError <= 0.03,
    G3: stages.phase.passed,
    G4: stages.centrality.passed,
    G5: stages.record.passed,
  };
  const passed = Object.values(gates).every(Boolean);
  return {
    schema: "chain-record-experiment-run/1",
    date: "2026-10-25",
    mode: "seeded Monte Carlo hardware-neutral emulator",
    settings,
    exact,
    stages,
    gates,
    passed,
    verdict: passed
      ? "finite protocol passes; photon-pole interpretation remains outside scope"
      : "one or more preregistered finite-protocol gates fail",
    interpretationBoundary:
      "this run tests the finite channel, character and POVM pipeline; it neither inputs nor derives the fine-structure constant as a photon residue",
  };
};

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const settings = parseArgs(process.argv.slice(2));
  const result = runProtocol(settings);
  if (settings.write) {
    const output = new URL("../evidence/data/chain-record-experiment-run-v1.json", import.meta.url);
    fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
  }
  console.log(JSON.stringify(result));
  if (!result.passed) process.exitCode = 1;
}

export { DEFAULTS, RECORD_MODELS, parseArgs, recordProbability };
