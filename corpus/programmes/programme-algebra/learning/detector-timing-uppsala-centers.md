# Test whether pulse-energy-specific gate centers transfer

The [mixture test](detector-timing-uppsala-strata.md) left a sodium
timing discrepancy within the pulse-energy bands. This
[comparison](detector-timing-uppsala-center-plan.json) keeps the
four lower-pulse energy bands and asks if separate timing centers
help. It compares the original common +10 ns center with centers
selected on the first half of cobalt. Each offset maximizes the
net ±50 ns pairs inside the band on a grid of 10 ns increments
from −40 to +40 ns. The second half of cobalt estimates retention
under both frozen policies. The same +10 ns wide reference and
shifted controls supply the denominator for both. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

The fitted offsets relative to the common center are 0, +40,
+30, and +20 ns for the bands starting at 0, 50, 150, and 350 keV.
The second offset reaches the search limit and gives no evidence
for a precise maximizing delay beyond that grid. All four bands
meet the 12-net-wide-pair floor in both cobalt halves. The
[calibration receipt](detector-timing-uppsala-center-calibration.json)
records the entire scan and the second-half counts.

The first 40% of each target run gives its wide-pair weights.
The forecasts multiply those weights by the second-half cobalt
band retentions. Both forecasts are compared with their own
observed policy on the same final 60% of the target. Sodium and
bismuth were examined earlier. Europium-152 is the new acquisition.

| Late acquisition, ±50 ns | Common retention observed / predicted | Band-centered retention observed / predicted | Observed gain |
| --- | ---: | ---: | ---: |
| Sodium-22 | 63.86% / 54.45% | 66.34% / 60.73% | 2.48 percentage points |
| Bismuth-207 | 55.92% / 54.16% | 59.47% / 59.63% | 3.54 points |
| Europium-152 | 46.46% / 55.76% | 48.21% / 57.42% | 1.75 points |

The band centers raise the observed ±50 ns retention on all
three acquisitions. Forecast error drops from 9.41 to 5.61
points for sodium and from 1.77 to 0.16 for bismuth. On the new
europium run it stays near nine points, 9.31 with the common
center and 9.21 with the band centers. The ±100 ns forecast
also worsens on europium, from 8.02 to 9.13 points of error.
The [score receipt](detector-timing-uppsala-center-result.json)
keeps all five widths and their prompt and shifted counts.
Background subtraction can put a wide-gate estimate just over
100%. Those values are signed count estimates and are retained
without clipping.

Save the energy-specific center as a candidate gate policy with
its measured retention gain and its separate forecast error.
The three source runs share an instrument, and this test leaves
the full-energy event and the physical origin of delay variation
open. The next test should compare the *shapes* of the residual
delay distributions within bands after a fixed shift, using an
additional acquisition and a sufficiently populated reference.
That can test whether the remaining transfer error stems from
differing widths or tails rather than a different center alone.

The [local-profile test](detector-timing-uppsala-profiles.md)
compares those cumulative timing profiles on europium and a new
holmium acquisition while holding the cobalt centers fixed.

```powershell
# Read the europium ROOT file named in additionalFiles as eu152.root.
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-detector-timing.py'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$comparison = "$lane/detector-timing-uppsala-center-plan.json"
python -B $runner $base $dir --band-centers $comparison
python -B $runner $base $dir --band-centers $comparison --score "$lane/detector-timing-uppsala-center-calibration.json"
```
