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

## Canonical research controls

1. [Research document map](corpus/claims/0000-0099/00_research_document_map.md)
2. [Current research frontier](corpus/claims/0000-0099/30_research_frontier.md)
3. [The Spin(2,3) pole synthesis](corpus/claims/0000-0099/40_grand_synthesis_spin23_pole.md)
4. [Multi-branch research registry](corpus/claims/0000-0099/49_multi_branch_research_registry.md)
5. [Active-goal and evidence log](corpus/claims/0000-0099/91_multi_branch_active_goal_log.md)
6. [Latest external response test](corpus/claims/1200-1299/1216_planckian_tj_transport_is_a_scalar_detailed_balance_ray_and_a_testable_two_current_spin23_response_extension.md)
7. [Latest arithmetic carrier test](corpus/claims/1200-1299/1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md)

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
