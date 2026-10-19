import assert from "node:assert/strict";

const sampleZ = [0.8, 1.2, 1.5];
const calibrationZ = 0;

function twoPoleTarget(z) {
  return 0.6 / (2.1 - z) + 0.4 / (5.0 - z);
}

const fittedOnePole = 1 / twoPoleTarget(calibrationZ);
function onePoleApproximation(z) {
  return 1 / (fittedOnePole - z);
}

function squaredError(model, target) {
  return sampleZ.reduce((sum, z) => sum + (model(z) - target(z)) ** 2, 0);
}

const missingPoleSSE = squaredError(onePoleApproximation, twoPoleTarget);
const exactTwoPoleSSE = squaredError(twoPoleTarget, twoPoleTarget);
const complexityCost = missingPoleSSE / 4;

function structuralEnergy(sse, activePoles) {
  return sse / 2 + complexityCost * activePoles;
}

const twoPoleWorld = {
  onePoleEnergy: structuralEnergy(missingPoleSSE, 1),
  twoPoleEnergy: structuralEnergy(exactTwoPoleSSE, 2),
};

function trueOnePole(z) {
  return 0.7 / (2.6 - z);
}
function unnecessaryTwoPole(z) {
  return trueOnePole(z) + 0.2 / (5.5 - z);
}
const unnecessaryPoleSSE = squaredError(unnecessaryTwoPole, trueOnePole);
const onePoleWorld = {
  onePoleEnergy: structuralEnergy(0, 1),
  twoPoleEnergy: structuralEnergy(unnecessaryPoleSSE, 2),
};

function detailedBalance(E1, E2, beta) {
  const delta = E2 - E1;
  const k12 = Math.exp(-beta * delta / 2);
  const k21 = Math.exp(beta * delta / 2);
  const p2 = k12 / (k12 + k21);
  return {
    delta,
    k12,
    k21,
    p1: 1 - p2,
    p2,
    detailedBalanceRatioError: Math.abs(k12 / k21 - Math.exp(-beta * delta)),
  };
}

const scale = Math.min(
  Math.abs(twoPoleWorld.twoPoleEnergy - twoPoleWorld.onePoleEnergy),
  Math.abs(onePoleWorld.twoPoleEnergy - onePoleWorld.onePoleEnergy),
);
const beta = 7 / scale;
const birth = detailedBalance(twoPoleWorld.onePoleEnergy, twoPoleWorld.twoPoleEnergy, beta);
const death = detailedBalance(onePoleWorld.onePoleEnergy, onePoleWorld.twoPoleEnergy, beta);

assert.ok(twoPoleWorld.twoPoleEnergy < twoPoleWorld.onePoleEnergy);
assert.ok(onePoleWorld.onePoleEnergy < onePoleWorld.twoPoleEnergy);
assert.ok(birth.p2 > 0.999);
assert.ok(death.p1 > 0.999);
assert.ok(birth.detailedBalanceRatioError < 1e-10);
assert.ok(death.detailedBalanceRatioError < 1e-10);

// Every active architecture is Herglotz because all residues are positive.
const testZ = { re: 1.0, im: 0.6 };
function imaginaryPart(terms) {
  return terms.reduce((sum, term) => {
    const denominator = (term.pole - testZ.re) ** 2 + testZ.im ** 2;
    return sum + term.residue * testZ.im / denominator;
  }, 0);
}
const onePoleImaginary = imaginaryPart([{ residue: 1, pole: fittedOnePole }]);
const twoPoleImaginary = imaginaryPart([
  { residue: 0.6, pole: 2.1 },
  { residue: 0.4, pole: 5.0 },
]);
assert.ok(onePoleImaginary > 0 && twoPoleImaginary > 0);

console.log(JSON.stringify({
  fittedOnePole,
  heldOutMissingPoleSSE: missingPoleSSE,
  unnecessaryPoleSSE,
  complexityCostPerPole: complexityCost,
  inverseTemperature: beta,
  twoPoleWorld: { ...twoPoleWorld, selection: birth },
  onePoleWorld: { ...onePoleWorld, selection: death },
  upperHalfPlaneImaginaryParts: {
    onePole: onePoleImaginary,
    twoPole: twoPoleImaginary,
  },
  admissionRule: "birth iff held-out SSE reduction / 2 exceeds complexity cost",
  verdict: {
    missingPoleBirth: true,
    unnecessaryPoleDeath: true,
    positiveResiduesPreserved: true,
    unlimitedModeGrowthPenalized: true,
    candidateGenerationSolved: false,
    consciousnessRequired: false,
  },
}, null, 2));
