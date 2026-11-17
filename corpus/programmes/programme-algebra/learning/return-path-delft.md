# Predict both events on separate acquisitions

The [parity excerpt](return-path-parity.md) established that a path
can contain a departure and still end at its starting label. This
test asks whether a decoder and two transition rates estimated on
one trace can predict the two event frequencies on separate traces.

The Delft processing deposit supplies the acquisition mapping.
Cells 25 and 33 of `2-processing_raw_data_device_B.ipynb`, using
zero-based cell numbering, connect `timestamp_qpp` to the names
of the archived I/Q members and identify repeats at each plunger
setting. Row 74 of `Raw_data/dev_B_ID_466.nc` gives ten timestamps
at 551.5 mV. The NetCDF experiment name specifies zero flux. The
[plan](return-path-delft-plan.json) pins both mapping sources and
assigns the first of the three selected traces to calibration and the
next two to scoring. Each acquisition lasts about two seconds and
their recorded timestamps are about ten seconds apart. This is one
device and one experimental evidence family. The tested coordinate
is 551.5 mV, while the paper's example trace is labeled 551.4 mV.
[Delft settings and processing](https://doi.org/10.4121/19102769)
[Raw I/Q traces](https://doi.org/10.4121/19103525)
[Paper, Figure 7 and Figure S18](https://arxiv.org/html/2202.12754)

The [calibration](return-path-delft-calibration.json) freezes a
principal I/Q axis and a two-centroid threshold fitted to the first
trace. Five native samples per bin give 11.38 μs per decoded sample.
The fitted levels are separated by 6.21 pooled standard deviations.
The runner estimates the sampled transition matrix in both directions.
It predicts an observed departure from the chance of seeing no change
in successive samples and an endpoint change from the powered
transition matrix. It scores both with the same starting-state
denominator in fixed windows. The endpoint shortcut simply uses the
first-departure forecast for the endpoint.

| Repeat and starting level | Windows | Observed departure | Predicted departure | Observed changed endpoint | Predicted changed endpoint |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1, low | 621 | 93.08% | 96.03% | 77.94% | 79.25% |
| 1, high | 2,825 | 59.72% | 52.94% | 17.10% | 18.97% |
| 2, low | 662 | 94.11% | 96.03% | 81.12% | 79.25% |
| 2, high | 2,784 | 51.47% | 52.94% | 19.18% | 18.97% |

At the primary window of 568.9 μs, including return gives endpoint
errors of 0.21–1.88 percentage points. The absorbing shortcut would
miss by 14.92–35.85 points. The first-exit error reaches 6.77 points
at this window and 7.87 points across the three tested horizons. The
[receipt](return-path-delft-result.json) retains denominators,
predicted frequencies and sample indices of the first three observed
returns per arm. These are descriptive errors on decoder-inferred
states. Adjacent windows can remain dependent, and the measurement
can miss changes within one averaged bin.

The [exploratory binning check](return-path-delft-binning-sensitivity.json)
recalibrated on the first trace at 10 and 25 samples per bin while
keeping the horizon width at 250 native sample steps. The
return-aware endpoint beat the absorbing shortcut in every comparison.
For the higher initial level, however, the calibration exit-rate
estimate fell from 1,369 to 1,077 per second between the five- and
25-sample analyses. The measured first-exit fractions also changed.
Binning changes which paths the decoder can see, and the fixed
window stride changes the starting samples across widths. The result
supports reuse of the event distinction and the sampled endpoint
calculation. The rate estimate is still tied to the decoder and
time resolution.

The next discriminator should fit a noise-aware decoder or the
authors' spectral rate model on calibration only, then freeze those
parameters and vary bin width while keeping the exact window start
and end times fixed. Comparing departures and endpoints at identical
physical times will help distinguish a bandwidth effect from inadequate
constant rates. A separate gate setting would then test where the
operation transfers with newly calibrated rates.

The [matched-window follow-up](return-path-delft-thinning.md) freezes the
decoder, varies the grid inside each window, and tests two additional
acquisitions at this setting.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$plan = "$lane/return-path-delft-plan.json"
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-parity-19103525'
$runner = 'tooling/programme-algebra/audit-return-path.py'
python tooling/programme-algebra/fetch-return-path-delft.py $plan $dir
python $runner $plan $dir --fit-iq
python $runner $plan $dir --score-iq "$lane/return-path-delft-calibration.json"
```

The fit and score use NumPy. The saved calibration reproduces with
Python 3.12 and NumPy 2.3.5. If floating-point differences change the
calibration on a different runtime, save a fresh calibration from the
fit command before scoring it.
