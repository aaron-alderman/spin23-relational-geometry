#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-matter-weyl-counterterm-and-copy-anomaly-no-go-v1.json",
  import.meta.url,
), "utf8"));

const fraction = (value) => {
  if (typeof value === "number") return value;
  const [n, d] = value.split("/").map(Number);
  return n/d;
};
const cMatter = (n0, nHalf, n1) => (n0 + 3*nHalf + 12*n1)/120;

assert.equal(cMatter(1, 0, 0), fraction(evidence.weylCoefficients.realScalar));
assert.equal(cMatter(0, 1, 0), fraction(evidence.weylCoefficients.weylFermion));
assert.equal(cMatter(0, 0, 1), fraction(evidence.weylCoefficients.healthyVector));
assert.equal(cMatter(2, 1, 0), fraction(evidence.multiplets.N1Chiral.c));
assert.equal(cMatter(0, 1, 1), fraction(evidence.multiplets.N1Vector.c));
assert.equal(cMatter(0, 0, 1), fraction(evidence.multiplets.copyVectorAlone.c));

for (let n0 = 0; n0 <= 5; n0 += 1) {
  for (let nHalf = 0; nHalf <= 5; nHalf += 1) {
    for (let n1 = 0; n1 <= 5; n1 += 1) {
      const c = cMatter(n0, nHalf, n1);
      assert.ok(c >= 0);
      assert.equal(c === 0, n0 + nHalf + n1 === 0);
    }
  }
}

const r2 = (xi) => 0.5*(1/6 - xi)**2;
assert.ok(Math.abs(r2(0) - fraction(evidence.scalarR2.minimalCoefficient)) < 1e-15);
assert.ok(Math.abs(r2(1/6)) < 1e-15);

const charges = evidence.copyAnomaly.fiveChargeWitness;
const sum = charges.reduce((a, q) => a + q, 0);
const cubic = charges.reduce((a, q) => a + q**3, 0);
assert.equal(sum, evidence.copyAnomaly.witnessLinearSum);
assert.equal(cubic, evidence.copyAnomaly.witnessCubicSum);
assert.equal(charges.some((q) => charges.includes(-q)), false);

// Finite census supports the analytic identities: every anomaly-free set of
// 2-4 nonzero integer charges in this box has an opposite pair.
const range = Array.from({ length: 13 }, (_, i) => i - 6).filter((q) => q !== 0);
for (const n of [2, 3, 4]) {
  const tuple = Array(n).fill(0);
  const visit = (depth) => {
    if (depth === n) {
      if (tuple.reduce((a, q) => a + q, 0) !== 0) return;
      if (tuple.reduce((a, q) => a + q**3, 0) !== 0) return;
      assert.ok(tuple.some((q) => tuple.includes(-q)));
      return;
    }
    for (const q of range) {
      tuple[depth] = q;
      visit(depth + 1);
    }
  };
  visit(0);
}

assert.equal(cMatter(0, 5, 0), fraction(evidence.copyAnomaly.fiveWeylC));
assert.equal(cMatter(1, 5, 0), fraction(evidence.copyAnomaly.withOriginalPseudoscalarC));

console.log("Spin(2,3) matter Weyl-counterterm and copy-anomaly no-go: PASS");
console.log("  healthy matter cone: c=(N0+3 Nhalf+12 N1)/120 > 0 for nonempty content");
console.log("  scalar R^2 can vanish at xi=1/6, but scalar C^2 remains 1/120");
console.log("  minimal genuinely chiral anomaly-free copy U(1): at least five Weyl fermions");
console.log("  witness charges: (-9,-5,-1,7,8), sum q=sum q^3=0");
console.log("  matter-cancellation verdict: impossible with ordinary positive-norm fields");
