import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transformer-conditioning-tolerance-v1.json", import.meta.url),
  "utf8"
));
const matrix = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url),
  "utf8"
)).K.map((row) => row.map(Number));

assert.equal(record.schemaVersion, "leech-transformer-conditioning-tolerance-v1");
const n = matrix.length;

// Symmetric Jacobi diagonalization, independent of any external numerical library.
const work = matrix.map((row) => [...row]);
for (let sweep = 0; sweep < 200000; sweep += 1) {
  let p = 0;
  let q = 1;
  let largest = 0;
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(work[i][j]) > largest) {
        largest = Math.abs(work[i][j]);
        p = i;
        q = j;
      }
    }
  }
  if (largest < 1e-14) break;
  const angle = 0.5 * Math.atan2(2 * work[p][q], work[q][q] - work[p][p]);
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const pp = work[p][p];
  const qq = work[q][q];
  const pq = work[p][q];
  work[p][p] = cosine ** 2 * pp - 2 * sine * cosine * pq + sine ** 2 * qq;
  work[q][q] = sine ** 2 * pp + 2 * sine * cosine * pq + cosine ** 2 * qq;
  work[p][q] = 0;
  work[q][p] = 0;
  for (let k = 0; k < n; k += 1) {
    if (k === p || k === q) continue;
    const kp = work[k][p];
    const kq = work[k][q];
    work[k][p] = work[p][k] = cosine * kp - sine * kq;
    work[k][q] = work[q][k] = sine * kp + cosine * kq;
  }
}
const eigenvalues = work.map((row, i) => row[i]).sort((a, b) => a - b);
const minimum = eigenvalues[0];
const maximum = eigenvalues.at(-1);
const condition = maximum / minimum;
const spectrum = record.spectrumInRecordedBasis;
assert.ok(Math.abs(minimum - spectrum.minimumEigenvalue) < 2e-12);
assert.ok(Math.abs(maximum - spectrum.maximumEigenvalue) < 2e-12);
assert.ok(Math.abs(condition - spectrum.twoNormConditionNumber) < 2e-7);
assert.ok(Math.abs(1 / minimum - spectrum.inverseTwoNorm) < 2e-7);
assert.ok(Math.abs(Math.sqrt(condition) - spectrum.frequencyScaleRatioIfCommonInductance) < 2e-10);

const bounds = record.worstCasePerturbationBounds;
assert.ok(Math.abs(bounds.positiveDefinitenessSufficientRelativeDelta - 1 / condition) < 2e-16);
const deltaForRelativeInverseError = (epsilon) => epsilon / ((1 + epsilon) * condition);
assert.ok(Math.abs(bounds.relativeDeltaForAtMostOnePercentInverseError
  - deltaForRelativeInverseError(0.01)) < 2e-18);
assert.ok(Math.abs(bounds.relativeDeltaForAtMostOnePermilleInverseError
  - deltaForRelativeInverseError(0.001)) < 2e-19);
assert.ok(record.boundary.includes("sufficient and adversarial"));

console.log(JSON.stringify({
  status: "PASS",
  minimumEigenvalue: minimum,
  maximumEigenvalue: maximum,
  conditionNumber: condition,
  commonInductanceFrequencyRatio: Math.sqrt(condition),
  relativeMatrixToleranceForOnePercentWorstCaseInverse: bounds.relativeDeltaForAtMostOnePercentInverseError,
  decision: record.decision.result,
  boundary: record.boundary
}));
