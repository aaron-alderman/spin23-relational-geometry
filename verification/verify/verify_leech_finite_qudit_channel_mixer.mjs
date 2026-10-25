import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-finite-qudit-channel-mixer-v1.json", import.meta.url),
  "utf8"
));
const source = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url),
  "utf8"
));

assert.equal(record.schemaVersion, "leech-finite-qudit-channel-mixer-v1");
const p = record.register.primeDimension;
const K = source.K;
const n = K.length;
assert.equal(n, 24);

const isPrime = (candidate) => {
  if (candidate < 2) return false;
  for (let divisor = 2; divisor * divisor <= candidate; divisor += 1) {
    if (candidate % divisor === 0) return false;
  }
  return true;
};
assert.ok(isPrime(p));
for (let candidate = 2 * record.compiledCircuit.inverseMaximumCenteredEntry + 1;
  candidate < p; candidate += 1) {
  assert.equal(isPrime(candidate), false, "prime dimension was not minimal");
}
assert.equal(record.register.binaryQubitsPerQuditCeiling, Math.ceil(Math.log2(p)));
assert.equal(
  record.register.binaryQubitsPerChiralBlockCeiling,
  n * record.register.binaryQubitsPerQuditCeiling
);

const mod = (x) => ((x % p) + p) % p;
const power = (base, exponent) => {
  let result = 1;
  for (let a = mod(base), e = exponent; e > 0; e = Math.floor(e / 2), a = mod(a * a)) {
    if (e % 2 === 1) result = mod(result * a);
  }
  return result;
};
const inverse = (x) => {
  assert.notEqual(mod(x), 0);
  return power(x, p - 2);
};
const identity = Array.from({length: n}, (_, i) =>
  Array.from({length: n}, (_, j) => i === j ? 1 : 0)
);
const multiply = (a, b) => a.map((row) =>
  b[0].map((_, j) => mod(row.reduce((sum, x, i) => mod(sum + x * b[i][j]), 0)))
);
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));

// Exact modular inverse W=K^-1.
const augmented = K.map((row, i) => [
  ...row.map(mod),
  ...identity[i]
]);
for (let col = 0; col < n; col += 1) {
  let pivot = col;
  while (pivot < n && augmented[pivot][col] === 0) pivot += 1;
  assert.ok(pivot < n, "missing pivot " + col);
  [augmented[col], augmented[pivot]] = [augmented[pivot], augmented[col]];
  const scale = inverse(augmented[col][col]);
  augmented[col] = augmented[col].map((x) => mod(scale * x));
  for (let row = 0; row < n; row += 1) {
    if (row === col || augmented[row][col] === 0) continue;
    const factor = augmented[row][col];
    augmented[row] = augmented[row].map((x, j) => mod(x - factor * augmented[col][j]));
  }
}
const W = augmented.map((row) => row.slice(n));
assert.deepEqual(multiply(K, W), identity);
assert.deepEqual(multiply(W, K), identity);

// Compile W by reducing it to identity with elementary modular row gates.
const work = W.map((row) => [...row]);
const counts = {rowSwaps: 0, singleQuditScales: 0, twoQuditShears: 0};
for (let col = 0; col < n; col += 1) {
  let pivot = col;
  while (pivot < n && work[pivot][col] === 0) pivot += 1;
  assert.ok(pivot < n);
  if (pivot !== col) {
    [work[col], work[pivot]] = [work[pivot], work[col]];
    counts.rowSwaps += 1;
  }
  const scale = inverse(work[col][col]);
  if (scale !== 1) {
    work[col] = work[col].map((x) => mod(scale * x));
    counts.singleQuditScales += 1;
  }
  for (let row = 0; row < n; row += 1) {
    if (row === col || work[row][col] === 0) continue;
    const factor = work[row][col];
    work[row] = work[row].map((x, j) => mod(x - factor * work[col][j]));
    counts.twoQuditShears += 1;
  }
}
assert.deepEqual(work, identity);

const centered = (x) => x > p / 2 ? x - p : x;
const maximumCenteredEntry = Math.max(...W.flat().map((x) => Math.abs(centered(x))));
const nonzeroEntries = W.flat().filter((x) => x !== 0).length;
const total = Object.values(counts).reduce((sum, x) => sum + x, 0);

assert.equal(maximumCenteredEntry, record.compiledCircuit.inverseMaximumCenteredEntry);
assert.equal(nonzeroEntries, record.compiledCircuit.inverseNonzeroEntries);
assert.deepEqual(counts, {
  rowSwaps: record.compiledCircuit.rowSwaps,
  singleQuditScales: record.compiledCircuit.singleQuditScales,
  twoQuditShears: record.compiledCircuit.twoQuditShears
});
assert.equal(total, record.compiledCircuit.totalQuditLinearGatesPerChiralBlock);

// The canonical position/momentum map preserves the finite Weyl pairing.
assert.deepEqual(multiply(transpose(W), transpose(K)), identity);
// The old interaction columns K become unit labels under W^T.
assert.deepEqual(multiply(transpose(W), K), identity);

console.log(JSON.stringify({
  status: "PASS",
  primeDimension: p,
  channels: n,
  canonicalPairingPreserved: true,
  interactionLabelsAfterMixer: "I_24",
  counts,
  totalQuditLinearGatesPerChiralBlock: total,
  maximumCenteredInverseEntry: maximumCenteredEntry,
  boundary: record.boundary
}));
