import assert from "node:assert/strict";

const mod = (n, p) => ((n % p) + p) % p;
const f2 = [...Array(16).keys()].map((n) => [n & 1, (n >> 1) & 1, (n >> 2) & 1, (n >> 3) & 1]);

const swapSummands = ([a, b, c, d]) => [c, d, a, b];
const q0 = ([a, b, c, d]) => mod(a * b + c * d, 2);
const pairingWithW = ([a, b, c, d]) => mod(a + b + c + d, 2);
const qMarked = (x) => mod(q0(x) + pairingWithW(x), 2);

// The sign of L15(-1) disappears in the mod-two norm refinement, and the
// ordered-summand reversal preserves both the unmarked form and w=(1,1,1,1).
for (const x of f2) {
  assert.equal(q0(swapSummands(x)), q0(x));
  assert.equal(pairingWithW(swapSummands(x)), pairingWithW(x));
}
assert.notDeepEqual(f2.map(q0), f2.map(qMarked));

// Hence bare reversal cannot produce the affine shift.  The minimal repair is
// an orientation bit epsilon: reversal swaps the summands and toggles epsilon.
const qEpsilon = (epsilon, x) => mod(q0(x) + epsilon * pairingWithW(x), 2);
for (const epsilon of [0, 1]) {
  for (const x of f2) {
    assert.equal(
      mod(qEpsilon(epsilon ^ 1, swapSummands(x)) - qEpsilon(epsilon, x), 2),
      pairingWithW(x),
    );
  }
}

// On the order-three discriminant sector Q(a,b)=a^2-b^2, the same summand
// exchange reverses orientation.  In hyperbolic coordinates u=a-b,v=a+b it
// fixes v and negates u, so uv changes sign.
for (let a = 0; a < 3; a += 1) {
  for (let b = 0; b < 3; b += 1) {
    const Q = mod(a * a - b * b, 3);
    const reversedQ = mod(b * b - a * a, 3);
    assert.equal(reversedQ, mod(-Q, 3));
    const u = mod(a - b, 3);
    const v = mod(a + b, 3);
    assert.equal(Q, mod(u * v, 3));
    assert.equal(reversedQ, mod((-u) * v, 3));
  }
}

console.log(JSON.stringify({
  bareReversal: {
    signedDiscriminantAction: "Q -> -Q",
    modTwoNormRefinementAction: "q0 -> q0",
    suppliesAffineShift: false,
  },
  minimalAugmentation: {
    seamDatum: "epsilon in F2",
    reversal: "(x,epsilon) -> (swapSummands(x),epsilon+1)",
    affineDifference: "<w,x>, w=(1,1,1,1)",
    ternaryHyperbolicAction: "(u,v) -> (-u,v)",
  },
  remainingGate: "derive epsilon and the identification of w with the machine-selected direction from the Golay sewing module",
}, null, 2));
console.log("PASS verify_leech_seam_affine_orientation_intertwiner");
