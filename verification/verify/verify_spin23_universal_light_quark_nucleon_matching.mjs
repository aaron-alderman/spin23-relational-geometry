#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-universal-light-quark-nucleon-matching-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, rel = 1e-11) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel * scale, `${actual} != ${expected}`);
};

const m = evidence.matching;
const x = evidence.xu2025Propagation;
const electronMassGeV = 0.00051099895;
const neutronMassGeV = 0.93956542052;
const reducedPlanckMassGeV = 2.435e18;
const aOverProduct = 800194.9055700476;
const bOverProduct = 8.891054506333858e32;

const singlet = m.deltaUProton + m.deltaDProton + m.deltaSProton;
const singletSigma = Math.hypot(
  m.deltaUUncertainty,
  m.deltaDUncertainty,
  m.deltaSUncertainty,
);
const cN = m.elementaryCoefficient * singlet;
const cNSigma = m.elementaryCoefficient * singletSigma;
const coefficientProduct = m.elementaryCoefficient * cN;
const aLower = aOverProduct * coefficientProduct;
const bLower = bOverProduct * coefficientProduct;
const ynOverYe = (neutronMassGeV / electronMassGeV) * (cN / m.elementaryCoefficient);
const yeUpper = Math.sqrt(x.electronNeutronProductUpper / ynOverYe);

close(singlet, m.lightSinglet);
close(singletSigma, m.lightSingletNaiveIndependentUncertainty);
close(cN, m.effectiveProtonCoefficient);
close(cN, m.effectiveNeutronCoefficient);
close(cNSigma, m.effectiveNucleonCoefficientNaiveUncertainty);
close(cN / m.elementaryCoefficient, m.nucleonToElementaryCoefficientRatio);
close(coefficientProduct, x.absCeCn);
close(aLower, x.A_lower_GeV2);
close(Math.sqrt(aLower), x.sqrtA_lower_GeV);
close(bLower, x.B_lower);
close(24 * aLower / reducedPlanckMassGeV ** 2,
  x.deltaLower_if_A_equals_reducedPlanckSquaredTimesDeltaOver24);
close(ynOverYe, x.ynOverYe);
close(yeUpper, x.yeUpper_if_product_saturated);
close(ynOverYe * yeUpper, x.ynUpper_if_product_saturated);
close(singletSigma / singlet, evidence.uncertainty.relativeCoefficient);
close(singletSigma / (2 * singlet), evidence.uncertainty.relativeSqrtABound);

assert.match(evidence.scope.notEstablished, /not|or/i);
assert.match(evidence.uncertainty.qualification, /covariance/);
console.log("Spin(2,3) universal light-quark nucleon matching: PASS");
console.log(`  DeltaSigma_uds = ${singlet.toFixed(4)} +/- ${singletSigma.toFixed(4)} (naive)`);
console.log(`  c_p = c_n = ${cN.toFixed(6)} for c_q = 1/8`);
console.log(`  Xu point gives sqrt(A) > ${Math.sqrt(aLower).toFixed(3)} GeV`);
console.log("  status: conditional benchmark, not a parent-theory prediction");
