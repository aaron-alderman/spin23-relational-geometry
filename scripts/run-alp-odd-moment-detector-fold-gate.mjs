import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/alp-odd-moment-detector-fold-gate-v1.json");

const parameters = {
  backgroundAmplitude: 1.7,
  backgroundSlope: 0.16,
  absorptiveBackground: 0.11,
  widthScale: 0.08,
  analysisHalfWindow: 0.6,
  truthHalfRange: 1.2,
  resolutionSigma: 0.06,
  acceptanceOddSlope: 0.12,
  sourceResidues: [0.24, -0.18, 0.31],
  gridStep: 0.004
};

const range = (lo, hi, step) => Array.from(
  { length: Math.round((hi - lo) / step) + 1 },
  (_, i) => lo + i * step
);
const xs = range(-parameters.truthHalfRange, parameters.truthHalfRange, parameters.gridStep);
const gaussian = (delta, sigma) => Math.exp(-0.5 * (delta / sigma) ** 2) / (Math.sqrt(2 * Math.PI) * sigma);
const complexAbs2 = ([re, im]) => re * re + im * im;

const background = x => [
  parameters.backgroundAmplitude + parameters.backgroundSlope * x,
  parameters.absorptiveBackground
];
const resonance = (x, residue) => {
  const denominator = x * x + parameters.widthScale ** 2;
  return [
    residue * x / denominator,
    -residue * parameters.widthScale / denominator
  ];
};
const truthRate = (x, residue) => {
  const b = background(x);
  const s = resonance(x, residue);
  return complexAbs2([b[0] + s[0], b[1] + s[1]]);
};

const convolve = (truthValues, sigma) => xs.map(y => {
  let sum = 0;
  for (let i = 0; i < xs.length; i++) sum += gaussian(y - xs[i], sigma) * truthValues[i];
  return sum * parameters.gridStep;
});
const acceptance = (x, oddSlope) => 1 + oddSlope * x / parameters.analysisHalfWindow;
const oddMoment = (values, oddSlope = 0) => {
  const center = (xs.length - 1) / 2;
  const halfBins = Math.round(parameters.analysisHalfWindow / parameters.gridStep);
  let sum = 0;
  for (let k = 1; k <= halfBins; k++) {
    const x = k * parameters.gridStep;
    sum += (
      acceptance(x, oddSlope) * values[center + k]
      - acceptance(-x, oddSlope) * values[center - k]
    ) * parameters.gridStep;
  }
  return sum;
};

const componentMoments = (residue, sigma, oddSlope) => {
  const plusTruth = xs.map(x => truthRate(x, residue));
  const minusTruth = xs.map(x => truthRate(x, -residue));
  const zeroTruth = xs.map(x => truthRate(x, 0));
  const fold = values => sigma === 0 ? values : convolve(values, sigma);
  const plus = oddMoment(fold(plusTruth), oddSlope);
  const minus = oddMoment(fold(minusTruth), oddSlope);
  const zero = oddMoment(fold(zeroTruth), oddSlope);
  return {
    plus,
    minus,
    zero,
    sourceOdd: (plus - minus) / 2,
    sourceEven: (plus + minus) / 2,
    sourceEvenLeakageAfterBackgroundSubtraction: (plus + minus) / 2 - zero
  };
};

const referenceResidue = -0.42;
const ideal = componentMoments(referenceResidue, 0, 0);
const symmetricResolution = componentMoments(referenceResidue, parameters.resolutionSigma, 0);
const asymmetricAcceptance = componentMoments(
  referenceResidue,
  parameters.resolutionSigma,
  parameters.acceptanceOddSlope
);
const flatBackgroundTruth = xs.map(() => parameters.backgroundAmplitude ** 2 + parameters.absorptiveBackground ** 2);
const symmetricParityControl = oddMoment(convolve(flatBackgroundTruth, parameters.resolutionSigma), 0);

const values = [-1, 0, 1];
const sourceSettings = [];
for (const cTop of values) for (const cBottom of values) for (const cWeak of values) {
  const c = [cTop, cBottom, cWeak];
  const residue = c.reduce((sum, value, i) => sum + value * parameters.sourceResidues[i], 0);
  const folded = componentMoments(residue, parameters.resolutionSigma, parameters.acceptanceOddSlope);
  sourceSettings.push({ c, residue, oddMoment: folded.plus });
}
const key = c => c.join(",");
const byKey = new Map(sourceSettings.map(row => [key(row.c), row.oddMoment]));
const origin = [0, 0, 0];
const axis = (i, sign) => origin.map((_, j) => j === i ? sign : 0);
const pair = (i, j, si, sj) => origin.map((_, k) => k === i ? si : k === j ? sj : 0);
const get = c => byKey.get(key(c));
const extracted = {
  baseline: get(origin),
  linear: [0, 1, 2].map(i => (get(axis(i, 1)) - get(axis(i, -1))) / 2),
  kernel: Array.from({ length: 3 }, () => Array(3).fill(0))
};
for (let i = 0; i < 3; i++) {
  extracted.kernel[i][i] = (get(axis(i, 1)) + get(axis(i, -1))) / 2 - extracted.baseline;
}
for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
  let contrast = 0;
  for (const si of [-1, 1]) for (const sj of [-1, 1]) contrast += si * sj * get(pair(i, j, si, sj));
  extracted.kernel[i][j] = contrast / 8;
  extracted.kernel[j][i] = contrast / 8;
}
const predict = c => extracted.baseline
  + extracted.linear.reduce((sum, coefficient, i) => sum + coefficient * c[i], 0)
  + c.reduce((sum, ci, i) => sum + c.reduce((inner, cj, j) => inner + ci * extracted.kernel[i][j] * cj, 0), 0);
const heldOut = sourceSettings
  .filter(row => row.c.every(value => value !== 0))
  .map(row => ({ c: row.c, observed: row.oddMoment, predicted: predict(row.c), residual: row.oddMoment - predict(row.c) }));
const maxHeldOutResidual = Math.max(...heldOut.map(row => Math.abs(row.residual)));

const result = {
  schema: "admissibility.alp-odd-moment-detector-fold-gate/1",
  date: "2026-10-25",
  targets: ["OT-047", "OT-048"],
  parent: "AZ-117",
  authority: "synthetic detector-transfer certificate; not a collider forecast or empirical result",
  parameters,
  detectorFold: {
    truthModel: "A(x)=B0+B1*x+i*BI+S/(x+i*gamma)",
    resolution: "normalized symmetric Gaussian convolution in reconstructed x",
    acceptance: "1+alpha*x/L inside the symmetric analysis window",
    ideal,
    symmetricResolution,
    asymmetricAcceptance,
    symmetricParityControl,
    attenuationFromResolution: symmetricResolution.sourceOdd / ideal.sourceOdd,
    conclusions: {
      symmetricResolutionPreservesParity: Math.abs(symmetricParityControl) < 1e-10,
      symmetricResolutionRetainsSignedInterference: Math.sign(symmetricResolution.sourceOdd) === Math.sign(ideal.sourceOdd),
      oddAcceptanceLeaksSourceEvenTerms: Math.abs(asymmetricAcceptance.sourceEvenLeakageAfterBackgroundSubtraction) > 1e-3,
      templateSourceReversalCancelsSourceEvenLeakage: true
    }
  },
  factorialTransfer: {
    settingCount: sourceSettings.length,
    fitSettings: sourceSettings.filter(row => row.c.some(value => value === 0)).length,
    heldOutSettings: heldOut.length,
    responseClass: "fixed linear detector folding of an amplitude linear in three declared source coefficients remains quadratic in those coefficients",
    extracted,
    heldOut,
    maxHeldOutResidual
  },
  experimentSemantics: {
    simulatedSettings: "The 27 signed settings are generator/template evaluations used to identify and validate the response surface.",
    observedWorld: "Collider data provide one unknown physical coefficient point, not 27 experimentally reversible source settings.",
    reversalUse: "S -> -S is an internal template and implementation diagnostic. It can isolate source-odd response in simulation but is not assumed to be a laboratory control.",
    physicalLeakageControl: "Acceptance-odd and background-slope leakage must be constrained with calibrated response, sidebands, control categories and nuisance covariance in the one physical data set."
  },
  verdict: {
    closed: "For the declared toy amplitude and fixed linear detector, symmetric smearing preserves odd parity and the interference sign while attenuating it. Odd acceptance creates an even-to-odd leakage, but the 19-setting quadratic fit still predicts all eight held-out corners to numerical precision.",
    implication: "Detector folding does not by itself invalidate AZ-074. It changes the coefficients and can create nuisance odd moments; a fixed response remains inside the quadratic design, while coupling-dependent widths, selections or migrations must be exposed by held-out failures or modeled explicitly.",
    open: "No source-complete charged-production diphoton helicity amplitude, physical mass window, calibrated response matrix, event covariance or public-data likelihood has been supplied.",
    nextCalculation: "Choose one physical charged-production diphoton channel; generate the gauge-complete continuum and resonant helicity amplitudes in one frozen EFT basis; derive its response matrix and nuisance covariance; then use the 27 templates to predict held-out simulations before fitting the single observed data set."
  }
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, detectorFold: result.detectorFold, factorialTransfer: { ...result.factorialTransfer, heldOut: undefined } }, null, 2));
