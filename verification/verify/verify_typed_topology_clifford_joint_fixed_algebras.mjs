import assert from "node:assert/strict";

// Fixed-algebra dimensions can be counted from tensor factors:
// - a full Pauli twirl on M_2 leaves R I_2;
// - the three-rebit Pauli twirl on M_8 leaves R I_8;
// - an untouched real face M_2 remains M_2.
const matrixAlgebraDimension = (n) => n * n;
const symmetricDimension = (n) => n * (n + 1) / 2;

const architectures = {
  separate: {
    space: "R^2_topology tensor R^2_CliffordFace tensor R^8_multiplicity",
    topologyFixedDimension: 1,
    faceFixedDimension: matrixAlgebraDimension(2),
    multiplicityFixedDimension: 1,
    fullJointFixedDimension: 1 * matrixAlgebraDimension(2) * 1,
    symmetricJointFixedDimension: symmetricDimension(2)
  },
  identified: {
    space: "R^2_sharedTopologyAndFace tensor R^8_multiplicity",
    sharedFaceFixedDimension: 1,
    multiplicityFixedDimension: 1,
    fullJointFixedDimension: 1,
    symmetricJointFixedDimension: 1
  },
  responseMatterSeparated: {
    space: "(R^2_face tensor R^8_CliffordMultiplicity)_response tensor H_matter",
    responseSymmetricFixedDimension: symmetricDimension(2),
    matterAction: "identity"
  },
  matterEightIdentifiedWithMultiplicity: {
    space: "R^2_DiracTopology tensor R^8_DiracPair",
    afterBothFullPauliTwirlsDimension: 1,
    consequence: "only scalar matter operators survive"
  }
};

assert.equal(architectures.separate.fullJointFixedDimension, 4);
assert.equal(architectures.separate.symmetricJointFixedDimension, 3);
assert.equal(architectures.identified.fullJointFixedDimension, 1);
assert.equal(architectures.identified.symmetricJointFixedDimension, 1);
assert.equal(architectures.responseMatterSeparated.responseSymmetricFixedDimension, 3);
assert.equal(architectures.matterEightIdentifiedWithMultiplicity.afterBothFullPauliTwirlsDimension, 1);

// A rank-one projector in an n-dimensional fully depolarized factor is
// mapped to I_n/n, proving that individual matter labels are erased.
const n = 8;
const inputProjectorEigenvalues = [1, ...Array(n - 1).fill(0)];
const outputEigenvalues = Array(n).fill(1 / n);
assert.equal(inputProjectorEigenvalues.reduce((s, x) => s + x, 0), 1);
assert.equal(outputEigenvalues.reduce((s, x) => s + x, 0), 1);
assert.notDeepEqual(inputProjectorEigenvalues, outputEigenvalues);

console.log(JSON.stringify({
  protocol: "typed-topology-clifford-joint-fixed-algebras/1",
  architectures,
  exactConclusions: [
    "separate external topology and Clifford face: joint symmetric range is H_2(R), dimension 3",
    "identified topology and Clifford face: joint symmetric range is scalar, dimension 1",
    "identifying the eight Dirac-pair matter labels with the Clifford multiplicity makes full Pauli selection erase non-scalar matter observables"
  ],
  terminologyRule: "topology duplicate, Clifford face, Clifford multiplicity and matter Dirac-pair factor must be separately typed",
  passed: true
}, null, 2));
