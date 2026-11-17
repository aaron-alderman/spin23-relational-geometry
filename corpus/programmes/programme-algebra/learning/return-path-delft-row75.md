# Test the qualification procedure at a neighboring setting

The [earlier qualification](return-path-delft-qualification.md)
held for the higher-start endpoint at 551.5 mV. The
[transfer plan](return-path-delft-row75-plan.json) selects the next
plunger row, 551.75 mV, from the acquisition metadata. This is a
distinct sequence of acquisitions on the same device. Its
NetCDF and processing notebook hashes match the earlier mapping.
No forecast parameters or pass decisions came from the 551.5 mV
series.

The new calibration uses repeat 0 alone. Its I/Q centroid
separation is 5.69 pooled standard deviations, above the
predeclared minimum of five. The [frozen record](return-path-delft-row75-frozen.json)
keeps the decoder, transition matrix, and all 16 forecasts from
the facts-only planner. The scorer then decodes repeats 1 and 2.
A forecast qualifies only if it stays within one percentage
point on all four grids in both held repeats.

| Observable | Starting label | Worst error | Qualified |
| --- | --- | ---: | --- |
| Changed endpoint | Lower | 4.754 pp | No |
| First observed departure | Lower | 3.062 pp | No |
| Changed endpoint | Higher | 1.368 pp | No |
| First observed departure | Higher | 5.178 pp | No |

The higher-start endpoint was within tolerance on repeat 1
and missed it on repeat 2. The lower-start endpoint did the
reverse. A single held repeat can therefore qualify an endpoint
that exceeds the same tolerance on the next matched repeat.
The higher-start sampled-departure residual also changes sign
with the grid for repeat 2. One overall offset would preserve
an error for part of that comparison. [Held scoring receipt](return-path-delft-row75-qualification-result.json)

The [planner's qualification registry](sampled-return-held-qualification.json)
keeps the two settings distinct. A request requiring held
qualification still accepts the higher-start endpoint at
551.5 mV and refuses the corresponding forecast at 551.75 mV
on the recorded evidence. A setting with no report receives a
separate scope refusal. The 551.75 mV conditional forecast
remains available for questions that request the model result.

The [blocked calibration test](return-path-delft-row75-blocked.md)
compares whole-repeat, matched-quarter, and local-prefix
calibrations on three other acquisitions at this setting.

```powershell
$runner = 'tooling/programme-algebra/qualify-delft-return-routes.py'
python -B $runner $traceDir --design return-path-delft-row75-plan.json
python -B $runner $traceDir --design return-path-delft-row75-plan.json --frozen return-path-delft-row75-frozen.json
```
