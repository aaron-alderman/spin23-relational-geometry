import assert from "node:assert/strict";

const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const symplectic = ([x, z], [y, w], prime) => mod(z * y - w * x, prime);
const points = (prime) =>
  Array.from({ length: prime }, (_, x) =>
    Array.from({ length: prime }, (_, z) => [x, z]),
  ).flat();
const nonzero = (point) => point.some((coordinate) => coordinate !== 0);

const v2 = points(2);
const v3 = points(3);
assert.equal(v2.length, 4);
assert.equal(v3.length, 9);
assert.equal(v2.filter(nonzero).length, 3);
assert.equal(v3.filter(nonzero).length, 8);
assert.equal(v2.length * v3.length, 36);

// Embed mu_2 x mu_3 into mu_6 using exponents of zeta_6:
// (-1)^s omega^t = zeta_6^(3s+2t).
const combinedExponent = (binaryPairing, qutritPairing) =>
  mod(3 * binaryPairing + 2 * qutritPairing, 6);
const binaryCharacter = (zeta6Exponent) => mod(zeta6Exponent, 2);

for (const u of v2) {
  for (const v of v2) {
    for (const a of v3) {
      for (const b of v3) {
        const s2 = symplectic(u, v, 2);
        const s3 = symplectic(a, b, 3);
        const phase = combinedExponent(s2, s3);
        assert.equal(binaryCharacter(phase), s2);
      }
    }
  }
}

const pauliLabels = v2.filter(nonzero);
const unorderedPauliPairs = [];
for (let left = 0; left < pauliLabels.length; left += 1) {
  for (let right = left + 1; right < pauliLabels.length; right += 1) {
    const pairing = symplectic(pauliLabels[left], pauliLabels[right], 2);
    unorderedPauliPairs.push({
      left: pauliLabels[left],
      right: pauliLabels[right],
      pairing,
    });
  }
}
assert.equal(unorderedPauliPairs.length, 3);
assert.ok(unorderedPauliPairs.every(({ pairing }) => pairing === 1));

let noncommutingQutritOrderedPairs = 0;
for (const left of v3.filter(nonzero)) {
  for (const right of v3.filter(nonzero)) {
    const pairing = symplectic(left, right, 3);
    if (pairing !== 0) noncommutingQutritOrderedPairs += 1;
    assert.equal(binaryCharacter(combinedExponent(0, pairing)), 0);
  }
}
assert.equal(noncommutingQutritOrderedPairs, 48);

const ordinaryRecords = 169;
const binaryPhaseRecords = unorderedPauliPairs.length;
assert.equal(ordinaryRecords + binaryPhaseRecords, 172);

console.log(JSON.stringify({
  status: "PASS",
  stateCarrier: {
    primaryForm: "F_2^2 direct-sum F_3^2",
    crtForm: "(Z_6)^2",
    size: v2.length * v3.length,
  },
  commutatorSewing: {
    formula:
      "B((u,a),(v,b)) = zeta_6^(3 [u,v]_2 + 2 [a,b]_3)",
    valueGroup: "mu_6",
    binaryProjection: "chi(B) = (-1)^[u,v]_2",
  },
  census: {
    pauliNonidentityDirections: pauliLabels.length,
    detectedUnorderedPauliPairs: unorderedPauliPairs.length,
    qutritNonidentityDirections: v3.filter(nonzero).length,
    noncommutingQutritOrderedPairs,
    qutritPairsDetectedByBinaryCharacter: 0,
    ordinaryRecords,
    totalRecords: ordinaryRecords + binaryPhaseRecords,
  },
  operationalFirewall:
    "central Weyl-operation commutators are not automatically the same record type as Lie brackets of Hermitian Gell-Mann observables",
  verdict:
    "the CRT Weyl commutator supplies the missing algebraic read-order sewing; physical Weyl-read and photon-residue identifications remain open",
}));
