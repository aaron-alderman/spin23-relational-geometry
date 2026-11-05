# R2: current output and reproduction-input inventory

This is partial R2 evidence, not a reproduction certificate or deletion proposal. [Inventory](output-inventory.json), [per-file observations](output-files.json), [bounded scanner](inventory-outputs.mjs).

The current scan observed **833 regular files, 433,134,901 bytes by file metadata and 18 populated families** under `output/`. It hashed 312,801,097 bytes, followed no links and did not hit its 25,000-entry limit. There are **37 failed operations**, including directory-listing failures: additional files beneath denied directories are unknown, so 833 is not a complete file count for all stored content. The 120,298,991-byte `plasma-heart-reduction/projection.svg` exceeded the intentional 64 MiB per-file hash limit and was left unhashed.

The directory contains copied Python package environments as well as research results. Many denied paths are within those environments. They require dependency/version and active-use classification; neither folder names nor reproducibility of a neighboring result make them disposable. The readable family sizes are not all scientific-result sizes.

Candidate driver references were scanned from 1,622 source/document files in `tooling/plasma-heart`, `verification/derive` and `verification/verify`. A candidate is only a literal family-path reference, not a verified producer, complete dependency closure or executable regeneration command. A zero-candidate family does not establish that its producer is absent: source may use computed paths or live outside these roots.

The remaining R2 work is to separate result versus environment artifacts, complete the producer/input/version/seed mapping, resolve or explicitly preserve unreadable content, and regenerate outputs in owned bounded scratch. Exact-byte or documented scientific-invariant comparisons are required before proposing retirement. Unknown or unreproduced material remains retained. This scan did not run scientific computations, change outputs or grant scientific admission.

## Resolved access limits and expanded observations

[Read-access probes](read-access-review.json) were run in a permitted read-only context outside the restricted sandbox. All 37 output paths and both cache overlay paths were accessible there. These are no longer treated as missing inputs or user-access blockers. The three recorded base-database references still returned `ENOENT` at their exact named paths; other recovery locations remain unsearched.

The [expanded inventory](expanded-output-inventory.json) and [expanded file index](expanded-output-files.json) preserve the original results separately. They observe **5,560 regular files / 572,139,945 bytes**, with no access failures, traversed links or entry-limit hit. They hash **451,840,954 bytes**. The remaining 120,298,991-byte projection SVG exceeds the 64 MiB per-file limit and would also exceed the remaining 512 MiB whole-scan hash budget. Expanded metadata is not an atomic snapshot, proof of reproducibility or a retirement decision.

## R1: runtime caches

The [fresh cache inventory](runtime-cache-inventory.json) records the same three generations, **451,244,442 bytes**, and unchanged historical marker hashes and sizes. The databases were not opened. The fresh access probes refine its initial restricted-context observations: two overlay paths exist and are accessible; three base-database references are not found. A connected Temple MCP generation is not an application cache pointer. No active application-cache generation, sufficient snapshot/overlay recovery or regeneration is established, so all generations remain retained and R1 stays open.
