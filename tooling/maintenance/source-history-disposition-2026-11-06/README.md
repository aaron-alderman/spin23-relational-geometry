# S2: explicit source reconstitution and historical gaps

The closure plan permits two routes: exact historical recovery, or an explicitly identified reconstitution with preserved provenance and history gaps. Existing reconstitutions were audited under that already authorized alternative. No fresh permission requirement or canonical upstream equivalence is inferred.

[Machine review](history-review.json) records the actual disposition. Its status remains prepared until `finalize-review.mjs` verifies the current integrated qualification and all pinned source bytes/bundles.

| Owner | Selected reconstitution | Available remote base | Missing historical commit |
| --- | --- | --- | --- |
| Epistemic Core | `9e5f44d243079ad7e49d26d2e5a2c4b09ab48828` | `a4a8178002839258fb205d86fd914d7794894ece` | `274a2a541789ee2e8b6576ec3aeb5d9651165338` |
| Claimipedia Science | `dfc997a19ad77f3fcd825ffeb16106cecb9031eb` | `0c4f8cb0ff551d4bd5a373e8e224031cfc6a4a10` | `647e065a69867ee767c5d9b7dac04bdce1946d19` |

Both selected commits directly retain the named remote ancestry, pass connectivity checks and have clean source working trees. Each commit explicitly records reconstitution from the remote base and retained survivors. The exact historical objects are still not located in these current object stores; this audit does not claim to have searched every possible backup or establish recovery impossibility.

The retained survivor archive has 79 tar entries: **61 regular files and 18 directories**. Every regular file is byte-identical to its current source counterpart—51 Epistemic and ten Science files. The review verifies header checksums, hashes the current compressed archive, records each source path/hash and compares it with both the current file and available remote base. It reads archive content without extracting files, following dependency links or changing source. The archive is a post-incident survivor record, not an atomic pre-incident snapshot.

The entire current tracked source and retained bundles are verified against the new integrated qualification profile before finalization. Current Epistemic 88-check and Science 15-check consumer receipts are required. Their passing behavior does not prove what missing local-only files or history once contained. All survivors, branches, available Git history and recovery bundles remain preserved.

Once the machine status is `complete-via-identified-reconstitution-route`, S2 is closed **only through the explicitly identified reconstitution alternative**. Exact historical recovery remains unproved and cannot be represented as completed. The original missing hashes and unknown lost-content limitations remain attached to the selected baseline and its final certificate. Canvas source authority is a separate S1 obligation; global architecture, host verification and scientific admission are unaffected.
