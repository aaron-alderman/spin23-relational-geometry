# Thin the shared timing fit to the short fit's count

The [matched-fit challenge](detector-timing-matched-fit.md)
removed the veto when both validation trials used the
pooled fit. That changed the fit count and the times
that supplied it. The [thinning plan](detector-timing-thinned-fit-plan.json)
keeps the two-block time mixture and reduces its support
to the exact net count of the third early block. The
fourth early block is the same validation set used for
the recorded short fit. The third block is an additional
fixed validation set for the shared and thinned fits.

The [procedure](../../../../tooling/programme-algebra/audit-detector-timing.py)
draws 2,048 samples without replacement from prompt and
shifted histograms. It allocates retained counts across
time blocks and shifts proportionally, up to integer
rounding. The total retained prompt count minus the mean
retained shifted count equals the short fit's net count.
The diagnostic policy applies the same tolerance rule to
the median validation margins. Every late local forecast
uses the full four-block early fit.

In the previous selected case, reducing the shared fit
from 179 to 88 net pairs raises the median local error
on the common fourth block from 9.35 to 12.38 points.
The central 90% of the thinned errors spans 8.27–16.94
points. Three draws reach the recorded short fit's
21.00-point error. These are conditional frequencies
under histogram thinning. Pairs can share pulses, and
controls can be dependent, so the frequencies do not
supply sampling p-values or isolate time drift.

The fourth unshielded background run began July 15,
2025 at 18:32:07 local time, after the third run stopped
at 18:04:16. It has matching detector settings after
normalizing the run ID and timed stop. The plan screens
eight predeclared windows and freezes the first supported
pooled-local versus legacy-veto reversal. It then scores
only that window's late blocks. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

The [frozen screen](detector-timing-thinned-fit-screen.json)
selects the 350 keV-and-up band in the window starting
at entry 19,900,000. The pooled early margin is +9.07
points, while the legacy disjoint margins are −7.52
and −1.44 points. The shared fit has 150.25 net wide
pairs. Each thinned fit keeps exactly 87 net pairs
by retaining 88 prompt and four shifted pairs.

| Fourth early block comparison | Local error |
| --- | ---: |
| Recorded short fit from the third block | 18.12 points |
| Full shared fit from the first two blocks | 10.35 points |
| Thinned shared fit, median | 12.88 points |
| Thinned shared fit, central 90% | 8.81–17.48 points |

The cobalt error on that block is 16.68 points.
Sixty-three of 2,048 thinned fits reach the recorded
short fit's error, about 3.1%. The two median margins
are +7.65 and +3.79 points. The pooled, matched-fit
and thinned-fit rules all choose the same final local
forecast. The legacy veto keeps cobalt.

| Held block | Net wide pairs | Legacy veto error | Pooled, matched and thinned error |
| --- | ---: | ---: | ---: |
| 40–60% | 154.75 | 14.20 points | 8.76 points |
| 60–80% | 136.00 | 16.13 points | 12.90 points |
| 80–100% | 148.75 | 17.67 points | 7.18 points |
| **Median** | | **16.13 points** | **8.76 points** |

The [held score receipt](detector-timing-thinned-fit-result.json)
shows that the simpler pooled rule makes the same
decision as the resampling procedure in this case.
Keep thinning as a diagnostic for the legacy veto.
Its use as a decision rule would earn the extra work
on a new acquisition where it and pooled validation
make different choices. For the mechanism question,
a second diagnostic should resample whole time segments
of pulses and reconstruct pairs, preserving their
shared-pulse structure within segments.

The [whole-segment replay](detector-timing-segment-fit.md)
reconstructs those pairs on both selected veto cases.

The [pulse receipt](detector-timing-thinned-fit-pulses.json)
pins the full and projected arrays. The archive read
timed out before capture completed and recovered
using bounded retries on transient byte-range failures.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$up = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-thinned-fit-plan.json"
$pulses = "$lane/detector-timing-thinned-fit-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$prefix = "$($design.archivePrefix)/background_4"
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $up 'unshielded4-settings.xml')
curl.exe --fail --location "$prefix/background_4_info.txt" --output (Join-Path $up 'unshielded4-info.txt')
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan
python -B "$tools/air_filter_timing.py" $pulses $up
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses --score "$lane/detector-timing-thinned-fit-screen.json"
```
