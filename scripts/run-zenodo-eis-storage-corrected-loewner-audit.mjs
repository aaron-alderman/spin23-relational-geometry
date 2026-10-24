import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const write = process.argv.includes("--write");
const population = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-population-passive-audit-v1.json"), "utf8"));
const frequenciesHz = [1000, 3162.2776601683795, 10000];
const xs = frequenciesHz.map(value => 2 * Math.PI * value);
const relaxationHz = [0.1, 1, 10, 100, 1000];

function relaxationValue(x, parameters) {
  let value = parameters.seriesResistanceOhm + parameters.seriesInductanceH * x;
  for (const centreHz of relaxationHz) {
    const resistance = parameters[`debyeResistanceAt${centreHz}HzOhm`];
    const rate = 2 * Math.PI * centreHz;
    value += resistance / (1 + x / rate);
  }
  value += parameters.warburgOhmSqrtRadPerSecond / Math.sqrt(x);
  return value;
}

function relaxationDerivative(x, parameters) {
  let value = parameters.seriesInductanceH;
  for (const centreHz of relaxationHz) {
    const resistance = parameters[`debyeResistanceAt${centreHz}HzOhm`];
    const rate = 2 * Math.PI * centreHz;
    value -= (resistance / rate) / (1 + x / rate) ** 2;
  }
  value -= 0.5 * parameters.warburgOhmSqrtRadPerSecond * x ** -1.5;
  return value;
}

function loewner(parameters) {
  return xs.map((xi, i) => xs.map((xj, j) => {
    if (i === j) return -relaxationDerivative(xi, parameters);
    return (relaxationValue(xi, parameters) - relaxationValue(xj, parameters)) / (xj - xi);
  }));
}

function eigenvaluesSymmetric3(input) {
  const a = input.map(row => [...row]);
  for (let iteration = 0; iteration < 50; iteration += 1) {
    let p = 0;
    let q = 1;
    for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) {
      if (Math.abs(a[i][j]) > Math.abs(a[p][q])) [p, q] = [i, j];
    }
    if (Math.abs(a[p][q]) < 1e-20) break;
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const app = c * c * a[p][p] - 2 * s * c * a[p][q] + s * s * a[q][q];
    const aqq = s * s * a[p][p] + 2 * s * c * a[p][q] + c * c * a[q][q];
    for (let k = 0; k < 3; k += 1) {
      if (k === p || k === q) continue;
      const akp = a[k][p];
      const akq = a[k][q];
      a[k][p] = a[p][k] = c * akp - s * akq;
      a[k][q] = a[q][k] = s * akp + c * akq;
    }
    a[p][p] = app;
    a[q][q] = aqq;
    a[p][q] = a[q][p] = 0;
  }
  return [a[0][0], a[1][1], a[2][2]].sort((left, right) => left - right);
}

const cells = population.cells.map(cell => {
  const inductance = cell.fittedParameters.seriesInductanceH;
  const rawKernel = loewner(cell.fittedParameters);
  const correctedKernel = rawKernel.map(row => row.map(value => value + inductance));
  const rawEigenvalues = eigenvaluesSymmetric3(rawKernel);
  const correctedEigenvalues = eigenvaluesSymmetric3(correctedKernel);
  return {
    id: cell.id,
    inductanceH: inductance,
    rawKernel,
    rawEigenvalues,
    rawPasses: rawEigenvalues[0] >= -1e-14,
    correctedKernel,
    correctedEigenvalues,
    correctedPasses: correctedEigenvalues[0] >= -1e-14
  };
});

const rawPassed = cells.filter(cell => cell.rawPasses);
const correctedPassed = cells.filter(cell => cell.correctedPasses);
const output = {
  protocol: "zenodo-eis-storage-corrected-loewner-audit/1",
  date: "2026-10-25",
  source: { doi: "10.5281/zenodo.15422339", cells: cells.length },
  audit: {
    positiveLaplaceFrequenciesHz: frequenciesHz,
    coordinateRadPerSecond: xs,
    rawKernel: "Loewner kernel of the complete fitted impedance on the positive Laplace axis",
    correction: "add the fitted series inductance to every kernel entry, equivalently remove Ls before the shared-relaxation test",
    tolerance: -1e-14
  },
  population: {
    rawPassedCells: rawPassed.length,
    rawFailedCells: cells.length - rawPassed.length,
    correctedPassedCells: correctedPassed.length,
    correctedFailedCells: cells.length - correctedPassed.length,
    minimumRawEigenvalue: Math.min(...cells.map(cell => cell.rawEigenvalues[0])),
    minimumCorrectedEigenvalue: Math.min(...cells.map(cell => cell.correctedEigenvalues[0])),
    rawFailureIds: cells.filter(cell => !cell.rawPasses).map(cell => cell.id),
    correctedFailureIds: cells.filter(cell => !cell.correctedPasses).map(cell => cell.id)
  },
  cells,
  decision: {
    storageCorrectionMaterialToClassification: rawPassed.length !== correctedPassed.length,
    fittedRelaxationFamilyCertifiedPopulationWide: correctedPassed.length === cells.length,
    independentMeasuredDerivativeTestEstablished: false,
    measurementCovarianceEstablished: false,
    detectorLikelihoodClosed: false,
    novelFundamentalInequalityEstablished: false,
    newPhysicsEvidence: false
  },
  implication: "The fitted passive family carries one positive shared relaxation measure only after its inductive storage is typed separately. This certifies the model construction; absent measured slopes and covariance, it is not an independent test of the source records."
};

const serialized = `${JSON.stringify(output, null, 2)}\n`;
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-storage-corrected-loewner-audit-v1.json"), serialized, "utf8");
process.stdout.write(serialized);
