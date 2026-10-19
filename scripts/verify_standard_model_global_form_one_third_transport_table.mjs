import assert from "node:assert/strict";

const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const reduceFraction = (numerator, denominator) => {
  const modNumerator = ((numerator % denominator) + denominator) % denominator;
  if (modNumerator === 0) return { numerator: 0, denominator: 1, label: "0" };
  const d = gcd(modNumerator, denominator);
  const n = modNumerator / d;
  const q = denominator / d;
  return { numerator: n, denominator: q, label: String(n) + "/" + String(q) };
};

const cases = [];
for (const n of [1, 2, 3, 6]) {
  const xis = [];
  for (let k = 0; k < 6 / n; k += 1) {
    // xi=n/3 + kn/6 = (2n+kn)/6 mod 1.
    const xi = reduceFraction(2 * n + k * n, 6);
    xis.push({ k, ...xi });
  }
  const unique = [...new Set(xis.map((x) => x.label))].sort();
  const electricOrder = 6 / n;
  cases.push({
    quotient: n === 1 ? "1" : "Z" + String(n),
    n,
    electricOneForm: electricOrder === 1 ? "trivial" : "Z" + String(electricOrder),
    fractionalizationClasses: 6 / n,
    xis,
    uniqueXi: unique,
    hasOneThird: unique.includes("1/3") || unique.includes("2/3"),
    hasElectricZ3: electricOrder === 3
  });
}

const byN = Object.fromEntries(cases.map((row) => [row.n, row]));
assert.deepEqual(byN[1].uniqueXi, ["0", "1/2", "1/3", "1/6", "2/3", "5/6"].sort());
assert.deepEqual(byN[2].uniqueXi, ["0", "1/3", "2/3"].sort());
assert.deepEqual(byN[3].uniqueXi, ["0", "1/2"].sort());
assert.deepEqual(byN[6].uniqueXi, ["0"]);
assert.equal(byN[2].electricOneForm, "Z3");
assert.equal(byN[6].electricOneForm, "trivial");
assert.equal(byN[2].hasOneThird, true);
assert.equal(byN[6].hasOneThird, false);

const simultaneous = cases.filter((row) => row.hasOneThird && row.hasElectricZ3);
assert.deepEqual(simultaneous.map((row) => row.n), [2]);

console.log(JSON.stringify({
  protocol: "standard-model-global-form-one-third-transport/1",
  formula: "xi = n/3 + k*n/6 mod 1, k in Z_(6/n)",
  cases,
  uniqueGlobalFormWithElectricZ3AndOneThirdResponse: "Gamma=Z2",
  maximalZ6: {
    electricOneForm: byN[6].electricOneForm,
    fractionalXi: byN[6].uniqueXi,
    suppliesPrimeThreeTransport: false
  },
  conclusion: "The Standard Model admits an exact one-third mixed B-L/magnetic-one-form response only for selected global forms and fractionalization classes. Gamma=Z2 uniquely combines that response with an electric Z3 one-form symmetry; Gamma=Z6 removes both."
}, null, 2));
