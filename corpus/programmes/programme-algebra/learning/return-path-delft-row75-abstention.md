# Test when a prefix should stop forecast reuse

The [blocked calibration test](return-path-delft-row75-blocked.md)
found that fitting the prefix made the point forecasts worse
on average. The [abstention plan](return-path-delft-row75-abstention-plan.json)
tests a different use for that fit. Keep the original forecast
and ask whether the prefix gives enough evidence to release it.
The test fixes repeats 3–5 for development and 6–9 for scoring.
It preserves the decoder and the disjoint 50-step score windows
in the final three quarters.

For each observable, starting label, and grid, the
[frozen record](return-path-delft-row75-abstention-frozen.json)
keeps the largest absolute error of the prefix forecast on the
three development repeats. On a new repeat, use that value as
the radius around its prefix forecast. The candidate releases
the original forecast only when every grid interval fits inside
its one-point tolerance. A cheaper static rule releases it
when its own development errors all met the tolerance. A
third policy always releases the original forecast.

| Policy | Released | Released misses | Withheld misses | Withheld accurate forecasts |
| --- | ---: | ---: | ---: | ---: |
| Always | 16 | 13 | 0 | 0 |
| Static | 4 | 1 | 12 | 0 |
| Prefix interval | 1 | 0 | 13 | 2 |

A decision covers one observable and starting label on one repeat.
It counts as a miss if any of the four grids misses by more than
one percentage point. The prefix rule withheld the higher-start
endpoint on repeat 6, where the original forecast missed by
**1.163 points**. It also withheld that forecast on repeats 7 and
9, where its errors were under a tenth of a point. Its only
release was the accurate higher-start endpoint on repeat 8.
The interval covered all grids for **8 of 16** decisions and
covered **36 of 64** grid comparisons. These grids share the
same windows. [Scoring receipt](return-path-delft-row75-abstention-result.json)

The prefix rule caught the static rule's miss here at the cost
of withholding two usable answers and estimating a local model
for each repeat. The one correct release and the low interval
coverage leave the rule experimental. The planner's held
qualification did not change.

All ten 551.75 mV repeats are now used. The [parity threshold
test](parity-departure-threshold.md) applies the exact relation
between nested grids to an independent experiment and checks
how much of a count decision can be certified on a coarse grid.

```powershell
$runner = 'tooling/programme-algebra/compare-delft-abstention.py'
python -B $runner
python -B $runner --envelopes return-path-delft-row75-abstention-frozen.json --trace-dir $traceDir
```
