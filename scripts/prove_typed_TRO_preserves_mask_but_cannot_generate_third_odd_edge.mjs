import assert from "node:assert/strict";

const E = (n, i, j) => Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => Number(r === i && c === j)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map((row) => row.map((x) => s * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const star = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const zero = (A) => A.every((row) => row.every((x) => x === 0));
const equal = (A, B) => A.every((row, i) => row.every((x, j) => x === B[i][j]));
const triple = (X, Y, Z) => scale(0.5, add(mul(mul(X, star(Y)), Z), mul(mul(Z, star(Y)), X)));
const jordan = (X, Y) => scale(0.5, add(mul(X, Y), mul(Y, X)));

const inSpan = (X, basis) => {
  const nonzeroPositions = [];
  for (let i = 0; i < X.length; i += 1) {
    for (let j = 0; j < X.length; j += 1) {
      if (X[i][j] !== 0) nonzeroPositions.push([i, j]);
    }
  }
  const allowed = new Set();
  for (const B of basis) {
    for (let i = 0; i < B.length; i += 1) {
      for (let j = 0; j < B.length; j += 1) {
        if (B[i][j] !== 0) allowed.add(`${i},${j}`);
      }
    }
  }
  return nonzeroPositions.every(([i, j]) => allowed.has(`${i},${j}`));
};

// Coarse one-carrier/two-face TRO: row P with columns I,N.
const a = E(3, 0, 1); // P-I relation
const b = E(3, 0, 2); // P-N relation
const coarseCarrier = [a, b];

for (const x of coarseCarrier) {
  for (const y of coarseCarrier) {
    for (const z of coarseCarrier) {
      assert.ok(inSpan(triple(x, y, z), coarseCarrier));
    }
  }
}

const rightIN = mul(star(a), b);
assert.ok(equal(rightIN, E(3, 1, 2)));
assert.ok(!inSpan(rightIN, coarseCarrier));

const selfAdjointPI = add(a, star(a));
const selfAdjointPN = add(b, star(b));
const binaryInducedIN = jordan(selfAdjointPI, selfAdjointPN);
assert.ok(equal(binaryInducedIN, scale(0.5, add(E(3, 1, 2), E(3, 2, 1)))));

// Fully typed opposite-anchor carrier: the two arrows occupy disjoint blocks.
const typedD = E(4, 0, 1);
const typedM = E(4, 2, 3);
assert.ok(zero(mul(star(typedD), typedM)));
assert.ok(zero(mul(star(typedM), typedD)));
assert.ok(zero(triple(typedD, typedD, typedM)));
assert.ok(zero(triple(typedD, typedM, typedM)));

const result = {
  protocol: "typed-TRO-mask-versus-third-odd-edge/1",
  coarseCarrier: {
    space: "R=span{E_PI,E_PN}",
    tripleClosed: true,
    generatedOddINCarrier: false,
    rightLinkingAlgebraContainsIN: true,
    identity: "E_PI^* E_PN = E_IN",
  },
  binarySelfAdjointClosure: {
    generatesIN: true,
    identity: "(X_PI o X_PN)=(E_IN+E_NI)/2",
    degree: "even",
  },
  oppositeAnchorTypedCarrier: {
    crossCoefficientProductsVanish: true,
    mixedTripleProductsVanish: true,
    maskPreserved: true,
  },
  theorem:
    "The two-spoke TRO is closed under Jordan triples and preserves the relation mask, but it cannot generate a third odd I-N carrier. The I-N matrix unit appears in the even right linking algebra; self-adjoint binary Jordan closure promotes it to the coarse observable algebra.",
  consequence:
    "A Mobius triangle with three odd physical edges needs an independent typed odd I-N generator or a Real/groupoid operation that lifts the even linking coefficient back to an odd relation.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
