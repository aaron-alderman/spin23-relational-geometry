# Check how the cobalt reference affects timing transfer

The [signed delay replay](detector-timing-uppsala-signed.md)
found that a translated second-half cobalt template
frequently missed the target timing profile. The
[reference plan](detector-timing-uppsala-reference-plan.json)
uses the same grid, counts, target blocks and scoring rule
to compare the first cobalt half, second cobalt half and
both halves pooled. Pooling adds counts after pairing
within each half and leaves out pairs that span the cut.
The first half helped choose the frozen band centers.
Both templates and the pool come from the archive's single
cobalt acquisition, which is listed under multiple files.
[Uppsala archive](https://doi.org/10.57804/43jy-vw03)

| Lower pulse energy | Early / late / pooled net wide pairs | Early–late discrepancy at fixed centers | Best scanned translation discrepancy |
| --- | ---: | ---: | ---: |
| 0–50 keV | 25.25 / 35.75 / 61 | 38.18 points | 20.88 points |
| 50–150 keV | 92.25 / 84.75 / 177 | 19.87 points | 18.93 points |
| 150–350 keV | 56.75 / 58.75 / 115.5 | 25.68 points | 21.72 points |
| 350 keV and up | 58 / 41.5 / 99.5 | 31.63 points | 13.95 points |

The discrepancy is half the summed absolute difference of
normalized net bin counts. The cobalt halves differ by
20.88 points in the lowest band even after fitting the best
scanned translation from the early to the late profile.
The discrepancy can reflect count noise, temporal change,
or both.

| Target | Late-half cobalt shift | Pooled cobalt shift | Early target profile |
| --- | ---: | ---: | ---: |
| Europium-152 | 17.29 points | 18.55 points | 10.27 points |
| Holmium-166m | 23.28 points | 17.51 points | 11.37 points |

The table reports median error across the same nine
band-and-block comparisons per target, with equal weight
per comparison. Pooling improves the holmium median and
worsens the europium median. It also worsens the holmium
lowest-band error in all three blocks. The local early
profile beats even a pooled shift chosen on the late
block in 15 of 18 comparisons. The low-band shift estimated
from holmium's early data changes from −30 ns with the
early cobalt half to +10 ns with the late and pooled
templates. The [receipt](detector-timing-uppsala-reference-result.json)
keeps those fits, per-block scores and raw unshifted counts.

Before reusing a shift fitted against a single reference,
replay it with another reference segment and retain the
range of outcomes. Track low-count bands separately when a
pooled template improves an overall score.
The next discriminating test needs two independently acquired,
higher-count cobalt profiles under the same geometry and
readout. Use their agreement to assess reference stability
before scoring the same held target blocks.

The [air-filter archive screen](detector-timing-air-filter.md)
tests the count-support check on separately started runs from
a different apparatus. It leaves the cobalt repeat open.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-detector-timing.py'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
python -B $runner "$lane/detector-timing-uppsala-inclusive-plan.json" $dir --reference-sensitivity "$lane/detector-timing-uppsala-reference-plan.json"
```
