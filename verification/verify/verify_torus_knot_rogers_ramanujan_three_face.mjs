import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const evidencePath = path.join(root, "evidence", "data", "torus-knot-rogers-ramanujan-three-face-v1.json");
const claimPath = path.join(root, "corpus", "claims", "1700-1799", "1796_the_torus_knot_rogers_ramanujan_theorem_is_a_typed_three_face_arithmetic_programme_not_yet_a_physics_bridge.md");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const claim = fs.readFileSync(claimPath, "utf8");

assert.equal(evidence.schema, "torus-knot-rogers-ramanujan-three-face/v1");
assert.equal(evidence.faces.length, 3);
assert.equal(evidence.provedEquality.length, 3);
assert.equal(evidence.researchGates.length, 6);
assert(evidence.notDerived.length >= 7);

const { a, b, d, gaps, rhoPeriod, productResiduesModuloD, coefficientCheckThrough, finiteRankTwoPolynomial } = evidence.classicalSpecialization;
assert.deepEqual([a, b, d], [2, 3, 5]);
assert.deepEqual(gaps, [1]);
assert.deepEqual(productResiduesModuloD, [1, 4]);
assert.deepEqual(finiteRankTwoPolynomial, [1, 1, 1, 0, 1]);

const distanceToLattice = (x, modulus) => {
  const residue = ((x % modulus) + modulus) % modulus;
  return Math.min(residue, modulus - residue);
};
const rho = m => Math.min(a, b, distanceToLattice(a * m, d)) - 1 + (m % d === 0 ? 1 : 0);
assert.deepEqual(Array.from({ length: d }, (_, index) => rho(index + 1)), rhoPeriod);
assert.deepEqual(Array.from({ length: d }, (_, index) => index + 1).filter(m => rho(m) === 1), productResiduesModuloD);

const multiplyByInverseFactor = (coefficients, power) => {
  for (let degree = power; degree < coefficients.length; degree += 1) coefficients[degree] += coefficients[degree - power];
};

const productCoefficients = limit => {
  const coefficients = Array(limit + 1).fill(0n);
  coefficients[0] = 1n;
  for (let part = 1; part <= limit; part += 1) {
    if (![1, 4].includes(part % 5)) continue;
    multiplyByInverseFactor(coefficients, part);
  }
  return coefficients;
};

const sumCoefficients = limit => {
  const total = Array(limit + 1).fill(0n);
  for (let n = 0; n * n <= limit; n += 1) {
    const denominator = Array(limit - n * n + 1).fill(0n);
    denominator[0] = 1n;
    for (let part = 1; part <= n; part += 1) multiplyByInverseFactor(denominator, part);
    for (let degree = 0; degree < denominator.length; degree += 1) total[degree + n * n] += denominator[degree];
  }
  return total;
};

const sum = sumCoefficients(coefficientCheckThrough);
const product = productCoefficients(coefficientCheckThrough);
assert.deepEqual(sum, product);

assert(claim.includes("one typed source object"));
assert(claim.includes("finite-field/groupoid count"));
assert(/not the\s+corpus's three-strand braid group/i.test(claim));
assert(/not automatically a\s+thermodynamic partition function/i.test(claim));

console.log("PASS torus-knot Rogers–Ramanujan three-face admission");
console.log(`checked=(2,3) degrees=0..${coefficientCheckThrough} rho=${rhoPeriod.join("")}`);
