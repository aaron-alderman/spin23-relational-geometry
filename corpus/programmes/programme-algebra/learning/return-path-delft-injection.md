# Measure how onset phase changes short-excursion recovery

The [interleaved test](return-path-delft-interleaved.md) found
limited corroboration for isolated labels. That left two plausible
causes for an erased label: a readout error or a real excursion
too brief to resolve. This test inserts a known additive waveform
into recorded I/Q backgrounds to measure decoder sensitivity.

The [plan](return-path-delft-injection-plan.json) requires both
outer flanks of each disjoint window to have the same threshold
label. It leaves the center samples out of that selection. Each
window contributes an untouched control and a paired waveform
variant. The waveform is a rectangular shift along the frozen
I/Q axis by the calibrated state separation. Its duration ranges
from one to 15 native samples. Its start takes each of the five
offsets within a bin. The decoders are frozen from repeat 0.
The repeats reuse one device and setting. Repeat 7 was first
scored here. [Delft I/Q data](https://doi.org/10.4121/19103525)

| Decoder, repeat 7 higher starting level | Five-sample pulse, 11.38 μs | Eight-sample pulse, 18.20 μs | Untouched control, five-sample scoring region |
| --- | ---: | ---: | ---: |
| Full-bin threshold | 87.62–99.98% | 99.90–100.00% | 2.07–2.78% |
| Gaussian HMM | 50.82–99.13% | 99.21–99.73% | 1.76–2.20% |
| Three native samples nominate, two confirm | 48.27–96.69% | 97.23–98.05% | 1.72–2.24% |
| Two native samples nominate, three confirm | 52.29–98.24% | 93.15–99.05% | 1.68–2.17% |

Each range covers the five onset phases with the same 5,171
paired backgrounds. A call must overlap a bin touched by the
pulse. The [receipt](return-path-delft-injection-result.json)
also records calls created or removed by injection relative to
the same untouched backgrounds. For a one-sample pulse, the
threshold creates 4.10% calls and the HMM creates 0.58%. In
repeat 7, eight native samples is the first tested duration that
reaches the plan's illustrative 90% recovery and at most 5%
untouched-control calls at all phases, for every decoder and
either starting state. In repeat 6, the two-sample nominator
starting at the higher state first reaches that criterion at
ten native samples. The tested durations bracket this
operating point for the specified waveform.

A center can contain an actual departure even when both flanks
agree. The untouched-control fractions therefore measure calls
on recorded backgrounds with uncertain latent states. The injected
pulse has known support but assumes an instantaneous rectangular
shift. The HMM also uses later samples within each snippet, as
an offline decoder. Neither feature supplies direct evidence
about the shape or prevalence of real short transitions.

Attach a duration- and onset-dependent recovery measurement to
any claim about short excursions. An isolated label can be weak
evidence and the persistence decoder can still miss a known
brief waveform. The next test can estimate the instrument's
observed transition shape from longer, corroborated switches
and repeat the paired injection with finite rise and fall times.
Keep any shape estimated from one acquisition fixed when scoring
another.

The [measured-edge follow-up](return-path-delft-shape.md) finds two
responses with identical edge predictions and different pulse
recovery when injected into the same backgrounds.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$base = "$lane/return-path-delft-plan.json"
$comparison = "$lane/return-path-delft-injection-plan.json"
$calibration = "$lane/return-path-delft-noise-calibration.json"
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-parity-19103525'
python tooling/programme-algebra/fetch-return-path-delft.py $base $dir --comparison-plan $comparison
python tooling/programme-algebra/audit-return-path.py $base $dir --inject-readout $calibration --comparison-plan $comparison
```
