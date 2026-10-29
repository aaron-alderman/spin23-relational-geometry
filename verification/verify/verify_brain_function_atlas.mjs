import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const v1Path = path.join(root, "corpus/programmes/dynatology/brain_function_atlas_v1.json");
const v2Path = path.join(root, "corpus/programmes/dynatology/brain_function_atlas_v2.json");
const middlePath = path.join(root, "corpus/programmes/dynatology/brain_function_missing_middle_register_v1.json");
const v1 = JSON.parse(fs.readFileSync(v1Path, "utf8"));
const v2 = JSON.parse(fs.readFileSync(v2Path, "utf8"));
const middle = JSON.parse(fs.readFileSync(middlePath, "utf8"));

assert.equal(v1.schema, "brain-function-atlas/1");
assert.equal(v2.schema, "brain-function-atlas/2");
assert.match(v2.authority, /operationally_complete_model_class/);
assert.ok(v2.scope?.included && v2.scope?.completenessCriterion && v2.scope?.mutualExclusionCriterion);

assert.ok(Array.isArray(v2.primitiveOperators));
assert.equal(v2.primitiveOperators.length, 15);
const operatorIds = v2.primitiveOperators.map((operator) => operator.id);
assert.deepEqual(operatorIds, operatorIds.map((_, index) => `O${String(index + 1).padStart(2, "0")}`));
assert.equal(new Set(operatorIds).size, operatorIds.length);

const outputTypes = [];
for (const operator of v2.primitiveOperators) {
  for (const field of ["label", "signature", "outputType", "evidence"]) {
    assert.ok(typeof operator[field] === "string" && operator[field].trim(), `${operator.id}: ${field}`);
  }
  assert.ok(Array.isArray(operator.candidateSystems) && operator.candidateSystems.length > 0, `${operator.id}: candidateSystems`);
  assert.ok(Array.isArray(operator.groundMeasures) && operator.groundMeasures.length > 0, `${operator.id}: groundMeasures`);
  assert.ok(Object.hasOwn(v2.evidenceGrades, operator.evidence), `${operator.id}: unknown evidence grade`);
  outputTypes.push(operator.outputType);
}
assert.equal(new Set(outputTypes).size, outputTypes.length, "primitive output types must be unique at the selected grain");

assert.ok(Array.isArray(v2.composites) && v2.composites.length > 0);
assert.equal(new Set(v2.composites.map((entry) => entry.label)).size, v2.composites.length);
for (const entry of v2.composites) {
  assert.ok(operatorIds.includes(entry.primary), `${entry.label}: unknown primary ${entry.primary}`);
  assert.ok(Array.isArray(entry.dependsOn), `${entry.label}: dependsOn`);
  assert.equal(new Set(entry.dependsOn).size, entry.dependsOn.length, `${entry.label}: duplicate dependency`);
  for (const dependency of entry.dependsOn) {
    assert.ok(operatorIds.includes(dependency), `${entry.label}: unknown dependency ${dependency}`);
    assert.notEqual(dependency, entry.primary, `${entry.label}: primary repeated as dependency`);
  }
}

for (const requiredLabel of [
  "alertness",
  "sustained_attention",
  "vigilance",
  "focused_attention",
  "divided_attention",
  "working_memory",
  "long_term_memory_encoding",
  "memory_retrieval_and_recollection",
  "metacognition",
  "affect_and_emotion",
  "emotion_regulation",
  "motivation_reward_and_avoidance",
  "reasoning_and_problem_solving",
  "decision",
  "will_and_tenacity",
  "agency",
  "self_model",
  "social_cognition",
  "language",
  "report",
  "sleep",
  "dreaming",
  "consciousness_capacity",
  "conscious_content",
  "conscious_access",
  "conscious_experience"
]) {
  assert.ok(v2.composites.some((entry) => entry.label === requiredLabel), `missing composite ${requiredLabel}`);
}

const expectedLegacyIds = v1.constructs.map((entry) => entry.id);
const actualLegacyIds = v2.legacyCoverage.map((entry) => entry.legacyId);
assert.deepEqual(actualLegacyIds, expectedLegacyIds, "v2 must cover each v1 construct exactly once and in order");
assert.equal(new Set(actualLegacyIds).size, actualLegacyIds.length);
for (const entry of v2.legacyCoverage) {
  assert.ok(operatorIds.includes(entry.primary), `${entry.legacyId}: unknown primary ${entry.primary}`);
}

const coveredOperators = new Set();
for (const entry of v2.composites) {
  coveredOperators.add(entry.primary);
  entry.dependsOn.forEach((dependency) => coveredOperators.add(dependency));
}
assert.deepEqual([...coveredOperators].sort(), [...operatorIds].sort(), "each primitive must participate in named-feature coverage");

assert.equal(v2.groundingProtocol?.newHumanExperimentation, "not_proposed");
assert.ok(v2.groundingProtocol?.admissibleEvidence?.length > 0);
assert.ok(v2.groundingProtocol?.recoverWhenAvailable?.length > 0);
assert.match(v2.groundingProtocol.retentionRule, /held_out_prediction/);
assert.ok(fs.existsSync(path.join(root, v2.groundingProtocol.missingMiddleRegister)));

assert.ok(Array.isArray(v2.reopenConditions) && v2.reopenConditions.length >= 5);
for (const sourceRef of v2.sourceRefs) {
  assert.ok(fs.existsSync(path.join(root, sourceRef)), `missing sourceRef ${sourceRef}`);
}

assert.equal(middle.schema, "brain-function-missing-middle-register/1");
assert.equal(middle.evidencePolicy?.newHumanExperimentation, "not_proposed");
assert.ok(Array.isArray(middle.evidencePolicy?.admissibleSources) && middle.evidencePolicy.admissibleSources.length > 0);
assert.ok(Array.isArray(middle.middles) && middle.middles.length === 15);
assert.deepEqual(middle.middles.map((entry, index) => entry.id), middle.middles.map((_, index) => `MM-${String(index + 1).padStart(2, "0")}`));
const closureFields = ["sourceOutput", "candidateCarrier", "candidateLaw", "targetInput", "observableTrace", "competingBridge", "failureCondition"];
for (const entry of middle.middles) {
  assert.ok(Array.isArray(entry.sourceOps) && entry.sourceOps.length > 0, `${entry.id}: sourceOps`);
  assert.ok(Array.isArray(entry.targetOps) && entry.targetOps.length > 0, `${entry.id}: targetOps`);
  for (const operatorId of [...entry.sourceOps, ...entry.targetOps]) {
    assert.ok(operatorIds.includes(operatorId), `${entry.id}: unknown operator ${operatorId}`);
  }
  for (const field of closureFields) {
    assert.ok(typeof entry[field] === "string" && entry[field].trim(), `${entry.id}: ${field}`);
  }
  assert.ok(Object.hasOwn(middle.joinGrades, entry.grade), `${entry.id}: unknown grade ${entry.grade}`);
}
assert.ok(Array.isArray(middle.crossCuttingMiddles) && middle.crossCuttingMiddles.length >= 4);
for (const entry of middle.crossCuttingMiddles) {
  for (const operatorId of [...entry.sourceOps, ...entry.targetOps]) {
    assert.ok(operatorIds.includes(operatorId), `${entry.id}: unknown operator ${operatorId}`);
  }
}
for (const sourceRef of middle.sourceRefs) {
  assert.ok(fs.existsSync(path.join(root, sourceRef)), `missing middle sourceRef ${sourceRef}`);
}

console.log("Brain function atlas: PASS");
console.log(`operators=${operatorIds.length}; composites=${v2.composites.length}; legacyCovered=${actualLegacyIds.length}; middles=${middle.middles.length}; crossCutting=${middle.crossCuttingMiddles.length}`);
