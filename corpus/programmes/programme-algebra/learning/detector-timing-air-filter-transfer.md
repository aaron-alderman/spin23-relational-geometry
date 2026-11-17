# Carry frozen timing profiles into a third acquisition

The [preceding replay](detector-timing-air-filter-signed.md)
found that a shift fitted on early data worsened all three
late blocks. Its unchanged first-run reference had the
lowest median error of the three candidates. The
[transfer plan](detector-timing-air-filter-transfer-plan.json)
favors that reference and carries all three candidates
forward for comparison in the same 50–150 keV band on
channels 1 and 2.

The [frozen forecast](detector-timing-air-filter-transfer-frozen.json)
was saved before extracting any third-run pulses. It contains
the first-run profile at the previous −10 ns coordinate origin,
the first-run profile translated by the previously fitted
+10 ns, and the early profile from the second run. The
third acquisition started on February 2, 2024 at 15:00
local time, after the second acquisition had stopped.
The archived settings differ only by run ID.
[Air-filter archive](https://doi.org/10.57804/0tjh-3b49)

The scorer reads the same ten-million-entry interval as
before, starting at entry index one million. It divides
the time span into five equal blocks. All three profiles
use the same signed bins, shifts for background subtraction
and minimum of 50 net wide pairs per scored block. The
score is half the summed absolute difference in normalized
net bin counts. Every eligible third-run block is available
for scoring because the forecasts require no third-run fit.

| Third-run block | Net wide pairs | Unchanged reference error | Translated reference error | Early second-run profile error |
| --- | ---: | ---: | ---: | ---: |
| 0–20% | 226.50 | 8.90 | 11.19 | 11.75 |
| 20–40% | 213.25 | 11.81 | 11.03 | 11.08 |
| 40–60% | 188.25 | 13.67 | 13.09 | 11.15 |
| 60–80% | 229.50 | 11.62 | 15.36 | 15.83 |
| 80–100% | 208.50 | 9.77 | 12.91 | 16.67 |
| **Median error, points** | | **11.62** | 12.91 | 11.75 |

The favored unchanged profile has the lowest median.
It wins three blocks. The translated reference wins the
second and the early second-run profile wins the third.
The margin over the early second-run profile is just 0.13
points in the median, so keep both forecasts and their
per-block errors in the [score receipt](detector-timing-air-filter-transfer-result.json).
The frozen design avoids fitting any new profile or
delay on this run. That makes the first 40%, with 439.75
net wide pairs across two blocks, available for scoring.
The entire pulse slice still has to be read.

Retain the unchanged template as a candidate when it
survives a separately started run. Preserve competing
profiles when the margin is small or the block winners
differ. All three runs here share a calibration filter and
apparatus. The next discriminating test should apply the
same frozen comparison to a separately acquired sample
on the same channels, with a count screen before scoring.
That would expose sensitivity to sample composition while
keeping the readout geometry fixed.

The [field-filter replay](detector-timing-field-filter.md)
tests that change directly with all three carried profiles.

Prepare the prior cache using the [signed replay](detector-timing-air-filter-signed.md).
The [target receipt](detector-timing-air-filter-transfer-target.json)
pins the third-run pulses and the already saved forecast.
The first command below reproduces the forecast. The
remaining commands fetch metadata and score the target.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-air-filter-transfer-plan.json"
$target = "$lane/detector-timing-air-filter-transfer-target.json"
python -B "$tools/audit-detector-timing.py" $base $dir --air-filter-transfer $plan
$run = (Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json).target.id
$prefix = "https://uu.open.care.snd.se/downloads/public/2024-172/1/data/calibration/$run"
curl.exe --fail --location "$prefix/run.info" --output (Join-Path $dir "$run.info")
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $dir "$run.xml")
python -B "$tools/air_filter_timing.py" $target $dir
python -B "$tools/audit-detector-timing.py" $base $dir --air-filter-transfer $plan --score $target
```
