# Test a local timing profile with frozen centers

The [band-center test](detector-timing-uppsala-centers.md) left a
9.21 percentage point europium forecast error at ±50 ns. The
[profile plan](detector-timing-uppsala-profile-plan.json) holds the
cobalt centers, energy bands, time shifts and wide reference fixed.
It compares two forecasts for the late 60% of each target run.
Both estimate band weights from wide counts in the first 40%.
One transfers the centered cobalt retentions. The other also
counts early target pairs at each narrow width and uses its own
retentions. Both use the intersection of cobalt support and
bands with at least 12 early target net wide pairs. All four
bands qualify on both targets. Holmium-166m was previously
unscored. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

| Run | Half width | Late retention | Cobalt forecast | Early target forecast |
| --- | ---: | ---: | ---: | ---: |
| Europium-152 | 10 ns | 14.90% | 9.65% | 13.57% |
| Europium-152 | 50 ns | 48.21% | 57.42% | 45.64% |
| Europium-152 | 100 ns | 75.01% | 84.15% | 72.87% |
| Europium-152 | 200 ns | 97.57% | 96.48% | 96.08% |
| Holmium-166m | 10 ns | 16.99% | 12.18% | 17.64% |
| Holmium-166m | 50 ns | 58.73% | 58.16% | 59.44% |
| Holmium-166m | 100 ns | 84.95% | 84.30% | 85.28% |
| Holmium-166m | 200 ns | 99.12% | 96.19% | 100.61% |

The early profile reduces the europium ±50 ns error from 9.21
to 2.57 points. It increases the holmium error from 0.57 to
0.71 points at that width, and reduces it from 4.80 to 0.65
points at ±10 ns. The [receipt](detector-timing-uppsala-profile-result.json)
includes ±400 ns and all of the shifted controls. Subtracting
the controls can yield estimated retention above 100%.

As a diagnostic after scoring, substituting the observed late
mixture changes the europium ±50 ns cobalt forecast from
57.42% to 57.35%. Within that late mixture the 0–50 keV band
alone has 479 fewer net prompt pairs inside ±50 ns than the
cobalt profile predicts, out of 2,970 net wide pairs in that
band. The other bands offset part of the deficit. On holmium
the same low-energy band has 51 fewer net pairs than predicted.
The other three bands together have 57 more. A close total on
holmium at ±50 ns therefore hides differences in the band profiles.
Both runs exceed the cobalt forecast at ±10 ns and fall below it
in the lowest energy band at ±50 ns.

Keep early target profiling as a candidate when early
narrow-gate counts are available. Record the gate width and
within-band errors along with total error. This experiment
establishes a forecast improvement on europium and a limit on
generalizing that improvement to holmium at the same gate.
Symmetric cumulative counts leave residual miscentering
confounded with spread, tails, drift and sampling noise. The
next discriminating test is to estimate signed residual
profiles on independent time blocks and ask whether a
translation alone predicts the late signed counts within
each band. The second half of cobalt supplies only 36 net
wide pairs in the lowest band, so its sampling variability is
material to that test.

The [signed profile replay](detector-timing-uppsala-signed.md)
tests the translation against three later blocks per source.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-detector-timing.py'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
# Save the holmium file named in additionalFiles as ho166m.root.
python -B $runner "$lane/detector-timing-uppsala-inclusive-plan.json" $dir --local-profile "$lane/detector-timing-uppsala-profile-plan.json"
```
