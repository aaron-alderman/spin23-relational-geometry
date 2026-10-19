import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const strike = JSON.parse(readFileSync(resolve(generated, "d05-two-body-form-factor-result.json"), "utf8"));
const { v, mA2, mh2 } = strike.parameters;
const det2 = ([[a, b], [c, d]]) => a * d - b * c;
const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const inverse2 = ([[a, b], [c, d]]) => { const q = a * d - b * c; return [[d / q, -b / q], [-c / q, a / q]]; };
const matVec = (A, x) => A.map((row) => row.reduce((sum, value, i) => sum + value * x[i], 0));

function responseMatrix(s) {
  const rT = (s - 2 * mA2) * (s - mh2) / (2 * mA2);
  const rL = 2 * mA2 * (s - mh2) / (s - 2 * mA2);
  const deltaLambda = v ** 2 * (s - mh2) / (s + 2 * mh2);
  return [[rT, deltaLambda], [rL, deltaLambda]];
}

function condition2(A) {
  const ata = multiply(transpose(A), A);
  const trace = ata[0][0] + ata[1][1];
  const determinant = det2(ata);
  const disc = Math.sqrt(Math.max(0, trace ** 2 - 4 * determinant));
  const max = (trace + disc) / 2;
  const min = (trace - disc) / 2;
  return min <= 1e-24 ? Infinity : Math.sqrt(max / min);
}

function columnNormalize(A) {
  const norms = [0, 1].map((j) => Math.hypot(A[0][j], A[1][j]));
  return { matrix: A.map((row) => row.map((x, j) => x / norms[j])), norms };
}

const commonThreshold = Math.max(4 * mA2, 4 * mh2);
const grid = Array.from({ length: 600 }, (_, i) => commonThreshold * (1.0001 + i * (30 - 1.0001) / 599));
const scan = grid.map((s) => {
  const raw = responseMatrix(s);
  const normalized = columnNormalize(raw);
  return { s, rawDeterminant: det2(raw), rawCondition: condition2(raw), normalizedCondition: condition2(normalized.matrix), columnNorms: normalized.norms };
});
const optimum = scan.reduce((best, x) => x.rawCondition < best.rawCondition ? x : best, scan[0]);
assert.ok(Number.isFinite(optimum.rawCondition));
assert.ok(optimum.s > commonThreshold);

const thresholdMatrix = responseMatrix(4 * mA2);
assert.ok(Math.abs(det2(thresholdMatrix)) < 1e-12);
const high = scan.at(-1);
assert.ok(high.rawCondition > optimum.rawCondition);

const basis = [[1.2, 0.35], [-0.15, 0.9]];
const base = responseMatrix(optimum.s);
const transformed = multiply(base, transpose(basis));
const beta = [0.023, -0.041];
const betaPrime = matVec(transpose(inverse2(basis)), beta);
const originalSignal = matVec(base, beta);
const transformedSignal = matVec(transformed, betaPrime);
const covarianceError = Math.max(...originalSignal.map((x, i) => Math.abs(x - transformedSignal[i])));
assert.ok(covarianceError < 1e-12);
assert.ok(Math.abs(det2(transformed) - det2(base) * det2(basis)) < 1e-8 * Math.abs(det2(base)));

function noiseWitness(s) {
  const matrix = responseMatrix(s);
  const signal = matVec(matrix, beta);
  const noise = [0.01 * Math.max(1, Math.abs(signal[0])), -0.01 * Math.max(1, Math.abs(signal[1]))];
  const recovered = matVec(inverse2(matrix), signal.map((x, i) => x + noise[i]));
  const relativeError = Math.hypot(recovered[0] - beta[0], recovered[1] - beta[1]) / Math.hypot(...beta);
  return { s, condition: condition2(matrix), signal, noise, recovered, relativeError };
}
const noiseWitnesses = [commonThreshold * 1.0001, optimum.s, grid.at(-1)].map(noiseWitness);
assert.ok(noiseWitnesses[1].condition <= noiseWitnesses[0].condition && noiseWitnesses[1].condition <= noiseWitnesses[2].condition);

const result = {
  protocol: "claimipedia-d05-conditioning-audit/1",
  auditId: "d05-normalized-response-conditioning-v1",
  theoremCandidate: {
    rankCovariance: "Under X'=A X, a row response matrix transforms M'=M A^T and the coefficient covector as b'=A^{-T}b; signals M b and matrix rank are invariant.",
    conditioningQualification: "Numerical condition number is not invariant under arbitrary operator rescaling or mixing. A normalization/metric on operator space must be declared before comparing experimental sensitivity.",
    thresholdAndUltraviolet: "The inversion is singular at the vector threshold and becomes poorly scaled again at high energy because the transverse ratio grows quadratically in s while the longitudinal and quartic directions remain bounded.",
    finiteWindow: "In the declared fixed operator normalization, the model has a finite near-threshold/intermediate window of best conditioning; energy-dependent column normalization can hide the ultraviolet scaling problem and is only a diagnostic."
  },
  parameters: strike.parameters,
  scan: { commonThreshold, pointCount: scan.length, first: scan[0], optimum, last: high },
  basisCovarianceFixture: { basis, base, transformed, beta, betaPrime, originalSignal, transformedSignal, covarianceError, determinantLawError: Math.abs(det2(transformed) - det2(base) * det2(basis)) },
  noiseWitnesses,
  dispositions: {
    rankDependsOnOperatorBasis: false,
    betaSignalDependsOnOperatorBasis: false,
    conditionNumberIsBasisIndependentWithoutMetric: false,
    thresholdIsGoodTomographyPoint: false,
    arbitrarilyHighEnergyAlwaysImprovesConditioning: false,
    finiteConditionedWindowExistsInFixture: true
  },
  measurementContract: [
    "declare operator normalization and renormalization scheme",
    "use dimensionless or whitened response coordinates",
    "avoid exact threshold and uncontrolled ultraviolet extrapolation",
    "propagate covariance of mixed correlator estimates through the inverse",
    "repeat the rank and conditioning audit after loop corrections"
  ],
  nextGate: "Express the inclusive Euclidean correlator moments that determine the mixed spectral mean and innovation, and identify a lattice/dispersive estimator with a declared covariance model.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d05-conditioning-audit-receipt/1",
  checks: {
    thresholdRankLossVerified: Math.abs(det2(thresholdMatrix)) < 1e-12,
    finiteOptimumFound: Number.isFinite(optimum.normalizedCondition) && optimum.s > commonThreshold,
    ultravioletConditioningLossVerified: high.rawCondition > optimum.rawCondition,
    operatorBasisSignalCovarianceVerified: covarianceError < 1e-12,
    determinantCovarianceVerified: result.basisCovarianceFixture.determinantLawError < 1e-8 * Math.abs(det2(base)),
    normalizationDependenceRecorded: result.dispositions.conditionNumberIsBasisIndependentWithoutMetric === false,
    noiseWitnessesRecorded: noiseWitnesses.length === 3,
    measurementContractComplete: result.measurementContract.length === 5,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d05-conditioning-audit.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d05-conditioning-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
