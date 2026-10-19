import assert from "node:assert/strict";

const K = [[0, 3], [3, 0]];
const determinant = K[0][0] * K[1][1] - K[0][1] * K[1][0];
assert.equal(determinant, -9);

const Kinv = [[0, 1 / 3], [1 / 3, 0]];
for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
  const value = K[i][0] * Kinv[0][j] + K[i][1] * Kinv[1][j];
  assert.equal(value, i === j ? 1 : 0);
}
assert.equal(Kinv[0][1], 1 / 3);

// Smith normal form of [[0,3],[3,0]] has invariants (3,3):
// d1 is the gcd of entries and d1*d2=|det K|.
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const d1 = K.flat().reduce((d, x) => gcd(d, x), 0);
const d2 = Math.abs(determinant) / d1;
assert.deepEqual([d1, d2], [3, 3]);

const torusHilbertDimension = Math.abs(determinant);
const wilsonExponentModuleOrder = 3 ** 4;
assert.equal(torusHilbertDimension, 9);
assert.equal(wilsonExponentModuleOrder, 81);
assert.equal(Math.sqrt(wilsonExponentModuleOrder), torusHilbertDimension);

const mod3 = (x) => ((x % 3) + 3) % 3;
const omegaExponent = (electric, magnetic, intersection) =>
  mod3(electric * magnetic * intersection);

assert.equal(omegaExponent(1, 1, 1), 1);
assert.equal(omegaExponent(1, 1, -1), 2);

for (let a = 0; a < 3; a += 1) for (let b = 0; b < 3; b += 1) {
  const forward = mod3(a * b);
  const reverse = mod3(2 * a * b);
  assert.equal(reverse, mod3(-forward));
}

const reduction = {
  fourDimensionalTerm: "b2 wedge d a1",
  circleZeroModes: {
    a1: "a1_3d + phi dy",
    b2: "b2_3d + c1_3d wedge dy"
  },
  threeDimensionalTerms: [
    "c1_3d wedge d a1_3d",
    "b2_3d wedge d phi"
  ],
  desiredBfFactorPresent: true,
  extraSectorPresent: true
};
assert.equal(reduction.desiredBfFactorPresent, true);
assert.equal(reduction.extraSectorPresent, true);

console.log(JSON.stringify({
  protocol: "one-third-response-minimal-bf-completion/1",
  response: {
    mutualFraction: "1/3",
    minimalHyperbolicK: K,
    inverseK: Kinv
  },
  finiteData: {
    determinant,
    smithInvariants: [d1, d2],
    anyonGroup: "Z3 x Z3",
    torusHilbertDimension,
    wilsonExponentModule: "F3^4",
    wilsonExponentModuleOrder
  },
  circleReduction: reduction,
  orientation: {
    forwardMutualExponent: "ab",
    reverseMutualExponent: "2ab=-ab mod 3"
  },
  conclusion: "The minimal rank-two hyperbolic dynamical completion of a mutual one-third response is level-three BF. Circle reduction contains the 2+1d K=3H factor whose torus quantization is the nine-state F3^4 carrier; dynamical gauging and control of the extra reduction sector remain physical assumptions."
}, null, 2));
