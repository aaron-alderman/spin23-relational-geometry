# Plan a run from a registered event

The BART and LORAX replay predicted probabilities for one prepared nucleus.
That still leaves a planning question. Even when the expected count of a run
is one, there can be a substantial chance of recording zero.

The [saved run operation](detector-run-learned-operation.json) retains that
boundary. It uses the probability of zero true registrations under an explicit
independent, identical trial model to find the smallest integer run size.
The result returns the probability at that size and at one trial fewer.
This is a conditional nominal design using the supplied per-trial inputs.
Shared calibration uncertainty, correlated preparations, dead time and false
counts would require a different plan.

For a fixed trial count, the [budget screening replay](fixed-trial-budget.md)
uses a probability ceiling to reject some budgets before calling the planner.

```powershell
$runner = 'tooling/programme-algebra/compose-trial-budget.mjs'
node $runner record-detector-run
node $runner plan $factsFile
node $runner plan $factsFile --omit-trials
```

Supply the same detector and source facts described in the [learning lane](README.md).
Use `targetType: "minimum-trials-for-one-true-registration"` and add
`facts.trials` with `type: "independent-identical-bernoulli"` and fractional
`targetProbability` between zero and one. Do not supply plans or routes.
The planner also accepts `--omit-helium`, `--omit-calcium`, and
`--omit-detector`. The last stage may only use a probability of a true
registration per known preparation.
