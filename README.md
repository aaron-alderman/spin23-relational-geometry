# Spin(2,3) Relational Geometry

An audited research corpus investigating the passage from possible structure to physically admissible structure. Its exact mathematical hinge places positive two-face Jordan response and Lie transformation around the same typed carrier:

\[
H_2(\mathbb R)_+
\xrightarrow{\text{Jordan triple / TKK}}
\mathfrak{sp}(4,\mathbb R)
\cong
\mathfrak{so}(2,3).
\]

The larger programme turns dynamics toward admissibility: not only “what equations move a state?” but “which states, transformations, histories and records remain jointly realizable, and what dynamics can live inside that region?” The result is a practical atlas of exact structure, bounded bridges, exclusions, detectors and reachable frontiers.

This is **not a completed unified theory**. Established mathematics, reproducible model-local results, conditional constructions, conjectures, analogies, obstructions and indeterminate inputs remain explicitly separated.

## Choose an entrance

| Reader | Start here |
|---|---|
| Start with the present story | [The admissibility frontier: current synthesis](corpus/syntheses/the_admissibility_frontier_current_synthesis.md) |
| General reader | [Edition 3.1 expanded book preview](book/edition-3/README.md) |
| Researcher | [Canonical corpus guide](corpus/README.md) |
| Auditor or contributor | [Verification guide](verification/README.md) |
| Visual explorer | [Interactive concept atlas](docs/concept-map/index.html) |

The generated paged edition is available in [`docs/edition-3`](docs/edition-3/index.html) and is deployed to [GitHub Pages](https://aaron-alderman.github.io/spin23-relational-geometry/). The Pages workflow regenerates and tests the book before publishing the committed static site.

`book/edition-3/book.json` is the canonical machine-readable publication object. GitHub Pages renders it locally; Claimipedia mirrors its scientific fields and citation digest through the Sourcery MCP lane, and may add presentation metadata without becoming a second research source of truth. The [Claimipedia publication authority contract](integrations/claimipedia/PUBLICATION-AUTHORITY.md) defines that boundary.

## The story now visible

The corpus has found more than a collection of correspondences. It has found a coherent middle architecture.

- **Jordan and Lie meet without being collapsed.** Jordan structure governs positive states, responses and composition; Lie structure governs transformation and transport. Their exact rank-two hinge is established, while its physical carrier remains a live question.
- **Dynamics and admissibility constrain one another.** An action or update rule proposes motion; the admissibility stack tests type, composition, positivity, causality, stability, global extension and empirical record. This reversal has become executable rather than merely philosophical.
- **Selection has become visible.** Symmetry usually supplies an orbit, not a realized member. The corpus identifies the independently sourced boundary, anisotropy, environment, history or record required to turn neutral preservation into physical selection.
- **The frontier is mapped for use.** Twenty-two physics targets, twenty frontier areas, thirty-five detector bundles, twenty experiments and forty-nine maintained topics now connect exact mathematics to calculations, devices, controls and kill tests.
- **The negative results are constructive.** They prevent attractive shared shapes—whether \(A_2\), triality, Golay, Leech, Freudenthal, \(E_8\) or torsion—from being promoted without the missing carrier, action, normalization and observable.

The strongest ontological claim remains open: the corpus has not established that admissibility generates all physical law. But it has established a powerful research method and an unusually detailed “look here” guide to the frontier. The [current synthesis](corpus/syntheses/the_admissibility_frontier_current_synthesis.md) tells that story, including the good news, the limits, the hope and the invitation to contribute.

## Canonical research controls

1. [Research document map](corpus/claims/0000-0099/00_research_document_map.md)
2. [Current research frontier](corpus/claims/0000-0099/30_research_frontier.md)
3. [The Spin(2,3) pole synthesis](corpus/claims/0000-0099/40_grand_synthesis_spin23_pole.md)
4. [Multi-branch research registry](corpus/claims/0000-0099/49_multi_branch_research_registry.md)
5. [Active-goal and evidence log](corpus/claims/0000-0099/91_multi_branch_active_goal_log.md)
6. [Reopened mass-gap, action and shared-scale boundary](corpus/claims/1600-1699/1624_the_reopened_mass_gap_action_and_shared_scale_programme_reaches_five_irreducible_gates.md)
7. [Public hadronic matching boundary](corpus/claims/1700-1799/1728_public_hadronic_input_closes_the_low_energy_branch_not_the_uv_flavor_problem.md)
8. [Supersymmetric PGT four-gate audit](corpus/claims/1700-1799/1780_the_torsionful_supersymmetry_route_now_ends_at_a_new_four_gate_parent_not_a_known_completion.md)
9. [Minimal Lorentz supermultiplet obstruction](corpus/claims/1700-1799/1784_the_minimal_new_supersymmetric_connection_parent_is_exhausted_before_dynamics.md)
10. [Current finite-path exhaustion certificate](corpus/claims/1700-1799/1788_all_finite_escapes_from_the_minimal_connection_parent_now_end_at_new_model_construction.md)

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
