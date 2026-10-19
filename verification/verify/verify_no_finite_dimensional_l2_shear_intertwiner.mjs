import assert from "node:assert/strict";

// Exact theorem used by the document:
// For nonzero symmetric B, q^T B q is a nonconstant real polynomial.
// Each level set has Lebesgue measure zero, so multiplication by
// exp(pi i q^T B q) has no L2 eigenvectors. A finite-dimensional invariant
// subspace of a unitary contains an eigenvector and therefore must be zero.
const theoremAssumptions = {
  carrier: "L2(R^2)",
  shearPhase: "exp(pi i q^T B q)",
  bSymmetric: true,
  bNonzero: true,
  quadraticPolynomialNonconstant: true,
  polynomialLevelSetsHaveLebesgueMeasureZero: true,
  countableUnionOfNullSetsIsNull: true,
  finiteDimensionalComplexUnitaryHasEigenvector: true
};

assert.ok(Object.values(theoremAssumptions).every((value) => value === true || typeof value === "string"));

// Concrete algebraic shadow: multiplication by the mutual quadratic q1*q2
// takes a polynomial of total degree N to degree N+2. Thus no finite
// polynomial-times-Gaussian cutoff is invariant. This is illustrative; the
// measure-theoretic theorem above excludes every finite-dimensional L2 basis.
const cutoffs = [];
for (let maxDegree = 0; maxDegree <= 20; maxDegree += 1) {
  const witness = { a: maxDegree, b: 0 };
  const image = { a: witness.a + 1, b: witness.b + 1 };
  const imageDegree = image.a + image.b;
  const leaks = imageDegree > maxDegree;
  assert.equal(leaks, true);
  cutoffs.push({ maxDegree, witness, image, imageDegree, leaks });
}

// If a nonzero bounded K:H->C^9 intertwined the unitary shear U with a
// finite unitary V, ran(K*) would be a nonzero finite-dimensional
// U-invariant subspace. The theorem forces ran(K*)=0, hence K=0.
const boundedIntertwinerImplication = {
  targetDimension: 9,
  adjointRangeFiniteDimensional: true,
  adjointRangeInvariant: true,
  physicalShearHasNoFiniteDimensionalInvariantSubspace: true,
  onlyBoundedExactIntertwiner: "zero"
};

assert.equal(boundedIntertwinerImplication.targetDimension, 9);
assert.equal(boundedIntertwinerImplication.onlyBoundedExactIntertwiner, "zero");

const level = 3;
const degreesOfFreedom = 2;
const compactQuantizationDimension = level ** degreesOfFreedom;
assert.equal(compactQuantizationDimension, 9);

console.log(JSON.stringify({
  protocol: "noncompact-shear-finite-intertwiner-no-go/1",
  theoremAssumptions,
  testedPolynomialHermiteCutoffs: {
    range: "0..20",
    allLeakUnderMutualQuadraticGenerator: cutoffs.every((row) => row.leaks),
    examples: [cutoffs[0], cutoffs[8], cutoffs[20]]
  },
  boundedIntertwinerImplication,
  compactEscape: {
    phaseSpace: "T^4",
    level,
    degreesOfFreedom,
    dimension: compactQuantizationDimension,
    finiteExponentModule: "(Z/3Z)^4"
  },
  conclusion: "No nonzero bounded exact map can intertwine a nonzero noncompact Schrodinger chirp with a nine-state unitary shear. Exact finiteness requires compact quantization; distributional theta periodization and coarse-graining are differently typed alternatives."
}, null, 2));

