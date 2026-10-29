import assert from "node:assert/strict";

const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;

// The unconditional residual group has three connected components: the
// discrete colour coordinate labels C3, while every component contains a full
// weak-phase circle.  Sampling phases is enough to check the component law;
// it is not used as a finite replacement for U(1).
const multiplyResidual = ([colourLeft, weakLeft], [colourRight, weakRight]) => [
  mod(colourLeft + colourRight, 3),
  mod(weakLeft + weakRight, 12)
];
assert.deepEqual(multiplyResidual([2, 11], [2, 2]), [1, 1]);
assert.deepEqual(new Set([0, 1, 2].map((colour) => multiplyResidual([colour, 0], [0, 0])[0])), new Set([0, 1, 2]));

// An identified common volume imposes beta^2 = 1, so the weak coordinate is
// reduced to C2.  CRT then makes the six pairs cyclic.
const finitePairs = [0, 1, 2].flatMap((colour) => [0, 1].map((weakSign) => [colour, weakSign]));
assert.equal(finitePairs.length, 6);
assert.equal(new Set(finitePairs.map((pair) => pair.join(","))).size, 6);

const crtImage = Array.from({ length: 6 }, (_, exponent) => [mod(exponent, 3), mod(exponent, 2)]);
assert.deepEqual(new Set(crtImage.map((pair) => pair.join(","))), new Set(finitePairs.map((pair) => pair.join(","))));
assert.deepEqual(crtImage[0], [0, 0]);
assert.deepEqual(crtImage[3], [0, 1]);
assert.deepEqual(crtImage[4], [1, 0]);

// With alpha = exp(2*pi*i*colour/3) and beta = (-1)^weakSign, every finite
// pair obeys alpha^3 beta^2 = 1.  This checks the algebraic condition while
// leaving the existence of the common-volume sewing as an explicit gate.
for (const [colour, weakSign] of finitePairs) {
  const alpha = { exponent: colour, modulus: 3 };
  const beta = { exponent: weakSign, modulus: 2 };
  assert.equal(mod(3 * alpha.exponent, alpha.modulus), 0);
  assert.equal(mod(2 * beta.exponent, beta.modulus), 0);
}

console.log("Mathematical group C3 x U1 residual phase seam: PASS components=3; conditionalPairs=6; CRT=C6; volumeGate=retained");
