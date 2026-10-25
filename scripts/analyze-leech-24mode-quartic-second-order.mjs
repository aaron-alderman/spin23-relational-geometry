#!/usr/bin/env node
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const analyzer = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "analyze-leech-pareto-transformers.mjs"), "--full"
], {encoding: "utf8"}));
const G = analyzer.results.find(({id}) => id === "gram-first").gram;
const modes = G.length;

const jacobi = (matrix, tolerance = 1e-13, maxRotations = 100000) => {
  const A = matrix.map((row) => [...row]);
  const V = Array.from({length: modes}, (_, i) => Array.from(
    {length: modes}, (_, j) => i === j ? 1 : 0
  ));
  for (let rotation = 0; rotation < maxRotations; rotation += 1) {
    let p = 0;
    let q = 1;
    let maximum = 0;
    for (let i = 0; i < modes; i += 1) for (let j = i + 1; j < modes; j += 1) {
      if (Math.abs(A[i][j]) > maximum) { maximum = Math.abs(A[i][j]); p = i; q = j; }
    }
    if (maximum < tolerance) return A.map((row, index) => ({
      eigenvalue: row[index], vector: V.map((vRow) => vRow[index])
    })).sort((a, b) => 1 / Math.sqrt(a.eigenvalue) - 1 / Math.sqrt(b.eigenvalue));
    const angle = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const app = A[p][p];
    const aqq = A[q][q];
    const apq = A[p][q];
    for (let k = 0; k < modes; k += 1) if (k !== p && k !== q) {
      const akp = A[k][p];
      const akq = A[k][q];
      A[k][p] = A[p][k] = c * akp - s * akq;
      A[k][q] = A[q][k] = s * akp + c * akq;
    }
    A[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    A[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    A[p][q] = A[q][p] = 0;
    for (let k = 0; k < modes; k += 1) {
      const vkp = V[k][p];
      const vkq = V[k][q];
      V[k][p] = c * vkp - s * vkq;
      V[k][q] = s * vkp + c * vkq;
    }
  }
  throw new Error("Jacobi eigensolver did not converge");
};

const pairs = jacobi(G);
const referenceRatio = 1;
const frequencies = pairs.map(({eigenvalue}) => Math.sqrt(referenceRatio / eigenvalue));
const variances = pairs.map(({eigenvalue}) => 0.5 * Math.sqrt(referenceRatio / eigenvalue));
const zero = Array(modes).fill(0);
const soft = [...zero];
soft[0] = 1;
const key = (occupation) => occupation.join(",");
const total = (occupation) => occupation.reduce((sum, value) => sum + value, 0);

const singleton = (occupation) => new Map([[
  key(occupation), {occupation, amplitude: 1}
]]);
const add = (map, occupation, amplitude) => {
  if (Math.abs(amplitude) < 1e-18) return;
  const stateKey = key(occupation);
  const existing = map.get(stateKey);
  if (existing) existing.amplitude += amplitude;
  else map.set(stateKey, {occupation, amplitude});
};
const applyTheta = (vector, coordinate) => {
  const output = new Map();
  for (const {occupation, amplitude} of vector.values()) for (let mode = 0; mode < modes; mode += 1) {
    const coefficient = pairs[mode].vector[coordinate] * Math.sqrt(variances[mode]);
    const raised = [...occupation];
    raised[mode] += 1;
    add(output, raised, amplitude * coefficient * Math.sqrt(occupation[mode] + 1));
    if (occupation[mode] > 0) {
      const lowered = [...occupation];
      lowered[mode] -= 1;
      add(output, lowered, amplitude * coefficient * Math.sqrt(occupation[mode]));
    }
  }
  return output;
};
const applyQuartic = (occupation) => {
  const output = new Map();
  for (let coordinate = 0; coordinate < modes; coordinate += 1) {
    let vector = singleton(occupation);
    for (let power = 0; power < 4; power += 1) vector = applyTheta(vector, coordinate);
    for (const state of vector.values()) add(output, state.occupation, -state.amplitude / 24);
  }
  return output;
};

const groundVector = applyQuartic(zero);
const softVector = applyQuartic(soft);
const energy = (occupation) => occupation.reduce((sum, value, mode) =>
  sum + value * frequencies[mode], 0);
const corrections = (vector, source) => {
  const sourceKey = key(source);
  const sourceEnergy = energy(source);
  const byExcitation = {};
  let secondOrder = 0;
  for (const [stateKey, state] of vector) {
    if (stateKey === sourceKey) continue;
    const denominator = sourceEnergy - energy(state.occupation);
    const contribution = state.amplitude ** 2 / denominator;
    const excitation = total(state.occupation);
    byExcitation[excitation] = (byExcitation[excitation] ?? 0) + contribution;
    secondOrder += contribution;
  }
  return {
    diagonalFirstOrder: vector.get(sourceKey).amplitude,
    secondOrder,
    byExcitation,
    reachableStatesIncludingSource: vector.size
  };
};
const ground = corrections(groundVector, zero);
const excited = corrections(softVector, soft);
const firstOrderGapCoefficient = excited.diagonalFirstOrder - ground.diagonalFirstOrder;
const secondOrderGapCoefficient = excited.secondOrder - ground.secondOrder;
const physicalCoordinateVariances = Array.from({length: modes}, (_, coordinate) =>
  pairs.reduce((sum, pair, mode) =>
    sum + pair.vector[coordinate] ** 2 * variances[mode], 0));
const sexticFirstOrderGapCoefficient = variances[0] * pairs[0].vector.reduce(
  (sum, value, coordinate) => sum + value ** 2 * physicalCoordinateVariances[coordinate] ** 2, 0
) / 8;
const fullCosineOrderThreeHalvesCoefficient = secondOrderGapCoefficient
  + sexticFirstOrderGapCoefficient;

const ratios = [0.0001, 0.001, 0.01];
const scans = ratios.map((ratio) => {
  const harmonicGap = frequencies[0] * Math.sqrt(ratio);
  const firstOrderGapCorrection = firstOrderGapCoefficient * ratio;
  const secondOrderGapCorrection = secondOrderGapCoefficient * ratio ** 1.5;
  const sexticFirstOrderGapCorrection = sexticFirstOrderGapCoefficient * ratio ** 1.5;
  const fullCosineOrderThreeHalvesCorrection = fullCosineOrderThreeHalvesCoefficient
    * ratio ** 1.5;
  return {
    chargingToCosineRatio: ratio,
    harmonicGap,
    firstOrderQuarticGapCorrection: firstOrderGapCorrection,
    secondOrderQuarticGapCorrection: secondOrderGapCorrection,
    firstOrderSexticGapCorrection: sexticFirstOrderGapCorrection,
    fullCosineOrderThreeHalvesCorrection,
    secondOrderRelativeToHarmonic: secondOrderGapCorrection / harmonicGap,
    fullCosineOrderThreeHalvesRelativeToHarmonic:
      fullCosineOrderThreeHalvesCorrection / harmonicGap,
    gapThroughSecondOrderQuartic: harmonicGap + firstOrderGapCorrection + secondOrderGapCorrection,
    gapThroughFullCosineOrderThreeHalves:
      harmonicGap + firstOrderGapCorrection + fullCosineOrderThreeHalvesCorrection
  };
});

console.log(JSON.stringify({
  schemaVersion: "leech-24mode-quartic-second-order-run-v1",
  modes,
  sourceTransition: "harmonic vacuum to the softest one-quantum mode",
  perturbation: "V4=-(1/24) sum_i theta_i^4 at u=1",
  scaling: "first-order gap correction scales as U; second order scales as U^(3/2) at fixed u=1",
  reachableStateAudit: {
    ground: {
      statesIncludingSource: ground.reachableStatesIncludingSource,
      excitationSectors: Object.keys(ground.byExcitation).map(Number),
      secondOrderByExcitation: ground.byExcitation
    },
    softestOneQuantum: {
      statesIncludingSource: excited.reachableStatesIncludingSource,
      excitationSectors: Object.keys(excited.byExcitation).map(Number),
      secondOrderByExcitation: excited.byExcitation
    }
  },
  coefficientsAtUnitRatio: {
    firstOrderGap: firstOrderGapCoefficient,
    groundSecondOrder: ground.secondOrder,
    softestSecondOrder: excited.secondOrder,
    secondOrderGap: secondOrderGapCoefficient,
    sexticFirstOrderGap: sexticFirstOrderGapCoefficient,
    fullCosineOrderThreeHalvesGap: fullCosineOrderThreeHalvesCoefficient
  },
  scans
}, null, 2));
