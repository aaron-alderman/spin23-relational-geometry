import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadMathematicalGroupCatalogue } from "../../scripts/query-mathematical-group-catalogue.mjs";

const root = process.cwd();
const catalogue = loadMathematicalGroupCatalogue(root);
const registerPath = "corpus/programmes/mathematical-group-atlas/mathematical_group_map_register_v1.json";
const register = JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));

assert.equal(register.schema, "mathematical-group-map-register/1");
assert.equal(register.basis.catalogueDate, catalogue.date);
assert.equal(register.basis.algorithmVersion, "2");
assert.match(register.authority, /not_a_substitute/);

const groups = new Set(catalogue.groups.map((group) => group.id));
const relations = new Map(catalogue.relationships.map((relation) => [relation.id, relation]));
const sources = new Set(catalogue.sources.map((source) => source.id));
const maps = new Map();

for (const map of register.maps) {
  assert.ok(!maps.has(map.id), `duplicate map ${map.id}`);
  maps.set(map.id, map);
  assert.match(map.id, /^map:/);
  assert.ok(groups.has(map.domain), `${map.id}: unknown domain ${map.domain}`);
  assert.ok(groups.has(map.codomain), `${map.id}: unknown codomain ${map.codomain}`);
  assert.notEqual(map.domain, map.codomain, `${map.id}: identity maps are not emitted by this register`);
  const relation = relations.get(map.relationId);
  assert.ok(relation, `${map.id}: unknown relation ${map.relationId}`);
  assert.equal(map.status, relation.status, `${map.id}: status drift`);
  assert.deepEqual(map.provenance, relation.provenance, `${map.id}: provenance drift`);
  assert.deepEqual(map.witnesses, relation.witnesses, `${map.id}: witness drift`);
  assert.deepEqual(map.caveats, relation.caveats, `${map.id}: caveat drift`);
  assert.equal(map.falsifier, relation.falsifier, `${map.id}: falsifier drift`);
  assert.equal(typeof map.invertible, "boolean");
  assert.equal(typeof map.injective, "boolean");
  assert.equal(typeof map.surjective, "boolean");
  if (map.invertible) assert.ok(map.injective && map.surjective, `${map.id}: invertible map must be bijective`);
  if (["inclusion", "kernel_inclusion", "factor_inclusion", "normal_factor_inclusion", "acting_factor_inclusion", "centralizer_inclusion", "splitting_section"].includes(map.mapType)) {
    assert.equal(map.injective, true, `${map.id}: inclusion must be injective`);
  }
  if (["quotient", "covering", "factor_projection", "semidirect_projection"].includes(map.mapType)) assert.equal(map.surjective, true, `${map.id}: quotient/projection/cover must be surjective`);
}

let expectedMapCount = 0;
const expectedSkipped = new Map();
for (const relation of catalogue.relationships) {
  const roles = Object.groupBy(relation.participants, (participant) => participant.role);
  if (relation.kind === "isomorphism" || relation.kind === "subgroup" || relation.kind === "centralizer" || relation.kind === "homomorphism") expectedMapCount += 1;
  else if (relation.kind === "short_exact_sequence") expectedMapCount += relation.properties.split ? 3 : 2;
  else if (relation.kind === "semidirect_product") expectedMapCount += 3;
  else if (relation.kind === "cover") expectedMapCount += 2;
  else if (relation.kind === "direct_product") expectedMapCount += 2 * roles.factor.length;
  else expectedSkipped.set(relation.kind, (expectedSkipped.get(relation.kind) ?? 0) + 1);
}
assert.equal(maps.size, expectedMapCount, "every map-bearing relationship must emit the expected arrows");
assert.deepEqual(register.skippedRelationshipKinds, Object.fromEntries([...expectedSkipped].sort()), "skipped-kind accounting drift");
assert.equal(register.statistics.maps, maps.size);
assert.equal(register.statistics.establishedMaps, register.maps.filter((map) => ["established", "corpus_established"].includes(map.status)).length);
assert.equal(register.statistics.openMaps, register.maps.filter((map) => map.status === "open").length);

for (const relation of catalogue.relationships.filter((candidate) => candidate.kind === "direct_product")) {
  const factors = relation.participants.filter((participant) => participant.role === "factor");
  const result = relation.participants.find((participant) => participant.role === "result").group;
  factors.forEach((factor, index) => {
    const prefix = `map:${relation.id.replace(/^rel:/, "")}:factor-${index + 1}`;
    const inclusion = maps.get(`${prefix}-inclusion`);
    const projection = maps.get(`${prefix}-projection`);
    assert.ok(inclusion && projection, `${relation.id}: factor ${index + 1} must have inclusion and projection`);
    assert.equal(inclusion.domain, factor.group);
    assert.equal(inclusion.codomain, result);
    assert.equal(projection.domain, result);
    assert.equal(projection.codomain, factor.group);
    assert.equal(inclusion.mapType, "factor_inclusion");
    assert.equal(projection.mapType, "factor_projection");
  });
}
for (const relation of catalogue.relationships.filter((candidate) => candidate.kind === "short_exact_sequence")) {
  const section = maps.get(`map:${relation.id.replace(/^rel:/, "")}:splitting-section`);
  assert.equal(Boolean(section), relation.properties.split, `${relation.id}: splitting-section presence must equal declared split status`);
  if (section) {
    const middle = relation.participants.find((participant) => participant.role === "middle").group;
    const quotient = relation.participants.find((participant) => participant.role === "quotient").group;
    assert.equal(section.domain, quotient);
    assert.equal(section.codomain, middle);
    assert.equal(section.mapType, "splitting_section");
  }
}
for (const relation of catalogue.relationships.filter((candidate) => candidate.kind === "semidirect_product")) {
  const projection = maps.get(`map:${relation.id.replace(/^rel:/, "")}:acting-factor-projection`);
  assert.ok(projection, `${relation.id}: missing canonical projection to acting factor`);
  assert.equal(projection.mapType, "semidirect_projection");
}

const compositionIds = new Set();
for (const composition of register.compositions) {
  assert.ok(!compositionIds.has(composition.id), `duplicate composition ${composition.id}`);
  compositionIds.add(composition.id);
  assert.ok(composition.steps.length >= 2, `${composition.id}: composition must have at least two maps`);
  assert.equal(composition.domain, composition.steps[0].domain, `${composition.id}: domain drift`);
  assert.equal(composition.codomain, composition.steps.at(-1).codomain, `${composition.id}: codomain drift`);
  for (const source of composition.provenance) assert.ok(sources.has(source), `${composition.id}: unknown source ${source}`);
  for (let index = 0; index < composition.steps.length; index += 1) {
    const step = composition.steps[index];
    const map = maps.get(step.mapId);
    assert.ok(map, `${composition.id}: unknown map ${step.mapId}`);
    const inverse = step.direction === "inverse";
    if (inverse) assert.equal(map.invertible, true, `${composition.id}: inverse requires invertible map`);
    assert.equal(step.domain, inverse ? map.codomain : map.domain, `${composition.id}: step domain drift`);
    assert.equal(step.codomain, inverse ? map.domain : map.codomain, `${composition.id}: step codomain drift`);
    if (index > 0) assert.equal(composition.steps[index - 1].codomain, step.domain, `${composition.id}: non-composable seam`);
  }
}
assert.equal(register.statistics.compositions, compositionIds.size);
assert.ok(compositionIds.has("composition:C3-through-C9-extension"), "missing exact-sequence composite through C9");
const c9Composite = register.compositions.find((composition) => composition.id === "composition:C3-through-C9-extension");
assert.equal(c9Composite.domain, "grp:C3");
assert.equal(c9Composite.codomain, "grp:C3");
assert.match(c9Composite.statement, /trivial homomorphism/, "C9 exactness composite must retain its semantics");
assert.ok(compositionIds.has("composition:B3-to-S3-via-mod2-congruence"), "missing braid mod-two congruence composite");
const braidMod2Composite = register.compositions.find((composition) => composition.id === "composition:B3-to-S3-via-mod2-congruence");
assert.equal(braidMod2Composite.domain, "grp:B3Braid");
assert.equal(braidMod2Composite.codomain, "grp:S3");
assert.equal(braidMod2Composite.steps.length, 4, "braid mod-two path must retain all four typed stages");
for (const [prime, compositionId, codomain] of [
  [3, "composition:B3-to-A4-via-mod3-congruence", "grp:A4"],
  [5, "composition:B3-to-A5-via-mod5-congruence", "grp:A5"]
]) {
  assert.ok(compositionIds.has(compositionId), `missing braid mod-${prime} congruence composite`);
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.equal(composition.domain, "grp:B3Braid");
  assert.equal(composition.codomain, codomain);
  assert.equal(composition.steps.length, 4, `braid mod-${prime} path must retain reduction, projectivization and finite-shadow identification`);
  assert.equal(maps.get(composition.steps[2].mapId).mapType, "quotient", `mod-${prime} projectivization must be an explicit quotient map`);

  const factorizationId = `composition:SL2F${prime}-to-${prime === 3 ? "A4-via-PSL2F3" : "A5-via-PSL2F5"}`;
  assert.ok(compositionIds.has(factorizationId), `missing explicit mod-${prime} projective factorization`);
  const factorization = register.compositions.find((candidate) => candidate.id === factorizationId);
  assert.equal(factorization.domain, `grp:SL2F${prime}`);
  assert.equal(factorization.codomain, codomain);
  assert.equal(factorization.steps.length, 2, `mod-${prime} finite-shadow factorization must retain quotient and isomorphism`);
  assert.equal(maps.get(factorization.steps[0].mapId).mapType, "quotient");
  assert.equal(maps.get(factorization.steps[1].mapId).mapType, "isomorphism");
}
for (const [compositionId, domain, codomain] of [
  ["composition:C3-through-C6-to-C2", "grp:C3", "grp:C2"],
  ["composition:C2-through-C6-to-C3", "grp:C2", "grp:C3"]
]) {
  assert.ok(compositionIds.has(compositionId), `missing cyclic exactness composite ${compositionId}`);
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, codomain);
  assert.equal(composition.steps.length, 2);
  assert.match(composition.statement, /trivial homomorphism/, `${compositionId} must preserve exactness semantics`);
}

for (const [compositionId, codomain, steps] of [
  ["composition:Sp4Z-to-Sp4R-via-Sp4Q", "grp:Sp4R", 2],
  ["composition:Sp4Z-to-GL4Q-via-Sp4Q", "grp:GL4Q", 2],
  ["composition:Sp4Z-to-GL4R-via-ambient-scalar-extension", "grp:GL4R", 3]
]) {
  assert.ok(compositionIds.has(compositionId), `missing scalar-extension composite ${compositionId}`);
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.equal(composition.domain, "grp:Sp4Z");
  assert.equal(composition.codomain, codomain);
  assert.equal(composition.steps.length, steps);
  assert.ok(composition.steps.every((step) => maps.get(step.mapId).mapType === "inclusion"));
}

for (const [compositionId, domain, codomain, mapTypes] of [
  ["composition:C3-to-Sp4R-via-U11", "grp:C3", "grp:Sp4R", ["inclusion", "inclusion"]],
  ["composition:SU11-to-Sp4R-via-U11", "grp:SU1_1", "grp:Sp4R", ["inclusion", "inclusion"]],
  ["composition:SU11-through-U11-determinant", "grp:SU1_1", "grp:U1", ["kernel_inclusion", "quotient"]],
  ["composition:SU4-through-U4-determinant", "grp:SU4", "grp:U1", ["kernel_inclusion", "quotient"]]
]) {
  assert.ok(compositionIds.has(compositionId), `missing unitary-seam composite ${compositionId}`);
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, codomain);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), mapTypes);
}
for (const compositionId of ["composition:SU11-through-U11-determinant", "composition:SU4-through-U4-determinant"]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.match(composition.statement, /trivial homomorphism/, `${compositionId} must preserve exactness semantics`);
}
for (const [compositionId, domain, codomain, mapTypes] of [
  ["composition:SU4-to-U4-via-H4mu3", "grp:SU4", "grp:U4", ["kernel_inclusion", "inclusion"]],
  ["composition:SU4-through-H4mu3-determinant", "grp:SU4", "grp:C3", ["kernel_inclusion", "quotient"]],
  ["composition:C3-to-U4-via-H4mu3", "grp:C3", "grp:U4", ["factor_inclusion", "inclusion"]],
  ["composition:C9-to-U4-via-H4mu3", "grp:C9", "grp:U4", ["inclusion", "inclusion"]],
  ["composition:C9-through-H4mu3-component", "grp:C9", "grp:C3", ["inclusion", "quotient"]],
  ["composition:C9-cube-kernel-through-H4mu3-component", "grp:C3", "grp:C3", ["kernel_inclusion", "inclusion", "quotient"]]
]) {
  assert.ok(compositionIds.has(compositionId), `missing finite-component composite ${compositionId}`);
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, codomain);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), mapTypes);
}
assert.match(register.compositions.find((candidate) => candidate.id === "composition:SU4-through-H4mu3-determinant").statement, /trivial homomorphism/, "H4mu3 exactness composite must retain its semantics");
assert.match(register.compositions.find((candidate) => candidate.id === "composition:C9-through-H4mu3-component").statement, /surjective component quotient/, "the C9 component composite must retain quotient semantics");
assert.match(register.compositions.find((candidate) => candidate.id === "composition:C9-cube-kernel-through-H4mu3-component").statement, /trivial homomorphism/, "the cube kernel must be annihilated by the ambient component projection");

for (const [compositionId, domain, codomain, mapTypes] of [
  ["composition:C3-to-U1U1-via-C3U1", "grp:C3", "grp:U1xU1", ["factor_inclusion", "inclusion"]],
  ["composition:U1-to-U1U1-via-C3U1", "grp:U1", "grp:U1xU1", ["factor_inclusion", "inclusion"]],
  ["composition:C6-to-U1U1-via-C3U1", "grp:C6", "grp:U1xU1", ["inclusion", "inclusion"]]
]) {
  assert.ok(compositionIds.has(compositionId), `missing residual-phase composite ${compositionId}`);
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, codomain);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), mapTypes);
}
assert.ok(register.compositions.find((candidate) => candidate.id === "composition:C6-to-U1U1-via-C3U1").caveats.some((caveat) => caveat.includes("not_available_without_the_declared_volume_sewing")), "the sixfold residual composite must retain its conditional gate");

for (const [compositionId, endpoint, expectedMeaning] of [
  ["composition:H4mu3-SU4-factor-roundtrip", "grp:SU4", /identity homomorphism/],
  ["composition:H4mu3-C3-factor-roundtrip", "grp:C3", /identity homomorphism/],
  ["composition:U1U1-first-factor-roundtrip", "grp:U1", /identity homomorphism/]
]) {
  assert.ok(compositionIds.has(compositionId), `missing product roundtrip ${compositionId}`);
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.equal(composition.domain, endpoint);
  assert.equal(composition.codomain, endpoint);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), ["factor_inclusion", "factor_projection"]);
  assert.match(composition.statement, expectedMeaning);
}
const crossProjection = register.compositions.find((candidate) => candidate.id === "composition:H4mu3-SU4-to-C3-cross-projection");
assert.ok(crossProjection, "missing product cross-projection witness");
assert.equal(crossProjection.domain, "grp:SU4");
assert.equal(crossProjection.codomain, "grp:C3");
assert.match(crossProjection.statement, /trivial homomorphism/);

for (const [compositionId, domain] of [
  ["composition:SO012-to-SO023-via-section-stabilizer", "grp:SO0_1_2"],
  ["composition:SO011-to-SO023-via-section-stabilizer", "grp:SO0_1_1"]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing section-stabilizer composite ${compositionId}`);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, "grp:SO0_2_3");
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), ["factor_inclusion", "inclusion"]);
}
const sectionRoundtrip = register.compositions.find((candidate) => candidate.id === "composition:SO012-section-stabilizer-roundtrip");
assert.equal(sectionRoundtrip.domain, "grp:SO0_1_2");
assert.equal(sectionRoundtrip.codomain, "grp:SO0_1_2");
assert.match(sectionRoundtrip.statement, /identity homomorphism/);

for (const [compositionId, domain, mapTypes] of [
  ["composition:SU3-to-SU4-via-U3-global-form", "grp:SU3", ["factor_inclusion", "quotient", "inclusion"]],
  ["composition:U1-to-SU4-via-U3-global-form", "grp:U1", ["factor_inclusion", "quotient", "inclusion"]],
  ["composition:SU3U1-to-SU4-via-U3-global-form", "grp:SU3xU1", ["quotient", "inclusion"]]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing SU4 residual-global-form composite ${compositionId}`);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, "grp:SU4");
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), mapTypes);
}
const su3u1KernelComposite = register.compositions.find((candidate) => candidate.id === "composition:C3-through-SU3U1-quotient");
assert.equal(su3u1KernelComposite.domain, "grp:C3");
assert.equal(su3u1KernelComposite.codomain, "grp:U3");
assert.deepEqual(su3u1KernelComposite.steps.map((step) => maps.get(step.mapId).mapType), ["kernel_inclusion", "quotient"]);
assert.match(su3u1KernelComposite.statement, /trivial homomorphism/);

for (const [compositionId, codomain] of [
  ["composition:Sp4Z-to-F2-via-CRT46", "grp:Sp4F2"],
  ["composition:Sp4Z-to-F23-via-CRT46", "grp:Sp4F23"]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing CRT reduction composite ${compositionId}`);
  assert.equal(composition.domain, "grp:Sp4Z");
  assert.equal(composition.codomain, codomain);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), ["homomorphism", "factor_projection"]);
  assert.match(composition.statement, /equals direct reduction modulo/);
}
for (const [compositionId, endpoint] of [
  ["composition:Sp4F2-CRT46-roundtrip", "grp:Sp4F2"],
  ["composition:Sp4F23-CRT46-roundtrip", "grp:Sp4F23"]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing CRT factor roundtrip ${compositionId}`);
  assert.equal(composition.domain, endpoint);
  assert.equal(composition.codomain, endpoint);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), ["factor_inclusion", "factor_projection"]);
  assert.match(composition.statement, /identity/);
}
for (const [compositionId, domain, codomain, mapTypes] of [
  ["composition:Dic11-to-Sp4F23-via-rank-one-block", "grp:Dic11", "grp:Sp4F23", ["inclusion", "isomorphism", "inclusion"]],
  ["composition:SL2F23-to-Spin5F23-via-symplectic-block", "grp:SL2F23", "grp:Spin5F23", ["isomorphism", "inclusion", "isomorphism"]],
  ["composition:Dic11-to-Spin5F23-via-finite-ladder", "grp:Dic11", "grp:Spin5F23", ["inclusion", "isomorphism", "inclusion", "isomorphism"]]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing finite-23 ladder composite ${compositionId}`);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, codomain);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), mapTypes);
}
for (const prime of ["C2", "C3"]) {
  for (const coordinate of [1, 2]) {
    const primaryId = `composition:${prime}-coordinate${coordinate}-to-C6C6-via-primary-CRT`;
    const invariantId = `composition:${prime}-coordinate${coordinate}-to-C6C6-via-invariant-factor`;
    const primary = register.compositions.find((candidate) => candidate.id === primaryId);
    const invariant = register.compositions.find((candidate) => candidate.id === invariantId);
    assert.ok(primary && invariant, `missing coordinatewise CRT route pair for ${prime} coordinate ${coordinate}`);
    assert.equal(primary.domain, `grp:${prime}`);
    assert.equal(invariant.domain, `grp:${prime}`);
    assert.equal(primary.codomain, "grp:C6xC6");
    assert.equal(invariant.codomain, "grp:C6xC6");
    assert.deepEqual(primary.steps.map((step) => maps.get(step.mapId).mapType), ["factor_inclusion", "factor_inclusion"]);
    assert.deepEqual(invariant.steps.map((step) => maps.get(step.mapId).mapType), ["factor_inclusion", "factor_inclusion"]);
    assert.match(invariant.statement, /agreeing with the primary-CRT route/);
  }
}

for (const [compositionId, firstMap] of [
  ["composition:S3-first-factor-to-OPlus4F2", "map:S3xS3-direct-product:factor-1-inclusion"],
  ["composition:S3-second-factor-to-OPlus4F2", "map:S3xS3-direct-product:factor-2-inclusion"]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing two-triangle orthogonal factor route ${compositionId}`);
  assert.equal(composition.domain, "grp:S3");
  assert.equal(composition.codomain, "grp:OPlus4F2");
  assert.deepEqual(composition.steps.map((step) => step.mapId), [
    firstMap,
    "map:S3WrC2-semidirect-product:normal-factor-inclusion",
    "map:OPlus4F2-iso-S3WrC2:isomorphism"
  ]);
}
const wreathSectionRoundtrip = register.compositions.find((candidate) => candidate.id === "composition:S3WrC2-acting-C2-roundtrip");
assert.equal(wreathSectionRoundtrip.domain, "grp:C2");
assert.equal(wreathSectionRoundtrip.codomain, "grp:C2");
assert.deepEqual(wreathSectionRoundtrip.steps.map((step) => maps.get(step.mapId).mapType), ["acting_factor_inclusion", "semidirect_projection"]);
assert.match(wreathSectionRoundtrip.statement, /identity homomorphism/);
const wreathKernelComposite = register.compositions.find((candidate) => candidate.id === "composition:S3xS3-through-wreath-quotient");
assert.equal(wreathKernelComposite.domain, "grp:S3xS3");
assert.equal(wreathKernelComposite.codomain, "grp:C2");
assert.deepEqual(wreathKernelComposite.steps.map((step) => maps.get(step.mapId).mapType), ["normal_factor_inclusion", "semidirect_projection"]);
assert.match(wreathKernelComposite.statement, /trivial homomorphism/);
for (const coordinate of ["first", "second"]) {
  const roundtrip = register.compositions.find((candidate) => candidate.id === `composition:S3xS3-${coordinate}-factor-roundtrip`);
  assert.equal(roundtrip.domain, "grp:S3");
  assert.equal(roundtrip.codomain, "grp:S3");
  assert.match(roundtrip.statement, /identity homomorphism/);
}
for (const direction of ["first-to-second", "second-to-first"]) {
  const cross = register.compositions.find((candidate) => candidate.id === `composition:S3xS3-${direction}-cross-projection`);
  assert.equal(cross.domain, "grp:S3");
  assert.equal(cross.codomain, "grp:S3");
  assert.match(cross.statement, /trivial homomorphism/);
}

for (const [compositionId, domain] of [
  ["composition:S3-flag-factor-to-OPlus4F2", "grp:S3"],
  ["composition:C2-flag-factor-to-OPlus4F2", "grp:C2"]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing selected-flag factor route ${compositionId}`);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, "grp:OPlus4F2");
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), ["factor_inclusion", "inclusion"]);
}
const matchedAmbientRoute = register.compositions.find((candidate) => candidate.id === "composition:MatchedParity-to-OPlus4F2-via-block-base");
assert.equal(matchedAmbientRoute.domain, "grp:MatchedParityS3S3");
assert.equal(matchedAmbientRoute.codomain, "grp:OPlus4F2");
assert.deepEqual(matchedAmbientRoute.steps.map((step) => maps.get(step.mapId).mapType), ["kernel_inclusion", "normal_factor_inclusion", "isomorphism"]);
assert.match(matchedAmbientRoute.caveats.join(" "), /not_the_order_12_selected_flag_stabilizer/);

for (const [compositionId, domain, codomain, mapTypes, meaning] of [
  ["composition:MatchedParity-through-mismatch-quotient", "grp:MatchedParityS3S3", "grp:C2", ["kernel_inclusion", "quotient"], /trivial homomorphism/],
  ["composition:Mismatch-C2-section-roundtrip", "grp:C2", "grp:C2", ["splitting_section", "quotient"], /identity homomorphism/],
  ["composition:C3C3-through-MatchedParity-quotient", "grp:C3xC3", "grp:C2", ["normal_factor_inclusion", "semidirect_projection"], /trivial homomorphism/],
  ["composition:MatchedParity-C2-section-roundtrip", "grp:C2", "grp:C2", ["acting_factor_inclusion", "semidirect_projection"], /identity homomorphism/]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing matched-parity exactness composite ${compositionId}`);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, codomain);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), mapTypes);
  assert.match(composition.statement, meaning);
}
for (const coordinate of ["first", "second"]) {
  const kernelComposite = register.compositions.find((candidate) => candidate.id === `composition:MatchedParity-${coordinate}-kernel-through-projection`);
  assert.equal(kernelComposite.domain, "grp:C3");
  assert.equal(kernelComposite.codomain, "grp:S3");
  assert.deepEqual(kernelComposite.steps.map((step) => maps.get(step.mapId).mapType), ["kernel_inclusion", "quotient"]);
  assert.match(kernelComposite.statement, /trivial homomorphism/);
  const roundtrip = register.compositions.find((candidate) => candidate.id === `composition:MatchedParity-${coordinate}-projection-roundtrip`);
  assert.equal(roundtrip.domain, "grp:S3");
  assert.equal(roundtrip.codomain, "grp:S3");
  assert.deepEqual(roundtrip.steps.map((step) => maps.get(step.mapId).mapType), ["splitting_section", "quotient"]);
  assert.match(roundtrip.statement, /identity homomorphism/);
  const diagonal = register.compositions.find((candidate) => candidate.id === `composition:DiagonalS3-${coordinate}-projection`);
  assert.equal(diagonal.domain, "grp:S3");
  assert.equal(diagonal.codomain, "grp:S3");
  assert.deepEqual(diagonal.steps.map((step) => maps.get(step.mapId).mapType), ["inclusion", "quotient"]);
  assert.match(diagonal.statement, /identity homomorphism/);
}

for (const [compositionId, domain, codomain, mapTypes, meaning] of [
  ["composition:S3-C3-kernel-through-sign", "grp:C3", "grp:C2", ["kernel_inclusion", "quotient"], /trivial homomorphism/],
  ["composition:S3-C2-section-roundtrip", "grp:C2", "grp:C2", ["splitting_section", "quotient"], /identity homomorphism/]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing C3 inversion-extension composite ${compositionId}`);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, codomain);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), mapTypes);
  assert.match(composition.statement, meaning);
}

for (const [compositionId, domain, codomain, mapTypes] of [
  ["composition:Tits-to-B-via-full-automorphism-product", "grp:Tits", "grp:B", ["kernel_inclusion", "factor_inclusion", "inclusion"]],
  ["composition:TitsAut-to-B-via-product", "grp:TitsAut", "grp:B", ["factor_inclusion", "inclusion"]],
  ["composition:S4-to-B-via-Tits-local-product", "grp:S4", "grp:B", ["factor_inclusion", "inclusion"]],
  ["composition:C2-to-M-via-2B-central-kernel", "grp:C2", "grp:M", ["kernel_inclusion", "inclusion"]],
  ["composition:Tits-to-M-via-compatible-2B-lift", "grp:Tits", "grp:M", ["inclusion", "inclusion"]],
  ["composition:Tits-preimage-to-M-via-2B", "grp:C2xTits", "grp:M", ["inclusion", "inclusion"]]
]) {
  const composition = register.compositions.find((candidate) => candidate.id === compositionId);
  assert.ok(composition, `missing Monster--Baby--Tits composite ${compositionId}`);
  assert.equal(composition.domain, domain);
  assert.equal(composition.codomain, codomain);
  assert.deepEqual(composition.steps.map((step) => maps.get(step.mapId).mapType), mapTypes);
}
assert.equal([...maps.values()].some((map) => map.domain === "grp:B" && map.codomain === "grp:M"), false, "the stable map register must not invent B -> M by reversing the quotient 2.B -> B");

console.log(
  `Mathematical group map register: PASS maps=${maps.size}; kinds=${register.mapKinds.length}; ` +
  `compositions=${compositionIds.size}; skippedKinds=${Object.keys(register.skippedRelationshipKinds).length}`
);
