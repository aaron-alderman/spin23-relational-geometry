import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "evidence", "data", "admissibility-trifilar-hardware-ready-config-v1.json");

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gaussian(random) {
  return Math.sqrt(-2 * Math.log(Math.max(random(), 1e-15))) * Math.cos(2 * Math.PI * random());
}

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const scale = (a, value) => C(a.re * value, a.im * value);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const divide = (a, b) => {
  const denominator = b.re ** 2 + b.im ** 2;
  return C((a.re * b.re + a.im * b.im) / denominator,
    (a.im * b.re - a.re * b.im) / denominator);
};

function quantize(value, bits, fullScale) {
  const levels = 2 ** bits - 1;
  const clipped = Math.max(-fullScale, Math.min(fullScale, value));
  return Math.round((clipped + fullScale) * levels / (2 * fullScale))
    * (2 * fullScale) / levels - fullScale;
}

function envelopeLimit(value, settings, carrierHertz) {
  const limit = Math.min(settings.saturationAmplitude,
    settings.slewLimitAmplitudePerSecond / (2 * Math.PI * carrierHertz));
  const magnitude = Math.hypot(value.re, value.im);
  return magnitude > limit ? scale(value, limit / magnitude) : value;
}

function channelTransfer(channel, settings, acquisition, random, driftSamples = 0) {
  const jitter = gaussian(random) * settings.clockJitterSecondsRms;
  const delay = (channel.latencySamples + driftSamples) / acquisition.sampleRateHertz + jitter;
  const angle = channel.phaseDegrees * Math.PI / 180
    - 2 * Math.PI * acquisition.carrierHertz * delay;
  return scale(C(Math.cos(angle), Math.sin(angle)), channel.gain);
}

function observe(value, channel, settings, acquisition, random, driftSamples = 0) {
  const transferred = mul(channelTransfer(channel, settings, acquisition, random, driftSamples),
    envelopeLimit(value, settings, acquisition.carrierHertz));
  return C(
    quantize(transferred.re + gaussian(random) * settings.noiseRms,
      settings.adcBits, settings.fullScale),
    quantize(transferred.im + gaussian(random) * settings.noiseRms,
      settings.adcBits, settings.fullScale),
  );
}

function calibrate(config, settings, random) {
  const tone = C(0.31, 0.17);
  return config.channels.map((channel) => {
    let sum = C();
    for (let sample = 0; sample < config.acquisition.calibrationSamplesPerChannel; sample += 1) {
      sum = add(sum, observe(tone, channel, settings, config.acquisition, random));
    }
    return divide(scale(sum, 1 / config.acquisition.calibrationSamplesPerChannel), tone);
  });
}

function projectReturn(state, latitudeCosine) {
  const s = Math.sqrt(1 - latitudeCosine ** 2);
  const q = [[0, latitudeCosine], [1, 0], [0, -s]];
  const matrix = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => C()));
  for (let output = 0; output < 2; output += 1) for (let input = 0; input < 2; input += 1) {
    for (let channel = 0; channel < 3; channel += 1) {
      matrix[output][input] = add(matrix[output][input], scale(state[channel][input], q[channel][output]));
    }
  }
  return matrix;
}

function matrixMetrics(matrix) {
  const target = [[C(0), C(1)], [C(-1), C(0)]];
  let overlap = C();
  let errorSquared = 0;
  let truthSquared = 0;
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    overlap = add(overlap, mul(C(target[i][j].re, -target[i][j].im), matrix[i][j]));
    errorSquared += (matrix[i][j].re - target[i][j].re) ** 2
      + (matrix[i][j].im - target[i][j].im) ** 2;
    truthSquared += target[i][j].re ** 2 + target[i][j].im ** 2;
  }
  overlap = scale(overlap, 0.5);
  const phase = Math.atan2(overlap.im, overlap.re);
  const phaseCorrection = C(Math.cos(-phase), Math.sin(-phase));
  const corrected = matrix.map((row) => row.map((value) => mul(value, phaseCorrection)));
  return {
    targetOverlap: Math.hypot(overlap.re, overlap.im),
    relativeMatrixError: Math.sqrt(errorSquared / truthSquared),
    returnedAngleDegrees: Math.atan2(
      corrected[1][0].re - corrected[0][1].re,
      corrected[0][0].re + corrected[1][1].re,
    ) * 180 / Math.PI,
  };
}

function averageMatrices(matrices) {
  const output = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => C()));
  for (const matrix of matrices) for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    output[i][j] = add(output[i][j], scale(matrix[i][j], 1 / matrices.length));
  }
  return output;
}

function serialize(matrix) {
  return {
    real: matrix.map((row) => row.map((value) => value.re)),
    imaginary: matrix.map((row) => row.map((value) => value.im)),
  };
}

function deserialize(serialized) {
  return serialized.real.map((row, i) =>
    row.map((value, j) => C(value, serialized.imaginary[i][j])));
}

function relativeError(left, right) {
  let difference = 0;
  let reference = 0;
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    difference += (left[i][j].re - right[i][j].re) ** 2
      + (left[i][j].im - right[i][j].im) ** 2;
    reference += right[i][j].re ** 2 + right[i][j].im ** 2;
  }
  return Math.sqrt(difference / reference);
}

function runStress(config, sourceRun, latitudeCosine, stress, random, rawRows) {
  const settings = { ...config.baseline, ...stress };
  const gains = calibrate(config, settings, random);
  const truth = sourceRun.finalState.real.map((row, i) =>
    row.map((value, j) => C(value, sourceRun.finalState.imaginary[i][j])));
  const matrices = [];
  for (let trial = 0; trial < config.acquisition.trials; trial += 1) {
    const state = Array.from({ length: 4 }, () => Array(2));
    for (let channel = 0; channel < 4; channel += 1) for (let input = 0; input < 2; input += 1) {
      const measured = observe(truth[channel][input], config.channels[channel], settings,
        config.acquisition, random, settings.latencyDriftSamples[channel] || 0);
      const corrected = settings.calibrated ? divide(measured, gains[channel]) : measured;
      state[channel][input] = corrected;
      if (trial < config.acquisition.rawRowsPerStressCase) rawRows.push([
        stress.name, trial, input, channel,
        truth[channel][input].re, truth[channel][input].im,
        measured.re, measured.im, corrected.re, corrected.im,
      ]);
    }
    matrices.push(projectReturn(state, latitudeCosine));
  }
  const mean = averageMatrices(matrices);
  const sourceReturn = deserialize(sourceRun.returnMatrix);
  const perTrial = matrices.map(matrixMetrics);
  const angleMean = perTrial.reduce((sum, value) => sum + value.returnedAngleDegrees, 0) / perTrial.length;
  const angleStd = Math.sqrt(perTrial.reduce((sum, value) =>
    sum + (value.returnedAngleDegrees - angleMean) ** 2, 0) / perTrial.length);
  return {
    name: stress.name,
    settings,
    estimatedChannelTransfer: gains.map((value) => [value.re, value.im]),
    reconstructedReturn: serialize(mean),
    ...matrixMetrics(mean),
    relativeErrorToSource: relativeError(mean, sourceReturn),
    angleErrorToSourceDegrees: matrixMetrics(mean).returnedAngleDegrees - sourceRun.returnedAngleDegrees,
    trialAngleStdDegrees: angleStd,
  };
}

function csvText(rows) {
  const header = ["stress_case", "trial", "input_basis", "channel", "true_re", "true_im",
    "measured_re", "measured_im", "corrected_re", "corrected_im"];
  return [header, ...rows].map((row) => row.join(",")).join("\n") + "\n";
}

function svgFigure(results) {
  const max = Math.max(...results.map((value) => value.relativeErrorToSource), 0.001);
  const colors = ["#1f6866", "#ad4d34", "#9b6d20", "#6b5b95", "#3f6c91", "#8a4f3d"];
  const rows = results.map((result, index) => {
    const y = 100 + index * 72;
    const length = result.relativeErrorToSource / max * 620;
    return '<text x="30" y="' + (y + 22) + '" font-size="18" fill="#172321">'
      + result.name + '</text><rect x="240" y="' + y + '" width="' + length
      + '" height="28" fill="' + colors[index] + '"/><text x="' + (250 + length)
      + '" y="' + (y + 21) + '" font-size="15" fill="#172321">'
      + result.relativeErrorToSource.toExponential(3) + '</text>';
  }).join("");
  return '<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="580" viewBox="0 0 1100 580">'
    + '<rect width="1100" height="580" fill="#f6f0e6"/><g font-family="system-ui,sans-serif">'
    + '<text x="30" y="45" font-size="26" font-weight="700" fill="#172321">Four-mode acquisition stress audit</text>'
    + '<text x="30" y="72" font-size="16" fill="#5c655f">Relative reconstruction error against the frozen full-model return · deterministic 512-trial record</text>'
    + rows + '</g></svg>\n';
}

export function runHardwareReadyAcquisition(config, sourceResult) {
  const sourceRun = sourceResult.runs.find((run) =>
    run.scenario === config.selectedRun.scenario
    && run.control === config.selectedRun.control
    && run.gapToLoopRate === config.selectedRun.gapToLoopRate);
  if (!sourceRun) throw new Error("selected source run not found");
  const random = mulberry32(config.acquisition.seed);
  const rawRows = [];
  const stressResults = config.stressCases.map((stress) =>
    runStress(config, sourceRun, sourceResult.config.latitudeCosine, stress, random, rawRows));
  return {
    schemaVersion: "admissibility-trifilar-hardware-ready-result-v1",
    configDate: config.date,
    selectedRun: config.selectedRun,
    sourceTruth: {
      returnedAngleDegrees: sourceRun.returnedAngleDegrees,
      rawTargetOverlap: sourceRun.rawTargetOverlap,
      returnMatrix: sourceRun.returnMatrix,
    },
    acquisition: config.acquisition,
    stressResults,
    rawRows,
  };
}

function isMain() {
  return process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}
if (isMain()) {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const source = JSON.parse(fs.readFileSync(path.join(root, config.sourceResult), "utf8"));
  const result = runHardwareReadyAcquisition(config, source);
  if (process.argv.includes("--write")) {
    const saved = { ...result };
    delete saved.rawRows;
    fs.writeFileSync(path.join(root, config.outputs.result), JSON.stringify(saved, null, 2) + "\n");
    fs.writeFileSync(path.join(root, config.outputs.rawCsv), csvText(result.rawRows));
    fs.writeFileSync(path.join(root, config.outputs.figure), svgFigure(result.stressResults));
    console.log(JSON.stringify({
      status: "WROTE",
      stressCases: result.stressResults.length,
      syntheticRawRows: result.rawRows.length,
      outputs: config.outputs,
    }, null, 2));
  } else {
    const saved = { ...result };
    delete saved.rawRows;
    console.log(JSON.stringify(saved, null, 2));
  }
}
