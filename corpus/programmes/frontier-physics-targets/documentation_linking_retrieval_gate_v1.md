# Documentation, linking and retrieval gate v1

**Date:** 25 October 2026  
**Status:** passed  
**Machine authority:** [gate JSON](documentation_linking_retrieval_gate_v1.json)

## Verdict

The gate passes under its declared scope. All **16** governed roots are typed and present; **6,886** inventoried objects are explicitly classified; **23,331** root-closure links and **1,573** canonical claims have zero missing-link or working-copy divergence findings. The governed benchmark passes **30/30** cases at MRR **0.919**. Five additional held-out questions remain discoverable through 36 zero/default/maximum-centrality runs.

| Check | Result |
|---|---:|
| linkAuthority | pass |
| duplicates | pass |
| contradictions | pass |
| provenance | pass |
| retrieval | pass |
| centrality | pass |

## Duplicate and contradiction boundary

The duplicate scan is exhaustive over exact canonical content hashes, normalized claim titles and legacy identifiers. It finds one already-known legacy number collision, claim 963, whose two path-plus-hash identities remain distinct. The contradiction scan tests exact-content and normalized-title status conflicts. It does **not** pretend that lexical machinery proves global logical consistency; cross-wording semantic conflicts are reserved for the adversarial release audit.

## Centrality is not authority

PageRank and graph weight are navigation inputs only. The selector sweep tests graph weights 0, 0.3 and 0.6. A branch passes only if a declared target remains within the first ten results at every setting. This includes the newer sign-holonomy detector branch, so a high-centrality historical document may reorder results but may not make the minority branch undiscoverable.

## Retrieval strata

| Stratum | Cases | Pass | Mean reciprocal rank |
|---|---:|---:|---:|
| mathematics | 3 | pass | 0.778 |
| physics | 3 | pass | 1.000 |
| experiment | 4 | pass | 1.000 |
| ordinary_language | 4 | pass | 1.000 |

## Reproduce

~~~powershell
node scripts/generate-documentation-linking-retrieval-gate.mjs --write
node verification/frontier-physics-targets/verify_documentation_linking_retrieval_gate.mjs
~~~
