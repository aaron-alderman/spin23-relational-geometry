# Discover how far to take the calculation

The [facts-only planner](admitted-budget.md) previously executed
the full five-operation chain for every admitted budget question.
It now starts with the requested output type and walks backward
through the input and output types in the learned operation
records. The requested output determines where the computation
stops. The input supplies facts and the target, with zero
routes supplied. The runner checks the discovered chain against
the facts before consulting its numeric cache.

The [mixed replay](admitted-chain-transfer-replay.json) checks
helium and free calcium survival, an iron-57 photon branch,
BART and LORAX registration probabilities, nominal budgets,
and a calibration-box budget. These exercise chains of one
through five operations. The replay projects out the candidate
plans in the historical helium input and derives one additional
single-preparation question from the saved nominal BART facts.
All nine admitted results match their archived numerical
references. The driven calcium question fails the survival
check before evaluating a probability.

BART's 122.06 keV detector question reuses a branch share from
the earlier calibration-box question even though the emission
windows differ. Its 136.47 keV single-preparation question
computes a registration probability that the later nominal
budget reuses in full. The corresponding LORAX budget reuses
the survival probability and branch share and evaluates its own
detector-adjusted registration probability.

| Evaluation | Fresh per request | Shared within stream |
| --- | ---: | ---: |
| Exit probability | 10 | 7 |
| Branch fraction | 8 | 4 |
| Registration probability and log miss | 7 | 6 |

Removing the registration producer disconnects the nominal
budget chain. The helium question still executes through its
one-step chain. The runner checks numerical inputs, code, and
operation hashes against the recorded evidence. The old
detector receipt's navigation README has changed. The replay
records both hashes and treats that file as context for the
historical agent's discovery.

This replay exercised prefixes of the known chain, using the
installed evaluators for five operations. The shorter chains
return a scalar probability or nominal budget. Scalar
probabilities omit lifetime-uncertainty intervals. The
[timing-route replay](timing-routes.md) adds a second producer
for the same survival output and tests evidence selection.

```powershell
node tooling/programme-algebra/plan-admitted-budget.mjs transfer
```
