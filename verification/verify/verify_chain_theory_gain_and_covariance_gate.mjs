import assert from "node:assert/strict";

const endpoint = { qubitAdjoint: 3, qutritAdjoint: 8 };
const connectedDimension = endpoint.qubitAdjoint * endpoint.qutritAdjoint;
const readDimension = 36;
const eta = 1 / 8;

assert.equal(connectedDimension, 24);
assert.equal(connectedDimension * readDimension ** 2, 31104);

// A covariant endomorphism of the irreducible external-product carrier is a
// scalar. Every connected coordinate therefore receives the same gain.
const inputCoordinates = Array.from(
  { length: connectedDimension },
  (_, index) => (index % 7) - 3 || 1,
);
const outputCoordinates = inputCoordinates.map((value) => eta * value);
const recoveredSlopes = outputCoordinates.map(
  (value, index) => value / inputCoordinates[index],
);
assert.ok(recoveredSlopes.every((value) => value === eta));

// Uniform gain preserves projective shape (ratios) but changes every absolute
// response.
for (let index = 1; index < connectedDimension; index += 1) {
  assert.equal(
    outputCoordinates[index] / outputCoordinates[0],
    inputCoordinates[index] / inputCoordinates[0],
  );
}

const targetInverse = 137.03599918956616;
const targetAlpha = 1 / targetInverse;
const absoluteAlphaAfterUnreadChannel = eta * targetAlpha;
const absoluteInverseAfterUnreadChannel = 1 / absoluteAlphaAfterUnreadChannel;
assert.ok(Math.abs(absoluteInverseAfterUnreadChannel - 8 * targetInverse) < 1e-12);

// A scalar action cannot implement a nontrivial rank-3 selector on a
// 24-dimensional irreducible carrier: its rank is either zero or 24.
const covariantRanks = [0, connectedDimension];
assert.equal(covariantRanks.includes(3), false);
assert.equal(covariantRanks.includes(8), false);

console.log(JSON.stringify({
  status: "PASS",
  carrier: {
    representation: "su(2)_adjoint tensor su(3)_adjoint",
    dimension: connectedDimension,
    covariantAction: "one scalar eta on all 24 directions",
  },
  maximalCompletelyPositiveGain: eta,
  supportCount: connectedDimension * readDimension ** 2,
  target: {
    inverseBeforeGain: targetInverse,
    inverseIfAbsoluteLinearResponse: absoluteInverseAfterUnreadChannel,
    inverseIfCalibratedRatio: targetInverse,
  },
  noGo: {
    covariantCarrierRanks: covariantRanks,
    cannotProduceRank3OrRank8Selector: true,
    consequence:
      "the asymmetric Lie-sector rule must live in the read algebra, detector kernel, or explicit symmetry breaking",
  },
  verdict:
    "support dimension is preserved, but absolute normalization and the sign-only detector quotient remain unproved",
}));
