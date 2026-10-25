import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transformer-capacitance-recovery-v1.json", import.meta.url),
  "utf8"
));
const K = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url),
  "utf8"
)).K.map((row) => row.map(BigInt));

assert.equal(record.schemaVersion, "leech-transformer-capacitance-recovery-v1");
const gcd = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
};
const rational = (numerator, denominator = 1n) => {
  assert.notEqual(denominator, 0n);
  if (denominator < 0n) { numerator = -numerator; denominator = -denominator; }
  const divisor = gcd(numerator, denominator);
  return {numerator: numerator / divisor, denominator: denominator / divisor};
};
const subtract = (a, b) => rational(
  a.numerator * b.denominator - b.numerator * a.denominator,
  a.denominator * b.denominator
);
const multiply = (a, b) => rational(a.numerator * b.numerator, a.denominator * b.denominator);
const divide = (a, b) => rational(a.numerator * b.denominator, a.denominator * b.numerator);
const equal = (a, b) => a.numerator === b.numerator && a.denominator === b.denominator;
const parse = (value) => {
  const [numerator, denominator = "1"] = value.split("/");
  return rational(BigInt(numerator), BigInt(denominator));
};

const n = K.length;
const L = Array.from({length: n}, (_, i) => Array.from(
  {length: n}, (_, j) => rational(i === j ? 1n : 0n)
));
const D = [];
for (let j = 0; j < n; j += 1) {
  let diagonal = rational(K[j][j]);
  for (let k = 0; k < j; k += 1) {
    diagonal = subtract(diagonal, multiply(multiply(L[j][k], L[j][k]), D[k]));
  }
  D[j] = diagonal;
  assert.ok(diagonal.numerator > 0n);
  for (let i = j + 1; i < n; i += 1) {
    let value = rational(K[i][j]);
    for (let k = 0; k < j; k += 1) {
      value = subtract(value, multiply(multiply(L[i][k], L[j][k]), D[k]));
    }
    L[i][j] = divide(value, D[j]);
  }
}
assert.deepEqual(D, record.factorization.diagonalCapacitances.map(parse));

let nonzero = 0;
let maximumAbsolute = rational(0n);
let maximumNumeratorMagnitude = 0n;
let maximumDenominator = 0n;
const distinct = new Set();
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < i; j += 1) {
    const value = L[i][j];
    if (value.numerator === 0n) continue;
    nonzero += 1;
    distinct.add(`${value.numerator}/${value.denominator}`);
    const absoluteNumerator = value.numerator < 0n ? -value.numerator : value.numerator;
    if (absoluteNumerator * maximumAbsolute.denominator
      > maximumAbsolute.numerator * value.denominator) {
      maximumAbsolute = rational(absoluteNumerator, value.denominator);
    }
    if (absoluteNumerator > maximumNumeratorMagnitude) maximumNumeratorMagnitude = absoluteNumerator;
    if (value.denominator > maximumDenominator) maximumDenominator = value.denominator;
  }
}
assert.equal(nonzero, record.factorization.strictLowerTriangleNonzeroRatios);
assert.equal(n * (n - 1) / 2, record.factorization.strictLowerTriangleAvailableEntries);
assert.equal(distinct.size, record.factorization.distinctSignedRatioValues);
assert.ok(equal(maximumAbsolute, parse(record.factorization.maximumAbsoluteOffDiagonalRatio)));
assert.equal(maximumNumeratorMagnitude, BigInt(record.factorization.maximumRatioNumeratorMagnitude));
assert.equal(maximumDenominator, BigInt(record.factorization.maximumRatioDenominator));

// Reconstruct each entry of K exactly from L D L^T.
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n; j += 1) {
    let reconstructed = rational(0n);
    for (let k = 0; k < n; k += 1) {
      const term = multiply(multiply(L[i][k], D[k]), L[j][k]);
      reconstructed = subtract(reconstructed, rational(-term.numerator, term.denominator));
    }
    assert.ok(equal(reconstructed, rational(K[i][j])));
  }
}

const dValues = D.map((value) => Number(value.numerator) / Number(value.denominator));
const dynamicRange = Math.max(...dValues) / Math.min(...dValues);
assert.equal(dynamicRange, record.factorization.diagonalDynamicRange);
assert.ok(record.boundary.includes("not a fabricated circuit"));

console.log(JSON.stringify({
  status: "PASS",
  identity: record.factorization.identity,
  positiveDiagonalCapacitances: D.length,
  diagonalDynamicRange: dynamicRange,
  nonzeroTransformerRatios: nonzero,
  maximumAbsoluteRatio: record.factorization.maximumAbsoluteOffDiagonalRatio,
  result: record.established,
  boundary: record.boundary
}));
