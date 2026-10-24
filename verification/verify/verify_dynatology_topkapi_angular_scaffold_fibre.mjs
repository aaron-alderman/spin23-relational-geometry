import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const file = path.join(root, "corpus/programmes/dynatology/topkapi_angular_scaffold_fibre_v0.json");
const record = JSON.parse(fs.readFileSync(file, "utf8"));

assert.equal(record.schema, "dynatology-topkapi-angular-scaffold-fibre/0");
assert.equal(record.status, "catalogue_derived_lower_bound_not_complete_family_classification");
assert.equal(record.angularSignature.internalPrincipalRadii, 11);
assert.equal(record.angularSignature.angularIntervals, 12);
assert.equal(record.angularSignature.idealStepDegrees, 7.5);
assert.equal(record.angularSignature.idealStepRadians, "pi/24");

assert.deepEqual(record.documentedPlans.map((x) => x.catalogueDrawing), [5, 16, 108, 110]);
assert.deepEqual(record.documentedPlans.map((x) => x.squinchStarPoints), [8, 9, 6, 6]);
assert.deepEqual(record.documentedPlans.map((x) => x.completionSectors), [24, 48, 24, 24]);
assert.deepEqual(record.documentedPlans.map((x) => x.boundaryUse), ["half_vault_only", "full_vault", "half_vault_only", "half_vault_only"]);

assert.equal(record.formalization.provedPlanFibreBound, "cardinality(q^-1(A_11))>=4_within_the_catalogued_witness_set");
assert.equal(record.formalization.boundaryNonDetermination, "A_11_does_not_determine_beta");
assert.equal(record.formalization.drawing5RealizationBound, "cardinality(H_P5)>=2");
assert.ok(record.angularSignature.scopeWarning.includes("not_identical_full_scaffold"));
assert.ok(record.notProved.includes("complete_enumeration_of_all_plans_over_A_11"));
assert.ok(record.notProved.includes("nonassociativity_or_exceptional_algebra"));

console.log("Dynatology Topkapi angular scaffold fibre: PASS");
console.log(JSON.stringify({
  angularIntervals: record.angularSignature.angularIntervals,
  planWitnesses: record.documentedPlans.length,
  completionSectors: record.documentedPlans.map((x) => x.completionSectors),
  planFibreBound: record.formalization.provedPlanFibreBound
}));
