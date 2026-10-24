# Two separated calibration points locate the measured population state

**Date:** 25 October 2026
**Status:** population-wide minimal point-prediction bridge closed; joint uncertainty and dynamics remain open
**Topics:** OT-027
**Parent:** [AZ-091 one-point boundary](admissibility_91_one_point_latent_state_boundary.md)
**Evidence:** [two-point nested predictor](../../../evidence/data/zenodo-eis-two-point-latent-state-predictor-v1.json)
**Verifier:** [two-point certificate](../../../verification/admissibility/verify_zenodo_eis_two_point_latent_state_predictor.mjs)

## Result

One fixed 10 kHz complex impedance and one donor-selected second complex impedance predict every cell's fifteen untouched frequencies inside the frozen 5% median / 20% maximum limits. All **54 of 54** cells pass. The median cellwise median error is **0.674%**; the worst is **3.261%** (`ID36`). The worst cellwise maximum is **5.503%** (`ID07`).

For each target, the second frequency and neighbour count are chosen by leave-one-donor-out validation entirely within the other 53 cells. Fifty-one targets select **2.8219349 Hz**; two select 37.6311 Hz and one selects 11.9 Hz. The dominant low-frequency coordinate emerges from prediction loss rather than being chosen after inspecting the target.

## Reason and implication

The two records see different things. The 10 kHz point locates the high-frequency port state; the approximately 2.82 Hz point samples relaxation/diffusion structure. Together they locate a donor neighbourhood whose passive parameters transport across the untouched spectrum. This explains why one point nearly worked and why interpreting it only as series resistance and inductance failed.

This closes a minimal *point-prediction* bridge for this source population. It does not prove that two coordinates are universally sufficient, identify a causal material state, supply simultaneous predictive coverage, estimate fixture or replicate covariance, close a detector likelihood, generate dynamics or indicate new physics. The useful engineering target is nevertheless concrete: a two-tone calibration protocol can replace a full cell-specific spectrum when the declared population and accuracy ceiling apply.

## Next gate

Freeze the dominant 10 kHz / 2.8219349 Hz protocol globally rather than reselecting it per outer target, then construct a donor-only joint residual model and test simultaneous whole-spectrum coverage. External replication on a separately acquired batch is required before calling the bridge prospective.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-two-point-latent-state-predictor.mjs --write
node verification/admissibility/verify_zenodo_eis_two_point_latent_state_predictor.mjs
~~~
