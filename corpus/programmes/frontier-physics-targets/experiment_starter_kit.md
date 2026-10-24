# Frontier experiment starter kit

**Use with:** [experiment atlas](frontier_experiment_atlas_v1.md) · [detector atlas](detector_frontier_atlas_v1.md) · [open topics](open_topics_v1.md)

An experiment is ready to leave the atlas when every field below is concrete enough that a skeptical team could price, simulate and preregister it.

## One-page experiment card

| Field | Required content |
|---|---|
| Target and topic IDs | One canonical frontier target and one maintained open topic. |
| Conventional question | A useful physics question independent of the programme-specific interpretation. |
| Programme-specific bridge | The exact carrier/map/invariant the experiment would test. |
| Platform | Material, device, geometry, dimensions, temperature, field and fabrication state. |
| Preparation | How the state, sector, orientation or history is physically created and independently verified. |
| Control parameters | Variables swept, held fixed, randomized and blinded. |
| Primary observable | A dimensioned detector output and its calibration route. |
| Added discriminating channel | Reversal, frequency, geometry, waiting time, higher moment or cross-detector signal that breaks the leading equivalence. |
| Null and alternatives | At least one conventional null and the strongest mundane competing mechanisms. |
| Nuisance model | Drift, heating, disorder, contacts, backgrounds, finite size, hysteresis and data-reduction choices. |
| Predicted contrast | Sign, scaling, band, pole, lag, symmetry or likelihood contrast; sensitivity alone is not a prediction. |
| Power / precision | Expected effect, uncertainty budget, sample count and stopping rule. |
| Kill test | A result that rules out or demotes the bridge under its stated assumptions. |
| Ordinary residue | What useful measurement or bound remains after a null. |
| Interpretation ladder | Conventional result → shared mechanism → typed bridge → new physics, with separate thresholds. |

## Required pre-computation

1. Freeze the operator and port before fitting.
2. Propagate the same material/device parameters into every claimed channel without hidden refits.
3. Simulate the leading nuisance collision through the same detector fold.
4. Run ablations that remove the proposed second datum, orientation or memory channel.
5. Declare order of limits, bandwidth, finite-size scaling and calibration transfer.
6. Produce synthetic blinded fixtures and verify the analysis recovers the injected contrast.

## Decision rule

A result reaches **new-physics candidate** status only if the preregistered contrast survives calibration, nuisance alternatives, detector equivalence and an independent replication route. Otherwise report the strongest lower rung actually supported. A null can still close a mechanism, set a bound or validate the apparatus model.

## Handoff artifacts

- completed one-page card;
- device or sample specification;
- frozen analysis script and synthetic fixtures;
- uncertainty and nuisance ledger;
- preregistration text;
- data and calibration provenance plan; and
- a corpus update naming which frontier edge the result changes.
