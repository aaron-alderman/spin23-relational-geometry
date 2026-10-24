import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const population = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-population-passive-audit-v1.json"), "utf8"));
const sourceRoot = resolve(root, "evidence/sources/zenodo-15422339");
const relaxationHz = [0.1, 1, 10, 100, 1000];
const names = ["seriesResistanceOhm", "seriesInductanceH", ...relaxationHz.map(value => `debyeResistanceAt${value}HzOhm`), "warburgOhmSqrtRadPerSecond"];
function basis(frequencyHz) {
  const omega = 2 * Math.PI * frequencyHz;
  const values = [{ re: 1, im: 0 }, { re: 0, im: omega }];
  for (const centreHz of relaxationHz) { const x = omega / (2 * Math.PI * centreHz); values.push({ re: 1 / (1 + x * x), im: -x / (1 + x * x) }); }
  const scale = 1 / Math.sqrt(2 * omega);
  values.push({ re: scale, im: -scale });
  return values;
}
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
const predict = (frequencyHz, c) => basis(frequencyHz).reduce((sum, item, index) => ({ re: sum.re + item.re * c[index], im: sum.im + item.im * c[index] }), { re: 0, im: 0 });

const results = [];
for (const target of population.cells) {
  const donors = population.cells.filter(cell => cell.id !== target.id);
  const coefficients = names.map(name => median(donors.map(cell => cell.fittedParameters[name])));
  const text = await readFile(resolve(sourceRoot, `${target.id}.csv`), "utf8");
  const rows = text.trim().split(/\r?\n/u).slice(1).map((line, index) => { const [frequencyHz, re, im] = line.split(",").map(Number); return { index, frequencyHz, measured: { re, im } }; });
  const calibration = rows[0];
  if (calibration.frequencyHz !== 10000) throw new Error(`${target.id} calibration frequency changed`);
  const b = basis(calibration.frequencyHz);
  const nonSeries = b.slice(2).reduce((sum, item, index) => ({ re: sum.re + item.re * coefficients[index + 2], im: sum.im + item.im * coefficients[index + 2] }), { re: 0, im: 0 });
  coefficients[0] = calibration.measured.re - nonSeries.re;
  coefficients[1] = (calibration.measured.im - nonSeries.im) / b[1].im;
  const passive = coefficients.every(value => value >= 0);
  const evaluated = rows.filter(row => row.index % 3 === 1).map(row => {
    const predicted = predict(row.frequencyHz, coefficients);
    const absoluteErrorOhm = Math.hypot(predicted.re - row.measured.re, predicted.im - row.measured.im);
    return { frequencyHz: row.frequencyHz, measured: row.measured, predicted, absoluteErrorOhm, relativeError: absoluteErrorOhm / Math.hypot(row.measured.re, row.measured.im) };
  });
  const errors = evaluated.map(row => row.relativeError);
  const metrics = { count: evaluated.length, rmseOhm: Math.sqrt(mean(evaluated.map(row => row.absoluteErrorOhm ** 2))), medianRelativeError: median(errors), meanRelativeError: mean(errors), maximumRelativeError: Math.max(...errors) };
  const passed = passive && metrics.medianRelativeError <= 0.05 && metrics.maximumRelativeError <= 0.20;
  results.push({ id: target.id, donorCells: donors.length, calibration: { frequencyHz: calibration.frequencyHz, measured: calibration.measured }, donorRule: "coordinatewise median of other 53 fitted passive parameters", calibratedCoordinates: ["seriesResistanceOhm", "seriesInductanceH"], predictedParameters: Object.fromEntries(names.map((name, index) => [name, coefficients[index]])), passiveCoefficientConstraintSatisfied: passive, heldOut: metrics, passed });
}
const passed = results.filter(cell => cell.passed);
const byMedian = [...results].sort((a, b) => a.heldOut.medianRelativeError - b.heldOut.medianRelativeError);
const byMaximum = [...results].sort((a, b) => a.heldOut.maximumRelativeError - b.heldOut.maximumRelativeError);
const output = {
  protocol: "zenodo-eis-one-point-physical-anchor/1",
  date: "2026-10-25",
  source: { doi: "10.5281/zenodo.15422339", cells: results.length },
  preregistration: { targetEvaluationValuesUsedForPrediction: false, targetCalibrationRecord: "one complex impedance at fixed 10000 Hz source row", donorCoordinates: "coordinatewise median of the other 53 cells for five Debye weights and Warburg weight", targetCoordinates: "solve series R from the calibration real component and series L from its imaginary component after subtracting donor-derived nonseries contributions", fittedHyperparameters: 0, evaluationRows: "source row index modulo 3 equals 1", thresholds: population.frozenProtocol.thresholds },
  population: { passedCells: passed.length, failedCells: results.length - passed.length, passFraction: passed.length / results.length, passiveCells: results.filter(cell => cell.passiveCoefficientConstraintSatisfied).length, medianCellMedianRelativeError: median(results.map(cell => cell.heldOut.medianRelativeError)), worstCellMedianRelativeError: byMedian.at(-1).heldOut.medianRelativeError, medianCellMaximumRelativeError: median(results.map(cell => cell.heldOut.maximumRelativeError)), worstCellMaximumRelativeError: byMaximum.at(-1).heldOut.maximumRelativeError, worstMedianCell: byMedian.at(-1).id, worstMaximumCell: byMaximum.at(-1).id },
  cells: results,
  decision: { allCellsPassWithOnePhysicalAnchor: passed.length === results.length, twoCoordinateCellStateSufficientUnderFrozenThresholds: passed.length === results.length, simultaneousPredictiveDistributionEstablished: false, measurementCovarianceEstablished: false, detectorLikelihoodClosed: false, generatedDynamicsEstablished: false, newPhysicsEvidence: false },
};
output.implication = output.decision.allCellsPassWithOnePhysicalAnchor ? "One fixed complex calibration record determines the series R/L coordinates and lets donor-derived relaxation coordinates predict every untouched spectrum inside the frozen ceilings. This is a two-coordinate population state result, not uncertainty calibration, detector likelihood, dynamics or new physics." : "The physical two-coordinate anchor fails at least one unseen cell; coherent heterogeneity cannot be reduced to series resistance and inductance under the frozen passive family.";
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-one-point-physical-anchor-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
