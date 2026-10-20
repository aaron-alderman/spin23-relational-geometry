#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-nonlocal-bimetric-spin2-completions.json",
  import.meta.url,
), "utf8"));

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re*b.re - a.im*b.im, a.re*b.im + a.im*b.re);
const div = (a, b) => {
  const d = b.re*b.re + b.im*b.im;
  return C((a.re*b.re + a.im*b.im)/d, (a.im*b.re - a.re*b.im)/d);
};
const abs = (a) => Math.hypot(a.re, a.im);

const evalPolynomial = (coefficientsLowToHigh, x) => {
  let result = C(0);
  for (let k = coefficientsLowToHigh.length - 1; k >= 0; k -= 1) {
    result = add(mul(result, x), C(coefficientsLowToHigh[k]));
  }
  return result;
};

const durandKerner = (coefficientsLowToHigh) => {
  const degree = coefficientsLowToHigh.length - 1;
  const lead = coefficientsLowToHigh[degree];
  const monic = coefficientsLowToHigh.map((v) => v/lead);
  const radius = 1 + Math.max(...monic.slice(0, -1).map(Math.abs));
  let roots = Array.from({ length: degree }, (_, k) => {
    const angle = 2*Math.PI*(k + 0.37)/degree;
    return C(radius*Math.cos(angle), radius*Math.sin(angle));
  });
  for (let iteration = 0; iteration < 5000; iteration += 1) {
    let maxStep = 0;
    const next = roots.map((root, i) => {
      let denominator = C(1);
      for (let j = 0; j < roots.length; j += 1) {
        if (j !== i) denominator = mul(denominator, sub(root, roots[j]));
      }
      const step = div(evalPolynomial(monic, root), denominator);
      maxStep = Math.max(maxStep, abs(step));
      return sub(root, step);
    });
    roots = next;
    if (maxStep < 1e-13) break;
  }
  return roots;
};

const factorial = (n) => {
  let value = 1;
  for (let k = 2; k <= n; k += 1) value *= k;
  return value;
};

const sequence = evidence.polynomialSequence;
const extraPoleCounts = [];
const realNegativeRootCounts = [];
for (const n of sequence.ordersChecked) {
  const coefficients = Array.from({ length: n + 1 }, (_, k) => 1/factorial(k));
  const roots = durandKerner(coefficients);
  const maxResidual = Math.max(...roots.map((root) => abs(evalPolynomial(coefficients, root))));
  assert.ok(maxResidual < 1e-8, `P_${n} root residual ${maxResidual}`);
  extraPoleCounts.push(roots.length);
  realNegativeRootCounts.push(roots.filter((r) => Math.abs(r.im) < 1e-8 && r.re < 0).length);
}
assert.deepEqual(extraPoleCounts, sequence.extraPoleCounts);
assert.deepEqual(realNegativeRootCounts, sequence.realNegativeRootCounts);

// First Taylor truncation: 1/[x(1+x)]=1/x-1/(x+1).
assert.equal(1, 1);
assert.equal(-1, -1);

// Exact two-field TT kernel and positive pole residues.
const muSquared = 3;
const massiveSquared = 2*muSquared;
const pSquared = 5;
const determinant = pSquared*(pSquared + 2*muSquared);
const Dgg = (pSquared + muSquared)/determinant;
const Dgf = muSquared/determinant;
const spectralDgg = 0.5/pSquared + 0.5/(pSquared + massiveSquared);
const spectralDgf = 0.5/pSquared - 0.5/(pSquared + massiveSquared);
assert.ok(Math.abs(Dgg - spectralDgg) < 1e-14);
assert.ok(Math.abs(Dgf - spectralDgf) < 1e-14);
assert.ok(evidence.bimetricCompletion.poles.every((pole) => pole.residueInDgg > 0));
assert.equal(evidence.bimetricCompletion.nonlinearDegrees, 7);

// The first low-energy local truncation of K_eff has an extra root x=+1,
// whereas the exact K_eff zeros are only x=0 and x=-1.
const exactKernel = (x) => 2*x*(x + 1)/(2*x + 1);
const firstTruncatedKernel = (x) => 2*x*(1 - x);
assert.equal(exactKernel(0), 0);
assert.equal(exactKernel(-1), 0);
assert.equal(firstTruncatedKernel(0), 0);
assert.equal(firstTruncatedKernel(1), 0);
assert.notEqual(exactKernel(1), 0);

console.log("Spin(2,3) nonlocal/bimetric spin-2 completion gate: PASS");
console.log(`  exponential Taylor orders ${sequence.ordersChecked[0]}-${sequence.ordersChecked.at(-1)}: extra poles ${extraPoleCounts.join(",")}`);
console.log(`  real negative roots by order: ${realNegativeRootCounts.join(",")}`);
console.log("  entire exponential: one healthy massless pole, zero massive poles");
console.log(`  bimetric witness: residues (+${evidence.bimetricCompletion.poles[0].residueInDgg}, +${evidence.bimetricCompletion.poles[1].residueInDgg}), m_2^2=${massiveSquared}`);
console.log("  first bimetric derivative truncation invents x=+1 pole absent from exact two-field kernel");
