import assert from "node:assert/strict";

const center = 0.27;
const width = 0.16;
const quartet = 0.07;
const epsilon = 0.1;
const n = 200000;

const C = (re, im = 0) => ({ re, im });
const conj = z => C(z.re, -z.im);
const mul = (z, w) => C(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);
const inv = z => {
  const d = z.re * z.re + z.im * z.im;
  return C(z.re / d, -z.im / d);
};
const abs2 = z => z.re * z.re + z.im * z.im;

const P = x => inv(C(x - center, width));
const Q = x => P(-x);
const f0 = x => abs2(P(x)) + abs2(Q(x));
const f1 = x => -4 * quartet * mul(P(x), conj(Q(x))).im;
const score = x => f1(x) / f0(x);

function integrate(fn) {
  const lo = -1;
  const hi = 1;
  const h = (hi - lo) / n;
  let sum = 0.5 * (fn(lo) + fn(hi));
  for (let i = 1; i < n; i += 1) sum += fn(lo + i * h);
  return h * sum;
}

const unweightedOddIntegral = integrate(f1);
const fisherInformation = integrate(x => f1(x) ** 2 / f0(x));
const optimalSignal = integrate(x => score(x) * f1(x));
const optimalVariance = integrate(x => score(x) ** 2 * f0(x));
const signedSignal = integrate(x => Math.sign(x) * f1(x));
const signedVariance = integrate(x => f0(x));
const signedSnrSquared = signedSignal ** 2 / signedVariance;
const optimumSnrSquared = optimalSignal ** 2 / optimalVariance;
const maxDensityRatio = Math.max(...Array.from({ length: 2001 }, (_, i) => Math.abs(score(-1 + i / 1000))));
const minimumAlternativeDensity = Math.min(...Array.from({ length: 2001 }, (_, i) => {
  const x = -1 + i / 1000;
  return f0(x) + epsilon * f1(x);
}));
const oddnessErrors = [0.11, 0.29, 0.63, 0.88].map(x => Math.abs(score(x) + score(-x)));

assert.ok(Math.abs(unweightedOddIntegral) < 1e-10);
assert.ok(Math.max(...oddnessErrors) < 1e-12);
assert.ok(Math.abs(optimalSignal - fisherInformation) < 1e-10);
assert.ok(Math.abs(optimalVariance - fisherInformation) < 1e-10);
assert.ok(optimumSnrSquared + 1e-10 >= signedSnrSquared);
assert.ok(minimumAlternativeDensity > 0);

console.log(JSON.stringify({
  protocol: "optimal-exchange-odd-score/1",
  nullDensity: "f0=|P|^2+|Q|^2",
  localCpKernel: "f1=-4 J Im(PQ*)",
  optimalWeight: "w_opt=f1/f0=d_epsilon log(f0+epsilon f1)|_0",
  unweightedOddIntegral,
  fisherInformation,
  optimalSignal,
  optimalVariance,
  optimumSnrSquared,
  signedSignal,
  signedVariance,
  signedSnrSquared,
  signedEfficiency: signedSnrSquared / optimumSnrSquared,
  maxDensityRatio,
  epsilon,
  minimumAlternativeDensity,
  scoreOddnessErrors: oddnessErrors,
  theorem: "For local alternatives f=f0+epsilon f1, Cauchy-Schwarz bounds (integral w f1)^2/(integral w^2 f0) by integral f1^2/f0, with equality exactly for w proportional to f1/f0.",
  physicalBoundary: "The score is optimal only for the specified accepted null density and complete differential CP kernel; detector response, nuisance parameters and incomplete reconstruction require an efficient-score projection.",
  passed: true
}, null, 2));
