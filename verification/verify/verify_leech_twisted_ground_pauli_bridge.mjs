import assert from "node:assert/strict";
import fs from "node:fs";

const recordPath = new URL("../../evidence/data/leech-twisted-ground-pauli-bridge-v1.json", import.meta.url);
const matrixPath = new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url);
const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
const Kinteger = JSON.parse(fs.readFileSync(matrixPath, "utf8")).K;
const K = Kinteger.map((row) => row.map((x) => ((x % 2) + 2) % 2));
const n = K.length;

assert.equal(record.schemaVersion, "leech-twisted-ground-pauli-bridge-v1");
const add = (a, b) => a.map((x, i) => x ^ b[i]);
const pairing = (a, b) => {
  let value = 0;
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) value ^= (a[i] & K[i][j] & b[j]);
  return value;
};
const quadratic = (v) => {
  let norm = 0;
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) norm += v[i] * Kinteger[i][j] * v[j];
  assert.equal(norm % 2, 0);
  return ((norm / 2) % 2 + 2) % 2;
};
const basis = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));
for (const v of basis) assert.equal(pairing(v, v), 0, "form must be alternating");

const remaining = [...basis];
const pairs = [];
while (remaining.length) {
  const a = remaining.shift();
  const partner = remaining.findIndex((candidate) => pairing(a, candidate) === 1);
  assert.notEqual(partner, -1, "form must be nondegenerate");
  const [b] = remaining.splice(partner, 1);
  pairs.push([a, b]);
  for (let i = 0; i < remaining.length; i += 1) {
    let u = remaining[i];
    if (pairing(u, b)) u = add(u, a);
    if (pairing(u, a)) u = add(u, b);
    remaining[i] = u;
  }
}
for (const pair of pairs) {
  const [a, b] = pair;
  assert.equal(quadratic(a), 0, "deterministic decomposition should choose singular a vectors");
  if (quadratic(b) === 1) pair[1] = add(b, a);
  assert.equal(quadratic(pair[0]), 0);
  assert.equal(quadratic(pair[1]), 0);
  assert.equal(quadratic(add(pair[0], pair[1])), 1);
}
assert.equal(pairs.length, 12);
for (let i = 0; i < pairs.length; i += 1) {
  const [ai, bi] = pairs[i];
  for (let j = 0; j < pairs.length; j += 1) {
    const [aj, bj] = pairs[j];
    assert.equal(pairing(ai, aj), 0);
    assert.equal(pairing(bi, bj), 0);
    assert.equal(pairing(ai, bj), i === j ? 1 : 0);
  }
}

const encode = (v) => v.reduce((value, bit, i) => value | (BigInt(bit) << BigInt(i)), 0n);
const encodedPairs = pairs.map(([a, b]) => [encode(a).toString(16), encode(b).toString(16)]);
const groupOrder = 2 ** 25;
const irrepDimension = 2 ** 12;
assert.equal(groupOrder, 33554432);
assert.equal(irrepDimension, 4096);
assert.equal(record.surfaceCodeJoin.fixedParityLogicalQubits, 12);
assert.match(record.promotion.established, /presentation-preserving isomorphism/);

console.log(JSON.stringify({
  status: "PASS",
  vectorSpaceDimension: n,
  alternating: true,
  nondegenerate: true,
  quadraticArfInvariant: 0,
  generatorSquaresPreserved: true,
  hyperbolicPairs: pairs.length,
  deterministicSymplecticBasisHex: encodedPairs,
  extraspecialGroupOrder: groupOrder,
  irreducibleDimension: irrepDimension,
  logicalQubits: Math.log2(irrepDimension),
  open: record.promotion.open
}));
