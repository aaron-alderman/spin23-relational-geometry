# Check brief excursions with interleaved readouts

The [noise-aware comparison](return-path-delft-noise.md) suppressed many
isolated labels. Its decoded paths used the same persistence model
as its forecasts. This test asks whether another part of the recorded
I/Q signal supports those brief excursions.

The [plan](return-path-delft-interleaved-plan.json) fixes the source
and the previous decoder by hash. In each five-sample bin, one stream
uses native offsets 0, 2, and 4, and the other uses 1 and 3. Both
averages have the same nominal center. Repeat 0 sets a joint Gaussian
readout model for each state. The six neighboring labels assign the
calibration state without using the center bin. The residual
correlation is 0.142 in the lower state and 0.167 in the upper state.

For scoring, one stream alone nominates a one-bin excursion or the
center of an exactly three-bin excursion, with three baseline labels
on either side. The other stream supplies a conditional likelihood
ratio for away versus baseline, given the nominating stream's
actual center value. The rule uses the calibrated covariance to
account for shared noise. A ratio above one counts as support without
assigning a prior probability to the excursion. The full-bin HMM
label is recorded afterward. Repeat 5 was scored earlier. Repeat 6
was selected in advance from the same 551.5 mV settings row and
was newly scored here. [Raw I/Q data](https://doi.org/10.4121/19103525)

| Repeat 6, starting at the higher level | One-bin nominations supported | Three-bin nominations supported |
| --- | ---: | ---: |
| Three native samples nominate, two confirm | 175 of 663 (26.4%) | 81 of 86 (94.2%) |
| Two native samples nominate, three confirm | 171 of 1,947 (8.8%) | 81 of 82 (98.8%) |

The earlier repeat shows the same pattern in both directions.
The two nomination directions can count the same underlying
path and have different signal-to-noise ratios. Among isolated
repeat-6 nominations suppressed by the HMM, the confirmation
readout still favors an excursion in 38 of 511 cases in one
direction and 36 of 1,792 in the other. The
[receipt](return-path-delft-interleaved-result.json) preserves the
full counts and likelihood-ratio medians for both starting levels.

This supports treating isolated labels as weaker evidence than
those sustained over several bins. It also exposes a limit of the
persistence decoder. Some suppressed labels retain conditional
support from the second stream. Both streams come from the same
instrument. A physical excursion shorter than a bin can affect
the offset groups differently, and the conditional model is
calibrated mainly on stable bins. The fractions measure agreement
under that model. They leave the false-positive rate and the
duration of true excursions unresolved.

Reuse the rule by nominating with one stream and scoring the other
conditional on the first, after calibrating their joint residuals.
The next discriminator should insert known-duration, phase-shifted
excursions into raw I/Q residuals from stable intervals. Compare
how often the threshold, HMM, and conditional readout recover
injected excursions and how often they nominate on untouched
controls. That would estimate the loss of real short events under
an explicit signal model. A separately calibrated readout would
give a stronger physical check.

The [paired waveform injection](return-path-delft-injection.md) measures
this sensitivity across known durations and onset phases.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$base = "$lane/return-path-delft-plan.json"
$comparison = "$lane/return-path-delft-interleaved-plan.json"
$calibration = "$lane/return-path-delft-noise-calibration.json"
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-parity-19103525'
python tooling/programme-algebra/fetch-return-path-delft.py $base $dir --comparison-plan $comparison
python tooling/programme-algebra/audit-return-path.py $base $dir --interleaved $calibration --comparison-plan $comparison
```
