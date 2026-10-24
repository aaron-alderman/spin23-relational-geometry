import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/three-scale-passive-diffusion-pushforward-v1.json"), "utf8"));

assert.equal(data.protocol, "three-scale-passive-diffusion-pushforward/1");
assert.equal(data.target, "OT-019");
assert.equal(data.fixedMaps.fittedParameters, 0);
assert.equal(data.audit.casesChecked, 4);
assert.equal(data.audit.heldOutCases, 3);
assert.equal(data.audit.allDirectComposedOneStepAgree, true);
assert.equal(data.audit.allDefectIdentitiesClose, true);
assert.equal(data.audit.allDefectsRespectCompositionBound, true);
assert.equal(data.audit.allSemigroupErrorsRespectTelescopingBound, true);
assert.equal(data.audit.allUpdatesPreserveDeclaredAdmissibleSet, true);
assert.deepEqual(data.audit.exactAtEveryScale, ["balanced-reference", "held-out-internal-substitution"]);
assert.deepEqual(data.audit.intermediateMemoryOnly, ["held-out-mild-asymmetry"]);
assert.deepEqual(data.audit.coarseMemoryBearing, ["held-out-strong-asymmetry"]);
assert.ok(data.cases.every(entry => entry.directVersusComposedOneStepError < 1e-12));
assert.ok(data.cases.every(entry => entry.defectCompositionResidual < 1e-12));
assert.ok(data.cases.every(entry => entry.semigroupError <= entry.semigroupTelescopingBound + 1e-14));
assert.ok(data.cases.filter(entry => entry.exactCoarseAutonomousDescent).every(entry => entry.semigroupError < 1e-12));
assert.ok(data.cases.filter(entry => !entry.exactCoarseAutonomousDescent).every(entry => entry.semigroupError > 0));
assert.ok(data.cases.find(entry => entry.id === "held-out-mild-asymmetry").detectorKernelLeakage.withinFirstPairAtIntermediateDetector > 0);
assert.ok(data.cases.find(entry => entry.id === "held-out-mild-asymmetry").detectorKernelLeakage.withinFirstPairAtCoarseDetector < 1e-12);
assert.equal(data.decision.sourceNativeThreeScaleCarrierConstructed, true);
assert.equal(data.decision.interscaleMapsFitted, false);
assert.equal(data.decision.fullOt019Closure, true);
assert.equal(data.decision.generatedSpin23DynamicsEstablished, false);
assert.equal(data.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  cases: data.audit.casesChecked,
  heldOutCases: data.audit.heldOutCases,
  exactAtEveryScale: data.audit.exactAtEveryScale,
  intermediateMemoryOnly: data.audit.intermediateMemoryOnly,
  coarseMemoryBearing: data.audit.coarseMemoryBearing,
  boundary: "OT-019 construction closes; asymmetric detector fibres require memory rather than a Markovian quotient"
}, null, 2));
