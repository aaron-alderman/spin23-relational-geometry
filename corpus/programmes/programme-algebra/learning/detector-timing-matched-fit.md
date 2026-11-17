# Test the timing veto with identical fits

The [second background challenge](detector-timing-veto.md)
found a case where a short-fit veto rejected the local
forecast that won later. The
[matched-fit plan](detector-timing-matched-fit-plan.json)
carries the same cobalt reference and 4.43-point tolerance
to the third unshielded background run. It began on
July 14, 2025 at 10:31:23 local time, after the second run
stopped at 10:27:25. The settings match after normalizing
the run identifier and timed stop. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

The pooled rule fits on the first two early 10% blocks
and validates on the next two blocks together. The
matched-fit veto uses exactly that fit and validates
separately on the same third and fourth blocks. The
legacy veto instead fits on the first block for the second
and on the third for the fourth. Every local forecast used
for late scoring pools all four early count blocks.

In the previous selected case, the stored early counts
give the shared fit 151.75 net pairs, compared with 84
and 84.75 for the two short fits. The legacy margins were
−12.84 and +3.66 points. The shared-fit margins are
+1.16 and +3.79 points, so the matched-fit veto would
leave the pooled choice in place. This is a retrospective
diagnostic. The new screen predeclares eight pulse windows
and selects the first fully supported pooled-local versus
legacy-veto disagreement with a loss beyond tolerance.
The matched-fit choice is frozen along with the other two
choices before the selected late blocks are paired.

All 32 window–band combinations pass the early support
check. The [frozen screen](detector-timing-matched-fit-screen.json)
selects the 350 keV-and-up band of the window beginning
at entry 6,400,000. Its early blocks have 90.5, 88.5,
88 and 81.75 net wide pairs. The pooled rule favors
local by 7.72 points. The legacy disjoint margins are
−2.91 and −6.55 points, enough to keep cobalt under its
tolerance rule. When both validation trials use the
same 179-net-pair fit, the margins become +3.62 and
+5.10 points, and the matched-fit rule chooses local.

The fourth early block is a common validation set. The
legacy local profile, fit on the third block, has 21.00
points of error there. The local profile fit on the
first two blocks has 9.35 points. The cobalt error is
14.45 points in both comparisons.

| Held block | Net wide pairs | Legacy veto error | Matched-fit and pooled error |
| --- | ---: | ---: | ---: |
| 40–60% | 152.00 | 19.39 points | 11.09 points |
| 60–80% | 166.50 | 16.36 points | 10.03 points |
| 80–100% | 138.50 | 14.26 points | 5.86 points |
| **Median** | | **16.36 points** | **10.03 points** |

The [held scores](detector-timing-matched-fit-result.json)
confirm the local choice in every block. The pooled and
matched-fit rules choose the same final profile. Matching
the fit removes the legacy veto on this acquisition, and
the comparison holds the fourth validation block fixed.
The fit size and the times supplying the fit both change
relative to the legacy comparison. To separate them,
thin the shared fit to the legacy fit's count support
while preserving its time mixture. Use repeated thinnings
against the same validation blocks and reserve a different
acquisition to test the resulting decision.

The [matched-count thinning challenge](detector-timing-thinned-fit.md)
does that on the fourth background acquisition.

The [pulse receipt](detector-timing-matched-fit-pulses.json)
preserves full and compact hashes and pins the earlier
tolerance. Only the selected window has late pairs.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$tools = 'tooling/programme-algebra'
$up = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$base = "$lane/detector-timing-uppsala-inclusive-plan.json"
$plan = "$lane/detector-timing-matched-fit-plan.json"
$pulses = "$lane/detector-timing-matched-fit-pulses.json"
$design = Get-Content -LiteralPath $plan -Raw | ConvertFrom-Json
$prefix = "$($design.archivePrefix)/background_3"
curl.exe --fail --location "$prefix/settings.xml" --output (Join-Path $up 'unshielded3-settings.xml')
curl.exe --fail --location "$prefix/background_3_info.txt" --output (Join-Path $up 'unshielded3-info.txt')
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan
python -B "$tools/air_filter_timing.py" $pulses $up
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses
python -B "$tools/audit-detector-timing.py" $base $up --background-tie-aware-route $plan --target-pulses $pulses --score "$lane/detector-timing-matched-fit-screen.json"
```
