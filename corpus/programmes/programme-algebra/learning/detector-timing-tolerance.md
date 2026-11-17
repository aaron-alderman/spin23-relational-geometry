# Freeze a near-tie tolerance from earlier runs

The [disagreement replay](detector-timing-disagreement.md)
found that a 0.095-point loss in one early trial vetoed a
bismuth forecast that later worked. The
[near-tie plan](detector-timing-tolerance-plan.json) estimates
the scale of disagreement using the three preceding UV2404
air-filter acquisitions. It uses their saved early margins
and excludes the bismuth margins and all held errors.

A margin is the reference loss minus the local loss.
The two disjoint trials differ by 0.67, 5.85 and 3.06
percentage points across the three training runs.
Their median absolute difference sets a tolerance of
**3.06 points**. This is a descriptive scale from one
sample and apparatus. The
[calibration receipt](detector-timing-tolerance-calibration.json)
was written before reading any pulses from the next run.
[Air-filter archive](https://doi.org/10.57804/0tjh-3b49)

The near-tie rule retains the strict repeat choice unless
the pooled single comparison favors local, at least one
disjoint trial favors local, and the other trial's loss
is within the tolerance. All four early blocks must still
clear the wide count floor. The fresh screen checks two
predeclared nine-million-entry windows from the next
separately started run. It selects the first supported
window with a changed choice, or the first fully supported
window as an agreement control.

| Window start entry | Pooled early margin | Disjoint early margins | Strict and tolerant choice |
| --- | ---: | ---: | --- |
| 1,000,000 | −2.96 points | +4.16, −1.70 points | Reference |
| 10,200,000 | −1.06 points | −8.08, +3.38 points | Reference |

The first window contains a near tie in one disjoint trial,
but its pooled comparison favors the reference. The second
has a disjoint loss larger than the tolerance. Both windows
clear the count floor. The
[frozen screen](detector-timing-tolerance-screen.json)
selects the first as an agreement control and leaves the
second window's late blocks unpaired. It verifies that the
windows are disjoint in time.

| Held block in the first window | Net wide pairs | Reference error | Pooled local error |
| --- | ---: | ---: | ---: |
| 40–60% | 149.75 | 9.77 points | 12.65 points |
| 60–80% | 154.25 | 14.29 points | 12.54 points |
| 80–100% | 180.50 | 12.66 points | 11.36 points |
| **Median** | | **12.66 points** | 12.54 points |

Both rules keep the reference and have identical held
scores. The alternative local profile has the lower
median by 0.11 points and wins two blocks. The
[score receipt](detector-timing-tolerance-result.json)
keeps the paired outcomes. On the previously examined
bismuth case, the independent tolerance would allow the
local profile. That retrospective check and the fresh
agreement control leave the effect of a changed choice
on a new target open.

The full pulse download hit the disk limit while writing
the cache. A second read pinned both full window digests
and retained only pulses on channels 1 and 2 plus the
original time extrema. A check against the full arrays
verified preservation of all selected-channel values and
both endpoints. The two cached files total about 9.1 MB.
The [pulse receipt](detector-timing-tolerance-pulses.json)
keeps hashes for the full arrays and the cached projection.

For the next challenge, choose a different calibration
sample with the same detector settings and require a
changed early choice before pairing late data. The
existing windows show that more acquisitions of this
same field filter can yield the same policy under both
rules, even when their disjoint trials split.

The [sample 2 transfer](detector-timing-tolerance-transfer.md)
tests that change of sample on three early windows.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$air = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-tolerance-plan.json"
$pulses = "$lane/detector-timing-tolerance-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$run = $design.target.id
$prefix = "$($design.archivePrefix)/$run"
curl.exe --fail --location "$prefix/run.info" --output (Join-Path $air "$run.info")
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $air "$run.xml")
python -B "$tools/audit-detector-timing.py" $base $air --tie-aware-route $plan
python -B "$tools/air_filter_timing.py" $pulses $air
python -B "$tools/audit-detector-timing.py" $base $air --tie-aware-route $plan --target-pulses $pulses
python -B "$tools/audit-detector-timing.py" $base $air --tie-aware-route $plan --target-pulses $pulses --score "$lane/detector-timing-tolerance-screen.json"
```
