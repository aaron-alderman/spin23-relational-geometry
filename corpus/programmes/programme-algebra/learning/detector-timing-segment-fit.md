# Resample whole pulse segments at the short fit's net count

The [histogram thinning replay](detector-timing-thinned-fit.md)
sampled prompt and shifted pairs separately. The
[segment plan](detector-timing-segment-fit-plan.json)
replays the same two selected windows from background
runs 3 and 4 and reconstructs pairs inside contiguous
pulse segments. Each retained segment carries all its
prompt and shifted pairs together. This preserves links
between pairs that share a pulse within that segment.
Pairing across a segment boundary is excluded. The
reconstruction removed zero prompt or shifted pairs
at those boundaries in either selected band at either
scale. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

Split each of the first two fit blocks into eight or
sixteen time segments. Retain the same number of whole
segments from each block and condition on the combined
net count matching the short fit exactly. This keeps
both times represented, with variation in their relative
net counts. Compare every draw against the unchanged
fourth early block. The earlier selected windows and
validation blocks were already examined, so the result
is a retrospective diagnostic.

| Run | Short fit error | Resampling method | Median local error | Reaches short fit error |
| --- | ---: | --- | ---: | ---: |
| Background 3 | 21.00 points | Pair histogram | 12.38 points | 3 / 2,048 draws |
| Background 3 | 21.00 points | Eight segments per fit block | 12.51 points | 0 / 30 exact combinations |
| Background 3 | 21.00 points | Sixteen segments per fit block | 12.69 points | 8 / 2,048 draws |
| Background 4 | 18.12 points | Pair histogram | 12.88 points | 63 / 2,048 draws |
| Background 4 | 18.12 points | Eight segments per fit block | 13.89 points | 1 / 8 exact combinations |
| Background 4 | 18.12 points | Sixteen segments per fit block | 12.73 points | 95 / 2,048 draws |

All profiles match 88 net pairs in run 3 and 87 in run
4. The coarser segment counts admit only 30 and eight
combinations, so the [result receipt](detector-timing-segment-fit-result.json)
also enumerates their tail counts exactly. The finer
counts admit about 1.1 and 3.2 million combinations,
respectively. Their table entries use seeded uniform draws.
The median column uses the 2,048 draws for each method.

Run 3's short-fit error stays rare under both segment
choices. For run 4, preserving segment structure raises
the exceedance frequency from 3.1% under histogram thinning
to 4.6% with sixteen segments or 12.5% with eight.
That sensitivity belongs with the diagnostic. The
numbers describe alternative fits drawn from recorded
early blocks with fixed net support. They supply no
population confidence or causal estimate of drift.
No late blocks were read for pairing in this replay.

Keep the diagnostic as a way to test whether a short-fit
veto is robust to the unit of resampling. The next test
should specify segment duration and fit support before
inspecting a new case, then check whether a frozen
diagnostic choice differs from the pooled early choice.
Only such a disagreement can test whether the extra work
improves the forecast.

The [segment-routing challenge](detector-timing-segment-route.md)
fixes the duration and makes that comparison on the fifth run.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$up = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-segment-fit-plan.json"
python -B "$tools/air_filter_timing.py" "$lane/detector-timing-matched-fit-pulses.json" $up
python -B "$tools/air_filter_timing.py" "$lane/detector-timing-thinned-fit-pulses.json" $up
python -B "$tools/audit-detector-timing.py" $base $up --segment-fit $plan
```
