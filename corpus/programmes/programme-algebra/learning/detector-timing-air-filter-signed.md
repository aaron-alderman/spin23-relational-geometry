# Test signed timing transfer between two air-filter runs

The [initial screen](detector-timing-air-filter.md) qualified
the 50–150 keV band on channels 1 and 2. The
[signed plan](detector-timing-air-filter-signed-plan.json)
uses the next ten million entries in each run after the
scouting prefix. It preserves the selected band, the ±2 µs
wide reference, the four timing controls and the earlier
[signed-bin scoring procedure](detector-timing-uppsala-signed.md).
The extended time spans are about 20.4 and 17.6 minutes.
All timestamps in the extensions follow the ends of the
respective scouting prefixes. [Air-filter archive](https://doi.org/10.57804/0tjh-3b49)

The first extended sample supplies 566.75 net wide pairs
in the selected band and sets its signed coordinate origin
at −10 ns. The first 40% by time in the second sample supplies
173.75 net wide pairs. It selects a +10 ns translation on
the inherited grid. The estimated profile from the same
early block serves as a second candidate. All three later
20% blocks clear the 50-pair floor.

| Late block | Net wide pairs | Unchanged reference error | Early-fitted shift error | Early target profile error |
| --- | ---: | ---: | ---: | ---: |
| 40–60% | 72 | 11.27 points | 13.71 points | 13.58 points |
| 60–80% | 111 | 13.38 points | 15.08 points | 12.62 points |
| 80–100% | 96.25 | 7.92 points | 13.51 points | 13.79 points |

The score is half the summed absolute discrepancy in
normalized net bin counts, expressed in percentage points.
The early-fitted shift increases error in every held block.
The best shifts chosen after observing each block are
0, 0, and −10 ns. The early target profile improves only
the middle block against the unchanged reference. The
[score receipt](detector-timing-air-filter-signed-result.json)
keeps the prompt and shifted counts for reconstruction.

The initial extended pairing also found calibrated pulse
heights below the declared energy domain. The runner now
counts those exclusions before pairing, 57 pulses in the
reference extension and 94 in the target extension. The
scored 50–150 keV band stays fixed.

Keep the unchanged template as a scored candidate even
when early data favor a shift. Here the count floor makes
comparison possible and the holdout catches an adjustment
that would worsen the forecast. The result concerns one
qualified band on the spiked filter. A third separately
started calibration run in the same archive can test
whether the unshifted policy retains its advantage.
The same-apparatus cobalt repeat remains a separate test.

The [third-run transfer](detector-timing-air-filter-transfer.md)
tests all three frozen forecasts on a separately started run.

Download the scouting data and metadata with the commands
in the [screen record](detector-timing-air-filter.md) first.
Then run the extended read and score.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tooling = 'tooling/programme-algebra'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$plan = "$lane/detector-timing-air-filter-signed-plan.json"
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
python -B "$tooling/air_filter_timing.py" $plan $dir
python -B "$tooling/audit-detector-timing.py" $base $dir --air-filter-signed $plan
```
