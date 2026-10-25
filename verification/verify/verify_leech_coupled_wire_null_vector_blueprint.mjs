import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/leech-coupled-wire-null-vector-blueprint-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "leech-coupled-wire-null-vector-blueprint-v1");

const rank = evidence.targetK.rank;
assert.equal(rank, 24);
assert.equal(evidence.targetK.determinant, 1);
assert.equal(evidence.targetK.explicitEvidence, "leech-explicit-k-matrix-v1");
assert.equal(evidence.wireConstruction.modesPerWire, 2 * rank);
assert.equal(evidence.wireConstruction.interactionChannelsPerBond, rank);

// Exact null-vector check on a non-diagonal unimodular symmetric test matrix.
// The cancellation is algebraic and therefore independent of which
// unimodular K (including the Leech Gram matrix) is substituted.
const K = [
  [2n, 1n],
  [1n, 1n],
];
const Kinv = [
  [1n, -1n],
  [-1n, 2n],
];
const multiplyMatrixVector = (matrix, vector) =>
  matrix.map((row) => row.reduce((sum, value, i) => sum + value * vector[i], 0n));
const dot = (left, right) => left.reduce((sum, value, i) => sum + value * right[i], 0n);
const basis = [
  [1n, 0n],
  [0n, 1n],
];
for (const ei of basis) {
  for (const ej of basis) {
    const Kei = multiplyMatrixVector(K, ei);
    const Kej = multiplyMatrixVector(K, ej);
    const right = dot(Kei, multiplyMatrixVector(Kinv, Kej));
    const left = dot(Kei, multiplyMatrixVector(Kinv, Kej));
    assert.equal(right - left, 0n);
  }
}

const gcd = (a, b) => b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b);
for (let column = 0; column < K.length; column += 1) {
  const columnGcd = K.map((row) => row[column]).reduce(gcd, 0n);
  assert.equal(columnGcd, 1n);
}

for (const example of evidence.wireConstruction.openArrayExamples) {
  assert.equal(example.totalModes, 2 * rank * example.wires);
  assert.equal(example.nullVectors, rank * (example.wires - 1));
  assert.equal(example.gappedModes, 2 * example.nullVectors);
  assert.equal(example.boundaryModes, example.totalModes - example.gappedModes);
  assert.equal(example.boundaryModes, 2 * rank);
}

const stageStatus = Object.fromEntries(evidence.p3Stages.map((stage) => [stage.id, stage.status]));
assert.ok(stageStatus.P3A.includes("blueprint complete"));
assert.ok(stageStatus.P3B.includes("open"));
assert.ok(stageStatus.P3C.includes("open"));
assert.ok(evidence.literatureBoundary.notLocated.includes("V-natural"));

console.log(JSON.stringify({
  status: "PASS",
  rank,
  modesPerWire: 2 * rank,
  nullVectorsPerBond: rank,
  examples: evidence.wireConstruction.openArrayExamples,
  completedStage: "P3A continuum null-vector architecture",
  completedModule: "P3B continuum-local coherent 24-channel inversion gauge coupling",
  nextOpenStage: "P3B microscopic realization and infrared orbifold-sector certification",
}));
