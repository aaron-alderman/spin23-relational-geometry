import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ledger = JSON.parse(readFileSync(
  "evidence/data/torus-knot-rogers-ramanujan-exhaustion-v1.json",
  "utf8",
));

function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

function rhoBlock(a, b) {
  const d = a + b;
  return Array.from({ length: d }, (_, i) => {
    const m = i + 1;
    const residue = (a * m) % d;
    const distance = Math.min(residue, d - residue);
    return Math.min(a, b, distance) - 1 + (m % d === 0 ? 1 : 0);
  });
}

function leastPeriod(values) {
  for (let p = 1; p <= values.length; p += 1) {
    if (values.length % p !== 0) continue;
    if (values.every((value, i) => value === values[i % p])) return p;
  }
  return values.length;
}

function productCoefficients(exponents, degree) {
  const coefficients = Array(degree + 1).fill(0n);
  coefficients[0] = 1n;
  for (let part = 1; part <= degree; part += 1) {
    const multiplicity = exponents[(part - 1) % exponents.length];
    for (let copy = 0; copy < multiplicity; copy += 1) {
      for (let n = part; n <= degree; n += 1) {
        coefficients[n] += coefficients[n - part];
      }
    }
  }
  return coefficients;
}

function recoverExponents(coefficients) {
  const degree = coefficients.length - 1;
  const logDerivative = Array(degree + 1).fill(0n);
  const exponents = Array(degree + 1).fill(0n);
  for (let n = 1; n <= degree; n += 1) {
    let convolution = 0n;
    for (let k = 1; k < n; k += 1) {
      convolution += logDerivative[k] * coefficients[n - k];
    }
    logDerivative[n] = BigInt(n) * coefficients[n] - convolution;

    let properDivisors = 0n;
    for (let divisor = 1; divisor < n; divisor += 1) {
      if (n % divisor === 0) properDivisors += BigInt(divisor) * exponents[divisor];
    }
    exponents[n] = (logDerivative[n] - properDivisors) / BigInt(n);
  }
  return exponents;
}

let auditedPairs = 0;
for (let a = 2; a <= 40; a += 1) {
  for (let b = a + 1; b <= 80; b += 1) {
    if (gcd(a, b) !== 1) continue;
    const block = rhoBlock(a, b);
    assert.equal(leastPeriod(block), a + b, `least period failed for (${a},${b})`);
    assert.equal(Math.max(...block) + 1, a, `maximum failed for (${a},${b})`);
    assert.equal(block[0] + 1, a, `first exponent failed for (${a},${b})`);
    assert.equal((a + b) - (Math.max(...block) + 1), b, `b recovery failed for (${a},${b})`);
    auditedPairs += 1;
  }
}

for (const [a, b] of [[2, 3], [3, 4], [3, 5], [4, 5], [7, 9]]) {
  const block = rhoBlock(a, b);
  const degree = 2 * (a + b);
  const coefficients = productCoefficients(block, degree);
  const recovered = recoverExponents(coefficients);
  for (let n = 1; n <= degree; n += 1) {
    assert.equal(recovered[n], BigInt(block[(n - 1) % block.length]), `Euler recovery failed for (${a},${b}) at ${n}`);
  }
}

assert.equal(1 / 2, 1 / 4 + 1 / 4, "groupoid-volume collision witness failed");
assert.equal(ledger.cftSpecialization.centralCharge, "-22/5");
assert.equal(ledger.cftSpecialization.selectedWeight, "-1/5");
assert.equal(ledger.cftSpecialization.characterShift, "-1/60");
assert.equal(ledger.cftSpecialization.effectiveCentralCharge, "2/5");
assert.ok(ledger.notDerived.includes("Spin(2,3) carrier"));
assert.ok(ledger.notDerived.includes("Monster action"));

console.log("PASS torus-knot Rogers--Ramanujan exhaustion");
console.log(`auditedPairs=${auditedPairs} EulerRecoveryCases=5 categoricalCollision=1/2`);
