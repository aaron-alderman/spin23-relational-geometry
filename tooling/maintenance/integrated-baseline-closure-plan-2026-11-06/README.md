# Integrated platform baseline: finite closure plan

Latest engineering checkpoint (7 November locally): platform **`091dfd0a2698ab124e9861881fca5bad0f171c94`** passed committed-source checks (2,401 platform / 111 standalone algebra / 11 policy), assembly/Claimipedia qualification (**35 suites / 2,760 checks**, 424 contracts / 431 native witnesses) and **both 38-stage isolated bootstraps**. The [auth native-boundary audit](../auth-native-boundaries-2026-11-06/README.md) preserves the receipts and source/architecture delta. Disk-cache recovery permitted the unchanged 6 GiB admission requirement; all disposable verification copies were reclaimed. This advances the auth vertical slice and removes five runtime findings, with zero new finding IDs relative to its preceding auth commit. Seven retained-control findings and wider architecture obligations remain explicit; no work package or F2 is closed merely by this checkpoint. H1 remains paused. The original planning universe below remains preserved as its historical anchor.

This plan is anchored to source **`6698bb52af183333692335c979618e15c9a02c45`** and qualified audit **`1e930eb9cd51457bf7a8c1a2a0803cc3bb37ad7c`**. It defines **16 work packages** across five work areas and final certification. It completes planning, not the integrated platform baseline. Computer use remains paused.

The existing development baseline remains qualified: 424 bounded specifications, 2,146 source checks (including one observation helper), 17 artifact suites / 2,494 checks, and two 20-stage isolated bootstraps. The last source change extracted ten numeric auth/session defaults and validation rules; it did not complete authentication, authorization or generic effect decomposition. Existing bounded coverage is preserved, not reopened as another 424-contract backlog.

The recommended next integrated chunk is **A1: source catalogue and implementation correspondence**, prioritizing current-runtime relationships. Its deliverable is a complete crosswalk between retained declarations, actual current implementation paths, source owners and unresolved semantic gaps. Then **A2** takes authentication/identity/authorization through authored decisions, reusable mechanisms and explicit effect ports as one complete vertical slice, followed by managed integration qualification. Canvas/history evidence review and output-family inventory can progress independently. This plan does not spawn agents or authorize computer use.

## Exact remaining universe

| Snapshot | Count | Meaning |
| --- | ---: | --- |
| Assurance finding IDs | 4,561 | All original IDs retained in [finding-index.json](finding-index.json), representing 4,648 recorded occurrences |
| Findings touching the current runtime graph | 574 | Direct runtime membership or a duplicate comparison member; not 574 independent defects |
| Catalogued files outside the current runtime graph | 2,339 | Historical, tooling, test or other source needs review; this classification does not exempt repository-owned gates |
| Unresolved catalogue coordinates | 1,646 | Declared relationships need source/implementation correspondence; do not create placeholders to suppress them |
| Cross-source comparison findings | 2 | Separate graph-level comparisons |
| Current runtime modules | 892 | Every exact module key/hash is indexed in [runtime-index.json](runtime-index.json); 565 SDK libraries are a subset |
| Dynamic/external/require sites | 13 | Each exact observation and custodian is in [boundary-index.json](boundary-index.json); the 15 retained-site crosswalk stays preserved |
| Declaration-only observations | 7 | Named individually in [declaration-observations.json](declaration-observations.json); they are not executable generic proofs |
| New drift findings / metric regressions | 2,241 / 1,157 | Preserved in [drift-index.json](drift-index.json); overlap the other counts |

There are **296 Sourcery thick-module findings and 348 Sourcery possible-hidden-default findings**. The wider ten-repository report has 1,333 and 1,575 respectively. It also contains 1,589 interpreter-coordinate findings, 57 missing-source findings, two source-kind mismatches, three missing-subject findings and two duplicate-source findings. Raw counts are not effort estimates or independent confirmations.

The existing formal goal audit has 13 requirements: ten proven and three incomplete—drift, thin boundaries and hidden defaults. Source-history, Canvas authority, actual host verification and reproduction obligations also remain; passing the 13 formal checks alone is insufficient for the overall baseline.

## Work packages and completion evidence

Full scope, exact acceptance conditions, evidence paths, owners, blockers and dependencies are in [work-packages.json](work-packages.json). Dependencies gate completion; they do not prohibit useful preparatory work.

| ID | Deliverable | Evidence needed to close |
| --- | --- | --- |
| A1 | Source/declaration correspondence | Every catalogue/duplicate finding mapped to actual source and owner, repaired or explicitly linked to an open authority/semantic obligation; no placeholders or erased history |
| A2 | Complete runtime decomposition | Every runtime module dispositioned as generic mechanism, authored policy or thin effect port, with executable evidence; all 424 specifications preserved and seven declaration observations explicitly scoped |
| A3 | Thin executable boundaries | Existing Sourcery `thick-mjs=0` gate passes through actual decomposition, not cosmetic file splitting |
| A4 | Authored defaults | Existing Sourcery `possible-hidden-default=0` gate passes; domain fallback ownership and missing-policy behavior are explicit |
| A5 | Architectural/drift closure | Unchanged drift check has zero new findings/regressions; all 13 formal requirements pass; original finding crosswalk preserved |
| E1 | Dynamic execution admission | Each of the 13 sites enforces allowed identities/capabilities and denial before effects; substitution and lifecycle controls pass |
| E2 | Effect/environment custody | Every effect has explicit authority, input/output, failure, cancellation and persistence semantics; declared imports alone do not grant runtime permission |
| S1 | Canvas source authority | Recover `sdk/plugins/canvas/canvas-stdlib.rel` or explicitly identify/reconcile an authorized replacement; the derived 205-entry vocabulary is not canonical schema authority |
| S2 | Missing-history disposition | Audit the two existing tested reconstitutions against the already authorized alternative, or recover the exact missing commits; name any genuinely unmet historical requirement |
| H1 | Current native browser/workbench | After the user resumes computer use, execute the final-revision reader/auth/canvas/inspector/publication/conflict/lifecycle interaction matrix and retain native evidence |
| H2 | Actual connector/host profiles | Exercise configured PostgreSQL, Temple, packages and host boundaries with real success/refusal/reconnect/disposal evidence, distinguishing local SQLite evidence already obtained |
| R1 | Cache reproduction | Establish the actual active generation, reproduce superseded candidates from identified snapshots/overlays, compare, and record a per-generation disposition |
| R2 | Research-output reproduction | Refresh family/input inventory, resolve unreadable paths, reproduce outputs with exact-byte or declared scientific-invariant comparisons; retain anything unproved |
| R3 | Preservation-led consolidation | Preserve ignored operator state and all source/history first; retire only individually justified targets, with junction-safe handling and restoration evidence |
| F1 | One final integrated revision | Explicit pins/profile; source checks, managed assembly/all consumers/Claimipedia and both bootstraps pass with matching identities, byte checks, stopped readers and removed scratch |
| F2 | Final baseline certificate | All required package evidence and source/host identities close, original edits/overlays/refs/bundles pass integrity checks, and no required blocker is hidden |

## What can proceed now

The agent can perform A1–A5, design/enforce E1–E2 with local controls, audit existing reconstitution receipts, search identified accessible sources/backups, inventory reproduction inputs and build host harnesses. Begin with **A1**, alongside **S1/S2 evidence review and R2 inventory**. Implementation, source authority and host verification should progress toward these fixed deliverables rather than accumulate unrelated extraction milestones.

Existing Epistemic and Science reconstitutions are already pinned and tested. S2 is first an evidence/requirements review, not an instruction to rebuild them or demand another approval automatically. The missing originals are Epistemic `274a2a541789ee2e8b6576ec3aeb5d9651165338` and Science `647e065a69867ee767c5d9b7dac04bdce1946d19`. Explicitly identified reconstitution and exact historical recovery are different claims. Use existing authorization where it applies; ask only about a concrete unresolved authority conflict or unavailable information.

## Actual holds and external dependencies

- **Computer use:** H1 is paused by the user's explicit instruction. No elapsed time, passing Node test or planning approval resumes it.
- **External hosts:** H2 may need actual PostgreSQL/Temple profiles, credentials or capabilities. Prepare the harness and inspect available configuration before requesting missing information. This plan grants no production or third-party write authority.
- **Source evidence:** additional backups/snapshots and canonical Canvas provenance may need locations or an authority decision not present in current evidence. Recovery has not been declared impossible.
- **Reproduction:** runtime databases/overlays, research inputs and access to historically denied paths may be unavailable. The three cache generations and approximately 0.40 GiB of readable output with 37 denied paths are historical observations, not refreshed current sizes.
- **Remaining worktree:** [worktrees.txt](worktrees.txt) freshly records `saturation-refresh` as registered. The older recovery report records ignored Context Hub state/previews there; refresh and preserve these before any retirement. Listing a checkout is not a fresh audit of all its ignored content.

No deletions are authorized by this plan. Retain all source/history archives, Context Hub state, caches and research outputs until their own evidence permits a concrete disposition.

## Qualification and closure rules

Use the maintained [managed runner](../managed-validation/README.md) for source changes; update its actual committed pins, hashes, graph and added-test expectations explicitly. Preserve every existing assertion. Do not copy dated full-validation drivers or create accumulating validation destinations. H1/H2 must identify the same final source revision as F1; later changes invalidate affected host evidence.

Do not reset residual ledgers, raise ceilings, weaken detectors or promote a custody record into generic proof. AST findings are candidates requiring semantic review; a benign-syntax review note does not remove an unchanged formal finding. Any warranted measurement-policy correction is a separate reviewed/versioned change with fresh evidence, never a retroactive claim that the old gate passed.

The finite scope is this pinned source snapshot plus the explicitly named source/host/reproduction obligations. Append genuinely new findings with source identity and crosswalks; never silently drop old ones. No percentage-complete or total effort estimate follows from overlapping counts.

[plan.json](plan.json) binds the evidence identities and sequence. [verification.json](verification.json) checks all 4,561 finding IDs/4,648 occurrences, drift records, 892 live runtime file hashes, 13 boundaries, seven declaration observations, evidence hashes and an acyclic dependency graph. [Managed preflight](managed-profile-preflight.txt) confirms the existing qualification profile without allocating scratch. No new application behavior changed, so the prior full qualification remains the engineering baseline; the planning checks are not another application qualification run.

Complete **F2** before marking the integrated baseline complete. Completion of this planning goal leaves that larger baseline objective active.
