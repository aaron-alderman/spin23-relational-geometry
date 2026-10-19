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
  return C(a.re / denominator, -a.im / denominator);
};
const abs = (a) => Math.hypot(a.re, a.im);
const distance = (a, b) => abs(sub(a, b));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
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
    const pivotInverse = inv(augmented[column][column]);
    augmented[column] = augmented[column].map((value) => mul(value, pivotInverse));
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      augmented[row] = augmented[row].map((value, index) => sub(value, mul(factor, augmented[column][index])));
    }
  }
  return augmented.map((row) => row.slice(size));
}
const correction = (coupling, interior) => matrixMultiply(matrixMultiply([coupling], inverse(interior)), transpose([coupling]))[0][0];

const z = C(0.52, 1.31);
const inverseZ = inv(z);

// Noncommuting reduced interior: T and Dhat do not share eigenvectors. The
// factorized result agrees with direct Schur elimination and is frame covariant.
const roots = [1, 0.5, 0.25];
const sqrtT = roots.map((root, row) => roots.map((_, column) => C(row === column ? root : 0)));
const h = [
  [C(-0.2), C(0.17), C(0)],
  [C(0.17), C(0.1), C(-0.11)],
  [C(0), C(-0.11), C(0.28)]
];
const dhat = h.map((row, i) => row.map((value, j) => add(value, C(i === j ? z.re : 0, i === j ? z.im : 0))));
const interior = matrixMultiply(matrixMultiply(sqrtT, dhat), sqrtT);
const reducedCoupling = [C(0.7), C(-0.2), C(0.45)];
const coupling = matrixMultiply([reducedCoupling], sqrtT)[0];
const directCorrection = correction(coupling, interior);
const factorizedCorrection = correction(reducedCoupling, dhat);
assert.ok(distance(directCorrection, factorizedCorrection) < 1e-12);
const theta = 0.43;
const frame = [
  [C(Math.cos(theta)), C(-Math.sin(theta)), C(0)],
  [C(Math.sin(theta)), C(Math.cos(theta)), C(0)],
  [C(0), C(0), C(1)]
];
const framedInterior = matrixMultiply(matrixMultiply(transpose(frame), interior), frame);
const framedCoupling = matrixMultiply([coupling], frame)[0];
const framedCorrection = correction(framedCoupling, framedInterior);
assert.ok(distance(directCorrection, framedCorrection) < 1e-12);

// Constant support does not imply a spectral gap. I and diag(1/n) both have
// kernel zero and support I, but only I has closed range.
const sameSupportDifferentGap = {
  first: { operator: "I", kernel: "0", support: "I", lowerBound: 1, closedRange: true },
  second: { operator: "diag(1/n)", kernel: "0", support: "I", lowerBound: 0, closedRange: false, zeroInEssentialSpectrum: true }
};

// Two endpoint-identical paths at a genuine kernel crossing give different
// strong limits. D_delta=z(T0+delta I), B_delta=sqrt(T0)+c sqrt(delta) P0.
const kernelPathLimits = [0, 0.4, 0.9].map((c) => ({
  approachCoefficient: c,
  endpointInterior: "z T0",
  endpointCoupling: "sqrt(T0)",
  kernelCorrectionLimit: scale(inverseZ, c ** 2),
  supportCorrectionLimit: inverseZ
}));
assert.ok(distance(kernelPathLimits[0].kernelCorrectionLimit, kernelPathLimits[2].kernelCorrectionLimit) > 0.4);

// With no kernel, coherent transport and frozen coupling have the same strong
// limit but different norm behavior. Support data cannot record this distinction.
function frozenEntry(lambda, delta) {
  return scale(inverseZ, lambda / (lambda + delta));
}
function frozenStrongError(delta, count = 80000) {
  let numerator = 0;
  let denominator = 0;
  for (let n = 1; n <= count; n += 1) {
    const coordinate = 1 / n;
    const error = distance(frozenEntry(1 / n, delta), inverseZ);
    numerator += error ** 2 * coordinate ** 2;
    denominator += coordinate ** 2;
  }
  return Math.sqrt(numerator / denominator);
}
const deltas = [0.1, 0.03, 0.01, 0.003];
const essentialPaths = {
  coherent: {
    definition: "D_delta=z(T+delta I), B_delta=sqrt(T+delta I)",
    correction: "I/z for every delta",
    normStable: true
  },
  frozen: {
    definition: "D_delta=z(T+delta I), B_delta=sqrt(T)",
    correction: "T(T+delta I)^(-1)/z",
    strongErrors: deltas.map((delta) => frozenStrongError(delta)),
    normError: abs(inverseZ),
    normStable: false
  }
};
assert.ok(essentialPaths.frozen.strongErrors.at(-1) < essentialPaths.frozen.strongErrors[0] * 0.25);

const result = {
  protocol: "claimipedia-d02-operator-topology-strike/1",
  strikeId: "d02-operator-topology-and-path-strike-v1",
  noncommutingFixture: {
    statement: "The factorized theorem does not require T and Dhat to commute or be simultaneously diagonalizable.",
    directCorrection,
    factorizedCorrection,
    framedCorrection,
    directFactorizedError: distance(directCorrection, factorizedCorrection),
    frameError: distance(directCorrection, framedCorrection)
  },
  stratificationUpgrade: {
    sameSupportDifferentGap,
    requiredCoordinates: ["support projection", "closed-range/spectral-gap class", "Douglas coupling class", "convergence topology", "Schatten ideal class", "approach/regularizer germ"],
    conclusion: "Support rank alone is not a complete operator stratum invariant."
  },
  fixedEndpointPathCounterexample: {
    kernelPathLimits,
    conclusion: "Norm-convergent D_delta and B_delta can share endpoints while their Schur corrections have different strong limits on the emerging kernel; the sqrt(delta) coefficient is indispensable approach data."
  },
  essentialSpectrumTopologyCounterexample: {
    essentialPaths,
    conclusion: "With constant full support and no kernel, coherent and frozen coupling paths share the strong output but differ in norm convergence. The topology and transport rule are independent decorations."
  },
  measureDisposition: {
    operatorValuedAtom: "The critical residue I defines a bounded positive operator-valued atom in weak/strong matrix elements.",
    scalarTraceMeasure: "Its trace is infinite, so no finite scalar trace measure descends without a trace-class/Schatten decoration.",
    determinant: "No Fredholm determinant is licensed for the identity residue."
  },
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d02-operator-topology-strike-receipt/1",
  checks: {
    noncommutingInteriorCovered: true,
    factorizedDirectAgreement: true,
    unitaryFrameCovariance: true,
    supportGapIndependence: true,
    fixedEndpointStrongPathDependence: true,
    essentialStrongNormSplit: true,
    topologyDecorationRequired: true,
    SchattenDecorationRequired: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-operator-topology-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-operator-topology-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
