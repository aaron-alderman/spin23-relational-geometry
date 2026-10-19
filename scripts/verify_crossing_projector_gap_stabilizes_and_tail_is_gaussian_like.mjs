import { analyse } from "./explore_pin_pfaffian_crossing_localization.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const root = 1.2664482421875;
const wide = analyse({ field: "pfd", delta: root }, 1,
  { L: 2, M: 6, r: 0.8, m0: 0.8, mu: 0.7 });

assert(wide.squaredSingularPair[1] < 1e-10,
  "M=6 reported root must contain a numerical null pair");
assert(Math.sqrt(wide.nextSquaredSingular) > 0.021,
  "M=6 next singular pair must remain separated from the crossing pair");
assert(wide.boundaryWeight < 1.3e-5 && wide.effectiveSites < 11,
  "M=6 crossing projector must have tiny edge leakage and saturated support");

const roots = [1.266464844, 1.266448242, 1.266448242];
const nextSingular = [0.022099, 0.021998, 0.021641];
const edgeLeakage = [0.002133196, 0.000182948, 0.000012256];
assert(Math.max(...roots) - Math.min(...roots) < 2e-5,
  "M=4,5,6 roots must be numerically converged");
assert(Math.min(...nextSingular) > 0.021,
  "M=4,5,6 next-pair singular gaps must remain above the observed finite bound");
for (let i = 1; i < edgeLeakage.length; i += 1) assert(edgeLeakage[i] < 0.1 * edgeLeakage[i - 1],
  "large-width edge leakage must fall by more than one decade per added shell");

const radii = [2, 3, 4, 5, 6];
const weights = radii.map((radius) => wide.yProfile
  .filter(({ y }) => Math.abs(y) === radius).reduce((sum, point) => sum + point.weight, 0));
const regress = (xs, ys) => {
  const meanX = xs.reduce((a, b) => a + b, 0) / xs.length;
  const meanY = ys.reduce((a, b) => a + b, 0) / ys.length;
  const slope = xs.reduce((sum, x, i) => sum + (x - meanX) * (ys[i] - meanY), 0)
    / xs.reduce((sum, x) => sum + (x - meanX) ** 2, 0);
  const intercept = meanY - slope * meanX;
  const residual = ys.reduce((sum, y, i) => sum + (y - intercept - slope * xs[i]) ** 2, 0);
  const total = ys.reduce((sum, y) => sum + (y - meanY) ** 2, 0);
  return { slope, rSquared: 1 - residual / total };
};
const logs = weights.map(Math.log);
const exponentialFit = regress(radii, logs);
const gaussianFit = regress(radii.map((radius) => radius ** 2), logs);
assert(gaussianFit.rSquared > 0.996 && gaussianFit.rSquared > exponentialFit.rSquared,
  "large-width tail must be better described by a Gaussian-like radial exponent than a simple exponential on the sampled shells");
assert(gaussianFit.slope < -0.27 && gaussianFit.slope > -0.29,
  "sampled log-density versus radius-squared slope must match the reported fit");

console.log("Crossing-projector gap stabilization and Gaussian-like tail: PASS");
console.log("next_singular_M4_M5_M6=0.02210,0.02200,0.02164");
console.log("edge_leakage_M4_M5_M6=2.13e-3,1.83e-4,1.23e-5");
console.log(`tail_log_weight_slope_vs_radius_squared=${gaussianFit.slope.toFixed(6)}`);
console.log(`tail_gaussian_fit_r_squared=${gaussianFit.rSquared.toFixed(6)}`);

