# Terminal-neighbourhood candidates v1

**Generated:** 2026-10-26

**Status:** 0 of 88 neighbourhood checks remain unreviewed

**Machine authority:** [terminal-neighbourhood register](terminal_neighbourhood_candidates_v1.json)

EXIT-02 applies eight reopening moves to every topic currently marked closed or blocked. The present queue contains **11 terminal topics** (9 closed and 2 blocked) and **88 checks**. A closure proof remains valid while a nearby variant becomes a new child topic; the point is to prevent “this route failed” from silently becoming “the neighbourhood is exhausted.”

A reviewed cell must retain evidence, a finding, inherited consequences and the minimal reopening datum. “Not applicable” requires a reason. New terminal topics enter the matrix automatically on regeneration, while completed reviews are preserved by stable identifier.

## Reproduction

~~~powershell
node scripts/generate-terminal-neighbourhood-candidates.mjs --write
node verification/frontier-physics-targets/verify_terminal_neighbourhood_candidates.mjs
~~~
