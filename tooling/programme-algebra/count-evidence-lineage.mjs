import assert from "node:assert/strict";

// An artifact can rename an acquisition without making it independent.
// Walk declared derivations and compare both record IDs and acquisition keys.
export function inspectCountLineage(graph) {
  const { nodes, predictionRoots, outcomes } = graph;
  const byId = new Map(nodes.map(node => [node.id, node]));
  assert.equal(byId.size, nodes.length, "Duplicate lineage record.");
  function paths(id, seen = []) {
    assert.ok(!seen.includes(id), "Cycle in count evidence lineage.");
    const node = byId.get(id);
    assert.ok(node, "Unknown count evidence record: " + id);
    const path = [...seen, id];
    return [{ node, path }, ...node.dependsOn.flatMap(parent => paths(parent, path))];
  }

  assert.ok(predictionRoots.length && outcomes.length);
  for (const node of nodes) paths(node.id);
  const observed = outcomes.flatMap(id => paths(id));
  assert.ok(observed.some(({ node }) => node.acquisitionKey), "Declare the physical outcome acquisition.");
  const collisions = [];
  for (const root of predictionRoots) {
    for (const input of paths(root)) {
      for (const outcome of observed) {
        const sameRecord = input.node.id === outcome.node.id;
        const sameAcquisition = input.node.acquisitionKey && input.node.acquisitionKey === outcome.node.acquisitionKey;
        if (sameRecord || sameAcquisition) {
          collisions.push({
            inputPath: input.path, outcomePath: outcome.path,
            acquisitionKey: sameAcquisition ? input.node.acquisitionKey : null
          });
        }
      }
    }
  }
  return { status: collisions.length ? "declared-outcome-reuse" : "no-declared-outcome-reuse", collisions };
}
