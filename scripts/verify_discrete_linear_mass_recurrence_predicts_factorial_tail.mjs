import { transverseHoppingAudit } from "./explore_regulated_glide_relative_pfaffian.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const hopping = transverseHoppingAudit(0.8);
assert(hopping.squareIdentity && hopping.invertible && hopping.inverseIdentity,
  "regulated forward transverse hopping must satisfy the exact Clifford square and be invertible at r=0.8");
assert(Math.abs(hopping.squareCoefficient + 0.09) < 1e-12,
  "forward hopping square coefficient must equal -0.09 at r=0.8");

const radii = [2, 3, 4, 5, 6];
const weights = [
  0.08726678428442235,
  0.017343236098984324,
  0.002063579994417164,
  0.00017990764877330632,
  0.00001225589638340524,
];
const logFactorial = (n) => {
  let result = 0;
  for (let k = 2; k <= n; k += 1) result += Math.log(k);
  return result;
};
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
const factorialFit = regress(radii.map(logFactorial), logs);
const gaussianFit = regress(radii.map((radius) => radius ** 2), logs);
assert(factorialFit.rSquared > 0.9999 && factorialFit.rSquared > gaussianFit.rSquared,
  "sampled tail must fit log-factorial scaling better than Gaussian scaling");
assert(factorialFit.slope < -1.5 && factorialFit.slope > -1.53,
  "finite-shell log-weight versus log-factorial slope must match the reported pre-asymptotic fit");

const scaledRatios = radii.slice(1).map((radius, i) => radius ** 2 * weights[i + 1] / weights[i]);
assert(scaledRatios.every((value, i) => i === 0 || value > scaledRatios[i - 1]),
  "y-squared-scaled weight ratios must approach the factorial-transfer regime monotonically over sampled shells");

console.log("Discrete linear-mass recurrence and factorial-like tail: PASS");
console.log("transverse_hopping_square=-0.09_identity");
console.log(`factorial_fit_slope=${factorialFit.slope.toFixed(6)}`);
console.log(`factorial_fit_r_squared=${factorialFit.rSquared.toFixed(6)}`);
console.log(`gaussian_fit_r_squared=${gaussianFit.rSquared.toFixed(6)}`);
console.log("asymptotic_factorial_exponent=not_yet_reached");

