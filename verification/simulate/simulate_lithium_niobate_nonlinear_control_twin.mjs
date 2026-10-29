import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const configPath = path.join(root, "corpus", "programmes", "common-operator-atlas", "lithium_niobate_nonlinear_twin_v1.json");
const outputPath = path.join(root, "evidence", "data", "lithium-niobate-nonlinear-control-twin-v1.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
const rms = (values) => Math.sqrt(mean(values.map((value) => value * value)));
const lagOne = (values) => {
  const centre = mean(values);
  let numerator = 0;
  let denominator = 0;
  for (let index = 1; index < values.length; index += 1) numerator += (values[index] - centre) * (values[index - 1] - centre);
  for (const value of values) denominator += (value - centre) ** 2;
  return denominator === 0 ? 0 : numerator / denominator;
};

const complex = (re = 0, im = 0) => ({ re, im });
const cadd = (a, b) => complex(a.re + b.re, a.im + b.im);
const cmul = (a, b) => complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cscale = (a, scale) => complex(a.re * scale, a.im * scale);
const cconj = (a) => complex(a.re, -a.im);
const cabs2 = (a) => a.re * a.re + a.im * a.im;
const cexp = (phase) => complex(Math.cos(phase), Math.sin(phase));

const makeRng = (seed) => {
  let state = seed >>> 0;
  const uniform = () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return (state + 0.5) / 4294967296;
  };
  const normal = () => Math.sqrt(-2 * Math.log(Math.max(uniform(), 1e-12))) * Math.cos(2 * Math.PI * uniform());
  return { uniform, normal };
};

const mergeParameters = (overrides) => ({ ...config.baseParameters, ...overrides });

function simulate(parameters, strategy, phaseSign, seed) {
  const rng = makeRng(seed);
  const p = parameters;
  const phases = [0.25, 0.35, 0.45].map((value) => phaseSign * value);
  const coupling = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => complex()));
  const setEdge = (left, right, phase) => {
    coupling[left][right] = cscale(cexp(phase), p.couplingMagnitude);
    coupling[right][left] = cconj(coupling[left][right]);
  };
  setEdge(0, 1, phases[0]);
  setEdge(1, 2, phases[1]);
  setEdge(2, 0, phases[2]);

  let modes = [complex(), complex(), complex()];
  let thermal = 0;
  let photorefractive = 0;
  let estimate = 0;
  let estimateVariance = 0.08;
  let augmentedEstimate = [0, 0, 0];
  let augmentedCovariance = [[0.08, 0, 0], [0, 0.08, 0], [0, 0, 0.08]];
  let previousEstimate = 0;
  let integral = 0;
  let requested = 0;
  const commandQueue = Array(p.commandDelaySteps + 1).fill(0);
  const retained = { lock: [], innovation: [], science: [], command: [], requested: [], clipping: 0, saturation: 0 };

  for (let step = 0; step < p.steps; step += 1) {
    const time = step * p.dt;
    const intensity = modes.reduce((sum, mode) => sum + cabs2(mode), 0);
    const noiseScale = p.processNoise * (1 + 0.25 * Math.sqrt(intensity));
    thermal += p.dt * (-thermal / p.thermalTime + p.thermalDrive * intensity) + Math.sqrt(p.dt) * noiseScale * rng.normal();
    photorefractive += p.dt * (-photorefractive / p.photorefractiveTime + p.photorefractiveDrive * intensity / (1 + intensity / p.photorefractiveSaturationIntensity)) + Math.sqrt(p.dt) * noiseScale * 0.7 * rng.normal();
    const externalDrift = 0.16 * Math.sin(0.047 * time) + 0.07 * Math.sin(0.013 * time + 0.4);
    const nuisance = p.thermalCoefficient * thermal + p.photorefractiveCoefficient * photorefractive + externalDrift;
    const applied = commandQueue.shift();
    commandQueue.push(requested);
    const residualDetuning = nuisance + applied;

    const unclippedMeasurement = residualDetuning + p.detectorCubic * residualDetuning ** 3 + p.detectorNoise * rng.normal();
    const measurement = clamp(unclippedMeasurement, -p.detectorClip, p.detectorClip);
    if (measurement !== unclippedMeasurement) retained.clipping += 1;

    estimateVariance += p.estimatorProcessVariance;
    let innovation;
    if (strategy === "augmented_memory_ekf_pi") {
      const transition = [1 - p.dt / p.thermalTime, 1 - p.dt / p.photorefractiveTime, 1];
      augmentedEstimate = [
        transition[0] * augmentedEstimate[0] + p.dt * p.thermalDrive * intensity,
        transition[1] * augmentedEstimate[1] + p.dt * p.photorefractiveDrive * intensity / (1 + intensity / p.photorefractiveSaturationIntensity),
        augmentedEstimate[2]
      ];
      augmentedCovariance = augmentedCovariance.map((row, i) => row.map((value, j) => value * transition[i] * transition[j]));
      for (let index = 0; index < 3; index += 1) augmentedCovariance[index][index] += p.estimatorProcessVariance * (index === 2 ? 1 : 0.25);
      const predictedNuisance = p.thermalCoefficient * augmentedEstimate[0] + p.photorefractiveCoefficient * augmentedEstimate[1] + augmentedEstimate[2];
      const predictedResidual = predictedNuisance + applied;
      const predictedMeasurement = predictedResidual + p.detectorCubic * predictedResidual ** 3;
      const detectorDerivative = 1 + 3 * p.detectorCubic * predictedResidual ** 2;
      const H = [p.thermalCoefficient, p.photorefractiveCoefficient, 1].map((value) => detectorDerivative * value);
      const projected = augmentedCovariance.map((row) => row.reduce((sum, value, index) => sum + value * H[index], 0));
      const innovationVariance = H.reduce((sum, value, index) => sum + value * projected[index], p.estimatorMeasurementVariance);
      const gain = projected.map((value) => value / innovationVariance);
      innovation = measurement - predictedMeasurement;
      augmentedEstimate = augmentedEstimate.map((value, index) => value + gain[index] * innovation);
      const nextCovariance = augmentedCovariance.map((row, i) => row.map((value, j) => value - gain[i] * H.reduce((sum, h, k) => sum + h * augmentedCovariance[k][j], 0)));
      augmentedCovariance = nextCovariance.map((row, i) => row.map((value, j) => (value + nextCovariance[j][i]) / 2));
      estimate = p.thermalCoefficient * augmentedEstimate[0] + p.photorefractiveCoefficient * augmentedEstimate[1] + augmentedEstimate[2];
    } else if (strategy === "linear_kalman_pi") {
      innovation = measurement - applied - estimate;
      const gain = estimateVariance / (estimateVariance + p.estimatorMeasurementVariance);
      estimate += gain * innovation;
      estimateVariance = (1 - gain) * estimateVariance;
    } else {
      const predictedResidual = estimate + applied;
      const predictedMeasurement = predictedResidual + p.detectorCubic * predictedResidual ** 3;
      const derivative = 1 + 3 * p.detectorCubic * predictedResidual ** 2;
      innovation = measurement - predictedMeasurement;
      const innovationVariance = derivative * derivative * estimateVariance + p.estimatorMeasurementVariance;
      const gain = estimateVariance * derivative / innovationVariance;
      estimate += gain * innovation;
      estimateVariance = Math.max(1e-12, (1 - gain * derivative) * estimateVariance);
    }

    const error = -estimate;
    let raw;
    if (strategy === "extended_kalman_constrained_predictive") {
      const estimatedVelocity = (estimate - previousEstimate) / p.dt;
      const forecast = estimate + p.commandDelaySteps * p.dt * estimatedVelocity;
      raw = -forecast / 1.08;
    } else {
      raw = p.proportionalGain * error + p.integralGain * integral;
    }
    const magnitudeLimited = clamp(raw, -p.commandLimit, p.commandLimit);
    requested = clamp(magnitudeLimited, requested - p.commandSlew, requested + p.commandSlew);
    if (Math.abs(requested - raw) > 1e-12) retained.saturation += 1;
    if (strategy !== "extended_kalman_constrained_predictive") integral += p.dt * (error + p.antiWindupGain * (requested - raw));
    previousEstimate = estimate;

    const nextModes = [];
    for (let modeIndex = 0; modeIndex < 3; modeIndex += 1) {
      const localDetuning = p.bareDetunings[modeIndex] + residualDetuning + p.kerr * cabs2(modes[modeIndex]);
      let derivative = cmul(complex(-p.linewidths[modeIndex] / 2, localDetuning), modes[modeIndex]);
      for (let other = 0; other < 3; other += 1) {
        if (other === modeIndex) continue;
        derivative = cadd(derivative, cmul(complex(0, -1), cmul(coupling[modeIndex][other], modes[other])));
      }
      if (modeIndex === 0) derivative = cadd(derivative, complex(p.driveAmplitude, 0));
      const modalNoise = complex(noiseScale * rng.normal(), noiseScale * rng.normal());
      nextModes.push(cadd(modes[modeIndex], cadd(cscale(derivative, p.dt), cscale(modalNoise, Math.sqrt(p.dt)))));
    }
    modes = nextModes;

    let circulatingRecord = 0;
    const edges = [[0, 1, phases[0]], [1, 2, phases[1]], [2, 0, phases[2]]];
    for (const [left, right, phase] of edges) {
      const relation = cmul(cmul(cconj(modes[left]), cexp(phase)), modes[right]);
      circulatingRecord += 2 * p.couplingMagnitude * relation.im;
    }

    if (step >= p.burnIn) {
      retained.lock.push(residualDetuning);
      retained.innovation.push(innovation);
      retained.science.push(circulatingRecord);
      retained.command.push(applied);
      retained.requested.push(raw);
    }
  }

  return {
    lockRms: rms(retained.lock),
    innovationRms: rms(retained.innovation),
    innovationMean: mean(retained.innovation),
    innovationLagOne: lagOne(retained.innovation),
    scienceMean: mean(retained.science),
    scienceRms: rms(retained.science),
    commandRms: rms(retained.command),
    saturationFraction: retained.saturation / p.steps,
    clippingFraction: retained.clipping / p.steps,
    finalEstimate: estimate,
    finite: [estimate, estimateVariance, thermal, photorefractive, ...modes.flatMap((mode) => [mode.re, mode.im])].every(Number.isFinite)
  };
}

const results = [];
for (let scenarioIndex = 0; scenarioIndex < config.scenarios.length; scenarioIndex += 1) {
  const scenario = config.scenarios[scenarioIndex];
  const parameters = mergeParameters(scenario.overrides);
  for (let strategyIndex = 0; strategyIndex < config.strategies.length; strategyIndex += 1) {
    const strategy = config.strategies[strategyIndex];
    const seed = 9271 + 1000 * scenarioIndex + 37 * strategyIndex;
    const positive = simulate(parameters, strategy, 1, seed);
    const negative = simulate(parameters, strategy, -1, seed);
    results.push({
      scenario: scenario.id,
      strategy,
      positive,
      negative,
      pair: {
        lockRms: (positive.lockRms + negative.lockRms) / 2,
        innovationRms: (positive.innovationRms + negative.innovationRms) / 2,
        innovationBiasMagnitude: (Math.abs(positive.innovationMean) + Math.abs(negative.innovationMean)) / 2,
        innovationLagMagnitude: (Math.abs(positive.innovationLagOne) + Math.abs(negative.innovationLagOne)) / 2,
        orientationOdd: (positive.scienceMean - negative.scienceMean) / 2,
        orientationEven: (positive.scienceMean + negative.scienceMean) / 2,
        saturationFraction: (positive.saturationFraction + negative.saturationFraction) / 2,
        clippingFraction: (positive.clippingFraction + negative.clippingFraction) / 2
      }
    });
  }
}

const byScenario = Object.fromEntries(config.scenarios.map((scenario) => {
  const rows = results.filter((result) => result.scenario === scenario.id);
  const ranked = [...rows].sort((left, right) => left.pair.lockRms - right.pair.lockRms);
  return [scenario.id, {
    lowestLockRms: ranked[0].strategy,
    ranking: ranked.map((row) => ({ strategy: row.strategy, lockRms: row.pair.lockRms })),
    allOrientationOddRetained: rows.every((row) => Math.abs(row.pair.orientationOdd) >= config.softwareAcceptance.minimumOrientationOddMagnitude)
  }];
}));

assert(results.every((result) => result.positive.finite && result.negative.finite), "non-finite twin state");
assert(config.softwareAcceptance.scienceChannelMayEnterController === false, "science/control firewall drifted");
const nominalBest = Math.min(...results.filter((result) => result.scenario === "nominal").map((result) => result.pair.lockRms));
assert(nominalBest <= config.softwareAcceptance.nominalMaximumLockRms, `nominal lock RMS ${nominalBest} exceeds software limit`);
assert(Object.values(byScenario).every((scenario) => scenario.allOrientationOddRetained), "orientation-odd science record was erased");
const nonlinearLinear = results.find((result) => result.scenario === "strong_nonlinearity" && result.strategy === "linear_kalman_pi");
const nonlinearExtended = results.find((result) => result.scenario === "strong_nonlinearity" && result.strategy === "extended_kalman_pi");
assert(nonlinearExtended.pair.innovationBiasMagnitude < nonlinearLinear.pair.innovationBiasMagnitude, "nonlinear scenario did not expose linear-estimator bias cost");
const slowScalar = results.find((result) => result.scenario === "slow_memory" && result.strategy === "extended_kalman_pi");
const slowAugmented = results.find((result) => result.scenario === "slow_memory" && result.strategy === "augmented_memory_ekf_pi");
assert(Number.isFinite(slowAugmented.pair.innovationLagMagnitude), "augmented memory estimator was not exercised");
const memoryAugmentationImprovesLag = slowAugmented.pair.innovationLagMagnitude < slowScalar.pair.innovationLagMagnitude;

const output = {
  schemaVersion: "lithium-niobate-nonlinear-control-twin-result-v1",
  generatedFrom: path.relative(root, configPath).replaceAll("\\", "/"),
  deterministicSeedPolicy: "9271 + 1000*scenarioIndex + 37*strategyIndex; common seed across phase reversal",
  status: "PASS",
  results,
  byScenario,
  strategyAdjudication: {
    nonlinearEkfReducesBias: nonlinearExtended.pair.innovationBiasMagnitude < nonlinearLinear.pair.innovationBiasMagnitude,
    memoryAugmentationImprovesLag,
    memoryResult: memoryAugmentationImprovesLag
      ? "The declared augmented memory state reduced innovation lag in the slow-memory scenario."
      : "The declared augmented memory state did not reduce innovation lag from one scalar lock channel; additional independent readout or a different state/noise model is required."
  },
  conclusions: [
    "No strategy is authorized as a universal winner; rankings are scenario dependent.",
    "The reduced EKF lowers nonlinear innovation bias in the declared strong-nonlinearity case.",
    "Delay, clipping, slow memory and saturation remain visible in retained diagnostics.",
    memoryAugmentationImprovesLag
      ? "Augmented memory state reduced slow-memory innovation correlation in this stress model."
      : "Adding hidden memory coordinates without another informative detector did not whiten innovations; state augmentation alone is not observability.",
    "The orientation-odd science record remains outside feedback and survives every software stress scenario.",
    "Dimensionless success is not a hardware prediction."
  ]
};

if (process.argv.includes("--write")) {
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`WROTE ${path.relative(root, outputPath)}`);
}
console.log(JSON.stringify({ status: output.status, cases: results.length, nominalBest, byScenario, strategyAdjudication: output.strategyAdjudication, conclusions: output.conclusions }, null, 2));
