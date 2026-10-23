import assert from "node:assert/strict";

const LENGTH = 23;
const MASK = (1 << LENGTH) - 1;
const GOLAY_GENERATOR =
  (1 << 11) |
  (1 << 9) |
  (1 << 7) |
  (1 << 6) |
  (1 << 5) |
  (1 << 1) |
  1;

const popcount = value => {
  let count = 0;
  for (let word = value >>> 0; word !== 0; word >>>= 1) count += word & 1;
  return count;
};

const rotateLeft = (word, shift = 1) => {
  const reduced = shift % LENGTH;
  return (((word << reduced) & MASK) | (word >>> (LENGTH - reduced))) >>> 0;
};

const rotateRight = (word, shift = 1) => rotateLeft(word, LENGTH - (shift % LENGTH));

const cyclicGolayCode = [];
for (let message = 0; message < 1 << 12; message += 1) {
  let word = 0;
  for (let bit = 0; bit < 12; bit += 1) {
    if ((message >>> bit) & 1) word ^= GOLAY_GENERATOR << bit;
  }
  cyclicGolayCode.push(word >>> 0);
}

const golay = new Set(cyclicGolayCode);
assert.equal(golay.size, 4096);

const weightEnumerator = Object.fromEntries(
  [...new Set(cyclicGolayCode.map(popcount))]
    .sort((a, b) => a - b)
    .map(weight => [weight, cyclicGolayCode.filter(word => popcount(word) === weight).length]),
);
assert.deepEqual(weightEnumerator, {
  0: 1,
  7: 253,
  8: 506,
  11: 1288,
  12: 1288,
  15: 506,
  16: 253,
  23: 1,
});

// In coordinate i, Rule 30 is
// x_(i-1) + x_i + x_(i+1) + x_i*x_(i+1) over F_2.
const adjacentSchurTerm = word => (word & rotateRight(word)) >>> 0;
const linearRule150Part = word => (rotateLeft(word) ^ word ^ rotateRight(word)) >>> 0;
const rule30 = word => (linearRule150Part(word) ^ adjacentSchurTerm(word)) >>> 0;

// The cyclic linear code contains the full linear part.  Therefore Rule 30
// returns to G_23 exactly when its adjacent Schur term lies in G_23.
for (const word of cyclicGolayCode) {
  assert(golay.has(rotateLeft(word)));
  assert(golay.has(linearRule150Part(word)));
  assert.equal(golay.has(rule30(word)), golay.has(adjacentSchurTerm(word)));
  assert.equal(
    golay.has(adjacentSchurTerm(word)),
    golay.has(adjacentSchurTerm((word ^ MASK) >>> 0)),
  );
}

// The even subcode is G_23^perp. It makes the adjacency count even for every
// even word; the one-dimensional odd quotient makes it odd for every odd word.
const generatorBasis = Array.from({ length: 12 }, (_, shift) => (GOLAY_GENERATOR << shift) >>> 0);
for (const word of cyclicGolayCode) {
  const adjacencyParity = popcount(adjacentSchurTerm(word)) % 2;
  assert.equal(adjacencyParity, popcount(word) % 2);
  if (popcount(word) % 2 === 0) {
    for (const basisWord of generatorBasis) {
      assert.equal(popcount(word & basisWord) % 2, 0);
    }
  }
}

const compatible = cyclicGolayCode.filter(word => golay.has(rule30(word)));
assert.equal(compatible.length, 48);

const compatibleWeights = Object.fromEntries(
  [0, 8, 15, 23].map(weight => [
    weight,
    compatible.filter(word => popcount(word) === weight).length,
  ]),
);
assert.deepEqual(compatibleWeights, { 0: 1, 8: 23, 15: 23, 23: 1 });

const independentOctads = compatible.filter(
  word => popcount(word) === 8 && adjacentSchurTerm(word) === 0,
);
assert.equal(independentOctads.length, 23);

// Intrinsic Witt-design moment count for the octad orbit distribution.
const allOctads = cyclicGolayCode.filter(word => popcount(word) === 8);
assert.equal(allOctads.length, 506);
const octadAdjacencyDistribution = {};
let firstAdjacencyMoment = 0;
let secondAdjacencyMoment = 0;
for (const word of allOctads) {
  const adjacency = popcount(adjacentSchurTerm(word));
  octadAdjacencyDistribution[adjacency] = (octadAdjacencyDistribution[adjacency] ?? 0) + 1;
  firstAdjacencyMoment += adjacency;
  secondAdjacencyMoment += adjacency * (adjacency - 1) / 2;
}
assert.deepEqual(octadAdjacencyDistribution, { 0: 23, 2: 322, 4: 161 });
assert.equal(firstAdjacencyMoment, 23 * 56);
assert.equal(secondAdjacencyMoment, 23 * 16 + 230 * 4);
assert.deepEqual(
  Object.fromEntries(Object.entries(octadAdjacencyDistribution).map(([key, value]) => [key, value / 23])),
  { 0: 1, 2: 14, 4: 7 },
);

// One representative is g(x)(1+x+x^2+x^7).  Its shifts exhaust the octads.
const octadRepresentative = 0x054529;
assert(golay.has(octadRepresentative));
assert.equal(popcount(octadRepresentative), 8);
assert.equal(adjacentSchurTerm(octadRepresentative), 0);
assert.deepEqual(
  new Set(independentOctads),
  new Set(Array.from({ length: LENGTH }, (_, shift) => rotateLeft(octadRepresentative, shift))),
);

// The octad orbit remembers the chosen 23-cycle intrinsically. Two orbit
// octads are disjoint exactly when their shift labels differ by +/-1.
const support = word => new Set(
  Array.from({ length: LENGTH }, (_, coordinate) => coordinate)
    .filter(coordinate => (word >>> coordinate) & 1),
);
const octadBlocks = Array.from(
  { length: LENGTH },
  (_, shift) => support(rotateLeft(octadRepresentative, shift)),
);
const intersectionSize = (left, right) => [...left].filter(point => right.has(point)).length;
for (let i = 0; i < LENGTH; i += 1) {
  for (let j = i + 1; j < LENGTH; j += 1) {
    const difference = (j - i) % LENGTH;
    assert.equal(
      intersectionSize(octadBlocks[i], octadBlocks[j]) === 0,
      difference === 1 || difference === LENGTH - 1,
    );
  }
}

// The coordinate points have distinct incidence signatures across the blocks,
// so a coordinate permutation fixing every block is the identity.
const pointSignature = point => octadBlocks.map(block => Number(block.has(point))).join("");
const pointSignatures = Array.from({ length: LENGTH }, (_, point) => pointSignature(point));
assert.equal(new Set(pointSignatures).size, LENGTH);

// The abstract disjointness graph is a 23-cycle, but its reflection does not
// extend to the point-block incidence. Therefore the full setwise coordinate
// stabilizer is the realized rotation group C_23, not D_46.
const reflectedSignature = point => Array.from(
  { length: LENGTH },
  (_, block) => Number(octadBlocks[(LENGTH - block) % LENGTH].has(point)),
).join("");
for (let point = 0; point < LENGTH; point += 1) {
  assert(!pointSignatures.includes(reflectedSignature(point)));
}
const centralSymmetryOverlaps = Array.from({ length: LENGTH }, (_, centerSum) => {
  const reflected = new Set([...octadBlocks[0]].map(point => (centerSum - point + LENGTH) % LENGTH));
  return intersectionSize(octadBlocks[0], reflected);
});
assert.equal(Math.max(...centralSymmetryOverlaps), 6);

const complementarySolutions = new Set(independentOctads.map(word => (word ^ MASK) >>> 0));
const weight15Solutions = new Set(compatible.filter(word => popcount(word) === 15));
assert.deepEqual(complementarySolutions, weight15Solutions);
for (const word of weight15Solutions) {
  assert.equal(popcount(adjacentSchurTerm(word)), 7);
  assert(golay.has(adjacentSchurTerm(word)));
}

const transitionCounts = {};
for (const word of compatible) {
  const key = `${popcount(word)}->${popcount(rule30(word))}`;
  transitionCounts[key] = (transitionCounts[key] ?? 0) + 1;
}
assert.deepEqual(transitionCounts, {
  "0->0": 1,
  "8->16": 23,
  "15->8": 23,
  "23->0": 1,
});

const remainsInGolayFor = (word, steps) => {
  let state = word;
  for (let step = 0; step < steps; step += 1) {
    state = rule30(state);
    if (!golay.has(state)) return false;
  }
  return true;
};

assert.deepEqual(
  [1, 2, 3].map(steps => cyclicGolayCode.filter(word => remainsInGolayFor(word, steps)).length),
  [48, 25, 2],
);

// Direct center-trace diagnostic.  This is evidence for the stated boundary,
// not a proof of normality: the observed counts lie near the uniform density
// |G_23|/2^23 = 1/2048 in both reciprocal cyclic presentations.
const reverseBits = (word, width) => {
  let reversed = 0;
  for (let bit = 0; bit < width; bit += 1) {
    reversed |= ((word >>> bit) & 1) << (width - bit - 1);
  }
  return reversed >>> 0;
};

const reciprocalGolay = new Set(cyclicGolayCode.map(word => reverseBits(word, LENGTH)));
const CENTER_BITS = 200_000;
const center = CENTER_BITS;
const spacetimeMask = (1n << BigInt(2 * CENTER_BITS + 1)) - 1n;
let state = 1n << BigInt(center);
let window = 0;
let forwardHits = 0;
let reciprocalHits = 0;

for (let time = 0; time < CENTER_BITS; time += 1) {
  const centerBit = Number((state >> BigInt(center)) & 1n);
  window = ((window << 1) | centerBit) & MASK;
  if (time >= LENGTH - 1) {
    if (golay.has(window)) forwardHits += 1;
    if (reciprocalGolay.has(window)) reciprocalHits += 1;
  }
  state = (((state << 1n) & spacetimeMask) ^ (state | (state >> 1n))) & spacetimeMask;
}

assert.equal(forwardHits, 86);
assert.equal(reciprocalHits, 103);

console.log(JSON.stringify({
  codeSize: golay.size,
  compatibleCount: compatible.length,
  compatibleWeights,
  transitionCounts,
  octadOrbitStabilizer: "C23",
  consecutiveSurvivors: { oneStep: 48, twoSteps: 25, threeSteps: 2 },
  centerTrace: {
    bits: CENTER_BITS,
    windows: CENTER_BITS - LENGTH + 1,
    uniformExpectationPerOrientation: (CENTER_BITS - LENGTH + 1) / 2048,
    forwardHits,
    reciprocalHits,
  },
}, null, 2));

