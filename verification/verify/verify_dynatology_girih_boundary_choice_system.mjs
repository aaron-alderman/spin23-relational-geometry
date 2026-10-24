import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const record = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/girih_boundary_choice_system_v1.json"), "utf8"));

assert.equal(record.schema, "dynatology-girih-boundary-choice-system/1");
assert.equal(record.status, "exact_count_factorization_no_go_and_specified_collared_constraint_carrier");
const choices = record.sourceFacts.choiceCardinalities;
assert.deepEqual(choices, {decagon: 10, hexagon: 2, bowtie: 2});
assert.equal(choices.decagon * choices.hexagon * choices.bowtie, 40);
assert.equal(record.sourceFacts.mappingBreaksBilateralTileSymmetry, true);
assert.equal(record.sourceFacts.choicesUsedToReducePenroseEdgeMismatches, true);

// A detector factors through q only if it is constant on every q-fibre.
// The frozen source facts state both a non-singleton choice fibre and mismatch
// dependence on the choices, so count factorization is logically impossible.
const nogo = record.factorizationNoGo;
assert.equal(nogo.countFibresContainMultipleChoiceAssignments, true);
assert.equal(nogo.detectorVariesWithinCountFibres, true);
assert.match(nogo.conclusion, /no_D_equals_f_composed_with_q/);

assert.equal(record.parityBoundary.countParityIsConstantOnEachCountFibre, true);
assert.equal(record.parityBoundary.mismatchRecordCanVaryOnThatFibre, true);
assert.match(record.parityBoundary.conclusion, /does_not_predict_defect_locations/);
assert.equal(record.constraintCarrier.physicalEnergyClaimed, false);
assert.equal(record.minimumTranscription.length, 6);
assert.equal(record.promotionTests.length, 3);
assert.match(record.decision, /withhold_any_identification/);

console.log("Dynatology girih boundary-choice system: PASS");
console.log(JSON.stringify({choiceProductForOneOfEachTile: 40, countFactorization: false, minimumTranscriptionObjects: record.minimumTranscription.length, promotionTests: record.promotionTests.length}));

