import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../../evidence/data/five-coordinate-phase-edge-extraction-gate-v1.json", import.meta.url)));
assert.equal(data.protocol, "five-coordinate-phase-edge-extraction-gate/1");
assert.deepEqual(data.targets, ["OT-047", "OT-048"]);
assert.equal(data.parent, "AZ-072");
assert.equal(data.signSafeDesign.samplesRequired, 9);
assert.equal(data.signSafeDesign.independentClosureResiduals, 3);
assert.equal(data.signSafeDesign.pureQuadraticShortcut.additionalMixedSamplesAfterBaselineAndAxes, 2);
for (const [key, value] of Object.entries(data.syntheticCertificate.declaredParameters)) {
  assert(Math.abs(data.syntheticCertificate.extracted[key] - value) < 1e-12, `${key} extraction failed`);
}
for (const value of Object.values(data.syntheticCertificate.closureResiduals)) assert(Math.abs(value) < 1e-12);
assert.equal(data.syntheticCertificate.normalizedInterference, -0.5);
assert.equal(data.syntheticCertificate.positivityPass, true);
assert.equal(data.paperConventionMap.canonicalMap.includes("FQq=GammaQq/2"), true);
assert.equal(data.graphAudit.spanningTree.edgesRequired, 2);
assert.equal(data.graphAudit.cycle.edgesRequired, 3);
assert.equal(data.graphAudit.cycle.nodeRephasingsChecked, 8);
assert.equal(data.graphAudit.cycle.invariantUnderAllNodeRephasings, true);
assert.equal(data.processActions.length, 2);
assert.match(data.verdict.open, /No source-native B_c coefficient table/);
console.log("PASS five-coordinate phase-edge extraction gate");
console.log(`signed_samples=${data.signSafeDesign.samplesRequired}`);
console.log(`normalized_interference=${data.syntheticCertificate.normalizedInterference}`);
console.log(`node_rephasings_checked=${data.graphAudit.cycle.nodeRephasingsChecked}`);
