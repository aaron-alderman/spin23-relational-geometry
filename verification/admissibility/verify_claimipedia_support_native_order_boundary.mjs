import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const source = JSON.parse(readFileSync(new URL("corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json", root), "utf8"));
const evidence = JSON.parse(readFileSync(new URL("evidence/data/claimipedia-support-native-order-boundary-v1.json", root), "utf8"));
const edges = source.edges;
const nodes = [...new Set(edges.flatMap(([u, v]) => [u, v]))].sort();
const index = new Map(nodes.map((node, i) => [node, i]));
const eps = 1e-10;

function components(edgeList) {
  const adjacency = new Map(nodes.map((node) => [node, new Set()]));
  for (const [u, v] of edgeList) { adjacency.get(u).add(v); adjacency.get(v).add(u); }
  const seen = new Set();
  const result = [];
  for (const start of nodes) {
    if (seen.has(start)) continue;
    const stack = [start]; seen.add(start); const component = [];
    while (stack.length) {
      const u = stack.pop(); component.push(u);
      for (const v of adjacency.get(u)) if (!seen.has(v)) { seen.add(v); stack.push(v); }
    }
    result.push(component.sort());
  }
  return result;
}

function laplacian(edgeList, nodeList = nodes) {
  const localIndex = new Map(nodeList.map((node, i) => [node, i]));
  const L = Array.from({ length: nodeList.length }, () => Array(nodeList.length).fill(0));
  for (const [u, v] of edgeList) {
    if (!localIndex.has(u) || !localIndex.has(v)) continue;
    const i = localIndex.get(u), j = localIndex.get(v);
    L[i][i] += 1; L[j][j] += 1; L[i][j] -= 1; L[j][i] -= 1;
  }
  return L;
}

function inverse(A) {
  const n = A.length;
  const M = A.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => Number(i === j))]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let row = col + 1; row < n; row++) if (Math.abs(M[row][col]) > Math.abs(M[pivot][col])) pivot = row;
    assert.ok(Math.abs(M[pivot][col]) > eps, "interior Laplacian must be invertible");
    [M[col], M[pivot]] = [M[pivot], M[col]];
    const p = M[col][col]; M[col] = M[col].map((x) => x / p);
    for (let row = 0; row < n; row++) if (row !== col) {
      const f = M[row][col]; M[row] = M[row].map((x, j) => x - f * M[col][j]);
    }
  }
  return M.map((row) => row.slice(n));
}

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const equal = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));

function twoPort(edgeList, boundary) {
  const graphComponents = components(edgeList);
  const component = graphComponents.find((c) => c.includes(boundary[0]));
  assert.ok(component.includes(boundary[1]));
  const ordered = [...boundary, ...component.filter((node) => !boundary.includes(node))];
  const L = laplacian(edgeList, ordered);
  const Lbb = L.slice(0, 2).map((row) => row.slice(0, 2));
  const Lbi = L.slice(0, 2).map((row) => row.slice(2));
  const Lib = L.slice(2).map((row) => row.slice(0, 2));
  const Lii = L.slice(2).map((row) => row.slice(2));
  return sub(Lbb, mul(mul(Lbi, inverse(Lii)), Lib));
}

const typeCounts = Object.fromEntries(["Challenges", "DependsOn", "Qualifies", "Supports"].map((type) => [type, edges.filter((e) => e[2] === type).length]));
const undirectedKey = ([u, v]) => [u, v].sort().join("\u0000");
const uniqueUndirected = new Map();
for (const edge of edges) if (!uniqueUndirected.has(undirectedKey(edge))) uniqueUndirected.set(undirectedKey(edge), edge);
const componentCount = components(edges).length;
const multigraphCycleRank = edges.length - nodes.length + componentCount;
const simpleCycleRank = uniqueUndirected.size - nodes.length + componentCount;

const L = laplacian(edges);
const reversedL = laplacian(edges.map(([u, v, type]) => [v, u, type]));
const relabelledL = laplacian(edges.map(([u, v, type]) => [u, v, type === "Supports" ? "Challenges" : "Supports"]));
assert.ok(equal(L, reversedL));
assert.ok(equal(L, relabelledL));

const spin = "claim.grandThesis.spin-2-3";
const temple = "claim.grandThesis.temple-sourcery";
const fullTwoPort = twoPort(edges, [spin, temple]);
const deduplicatedTwoPort = twoPort([...uniqueUndirected.values()], [spin, temple]);
assert.ok(equal(fullTwoPort, [[2, -2], [-2, 2]]));
assert.ok(equal(deduplicatedTwoPort, [[1, -1], [-1, 1]]));

const directedPairs = new Set(edges.map(([u, v]) => `${u}\u0000${v}`));
const reverseRecordCount = edges.filter(([u, v]) => directedPairs.has(`${v}\u0000${u}`)).length;
assert.equal(reverseRecordCount, 2);

assert.equal(source.sourceHash, evidence.source.sourceHash);
assert.equal(edges.length, 43);
assert.equal(nodes.length, 38);
assert.deepEqual(typeCounts, evidence.census.relationTypeCounts);
assert.equal(componentCount, evidence.census.undirectedComponents);
assert.equal(multigraphCycleRank, evidence.census.multigraphCycleRank);
assert.equal(simpleCycleRank, evidence.census.simpleUndirectedCycleRank);
assert.equal(evidence.order.supportNative, true);
assert.equal(evidence.order.semanticsNative, false);
assert.equal(evidence.order.arrowDirectionRetained, false);
assert.equal(evidence.order.relationTypeRetained, false);
assert.equal(evidence.twoPort.recordLevelConductance, fullTwoPort[0][0]);
assert.equal(evidence.twoPort.relationLevelConductance, deduplicatedTwoPort[0][0]);
assert.equal(evidence.decision.ot026ClosureConditionMet, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  nodes: nodes.length,
  records: edges.length,
  components: componentCount,
  multigraphCycleRank,
  simpleCycleRank,
  reverseRecordCount,
  fullTwoPort,
  deduplicatedTwoPort,
  nextGate: evidence.nextGate
}, null, 2));
