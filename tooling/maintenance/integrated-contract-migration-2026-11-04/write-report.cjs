const fs=require('fs'),path=require('path'),audit=__dirname,read=f=>JSON.parse(fs.readFileSync(path.join(audit,f),'utf8')),summary=read('migration-summary.json'),proof=read('assembly-proof.json'),integrity=read('final-integrity.json'),consumers=read('claimipedia-assembly-inputs.json'),original=read('original-qualification.json');
if(summary.integratedVerification.length!==11||summary.integratedVerification.some(r=>!r.passed))throw Error('Completed integrated verification required');
const labels={'assembled-prior-contracts-tests.txt':'Previously qualified contracts','assembled-semantic-tests.txt':'Semantic mutation subsystem','assembled-migration-tests.txt':'Remaining-contract migration','assembled-core-tests.txt':'Claimipedia Core','assembled-claimipedia-tests.txt':'Claimipedia','assembled-epistemic-tests.txt':'Epistemic Core','assembled-reader-science-tests.txt':'Reader science','assembled-science-programme-tests.txt':'Science programme','assembled-qualification-runner-tests.txt':'Qualification runner','assembled-git-receiving-tests.txt':'Git receiving','assembled-frontier-tests.txt':'Frontier programme'};
const table=summary.integratedVerification.map(r=>`| ${labels[r.receipt]} | ${r.expectedTests} | [receipt](${r.receipt}) |`).join('\n');
const text=`# Integrated remaining-contract migration — 4 November 2026

The remaining 54 retained contract files now have passing selected Sourcery runtime/domain or assurance contracts, carried through a fresh ordinary-copy assembly and all eleven consumer suites. The complete selected retained cohort is **145 qualified and zero unresolved**. This is a local engineering baseline with explicit contract amendments; architectural completion and historical source recovery remain incomplete.

The 54 selected files contain **97 cases and 292 assertions**. Forty-seven retain their assertion ASTs and case names. Eight have explicit amendments, including one authority-policy fixture amendment whose assertions remain unchanged, so these counts overlap. Three syntax-damaged originals have repaired selected copies. Literal original files remain untouched: **${original.originalFilesPassing}/54 pass and ${original.originalFilesStillFailing}/54 fail** in a complete copied witness with independent Git metadata. No original generic API restoration is inferred from selected-contract qualification.

## Source and ownership

- Platform: \`${summary.platform}\` in \`.platform-reconstitution/sourcery-platform-reconciled\`.
- Core: \`${summary.core}\` in \`.platform-reconstitution/claimipedia-core\`.
- Shared expression algebra: unchanged at \`${summary.shared}\`.
- Intermediate Platform checkpoint: \`${summary.intermediatePlatform}\`, separately preserved with its successful assembly.

Existing runtime declarations now serve 19 explicit domain facades. Routing, picker, data-space policy, project-extension policy/host, MCP ordering, stale-policy and abuse-control controllers share their value implementations with the selected contracts. Semantic record adapters call the indexed runtime and require caller-authored authority policy. The aggregate contract surface registers no generic expression operator or opcode. Informational command preflight descriptors are not admission receipts or authorization decisions.

Eighty-seven regular assurance source files were recovered from the retained legacy working tree. [Preparation identities](preparation.json) record those input hashes; subsequent adapter changes and whitespace normalization are visible in the selected commits. This is retained local source recovery, not proof of missing historical Git identities. The assurance engine continues to expose and refuse current debt.

Core now exports its retained canonical interpreter through \`@sourcerytech/claimipedia-core/surface-process\`. Its package-export test checks exact interpreter identity and strict-reference refusal. Bootstrap plan/runner tests use explicit fake effects; two real empty-checkout production reconstructions were not performed.

The [qualification manifest](contract-qualification.json) binds original hashes, selected hashes, assertion comparisons, syntax repairs and amendments. Five newly written REL descriptions identify actual local owners and explicitly withhold executable-algebra proof. They are not recovered decomposition bytes. Earlier semantic mutation source tests and specification hashes remain intact. The other eight previously qualified contracts were also rechecked against the assembled SDK in a separate 14-case witness; two audit-local SDK import paths were rebound without changing assertions.

## Explicit amendments and fixes

The eight amendments are individually recorded in the manifest:

1. The authoring shell specification identifies retained CLI/executor owners; missing historical decomposition and thin-component certification are not claimed restored.
2. Command retention identifies its real redaction owner; an unavailable eleven-component/default-free decomposition is not certified.
3. MCP ordering uses an explicit English locale through the runtime domain API; no domain opcode is added to generic algebra.
4. MCP stable JSON/hash use their runtime APIs and insertion-order conformance, replacing unavailable generic evaluator opcodes.
5. Secret-reading expectations correct the retained fixture's inversion: authorization-token paths produce authorization tokens and proposal-key paths produce proposal keys.
6. Authority-scope fixtures supply authored authority and operation mappings. The adapter derives its operation authority from those facts.
7. Platform assurance reports current debt and refuses historical residual acceptance, rather than asserting a clean old baseline.
8. Goal assurance leaves ownership/drift obligations incomplete rather than inheriting earlier completion assertions.

The exact predecessor [shutdown counterexample](shutdown-counterexample.json) demonstrates a runtime fix: registry cleanup previously threw before daemon cleanup. The new host finalizer closes the daemon in \`finally\`, preserves the original refusal, and shares one shutdown promise across repeated/concurrent callers. The regression suite also covers path escape refusal, weighted stale-policy selection, command-evidence redaction without mutation, sandbox environment/limit behavior, and abuse-recording thresholds when policy limits change during an active lockout.

## Verification and assembly

Source: [404/404 Platform tests](platform-qualified-tests.txt), [72/72 Core tests](core-final-tests.txt), [Core source boundary check](core-source-check.txt), [99/99 unchanged shared-algebra tests](shared-algebra-tests.txt), and [assembly owner-policy negative controls](assembly-owner-policy-tests.txt).

All eleven artifact suites pass:

| Suite | Passed | Evidence |
| --- | ---: | --- |
${table}

The final [assembly proof](assembly-proof.json) records **${proof.projection.fileCount.toLocaleString('en')} composed files** as ordinary byte copies. Payload: \`${proof.platformRuntime.payloadHash}\`. Closure: ${proof.platformRuntime.importClosure.consumerEntrypoints} consumer entrypoints, ${proof.platformRuntime.importClosure.reachableFiles} reachable files and ${proof.platformRuntime.importClosure.reachableSemanticFiles} reachable semantic files. Programme completion passes within that proof's declared scope. The local tests ran on Windows/Node; retained Linux native dependency identities were checked, without claiming native Linux or browser execution.

The assembly now includes an explicit retained-source Core dependency. The verifier admits exactly the named Core and expression-algebra Git source owners, checks their remote identities/revisions/trees/inventories and payload bytes, and retains its existing checks for other dependencies. Unknown owners, wrong remotes, malformed revisions and changed inventory hashes refuse. [The initial owner-policy failure](failed-first-assembly/) and [successful intermediate evidence](pre-refinement/) remain available.

The consumer fixture has eight source repositories and **${consumers.sources.reduce((n,r)=>n+r.files.length,0).toLocaleString('en')} regular source files**, plus a 1,110-file copied Platform/test surface whose SDK points to the assembled package. All ${consumers.links.length} package junctions stay within generated roots. Core and Frontier have independent Git oracle metadata. Source observations for generated assemblies are supplied explicitly; ordinary Git observations require the exact repository root.

The first Frontier run exposed a Windows Git path-length limit in two exact historical-object reads. [Fixture configuration](fixture-longpaths.json) enables \`core.longpaths\` only in generated Git metadata. The full 99-test Frontier suite then passed. Its source bytes, assertions and historical objects were unchanged. [Initial receipts](first-integrated-verification.json) preserve the failed run.

[Integrated verification](integrated-verification.json), [assembly inputs](assembly-inputs.json), [consumer inputs](claimipedia-assembly-inputs.json), [Platform proxy inputs](platform-proxy-inputs.json) and [explicit observations](assembly-observations.json) bind the result. [Final integrity](final-integrity.json) verifies **${integrity.capturedSourceAndArtifactFilesVerified.toLocaleString('en')} captured source/artifact file checks after testing**, all 145 original hashes, all 54 selected contract hashes and the earlier 82 selected semantic hashes. Selected repositories are clean and pass Git connectivity checks. Main and Claimipedia user working diffs remain unchanged.

These tests, matrices, counterexamples and manifests overlap as same-run engineering evidence. They do not constitute independent scientific confirmations or admissions.

## Remaining obligations

The current [architectural assurance observation](current-assurance.json) remains incomplete and refuses its historical residual baseline: **${summary.architecturalAssurance.unownedActiveSemanticMjs} unowned active semantic MJS**, ${summary.architecturalAssurance.findings.toLocaleString('en')} findings, ${summary.architecturalAssurance.newFindings.toLocaleString('en')} new finding identities and ${summary.architecturalAssurance.regressions} metric regressions. These include historical/stale ownership and architecture obligations; they are not silently accepted by passing the selected migration contracts. Missing decomposition, thin/default-free boundaries, semantic-zero, missing declared modules and effect ownership require direct architectural work. The next substantial scope is to reconcile that assurance inventory with the actual sources and implement its remaining gaps, with refusal checks retained.

Exact earlier local histories remain unresolved for Epistemic Core (\`274a2a541789ee2e8b6576ec3aeb5d9651165338\`) and Claimipedia Science (\`647e065a69867ee767c5d9b7dac04bdce1946d19\`). Their recorded reconstitutions and tests do not close those history gaps. Runtime-cache disposability and research-output reproducibility were not established here. No pruning, production activation, scientific acceptance, remote push or final cleanup certification occurred.

## Preservation and reproduction

[Final preservation identities](preservation-identities.json) bind verified bundles and snapshots for the exact final Platform (1,110 files) and Core (224 files). Intermediate bundles/assemblies remain. Unchanged consumer preservation is inherited from the preceding integrated audit. Archive root metadata is historical; [live records](live-records/) capture this completed local metadata transition, with [prior records](prior-records/) retained.

Repeat the source command from the selected Platform checkout:

\`\`\`powershell
node --test test/*.test.mjs sdk/plugins/core/semantic-mutation-policy.test.mjs sdk/plugins/postgres-rel/semantic-mutation-policy.test.mjs sdk/plugins/data-space/deferred/runtime/data-space-operation-contract.test.mjs
\`\`\`

Repeat the eleven suites from the repository root against the retained fixture:

\`\`\`powershell
node tooling/maintenance/integrated-contract-migration-2026-11-04/verify-assembly-consumers.cjs
\`\`\`

That verifier writes new local receipt bytes; preserve the committed audit or use a copied audit directory for another run. For fresh reproduction, restore the pinned sources, recorded Claimipedia working patch and retained dependency/layer witnesses, then use a fresh assembly destination and fresh consumer fixture. Inspect the fixed generation paths in the preparation scripts. They refuse existing destinations; development extraction/wiring scripts are provenance, not an idempotent installation procedure. \`final-build/\` records the final assembly invocation; its verifier is a template rewritten for the generated workspace.

[Migration summary](migration-summary.json) and [full cohort ledger](test-qualification-ledger.json) are the machine-readable outcome. No final baseline claim exceeds their declared scope.
`;
fs.writeFileSync(path.join(audit,'README.md'),text);console.log('Wrote integrated migration report.');
