import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const e = JSON.parse(readFileSync("evidence/data/alp-resonance-interference-odd-moment-v1.json", "utf8"));
assert.equal(e.schema, "admissibility.alp-resonance-interference-odd-moment/1");
for (const pair of e.pairedDifferences) assert.ok(Math.abs(pair.numeric - pair.analytic) < 1e-12);
assert.ok(Math.abs(e.oddMoment + e.reversedOddMoment) < 1e-12);
assert.equal(e.evenCancellation.constantBackgroundSquared, true);
assert.equal(e.evenCancellation.pureBreitWignerSignalSquared, true);
assert.equal(e.decisions.ordinarySymmetricYieldRetainsRealInterferenceSign, false);
assert.equal(e.decisions.oddMassMomentRetainsResidueSignInDeclaredModel, true);
assert.equal(e.decisions.detectorLevelLikelihoodComputed, false);
assert.equal(e.decisions.newPhysicsEvidence, false);
console.log("verified ALP resonance-interference odd moment");
