# Test the remaining veto against pooled validation

The [first background challenge](detector-timing-background.md)
showed that tolerating a small early loss improved on strict
repetition. Both the near-tie rule and the simpler pooled
comparison chose the winning local forecast. The
[veto plan](detector-timing-veto-plan.json) looks for the
reverse comparison, where pooled validation chooses local
and the near-tie rule keeps cobalt.

The frozen 4.43-point tolerance and cobalt profile carry
over exactly. The second unshielded background run began
on July 11, 2025 at 17:46:49 local time, after the first
run stopped at 17:42:50. Its settings match cobalt after
normalizing the run identifier and timed stop.
[Uppsala archive](https://doi.org/10.57804/43jy-vw03)

The screen takes six fixed windows of 2.5 million
entries. The earlier run's 350 keV-and-up band had enough
net wide pairs that shorter windows could plausibly
retain support while exposing more variation. Keep
all bands and enforce the same floor of 50 net wide
pairs in each of the four early blocks. Select the
first supported window and ascending energy band where
the pooled choice is local and at least one disjoint loss
exceeds the tolerance, causing the tolerant rule to
choose cobalt. Score only that window's late blocks.

All 24 window–band combinations support the early
comparisons. The pooled rule chooses local in all 24.
The tolerant rule keeps cobalt three times, all in the
band starting at 350 keV. In two of those cases both
disjoint margins are negative and within the tolerance.
The [frozen screen](detector-timing-veto-screen.json)
keeps them and selects the sixth window, starting at
entry 14,500,000, under the prespecified large-loss
criterion. Its early block counts are 84.00, 67.75,
84.75 and 61.50 net wide pairs. Its disjoint margins are
−12.84 and +3.66 points, and its pooled margin is +3.52
points. Positive margins favor local.

| Held block | Net wide pairs | Pooled rule, local error | Tolerant rule, cobalt error |
| --- | ---: | ---: | ---: |
| 40–60% | 127.75 | 11.17 points | 22.28 points |
| 60–80% | 155.50 | 11.33 points | 14.48 points |
| 80–100% | 167.25 | 8.69 points | 14.95 points |
| **Median** | | **11.17 points** | **14.95 points** |

The pooled rule improves each held block and cuts the
median by 3.78 points. The
[score receipt](detector-timing-veto-result.json)
contains this selected comparison. The other five
windows' late blocks stay unpaired. This is a held
reversal in an acquisition chosen for a specific early
disagreement. It establishes a failure case for the
remaining veto at the frozen tolerance.

The disjoint trials each estimate a local profile from
10% of a window. The single comparison fits on 20%, and
the final local forecast pools 40%. To see whether the
veto responds to real temporal changes or to noisier
shorter fits, compare validation procedures with a
matched fit count. Freeze the procedures on early
blocks and score a new acquisition where they disagree.

The [matched-fit challenge](detector-timing-matched-fit.md)
uses the same fit as the pooled rule on a third acquisition.

The [pulse receipt](detector-timing-veto-pulses.json)
records both the full array hashes and the compact
cache hashes. It pins the prior tolerance directly.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$up = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-veto-plan.json"
$pulses = "$lane/detector-timing-veto-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$prefix = "$($design.archivePrefix)/background_2"
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $up 'unshielded2-settings.xml')
curl.exe --fail --location "$prefix/background_2_info.txt" --output (Join-Path $up 'unshielded2-info.txt')
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan
python -B "$tools/air_filter_timing.py" $pulses $up
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses --score "$lane/detector-timing-veto-screen.json"
```
