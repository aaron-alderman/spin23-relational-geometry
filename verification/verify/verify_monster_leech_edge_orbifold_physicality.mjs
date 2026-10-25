import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-leech-edge-orbifold-physicality-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-leech-edge-orbifold-physicality-v1");

const choose = (n, k) => {
  if (k < 0 || k > n) return 0n;
  let value = 1n;
  for (let i = 1; i <= Math.min(k, n - k); i += 1) {
    value = value * BigInt(n - i + 1) / BigInt(i);
  }
  return value;
};
const add = (left, right) => {
  const out = new Map(left);
  for (const [power, coefficient] of right) out.set(power, (out.get(power) ?? 0n) + coefficient);
  return out;
};
const scale = (poly, scalar) => new Map([...poly].map(([power, coefficient]) => [power, coefficient * scalar]));
const multiply = (left, right, minPower, maxPower) => {
  const out = new Map();
  for (const [a, ca] of left) {
    for (const [b, cb] of right) {
      const power = a + b;
      if (power < minPower || power > maxPower) continue;
      out.set(power, (out.get(power) ?? 0n) + ca * cb);
    }
  }
  return out;
};
const productFactor = (poly, step, coefficients, minPower, maxPower) => {
  const factor = new Map(coefficients.map((coefficient, k) => [k * step, coefficient]));
  return multiply(poly, factor, minPower, maxPower);
};
const sigma3 = (n) => {
  let sum = 0n;
  for (let divisor = 1; divisor <= n; divisor += 1) if (n % divisor === 0) sum += BigInt(divisor ** 3);
  return sum;
};

const qMax = 4;
let e4 = new Map([[0, 1n]]);
for (let n = 1; n <= qMax + 1; n += 1) e4.set(n, 240n * sigma3(n));
const e4Cubed = multiply(multiply(e4, e4, 0, qMax + 1), e4, 0, qMax + 1);

let deltaProduct = new Map([[0, 1n]]);
for (let n = 1; n <= qMax + 1; n += 1) {
  deltaProduct = productFactor(
    deltaProduct,
    n,
    Array.from({ length: 25 }, (_, k) => (k % 2 ? -1n : 1n) * choose(24, k)),
    0,
    qMax,
  );
}
const delta = new Map([...deltaProduct].map(([power, coefficient]) => [power + 1, coefficient]));
const thetaLeech = add(e4Cubed, scale(delta, -720n));
assert.equal(thetaLeech.get(1) ?? 0n, 0n);
assert.equal(thetaLeech.get(2), 196560n);

let etaInverseProduct = new Map([[0, 1n]]);
for (let n = 1; n <= qMax + 1; n += 1) {
  etaInverseProduct = productFactor(
    etaInverseProduct,
    n,
    Array.from({ length: Math.floor((qMax + 1) / n) + 1 }, (_, k) => choose(23 + k, 23)),
    0,
    qMax + 1,
  );
}
const zLambdaBase = multiply(thetaLeech, etaInverseProduct, 0, qMax + 1);
const zLambda = new Map([...zLambdaBase].map(([power, coefficient]) => [power - 1, coefficient]));

let insertionProduct = new Map([[0, 1n]]);
for (let n = 1; n <= qMax + 1; n += 1) {
  insertionProduct = productFactor(
    insertionProduct,
    n,
    Array.from({ length: Math.floor((qMax + 1) / n) + 1 }, (_, k) => (k % 2 ? -1n : 1n) * choose(23 + k, 23)),
    0,
    qMax + 1,
  );
}
const insertion = new Map([...insertionProduct].map(([power, coefficient]) => [power - 1, coefficient]));

const tMax = 2 * qMax + 2;
let twistedProduct = new Map([[0, 1n]]);
for (let n = 1; n <= tMax; n += 1) {
  twistedProduct = productFactor(
    twistedProduct,
    n,
    Array.from({ length: Math.min(24, Math.floor(tMax / n)) + 1 }, (_, k) => choose(24, k)),
    0,
    tMax,
  );
}
const twistedPlus = new Map([...twistedProduct].map(([power, coefficient]) => [power + 1, 4096n * coefficient]));
const twistedMinus = new Map([...twistedPlus].map(([power, coefficient]) => [power, power % 2 ? -coefficient : coefficient]));
const twistedIntegerQ = new Map();
for (const [tPower, coefficient] of add(twistedPlus, twistedMinus)) {
  if (coefficient === 0n) continue;
  assert.equal(tPower % 2, 0);
  twistedIntegerQ.set(tPower / 2, coefficient);
}

const numerator = add(add(zLambda, insertion), twistedIntegerQ);
const orbifold = new Map([...numerator].map(([power, coefficient]) => {
  assert.equal(coefficient % 2n, 0n);
  return [power, coefficient / 2n];
}));
const expected = evidence.characterCertificate.coefficients;
for (const [powerText, coefficient] of Object.entries(expected)) {
  assert.equal(orbifold.get(Number(powerText)) ?? 0n, BigInt(coefficient));
}

const edge = evidence.leechBulkEdgeDictionary;
assert.equal(edge.rank, edge.chiralCentralCharge);
assert.equal(edge.determinant, edge.anyonGroupOrder);
assert.equal(edge.minimumNorm, 4);
assert.equal(edge.rootCount, 0);
assert.equal(evidence.orbifold.weightOneDimension, 0);
assert.equal(orbifold.get(0), 0n);

console.log(JSON.stringify({
  status: "PASS",
  thetaLeech: Object.fromEntries([...thetaLeech].filter(([power]) => power <= 3).map(([power, value]) => [power, value.toString()])),
  latticeVoaCharacter: Object.fromEntries([...zLambda].filter(([power]) => power <= 3).map(([power, value]) => [power, value.toString()])),
  inversionInsertion: Object.fromEntries([...insertion].filter(([power]) => power <= 3).map(([power, value]) => [power, value.toString()])),
  orbifoldCharacter: Object.fromEntries([...orbifold].filter(([power]) => power <= 3).map(([power, value]) => [power, value.toString()])),
  physicalLevel: evidence.physicsVerdict.level,
}));
