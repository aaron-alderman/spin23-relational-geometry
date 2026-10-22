#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const audit = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsion-empirical-calibration-source-audit-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, rel) => {
  const scale = Math.max(Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel*scale, `${actual} != ${expected}`);
};

assert.equal(audit.primarySource.doi, "10.1103/PhysRevLett.134.181801");
assert.equal(audit.modelMatch.tensorStructureMatch, true);
assert.equal(audit.modelMatch.spin23Specificity, false);

const hbarCElectronVoltMetres = 1.973269804e-7;
const rangeMetres = audit.reportedAnchor.forceRangeMillimetres / 1000;
const massMeV = (hbarCElectronVoltMetres / rangeMetres) * 1000;
close(massMeV, audit.reportedAnchor.approximateMediatorMassMeV, 0.07);

const coupling = audit.reportedAnchor.electronNeutronCouplingTimes1e9;
const combinedSigma = Math.hypot(coupling.statisticalSigma, coupling.systematicSigma);
const oneSidedGaussianUpper = coupling.central + 1.645*combinedSigma;
close(oneSidedGaussianUpper, coupling.reportedAbsolute95Upper, 0.04);

assert.equal(audit.calibrationDecision.primaryAnchorAvailable, true);
assert.equal(audit.calibrationDecision.singlePointSanityCheckAvailable, true);
assert.equal(audit.calibrationDecision.fullEmpiricalCalibrationAdmitted, false);
assert.equal(audit.reproductionAudit.independentLikelihoodReconstruction, false);
assert.ok(audit.calibrationDecision.nextEvidence.length >= 5);
assert.ok(Object.values(audit.authority).every(value => value === false));

console.log("Spin(2,3) torsion empirical calibration source audit: PASS");
console.log(`  7 mm range mass: ${massMeV.toFixed(5)} meV (reported approximately 0.03 meV)`);
console.log(`  rounded one-sided Gaussian upper: ${oneSidedGaussianUpper.toFixed(3)}e-9 (reported 2.4e-9)`);
console.log("  decision: primary anchor and sanity check available; independent likelihood reconstruction blocked");
