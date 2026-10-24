import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const population = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-population-passive-audit-v1.json"), "utf8"));
const sourceRoot = resolve(root, "evidence/sources/zenodo-15422339");
const relaxationHz = [0.1, 1, 10, 100, 1000];
const parameterNames = ["seriesResistanceOhm", "seriesInductanceH", ...relaxationHz.map(value => `debyeResistanceAt${value}HzOhm`), "warburgOhmSqrtRadPerSecond"];
const candidateK = [1, 3, 5, 7, 9, 13, 17, 25, 35];

function basis(frequencyHz) {
  const omega = 2 * Math.PI * frequencyHz;
  const values = [{ re: 1, im: 0 }, { re: 0, im: omega }];
  for (const centreHz of relaxationHz) { const x = omega / (2 * Math.PI * centreHz); values.push({ re: 1 / (1 + x * x), im: -x / (1 + x * x) }); }
  const scale = 1 / Math.sqrt(2 * omega);
  values.push({ re: scale, im: -scale });
  return values;
}
const predict = (frequencyHz, coefficients) => basis(frequencyHz).reduce((sum, item, index) => ({ re: sum.re + item.re * coefficients[index], im: sum.im + item.im * coefficients[index] }), { re: 0, im: 0 });
const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const scaleFor = cells => {
  const reMean = mean(cells.map(cell => cell.calibration.re));
  const imMean = mean(cells.map(cell => cell.calibration.im));
  const reScale = Math.sqrt(mean(cells.map(cell => (cell.calibration.re - reMean) ** 2))) || 1;
  const imScale = Math.sqrt(mean(cells.map(cell => (cell.calibration.im - imMean) ** 2))) || 1;
  return { reScale, imScale };
};
const distance = (a, b, scale) => Math.hypot((a.calibration.re - b.calibration.re) / scale.reScale, (a.calibration.im - b.calibration.im) / scale.imScale);
const coefficientsFromNeighbours = (target, donors, k) => {
  const scale = scaleFor(donors);
  const neighbours = [...donors].sort((a, b) => distance(target, a, scale) - distance(target, b, scale)).slice(0, k);
  return {
    neighbours: neighbours.map(cell => cell.id),
    coefficients: parameterNames.map(name => mean(neighbours.map(cell => cell.parameters[name]))),
  };
};
const cellLoss = (cell, coefficients) => mean(cell.heldOut.map(row => {
  const estimate = predict(row.frequencyHz, coefficients);
  return Math.hypot(estimate.re - row.measured.re, estimate.im - row.measured.im) / Math.hypot(row.measured.re, row.measured.im);
}));

const cells = [];
for (const source of population.cells) {
  const text = await readFile(resolve(sourceRoot, `${source.id}.csv`), "utf8");
  const rows = text.trim().split(/\r?\n/u).slice(1).map((line, index) => { const [frequencyHz, re, im] = line.split(",").map(Number); return { index, frequencyHz, measured: { re, im } }; });
  if (rows[0].frequencyHz !== 10000) throw new Error(`${source.id} calibration frequency changed`);
  cells.push({ id: source.id, calibration: rows[0].measured, parameters: source.fittedParameters, heldOut: rows.filter(row => row.index % 3 === 1) });
}

const results = [];
for (const target of cells) {
  const donors = cells.filter(cell => cell.id !== target.id);
  const validation = candidateK.map(k => {
    const losses = donors.map(heldOutDonor => {
      const innerDonors = donors.filter(cell => cell.id !== heldOutDonor.id);
      return cellLoss(heldOutDonor, coefficientsFromNeighbours(heldOutDonor, innerDonors, k).coefficients);
    });
    return { k, meanCellMeanRelativeError: mean(losses), medianCellMeanRelativeError: median(losses) };
  });
  validation.sort((a, b) => a.meanCellMeanRelativeError - b.meanCellMeanRelativeError || a.k - b.k);
  const chosenK = validation[0].k;
  const neighbourPrediction = coefficientsFromNeighbours(target, donors, chosenK);
  const evaluated = target.heldOut.map(row => {
    const predicted = predict(row.frequencyHz, neighbourPrediction.coefficients);
    const absoluteErrorOhm = Math.hypot(predicted.re - row.measured.re, predicted.im - row.measured.im);
    return { frequencyHz: row.frequencyHz, measured: row.measured, predicted, absoluteErrorOhm, relativeError: absoluteErrorOhm / Math.hypot(row.measured.re, row.measured.im) };
  });
  const relativeErrors = evaluated.map(row => row.relativeError);
  const metrics = { count: evaluated.length, rmseOhm: Math.sqrt(mean(evaluated.map(row => row.absoluteErrorOhm ** 2))), medianRelativeError: median(relativeErrors), meanRelativeError: mean(relativeErrors), maximumRelativeError: Math.max(...relativeErrors) };
  const passed = metrics.medianRelativeError <= 0.05 && metrics.maximumRelativeError <= 0.20;
  results.push({ id: target.id, calibration: { frequencyHz: 10000, measured: target.calibration }, donorCells: donors.length, selectedK: chosenK, nestedValidation: validation, neighbours: neighbourPrediction.neighbours, predictedParameters: Object.fromEntries(parameterNames.map((name, index) => [name, neighbourPrediction.coefficients[index]])), heldOut: metrics, passed });
}

const passed = results.filter(cell => cell.passed);
const byMedian = [...results].sort((a, b) => a.heldOut.medianRelativeError - b.heldOut.medianRelativeError);
const byMaximum = [...results].sort((a, b) => a.heldOut.maximumRelativeError - b.heldOut.maximumRelativeError);
const output = {
  protocol: "zenodo-eis-one-point-latent-state-predictor/1",
  date: "2026-10-25",
  source: { doi: "10.5281/zenodo.15422339", cells: results.length },
  preregistration: {
    targetEvaluationValuesUsedForPrediction: false,
    targetCalibrationRecord: "one complex impedance at the fixed 10000 Hz source row",
    donorModel: "Euclidean k-nearest neighbours in donor-standardized calibration-plane coordinates; mean of neighbour passive parameter vectors",
    hyperparameterSelection: "for each outer target, choose k by mean cellwise mean relative error in leave-one-donor-out validation inside the other 53 cells",
    candidateK,
    evaluationRows: "source row index modulo 3 equals 1",
    thresholds: population.frozenProtocol.thresholds,
  },
  population: { passedCells: passed.length, failedCells: results.length - passed.length, passFraction: passed.length / results.length, medianCellMedianRelativeError: median(results.map(cell => cell.heldOut.medianRelativeError)), worstCellMedianRelativeError: byMedian.at(-1).heldOut.medianRelativeError, medianCellMaximumRelativeError: median(results.map(cell => cell.heldOut.maximumRelativeError)), worstCellMaximumRelativeError: byMaximum.at(-1).heldOut.maximumRelativeError, worstMedianCell: byMedian.at(-1).id, worstMaximumCell: byMaximum.at(-1).id, selectedKCounts: Object.fromEntries(candidateK.map(k => [String(k), results.filter(cell => cell.selectedK === k).length])) },
  cells: results,
  decision: { allCellsPassWithOneCalibrationPoint: passed.length === results.length, coherentCellStatePredictorEstablishedForThisPopulation: passed.length === results.length, simultaneousPredictiveDistributionEstablished: false, measurementCovarianceEstablished: false, detectorLikelihoodClosed: false, generatedDynamicsEstablished: false, newPhysicsEvidence: false },
};
output.implication = output.decision.allCellsPassWithOneCalibrationPoint ? "One fixed complex calibration point lets a donor-selected passive latent-state model predict every cell's untouched spectrum inside the declared error ceilings. This is a population prediction result, not a simultaneous predictive distribution, detector likelihood, generated dynamics or new physics." : "The nested one-point latent-state predictor fails at least one cell. One complex calibration record is insufficient to transport the coherent population state across the untouched spectrum under the declared model.";
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-one-point-latent-state-predictor-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
