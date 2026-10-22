#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-polarized-electron-observable-v1.json",
  import.meta.url,
), "utf8"));

const close = (actual, expected, rel = 1e-9) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel * scale, `${actual} != ${expected}`);
};

const rho = (x) => (x*x + 2*x + 2)/(x + 1);
const invertRho = (value) => (value + Math.sqrt(value*value - 4))/2 - 1;

for (const witness of evidence.ratioWitnesses) {
  close(rho(witness.x), witness.rho, 1e-12);
  close(invertRho(witness.rho), witness.x, 1e-12);
}

for (const x of [0, 0.01, 0.1, 1, 3, 10, 100]) {
  assert.ok(rho(x) >= 2);
  close(invertRho(rho(x)), x, 1e-10);
}

// Reconstruct the illustrative SI/natural-unit reach point.
const d = evidence.illustrativeDesignPoint;
const hbarcGeVM = 1.973269804e-16;
const gevJ = 1.602176634e-10;
const electronMassGeV = 0.00051099895;
const rGeVInverse = d.separation_m/hbarcGeVM;
const mediatorMassEV = d.x*hbarcGeVM/d.separation_m*1e9;
const nEffective = (d.polarizedElectronsPerBody*d.polarizationFractionPerBody)**2;
const torqueGeV = d.torqueThreshold_N_m/gevJ;
const yReach = Math.sqrt(
  16*Math.PI*electronMassGeV**2*rGeVInverse**3*torqueGeV*Math.exp(d.x) /
  (nEffective*(d.x+1))
);
const fReach = yReach/(2*electronMassGeV);
const sqrtAOverC = 1/fReach;
const mediatorMassGeV = mediatorMassEV*1e-9;
const bOverCSquared = 1/(fReach**2*mediatorMassGeV**2);

close(mediatorMassEV, d.mediatorMass_eV, 1e-12);
close(yReach, d.y_eReach, 1e-9);
close(fReach, d.f_eReach_GeV_inverse, 1e-9);
close(sqrtAOverC, d.sqrtA_over_absCe_GeV, 1e-9);
close(bOverCSquared, d.B_over_CeSquared, 1e-9);

assert.ok(evidence.orientationChannels.nullTests.length >= 4);
assert.ok(evidence.reachFormula.degeneracy.includes("not separately identifiable"));

console.log("Spin(2,3) polarized-electron observable gate: PASS");
console.log(`  coupling-free mass witness: rho(x=1)=${rho(1)} -> x=${invertRho(rho(1))}`);
console.log(`  illustrative m_phi=${mediatorMassEV.toExponential(4)} eV, y_e reach=${yReach.toExponential(4)}`);
console.log(`  inferred sqrt(A)/|c_e|=${sqrtAOverC.toExponential(4)} GeV`);
console.log("  remaining inputs: finite-size spin maps, backgrounds and UV matching");
