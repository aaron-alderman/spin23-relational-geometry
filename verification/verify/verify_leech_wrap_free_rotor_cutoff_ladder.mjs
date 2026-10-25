import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-wrap-free-rotor-cutoff-ladder-v1.json", import.meta.url),
  "utf8"
));
const source = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-wrap-free-rotor-cutoff-ladder-v1");

const K = source.K.map((row) => row.map(BigInt));
const n = K.length;
const abs = (x) => x < 0n ? -x : x;
const gcd = (a, b) => {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
};
const fraction = (num, den = 1n) => {
  assert.notEqual(den, 0n);
  if (den < 0n) [num, den] = [-num, -den];
  const d = gcd(num, den);
  return {num: num / d, den: den / d};
};
const subtract = (a, b) => fraction(a.num * b.den - b.num * a.den, a.den * b.den);
const multiplyFraction = (a, b) => fraction(a.num * b.num, a.den * b.den);
const divide = (a, b) => fraction(a.num * b.den, a.den * b.num);

const augmented = K.map((row, i) => [
  ...row.map((num) => fraction(num)),
  ...Array.from({length: n}, (_, j) => fraction(i === j ? 1n : 0n))
]);
for (let col = 0; col < n; col += 1) {
  let pivot = col;
  while (pivot < n && augmented[pivot][col].num === 0n) pivot += 1;
  assert.ok(pivot < n);
  [augmented[col], augmented[pivot]] = [augmented[pivot], augmented[col]];
  const pivotValue = augmented[col][col];
  augmented[col] = augmented[col].map((x) => divide(x, pivotValue));
  for (let row = 0; row < n; row += 1) {
    if (row === col) continue;
    const factor = augmented[row][col];
    augmented[row] = augmented[row].map((x, j) =>
      subtract(x, multiplyFraction(factor, augmented[col][j]))
    );
  }
}
const W = augmented.map((row) => row.slice(n).map((x) => {
  assert.equal(x.den, 1n);
  return x.num;
}));

const rowL1 = (matrix) => matrix.map((row) =>
  row.reduce((sum, x) => sum + abs(x), 0n)
);
const inverseNorm = rowL1(W).reduce((a, b) => a > b ? a : b);
const inverseMin = rowL1(W).reduce((a, b) => a < b ? a : b);
const kNorm = rowL1(K).reduce((a, b) => a > b ? a : b);
assert.equal(Number(inverseNorm), record.normBounds.inverseMaximumRowL1);
assert.equal(Number(inverseMin), record.normBounds.inverseMinimumRowL1);
assert.equal(Number(kNorm), record.normBounds.kMaximumRowL1);

const isPrime = (candidate) => {
  if (candidate < 2) return false;
  if (candidate % 2 === 0) return candidate === 2;
  for (let divisor = 3; divisor * divisor <= candidate; divisor += 2) {
    if (candidate % divisor === 0) return false;
  }
  return true;
};
const firstPrimeAbove = (threshold) => {
  for (let candidate = threshold + 1; ; candidate += 1) {
    if (isPrime(candidate)) return candidate;
  }
};

for (const rung of record.cutoffLadder) {
  const threshold = 2 * rung.positionCutoffN * Number(inverseNorm);
  assert.equal(rung.minimumPrimeDimension, firstPrimeAbove(threshold));
  assert.equal(rung.binaryQubitsPerQudit, Math.ceil(Math.log2(rung.minimumPrimeDimension)));
  assert.equal(rung.binaryQubitsPer24ChannelBlock, 24 * rung.binaryQubitsPerQudit);
  assert.equal(rung.linearGateCount, 556);
}

const witness = record.aliasWitness;
const markedRow = W[witness.inverseRowOneBased - 1];
const input = witness.unitCubeInput.map(BigInt);
assert.equal(input.length, n);
assert.ok(input.every((x) => abs(x) <= 1n));
const output = markedRow.reduce((sum, x, i) => sum + x * input[i], 0n);
assert.equal(Number(output), witness.integerOutputOnMarkedRow);
const pSmall = 853n;
const residue = ((output % pSmall) + pSmall) % pSmall;
const centered = residue > pSmall / 2n ? residue - pSmall : residue;
assert.equal(Number(centered), witness.centeredOutputModulo853);
assert.notEqual(centered, output);
assert.ok(BigInt(record.cutoffLadder[0].minimumPrimeDimension) > 2n * inverseNorm);

console.log(JSON.stringify({
  status: "PASS",
  rank: n,
  inverseInfinityNorm: inverseNorm.toString(),
  kInfinityNorm: kNorm.toString(),
  unitCubeMinimumPrime: record.cutoffLadder[0].minimumPrimeDimension,
  ladder: record.cutoffLadder.map((rung) => ({
    N: rung.positionCutoffN,
    p: rung.minimumPrimeDimension,
    qubitsPerBlock: rung.binaryQubitsPer24ChannelBlock
  })),
  aliasWitness: {
    integer: output.toString(),
    centeredModulo853: centered.toString()
  },
  boundary: record.boundary
}));
