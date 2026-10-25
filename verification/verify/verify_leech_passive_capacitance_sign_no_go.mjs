import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-passive-capacitance-sign-no-go-v1.json", import.meta.url),
  "utf8"
));
const K = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url),
  "utf8"
)).K;

assert.equal(record.schemaVersion, "leech-passive-capacitance-sign-no-go-v1");
assert.equal(K.length, record.matrixAudit.rank);
assert.ok(K.every((row) => row.length === K.length));
assert.ok(K.every((row, i) => row.every((entry, j) => entry === K[j][i])));

let positive = 0;
let negative = 0;
let zero = 0;
for (let i = 0; i < K.length; i += 1) {
  for (let j = i + 1; j < K.length; j += 1) {
    if (K[i][j] > 0) positive += 1;
    else if (K[i][j] < 0) negative += 1;
    else zero += 1;
  }
}
assert.equal(positive + negative + zero, record.matrixAudit.offDiagonalPairs);
assert.equal(positive, record.matrixAudit.positivePairs);
assert.equal(negative, record.matrixAudit.negativePairs);
assert.equal(zero, record.matrixAudit.zeroPairs);

const [a, b, c] = record.matrixAudit.frustratedTriangleZeroBased;
const edges = [K[a][b], K[b][c], K[c][a]];
assert.deepEqual(edges, record.matrixAudit.edgeValuesInCycleOrder);
assert.equal(edges.reduce((product, value) => product * value, 1), record.matrixAudit.edgeProduct);
assert.ok(record.matrixAudit.edgeProduct > 0);

// Exhaust every sign convention on the witness triangle. Each leaves at least
// one positive off-diagonal, certifying the global 24-node impossibility.
for (let mask = 0; mask < 8; mask += 1) {
  const signs = [0, 1, 2].map((bit) => (mask & (1 << bit)) ? -1 : 1);
  const switched = [
    signs[0] * edges[0] * signs[1],
    signs[1] * edges[1] * signs[2],
    signs[2] * edges[2] * signs[0]
  ];
  assert.ok(switched.some((value) => value > 0));
  assert.equal(Math.sign(switched.reduce((product, value) => product * value, 1)), 1);
}

assert.ok(record.consequence.rejected.includes("positive mutual and ground capacitances"));
assert.ok(record.boundary.includes("not automatically a capacitance matrix"));

console.log(JSON.stringify({
  status: "PASS",
  offDiagonalSignCounts: {positive, negative, zero},
  witnessTriangleOneBased: record.matrixAudit.frustratedTriangleOneBased,
  witnessEdges: edges,
  invariantProduct: record.matrixAudit.edgeProduct,
  result: record.established,
  boundary: record.boundary
}));
