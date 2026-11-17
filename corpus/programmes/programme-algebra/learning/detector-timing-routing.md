# Choose between a frozen and a local timing profile

The [reuse challenge](detector-timing-reuse.md) found a
large loss from choosing the reference unconditionally on
sodium. The [routing plan](detector-timing-routing-plan.json)
tests whether a target can make that choice from its own
early data. In each energy band, the first 20% supplies a
local profile and the next 20% validates it against the
unchanged cobalt profile. Each early block needs at least
50 net wide pairs. A strictly lower validation error
selects the local profile, whose final forecast pools
the two early blocks. A tie or sparse early block keeps
the reference. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

The [frozen choices](detector-timing-routing-frozen.json)
record the early counts and forecasts. At that stage the
runner uses the whole file for its hash and time boundaries
and pairs only the early pulses. Scoring verifies those
choices before pairing the later blocks. The existing
50-net-pair floor still applies to each scored late block.
Sodium and bismuth are retrospective comparisons.
Caesium had supplied an energy calibration line, and
this is its first signed timing-profile comparison.

| Target | Late band-blocks scoring both forecasts | Median reference error | Median local error | Median chosen error |
| --- | ---: | ---: | ---: | ---: |
| Sodium-22 | 12 | 17.60 points | 3.98 points | 3.98 points |
| Bismuth-207 | 6 | 22.58 points | 11.10 points | 11.10 points |
| Caesium-137 | 3 | 23.16 points | 27.47 points | 23.16 points |

Sodium chooses local in every band and wins every late
comparison. Bismuth chooses local in the 50–150 keV band
and keeps the reference in the 150–350 keV band. The latter
choice wins the first late block and loses the next two.
The stricter early split also withholds adaptation in the
highest band, which has 107.5 net wide pairs in total but
only 47.5 in the fit block. That band can still use the
reference on all three late blocks.

On caesium, only the 150–350 keV band qualifies for the
late comparison. Its two early counts are 60.5 and 61.
Validation gives 23.32 points of error for cobalt and
24.54 for local, so the rule keeps cobalt. The held
reference errors are 18.87, 34.79 and 23.16 points.
The local errors are 18.52, 27.47 and 30.60. The chosen
reference has the lower median despite losing two blocks.
The [score receipt](detector-timing-routing-result.json)
keeps all block counts, errors and refusals.

Keep early validation as a candidate way to choose a
profile, with the per-block results attached. Its weaker
bismuth decisions and mixed caesium wins show that a small
early margin can be unstable. The next discriminator is
to estimate the repeatability of that validation margin
across independent early blocks and challenge a frozen
decision rule on an acquisition outside this apparatus.

The [disjoint validation replay](detector-timing-repeat-route.md)
tests both rules on a separately started air-filter run.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-detector-timing.py'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-routing-plan.json"
python -B $runner $base $dir --route-profile $plan
python -B $runner $base $dir --route-profile $plan --score "$lane/detector-timing-routing-frozen.json"
```
