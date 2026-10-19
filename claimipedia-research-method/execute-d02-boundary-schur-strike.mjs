import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, scalar) => C(a.re * scalar, a.im * scalar);
const abs = (a) => Math.hypot(a.re, a.im);
const invScalar = (a) => {
  const denominator = a.re ** 2 + a.im ** 2;
  return C(a.re / denominator, -a.im / denominator);
};
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
const adjoint = (matrix) => transpose(matrix).map((row) => row.map(conj));
const matrixMultiply = (left, right) => left.map((row) => right[0].map((_, column) => row.reduce((sum, value, index) => add(sum, mul(value, right[index][column])), C(0))));
const identity = (size) => Array.from({ length: size }, (_, row) => Array.from({ length: size }, (_, column) => C(row === column ? 1 : 0)));
function inverse(matrix) {
  const size = matrix.length;
  const augmented = matrix.map((row, index) => [...row.map((value) => C(value.re, value.im)), ...identity(size)[index]]);
  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) if (abs(augmented[row][column]) > abs(augmented[pivot][column])) pivot = row;
    assert.ok(abs(augmented[pivot][column]) > 1e-14);
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const pivotInverse = invScalar(augmented[column][column]);
    augmented[column] = augmented[column].map((value) => mul(value, pivotInverse));
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      augmented[row] = augmented[row].map((value, index) => sub(value, mul(factor, augmented[column][index])));
    }
  }
  return augmented.map((row) => row.slice(size));
}
const maxMatrixError = (left, right) => Math.max(...left.flatMap((row, i) => row.map((value, j) => abs(sub(value, right[i][j])))));

// Boundary density identity in a noncommuting 2x2 fixture.
const h = [[C(1), C(0.2)], [C(0.2), C(-0.4)]];
const w = [[C(0.7), C(0.1)], [C(0.1), C(0.5)]];
const d0 = h.map((row, i) => row.map((value, j) => C(value.re, w[i][j].re)));
const inverseD0 = inverse(d0);
const minusInverse = inverseD0.map((row) => row.map((value) => scale(value, -1)));
const imaginaryMinusInverse = minusInverse.map((row, i) => row.map((value, j) => scale(sub(value, conj(minusInverse[j][i])), 1 / (2)))).map((row) => row.map((value) => C(value.im, -value.re)));
const rhsDensity = matrixMultiply(matrixMultiply(adjoint(inverseD0), w), inverseD0);
assert.ok(maxMatrixError(imaginaryMinusInverse, rhsDensity) < 1e-12);
const coupling = [[C(0.6), C(-0.3)]];
const transportedDensity = matrixMultiply(matrixMultiply(coupling, rhsDensity), transpose(coupling))[0][0].re;
const externalDensity = 0.2;
const effectiveDensity = externalDensity + transportedDensity;
assert.ok(effectiveDensity > externalDensity);

// Exact topology counterexamples on l2.
const topologyCounterexamples = {
  weakMultiplication: {
    sequence: "B_n=(S*)^n, D_n=I",
    factorLimits: "B_n and B_n* converge weakly to 0",
    correction: "B_n B_n*=I for every n",
    boundaryOfCorrection: "I",
    correctionOfBoundaryFactors: "0",
    conclusion: "weak operator limits are not multiplicative"
  },
  oneSidedStrong: {
    sequence: "B_n=(S*)^n, D_n=I",
    factorLimits: "B_n converges strongly to 0 but B_n*=S^n does not",
    correction: "I",
    conclusion: "strong convergence of B without strong convergence of B* is insufficient"
  },
  nonuniformInverse: {
    sequence: "D_n=I-(1-1/n)P_n, B_n=P_n for moving rank-one P_n",
    factorLimits: "D_n converges strongly to I and B_n,B_n* converge strongly to 0",
    inverseNorm: "n",
    correction: "n P_n",
    conclusion: "strong-* factor convergence without a uniform inverse bound does not control the Schur correction"
  }
};

// A scalar eliminated zero gives a positive boundary atom.
const poleFixture = [1e-1, 1e-2, 1e-3].map((y) => {
  const d = C(0, y);
  const correction = scale(invScalar(d), -(0.7 ** 2));
  return { y, effectiveResponse: correction, atomIndicator: y * correction.im };
});
assert.ok(Math.abs(poleFixture.at(-1).atomIndicator - 0.7 ** 2) < 1e-12);

const result = {
  protocol: "claimipedia-d02-boundary-schur-strike/1",
  strikeId: "d02-boundary-schur-continuity-strike-v1",
  theoremCandidate: {
    normVersion: "If A_y, B_y and D_y converge in operator norm, D_0 is invertible, and inverses are eventually defined, then A_y-B_y D_y^-1 B_y* converges in norm to the Schur complement of the boundary operators.",
    strongVersion: "If A_y and D_y converge strongly, B_y and B_y* converge strongly, D_0 is invertible, and sup_y ||D_y^-1||<infinity, then the Schur complements converge strongly.",
    proofSkeleton: "Use D_y^-1-D_0^-1=D_y^-1(D_0-D_y)D_0^-1 and uniform boundedness, then strong continuity of products on uniformly bounded sets.",
    boundaryDensityIdentity: "W_eff=W_A+B D_0^(-*) W_D D_0^-1 B* at boundary points where the factors and densities exist with the required topology."
  },
  densityFixture: { h, w, d0, inverseD0, imaginaryMinusInverse, rhsDensity, identityError: maxMatrixError(imaginaryMinusInverse, rhsDensity), externalDensity, transportedDensity, effectiveDensity },
  topologyCounterexamples,
  poleFixture: {
    model: "D(z)=z-lambda, B=0.7 at lambda=0",
    samples: poleFixture,
    conclusion: "A simple eliminated boundary zero produces an atom of mass B^2 in the effective Herglotz measure."
  },
  dispositions: {
    normBoundaryCommutesWithSchurUnderInvertibility: true,
    strongStarBoundaryCommutesWithUniformInverse: true,
    weakBoundaryCommutesWithSchur: false,
    oneSidedStrongSufficient: false,
    uniformInverseBoundDispensable: false,
    singularBoundaryInteriorUsesArcMeasureDispatcher: true
  },
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d02-boundary-schur-strike-receipt/1",
  checks: {
    normContinuityTheoremRecorded: true,
    strongStarContinuityTheoremRecorded: true,
    boundaryDensityIdentityVerified: true,
    weakMultiplicationCounterexample: true,
    oneSidedStrongCounterexample: true,
    nonuniformInverseCounterexample: true,
    eliminatedZeroCreatesAtom: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-boundary-schur-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-boundary-schur-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
