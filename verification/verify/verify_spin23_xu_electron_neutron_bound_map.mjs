#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-xu-electron-neutron-bound-map-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, rel = 1e-11) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= rel*scale, `${actual} != ${expected}`);
};

const electronMassGeV = 0.00051099895;
const neutronMassGeV = 0.93956542052;
const productUpper = evidence.source.electronNeutronProductUpper;
const massGeV = evidence.source.mass_eV*1e-9;
const feFnUpper = productUpper/(4*electronMassGeV*neutronMassGeV);
const geometricMeanF = Math.sqrt(feFnUpper);
const aOverProduct = 1/feFnUpper;
const bOverProduct = aOverProduct/massGeV**2;
const universalF = Math.sqrt(electronMassGeV*neutronMassGeV/productUpper);

close(feFnUpper, evidence.translatedPoint.absFeFnUpper_GeV_inverse2);
close(geometricMeanF, evidence.translatedPoint.geometricMeanFUpper_GeV_inverse);
close(aOverProduct, evidence.translatedPoint.A_over_absCeCn_lower_GeV2);
close(Math.sqrt(aOverProduct), evidence.translatedPoint.sqrtA_over_sqrtAbsCeCn_lower_GeV);
close(bOverProduct, evidence.translatedPoint.B_over_absCeCn_lower);
close(universalF, evidence.translatedPoint.pseudoGoldstoneUniversalF_lower_GeV);
close(
  geometricMeanF/evidence.comparison.electronElectron_fUpper_GeV_inverse,
  evidence.comparison.equalEffectiveCoefficientWeaknessFactor,
);

assert.ok(evidence.normalization.nucleonQualification.includes("not fixed"));
console.log("Spin(2,3) Xu electron-neutron bound map: PASS");
console.log(`  |y_e y_n| < ${productUpper.toExponential(3)} at m_phi about 30 microeV`);
console.log(`  A/|c_e c_n| > ${aOverProduct.toExponential(5)} GeV^2`);
console.log(`  B/|c_e c_n| > ${bOverProduct.toExponential(5)}`);
console.log(`  equal-coefficient common-f reach is ${evidence.comparison.equalEffectiveCoefficientWeaknessFactor.toFixed(1)}x weaker than e-e`);
