import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const file = path.join(root, "corpus/programmes/dynatology/topkapi_drawing_5_lift_fibre_v0.json");
const record = JSON.parse(fs.readFileSync(file, "utf8"));

assert.equal(record.schema, "dynatology-topkapi-drawing-5-lift-fibre/0");
assert.equal(record.status, "source_derived_nonunique_lift_not_full_vector_transcription");
assert.equal(record.source.catalogueDrawing, 5);
assert.equal(record.source.pdfSha256.length, 64);
assert.deepEqual(record.source.analysisPrintedPages, [351, 352, 353, 354, 355, 356, 357]);

assert.equal(record.sourceClaims.principalRadii, 11);
assert.equal(record.sourceClaims.quarterSectors, 12);
assert.equal(record.sourceClaims.impliedHalfVaultSectors, 24);
assert.equal(record.sourceClaims.rows, 8);
assert.deepEqual(record.sourceClaims.rowRegimes[0].rows, [5, 6, 7, 8]);
assert.equal(record.sourceClaims.rowRegimes[0].symmetry, "regular_radial");
assert.deepEqual(record.sourceClaims.rowRegimes[1].rows, [1, 2, 3, 4]);
assert.equal(record.sourceClaims.rowRegimes[1].symmetry, "irregular_diagonal_only");
assert.match(record.sourceClaims.heightFreedom, /different height, or heights/i);
assert.match(record.sourceClaims.projectionInvariant, /shifted only along the height coordinate/i);

assert.match(record.formalization.sectionLaw, /pi\(R_P\(h\)\)=P/);
assert.equal(record.formalization.provedBound, "cardinality(H_P)>=2");
for (const prohibited of [
  "dimension_or_connectedness_of_H_P",
  "change_of_cell_incidence_or_topology_under_height_variation",
  "compiler_noncommutation",
  "octonion_or_Jordan_structure"
]) {
  assert.ok(record.formalization.notProved.includes(prohibited), `missing boundary: ${prohibited}`);
}

assert.equal(record.relationToDrawing108.distinctObjects, true);
assert.equal(record.relationToDrawing108.drawing108WorkedLiftStatus, "not_demonstrated_by_the_located_geometric_analysis");
assert.match(record.currentVerdict, /does not establish.*nonassociative physical action/i);

console.log("Dynatology Topkapi drawing 5 lift fibre: PASS");
console.log(JSON.stringify({
  rows: record.sourceClaims.rows,
  quarterSectors: record.sourceClaims.quarterSectors,
  halfVaultSectors: record.sourceClaims.impliedHalfVaultSectors,
  provedLiftCardinality: record.formalization.provedBound
}));
