import assert from "node:assert/strict";

// This verifier treats the linked fine-structure expression as an inverse
// target.  The endpoint dimensions are the only numerical carrier inputs.
// The record rules are kept explicit so that their provenance can be audited
// independently of the final decimal value.
const qutritDimension = 3;
const qubitDimension = 2;

const qutritLetters = qutritDimension ** 2 - 1;
const qubitLetters = qubitDimension ** 2 - 1;
const linkDimension = qutritDimension * qubitDimension;
const readOperatorDimension = linkDimension ** 2;
const unreadConnectedDimension = qutritLetters * qubitLetters;
const readoutDimension =
  unreadConnectedDimension * readOperatorDimension ** 2;

// Product records occupy two distinct slots among (Q1,q1,Q2,q2).
const qutritQutritProducts = qutritLetters ** 2;
const qubitQubitProducts = qubitLetters ** 2;
const mixedProducts = 4 * qutritLetters * qubitLetters;
const productRecords =
  qutritQutritProducts + qubitQubitProducts + mixedProducts;

// The same-end products decompose under read exchange into symmetric and
// antisymmetric squares.  The mixed products split evenly under far-link
// exchange.  The Pauli letter space supplies one independent commutator for
// each unordered pair of its three letters.
const symmetricSameEnd =
  (qutritLetters * (qutritLetters + 1)) / 2 +
  (qubitLetters * (qubitLetters + 1)) / 2;
const antisymmetricSameEnd =
  (qutritLetters * (qutritLetters - 1)) / 2 +
  (qubitLetters * (qubitLetters - 1)) / 2;
const mixedPerLinkExchangeSector = mixedProducts / 2;
const qubitCommutators =
  (qubitLetters * (qubitLetters - 1)) / 2;

const sectors = {
  neitherExchange: antisymmetricSameEnd + mixedPerLinkExchangeSector,
  farLinkOnly: mixedPerLinkExchangeSector,
  readOnly: symmetricSameEnd,
  bothExchanges: qubitCommutators,
};
const recordCount = Object.values(sectors).reduce((sum, value) => sum + value, 0);

const weightedNumerator =
  sectors.neitherExchange +
  sectors.farLinkOnly * Math.sqrt(qubitDimension) +
  sectors.readOnly * Math.sqrt(qutritDimension) +
  sectors.bothExchanges * Math.sqrt(linkDimension);
const candidate = weightedNumerator / readoutDimension;
const candidateInverse = 1 / candidate;

const target = {
  readoutDimension: 31104,
  recordCount: 172,
  sectors: {
    neitherExchange: 79,
    farLinkOnly: 48,
    readOnly: 42,
    bothExchanges: 3,
  },
};

assert.equal(qutritLetters, 8);
assert.equal(qubitLetters, 3);
assert.equal(readOperatorDimension, 36);
assert.equal(unreadConnectedDimension, 24);
assert.equal(productRecords, 169);
assert.equal(symmetricSameEnd, 42);
assert.equal(antisymmetricSameEnd, 31);
assert.deepEqual(sectors, target.sectors);
assert.equal(recordCount, target.recordCount);
assert.equal(readoutDimension, target.readoutDimension);
assert.ok(Math.abs(candidateInverse - 137.03599918956616) < 1e-12);

const alternatives = {
  noCommutatorRecords: 1 /
    ((sectors.neitherExchange +
      sectors.farLinkOnly * Math.sqrt(2) +
      sectors.readOnly * Math.sqrt(3)) /
      readoutDimension),
  unweightedRecords: readoutDimension / recordCount,
  bornWeightsRatherThanAmplitudes: readoutDimension /
    (sectors.neitherExchange +
      2 * sectors.farLinkOnly +
      3 * sectors.readOnly +
      6 * sectors.bothExchanges),
  swappedEndpointWeights: 1 /
    ((sectors.neitherExchange +
      sectors.readOnly * Math.sqrt(2) +
      sectors.farLinkOnly * Math.sqrt(3) +
      sectors.bothExchanges * Math.sqrt(6)) /
      readoutDimension),
};

console.log(JSON.stringify({
  status: "PASS",
  mode: "inverse-target reconstruction with provenance firewall",
  carrier: {
    endpointDimensions: [qutritDimension, qubitDimension],
    tracelessLetterDimensions: [qutritLetters, qubitLetters],
    linkDimension,
    readOperatorDimension,
    unreadConnectedDimension,
  },
  census: {
    products: {
      qutritQutritProducts,
      qubitQubitProducts,
      mixedProducts,
      total: productRecords,
    },
    sameEndExchange: {
      symmetric: symmetricSameEnd,
      antisymmetric: antisymmetricSameEnd,
    },
    sectors,
    recordCount,
    readoutDimension,
  },
  candidate: {
    symbolic: "(79 + 48*sqrt(2) + 42*sqrt(3) + 3*sqrt(6))/31104",
    value: candidate,
    inverse: candidateInverse,
  },
  sensitivity: alternatives,
  provenance: {
    corpusNative: [
      "two-by-three endpoint split",
      "six-dimensional tensor and rectangular carriers",
      "36-dimensional full operator space",
      "S(U(3)xU(2)) with the faithful Z6 quotient",
      "positive-versus-completely-positive Choi boundary",
    ],
    canonicalAfterCarrierChoice: [
      "traceless dimensions 8 and 3",
      "full link-operator dimension 36",
      "connected endpoint product dimension 24",
      "symmetric/antisymmetric square dimensions 42 and 31",
    ],
    stillImportedFromTarget: [
      "exactly two read links and one unread state link",
      "the qutrit-end read rule",
      "the read/link exchange survival semantics",
      "three Pauli commutator records as additional records",
      "amplitude weights 1, sqrt(2), sqrt(3), sqrt(6)",
      "normalized readout as an on-shell photon two-point function",
    ],
  },
  verdict:
    "the arithmetic fingerprint is forced by the declared record kernel, but the corpus does not yet derive that kernel or the photon identification",
}));
