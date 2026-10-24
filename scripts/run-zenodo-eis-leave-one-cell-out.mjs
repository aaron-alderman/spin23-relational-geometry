import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const population = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-population-passive-audit-v1.json"), "utf8"));
const sourceRoot = resolve(root, "evidence/sources/zenodo-15422339");
const relaxationHz = [0.1, 1, 10, 100, 1000];
const parameterNames = ["seriesResistanceOhm", "seriesInductanceH", ...relaxationHz.map(value => `debyeResistanceAt${value}HzOhm`), "warburgOhmSqrtRadPerSecond"];
function basis(frequencyHz) {
  const omega = 2 * Math.PI * frequencyHz;
  const values = [{ re: 1, im: 0 }, { re: 0, im: omega }];
  for (const centreHz of relaxationHz) { const x = omega / (2 * Math.PI * centreHz); values.push({ re: 1 / (1 + x * x), im: -x / (1 + x * x) }); }
  const scale = 1 / Math.sqrt(2 * omega);
  values.push({ re: scale, im: -scale });
  return values;
}
const median = values => { const sorted = [...values].sort((a, b) => a - b); return (sorted[26] + sorted[27]) / 2; };
const cells = [];
for (const target of population.cells) {
  const donors = population.cells.filter(cell => cell.id !== target.id);
  const coefficients = parameterNames.map(name => median(donors.map(cell => cell.fittedParameters[name])));
  const text = await readFile(resolve(sourceRoot, `${target.id}.csv`), "utf8");
  const rows = text.trim().split(/\r?\n/u).slice(1).map((line, index) => { const [frequencyHz, re, im] = line.split(",").map(Number); return { index, frequencyHz, measured: { re, im } }; });
  const heldOut = rows.filter(row => row.index % 3 === 1).map(row => {
    const predicted = basis(row.frequencyHz).reduce((sum, item, index) => ({ re: sum.re + item.re * coefficients[index], im: sum.im + item.im * coefficients[index] }), { re: 0, im: 0 });
    const absoluteErrorOhm = Math.hypot(predicted.re - row.measured.re, predicted.im - row.measured.im);
    return { frequencyHz: row.frequencyHz, measured: row.measured, predicted, absoluteErrorOhm, relativeError: absoluteErrorOhm / Math.hypot(row.measured.re, row.measured.im) };
  });
  const sorted = [...heldOut].sort((a, b) => a.relativeError - b.relativeError);
  const metrics = { count: heldOut.length, rmseOhm: Math.sqrt(heldOut.reduce((sum, row) => sum + row.absoluteErrorOhm ** 2, 0) / heldOut.length), medianRelativeError: sorted[Math.floor(heldOut.length / 2)].relativeError, maximumRelativeError: sorted.at(-1).relativeError };
  const passed = metrics.medianRelativeError <= 0.05 && metrics.maximumRelativeError <= 0.20;
  cells.push({ id: target.id, donorCells: donors.length, parameterRule: "coordinatewise median of the other 53 per-cell passive fits", predictedParameters: Object.fromEntries(parameterNames.map((name, index) => [name, coefficients[index]])), heldOut: metrics, passed });
}
const passed = cells.filter(cell => cell.passed);
const byMedian = [...cells].sort((a, b) => a.heldOut.medianRelativeError - b.heldOut.medianRelativeError);
const byMaximum = [...cells].sort((a, b) => a.heldOut.maximumRelativeError - b.heldOut.maximumRelativeError);
const output = {
  protocol: "zenodo-eis-leave-one-cell-out/1",
  date: "2026-10-25",
  source: { doi: "10.5281/zenodo.15422339", cells: cells.length },
  protocolBoundary: { targetCellImpedanceUsedForParameters: false, donorFitsPerTarget: 53, aggregation: "coordinatewise median", basis: population.frozenProtocol.model, heldOutRule: population.frozenProtocol.splitRule, thresholds: population.frozenProtocol.thresholds },
  population: { passedCells: passed.length, failedCells: cells.length - passed.length, passFraction: passed.length / cells.length, medianCellMedianRelativeError: byMedian[Math.floor(cells.length / 2)].heldOut.medianRelativeError, worstCellMedianRelativeError: byMedian.at(-1).heldOut.medianRelativeError, medianCellMaximumRelativeError: byMaximum[Math.floor(cells.length / 2)].heldOut.maximumRelativeError, worstCellMaximumRelativeError: byMaximum.at(-1).heldOut.maximumRelativeError, worstMedianCell: byMedian.at(-1).id, worstMaximumCell: byMaximum.at(-1).id },
  cells,
  decision: { allUnseenCellsPassWithoutRecalibration: passed.length === cells.length, sharedPopulationParameterPredictorEstablished: passed.length === cells.length, cellSpecificDynamicsDerived: false, measurementCovarianceEstablished: false, detectorLikelihoodClosed: false, newPhysicsEvidence: false },
};
output.implication = output.decision.allUnseenCellsPassWithoutRecalibration ? "The other-cell median parameter vector predicts every unseen cell inside the declared held-out ceilings. This establishes a reusable shared population baseline, not cell-specific dynamics, covariance, detector likelihood or new physics." : "The other-cell median law fails at least one unseen cell. The failure isolates population heterogeneity that must be modeled before residual interpretation.";
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-leave-one-cell-out-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
