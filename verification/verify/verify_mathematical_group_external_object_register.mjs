import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadMathematicalGroupCatalogue } from "../../scripts/query-mathematical-group-catalogue.mjs";

const root = process.cwd();
const registerPath = path.join(root, "corpus/programmes/mathematical-group-atlas/mathematical_group_external_object_register_v1.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
const catalogue = loadMathematicalGroupCatalogue(root);
const monsterBabyTitsOccurrences = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/mathematical-group-atlas/monster_baby_tits_occurrence_register_v1.json"), "utf8"));

assert.equal(register.schema, "mathematical-group-external-object-register/1");
assert.match(register.authority, /typed_boundary_register/);
const groupIds = new Set(catalogue.groups.map((group) => group.id));
const sourceIds = new Set(catalogue.sources.map((source) => source.id));
const objectKinds = new Set(register.objectKinds);
const objectIds = new Set();
const objectsById = new Map();
const relationIds = new Set();

for (const object of register.objects) {
  assert.ok(!objectIds.has(object.id), `duplicate external object ${object.id}`);
  objectIds.add(object.id);
  objectsById.set(object.id, object);
  assert.ok(objectKinds.has(object.kind), `${object.id}: unknown object kind ${object.kind}`);
  assert.ok(["established", "corpus_established", "open", "negative"].includes(object.status), `${object.id}: invalid status`);
  assert.ok(object.name && object.notation, `${object.id}: missing identity fields`);
  for (const sourceId of object.provenance) assert.ok(sourceIds.has(sourceId), `${object.id}: unknown source ${sourceId}`);
}

for (const relation of register.relations) {
  assert.ok(!relationIds.has(relation.id), `duplicate external relation ${relation.id}`);
  relationIds.add(relation.id);
  const requiredRoles = register.relationKinds[relation.kind];
  assert.ok(requiredRoles, `${relation.id}: unknown relation kind ${relation.kind}`);
  const actualRoles = relation.participants.map((participant) => participant.role);
  for (const role of requiredRoles) assert.ok(actualRoles.includes(role), `${relation.id}: missing role ${role}`);
  for (const participant of relation.participants) {
    assert.ok(["group", "object"].includes(participant.refType), `${relation.id}: invalid ref type`);
    const known = participant.refType === "group" ? groupIds.has(participant.ref) : objectIds.has(participant.ref);
    assert.ok(known, `${relation.id}: unknown ${participant.refType} ${participant.ref}`);
  }
  for (const sourceId of relation.provenance) assert.ok(sourceIds.has(sourceId), `${relation.id}: unknown source ${sourceId}`);
  assert.ok(relation.statement && relation.falsifier, `${relation.id}: incomplete claim boundary`);
  for (const evidence of relation.evidence ?? []) {
    const absolute = path.join(root, evidence.path);
    assert.ok(fs.existsSync(absolute), `${relation.id}: missing evidence ${evidence.path}`);
    const lineCount = fs.readFileSync(absolute, "utf8").split(/\r?\n/).length;
    assert.ok(Number.isInteger(evidence.line) && evidence.line >= 1 && evidence.line <= lineCount, `${relation.id}: invalid evidence line`);
  }
  if (relation.kind === "homogeneous_space_quotient") {
    const ambient = relation.participants.find((participant) => participant.role === "ambient_group");
    const stabilizer = relation.participants.find((participant) => participant.role === "stabilizer_group");
    const subgroup = catalogue.relationships.find((candidate) => candidate.kind === "subgroup"
      && candidate.participants.some((participant) => participant.role === "subgroup" && participant.group === stabilizer.ref)
      && candidate.participants.some((participant) => participant.role === "supergroup" && participant.group === ambient.ref));
    assert.ok(subgroup, `${relation.id}: quotient requires a catalogued stabilizer inclusion`);
  }
  if (relation.kind === "bundle_over") {
    const bundle = relation.participants.find((participant) => participant.role === "bundle");
    const base = relation.participants.find((participant) => participant.role === "base");
    assert.equal(bundle.refType, "object", `${relation.id}: bundle must be an external object`);
    assert.equal(objectsById.get(bundle.ref)?.kind, "vector_bundle", `${relation.id}: bundle role must reference a vector bundle`);
    assert.equal(base.refType, "object", `${relation.id}: base must be an external object`);
    assert.ok(["homogeneous_space", "finite_coset_space"].includes(objectsById.get(base.ref)?.kind), `${relation.id}: unsupported bundle base kind`);
  }
  if (relation.kind === "object_has_underlying_group") {
    const object = relation.participants.find((participant) => participant.role === "object");
    const group = relation.participants.find((participant) => participant.role === "group");
    assert.equal(object.refType, "object", `${relation.id}: object role must reference an external object`);
    assert.equal(group.refType, "group", `${relation.id}: group role must reference a catalogue group`);
  }
  if (relation.kind === "space_isomorphism") {
    const spaces = relation.participants.filter((participant) => ["left", "right"].includes(participant.role));
    assert.equal(spaces.length, 2, `${relation.id}: space isomorphism requires two endpoints`);
    for (const space of spaces) {
      assert.equal(space.refType, "object", `${relation.id}: space endpoint must be an external object`);
      assert.ok(["homogeneous_space", "finite_coset_space"].includes(objectsById.get(space.ref)?.kind), `${relation.id}: endpoint is not a typed space`);
    }
  }
}

const restriction = register.relations.find((relation) => relation.id === "extrel:E6-27-restricts-Spin10U1");
const dimensions = new Map([
  ["obj:rep:Spin10HalfSpin16", 16],
  ["obj:rep:Spin10Vector10", 10],
  ["obj:rep:Spin10Trivial1", 1]
]);
assert.equal(restriction.properties.summands.reduce((sum, item) => sum + dimensions.get(item.object) * Number(item.multiplicity), 0), 27, "E6 branching dimension mismatch");

const hecke = register.relations.find((relation) => relation.id === "extrel:Hecke-S5-WE6-S5");
const heckeDimension = Number(hecke.properties.scalarBlocks)
  + Number(hecke.properties.matrix2Blocks) * 2 ** 2
  + Number(hecke.properties.matrix3Blocks) * 3 ** 2;
assert.equal(heckeDimension, Number(hecke.properties.dimension), "Hecke block dimensions do not sum to algebra dimension");
assert.equal(Number(hecke.properties.centerDimension), Number(hecke.properties.scalarBlocks) + Number(hecke.properties.matrix2Blocks) + Number(hecke.properties.matrix3Blocks), "Hecke center dimension does not equal the number of simple blocks");
assert.equal(Number(hecke.properties.commutatorDimension), Number(hecke.properties.dimension) - Number(hecke.properties.centerDimension), "Hecke commutator complement mismatch");

const permutation = register.relations.find((relation) => relation.id === "extrel:WE6-permutation-module-432");
const coset = register.relations.find((relation) => relation.id === "extrel:WE6-quotient-S5-432");
assert.equal(Number(permutation.properties.dimension), Number(coset.properties.cardinality), "permutation dimension must match coset cardinality");

const tangentHom = register.relations.find((relation) => relation.id === "extrel:CP2-tangent-is-HomLQ");
const bundleRanks = tangentHom.participants.map((participant) => register.relations.find((relation) => relation.kind === "bundle_over"
  && relation.participants.some((candidate) => candidate.role === "bundle" && candidate.ref === participant.ref))?.properties?.complexRank);
assert.deepEqual(bundleRanks, ["2", "2"], "CP2 tangent/Hom bundle ranks must agree");

const crossPrimeUnderlying = register.relations.find((relation) => relation.id === "extrel:CrossPrimeA-underlying-C6C6");
assert.equal(crossPrimeUnderlying.properties.order, "36");
assert.equal(crossPrimeUnderlying.properties.exponent, "6");
assert.equal(crossPrimeUnderlying.properties.primaryDecomposition, "V4_times_C3xC3");
assert.ok(crossPrimeUnderlying.caveats.some((caveat) => caveat.includes("not_an_isomorphism_of_finite_quadratic_modules")), "forgetting q must not preserve the refined object");
const crossPrimeDiscriminant = register.relations.find((relation) => relation.id === "extrel:CrossPrimeA-discriminant-of-L");
assert.equal(crossPrimeDiscriminant.properties.latticeRank, "4");
assert.equal(crossPrimeDiscriminant.properties.latticeSignature, "(1,3)");
assert.equal(crossPrimeDiscriminant.properties.determinant, "-36");
assert.equal(crossPrimeDiscriminant.properties.normalizedGaussSum, "-i");
assert.ok(crossPrimeDiscriminant.caveats.some((caveat) => caveat.includes("not_an_asserted_spacetime")), "Lorentzian lattice realization must retain its physical boundary");
assert.equal(objectsById.get("obj:fqm:CrossPrimePhaseModule").kind, "finite_quadratic_module");
assert.equal(objectsById.get("obj:lattice:CrossPrimeLorentzianL").kind, "even_lattice");

const compactLieIso = register.relations.find((relation) => relation.id === "extrel:sp2Compact-isomorphic-so5Compact");
assert.equal(compactLieIso.properties.realForm, "compact", "compact B2/C2 Lie-algebra seam must retain its real form");
for (const id of ["obj:lie:sp2Compact", "obj:lie:so5Compact"]) {
  assert.ok(objectsById.get(id).caveats.some((caveat) => caveat.includes("compact")), `${id}: compact/split boundary missing`);
}
assert.ok(!register.relations.some((relation) => relation.kind === "lie_algebra_isomorphism"
  && ["obj:lie:sp2Compact", "obj:lie:so5Compact"].some((id) => relation.participants.some((participant) => participant.ref === id))
  && ["obj:lie:sp4R", "obj:lie:so23"].some((id) => relation.participants.some((participant) => participant.ref === id))),
"compact and split real Lie algebras must not be identified merely through their common complexification");
assert.ok(register.relations.some((relation) => relation.id === "extrel:Spin5-root-B2"));
assert.ok(register.relations.some((relation) => relation.id === "extrel:Sp2Compact-root-C2"));

const rankOneLieIso = register.relations.find((relation) => relation.id === "extrel:sl2R-isomorphic-so12");
assert.equal(rankOneLieIso.properties.typeIdentity, "A1", "rank-one split Lie-algebra seam must retain type A1");
assert.equal(rankOneLieIso.properties.realForm, "split", "rank-one split Lie-algebra seam must retain its real form");
assert.ok(register.relations.some((relation) => relation.id === "extrel:Spin012-root-A1"));
assert.ok(register.relations.some((relation) => relation.id === "extrel:SL2R-root-A1"));
const unitaryRankOneLieIso = register.relations.find((relation) => relation.id === "extrel:su11-isomorphic-sl2R");
assert.equal(unitaryRankOneLieIso.properties.typeIdentity, "A1", "SU(1,1)/SL(2,R) Lie-algebra seam must retain type A1");
assert.ok(unitaryRankOneLieIso.caveats.some((caveat) => caveat.includes("compact_real_form_su2")), "SU(1,1) must remain distinct from compact SU(2)");

const conformalLieIso = register.relations.find((relation) => relation.id === "extrel:su22-isomorphic-so24");
assert.equal(conformalLieIso.properties.typeIdentity, "A3_equals_D3", "SU(2,2)/Spin(2,4) Lie-algebra seam must retain A3 = D3");
assert.equal(conformalLieIso.properties.realForm, "conformal_2_4", "SU(2,2)/Spin(2,4) seam must retain its real form");
const su33Root = register.relations.find((relation) => relation.id === "extrel:SU33-root-A5");
assert.ok(su33Root, "SU(3,3) must retain its A5 root-system relation");
assert.ok(su33Root.caveats.some((caveat) => caveat.includes("does_not_activate")), "SU(3,3) root data must not imply physical activation");
assert.ok(objectsById.get("obj:lie:su33").caveats.some((caveat) => caveat.includes("does_not_by_itself_establish")), "su(3,3) carrier algebra must retain the physical-activation boundary");

const lockingOrbit = register.relations.find((relation) => relation.id === "extrel:SO3SO2-quotient-SO2diag-locking-orbit");
assert.equal(lockingOrbit.properties.realDimension, "3", "locking homogeneous orbit must have dimension 3 + 1 - 1 = 3");
assert.ok(lockingOrbit.caveats.some((caveat) => caveat.includes("not_a_group_quotient")), "nonnormal diagonal stabilizer must not be treated as a quotient group");
assert.equal(objectsById.get("obj:space:SO3xSO2modSO2diag").kind, "homogeneous_space");

const specialBlockCP2 = register.relations.find((relation) => relation.id === "extrel:SU3-quotient-SU1U2-CP2");
assert.equal(specialBlockCP2.properties.realDimension, "4", "SU3/S(U1xU2) must retain CP2 real dimension four");
assert.ok(specialBlockCP2.caveats.some((caveat) => caveat.includes("not_a_quotient_group")), "nonnormal CP2 stabilizer must remain a homogeneous-space quotient");
const fullUnitaryCP2 = register.relations.find((relation) => relation.id === "extrel:U3-quotient-U1U2-CP2");
assert.equal(fullUnitaryCP2.properties.realDimension, "4", "U3/(U1xU2) must retain CP2 real dimension four");
assert.equal(fullUnitaryCP2.properties.complexDimension, "2", "the full-unitary presentation must retain CP2 complex dimension two");
assert.ok(fullUnitaryCP2.caveats.some((caveat) => caveat.includes("not_a_quotient_group")), "the U1xU2 line stabilizer must not produce a quotient group");
assert.notDeepEqual(
  fullUnitaryCP2.participants.filter((participant) => participant.refType === "group").map((participant) => participant.ref),
  specialBlockCP2.participants.filter((participant) => participant.refType === "group").map((participant) => participant.ref),
  "the U3 and SU3 presentations of CP2 must retain their distinct ambient and stabilizer groups"
);

const unitDisk = register.relations.find((relation) => relation.id === "extrel:U11-quotient-U1U1-UnitDisk");
assert.equal(unitDisk.properties.realDimension, "2", "U(1,1)/(U1xU1) must retain real dimension two");
assert.equal(unitDisk.properties.complexDimension, "1", "the unit disk must retain complex dimension one");
assert.ok(unitDisk.caveats.some((caveat) => caveat.includes("not_a_quotient_group")), "the nonnormal maximal compact stabilizer must not produce a quotient group");
assert.equal(objectsById.get("obj:space:UnitDisk").kind, "homogeneous_space");

const sectionOrbit = register.relations.find((relation) => relation.id === "extrel:SO023-quotient-SO012SO011-SectionOrbit");
assert.equal(sectionOrbit.properties.ambientDimension, "10");
assert.equal(sectionOrbit.properties.stabilizerDimension, "4");
assert.equal(sectionOrbit.properties.realDimension, "6", "signature-(1,2) section orbit must retain dimension 10 - 4 = 6");
assert.ok(sectionOrbit.caveats.some((caveat) => caveat.includes("not_a_quotient_group")), "the nonnormal block stabilizer must remain a homogeneous-space quotient");
assert.ok(sectionOrbit.caveats.some((caveat) => caveat.includes("spin_cover")), "the SO orbit must not silently choose a spin lift");
assert.equal(objectsById.get("obj:space:Signature12SectionsR23").kind, "homogeneous_space");

const monsterVoa = objectsById.get("obj:voa:MonsterVnatural");
const isingVir = objectsById.get("obj:vir:IsingHalf");
const babyMonsterVoa = objectsById.get("obj:voa:BabyMonsterCommutant");
assert.equal(monsterVoa.properties.centralCharge, "24");
assert.equal(isingVir.properties.centralCharge, "1/2");
assert.equal(babyMonsterVoa.properties.centralCharge, "47/2");
assert.equal(2 * Number(monsterVoa.properties.centralCharge) - 1, 47, "Moonshine central charge must split as 1/2 plus 47/2");
assert.ok(register.relations.some((relation) => relation.id === "extrel:BabyMonsterVOA-commutant-Ising"));
assert.ok(register.relations.some((relation) => relation.id === "extrel:Ising-Miyamoto-2A-centralizer-2B"));

const monsterGriessRestriction = register.relations.find((relation) => relation.id === "extrel:MonsterGriess-restricts-2B");
const monsterGriessDimension = monsterGriessRestriction.properties.summands.reduce((sum, summand) => {
  const dimension = Number(objectsById.get(summand.object).properties.dimension);
  return sum + dimension * Number(summand.multiplicity);
}, 0);
assert.equal(monsterGriessDimension, 196884, "2.B summands must exhaust the Monster Griess space");
assert.equal(objectsById.get("obj:rep:2B96256Minus").properties.central2AAction, "-1");
assert.ok(objectsById.get("obj:rep:2B96256Minus").caveats.some((caveat) => caveat.includes("does_not_descend")), "negative central action must block descent to B");
assert.equal(Number(objectsById.get("obj:rep:BabyMonsterGriess96256").properties.dimension), 1 + 96255);

const occurrenceIds = new Set(monsterBabyTitsOccurrences.occurrences.map((occurrence) => occurrence.id));
for (const relationId of ["extrel:BabyMonsterGriess-restrict-Tits-open", "extrel:MonsterGriess-restrict-compatible-Tits-open"]) {
  const relation = register.relations.find((candidate) => candidate.id === relationId);
  assert.equal(relation.status, "open", `${relationId}: restriction must remain open until character branching is computed`);
  assert.ok(occurrenceIds.has(relation.properties.occurrenceId), `${relationId}: unknown occurrence ${relation.properties.occurrenceId}`);
}

console.log(`Mathematical group external-object register: PASS objects=${objectIds.size}; relations=${relationIds.size}; kinds=${new Set(register.relations.map((relation) => relation.kind)).size}`);
