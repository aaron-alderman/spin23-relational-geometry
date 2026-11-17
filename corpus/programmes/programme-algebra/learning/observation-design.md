# Use an unresolved difference to choose the next observation

The [Delft edge replay](return-path-delft-shape.md) and the
[detector proposal audit](proposal-audit.md) expose the same
constraint. Two candidate operations can predict the same vector
of observations and differ on the outcome the investigation needs.
The new audit reads both prior receipts and reconstructs those
vectors. It keeps candidates in the same class only when their
predictions agree exactly on the existing observation basis.

For a new observation, compute the range of values compatible with
each frozen candidate and the declared measurement budget. A
positive gap between all pairs means that any value inside one
range identifies at most one candidate. A value outside all the
ranges can reject them all. The audit records ranges and signed
gaps without merging near-equal predictions into exact classes.
[Design and source pins](observation-design-plan.json)
[Generated design receipt](observation-design-result.json)

## Time the edge where the predictions separate

The same even-offset edge values support widths 1 and 3. Under
the two calibrated shape candidates, the aligned 11.38 μs pulse
recovery on Delft repeat 8 differs by 7.74 percentage points.
The audit tests possible additional offsets against four timing
budgets. One native sample before or after the onset-bracket
center gives the most separation. At the positive offset the
models predict 1 and 5/6 of a state gap with zero timing error.

| Timing uncertainty, in native sample periods | Largest equal amplitude error allowing separation |
| --- | ---: |
| 0 | Strictly below 8.33% of a state gap |
| ±0.125 | Strictly below 4.17% of a state gap |
| ±0.25 | The timing ranges touch |
| ±0.5 | The timing ranges overlap |

These are worst-case design margins within the stated shape
family and uniform onset bracket. One eighth of a native sample
period is about 0.284 μs. The existing odd-offset samples were used
to align the edges. Reusing those samples as held-out measurements
would change the evidence. The timed observation remains a design
for a separate readout or calibration.

## Choose a detector count before scoring the saved labels

The BART and LORAX fit receipts agree exactly for the product
and the acceptance-only shortcut. The audit reads the separate
frozen count forecasts for Bauer and Wu. For positive prediction
p and observed count y, the existing tolerance requires
`abs(p/y - 1) ≤ 0.15`. The compatible y interval is therefore
`[p/1.15, p/0.85]`. For two positive forecast counts a and b,
the largest common relative tolerance before those intervals
touch is `abs(a - b)/(a + b)`.

All three Bauer geometries tie on that scale-free margin at
about 29.64%. Their count differences vary with exposure and
acceptance, but the forecast ratio carries the same distinction.
Within that evidence family the receipt selects the first listed
geometry, 20 cm. Wu's grid case has a margin of about 28.86%.
One probe from each family suffices to distinguish the two
candidate count normalizations at the declared 15% tolerance.

The scoring command verifies the frozen design against the
prediction receipts before it reads the separate labels. It
selects the product on the published 19,219.6-count Bauer row and
the 15,380-count Wu row. This reduces the retrospective scoring
set from four rows to two without dropping either evidence
family. The selection replays already archived experiments and
does not measure a new outcome or validate nanosecond timing.
[Scoring receipt](observation-design-score.json)

The next discriminating measurement must supply a new observation
under its own calibration. For the edge case, the design receipt
specifies a time offset and an error budget to test. For detector
counts, a separately held acquisition can pair the same
preselection with the existing outcome-custody protocol.

The [Uppsala follow-up](detector-timing-uppsala.md) screens a new
archive for absolute counts and tests a separate timestamp-gate
transfer using its list-mode acquisitions.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-observation-design.py'
$plan = "$lane/observation-design-plan.json"
python -B $runner $plan
python -B $runner $plan --score "$lane/observation-design-result.json" "$lane/observation-design-labels.json"
```
