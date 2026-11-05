# Managed local qualification

From the repository root:

```powershell
node tooling/maintenance/managed-validation/run.mjs --check
node tooling/maintenance/managed-validation/run.mjs
node --test --test-concurrency=1 tooling/maintenance/managed-validation/test/workspaces.test.mjs
```

The default profile is the verified `a06d40d43da8ad22f8aa32f052d708c38c36a1eb` checkpoint in `all-remaining-contract-migration-2026-11-05`. It runs the same assembly and 15 artifact suites / 2,462 checks, the standalone runtime and semantic gates, and two isolated 18-stage bootstraps. It refuses changed owner commits, working states, source bundles or executable identities. Qualification of a new source revision requires an explicitly reviewed profile update, including its counts and input identities.

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

Recipe adaptation changes generated destination paths and the immutable historical ledger reference. Assertions and test counts remain unchanged. Native computer use is not part of this runner. This does not certify generic algebra, scientific admission, production activation, historical recovery or cache/research-output reproducibility.

## Recovery

Run the same command again after an unclean process exit. An expired lease is reclaimed only when its owner and all recorded children are absent. If a process is still alive, another run refuses rather than silently creating a new destination. If ownership metadata is malformed, inspect it and the process state before any manual recovery; do not delete arbitrary workspace directories to bypass the check.

Fifteen tests use small independent temporary fixtures and prove bounded retention across repeated pass/fail runs, crash recovery, refusal of live leases and unowned directories across retries, cleanup of junctions to an external source sentinel, disk/work/receipt/log budgets, argument fidelity, lexical escape refusal, cancellation and normal-exit cleanup of real descendants, child-registration failure and reclamation of an interrupted 5 MiB temporary payload. They do not replace the real full qualification run.
