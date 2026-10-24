#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/admissibility-transverse-boundary-joint-detector-v1.json"), "utf8"));
const document = fs.readFileSync(path.join(root, "corpus/programmes/admissibility/admissibility_54_transverse_joint_detector_symmetry_ceiling.md"), "utf8");

assert.equal(data.schema, "admissibility.transverse-boundary-joint-detector/1");
assert.equal(data.id, "AZ-054");
assert.equal(data.fibre.placements, 35);
assert.equal(new Set(data.fibre.members.map((member) => member.word)).size, 35);
assert.equal(data.fibre.longitudinalEvenClasses, 12);
assert.equal(data.fibre.transverseOddNernstClasses, 12);
assert.equal(data.fibre.jointLongitudinalNernstClasses, 12);
assert.equal(data.fibre.boundaryClasses, 21);
assert.equal(data.fibre.jointAllClasses, 21);
assert.equal(data.fibre.negativeNernst + data.fibre.positiveNernst, 35);

const reflection = data.fibre.topBottomReflection;
assert.equal(reflection.orbitCount, 21);
assert.ok(reflection.maximumLongitudinalDifference < 1e-12);
assert.ok(reflection.maximumNernstDifference < 1e-12);
assert.ok(reflection.maximumBoundaryDifference < 1e-12);
assert.ok(data.reciprocity.maximumTransmissionOnsagerError < 1e-12);

assert.equal(data.admission.transverseTimeReversalOddChannelRepresented, true);
assert.equal(data.admission.completePlacementFibreEnumerated, true);
assert.equal(data.admission.jointDetectorInjectiveAtDeclaredTolerance, false);
assert.equal(data.admission.jointDetectorSaturatesTopBottomOrbitBound, true);
assert.equal(data.admission.universalInvariantEstablished, false);
assert.equal(data.admission.materialPredictionEstablished, false);

for (const phrase of [
  "saturates its symmetry bound",
  "Onsager--Casimir relation",
  "Burnside counting",
  "factors through the reflection quotient",
  "apparatus symmetry",
  "sensors must not be added",
]) assert.ok(document.includes(phrase), `missing document phrase: ${phrase}`);

console.log("PASS transverse joint detector, reciprocity and reflection-quotient ceiling");
console.log(JSON.stringify({placements: 35, longitudinalClasses: 12, nernstClasses: 12, jointClasses: 21, reflectionOrbits: 21, onsagerError: data.reciprocity.maximumTransmissionOnsagerError}));
