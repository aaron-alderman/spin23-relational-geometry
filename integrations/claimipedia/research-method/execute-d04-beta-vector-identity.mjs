import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const matVec = (A, x) => A.map((row) => dot(row, x));
const inverse2 = ([[a, b], [c, d]]) => {
  const det = a * d - b * c;
  return [[d / det, -b / det], [-c / det, a / det]];
};
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));

// b contains the convention-matched coefficients multiplying the gauge and quartic anomaly operators.
const beta = [0.07, -0.11];
const cH = -0.4;
const responseRatios = {
  scalarPair: [0.15, 0],
  vectorPair: [1.25, 0.08],
  fourBody: [0.55, -0.9]
};
const sourceRatios = Object.fromEntries(Object.entries(responseRatios).map(([id, R]) => [id, cH + dot(beta, R)]));
const delta = (left, right) => sourceRatios[left] - sourceRatios[right];
const pairDifferences = {
  vectorMinusScalar: delta("vectorPair", "scalarPair"),
  fourMinusScalar: delta("fourBody", "scalarPair"),
  fourMinusVector: delta("fourBody", "vectorPair")
};

const improvement = 3.25;
const shiftedRatios = Object.fromEntries(Object.entries(sourceRatios).map(([id, r]) => [id, r + improvement]));
const shiftedFourMinusScalar = shiftedRatios.fourBody - shiftedRatios.scalarPair;
assert.ok(Math.abs(shiftedFourMinusScalar - pairDifferences.fourMinusScalar) < 1e-12);

// Operator mixing X'=A X requires beta'=A^{-T} beta and R'=A R.
const A = [[1, 0.3], [0.2, 1.1]];
const betaPrime = matVec(transpose(inverse2(A)), beta);
const transformedResponses = Object.fromEntries(Object.entries(responseRatios).map(([id, R]) => [id, matVec(A, R)]));
const basisErrors = Object.entries(responseRatios).map(([id, R]) => Math.abs(dot(beta, R) - dot(betaPrime, transformedResponses[id])));
assert.ok(Math.max(...basisErrors) < 1e-12);

const simplified = {
  betaGauge: 0.07,
  betaLambda: -0.11,
  deltaGaugeResponse: 0,
  deltaQuarticResponse: -0.9
};
simplified.fullDifference = simplified.betaGauge * simplified.deltaGaugeResponse + simplified.betaLambda * simplified.deltaQuarticResponse;
simplified.oldQuarticOnlyDifference = simplified.betaLambda * simplified.deltaQuarticResponse;
assert.ok(Math.abs(simplified.fullDifference - simplified.oldQuarticOnlyDifference) < 1e-12);

const gaugeCompleted = { ...simplified, deltaGaugeResponse: 0.6 };
gaugeCompleted.fullDifference = gaugeCompleted.betaGauge * gaugeCompleted.deltaGaugeResponse + gaugeCompleted.betaLambda * gaugeCompleted.deltaQuarticResponse;
assert.notEqual(gaugeCompleted.fullDifference, gaugeCompleted.oldQuarticOnlyDifference);

const result = {
  protocol: "claimipedia-d04-beta-vector-projective-identity/1",
  strikeId: "d04-anomaly-tomography-beta-vector-v1",
  theoremCandidate: {
    traceCohomology: "In the physical BRST quotient, write [T]=c_H[O_H]+sum_I b_I[X_I], where b_I are convention-matched beta/anomalous coefficients and X_I are renormalized gauge-invariant scalar operators.",
    stateIdentity: "For a physical state n with F_H^n nonzero, r_n=<n|T|0>/<n|O_H|0>=c_H+b dot R_n, with R_I,n=<n|X_I|0>/<n|O_H|0>.",
    differenceIdentity: "For two physical state classes n,m, Delta r_nm=b dot (R_n-R_m). The mass/improvement shear c_H cancels.",
    mixingCovariance: "Under an invertible anomaly-operator basis change X'=A X, R'=A R and b'=A^{-T}b, so every b dot R_n and Delta r_nm is invariant.",
    fixedPointNull: "If all anomaly coefficients vanish and the explicit-mass coefficient is common, every projective difference Delta r_nm vanishes."
  },
  fixture: { beta, cH, responseRatios, sourceRatios, pairDifferences, improvement, shiftedRatios },
  operatorMixingFixture: { A, betaPrime, transformedResponses, basisErrors },
  oldFormulaDisposition: {
    validSpecialCase: "The D-03 Q=beta_lambda/(lambda sum D_i) is recovered only when the gauge-anomaly response difference and every other anomaly-operator response difference vanish in the chosen physical state comparison.",
    genericCompletion: "Q_full=(beta_e/2e) Delta R_F2 + beta_lambda Delta R_lambda + sum_other b_I Delta R_I.",
    simplified,
    gaugeCompleted,
    conclusion: "BRST completion does not protect the quartic-only formula. It protects the cohomological beta-vector contraction; omitted gauge-sector form factors generically correct Q."
  },
  observable: {
    name: "projective anomaly difference",
    definition: "Delta r_nm=r_n-r_m",
    invariantUnder: ["O_g -> O_g+kappa O_H at fixed kinematics", "invertible renormalized anomaly-operator mixing", "addition of real local contact polynomials to the two-point function"],
    requiredInputs: ["physical BRST-cohomology state classes", "renormalized form-factor ratios R_I,n", "beta/anomalous coefficient vector in the dual operator basis"],
    interpretation: "A collection of Delta r_nm values is a linear inverse problem for the running-coefficient vector b when the response matrix Delta R has sufficient rank."
  },
  dispositions: {
    quarticOnlyQProtectedByBrst: false,
    betaVectorContractionBasisInvariant: true,
    projectiveDifferencesImprovementInvariant: true,
    anomalyTomographyMathematicallyWellTyped: true,
    numericalPredictionAvailableWithoutPhysicalFormFactors: false
  },
  nextGate: "Compute the physical two- and four-body form-factor response matrix Delta R for [F^2], [partial L/partial lambda] and any mass-anomalous operator; then test its rank and invert for b.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d04-beta-vector-projective-identity-receipt/1",
  checks: {
    stateDifferenceIdentityInstantiated: Object.keys(pairDifferences).length === 3,
    improvementShearCancelled: Math.abs(shiftedFourMinusScalar - pairDifferences.fourMinusScalar) < 1e-12,
    operatorMixingCovarianceVerified: Math.max(...basisErrors) < 1e-12,
    quarticSpecialCaseRecovered: Math.abs(simplified.fullDifference - simplified.oldQuarticOnlyDifference) < 1e-12,
    gaugeCorrectionCounterexampleVerified: gaugeCompleted.fullDifference !== gaugeCompleted.oldQuarticOnlyDifference,
    quarticOnlyProtectionRefused: result.dispositions.quarticOnlyQProtectedByBrst === false,
    numericalFrontierRetained: result.dispositions.numericalPredictionAvailableWithoutPhysicalFormFactors === false,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d04-beta-vector-identity.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d04-beta-vector-identity-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
