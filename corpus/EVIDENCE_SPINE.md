# Corpus evidence spine

This generated surface joins each numbered claim to its exact retained identity and the evidence-bearing links that can be observed in repository text. The complete, drill-down-preserving record is [`registers/corpus_evidence_spine.json`](registers/corpus_evidence_spine.json).

It is deliberately conservative:

- **observed** means an exact declaration, link, path, line, byte count, or hash was found;
- **inferred** means a reversible namespace, inbound-reference, or title-pattern classification was applied;
- **missing** means this generator found no join, not that no evidence or consumer exists.

The spine never promotes a claim, converts a passing script into a broader proof, treats an inbound link as endorsement, or changes the canonical manifest. Its text basis is the current working tree; each record separately carries the canonical manifest identity and reports divergence.

## Coverage

1573 claim documents are indexed by path plus canonical SHA-256. There are 1572 unique legacy numeric IDs and 1 preserved collision(s). 1573 claim files match their canonical identity; 0 differ in the working copy.

| Join | Observed | Inferred | Missing |
|---|---:|---:|---:|
| source | 82 | 155 | 1336 |
| evidence | 331 | 7 | 1235 |
| certificate | 589 | 803 | 181 |
| scopedVerdict | 526 | 343 | 704 |
| knownConsumer | 0 | 231 | 1342 |

The index contains 12554 observed outgoing links, 700 inbound consumer candidates, and 0 unresolved local claim links.

## Record contract

Each claim record contains a collision-safe `key`, canonical and observed file identity, exact title/status/scope/verdict observations, inferred title signals, typed outgoing links, inbound references, and per-dimension coverage. Observed identity uses the manifest's CRLF-normalized byte convention for direct comparison and also retains raw on-disk bytes and SHA-256. Every link and declaration retains its source path and line. Semantic roles inferred from filenames, namespaces, or backlinks are explicitly marked inferred.

Regenerate or check from the repository root:

```powershell
node tooling/indexing/generate_corpus_evidence_spine.mjs --write
node tooling/indexing/generate_corpus_evidence_spine.mjs --check
node --test tests/repository/corpus_evidence_spine.test.mjs
```
