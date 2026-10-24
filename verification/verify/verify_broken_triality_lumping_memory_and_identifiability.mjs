const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const approx = (a, b, tolerance = 1e-10) => Math.abs(a - b) <= tolerance;

const k = 1;
const delta = [0.2, -0.1, -0.1];
const rates = delta.map(x => k + x);
assert(approx(delta.reduce((a, b) => a + b, 0), 0), 'contrast perturbations must sum to zero');
assert(rates.every(x => x > 0), 'all rates must remain positive');

const survival = t => rates.reduce((sum, rate) => sum + Math.exp(-rate * t), 0) / 3;
const density = t => rates.reduce((sum, rate) => sum + rate * Math.exp(-rate * t), 0) / 3;
const hazard = t => density(t) / survival(t);
const symmetricSurvival = t => Math.exp(-k * t);

assert(approx(hazard(0), k), 'initial unresolved outer hazard must equal the mean rate');
assert(!approx(survival(2), symmetricSurvival(2), 1e-6), 'broken triality must produce a non-exponential waiting law');
assert(hazard(5) < hazard(0), 'mixture hazard must decrease as slow channels dominate survivors');

// The initial hazard derivative is minus the rate variance.
const rateVariance = delta.reduce((sum, x) => sum + x * x, 0) / 3;
const step = 1e-5;
const numericalHazardDerivative = (hazard(step) - hazard(0)) / step;
assert(approx(numericalHazardDerivative, -rateVariance, 1e-5), 'initial memory slope must be minus the contrast variance');

// The unlabeled waiting-time density has zero first derivative with respect
// to either independent contrast at the symmetric point. Use constrained
// coordinates (d1,d2,d3)= (a,b,-a-b).
const unlabeledDensity = (t, a, b) => {
  const localRates = [k + a, k + b, k - a - b];
  return localRates.reduce((sum, rate) => sum + rate * Math.exp(-rate * t), 0) / 3;
};
for (const t of [0.1, 0.5, 1, 2, 5]) {
  const eps = 1e-6;
  const derivativeA = (unlabeledDensity(t, eps, 0) - unlabeledDensity(t, -eps, 0)) / (2 * eps);
  const derivativeB = (unlabeledDensity(t, 0, eps) - unlabeledDensity(t, 0, -eps)) / (2 * eps);
  assert(approx(derivativeA, 0, 1e-8), 'unlabeled first score in contrast a must vanish');
  assert(approx(derivativeB, 0, 1e-8), 'unlabeled first score in contrast b must vanish');
}

// If the outer label is observed, exponential waiting times give a full-rank
// two-parameter Fisher matrix at the symmetric point:
// (1/(3k^2))*[[2,1],[1,2]].
const labelledFisher = [
  [2 / (3 * k * k), 1 / (3 * k * k)],
  [1 / (3 * k * k), 2 / (3 * k * k)]
];
const determinant = labelledFisher[0][0] * labelledFisher[1][1] - labelledFisher[0][1] * labelledFisher[1][0];
assert(determinant > 0, 'resolved labelled Fisher matrix must have rank two');
assert(approx(determinant, 1 / (3 * k ** 4)), 'resolved Fisher determinant must equal 1/(3 k^4)');

// Two independent detector contrasts span the sum-zero outer plane.
const face1 = [1, -1, 0];
const face2 = [1, 1, -2];
const gramDet =
  (face1[0] ** 2 + face1[1] ** 2 + face1[2] ** 2) *
  (face2[0] ** 2 + face2[1] ** 2 + face2[2] ** 2) -
  (face1[0] * face2[0] + face1[1] * face2[1] + face1[2] * face2[2]) ** 2;
assert(gramDet > 0, 'two detector contrast faces must span the hidden plane');

console.log('Broken-triality lumping memory and identifiability certificate: PASS');
console.log('mean_rate_fixed=1; first_visible_unlabeled_invariant=rate_variance=' + rateVariance);
console.log('initial_hazard_derivative=-variance; long_time_hazard_selects_slowest_channel');
console.log('unlabeled_first_order_fisher=0; resolved_labelled_fisher_rank=2');
console.log('minimum_independent_outer_contrast_faces=2');
