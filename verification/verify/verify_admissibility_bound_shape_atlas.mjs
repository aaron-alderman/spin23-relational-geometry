import fs from "node:fs";

const atlas = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/admissibility_bound_shape_v1.json", "utf8",
));
const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));

if (atlas.schema !== "admissibility-bound-shape/1") throw new Error("unexpected atlas schema");
if (atlas.boundaries.length !== 12) throw new Error(`expected 12 boundaries, received ${atlas.boundaries.length}`);
const ids = atlas.boundaries.map((boundary) => boundary.id);
if (new Set(ids).size !== ids.length) throw new Error("boundary identifiers must be unique");

for (const boundary of atlas.boundaries) {
  for (const key of ["kind", "status", "object", "equation", "filledSide", "otherSide", "source"]) {
    if (!boundary[key]) throw new Error(`${boundary.id} is missing ${key}`);
  }
  if (!fs.existsSync(boundary.source)) throw new Error(`${boundary.id} source does not exist: ${boundary.source}`);
}

const typeCounts = Object.fromEntries(register.relationTypes.map((type) => [type, 0]));
for (const relation of register.relations) typeCounts[relation.type] += 1;
const constructive = typeCounts.extends_to + typeCounts.instantiates;
const guardrail = register.relations.length - constructive;
const special = typeCounts.shares_action_not_carrier;
const backbone = register.relations.length - special;

if (register.entries.length !== 16 || register.relations.length !== 27) throw new Error("graph totals changed");
if (constructive !== 12 || guardrail !== 15 || special !== 3 || backbone !== 24) {
  throw new Error("the graph decompositions recorded by the atlas no longer hold");
}

const kinds = new Set(atlas.boundaries.map((boundary) => boundary.kind));
for (const required of [
  "convex_cone", "morse_bott_orbit", "linear_exact_sequence", "arithmetic_cliff",
  "finite_code_island", "contraction_basin", "branched_double_cover", "detector_fold",
  "topological_wall", "translation_gap", "experimental_frontier",
]) {
  if (!kinds.has(required)) throw new Error(`missing boundary geometry: ${required}`);
}

console.log(JSON.stringify({
  result: "pass",
  globalShape: atlas.globalShape,
  boundaryCount: atlas.boundaries.length,
  boundaryKinds: [...kinds],
  graphAnchors: { nodes: 16, relations: 27, constructive, guardrail, special, backbone },
  verdict: "admissibility_bounds_are_stratified_and_typed_not_one_scalar_frontier",
}, null, 2));

