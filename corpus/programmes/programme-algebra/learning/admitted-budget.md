# Check admissibility before evaluating a budget

The [dependency replay](corner-dependencies.md) found that cases can
share a calculation after each case has passed its own checks. The
original planner evaluated probabilities during those checks. The
new facts-only runner loads the five learned operations, verifies
their evidence hashes and matching input and output types, and
checks the case before evaluating its nominal and corner budgets.
The checks cover the survival regime, complete absorbing exit rates,
matched detector calibration, independent preparation model, and
calibration interval endpoints.

An admitted case can reuse the exit probability for a matching
window-to-lifetime ratio and the branch share for a matching selected
exit and ordered rate table. A matching detector acceptance also
allows reuse of the registration probability and its log miss.
The runner keeps the case's source and its own nominal and corner
inputs. The cache lives for one invocation. Budget inversion still
uses the requested target for each case.

The [replay](admitted-budget-replay.json) checks eleven probes using
the archived BART and LORAX cases and controlled BART perturbations.
The new planner matched the existing planner on all results tested,
including probabilities and the passing and failing chances at the
budget boundary. It rejected incompatible acquisition, dependent
preparations, beam-on survival, an unknown branch, and a reversed
calibration range before evaluating probabilities. A box allowing
zero detector acceptance passed the input checks and returned an
unattainable target after evaluating its corner.

| Evaluation | Fresh per admitted case | Reuse within stream |
| --- | ---: | ---: |
| Exit probability | 12 | 4 |
| Branch fraction | 12 | 3 |
| Registration probability and log miss | 12 | 9 |

Both columns run the new planner with identical input checks.
The counts cover nominal and corner evaluations and exclude
the reference runs. Input checks still sum rates to establish
validity, and these counts measure arithmetic evaluations, not
end-to-end elapsed time. The runner reproduces the tested
model and outcomes. Other models and compound invalid inputs
remain outside the replay, and the early checks can report
the first failing fact in a different order from the reference.

The [mixed-chain replay](admitted-chain-transfer.md) tests discovery
and reuse across shorter outputs in the learned operation records.

```powershell
node tooling/programme-algebra/plan-admitted-budget.mjs plan FACTS
node tooling/programme-algebra/plan-admitted-budget.mjs stream FILES
node tooling/programme-algebra/plan-admitted-budget.mjs replay
```

`FILES` is a JSON array of facts-file paths relative to the array
file. Full robust-budget inputs follow the [calibration-box format](calibration-bounds.md).
