import assert from "node:assert/strict";

const d2 = 2;
const d3 = 3;
const fullHermitianDimension = (d2 * d3) ** 2;
const normalizedStateAffineDimension = fullHermitianDimension - 1;
const fixedMarginalConstraints = (d2 ** 2 - 1) + (d3 ** 2 - 1);
const fixedMarginalAffineDimension =
  normalizedStateAffineDimension - fixedMarginalConstraints;

assert.equal(fullHermitianDimension, 36);
assert.equal(normalizedStateAffineDimension, 35);
assert.equal(fixedMarginalConstraints, 11);
assert.equal(fixedMarginalAffineDimension, 24);

const tensorEigenvalues = (a, b) => a.flatMap((x) => b.map((y) => x * y));

// Double-centering a product pure state gives a connected correlation
// operator, but not a positive operator.
const qubitPureCentered = [1 / 2, -1 / 2];
const qutritPureCentered = [2 / 3, -1 / 3, -1 / 3];
const doubleCenteredProduct = tensorEigenvalues(qubitPureCentered, qutritPureCentered);
const affineRepair = doubleCenteredProduct.map((x) => x + 1 / 6);

assert.ok(Math.min(...doubleCenteredProduct) < 0);
assert.ok(Math.min(...affineRepair) < 0);

// A simple connected direction supplies an exact positivity interval.
const sigmaZ = [1, -1];
const lambda3 = [1, -1, 0];
const connectedDirection = tensorEigenvalues(sigmaZ, lambda3);
const stateEigenvalues = (t) => connectedDirection.map((x) => 1 / 6 + t * x);
const isPositive = (values, tolerance = 1e-12) =>
  values.every((x) => x >= -tolerance);

assert.equal(isPositive(stateEigenvalues(1 / 6)), true);
assert.equal(isPositive(stateEigenvalues(-1 / 6)), true);
assert.equal(isPositive(stateEigenvalues(1 / 6 + 1e-6)), false);
assert.equal(isPositive(stateEigenvalues(-1 / 6 - 1e-6)), false);

console.log(JSON.stringify({
  status: "PASS",
  affineDimensionCount: {
    fullHermitianDimension,
    normalizedStateAffineDimension,
    fixedMarginalConstraints,
    fixedMarginalAffineDimension,
  },
  positivityNoGo: {
    theorem:
      "a positive semidefinite connected operator has trace zero and therefore must be zero",
    doubleCenteredProductEigenvalues: doubleCenteredProduct,
    minimum: Math.min(...doubleCenteredProduct),
    affineDoubleCenteringEigenvalues: affineRepair,
    affineMinimum: Math.min(...affineRepair),
    consequence:
      "neither the connected projection nor naive affine double-centering is a positive channel on all input states",
  },
  admissibleCorrelationSlice: {
    form: "rho(t)=I_6/6+t*(sigma_z tensor lambda_3)",
    exactInterval: [-1 / 6, 1 / 6],
    lowerBoundaryEigenvalues: stateEigenvalues(-1 / 6),
    upperBoundaryEigenvalues: stateEigenvalues(1 / 6),
  },
  verdict:
    "the factor 24 is the affine dimension of fixed-marginal correlation states, not the dimension of an autonomous positive state cone",
}));
