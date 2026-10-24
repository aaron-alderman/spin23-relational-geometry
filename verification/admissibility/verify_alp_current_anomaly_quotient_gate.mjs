import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const d = JSON.parse(await readFile(new URL("../../evidence/data/alp-current-anomaly-quotient-gate-v1.json", import.meta.url), "utf8"));
assert.equal(d.protocol, "alp-current-anomaly-quotient-gate/1");
assert.equal(d.parent, "AZ-075");
assert.match(d.quotientCertificate.nullDirectionName, /B-L/);
assert.deepEqual(d.quotientCertificate.imageOfBMinusLNull, [0, 0, 0, 0]);
assert.equal(d.quotientCertificate.invariantUnderBMinusLShift, true);
assert.deepEqual(d.corpusTranslation.imageOfWeakBlindDirection, [0, 0, 0]);
assert.deepEqual(d.corpusTranslation.measuredExample, d.corpusTranslation.measuredBlindShift);
assert.equal(d.corpusTranslation.currentOnlySlice.determinant, -0.5);
assert.match(d.boundary.correctedClaim, /not the complete parameter space/);
console.log("PASS ALP current/anomaly quotient gate");
