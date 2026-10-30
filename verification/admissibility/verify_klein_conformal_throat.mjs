import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-klein-conformal-throat-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const epsilon = evidence.epsilon;
const samples = 16384;
const dx = 2 * Math.PI / samples;

let rawWeightMean = 0;
for (let i = 0; i < samples; i += 1) {
  const x = (i + 0.5) * dx;
  rawWeightMean += Math.exp(2 * epsilon * Math.cos(2 * x));
}
rawWeightMean /= samples;
const c = -0.5 * Math.log(rawWeightMean);

function sigma(x) {
  return c + epsilon * Math.cos(2 * x);
}

function weight(x) {
  return Math.exp(2 * sigma(x));
}

function gaussianCurvature(x) {
  return 4 * epsilon * Math.exp(-2 * sigma(x)) * Math.cos(2 * x);
}

let area = 0;
let integratedCurvature = 0;
let maximumDeckCompatibilityError = 0;
let minimumScale = Number.POSITIVE_INFINITY;
let maximumScale = 0;

for (let i = 0; i < samples; i += 1) {
  const x = (i + 0.5) * dx;
  const w = weight(x);
  area += w * dx * 2 * Math.PI;
  integratedCurvature += gaussianCurvature(x) * w * dx * 2 * Math.PI;
  maximumDeckCompatibilityError = Math.max(
    maximumDeckCompatibilityError,
    Math.abs(sigma(x + Math.PI) - sigma(x)),
  );
  const scale = Math.exp(sigma(x));
  minimumScale = Math.min(minimumScale, scale);
  maximumScale = Math.max(maximumScale, scale);
}

const flatArea = 4 * Math.PI ** 2;
const areaRelativeError = Math.abs(area - flatArea) / flatArea;

const modes = {
  A: {
    value: (x, y) => Math.cos(x) * Math.cos(y),
    gradient2: (x, y) => Math.sin(x) ** 2 * Math.cos(y) ** 2
      + Math.cos(x) ** 2 * Math.sin(y) ** 2,
  },
  A3: {
    value: (x, y) => Math.cos(3 * x) * Math.cos(y),
    gradient2: (x, y) => 9 * Math.sin(3 * x) ** 2 * Math.cos(y) ** 2
      + Math.cos(3 * x) ** 2 * Math.sin(y) ** 2,
  },
  B: {
    value: (x, y) => Math.sin(2 * x) * Math.sin(y),
    gradient2: (x, y) => 4 * Math.cos(2 * x) ** 2 * Math.sin(y) ** 2
      + Math.sin(2 * x) ** 2 * Math.cos(y) ** 2,
  },
  C: {
    value: (_x, y) => Math.cos(2 * y),
    gradient2: (_x, y) => 4 * Math.sin(2 * y) ** 2,
  },
};

function integrate2d(integrand, grid = 512) {
  const step = 2 * Math.PI / grid;
  let sum = 0;
  for (let i = 0; i < grid; i += 1) {
    const x = (i + 0.5) * step;
    for (let j = 0; j < grid; j += 1) {
      const y = (j + 0.5) * step;
      sum += integrand(x, y);
    }
  }
  return sum * step * step;
}

const rayleigh = {};
for (const [name, mode] of Object.entries(modes)) {
  const dirichlet = integrate2d((x, y) => mode.gradient2(x, y));
  const weightedNorm = integrate2d((x, y) => weight(x) * mode.value(x, y) ** 2);
  rayleigh[name] = {
    dirichlet,
    weightedNorm,
    quotient: dirichlet / weightedNorm,
  };
}

function normalizedCrossMass(left, right) {
  const numerator = integrate2d((x, y) => (
    weight(x) * modes[left].value(x, y) * modes[right].value(x, y)
  ));
  const leftNorm = rayleigh[left].weightedNorm;
  const rightNorm = rayleigh[right].weightedNorm;
  return numerator / Math.sqrt(leftNorm * rightNorm);
}

const allowedCrossMassA_A3 = normalizedCrossMass("A", "A3");
const forbiddenCrossMassA_B = normalizedCrossMass("A", "B");
const forbiddenCrossMassA_C = normalizedCrossMass("A", "C");

assert(areaRelativeError <= evidence.thresholds.maximumAreaRelativeError,
  "area normalization failed");
assert(Math.abs(integratedCurvature) <= evidence.thresholds.maximumGaussBonnetResidual,
  "Gauss--Bonnet residual exceeds threshold");
assert(maximumDeckCompatibilityError <= evidence.thresholds.maximumDeckCompatibilityError,
  "throat metric does not descend through the return maps");
assert(Math.abs(forbiddenCrossMassA_B) <= evidence.thresholds.maximumForbiddenCrossMass,
  "throat mixed transverse parity sectors");
assert(Math.abs(forbiddenCrossMassA_C) <= evidence.thresholds.maximumForbiddenCrossMass,
  "throat mixed incompatible transverse harmonics");
assert(Math.abs(allowedCrossMassA_A3) >= evidence.thresholds.minimumAllowedCrossMass,
  "throat failed to couple the allowed axial harmonics");

console.log(JSON.stringify({
  status: "PASS",
  epsilon,
  normalizationConstant: c,
  area,
  areaRelativeError,
  integratedGaussianCurvature: integratedCurvature,
  maximumDeckCompatibilityError,
  linearScaleRatio: maximumScale / minimumScale,
  areaDensityRatio: (maximumScale / minimumScale) ** 2,
  rayleigh,
  crossMass: {
    allowedA_A3: allowedCrossMassA_A3,
    forbiddenA_B: forbiddenCrossMassA_B,
    forbiddenA_C: forbiddenCrossMassA_C
  },
  verdict: "The normalized conformal throat descends to both quotients, preserves total area and Gauss--Bonnet closure, and mixes only symmetry-compatible test modes."
}, null, 2));
