# Score pooled validation without selecting disagreements

The [segment-routing challenge](detector-timing-segment-route.md)
tested a deliberately selected disagreement on the Uppsala
background apparatus. The [campaign plan](detector-timing-campaign-plan.json)
carries the cheaper pooled rule to the separate air-filter
detector setup and scores all eligible late blocks. The
numerical reference is calibrated on the local archive.
The code qualifies every band with 100 net wide reference
pairs and freezes its timing center before reading target
pulses. It uses the same channels, signed bins and shifted
controls as the earlier local calibration.
[Air-filter archive](https://doi.org/10.57804/0tjh-3b49)

The [preparation receipt](detector-timing-campaign-preparation.json)
checks the two declared acquisitions. The unused
`CalibrationSample76_29jan2024` run ends at 08:17:45 local
time on January 31, 2024, before the local reference run
starts at 08:18:36. The settings match after removing the
run ID. The `Blankprov_HB573` run changes
`SRV_PARAM_COINC_TRGOUT` from 100 to 800 in the archived
settings. Its pulses stay unread under the matching
readout condition. This leaves one admitted historical run
on the air-filter apparatus.

Pool the first two early 10% blocks for the fit and pool
the next two for validation. If both groups have at least
50 net wide pairs and the validation loss favors the local
profile, choose local and pool all four early blocks for
the held forecast. Otherwise keep the frozen reference.
Score the chosen forecast and both supported alternatives
on each of the three late blocks. The same late floor
applies to all choices.

The new local reference supports the first three energy
bands with 155.75, 566.75 and 331 net wide pairs.
The band starting at 350 keV has 69.25 reference pairs
and is excluded. In the admitted target, the 0–50 keV
band also falls below the pairing floor in all three
late blocks, with 17.25, 23.25 and 29.5 net pairs.
The [frozen choices](detector-timing-campaign-frozen.json)
keep the reference in all bands. In the two scored
bands the early margins favor it by 0.95 and 3.05
points, respectively.

| Policy | Median error across six band-blocks | Mean error across six band-blocks | Blocks with lower error than the other forecast |
| --- | ---: | ---: | ---: |
| Pooled routing, which chose the reference in both bands | **13.07 points** | 15.42 points | 3 |
| Always fit a local profile when supported | 14.41 points | **14.97 points** | 3 |

The always-reference baseline is identical to the
chosen forecast here. All six supported comparisons
are in the [score receipt](detector-timing-campaign-result.json),
along with the excluded bands and raw shifted counts.
The 50–150 keV band favors the reference by median
error, 12.53 versus 14.32 points. In the 150–350 keV
band the local profile has the lower median, 14.58
versus 21.21 points. Across the six equally weighted
comparisons, the reference wins on median and the
local forecast wins on mean. These are descriptive
scores on one admitted acquisition.

The next choice rule needs an explicit loss target.
Freeze whether the objective is the typical error or
the average error across all eligible band-blocks,
then test that decision on another acquisition. The
current result supports transporting the procedure
and keeping its count and settings refusals. It
leaves the advantage of dynamic routing over a fixed
default unresolved.

The [shielded loss comparison](detector-timing-loss.md)
freezes mean and median routing on additional acquisitions.

Use the metadata and local reference cache from the
[air-filter signed replay](detector-timing-air-filter-signed.md).
The [pulse receipt](detector-timing-campaign-pulses.json)
pins only the admitted target's full and projected arrays.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$air = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-campaign-plan.json"
$pulses = "$lane/detector-timing-campaign-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
foreach ($target in $design.targets) {
    $run = $target.id
    $type = $target.relativePath.Split('/')[0]
    $prefix = "$($design.archivePrefix)/$type/$run"
    curl.exe --fail --location "$prefix/run.info" --output (Join-Path $air "$run.info")
    curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $air "$run.xml")
}
python -B "$tools/audit-detector-timing.py" $base $air --pooled-campaign $plan
python -B "$tools/air_filter_timing.py" $pulses $air
python -B "$tools/audit-detector-timing.py" $base $air --pooled-campaign $plan --target-pulses $pulses
python -B "$tools/audit-detector-timing.py" $base $air --pooled-campaign $plan --target-pulses $pulses --score "$lane/detector-timing-campaign-frozen.json"
```
