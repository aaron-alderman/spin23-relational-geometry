import assert from "node:assert/strict";
import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("evidence/data/admissibility-exodus-qed-closure-gate-v1.json", "utf8"));

assert.equal(data.protocol, "admissibility/exodus-qed-closure-gate-v1");
assert.equal(data.translationTest.commonTranslationPass, true);
assert.equal(data.translationTest.relativeCoordinateIsPhysical, true);
assert.equal(data.wholeBoundaryTest.expressionsEquivalentForClosedAsymmetricDevice, false);
assert.equal(data.qedTest.translationWardIdentityRequired, true);
assert.equal(data.qedTest.staticMinkowskiVacuumProvidesMomentumSink, false);
assert.equal(data.qedTest.virtualPhotonsAreOnShellExhaust, false);
assert.equal(data.qedTest.completeStaticCasimirAssemblySelfAccelerates, false);
assert.ok(data.radiationBenchmark.minimumPerfectlyCollimatedPhotonPowerW > 1.5e6);
assert.equal(data.disposition.publishedQEDDerivationPasses, false);
assert.equal(data.disposition.experimentalForceClaimLogicallyClosedByThisAudit, false);

console.log("Exodus QED translation and whole-boundary closure gate: PASS");

