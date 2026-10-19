import assert from "node:assert/strict";

// Completed one-generation left-handed Weyl sectors:
// (Q,u^c,d^c,L,e^c,nu^c).  D is the number of gauge components.
const D = [6, 3, 3, 2, 1, 1];
const lambdaDeduplicated = [5, 5, 1, 1, 1, 0];
const lambdaMultiplicity = [5, 5, 1, 1, 3, 0];
const qBL = [1, -1, -1, -3, 3, 3];

const dotD = (x, y) => x.reduce((s, xi, i) => s + D[i] * xi * y[i], 0);
const violation = (x) => [
  x[0] + x[1],
  x[0] + x[2],
  x[3] + x[4],
  x[3] + x[5],
];
const sub = (x, a, y) => x.map((xi, i) => xi - a * y[i]);
const close = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

// The free one-loop vacuum-polarisation coefficient of diagonal phase sources
// is proportional to D.  It is positive definite on all six completed sectors.
assert(D.every((x) => x > 0));
assert.equal(D.filter((x) => x === 0).length, 0);

function analyse(lambda, expectedGram, expectedShear, expectedNorm, expectedBreakingWeights) {
  const G = [
    [dotD(lambda, lambda), dotD(lambda, qBL)],
    [dotD(lambda, qBL), dotD(qBL, qBL)],
  ];
  assert.deepEqual(G, expectedGram);
  assert(G[0][0] > 0 && G[0][0] * G[1][1] - G[0][1] ** 2 > 0);

  // Gram-Schmidt in the action-derived metric selects the unique representative
  // of the affine class lambda + c qBL orthogonal to the protected current.
  const shear = G[0][1] / G[1][1];
  assert(close(shear, expectedShear));
  const lambdaPerp = sub(lambda, shear, qBL);
  assert(close(dotD(lambdaPerp, qBL), 0));
  assert(close(dotD(lambdaPerp, lambdaPerp), expectedNorm));

  // Adding the anomaly-free, Yukawa-preserving B-L current changes neither the
  // Yukawa violation class nor the leading divergence spectral polynomial.
  assert.deepEqual(violation(qBL), [0, 0, 0, 0]);
  assert(violation(lambdaPerp).every((x, i) => close(x, violation(lambda)[i])));
  const v = violation(lambda);
  const channelMultiplicity = [3, 3, 1, 1];
  const weights = v.map((x, i) => channelMultiplicity[i] * x * x);
  assert.deepEqual(weights, expectedBreakingWeights);

  // In coordinates (lambda,qBL), the leading absorptive divergence block is
  // diag(kappa,0).  Its unique nonzero generalized eigenvector against G is
  // (1,-shear), exactly lambdaPerp.
  const a = 1;
  const b = -shear;
  assert(close(G[1][0] * a + G[1][1] * b, 0));

  return { G, shear, lambdaPerp, norm: expectedNorm, weights };
}

const deduplicated = analyse(
  lambdaDeduplicated,
  [[231, 9], [9, 48]],
  3 / 16,
  3669 / 16,
  [300, 108, 4, 1],
);
const multiplicity = analyse(
  lambdaMultiplicity,
  [[239, 15], [15, 48]],
  5 / 16,
  3749 / 16,
  [300, 108, 16, 1],
);

// The action-derived metric removes B-L shear but does not choose between the
// two incidence normalisations: their charged-lepton breaking weights differ.
assert.notDeepEqual(deduplicated.weights, multiplicity.weights);

console.log("PASS action-derived two-current block");
console.log("full_sector_metric=diag(6,3,3,2,1,1); sterile_kernel=false");
console.log(`deduplicated_gram=${JSON.stringify(deduplicated.G)}`);
console.log(`deduplicated_BL_shear=${deduplicated.shear}; reduced_norm=${deduplicated.norm}`);
console.log(`multiplicity_gram=${JSON.stringify(multiplicity.G)}`);
console.log(`multiplicity_BL_shear=${multiplicity.shear}; reduced_norm=${multiplicity.norm}`);
console.log("leading_divergence_block=diag(kappa,0)");
console.log("deduplicated_kappa=300|yu|^2+108|yd|^2+4|ye|^2+|ynu|^2");
console.log("multiplicity_kappa=300|yu|^2+108|yd|^2+16|ye|^2+|ynu|^2");
console.log("ALP_quotient_invariant_under_BL_shear=true");

