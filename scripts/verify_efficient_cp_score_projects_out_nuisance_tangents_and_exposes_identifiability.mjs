import assert from "node:assert/strict";

const center = 0.27;
const width = 0.16;
const quartet = 0.07;
const n = 200000;

const absProp2 = (x, a, g) => 1 / ((x - a) ** 2 + g ** 2);
const f0 = x => absProp2(x, center, width) + absProp2(-x, center, width);
const dWidthF0 = x => {
  const leftDen = (x - center) ** 2 + width ** 2;
  const rightDen = (-x - center) ** 2 + width ** 2;
  return -2 * width / leftDen ** 2 - 2 * width / rightDen ** 2;
};

const C = (re, im = 0) => ({ re, im });
const conj = z => C(z.re, -z.im);
const mul = (z, w) => C(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);
const inv = z => {
  const d = z.re ** 2 + z.im ** 2;
  return C(z.re / d, -z.im / d);
};
const P = x => inv(C(x - center, width));
const Q = x => P(-x);
const f1 = x => -4 * quartet * mul(P(x), conj(Q(x))).im;

function integrate(fn) {
  const lo = -1;
  const hi = 1;
  const h = (hi - lo) / n;
  let sum = 0.5 * (fn(lo) + fn(hi));
  for (let i = 1; i < n; i += 1) sum += fn(lo + i * h);
  return h * sum;
}

const scoreCp = x => f1(x) / f0(x);
const scoreNorm = () => 1;
const scoreWidth = x => dWidthF0(x) / f0(x);
const scoreTilt = x => x;
const inner = (a, b) => integrate(x => f0(x) * a(x) * b(x));

const iCpCp = inner(scoreCp, scoreCp);
const iCpNorm = inner(scoreCp, scoreNorm);
const iCpWidth = inner(scoreCp, scoreWidth);
const iCpTilt = inner(scoreCp, scoreTilt);
const iTiltTilt = inner(scoreTilt, scoreTilt);
const tiltProjectionCoefficient = iCpTilt / iTiltTilt;
const efficientScore = x => scoreCp(x) - tiltProjectionCoefficient * scoreTilt(x);
const efficientInformation = inner(efficientScore, efficientScore);
const schurInformation = iCpCp - iCpTilt ** 2 / iTiltTilt;
const residualTiltOverlap = inner(efficientScore, scoreTilt);
const exactDegenerateEfficientInformation = iCpCp - iCpCp ** 2 / iCpCp;

assert.ok(Math.abs(iCpNorm) < 1e-10);
assert.ok(Math.abs(iCpWidth) < 1e-10);
assert.ok(Math.abs(efficientInformation - schurInformation) < 1e-10);
assert.ok(Math.abs(residualTiltOverlap) < 1e-10);
assert.ok(efficientInformation > 0 && efficientInformation < iCpCp);
assert.ok(Math.abs(exactDegenerateEfficientInformation) < 1e-14);

console.log(JSON.stringify({
  protocol: "efficient-cp-score-nuisance-projection/1",
  innerProduct: "<a,b>=integral f0 a b",
  rawCpInformation: iCpCp,
  cpNormalizationOverlap: iCpNorm,
  cpWidthOverlap: iCpWidth,
  cpAcceptanceTiltOverlap: iCpTilt,
  acceptanceTiltInformation: iTiltTilt,
  tiltProjectionCoefficient,
  efficientInformation,
  schurComplementInformation: schurInformation,
  retainedFraction: efficientInformation / iCpCp,
  residualTiltOverlap,
  parityResult: "Even normalization and width nuisances are exactly orthogonal to the odd CP score on symmetric accepted phase space.",
  identifiabilityBoundary: "An unconstrained nuisance tangent identical to the CP score makes the efficient information exactly zero.",
  exactDegenerateEfficientInformation,
  physicalBoundary: "Real detector and theory nuisances must be differentiated through the observed likelihood; parity protection fails when acceptance is not exchange symmetric.",
  passed: true
}, null, 2));
