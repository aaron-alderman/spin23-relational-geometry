import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const sourcePath = resolve(root, "evidence/sources/zenodo-15422339-id01.csv");
const sourceText = await readFile(sourcePath, "utf8");
const rows = sourceText.trim().split(/\r?\n/u).slice(1).map((line, index) => {
  const [frequencyHz, realOhm, imagOhm] = line.split(",").map(Number);
  return { index, frequencyHz, measured: { re: realOhm, im: imagOhm }, split: index % 3 === 1 ? "held-out" : "training" };
});

// Preregistered passive family: series R and L, five nonnegative Debye arcs on
// fixed decade centres, and one nonnegative semi-infinite Warburg coefficient.
// Only the source frequency range determines the basis locations; no measured
// impedance value from the held-out rows enters fitting.
const relaxationHz = [0.1, 1, 10, 100, 1000];
const parameterNames = ["seriesResistanceOhm", "seriesInductanceH", ...relaxationHz.map(value => `debyeResistanceAt${value}HzOhm`), "warburgOhmSqrtRadPerSecond"];
function basis(frequencyHz) {
  const omega = 2 * Math.PI * frequencyHz;
  const values = [{ re: 1, im: 0 }, { re: 0, im: omega }];
  for (const centreHz of relaxationHz) {
    const x = omega / (2 * Math.PI * centreHz);
    values.push({ re: 1 / (1 + x * x), im: -x / (1 + x * x) });
  }
  const scale = 1 / Math.sqrt(2 * omega);
  values.push({ re: scale, im: -scale });
  return values;
}
function solve(matrix, vector) {
  const n = vector.length;
  const a = matrix.map((row, i) => [...row, vector[i]]);
  for (let column = 0; column < n; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < n; row += 1) if (Math.abs(a[row][column]) > Math.abs(a[pivot][column])) pivot = row;
    if (Math.abs(a[pivot][column]) < 1e-18) return null;
    [a[column], a[pivot]] = [a[pivot], a[column]];
    const divisor = a[column][column];
    for (let j = column; j <= n; j += 1) a[column][j] /= divisor;
    for (let row = 0; row < n; row += 1) if (row !== column) {
      const factor = a[row][column];
      for (let j = column; j <= n; j += 1) a[row][j] -= factor * a[column][j];
    }
  }
  return a.map(row => row[n]);
}
const training = rows.filter(row => row.split === "training");
const columns = parameterNames.length;
const design = training.flatMap(row => {
  const b = basis(row.frequencyHz);
  return [b.map(value => value.re), b.map(value => value.im)];
});
const target = training.flatMap(row => [row.measured.re, row.measured.im]);
const scales = Array.from({ length: columns }, (_, column) => Math.sqrt(design.reduce((sum, row) => sum + row[column] ** 2, 0)) || 1);
const scaledDesign = design.map(row => row.map((value, column) => value / scales[column]));
let best = null;
for (let mask = 1; mask < 2 ** columns; mask += 1) {
  const active = Array.from({ length: columns }, (_, index) => index).filter(index => mask & (1 << index));
  const normal = active.map(i => active.map(j => scaledDesign.reduce((sum, row) => sum + row[i] * row[j], 0)));
  const rhs = active.map(i => scaledDesign.reduce((sum, row, k) => sum + row[i] * target[k], 0));
  const solved = solve(normal, rhs);
  if (!solved || solved.some(value => value < -1e-12)) continue;
  const scaledCoefficients = Array(columns).fill(0);
  active.forEach((column, index) => { scaledCoefficients[column] = Math.max(0, solved[index]); });
  const sse = scaledDesign.reduce((sum, row, k) => sum + (row.reduce((value, item, column) => value + item * scaledCoefficients[column], 0) - target[k]) ** 2, 0);
  if (!best || sse < best.sse) best = { sse, scaledCoefficients };
}
if (!best) throw new Error("no nonnegative passive fit found");
const coefficients = best.scaledCoefficients.map((value, index) => value / scales[index]);
function predict(frequencyHz) {
  return basis(frequencyHz).reduce((sum, item, index) => ({ re: sum.re + item.re * coefficients[index], im: sum.im + item.im * coefficients[index] }), { re: 0, im: 0 });
}
const evaluated = rows.map(row => {
  const predicted = predict(row.frequencyHz);
  const error = Math.hypot(predicted.re - row.measured.re, predicted.im - row.measured.im);
  const magnitude = Math.hypot(row.measured.re, row.measured.im);
  return { ...row, predicted, absoluteErrorOhm: error, relativeError: error / magnitude };
});
function metrics(split) {
  const selected = evaluated.filter(row => row.split === split);
  return { count: selected.length, rmseOhm: Math.sqrt(selected.reduce((sum, row) => sum + row.absoluteErrorOhm ** 2, 0) / selected.length), medianRelativeError: [...selected].sort((a, b) => a.relativeError - b.relativeError)[Math.floor(selected.length / 2)].relativeError, maximumRelativeError: Math.max(...selected.map(row => row.relativeError)) };
}
const trainingMetrics = metrics("training");
const heldOutMetrics = metrics("held-out");
const thresholds = { heldOutMedianRelativeErrorMaximum: 0.05, heldOutMaximumRelativeErrorMaximum: 0.20 };
const thresholdPassed = heldOutMetrics.medianRelativeError <= thresholds.heldOutMedianRelativeErrorMaximum && heldOutMetrics.maximumRelativeError <= thresholds.heldOutMaximumRelativeErrorMaximum;
const output = {
  protocol: "zenodo-eis-held-out-passive-fit/1",
  date: "2026-10-25",
  source: { doi: "10.5281/zenodo.15422339", file: "ID01.csv", remoteMd5: "13ff29e7f0510a2453bcccacfb8afd0d", localNormalizedSha256: createHash("sha256").update(sourceText).digest("hex"), rows: rows.length, measurement: "galvanostatic EIS, NMC811 21700 cell, 30% state of charge" },
  preregistration: { splitRule: "source row index modulo 3 equals 1 is held out", model: "nonnegative series R + series L + five fixed-centre Debye arcs + semi-infinite Warburg", relaxationHz, parameterSign: "all coefficients nonnegative", thresholds },
  fittedParameters: Object.fromEntries(parameterNames.map((name, index) => [name, coefficients[index]])),
  activeParameters: parameterNames.filter((_, index) => coefficients[index] > 1e-14),
  trainingMetrics,
  heldOutMetrics,
  heldOutRows: evaluated.filter(row => row.split === "held-out"),
  decision: { passiveCoefficientConstraintSatisfied: coefficients.every(value => value >= 0), heldOutThresholdPassed: thresholdPassed, sourceNativeMeasuredBridgeClosedForOneCell: thresholdPassed, measurementUncertaintyAvailableInSourceFile: false, detectorLikelihoodClosed: false, generalizationAcrossCellsClosed: false, newPhysicsEvidence: false },
  implication: thresholdPassed ? "One preregistered passive equivalent-circuit family predicts the held-out complex impedance values of source cell ID01 within the declared error ceiling. This closes a measured-response bridge for one cell, not detector likelihood, cross-cell generalization or new physics." : "The preregistered passive equivalent-circuit family fails its held-out error ceiling on source cell ID01. The measured bridge is informative as a no-go: a richer conventional nuisance model is required before any residual can be interpreted.",
};
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-held-out-passive-fit-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
