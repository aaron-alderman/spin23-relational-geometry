# Reconstitution receipt — 2026-11-03

## Scope

The empty local `expression-algebra` and `claimipedia-core` repository roots
were reconstituted from the broadest surviving task-worktree witnesses. No
deleted upstream history was recreated and no task-worktree was removed.

| Repository | Witness | Local commit | Result |
|---|---|---|---|
| `expression-algebra` | `expression-algebra-verify-ed25519` | `5bcde83eb3ff167ba49df57a1463ce242ad389dc` | 99/99 tests passed |
| `claimipedia-core` | `claimipedia-core-dom-expression-8` | `8913a82` (on `cf5c757`) | source-closure check passed; 61/63 tests passed |
| platform SDK witness | surviving `sourcery-platform/sdk` runtime closure | `667b2c2` | local package boundary restored |

## Boundary repair

`claimipedia-core` originally resolved `@temple2/platform-sdk` through an
empty local path. A local adapter package now exposes the declared runtime
surface (`rel-core`, `engine`, DOM runtime, projection, and markdown renderer)
from a tracked SDK witness. The adapter adds no domain semantics.

## Historical-oracle recovery — updated 2026-11-04

The initial Core run could not resolve commits
`844fa64abe4ee58f37add8f8e1b8e9fcfe2343d2` and
`dfb98dbb630b1bf00ca1e0da2d3dbf81e73bc048` from its reconstructed Git store.
Both exact objects were subsequently found in the isolated recovery clone and
imported under recovery refs. This supersedes the earlier assertion that they
were unavailable after approved history cleanup; that causal assertion was
not established by the initial test failures.

Running the recovered comparisons exposed duplicated SDK value-helper
identities. The local SDK adapter now imports the shared retained algebra
helpers. Core passes 71/71 tests, including the historical comparisons and
isolated neutral-reader installation. The missing Epistemic Core and
Claimipedia Science local histories remain a separate unresolved gap.

The complete classification is machine-readable in
`claimipedia-core/provenance/reconstitution-residuals.json`. A scan of the
executable algebra, core, and SDK roots finds zero references to either deleted
commit.

## Authority status

The reconstructed repositories are local recovery witnesses, not asserted
upstream canonical repositories. Their original task worktrees and the
external SDK source remain preserved for independent comparison.

## Retained blank-bootstrap proof — 2026-11-04

The canonical composition interpreter was recovered from retained
`sourcery-core` commit `5b1097ffe8cadadf7e86fa988c4b4dda88e2dfd4`.
The retained platform, capability, and application projections were then
assembled from their GitHub-derived contents without external local paths.

- 12,905 unique composed files; all three layer manifests verified.
- Full platform runtime import/resource closure passed.
- Optional browser evidence dependency `playwright` is explicitly
  `optional-not-admitted` and `dynamic-only`; it is not silently bundled.
- Integrated programme completion passed.
- Receipt: `sourcery-platform-authority/assurance/receipts/full-bootstrap-assembly-proof.json`.

The earlier record reported removal of the temporary assembled target. A 4 November recheck found `.tmp-full-assembly` still present; it remains retained.
The remaining open work is programme-wide semantic/effect-boundary
reconstitution and assurance, not composition or runtime bootstrap.

## Fresh recovery verification — 2026-11-04

Both Core historical oracle commits were found in the isolated recovery clone and imported under explicit recovery refs. Repairing duplicated SDK helper ownership then produced **71/71 passing Core tests**, including the historical comparisons and isolated neutral-reader installation.

A fresh full assembly of candidate `6d05a67755cf5e88c4cd9999f96e6713b113d0a7` verified **12906 composed files**, all layer manifests, runtime consumer closure, and the scoped programme-completion check. It retains `applicationAuthority: false`. The previous 12,905-file receipt describes an earlier seal; the fresh count is 12906. The new validation target `.assembly-validation-2026-11-04` remains retained.

Current GitHub main and the candidate diverge from `49924654f7476f0a2b73597680fa8dc3ac2ce5e5` (37 candidate-only and 52 upstream-only commits). This verification does not promote the candidate or establish current-upstream equivalence. Epistemic Core and Claimipedia Science exact local history recovery, legacy dirty-state reconciliation, direct semantic/effect assurance, and cache/output regeneration remain open.

Current audit: `tooling/maintenance/consolidation-2026-11-04/README.md`.

## Selected local integration source — 2026-11-04

Source `sourcery-platform-reconciled` at `04ded4687761514008c6c7a356f58a8a22c6a67a`, branch `codex/reconcile-platform-sources`, retains both previously divergent heads. The source-only upstream boundary is preserved; local authored policy and workspace-runtime changes remain, with shared reader helpers and public reader SDK entrypoints. Platform tests pass 41/41; external verifier tests pass 5/5; Core passes 71/71 against this SDK, first in isolation and then after local dependency adoption; focused Claimipedia checks pass 9/9.

The full assembled runtime verifies 13039 composed files using a fresh local generated link materialization after a byte-copy rebuild exhausted disk space. Only the newly generated failed partial target was removed. Links join generated snapshots/assemblies, never retained source repositories. This result is local validation, not a standalone deployment copy or canonical Core composition certificate.

Core now explicitly depends on `../sourcery-platform-reconciled/sdk`. The previous adapter witness remains preserved. Legacy working material is accounted for separately; unfinished migration tests and absent paths are not silently admitted or discarded. Source-history recovery and cache/output regeneration holds remain. Audit: `tooling/maintenance/platform-reconciliation-2026-11-04/README.md`.

## First legacy test qualification tranche — 2026-11-04

Source `f9cc5e4726ef803465673cc72fca713912291828` ports the auth-provider diagnostic and session projection components and two unchanged retained tests. Exact predecessor A/B checks and actual runtime/refusal checks pass; platform suite 48/48, Core 71/71. One retained forwarded-identity file also passes against the existing implementation. Of the 145-file cohort, 2 are qualified ports, 1 is qualified existing behavior, and 142 retain explicit prerequisite gaps. This is runtime conformance, not proof of executable algebra. The latest full assembly remains at predecessor `04ded46`; no new full materialization or deployment was performed. Audit: `tooling/maintenance/legacy-migration-qualification-2026-11-04/README.md`.

## Routing ownership qualification — 2026-11-04

Source `dd39e52b7552f9fd1f18730afb460b2f8c6071d5` retains route matching, authored cache facts and cache-header policy in Sourcery. Three retained test files have explicit ownership/API amendments with all 11 expected assertions preserved; no generic operator was added. A historical extraction's whitespace change and an access-policy undefined/empty-string difference are recorded, not silently promoted or fixed. Routing checks 12/12, source 60/60, Core 71/71, unchanged shared algebra 99/99 pass. The cohort now has 2 unchanged-test ports, 1 existing-runtime qualification, 3 amended-owner qualifications and 139 unresolved files. Full assembly remains at `04ded46`, not recertified here. Audit: `tooling/maintenance/routing-ownership-qualification-2026-11-04/README.md`.

## Routing selector qualification — 2026-11-04

Selected source remains `dd39e52b7552f9fd1f18730afb460b2f8c6071d5`, unchanged. Two additional retained files have explicit Sourcery authored-fact input/ownership amendments, preserving eight expected assertions. Normalization's unknown-mode refusal remains unresolved because the selected owner has separate functions and no mode dispatcher. Nine focused checks, source 60/60, Core 71/71 and unchanged shared algebra 99/99 pass. Eight files now have scoped qualifications; 137 remain unresolved. The one()-only boot source interface fails on lane-binding reads; the boundary is recorded, not broadened silently. Full assembly remains at `04ded46`. Audit: `tooling/maintenance/routing-selector-qualification-2026-11-04/README.md`.

## Integrated platform candidate — 2026-11-04

Platform `c57f2679c3500174390e8f06c173a62bc90a0cbb` recovers the modular semantic mutation subsystem from retained Git, retaining selected authored action/slot ownership. All 314 historical expected assertions across 90 cases remain preserved; six public operation cases exercise integration. Actor propagation and scalar replacement were repaired. Source 156/156 and a fresh ordinary-copy assembly of 13,269 composed files pass. The isolated current Claimipedia graph uses assembled SDK/algebra bytes: semantic 98, Core 71, application 35, Epistemic Core 88, reader science 15, Science Programme 51, qualification runner 24, Git Receiving 14 and Frontier 99 tests pass. Core's package-copy fixture was made portable; exact oracle Git history is explicit validation input. Two damaged dependencies now have separately identified local reconstitution commits, not recovered missing exact histories. All 83 retained semantic migration files were executed: one original passes and 82 retain unresolved generic/API/declaration contracts. The complete retained cohort has 9 scoped qualifications and 136 unresolved files. This is a functional local integration candidate, not completed migration, scientific admission, production activation or final cleanup certification. Audit: `tooling/maintenance/integrated-platform-baseline-2026-11-04/README.md`.

## Semantic mutation contract resolution — 2026-11-04

Platform `f534f34d2562df684fa8a6be48f0297a6b5a62c9` qualifies all 82 previously unresolved semantic mutation contracts under explicit Sourcery ownership: 80 preserve expected contracts, and two amend authored action-policy inputs/ordering and stale-target fingerprint semantics. The 97 value exports are linked from 63 production domain modules. New REL resources are contract specifications, not recovered executable algebra. Empty restore fields, retraction/order-blind target identity and compatible-contract delimiter collisions have concrete predecessor counterexamples and current refusal/regression checks. Source 299/299 and a fresh ordinary-copy assembly of 13442 files pass; all nine artifact consumer suites pass, including semantic mutation 236, Core 71 and Claimipedia 35. All 83 selected semantic files are qualified; the complete retained cohort is now 91 qualified and 54 unresolved outside this subsystem. Literal original generic imports remain unavailable: 14 unmodified semantic files pass and 69 retain their original incompatible imports/API expectations. No scientific acceptance, deployment, pruning or final cleanup certification is granted. Audit: `tooling/maintenance/semantic-contract-resolution-2026-11-04/README.md`.

## Integrated remaining-contract migration — 2026-11-04

Platform `6d7c51d1d1c2567ef22a89390d6e8c3135db8c95` and Core `6db7e2281df108eb3883160a4544c69bea951298` qualify the remaining 54 selected runtime/domain and assurance contracts (97 cases, 292 assertions): 47 files preserve assertion ASTs and case names, eight explicit amendments include one fixture-only amendment, and three syntax-damaged originals have repaired selected copies. The complete selected retained cohort is 145 qualified and zero unresolved. Literal original APIs remain separately observed: 20/54 original witness files pass, 34 fail. Source 404, Core 72, shared algebra 99 and all eleven ordinary-copy artifact suites pass, including migration 105, semantic mutation 236 and Claimipedia 35. The exact predecessor shutdown counterexample is closed. Current architectural assurance still refuses its historical residual baseline (49 unowned active semantic MJS, 700 regressions); goal completion, missing local histories, production admission, executable algebra and cleanup certification remain open. Audit: `tooling/maintenance/integrated-contract-migration-2026-11-04/README.md`.
