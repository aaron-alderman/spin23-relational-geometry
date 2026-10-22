#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-order-reduced-eft-window-v1.json",
  import.meta.url,
), "utf8"));

const fraction=(text)=>{const [n,d]=text.split("/").map(Number);return n/d;};
const bC=fraction(evidence.oneLoopMagnitudes.bC);
const bR=fraction(evidence.oneLoopMagnitudes.bR);
for(const sample of evidence.samples){
  const cC=bC*sample.absLog/(4*Math.PI)**2;
  const cR=bR*sample.absLog/(4*Math.PI)**2;
  assert.ok(Math.abs(cC-sample.cC)<1e-15);
  assert.ok(Math.abs(cR-sample.cR)<1e-15);
  assert.ok(Math.abs(1/Math.sqrt(cC)-sample.lambdaCOverMpl)<1e-12);
  assert.ok(Math.abs(1/Math.sqrt(cR)-sample.lambdaROverMpl)<1e-12);
  assert.ok(sample.lambdaCOverMpl>1);
  assert.ok(sample.lambdaROverMpl>1);
}
assert.equal(evidence.powerCounting.length,4);
assert.equal(evidence.orderReduction.length,4);
assert.match(evidence.diagnosticWarning,/not a claimed physical pole/);
assert.match(evidence.decision,/order-reduced EFT/);

console.log("Spin(2,3) order-reduced EFT window: PASS");
console.log(`  one-log coefficients: c_C=${evidence.samples[0].cC.toExponential(6)}, c_R=${evidence.samples[0].cR.toExponential(6)}`);
console.log(`  diagnostic scales: Lambda_C=${evidence.samples[0].lambdaCOverMpl.toFixed(2)} M_Pl, Lambda_R=${evidence.samples[0].lambdaROverMpl.toFixed(2)} M_Pl`);
console.log("  conservative E<=M_Pl domain remains perturbative");
console.log("  interpretation: order-reduced EFT, not a resummed fundamental spectrum");
