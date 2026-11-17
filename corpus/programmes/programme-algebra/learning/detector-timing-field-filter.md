# Test frozen timing profiles on a field filter

The [third calibration run](detector-timing-air-filter-transfer.md)
scored the unchanged reference, a translated reference and
the early second-run profile on the same spiked filter. Its
lowest median error, from the unchanged reference, led the
early second-run profile by 0.13 percentage points.

The [field-filter plan](detector-timing-field-filter-plan.json)
changes the sample to field filter UV2404, collected at the
Umeå air-sampling station. It keeps channels 1 and 2 and the
50–150 keV band. The acquisition started on February 5, 2024
at 11:57 local time, after the last calibration run had
stopped at 08:38. The settings files match after removing
the run identifier. [Data paper](https://doi.org/10.1016/j.dib.2025.111832)
[Archive](https://doi.org/10.57804/0tjh-3b49)

The [carried forecast](detector-timing-field-filter-frozen.json)
reads the three bin profiles from the pinned calibration
receipt. It reproduces with access to all pulse files
disabled. The target is the same ten-million-entry slice
by file index as before, divided into five equal time
blocks. Each block must have at least 50 net wide pairs in
the previously qualified band for any forecast to be scored.

| Field-filter block | Net wide pairs | Unchanged reference error | Translated reference error | Early second-run profile error |
| --- | ---: | ---: | ---: | ---: |
| 0–20% | 162.75 | 11.69 | 10.24 | 15.59 |
| 20–40% | 180.75 | 9.64 | 11.47 | 12.59 |
| 40–60% | 171.00 | 9.57 | 15.46 | 16.10 |
| 60–80% | 194.00 | 14.33 | 16.62 | 14.04 |
| 80–100% | 170.75 | 10.59 | 16.42 | 14.77 |
| **Median error, points** | | **10.59** | 15.46 | 14.77 |

All five blocks qualify. The unchanged reference has the
lowest median error, 4.18 points ahead of the next profile
by that measure. It wins three blocks. The translated
reference wins the first block, and the early second-run
profile wins the fourth. The [score receipt](detector-timing-field-filter-result.json)
retains these losses and the raw prompt and shifted counts.
These are descriptive comparisons within one field-filter
run.

The same channel and wide-count checks let the scorer reuse
the forecasts through a change of sample. It reads no prior
pulse file and reserves no field-filter block for fitting.
The first two blocks therefore contribute 343.50 net wide
pairs to evaluation. A reusable admission rule needs run
and settings identity checks, the same pulse and pair
selectors, and per-block count support. A settings match
alone previously missed the ADC rail failure. The next
test should challenge that admission rule with supported
and unsupported blocks from another archive and retain any
case where its metadata checks pass but its counts fail.

The [reuse challenge](detector-timing-reuse.md) derives a
candidate from these records and tests it on sodium and
bismuth from the other archive.

With the earlier metadata in the cache, reproduce the
forecast and field-filter score with the following commands.
The target receipt binds the new pulse sample to the forecast.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-field-filter-plan.json"
$target = "$lane/detector-timing-field-filter-target.json"
python -B "$tools/audit-detector-timing.py" $base $dir --air-filter-transfer $plan
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$run = $design.target.id
$prefix = "$($design.archivePrefix)/$run"
curl.exe --fail --location "$prefix/run.info" --output (Join-Path $dir "$run.info")
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $dir "$run.xml")
python -B "$tools/air_filter_timing.py" $target $dir
python -B "$tools/audit-detector-timing.py" $base $dir --air-filter-transfer $plan --score $target
```
