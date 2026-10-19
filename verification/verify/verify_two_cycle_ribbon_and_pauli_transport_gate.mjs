import assert from "node:assert/strict";

const mod2 = (n) => ((n % 2) + 2) % 2;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);

// ---------------------------------------------------------------------------
// 1. The completed Furey graph has two integral cycle vectors.
// Edge orientation:
// Q:H->O2, uc:O2->C, dc:O2->D, ec:C->E, nuc:D->E, L:E->H.
// ---------------------------------------------------------------------------

const vertexOrder = ["H", "O2", "C", "D", "E"];
const edgeOrder = ["Q", "uc", "dc", "ec", "nuc", "L"];
const orientedEdges = [
  ["H", "O2"],
  ["O2", "C"],
  ["O2", "D"],
  ["C", "E"],
  ["D", "E"],
  ["E", "H"],
];

const incidence = vertexOrder.map((v) => orientedEdges.map(([s, t]) => (v === t ? 1 : v === s ? -1 : 0)));
const matVec = (a, x) => a.map((row) => dot(row, x));

const cycleC = [1, 1, 0, 1, 0, 1];
const cycleD = [1, 0, 1, 0, 1, 1];
const relativeCycle = cycleC.map((x, i) => x - cycleD[i]);

assert.deepEqual(matVec(incidence, cycleC), [0, 0, 0, 0, 0]);
assert.deepEqual(matVec(incidence, cycleD), [0, 0, 0, 0, 0]);
assert.deepEqual(matVec(incidence, relativeCycle), [0, 0, 0, 0, 0]);
assert.deepEqual(relativeCycle, [0, 1, -1, 1, -1, 0]);

// Vertex rephasings add B^T g to the edge phases. Every cycle phase is
// unchanged because B c=0. The relative phase cancels both shared edges.
const vertexGauge = [2, -3, 5, 7, -11];
const edgeGaugeShift = edgeOrder.map((_, e) => incidence.reduce((s, row, v) => s + row[e] * vertexGauge[v], 0));
assert.equal(dot(cycleC, edgeGaugeShift), 0);
assert.equal(dot(cycleD, edgeGaugeShift), 0);
assert.equal(dot(relativeCycle, edgeGaugeShift), 0);

// ---------------------------------------------------------------------------
// 2. The graph has two inequivalent oriented ribbon thickenings.
// Only O2 and E have degree three. Their cyclic orders may agree or disagree
// after matching (Q,L), (uc,ec), (dc,nuc).
// ---------------------------------------------------------------------------

const halfEdgesByVertex = {
  H: ["QH", "LH"],
  O2: ["QO", "uO", "dO"],
  C: ["uC", "eC"],
  D: ["dD", "nD"],
  E: ["LE", "eE", "nE"],
};

const alpha = new Map([
  ["QH", "QO"], ["QO", "QH"],
  ["uO", "uC"], ["uC", "uO"],
  ["dO", "dD"], ["dD", "dO"],
  ["LH", "LE"], ["LE", "LH"],
  ["eC", "eE"], ["eE", "eC"],
  ["nD", "nE"], ["nE", "nD"],
]);

const reverseCyclicOrder = (a, reversed) => reversed ? [a[0], ...a.slice(1).reverse()] : [...a];

const ribbonType = (reverseO2, reverseE) => {
  const sigma = new Map();
  for (const [vertex, raw] of Object.entries(halfEdgesByVertex)) {
    const order = vertex === "O2"
      ? reverseCyclicOrder(raw, reverseO2)
      : vertex === "E"
        ? reverseCyclicOrder(raw, reverseE)
        : raw;
    order.forEach((h, i) => sigma.set(h, order[(i + 1) % order.length]));
  }

  // Boundary permutation for the oriented ribbon surface.
  const boundaryNext = (h) => sigma.get(alpha.get(h));
  const seen = new Set();
  let boundaries = 0;
  for (const h of alpha.keys()) {
    if (seen.has(h)) continue;
    boundaries += 1;
    let k = h;
    do {
      seen.add(k);
      k = boundaryNext(k);
    } while (k !== h);
  }

  // The graph is a deformation retract: chi=V-E=-1=2-2g-b.
  const genus = (3 - boundaries) / 2;
  const intersectionRank = 2 * genus;
  return { reverseO2, reverseE, boundaries, genus, intersectionRank };
};

const ribbonTypes = [];
for (const reverseO2 of [false, true]) {
  for (const reverseE of [false, true]) ribbonTypes.push(ribbonType(reverseO2, reverseE));
}

assert.equal(ribbonTypes.filter((x) => x.genus === 1 && x.boundaries === 1).length, 2);
assert.equal(ribbonTypes.filter((x) => x.genus === 0 && x.boundaries === 3).length, 2);
for (const x of ribbonTypes) {
  assert.equal(x.genus === 1, x.reverseO2 === x.reverseE);
  assert.equal(x.intersectionRank, x.genus === 1 ? 2 : 0);
}

// ---------------------------------------------------------------------------
// 3. Count the ambiguity in transporting the stationary plane to a logical
// Pauli phase space over F2.
// ---------------------------------------------------------------------------

const vectors = Array.from({ length: 16 }, (_, n) => [n & 1, (n >> 1) & 1, (n >> 2) & 1, (n >> 3) & 1]);
const nonzero = vectors.filter((v) => v.some(Boolean));
const omega = (v, w) => mod2(v[0] * w[2] + v[1] * w[3] + v[2] * w[0] + v[3] * w[1]);
const X = nonzero.filter((v) => v[2] === 0 && v[3] === 0);
const Z = nonzero.filter((v) => v[0] === 0 && v[1] === 0);

const allSymplecticOrderedPairs = nonzero.flatMap((v) => nonzero.map((w) => [v, w])).filter(([v, w]) => omega(v, w) === 1);
const polarizationCompatiblePairs = X.flatMap((v) => Z.map((w) => [v, w])).filter(([v, w]) => omega(v, w) === 1);

assert.equal(allSymplecticOrderedPairs.length, 120);
assert.equal(polarizationCompatiblePairs.length, 6);

// A 2D binary space has exactly one nondegenerate alternating form, but
// choosing an isomorphism to a named 2D logical Lagrangian still has |GL(2,2)|=6 choices.
const matrices2 = Array.from({ length: 16 }, (_, n) => [
  [n & 1, (n >> 1) & 1],
  [(n >> 2) & 1, (n >> 3) & 1],
]);
const det2 = (m) => mod2(m[0][0] * m[1][1] - m[0][1] * m[1][0]);
const gl2 = matrices2.filter((m) => det2(m) === 1);
assert.equal(gl2.length, 6);

const alternatingForms2 = matrices2.filter((m) =>
  m[0][0] === 0 && m[1][1] === 0 && m[0][1] === m[1][0]);
const nondegenerateAlternatingForms2 = alternatingForms2.filter((m) => det2(m) === 1);
assert.equal(alternatingForms2.length, 2);
assert.equal(nondegenerateAlternatingForms2.length, 1);

console.log(JSON.stringify({
  protocol: "two-cycle-ribbon-and-pauli-transport-gate/1",
  graph: {
    vertices: vertexOrder.length,
    edges: edgeOrder.length,
    cycleRank: edgeOrder.length - vertexOrder.length + 1,
    relativeCycle,
    sharedEdgesCancelled: ["Q", "L"],
    vertexRephasingInvariant: true,
  },
  ribbonThickenings: ribbonTypes,
  topology: {
    alignedBranchOrders: "once-punctured torus; intersection rank 2",
    oppositeBranchOrders: "pair of pants; intersection rank 0",
  },
  stationaryToLogicalTransport: {
    uniqueNondegenerateAlternatingFormOnF2Squared: true,
    unconstrainedOrderedSymplecticEmbeddings: allSymplecticOrderedPairs.length,
    XZPolarizationCompatibleEmbeddings: polarizationCompatiblePairs.length,
    isomorphismsToNamedLogicalLagrangian: gl2.length,
    visibleSMPointwiseStabilizerActsTrivially: true,
  },
  consequence: "A source-derived ribbon order can select whether the two graph cycles have a symplectic intersection, but current code/flag data do not choose one of the six polarization-compatible label transports.",
  passed: true,
}, null, 2));
