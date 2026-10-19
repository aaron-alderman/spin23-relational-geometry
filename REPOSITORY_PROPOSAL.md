# Spin(2,3) corpus repository proposal

**Status:** approved repository configuration pending creation and initial private push.

## Recommended identity

- **Repository name:** `spin23-relational-geometry`
- **Working title:** *Spin(2,3) Relational Geometry*
- **Description:** Audited research corpus on (Spin_0(2,3)\cong Sp(4,\mathbb R)) as relational and response geometry, including exact results, conditional constructions, no-go theorems, external tests and reproducible scripts.

This name reflects the corpus's present position: (Spin(2,3)) is treated as a mathematical interface for relational and positive-response geometry, not as a completed “grand theory.”

## Alternate names

- `spin23-response-geometry` — sharper emphasis on the experimentally testable transport branch, but narrower than the full corpus.
- `spin23-relational-corpus` — maximally literal, but less descriptive of the mathematical content.

## Proposed import scope

Preserve the present flat document layout so that the historical cross-links remain valid. Import:

- all top-level corpus documents and structured evidence files;
- `applications/`, `assets/`, `data/`, `scripts/` and `test/`;
- the Claimipedia, orientation and Sourcery research packets;
- `spin23_corpus_manifest.json` as the integrity and scope record.

Exclude:

- `external/`, because it contains third-party checkouts and the separate Planckian-(t)-(J) contribution history;
- local virtual environments, caches and downloaded attachments;
- private review state;
- Git history from unrelated working directories.

The generated manifest records every proposed file, byte size and SHA-256 hash. Its audit requires the five canonical governance documents to mention the latest numbered document and requires their local links to resolve.

## Approved publication posture

Create the GitHub repository as **private first**, push the exact manifested corpus, and review the rendered entry points before deciding whether to make it public. Research content and documentation use CC BY-SA 4.0; software uses GPL-3.0-or-later; the Christian Stewardship Covenant is nonbinding.

## Proposed landing-page order

1. corpus status and epistemic labels;
2. [research document map](00_research_document_map.md);
3. [current research frontier](30_research_frontier.md);
4. [Spin(2,3) pole synthesis](40_grand_synthesis_spin23_pole.md);
5. [branch registry](49_multi_branch_research_registry.md);
6. [active-goal/evidence log](91_multi_branch_active_goal_log.md);
7. reproducibility and manifest verification;
8. scope limits and citation guidance.

## Official-action gate

The following require the owner's explicit approval: final repository name, GitHub creation, visibility, license, initial push, release, public announcement, or any representation that the corpus is authoritative or complete.
