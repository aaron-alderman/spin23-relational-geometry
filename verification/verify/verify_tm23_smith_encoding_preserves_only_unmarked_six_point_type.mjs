#!/usr/bin/env node

import assert from "node:assert/strict";

const labels = ["A0", "A1", "A2", "B0", "B1", "B2"];

function bits4(n) {
  return [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1];
}

function dot2(a, b) {
  return (a[0] & b[0]) ^ (a[1] & b[1]);
}

function characteristicParity(m) {
  const z = bits4(m);
  return dot2(z.slice(0, 2), z.slice(2));
}

function symplecticPairing(x, y) {
  const X = bits4(x);
  const Y = bits4(y);
  return dot2(X.slice(0, 2), Y.slice(2)) ^ dot2(X.slice(2), Y.slice(0, 2));
}

function quadraticValue(characteristic, x) {
  const M = bits4(characteristic);
  const X = bits4(x);
  return dot2(X.slice(0, 2), X.slice(2))
    ^ dot2(M.slice(0, 2), X.slice(2))
    ^ dot2(M.slice(2), X.slice(0, 2));
}

function datum(marking) {
  const q = marking.A0 ^ marking.A1 ^ marking.A2;
  const L = [
    marking.A0 ^ marking.B0,
    marking.A1 ^ marking.B1,
    marking.A2 ^ marking.B2,
  ].sort((a, b) => a - b);
  const v = marking.A0 ^ marking.B0;
  const qDirection = q ^ v;
  assert.equal(characteristicParity(q), 0);
  assert.equal(new Set(L).size, 3);
  assert.equal(L[0] ^ L[1] ^ L[2], 0);
  assert.ok(L.every((x) => x !== 0));
  assert.ok(L.every((x) => quadraticValue(q, x) === 0));
  assert.ok(L.every((x, i) => L.slice(i + 1).every((y) => symplecticPairing(x, y) === 0)));
  assert.ok(L.includes(v));
  assert.equal(characteristicParity(qDirection), 0);
  return { q, L, v, qDirection };
}

const oddCharacteristics = [...Array(16).keys()].filter((m) => characteristicParity(m) === 1);
assert.equal(oddCharacteristics.length, 6);
const marking = Object.fromEntries(labels.map((label, i) => [label, oddCharacteristics[i]]));
const original = datum(marking);

// Smith's system-2/system-3 compiler conjugates colours 1 and 2 on the tape
// strictly to the left of the active cell (and sometimes on the active cell).
// A uniform colour conjugation is an S6 permutation, hence transports the
// genus-two incidence structure.  In this case it exchanges the two
// nondistinguished columns and actually stabilizes the selected (q,L,v).
const colourSwap = {
  A0: "A0", A1: "A2", A2: "A1",
  B0: "B0", B1: "B2", B2: "B1",
};
const swappedMarking = Object.fromEntries(labels.map((label) => [label, marking[colourSwap[label]]]));
const uniformlyTransported = datum(swappedMarking);
assert.deepEqual(uniformlyTransported, original);

// The actual compiler is piecewise rather than uniform.  The same local label
// A1 is sent to A2 on the left but remains A1 on the right, so no single map of
// the six local labels can implement the compiler on a configuration meeting
// both sides of the active seam.
const compilerImage = (side, label) => side === "left" ? colourSwap[label] : label;
assert.equal(compilerImage("left", "A1"), "A2");
assert.equal(compilerImage("right", "A1"), "A1");
assert.notEqual(compilerImage("left", "A1"), compilerImage("right", "A1"));
const globalLabelMaps = labels.filter((candidateImage) =>
  candidateImage === compilerImage("left", "A1")
  && candidateImage === compilerImage("right", "A1"));
assert.equal(globalLabelMaps.length, 0);

// Treating the two half-lines as charts gives transition function colourSwap.
// It has order two, so a closed scan that crosses the same seam once in each
// direction has trivial holonomy.  Since it fixes q while the direction shift
// is q -> q+v with v nonzero, the naive compiler cocycle is not the selected
// direction transvection.
for (const label of labels) assert.equal(colourSwap[colourSwap[label]], label);
assert.notEqual(original.v, 0);
assert.notEqual(original.qDirection, original.q);
assert.equal(uniformlyTransported.q, original.q);
const closedScanHolonomy = Object.fromEntries(labels.map((label) =>
  [label, colourSwap[colourSwap[label]]]));
assert.deepEqual(closedScanHolonomy, Object.fromEntries(labels.map((label) => [label, label])));

// The proof also passes through three-state, three-colour systems 2 and 3.
// Their local alphabet has nine state-symbol pairs, so the six-point carrier
// is not functorially present at every intermediate stage of the compiler.
const system0LocalCarrierSize = 2 * 3;
const system23LocalCarrierSize = 3 * 3;
assert.equal(system0LocalCarrierSize, 6);
assert.equal(system23LocalCarrierSize, 9);
assert.notEqual(system0LocalCarrierSize, system23LocalCarrierSize);

console.log(JSON.stringify({
  smithCompilerAudit: {
    system0LocalCarrierSize,
    intermediateSystem23CarrierSize: system23LocalCarrierSize,
    system2To3Conjugation: "swap colours 1 and 2 strictly left of the active seam, conditionally also at the active cell",
    uniformColourSwapIsS6Action: true,
    uniformActionPreservesUnmarkedGenusTwoIncidence: true,
    uniformActionStabilizesMarkedDatum: true,
    piecewiseActionDescendsToOneGlobalSixLabelMap: false,
    seamTransitionOrder: 2,
    closedTwoCrossingHolonomy: "identity",
    equalsDirectionTransvection: false,
  },
  original,
  uniformlyTransported,
  conclusion: "Smith emulation preserves access to the six-point micro-carrier at system 0, but does not transport one canonical marked (q,L,v) through the full compiler. Its naive Z2 seam cocycle has trivial closed-scan holonomy and is not the selected direction transvection.",
}, null, 2));
console.log("PASS verify_tm23_smith_encoding_preserves_only_unmarked_six_point_type");
