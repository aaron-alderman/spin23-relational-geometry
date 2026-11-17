# Reuse the exact quantity for repeated budget decisions

The [calibration-box screen](calibration-box-budget-screen.md) avoided
six calls to the full planner, but could not resolve the last failing
budget for either detector. This replay tests the adjacent counts using
the same admitted iron-57 corners. It also measures the decision
calculation with both approaches running in the same process.

Write `p` for the one-preparation registration probability at the
corner. Each additional independent preparation adds the same
`-log(1-p)` to the negative log of the run's miss probability. The
earlier screen used `p/(1-p)` as a ceiling on this contribution.
Two terms of the positive log series give the tighter lower bound
`p + p²/2` and upper bound `p + p²/2 + p³/[3(1-p)]`. The remainder
bound comes from replacing each coefficient from the third term on
with `1/3`. Substituting a lower or upper bound on `p` preserves
the respective inequality. For the recorded window-to-lifetime ratio,
the even-degree exit polynomial is a lower bound and the odd-degree
polynomial is an upper bound.

The degree-six and degree-seven pair ruled out 5,521 BART trials and
2,278 LORAX trials, one short of the minimum in each case. The
degree-eight and degree-nine pair also certified that the next trial
reaches 99% in both cases. Across 524 probe evaluations, including the
ten previous examples and a sweep around each minimum, the lower
degree pair needed four exact fallbacks and the higher degree pair
needed zero. All decisions agreed with the previously recorded
independent corner calculation. The probe list repeats counts that
occur in both the earlier examples and the sweep.

| In-process decision | Median time per decision |
| --- | ---: |
| Direct, recompute the corner quantity | 26.7 ns |
| Bounded, recompute the degree-eight and degree-nine pair | 68.6 ns |
| Direct, reuse the exact corner quantity | 6.6 ns |
| Bounded, reuse the polynomial bounds | 7.4 ns |

The [receipt](budget-decision-kernels-replay.json) keeps all eight
timings per policy. Each timing repeats the same interleaved probes
after warmup. It measures the loaded decision kernel with the
calibration geometry and target threshold prepared. File reads,
case admission, preparing cached values, and subprocess work are
outside the timing. The earlier savings still apply when the choice
is between screening and launching the full planner. At this
granularity the tighter bound resolves more cases and costs more
time than directly computing the corner quantity.

The retained operation is to compute and store the exact per-trial
negative log miss once for an admitted calibration, then reuse it
when the trial count or target changes. A change to the event,
window, source model, or calibration needs a fresh quantity. This
replay uses fixed admitted inputs, with all decisions outside the
floating-point equality margin. The [stream replay](budget-cache.md)
checks reuse and invalidation by changing one input at a time.

```powershell
node tooling/programme-algebra/compare-budget-decision-kernels.mjs
node tooling/programme-algebra/compare-budget-decision-kernels.mjs --benchmark
```
