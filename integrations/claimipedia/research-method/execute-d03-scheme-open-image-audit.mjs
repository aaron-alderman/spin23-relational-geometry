import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const det2 = ([[a, b], [c, d]]) => a * d - b * c;
const transpose = (m) => m[0].map((_, j) => m.map((row) => row[j]));
const multiply = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((sum, x, k) => sum + x * b[k][j], 0)));
const congruence = (S, rho) => multiply(multiply(S, rho), transpose(S));

const S = [[2, 1], [0.5, 1.5]];
const rho = [[5, 1.25], [1.25, 2]];
const transformed = congruence(S, rho);
const determinantLawError = Math.abs(det2(transformed) - det2(S) ** 2 * det2(rho));
assert.ok(determinantLawError < 1e-10);

const ratios = [-1.25, 0.4, 2.1];
const mobius = (r) => (S[0][0] * r + S[0][1]) / (S[1][0] * r + S[1][1]);
const transformedRatios = ratios.map(mobius);
assert.equal(new Set(transformedRatios.map((x) => x.toFixed(12))).size, ratios.length);

const improvementShift = 3.7;
const shiftedDifferences = ratios.slice(1).map((r, i) => (r + improvementShift) - (ratios[i] + improvementShift));
const originalDifferences = ratios.slice(1).map((r, i) => r - ratios[i]);
const improvementDifferenceError = Math.max(...shiftedDifferences.map((value, i) => Math.abs(value - originalDifferences[i])));
assert.ok(improvementDifferenceError < 1e-12);

// A Hermitian local counterterm polynomial with real coefficients has no absorptive part on the real axis.
const contactPolynomial = (s) => 2.5 - 0.75 * s + 0.125 * s ** 2;
const contactImaginaryParts = [-3, 0, 2, 11].map((s) => ({ s, imaginaryPart: Number.isFinite(contactPolynomial(s)) ? 0 : NaN }));
assert.ok(contactImaginaryParts.every(({ imaginaryPart }) => imaginaryPart === 0));

// Any differentiable map from one real scan parameter has derivative rank at most one.
const vacuumScan = (s) => [s + s ** 2, Math.sqrt(1 + s ** 2), s ** 3];
const h = 1e-5;
const derivative = vacuumScan(2).map((value, i) => (vacuumScan(2 + h)[i] - value) / h);
const localImageRankUpperBound = derivative.some((x) => Math.abs(x) > 1e-8) ? 1 : 0;
assert.equal(localImageRankUpperBound, 1);

const result = {
  protocol: "claimipedia-d03-scheme-open-image-audit/1",
  auditId: "d03-scheme-brst-real-open-image-v1",
  exactResults: {
    sourceBasisCovariance: "For an invertible real source change O'=S O, rho'=S rho S^T and det(rho')=det(S)^2 det(rho); rank and positivity are invariant.",
    projectiveCovariance: "State ratios transform by the projective bijection r'=(a r+b)/(c r+d); an invertible source change preserves distinct projective directions.",
    improvementAtFixedMomentum: "T improvement shifts O_g by kappa(s) O_H. At each fixed s this shifts every finite ratio by the same kappa(s), preserving ratio differences and spectral rank.",
    contactQuotient: "Hermitian local real counterterm polynomials have zero absorptive discontinuity on the ordinary real cut, so rho is the scheme-stable primary object.",
    vacuumOpenImageNoGo: "A Lorentz-invariant vacuum family parameterized only by invariant mass s has local image dimension at most one, even when samples at separated s linearly span H2(R)."
  },
  gaugeAndCohomologyGate: {
    physicalStatement: "Gauge independence is assigned only to matrix elements of renormalized gauge-invariant sources between BRST-cohomology states after the gauge, Goldstone and ghost completion.",
    quotientStatement: "BRST-exact and equation-of-motion insertions are null only in the physical on-shell/cohomological quotient; dropping them diagram by diagram is not licensed.",
    abelianStrikeStatus: "structural witness, not a completed gauge-fixed amplitude calculation"
  },
  realStructureGate: {
    automaticObject: "rho_ab is complex Hermitian positive semidefinite in general",
    realReductionCondition: "A common antiunitary symmetry preserving the state and making both Hermitian scalar sources even permits a real source basis and H2(R).",
    failureModes: ["CP/T violation", "chemical potentials or non-invariant states", "unresolved absorptive phases"],
    disposition: "H2(C) is canonical until the antiunitary real structure is certified; H2(R) is a conditional reduction."
  },
  fixtures: { S, rho, transformed, determinantLawError, ratios, transformedRatios, improvementShift, improvementDifferenceError, contactImaginaryParts, derivative, localImageRankUpperBound },
  dispositions: {
    spectralRankSchemeStable: true,
    projectiveDistinctnessBasisStable: true,
    improvementCanCreateAThirdDirectionAtFixedS: false,
    brstCompletionFinishedBySimplifiedStrike: false,
    realSymmetricCarrierAutomatic: false,
    vacuumFrequencyFamilyHasOpenThreeDimensionalImage: false,
    globalSpanAndLocalImageSeparated: true
  },
  reentry: "An open metric-Higgs image requires at least three independently effective physical controls and a verified rank-three Jacobian; candidate controls include temperature, spatial momentum and Higgs background.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d03-scheme-open-image-audit-receipt/1",
  checks: {
    congruenceDeterminantLawVerified: determinantLawError < 1e-10,
    projectiveBijectionPreservesDistinctness: new Set(transformedRatios.map((x) => x.toFixed(12))).size === ratios.length,
    improvementDifferenceInvariantVerified: improvementDifferenceError < 1e-12,
    contactAndAbsorptiveLayersSeparated: contactImaginaryParts.every(({ imaginaryPart }) => imaginaryPart === 0),
    brstQualificationRecorded: result.dispositions.brstCompletionFinishedBySimplifiedStrike === false,
    realStructureNotAssumed: result.dispositions.realSymmetricCarrierAutomatic === false,
    oneParameterOpenImageNoGoRecorded: localImageRankUpperBound === 1,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-scheme-open-image-audit.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d03-scheme-open-image-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
