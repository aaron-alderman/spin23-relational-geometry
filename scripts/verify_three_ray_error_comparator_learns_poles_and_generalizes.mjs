import assert from "node:assert/strict";

const weights = [0.8, 0.65, 0.5];
const targetPoles = [2.4, 3.2, 4.8];
const initialPoles = [4.2, 1.9, 7.0];
const calibrationZ = 0;
const heldOutZ = 1.2;
const rates = [1.0, 1.1, 0.9];
const dt = 0.005;
const steps = 5000;

function channelResponse(weight, pole, z) {
  return weight / (pole - z);
}

const targetCompliance = targetPoles.map((p, i) =>
  channelResponse(weights[i], p, calibrationZ));
let compliance = initialPoles.map((p, i) =>
  channelResponse(weights[i], p, calibrationZ));

function derivative(values) {
  return values.map((value, i) => -rates[i] * (value - targetCompliance[i]));
}

function rk4(values) {
  const k1 = derivative(values);
  const k2 = derivative(values.map((v, i) => v + dt * k1[i] / 2));
  const k3 = derivative(values.map((v, i) => v + dt * k2[i] / 2));
  const k4 = derivative(values.map((v, i) => v + dt * k3[i]));
  return values.map((v, i) => v + dt * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6);
}

function loss(values) {
  return values.reduce((sum, value, i) =>
    sum + (value - targetCompliance[i]) ** 2 / 2, 0);
}

function polesFromCompliance(values) {
  return values.map((value, i) => calibrationZ + weights[i] / value);
}

const rays = [[1, 0], [0, 1], [1, 1]];
function responseMatrix(poles, z) {
  const M = [[0, 0], [0, 0]];
  for (let k = 0; k < 3; k += 1) {
    const coeff = channelResponse(weights[k], poles[k], z);
    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < 2; j += 1) {
        M[i][j] += coeff * rays[k][i] * rays[k][j];
      }
    }
  }
  return M;
}

function frobeniusDifference(A, B) {
  let sum = 0;
  for (let i = 0; i < A.length; i += 1) {
    for (let j = 0; j < A[i].length; j += 1) {
      sum += (A[i][j] - B[i][j]) ** 2;
    }
  }
  return Math.sqrt(sum);
}

const initialLoss = loss(compliance);
const initialHeldOutError = frobeniusDifference(
  responseMatrix(initialPoles, heldOutZ),
  responseMatrix(targetPoles, heldOutZ),
);
let largestLossIncrease = 0;
let previousLoss = initialLoss;
let minimumCompliance = Math.min(...compliance);

for (let step = 0; step < steps; step += 1) {
  compliance = rk4(compliance);
  const currentLoss = loss(compliance);
  largestLossIncrease = Math.max(largestLossIncrease, currentLoss - previousLoss);
  previousLoss = currentLoss;
  minimumCompliance = Math.min(minimumCompliance, ...compliance);
}

const learnedPoles = polesFromCompliance(compliance);
const finalLoss = loss(compliance);
const finalHeldOutError = frobeniusDifference(
  responseMatrix(learnedPoles, heldOutZ),
  responseMatrix(targetPoles, heldOutZ),
);
const maximumPoleError = Math.max(...learnedPoles.map((p, i) => Math.abs(p - targetPoles[i])));

assert.ok(minimumCompliance > 0);
assert.ok(largestLossIncrease < 1e-13);
assert.ok(finalLoss < 1e-18);
assert.ok(maximumPoleError < 1e-8);
assert.ok(finalHeldOutError < initialHeldOutError * 1e-8);

function mismatchedTarget(z) {
  return 0.6 / (2.1 - z) + 0.4 / (5.0 - z);
}
const fittedSinglePole = 1 / mismatchedTarget(calibrationZ);
const mismatchCalibrationError = Math.abs(1 / fittedSinglePole - mismatchedTarget(calibrationZ));
const mismatchHeldOutError = Math.abs(
  1 / (fittedSinglePole - heldOutZ) - mismatchedTarget(heldOutZ),
);
assert.ok(mismatchCalibrationError < 1e-14);
assert.ok(mismatchHeldOutError > 1e-2);

console.log(JSON.stringify({
  initialLoss,
  finalLoss,
  learnedCompliance: compliance,
  targetCompliance,
  learnedPoles,
  targetPoles,
  maximumPoleError,
  minimumPositiveCompliance: minimumCompliance,
  largestLossIncrease,
  initialHeldOutError,
  finalHeldOutError,
  structuralMismatchControl: {
    fittedSinglePole,
    calibrationError: mismatchCalibrationError,
    heldOutError: mismatchHeldOutError,
  },
  verdict: {
    physicalErrorSensitiveUpdate: true,
    retainedParameterLearning: true,
    heldOutGeneralizationWhenModelClassIsCorrect: true,
    calibrationDoesNotValidateModelClass: true,
    consciousnessRequired: false,
  },
}, null, 2));
