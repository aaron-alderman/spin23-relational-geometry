# Screen a fixed trial budget

The [detector timing gain replay](detector-timing-gain.md) compared a
ceiling on achievable validation gain with a required gain before fitting.
The same decision rule can eliminate some run designs before evaluating
their exact chance of success.

The [saved iron-57 cases](fresh-agent-run-budget/README.md) use a
20 ns emission window, a selected absorbing decay branch, and eventual
registration in the detector's full-energy peak. For a constant hazard
with lifetime `tau`, the exit probability `1 - exp(-T/tau)` is at most
`min(1, T/tau)`. Multiplying by the selected branch fraction and the
matched absolute peak acceptance gives a per-trial ceiling. The union
bound gives a run ceiling of at most the trial count times the per-trial
ceiling, capped at one. If that ceiling falls below 95%, the design
cannot meet the target. Otherwise the original independent-trials
planner decides.

The [replay receipt](fixed-trial-budget-replay.json) applies the shortcut
to 2,000 and 5,000 trials for both detectors, plus the last failing and
first passing counts from each saved plan. These are planning probes
using the previously recorded calibration, lifetime and branch rates.

| Detector | Trials screened out | Last failing count | First passing count |
| --- | --- | ---: | ---: |
| BART | 2,000 and 5,000 | 22,823 | 22,824 |
| LORAX | 2,000 | 9,908 | 9,909 |

All eight decisions agree with the exact planner. The guarded path
calls it five times instead of eight. At 5,000 trials for LORAX the
union bound reaches one, while the exact chance is about 78%. The
exact path handles this inconclusive case and both sides of each
minimum-trial boundary. The receipt counts planner calls for each
policy independently. The comparison itself also runs the exact
planner for each probe.

This replay uses case admissions recorded by the earlier planner and
pins the associated facts and code. The saved inputs describe nominal
calibration and independent, identical preparations. Screening a
budget with a new observation model needs its own admissibility check.
The next discriminating test is whether a least-favorable corner from
the saved calibration box can rule out a robust budget before the
planner evaluates either the nominal or corner probability.

```powershell
node tooling/programme-algebra/check-fixed-trial-budget.mjs check BART 5000
node tooling/programme-algebra/check-fixed-trial-budget.mjs replay
```
