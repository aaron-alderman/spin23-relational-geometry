# Carry the near-tie rule to another calibration sample

The [near-tie replay](detector-timing-tolerance.md) froze a
3.06-percentage-point tolerance and found agreement on both
held windows of the field filter. The
[transfer plan](detector-timing-tolerance-transfer-plan.json)
carries that same calibration and reference profile to
calibration sample 2. The target acquisition ran from
January 26 to January 29, 2024, before the reference runs.
It is a historical holdout for the timing-rule analysis.
Its settings match the reference files after removing the
run identifier. [Air-filter archive](https://doi.org/10.57804/0tjh-3b49)
[Sample 2 calibration study](https://uu.diva-portal.org/smash/get/diva2%3A1876519/FULLTEXT01.pdf)

The plan fixes three disjoint nine-million-entry windows
from the first ROOT file. The cache keeps channels 1 and 2
and each original window's time endpoints, with both the
full and projected arrays pinned by hash. All three rules
use the same 50–150 keV band, time controls and support
floor as before. Compare the pooled single choice, the
strict repeated choice and the tolerant repeated choice
using only the four early blocks. Pair the last blocks
only for the first supported window where the tolerance
changes the strict choice.

| Window start entry | Early block net wide pairs | Pooled margin | Disjoint margins |
| --- | --- | ---: | --- |
| 1,000,000 | 100.50, 107.75, 130.50, 113.25 | −1.60 points | +0.59, −5.91 points |
| 10,200,000 | 122.75, 129.25, 107.75, 113.00 | −5.56 points | −3.96, −14.55 points |
| 19,400,000 | 129.75, 90.50, 119.25, 130.00 | −4.17 points | −4.88, −2.06 points |

Positive margins favor local. All twelve early blocks
clear the 50-pair floor. The pooled comparison favors
the reference in every window. The first disjoint
comparison in the first window favors local slightly,
and the second trial's loss exceeds the tolerance.
The [frozen screen](detector-timing-tolerance-transfer-screen.json)
records agreement under all three policies. Its
[result receipt](detector-timing-tolerance-transfer-result.json)
has zero held scores because no window qualified for the
change-of-choice test. The three sets of late blocks stay
unpaired.

The screen exercises exact reuse of the saved calibration
and exposes a limit of searching this apparatus for a
changed choice. The same sample and a distinct
calibration sample both produced agreements across the
recorded windows. A more discriminating next test is to
pick a detector archive where early comparisons already
show disagreements, derive its tolerance on prior early
blocks, and reserve a new acquisition for scoring. Preserve
the historical agreements as part of the selection record.

The [Uppsala background challenge](detector-timing-background.md)
finds a changed choice on a previously unused acquisition.

Keep the earlier air-filter metadata and receipts in the
cache. Reproduce the carried calibration, then fetch and
screen the historical target. The
[pulse receipt](detector-timing-tolerance-transfer-pulses.json)
records the full and projected hashes. To make room for
these windows, the older UV2404 run 2 pulse cache was
cleared. Its archived inputs and prior receipts remain
available for replay.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$air = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-tolerance-transfer-plan.json"
$pulses = "$lane/detector-timing-tolerance-transfer-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$run = $design.target.id
$prefix = "$($design.archivePrefix)/$run"
curl.exe --fail --location "$prefix/run.info" --output (Join-Path $air "$run.info")
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $air "$run.xml")
python -B "$tools/audit-detector-timing.py" $base $air --tie-aware-route $plan
python -B "$tools/air_filter_timing.py" $pulses $air
python -B "$tools/audit-detector-timing.py" $base $air --tie-aware-route $plan --target-pulses $pulses
python -B "$tools/audit-detector-timing.py" $base $air --tie-aware-route $plan --target-pulses $pulses --score "$lane/detector-timing-tolerance-transfer-screen.json"
```
