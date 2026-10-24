const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const approx = (a, b, tolerance = 1e-12) => Math.abs(a - b) <= tolerance;
const matVec = (A, v) => A.map(row => row.reduce((sum, x, i) => sum + x * v[i], 0));
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const scale = (a, v) => v.map(x => a * x);

// Symmetric unit-rate continuous-time random walk on the D4 star.
// Row convention: dp/dt = p L.
const L = [
  [-3, 1, 1, 1],
  [1, -1, 0, 0],
  [1, 0, -1, 0],
  [1, 0, 0, -1]
];
assert(L.every(row => row.reduce((a, b) => a + b, 0) === 0), 'micro generator rows must sum to zero');

// Block-constant macro contrast and two hidden outer-difference modes.
const macro = [-3, 1, 1, 1];
const hidden1 = [0, 1, -1, 0];
const hidden2 = [0, 1, 0, -1];
assert(JSON.stringify(matVec(L, macro)) === JSON.stringify(scale(-4, macro)), 'macro mode must relax at rate four');
assert(JSON.stringify(matVec(L, hidden1)) === JSON.stringify(scale(-1, hidden1)), 'first hidden mode must relax at rate one');
assert(JSON.stringify(matVec(L, hidden2)) === JSON.stringify(scale(-1, hidden2)), 'second hidden mode must relax at rate one');

// Detector aggregation: retain the center and sum all outer populations.
const aggregate = v => [v[0], v[1] + v[2] + v[3]];
assert(JSON.stringify(aggregate(hidden1)) === JSON.stringify([0, 0]), 'lumped detector must kill first hidden contrast');
assert(JSON.stringify(aggregate(hidden2)) === JSON.stringify([0, 0]), 'lumped detector must kill second hidden contrast');
assert(JSON.stringify(aggregate(macro)) === JSON.stringify([-3, 3]), 'lumped detector must retain macro contrast');

// Conditional expectation of observables onto block-constant functions.
const conditionalExpectation = g => {
  const outerMean = (g[1] + g[2] + g[3]) / 3;
  return [g[0], outerMean, outerMean, outerMean];
};
assert(JSON.stringify(conditionalExpectation(hidden1)) === JSON.stringify([0, 0, 0, 0]), 'conditional expectation must erase hidden score');
assert(JSON.stringify(conditionalExpectation(macro)) === JSON.stringify(macro), 'conditional expectation must preserve macro score');

// Stationary distribution is uniform because the micro generator is symmetric.
const pi = [0.25, 0.25, 0.25, 0.25];
const fisherNorm = g => g.reduce((sum, x, i) => sum + pi[i] * x * x, 0);
assert(approx(fisherNorm(macro), 3), 'macro Fisher norm must be three');
assert(approx(fisherNorm(hidden1), 0.5), 'resolved hidden Fisher norm must be one half');
assert(approx(fisherNorm(conditionalExpectation(hidden1)), 0), 'lumped hidden Fisher norm must vanish');

// Equilibrium autocorrelation and two-sided Lorentzian power spectrum for an
// eigenobservable with relaxation rate lambda.
const variance = fisherNorm;
const correlation = (g, lambda, t) => variance(g) * Math.exp(-lambda * t);
const spectrum = (g, lambda, omega) => 2 * variance(g) * lambda / (lambda * lambda + omega * omega);
assert(approx(correlation(macro, 4, 1), 3 * Math.exp(-4)), 'macro correlation must decay with rate four');
assert(approx(correlation(hidden1, 1, 1), 0.5 * Math.exp(-1)), 'hidden correlation must decay with rate one');
assert(approx(spectrum(macro, 4, 0), 1.5), 'macro zero-frequency spectrum must be 3/2');
assert(approx(spectrum(hidden1, 1, 0), 1), 'hidden zero-frequency spectrum must be one');

// Waiting times expose orbit multiplicity if center and outer blocks can be
// identified: total escape rate from center is three; from an outer state one.
const centerMeanWaitingTime = 1 / 3;
const outerMeanWaitingTime = 1;
assert(outerMeanWaitingTime / centerMeanWaitingTime === 3, 'waiting-time ratio must equal orbit multiplicity');

// A second detector face resolving outer1-outer2 restores one killed mode.
const secondFace = v => v[1] - v[2];
assert(secondFace(hidden1) === 2, 'resolved second face must recover the first hidden contrast');
assert(secondFace(macro) === 0, 'resolved second face must remain orthogonal to macro contrast');

const frequencies = [0, 0.25, 1, 4, 16];
const responseTable = frequencies.map(omega => ({
  omega,
  macroPSD: spectrum(macro, 4, omega),
  hiddenPSDResolved: spectrum(hidden1, 1, omega),
  hiddenPSDLumped: 0
}));

console.log('D4 resolved-versus-lumped detector dynamics certificate: PASS');
console.log('micro_relaxation_rates={macro:4,hidden:1,hidden:1}; lumped_visible_rates={macro:4}');
console.log('waiting_time_ratio_outer_over_center=3; interpretation=three_unresolved_unit_channels');
console.log('hidden_fisher_resolved=0.5; hidden_fisher_lumped=0; second_face_recovers_hidden=true');
console.log('response_table=' + JSON.stringify(responseTable));
