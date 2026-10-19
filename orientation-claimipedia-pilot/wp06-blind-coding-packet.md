# WP06 blind pilot coding packet

Status: executable protocol candidate; no human coding completed

## Purpose and authority

This packet qualifies the coding process on the culturally narrow pilot corpus. It cannot confirm a cross-cultural invariant. Narrative text remains in the local rights-reviewed source and is not copied into Sourcery or the Claimipedia proposal.

## Deterministic selection

The source is exact `aft.csv` SHA-256 `2f56f0482c6a00b58a56a16d46b3b62225fb25544d63f4d0eefb519244344fd1`.

For each data row, compute SHA-256 over UTF-8:

`atu_id|tale_title|provenance|source|text`

Sort ascending by the full digest and select the first 120 rows. The frozen source-row sequence is in `wp06-blind-coding-packet.json`. Digest truncations may label packets but the full digest remains the identity check.

Partitions are fixed by selection order:

- 1–20: calibration;
- 21–100: reliability;
- 101–120: sealed holdout.

The selection is deliberately not balanced by ATU or provenance. This is a method-qualification sample, not a representative cultural sample. Balancing on those hidden labels would leak editorial structure into the coding design.

## Blinding

Coders receive only:

- opaque packet ID;
- normalized narrative text;
- paragraph and sentence anchors generated without semantic transformation.

Coders do not receive title, ATU identifier, provenance, notes, bibliographic source, data-source label, expected prevalence, proposed sequence, Peterson/Jung framing, or other coders' decisions.

The coordinator keeps the row/digest crosswalk. Analysts do not open the holdout partition until the reliability gate and manual version are frozen.

## Coding form

Each proposed transformation is coded independently as `present`, `absent`, `uncertain` or `not-applicable`:

1. established order or viable routine;
2. anomaly, disruption or insufficiency;
3. boundary crossing or exploratory departure;
4. costly commitment, renunciation or irreversible stake;
5. disintegration, defeat or loss of prior organization;
6. acquisition, reconciliation or reorganization;
7. return, transmission or social incorporation;
8. renewed but altered order.

For `present`, the coder records start/end anchors and a one-sentence functional rationale. Surface vocabulary is not enough. For `uncertain`, the coder records the ambiguity rather than forcing a binary decision.

Coders separately record temporal precedence edges between transformations. They are never instructed that all eight should occur or that the numbered list is an expected order.

## Rival coding

A separate team, blind to the orientation codes, applies the prespecified generic story-grammar and event-valence/agency codebooks to the same packet IDs. The orientation manual is not shown to that team. This reduces demand characteristics and makes relative held-out performance meaningful.

## Workflow

1. Three coders independently code the twenty calibration narratives.
2. Disagreement review may revise the manual exactly once. Revision reasons and examples are versioned; no reliability narratives are inspected.
3. Three coders independently code all eighty reliability narratives.
4. Compute Krippendorff's alpha with missing/uncertain handling declared in advance, prevalence by code, pairwise confusion matrices and a prevalence-robust sensitivity statistic.
5. Primary admission requires alpha >= .80 for the aggregate protocol and no primary transformation below .67. A transformation between .67 and .80 is exploratory only. Below .67 it is removed from confirmatory use.
6. Freeze the manual and models. Only then unseal the twenty holdout narratives.
7. Score orientation and rival models on the same held-out cases. Report uncertainty and all null comparisons.

The aggregate gate cannot conceal a single unreliable code. Conversely, a rare code is not declared reliable merely because raw agreement is high.

## Failure and correction rules

- If coders repeatedly infer transformations from genre expectations rather than textual anchors, narrow or retire that code.
- If the proposed sequence performs no better than generic story grammar, retire the invariant advantage claim.
- If results change materially when titles or provenance are unmasked, classify editorial context as a competing mechanism.
- If calibration revision absorbs every disagreement, stop: the manual is functioning as an unfalsifiable redescriber.
- If the holdout fails, do not reopen it as training data under the same version.

## Third-order audit

The packet itself may manufacture the object it seeks. Numbered transformation categories, English translations and ATU-curated tales all invite sequential readings. Separate presence from order, retain absence as a legitimate result, compare rival grammars, and interpret any success as performance on this corpus—not discovery of an ontological archetype.

