#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const gate = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsion-fingerprint-parameter-closure-v1.json",
  import.meta.url,
), "utf8"));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const close = (actual, expected, rel = 1e-12) => {
  const scale = Math.max(Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= rel*scale, `${actual} != ${expected}`);
};

for (const ref of gate.sourceClaims) {
  const bytes = await readFile(new URL("../../" + ref.path, import.meta.url));
  assert.equal(sha256(bytes), ref.sha256);
}

const hbarCElectronVoltMetres = 1.973269804e-7;
const targetMass = hbarCElectronVoltMetres/gate.sevenMillimetreTarget.rangeMetres;
close(targetMass, gate.sevenMillimetreTarget.poleMassElectronVolts);
const planckMassElectronVolts = gate.naturalBenchmark.reducedPlanckMassGeV*1e9;
const hierarchy = planckMassElectronVolts/targetMass;
close(hierarchy, gate.sevenMillimetreTarget.naturalMassToTargetMass);
close(hierarchy*hierarchy, gate.sevenMillimetreTarget.requiredBOverARelativeToNatural);
close(planckMassElectronVolts*gate.sevenMillimetreTarget.rangeMetres/hbarCElectronVoltMetres,
  gate.sevenMillimetreTarget.naturalExponentAtTargetRange);

assert.ok(gate.sevenMillimetreTarget.naturalExponentAtTargetRange > 1e31);
assert.ok(gate.sevenMillimetreTarget.requiredBOverARelativeToNatural > 1e63);
assert.equal(gate.candidateRoutes.filter(route => route.distinctive === true).length, 1);
assert.equal(gate.candidateRoutes.find(route => route.distinctive === true).status, "missing");
assert.equal(gate.closureDecision.currentSpin23Fingerprint, false);
assert.equal(gate.closureDecision.naturalBenchmarkExperimentallyAccessible, false);
assert.ok(Object.values(gate.authority).every(value => value === false));

console.log("Spin(2,3) torsion fingerprint parameter closure: PASS");
console.log(`  7 mm pole mass: ${targetMass.toExponential(6)} eV`);
console.log(`  natural-to-target mass hierarchy: ${hierarchy.toExponential(6)}`);
console.log(`  required relative B/A hierarchy: ${(hierarchy*hierarchy).toExponential(6)}`);
console.log("  decision: accessible EFT test yes; present Spin(2,3)-specific fingerprint no");
