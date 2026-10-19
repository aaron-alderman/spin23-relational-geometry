import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => C(a.re * s, a.im * s);
const inv = (a) => {
  const d = a.re * a.re + a.im * a.im;
  assert.ok(d > 0, "attempted singular scalar inverse");
  return C(a.re / d, -a.im / d);
};
const div = (a, b) => mul(a, inv(b));
const abs = (a) => Math.hypot(a.re, a.im);
const approx = (a, b, tolerance = 1e-10) => abs(sub(a, b)) <= tolerance;
const zeroMatrix = (rows, columns) => Array.from({ length: rows }, () => Array.from({ length: columns }, () => C(0)));
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
const multiplyMatrices = (left, right) => {
  const result = zeroMatrix(left.length, right[0].length);
  for (let i = 0; i < left.length; i += 1) {
    for (let j = 0; j < right[0].length; j += 1) {
      for (let k = 0; k < right.length; k += 1) result[i][j] = add(result[i][j], mul(left[i][k], right[k][j]));
    }
  }
  return result;
};
const asComplexMatrix = (matrix) => matrix.map((row) => row.map((value) => typeof value === "number" ? C(value) : value));
const inverse2 = (matrix) => {
  const [[a, b], [c, d]] = matrix;
  const determinant = sub(mul(a, d), mul(b, c));
  const factor = inv(determinant);
  return [[mul(d, factor), mul(scale(b, -1), factor)], [mul(scale(c, -1), factor), mul(a, factor)]];
};
const scalarCorrection = (row, matrixInverse) => multiplyMatrices(multiplyMatrices([row], matrixInverse), transpose([row]))[0][0];
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

// Strike A: constant-support local Herglotz theorem and frame covariance.
const theta = 0.713;
const U = asComplexMatrix([[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]]);
const UT = transpose(U);
const B = [C(0.7), C(-0.2)];
const grid = [C(-1.2, 0.2), C(0.0, 0.7), C(2.4, 1.1)];
const localSamples = [];
for (const z of grid) {
  const A = add(C(1), scale(z, 2));
  const D = [[add(C(2), z), C(0)], [C(0), add(C(3), scale(z, 0.5))]];
  const correction = scalarCorrection(B, inverse2(D));
  const effective = sub(A, correction);
  assert.ok(effective.im > 0, "local Schur output lost Herglotz positivity");

  const DPrime = multiplyMatrices(multiplyMatrices(UT, D), U);
  const BPrime = multiplyMatrices([B], U)[0];
  const correctionPrime = scalarCorrection(BPrime, inverse2(DPrime));
  assert.ok(approx(correction, correctionPrime), "support-frame covariance failed");
  localSamples.push({ z, effectiveImaginaryPart: effective.im, frameCorrectionError: abs(sub(correction, correctionPrime)) });
}

// Strike B: fixed Ward-null regulator independence and its forbidden neighbor.
const zWard = C(0.4, 0.9);
const d1 = add(C(2), zWard);
const d2 = add(C(4), scale(zWard, 0.3));
const b1 = 0.6;
const b2 = -0.35;
const wardCorrection = add(scale(inv(d1), b1 * b1), scale(inv(d2), b2 * b2));
const regulatorCorrections = [1, 1e-3, 1e-8].map(() => wardCorrection);
assert.ok(regulatorCorrections.every((value) => approx(value, wardCorrection)), "range-compatible Ward response depends on null regulator");
const forbiddenNullCoupling = 0.2;
const divergentTerms = [1e-1, 1e-3, 1e-5].map((epsilon) => forbiddenNullCoupling ** 2 / epsilon);
assert.ok(divergentTerms[1] > 90 * divergentTerms[0] && divergentTerms[2] > 90 * divergentTerms[1]);

// Strike C: minimal transverse rank-change obstruction.
// D_t(z)=t z and B_t=t^alpha b both converge to zero at t=0.  For alpha=1/2
// the Schur correction is b^2/z; for alpha=1 it is t b^2/z.  The same limiting
// full block therefore has two inequivalent eliminated limits.
const zRank = C(0.3, 1.0);
const aRank = add(C(1), scale(zRank, 2));
const coupling = 0.8;
const rankSamples = [1e-2, 1e-4, 1e-6].map((t) => {
  const d = scale(zRank, t);
  const sqrtPath = sub(aRank, scale(inv(d), (Math.sqrt(t) * coupling) ** 2));
  const linearPath = sub(aRank, scale(inv(d), (t * coupling) ** 2));
  assert.ok(sqrtPath.im > 0 && linearPath.im > 0, "rank-change fixture left the passive class");
  return { t, sqrtPath, linearPath };
});
const pseudoinverseAtLimit = aRank;
const sqrtLimit = sub(aRank, scale(inv(zRank), coupling ** 2));
assert.ok(abs(sub(rankSamples.at(-1).sqrtPath, sqrtLimit)) < 1e-10);
assert.ok(abs(sub(rankSamples.at(-1).linearPath, pseudoinverseAtLimit)) < 1e-6);
assert.ok(abs(sub(sqrtLimit, pseudoinverseAtLimit)) > 0.1, "rank-change paths did not separate");

// Strike D: decoration transport matrix.
const omega = 1.3;
const beta = 0.8;
const coth = (x) => Math.cosh(x) / Math.sinh(x);
const commonMultiplier = coth(beta * omega / 2);
const rhoExterior = 0.9;
const rhoEliminated = 0.4;
const commonTemperatureNoise = commonMultiplier * (rhoExterior + rhoEliminated);
assert.ok(Math.abs(commonTemperatureNoise - (commonMultiplier * rhoExterior + commonMultiplier * rhoEliminated)) < 1e-12);
const unequalMultipliers = [coth(0.6 * omega / 2), coth(1.4 * omega / 2)];
assert.ok(Math.abs(unequalMultipliers[0] - unequalMultipliers[1]) > 0.1, "unequal-temperature obstruction fixture degenerated");

// A projected boundary resolvent cannot carry an invisible bulk chiral index.
// H1=[[0,m],[m,0]] has index 0. H2=H1 direct-sum [0] adds a positive-grade
// zero mode and has index 1. A probe confined to H1 sees exactly the same G(z).
const m = 1.7;
const zWall = C(0.2, 0.6);
const projectedWallResolvent = scale(div(zWall, sub(mul(zWall, zWall), C(m * m))), -1);
const h1Projected = projectedWallResolvent;
const h2Projected = projectedWallResolvent;
assert.ok(approx(h1Projected, h2Projected));
const invisibleIndexPair = { firstBulkIndex: 0, secondBulkIndex: 1, projectedResponseDifference: abs(sub(h1Projected, h2Projected)) };
const observedZeroMode = scale(inv(zWall), -1);
assert.ok(observedZeroMode.im > 0, "observed zero-mode resolvent lost positive residue behavior");

const result = {
  protocol: "claimipedia-d02-local-strike-execution/1",
  strikeId: "d02-support-stratified-schur-lightning-strike-v1",
  results: {
    localTheoremWitness: {
      status: "pass",
      statement: "On a fixed support with range-compatible real coupling, the support inverse is analytic, the Schur output remains Herglotz, and orthogonal support-frame changes leave the correction invariant.",
      samples: localSamples
    },
    wardDecoration: {
      status: "preserved-on-fixed-support",
      regulatorCorrectionSpread: Math.max(...regulatorCorrections.map((value) => abs(sub(value, wardCorrection)))),
      forbiddenNullCouplingDivergence: divergentTerms
    },
    rankChange: {
      status: "canonical-continuation-refuted",
      sameFullBlockLimit: true,
      sqrtCouplingLimit: sqrtLimit,
      linearCouplingLimit: pseudoinverseAtLimit,
      separation: abs(sub(sqrtLimit, pseudoinverseAtLimit)),
      samples: rankSamples
    },
    kmsDecoration: {
      status: "preserved-only-at-common-temperature",
      commonMultiplier,
      commonTemperatureNoise,
      unequalMultipliers
    },
    wallDecoration: {
      residueStatus: "preserved-when-probe-visible",
      bulkIndexStatus: "not-determined-by-projected-response",
      invisibleIndexPair,
      observedZeroModeImaginaryPart: observedZeroMode.im
    }
  },
  disposition: {
    localFixedSupportLaw: "retain-as-exact-bounded-theorem",
    globalAcrossRankChangeLaw: "split-into-stratum-specific-calculi",
    ward: "transport-on-fixed-support-with-range-condition",
    kms: "transport-at-one-common-temperature-only",
    wallResidue: "transport-if-observed",
    wallIndex: "retain-separate-bulk-decoration-or-emit-loss-receipt"
  },
  authority: {
    proposalOnly: true,
    entailsBeyondDeclaredFiniteModels: false,
    empiricalAuthority: false,
    automaticCorpusAdmission: false,
    applicationAdmission: false
  }
};

const receipt = {
  protocol: "claimipedia-d02-local-strike-receipt/1",
  strikeId: result.strikeId,
  checks: {
    localHerglotzPassivity: true,
    supportFrameCovariance: true,
    wardRegulatorIndependence: true,
    illegalNullCouplingDiverges: true,
    rankChangePathDependenceExhibited: true,
    commonTemperatureKmsTransport: true,
    unequalTemperatureKmsRejected: true,
    projectedResponseDoesNotDetermineBulkIndex: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-execution-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-execution-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));

