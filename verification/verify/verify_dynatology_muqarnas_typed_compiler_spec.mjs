import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const file = path.join(root, "corpus/programmes/dynatology/muqarnas_typed_compiler_spec_v1.json");
const spec = JSON.parse(fs.readFileSync(file, "utf8"));

assert.equal(spec.schema, "dynatology-muqarnas-typed-compiler/1");
assert.equal(spec.authority, "syntax_geometry_and_detection_are_separate_typed_layers");
assert.equal(spec.baseObject.components.length, 5);
assert.ok(spec.edgeTypes.includes("scaffold_ray"));
assert.ok(spec.edgeTypes.includes("cell_boundary"));
assert.ok(spec.faceTypes.includes("unclassified"));
assert.ok(spec.boundaryPortFields.includes("evidence_status"));
assert.equal(spec.rules.length, 5);
assert.deepEqual(spec.rules.map((rule) => rule.id), ["MTC-R01", "MTC-R02", "MTC-R03", "MTC-R04", "MTC-R05"]);
assert.ok(spec.compilerResidualClasses.includes("internal_seam"));
assert.ok(spec.compilerResidualClasses.includes("solver_or_transcription_artifact"));
assert.equal(spec.detectors.length, 5);
assert.ok(spec.detectors.some((detector) => detector.name === "oriented_seam_position"));
assert.ok(spec.admissionRules.includes("undefined_products_are_not_counted_as_nonzero_associators"));
assert.ok(spec.admissionRules.includes("macro_rules_require_source_authority"));

console.log("Dynatology muqarnas typed compiler specification: PASS");
console.log(JSON.stringify({rules: spec.rules.length, detectors: spec.detectors.length, residualClasses: spec.compilerResidualClasses.length}));

