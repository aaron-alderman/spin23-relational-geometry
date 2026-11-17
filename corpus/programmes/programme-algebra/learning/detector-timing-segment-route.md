# Test whether whole-segment validation earns a different forecast

The [segment replay](detector-timing-segment-fit.md) found
that error frequencies depended on the segment duration.
The [routing plan](detector-timing-segment-route-plan.json)
fixes that duration at 10 seconds before reading the
fifth unshielded background run. That run starts on July 18,
2025 at 12:51:58 local time, after the fourth run ended at
10:15:30. Its detector settings match after normalizing
the run identifier and timed stop. It is a new measured
case on the same detector readout. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

Each of eight predeclared entry slices supplies a
1,600-second window. The first 640 seconds form four
160-second early blocks. The first two are the shared
fit, and the next two are the validation blocks.
The pooled rule scores its full shared fit against
the two validation blocks combined. The segment rule
splits each fit block into sixteen 10-second segments,
conditions on the short fit's exact net support, and uses
the median margin on each validation block from 2,048
draws. It carries the existing 4.43-point near-tie
tolerance and 50-pair support floor. Any local forecast
used for late scoring pools all four early blocks.

The screen selects the first supported difference by
window and ascending energy band. Its result is frozen
before any late pairs are formed. Agreements and support
refusals stay in the record.

The [frozen screen](detector-timing-segment-route-screen.json)
covers 32 window–band combinations. The rules agree in
29, disagree in two, and one has no segment combination
at the required exact count. Both disagreements are in
the 350 keV-and-up band. The first occurs at entry
16,000,000 and is the only window paired after the
early screen.

The pooled validation comparison favors local by 2.78
points using 148 net wide fit pairs. The exact-count
segment fits use 64.5 net pairs, with about 1.91 million
eligible combinations. Their median validation margins
are −0.48 and −2.51 points, where positive favors local.
The segment rule keeps cobalt because neither margin
favors local. The individual short and full shared fits
also favored local in both validation trials.

| Held block | Net wide pairs | Pooled rule, local error | Segment rule, cobalt error |
| --- | ---: | ---: | ---: |
| 40–60% | 141.50 | 6.54 points | 16.60 points |
| 60–80% | 148.00 | 8.02 points | 14.34 points |
| 80–100% | 141.75 | 6.08 points | 17.64 points |
| **Median** | | **6.54 points** | **16.60 points** |

The [held receipt](detector-timing-segment-route-result.json)
shows that the extra work changed the choice and
increased error in all three blocks. In one screen
pass it added 256 segment pairings and 63,488 sampled
subset combinations. The pooled rule used the four
early count records per window. This is a selected
comparison from one new acquisition. It supports
keeping the simpler rule as a candidate default
and retaining segment resampling as a diagnostic.
The next challenge should freeze pooled validation
on a separate detector campaign and score every
supported band and block. That tests a default policy
without conditioning on an early disagreement.

The [air-filter campaign replay](detector-timing-campaign.md)
scores all supported blocks on a previously unused run.

The [pulse receipt](detector-timing-segment-route-pulses.json)
pins all eight slices and their compact projections.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$up = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-segment-route-plan.json"
$pulses = "$lane/detector-timing-segment-route-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$prefix = "$($design.archivePrefix)/background_5"
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $up 'unshielded5-settings.xml')
curl.exe --fail --location "$prefix/background_5_info.txt" --output (Join-Path $up 'unshielded5-info.txt')
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan
python -B "$tools/air_filter_timing.py" $pulses $up
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses --score "$lane/detector-timing-segment-route-screen.json"
```
