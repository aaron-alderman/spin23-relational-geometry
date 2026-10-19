import assert from "node:assert/strict";

const chirality = {
  PN: 1, NI: 1, IP: 1,
  NP: -1, PI: -1, IN: -1,
  PS: 1, SP: -1,
};
const vertices = Object.keys(chirality);
const firstOrderAllowed = (x, y) => x[0] === y[0] || x[1] === y[1];
const gradingOdd = (x, y) => chirality[x] === -chirality[y];
const edgeKey = (x, y) => [x, y].sort().join("-");

const physicalEdges = [
  ["PN", "IN"],
  ["NP", "NI"],
  ["PI", "NI"],
  ["IP", "IN"],
  ["SP", "IP"],
  ["PS", "PI"],
];
for (const [x, y] of physicalEdges) {
  assert.ok(firstOrderAllowed(x, y));
  assert.ok(gradingOdd(x, y));
}

const adjacency = (edges) => {
  const out = Object.fromEntries(vertices.map((x) => [x, []]));
  for (const [x, y] of edges) {
    out[x].push(y);
    out[y].push(x);
  }
  return out;
};
const components = (edges) => {
  const adj = adjacency(edges);
  const seen = new Set();
  const out = [];
  for (const root of vertices) {
    if (seen.has(root)) continue;
    const stack = [root];
    const component = [];
    seen.add(root);
    while (stack.length) {
      const x = stack.pop();
      component.push(x);
      for (const y of adj[x]) if (!seen.has(y)) {
        seen.add(y);
        stack.push(y);
      }
    }
    out.push(component.sort());
  }
  return out;
};

const physicalComponents = components(physicalEdges).sort((a, b) => a[0].localeCompare(b[0]));
assert.equal(physicalComponents.length, 2);
assert.deepEqual(physicalComponents.map((x) => x.length).sort(), [4, 4]);

const forbiddenReversals = [["PN", "NP"], ["NI", "IN"], ["IP", "PI"]];
const compIndex = Object.fromEntries(physicalComponents.flatMap((comp, i) => comp.map((x) => [x, i])));
for (const [x, y] of forbiddenReversals) assert.notEqual(compIndex[x], compIndex[y]);

const allAllowedOddEdges = [];
for (let i = 0; i < vertices.length; i += 1) {
  for (let j = i + 1; j < vertices.length; j += 1) {
    const [x, y] = [vertices[i], vertices[j]];
    if (firstOrderAllowed(x, y) && gradingOdd(x, y)) allAllowedOddEdges.push([x, y]);
  }
}

const physicalSet = new Set(physicalEdges.map(([x, y]) => edgeKey(x, y)));
const crossComponentCandidates = allAllowedOddEdges.filter(([x, y]) =>
  compIndex[x] !== compIndex[y] && !physicalSet.has(edgeKey(x, y)),
);
assert.deepEqual(
  crossComponentCandidates.map(([x, y]) => edgeKey(x, y)).sort(),
  ["IP-NP", "PI-PN"],
);

const result = {
  protocol: "minimal-spectator-connector-does-not-resolve-deck-obstruction/1",
  retainedPhysicalEdges: physicalEdges.map(([x, y]) => edgeKey(x, y)),
  connectedComponents: physicalComponents,
  componentCount: physicalComponents.length,
  forbiddenDeckPairsRemainDisconnected: forbiddenReversals.map(([x, y]) => edgeKey(x, y)),
  onlyAdditionalFirstOrderOddBridges: crossComponentCandidates.map(([x, y]) => edgeKey(x, y)).sort(),
  bridgeInterpretation: "PN<->PI and IP<->NP identify the Dirac and Majorana P-lifts (and their conjugates)",
  theorem:
    "The minimal spectator pair and its retained connectors merely attach one vertex to each orientation component. They do not resolve any forbidden deck reversal. The only additional first-order grading-odd bridges between the components are precisely the dangerous opposite-anchor-mixing pair and its conjugate.",
  consequence:
    "The strict first-order spectator completion cannot realize the Mobius deck while preserving anchor separation. Any rescue needs a larger mediator graph, generalized non-first-order support, or a structural non-one-form deck action.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
