# Contributing to the admissibility frontier

This corpus welcomes corrections, reproductions, conventional reformulations, no-go results, literature provenance, simulations, detector models and experiments. You do not need to accept the programme's larger interpretation. The most valuable contribution may be a clean proof that a proposed bridge fails.

Start with the [role-based entry map](corpus/START_HERE_BY_ROLE.md), [current synthesis](corpus/syntheses/the_admissibility_frontier_current_synthesis.md), [explanatory standard](corpus/EXPLANATORY_STANDARD.md) and [glossary](corpus/GLOSSARY.md). Choose one live edge from the [open-topic register](corpus/programmes/frontier-physics-targets/open_topics_v1.md); do not treat the giant historical logs as the current queue.

For every material bridge, make the source and target things recoverable, say why they are alike and why they differ, identify the reason for the difference, report mathematical and physical closure separately, and place the implication beside its non-implication. Pictures and speculative readings are welcome as an explicitly optional menu; they must pass the deletion and substitution tests in the explanatory standard.

## The contribution contract

Every substantive claim should make six things visible:

1. **Object and type:** what carrier, state space, operator, response, detector or dataset is being discussed?
2. **Status:** is the result established, reproduced in a model, conditional, externally open, internally exhausted, obstructed or interpretive?
3. **Provenance:** which primary source, numbered claim, data file or executable certificate controls it?
4. **Boundary:** what does the result not establish?
5. **Change condition:** what calculation or observation would promote, demote or defeat it?
6. **Ordinary residue:** if the programme-specific reading fails, what conventional result remains useful?

Use originating language as a search coordinate, not as proof. Preserve a contributor's wording when it carries a potentially useful distinction, attribute it, type it and test it. This is the repository's usewords posture.

## Suitable contribution shapes

- **Correction:** identify the exact sentence, equation, link, status or certificate that is wrong and provide the replacement evidence.
- **Reproduction:** rerun a certificate independently or replace it with a conventional proof.
- **Literature result:** attach primary prior art and state whether it confirms, narrows or defeats novelty.
- **Bridge test:** define the map, carrier, invariant and observable on both sides; shared names or dimensions are insufficient.
- **Experiment:** use the [experiment starter kit](corpus/programmes/frontier-physics-targets/experiment_starter_kit.md).
- **Manuscript:** use the [manuscript starter kit](corpus/programmes/closure/manuscript_starter_kit.md).
- **Negative result:** preserve the failed route, its assumptions and the smallest reopening datum.

## Repository practice

- Numbered claims are append-only historical identities. Correct them through a later claim or an explicit status note rather than erasing provenance.
- Edit canonical sources, not generated `docs/` output. The Edition 3 generator writes the book preview and website.
- Place executable research checks under `verification/` and durable inputs under `evidence/`.
- Keep unrelated working-tree changes intact.
- Do not promote a Claimipedia mirror, infographic or narrative synthesis above its cited scientific source.

## Minimum verification

Run the checks relevant to your change. For documentation and publication changes, the normal set is:

```powershell
node tooling/publication/generate_edition3_book_preview.mjs
node tooling/publication/generate_concept_map.mjs
node --test tests/publication/edition3_book_preview.test.mjs tests/publication/concept_map.test.mjs
node tooling/audit/audit_markdown_links.mjs
node tooling/audit/audit_spin23_corpus_manifest.mjs
```

For closure-programme changes also run:

```powershell
node verification/verify/verify_programme_closure_bundle.mjs
```

Report what you ran and any check you could not run. Passing a repository check establishes internal consistency, not physical truth.

## Tone and stewardship

Positive claims are welcome when their reasons support them. Kenotic presentation means authority proportional to evidence, not sterile language or automatic self-dismissal. State the good news, the limit and the invitation together. The [Claimipedia editorial standard](integrations/claimipedia/ARTICLE-EDITORIAL-STANDARD.md) gives the fuller presentation rule; the [Christian Stewardship Covenant](CHRISTIAN_STEWARDSHIP_COVENANT.md) is voluntary and adds no license restriction.
