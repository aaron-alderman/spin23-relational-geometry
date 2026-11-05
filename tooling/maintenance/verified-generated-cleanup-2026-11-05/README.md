# Verified generated duplicate cleanup

Completed: **90,092 regular generated duplicates / 7,271,650,288 logical bytes (6.77 GiB)** retired. The observed filesystem free-space gain from the initial check was **7,181,316,096 bytes (6.69 GiB)**, leaving **10,558,619,648 bytes (9.83 GiB)** free at completion. **1,310 entries** were retained, including eight assembly provenance markers. Free-space observations include unrelated concurrent filesystem activity and the cost of writing this evidence.

Closing [preservation verification](preservation-verification.json) confirms all planned target files are absent, the latest validation roots remain outside the deletion roots, the latest assembly proof and old provenance markers are unchanged, selected source `a06d40d43da8ad22f8aa32f052d708c38c36a1eb` remains clean, and the original main user diff matches the retained patch bytes. The resumed pass independently verified **13,319 retained source files**; 4,536 target files had been removed by the initial process and the remaining 85,556 by the resumed process.

This cleanup targets eight explicitly named obsolete generated assemblies. It preserves the current `all-remaining-contract-validation-2026-11-05/assembly-refined-final/assembled` assembly, its consumer fixture and both `final-refined-pass-*` bootstraps.

`retire-duplicates.cjs` verifies assembly provenance and restricts removal to regular files under the eight fixed roots. Every candidate must match an independently verified retained source SHA-256 from the current selected source inputs or retained layer manifests. It persists the complete plan before removal, rechecks source and target identity and bytes, and refuses path escapes and link boundaries. Git metadata, links, unmatched files and assembly provenance markers remain. No recursive directory deletion is used.

The first invocation stopped before scanning or removing files because a layer manifest did not have a `files` array. The corrected script treats that layer as supplying no file records; it does not infer any disposable files from that manifest.

After the plan was persisted, the original retirement process was deliberately stopped at 19:06:43 local time to replace repeated per-component Windows path checks with native resolved-path verification. `resume-retirement.cjs` uses the same fixed plan, records files already absent after the first run, independently rechecks every retained source, and requires resolved regular paths, unchanged identities and exact target bytes before further removal. Four workers process the remaining files; no roots or eligibility rules are expanded. Both execution logs are preserved. The final result reports combined retirement counts and the observed free-space difference from the initial user-facing disk check, as well as the difference during the resumed run.

The retirement plan identifies the exact generated paths no longer present. Historical assembly receipts remain historical evidence; their original full materializations are no longer intact after this explicitly recorded retirement. Retained source repositories, Git histories, preservation bundles, Context Hub state, runtime caches and research outputs are outside the deletion roots.

See [retirement plan](retirement-plan.json), [result](retirement-result.json) and [execution log](run.txt). The result separates logical file bytes from the observed filesystem free-space increase, which can also include unrelated concurrent activity.

This is a one-time reviewed operation. Do not rerun it with an existing plan or broaden its fixed roots implicitly.
