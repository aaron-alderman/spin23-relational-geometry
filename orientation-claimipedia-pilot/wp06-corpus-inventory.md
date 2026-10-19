# WP06 corpus inventory and rights gate

Status: design candidate; confirmatory corpus not frozen

## Decision

WP06 can begin method qualification, but it cannot yet begin confirmatory testing of cross-cultural mythic invariants. The available open corpus is suitable for testing whether the coding and analysis pipeline works; it is not sufficiently representative to warrant claims about humanity, mythology in general, or a collective unconscious.

This is a substantive boundary, not administrative caution. Sampling is part of the hypothesis. A universal-looking result from an English-heavy, European-classified corpus may be a property of collection, translation, genre, or editorial inheritance.

## Corpus roles

| Source | Permitted role | Rights state | Principal limitation | Decision |
|---|---|---|---|---|
| Bearing a Bag-of-Tales | Pipeline qualification; coder training; generic-story baselines | Paper and exact v1.1 archive README declare CC BY-SA 4.0; Zenodo's rendered licence field was blank when checked | 1,518 English-language, ATU-annotated tales derived from the Ashliman collection; not a world-representative myth corpus | Materialized and admitted to exploratory pilot only |
| Tehrani Little Red Riding Hood supporting data | Phylogenetic-analysis fixture; reproduce a bounded published method | Verify per deposited file before reuse | One tale complex and its relatives; demonstrates a method, not a universal invariant | Admit as bounded fixture after file-level licence check |
| Glottolog 5.3 | Language-family, geographic and leave-family-out sampling backbone | CC BY 4.0 | Contains language metadata and trees, not narratives; family classification is not cultural independence | Admit as sampling metadata only |
| Folklore Database | Candidate discovery and possible licensed expansion | Mixed: original material and compilation commonly CC BY 4.0; Berezkin-derived material CC BY-NC-SA 4.0; item-specific notices apply | Mixed provenance and rights; database-scale extraction requires direct agreement; ATU descriptions are separately protected | Hold pending written permission and record-level rights manifest |
| Forager Folklore Database | Candidate non-industrial-society expansion | Project materials indicate licences vary by source | Availability, coverage and permissions must be verified file by file; legacy transcription can preserve colonial collection distortions | Hold pending stable release, manifest and represented-tradition review |

## Sampling frame

### P: pilot qualification corpus

- Use Bearing a Bag-of-Tales to test ingestion, version identity, blind assignment, coder agreement, null-model execution and held-out scoring.
- Exact materialization: Zenodo v1.1, DOI `10.5281/zenodo.6575263`; downloaded MD5 `afa4f864a067356ad44dacb77f4ac548` matches the record; archive SHA-256 `e85c7898192f8befeff601fd6140d7c2995d27ac6fecb7d081c5e5d51539e495`.
- The extracted `aft.csv` has 1,518 rows, 182 distinct ATU identifiers, 406 distinct free-text provenance strings and 16 missing/NA provenance rows. All rows name Ashliman's Folktexts as the data source.
- Provenance strings are not clean cultural identifiers: some are places, others authors or collectors. They must not be mapped automatically to traditions or Glottolog families.
- The pilot may revise the manual once. All revisions must be versioned before any confirmatory material is revealed.
- Pilot estimates are engineering evidence. They do not count as evidence that the proposed invariants are cross-cultural.

### C: confirmatory corpus

Not yet admitted. Admission requires all of the following:

1. a record-level source, version, collector, publication date, language, translation chain and rights manifest;
2. permission adequate for the actual computational use and publication plan;
3. a declared sampling frame rather than convenience aggregation;
4. coverage across language families, macroareas, genres, collection periods and transmission conditions;
5. an explicit relatedness model for descent, borrowing and shared collectors;
6. review by people competent in, and where practicable accountable to, represented traditions;
7. a policy for sacred, restricted, communally held or context-sensitive narratives even when legal copyright has expired.

Public-domain status is not treated as equivalent to ethical permission, and legal permission is not treated as cultural authority.

### H: held-out transfer set

- Reserve entire traditions or language-family/macroarea blocks, not random tales, after C is fixed and before confirmatory coding.
- Do not select H using pilot effect sizes or observed invariant prevalence.
- Report failure to transfer as evidence against scope, not as an invitation to redefine the invariant after inspection.

## Rights and provenance rules

- Never copy ATU full descriptions merely because tale-type identifiers are usable.
- Keep database rights, narrative-text rights, translation rights and community standing as separate fields.
- Preserve the exact retrieved version and a content hash for every computational object.
- A source without a stable identifier or inspectable licence is discovery-only.
- Any later permission change creates a new corpus version; it does not silently mutate the registered one.
- Withdrawal and restricted-access requests are recorded as governance events, not treated as missing-at-random data.

## Representativeness audit

Before C is frozen, publish a coverage table by:

- Glottolog family and macroarea;
- source language and analysis language;
- oral transcription, literary adaptation or born-digital form;
- myth, folktale, legend and other declared genres;
- collector, archive and collection period;
- gender and social position of narrator where known;
- colonial/missionary/administrative collection context;
- rights basis and community-review state.

No cell-count balancing rule can by itself establish representativeness. The table makes the inferential perimeter visible and supports leave-group-out tests.

## Gate disposition

- **Retain:** the preregistered comparative programme.
- **Narrow:** the immediate claim from “test mythic invariants” to “qualify an invariant-testing pipeline on a reproducible but culturally narrow pilot.”
- **Hold:** confirmatory coding and all universal language.
- **No-go:** any result that promotes pilot recurrence into archetypal ontology, moral truth or Christian metaphysical proof.

## Sources checked 2026-10-19

- Glottolog downloads and licensing: https://glottolog.org/meta/downloads
- Folklore Database rights statement: https://www.folkloredatabase.com/copyright.php
- Folklore Database corpus interface: https://www.mythologydatabase.com/
- Bag-of-Tales data paper: https://doi.org/10.5334/johd.78
- Exact Bag-of-Tales v1.1 record: https://zenodo.org/records/6575263
- Forager Folklore Database project description: https://tei-c.org/Vault/MembersMeetings/2023/contributions/110.html

