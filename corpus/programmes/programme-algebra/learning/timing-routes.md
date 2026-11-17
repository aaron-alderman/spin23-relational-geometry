# Choose a survival route from the timing evidence

The [mixed-chain replay](admitted-chain-transfer.md) discovered
how far to compute along a single chain of learned operations.
The operation graph now has two producers for the finite-window
exit probability. The existing producer accepts a mean lifetime.
The [new operation record](population-half-life-learned-operation.json)
accepts a population half-life and divides it and its reported
uncertainty by ln(2) after converting nanoseconds to seconds.
Both use the same constant-hazard survival kernel and the same
admissibility conditions.

The [replay](timing-routes-replay.json) takes the published timing
facts already preserved in the iron-57 records. It presents them
as a mean lifetime only, a population half-life only, and then
both. The 14.4 keV branch probability is **5.3091%** on either
route. The BART budget across its existing calibration box is
**5,522 preparations** on either route. Both results match the
archived references. The supplied half-life and its derived mean
lifetime represent the same measurement in each case.

With both representations present, the planner records both ID
paths into the survival operation and uses the mean-lifetime
representation when the values and reported uncertainties agree
within a floating-point tolerance. The half-life and dual-input
probes reuse the earlier numerical result after normalizing to the
same timing inputs. A control raises the population half-life by
10% while retaining the recorded mean lifetime. Another control
labels the only timing datum as a branch half-life. Both controls
stop before any probability evaluation, for conflicting evidence
and missing applicable timing evidence, respectively.

To use the half-life input with the facts-only runner, provide
`facts.populationHalfLife` with type `measured-population-half-life`,
`nanoseconds`, `uncertaintyNanoseconds`, and a `source`. The
previous `facts.lifetime` form is still accepted. For calibration
boxes, lifetime bounds remain in mean-lifetime seconds.

This replay tests input representation and route selection under
one physical law. The [sampled return routes](return-routes.md)
test a different model in which the planner must distinguish
first observed departure from the state at readout.

```powershell
node tooling/programme-algebra/plan-admitted-budget.mjs timing-routes
```
