import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const cataloguePath = "corpus/programmes/mathematical-group-atlas/mathematical_group_catalogue_v1.json";
const declarationsPath = "corpus/programmes/mathematical-group-atlas/mathematical_group_compositions_v1.json";
const outputPath = "corpus/programmes/mathematical-group-atlas/mathematical_group_map_register_v1.json";

const catalogue = JSON.parse(fs.readFileSync(path.join(root, cataloguePath), "utf8"));
const declarations = JSON.parse(fs.readFileSync(path.join(root, declarationsPath), "utf8"));

const maps = [];
const skippedRelationshipKinds = new Map();

function byRole(relation) {
  return Object.groupBy(relation.participants, (participant) => participant.role);
}

function addMap(relation, suffix, mapType, domain, codomain, properties = {}) {
  maps.push({
    id: `map:${relation.id.replace(/^rel:/, "")}:${suffix}`,
    mapType,
    domain,
    codomain,
    relationId: relation.id,
    status: relation.status,
    invertible: properties.invertible ?? false,
    injective: properties.injective ?? false,
    surjective: properties.surjective ?? false,
    formula: properties.formula ?? relation.properties.map ?? relation.properties.embedding ?? null,
    construction: properties.construction,
    provenance: relation.provenance,
    witnesses: relation.witnesses,
    caveats: relation.caveats,
    falsifier: relation.falsifier
  });
}

for (const relation of catalogue.relationships) {
  const roles = byRole(relation);
  const one = (role) => roles[role]?.[0]?.group;
  if (relation.kind === "isomorphism") {
    addMap(relation, "isomorphism", "isomorphism", one("left"), one("right"), {
      invertible: true, injective: true, surjective: true, construction: "declared_isomorphism"
    });
  } else if (relation.kind === "subgroup") {
    addMap(relation, "inclusion", "inclusion", one("subgroup"), one("supergroup"), {
      injective: true, construction: "declared_subgroup_embedding"
    });
  } else if (relation.kind === "short_exact_sequence") {
    addMap(relation, "kernel-inclusion", "kernel_inclusion", one("kernel"), one("middle"), {
      injective: true, construction: "short_exact_sequence_kernel_map"
    });
    addMap(relation, "quotient", "quotient", one("middle"), one("quotient"), {
      surjective: true, construction: "short_exact_sequence_quotient_map"
    });
    if (relation.properties.split) {
      addMap(relation, "splitting-section", "splitting_section", one("quotient"), one("middle"), {
        injective: true,
        formula: relation.properties.section ?? "declared_splitting_section",
        construction: "declared_short_exact_sequence_section"
      });
    }
  } else if (relation.kind === "direct_product") {
    (roles.factor ?? []).forEach((factor, index) => {
      addMap(
        relation,
        `factor-${index + 1}-inclusion`,
        "factor_inclusion",
        factor.group,
        one("result"),
        { injective: true, formula: `factor_${index + 1}_at_other_identities`, construction: `direct_product_factor_${index + 1}_with_other_factors_at_identity` }
      );
      addMap(
        relation,
        `factor-${index + 1}-projection`,
        "factor_projection",
        one("result"),
        factor.group,
        { surjective: true, formula: `coordinate_projection_${index + 1}`, construction: `direct_product_coordinate_${index + 1}_projection` }
      );
    });
  } else if (relation.kind === "semidirect_product") {
    addMap(relation, "normal-factor-inclusion", "normal_factor_inclusion", one("normal_factor"), one("result"), {
      injective: true, construction: "semidirect_product_normal_factor"
    });
    addMap(relation, "acting-factor-inclusion", "acting_factor_inclusion", one("acting_factor"), one("result"), {
      injective: true, construction: "semidirect_product_declared_section"
    });
    addMap(relation, "acting-factor-projection", "semidirect_projection", one("result"), one("acting_factor"), {
      surjective: true, formula: "projection_to_acting_factor", construction: "semidirect_product_quotient_projection"
    });
  } else if (relation.kind === "cover") {
    addMap(relation, "kernel-inclusion", "kernel_inclusion", one("kernel"), one("cover"), {
      injective: true, construction: "cover_kernel_map"
    });
    addMap(relation, "covering", "covering", one("cover"), one("base"), {
      surjective: true, construction: "declared_covering_homomorphism"
    });
  } else if (relation.kind === "centralizer") {
    addMap(relation, "centralizer-inclusion", "centralizer_inclusion", one("centralizer"), one("ambient"), {
      injective: true, construction: "centralizer_subgroup_inclusion"
    });
  } else if (relation.kind === "homomorphism") {
    addMap(relation, "homomorphism", "homomorphism", one("source"), one("target"), {
      injective: relation.properties.injective ?? false,
      surjective: relation.properties.surjective ?? false,
      construction: "declared_homomorphism"
    });
  } else {
    skippedRelationshipKinds.set(relation.kind, (skippedRelationshipKinds.get(relation.kind) ?? 0) + 1);
  }
}

maps.sort((left, right) => left.id.localeCompare(right.id));
const mapById = new Map(maps.map((map) => [map.id, map]));

const compositions = declarations.compositions.map((declaration) => {
  const steps = declaration.steps.map((step) => {
    const map = mapById.get(step.mapId);
    if (!map) throw new Error(`${declaration.id}: unknown map ${step.mapId}`);
    if (step.direction && step.direction !== "forward" && !map.invertible) {
      throw new Error(`${declaration.id}: ${map.id} is not invertible`);
    }
    const inverse = step.direction === "inverse";
    return {
      mapId: map.id,
      direction: inverse ? "inverse" : "forward",
      domain: inverse ? map.codomain : map.domain,
      codomain: inverse ? map.domain : map.codomain
    };
  });
  for (let index = 1; index < steps.length; index += 1) {
    if (steps[index - 1].codomain !== steps[index].domain) {
      throw new Error(`${declaration.id}: non-composable seam ${steps[index - 1].codomain} != ${steps[index].domain}`);
    }
  }
  return {
    ...declaration,
    domain: steps[0].domain,
    codomain: steps.at(-1).codomain,
    steps
  };
});

const output = {
  schema: "mathematical-group-map-register/1",
  basis: { catalogueDate: catalogue.date, algorithmVersion: "2" },
  authority: "maps_derived_from_reviewed_relationships_not_a_substitute_for_map_formulas_or_proofs",
  catalogue: cataloguePath,
  declarations: declarationsPath,
  mapKinds: [...new Set(maps.map((map) => map.mapType))].sort(),
  skippedRelationshipKinds: Object.fromEntries([...skippedRelationshipKinds].sort()),
  statistics: {
    maps: maps.length,
    establishedMaps: maps.filter((map) => ["established", "corpus_established"].includes(map.status)).length,
    openMaps: maps.filter((map) => map.status === "open").length,
    compositions: compositions.length
  },
  maps,
  compositions
};

fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Mathematical group map register: maps=${maps.length}; established=${output.statistics.establishedMaps}; open=${output.statistics.openMaps}; compositions=${compositions.length}`);
