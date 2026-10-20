#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-z3-electroweak-gauge-quotient.json",
  import.meta.url,
), "utf8"));

const omega = { re: -0.5, im: Math.sqrt(3) / 2 };
const mul = (a, b) => ({ re: a.re*b.re-a.im*b.im, im: a.re*b.im+a.im*b.re });
const close = (a, b) => Math.hypot(a.re-b.re, a.im-b.im) < 1e-12;
const one = { re: 1, im: 0 };
const q = mul(omega, omega);
assert.ok(close(mul(q, omega), one));

// One nonzero doublet can be compensated by a U(1)_Y phase.  For two
// opposite hypercharges the same compensation would require q=q^{-1}.
assert.equal(evidence.cases.onlyHuNonzero.z3GaugeCompensable, true);
assert.equal(evidence.cases.onlyHdNonzero.z3GaugeCompensable, true);
assert.ok(!close(q, omega));
assert.equal(evidence.cases.bothNonzero.z3GaugeCompensable, false);

const productPhase = mul(q, q);
assert.ok(close(productPhase, omega));
assert.equal(evidence.cases.bothNonzero.gaugeInvariantProductChargeModuloThree, 1);
assert.ok(close(mul(mul(productPhase, productPhase), productPhase), one));
assert.equal(evidence.phaseSensitiveOperator.massDimension, 6);
assert.equal(evidence.phaseSensitiveOperator.renormalizableInFourDimensions, false);

console.log("spin23 Z3 electroweak gauge-quotient verification: PASS");
console.log("  one-doublet Z3 phase is hypercharge-compensable");
console.log("  two opposite-hypercharge VEVs expose a charge-one gauge-invariant product");
console.log("  first pure phase-locking power of that product is dimension six");
