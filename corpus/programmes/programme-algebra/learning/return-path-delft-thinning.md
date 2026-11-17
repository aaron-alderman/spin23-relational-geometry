# Count which observed departures disappear when samples are dropped

The first [Delft transfer](return-path-delft.md) changed the averaging
width and the window stride together. The [follow-up plan](return-path-delft-thinning-plan.json)
keeps the five-native-sample I/Q decoder, starting labels, and both
window boundaries fixed. Each 568.9 μs window contains 50 decoded steps.
The analysis keeps every first, second, fifth or tenth label from each
window start, including its endpoint. This changes the observation
grid inside the window while keeping the underlying I/Q averaging and
the scoring denominator fixed.

The rate fits use calibration repeat 0 only. The original fit uses
adjacent labels. A second candidate estimates the two-state generator
from pairs five decoded steps apart. For either fit, the first
observed departure forecast is one minus the probability of seeing the
starting label at every retained sample. The endpoint forecast uses
the transition probability at the full window duration. Both are
evaluated on the same fixed grids. Score repeats 1 and 2 were already
used in the earlier analysis. Repeats 3 and 4 are newly scored raw
acquisitions at the same 551.5 mV setting. All five are from one device
and one evidence family. [Raw traces](https://doi.org/10.4121/19103525)

| Repeat, higher starting level | Departure, finest grid | Departure, every tenth label | Changed endpoint on either grid | Departures lost |
| --- | ---: | ---: | ---: | ---: |
| 1 | 59.72% | 38.41% | 17.10% | 602 of 2,825 |
| 2 | 51.47% | 38.04% | 19.18% | 374 of 2,784 |
| 3 | 52.31% | 39.98% | 19.21% | 342 of 2,774 |
| 4 | 52.33% | 38.52% | 18.65% | 385 of 2,788 |

In the first window of repeat 3, fine-grid samples 15 and 16
show a departure. Samples 0, 10, 20, 30, 40 and 50 all have the
starting label. Of the 727 lost departures in the two new repeats,
384 windows contain only isolated away labels even at full resolution.
Those isolated labels may be brief physical excursions or readout
misclassifications. The [receipt](return-path-delft-thinning-result.json)
keeps the counts and the first lost-departure example for each grid
and starting level.

The adjacent-label fit predicts a 9.76-point loss for the higher
starting level. The five-step fit predicts 8.09 points. The new repeats
lose 12.33 and 13.81 points. Endpoint errors for that level stay below
0.5 points on the new repeats under either fit. A good endpoint match
therefore leaves a real error in the predicted sampled path. Changing
the calibration lag alone fails to account for the lost departures.

Reuse the endpoint forecast at a fixed physical time and preserve
the observation grid as an input to the first-observed-exit operation.
The next discriminator should fit readout emissions and transitions
on the first I/Q trace, then compare the original and noise-aware
decoders on the same held-out windows. Check how many isolated labels
vanish and whether the predicted thinning loss improves along with
the endpoint match. The present result does not identify the
continuous-time physical exit rate independently of readout error.

The [noise-aware comparison](return-path-delft-noise.md) fits both
emissions and transition rates on the calibration trace and scores
the fixed grids, including one additional acquisition.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$base = "$lane/return-path-delft-plan.json"
$thinning = "$lane/return-path-delft-thinning-plan.json"
$calibration = "$lane/return-path-delft-calibration.json"
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-parity-19103525'
python tooling/programme-algebra/fetch-return-path-delft.py $base $dir --thinning-plan $thinning
python tooling/programme-algebra/audit-return-path.py $base $dir --thin-iq $calibration --thinning-plan $thinning
```
