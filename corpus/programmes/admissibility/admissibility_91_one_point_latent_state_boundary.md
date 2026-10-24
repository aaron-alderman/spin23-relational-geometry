# One calibration point carries state information but not the whole cell

**Date:** 25 October 2026
**Status:** one-point latent-state gate tested by statistical and physically typed controls; neither closes all cells
**Topics:** OT-027
**Parent:** [AZ-090 pointwise-envelope boundary](admissibility_90_pointwise_population_envelope_rank_identity_and_cell_level_boundary.md)
**Evidence:** [nested neighbour predictor](../../../evidence/data/zenodo-eis-one-point-latent-state-predictor-v1.json) and [physical R/L anchor](../../../evidence/data/zenodo-eis-one-point-physical-anchor-v1.json)
**Verifier:** [one-point boundary certificate](../../../verification/admissibility/verify_zenodo_eis_one_point_latent_state_boundary.mjs)

## Question

AZ-090 found coherent cell identities across frequency. This packet asks whether one fixed complex measurement at 10 kHz is enough to locate an unseen cell's latent state and predict the fifteen untouched frequencies.

Two models test different readings. The nested-neighbour model uses the calibration point to find similar donor cells, chooses its neighbour count entirely inside the other 53 cells, averages their passive parameters and predicts the target. The physical-anchor model keeps donor-median relaxation and diffusion weights but solves the series resistance and inductance directly from the target calibration record. Neither model reads an evaluation value.

## Result

The nested-neighbour model passes **53 of 54** cells. Its population median cellwise median error is **1.628%**. `ID07` remains the sole failure at **5.250%**, improved from AZ-089's 5.575% but still beyond the frozen 5% ceiling. Nested validation chooses three, seven or nine neighbours; it never chooses one or more than nine.

The physically typed two-coordinate anchor passes only **36 of 54** cells despite retaining nonnegative passive parameters for all 54. Its median cellwise median error is 3.896%, and `ID52` reaches 7.992%. Matching the high-frequency complex point by changing only series resistance and inductance therefore misattributes relaxation-scale variation to a constant offset and slope.

## What this means

One high-frequency complex record is informative: donor locality nearly closes the population. It is not sufficient: the extreme cell remains outside an interpolating model, and the direct R/L interpretation fails broadly. The latent cell state must include at least one relaxation or diffusion coordinate, or use a calibration frequency that observes it.

This is a practical design result. A minimal calibration protocol should span separated frequency regimes rather than merely measure real and imaginary parts at one frequency. It is not measurement covariance, a detector likelihood, generated dynamics or new physics. `ID07` remains a challenge case, not an anomaly.

## Next gate

Use two predeclared complex calibration points: one at the fixed high-frequency port and one in the relaxation/diffusion regime. Select the second frequency and model complexity using donor-only nested validation, then predict the untouched rows. Compare against the one-point neighbour baseline. Only after population-wide passage should a joint predictive distribution and replicate/fixture covariance be attempted.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-one-point-latent-state-predictor.mjs --write
node scripts/run-zenodo-eis-one-point-physical-anchor.mjs --write
node verification/admissibility/verify_zenodo_eis_one_point_latent_state_boundary.mjs
~~~
