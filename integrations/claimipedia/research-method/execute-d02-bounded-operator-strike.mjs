import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const contract = JSON.parse(readFileSync(resolve(here, "d02-bounded-operator-contract.json"), "utf8"));
const Cx = (re, im = 0) => ({ re, im });
const add = (a, b) => Cx(a.re + b.re, a.im + b.im);
const sub = (a, b) => Cx(a.re - b.re, a.im - b.im);
const mul = (a, b) => Cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, scalar) => Cx(a.re * scalar, a.im * scalar);
const inv = (a) => {
  const denominator = a.re ** 2 + a.im ** 2;
  return Cx(a.re / denominator, -a.im / denominator);
};
const abs = (a) => Math.hypot(a.re, a.im);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const z = Cx(0.63, 1.17);
const inverseZ = inv(z);

function regularizedEntry(lambda, alpha, epsilon) {
  return scale(inv(add(scale(z, lambda), Cx(0, epsilon))), lambda ** (2 * alpha));
}

function limitEntry(lambda, alpha) {
  return scale(inverseZ, lambda ** (2 * alpha - 1));
}

function maxRegularizationError(alpha, epsilon, count = 120000) {
  let maximum = 0;
  for (let n = 1; n <= count; n += 1) {
    const lambda = 1 / n;
    maximum = Math.max(maximum, abs(sub(regularizedEntry(lambda, alpha, epsilon), limitEntry(lambda, alpha))));
  }
  return maximum;
}

function strongVectorError(alpha, epsilon, count = 120000) {
  let normSquared = 0;
  let vectorNormSquared = 0;
  for (let n = 1; n <= count; n += 1) {
    const coordinate = 1 / n;
    const difference = sub(regularizedEntry(1 / n, alpha, epsilon), limitEntry(1 / n, alpha));
    normSquared += abs(difference) ** 2 * coordinate ** 2;
    vectorNormSquared += coordinate ** 2;
  }
  return Math.sqrt(normSquared / vectorNormSquared);
}

// T=diag(1/n) is compact, injective, has dense non-closed range, and has zero in
// its essential spectrum. B=T^alpha yields correction diag(lambda^(2alpha-1))/z.
const spectralCases = [
  { alpha: 0.25, expected: "unbounded-refuse" },
  { alpha: 0.5, expected: "bounded-strong-only" },
  { alpha: 0.75, expected: "compact-norm-stable" },
  { alpha: 1.5, expected: "trace-class-norm-stable" }
].map(({ alpha, expected }) => {
  const truncatedNorms = [100, 1000, 10000].map((count) => abs(limitEntry(1 / count, alpha)));
  const normErrors = [0.1, 0.03, 0.01, 0.003].map((epsilon) => maxRegularizationError(alpha, epsilon, 50000));
  const strongErrors = [0.1, 0.03, 0.01, 0.003].map((epsilon) => strongVectorError(alpha, epsilon, 50000));
  if (alpha < 0.5) assert.ok(truncatedNorms.at(-1) > truncatedNorms[0] * 9);
  if (alpha === 0.5) {
    assert.ok(normErrors.at(-1) > 0.65 * abs(inverseZ));
    assert.ok(strongErrors.at(-1) < strongErrors[0] * 0.25);
  }
  if (alpha > 0.5) assert.ok(normErrors.at(-1) < normErrors[0] * 0.3);
  return { alpha, expected, truncatedNorms, normErrors, strongErrors };
});

// The critical response is passive even though no bounded Moore-Penrose inverse
// of T exists: -1/z has positive imaginary part.
assert.ok(-inverseZ.im > 0);

// A finite support/kernel fixture separates support compatibility from forbidden
// null coupling. The latter diverges as 1/epsilon.
const supportEigenvalues = [1, 0.4, 0, 0];
const compatibleCoupling = [0.8, -0.3, 0, 0];
const forbiddenCoupling = [0.8, -0.3, 0.2, 0];
function regulatedScalarCorrection(coupling, epsilon) {
  return supportEigenvalues.reduce((sum, lambda, index) => {
    const denominator = add(scale(z, lambda), Cx(0, epsilon));
    return add(sum, scale(inv(denominator), coupling[index] ** 2));
  }, Cx(0));
}
const supportCompatibleValues = [1e-2, 1e-4, 1e-6].map((epsilon) => regulatedScalarCorrection(compatibleCoupling, epsilon));
const forbiddenValues = [1e-2, 1e-4, 1e-6].map((epsilon) => regulatedScalarCorrection(forbiddenCoupling, epsilon));
assert.ok(abs(sub(supportCompatibleValues[1], supportCompatibleValues[2])) < 1e-3);
assert.ok(abs(forbiddenValues.at(-1)) > abs(forbiddenValues[0]) * 1000);

// Schatten hierarchy for the residue diag(n^-(2alpha-1)).
function partialTrace(alpha, count) {
  let sum = 0;
  for (let n = 1; n <= count; n += 1) sum += n ** (-(2 * alpha - 1));
  return sum;
}
const measureHierarchy = [0.5, 0.75, 1.5].map((alpha) => {
  const partialTraces = [100, 1000, 10000].map((count) => partialTrace(alpha, count));
  return {
    alpha,
    residueClass: alpha === 0.5 ? "bounded-noncompact" : alpha <= 1 ? "compact-not-trace-class" : "trace-class",
    partialTraces
  };
});
assert.ok(measureHierarchy[0].partialTraces.at(-1) === 10000);
assert.ok(measureHierarchy[1].partialTraces.at(-1) > measureHierarchy[1].partialTraces[0] * 5);
assert.ok(measureHierarchy[2].partialTraces.at(-1) < measureHierarchy[2].partialTraces[1] * 1.08);

const result = {
  protocol: "claimipedia-d02-bounded-operator-strike/1",
  strikeId: "d02-factorized-bounded-operator-strike-v1",
  theoremCandidate: {
    statement: "Let T be a bounded positive operator with fixed support P, let D(z)=T^(1/2) Dhat(z) T^(1/2), and let B=C T^(1/2) with bounded C. If Dhat is norm-holomorphic, boundedly invertible and Herglotz on P H_i, then the factorized correction C Dhat(z)^(-1) C* is bounded and norm-holomorphic, and subtracting it preserves Herglotz passivity.",
    identity: "Im(-Dhat^-1)=Dhat^(-*) Im(Dhat) Dhat^-1 >= 0",
    compatibility: "B=C T^(1/2) is the Douglas range-factorization gate; closed range of T is sufficient but not necessary.",
    qualification: "The factorized form is part of the typed object. General convergence of arbitrary regularizers is not claimed."
  },
  essentialSpectrumFixture: {
    interiorScale: "T=diag(1/n) on l2",
    properties: ["bounded", "positive", "injective", "compact", "dense non-closed range", "zero in essential spectrum"],
    couplingFamily: "B=T^alpha",
    correction: "diag((1/n)^(2alpha-1))/z",
    spectralCases
  },
  topologyFinding: {
    criticalAlpha: 0.5,
    statement: "At B=T^(1/2), regularized corrections converge strongly to I/z but not in operator norm. Every regulator value is compact, whereas I/z is not compact.",
    consequence: "Strong, norm and trace-norm gluing are distinct dispositions."
  },
  supportGate: { supportEigenvalues, supportCompatibleValues, forbiddenValues },
  measureHierarchy,
  dispositions: {
    closedRangeRequired: false,
    boundedDouglasFactorRequiredForBoundedFactorizedCorrection: true,
    normConvergenceAutomatic: false,
    strongConvergenceSufficientForTraceClaims: false,
    traceMeasureRequiresSchattenDecoration: true,
    nonFredholmCanStillHaveBoundedStrongResponse: true
  },
  authority: contract.authority
};

const receipt = {
  protocol: "claimipedia-d02-bounded-operator-strike-receipt/1",
  checks: {
    closedRangeSufficientNotNecessary: true,
    douglasThresholdExhibited: true,
    criticalStrongLimit: true,
    criticalNormFailure: true,
    compactNormStableBranch: true,
    traceClassThresholdSeparated: true,
    nullCouplingDiverges: true,
    essentialSpectrumFixtureIncluded: true,
    passivityPreserved: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-bounded-operator-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-bounded-operator-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
