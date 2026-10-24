import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const wave = path.join(root, "corpus/programmes/frontier/wave-7");
const source = JSON.parse(fs.readFileSync(path.join(wave, "claimipedia_relationship_operator_source_v1.json"), "utf8"));
const ledger = JSON.parse(fs.readFileSync(path.join(wave, "claimipedia_kenotic_pole_topology_v1.json"), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };

const directedEdges = source.edges.map(([from, to, type]) => ({ from, to, type }));
const vertices = [...new Set(directedEdges.flatMap(({ from, to }) => [from, to]))].sort();
const undirectedEdges = [...new Map(directedEdges.map(({ from, to }) => {
  const pair = [from, to].sort();
  return [pair.join("\u0000"), pair];
})).values()];

function graphWithout(removed = new Set()) {
  const keptVertices = vertices.filter((vertex) => !removed.has(vertex));
  const keptEdges = undirectedEdges.filter(([left, right]) => !removed.has(left) && !removed.has(right));
  const adjacency = new Map(keptVertices.map((vertex) => [vertex, new Set()]));
  for (const [left, right] of keptEdges) {
    adjacency.get(left).add(right);
    adjacency.get(right).add(left);
  }
  const components = [];
  const unseen = new Set(keptVertices);
  while (unseen.size > 0) {
    const seed = unseen.values().next().value;
    const component = [];
    const queue = [seed];
    unseen.delete(seed);
    while (queue.length > 0) {
      const vertex = queue.pop();
      component.push(vertex);
      for (const neighbor of adjacency.get(vertex)) {
        if (unseen.delete(neighbor)) queue.push(neighbor);
      }
    }
    components.push(component.sort());
  }
  return {
    vertices: keptVertices.length,
    edges: keptEdges.length,
    components,
    beta1: keptEdges.length - keptVertices.length + components.length,
    adjacency,
  };
}

function reachable(start) {
  const seen = new Set([start]);
  const queue = [start];
  while (queue.length > 0) {
    const vertex = queue.pop();
    for (const { from, to } of directedEdges) {
      if (from === vertex && !seen.has(to)) {
        seen.add(to);
        queue.push(to);
      }
    }
  }
  return seen;
}

const base = graphWithout();
const reachability = new Map(vertices.map((vertex) => [vertex, reachable(vertex)]));

function isBridge([left, right]) {
  const seen = new Set([left]);
  const queue = [left];
  while (queue.length > 0) {
    const vertex = queue.pop();
    for (const edge of undirectedEdges) {
      if ((edge[0] === left && edge[1] === right) || (edge[0] === right && edge[1] === left)) continue;
      const neighbor = edge[0] === vertex ? edge[1] : edge[1] === vertex ? edge[0] : null;
      if (neighbor !== null && !seen.has(neighbor)) {
        seen.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return !seen.has(right);
}

function audit(node) {
  const reduced = graphWithout(new Set([node]));
  const neighbors = [...base.adjacency.get(node)].sort();
  const neighborComponents = reduced.components
    .map((component) => component.filter((vertex) => neighbors.includes(vertex)))
    .filter((component) => component.length > 0)
    .sort((left, right) => left[0].localeCompare(right[0]));
  const incoming = directedEdges.filter(({ to }) => to === node);
  const outgoing = directedEdges.filter(({ from }) => from === node);
  const incidentBridgeEdges = undirectedEdges
    .filter((edge) => edge.includes(node) && isBridge(edge))
    .sort((left, right) => left.join("\u0000").localeCompare(right.join("\u0000")));
  const stronglyConnected = vertices.filter((vertex) =>
    reachability.get(node).has(vertex) && reachability.get(vertex).has(node));
  return {
    node,
    undirectedDegree: neighbors.length,
    incomingCount: incoming.length,
    outgoingCount: outgoing.length,
    incidentTypes: {
      incoming: incoming.reduce((counts, edge) => ({ ...counts, [edge.type]: (counts[edge.type] ?? 0) + 1 }), {}),
      outgoing: outgoing.reduce((counts, edge) => ({ ...counts, [edge.type]: (counts[edge.type] ?? 0) + 1 }), {}),
    },
    directedCycleMember: stronglyConnected.length > 1 || directedEdges.some(({ from, to }) => from === node && to === node),
    stronglyConnectedComponentSize: stronglyConnected.length,
    articulation: reduced.components.length > base.components.length,
    componentIncreaseOnDeletion: reduced.components.length - base.components.length,
    beta1AfterDeletion: reduced.beta1,
    cycleRankLostOnDeletion: base.beta1 - reduced.beta1,
    incidentBridgeEdges,
    neighborComponentsAfterDeletion: neighborComponents,
  };
}

const computed = {
  sourceHash: source.sourceHash,
  base: {
    vertices: base.vertices,
    undirectedEdges: base.edges,
    components: base.components.length,
    beta1: base.beta1,
  },
  nodes: ledger.nodes.map(({ node }) => audit(node)),
};

insist(computed.sourceHash === ledger.sourceHash, "source hash mismatch");
insist(JSON.stringify(computed.base) === JSON.stringify(ledger.base), "base topology mismatch");
for (const expected of ledger.nodes) {
  const actual = computed.nodes.find(({ node }) => node === expected.node);
  for (const key of [
    "undirectedDegree", "incomingCount", "outgoingCount", "directedCycleMember",
    "stronglyConnectedComponentSize", "articulation", "componentIncreaseOnDeletion",
    "beta1AfterDeletion", "cycleRankLostOnDeletion",
  ]) insist(JSON.stringify(actual[key]) === JSON.stringify(expected[key]), `${expected.node}: ${key} mismatch`);
  insist(JSON.stringify(actual.incidentTypes) === JSON.stringify(expected.incidentTypes), `${expected.node}: incident type mismatch`);
  insist(JSON.stringify(actual.incidentBridgeEdges) === JSON.stringify(expected.incidentBridgeEdges), `${expected.node}: incident bridge mismatch`);
  insist(
    JSON.stringify(actual.neighborComponentsAfterDeletion) === JSON.stringify(expected.neighborComponentsAfterDeletion),
    `${expected.node}: neighbor partition mismatch; actual=${JSON.stringify(actual.neighborComponentsAfterDeletion)}`,
  );
}

console.log(JSON.stringify({
  status: "PASS",
  sourceHash: source.sourceHash,
  base: computed.base,
  nodes: computed.nodes.map(({ node, articulation, directedCycleMember, componentIncreaseOnDeletion, cycleRankLostOnDeletion }) => ({
    node,
    articulation,
    directedCycleMember,
    componentIncreaseOnDeletion,
    cycleRankLostOnDeletion,
  })),
  interpretation: "one cycle-bearing acyclic articulation and one acyclic bridge; no puncture or cohomology claim",
}));
