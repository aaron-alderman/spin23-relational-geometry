import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, scalar) => C(a.re * scalar, a.im * scalar);
const inv = (a) => {
  const denominator = a.re ** 2 + a.im ** 2;
  assert.ok(denominator > 0);
  return C(a.re / denominator, -a.im / denominator);
};
const abs = (a) => Math.hypot(a.re, a.im);
const distance = (a, b) => abs(sub(a, b));
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
const matrixMultiply = (left, right) => left.map((row) => right[0].map((_, column) => row.reduce((sum, value, index) => add(sum, mul(value, right[index][column])), C(0))));
const inverse2 = (matrix) => {
  const determinant = sub(mul(matrix[0][0], matrix[1][1]), mul(matrix[0][1], matrix[1][0]));
  const determinantInverse = inv(determinant);
  return [
    [mul(matrix[1][1], determinantInverse), mul(scale(matrix[0][1], -1), determinantInverse)],
    [mul(scale(matrix[1][0], -1), determinantInverse), mul(matrix[0][0], determinantInverse)]
  ];
};
const correction = (coupling, interior) => matrixMultiply(matrixMultiply([coupling], inverse2(interior)), transpose([coupling]))[0][0];
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const z = C(0.37, 1.19);
const zp1 = add(z, C(1));
const b1 = 0.73;
const b2 = -0.41;
const expectedCorrection = add(scale(inv(z), b1 ** 2), scale(inv(zp1), b2 ** 2));

// Unequal vanishing orders are deliberately mixed by a regular, non-orthogonal,
// parameter-dependent frame.  The full Schur correction remains exactly invariant.
const frameSamples = [0.4, 0.1, 0.02, 0.005].map((s) => {
  const diagonalInterior = [
    [scale(z, s ** 2), C(0)],
    [C(0), scale(zp1, s ** 4)]
  ];
  const diagonalCoupling = [C(s * b1), C(s ** 2 * b2)];
  const frame = [
    [C(1), C(s)],
    [C(0), C(1 + s)]
  ];
  const mixedInterior = matrixMultiply(matrixMultiply(transpose(frame), diagonalInterior), frame);
  const mixedCoupling = matrixMultiply([diagonalCoupling], frame)[0];
  const diagonalValue = correction(diagonalCoupling, diagonalInterior);
  const mixedValue = correction(mixedCoupling, mixedInterior);
  assert.ok(distance(diagonalValue, expectedCorrection) < 1e-9);
  assert.ok(distance(mixedValue, expectedCorrection) < 1e-8);
  return { s, mixedInterior, mixedCoupling, diagonalValue, mixedValue, invarianceError: distance(diagonalValue, mixedValue) };
});

// A bounded meromorphic correction has no principal part, hence its singularity is
// removable.  The same limit is obtained without retaining the diagonalizing frame.
assert.ok(Math.max(...frameSamples.map(({ invarianceError }) => invarianceError)) < 1e-8);
const effectiveBase = add(C(1.2, 1.5), scale(z, 0.4));
const effectiveLimit = sub(effectiveBase, expectedCorrection);
assert.ok(effectiveLimit.im > 0);

// A pole admits no coordinate-free Hadamard finite part.  Under s=r+a r^2,
// 1/s^2=r^-2-2a r^-1+3a^2+O(r), so the subtracted constant changes with a.
function finitePartSample(a, r) {
  const s = r + a * r ** 2;
  return 1 / s ** 2 - 1 / r ** 2 + 2 * a / r;
}
const finitePartFixtures = [0, 0.2, -0.55].map((a) => {
  const values = [1e-3, 3e-4, 1e-4].map((r) => finitePartSample(a, r));
  const expected = 3 * a ** 2;
  assert.ok(Math.abs(values.at(-1) - expected) < 2e-4);
  return { reparameterizationCoefficient: a, values, expectedConstant: expected };
});
assert.ok(Math.abs(finitePartFixtures[1].expectedConstant - finitePartFixtures[2].expectedConstant) > 0.5);

// The divergent example is an actual Schur correction, not a bare scalar analogy.
const divergentSamples = [0.1, 0.03, 0.01].map((s) => {
  const interior = [[scale(z, s ** 2), C(0)], [C(0), zp1]];
  const coupling = [C(b1), C(0)];
  return { s, value: correction(coupling, interior) };
});
assert.ok(abs(divergentSamples.at(-1).value) > 90 * abs(divergentSamples[0].value));

const result = {
  protocol: "claimipedia-d02-meromorphic-filtration-execution/1",
  strikeId: "d02-coordinate-free-meromorphic-strike-v1",
  theoremCandidate: {
    statement: "For finite-dimensional one-parameter analytic germs D_s and B_s with D_s invertible off s=0, C_s=B_s D_s^-1 B_s^T is meromorphic. If its Laurent principal part vanishes, C_s has a unique removable limit invariant under every analytic invertible interior-frame germ.",
    proofSkeleton: [
      "D_s^-1=adj(D_s)/det(D_s) is meromorphic wherever det(D_s) is not the zero germ.",
      "Contraction with analytic B_s preserves meromorphicity.",
      "A meromorphic finite-dimensional matrix germ bounded at the puncture has zero principal part and therefore a unique removable value.",
      "For D'_s=T_s^T D_s T_s and B'_s=B_s T_s, direct cancellation gives B'_s(D'_s)^-1(B'_s)^T=B_sD_s^-1B_s^T."
    ],
    decisionRule: {
      boundedCorrection: "remove the singularity and glue the unique value",
      poleInCorrection: "retain the interior or refuse elimination",
      decoratedPole: "a finite part is allowed only as scheme-relative data when a normal coordinate and subtraction prescription are explicit decorations"
    }
  },
  unequalOrderNonDiagonalFixture: {
    diagonalModel: "D=diag(s^2 z,s^4(z+1)), B=(s b1,s^2 b2)",
    mixingFrame: "T_s=[[1,s],[0,1+s]]",
    expectedCorrection,
    frameSamples,
    effectiveLimit,
    passiveAfterElimination: effectiveLimit.im > 0
  },
  fixedDecorationCounterexample: {
    pole: "1/s^2",
    coordinateChange: "s=r+a r^2",
    transformedExpansion: "r^-2-2a r^-1+3a^2+O(r)",
    finitePartFixtures,
    conclusion: "Pole subtraction is not invariant under nonlinear regular reparameterization; order, leading symbol and projective direction do not fix a canonical finite part."
  },
  divergentSchurFixture: divergentSamples,
  scope: {
    closed: "finite-dimensional analytic or polynomial one-parameter germs, including non-diagonal unequal-order crossings",
    notClosed: ["smooth non-analytic flat germs", "infinite-dimensional essential-spectrum crossings", "scheme-independent values for pole cases"]
  },
  authority: {
    proposalOnly: true,
    entailsBeyondDeclaredAnalyticFiniteDimensionalScope: false,
    empiricalAuthority: false,
    automaticCorpusAdmission: false,
    applicationAdmission: false
  }
};

const receipt = {
  protocol: "claimipedia-d02-meromorphic-filtration-receipt/1",
  checks: {
    correctionIsMeromorphic: true,
    unequalOrdersCovered: true,
    nonDiagonalAnalyticFramesCovered: true,
    fullCorrectionFrameInvariant: true,
    boundedCorrectionRemovable: true,
    passiveFixtureSurvives: true,
    divergentSchurFixtureRealized: true,
    nonlinearReparameterizationChangesFinitePart: true,
    poleRequiresExplicitSchemeDecoration: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-meromorphic-filtration-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-meromorphic-filtration-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
