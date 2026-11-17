# Size a run across shared calibration uncertainty

The [saved operation](run-budget-learned-operation.json) records what the
nominal run budget left open. A calibration is shared by the entire run.
For each fixed calibration, the probability of zero observations follows
the same independent-trial law. We can use a declared box to find the
minimum run size that meets the target everywhere inside that box.

In the existing free-decay and absorbing-exit model, the probability of
success decreases as the lifetime grows, detector acceptance falls, the
selected exit rate falls, or any competing rate grows. The least favorable
corner therefore needs one run-budget replay. A separate central replay
provides the nominal comparison. The method does not sample a new
calibration for each trial.

The [fixed-budget replay](calibration-box-budget-screen.md) uses the
admitted corner to rule out some trial counts before exact run planning.

```powershell
$runner = 'tooling/programme-algebra/compose-robust-budget.mjs'
node $runner record-run-budget
node $runner plan $factsFile
node $runner plan $factsFile --omit-envelope
```

Supply the [run-planning facts](run-planning.md), set
`targetType: "minimum-trials-across-calibration-box"`, and add a
`facts.calibrationBox` object with these fields:

- `type: "shared-calibration-endpoint-box"`
- `meanLifetimeSeconds` and `detectorProbability`: two-element arrays with
  lower and upper endpoints in the same units as the nominal inputs
- `relativeRates`: the complete branch map with two-element endpoint arrays
  in place of nominal rates
- `source`: the references and rule used to construct this box

Keep all nominal facts and the target probability. The ranges must contain
the nominal inputs. Common factors in the raw data may link channel weights.
Document whether the least favorable corner is physically attainable or
conservative over a larger box. Using reported uncertainty endpoints as
bounds is a sensitivity convention. It supplies no statistical coverage
for the box. The earlier four omission controls remain available.
