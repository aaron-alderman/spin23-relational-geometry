const fs=require('fs'),path=require('path'),audit=__dirname,read=n=>JSON.parse(fs.readFileSync(path.join(audit,n))),summary=read('baseline-summary.json'),observation=read('current-assurance.json'),reconciliation=read('observation-reconciliation.json'),integrity=read('final-integrity.json'),bootA=read('bootstrap-a.json'),bootB=read('bootstrap-b.json');
const suites=summary.assembledSuites.map(r=>`| ${r.receipt} | ${r.expectedTests} | pass |`).join('\n');
const text=`# Ownership reconciliation and repeatable local integrated baseline

Selected platform source: \`${summary.platform}\`; Core: \`${summary.core}\`. This is a qualified **local engineering baseline**. Global architectural completion remains **false**. No production activation, scientific acceptance, upstream authority promotion, push, merge or cleanup certification occurred.

## What changed

- JavaScript observation now uses Acorn ASTs. Comments and strings no longer create phantom syntax; direct exports, destructured environment reads, whole/dynamic environment access and imported effect capabilities have explicit observations. This is syntax/source observation, not whole-program dataflow or a security proof.
- 115 source-role records and 1,396 capability records bind exact source SHA-256 and exported interfaces. They include 50 scientific witnesses. Custody, tooling, domain runtime and effects are distinguished explicitly. Missing, stale or duplicate declarations and altered interfaces are refused. These records grant no execution, generic algebra or scientific authority.
- The previously absent MCP self-improvement module now produces bounded immutable proposals from explicit evidence. It has no mutation, persistence or activation port; activation requires explicit human review. Its REL resource is a module/contract declaration, not recovered executable algebra.
- Actual isolated local bootstrapping restores ten repositories from verified local Git bundles, pinned commits/trees, exact preserved working overlays, dependency payloads and confined package junctions. Node/Git executables are hashed; ambient Git configuration and hooks are excluded. Git checkout policy and hash-bound per-line LF/CRLF representations preserve exact retained bytes. Differences beyond those representations refuse.
- The live root-page check exposed an actual Claimipedia defect: direct-source mode intentionally has no release tag, but the overview and chrome display projections expected one. Claimipedia commit \`ac2c854918a1c76b867cc64de477518b2ca67840\` displays the pinned programme commit in those two places and retains the root page in existing HTTP regression coverage. Release-tag provenance remains absent. The original three working provenance edits remain unchanged. See [reader-root-counterexample.json](reader-root-counterexample.json).
- Current physical findings aggregate repeated impacts without multiplying one physical observation into independent confirmations. Historical residuals were not reaccepted under a different metric policy.

## Verification

The final source run passed **421 discovered checks**, including one test helper discovered by Node. Twelve suites passed against a fresh **ordinary-copy assembly of ${summary.assemblyFiles} files**. SDK bytes in both assembled locations, Core payload, generated platform proxy and all eight consumer snapshots were checked against captured inputs. Retained source is not hardlinked into assembly.

| Artifact suite | Checks | Result |
| --- | ---: | --- |
${suites}

The prior 145 selected contract qualifications remain preserved. The current 54-contract manifest still records 97 cases and 292 assertions, 47 unchanged assertion/case-name contracts, eight explicit amendments including the earlier fixture-only amendment, and three syntax repairs. The ownership goal expectation was updated to the now verified byte-bound custody behavior; historical drift/thin/default-free expectations remain incomplete. Unmodified original generic imports/APIs remain separately documented in earlier audits; these passes do not restore them implicitly.

## Two actual isolated bootstraps

Both runs used separate fresh Git metadata and materialized package graphs, then executed Core's source guard and 72-test suite, Claimipedia's 35-test suite, and a real loopback HTTP server. Each served GET **200**, refused POST **405**, stopped its child process and verified all recorded source bytes again. Both produced the same stable source/model/body identity:

\`${summary.bootstrap.sourceIdentity}\`

| Observation | Run A | Run B |
| --- | --- | --- |
| Model | ${bootA.reader.model} | ${bootB.reader.model} |
| Programme | ${bootA.reader.programme} | ${bootB.reader.programme} |
| Root body SHA-256 | ${bootA.reader.bodySha256} | ${bootB.reader.bodySha256} |
| GET / POST | ${bootA.reader.status} / ${bootA.reader.mutationStatus} | ${bootB.reader.status} / ${bootB.reader.mutationStatus} |
| Writing authority | ${bootA.reader.writingAuthority} | ${bootB.reader.writingAuthority} |

Ephemeral URLs, paths, process identities, Git metadata and timings are location-dependent. The stable comparison excludes those values explicitly. This proves repeatable local Git-bundle bootstrap on this Windows/Node environment; it does not prove fresh GitHub acquisition, Linux execution, browser interaction or production deployment.

Three failed checkout attempts remain in their isolated destinations and \`bootstrap-{first,second,third}-attempt.txt\`. They exposed repository-level and within-file mixed line endings. Final tests refuse non-EOL content changes and require the final byte hash to match. The earlier successful assembly from \`aac4b93\` is separately retained as \`initial-assembly-proof.json\`; only the final proof at \`${summary.platform}\` qualifies the current baseline.

The subsequent actual HTTP 500 counterexample is preserved in \`bootstrap-http-counterexample.txt\`, \`reader-diagnostic.json\` and \`reader-fault.json\`. A partial bootstrap begun before the final source-capability receipt was superseded is retained in \`bootstrap-superseded-source-run.txt\` and its destination. The successful intermediate assembly at \`ce2d40d\` remains \`pre-reader-assembly-proof.json\`. These are earlier observations, not final passing receipts.

The first root regression additionally caught a null footer identity; its failing receipt remains \`bootstrap-footer-regression.txt\`. The completed overview/chrome fix then passed the seven existing application HTTP cases in \`reader-root-regression.txt\` before the final isolated reruns.

## Assurance remains incomplete

Current observation: **${observation.report.findings.length} physical finding identities**, ${observation.report.summary.findingOccurrences} occurrences, **zero unowned active semantic MJS**. There are no missing/mismatched capability or environment declaration findings in this observation. The historical ledger uses \`sourcery/legacy-regex-metrics.v1\`; current measurement uses \`sourcery/javascript-ast-metrics.v1\`. The strict historical gate explicitly refuses this mismatch. No decrease in totals is treated as baseline admission or proof of a semantic repair.

All ${reconciliation.priorOccurrences} prior occurrences (${reconciliation.priorPhysicalIdentities} physical identities) are mapped in [observation-reconciliation.json](observation-reconciliation.json): ${reconciliation.categories['still-observed']} still observed and ${reconciliation.categories['not-observed-under-current-policy']} absent under the corrected policy. There are ${reconciliation.newCurrentIdentities.length} newly observed current identities. Absence under a different policy is not blanket resolution.

| Remaining category | Physical identities |
| --- | ---: |
${Object.entries(observation.report.summary.findingsByKind).map(([k,v])=>`| ${k} | ${v} |`).join('\n')}

The next coherent engineering chunk is **module/decomposition reconciliation followed by thin-boundary/default-policy migration**, beginning with active Sourcery runtime domains and preserving historical scientific witnesses as separately owned sources. Confirm actual source/module ownership and declarations before deciding whether a reference should be repaired, explicitly superseded or retained as historical evidence. Then rerun the same source, assembly, consumer and repeated-bootstrap gates. Do not erase the ledger or relabel residual implementations as executable generic algebra.

Missing exact local Epistemic Core \`274a2a541789ee2e8b6576ec3aeb5d9651165338\` and Claimipedia Science \`647e065a69867ee767c5d9b7dac04bdce1946d19\` histories remain unresolved; their current local reconstitutions remain explicitly identified. Runtime-cache generations and research outputs remain held pending reproducibility evidence. No pruning occurred.

## Integrity and retained evidence

Final checks verified ${integrity.filesVerified} captured source/artifact file observations, all 145 retained original hashes, the current 54 selected contract hashes, the previous semantic contract hashes, all eight consumer owners with only the explicit Claimipedia fix, all their pre-existing overlays, and the original main working diff. Five clean selected repositories passed Git connectivity checks. All ten input Git bundles were verified; exact platform/Core/Claimipedia recovery archives were verified without following dependency links.

- [baseline-summary.json](baseline-summary.json), [final-integrity.json](final-integrity.json)
- [assembly-proof.json](assembly-proof.json), [integrated-verification.json](integrated-verification.json)
- [bootstrap-inputs.json](bootstrap-inputs.json), [bootstrap-a.json](bootstrap-a.json), [bootstrap-b.json](bootstrap-b.json), [bootstrap-comparison.json](bootstrap-comparison.json)
- [current-assurance.json](current-assurance.json), [ownership-review.json](ownership-review.json), [contract-qualification.json](contract-qualification.json)
- \`.platform-reconstitution/bundles/architecture-bootstrap-pinned-2026-11-04/\`: local Git inputs, overlays and final source bundle.
- \`.platform-reconstitution/bundles/architecture-bootstrap-qualified-preservation-2026-11-04/\`: final platform/Core/Claimipedia snapshots and metadata before this record transition. Earlier snapshots are retained separately.
- [prior-records](prior-records/) and [live-records](live-records/): metadata before/after this scoped transition. Earlier qualification provenance is preserved.

To reproduce, preserve the pinned source/input bundle paths and use a new nonexistent destination:

~~~powershell
node .platform-reconstitution/sourcery-platform-reconciled/scripts/run-local-bootstrap.mjs tooling/maintenance/architecture-bootstrap-2026-11-04/bootstrap-inputs.json <fresh-destination> <receipt.json>
~~~

The CLI and source modules require explicit local inputs and never activate production or admit scientific conclusions.
`;
fs.writeFileSync(path.join(audit,'README.md'),text);
