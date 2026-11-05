# Managed local qualification

From the repository root:

```powershell
node tooling/maintenance/managed-validation/run.mjs --check
node tooling/maintenance/managed-validation/run.mjs
node --test --test-concurrency=1 tooling/maintenance/managed-validation/test/workspaces.test.mjs
```

The explicit `profile.json` separates frozen base verification recipes from the current committed input profile. The request identity and CSRF profile preserves all 15 base suites / 2,462 checks, the 16-check source-loading and 16-check auth/session suites, and the expanded 42-check authorization/identity suite: **18 artifact suites / 2,536 checks**, standalone runtime and semantic gates, and two **21-stage** isolated bootstraps. The runtime graph expectation is **893 modules**. It refuses changed owner commits, working states, source bundles, executable identities or module counts. Qualification of a new source revision requires an explicitly reviewed profile update, including its actual counts and input identities.

Metadata preparation stays separate from execution. `prepare-input-profile.mjs NEW_DIRECTORY` snapshots a clean committed platform into a new profile, verifies its complete bundle and preserves other owner pins; it does not select that profile. `refresh-source-records.mjs RECEIPT_PATH` refreshes existing observation hashes, inventories and boundary correspondence without admission or waivers. `record-source-evidence.mjs AUDIT PREVIOUS_AUDIT TOTAL_CHECKS` verifies source reports, assertion/specification preservation and the architecture delta. Full assembly, consumers and isolated bootstraps always use `run.mjs`.

## Storage lifecycle

Earlier one-off drivers required fresh destinations and deliberately preserved every successful, failed and retried materialization. Copying each dated driver multiplied whole assemblies, consumer graphs and Git clones. Preservation archives accumulated alongside these copies. The managed entry point fixes future validation-copy accumulation; historical reports and protected recovery archives remain unchanged.

- One exclusive lease owns `.platform-reconstitution/managed-validation`. A second run refuses to allocate more space.
- A single fixed `work` directory holds disposable copies. Assembly preparation is released after assembly; assembled consumers are released after qualification and a post-run byte check. Bootstrap A is qualified and released before B is created.
- Scratch and copied harnesses are removed after success, failure, deadlines and handled interruption. A killed owner's partial copies are recovered on the next invocation. A live owner or tracked child prevents reclamation. Invalid or unowned directories fail closed.
- Child `TEMP`, `TMP` and `TMPDIR` all select an owned scratch subdirectory. Test fixtures and compiler temporary files are therefore contained even when process termination prevents their own cleanup hooks from running. Failure to persist a new child identity stops that owned launcher before the lease can be released.
- Cleanup walks owned directories and unlinks junctions/symlinks without traversing their targets. It never performs a recursive delete against an arbitrary path. Cloned Git metadata inside the explicitly owned scratch tree is disposable; retained source repositories and bundles are outside that tree.
- Working bytes default to 4 GiB, with a 2 GiB free-space reserve. Admission requires enough space for both. Working usage is checked after each subprocess; the reserve is watched once per second while a command runs. These are admission and sampled limits, not an OS filesystem quota: a writer can temporarily cross a limit between observations, after which the command is stopped and scratch is reclaimed.
- Commands have bounded deadlines and 8 MiB logs. Receipts are capped at 64 MiB per run. Only the newest two successful receipts and one failed receipt are retained, plus the active run. Oversize evidence is explicitly discarded and the run fails; it cannot receive a passing disposition.
- On Windows, a suspended child is assigned to an OS job before it can spawn descendants. Closing the launcher's job handle kills the entire assigned tree. Cancellation uses the launcher's owned process handle, avoiding a separate `taskkill` process that the restricted shell may be unable to authorize. Arguments are passed as encoded JSON and reconstructed individually, including empty values and quoted text. On other platforms the runner uses an owned process group.
- Existing content-addressed source bundles are verified and reused. Validation does not create another source tarball or bundle per retry.

Receipts are under `.platform-reconstitution/managed-validation/receipts/<run-id>`. `status.json` records the outcome and observed working-byte peak. `recipe-inputs.json` records original and adapted driver hashes. `qualification.json` records passed engineering gates. Paths in receipts identify the materialization used during execution; `materializationRetained: false` explicitly records that those disposable copies have been retired. The source bundles and exact input manifests remain available for reproduction.

Recipe adaptation changes generated destination paths, the immutable historical ledger reference and the explicitly profiled runtime-module count. Every base assertion is preserved; additional tests append to the artifact and bootstrap lists. Additional reports require exact test/pass totals and zero failures, cancellations and skips. Source bytes are verified again after the additional isolated stages. Unknown recipe structures, unsafe test paths and duplicated tests refuse instead of weakening gates. Native computer use is not part of this runner. This does not certify generic algebra, scientific admission, production activation, historical recovery or cache/research-output reproducibility.

## Recovery

Run the same command again after an unclean process exit. An expired lease is reclaimed only when its owner and all recorded children are absent. If a process is still alive, another run refuses rather than silently creating a new destination. If ownership metadata is malformed, inspect it and the process state before any manual recovery; do not delete arbitrary workspace directories to bypass the check.

Twenty tests cover the fifteen storage/process lifecycle cases plus explicit profile totals, refusal of unsafe or duplicate additions, preservation of the actual frozen base recipes and exact report-count checks. They do not replace the real full qualification run.
