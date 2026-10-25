import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const source = JSON.parse(readFileSync(new URL("corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json", root), "utf8"));
const evidence = JSON.parse(readFileSync(new URL("evidence/data/claimipedia-incidence-coincidence-topology-doublet-v1.json", root), "utf8"));
const nodes = [...new Set(source.edges.flatMap(([u, v]) => [u, v]))].sort();
const index = new Map(nodes.map((node, i) => [node, i]));
const L = Array.from({ length: nodes.length }, () => Array(nodes.length).fill(0));
const Q = Array.from({ length: nodes.length }, () => Array(nodes.length).fill(0));
const adjacency = new Map(nodes.map(node => [node, new Set()]));

for (const [uName, vName] of source.edges) {
  const u = index.get(uName), v = index.get(vName);
  L[u][u]++; L[v][v]++; L[u][v]--; L[v][u]--;
  Q[u][u]++; Q[v][v]++; Q[u][v]++; Q[v][u]++;
  adjacency.get(uName).add(vName);
  adjacency.get(vName).add(uName);
}

function rank(matrix, tolerance = 1e-10) {
  const A = matrix.map(row => [...row]);
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

const seen = new Set();
const components = [];
for (const start of nodes) {
  if (seen.has(start)) continue;
  const queue = [start];
  const colour = new Map([[start, 0]]);
  const members = [];
  let bipartite = true;
  seen.add(start);
  while (queue.length) {
    const u = queue.shift();
    members.push(u);
    for (const v of adjacency.get(u)) {
      if (!colour.has(v)) {
        colour.set(v, 1 - colour.get(u));
        seen.add(v);
        queue.push(v);
      } else if (colour.get(v) === colour.get(u)) bipartite = false;
    }
  }
  components.push({ members, bipartite });
}

const rankL = rank(L), rankQ = rank(Q);
const bipartiteComponents = components.filter(component => component.bipartite).length;
const oddCycleComponents = components.length - bipartiteComponents;
assert.equal(source.sourceHash, evidence.sourceHash);
assert.equal(nodes.length, evidence.graph.nodes);
assert.equal(components.length, evidence.graph.connectedComponents);
assert.equal(bipartiteComponents, evidence.graph.bipartiteComponents);
assert.equal(oddCycleComponents, evidence.graph.oddCycleComponents);
assert.equal(rankL, evidence.scalarQuotients.laplacianRank);
assert.equal(rankQ, evidence.scalarQuotients.signlessLaplacianRank);
assert.equal(nodes.length - rankL, components.length);
assert.equal(nodes.length - rankQ, bipartiteComponents);
assert.equal(rankQ - rankL, oddCycleComponents);
assert(components.some(component => component.members.length === 3 && !component.bipartite && component.members.includes("claim.riverFlow")));

console.log(JSON.stringify({
  result: "pass",
  packet: evidence.packet,
  nodes: nodes.length,
  records: source.edges.length,
  connectedComponents: components.length,
  bipartiteComponents,
  oddCycleComponents,
  laplacianRank: rankL,
  signlessLaplacianRank: rankQ,
  nextGate: evidence.nextGate
}, null, 2));
