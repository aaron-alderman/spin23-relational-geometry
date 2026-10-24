import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const population = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-population-passive-audit-v1.json"), "utf8"));
const sourceRoot = resolve(root, "evidence/sources/zenodo-15422339");
const relaxationHz = [0.1, 1, 10, 100, 1000];
const parameterNames = ["seriesResistanceOhm", "seriesInductanceH", ...relaxationHz.map(value => `debyeResistanceAt${value}HzOhm`), "warburgOhmSqrtRadPerSecond"];
const candidateK = [1, 3, 5, 7, 9, 13, 17];

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
const vector = (cell, secondIndex) => [cell.rows[0].measured.re, cell.rows[0].measured.im, cell.rows[secondIndex].measured.re, cell.rows[secondIndex].measured.im];
const scalesFor = (cells, secondIndex) => {
  const vectors = cells.map(cell => vector(cell, secondIndex));
  return vectors[0].map((_, coordinate) => {
    const centre = mean(vectors.map(item => item[coordinate]));
    return Math.sqrt(mean(vectors.map(item => (item[coordinate] - centre) ** 2))) || 1;
  });
};
const distance = (a, b, secondIndex, scales) => Math.hypot(...vector(a, secondIndex).map((value, coordinate) => (value - vector(b, secondIndex)[coordinate]) / scales[coordinate]));
const neighbourPrediction = (target, donors, secondIndex, k) => {
  const scales = scalesFor(donors, secondIndex);
  const neighbours = [...donors].sort((a, b) => distance(target, a, secondIndex, scales) - distance(target, b, secondIndex, scales)).slice(0, k);
  return { neighbours: neighbours.map(cell => cell.id), coefficients: parameterNames.map(name => mean(neighbours.map(cell => cell.parameters[name]))) };
};
const cellLoss = (cell, coefficients) => mean(cell.heldOut.map(row => {
  const estimate = predict(row.frequencyHz, coefficients);
  return Math.hypot(estimate.re - row.measured.re, estimate.im - row.measured.im) / Math.hypot(row.measured.re, row.measured.im);
}));

const cells = [];
for (const source of population.cells) {
  const text = await readFile(resolve(sourceRoot, `${source.id}.csv`), "utf8");
  const rows = text.trim().split(/\r?\n/u).slice(1).map((line, index) => { const [frequencyHz, re, im] = line.split(",").map(Number); return { index, frequencyHz, measured: { re, im } }; });
  cells.push({ id: source.id, rows, parameters: source.fittedParameters, heldOut: rows.filter(row => row.index % 3 === 1) });
}
const candidateSecondIndices = cells[0].rows.filter(row => row.index !== 0 && row.index % 3 !== 1).map(row => row.index);
const frequencyByIndex = Object.fromEntries(cells[0].rows.map(row => [String(row.index), row.frequencyHz]));
const results = [];
for (const target of cells) {
  const donors = cells.filter(cell => cell.id !== target.id);
  const candidates = [];
  for (const secondIndex of candidateSecondIndices) for (const k of candidateK) {
    const losses = donors.map(validationCell => {
      const innerDonors = donors.filter(cell => cell.id !== validationCell.id);
      return cellLoss(validationCell, neighbourPrediction(validationCell, innerDonors, secondIndex, k).coefficients);
    });
    candidates.push({ secondIndex, secondFrequencyHz: frequencyByIndex[String(secondIndex)], k, meanCellMeanRelativeError: mean(losses), medianCellMeanRelativeError: median(losses) });
  }
  candidates.sort((a, b) => a.meanCellMeanRelativeError - b.meanCellMeanRelativeError || a.secondIndex - b.secondIndex || a.k - b.k);
  const selected = candidates[0];
  const model = neighbourPrediction(target, donors, selected.secondIndex, selected.k);
  const evaluated = target.heldOut.map(row => {
    const estimated = predict(row.frequencyHz, model.coefficients);
    const absoluteErrorOhm = Math.hypot(estimated.re - row.measured.re, estimated.im - row.measured.im);
    return { frequencyHz: row.frequencyHz, measured: row.measured, predicted: estimated, absoluteErrorOhm, relativeError: absoluteErrorOhm / Math.hypot(row.measured.re, row.measured.im) };
  });
  const errors = evaluated.map(row => row.relativeError);
  const metrics = { count: evaluated.length, rmseOhm: Math.sqrt(mean(evaluated.map(row => row.absoluteErrorOhm ** 2))), medianRelativeError: median(errors), meanRelativeError: mean(errors), maximumRelativeError: Math.max(...errors) };
  const passed = metrics.medianRelativeError <= 0.05 && metrics.maximumRelativeError <= 0.20;
  results.push({ id: target.id, donorCells: donors.length, calibration: [{ rowIndex: 0, frequencyHz: target.rows[0].frequencyHz, measured: target.rows[0].measured }, { rowIndex: selected.secondIndex, frequencyHz: selected.secondFrequencyHz, measured: target.rows[selected.secondIndex].measured }], selectedK: selected.k, donorSelectionTopFive: candidates.slice(0, 5), neighbours: model.neighbours, predictedParameters: Object.fromEntries(parameterNames.map((name, index) => [name, model.coefficients[index]])), heldOut: metrics, passed });
}
const passed = results.filter(cell => cell.passed);
const byMedian = [...results].sort((a, b) => a.heldOut.medianRelativeError - b.heldOut.medianRelativeError);
const byMaximum = [...results].sort((a, b) => a.heldOut.maximumRelativeError - b.heldOut.maximumRelativeError);
const selectedFrequencyCounts = {};
for (const cell of results) { const key = String(cell.calibration[1].frequencyHz); selectedFrequencyCounts[key] = (selectedFrequencyCounts[key] ?? 0) + 1; }
const output = {
  protocol: "zenodo-eis-two-point-latent-state-predictor/1",
  date: "2026-10-25",
  source: { doi: "10.5281/zenodo.15422339", cells: results.length },
  preregistration: { targetEvaluationValuesUsedForPrediction: false, firstCalibrationRecord: "fixed 10000 Hz complex impedance", secondCalibrationSelection: "among every non-evaluation source row except row zero, selected inside the other 53 cells by nested leave-one-donor-out loss", model: "k-nearest donor cells in standardized four-real calibration coordinates; mean donor passive parameters", neighbourSelection: "jointly selected with second frequency inside donors", candidateK, candidateSecondIndices, evaluationRows: "source row index modulo 3 equals 1", thresholds: population.frozenProtocol.thresholds },
  population: { passedCells: passed.length, failedCells: results.length - passed.length, passFraction: passed.length / results.length, medianCellMedianRelativeError: median(results.map(cell => cell.heldOut.medianRelativeError)), worstCellMedianRelativeError: byMedian.at(-1).heldOut.medianRelativeError, medianCellMaximumRelativeError: median(results.map(cell => cell.heldOut.maximumRelativeError)), worstCellMaximumRelativeError: byMaximum.at(-1).heldOut.maximumRelativeError, worstMedianCell: byMedian.at(-1).id, worstMaximumCell: byMaximum.at(-1).id, selectedFrequencyCounts },
  cells: results,
  decision: { allCellsPassWithTwoCalibrationPoints: passed.length === results.length, twoPointLatentStatePredictorEstablishedForThisPopulation: passed.length === results.length, simultaneousPredictiveDistributionEstablished: false, measurementCovarianceEstablished: false, detectorLikelihoodClosed: false, generatedDynamicsEstablished: false, newPhysicsEvidence: false },
};
output.implication = output.decision.allCellsPassWithTwoCalibrationPoints ? "Two donor-selected separated complex calibration records predict every untouched spectrum inside the frozen ceilings. This closes a minimal point-prediction state bridge for this population, not simultaneous uncertainty, detector likelihood, dynamics or new physics." : "The donor-selected two-point predictor fails at least one cell. Two complex calibration records do not close population-wide latent-state transport under the frozen model.";
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-two-point-latent-state-predictor-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
