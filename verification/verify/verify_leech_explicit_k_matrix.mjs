import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
const K = evidence.K.map((row) => row.map(BigInt));
const n = K.length;

assert.equal(evidence.schemaVersion, "leech-explicit-k-matrix-v1");
assert.equal(n, 24);
assert.ok(K.every((row) => row.length === n));
for (let i = 0; i < n; i += 1) {
  assert.equal(K[i][i] % 2n, 0n, `odd diagonal at ${i}`);
  for (let j = 0; j < n; j += 1) assert.equal(K[i][j], K[j][i], `asymmetry at ${i},${j}`);
}

function determinant(matrix) {
  const a = matrix.map((row) => [...row]);
  let sign = 1n;
  let previousPivot = 1n;
  for (let k = 0; k < a.length - 1; k += 1) {
    let pivotRow = k;
    while (pivotRow < a.length && a[pivotRow][k] === 0n) pivotRow += 1;
    assert.ok(pivotRow < a.length, "singular matrix");
    if (pivotRow !== k) {
      [a[pivotRow], a[k]] = [a[k], a[pivotRow]];
      sign = -sign;
    }
    const pivot = a[k][k];
    for (let i = k + 1; i < a.length; i += 1) {
      for (let j = k + 1; j < a.length; j += 1) {
        const numerator = a[i][j] * pivot - a[i][k] * a[k][j];
        assert.equal(numerator % previousPivot, 0n, "Bareiss division must be exact");
        a[i][j] = numerator / previousPivot;
      }
    }
    previousPivot = pivot;
  }
  return sign * a[a.length - 1][a.length - 1];
}

const leadingMinors = [];
for (let size = 1; size <= n; size += 1) {
  const minor = K.slice(0, size).map((row) => row.slice(0, size));
  const det = determinant(minor);
  assert.ok(det > 0n, `leading minor ${size} is not positive`);
  leadingMinors.push(det);
}
assert.equal(leadingMinors.at(-1), 1n);

const flat = K.flat();
const nonzeroEntries = flat.filter((x) => x !== 0n).length;
const maxAbsEntry = flat.reduce((max, x) => (x < 0n ? -x : x) > max ? (x < 0n ? -x : x) : max, 0n);
const columnL1 = Array.from({length: n}, (_, j) => K.reduce((sum, row) => sum + (row[j] < 0n ? -row[j] : row[j]), 0n));
const columnSupport = Array.from({length: n}, (_, j) => K.filter((row) => row[j] !== 0n).length);

assert.equal(evidence.source.catalogueClaims.minimalNorm, 4);
assert.equal(evidence.source.catalogueClaims.kissingNumber, 196560);
assert.equal(evidence.interactionCompilation.channelsPerBond, 24);

console.log(JSON.stringify({
  status: "PASS",
  rank: n,
  symmetric: true,
  evenIntegral: true,
  positiveDefinite: true,
  determinant: leadingMinors.at(-1).toString(),
  nonzeroEntries,
  maxAbsEntry: maxAbsEntry.toString(),
  maxColumnL1: columnL1.reduce((a, b) => a > b ? a : b).toString(),
  columnSupportRange: [Math.min(...columnSupport), Math.max(...columnSupport)],
  catalogueMinimumNorm: evidence.source.catalogueClaims.minimalNorm,
  channelsPerBond: evidence.interactionCompilation.channelsPerBond
}));
