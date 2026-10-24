import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const population = JSON.parse(await readFile(resolve(root, "evidence/data/zenodo-eis-population-passive-audit-v1.json"), "utf8"));
const sourceRoot = resolve(root, "evidence/sources/zenodo-15422339");
const relaxationHz = [0.1, 1, 10, 100, 1000];
const names = ["seriesResistanceOhm", "seriesInductanceH", ...relaxationHz.map(value => `debyeResistanceAt${value}HzOhm`), "warburgOhmSqrtRadPerSecond"];
const calibrationIndices = [0, 29];
const neighbourCount = 3;
function basis(f) { const w = 2 * Math.PI * f; const v = [{ re: 1, im: 0 }, { re: 0, im: w }]; for (const c of relaxationHz) { const x = w / (2 * Math.PI * c); v.push({ re: 1 / (1 + x * x), im: -x / (1 + x * x) }); } const s = 1 / Math.sqrt(2 * w); v.push({ re: s, im: -s }); return v; }
const predict = (f, c) => basis(f).reduce((sum, item, i) => ({ re: sum.re + item.re * c[i], im: sum.im + item.im * c[i] }), { re: 0, im: 0 });
const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const vector = cell => calibrationIndices.flatMap(index => [cell.rows[index].measured.re, cell.rows[index].measured.im]);
const scalesFor = cells => vector(cells[0]).map((_, j) => { const m = mean(cells.map(cell => vector(cell)[j])); return Math.sqrt(mean(cells.map(cell => (vector(cell)[j] - m) ** 2))) || 1; });
const coefficientsFor = (target, donors) => { const scales = scalesFor(donors); const distance = donor => Math.hypot(...vector(target).map((value, j) => (value - vector(donor)[j]) / scales[j])); const neighbours = [...donors].sort((a, b) => distance(a) - distance(b)).slice(0, neighbourCount); return names.map(name => mean(neighbours.map(cell => cell.parameters[name]))); };
const maxRelativeError = (cell, coefficients) => Math.max(...cell.evaluation.map(row => { const p = predict(row.frequencyHz, coefficients); return Math.hypot(p.re - row.measured.re, p.im - row.measured.im) / Math.hypot(row.measured.re, row.measured.im); }));
const cells = [];
for (const source of population.cells) { const text = await readFile(resolve(sourceRoot, `${source.id}.csv`), "utf8"); const rows = text.trim().split(/\r?\n/u).slice(1).map((line, index) => { const [frequencyHz, re, im] = line.split(",").map(Number); return { index, frequencyHz, measured: { re, im } }; }); cells.push({ id: source.id, rows, evaluation: rows.filter(row => row.index % 3 === 1), parameters: source.fittedParameters }); }
const rankThreshold = (scores, coverage) => { const sorted = [...scores].sort((a, b) => a - b); const rank = Math.min(sorted.length, Math.ceil((sorted.length + 1) * coverage)); return { rank, threshold: sorted[rank - 1] }; };
const results = [];
for (const target of cells) {
  const donors = cells.filter(cell => cell.id !== target.id);
  const calibrationScores = donors.map(validation => maxRelativeError(validation, coefficientsFor(validation, donors.filter(cell => cell.id !== validation.id))));
  const targetScore = maxRelativeError(target, coefficientsFor(target, donors));
  const q90 = rankThreshold(calibrationScores, 0.90);
  const q95 = rankThreshold(calibrationScores, 0.95);
  results.push({ id: target.id, calibrationDonors: donors.length, targetWholeSpectrumMaximumRelativeError: targetScore, q90, q95, coveredAt90: targetScore <= q90.threshold, coveredAt95: targetScore <= q95.threshold });
}
const coverage90 = results.filter(cell => cell.coveredAt90).length;
const coverage95 = results.filter(cell => cell.coveredAt95).length;
const output = { protocol: "zenodo-eis-frozen-two-tone-simultaneous-coverage/1", date: "2026-10-25", source: { doi: "10.5281/zenodo.15422339", cells: results.length }, frozenProtocol: { calibrationFrequenciesHz: [10000, 2.82193493843079], neighbourCount, evaluationFrequenciesPerCell: 15, nonconformityScore: "maximum complex relative error across all fifteen evaluation frequencies", targetResidualUsedForItsThreshold: false, thresholdRule: "ceil((n+1)*coverage)-th ordered nested donor score", caveat: "Overlapping leave-one-donor-out fits are not independent split-conformal calibration; empirical coverage here is an internal jackknife-style audit, not a distribution-free prospective guarantee." }, population: { coveredCellsAt90: coverage90, coverageFractionAt90: coverage90 / results.length, coveredCellsAt95: coverage95, coverageFractionAt95: coverage95 / results.length, failuresAt90: results.filter(cell => !cell.coveredAt90).map(cell => cell.id), failuresAt95: results.filter(cell => !cell.coveredAt95).map(cell => cell.id), medianQ90: median(results.map(cell => cell.q90.threshold)), medianQ95: median(results.map(cell => cell.q95.threshold)), medianTargetMaximumRelativeError: median(results.map(cell => cell.targetWholeSpectrumMaximumRelativeError)), worstTargetMaximumRelativeError: Math.max(...results.map(cell => cell.targetWholeSpectrumMaximumRelativeError)) }, cells: results, decision: { internalWholeSpectrumCoverageAudited: true, allCellsCoveredAt95: coverage95 === results.length, nominal95CoverageMetEmpirically: coverage95 / results.length >= 0.95, distributionFreeProspectiveCoverageEstablished: false, externalBatchReplicationEstablished: false, measurementCovarianceEstablished: false, detectorLikelihoodClosed: false, generatedDynamicsEstablished: false, newPhysicsEvidence: false } };
output.implication = output.decision.nominal95CoverageMetEmpirically ? "The frozen two-tone protocol meets nominal 95% simultaneous whole-spectrum coverage internally under nested donor scoring. Dependence among calibration fits prevents a distribution-free prospective claim; external split calibration remains required." : "The frozen two-tone protocol fails nominal 95% internal whole-spectrum coverage; its point-prediction success does not yet support a calibrated simultaneous band.";
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-frozen-two-tone-simultaneous-coverage-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
