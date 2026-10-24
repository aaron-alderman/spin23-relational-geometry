import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const wave = "corpus/programmes/frontier/wave-7/";
const source = JSON.parse(readFileSync(new URL(`${wave}claimipedia_relationship_operator_source_v1.json`, root), "utf8"));
const ledger = JSON.parse(readFileSync(new URL(`${wave}claimipedia_kenotic_cover_gluing_v1.json`, root), "utf8"));
const junction = ledger.junction;

const allVertices = [...new Set(source.edges.flatMap(edge => edge.slice(0, 2)))].sort();
const vertices = allVertices.filter(vertex => vertex !== junction);
const adjacency = new Map(vertices.map(vertex => [vertex, new Set()]));
for (const [from, to] of source.edges) {
  if (from === junction || to === junction || from === to) continue;
  adjacency.get(from)?.add(to);
  adjacency.get(to)?.add(from);
}

const unseen = new Set(vertices);
const components = [];
while (unseen.size > 0) {
  const seed = unseen.values().next().value;
  unseen.delete(seed);
  const queue = [seed];
  const component = [];
  while (queue.length > 0) {
    const vertex = queue.pop();
    component.push(vertex);
    for (const neighbor of adjacency.get(vertex)) if (unseen.delete(neighbor)) queue.push(neighbor);
  }
  components.push(component.sort());
}

const coverSets = ledger.cover.map(item => {
  const branch = components.find(component => component.includes(item.seed));
  assert.ok(branch, `missing branch for ${item.id}`);
  assert.equal(branch.length, item.branchSizeWithoutJunction, `${item.id} branch size`);
  const cover = new Set([...branch, junction]);
  assert.equal(cover.size, item.coverSize, `${item.id} cover size`);
  return cover;
});

const intersect = (...sets) => [...sets[0]].filter(value => sets.slice(1).every(set => set.has(value))).sort();
const expectedSingleton = [junction];
assert.deepEqual(intersect(coverSets[0], coverSets[1]), expectedSingleton);
assert.deepEqual(intersect(coverSets[0], coverSets[2]), expectedSingleton);
assert.deepEqual(intersect(coverSets[1], coverSets[2]), expectedSingleton);
assert.deepEqual(intersect(...coverSets), expectedSingleton);
assert.equal(new Set(coverSets.flatMap(set => [...set])).size, ledger.relevantComponentSize);

function rank(matrix) {
  const a = matrix.map(row => row.map(Number));
  let row = 0;
  for (let col = 0; col < a[0].length && row < a.length; col += 1) {
    const pivot = a.findIndex((candidate, index) => index >= row && Math.abs(candidate[col]) > 1e-12);
    if (pivot < 0) continue;
    [a[row], a[pivot]] = [a[pivot], a[row]];
    const scale = a[row][col];
    a[row] = a[row].map(value => value / scale);
    for (let index = 0; index < a.length; index += 1) {
      if (index === row) continue;
      const factor = a[index][col];
      a[index] = a[index].map((value, j) => value - factor * a[row][j]);
    }
    row += 1;
  }
  return row;
}

const d0 = [
  [-1, 1, 0],
  [-1, 0, 1],
  [0, -1, 1],
];
const d1 = [[1, -1, 1]];
const composition = d1.map(row => d0[0].map((_, col) => row.reduce((sum, value, index) => sum + value * d0[index][col], 0)));
assert.deepEqual(composition, [[0, 0, 0]], "d1 d0 must vanish");
assert.equal(rank(d0), ledger.constantCoefficientCech.ranks.d0);
assert.equal(rank(d1), ledger.constantCoefficientCech.ranks.d1);
const h1 = d0.length - rank(d1) - rank(d0);
assert.equal(h1, ledger.constantCoefficientCech.cohomologyDimensions.H1);
assert.equal(h1, 0);
assert.equal(ledger.nerve.filledTwoSimplices, 1);
assert.equal(ledger.operatorBoundary.overlapCarrierDimension, 1);
assert.equal(ledger.operatorBoundary.nondegenerateAlternatingFormPossible, false);
assert.equal(ledger.operatorBoundary.authoredDistinctOverlapTransitions, false);

console.log(JSON.stringify({
  status: "PASS",
  sourceHash: source.sourceHash,
  relevantComponentSize: ledger.relevantComponentSize,
  coverSizes: ledger.cover.map(item => item.coverSize),
  intersections: "all pairwise and triple intersections are the same singleton junction",
  nerve: ledger.nerve,
  cechH1: h1,
  verdict: "naive three-sector absent-pole obstruction closed negatively",
}));
