# Require a minimum validation gain before fitting locally

The [shielded loss replay](detector-timing-loss.md) found
one change between mean and median routing across 36
held observations. The [gain plan](detector-timing-gain-plan.json)
uses a minimum mean validation gain to decide when to spend
work on a local fit. Its scale is the median of the twelve
mean reference validation errors in the earlier frozen
choices. The [budget receipt](detector-timing-gain-budget.json)
uses early validation counts from those runs and excludes
their held errors.

Both earlier blank-filter candidates differed from the
spiked-filter reference. Their settings match one another
after removing the run ID. The new local reference uses
the earlier blank run, HB573. It ended at 12:54:55 on
February 13, 2024. The HB5773 run 2 target began at
13:31:51 the same day. Both pulse slices are new to this
analysis. The local timing template is frozen separately
from the gain budget. [Air-filter archive](https://doi.org/10.57804/0tjh-3b49)

The reference loss is an upper bound on the validation
gain a local fit can achieve, since local error is
nonnegative. When the bound is at or below the minimum
gain, the guarded rule skips the provisional fit. Otherwise
it uses the first early block to fit and the next three to
validate. A final local refit pools the early blocks only
when the observed mean gain exceeds the threshold. The
unrestricted baselines are evaluated after the guarded
choices are frozen. Work counts describe policy fits.
The experiment still reads all target pulses and performs
the extra fits needed to compare the baselines.

The frozen budget is **4.73 percentage points**.
The [blank calibration](detector-timing-gain-calibration.json)
qualifies the first three bands with 143.25, 747.25 and
440.50 net wide reference pairs. The fourth has 87.50
pairs and falls below the 100-pair floor. Only the
50–150 keV target band supports a provisional fit across
all early blocks. Its reference loss is 16.49 points
and the provisional local loss is 19.66 points. The
[frozen choices](detector-timing-gain-frozen.json) keep
the reference.

| Fresh blank-run policy | Provisional fits | Final refits | Mean held error | Median held error |
| --- | ---: | ---: | ---: | ---: |
| Minimum mean gain | 1 | 0 | 12.90 points | 10.53 points |
| Unguarded mean | 1 | 0 | 12.90 points | 10.53 points |
| Unguarded median | 1 | 0 | 12.90 points | 10.53 points |
| Fixed reference | 0 | 0 | 12.90 points | 10.53 points |

The [fresh score receipt](detector-timing-gain-result.json)
contains five supported band-blocks. The 150–350 keV
band can use the reference in two late blocks even
though its early counts prevent adaptation. All policies
make the same forecast, and the gain guard saves no work
relative to unguarded validation on this target.

The [record-only shielded replay](detector-timing-gain-replay.json)
does skip six of twelve provisional fits and all final
refits, with the same 36 held errors as unguarded mean
routing. The skipped bands have reference losses at or
below the required gain. Six is the expected split in
these records because they supplied the median used to
set the budget. The replay verifies execution of the
bound on observed counts and supplies retrospective
work evidence. Relative to the earlier median rule it
also omits one final refit and raises mean held error
by 0.003 percentage points.

Keep the nonnegative-loss bound as an exact shortcut
for the stated gain policy. It guarantees the same
decision as fitting and then applying that threshold.
Its value as a default still depends on the target.
The next independent test should predeclare both the
work budget and the acceptable held-error increase,
screen a stable target's early reference losses, and
reserve unseen blocks for scoring cases where the
bound actually fires.

The [reference](detector-timing-gain-reference.json) and
[target](detector-timing-gain-pulses.json) receipts pin
the blank windows and their compact cache projections.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$air = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-gain-plan.json"
$reference = "$lane/detector-timing-gain-reference.json"
$target = "$lane/detector-timing-gain-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
foreach ($run in $design.runs) {
    $prefix = "$($design.archivePrefix)/$($run.id)"
    curl.exe --fail --location "$prefix/run.info" --output (Join-Path $air "$($run.id).info")
    curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $air "$($run.id).xml")
}
python -B "$tools/audit-detector-timing.py" $base $air --blank-gain-routing $plan
python -B "$tools/air_filter_timing.py" $reference $air
python -B "$tools/audit-detector-timing.py" $base $air --blank-gain-routing $plan --target-pulses $reference
python -B "$tools/air_filter_timing.py" $target $air
python -B "$tools/audit-detector-timing.py" $base $air --blank-gain-routing $plan --target-pulses $target
python -B "$tools/audit-detector-timing.py" $base $air --blank-gain-routing $plan --target-pulses $target --score "$lane/detector-timing-gain-frozen.json"
python -B "$tools/audit-detector-timing.py" $base $air --replay-fit-budget "$lane/detector-timing-gain-replay-plan.json"
```
