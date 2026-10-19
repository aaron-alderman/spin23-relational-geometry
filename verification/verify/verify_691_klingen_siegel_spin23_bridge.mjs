import assert from "node:assert/strict";

const N = 16;
const zero = () => Array(N + 1).fill(0n);

const add = (a, b) => a.map((value, index) => value + b[index]);
const scale = (a, scalar) => a.map((value) => value * BigInt(scalar));

function multiply(a, b) {
  const out = zero();
  for (let i = 0; i <= N; i += 1) {
    for (let j = 0; j + i <= N; j += 1) out[i + j] += a[i] * b[j];
  }
  return out;
}

function power(base, exponent) {
  let out = zero();
  out[0] = 1n;
  for (let i = 0; i < exponent; i += 1) out = multiply(out, base);
  return out;
}

function sigma(n, exponent) {
  let sum = 0n;
  for (let divisor = 1; divisor <= n; divisor += 1) {
    if (n % divisor === 0) sum += BigInt(divisor) ** BigInt(exponent);
  }
  return sum;
}

function eisenstein(coefficient, exponent) {
  const out = zero();
  out[0] = 1n;
  for (let n = 1; n <= N; n += 1) out[n] = BigInt(coefficient) * sigma(n, exponent);
  return out;
}

function deltaSeries() {
  let product = zero();
  product[0] = 1n;
  for (let n = 1; n <= N; n += 1) {
    const factor = zero();
    for (let j = 0; j <= 24 && j * n <= N; j += 1) {
      let binomial = 1n;
      for (let k = 1; k <= j; k += 1) binomial = binomial * BigInt(25 - k) / BigInt(k);
      factor[j * n] = (j % 2 === 0 ? 1n : -1n) * binomial;
    }
    product = multiply(product, factor);
  }
  const delta = zero();
  for (let n = 1; n <= N; n += 1) delta[n] = product[n - 1];
  return delta;
}

function isPrime(n) {
  for (let divisor = 2; divisor * divisor <= n; divisor += 1) if (n % divisor === 0) return false;
  return n > 1;
}

const E4 = eisenstein(240, 3);
const E6 = eisenstein(-504, 5);
const delta = deltaSeries();
const E4cubed = power(E4, 3);
const E6squared = power(E6, 2);

assert.equal(isPrime(691), true);
assert.equal(441 + 250, 691);
assert.equal(691, 30 * 23 + 1);
assert.deepEqual(add(E4cubed, scale(E6squared, -1)), scale(delta, 1728));

const scaledE12 = zero();
scaledE12[0] = 691n;
for (let n = 1; n <= N; n += 1) scaledE12[n] = 65520n * sigma(n, 11);
assert.deepEqual(add(scale(E4cubed, 441), scale(E6squared, 250)), scaledE12);

const leech = add(E4cubed, scale(delta, -720));
for (let n = 1; n <= N; n += 1) {
  const difference = sigma(n, 11) - delta[n];
  assert.equal(difference % 691n, 0n);
  assert.equal(leech[n], 65520n * (difference / 691n));
}
assert.deepEqual(leech.slice(0, 5), [1n, 0n, 196560n, 16773120n, 398034000n]);

let factorial60 = 1n;
for (let n = 2n; n <= 60n; n += 1n) factorial60 = (factorial60 * n) % 691n;
assert.equal(factorial60, 573n);
assert.equal((573n * 41n) % 691n, 690n);

console.log(JSON.stringify({
  passed: true,
  checkedThroughQPower: N,
  structural: [
    "B12 numerator is -691",
    "691 E12 = 441 E4^3 + 250 E6^2",
    "E4^3 - E6^2 = 1728 Delta",
    "tau(n) = sigma_11(n) mod 691",
    "Leech theta = E12 - (65520/691) Delta",
  ],
  contextualOnly: ["691 = 30*23 + 1", "60! mod 691 = 573", "573*41 = -1 mod 691"],
}, null, 2));

