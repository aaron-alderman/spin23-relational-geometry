# The pointwise population envelope is a rank identity, not a cell-level explanation

**Date:** 25 October 2026
**Status:** distribution-free pointwise envelope evaluated; scalar coverage is automatic and cell-level latent structure remains open
**Topics:** OT-027
**Parent:** [AZ-089 shared-parameter near-miss](admissibility_89_unseen_cell_shared_parameter_near_miss.md)
**Evidence:** [population-envelope audit](../../../evidence/data/zenodo-eis-distribution-free-population-envelope-v1.json)
**Verifier:** [population-envelope certificate](../../../verification/admissibility/verify_zenodo_eis_distribution_free_population_envelope.mjs)

## Question

AZ-089 showed that one donor-derived median curve misses `ID07`. A natural response is to replace the point curve by a donor-derived predictive envelope. This packet asks whether that move genuinely models population uncertainty or merely makes a wide descriptive band.

For each target cell and each of the fifteen held-out frequencies, the real and imaginary limits are the minimum and maximum measurements among the other 53 cells. The target contributes nothing to its envelope. There are no fitted widths or tuning parameters.

## Exact result

Across 1,620 scalar coordinate checks, coverage is exactly **52/54 = 96.296%**. That number is not an empirical success. With distinct values, leave-one-out min/max must exclude exactly the global minimum and maximum at every scalar coordinate. The aggregate coverage is therefore a rank identity fixed before looking at the impedance values.

The nontrivial information is which extrema persist together across frequency. Forty-two cells keep all fifteen complex points inside the donor rectangles; twelve escape at least once. `ID07` lies above the donor real-part range at all fifteen frequencies. `ID52` escapes the imaginary range at ten frequencies. `ID22` escapes the real range at eleven. These coherent rank patterns show that the coordinates cannot be treated as thirty independent draws from one anonymous population.

## Implication

A pointwise band does not repair the failed shared law. It quotients away the very cell-level coherence that a physical population model must explain. The useful next object is a latent cell state: a low-dimensional variable inferred from independently declared calibration information and propagated through the entire complex spectrum. That state might encode ordinary resistance, relaxation, contact or manufacturing variation. This dataset alone does not say which.

Nothing here establishes measurement covariance, a detector likelihood, generated dynamics or new physics. The extrema are guideposts for replication and nuisance modeling, not anomalies. The practical opening is theoretical engineering: determine the smallest calibration record that predicts a cell's coherent spectral displacement, then test it prospectively.

## Next gate

AZ-091 executes the one-complex-point version. Donor locality nearly closes the gate at 53/54, while a direct series-R/L interpretation passes only 36/54. The next finite test therefore uses two separated calibration frequencies so that the target record observes both port and relaxation/diffusion state. Replicate/fixture data remain necessary before any predictive distribution can become a detector likelihood.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-distribution-free-population-envelope.mjs --write
node verification/admissibility/verify_zenodo_eis_distribution_free_population_envelope.mjs
~~~
