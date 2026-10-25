import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-order46-one-hamiltonian-toy-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-order46-one-hamiltonian-toy-v1");

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => C(a.re * s, a.im * s);
const abs = (a) => Math.hypot(a.re, a.im);
const div = (a, b) => {
  const norm = b.re ** 2 + b.im ** 2;
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

function eta(tau, tolerance = 1e-14) {
  const q = exp(C(-2 * Math.PI * tau.im, 2 * Math.PI * tau.re));
  const qAbs = abs(q);
  let qPower = q;
  let etaLog = C(-Math.PI * tau.im / 12, Math.PI * tau.re / 12);
  for (let n = 1; n <= 300000; n += 1) {
    etaLog = add(etaLog, log(sub(C(1), qPower)));
    qPower = mul(qPower, q);
    if ((qAbs ** (n + 1)) / (1 - qAbs) < tolerance) return exp(etaLog);
  }
  throw new Error("eta product did not converge");
}

function A(tau) {
  return div(
    mul(eta(tau), eta(scale(tau, 23))),
    mul(eta(scale(tau, 2)), eta(scale(tau, 46))),
  );
}

function jMinus744OnImaginaryAxis(y) {
  const q = Math.exp(-2 * Math.PI * y);
  let e4 = 1;
  for (let n = 1; n < 100000; n += 1) {
    const term = 240 * n ** 3 * q ** n / (1 - q ** n);
    e4 += term;
    if (Math.abs(term) < 1e-16) break;
  }
  const etaValue = eta(C(0, y));
  const delta = powInt(etaValue, 24).re;
  return e4 ** 3 / delta - 744;
}

function monsterRatios(y) {
  const tau = C(0, y);
  const gammaTau = div(add(tau, C(11)), add(scale(tau, 2), C(23)));
  const sTau = C(0, 1 / y);
  const aGamma = A(gammaTau);
  const aS = A(sTau);
  const etaRatio24 = powInt(div(eta(tau), eta(scale(tau, 2))), 24);
  const t46AB = add(C(1), aGamma);
  const t46CD = add(t46AB, div(C(2), aGamma));
  const t23 = div(mul(add(aS, C(1)), add(mul(aS, aS), C(4))), mul(aS, aS));
  const t2B = add(etaRatio24, C(24));
  const t2A = add(t2B, div(C(4096), etaRatio24));
  const j = C(jMinus744OnImaginaryAxis(y));
  return {
    AB: abs(div(mul(t46AB, j), mul(t23, t2B))),
    CD: abs(div(mul(t46CD, j), mul(t23, t2A))),
  };
}

const N = 23;
const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const hPower = (power) => ({ g: mod(12 * power, N), z: mod(power, 2) });
assert.deepEqual(hPower(2), { g: 1, z: 0 });
assert.deepEqual(hPower(23), { g: 0, z: 1 });
assert.deepEqual(hPower(46), { g: 0, z: 0 });

function toyTrace(k, l, beta, lambda) {
  const { J, m } = evidence.hamiltonian;
  let result = C(0);
  for (let a = 0; a < N; a += 1) {
    const theta = 2 * Math.PI * a / N;
    for (const s of [-1, 1]) {
      const energy = -J * Math.cos(theta) - m * s + lambda * s * Math.cos(theta);
      const weight = Math.exp(-beta * energy) * (l === 0 ? 1 : s);
      result = add(result, scale(C(Math.cos(k * theta), Math.sin(k * theta)), weight));
    }
  }
  return result;
}

function toyRatio(beta, lambda) {
  return div(
    mul(toyTrace(1, 1, beta, lambda), toyTrace(0, 0, beta, lambda)),
    mul(toyTrace(1, 0, beta, lambda), toyTrace(0, 1, beta, lambda)),
  );
}

assert.ok(Math.abs(toyRatio(1, 0).re - 1) < 1e-14);
assert.ok(Math.abs(toyRatio(1, evidence.fit.lambda).re - evidence.fit.targetValue) < 1e-14);
for (const [betaKey, beta] of [["beta0.8", 0.8], ["beta1.2", 1.2]]) {
  assert.ok(Math.abs(toyRatio(beta, evidence.fit.lambda).re - evidence.toyHeldOut[betaKey]) < 1e-14);
}

const monster = {
  y0_8: monsterRatios(0.8),
  y1: monsterRatios(1),
  y1_2: monsterRatios(1.2),
};
assert.ok(Math.abs(monster.y1.CD - evidence.fit.targetValue) < 1e-9);
assert.ok(Math.abs(monster.y0_8.AB - evidence.monsterHeldOut["tau0.8i"].magnitude46AB) < 1e-12);
assert.ok(Math.abs(monster.y0_8.CD - evidence.monsterHeldOut["tau0.8i"].magnitude46CD) < 1e-12);
assert.ok(Math.abs(monster.y1_2.AB - evidence.monsterHeldOut["tau1.2i"].magnitude46AB) < 1e-12);
assert.ok(Math.abs(monster.y1_2.CD - evidence.monsterHeldOut["tau1.2i"].magnitude46CD) < 1e-12);

const residual0_8 = Math.abs(Math.abs(toyRatio(0.8, evidence.fit.lambda).re) - monster.y0_8.CD);
const residual1_2 = Math.abs(Math.abs(toyRatio(1.2, evidence.fit.lambda).re) - monster.y1_2.CD);
assert.ok(Math.abs(residual0_8 - evidence.heldOutRejection["absoluteResidual0.8"]) < 1e-12);
assert.ok(Math.abs(residual1_2 - evidence.heldOutRejection["absoluteResidual1.2"]) < 1e-12);
assert.ok(residual0_8 > 0.1 && residual1_2 > 0.1);

console.log(JSON.stringify({
  status: "PASS",
  fittedLambda: evidence.fit.lambda,
  factorizedToyRatio: toyRatio(1, 0).re,
  fittedToyRatio: toyRatio(1, evidence.fit.lambda).re,
  toyHeldOut: {
    beta0_8: toyRatio(0.8, evidence.fit.lambda).re,
    beta1_2: toyRatio(1.2, evidence.fit.lambda).re,
  },
  monsterHeldOut: monster,
  heldOutResiduals: { y0_8: residual0_8, y1_2: residual1_2 },
  onePointEmulatorRejected: true,
}));
