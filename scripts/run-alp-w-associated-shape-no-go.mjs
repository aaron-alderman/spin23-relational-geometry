import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const outputPath = resolve(import.meta.dirname, "../evidence/data/alp-w-associated-shape-no-go-v1.json");

const transpose = matrix => matrix[0].map((_, column) => matrix.map(row => row[column]));
const multiply = (left, right) => left.map(row => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const matVec = (matrix, vector) => matrix.map(row => row.reduce((sum, value, index) => sum + value * vector[index], 0));
const maxAbs = values => Math.max(...values.flat(Infinity).map(value => Math.abs(value)));

function rank(matrix, tolerance = 1e-12) {
  const work = matrix.map(row => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < work[0].length; column += 1) {
    let pivot = pivotRow;
    while (pivot < work.length && Math.abs(work[pivot][column]) <= tolerance) pivot += 1;
    if (pivot === work.length) continue;
    [work[pivotRow], work[pivot]] = [work[pivot], work[pivotRow]];
    const scale = work[pivotRow][column];
    work[pivotRow] = work[pivotRow].map(value => value / scale);
    for (let row = 0; row < work.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = work[row][column];
      work[row] = work[row].map((value, index) => value - factor * work[pivotRow][index]);
    }
    pivotRow += 1;
  }
  return pivotRow;
}

// x=(v_u,v_d,a_2,c_WW) and y=(c_t,c_b,ctilde_WW).
// Bauer et al. Eqs. (10)-(11), in the corpus c_H=0 convention.
const sourceToAmplitude = [
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, -0.5, 1],
];
const blindDirection = [0, 0, 2, 1];

// Arbitrary phase-space/polarization derivatives with respect to the three
// amplitude coordinates. The proof does not depend on these values: J_x=J_y T.
const differentialJacobianMeasured = [
  [2, -1, 3],
  [0, 4, -2],
  [-3, 1, 5],
  [7, 2, 0],
  [1, -6, 4],
  [5, 3, -1],
  [-2, -4, 6],
  [9, 0, 2],
];
const differentialJacobianSource = multiply(differentialJacobianMeasured, sourceToAmplitude);
const detectorFold = [
  [1, 0, 0, 0, 0.5, 0, 0, 0],
  [0, 1, 0, 0, 0, 0.25, 0, 0],
  [0, 0, 1, 0, 0, 0, 0.5, 0],
  [0, 0, 0, 1, 0, 0, 0, 0.25],
  [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
];
const detectorJacobianSource = multiply(detectorFold, differentialJacobianSource);

const measuredKernel = [
  [9, -3, 6],
  [-3, 4, -4],
  [6, -4, 16],
];
const sourceKernel = multiply(transpose(sourceToAmplitude), multiply(measuredKernel, sourceToAmplitude));

const settings = [];
for (const ct of [-1, 0, 1]) for (const cb of [-1, 0, 1]) for (const ctw of [-1, 0, 1]) {
  const representative = [-ct, -cb, 0, ctw];
  settings.push({ measured: [ct, cb, ctw], sourceRepresentative: representative, shiftedRepresentative: representative.map((value, index) => value + 7 * blindDirection[index]) });
}

const result = {
  protocol: "alp-w-associated-shape-no-go/1",
  packet: "AZ-114",
  targets: ["OT-047", "OT-048"],
  parent: "AZ-113",
  sourceConvention: {
    reference: "Bauer et al., arXiv:2012.12272v2, Eqs. (1), (9)-(11)",
    sourceCoordinates: ["v_u", "v_d", "a_2", "c_WW"],
    amplitudeCoordinates: ["c_t", "c_b", "ctilde_WW"],
    equations: ["c_t=-v_u", "c_b=-v_d", "ctilde_WW=c_WW-a_2/2"],
    sourceToAmplitude,
    mapRank: rank(sourceToAmplitude),
    blindDirection,
    blindImage: matVec(sourceToAmplitude, blindDirection),
  },
  pointwiseCertificate: {
    differentialBins: differentialJacobianMeasured.length,
    measuredJacobianRank: rank(differentialJacobianMeasured),
    sourceJacobianRank: rank(differentialJacobianSource),
    sourceBlindResidual: maxAbs(matVec(differentialJacobianSource, blindDirection)),
    detectorRecords: detectorFold.length,
    detectorJacobianRank: rank(detectorJacobianSource),
    detectorBlindResidual: maxAbs(matVec(detectorJacobianSource, blindDirection)),
    theorem: "For every phase-space point and polarization, J_source=J_measured*T, so J_source*n=0. Any linear detector fold D preserves the null direction because D*J_source*n=0.",
  },
  quadraticCertificate: {
    measuredKernel,
    measuredKernelRank: rank(measuredKernel),
    sourceKernel,
    sourceKernelRank: rank(sourceKernel),
    sourceKernelBlindResidual: maxAbs(matVec(sourceKernel, blindDirection)),
    congruence: "K_source=T^T K_measured T",
  },
  factorialCertificate: {
    measuredSettings: settings.length,
    allMeasuredSettingsReachable: settings.every(item => maxAbs(matVec(sourceToAmplitude, item.sourceRepresentative).map((value, index) => value - item.measured[index])) < 1e-12),
    allShiftedRepresentativesEquivalent: settings.every(item => maxAbs(matVec(sourceToAmplitude, item.shiftedRepresentative).map((value, index) => value - item.measured[index])) < 1e-12),
    affineDegeneracy: "Every one of the 27 measured settings represents the source line x+lambda*(0,0,2,1).",
  },
  decision: {
    az074StillIdentifiesThreeAmplitudeCoordinates: true,
    sameProcessDifferentialShapeSeparatesA2FromCww: false,
    polarizationOrBinningLiftsBlindDirection: false,
    detectorFoldingLiftsBlindDirection: false,
    dimensionFiveProcessClassNoGo: true,
    amplitudeComputed: false,
    newPhysicsEvidence: false,
  },
  scope: "The no-go applies to source-complete observables whose dimension-five ALP dependence factors through (c_t,c_b,ctilde_WW), including arbitrary differential bins and polarizations of the same W-associated process. It does not cover higher-dimensional operators, new light states, a UV boundary condition, or a genuinely different record sensitive to another fermion-current invariant.",
  implication: "The 27-setting W-associated calculation remains valuable for identifying the three amplitude coordinates and testing closure, but it cannot by itself decide whether ctilde_WW came from a_2 or a direct c_WW. The sixth-coordinate detector must change the physical record, not merely retain more kinematics of the same factorized amplitude.",
  nextGate: "Choose an independent current-sensitive record (for example a lepton/neutrino or other flavor coordinate) and transport it with the same running/matching dictionary, or impose and test a UV condition such as c_WW=0. Reopen the same-process route only with a declared higher-dimensional operator or new state that breaks the factorization and survives basis-equivalence and Ward tests.",
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  mapRank: result.sourceConvention.mapRank,
  blindImage: result.sourceConvention.blindImage,
  sourceBlindResidual: result.pointwiseCertificate.sourceBlindResidual,
  detectorBlindResidual: result.pointwiseCertificate.detectorBlindResidual,
  sourceKernelRank: result.quadraticCertificate.sourceKernelRank,
  allMeasuredSettingsReachable: result.factorialCertificate.allMeasuredSettingsReachable,
  sameProcessDifferentialShapeSeparatesA2FromCww: false,
}, null, 2));
