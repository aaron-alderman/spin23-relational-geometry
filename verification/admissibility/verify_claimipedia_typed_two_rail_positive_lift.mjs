import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const source = JSON.parse(readFileSync(new URL("corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json", root), "utf8"));
const evidence = JSON.parse(readFileSync(new URL("evidence/data/claimipedia-typed-two-rail-positive-lift-v1.json", root), "utf8"));
const edges = source.edges;
const nodes = [...new Set(edges.flatMap(([u, v]) => [u, v]))].sort();
const types = [...new Set(edges.map((edge) => edge[2]))].sort();
const nodeIndex = new Map(nodes.map((node, i) => [node, i]));
const typeIndex = new Map(types.map((type, i) => [type, i]));
const V = nodes.length, T = types.length, dimension = 2 * T * V;
const idx = (type, rail, node) => ((typeIndex.get(type) * 2 + rail) * V + nodeIndex.get(node));

const columns = edges.map(([u, v, type]) => {
  const column = Array(dimension).fill(0);
  column[idx(type, 0, u)] = -1; // authored source rail
  column[idx(type, 1, v)] = 1;  // authored target rail
  return column;
});

const K = Array.from({ length: dimension }, () => Array(dimension).fill(0));
for (const column of columns) for (let i = 0; i < dimension; i++) if (column[i]) {
  for (let j = 0; j < dimension; j++) if (column[j]) K[i][j] += column[i] * column[j];
}

// The source-target block reconstructs every directed typed edge multiplicity.
for (const type of types) for (const u of nodes) for (const v of nodes) {
  const count = edges.filter((edge) => edge[0] === u && edge[1] === v && edge[2] === type).length;
  assert.equal(K[idx(type, 0, u)][idx(type, 1, v)], count === 0 ? 0 : -count);
}

// Rail swap sends the kernel equivariantly to the fully reversed graph.
const reverseColumns = edges.map(([u, v, type]) => {
  const column = Array(dimension).fill(0);
  column[idx(type, 0, v)] = -1;
  column[idx(type, 1, u)] = 1;
  return column;
});
const Kr = Array.from({ length: dimension }, () => Array(dimension).fill(0));
for (const column of reverseColumns) for (let i = 0; i < dimension; i++) if (column[i]) {
  for (let j = 0; j < dimension; j++) if (column[j]) Kr[i][j] += column[i] * column[j];
}
for (const type of types) for (let rail = 0; rail < 2; rail++) for (const u of nodes) {
  const i = idx(type, rail, u), mi = idx(type, 1 - rail, u);
  for (const type2 of types) for (let rail2 = 0; rail2 < 2; rail2++) for (const v of nodes) {
    const j = idx(type2, rail2, v), mj = idx(type2, 1 - rail2, v);
    assert.equal(K[mi][mj], Kr[i][j]);
  }
}

// Collapse type and rail coordinates: the ordinary support Laplacian is the quotient.
const collapsed = Array.from({ length: V }, () => Array(V).fill(0));
for (let u = 0; u < V; u++) for (let v = 0; v < V; v++) {
  for (const type of types) for (let r = 0; r < 2; r++) for (const type2 of types) for (let s = 0; s < 2; s++) {
    collapsed[u][v] += K[idx(type, r, nodes[u])][idx(type2, s, nodes[v])];
  }
}
const ordinary = Array.from({ length: V }, () => Array(V).fill(0));
for (const [uName, vName] of edges) {
  const u = nodeIndex.get(uName), v = nodeIndex.get(vName);
  ordinary[u][u]++; ordinary[v][v]++; ordinary[u][v]--; ordinary[v][u]--;
}
assert.deepEqual(collapsed, ordinary);

function rank(matrix, tolerance = 1e-10) {
  const A = matrix.map((row) => [...row]);
  let row = 0;
  for (let col = 0; col < A[0].length && row < A.length; col++) {
    let pivot = row;
    for (let r = row + 1; r < A.length; r++) if (Math.abs(A[r][col]) > Math.abs(A[pivot][col])) pivot = r;
    if (Math.abs(A[pivot][col]) <= tolerance) continue;
    [A[row], A[pivot]] = [A[pivot], A[row]];
    const p = A[row][col];
    for (let c = col; c < A[0].length; c++) A[row][c] /= p;
    for (let r = 0; r < A.length; r++) if (r !== row) {
      const f = A[r][col];
      for (let c = col; c < A[0].length; c++) A[r][c] -= f * A[row][c];
    }
    row++;
  }
  return row;
}

const columnMatrix = Array.from({ length: dimension }, (_, i) => columns.map((column) => column[i]));
const liftRank = rank(columnMatrix);
const ordinaryRank = rank(ordinary);
const distinctTypedRecords = new Set(edges.map((edge) => JSON.stringify(edge))).size;

assert.equal(source.sourceHash, evidence.sourceHash);
assert.equal(dimension, evidence.lift.dimension);
assert.equal(liftRank, evidence.lift.rank);
assert.equal(ordinaryRank, evidence.collapse.ordinaryLaplacianRank);
assert.equal(distinctTypedRecords, evidence.lift.distinctTypedRecords);
assert.equal(evidence.lift.positiveSemidefinite, true);
assert.equal(evidence.lift.directedTypedAdjacencyRecoverable, true);
assert.equal(evidence.mirror.railSwapEqualsArrowReversal, true);
assert.equal(evidence.decision.pathCompositionDerived, false);
assert.equal(evidence.decision.ot026ClosureConditionMet, false);

console.log(JSON.stringify({
  result: "pass",
  nodes: V,
  relationTypes: T,
  dimension,
  records: edges.length,
  distinctTypedRecords,
  liftRank,
  ordinaryRank,
  nextGate: evidence.nextGate
}, null, 2));
