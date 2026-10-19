import assert from "node:assert/strict";

const sectors = ["Q", "u^c", "d^c", "L", "e^c", "nu^c"];
const dimensions = [6, 3, 3, 2, 1, 1];
const incidence = [5, 5, 1, 1, 1, 0];
const incidenceMultiplicity = [5, 5, 1, 1, 3, 0];
const charge3BL = [1, -1, -1, -3, 3, 3];

const dot = (a, b) => a.reduce((s, x, i) => s + dimensions[i] * x * b[i], 0);
const gram = (lambda) => {
  const aa = dot(lambda, lambda);
  const ab = dot(lambda, charge3BL);
  const bb = dot(charge3BL, charge3BL);
  return { matrix: [[aa, ab], [ab, bb]], determinant: aa * bb - ab * ab, correlation: ab / Math.sqrt(aa * bb) };
};

const deduplicated = gram(incidence);
const multiplicityPreserving = gram(incidenceMultiplicity);
assert.deepEqual(deduplicated.matrix, [[231, 9], [9, 48]]);
assert.equal(deduplicated.determinant, 11007);
assert.deepEqual(multiplicityPreserving.matrix, [[239, 15], [15, 48]]);
assert.equal(multiplicityPreserving.determinant, 11247);
assert(deduplicated.determinant > 0 && multiplicityPreserving.determinant > 0);

// Kernel-robust theorem: any nonzero incidence vector with lambda_nu=0 is
// linearly independent from B-L because q_nu=3.  Strict Cauchy-Schwarz then
// makes the weighted Gram determinant positive.
const variants = [
  [1, 1, 1, 1, 1, 0],
  [7, 2, 4, 3, 9, 0],
  [0, 0, 0, 1, 0, 0],
  [5, 5, 1, 1, 1, 0],
];
for (const lambda of variants) assert(gram(lambda).determinant > 0);

console.log(JSON.stringify({
  protocol: "incidence-bl-mixed-current-gram/1",
  sectors,
  dimensions,
  sourceVectors: {
    incidenceDeduplicated: incidence,
    incidenceMultiplicityPreserving: incidenceMultiplicity,
    integer3BL: charge3BL,
  },
  ultravioletFreeCurrentGram: {
    deduplicated,
    multiplicityPreserving,
  },
  robustTheorem: "For any nonzero lambda with lambda_nu^c=0, the weighted Gram of lambda and 3(B-L) is positive definite because 3(B-L)_nu^c=3 makes the vectors nonproportional.",
  physicalTyping: {
    firstSource: "nonconserved incidence-weighted vector insertion J_Lambda^mu",
    secondSource: "anomaly-free conserved B-L current J_BL^mu before Majorana breaking",
    carrierIndex: "source type (incidence versus B-L), not Furey topology A/B",
  },
  conclusion: "The mixed current covariance gives a canonical full-rank real two-source Gram carrier in the sixteen-state UV theory. It is a new relational H_2(R) candidate, but not yet the external topology-face carrier and not protected at all scales because J_Lambda is nonconserved.",
  passed: true,
}, null, 2));
