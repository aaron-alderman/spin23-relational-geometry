import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SEED = 0x50524f43;
const TRAINING_SHOTS = 20000;
const HELD_OUT_SHOTS = 50000;
const G = { C0: 1 / Math.sqrt(2), C: 0.5, E: 0, T: 0 };
const TRUE = { visibility: 0.94, dephasing: 0.97, phaseOffset: 0.08, readoutFlip: 0.015, scheduleVisibility: 0.92 };

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function probability(setting, parameters) {
  const coherence = G[setting.law] ** setting.depth;
  const ideal = 3 / 8 + 0.5 * parameters.visibility * parameters.dephasing ** (setting.depth - 1)
    * coherence * Math.cos(setting.theta + parameters.phaseOffset);
  return parameters.readoutFlip + (1 - 2 * parameters.readoutFlip) * ideal;
}

function binomial(probabilityValue, shots, random) {
  let count = 0;
  for (let i = 0; i < shots; i += 1) count += random() < probabilityValue ? 1 : 0;
  return count;
}

function nll(rows, parameters) {
  return rows.reduce((sum, row) => {
    const p = Math.min(1 - 1e-12, Math.max(1e-12, probability(row, parameters)));
    return sum - row.plus * Math.log(p) - (row.shots - row.plus) * Math.log(1 - p);
  }, 0);
}

function range(start, end, step) {
  const values = [];
  for (let value = start; value <= end + step / 10; value += step) values.push(Number(value.toFixed(12)));
  return values;
}

function fit(rows) {
  let best = null;
  const passes = [
    { visibility: [0.86, 1, 0.02], dephasing: [0.9, 1, 0.02], phaseOffset: [-0.16, 0.16, 0.04], readoutFlip: [0, 0.04, 0.01] },
    { visibility: [-0.025, 0.025, 0.005], dephasing: [-0.025, 0.025, 0.005], phaseOffset: [-0.05, 0.05, 0.01], readoutFlip: [-0.012, 0.012, 0.002] }
  ];
  for (const [passIndex, grid] of passes.entries()) {
    const centre = best?.parameters;
    const values = Object.fromEntries(Object.entries(grid).map(([name, [start, end, step]]) => {
      const offset = passIndex === 0 ? 0 : centre[name];
      return [name, range(start + offset, end + offset, step).filter((value) => name !== "readoutFlip" || (value >= 0 && value <= 0.1))];
    }));
    for (const visibility of values.visibility) for (const dephasing of values.dephasing) {
      for (const phaseOffset of values.phaseOffset) for (const readoutFlip of values.readoutFlip) {
        const parameters = { visibility, dephasing, phaseOffset, readoutFlip };
        const loss = nll(rows, parameters);
        if (!best || loss < best.loss) best = { loss, parameters };
      }
    }
  }
  return best;
}

function zScore(observed, predicted, shots) {
  const variance = Math.max(1e-12, predicted * (1 - predicted) / shots);
  return (observed - predicted) / Math.sqrt(variance);
}

function noisyDistribution(ideal, visibility) {
  const uniform = 1 / ideal.length;
  return ideal.map((value) => visibility * value + (1 - visibility) * uniform);
}

function multinomial(probabilities, shots, random) {
  const cumulative = [];
  let total = 0;
  for (const probabilityValue of probabilities) {
    total += probabilityValue;
    cumulative.push(total);
  }
  const counts = Array(probabilities.length).fill(0);
  for (let shot = 0; shot < shots; shot += 1) {
    const draw = random();
    const index = cumulative.findIndex((cut) => draw < cut);
    counts[index < 0 ? counts.length - 1 : index] += 1;
  }
  return counts;
}

function fitScheduleVisibility(forwardCounts, reverseCounts) {
  const forwardIdeal = [0.5, 0.5, 0];
  const reverseIdeal = [0.5, 0.25, 0.25];
  let best = null;
  for (const visibility of range(0.7, 1, 0.001)) {
    const candidates = [noisyDistribution(forwardIdeal, visibility), noisyDistribution(reverseIdeal, visibility)];
    const counts = [forwardCounts, reverseCounts];
    const loss = counts.reduce((sum, row, order) => sum + row.reduce((subtotal, count, index) => subtotal - count * Math.log(candidates[order][index]), 0), 0);
    if (!best || loss < best.loss) best = { visibility, loss };
  }
  return best;
}

function buildReceipt() {
  const random = mulberry32(SEED);
  const trainingSettings = [
    ["C0", 1, 0], ["C0", 1, Math.PI / 2], ["C0", 1, Math.PI],
    ["C", 1, 0], ["C", 1, Math.PI / 2], ["C", 1, Math.PI],
    ["C0", 2, 0], ["C0", 2, Math.PI / 2], ["C", 2, 0], ["C", 2, Math.PI / 2],
    ["E", 1, 0], ["T", 1, Math.PI]
  ].map(([law, depth, theta]) => ({ law, depth, theta, shots: TRAINING_SHOTS }));
  const training = trainingSettings.map((setting) => {
    const truth = probability(setting, TRUE);
    const plus = binomial(truth, setting.shots, random);
    return { ...setting, plus, frequency: plus / setting.shots, truth };
  });
  const fitted = fit(training);
  const heldOutSettings = [
    ["C0", 1, Math.PI / 3], ["C", 1, 3 * Math.PI / 2],
    ["C0", 3, Math.PI / 3], ["C", 3, Math.PI],
    ["C0", 4, 0], ["C", 4, Math.PI / 2], ["E", 3, Math.PI / 3], ["T", 4, 0]
  ].map(([law, depth, theta]) => ({ law, depth, theta, shots: HELD_OUT_SHOTS }));
  const heldOut = heldOutSettings.map((setting) => {
    const truth = probability(setting, TRUE);
    const plus = binomial(truth, setting.shots, random);
    const observed = plus / setting.shots;
    const predicted = probability(setting, fitted.parameters);
    return { ...setting, plus, observed, predicted, truth, residual: observed - predicted, z: zScore(observed, predicted, setting.shots) };
  });

  const forwardIdeal = [0.5, 0.5, 0];
  const reverseIdeal = [0.5, 0.25, 0.25];
  const forwardCounts = multinomial(noisyDistribution(forwardIdeal, TRUE.scheduleVisibility), TRAINING_SHOTS, random);
  const reverseCounts = multinomial(noisyDistribution(reverseIdeal, TRUE.scheduleVisibility), TRAINING_SHOTS, random);
  const scheduleFit = fitScheduleVisibility(forwardCounts, reverseCounts);
  const schedulePredictions = {
    forward: noisyDistribution(forwardIdeal, scheduleFit.visibility),
    reverse: noisyDistribution(reverseIdeal, scheduleFit.visibility)
  };

  const anomalySetting = { law: "C", depth: 3, theta: Math.PI / 3, shots: HELD_OUT_SHOTS };
  const anomalyBaseline = probability(anomalySetting, TRUE);
  const anomalyTruth = Math.min(1, anomalyBaseline + 0.04);
  const anomalyCount = binomial(anomalyTruth, anomalySetting.shots, random);
  const anomalyObserved = anomalyCount / anomalySetting.shots;
  const anomalyPredicted = probability(anomalySetting, fitted.parameters);
  const anomalyZ = zScore(anomalyObserved, anomalyPredicted, anomalySetting.shots);
  // A single unexpected probability can always be absorbed by an unconstrained
  // setting-specific offset.  We retain that deliberately over-flexible rival
  // as a warning: detecting a residual is not the same as identifying its cause.
  const expandedAlternativeOffset = anomalyObserved - anomalyPredicted;

  return {
    schema: "oph-conventional-process-rival-v1",
    generated: "2026-10-27",
    seed: SEED,
    model: {
      class: "ordinary finite-dimensional quantum instrument with common SPAM, dephasing, phase-reference and schedule-visibility nuisances",
      parameters: ["visibility", "dephasing", "phaseOffset", "readoutFlip", "scheduleVisibility"],
      noPerSettingRefit: true,
      truthUsedOnlyToGenerateSyntheticQualificationData: TRUE
    },
    training: { shotsPerSetting: TRAINING_SHOTS, rows: training },
    fit: { ...fitted, scheduleVisibility: scheduleFit.visibility, scheduleLoss: scheduleFit.loss },
    heldOut: {
      shotsPerSetting: HELD_OUT_SHOTS,
      rows: heldOut,
      maximumAbsoluteZ: Math.max(...heldOut.map(({ z }) => Math.abs(z))),
      passThreshold: 4.5,
      pass: heldOut.every(({ z }) => Math.abs(z) < 4.5)
    },
    schedule: { forwardCounts, reverseCounts, predictions: schedulePredictions, fittedVisibility: scheduleFit.visibility },
    injectedResidualControl: {
      setting: anomalySetting,
      injectedProbabilityShift: 0.04,
      observed: anomalyObserved,
      frozenModelPrediction: anomalyPredicted,
      z: anomalyZ,
      frozenModelRejects: Math.abs(anomalyZ) >= 4.5,
      expandedSettingSpecificOffsetCanAbsorb: Number.isFinite(expandedAlternativeOffset),
      fittedExpandedProbabilityOffset: expandedAlternativeOffset,
      interpretation: "rejection of the frozen nuisance model is an anomaly trigger, not new physics; a freely added setting-specific offset absorbs this single residual and must be replaced by a physically constrained alternative, replication or independent calibration"
    },
    finiteMemoryControl: {
      disjointOrderBiasParameter: "mu",
      exampleMu: 0.02,
      inducedTotalVariation: 0.04,
      interpretation: "a disjoint-order residual is representable by an ordinary finite-memory process tensor; it invalidates the OPH-specific comparison until predicted on held-out schedules"
    },
    decision: {
      conventionalModelPredictsHeldOut: heldOut.every(({ z }) => Math.abs(z) < 4.5),
      injectedResidualDetected: Math.abs(anomalyZ) >= 4.5,
      residualUniquelyIdentifiesNewPhysics: false,
      disposition: "ordinary instrument/process modeling closes the synthetic benchmark; hardware residuals require frozen alternatives, held-out prediction and replication"
    }
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const receipt = buildReceipt();
  const writeIndex = process.argv.indexOf("--write");
  if (writeIndex >= 0) {
    const target = resolve(process.argv[writeIndex + 1] ?? "evidence/data/oph-conventional-process-rival-v1.json");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
    console.log(target);
  } else console.log(JSON.stringify(receipt, null, 2));
}

export { buildReceipt, probability };
