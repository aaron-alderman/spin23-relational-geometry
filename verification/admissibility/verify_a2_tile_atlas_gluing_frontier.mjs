import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const atlas = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-a2-tile-atlas-v1.json"), "utf8"));

assert.equal(atlas.protocol, "admissibility-a2-typed-tile-atlas/1");
assert.equal(atlas.nodes.length, 6);
assert.equal(new Set(atlas.nodes.map((node) => node.id)).size, atlas.nodes.length);
assert.equal(new Set(atlas.edges.map((edge) => edge.id)).size, atlas.edges.length);

const nodes = new Map(atlas.nodes.map((node) => [node.id, node]));
for (const node of atlas.nodes) {
  for (const field of ["domain", "rank", "basis", "regime", "symmetry", "support"]) {
    assert.equal(typeof node.signature[field], "string");
    assert.ok(node.signature[field].length > 0);
  }
  assert.ok(node.evidenceRefs.length > 0);
}

for (const edge of atlas.edges) {
  assert.ok(nodes.has(edge.from));
  assert.ok(nodes.has(edge.to));
  assert.equal(edge.algebraicallyExact, true);
  assert.equal(edge.physicalAdmission, false);
  assert.ok(edge.changes.length > 0);
  assert.ok(edge.assumptions.length > 0);
  assert.ok(edge.blocker.length > 0);
  assert.ok(edge.evidenceRefs.length > 0);
}

const adjacency = new Map(atlas.nodes.map((node) => [node.id, []]));
for (const edge of atlas.edges) {
  adjacency.get(edge.from).push(edge.to);
  adjacency.get(edge.to).push(edge.from);
}
const visited = new Set([atlas.nodes[0].id]);
const queue = [atlas.nodes[0].id];
while (queue.length > 0) {
  const current = queue.shift();
  for (const next of adjacency.get(current)) {
    if (!visited.has(next)) {
      visited.add(next);
      queue.push(next);
    }
  }
}

const physicalEdges = atlas.edges.filter((edge) => edge.physicalAdmission);
assert.equal(visited.size, atlas.nodes.length);
assert.equal(physicalEdges.length, atlas.closure.physicalGraphEdgeCount);
assert.equal(atlas.closure.algebraicGraphConnected, true);
assert.equal(atlas.closure.physicalGraphConnected, false);
assert.equal(atlas.closure.globalAutomorphismDerived, false);
assert.equal(atlas.closure.e8ClosureDerived, false);

console.log(JSON.stringify({
  status: "PASS",
  nodes: atlas.nodes.length,
  algebraicEdges: atlas.edges.length,
  algebraicGraphConnected: visited.size === atlas.nodes.length,
  physicallyAdmittedCrossCarrierEdges: physicalEdges.length,
  physicalGraphConnected: atlas.closure.physicalGraphConnected,
  globalClosure: "OPEN"
}));

