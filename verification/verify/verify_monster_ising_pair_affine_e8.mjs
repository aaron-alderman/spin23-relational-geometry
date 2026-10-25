import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-ising-pair-affine-e8-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-ising-pair-affine-e8-v1");

const nodes = evidence.nodes;
const ids = nodes.map(({ type }) => type);
assert.equal(new Set(ids).size, 9);
assert.equal(evidence.edges.length, 8);

const index = new Map(ids.map((id, i) => [id, i]));
const adjacency = Array.from({ length: ids.length }, () => Array(ids.length).fill(0));
for (const [left, right] of evidence.edges) {
  assert.ok(index.has(left) && index.has(right));
  const i = index.get(left);
  const j = index.get(right);
  adjacency[i][j] = 1;
  adjacency[j][i] = 1;
}
const marks = ids.map((id) => evidence.markVectorByNode[id]);
for (let i = 0; i < ids.length; i += 1) {
  const neighbourSum = adjacency[i].reduce((sum, edge, j) => sum + edge * marks[j], 0);
  assert.equal(2 * marks[i], neighbourSum, `affine mark relation failed at ${ids[i]}`);
}

const rank = (rows, tolerance = 1e-12) => {
  const matrix = rows.map((row) => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < matrix[0].length && pivotRow < matrix.length; column += 1) {
    let pivot = pivotRow;
    while (pivot < matrix.length && Math.abs(matrix[pivot][column]) < tolerance) pivot += 1;
    if (pivot === matrix.length) continue;
    [matrix[pivotRow], matrix[pivot]] = [matrix[pivot], matrix[pivotRow]];
    const value = matrix[pivotRow][column];
    matrix[pivotRow] = matrix[pivotRow].map((x) => x / value);
    for (let row = 0; row < matrix.length; row += 1) if (row !== pivotRow) {
      const factor = matrix[row][column];
      matrix[row] = matrix[row].map((x, j) => x - factor * matrix[pivotRow][j]);
    }
    pivotRow += 1;
  }
  return pivotRow;
};
const cartan = adjacency.map((row, i) => row.map((edge, j) => (i === j ? 2 : -edge)));
assert.equal(rank(cartan), 8);

const overlaps = nodes.map((node) => node.overlapNumerator / node.overlapDenominator);
const keys = nodes.map((node, i) => `${node.order}:${overlaps[i]}`);
assert.equal(new Set(keys).size, 9);
assert.equal(new Set(overlaps).size, 8);
const collision = nodes.filter((node, i) => overlaps[i] === 1 / 256).map(({ type }) => type).sort();
assert.deepEqual(collision, ["3C", "4B"]);

const distinctOverlaps = [...new Set(overlaps)].sort((a, b) => a - b);
const spacings = distinctOverlaps.slice(1).map((value, i) => value - distinctOverlaps[i]);
const minimumSpacing = Math.min(...spacings);
assert.equal(minimumSpacing, 1 / 1024);
assert.equal(evidence.classification.minimumDistinctOverlapSpacing, minimumSpacing);
assert.equal(evidence.classification.unsafeNearestOverlapError, minimumSpacing / 2);

// Blind recovery with deterministic errors below one quarter of the unsafe boundary.
const noiseScale = 1 / 8192;
const recovered = nodes.map((hidden, i) => {
  const observed = hidden.overlapNumerator / hidden.overlapDenominator + noiseScale * Math.sin(i + 1);
  return nodes
    .filter(({ order }) => order === hidden.order)
    .map((candidate) => ({
      type: candidate.type,
      residual: Math.abs(observed - candidate.overlapNumerator / candidate.overlapDenominator),
    }))
    .sort((a, b) => a.residual - b.residual)[0].type;
});
assert.deepEqual(recovered, ids);

assert.equal(evidence.physicalBoundary.monsterWeightOneDimension, 0);
assert.equal(evidence.physicalBoundary.affineE8CurrentAlgebraPresent, false);

console.log(JSON.stringify({
  status: "PASS",
  atlasTypes: ids,
  affineCartanRank: rank(cartan),
  nullMarkVector: marks,
  markRelationsChecked: marks.length,
  uniqueOrderOverlapRecords: new Set(keys).size,
  overlapOnlyValues: new Set(overlaps).size,
  overlapCollision: collision,
  minimumDistinctOverlapSpacing: minimumSpacing,
  blindTypesRecovered: recovered.length,
  e8CurrentAlgebraPresent: false,
  verdict: evidence.verdict
}));
