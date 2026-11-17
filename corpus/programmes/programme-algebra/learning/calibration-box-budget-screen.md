# Rule out a budget at one calibration

The [nominal budget screen](fixed-trial-budget.md) skips the exact planner
when an upper bound on the chance of success falls below the target.
A budget that must work everywhere in a calibration box fails if it
falls short at any one admitted calibration. The [122.06 keV iron-57
cases](fresh-agent-calibration-box/README.md) record an attainable
least favorable corner for BART and LORAX. The screen checks the saved
input and planner hashes and uses that corner before making any new
exact budget calls.

The nominal screen multiplied a linear bound on the per-trial chance
by the trial count. Its ceiling was one even at 1,000 preparations for
both cases, so it could not rule out any of the tested budgets. A tighter
exit ceiling comes from the Taylor polynomial through degree seven for
`1 - exp(-x)`, where `x` is the window divided by the mean lifetime.
The Taylor remainder for `exp(-x)` has a positive sign after degree
seven. The screen uses this polynomial on `[0, 1]` and the linear cap
outside that interval.

Multiplying the exit ceiling by the branch fraction and detector
acceptance yields the per-trial ceiling `u`. At a fixed calibration
with independent trials, the negative log of the probability of zero
successes is `-n log(1-p)`. Integrating `1/(1-t)` from zero to `p`
shows that this quantity is at most `n*u/(1-u)`. If that upper bound
is below `-log(1-target)`, the design fails even with all inputs
fixed at that one allowed calibration. A small floating-point margin
sends comparisons very close to the threshold to the exact planner.

The [receipt](calibration-box-budget-screen-replay.json) compares the
original and tighter exit ceilings, each with the union and negative
log bounds. Each detector was checked at 1,000 and 2,000 preparations,
its nominal minimum, and the counts immediately below and at the
robust minimum.

| Exit ceiling | Run ceiling | Budgets ruled out of 10 |
| --- | --- | ---: |
| Linear | Union | 0 |
| Taylor | Union | 1 |
| Linear | Negative log | 3 |
| Taylor | Negative log | 6 |

All ten decisions matched the exact robust planner. The combined
screen reduced robust planner calls from ten to four, or upstream
nominal and corner evaluations from twenty to eight. At their nominal
minima of 5,465 and 2,254 preparations, BART and LORAX both meet 99%
at nominal calibration. An allowed corner reduces their chances to
98.9518% and 98.9483%, respectively. The combined screen rules out
both budgets without invoking the exact planner for the decision.
The control still runs the exact planner for each probe. These
counts measure planner calls after admission, and exclude the work
spent on the original case admission and on comparing policies.

At one preparation below the robust minimum, both screens reach the
exact fallback. A [follow-up replay](budget-decision-kernels.md) tightens
the bounds at that boundary and compares the cost of deciding in the
same process.

```powershell
node tooling/programme-algebra/check-calibration-box-budget.mjs check BART 5465
node tooling/programme-algebra/check-calibration-box-budget.mjs replay
```
