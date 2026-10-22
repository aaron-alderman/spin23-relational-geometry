#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-complete-torsionless-one-loop-flow-v1.json",
  import.meta.url,
), "utf8"));

const q = (text) => {
  const [n,d]=text.split("/").map(Number);
  return {n,d};
};
const add = (a,b) => {
  const n=a.n*b.d+b.n*a.d, d=a.d*b.d;
  const gcd=(x,y)=>y?gcd(y,x%y):Math.abs(x);
  const g=gcd(n,d);
  return {n:n/g,d:d/g};
};
const equal = (a,text) => a.n===q(text).n && a.d===q(text).d;

assert.ok(equal(add(q(evidence.gravityPole.C2ModuloEuler),q(evidence.pseudoscalarPoleModuloEuler.C2)),evidence.totalPoleModuloEuler.C2));
assert.ok(equal(add(q(evidence.gravityPole.R2ModuloEuler),q(evidence.pseudoscalarPoleModuloEuler.R2)),evidence.totalPoleModuloEuler.R2));

// Ricci^2 = (C^2-E4)/2 + R^2/3.
assert.ok(equal({n:q(evidence.gravityPole.RicciSquared).n,d:2*q(evidence.gravityPole.RicciSquared).d},evidence.gravityPole.C2ModuloEuler));
assert.ok(equal(add({n:q(evidence.gravityPole.RicciSquared).n,d:3*q(evidence.gravityPole.RicciSquared).d},q(evidence.gravityPole.R2)),evidence.gravityPole.R2ModuloEuler));

assert.equal(evidence.normalDecision.criticalSurfaceTangent,false);
assert.match(evidence.normalDecision.betaC2,/nonzero positive/);
assert.match(evidence.normalDecision.betaR2,/nonzero positive/);
assert.equal(evidence.derivativeDeterminants.length,2);
assert.equal(Object.keys(evidence.branchVerdicts).length,4);

console.log("Spin(2,3) complete torsionless one-loop flow: PASS");
console.log("  gravity modulo Euler: (C^2,R^2)=(7/40,1/8)");
console.log("  pseudoscalar: (C^2,R^2)=(1/120,1/72)");
console.log("  total: (C^2,R^2)=(11/60,5/36)/(4pi)^2");
console.log("  critical-surface tangency: FAIL (two positive normal components)");
