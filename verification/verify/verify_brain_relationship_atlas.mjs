import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadBrainRelationshipAtlas, composeRelations, projectedPaths } from "../../scripts/query-brain-relationship-atlas.mjs";

const root = process.cwd();
const loaded = loadBrainRelationshipAtlas(root);
const { atlas, functionAtlas, middleRegister, nodes, relations } = loaded;

assert.equal(atlas.schema, "brain-relationship-atlas/1");
assert.match(atlas.authority, /typed_conditional_relationship_model/);
assert.equal(atlas.evidencePolicy?.newHumanExperimentation, "not_proposed");
assert.equal(atlas.conflictPolicy?.silenceIsEvidence, false);
assert.ok(Array.isArray(atlas.reopenConditions) && atlas.reopenConditions.length >= 8);

for (const sourceRef of [atlas.algebra, ...Object.values(atlas.imports), ...atlas.sourceRefs]) {
  assert.ok(fs.existsSync(path.join(root, sourceRef)), `missing source ${sourceRef}`);
}

const nodeIds = nodes.map((node) => node.id);
assert.equal(new Set(nodeIds).size, nodeIds.length, "node identifiers must be unique after expansion");
const nodeById = new Map(nodes.map((node) => [node.id, node]));
for (const node of nodes) {
  assert.ok(typeof node.id === "string" && node.id.includes(":"), `unqualified node id ${node.id}`);
  assert.ok(typeof node.type === "string" && node.type, `${node.id}: missing type`);
  assert.ok(typeof node.label === "string" && node.label, `${node.id}: missing label`);
}

assert.equal(nodes.filter((node) => node.type === "operation").length, 15);
assert.equal(nodes.filter((node) => node.type === "feature").length, functionAtlas.composites.length);
assert.equal(nodes.filter((node) => node.type === "middle").length, middleRegister.middles.length + middleRegister.crossCuttingMiddles.length);
for (const required of [
  "feature:conscious_access",
  "feature:conscious_experience",
  "feature:will_and_tenacity",
  "system:aMCC_dACC",
  "residue:phenomenal_status"
]) assert.ok(nodeById.has(required), `missing required node ${required}`);

const relationIds = relations.map((relation) => relation.id);
assert.equal(new Set(relationIds).size, relationIds.length, "relation identifiers must be unique after expansion");
const relationById = new Map(relations.map((relation) => [relation.id, relation]));
for (const relation of relations) {
  assert.ok(Array.isArray(relation.sources) && relation.sources.length > 0, `${relation.id}: sources`);
  assert.ok(Array.isArray(relation.targets) && relation.targets.length > 0, `${relation.id}: targets`);
  assert.ok(atlas.relationFamilies.includes(relation.family), `${relation.id}: unknown family ${relation.family}`);
  for (const endpoint of [...relation.sources, ...relation.targets, ...(relation.provenance ?? [])]) {
    assert.ok(nodeById.has(endpoint), `${relation.id}: unresolved endpoint or provenance node ${endpoint}`);
  }
  for (const field of ["polarity", "predicate", "timescale", "carrier", "law", "evidence", "falsifier"]) {
    assert.ok(typeof relation[field] === "string" && relation[field], `${relation.id}: missing ${field}`);
  }
  assert.ok(Array.isArray(relation.conditions) && relation.conditions.length > 0, `${relation.id}: conditions`);
  assert.ok(Array.isArray(relation.alternatives), `${relation.id}: alternatives`);
}

assert.equal(relations.filter((relation) => relation.family === "compilation").length, functionAtlas.composites.length);
assert.equal(
  relations.filter((relation) => relation.family === "implementation").length,
  functionAtlas.primitiveOperators.reduce((sum, operator) => sum + new Set(operator.candidateSystems).size, 0)
);
assert.equal(
  relations.filter((relation) => relation.family === "grounding").length,
  functionAtlas.primitiveOperators.reduce((sum, operator) => sum + new Set(operator.groundMeasures).size, 0)
);
assert.equal(relations.filter((relation) => relation.family === "transformational").length, middleRegister.middles.length);
assert.ok(relations.filter((relation) => relation.family === "unknown").length >= middleRegister.crossCuttingMiddles.length);
assert.ok(relations.filter((relation) => relation.family === "negative").length >= 5);

for (const feature of functionAtlas.composites) {
  const relation = relationById.get(`compile/${feature.label}`);
  assert.ok(relation, `missing compilation for ${feature.label}`);
  assert.deepEqual(relation.targets, [`feature:${feature.label}`]);
  assert.ok(relation.sources.includes(`op:${feature.primary}`), `${feature.label}: primary operation absent from compilation`);
}
for (const operator of functionAtlas.primitiveOperators) {
  for (const system of operator.candidateSystems) {
    const relation = relationById.get(`implement/${operator.id}/${encodeURIComponent(system)}`);
    assert.ok(relation, `${operator.id}: implementation relation for ${system}`);
    assert.deepEqual(relation.sources, [`system:${system}`], `${relation.id}: candidates must not become an asserted conjunction`);
  }
  for (const measure of operator.groundMeasures) {
    const relation = relationById.get(`ground/${operator.id}/${encodeURIComponent(measure)}`);
    assert.ok(relation, `${operator.id}: grounding relation for ${measure}`);
    assert.deepEqual(relation.targets, [`measure:${measure}`], `${relation.id}: measures must not become an asserted conjunction`);
  }
}
for (const middle of [...middleRegister.middles, ...middleRegister.crossCuttingMiddles]) {
  assert.ok(relationById.has(`middle/${middle.id}`), `${middle.id}: relation`);
}

for (const declaredPath of atlas.declaredPaths) {
  const members = declaredPath.relations.map((id) => {
    assert.ok(relationById.has(id), `${declaredPath.id}: unknown relation ${id}`);
    return relationById.get(id);
  });
  for (let index = 0; index < members.length - 1; index += 1) {
    const shared = members[index].targets.filter((target) => members[index + 1].sources.includes(target));
    assert.ok(shared.length > 0, `${declaredPath.id}: ${members[index].id} cannot feed ${members[index + 1].id}`);
  }
}

const positivePolarities = new Set(["candidate", "supports", "entails", "equivalent"]);
const signatures = new Map();
for (const relation of relations) {
  const signature = JSON.stringify({
    sources: [...relation.sources].sort(),
    targets: [...relation.targets].sort(),
    predicate: relation.predicate,
    conditions: [...relation.conditions].sort()
  });
  const polarityClass = relation.family === "negative" ? "negative" : positivePolarities.has(relation.polarity) ? "positive" : "open";
  const prior = signatures.get(signature) ?? new Set();
  prior.add(polarityClass);
  signatures.set(signature, prior);
}
for (const [signature, classes] of signatures) {
  assert.ok(!(classes.has("positive") && classes.has("negative")), `undeclared contradiction ${signature}`);
}

const composition = composeRelations(relationById.get("middle/MM-04"), relationById.get("middle/MM-05"), relations);
assert.equal(composition.admissible, true);
assert.deepEqual(composition.sharedPorts, ["op:O05"]);
assert.deepEqual(composition.composite.trace, ["middle/MM-04", "middle/MM-05"]);

const projection = projectedPaths(loaded, "op:O06", "op:O07", 1);
assert.equal(projection.paths.length, 1);
assert.deepEqual(projection.paths[0].steps[0].unmetHyperedgeInputs, ["op:O03", "op:O09"]);

assert.equal(relationById.get("negative/access-not-phenomenality").polarity, "does_not_imply");
assert.equal(relationById.get("unknown-access-to-phenomenality").family, "unknown");
assert.equal(relationById.get("middle/MM-X02").targets[0], "residue:phenomenal_status");

console.log(
  `Brain relationship atlas: PASS nodes=${nodes.length}; relations=${relations.length}; ` +
  `hyperedges=${relations.filter((relation) => relation.sources.length > 1 || relation.targets.length > 1).length}; ` +
  `negative=${relations.filter((relation) => relation.family === "negative").length}; ` +
  `unknown=${relations.filter((relation) => relation.family === "unknown").length}`
);
