import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL(
  "../../evidence/data/monster-order46-connected-ratio-benchmark-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
assert.equal(
  evidence.schemaVersion,
  "monster-order46-connected-ratio-benchmark-v1",
);

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => C(a.re * s, a.im * s);
const abs = (a) => Math.hypot(a.re, a.im);
const div = (a, b) => {
  const norm = b.re * b.re + b.im * b.im;
  return C((a.re * b.re + a.im * b.im) / norm, (a.im * b.re - a.re * b.im) / norm);
};
const exp = (a) => {
  const radius = Math.exp(a.re);
  return C(radius * Math.cos(a.im), radius * Math.sin(a.im));
};
const log = (a) => C(Math.log(abs(a)), Math.atan2(a.im, a.re));
const powInt = (a, exponent) => {
  if (exponent < 0) return div(C(1), powInt(a, -exponent));
  let result = C(1);
  let base = a;
  let power = exponent;
  while (power > 0) {
    if (power & 1) result = mul(result, base);
    base = mul(base, base);
    power >>= 1;
  }
  return result;
};
const complexDistance = (a, b) => abs(sub(a, b));

function etaLog(tau, tolerance) {
  assert.ok(tau.im > 0, "eta requires the upper half-plane");
  const q = exp(C(-2 * Math.PI * tau.im, 2 * Math.PI * tau.re));
  const qAbs = abs(q);
  let qPower = q;
  let result = C(-Math.PI * tau.im / 12, Math.PI * tau.re / 12);
  let terms = 0;
  for (let n = 1; n <= 200000; n += 1) {
    result = add(result, log(sub(C(1), qPower)));
    terms = n;
    qPower = mul(qPower, q);
    if ((qAbs ** (n + 1)) / (1 - qAbs) < tolerance) break;
  }
  assert.ok(terms < 200000, "eta product did not converge");
  return { value: result, terms };
}

function eta(tau, tolerance, counter) {
  const evaluated = etaLog(tau, tolerance);
  counter.count += evaluated.terms;
  counter.maximum = Math.max(counter.maximum, evaluated.terms);
  return exp(evaluated.value);
}

function times(tau, integer) { return scale(tau, integer); }

function A(tau, tolerance, counter) {
  const numerator = mul(eta(tau, tolerance, counter), eta(times(tau, 23), tolerance, counter));
  const denominator = mul(eta(times(tau, 2), tolerance, counter), eta(times(tau, 46), tolerance, counter));
  return div(numerator, denominator);
}

function evaluate(tolerance) {
  const counter = { count: 0, maximum: 0 };
  const tau = C(0, 1);
  const gammaTau = div(add(tau, C(11)), add(scale(tau, 2), C(23)));
  const minusInverseTau = div(C(-1), tau);

  const aGamma = A(gammaTau, tolerance, counter);
  const aS = A(minusInverseTau, tolerance, counter);
  const etaTau = eta(tau, tolerance, counter);
  const eta2Tau = eta(times(tau, 2), tolerance, counter);
  const etaRatio24 = powInt(div(etaTau, eta2Tau), 24);

  const t46AB = add(C(1), aGamma);
  const t46CD = add(t46AB, div(C(2), aGamma));
  const t23 = div(mul(add(aS, C(1)), add(mul(aS, aS), C(4))), mul(aS, aS));
  const t2B = add(etaRatio24, C(24));
  const t2A = add(t2B, div(C(4096), etaRatio24));
  const jAtI = C(evidence.functions.JAtI);

  const ratioAB = div(mul(t46AB, jAtI), mul(t23, t2B));
  const ratioCD = div(mul(t46CD, jAtI), mul(t23, t2A));
  return { gammaTau, aGamma, t46AB, t46CD, t23, t2A, t2B, ratioAB, ratioCD, counter };
}

const primary = evaluate(evidence.numericalMethod.primaryTolerance);
const crossCheck = evaluate(evidence.numericalMethod.crossCheckTolerance);
for (const key of ["t46AB", "t46CD", "t23", "t2A", "t2B", "ratioAB", "ratioCD"]) {
  assert.ok(
    complexDistance(primary[key], crossCheck[key]) < evidence.numericalMethod.requiredAgreement,
    `${key} failed truncation cross-check`,
  );
}

assert.ok(complexDistance(primary.ratioAB, C(1)) > 1e-3, "46AB ratio must reject factorized null");
assert.ok(complexDistance(primary.ratioCD, C(1)) > 1e-3, "46CD ratio must reject factorized null");
assert.ok(complexDistance(primary.ratioAB, primary.ratioCD) > 1e-3, "branches must be distinct");
assert.ok(Math.abs(primary.gammaTau.im - 1 / 533) < 1e-15);

const targets = evidence.frozenTargetsAtI;
const targetChecks = {
  t46AB: targets.T46ABTransported,
  t46CD: targets.T46CDTransported,
  t23: targets.T23Twisted,
  t2B: targets.T2B,
  t2A: targets.T2A,
};
for (const [key, target] of Object.entries(targetChecks)) {
  assert.ok(Math.abs(primary[key].re - target) < targets.absoluteTolerance, `${key} missed frozen target`);
  assert.ok(Math.abs(primary[key].im) < targets.absoluteTolerance, `${key} has unexpected phase`);
}
assert.ok(Math.abs(abs(primary.ratioAB) - targets.magnitudeRatio46AB) < targets.absoluteTolerance);
assert.ok(Math.abs(abs(primary.ratioCD) - targets.magnitudeRatio46CD) < targets.absoluteTolerance);

const relativeError = evidence.errorEnvelope.preregisteredRelativeErrorPerTrace;
const upperFactor = ((1 + relativeError) / (1 - relativeError)) ** 2;
const upperAB = targets.magnitudeRatio46AB * upperFactor;
const upperCD = targets.magnitudeRatio46CD * upperFactor;
assert.ok(Math.abs(upperAB - evidence.errorEnvelope.worstCaseUpperRatio46AB) < 1e-12);
assert.ok(Math.abs(upperCD - evidence.errorEnvelope.worstCaseUpperRatio46CD) < 1e-12);
assert.ok(upperAB < 1 && upperCD < 1);
assert.equal(evidence.errorEnvelope.bothRejectUnitNull, true);

const printable = (z) => ({ re: z.re, im: z.im, abs: abs(z) });
console.log(JSON.stringify({
  status: "PASS",
  tau: "i",
  gammaTau: printable(primary.gammaTau),
  maximumEtaTerms: primary.counter.maximum,
  T46AB: printable(primary.t46AB),
  T46CD: printable(primary.t46CD),
  T23AtI: printable(primary.t23),
  T2BAtI: printable(primary.t2B),
  T2AAtI: printable(primary.t2A),
  connectedRatio46AB: printable(primary.ratioAB),
  connectedRatio46CD: printable(primary.ratioCD),
  factorizedNull: 1,
  relativeErrorAllowedPerTrace: relativeError,
  worstCaseUpperRatios: { "46AB": upperAB, "46CD": upperCD },
}));
