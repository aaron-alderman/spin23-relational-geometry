# Freeze mean and median loss rules on the same held acquisitions

The [air-filter replay](detector-timing-campaign.md) ranked
the forecasts differently by mean and median. The
[loss plan](detector-timing-loss-plan.json) compares those
two objectives on new data. A second blank air-filter
candidate differed from its reference in the archived
coincidence trigger-output setting. The first shielded
candidate also differed from the earlier unshielded
cobalt settings. Both direct carries were declined.
Shielded runs 2–6 match each other after normalizing
their run IDs, and their acquisition intervals are
disjoint. [Air-filter archive](https://doi.org/10.57804/0tjh-3b49)
[Uppsala archive](https://doi.org/10.57804/43jy-vw03)

The [shielded calibration](detector-timing-loss-calibration.json)
pairs references 2 and 3 separately and pools their
counts before setting its timing centers. It uses
channels 3 and 4 and raw lower-pulse ADC bands starting
at 0, 150, 450 and 1050. All four bands qualify, with
1,615, 4,540, 4,408 and 3,333 net wide pairs.
The centers are +30, +30, +30 and +50 ns. That reference
was frozen before downloading target pulses from runs
4–6.

The local validation fit comes from the first 20% of a
target run. Three disjoint 10% blocks then compare it
with the same reference. The [frozen choices](detector-timing-loss-frozen.json)
take the lower mean or median validation loss, with
ties going to the reference. Any local forecast used
for scoring pools all four early blocks. Every early
and late band-block meets the inherited 50-net-pair
floor. The same 36 late band-blocks enter each policy
summary with equal weight.

| Policy | Mean held error | Median held error |
| --- | ---: | ---: |
| Choose by mean validation loss | 5.284 points | 4.407 points |
| Choose by median validation loss | 5.281 points | 4.407 points |
| Always use the reference | 5.284 points | 4.407 points |
| Always use the early local fit when supported | 5.727 points | 4.520 points |

The mean rule keeps the reference for all twelve
run-and-band decisions. The median rule chooses local
once, on run 4 in the 450–1050 ADC band. The validation
mean favors the reference by 0.087 points and the
validation median favors local by 0.073 points. The
two choices therefore disagree in three late blocks.

| Late run 4 block, 450–1050 ADC | Mean rule, reference error | Median rule, local error |
| --- | ---: | ---: |
| First | 2.86 points | 1.66 points |
| Second | 2.33 points | 3.13 points |
| Third | 3.07 points | 3.36 points |

The median rule wins one of the three differing blocks
and loses two. Its larger win lowers mean error by
0.003 points across the 36 comparisons. The overall
median stays the same. The [score receipt](detector-timing-loss-result.json)
keeps the per-block counts and both forecasts. These
three targets share a detector configuration.

The next test should predeclare a minimum validation
gain large enough to justify local fitting. Score
that rule, the unguarded mean and median choices, and
the fixed reference on the same held acquisitions.
The observed margins here are small enough that the
operational cost of fitting may matter more than
which aggregate wins.

The [gain-budget replay](detector-timing-gain.md) tests a
threshold and measures which fitting operations it skips.

Retrieve the metadata and full ROOT files named in the
[reference](detector-timing-loss-reference.json) and
[target](detector-timing-loss-pulses.json) receipts.
Download the reference files before freezing and reading
the target files for an independent replay.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$up = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-loss-plan.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
foreach ($run in $design.runs) {
    $i = $run.number
    $prefix = "$($design.archivePrefix)/background_$i"
    curl.exe --fail --location "$prefix/background_${i}_info.txt" --output (Join-Path $up "shielded$i.info")
    curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $up "shielded$i.xml")
    if ($run.role -eq 'reference') {
        curl.exe --fail --location "$prefix/UNFILTERED/SData_background_$i.root" --output (Join-Path $up "shielded$i.root")
    }
}
python -B "$tools/audit-detector-timing.py" $base $up --shielded-loss-routing $plan --target-pulses "$lane/detector-timing-loss-reference.json"
foreach ($run in $design.runs | Where-Object role -eq 'target') {
    $i = $run.number
    $prefix = "$($design.archivePrefix)/background_$i"
    curl.exe --fail --location "$prefix/UNFILTERED/SData_background_$i.root" --output (Join-Path $up "shielded$i.root")
}
$target = "$lane/detector-timing-loss-pulses.json"
python -B "$tools/audit-detector-timing.py" $base $up --shielded-loss-routing $plan --target-pulses $target
python -B "$tools/audit-detector-timing.py" $base $up --shielded-loss-routing $plan --target-pulses $target --score "$lane/detector-timing-loss-frozen.json"
```
