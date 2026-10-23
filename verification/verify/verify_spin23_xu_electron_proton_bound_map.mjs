#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-xu-electron-proton-bound-map-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, rel = 1e-11) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel * scale, `${actual} != ${expected}`);
};

const electronMassGeV = 0.00051099895;
const protonMassGeV = 0.93827208816;
const neutronMassGeV = 0.93956542052;
const source = evidence.source;
const ratio = (source.neutronSpinFraction / source.protonSpinFraction)
  * (protonMassGeV / neutronMassGeV);
const epUpper = source.electronNeutronProductUpper * ratio;
const aOverProduct = 4 * electronMassGeV * protonMassGeV / epUpper;
const massGeV = source.mass_eV * 1e-9;
const bOverProduct = aOverProduct / massGeV ** 2;
const witnessProduct = evidence.universalLightQuarkWitness.electronCoefficient
  * evidence.universalLightQuarkWitness.protonCoefficient;
const aLower = aOverProduct * witnessProduct;

close(protonMassGeV / neutronMassGeV, evidence.reconstruction.massRatioProtonToNeutron);
close(ratio, evidence.reconstruction.protonToNeutronLimitRatio);
close(epUpper, evidence.reconstruction.electronProtonProductUpper);
close(aOverProduct, evidence.translatedPoint.A_over_absCeCp_lower_GeV2);
close(Math.sqrt(aOverProduct), evidence.translatedPoint.sqrtA_over_sqrtAbsCeCp_lower_GeV);
close(bOverProduct, evidence.translatedPoint.B_over_absCeCp_lower);
close(aLower, evidence.universalLightQuarkWitness.A_lower_GeV2);
close(Math.sqrt(aLower), evidence.universalLightQuarkWitness.sqrtA_lower_GeV);
close(bOverProduct * witnessProduct, evidence.universalLightQuarkWitness.B_lower);
close(
  aOverProduct / 800194.9055700476,
  evidence.universalLightQuarkWitness.relativeAReachVersusElectronNeutron,
);
assert.match(evidence.reconstruction.qualification, /not an author-supplied/);

console.log("Spin(2,3) Xu electron-proton point reconstruction: PASS");
console.log(`  |y_e y_p| < ${epUpper.toExponential(5)} at m_phi about 30 microeV`);
console.log(`  A/|c_e c_p| > ${aOverProduct.toExponential(5)} GeV^2`);
console.log(`  universal witness: sqrt(A) > ${Math.sqrt(aLower).toFixed(3)} GeV`);
console.log(`  proton product reach is ${ratio.toFixed(2)}x weaker than neutron`);
