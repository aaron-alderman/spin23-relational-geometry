import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const gate = load("../../evidence/data/moonshine-metaplectic-congruence-lift-gate-v1.json");
const mixed = load("../../evidence/data/moonshine-mixed-level46-seam-v1.json");
const quarterTurn = load("../../evidence/data/moonshine-quarter-turn-metaplectic-gate-v1.json");
const scalarNoGo = load("../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json");

assert.equal(gate.finiteQuotient.order, 44);
assert.equal(gate.finiteQuotient.rotationOrder, 11);
assert.equal(gate.finiteQuotient.quarterTurnOrder, 4);
assert.equal(gate.finiteQuotient.abelianization, quarterTurn.abelianizations.Dic11.abelianization);

assert.equal(gate.integralObstruction.matrixDimension, mixed.obstructions.integral.matrixDimension);
assert.equal(gate.integralObstruction.cyclotomicDegree, 11 - 1);
assert(gate.integralObstruction.cyclotomicDegree > gate.integralObstruction.matrixDimension);
assert.equal(gate.integralObstruction.hasOrder11Torsion, false);
assert.equal(gate.integralObstruction.finiteSectionExists, false);
assert.equal(gate.congruencePreimage.split, false);

assert.equal(gate.metaplecticPullback.requiredQuarterTurnImage, "i");
assert.equal(gate.metaplecticPullback.requiredMetaplecticCenterImage, "-1");
assert.equal(gate.metaplecticPullback.finiteC4DataSufficient, false);
assert.equal(gate.metaplecticPullback.requirementsCompatible, false);
assert.equal(gate.selectedLift.K, scalarNoGo.relationDefect.KDefinition.split("=")[1].trim());
assert.equal(scalarNoGo.metaplecticNoGo.simultaneousIAndGenuineCenterPossible, false);
assert(gate.boundary.includes("not vector-valued"));

console.log(JSON.stringify({
  finiteQuotient: gate.finiteQuotient.group,
  directFiniteIntegralLift: gate.integralObstruction.finiteSectionExists,
  congruencePreimage: gate.congruencePreimage.exactSequence,
  finiteC4DataSufficient: gate.metaplecticPullback.finiteC4DataSufficient,
  proposedScalarPhase: gate.metaplecticPullback.requiredQuarterTurnImage,
  requirementsCompatible: gate.metaplecticPullback.requirementsCompatible,
  nextCarrier: "vector-valued",
}, null, 2));
console.log("PASS verify_moonshine_metaplectic_congruence_lift_gate");
