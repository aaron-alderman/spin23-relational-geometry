# Test the two timing rules where their early choices differ

The [repeat-route replay](detector-timing-repeat-route.md)
gave the same forecast under a single early validation
and under two disjoint validations. The
[disagreement plan](detector-timing-disagreement-plan.json)
screens for cases that can distinguish the two rules.
It lists the next two UV2404 field-filter runs and five
previously measured Uppsala sources. The air-filter runs
are fresh cases for the signed routing analysis. The
Uppsala comparisons are retrospective because their late
blocks had been scored in earlier signed experiments.
[Air-filter archive](https://doi.org/10.57804/0tjh-3b49)
[Uppsala archive](https://doi.org/10.57804/43jy-vw03)

Each screen pairs only the four early 10% time blocks.
The single rule compares two pooled 20% intervals.
The repeated rule compares two disjoint fit-validation
pairs. Both use a 50-net-wide-pair floor for each early
block they compare. The screen requires support for both
trials before it treats differing choices as a
disagreement. It selects the first eligible source in
each archive's declared order and then the lowest eligible
band on that source. The scorer verifies the frozen screen
before pairing the selected cases' late blocks.

| Screen | Bands agreeing | Bands disagreeing | Bands below early support | Selected |
| --- | ---: | ---: | ---: | --- |
| Fresh air-filter runs | 2 | 0 | 0 | None |
| Retrospective Uppsala | 9 | 3 | 8 | Bismuth-207, 50–150 keV |

Both rules keep the reference on both new air-filter
runs. Their late blocks stay unpaired. The
[frozen screen](detector-timing-disagreement-screen.json)
preserves the two agreements as well as the disagreements
on bismuth, europium and holmium. The declared order
selects bismuth before any late pairs are formed in this
replay.

In bismuth's selected band all four early blocks qualify,
with 75.25, 65.5, 78 and 74.5 net wide pairs. The pooled
single comparison favors local, 22.91 against 24.96
points of error. In the first disjoint comparison, local
loses by **0.095 points**. It wins the second by 4.94
points. The repeated rule requires both wins and therefore
keeps the reference.

| Held bismuth block | Net wide pairs | Single rule, local error | Repeated rule, reference error |
| --- | ---: | ---: | ---: |
| 40–60% | 173.00 | 11.05 | 25.94 |
| 60–80% | 168.75 | 11.03 | 24.14 |
| 80–100% | 173.25 | 11.15 | 19.05 |
| **Median error, points** | | **11.05** | **24.14** |

The strict repeat rule raises median error by 13.09
points in the selected case. The two fresh cases provide
agreement evidence but no held comparison between distinct
choices. The [score receipt](detector-timing-disagreement-result.json)
records the bismuth result and the absence of a selected
fresh case. This replay bounds the strict veto on a measured
case. Its selection and prior examination limit the claim
to the recorded disagreement.

Retain the validation margins along with their signs. The
next discriminator is to fix a near-tie treatment from an
independent estimate of block-to-block variability, then
challenge it on a new acquisition where it changes the
early choice. A tolerance chosen just to undo the bismuth
veto would reuse the observed outcome.

The [near-tie replay](detector-timing-tolerance.md) sets a
tolerance using only earlier air-filter margins and checks
it on the next air-filter run.

Prepare both earlier archive caches. The new
[pulse receipt](detector-timing-disagreement-pulses.json)
pins the two new air-filter samples.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$air = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$uppsala = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-disagreement-plan.json"
$pulses = "$lane/detector-timing-disagreement-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
foreach ($target in $design.airTargets) {
    $run = $target.id
    $prefix = "$($design.archivePrefix)/$run"
    curl.exe --fail --location "$prefix/run.info" --output (Join-Path $air "$run.info")
    curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $air "$run.xml")
}
python -B "$tools/air_filter_timing.py" $pulses $air
python -B "$tools/audit-detector-timing.py" $base $uppsala --screen-route-disagreement $plan --target-pulses $pulses --air-filter-directory $air
python -B "$tools/audit-detector-timing.py" $base $uppsala --screen-route-disagreement $plan --target-pulses $pulses --air-filter-directory $air --score "$lane/detector-timing-disagreement-screen.json"
```
