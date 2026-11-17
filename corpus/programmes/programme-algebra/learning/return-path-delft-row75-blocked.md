# Test whether a different calibration improves transfer

At 551.75 mV, the [first held test](return-path-delft-row75.md)
found errors that differed between acquisitions. The
[blocked plan](return-path-delft-row75-blocked-plan.json)
reserves repeats 3–5 and keeps the original decoder fixed.
It compares the original repeat-0 matrix with one pooled
over repeats 0–2, one pooled separately for matching trace
quarters, and one fitted to the first quarter of each
held trace. All four forecasts use the same disjoint
50-step windows in the final three quarters. The local
fit sees only the prefix.

The [training record](return-path-delft-row75-blocked-frozen.json)
freezes the three training-based policies before scoring.
Forecasts use the facts-only planner. Within each held
repeat, the comparison averages quarter forecasts by the
number of windows with the requested starting label.
The [result](return-path-delft-row75-blocked-result.json)
preserves per-repeat, per-grid errors and the diagnostic
matrices computed from the held quarters after forecasting.

| Calibration | Mean absolute error | Worst error | Higher-start endpoint worst error |
| --- | ---: | ---: | ---: |
| Original repeat 0 | 1.847 pp | 5.053 pp | 0.340 pp |
| Pooled training repeats | 1.904 pp | 5.646 pp | 0.517 pp |
| Pooled matching quarters | 1.893 pp | 5.560 pp | 0.535 pp |
| Local prefix | 2.036 pp | 6.158 pp | 0.597 pp |

Errors are in percentage points. The mean weights each
observable, starting label, grid, and repeat equally.
The endpoint repeats across grids because the endpoint
and window selection are fixed. The higher-start endpoint
was the sole observable and starting-label pair within
one point on every grid and every reserved repeat, for
all four policies. The earlier whole-trace qualification
still fails on its own scope. Here the sampled region
excludes the first quarter and uses separately selected
acquisitions.

Some changes occur within a repeat. In repeat 3, the
estimated low-to-high one-step transition probability
was 12.20% in the prefix and 9.98% in the last quarter.
In repeat 4 it rose from 9.07% to 10.74% over those
regions. The direction of change differs across repeats.
These decoded transition estimates do not distinguish
label errors, estimation noise, and physical changes.
Neither pooling, time alignment, nor prefix fitting
improved the overall held error in this test. The stored
qualification therefore stays keyed to its original
window and evidence. There is no new global forecast
approval at 551.75 mV.

The [held abstention test](return-path-delft-row75-abstention.md)
checks whether prefix calibration can identify when to
withhold the original forecast.

```powershell
$runner = 'tooling/programme-algebra/compare-delft-calibrations.py'
python -B $runner $traceDir
python -B $runner $traceDir --frozen return-path-delft-row75-blocked-frozen.json
```
