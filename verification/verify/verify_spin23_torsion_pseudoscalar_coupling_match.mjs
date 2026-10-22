#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsion-pseudoscalar-coupling-match-v1.json",
  import.meta.url,
), "utf8"));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const close = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(actual), Math.abs(expected)), `${actual} != ${expected}`);
};

for (const source of evidence.sources) {
  const bytes = await readFile(new URL("../../" + source.path, import.meta.url));
  assert.equal(sha256(bytes), source.sha256, `${source.path} drift`);
}

const { electronMassGeV: me, neutronMassGeV: mn } = evidence.inputs;
const denominator = 4 * me * mn;
const translated = evidence.translatedSevenMillimetreConstraint;
close(translated.central_fElectronTimesFNeutron_GeVMinus2, evidence.inputs.reportedCentralProduct / denominator);
close(translated.statisticalSigma_GeVMinus2, evidence.inputs.reportedStatisticalSigmaProduct / denominator);
close(translated.systematicSigma_GeVMinus2, evidence.inputs.reportedSystematicSigmaProduct / denominator);
close(translated.absolute95_fElectronTimesFNeutron_GeVMinus2, evidence.inputs.reportedAbsolute95ElectronNeutronProduct / denominator);
close(translated.universalAbsoluteFUpper_GeVMinus1, Math.sqrt(translated.absolute95_fElectronTimesFNeutron_GeVMinus2));

const absoluteC = 1 / 8;
const minimumA = absoluteC ** 2 / translated.absolute95_fElectronTimesFNeutron_GeVMinus2;
const mediatorMass = evidence.inputs.sevenMillimetreMediatorMassGeV;
close(evidence.minimalBareCoefficientConditional.minimumA_GeV2, minimumA);
close(evidence.minimalBareCoefficientConditional.minimumSqrtA_GeV, Math.sqrt(minimumA));
close(evidence.minimalBareCoefficientConditional.minimumBAtSevenMillimetres, minimumA / mediatorMass ** 2);

const planckA = evidence.naturalPlanckBenchmark.sqrtA_GeV ** 2;
const naturalFProduct = absoluteC ** 2 / planckA;
close(evidence.naturalPlanckBenchmark.absolute_fElectronTimesFNeutron_GeVMinus2, naturalFProduct);
close(evidence.naturalPlanckBenchmark.absolute_gElectronTimesGNeutron, denominator * naturalFProduct);
assert.ok(evidence.inputs.reportedAbsolute95ElectronNeutronProduct / evidence.naturalPlanckBenchmark.absolute_gElectronTimesGNeutron > 1e32);

assert.equal(evidence.decisions.normalizationBridgeAvailable, true);
assert.equal(evidence.decisions.genericEftConstraintAvailable, true);
assert.equal(evidence.decisions.spin23FingerprintAvailable, false);
assert.equal(evidence.decisions.lightPoleMechanismAvailable, false);
assert.equal(evidence.decisions.fullLikelihoodAvailable, false);
assert.ok(Object.values(evidence.authority).every(value => value === false));

console.log("Spin(2,3) torsion/pseudoscalar coupling match: PASS");
console.log(`  |f_e f_n| at 7 mm (reported 95% product limit): ${translated.absolute95_fElectronTimesFNeutron_GeVMinus2.toExponential(6)} GeV^-2`);
console.log(`  conditional |c_e|=|c_n|=1/8: sqrt(A) > ${evidence.minimalBareCoefficientConditional.minimumSqrtA_GeV.toFixed(3)} GeV`);
console.log("  status: generic EFT normalization closed; Spin(2,3) fingerprint and light-pole mechanism remain open");
