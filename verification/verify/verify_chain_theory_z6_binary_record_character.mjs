import assert from "node:assert/strict";

const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const c6 = Array.from({ length: 6 }, (_, value) => value);
const c3Subgroup = [0, 2, 4];
const c2Subgroup = [0, 3];

// Enumerate homomorphisms C6 -> C2. A map is represented by its six outputs.
const homomorphisms = [];
for (let mask = 0; mask < 2 ** 6; mask += 1) {
  const image = c6.map((value) => (mask >> value) & 1);
  const preservesIdentity = image[0] === 0;
  const preservesAddition = c6.every((left) =>
    c6.every(
      (right) =>
        image[mod(left + right, 6)] === mod(image[left] + image[right], 2),
    ),
  );
  if (preservesIdentity && preservesAddition) homomorphisms.push(image);
}

assert.equal(homomorphisms.length, 2);
const nontrivial = homomorphisms.find((image) => image.some(Boolean));
assert.deepEqual(nontrivial, [0, 1, 0, 1, 0, 1]);

const kernel = c6.filter((value) => nontrivial[value] === 0);
assert.deepEqual(kernel, c3Subgroup);
assert.equal(nontrivial[2], 0); // omega = zeta_6^2
assert.equal(nontrivial[4], 0); // omega^2 = zeta_6^4
assert.equal(nontrivial[3], 1); // -1 = zeta_6^3
assert.deepEqual(c2Subgroup.map((value) => nontrivial[value]), [0, 1]);

// There is no nontrivial homomorphism C3 -> C2.
const c3ToC2 = [0, 1].filter((generatorImage) =>
  mod(3 * generatorImage, 2) === 0,
);
assert.deepEqual(c3ToC2, [0]);

const ordinaryProducts = 8 ** 2 + 3 ** 2 + 4 * (8 * 3);
const qubitBinaryOrderRecords = (3 * 2) / 2;
const qutritBinaryOrderRecords = 0;
const totalRecords =
  ordinaryProducts + qubitBinaryOrderRecords + qutritBinaryOrderRecords;
assert.equal(ordinaryProducts, 169);
assert.equal(qubitBinaryOrderRecords, 3);
assert.equal(totalRecords, 172);

console.log(JSON.stringify({
  status: "PASS",
  homomorphismsC6ToC2: homomorphisms.length,
  uniqueNontrivialCharacter: "chi(k)=k mod 2",
  kernel: {
    elementsInC6Coordinates: kernel,
    isC3: true,
  },
  phaseReadout: {
    qutritOmega: "+1 (not distinguished)",
    qutritOmegaSquared: "+1 (not distinguished)",
    qubitMinusOne: "-1 (distinguished)",
  },
  recordCensus: {
    ordinaryProducts,
    qubitBinaryOrderRecords,
    qutritBinaryOrderRecords,
    totalRecords,
  },
  firewall:
    "abstract C6 arithmetic does not identify the gauge kernel, carrier comparison phase, and detector phase without a typed sewing map",
  verdict:
    "a multiplicative one-bit detector uniquely reproduces the sign-only 169+3 record rule, conditional on read-order sewing into C6",
}));
