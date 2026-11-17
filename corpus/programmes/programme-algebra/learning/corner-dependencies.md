# Share numeric dependencies after independent admission

The [budget stream replay](budget-cache.md) reused calculations
when the full set of admitted facts matched. The follow-up tests
whether independently admitted cases can share smaller calculations
even when their full facts differ. Each case keeps its own facts
and planner-reply hashes. The runner extracts numeric dependencies
only from a successful calibration-box planner result.

The exit probability depends on the constant-hazard model and the
ratio of the observation window to the corner lifetime. The branch
fraction depends on the selected exit and complete corner rate
table. The corner's per-trial negative log miss depends on those
two results and the matched detector acceptance. The replay keeps
those inputs and the case that supplied each saved quantity.

| Admitted case | Exit probability | Branch fraction | Corner log miss |
| --- | --- | --- | --- |
| BART | Calculated | Calculated | Calculated |
| BART with shifted nominal detector acceptance | Reused | Reused | Reused |
| LORAX | Reused | Reused | Calculated |
| BART with a shorter emission window | Calculated | Reused | Calculated |
| BART with a higher competing corner rate | Reused | Calculated | Calculated |

BART and LORAX are the two archived detector cases. The other three
rows are controlled perturbations of BART, each run through the exact
planner separately. Raising the nominal detector acceptance within
the existing box changed the nominal minimum from 5,465 to 5,448.
It preserved the corner and the robust minimum of 5,522. Two further
perturbations left the numeric corner inputs unchanged and specified
incompatible acquisition or dependent preparations. The planner
refused both, so neither could borrow a result.

Every reconstructed corner probability matched the exact planner,
and every admitted case reproduced the passing and failing counts
on either side of its robust minimum. Across five admitted cases,
reconstruction performed two exit calculations, two branch
calculations, and four complete corner log-miss calculations.
Repeating each calculation after admission would perform five of
each. The existing planner already evaluates the corner during
admission, so this experiment establishes which numeric dependencies
can be shared and leaves admission work unchanged.
[Replay receipt](corner-dependencies-replay.json)

The [facts-only planner replay](admitted-budget.md) moves admissibility
checks ahead of probability evaluation and measures reuse during
the planning run.

```powershell
node tooling/programme-algebra/replay-corner-dependencies.mjs
```
