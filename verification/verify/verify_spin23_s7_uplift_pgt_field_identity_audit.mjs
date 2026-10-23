#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-s7_uplift_pgt_field_identity_audit-v1.json", root,
), "utf8"));

assert.equal(data.parent.ordinaryOmegaZeroUpliftAvailable, true);
assert.equal(data.parent.genericOmegaUpliftEstablishedByCitedAnalysis, false);
assert.deepEqual(data.elevenDimensionalFieldContent.bosonicGaugePotentials, [
  "metric or elfbein",
  "three-form potential A_3",
]);
assert.equal(data.elevenDimensionalFieldContent.independentPropagatingBosonicLorentzConnection, false);
assert.equal(data.fourDimensionalProvenance.pseudoscalarImpliesTorsion, false);
assert.equal(data.torsionAudit.bosonicBackgroundTorsionPolePresent, false);
assert.equal(data.torsionAudit.gravitinoSupercovariantTorsionPresent, true);
assert.equal(data.torsionAudit.gravitinoTorsionSuppliesIndependentBosonicPole, false);
assert.equal(data.torsionAudit.directFieldIdentityPresent, false);
assert.equal(data.torsionAudit.normalizedEtaMapPresent, false);
assert.equal(data.routeWitnesses.length, 3);
assert.ok(data.routeWitnesses.every((witness) => witness.pgtConnectionIdentity === false));
assert.ok(data.requiredExtension.length >= 5);

console.log("Spin(2,3) S7 uplift PGT field-identity audit: PASS");
console.log("  standard omega=0 uplift: available");
console.log("  pseudoscalar provenance: metric/three-form sectors, not an independent connection");
console.log("  supercovariant fermion torsion does not supply a propagating bosonic PGT pole");
