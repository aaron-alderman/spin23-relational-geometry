# Claimipedia publication authority

The Spin(2,3) Edition 3 publication has one scientific source of truth:
[`book/edition-3/book.json`](../../book/edition-3/book.json), generated from this repository's canonical corpus by
[`tooling/publication/generate_edition3_book_preview.mjs`](../../tooling/publication/generate_edition3_book_preview.mjs).

Claimipedia is a verified reading-surface mirror. It may add narrative architecture, navigation, figures and other presentation metadata, but it must copy the canonical publication object's declared `authoritativeFields` without changing their values. In particular, Claimipedia does not independently assign finding IDs, replace citations, promote historical drafts or mutate frontier status.

## Synchronization rule

1. Regenerate and test the publication in this repository.
2. Copy every field named by `publicationAuthority.authoritativeFields` into the Claimipedia application through a Sourcery MCP task lane.
3. Record the source repository, source path and citation digest in Claimipedia's mirror receipt.
4. Verify exact equality of all authoritative fields before proposing or merging the lane.
5. Keep Claimipedia-only presentation fields outside the authoritative field set.

If Claimipedia contains material that is absent from the canonical corpus, that material remains a historical or proposal-only overlay until it is admitted here with resolvable evidence. It must not be merged into the canonical result ledger merely because it appeared on an older reading surface.

## Current reconciliation

The 21 October Claimipedia snapshot carried six response-ladder findings whose cited claim filenames no longer exist in the canonical corpus and whose `E3-F23`/`E3-F24` identifiers collide with later, evidence-backed torsion findings. They are therefore retained only as historical narrative context, not as current canonical findings. The current mirror takes its 24 findings, nine frontiers and citations from the generated Edition 3.1 publication object.
