import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const population = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-population-passive-audit-v1.json"), "utf8"));
const sourceRoot = resolve(root, "evidence/sources/zenodo-15422339");
const relaxationHz = [0.1, 1, 10, 100, 1000];
const names = ["seriesResistanceOhm", "seriesInductanceH", ...relaxationHz.map(value => `debyeResistanceAt${value}HzOhm`), "warburgOhmSqrtRadPerSecond"];
const calibrationIndices = [0, 29];
const k = 3;
function basis(frequencyHz) { const omega = 2 * Math.PI * frequencyHz; const values = [{ re: 1, im: 0 }, { re: 0, im: omega }]; for (const centreHz of relaxationHz) { const x = omega / (2 * Math.PI * centreHz); values.push({ re: 1 / (1 + x * x), im: -x / (1 + x * x) }); } const scale = 1 / Math.sqrt(2 * omega); values.push({ re: scale, im: -scale }); return values; }
const predict = (frequencyHz, c) => basis(frequencyHz).reduce((sum, item, index) => ({ re: sum.re + item.re * c[index], im: sum.im + item.im * c[index] }), { re: 0, im: 0 });
const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const vector = cell => calibrationIndices.flatMap(index => [cell.rows[index].measured.re, cell.rows[index].measured.im]);
const scalesFor = cells => vector(cells[0]).map((_, coordinate) => { const centre = mean(cells.map(cell => vector(cell)[coordinate])); return Math.sqrt(mean(cells.map(cell => (vector(cell)[coordinate] - centre) ** 2))) || 1; });
const distance = (a, b, scales) => Math.hypot(...vector(a).map((value, coordinate) => (value - vector(b)[coordinate]) / scales[coordinate]));
const cells = [];
for (const source of population.cells) { const text = await readFile(resolve(sourceRoot, `${source.id}.csv`), "utf8"); const rows = text.trim().split(/\r?\n/u).slice(1).map((line, index) => { const [frequencyHz, re, im] = line.split(",").map(Number); return { index, frequencyHz, measured: { re, im } }; }); cells.push({ id: source.id, rows, parameters: source.fittedParameters }); }
if (cells[0].rows[0].frequencyHz !== 10000 || cells[0].rows[29].frequencyHz !== 2.82193493843079) throw new Error("frozen calibration grid changed");
const results = [];
for (const target of cells) {
  const donors = cells.filter(cell => cell.id !== target.id);
  const scales = scalesFor(donors);
  const neighbours = [...donors].sort((a, b) => distance(target, a, scales) - distance(target, b, scales)).slice(0, k);
  const coefficients = names.map(name => mean(neighbours.map(cell => cell.parameters[name])));
  const evaluated = target.rows.filter(row => row.index % 3 === 1).map(row => { const estimated = predict(row.frequencyHz, coefficients); const absoluteErrorOhm = Math.hypot(estimated.re - row.measured.re, estimated.im - row.measured.im); return { frequencyHz: row.frequencyHz, measured: row.measured, predicted: estimated, absoluteErrorOhm, relativeError: absoluteErrorOhm / Math.hypot(row.measured.re, row.measured.im) }; });
  const errors = evaluated.map(row => row.relativeError);
  const metrics = { count: evaluated.length, rmseOhm: Math.sqrt(mean(evaluated.map(row => row.absoluteErrorOhm ** 2))), medianRelativeError: median(errors), meanRelativeError: mean(errors), maximumRelativeError: Math.max(...errors) };
  const passed = metrics.medianRelativeError <= 0.05 && metrics.maximumRelativeError <= 0.20;
  results.push({ id: target.id, calibration: calibrationIndices.map(index => ({ rowIndex: index, frequencyHz: target.rows[index].frequencyHz, measured: target.rows[index].measured })), neighbours: neighbours.map(cell => cell.id), predictedParameters: Object.fromEntries(names.map((name, index) => [name, coefficients[index]])), heldOut: metrics, passed });
}
const passed = results.filter(cell => cell.passed);
const byMedian = [...results].sort((a, b) => a.heldOut.medianRelativeError - b.heldOut.medianRelativeError);
const byMaximum = [...results].sort((a, b) => a.heldOut.maximumRelativeError - b.heldOut.maximumRelativeError);
const output = { protocol: "zenodo-eis-frozen-two-tone-protocol/1", date: "2026-10-25", source: { doi: "10.5281/zenodo.15422339", cells: results.length }, frozenProtocol: { targetEvaluationValuesUsedForPrediction: false, calibrationRows: calibrationIndices, calibrationFrequenciesHz: [10000, 2.82193493843079], neighbourCount: k, distance: "Euclidean distance in donor-standardized four-real calibration coordinates", parameterRule: "mean passive parameter vector of three nearest donor cells", evaluationRows: "source row index modulo 3 equals 1", thresholds: population.frozenProtocol.thresholds, adaptiveChoicesPerTarget: 0 }, population: { passedCells: passed.length, failedCells: results.length - passed.length, passFraction: passed.length / results.length, medianCellMedianRelativeError: median(results.map(cell => cell.heldOut.medianRelativeError)), worstCellMedianRelativeError: byMedian.at(-1).heldOut.medianRelativeError, medianCellMaximumRelativeError: median(results.map(cell => cell.heldOut.maximumRelativeError)), worstCellMaximumRelativeError: byMaximum.at(-1).heldOut.maximumRelativeError, worstMedianCell: byMedian.at(-1).id, worstMaximumCell: byMaximum.at(-1).id }, cells: results, decision: { frozenProtocolPassesAllCells: passed.length === results.length, deployableWithinBatchPointPredictionRuleEstablished: passed.length === results.length, simultaneousPredictiveDistributionEstablished: false, externalBatchReplicationEstablished: false, measurementCovarianceEstablished: false, detectorLikelihoodClosed: false, generatedDynamicsEstablished: false, newPhysicsEvidence: false } };
output.implication = output.decision.frozenProtocolPassesAllCells ? "The globally frozen two-tone, three-neighbour rule predicts every untouched spectrum inside the declared ceilings. This establishes a deployable within-batch point-prediction protocol, not uncertainty calibration, external replication, dynamics or new physics." : "The globally frozen two-tone rule fails at least one cell; AZ-092's adaptive selection cannot be promoted to a fixed within-batch protocol.";
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-frozen-two-tone-protocol-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
