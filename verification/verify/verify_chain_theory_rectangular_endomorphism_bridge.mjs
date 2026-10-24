import assert from "node:assert/strict";

const leftDimension = 2;
const rightDimension = 3;
const mediatorDimension = leftDimension * rightDimension;
const endomorphismDimension = mediatorDimension ** 2;

const leftScalar = 1;
const leftAdjoint = leftDimension ** 2 - 1;
const rightScalar = 1;
const rightAdjoint = rightDimension ** 2 - 1;

const sectors = {
  scalar: leftScalar * rightScalar,
  leftLocal: leftAdjoint * rightScalar,
  rightLocal: leftScalar * rightAdjoint,
  connected: leftAdjoint * rightAdjoint,
};

const sectorTotal = Object.values(sectors).reduce((sum, value) => sum + value, 0);
const readoutDimension = sectors.connected * endomorphismDimension ** 2;

assert.equal(mediatorDimension, 6);
assert.equal(endomorphismDimension, 36);
assert.deepEqual(sectors, {
  scalar: 1,
  leftLocal: 3,
  rightLocal: 8,
  connected: 24,
});
assert.equal(sectorTotal, endomorphismDimension);
assert.equal(readoutDimension, 31104);

// The 24-dimensional adjoint of sl5 is a different module.  Under
// sl2 x sl3 it contains five summands rather than the single biadjoint.
const sl5Branching = [
  { type: "(3,1)", dimension: 3 },
  { type: "(1,8)", dimension: 8 },
  { type: "(1,1)", dimension: 1 },
  { type: "(2,3bar)", dimension: 6 },
  { type: "(2,3)", dimension: 6 },
];
const sl5Dimension = sl5Branching.reduce((sum, item) => sum + item.dimension, 0);
const connectedBranching = [{ type: "(3,8)", dimension: 24 }];

assert.equal(sl5Dimension, 24);
assert.equal(connectedBranching[0].dimension, 24);
assert.notDeepEqual(sl5Branching, connectedBranching);

console.log(JSON.stringify({
  status: "PASS",
  rectangularCarrier: {
    module: "Hom(C^3,C^2)",
    complexDimension: mediatorDimension,
  },
  endomorphismDecomposition: {
    representation: "(1+3) tensor (1+8)",
    sectors,
    total: sectorTotal,
  },
  chainConfiguration: {
    readCopies: 2,
    eachReadDimension: endomorphismDimension,
    unreadConnectedDimension: sectors.connected,
    totalReadoutDimension: readoutDimension,
  },
  typeFirewall: {
    connectedUnreadModule: connectedBranching,
    sl5AdjointBranching: sl5Branching,
    sameDimension: sl5Dimension === sectors.connected,
    equivariantlyIdentical: false,
  },
  verdict:
    "one rectangular mediator canonically generates the 36-dimensional decoration algebra and its 24-dimensional connected biadjoint sector, but it does not derive the choice of two read copies, one unread copy, or the photon normalization",
}));
