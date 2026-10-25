import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../../evidence/data/alp-odd-moment-detector-fold-gate-v1.json", import.meta.url)));
assert.equal(data.schema, "admissibility.alp-odd-moment-detector-fold-gate/1");
assert.equal(data.parent, "AZ-117");
assert.equal(data.detectorFold.conclusions.symmetricResolutionPreservesParity, true);
assert.equal(data.detectorFold.conclusions.symmetricResolutionRetainsSignedInterference, true);
assert.equal(data.detectorFold.conclusions.oddAcceptanceLeaksSourceEvenTerms, true);
assert.ok(data.detectorFold.attenuationFromResolution > 0 && data.detectorFold.attenuationFromResolution < 1);
assert.equal(data.factorialTransfer.settingCount, 27);
assert.equal(data.factorialTransfer.fitSettings, 19);
assert.equal(data.factorialTransfer.heldOutSettings, 8);
assert.ok(data.factorialTransfer.maxHeldOutResidual < 1e-9);
assert.match(data.experimentSemantics.observedWorld, /one unknown physical coefficient point/);
assert.match(data.verdict.open, /No source-complete/);
console.log("PASS ALP odd-moment detector-fold gate");
