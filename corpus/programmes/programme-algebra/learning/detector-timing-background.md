# Set the near-tie tolerance on Uppsala and test a background run

The [air-filter transfer](detector-timing-tolerance-transfer.md)
found agreement after changing the sample. The
[background plan](detector-timing-background-plan.json)
moves to the Uppsala detector archive, where previous
early choices disagreed. It keeps the near-tie rule and
estimates its scale from the Uppsala early margins.
Each source supplies the median absolute difference
between its two disjoint trial margins across supported
bands. The tolerance is the median of those source
medians, so one source with more supported bands
cannot dominate the estimate.

The [frozen calibration](detector-timing-background-calibration.json)
uses sodium, bismuth, europium and holmium. Their source
medians are 2.04, 4.39, 5.09 and 4.46 percentage points.
Caesium provides no fully supported disjoint trial pair.
The estimate is **4.43 points** and uses only earlier
early-block evidence. It was saved before extracting
the unused background pulses. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

The target is the first recorded unshielded background run.
Its settings match the cobalt file after normalizing the
run identifier and the timed-stop flag. It keeps channels
3 and 4, the cobalt time offsets, the signed bins and the
50-net-wide-pair floor. Three fixed four-million-entry
windows come from the first ROOT data tree. The screen
uses only four early time blocks from each. It scores
the first changed choice by window and ascending energy
band after freezing the screen.

All twelve window–band combinations support the early
comparisons. The strict and tolerant rules agree on
eleven. The [frozen screen](detector-timing-background-screen.json)
selects the band starting at 350 keV in the third window,
starting at entry 9,400,000. There the pooled comparison
favors local by 5.94 points. The two disjoint margins
are +3.82 and −2.03 points, where positive favors
local. Strict repetition keeps cobalt and the tolerance
allows the local profile. The other windows stay
unpaired after the early screen.

| Held block | Net wide pairs | Strict rule, cobalt error | Near-tie rule, local error |
| --- | ---: | ---: | ---: |
| 40–60% | 257.00 | 17.39 points | 7.62 points |
| 60–80% | 208.00 | 20.02 points | 12.07 points |
| 80–100% | 239.50 | 15.99 points | 9.27 points |
| **Median** | | **17.39 points** | **9.27 points** |

The median falls by 8.13 points before rounding. The
[score receipt](detector-timing-background-result.json)
shows improvement in every held block. This is one
predeclared changed choice from one background
acquisition. The simpler pooled rule also chose local.
To distinguish it from the near-tie rule, the next
test should freeze the same tolerance and select a
new acquisition in which the pooled rule favors
local and one supported trial loses by more than
the tolerance. Such a case would test whether the
remaining veto earns its cost.

The [second background challenge](detector-timing-veto.md)
tests the retained veto against pooled validation.

The [pulse receipt](detector-timing-background-pulses.json)
pins the full slices and their compact projections.
Channels 3 and 4 and both original time endpoints are
preserved. Use the previous Uppsala cache for the
calibration pulses and run the following commands.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$up = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-background-plan.json"
$pulses = "$lane/detector-timing-background-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$prefix = "$($design.archivePrefix)/background_1"
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $up 'unshielded1-settings.xml')
curl.exe --fail --location "$prefix/background_1_info.txt" --output (Join-Path $up 'unshielded1-info.txt')
curl.exe --fail --location 'https://uu.open.care.snd.se/downloads/public/2025-324/1/data/measurements/energy_calibration/co60_600s/settings.xml' --output (Join-Path $up 'co-settings.xml')
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan
python -B "$tools/air_filter_timing.py" $pulses $up
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses --score "$lane/detector-timing-background-screen.json"
```
