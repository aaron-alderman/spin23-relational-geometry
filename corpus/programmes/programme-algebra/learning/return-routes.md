# Choose the observable when return is possible

The [parity trace](return-path-parity.md) contains windows that depart
from the starting label and end back there. The [Delft thinning
experiment](return-path-delft-thinning.md) shows that removing interior
samples changes how many such departures are detected while leaving
the starting and ending labels fixed. The planner now discovers
separate [operations](sampled-return-learned-operations.json) for a
change at readout and a first observed departure.

Both routes use a calibrated two-state transition matrix on the base
sample grid. The changed-endpoint probability is the start-to-away
entry of the matrix raised to the full window length in steps.
For observed departure, first raise the matrix to the retention
stride. The chance of seeing no departure is its start-to-start
entry raised to the number of retained steps. The planner checks
the requested observable, starting label, compatible acquisition
and decoder, transition probabilities, and whether the endpoint
lies on the requested grid.

The [replay](return-routes-replay.json) uses the saved adjacent-sample
calibration from Delft repeat 0 and scores repeats 3 and 4. All
32 forecasts reproduce the archived model predictions for both
starting states on four grids. For the higher starting label,
the endpoint probability stays at **18.97%**. The predicted
sampled-departure probability falls from **52.94%** to **43.18%**
when keeping every tenth label.

| Held repeat, higher start | Observed endpoint change | Observed departure, full grid | Observed departure, every tenth label |
| --- | ---: | ---: | ---: |
| 3 | 19.21% | 52.31% | 39.98% |
| 4 | 18.65% | 52.33% | 38.52% |

The higher-start endpoint errors were under half a percentage
point. On the coarsest grid, the route overpredicted sampled
departures by **3.21** and **4.66** percentage points. Numerical
reproduction therefore carries forward the model's predictive
failure as well as its endpoint agreement. The data are decoded
labels from one device. They leave continuous physical first exit
undetermined.

The cache reuses an endpoint result at a fixed window regardless
of retention stride. A sampled-departure cache entry includes the
stride. Across the mixed stream, matrix entries were evaluated
**10 times instead of 32**, and sampled path probabilities **8
times instead of 16**. The replay also rejected an observable
substitution, a mismatched decoder, an off-grid endpoint, and a
request for continuous physical first exit. Each stopped before
probability evaluation.

The [held qualification](return-path-delft-qualification.md)
tests endpoint and sampled-path forecasts on a reserved repeat
under a tolerance fixed before scoring.

```powershell
node tooling/programme-algebra/plan-admitted-budget.mjs return-routes
```
