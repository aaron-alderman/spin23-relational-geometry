#!/usr/bin/env node
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const analyzer = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "analyze-leech-pareto-transformers.mjs"), "--full"
], {encoding: "utf8"}));
const G = analyzer.results.find(({id}) => id === "gram-first").gram;
const n = G.length;

const jacobiEigenpairs = (matrix, tolerance = 1e-13, maxRotations = 100000) => {
  const A = matrix.map((row) => [...row]);
  const V = Array.from({length: n}, (_, i) => Array.from(
    {length: n}, (_, j) => i === j ? 1 : 0
  ));
  for (let rotation = 0; rotation < maxRotations; rotation += 1) {
    let p = 0;
    let q = 1;
    let maximum = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(A[i][j]) > maximum) { maximum = Math.abs(A[i][j]); p = i; q = j; }
    }
    if (maximum < tolerance) {
      return A.map((row, index) => ({
        eigenvalue: row[index],
        vector: V.map((vRow) => vRow[index])
      })).sort((a, b) => a.eigenvalue - b.eigenvalue);
    }
    const angle = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const app = A[p][p];
    const aqq = A[q][q];
    const apq = A[p][q];
    for (let k = 0; k < n; k += 1) if (k !== p && k !== q) {
      const akp = A[k][p];
      const akq = A[k][q];
      A[k][p] = A[p][k] = c * akp - s * akq;
      A[k][q] = A[q][k] = s * akp + c * akq;
    }
    A[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    A[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    A[p][q] = A[q][p] = 0;
    for (let k = 0; k < n; k += 1) {
      const vkp = V[k][p];
      const vkq = V[k][q];
      V[k][p] = c * vkp - s * vkq;
      V[k][q] = s * vkp + c * vkq;
    }
  }
  throw new Error("Jacobi eigensolver did not converge");
};

const eigenpairs = jacobiEigenpairs(G);
let maximumResidual = 0;
for (const {eigenvalue, vector} of eigenpairs) for (let i = 0; i < n; i += 1) {
  const residual = G[i].reduce((sum, value, j) => sum + value * vector[j], 0)
    - eigenvalue * vector[i];
  maximumResidual = Math.max(maximumResidual, Math.abs(residual));
}

const overlap = eigenpairs.map((first) => eigenpairs.map((second) =>
  first.vector.reduce((sum, value, i) => sum + value ** 2 * second.vector[i] ** 2, 0)
));

const ratios = [0.0001, 0.001, 0.01];
const scans = ratios.map((ratio) => {
  const U = ratio;
  const u = 1;
  const variances = eigenpairs.map(({eigenvalue}) => 0.5 * Math.sqrt(U / (u * eigenvalue)));
  const physicalCoordinateVariances = Array.from({length: n}, (_, i) =>
    eigenpairs.reduce((sum, pair, a) => sum + pair.vector[i] ** 2 * variances[a], 0));
  const harmonicFrequencies = eigenpairs.map(({eigenvalue}) => Math.sqrt(U * u / eigenvalue));
  const transitionCorrection = eigenpairs.map((first, a) => eigenpairs.map((second, b) =>
    -u * Math.sqrt(variances[a] * variances[b]) * first.vector.reduce(
      (sum, firstValue, i) => sum + firstValue * second.vector[i]
        * physicalCoordinateVariances[i], 0
    ) / 2
  ));
  const ascendingFrequencyOrder = harmonicFrequencies.map((_, index) => index)
    .sort((a, b) => harmonicFrequencies[a] - harmonicFrequencies[b]);
  const effectiveTransitionMatrix = ascendingFrequencyOrder.map((a, row) =>
    ascendingFrequencyOrder.map((b, column) => transitionCorrection[a][b]
      + (row === column ? harmonicFrequencies[a] : 0)));
  const mixedTransitions = jacobiEigenpairs(effectiveTransitionMatrix)
    .map(({eigenvalue}) => eigenvalue);
  const diagonalOnlyTransitions = effectiveTransitionMatrix
    .map((row, index) => row[index]).sort((a, b) => a - b);
  const closestHarmonicPair = ascendingFrequencyOrder.slice(0, -1).map((a, index) => {
    const b = ascendingFrequencyOrder[index + 1];
    return {
      lowerIndexAscendingFrequency: index,
      upperIndexAscendingFrequency: index + 1,
      separation: harmonicFrequencies[b] - harmonicFrequencies[a],
      offDiagonalQuarticMixing: transitionCorrection[a][b]
    };
  }).sort((a, b) => a.separation - b.separation)[0];
  const strongestMixingPair = ascendingFrequencyOrder.flatMap((a, lower) =>
    ascendingFrequencyOrder.slice(lower + 1).map((b, offset) => ({
      lowerIndexAscendingFrequency: lower,
      upperIndexAscendingFrequency: lower + offset + 1,
      harmonicSeparation: harmonicFrequencies[b] - harmonicFrequencies[a],
      offDiagonalQuarticMixing: transitionCorrection[a][b]
    }))).sort((a, b) => Math.abs(b.offDiagonalQuarticMixing)
      - Math.abs(a.offDiagonalQuarticMixing))[0];
  const modes = eigenpairs.map(({eigenvalue}, a) => {
    const harmonic = Math.sqrt(U * u / eigenvalue);
    const bracket = variances[a] ** 2 * overlap[a][a]
      + variances[a] * eigenpairs.reduce((sum, _, b) =>
        sum + (a === b ? 0 : variances[b] * overlap[a][b]), 0);
    const quarticCorrection = -u * bracket / 2;
    return {
      eigenvalue,
      harmonicFrequency: harmonic,
      quarticCorrection,
      correctedFrequencyFirstOrder: harmonic + quarticCorrection,
      fractionalCorrection: quarticCorrection / harmonic,
      modeInverseParticipation: overlap[a][a]
    };
  }).sort((a, b) => a.harmonicFrequency - b.harmonicFrequency);
  return {
    chargingToCosineRatio: ratio,
    maximumNormalModeVariance: Math.max(...variances),
    maximumPhysicalCoordinateVariance: Math.max(...physicalCoordinateVariances),
    maximumAbsoluteOffDiagonalTransitionMixing: Math.max(...transitionCorrection.flatMap(
      (row, i) => row.filter((_, j) => i !== j).map(Math.abs))),
    closestHarmonicPair,
    strongestMixingPair,
    maximumMixedVersusDiagonalOnlyTransitionDifference: Math.max(
      ...mixedTransitions.map((value, index) => Math.abs(value - diagonalOnlyTransitions[index]))
    ),
    maximumRelativeMixedVersusDiagonalOnlyTransitionDifference: Math.max(
      ...mixedTransitions.map((value, index) =>
        Math.abs(value - diagonalOnlyTransitions[index]) / diagonalOnlyTransitions[index])
    ),
    mixedOneQuantumTransitionsAscending: mixedTransitions,
    softestMode: modes[0],
    largestAbsoluteFractionalCorrection: Math.max(...modes.map((mode) =>
      Math.abs(mode.fractionalCorrection))),
    allModesAscendingHarmonicFrequency: modes
  };
});
const reference = scans[0];
const scaleFreeFractionalCoefficientsAscendingFrequency =
  reference.allModesAscendingHarmonicFrequency.map((mode) =>
    -mode.fractionalCorrection / Math.sqrt(reference.chargingToCosineRatio));

console.log(JSON.stringify({
  schemaVersion: "leech-coupled-anharmonicity-analysis-run-v1",
  model: "H=(U/2)n^T G^-1 n+u sum_i(1-cos theta_i)",
  expansion: "cos theta=1-theta^2/2+theta^4/24+O(theta^6); first-order perturbation in the quartic term",
  formula: "delta_omega_a=-(u/2)[s_a^2 C_aa+s_a sum_{b!=a}s_b C_ab], s_a=(1/2)sqrt(U/(u lambda_a)), C_ab=sum_i O_ia^2 O_ib^2",
  maximumEigenResidual: maximumResidual,
  scaleFreeLaw: "delta_omega_a/omega_a=-alpha_a sqrt(U/u)+higher orders",
  scaleFreeFractionalCoefficientsAscendingFrequency,
  scans
}, null, 2));
