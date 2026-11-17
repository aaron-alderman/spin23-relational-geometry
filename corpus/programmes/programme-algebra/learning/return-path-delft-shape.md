# When the edge data leave short-pulse recovery ambiguous

The [rectangular pulse test](return-path-delft-injection.md) measured
an onset-dependent recovery curve. The
[shape plan](return-path-delft-shape-plan.json) checks if the recorded
edges resolve a finite response before using one in that test.

The frozen HMM locates candidate switches. Both interleaved
streams must support their before and after plateaus. Within a
short neighborhood, one native sample parity fits a step and
brackets its onset between consecutive samples of that parity.
The other parity scores the step averaged over the bracket.
The two roles swap. I chose centered boxcar response candidates
of 1, 3, 5, and 7 native samples. Width 1 is instantaneous before
averaging over the onset bracket. Calibration repeat 0 supplies
the model ranking. Repeat 7 was used in the injection study, and
repeat 8 is newly scored. [Delft I/Q data](https://doi.org/10.4121/19103525)

| Acquisition | Eligible edges | RMS error, widths 1 and 3 | Width 5 | Width 7 |
| --- | ---: | ---: | ---: | ---: |
| Calibration repeat 0 | 2,503 | 0.3861 | 0.3892 | 0.4050 |
| Repeat 7 | 2,493 | 0.3823 | 0.3831 | 0.3965 |
| Repeat 8 | 2,381 | 0.3825 | 0.3852 | 0.4007 |

Widths 1 and 3 are exactly equivalent on this scoring grid.
The samples reserved for scoring sit at even offsets from the
center of the onset bracket. The two model curves agree at every
one of those offsets. That tie follows from the geometry of the
calculation and would persist with more edges under this protocol.
Width 5 is distinguishable and gives slightly larger descriptive
errors in both scored acquisitions. This comparison uses both
parities from the same instrument, and the initial HMM localization
uses the full bin. The edge score does not independently measure
instrument bandwidth or physical transition time.

The [receipt](return-path-delft-shape-result.json) reruns the
injection on identical backgrounds with the original nominal
scoring bins. A centered, unit-sum kernel changes the waveform
but preserves the nominal pulse duration and its integrated
amplitude. I kept widths 1 and 3 and added width 5 as a
distinguishable sensitivity case after finding the exact tie.

| Repeat 8, higher starting level | HMM recovery of an aligned 11.38 μs pulse | HMM recovery across the five onset phases |
| --- | ---: | ---: |
| Width 1 | 98.88% | 42.71–98.88% |
| Width 3 | 91.14% | 42.71–91.14% |
| Width 5 | 74.29% | 42.71–74.29% |

The edge-equivalent models differ by 7.74 percentage points at
the aligned onset. Across both scored repeats, eight native
samples (18.20 μs) still meet the plan's illustrative 90%
recovery and at most 5% sham-call limits for all four decoders,
both initial states, and every tested onset and shape. This
qualifies robustness across the tested waveforms. It supplies
no general detection floor for future acquisitions or kernel
families.

Preserve every edge model indistinguishable on the scored grid
when those models yield different recovery predictions. Report
the resulting sensitivity of the downstream result. A timed
calibration edge or an independently timed readout that scores
between the current offsets can distinguish the two leaders.
Freeze the edge shape from that separate measurement before
using it to correct physical departure frequencies.

The [observation-design audit](observation-design.md) turns this
distinction into a timing and amplitude error budget and reuses
the same check on the archived detector forecasts.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$base = "$lane/return-path-delft-plan.json"
$comparison = "$lane/return-path-delft-shape-plan.json"
$calibration = "$lane/return-path-delft-noise-calibration.json"
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-parity-19103525'
python tooling/programme-algebra/fetch-return-path-delft.py $base $dir --comparison-plan $comparison
python tooling/programme-algebra/audit-return-path.py $base $dir --shape-readout $calibration --comparison-plan $comparison
```
