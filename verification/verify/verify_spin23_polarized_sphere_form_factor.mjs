#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-polarized-sphere-form-factor-v1.json",
  import.meta.url,
), "utf8"));

const close = (actual, expected, rel = 1e-11) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel*scale, `${actual} != ${expected}`);
};

const F = (z) => {
  if (Math.abs(z) < 1e-4) return 1 + z*z/10 + z**4/280 + z**6/15120;
  return 3*(z*Math.cosh(z)-Math.sinh(z))/z**3;
};

for (const witness of evidence.witnesses) close(F(witness.z), witness.F);

// Direct radial quadrature of the normalized one-sphere Yukawa source factor:
// F(z)=3/z^3 integral_0^z u^2 sinh(u)/u du.
const simpson = (fn, a, b, n = 20000) => {
  assert.equal(n % 2, 0);
  const h = (b-a)/n;
  let sum = fn(a) + fn(b);
  for (let i=1; i<n; i++) sum += (i % 2 ? 4 : 2)*fn(a+i*h);
  return sum*h/3;
};
for (const z of [0.2, 0.4, 1, 2.5]) {
  const integral = simpson((u) => u*Math.sinh(u), 0, z);
  close(3*integral/z**3, F(z), 2e-11);
}

const g = evidence.illustrativeGeometry;
assert.ok(g.centreSeparation_m > g.radius1_m + g.radius2_m);
close(g.nonOverlapMargin_m, g.centreSeparation_m-g.radius1_m-g.radius2_m);
const enhancement = F(g.z1)*F(g.z2);
close(enhancement, g.torqueEnhancementOverPointCounts);
close(Math.sqrt(enhancement), g.couplingReachImprovement);

// Both channels have the same form factor, leaving the ratio invariant.
const x = g.x;
const common = enhancement*Math.exp(-x)/(4*Math.PI*g.centreSeparation_m**3);
const transverse = -common*(x+1);
const radial = common*(x*x+2*x+2);
const ratio = -radial/transverse;
close(ratio, x+1+1/(x+1));

console.log("Spin(2,3) polarized-sphere finite-size gate: PASS");
console.log(`  F(0.2)^2=${enhancement.toFixed(9)}; point-count torque enhancement=${((enhancement-1)*100).toFixed(4)}%`);
console.log(`  radial/transverse ratio remains ${ratio.toFixed(6)} at x=${x}`);
console.log("  exact domain: uniform, non-overlapping polarized spheres");
