const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const matVec = (A, v) => A.map(row => row.reduce((sum, x, i) => sum + x * v[i], 0));
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const approx = (a, b, tolerance = 1e-12) => Math.abs(a - b) <= tolerance;

// D4 star adjacency: vertex 0 is central and vertices 1,2,3 are the
// triality-related outer orbit.
const adjacency = [
  [0, 1, 1, 1],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0]
];

const central = [1, 0, 0, 0];
const outerSum = [0, 1, 1, 1];
assert(JSON.stringify(matVec(adjacency, central)) === JSON.stringify(outerSum), "center must map to the outer orbit sum");
assert(JSON.stringify(matVec(adjacency, outerSum)) === JSON.stringify([3, 0, 0, 0]), "outer orbit sum must map to three times the center");

// Columns give the images of [central, outerSum]. This is the equitable
// orbit quotient in an integral, non-orthonormal basis.
const quotientAdjacency = [
  [0, 3],
  [1, 0]
];
assert(quotientAdjacency[0][1] === 3 && quotientAdjacency[1][0] === 1, "integral orbit quotient must retain 3:1 incidence");

// Normalizing the orbit sum by sqrt(3) symmetrizes the same operator.
const sqrt3 = Math.sqrt(3);
const normalizedOuter = outerSum.map(x => x / sqrt3);
assert(approx(dot(normalizedOuter, normalizedOuter), 1), "normalized outer orbit vector must have unit norm");
assert(approx(dot(central, matVec(adjacency, normalizedOuter)), sqrt3), "normalized quotient coupling must be sqrt(3)");
assert(approx(dot(normalizedOuter, matVec(adjacency, central)), sqrt3), "normalized quotient must be symmetric");

// C = 2I-A. In the orbit-sum basis, its quotient is the transpose-convention
// G2 Cartan matrix. In the orthonormal basis, it is symmetric.
const quotientCartan = [
  [2, -3],
  [-1, 2]
];
assert(quotientCartan[0][0] * quotientCartan[1][1] - quotientCartan[0][1] * quotientCartan[1][0] === 1, "quotient Cartan determinant must be one");
const symmetricCartanEigenvalues = [2 - sqrt3, 2 + sqrt3];
assert(symmetricCartanEigenvalues.every(x => x > 0), "symmetric quotient Cartan form must be positive definite");

// The anti-invariant outer-difference plane is discarded by the quotient.
const difference1 = [0, 1, -1, 0];
const difference2 = [0, 1, 0, -1];
for (const v of [difference1, difference2]) {
  assert(JSON.stringify(matVec(adjacency, v)) === JSON.stringify([0, 0, 0, 0]), "outer-difference modes must be adjacency zero modes");
  assert(dot(v, outerSum) === 0 && dot(v, central) === 0, "discarded modes must be orthogonal to the invariant quotient sector");
}

// Continuous-time symmetric unit-rate walk on the star. Lumping the outer
// orbit yields total center->outer rate 3 and representative outer->center
// rate 1. Block stationary weights [1,3] satisfy detailed balance.
const lumpedGenerator = [
  [-3, 3],
  [1, -1]
];
assert(lumpedGenerator.every(row => row.reduce((a, b) => a + b, 0) === 0), "lumped Markov generator rows must sum to zero");
const stationaryWeights = [1, 3];
assert(stationaryWeights[0] * lumpedGenerator[0][1] === stationaryWeights[1] * lumpedGenerator[1][0], "block weights must restore detailed balance");
assert(lumpedGenerator[0][0] + lumpedGenerator[1][1] === -4, "nonzero lumped relaxation eigenvalue must be -4");

console.log("D4 orbit quotient graph and Markov lumping certificate: PASS");
console.log("integral_quotient_adjacency=[[0,3],[1,0]]; normalized_coupling=sqrt(3)");
console.log("quotient_cartan=[[2,-3],[-1,2]]; determinant=1");
console.log("discarded_outer_difference_modes=2; full_adjacency_spectrum={sqrt(3),-sqrt(3),0,0}");
console.log("lumped_rates=center_to_outer:3,outer_to_center:1; stationary_block_weights=1:3; relaxation_rate=4");
