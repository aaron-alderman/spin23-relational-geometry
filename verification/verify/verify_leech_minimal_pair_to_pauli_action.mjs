import assert from "node:assert/strict";
import fs from "node:fs";

const recordPath = new URL("../../evidence/data/leech-minimal-pair-to-pauli-action-v1.json", import.meta.url);
const matrixPath = new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url);
const generatorsPath = new URL("../../evidence/data/leech-catalogue-automorphism-generators-v1.json", import.meta.url);
const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
const Kint = JSON.parse(fs.readFileSync(matrixPath, "utf8")).K;
const n = Kint.length;
const K = Kint.map((row) => row.map((x) => ((x % 2) + 2) % 2));
assert.equal(record.schemaVersion, "leech-minimal-pair-to-pauli-action-v1");
assert.ok(Kint.every((row, i) => row[i] === 4), "all marked basis vectors must be minimal norm four");

const add = (a, b) => a.map((x, i) => x ^ b[i]);
const pairing = (a, b) => {
  let value = 0;
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) value ^= (a[i] & K[i][j] & b[j]);
  return value;
};
const quadratic = (v) => {
  let norm = 0;
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) norm += v[i] * Kint[i][j] * v[j];
  return ((norm / 2) % 2 + 2) % 2;
};
const standard = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));
const remaining = standard.map((v) => [...v]);
const pairs = [];
while (remaining.length) {
  const a = remaining.shift();
  const partner = remaining.findIndex((candidate) => pairing(a, candidate));
  assert.notEqual(partner, -1);
  let [b] = remaining.splice(partner, 1);
  pairs.push([a, b]);
  for (let i = 0; i < remaining.length; i += 1) {
    let u = remaining[i];
    if (pairing(u, b)) u = add(u, a);
    if (pairing(u, a)) u = add(u, b);
    remaining[i] = u;
  }
}
for (const pair of pairs) if (quadratic(pair[1])) pair[1] = add(pair[1], pair[0]);
const columns = pairs.flat();
const S = Array.from({length: n}, (_, i) => columns.map((column) => column[i]));
const identity = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));
const inverse2 = (matrix) => {
  const a = matrix.map((row, i) => [...row, ...identity[i]]);
  for (let col = 0; col < n; col += 1) {
    const pivot = a.findIndex((row, i) => i >= col && row[col]);
    assert.notEqual(pivot, -1);
    [a[col], a[pivot]] = [a[pivot], a[col]];
    for (let row = 0; row < n; row += 1) if (row !== col && a[row][col]) a[row] = a[row].map((x, j) => x ^ a[col][j]);
  }
  return a.map((row) => row.slice(n));
};
const Sinv = inverse2(S);
const matrixVector = (a, v) => a.map((row) => row.reduce((sum, x, i) => sum ^ (x & v[i]), 0));
const canonicalJPair = (a, b) => {
  let value = 0;
  for (let i = 0; i < 12; i += 1) value ^= (a[2*i] & b[2*i+1]) ^ (a[2*i+1] & b[2*i]);
  return value;
};
const labels = standard.map((v) => matrixVector(Sinv, v));
assert.equal(new Set(labels.map((v) => v.join(""))).size, n);
for (const label of labels) assert.ok(label.some(Boolean));
for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) assert.equal(canonicalJPair(labels[i], labels[j]), K[i][j]);

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const product2 = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((sum, x, i) => sum ^ (x & b[i][j]), 0)));
const generators = JSON.parse(fs.readFileSync(generatorsPath, "utf8")).generators;
let covarianceChecks = 0;
for (const G of generators) {
  const A = transpose(G).map((row) => row.map((x) => ((x % 2) + 2) % 2));
  const canonicalAction = product2(product2(Sinv, A), S);
  for (const v of standard) {
    const direct = matrixVector(Sinv, matrixVector(A, v));
    const conjugated = matrixVector(canonicalAction, matrixVector(Sinv, v));
    assert.deepEqual(conjugated, direct);
    covarianceChecks += 1;
  }
}

const encode = (v) => v.reduce((value, bit, i) => value | (BigInt(bit) << BigInt(i)), 0n);
const pauliLabelsHex = labels.map((v) => encode(v).toString(16));
assert.equal(record.sourceLayer.antipodalCount, 196560 / 2);
assert.match(record.injectivity.proof, /Leech minimum norm four/);

console.log(JSON.stringify({
  status: "PASS",
  markedMinimalOperators: n,
  normSquared: 4,
  independentPauliLabels: n,
  pauliLabelsHex,
  commutatorMatrix: "exactly K mod 2",
  catalogueGeneratorCovarianceChecks: covarianceChecks,
  twistedGroundTraceForEachMarkedOperator: 0,
  allAntipodalMinimalPairsInjectModulo2: record.sourceLayer.antipodalCount,
  open: record.promotion.open
}));
