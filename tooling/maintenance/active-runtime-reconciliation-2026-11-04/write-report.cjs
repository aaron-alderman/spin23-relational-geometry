const fs=require('fs'),path=require('path'),audit=__dirname,read=n=>JSON.parse(fs.readFileSync(path.join(audit,n))),summary=read('baseline-summary.json'),integrity=read('final-integrity.json'),reconciliation=read('decomposition-reconciliation.json'),assurance=read('current-assurance.json'),one=read('bootstrap-a.json'),two=read('bootstrap-b.json');
fs.writeFileSync(path.join(audit,'README.md'),`# Current runtime module/decomposition reconciliation

Platform source: \`${summary.platform}\`. Core: \`${summary.core}\`. This chunk qualifies the **current runtime source catalogue, static source links and repeatable local integration**. It does **not** resolve the old semantic decompositions, prove generic executable algebra, qualify a database service or certify global architecture. Global completion remains false.

## Current runtime catalogue and corrected ownership

The catalogue covers **885 MJS modules**, **613 source entry points** and **1,823 static source edges** across the selected SDK/package interfaces and the actual Claimipedia server closure. Roots include all 558 inventoried SDK runtime library modules, declared package export modules outside historical Frontier source packages, and the Claimipedia application entry point. This is an explicit source/library universe; it does not mean all libraries execute during a reader bootstrap.

The gate reads current bytes and package exports, follows literal imports and re-exports, resolves imported binding identities through cyclic graphs, detects missing paths or named exports and ambiguous star exports, and checks JSON import constraints. Source hashes, observed interfaces, dependency edges, package manifests and old declaration relations must match the checked catalogue exactly. Changed or fabricated metadata and authority grants refuse. Nonliteral imports, require calls and external package loads have **17 exact byte-bound boundary records**. Those records provide custody and limitations; they grant no execution or external availability.

Historical interpreter registration no longer assigns implementation ownership. In particular, the semantic-mutation source is no longer presented as owned by an old browser characterization. Reports expose \`runtimeModule\` for the validated current implementation and \`legacyInterpreterRegistrations\` separately with runtime equivalence unproved. The old registration index cannot by itself hide a semantic island. This exposed five assurance tools and three focused-geometry scientific witness modules previously counted through registrations alone. Their separately reviewed custody records grant no scientific acceptance or generic algebra. Current custody: **134 records**; capability observations: **1,402 records**; **zero unowned active semantic MJS** in this observation.

The source gate is \`scripts/check-runtime-modules.mjs\`. Ordinary source and both fresh bootstraps observe their actual Git roots. Assembly verification supplies captured source observations explicitly, then reads the generated source bytes and assembled SDK. These are separate observation adapters for the same catalogue comparison. The runtime gate does not replace the global historical assurance gate.

## Concrete Postgres loading fix

The graph exposed \`pg\` as a static external import in \`sdk/plugins/postgres-rel/server-service.mjs\`. An actual predecessor import failed with \`ERR_MODULE_NOT_FOUND\`, even when the caller intended to supply the existing pool-factory port. The retained dependency payload has no admitted pg package. \`postgres-predecessor-import.txt\` retains the failure against source \`522758019cc3ccd48884697cf3cd40fbf86c528e\`.

The default pool factory now loads pg only when requested, at the existing awaited factory boundary. Missing driver imports produce \`postgres-driver-unavailable\`, status 503, with the original cause. The service's public factory remains synchronous and supplied factories retain the existing await behavior. No driver was installed or admitted.

Three regression cases pass in source and assembly: module/lifecycle use with an injected factory and no installed driver; a missing default driver gives the bounded refusal; and an injected pool preserves read-only transaction setup, COMMIT/ROLLBACK, client release and refusal of DELETE before it reaches the client. All database operations in those cases use a supplied fake pool; no database connection is made or qualified. Other Postgres policy/default changes are outside this fix. Optional terser loading and its availability also remain explicitly outside admission.

## Historical decompositions remain visible

All **424 PlatformModule declarations** are reconciled by physical path and current runtime membership in [decomposition-reconciliation.json](decomposition-reconciliation.json). A present file does not establish semantic equivalence; an absent file does not establish retirement.

| Observation | Declarations |
| --- | ---: |
${Object.entries(reconciliation.dispositionCounts).map(([k,v])=>`| ${k} | ${v} |`).join('\n')}

All **${reconciliation.previousModuleFindingIdentities} prior module-related physical finding identities** remain observed, with none accepted or silently suppressed. This includes 1,592 missing interpreter/component identities, 370 missing source declarations and 377 incomplete symmetry declarations. Full current assurance observes **${assurance.report.findings.length} physical finding identities** (${assurance.report.summary.findingOccurrences} occurrences). The total increased with the new assurance implementation's measured complexity/default candidates; there is no new residual-baseline acceptance. The legacy regex baseline remains incomparable with current AST measurement, and its strict drift gate remains closed. Thin/default-free and semantic-zero claims remain unproved.

The next semantic migration should use the verified current graph to translate retained contracts against their actual implementations, starting with live entry points whose REL declarations or component descriptions are absent or stale. Preserve explicit defaults, failure order, information loss and authority boundaries. Do not restore old decompositions or mark them retired merely to make counts fall.

## Integrated verification

**434 source checks** passed with zero failures or skips, including one helper module discovered by Node. A fresh ordinary-copy assembly contains **${summary.assemblyFiles} files**. All **14 artifact suites / ${summary.artifactChecks} checks** passed, followed by the actual runtime catalogue CLI against the generated platform proxy and ordinary-copy assembled SDK.

| Artifact suite | Checks | Result |
| --- | ---: | --- |
${summary.artifactSuites.map(r=>`| ${r.receipt} | ${r.expectedTests} | pass |`).join('\n')}

Both isolated local Git-bundle bootstraps passed the same runtime module gate, Core's source check and 72 tests, Claimipedia's 35 tests, and an actual loopback reader. Each returned GET 200, refused POST 405, stopped its child reader and verified recorded source bytes afterward. They produced identical stable source/model/body/writing-authority identity:

\`${summary.bootstrap.sourceIdentity}\`

| Observation | Run A | Run B |
| --- | --- | --- |
| Model | ${one.reader.model} | ${two.reader.model} |
| Root SHA-256 | ${one.reader.bodySha256} | ${two.reader.bodySha256} |
| GET / POST | ${one.reader.status} / ${one.reader.mutationStatus} | ${two.reader.status} / ${two.reader.mutationStatus} |
| Runtime module gate | 885 modules, pass | 885 modules, pass |

Paths, Git metadata, process/timing details and ephemeral ports are explicitly location-dependent. No production or scientific admission, deployment, push, merge, source-history promotion, native Linux/browser qualification or pruning occurred. The absent exact Epistemic Core and Claimipedia Science local histories remain unresolved; cache and research-output reproducibility holds remain.

## Preservation and integrity

Closing verification checked **${integrity.filesVerified} captured file observations**, all 145 retained original hashes, unchanged 54 selected contract hashes and previous selected semantic witnesses, eight prior contract witnesses, all eight consumer owners and their pre-existing overlays, both bootstrap source trees, assembled SDK copies/Core payload and the original main working diff. Five selected clean repositories passed Git connectivity checks. Exact final platform/Core/Claimipedia snapshots and the final platform bundle are preserved. Source and artifact suites are same-task engineering evidence, not independent scientific corroboration.

Key records: [baseline-summary.json](baseline-summary.json), [final-integrity.json](final-integrity.json), [current-assurance.json](current-assurance.json), [assembly-proof.json](assembly-proof.json), [integrated-verification.json](integrated-verification.json), [assembled-runtime-module-verification.json](assembled-runtime-module-verification.json), [bootstrap-comparison.json](bootstrap-comparison.json), [bootstrap-a.json](bootstrap-a.json), [bootstrap-b.json](bootstrap-b.json), [registration-only-custody-review.json](registration-only-custody-review.json).

Input bundles are pinned in [bootstrap-inputs.json](bootstrap-inputs.json); nine unchanged repositories retain their previously verified input bundles and exact user overlays. Final snapshots: \`.platform-reconstitution/bundles/active-runtime-final-preservation-2026-11-04/\`. Current metadata is copied to \`live-records/\`, with predecessor metadata in \`prior-records/\`. Audit files preserve exact Git blob bytes, including line endings.

Earlier observations remain separate: \`first-source-tests.txt\` records the registration-only custody gap; \`pre-driver-assembly-proof.json\` is the intermediate successful source-5227580 assembly; its interrupted bootstrap destination is retained with \`pre-driver-bootstrap-run.txt\`. \`existing-destination-refusal.txt\` records refusal to overwrite an existing destination. Only final-source receipts qualify this baseline.

Reproduce the source gate or a bootstrap using preserved local inputs and a new nonexistent destination:

~~~powershell
node .platform-reconstitution/sourcery-platform-reconciled/scripts/check-runtime-modules.mjs
node .platform-reconstitution/sourcery-platform-reconciled/scripts/run-local-bootstrap.mjs tooling/maintenance/active-runtime-reconciliation-2026-11-04/bootstrap-inputs.json <fresh-destination> <receipt.json>
~~~
`);
