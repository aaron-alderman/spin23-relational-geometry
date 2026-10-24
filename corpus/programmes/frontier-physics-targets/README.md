# Frontier physics targets

This folder is the canonical navigation lane for physics targets in the corpus. It consolidates programme-level targets without replacing their source documents or promoting speculative material.

## Canonical artifacts

- [Frontier physics target set](frontier_physics_target_set_v1.md) — human-readable map, priorities and use rules.
- [Per-target corpus assessments](frontier_physics_target_assessments_v1.md) — reach band, internal assets, missing join, promotion test and neighbouring targets for every FPT entry.
- [Target register](frontier_physics_target_register_v1.json) — machine-readable source of truth for the normalized target set and all declared crosswalks.
- [Coverage and provenance map](frontier_physics_target_coverage_map_v1.md) — maps the admissibility lanes, legacy branches, external validation set, speculative arcs, terminal new-physics gates and recent execution packets into the canonical targets.
- [Backward lineage and lightning path](frontier_physics_lineage_and_lightning_path_v1.md) — distinguishes complete navigation from incomplete physical derivation and identifies the shortest shared-carrier route to a falsifiable join.
- [Verifier](../../../verification/frontier-physics-targets/verify_frontier_physics_target_register.mjs) — checks completeness, identifiers, mappings, epistemic firewalls and referenced source paths.

## Scope

The unit of this register is a **research target**, not a document. Claims, evidence files and programme notes attach to targets as provenance. A document may serve several targets, and a target may contain many claims.

The register presently normalizes:

- 22 core frontier targets;
- 14 legacy multi-branch research lanes;
- eight external validation phenomena;
- eight explicitly speculative missing-middle arcs;
- two terminal torsion-flavour new-physics gates; and
- the current AZ-032--AZ-050 execution, bridge, literature and re-ranking sequence.

Speculative entries remain visible but carry zero evidential weight. Crosswalk membership indicates relevance, not proof of a physical identification.

