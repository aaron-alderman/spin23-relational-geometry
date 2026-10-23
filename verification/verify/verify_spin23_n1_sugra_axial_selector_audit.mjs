#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-n1_sugra_axial_selector_audit-v1.json", root,
), "utf8"));

const metric = (AplusAbar, c, f) => Math.exp(c * AplusAbar / f);
const connection = (c, f) => c / f;
for (const c of [-2, -1 / 8, 0, 1 / 8, 3]) {
  const f = 5;
  const x = 0.7;
  const step = 1e-6;
  const numerical = (Math.log(metric(x + step, c, f)) - Math.log(metric(x - step, c, f))) / (2 * step);
  assert.ok(Math.abs(numerical - connection(c, f)) < 1e-9);
}
assert.equal(evidence.linearMultiplet.targetMatch, false);
assert.equal(evidence.chiralMultiplet.targetMatch, true);
assert.equal(evidence.kahlerWitness.shiftInvariant, true);
assert.equal(evidence.kahlerWitness.cContinuous, true);
assert.ok(evidence.spectrumCost.length >= 4);

console.log("Spin(2,3) N=1 supergravity axial selector audit: PASS");
console.log("  linear multiplet misses the longitudinal target");
console.log("  chiral Kähler family permits an arbitrary current coefficient c/f");
