# Require a timing choice to repeat in disjoint early blocks

The [Uppsala routing replay](detector-timing-routing.md)
found that the outcome could change between held blocks,
especially when the early validation losses were close.
The [repeat-routing plan](detector-timing-repeat-route-plan.json)
carries the procedure to a new acquisition of the UV2404
field filter. It keeps channels 1 and 2, the qualified
50–150 keV band, and the previously saved reference. The
run starts on February 7, 2024 at 09:26 local time, after
the earlier field-filter run ends. Their settings files
differ only in the run identifier. [Air-filter archive](https://doi.org/10.57804/0tjh-3b49)

The single comparison pools adjacent blocks into a 20%
fit segment and a 20% validation segment. The repeated
comparison runs two disjoint fit-validation trials. Each
uses consecutive 10% blocks. The repeated rule chooses the
local profile if all four early blocks have at least 50
net wide pairs and both trials favor local. When scored,
both rules use the same local forecast made from pooling
the four early count records. Both score the same three
later 20% blocks with the same late count floor.

| Early comparison | Fit and validation net wide pairs | Reference error | Local error |
| --- | ---: | ---: | ---: |
| 0–20% fits 20–40% | 167.50 / 179.25 | 6.10 | 17.73 |
| 0–10% fits 10–20% | 90.50 / 77.00 | 23.74 | 31.75 |
| 20–30% fits 30–40% | 87.50 / 91.75 | 13.08 | 21.75 |

All early blocks clear the floor. Both disjoint trials
favor the reference, as does the pooled comparison.
The [frozen receipt](detector-timing-repeat-route-frozen.json)
keeps all three comparisons. It is written before pairing
any later block.

| Held block | Net wide pairs | Reference error | Pooled local error |
| --- | ---: | ---: | ---: |
| 40–60% | 167.00 | 11.24 | 13.71 |
| 60–80% | 173.25 | 16.02 | 12.86 |
| 80–100% | 162.25 | 13.42 | 13.80 |
| **Median error, points** | | **13.42** | 13.71 |

Both rules choose the reference and therefore produce the
same held errors. The reference wins two of three blocks.
Its advantage in median held error is 0.30 points, much
smaller than the early validation margins. These are
discrepancies between normalized, background-subtracted
bin counts. The [score receipt](detector-timing-repeat-route-result.json)
keeps the prompt and delayed-control counts.

The repeated comparisons corroborate the direction of the
early choice on this acquisition. Their agreement yields
no change in the forecast. To test whether requiring
repetition improves routing, select another acquisition
where the two early rules disagree using early data alone.
Then freeze both choices and compare them on the same
unseen late blocks. Keep screened cases where both select
the same forecast, so the selection's scope stays visible.

The [disagreement screen](detector-timing-disagreement.md)
retains those cases and tests a retrospective disagreement.

Use the metadata cache from the [first field-filter replay](detector-timing-field-filter.md).
Fetch the new run and use its pinned pulse receipt.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2024-172'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-repeat-route-plan.json"
$target = "$lane/detector-timing-repeat-route-target.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$run = $design.target.id
$prefix = "$($design.archivePrefix)/$run"
curl.exe --fail --location "$prefix/run.info" --output (Join-Path $dir "$run.info")
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $dir "$run.xml")
python -B "$tools/air_filter_timing.py" $target $dir
python -B "$tools/audit-detector-timing.py" $base $dir --repeat-air-filter-route $plan --target-pulses $target
python -B "$tools/audit-detector-timing.py" $base $dir --repeat-air-filter-route $plan --target-pulses $target --score "$lane/detector-timing-repeat-route-frozen.json"
```
