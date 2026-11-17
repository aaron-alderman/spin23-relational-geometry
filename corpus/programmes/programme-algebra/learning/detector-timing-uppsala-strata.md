# Test whether pulse-energy mixtures explain timing transfer

The [inclusive timing test](detector-timing-uppsala.md) transferred
a cobalt gate to sodium within the plan's tolerance. A pooled
retention can shift because a new source supplies a different mix
of pulses or because the timing changes within the recorded bands.
This test keeps the center at +10 ns and assigns each pair to the
lower of its two pulse energies, using the frozen linear ADC
calibration. Below the caesium reference these bands rely on
extrapolation. They classify recorded pulses and carry no photon
identity. [Uppsala acquisition archive](https://doi.org/10.57804/43jy-vw03)

The [first design](detector-timing-uppsala-strata-plan.json) sets
band starts at 0, 50, 150, 350, and 750 keV. In each band, the
background-subtracted narrow count divided by the corresponding wide
count estimates cobalt retention. The first 40% of a target run
supplies wide-count weights. The final 60% supplies the outcomes.
The forecast multiplies the cobalt band retentions by the early
target weights and sums them. Its comparator uses the cobalt weights.

The [first score](detector-timing-uppsala-strata-result.json) stops
before computing the late scores. Above 750 keV, sodium had zero
prompt pairs against 1.75 average shifted pairs, while bismuth
had three against six. A negative net estimate cannot be a mixture
weight. I merged that band into the adjacent 350–750 keV band
for both runs, using only the early wide-count screen. The
[revised plan](detector-timing-uppsala-pooled-strata-plan.json)
pins the refusal and applies the merge to cobalt too. All four
revised bands meet the original 30-net-pair cobalt floor. The
50 ns cobalt retentions range from 47.46% to 64.32% across them.

| Late acquisition | Gate half-width | Observed retention | Pooled cobalt forecast | Mixture forecast |
| --- | ---: | ---: | ---: | ---: |
| Sodium-22 | 50 ns | 63.86% | 55.24% | 55.69% |
| Bismuth-207 | 50 ns | 55.92% | 55.24% | 54.83% |
| Sodium-22 | 100 ns | 86.55% | 77.87% | 81.69% |
| Bismuth-207 | 100 ns | 80.78% | 77.87% | 78.92% |

The [revised score](detector-timing-uppsala-pooled-strata-result.json)
reduces the 100 ns forecast error from 8.68 to 4.86 percentage points
for sodium and from 2.91 to 1.86 points for the newly scored bismuth
run. At the primary 50 ns gate the sodium error changes only from
8.62 to 8.17 points, and the bismuth error grows from 0.68 to
1.10 points. These runs share an apparatus, and the five nested
gate widths share their underlying pairs.

After scoring, the runner decomposes the residual into the change
from early to late band weights and the difference left within the
bands. At 50 ns for sodium, the early-to-late mix accounts for just
0.04 percentage points and the within-band term accounts for 8.12
points. Reweighting by the later mix would leave the discrepancy.
The conditional estimator is reusable when the bands have support
and retentions that transfer. Background subtraction and coarse
banding leave the physical cause of the within-band term unresolved.

The next test should estimate a channel-delay center within pulse
bands using calibration alone, compare that with the common center,
and score it on an additional source. A full-energy transfer still
requires enough independently documented line pairs.

The [band-center follow-up](detector-timing-uppsala-centers.md)
measures both the observed gate gain and the forecast error on
an additional europium acquisition.

```powershell
# Use low-energy calibration files from the earlier test and download
# the archived bismuth list-mode file from additionalFiles as bi207.root.
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-detector-timing.py'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
foreach ($variant in @('strata', 'pooled-strata')) {
  $comparison = "$lane/detector-timing-uppsala-$variant-plan.json"
  $fit = "$lane/detector-timing-uppsala-$variant-calibration.json"
  python -B $runner $base $dir --strata $comparison
  python -B $runner $base $dir --strata $comparison --score $fit
}
```
