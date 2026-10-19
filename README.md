# Spin(2,3) Relational Geometry

An audited research corpus investigating \(Spin_0(2,3)\cong Sp(4,\mathbb R)\) as an interface between positive response geometry, two-face Jordan structures, typed relationships, holonomy, finite symplectic shadows and possible physical realizations.

This is **not a completed unified theory**. Established mathematics, reproducible model-local results, conditional constructions, conjectures, analogies, obstructions and indeterminate inputs remain explicitly separated.

## Choose an entrance

| Reader | Start here |
|---|---|
| General reader | [Edition 3.0 book preview](book/edition-3/README.md) |
| Researcher | [Canonical corpus guide](corpus/README.md) |
| Auditor or contributor | [Verification guide](verification/README.md) |
| Visual explorer | [Interactive concept atlas](docs/concept-map/index.html) |

The generated paged edition is available in [`docs/edition-3`](docs/edition-3/index.html). GitHub Pages deployment is prepared but requires a repository visibility or account-plan change while this repository remains private.

## Current position

The strongest present synthesis is conditional:

- the \(H_2(\mathbb R)_+\) response cone gives an exact Lorentzian carrier whose conformal completion is \(Sp(4,\mathbb R)\cong Spin_0(2,3)\);
- several finite, topological and relational shadows are constructed exactly within stated models;
- the reflexive-closure programme reaches conditional effective closure but does not derive absolute flavour orientation;
- any finite fully integrated isotropic cross-Peirce link sector remains blind to the missing complementary frame;
- Planckian \(t\)-\(J\) transport supplies a testable scalar response ray, while a physical two-current energy/particle calculation remains the decisive next gate.
- the prime \(691\) reaches the arithmetic carrier exactly through the weight-twelve Klingen–Siegel tower on \(Sp(4,\mathbb Z)\), while remaining an automorphic congruence prime rather than a physical parameter;
- Outcome Dynamics supplies a model-local bonded stress-to-charge/optical pipeline whose quadratic through-thickness control converges on one preregistered direction; consistent mass also converges there, but differs from lumped mass by 65–72% in the main observables, so lateral/support refinement and full-panel convergence remain open;
- the first candidate-action blocker round rejects an unconstrained literal second time, proves that symmetry-fixed data cannot select a nonfixed orientation, and defines a preregistered holonomy-response test; none of these results grants physical admission.
- the A11 continuation shows that topology alone is locally stress-blind: a measurable holonomy response minimally requires gapped matter carrying residual \(Z_3\) charge one or two, a transverse probe tensor, and a nuisance-projected effect large enough to survive replication.

## Canonical research controls

1. [Research document map](corpus/claims/0000-0099/00_research_document_map.md)
2. [Current research frontier](corpus/claims/0000-0099/30_research_frontier.md)
3. [The Spin(2,3) pole synthesis](corpus/claims/0000-0099/40_grand_synthesis_spin23_pole.md)
4. [Multi-branch research registry](corpus/claims/0000-0099/49_multi_branch_research_registry.md)
5. [Active-goal and evidence log](corpus/claims/0000-0099/91_multi_branch_active_goal_log.md)
6. [Latest external response test](corpus/claims/1200-1299/1216_planckian_tj_transport_is_a_scalar_detailed_balance_ray_and_a_testable_two_current_spin23_response_extension.md)
7. [Latest arithmetic carrier test](corpus/claims/1200-1299/1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md)
8. [Operational stress-response element test](corpus/claims/1200-1299/1218_outcome_dynamics_turns_the_stress_bridge_into_a_converged_numerical_gate_not_evidence_for_fundamental_spin23.md)
9. [Operational stress-response mass test](corpus/claims/1200-1299/1219_outcome_dynamics_consistent_mass_converges_but_disagrees_with_lumped_mass_so_the_gate_remains_open.md)
10. [Physical-state and ontology audit](corpus/claims/1200-1299/1220_the_a4_physical_state_gate_blocks_the_typed_action_but_rejects_only_the_naive_two_time_reading.md)
11. [Selector particularity theorem](corpus/claims/1200-1299/1221_symmetric_data_cannot_select_a_nonfixed_orientation_and_a5_requires_a_covariant_selector_input.md)
12. [Preregistered branch-discriminating response test](corpus/claims/1200-1299/1222_a_preregistered_z3_holonomy_response_test_can_separate_a_third_physical_direction_from_ambient_spin23_geometry.md)
13. [The 691 Klingen–Siegel arithmetic bridge](corpus/claims/1200-1299/1223_the_prime_691_reaches_the_spin23_arithmetic_carrier_through_the_weight_twelve_klingen_siegel_tower.md)
14. [A11 quantitative effect window](corpus/claims/1200-1299/1225_the_a11_effect_window_requires_nuisance_projected_power_not_only_a_nonzero_transverse_response.md)
15. [A11 platform realization audit](corpus/claims/1200-1299/1226_a_passive_two_port_is_the_fastest_z3_control_test_but_only_a_parafermion_or_discrete_gauge_platform_would_supply_genuine_z3_sectors.md)
16. [A11 microscopic coupling boundary](corpus/claims/1200-1299/1227_pure_bf_is_locally_stress_and_flat_holonomy_blind_while_gapped_unit_charged_matter_is_the_minimal_a11_bridge.md)

## Repository architecture

- `corpus/` — canonical claims, syntheses, programmes, governance and machine-readable registers;
- `book/` — curated reader-facing editions;
- `verification/` — research certificates grouped by operation;
- `evidence/` — data and figures;
- `integrations/` — Claimipedia, Sourcery and related application packets;
- `tooling/` — corpus audit, indexing, migration and publication utilities;
- `tests/` — repository and publication tests;
- `docs/` — generated deployable HTML; do not edit it directly.

## Reproduce and audit

Run from the repository root:

```powershell
node tooling/publication/generate_edition3_book_preview.mjs
node tooling/publication/generate_concept_map.mjs
node --test tests/publication/edition3_book_preview.test.mjs
node --test tests/publication/concept_map.test.mjs
node tooling/audit/audit_markdown_links.mjs
node tooling/audit/audit_spin23_corpus_manifest.mjs --write
```

[`corpus/registers/spin23_corpus_manifest.json`](corpus/registers/spin23_corpus_manifest.json) records repository files, canonical byte counts and SHA-256 hashes. Historical numbering is preserved; the manifest records the legacy collision at document ID 963.

## Licensing and stewardship

Research content and documentation are licensed under [CC BY-SA 4.0](LICENSE.md#research-corpus-and-documentation). Software is licensed under [GPL-3.0-or-later](LICENSE.md#software). Identified third-party material retains its original terms.

The voluntary [Christian Stewardship Covenant](CHRISTIAN_STEWARDSHIP_COVENANT.md) asks contributors and readers to pursue truthful, humble, generous and humane use of the work. It is not an additional license restriction.

## Scope boundary

The repository excludes third-party working copies, local environments, caches, downloaded attachments and private review state. A mathematical correspondence in this corpus must not be described as a microscopic physical symmetry unless the required dynamical evidence has actually been supplied.
