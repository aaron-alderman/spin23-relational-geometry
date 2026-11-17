# Test whether a delay translation explains the timing profiles

The [local-profile replay](detector-timing-uppsala-profiles.md)
found that differences between energy bands can cancel in a
total retention score. The [signed profile plan](detector-timing-uppsala-signed-plan.json)
tests whether translating each cobalt band is enough to
predict later target data. It builds signed delay templates
from the second half of cobalt, preserves the frozen band
centers and wide reference, and subtracts the same four shifted
controls bin by bin. Each candidate shift moves the cobalt
template before binning. The two outer bins absorb the tails
so every shift uses the same wide count as its denominator.
[Uppsala archive](https://doi.org/10.57804/43jy-vw03)

On the first 40% of each target fit one shift per energy band
on a 10 ns grid from −80 to +80 ns. Compare its forecast with
the original cobalt and early target profiles on three
disjoint 20% late time blocks. The score is half the summed
absolute difference of normalized net bin counts. Because
the controls can leave negative bins, this is a discrepancy
in net shares. It has no probability interpretation.

| Source | Median unchanged cobalt error | Median fitted translation error | Median early target profile error |
| --- | ---: | ---: | ---: |
| Europium-152 | 21.91 points | 17.29 points | 10.27 points |
| Holmium-166m | 22.53 points | 23.28 points | 11.37 points |

Each row gives the median of nine equally weighted band and
block scores. Both runs met the target floors of 100 early and
50 late net wide pairs for each of the three lowest bands.
The band starting at 350 keV failed the early floor on both.
Its raw counts remain in the [score receipt](detector-timing-uppsala-signed-result.json).

The fit chooses a +10 ns template shift in the 0–50 keV band
on both targets. It improves the error in all six late blocks
and is also the best shift on the scanned grid when each late
block is fit separately. Europium still has errors of
11.10–12.39 points in that band after translation, compared with
3.93–6.14 points from its own early profile. In holmium's
50–150 keV band, the early fit chooses +20 ns and worsens all
three late scores. The best late fits there are −20, 0, and
−20 ns. Across all bands, the early target profile beats
even the best-on-late scanned cobalt translation in eight of
nine scores per source.

Retain a translation as a candidate when a signed early fit
predicts a repeatable improvement on held blocks. Also save
the best-on-late grid result as a diagnostic for whether
re-estimating the shift could have closed the gap. Here that
diagnostic still leaves a discrepancy, and the same late-cobalt
reference supplies only 35.75 net wide pairs in the lowest
energy band. The result bounds the usefulness of this fitted
template. It leaves the contribution of reference noise and
the physical cause open. Next, estimate the variation between
separate cobalt reference blocks and test the same procedure
with a higher-count calibration. Both targets and all blocks
here share an instrument and evidence family.

The [reference sensitivity replay](detector-timing-uppsala-reference.md)
checks both cobalt halves and tests whether pooling them changes the result.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-detector-timing.py'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
python -B $runner "$lane/detector-timing-uppsala-inclusive-plan.json" $dir --signed-profile "$lane/detector-timing-uppsala-signed-plan.json"
```
