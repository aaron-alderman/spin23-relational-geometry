import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

// rho is the indicator of sparse intervals I_n centred at 2^-n with width 2^-3n.
// Zero is a Lebesgue point of rho with value zero, but paths aimed into I_n see rho=1.
const intervals = Array.from({ length: 48 }, (_, index) => {
  const n = index + 1;
  const centre = 2 ** (-n);
  const width = 2 ** (-3 * n);
  return { n, centre, width, left: centre - width / 2, right: centre + width / 2 };
});

const poissonIntegral = (x, y) => intervals.reduce(
  (sum, { left, right }) => sum + Math.atan((right - x) / y) - Math.atan((left - x) / y),
  0
);
const conjugatePoissonIntegral = (x, y) => intervals.reduce(
  (sum, { left, right }) => sum + 0.5 * Math.log(((right - x) ** 2 + y ** 2) / ((left - x) ** 2 + y ** 2)),
  0
);

const lebesgueRatios = [4, 6, 8, 10, 12, 14].map((N) => {
  const radius = 2 ** (-N);
  const mass = intervals.filter(({ left }) => left < radius).reduce((sum, { left, right }) => sum + Math.max(0, Math.min(right, radius) - left), 0);
  return { N, radius, averageDensityOnSymmetricBall: mass / (2 * radius) };
});
assert.ok(lebesgueRatios.at(-1).averageDensityOnSymmetricBall < 1e-7);

const verticalSamples = [4, 6, 8, 10, 12, 14].map((N) => {
  const y = 2 ** (-N);
  return { N, x: 0, y, imaginaryPart: poissonIntegral(0, y), realPart: conjugatePoissonIntegral(0, y) };
});
assert.ok(verticalSamples.at(-1).imaginaryPart < 1e-3);

const tangentialSamples = [4, 6, 8, 10, 12].map((n) => {
  const { centre, width } = intervals[n - 1];
  const y = width ** 2;
  return { n, x: centre, y, tangentialRatio: centre / y, imaginaryPart: poissonIntegral(centre, y) };
});
assert.ok(tangentialSamples.every(({ imaginaryPart }) => imaginaryPart > 3.13));
assert.ok(tangentialSamples.every(({ tangentialRatio }) => tangentialRatio > 1));

const principalValueAtZero = intervals.reduce(
  (sum, { left, right }) => sum + Math.log(right / left),
  0
);
assert.ok(Number.isFinite(principalValueAtZero));
assert.ok(Math.abs(verticalSamples.at(-1).realPart - principalValueAtZero) < 1e-3);

const result = {
  protocol: "claimipedia-d02-boundary-approach-strike/1",
  strikeId: "d02-boundary-approach-geometry-strike-v1",
  fixture: {
    density: "rho=1 on I_n=[2^-n-2^(-3n-1),2^-n+2^(-3n-1)] and zero otherwise",
    boundaryPoint: 0,
    lebesgueValue: 0,
    lebesgueRatios,
    verticalSamples,
    tangentialPath: "z_n=2^-n+i(2^-3n)^2",
    tangentialSamples,
    principalValueAtZero
  },
  theoremBoundary: {
    scalarizedAETopology: "For each scalar matrix element, the Cauchy transform has finite nontangential boundary values almost everywhere; the imaginary part identifies pi times the absolutely continuous density.",
    operatorUpgrade: "A bounded WOT, SOT or norm boundary operator requires the corresponding uniform boundedness and convergence evidence; scalarized almost-everywhere limits alone do not supply it.",
    principalValue: "The real part is a principal-value/Hilbert-transform decoration where it exists. It is not determined pointwise by the density value and is not a substitute for the full measure.",
    approachRule: "Vertical paths are nontangential. Arbitrary tangential paths are a distinct arc decoration and cannot inherit the nontangential theorem."
  },
  dispositions: {
    nontangentialAEAdmissibleAfterScalarization: true,
    arbitraryTangentialPromotionAdmissible: false,
    densityValueDeterminesPrincipalValue: false,
    principalValueAndDensityDetermineSingularMeasure: false,
    approachGeometryRequiredDecoration: true,
    genericBoundaryTheoremImpliesUniformLAP: false
  },
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d02-boundary-approach-strike-receipt/1",
  checks: {
    zeroIsLebesguePoint: lebesgueRatios.at(-1).averageDensityOnSymmetricBall < 1e-7,
    verticalImaginaryPartConvergesToZero: verticalSamples.at(-1).imaginaryPart < 1e-3,
    tangentialPathSeesSpikes: tangentialSamples.every(({ imaginaryPart }) => imaginaryPart > 3.13),
    tangentialPathLeavesEveryStolzCone: tangentialSamples.at(-1).tangentialRatio > 1e15 && tangentialSamples.every((sample, index) => index === 0 || sample.tangentialRatio > tangentialSamples[index - 1].tangentialRatio),
    principalValueExistsAtFixturePoint: Number.isFinite(principalValueAtZero),
    principalValueLayerSeparated: result.dispositions.densityValueDeterminesPrincipalValue === false,
    uniformLAPNotInferred: result.dispositions.genericBoundaryTheoremImpliesUniformLAP === false,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-boundary-approach-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-boundary-approach-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
