import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-coupled-metric-pendulum-gap-audit-v1.json"
), "utf8"));
const rotor = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-rotor-native-pendulum-gap-v1.json"
), "utf8"));
const analyzer = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "../../scripts/analyze-leech-pareto-transformers.mjs"), "--full"
], {encoding: "utf8"}));

assert.equal(record.schemaVersion, "leech-coupled-metric-pendulum-gap-audit-v1");
const G = analyzer.results.find(({id}) => id === "gram-first").gram;
assert.equal(G.length, 24);
assert.ok(G.every((row, i) => row.length === 24
  && row.every((value, j) => value === G[j][i])));

const offDiagonalPairs = G.reduce((count, row, i) => count
  + row.slice(i + 1).filter((value) => value !== 0).length, 0);
assert.equal(offDiagonalPairs, record.separabilityAudit.gramOffDiagonalPairs);
assert.ok(offDiagonalPairs > 0);
assert.equal(record.separabilityAudit.isProductOfTwentyFourPendula, false);

const jacobiEigenvalues = (matrix, tolerance = 1e-13, maxRotations = 100000) => {
  const A = matrix.map((row) => [...row]);
  for (let rotation = 0; rotation < maxRotations; rotation += 1) {
    let p = 0;
    let q = 1;
    let maximum = 0;
    for (let i = 0; i < A.length; i += 1) for (let j = i + 1; j < A.length; j += 1) {
      if (Math.abs(A[i][j]) > maximum) { maximum = Math.abs(A[i][j]); p = i; q = j; }
    }
    if (maximum < tolerance) return A.map((row, i) => row[i]).sort((a, b) => a - b);
    const angle = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const app = A[p][p];
    const aqq = A[q][q];
    const apq = A[p][q];
    for (let k = 0; k < A.length; k += 1) if (k !== p && k !== q) {
      const akp = A[k][p];
      const akq = A[k][q];
      A[k][p] = A[p][k] = c * akp - s * akq;
      A[k][q] = A[q][k] = s * akp + c * akq;
    }
    A[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    A[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    A[p][q] = A[q][p] = 0;
  }
  throw new Error("Jacobi eigensolver did not converge");
};

const eigenvalues = jacobiEigenvalues(G);
const minimum = eigenvalues[0];
const maximum = eigenvalues.at(-1);
const harmonic = record.harmonicSmallOscillationCertificate;
assert.ok(Math.abs(minimum - harmonic.minimumMetricEigenvalue) < 2e-12);
assert.ok(Math.abs(maximum - harmonic.maximumMetricEigenvalue) < 2e-11);
assert.ok(Math.abs(maximum / minimum - harmonic.conditionNumber) < 2e-7);
const frequencies = eigenvalues.map((lambda) => 1 / Math.sqrt(lambda));
const minimumFrequency = Math.min(...frequencies);
const maximumFrequency = Math.max(...frequencies);
assert.ok(Math.abs(minimumFrequency - harmonic.minimumAngularFrequencyInEnergyUnits) < 2e-13);
assert.ok(Math.abs(maximumFrequency - harmonic.maximumAngularFrequencyInEnergyUnits) < 2e-12);
assert.ok(Math.abs(maximumFrequency / minimumFrequency - harmonic.frequencyRatio) < 2e-11);
assert.ok(Math.abs(harmonic.frequencyRatio ** 2 - harmonic.conditionNumber) < 2e-9);
const ascendingFrequencies = [...frequencies].sort((a, b) => a - b);
assert.equal(harmonic.metricEigenvaluesAscending.length, 24);
assert.equal(harmonic.harmonicFrequenciesAscending.length, 24);
assert.equal(harmonic.scaleFreeFrequencyRatiosToSoftest.length, 24);
for (let index = 0; index < 24; index += 1) {
  assert.ok(Math.abs(eigenvalues[index] - harmonic.metricEigenvaluesAscending[index]) < 2e-11);
  assert.ok(Math.abs(ascendingFrequencies[index]
    - harmonic.harmonicFrequenciesAscending[index]) < 2e-12);
  assert.ok(Math.abs(ascendingFrequencies[index] / minimumFrequency
    - harmonic.scaleFreeFrequencyRatiosToSoftest[index]) < 2e-11);
}

const productGap = rotor.convergence.fixedStrengthGapLimitNumerical;
const comparison = record.comparisonWithIndependentSurrogate;
assert.equal(productGap, comparison.wave160ConvergedSinglePendulumGap);
assert.ok(Math.abs(minimumFrequency / productGap
  - comparison.lowestHarmonicFrequencyOverIndependentGap) < 2e-15);
assert.ok(Math.abs(productGap / minimumFrequency
  - comparison.independentGapOverLowestHarmonicFrequency) < 2e-14);
assert.ok(record.boundary.includes("not a rigorous lower bound"));

console.log(JSON.stringify({
  status: "PASS",
  channels: G.length,
  offDiagonalPairs,
  conditionNumber: maximum / minimum,
  minimumHarmonicFrequency: minimumFrequency,
  maximumHarmonicFrequency: maximumFrequency,
  metricEigenvalues: eigenvalues,
  scaleFreeFingerprint: harmonic.scaleFreeFrequencyRatiosToSoftest,
  independentPendulumGap: productGap,
  productGapTransported: false,
  exactNonlinearGapEstablished: false,
  epistemicStatus: record.epistemicStatus
}));
