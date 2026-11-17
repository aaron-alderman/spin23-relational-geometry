# Test whether readout errors account for missed departures

The [thinning audit](return-path-delft-thinning.md) found more lost
departures than either rate fit predicted, many with an isolated away
label. This [comparison](return-path-delft-noise-plan.json) retains
the same I/Q projection, five native samples per decoded bin, and
568.9 μs window. It fits a two-state hidden Markov model with Gaussian
readout emissions to calibration repeat 0. The initial model uses
the threshold calibration's centroids, spread, and transition counts.
The likelihood fit updates the emissions and transition matrix and
freezes them before scoring. Repeats 1–4 serve as retrospective
checks. Repeat 5 was newly selected by its acquisition index at the
same 551.5 mV setting. All runs are from one experimental evidence
family. [Delft acquisition data](https://doi.org/10.4121/19103525)

The scorer compares the two decoders only in windows where they
agree on the starting label. Each row below uses every tenth
decoded sample after the first, with the last sample retained.

| Repeat, higher start | Shared windows | Lost departures with threshold | Lost departures with HMM | HMM loss forecast error |
| --- | ---: | ---: | ---: | ---: |
| 1 | 2,820 | 21.31% | 9.18% | 0.92 percentage points |
| 2 | 2,782 | 13.41% | 9.96% | 1.70 points |
| 3 | 2,773 | 12.33% | 9.38% | 1.12 points |
| 4 | 2,787 | 13.78% | 10.37% | 2.11 points |
| 5 | 2,807 | 16.57% | 8.94% | 0.68 points |

The HMM forecasts an 8.26% loss at the higher start. In repeat 5 it
reduces the count of lost-departure windows from 465 to 251 and the
subset containing only isolated away labels from 309 to 94. Thirteen
of 3,446 windows were excluded because the two decoders disagreed
on the start. The endpoint-change fraction at the higher start shifts
from 17.14% to 17.06%. The corresponding HMM forecast is 18.65%.
The lower start is also scored in the [receipt](return-path-delft-noise-result.json).

As a second check, forward likelihood scores I/Q values directly
without using the decoded labels. The fitted model increases this
held-out score over the initialized Gaussian HMM on four repeats.
On repeat 5 it gains 0.00297 nats per bin, and on repeat 3 it
loses 0.000068 nats per bin. The [calibration receipt](return-path-delft-noise-calibration.json)
retains the iteration likelihoods and both parameter sets.

The model assumes Gaussian emissions that are conditionally
independent given the state. A bin can straddle a real transition.
The Viterbi path is inferred under the same persistence model used
for the forecast, so agreement in the table is a self-consistency
check on a particular decoder. The I/Q likelihood measures
predictive fit to the observed signal and supplies no ground-truth
state labels. The inferred higher-to-lower rate changes from
1,369 to 1,197 per second with the decoder choice despite a fixed
I/Q averaging width.

Preserve the decoder with the observation grid when recording a
first-exit frequency. To test whether the suppressed labels were
mostly classification errors, the next comparison can divide each
original I/Q bin into interleaved native samples. Fit the readout
of each stream on calibration only, and check whether the other
stream supports the isolated excursions. Shared amplifier noise
and real transitions within a bin can couple the two streams, so
measure their calibration residual correlation before treating the
second stream as corroboration.

The [interleaved readout follow-up](return-path-delft-interleaved.md)
applies this conditional check to a newly scored acquisition.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$base = "$lane/return-path-delft-plan.json"
$comparison = "$lane/return-path-delft-noise-plan.json"
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-parity-19103525'
$runner = 'tooling/programme-algebra/audit-return-path.py'
python tooling/programme-algebra/fetch-return-path-delft.py $base $dir --comparison-plan $comparison
python $runner $base $dir --fit-noise --comparison-plan $comparison
python $runner $base $dir --score-noise "$lane/return-path-delft-noise-calibration.json" --comparison-plan $comparison
```
