import assert from "node:assert/strict";

const dims = { O1: 1, O2: 3, H: 2, C: 1, R: 1 };
const edge = (name, target, source) => ({ name, target, source,
  dimension: dims[target] * dims[source] });
const A = [
  edge("Q", "O2", "H"), edge("u^c", "C", "O2"),
  edge("d^c", "O1", "O2"), edge("L", "H", "R"), edge("e^c", "R", "C"),
];
const B = [
  edge("Q", "O2", "H"), edge("u^c", "C", "O2"),
  edge("d^c", "R", "O2"), edge("L", "H", "O1"), edge("e^c", "O1", "C"),
];
const swapBlock = (b) => b === "O1" ? "R" : b === "R" ? "O1" : b;
const swap = (e) => edge(e.name, swapBlock(e.target), swapBlock(e.source));
const key = (e) => `${e.name}:${e.target}<-${e.source}`;
const keys = (xs) => xs.map(key).sort();
const same = (x, y) => JSON.stringify(keys(x)) === JSON.stringify(keys(y));
const setB = new Set(keys(B));
const intersection = A.filter((e) => setB.has(key(e)));
const dim = (xs) => xs.reduce((sum, e) => sum + e.dimension, 0);

assert.equal(dim(A), 15);
assert.equal(dim(B), 15);
assert(same(A.map(swap), B));
assert(!same(A.map(swap), A));
assert.deepEqual(intersection.map((e) => e.name), ["Q", "u^c"]);
assert.equal(dim(intersection), 9);
assert.equal(dim(A) + dim(B) - dim(intersection), 21);

console.log(JSON.stringify({
  protocol: "furey-exchange-two-topology-correspondence/1",
  topologyDimensions: { A: dim(A), B: dim(B) },
  exchangeMapsAExactlyToB: same(A.map(swap), B),
  exchangeIsInternalAutomorphismOfA: same(A.map(swap), A),
  intersectionSectors: intersection.map((e) => e.name),
  intersectionComplexDimension: dim(intersection),
  distinctPartComplexDimensionPerTopology: dim(A) - dim(intersection),
  unionComplexDimension: dim(A) + dim(B) - dim(intersection),
  typing: "S:T_A -> T_B is an exact unitary TRO equivalence, not an endomorphism of T_A. The Hermitian selector is a cross-topology response/correspondence.",
  physicalGate: "Supply a reason both topology faces enter one observable construction, or select one topology and derive an internal replacement for S.",
  passed: true,
}, null, 2));
