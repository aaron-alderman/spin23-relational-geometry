# The frozen two-tone rule reaches nominal internal whole-spectrum coverage

**Date:** 25 October 2026
**Status:** internal simultaneous-coverage audit closed; prospective and external coverage open
**Topics:** OT-027
**Parent:** [AZ-093 frozen two-tone protocol](admissibility_93_frozen_two_tone_within_batch_protocol.md)
**Evidence:** [nested whole-spectrum coverage audit](../../../evidence/data/zenodo-eis-frozen-two-tone-simultaneous-coverage-v1.json)
**Verifier:** [coverage-boundary certificate](../../../verification/admissibility/verify_zenodo_eis_frozen_two_tone_simultaneous_coverage.mjs)

## Result

The point-prediction rule remains unchanged: complex impedance at **10 kHz** and **2.8219349 Hz**, exactly **three** nearest donor cells, and the same passive response basis. The score is now joint rather than pointwise: for each cell it is the maximum complex relative error across all fifteen untouched frequencies. Each target threshold is formed only from nested predictions of the other 53 cells.

At the nominal 90% threshold, **49 of 54** whole spectra are covered (**90.74%**). At the nominal 95% threshold, **52 of 54** are covered (**96.30%**). `ID07` and `ID12` remain outside the 95% region. The population median target maximum error is **3.612%**; the worst is **5.503%**.

## What this means

The fixed two-measurement rule can be equipped with a useful batch-internal error radius for an entire spectrum, rather than fifteen unrelated error bars. That is a practical gain: it says where a predicted curve should lie as one object and preserves the two exceptional cells as evidence rather than hiding them in pointwise averages.

It is not yet a prospective coverage theorem. The 53 calibration scores for a target come from overlapping leave-one-donor-out fits and are statistically dependent. Their 96.30% internal result is therefore an empirical jackknife-style audit, not the distribution-free guarantee supplied by an independent split-conformal calibration set. The same batch also selected the low-frequency tone. No external cells, repeat measurements, fixture changes or pointwise covariance are present.

## Open and closed

Closed here: a frozen within-batch point rule; a donor-only, whole-spectrum nonconformity score; and nominal internal 90% and 95% coverage audits.

Open: an independent calibration/test split, a separately acquired batch, repeat and fixture covariance, a calibrated detector likelihood, causal material identification, generated dynamics and any new-physics interpretation.

## Next gate

Acquire a new batch under a frozen fixture and protocol. Use one portion only to set the whole-spectrum threshold and the other only to test coverage. Repeat selected cells across fixtures so biological/material variation and apparatus variation enter separate covariance terms. `ID07` and `ID12` are preregistered challenge cases, not grounds for retuning.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-frozen-two-tone-simultaneous-coverage.mjs --write
node verification/admissibility/verify_zenodo_eis_frozen_two_tone_simultaneous_coverage.mjs
~~~
