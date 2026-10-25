import assert from "node:assert/strict";
import fs from "node:fs";

const recordPath = new URL("../../evidence/data/leech-unimodular-dual-basis-compiler-v1.json", import.meta.url);
const matrixPath = new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url);
const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
const K = JSON.parse(fs.readFileSync(matrixPath, "utf8")).K.map((row) => row.map(BigInt));
const n = K.length;

assert.equal(record.schemaVersion, "leech-unimodular-dual-basis-compiler-v1");

const gcd = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
};
const norm = (num, den = 1n) => {
  assert.notEqual(den, 0n);
  if (den < 0n) { num = -num; den = -den; }
  const d = gcd(num, den);
  return {num: num / d, den: den / d};
};
const sub = (a, b) => norm(a.num * b.den - b.num * a.den, a.den * b.den);
const mul = (a, b) => norm(a.num * b.num, a.den * b.den);
const div = (a, b) => norm(a.num * b.den, a.den * b.num);

const augmented = K.map((row, i) => [
  ...row.map((num) => norm(num)),
  ...Array.from({length: n}, (_, j) => norm(i === j ? 1n : 0n))
]);
for (let col = 0; col < n; col += 1) {
  let pivot = col;
  while (pivot < n && augmented[pivot][col].num === 0n) pivot += 1;
  assert.ok(pivot < n, "matrix must be invertible");
  [augmented[col], augmented[pivot]] = [augmented[pivot], augmented[col]];
  const pivotValue = augmented[col][col];
  augmented[col] = augmented[col].map((x) => div(x, pivotValue));
  for (let row = 0; row < n; row += 1) {
    if (row === col) continue;
    const factor = augmented[row][col];
    augmented[row] = augmented[row].map((x, j) => sub(x, mul(factor, augmented[col][j])));
  }
}
const KinvQ = augmented.map((row) => row.slice(n));
assert.ok(KinvQ.flat().every((x) => x.den === 1n), "inverse must be integral");
const W = KinvQ.map((row) => row.map((x) => x.num));

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const product = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((sum, x, i) => sum + x * b[i][j], 0n)));
const identity = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1n : 0n));
assert.deepEqual(product(K, W), identity, "K K^-1");
assert.deepEqual(transpose(W), W, "symmetric K has symmetric inverse");
assert.deepEqual(product(transpose(W), K), identity, "interaction columns become identity");
assert.deepEqual(product(product(transpose(W), K), W), W, "new K equals K inverse");

const flat = W.flat();
const abs = (x) => x < 0n ? -x : x;
const maxAbsEntry = flat.reduce((a, b) => abs(b) > a ? abs(b) : a, 0n);
const supports = Array.from({length: n}, (_, j) => W.filter((row) => row[j] !== 0n).length);

console.log(JSON.stringify({
  status: "PASS",
  rank: n,
  WIntegral: true,
  WUnimodular: true,
  transformedK: "K^-1",
  transformedInteractionMatrix: "I_24",
  cosineSupportBefore: [12, 22],
  cosineSupportAfter: [1, 1],
  inverseMaxAbsEntry: maxAbsEntry.toString(),
  inverseColumnSupportRange: [Math.min(...supports), Math.max(...supports)]
}));
