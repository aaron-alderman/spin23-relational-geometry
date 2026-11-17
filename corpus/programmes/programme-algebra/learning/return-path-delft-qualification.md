# Narrow reuse by the held forecast error

The [qualification plan](return-path-delft-qualification-plan.json)
fixed repeat 9, the decoder from repeat 0, and the [prior
forecasts](return-routes-replay.json) before the reserved trace
was fetched and scored. Earlier plans cover repeats 0 through 8
at the same setting. The rule checks each observable and starting
label separately. All four grids must be within **one percentage
point** of the newly observed frequency on the 50-step window.
The cutoff is a task tolerance selected after the earlier
experiments and before seeing repeat 9.

| Observable | Starting label | Worst absolute error | Within tolerance on every grid |
| --- | --- | ---: | --- |
| Changed endpoint | Lower | 1.207 pp | No |
| First observed departure | Lower | 3.896 pp | No |
| Changed endpoint | Higher | 0.013 pp | Yes |
| First observed departure | Higher | 3.740 pp | No |

For the higher start, the endpoint forecast was **18.9729%**
against **18.9860%** observed. The full-grid sampled departure
forecast was within tolerance for that start, but the coarser
grids failed. The [scoring receipt](return-path-delft-qualification-result.json)
records all comparisons, trace and plan hashes, grid sizes, and
window denominators. The grids share the same windows. They do
not constitute four independent tests.

The facts-only planner can use this record when
`facts.requireHeldQualification` is `true`. It checks the
calibration values, starting label, observable, window and
stride before consulting the numeric cache. With this option,
the higher-start endpoint executes on the four tested grids.
The failed held forecasts and out-of-scope windows receive an
explicit refusal. Ordinary requests still return conditional
model forecasts.

The qualification is limited to the decoded observable and
matched setting in one reserved acquisition. It supplies no
coverage guarantee for future acquisitions. All ten recorded
repeats at this setting have now been used. The [neighboring-setting
test](return-path-delft-row75.md) applies the same procedure
with a new decoder, calibration, and held traces.

With the public trace available in the local trace directory,
rerun the frozen score using Python with NumPy.

```powershell
python -B tooling/programme-algebra/qualify-delft-return-routes.py $traceDir
```
