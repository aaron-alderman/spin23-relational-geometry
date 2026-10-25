import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-rotor-native-pendulum-gap-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-rotor-native-pendulum-gap-v1");

const tolerance = 2e-12;
const close = (actual, expected, label) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), label);
};

const eigenvalues = (N, U = 1, u = 1) => {
  const diagonal = Array.from({length: 2 * N + 1}, (_, index) => {
    const momentum = index - N;
    return U * momentum ** 2 / 2 + u;
  });
  const offDiagonal = -u / 2;
  const dimension = diagonal.length;
  const countBelow = (x) => {
    let pivot = diagonal[0] - x;
    let count = pivot < 0 ? 1 : 0;
    for (let i = 1; i < dimension; i += 1) {
      if (Math.abs(pivot) < 1e-14) pivot = pivot < 0 ? -1e-14 : 1e-14;
      pivot = diagonal[i] - x - offDiagonal ** 2 / pivot;
      if (pivot < 0) count += 1;
    }
    return count;
  };
  const lowerBound = Math.min(...diagonal) - u - 1;
  const upperBound = Math.max(...diagonal) + u + 1;
  return Array.from({length: dimension}, (_, k) => {
    let lower = lowerBound;
    let upper = upperBound;
    for (let iteration = 0; iteration < 120; iteration += 1) {
      const midpoint = (lower + upper) / 2;
      if (countBelow(midpoint) <= k) lower = midpoint;
      else upper = midpoint;
    }
    return (lower + upper) / 2;
  });
};

const failureProbability = (spectrum, beta, channels) => {
  const ground = spectrum[0];
  const relativePartition = spectrum.reduce(
    (sum, energy) => sum + Math.exp(-beta * (energy - ground)),
    0
  );
  return 1 - (1 / relativePartition) ** channels;
};
const betaThreshold = (spectrum, channels, target) => {
  let lower = 0;
  let upper = 30;
  for (let iteration = 0; iteration < 80; iteration += 1) {
    const midpoint = (lower + upper) / 2;
    if (failureProbability(spectrum, midpoint, channels) > target) lower = midpoint;
    else upper = midpoint;
  }
  return upper;
};

const calculated = [];
for (const rung of record.cutoffSpectrum) {
  const spectrum = eigenvalues(rung.N);
  const gap = spectrum[1] - spectrum[0];
  const beta = betaThreshold(
    spectrum,
    record.model.channels,
    record.thermalCommissioning.maximumAnyChannelExcitedProbability
  );
  assert.equal(rung.dimension, 2 * rung.N + 1);
  close(rung.groundEnergy, spectrum[0], "ground energy");
  close(rung.firstEnergy, spectrum[1], "first energy");
  close(rung.gap, gap, "gap");
  close(rung.betaEnergyUnitForOnePercent, beta, "thermal beta");
  calculated.push({N: rung.N, spectrum, gap, beta});
}

const reference = calculated.find((item) => item.N === record.convergence.referenceN);
assert.ok(reference);
for (const item of record.convergence.relativeGapErrors) {
  const candidate = calculated.find((entry) => entry.N === item.N);
  close(item.error, Math.abs(candidate.gap - reference.gap) / reference.gap, "relative gap error");
}
close(record.convergence.fixedStrengthGapLimitNumerical, reference.gap, "fixed gap limit");

const thermal = record.thermalCommissioning;
close(thermal.convergedBetaEnergyUnit, reference.beta, "converged beta energy");
close(thermal.convergedBetaGap, reference.beta * reference.gap, "converged beta gap");
const boltzmann = 1.380649e-23;
const planck = 6.62607015e-34;
const temperature = 0.010;
const energyUnitFrequency = reference.beta * boltzmann * temperature / planck / 1e9;
close(thermal.minimumEnergyUnitFrequencyGHzAt10mK, energyUnitFrequency, "energy frequency");
close(thermal.minimumGapFrequencyGHzAt10mK, energyUnitFrequency * reference.gap, "gap frequency");

console.log(JSON.stringify({
  status: "PASS",
  channels: record.model.channels,
  convergedByN: 8,
  convergedGap: reference.gap,
  N4RelativeGapError: record.convergence.relativeGapErrors.find((x) => x.N === 4).error,
  betaEnergyUnitForOnePercent: reference.beta,
  minimumGapFrequencyGHzAt10mK: thermal.minimumGapFrequencyGHzAt10mK,
  boundary: record.boundary
}));
