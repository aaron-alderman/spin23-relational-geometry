import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { loadMathematicalGroupCatalogue, resolveGroup, findPaths } from "../../scripts/query-mathematical-group-catalogue.mjs";

const root = process.cwd();
const catalogue = loadMathematicalGroupCatalogue(root);

assert.equal(catalogue.schema, "mathematical-group-catalogue/1");
assert.match(catalogue.authority, /not_exhaustive/);
assert.match(catalogue.scope.absenceRule, /not_catalogued/);
assert.ok(Array.isArray(catalogue.reopenConditions) && catalogue.reopenConditions.length >= 6);

const sourceIds = new Set();
for (const source of catalogue.sources) {
  assert.ok(!sourceIds.has(source.id), `duplicate source ${source.id}`);
  sourceIds.add(source.id);
  assert.ok(source.title && source.authorityNote, `${source.id}: incomplete source`);
  if (source.path) assert.ok(fs.existsSync(path.join(root, source.path)), `${source.id}: missing local source ${source.path}`);
  if (source.url) assert.match(source.url, /^https:\/\//, `${source.id}: invalid URL`);
}

const familyIds = new Set(catalogue.families.map((family) => family.id));
assert.equal(familyIds.size, catalogue.families.length, "family ids unique");
const cfsgBranchIds = new Set(catalogue.cfsg.branches.map((branch) => branch.id));
const groupById = new Map();
const aliases = new Map();
for (const group of catalogue.groups) {
  assert.ok(!groupById.has(group.id), `duplicate group ${group.id}`);
  groupById.set(group.id, group);
  assert.match(group.id, /^grp:/, `${group.id}: namespace`);
  assert.ok(group.name && group.notation && group.kind, `${group.id}: identity fields`);
  assert.ok(group.order === null || /^\d+$/.test(group.order), `${group.id}: order must be decimal string or null`);
  for (const familyId of group.familyIds) assert.ok(familyIds.has(familyId), `${group.id}: unknown family ${familyId}`);
  for (const branchId of group.cfsgBranchIds ?? []) assert.ok(cfsgBranchIds.has(branchId), `${group.id}: unknown CFSG branch ${branchId}`);
  if (group.kind === "finite" && group.simple === true) assert.equal((group.cfsgBranchIds ?? []).length, 1, `${group.id}: finite simple group needs one canonical CFSG branch`);
  for (const alias of [group.id, group.name, group.notation, ...group.aliases]) {
    const key = alias.toLowerCase();
    const prior = aliases.get(key) ?? [];
    prior.push(group.id);
    aliases.set(key, prior);
  }
}
for (const [alias, ids] of aliases) assert.equal(new Set(ids).size, 1, `ambiguous exact alias ${alias}: ${ids.join(",")}`);

assert.equal(catalogue.cfsg.branches.length, 4);
assert.equal(catalogue.cfsg.branches.find((branch) => branch.id === "cfsg:lie-type").families.length, 16);
assert.equal(catalogue.cfsg.branches.find((branch) => branch.id === "cfsg:sporadic").members.length, 26);
for (const sourceId of catalogue.cfsg.provenance) assert.ok(sourceIds.has(sourceId), `CFSG unknown provenance ${sourceId}`);

const relationById = new Map();
const roleMap = (relation) => Object.groupBy(relation.participants, (participant) => participant.role);
const order = (id) => groupById.get(id).order === null ? null : BigInt(groupById.get(id).order);
for (const relation of catalogue.relationships) {
  assert.ok(!relationById.has(relation.id), `duplicate relation ${relation.id}`);
  relationById.set(relation.id, relation);
  assert.ok(Object.hasOwn(catalogue.relationshipKinds, relation.kind), `${relation.id}: unknown kind ${relation.kind}`);
  assert.ok(catalogue.statusVocabulary.includes(relation.status), `${relation.id}: unknown status`);
  assert.ok(relation.statement && relation.falsifier, `${relation.id}: statement/falsifier`);
  assert.ok(Array.isArray(relation.witnesses) && Array.isArray(relation.caveats), `${relation.id}: witnesses/caveats`);
  assert.ok(relation.status === "open" || relation.witnesses.length > 0, `${relation.id}: established or negative relation needs witness`);
  for (const sourceId of relation.provenance) assert.ok(sourceIds.has(sourceId), `${relation.id}: unknown source ${sourceId}`);
  for (const participant of relation.participants) assert.ok(groupById.has(participant.group), `${relation.id}: unknown group ${participant.group}`);
  const roles = roleMap(relation);
  for (const requiredRole of new Set(catalogue.relationshipKinds[relation.kind])) {
    assert.ok(roles[requiredRole]?.length, `${relation.id}: missing role ${requiredRole}`);
  }

  if (relation.kind === "isomorphism") {
    const left = order(roles.left[0].group);
    const right = order(roles.right[0].group);
    if (left !== null && right !== null) assert.equal(left, right, `${relation.id}: isomorphic finite groups need equal order`);
  }
  if (relation.kind === "subgroup") {
    const sub = order(roles.subgroup[0].group);
    const sup = order(roles.supergroup[0].group);
    if (sub !== null && sup !== null) {
      assert.equal(sup % sub, 0n, `${relation.id}: subgroup order must divide supergroup order`);
      if (relation.properties.index) assert.equal(BigInt(relation.properties.index), sup / sub, `${relation.id}: wrong index`);
    }
  }
  if (relation.kind === "short_exact_sequence") {
    const kernel = order(roles.kernel[0].group);
    const middle = order(roles.middle[0].group);
    const quotient = order(roles.quotient[0].group);
    if (kernel !== null && middle !== null && quotient !== null) assert.equal(middle, kernel * quotient, `${relation.id}: |middle| != |kernel||quotient|`);
    assert.equal(typeof relation.properties.split, "boolean", `${relation.id}: split must be explicit`);
    assert.equal(typeof relation.properties.central, "boolean", `${relation.id}: central must be explicit`);
  }
  if (relation.kind === "direct_product") {
    const factors = roles.factor.map((participant) => order(participant.group));
    const result = order(roles.result[0].group);
    if (result !== null && factors.every((value) => value !== null)) {
      assert.equal(result, factors.reduce((product, value) => product * value, 1n), `${relation.id}: product order mismatch`);
    }
  }
  if (relation.kind === "cover") {
    assert.ok(/^\d+$/.test(relation.properties.degree), `${relation.id}: cover degree`);
    const cover = order(roles.cover[0].group);
    const base = order(roles.base[0].group);
    if (cover !== null && base !== null) assert.equal(cover, base * BigInt(relation.properties.degree), `${relation.id}: cover order mismatch`);
  }
  if (relation.kind === "weyl_group") assert.ok(relation.caveats.some((caveat) => caveat.includes("not_a_quotient_of_all")), `${relation.id}: Weyl quotient boundary missing`);
  if (relation.kind === "composition_factor") {
    assert.equal(groupById.get(roles.factor[0].group).simple, true, `${relation.id}: composition factor must be simple`);
    assert.match(relation.properties.multiplicity, /^[1-9]\d*$/, `${relation.id}: positive multiplicity required`);
  }
}

assert.equal(resolveGroup(catalogue, "A5")[0].id, "grp:A5");
assert.equal(resolveGroup(catalogue, "Monster")[0].id, "grp:M");
assert.ok(relationById.get("rel:S3xPSp-candidate-WE8").status === "open");
assert.ok(relationById.get("rel:Spin023-not-subgroup-M").status === "negative");
const pathResult = findPaths(catalogue, "grp:Q8", "grp:A4", 3);
assert.ok(pathResult.paths.some((candidate) => candidate.nodes.includes("grp:SL2F3")), "expected Q8 -> SL2F3 -> A4 incidence path");

const q23 = 23n;
assert.equal(order("grp:SL2F23"), q23 * (q23 ** 2n - 1n), "SL(2,23) order formula mismatch");
assert.equal(order("grp:Sp2F23"), order("grp:SL2F23"), "Sp(2,23) and SL(2,23) orders must agree");
assert.equal(order("grp:Sp4F23"), q23 ** 4n * (q23 ** 2n - 1n) * (q23 ** 4n - 1n), "Sp(4,23) order formula mismatch");
assert.equal(order("grp:Spin5F23"), order("grp:Sp4F23"), "B2/C2 simply connected orders must agree");
assert.equal(order("grp:Sp4Z46"), order("grp:Sp4F2") * order("grp:Sp4F23"), "Sp(4,Z/46Z) order must be the CRT factor-order product");
const mixedLevelProduct = relationById.get("rel:Sp4Z46-CRT-product");
assert.deepEqual(mixedLevelProduct.properties.coprimeModuli, ["2", "23"], "mixed-level product must retain its CRT primes");
assert.ok(mixedLevelProduct.caveats.some((caveat) => caveat.includes("does_not_identify_the_two_factors")), "CRT factorization must not imply an isomorphism between unequal factors");
for (const [relationId, modulus] of [["rel:Sp4Z-reduction-F2", "2"], ["rel:Sp4Z-reduction-F23", "23"], ["rel:Sp4Z-reduction-Z46", "46"]]) {
  const reduction = relationById.get(relationId);
  assert.equal(reduction.properties.surjective, true, `${relationId}: integral reduction must remain surjective`);
  assert.ok(reduction.properties.map.endsWith(modulus), `${relationId}: reduction modulus mismatch`);
}
const f23Path = findPaths(catalogue, "grp:Dic11", "grp:Spin5F23", 5);
assert.ok(f23Path.paths.some((candidate) => ["grp:SL2F23", "grp:Sp2F23", "grp:Sp4F23"].every((id) => candidate.nodes.includes(id))), "expected complete Dic11-to-Spin5F23 transition path");

const compactIso = relationById.get("rel:Spin5-iso-Sp2Compact");
assert.equal(compactIso.properties.globalForm, "simply_connected", "compact B2/C2 isomorphism must retain global form");
const compactCover = relationById.get("rel:Spin5-cover-SO5");
assert.equal(compactCover.properties.degree, "2", "Spin(5) -> SO(5) must remain a double cover");
assert.ok(compactCover.caveats.some((caveat) => caveat.includes("not_isomorphic")), "compact cover must preserve the global-form non-isomorphism boundary");
assert.ok(!catalogue.relationships.some((relation) => relation.kind === "isomorphism"
  && ["grp:Spin5", "grp:Sp2Compact"].some((id) => relation.participants.some((participant) => participant.group === id))
  && ["grp:Spin0_2_3", "grp:Sp4R"].some((id) => relation.participants.some((participant) => participant.group === id))),
"compact and split real-form groups must not be identified");

const braidSequence = relationById.get("rel:B3-center-quotient-PSL2Z");
assert.equal(braidSequence.properties.central, true, "B3 center quotient must remain central");
assert.equal(braidSequence.properties.split, false, "torsion-free B3 cannot split over PSL(2,Z) torsion generators");
const braidModularPath = findPaths(catalogue, "grp:B3Braid", "grp:PSL2Z", 2);
assert.ok(braidModularPath.paths.some((candidate) => candidate.nodes.includes("grp:SL2Z")), "expected B3 -> SL2Z -> PSL2Z map path");

const rankOneSpinIso = relationById.get("rel:Spin012-iso-SL2R");
assert.equal(rankOneSpinIso.properties.structurePreserved, "real_Lie_group", "Spin(1,2)/SL(2,R) seam must be a real Lie-group isomorphism");
const rankOneCover = relationById.get("rel:Spin012-cover-SO012");
assert.equal(rankOneCover.properties.degree, "2", "Spin_0(1,2) -> SO_0(1,2) must remain a double cover");
assert.equal(rankOneCover.properties.universal, false, "the spin double cover must not be mislabeled as the infinite universal cover");
const rankOneCarrierPath = findPaths(catalogue, "grp:SL2R", "grp:Spin0_2_3", 2);
assert.ok(rankOneCarrierPath.paths.some((candidate) => candidate.nodes.includes("grp:Spin0_1_2")), "expected SL2R -> Spin012 -> Spin023 selected-section path");
const unitaryRankOnePath = findPaths(catalogue, "grp:SU1_1", "grp:Spin0_2_3", 3);
assert.ok(unitaryRankOnePath.paths.some((candidate) => ["grp:SL2R", "grp:Spin0_1_2"].every((id) => candidate.nodes.includes(id))), "expected SU11 -> SL2R -> Spin012 -> Spin023 rank-one triangle path");

const carrierBlock = relationById.get("rel:SU22-subgroup-SU33");
assert.equal(carrierBlock.properties.embedding, "signature_block_diag_A_1_positive_1_negative", "SU(2,2) carrier inclusion must retain its selected signature block");
assert.ok(carrierBlock.caveats.some((caveat) => caveat.includes("physically_active")), "carrier inclusion must not imply physical activation");
const spin24SU22 = relationById.get("rel:Spin024-iso-SU22");
assert.equal(spin24SU22.properties.structurePreserved, "real_Lie_group", "Spin024/SU22 seam must remain a real Lie-group isomorphism");
assert.ok(spin24SU22.caveats.some((caveat) => caveat.includes("global_form")), "Spin024/SU22 isomorphism must retain its global-form boundary");
const carrierLadder = findPaths(catalogue, "grp:Spin0_2_3", "grp:SU3_3", 3);
assert.ok(carrierLadder.paths.some((candidate) => ["grp:Spin0_2_4", "grp:SU2_2"].every((id) => candidate.nodes.includes(id))), "expected Spin023 -> Spin024 -> SU22 -> SU33 carrier ladder");

const rotationPhaseIso = relationById.get("rel:SO2-iso-U1");
assert.equal(rotationPhaseIso.properties.formula, "rotation_theta_maps_to_exp_i_theta", "SO(2)/U(1) seam must retain its rotation-to-phase map");
assert.ok(rotationPhaseIso.caveats.some((caveat) => caveat.includes("squaring_map_not_the_Spin2_U1_isomorphism")), "SO(2)/U(1) seam must distinguish the Spin(2) double cover from the Spin(2) isomorphism");

for (const [rank, productId, quotientId, kernelId] of [
  [2, "grp:SU2xU1", "grp:U2", "grp:C2"],
  [3, "grp:SU3xU1", "grp:U3", "grp:C3"]
]) {
  const quotient = relationById.get(`rel:SU${rank}U1-central-C${rank}-quotient-U${rank}`);
  assert.equal(quotient.properties.central, true, `rank ${rank} scalar-product quotient must remain central`);
  assert.equal(quotient.properties.split, false, `rank ${rank} scalar-product central quotient must not be conflated with the split determinant sequence`);
  assert.ok(quotient.participants.some((participant) => participant.role === "middle" && participant.group === productId));
  assert.ok(quotient.participants.some((participant) => participant.role === "quotient" && participant.group === quotientId));
  assert.ok(quotient.participants.some((participant) => participant.role === "kernel" && participant.group === kernelId));
}
const su4ResidualPath = findPaths(catalogue, "grp:SU3xU1", "grp:SU4", 2);
assert.ok(su4ResidualPath.paths.some((candidate) => candidate.nodes.includes("grp:U3")), "expected SU3xU1 -> U3 -> SU4 residual global-form path");

const nonabelianSMSubgroup = relationById.get("rel:SU3SU2-subgroup-GSM");
assert.equal(nonabelianSMSubgroup.properties.normal, true, "the unit-hypercharge SU3 x SU2 image must remain normal in the faithful Standard Model global group");
assert.ok(nonabelianSMSubgroup.witnesses.some((witness) => witness.includes("trivial_intersection")), "faithful quotient inclusion requires an explicit C6-kernel intersection witness");
const nonabelianSMPath = findPaths(catalogue, "grp:SU3xSU2", "grp:GSM", 2);
assert.ok(nonabelianSMPath.paths.some((candidate) => candidate.nodes.includes("grp:SMCover")), "expected SU3xSU2 -> SMCover -> GSM quotient route");

const lockingProduct = relationById.get("rel:SO3SO2-product");
assert.ok(lockingProduct.caveats.some((caveat) => caveat.includes("connected_product")), "SO3 x SO2 locking symmetry must retain its connected-component boundary");
const lockingDiagonal = relationById.get("rel:SO2diag-subgroup-SO3SO2");
assert.equal(lockingDiagonal.properties.normal, false, "diagonal locking circle must not be promoted as a normal subgroup");
assert.ok(lockingDiagonal.caveats.some((caveat) => caveat.includes("distinct_from_either_factor")), "diagonal circle must remain distinct from both factor embeddings");
const axialCirclePath = findPaths(catalogue, "grp:SO2", "grp:SO3xSO2", 2);
assert.ok(axialCirclePath.paths.some((candidate) => candidate.nodes.includes("grp:SO3")), "expected selected-axis SO2 -> SO3 -> SO3xSO2 path");

const specialBlockSequence = relationById.get("rel:SU1U2-product-determinant-sequence");
assert.equal(specialBlockSequence.properties.split, true, "U1 x U2 product-determinant sequence must retain its section");
assert.equal(specialBlockSequence.properties.central, false, "S(U1 x U2) is not a central kernel in the full product");
const specialBlockIso = relationById.get("rel:SU1U2-iso-U2");
assert.equal(specialBlockIso.properties.formula, "B_maps_to_detB_inverse_B", "special block stabilizer must retain its explicit U2 model");
const specialBlockPath = findPaths(catalogue, "grp:U2", "grp:SU3", 2);
assert.ok(specialBlockPath.paths.some((candidate) => candidate.nodes.includes("grp:S_U1xU2")), "expected U2 -> S(U1xU2) -> SU3 block-stabilizer route");

const arithmeticCarrier = relationById.get("rel:Sp4Z-subgroup-Sp4R");
assert.equal(arithmeticCarrier.properties.discrete, true, "Sp4Z must remain discrete inside Sp4R");
assert.equal(arithmeticCarrier.properties.arithmetic, true, "Sp4Z must retain its arithmetic-subgroup type");
assert.equal(arithmeticCarrier.properties.lattice, true, "Sp4Z must retain finite-covolume lattice status");
assert.equal(arithmeticCarrier.properties.cocompact, false, "Sp4Z is a nonuniform lattice");
assert.equal(arithmeticCarrier.properties.normal, false, "the arithmetic lattice must not be promoted to a normal subgroup");
assert.ok(!catalogue.relationships.some((relation) => relation.kind === "isomorphism"
  && relation.participants.some((participant) => participant.group === "grp:Sp4Z")
  && relation.participants.some((participant) => ["grp:Sp4R", "grp:Spin0_2_3"].includes(participant.group))),
"Sp4Z must not be identified with either ambient real Lie group");
const arithmeticCarrierPath = findPaths(catalogue, "grp:Sp4Z", "grp:Spin0_2_3", 2);
assert.ok(arithmeticCarrierPath.paths.some((candidate) => candidate.nodes.includes("grp:Sp4R")), "expected Sp4Z -> Sp4R -> Spin023 arithmetic-carrier path");

const order23Centralizer = relationById.get("rel:C23xS4-centralizer-in-M");
assert.equal(order23Centralizer.properties.centralizerOrder, order("grp:C23xS4").toString(), "declared order-23 centralizer order must match its product group");
assert.ok(order23Centralizer.caveats.some((caveat) => caveat.includes("representation_data")), "centralizer relation must preserve the representation-data boundary");
for (const factorId of ["grp:C23", "grp:S4"]) {
  const factorPath = findPaths(catalogue, factorId, "grp:M", 2);
  assert.ok(factorPath.paths.some((candidate) => candidate.nodes.includes("grp:C23xS4")), `expected ${factorId} -> C23xS4 -> Monster centralizer path`);
}

const c9Quotient = relationById.get("rel:C9-central-C3-quotient-C3");
assert.equal(c9Quotient.properties.central, true, "the cube subgroup must be central in cyclic C9");
assert.equal(c9Quotient.properties.split, false, "C9 is not the split product C3 x C3");
assert.equal(c9Quotient.properties.kernelGenerator, "t^3", "the order-three kernel must retain its cube generator");
assert.ok(c9Quotient.caveats.some((caveat) => caveat.includes("hypercharge_dressed")), "the C9 extension must remain distinct from the dressed split complement");
assert.ok(resolveGroup(catalogue, "Z_9").some((group) => group.id === "grp:C9"), "Z_9 alias must resolve to C9");
const c9KernelPath = findPaths(catalogue, "grp:C3", "grp:C9", 1);
assert.ok(c9KernelPath.paths.length > 0, "expected C3 kernel incidence into C9");

const gl2f2ToSl2f2 = relationById.get("rel:GL2F2-iso-SL2F2");
assert.equal(gl2f2ToSl2f2.properties.reason, "F2_units_equal_1", "GL2F2/SL2F2 collapse must retain its field-specific reason");
const sl2f2ToPsl2f2 = relationById.get("rel:SL2F2-iso-PSL2F2");
assert.equal(sl2f2ToPsl2f2.properties.centerOrder, "1", "SL2F2 projectivization must retain its trivial-centre witness");
const psl2f2ToS3 = relationById.get("rel:PSL2F2-iso-S3");
assert.equal(psl2f2ToS3.properties.permutationDegree, "3", "PSL2F2/S3 isomorphism must retain the projective-line degree");
const mod2Reduction = relationById.get("rel:SL2Z-reduction-F2");
assert.equal(mod2Reduction.properties.surjective, true, "SL2Z reduction modulo two must remain surjective");
assert.equal(mod2Reduction.properties.kernel, "principal_congruence_subgroup_level_2", "mod-two reduction must retain its kernel identity");
const braidMod2Path = findPaths(catalogue, "grp:B3Braid", "grp:S3", 4);
assert.ok(braidMod2Path.paths.some((candidate) => ["grp:SL2Z", "grp:SL2F2", "grp:PSL2F2"].every((id) => candidate.nodes.includes(id))), "expected B3 -> SL2Z -> SL2F2 -> PSL2F2 -> S3 congruence path");

for (const [prime, linearId, projectiveId, finiteShadowId] of [
  [3, "grp:SL2F3", "grp:PSL2F3", "grp:A4"],
  [5, "grp:SL2F5", "grp:PSL2F5", "grp:A5"]
]) {
  const quotient = relationById.get(`rel:SL2F${prime}-central-quotient-PSL2F${prime}`);
  assert.equal(quotient.properties.central, true, `mod-${prime} projectivization kernel must remain central`);
  assert.equal(quotient.properties.split, false, `mod-${prime} central projectivization must remain non-split`);
  assert.equal(quotient.properties.kernelGenerator, "minus_identity", `mod-${prime} quotient must retain the odd-characteristic scalar generator`);
  assert.ok(quotient.caveats.some((caveat) => caveat.includes("survives_reduction")), `mod-${prime} quotient must preserve the central-sign boundary`);
  const reduction = relationById.get(`rel:SL2Z-reduction-F${prime}`);
  assert.equal(reduction.properties.surjective, true, `SL2Z reduction modulo ${prime} must remain surjective`);
  assert.equal(reduction.properties.kernel, `principal_congruence_subgroup_level_${prime}`, `mod-${prime} reduction must retain its principal congruence kernel`);
  const path = findPaths(catalogue, "grp:B3Braid", finiteShadowId, 4);
  assert.ok(path.paths.some((candidate) => ["grp:SL2Z", linearId, projectiveId].every((id) => candidate.nodes.includes(id))), `expected complete B3 mod-${prime} congruence path to ${finiteShadowId}`);
}
assert.ok(resolveGroup(catalogue, "A_4").some((group) => group.id === "grp:A4"), "reviewed TeX alias A_4 must resolve to A4");
assert.ok(resolveGroup(catalogue, "A_5").some((group) => group.id === "grp:A5"), "reviewed TeX alias A_5 must resolve to A5");

assert.equal(order("grp:C4xC2"), 8n, "C4 x C2 order mismatch");
assert.equal(order("grp:C4xC2cubed"), 32n, "C4 x C2^3 order mismatch");
assert.equal(order("grp:C3xC3"), 9n, "C3 x C3 order mismatch");
assert.equal(order("grp:C6xC6"), 36n, "C6 x C6 order mismatch");
assert.equal(order("grp:C8"), 8n, "C8 order mismatch");
assert.equal(order("grp:C12"), 12n, "C12 order mismatch");
assert.equal(order("grp:C18"), 18n, "C18 order mismatch");
assert.equal(order("grp:C2cubed"), 8n, "C2^3 order mismatch");
assert.equal(order("grp:C8xC8"), 64n, "C8 x C8 order mismatch");
assert.equal(order("grp:C9xC9"), 81n, "C9 x C9 order mismatch");
assert.equal(order("grp:C18xC18"), 324n, "C18 x C18 order mismatch");
assert.equal(order("grp:HadamardDisc2"), 512n, "Hadamard two-primary discriminant order mismatch");
assert.equal(order("grp:HadamardDisc"), 41472n, "Hadamard discriminant order mismatch");
assert.equal(order("grp:GL4F3"), 24261120n, "GL(4,3) order mismatch");
assert.equal(order("grp:GL5F2"), 9999360n, "GL(5,2) order mismatch");
assert.notEqual("grp:C3xC3", "grp:C9", "elementary abelian order nine and cyclic order nine must retain distinct identities");
const rankTwoCrt = relationById.get("rel:V4C3C3-direct-product-C6C6");
assert.equal(rankTwoCrt.properties.construction, "componentwise_Chinese_remainder_isomorphism");
assert.ok(rankTwoCrt.caveats.some((caveat) => caveat.includes("quadratic_refinement")), "rank-two CRT must not silently transport the quadratic refinement");
for (const [relationId, kernelId, quotientId, kernelGenerator] of [
  ["rel:C6-central-C3-quotient-C2", "grp:C3", "grp:C2", "g^2"],
  ["rel:C6-central-C2-quotient-C3", "grp:C2", "grp:C3", "g^3"]
]) {
  const sequence = relationById.get(relationId);
  assert.equal(sequence.properties.central, true, `${relationId} must remain central`);
  assert.equal(sequence.properties.split, true, `${relationId} must retain the coprime-order section`);
  assert.equal(sequence.properties.kernelGenerator, kernelGenerator, `${relationId} kernel generator drift`);
  assert.ok(sequence.participants.some((participant) => participant.role === "kernel" && participant.group === kernelId));
  assert.ok(sequence.participants.some((participant) => participant.role === "quotient" && participant.group === quotientId));
}
const c6FactorPath = findPaths(catalogue, "grp:C2", "grp:C6", 1);
assert.ok(c6FactorPath.paths.length > 0, "expected C2 factor/kernel incidence into C6");
const rankTwoCrtPath = findPaths(catalogue, "grp:V4", "grp:C6xC6", 1);
assert.ok(rankTwoCrtPath.paths.length > 0, "expected V4 factor inclusion into the rank-two CRT product");

const c12Product = relationById.get("rel:C12-direct-product");
assert.equal(c12Product.properties.coprimeOrders, true, "C4 x C3 -> C12 must retain its CRT witness");
assert.ok(c12Product.caveats.some((caveat) => caveat.includes("value_group_is_not_the_C6_squared_state_group")), "C12 must retain the state/value role boundary");
const c18Product = relationById.get("rel:C18-direct-product");
assert.equal(c18Product.properties.coprimeOrders, true, "C2 x C9 -> C18 must retain its CRT witness");
const hadamardInvariantProduct = relationById.get("rel:HadamardDisc-invariant-product");
assert.equal(hadamardInvariantProduct.properties.order, "41472");
assert.equal(hadamardInvariantProduct.properties.exponent, "72");
assert.ok(hadamardInvariantProduct.caveats.some((caveat) => caveat.includes("does_not_flatten_the_orthogonal_discriminant_form")), "group decomposition must not erase the discriminant form");
const hadamardPrimaryProduct = relationById.get("rel:HadamardDisc-primary-product");
assert.equal(hadamardPrimaryProduct.properties.construction, "primary_decomposition");
assert.equal(hadamardPrimaryProduct.properties.coprimeOrders, true);
for (const [sourceId, resultId] of [
  ["grp:C8xC8", "grp:HadamardDisc"],
  ["grp:C18xC18", "grp:HadamardDisc"],
  ["grp:HadamardDisc2", "grp:HadamardDisc"],
  ["grp:C9xC9", "grp:HadamardDisc"]
]) {
  assert.ok(findPaths(catalogue, sourceId, resultId, 1).paths.length > 0, `expected ${sourceId} factor incidence into ${resultId}`);
}

const finiteSymplecticAmbient = relationById.get("rel:Sp4F3-subgroup-GL4F3");
assert.equal(finiteSymplecticAmbient.properties.index, "468");
assert.equal(order("grp:GL4F3") / order("grp:Sp4F3"), 468n, "Sp(4,3) ambient index mismatch");
assert.ok(finiteSymplecticAmbient.caveats.some((caveat) => caveat.includes("does_not_automatically_preserve_the_chosen_symplectic_form")));
const integralToRealAmbient = findPaths(catalogue, "grp:Sp4Z", "grp:GL4R", 3);
assert.ok(integralToRealAmbient.paths.some((candidate) => ["grp:Sp4Q", "grp:Sp4R"].every((id) => candidate.nodes.includes(id))), "expected symplectic scalar-extension path Sp4Z -> Sp4Q -> Sp4R -> GL4R");
assert.ok(integralToRealAmbient.paths.some((candidate) => ["grp:GL4Z", "grp:GL4Q"].every((id) => candidate.nodes.includes(id))), "expected ambient scalar-extension path Sp4Z -> GL4Z -> GL4Q -> GL4R");
assert.ok(findPaths(catalogue, "grp:Co0", "grp:GL24Z", 1).paths.length > 0, "expected faithful Leech-lattice realization Co0 < GL24Z");

const boostComponent = relationById.get("rel:SO01_1-subgroup-SO1_1");
assert.equal(boostComponent.properties.normal, true, "SO_0(1,1) must remain normal in SO(1,1)");
assert.equal(boostComponent.properties.index, "2", "SO(1,1) must retain its two-component boundary");
assert.ok(boostComponent.caveats.some((caveat) => caveat.includes("identity_component")), "the corpus boost flow must remain component-qualified");
const lorentzComponent = relationById.get("rel:SO01_2-subgroup-SO1_2");
assert.equal(lorentzComponent.properties.normal, true, "SO_0(1,2) must remain normal in SO(1,2)");
assert.equal(lorentzComponent.properties.index, "2", "SO(1,2) must retain its two-component boundary");
const sectionStabilizerProduct = relationById.get("rel:SO012SO011-direct-product");
assert.equal(sectionStabilizerProduct.properties.dimension, "4", "the connected section stabilizer product must retain dimension four");
assert.ok(sectionStabilizerProduct.caveats.some((caveat) => caveat.includes("SO_identity_component_level")), "the exact product must remain scoped to the orthogonal identity components");
assert.ok(sectionStabilizerProduct.caveats.some((caveat) => caveat.includes("spin_cover")), "the SO product must not silently determine the spin preimage");
const sectionStabilizerEmbedding = relationById.get("rel:SO012SO011-subgroup-SO023");
assert.equal(sectionStabilizerEmbedding.properties.dimension, "4");
assert.equal(sectionStabilizerEmbedding.properties.codimension, "6");
assert.equal(sectionStabilizerEmbedding.properties.normal, false, "a selected-section stabilizer is not normal in SO_0(2,3)");
for (const factorId of ["grp:SO0_1_2", "grp:SO0_1_1"]) {
  const path = findPaths(catalogue, factorId, "grp:SO0_2_3", 2);
  assert.ok(path.paths.some((candidate) => candidate.nodes.includes("grp:SO0_1_2xSO0_1_1")), `expected ${factorId} -> connected block stabilizer -> SO023 path`);
}

const spin4Product = relationById.get("rel:Spin4-iso-SU2SU2");
assert.equal(spin4Product.properties.globalForm, "simply_connected", "Spin(4) ~= SU(2) x SU(2) must retain the simply connected global form");
const spin4Cover = relationById.get("rel:Spin4-cover-SO4");
assert.equal(spin4Cover.properties.degree, "2", "Spin(4) -> SO(4) must remain a double cover");
assert.ok(spin4Cover.caveats.some((caveat) => caveat.includes("not_isomorphic")), "SO(4) must not be flattened to the simply connected product");
const spin8Cover = relationById.get("rel:Spin8-cover-SO8");
assert.equal(spin8Cover.properties.degree, "2", "Spin(8) -> SO(8) must remain a double cover");
const spin8Triality = relationById.get("rel:S3-triality-action-Spin8");
assert.equal(spin8Triality.properties.action, "outer_automorphisms", "D4 triality must remain an outer action");
assert.ok(spin8Triality.caveats.some((caveat) => caveat.includes("does_not_descend_to_one_fixed_SO8_quotient")), "triality must retain the fixed-quotient global-form boundary");

for (const [rank, subgroupRelationId, sequenceRelationId, unitaryId] of [
  ["1,1", "rel:SU11-subgroup-U11", "rel:U11-determinant-sequence", "grp:U1_1"],
  ["4", "rel:SU4-subgroup-U4", "rel:U4-determinant-sequence", "grp:U4"]
]) {
  const subgroup = relationById.get(subgroupRelationId);
  assert.equal(subgroup.properties.embedding, "determinant_kernel", `SU(${rank}) must remain the determinant kernel in U(${rank})`);
  const sequence = relationById.get(sequenceRelationId);
  assert.equal(sequence.properties.split, true, `U(${rank}) determinant sequence must retain a section`);
  assert.equal(sequence.properties.central, false, `U(${rank}) determinant sequence must not be presented as a central product splitting`);
  assert.ok(sequence.caveats.some((caveat) => caveat.includes("not_central")), `U(${rank}) standard section must retain its noncentral boundary`);
  assert.ok(sequence.participants.some((participant) => participant.role === "middle" && participant.group === unitaryId));
}
const unitaryMaximalCompact = relationById.get("rel:U1U1-subgroup-U11");
assert.equal(unitaryMaximalCompact.properties.maximalCompact, true, "U(1) x U(1) must remain the maximal compact subgroup of U(1,1)");
assert.ok(unitaryMaximalCompact.caveats.some((caveat) => caveat.includes("space_not_a_quotient_group")), "the U(1,1)/(U1xU1) disk must remain a homogeneous space");
const unitarySymplectic = relationById.get("rel:U11-subgroup-Sp4R");
assert.equal(unitarySymplectic.properties.embedding, "realification_of_pseudo_unitary_action", "U(1,1) < Sp(4,R) must retain its realification witness");
const unitaryCarrierPath = findPaths(catalogue, "grp:C3", "grp:Sp4R", 2);
assert.ok(unitaryCarrierPath.paths.some((candidate) => candidate.nodes.includes("grp:U1_1")), "expected C3 -> U(1,1) -> Sp(4,R) selected-turn path");
const finiteComponentProduct = relationById.get("rel:H4mu3-direct-product");
assert.equal(finiteComponentProduct.properties.construction, "central_scalar_mu3_section", "H4mu3 must retain its explicit central product section");
const finiteComponentSequence = relationById.get("rel:H4mu3-determinant-sequence");
assert.equal(finiteComponentSequence.properties.split, true, "the H4mu3 component sequence must split");
assert.equal(finiteComponentSequence.properties.central, true, "the scalar mu3 section in H4mu3 must remain central");
const finiteComponentAmbient = relationById.get("rel:H4mu3-subgroup-U4");
assert.equal(finiteComponentAmbient.properties.normal, true, "the determinant-preimage subgroup must remain normal in U4");
assert.equal(finiteComponentAmbient.properties.components, "3", "H4mu3 must retain exactly three connected components");
assert.ok(findPaths(catalogue, "grp:C3", "grp:U4", 2).paths.some((candidate) => candidate.nodes.includes("grp:H4mu3")), "expected scalar C3 -> H4mu3 -> U4 path");
const dressedOrderNine = relationById.get("rel:C9-subgroup-H4mu3");
assert.equal(dressedOrderNine.properties.intersectionWithIdentityComponent, "C3_generated_by_U_cubed", "the selected C9 must retain its cube intersection with SU4");
assert.equal(dressedOrderNine.properties.componentImage, "C3", "the selected C9 must surject onto the three-component quotient");
assert.ok(dressedOrderNine.caveats.some((caveat) => caveat.includes("nonsplit")), "the nonsplit C9 extension must remain distinct from the split ambient component sequence");
assert.ok(findPaths(catalogue, "grp:C9", "grp:U4", 2).paths.some((candidate) => candidate.nodes.includes("grp:H4mu3")), "expected selected C9 -> H4mu3 -> U4 path");

const c3Automorphisms = relationById.get("rel:C3-automorphism-C2");
assert.equal(c3Automorphisms.properties.action, "inversion", "the nontrivial automorphism of C3 must remain inversion");
assert.deepEqual(c3Automorphisms.properties.orbitsOnElements, ["{0}", "{1,2}"], "the external inversion must fix zero and exchange the nonidentity sectors");
assert.ok(c3Automorphisms.caveats.some((caveat) => caveat.includes("inner_conjugacy_classes_are_singletons")), "external sector inversion must not be mislabeled as inner conjugacy in C3");
assert.ok(c3Automorphisms.caveats.some((caveat) => caveat.includes("programme_gate_A5")), "the programme A5 label must remain disambiguated from the alternating group");

const residualPhaseProduct = relationById.get("rel:C3U1-direct-product");
assert.equal(residualPhaseProduct.properties.components, "3", "C3 x U1 must retain its three connected components");
assert.equal(residualPhaseProduct.properties.identityComponent, "U1", "the residual phase identity component must remain the weak U1 factor");
assert.ok(residualPhaseProduct.caveats.some((caveat) => caveat.includes("not_an_automatic_physical_gauge_symmetry")), "the residual intertwiner ambiguity must not be promoted to a physical gauge group");
const residualPhaseAmbient = relationById.get("rel:C3U1-subgroup-U1U1");
assert.equal(residualPhaseAmbient.properties.normal, true, "C3 x U1 must be normal in the abelian phase torus");
assert.equal(residualPhaseAmbient.properties.components, "3", "the ambient embedding must preserve the three-component structure");
const conditionalSixfold = relationById.get("rel:C6-subgroup-C3U1");
assert.equal(conditionalSixfold.status, "corpus_established", "the conditional C6 edge must remain grounded in corpus evidence");
assert.equal(conditionalSixfold.properties.condition, "identified_normalized_five_dimensional_volume_lines", "the conditional C6 edge must name the missing volume-line datum");
assert.ok(conditionalSixfold.caveats.some((caveat) => caveat.includes("bare_weak_Jordan_algebra")), "the C6 edge must retain the weak-Jordan no-go boundary");
assert.ok(conditionalSixfold.caveats.some((caveat) => caveat.includes("compensating_hypercharge_phase")), "the residual C6 must remain distinct from the faithful gauge kernel");
assert.ok(findPaths(catalogue, "grp:C6", "grp:U1xU1", 2).paths.some((candidate) => candidate.nodes.includes("grp:C3xU1")), "expected conditional C6 -> C3xU1 -> U1xU1 path");

const twoTriangleBase = relationById.get("rel:S3xS3-direct-product");
assert.equal(order("grp:S3xS3"), 36n, "the two-triangle base must have order 36");
assert.equal(twoTriangleBase.participants.filter((participant) => participant.role === "factor").length, 2, "the product must retain both coordinate-typed S3 factors");
const wreathExtension = relationById.get("rel:S3WrC2-semidirect-product");
assert.equal(order("grp:S3WrC2"), 72n, "the wreath product must have order 72");
assert.equal(wreathExtension.properties.action, "swap_the_two_S3_factors", "the outer involution must retain its factor-swap action");
assert.equal(wreathExtension.properties.central, false, "the factor-swapping C2 must not be made central");
const orthogonalWreath = relationById.get("rel:OPlus4F2-iso-S3WrC2");
assert.equal(orthogonalWreath.properties.graphModel, "two_disjoint_triangles", "the degree-six isomorphism must retain its graph witness");
assert.equal(order("grp:OPlus4F2"), order("grp:S3WrC2"));
assert.ok(findPaths(catalogue, "grp:S3", "grp:OPlus4F2", 3).paths.some((candidate) => ["grp:S3xS3", "grp:S3WrC2"].every((id) => candidate.nodes.includes(id))), "expected S3 -> S3xS3 -> S3 wr C2 -> O+(4,2) factor route");

const matchedParitySequence = relationById.get("rel:MatchedParity-kernel-of-mismatch");
assert.equal(order("grp:MatchedParityS3S3"), 18n, "the matched-parity fiber product must have order 18");
assert.equal(matchedParitySequence.properties.index, "2", "the equal-sign kernel must have index two in S3 x S3");
assert.equal(matchedParitySequence.properties.normal, true, "a character kernel must remain normal");
assert.equal(matchedParitySequence.properties.central, false, "the matched-parity kernel is not central in S3 x S3");
const matchedSemidirect = relationById.get("rel:MatchedParity-semidirect-C3C3-C2");
assert.equal(matchedSemidirect.properties.action, "simultaneous_inversion", "the internal C2 must invert both C3 factors");
const matchedDiagonal = relationById.get("rel:DiagonalS3-subgroup-MatchedParity");
assert.equal(matchedDiagonal.properties.index, "3", "the diagonal S3 must have index three in the matched group");
assert.equal(matchedDiagonal.properties.normal, false, "the diagonal S3 must not be promoted to a normal subgroup");
for (const relationId of ["rel:MatchedParity-first-projection", "rel:MatchedParity-second-projection"]) {
  const projection = relationById.get(relationId);
  assert.equal(projection.properties.split, true, `${relationId} must retain its diagonal section`);
  assert.equal(projection.properties.section, "diagonal_S3", `${relationId} must name the diagonal section`);
}
const finiteFlagStabilizer = relationById.get("rel:S3C2-flag-stabilizer-OPlus4F2");
assert.equal(order("grp:S3xC2"), 12n, "the finite flag stabilizer must have order 12");
assert.equal(finiteFlagStabilizer.properties.index, "6", "the selected flag orbit must have size six");
assert.equal(finiteFlagStabilizer.properties.normal, false, "a selected flag stabilizer must not be normal in the transitive ambient action");
assert.ok(findPaths(catalogue, "grp:MatchedParityS3S3", "grp:OPlus4F2", 3).paths.some((candidate) => ["grp:S3xS3", "grp:S3WrC2"].every((id) => candidate.nodes.includes(id))), "expected matched parity -> S3xS3 -> wreath -> O+(4,2) route");
for (const factorId of ["grp:S3", "grp:C2"]) {
  assert.ok(findPaths(catalogue, factorId, "grp:OPlus4F2", 2).paths.some((candidate) => candidate.nodes.includes("grp:S3xC2")), `expected ${factorId} -> selected flag stabilizer -> O+(4,2) route`);
}

assert.equal(order("grp:Tits"), 17971200n, "the Tits group order must remain exact");
assert.equal(order("grp:TitsAut"), 2n * order("grp:Tits"), "the full Tits automorphism group must have index two over the simple group");
assert.equal(order("grp:S4xTitsAut"), order("grp:S4") * order("grp:TitsAut"), "the Baby Monster Tits-local product order must factor exactly");
assert.equal(order("grp:B") / order("grp:S4xTitsAut"), 4816481232502590013440000n, "the ATLAS maximal-subgroup index must remain exact");
assert.equal(order("grp:2B"), 2n * order("grp:B"), "2.B must retain the central double-cover order");
const titsExtension = relationById.get("rel:Tits-split-automorphism-extension");
assert.equal(titsExtension.properties.split, true, "the full Tits automorphism extension must split");
assert.equal(titsExtension.properties.central, false, "the outer involution must not be made central");
const babyTitsLocal = relationById.get("rel:S4TitsAut-maximal-subgroup-B");
assert.equal(babyTitsLocal.properties.maximal, true, "the S4 x T:2 subgroup must retain its ATLAS maximality");
assert.equal(babyTitsLocal.properties.normal, false, "a proper maximal subgroup of simple B must not be normal");
const babyMonsterBoundary = relationById.get("rel:B-nonembedding-M");
assert.match(babyMonsterBoundary.properties.involvementWitness, /quotient_of_the_Monster_subgroup_2B/, "Baby Monster involvement must retain its quotient-of-subgroup witness");
assert.ok(babyMonsterBoundary.caveats.some((caveat) => caveat.includes("quotient_of_a_subgroup_is_not_generally_a_subgroup")), "the B-to-M quotient reversal boundary must remain explicit");
assert.ok(findPaths(catalogue, "grp:Tits", "grp:B", 3).paths.some((candidate) => ["grp:TitsAut", "grp:S4xTitsAut"].every((id) => candidate.nodes.includes(id))), "expected Tits -> T:2 -> S4 x T:2 -> B path");
assert.ok(findPaths(catalogue, "grp:Tits", "grp:M", 1).paths.length > 0, "the independently classified Tits -> Monster embedding must remain available");
assert.equal(findPaths(catalogue, "grp:B", "grp:M", 4).paths.length, 0, "the map graph must not reverse 2.B -> B into a Baby Monster embedding in M");

console.log(
  `Mathematical group catalogue: PASS groups=${catalogue.groups.length}; families=${catalogue.families.length}; ` +
  `relations=${catalogue.relationships.length}; cfsgLieFamilies=16; sporadics=26; ` +
  `open=${catalogue.relationships.filter((relation) => relation.status === "open").length}; ` +
  `negative=${catalogue.relationships.filter((relation) => relation.status === "negative").length}`
);
