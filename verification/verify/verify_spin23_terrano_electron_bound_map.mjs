#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-terrano-electron-bound-map-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, rel = 1e-11) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= rel*scale, `${actual} != ${expected}`);
};

const electronMassGeV = 0.00051099895;
const reducedPlanckMassGeV = 2.435e18;
const published = evidence.source.publishedDipoleLimit_gpSquared_over_hbarc;
const yUpper = Math.sqrt(published);
const fUpper = yUpper/(2*electronMassGeV);
const sqrtAOverC = 1/fUpper;
const aOverC2 = sqrtAOverC**2;
const plateauMassGeV = evidence.source.plateauMassUpper_eV*1e-9;
const bOverC2 = 1/(fUpper**2*plateauMassGeV**2);
const c = evidence.minimalDiracWitness.c_e_abs;
const aMinimal = c*c*aOverC2;
const bMinimal = c*c*bOverC2;
const delta = 24*aMinimal/reducedPlanckMassGeV**2;
const symmetryBreakingTeV = electronMassGeV/yUpper/1e3;

close(yUpper, evidence.translatedPlateau.y_eUpper);
close(fUpper, evidence.translatedPlateau.f_eUpper_GeV_inverse);
close(sqrtAOverC, evidence.translatedPlateau.sqrtA_over_absCe_lower_GeV);
close(aOverC2, evidence.translatedPlateau.A_over_CeSquared_lower_GeV2);
close(bOverC2, evidence.translatedPlateau.B_over_CeSquared_lower_at_30microeV);
close(symmetryBreakingTeV, evidence.translatedPlateau.F_lower_TeV);
close(Math.sqrt(aMinimal)/1e3, evidence.minimalDiracWitness.sqrtA_lower_TeV);
close(bMinimal, evidence.minimalDiracWitness.B_lower_at_30microeV);
close(delta, evidence.minimalDiracWitness.delta_lower);
close(
  yUpper/evidence.comparison.programmeIllustrativePoint_y_eReach,
  evidence.comparison.publishedOverIllustrativeCouplingReach,
);

assert.ok(symmetryBreakingTeV > 68 && symmetryBreakingTeV < 70);
assert.ok(evidence.normalization.signQualification.includes("magnitude-only"));

console.log("Spin(2,3) Terrano electron-bound map: PASS");
console.log(`  published plateau -> |y_e| < ${yUpper.toExponential(5)} for m_phi < 30 microeV`);
console.log(`  F > ${symmetryBreakingTeV.toFixed(3)} TeV (published rounded statement: 70 TeV)`);
console.log(`  sqrt(A)/|c_e| > ${(sqrtAOverC/1e3).toFixed(3)} TeV`);
console.log(`  at 30 microeV: B/c_e^2 > ${bOverC2.toExponential(5)}`);
