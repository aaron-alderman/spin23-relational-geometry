# One shared passive parameter law nearly predicts the population—and fails exactly once

**Date:** 25 October 2026
**Status:** leave-one-cell-out common-law gate failed at one of 54 cells; heterogeneity boundary localized
**Topics:** OT-027
**Parent:** [AZ-088 population-wide passive baseline](admissibility_88_population_wide_passive_impedance_baseline.md)
**Evidence:** [leave-one-cell-out audit](../../../evidence/data/zenodo-eis-leave-one-cell-out-v1.json)
**Verifier:** [leave-one-cell-out certificate](../../../verification/admissibility/verify_zenodo_eis_leave_one_cell_out.mjs)

## Question

AZ-088 showed that one frozen passive *family* predicts held-out frequencies for every measured cell when each cell receives its own parameter fit. That does not show that the population obeys one reusable parameter law. The stronger test asks: can the other 53 cells predict the 54th without looking at any impedance value from the target cell?

For each target, this packet takes the coordinatewise median of the eight nonnegative passive parameters fitted on the other 53 cells. It then predicts the target's fifteen predeclared held-out frequencies. The circuit basis, modulo-three split and 5% median / 20% maximum error limits are unchanged. No target-cell impedance is used to choose its parameters.

## Result

The shared median law passes **53 of 54** unseen cells. The median cellwise median error is **1.846%** and the median cellwise maximum is **3.743%**. The sole failure is `ID07`: its median held-out error is **5.575%**, just beyond the predeclared 5% ceiling, while its maximum error is **7.095%**, well inside the 20% ceiling.

This is a genuine near-universality result and a genuine failed closure. The passive response shape transfers across almost the whole population without recalibration, but the corpus may not replace “almost” with “all.” ID07's independently fitted series resistance and several relaxation weights differ from the donor median, so the failure is consistent with ordinary cell-to-cell heterogeneity. The present data do not identify its physical cause.

## Implication

The useful object is now visible between two overstatements. It is stronger than a merely reusable fitting vocabulary: a single donor-derived parameter vector predicts 98.15% of unseen cells under a demanding no-target-data rule. It is weaker than a shared law: one cell breaks the declared all-cell criterion. This is exactly an admissibility boundary—what remains jointly realizable under a common description, and where additional state information becomes necessary.

The result is not evidence for new physics, generated dynamics, a detector likelihood or a Jordan product. AZ-090 tests the simplest distribution-free uncertainty envelope and shows why pointwise widening is insufficient: its aggregate coverage is a forced rank identity, while coherent cell-level extremes persist across frequency. Replicate spectra and fixture covariance are required before assigning the residual to material structure rather than measurement variation.

## Next gate

Use AZ-090's cell-level boundary. Freeze a nested latent-state predictor whose target input is only independently available metadata or a declared minimal calibration record; its output must be a joint predictive distribution across untouched frequencies. Evaluate complete-cell coverage, retaining the coherent `ID07`, `ID22` and `ID52` rank patterns as challenges. A surviving, reproducible residual becomes a materials or detector question only after fixture, repeatability and covariance controls; a new-physics interpretation remains farther out.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-population-passive-audit.mjs --write
node scripts/run-zenodo-eis-leave-one-cell-out.mjs --write
node verification/admissibility/verify_zenodo_eis_leave_one_cell_out.mjs
~~~
