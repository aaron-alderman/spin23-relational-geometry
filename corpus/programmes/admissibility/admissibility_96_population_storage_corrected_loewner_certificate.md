# Storage typing reverses the population-wide cross-frequency verdict

**Date:** 25 October 2026
**Status:** fitted-model certificate closed; independent measured-kernel test open
**Topics:** OT-018, OT-027
**Parent:** [AZ-095 cross-frequency shared-measure bound](admissibility_95_cross_frequency_shared_measure_bound.md)
**Evidence:** [population Loewner audit](../../../evidence/data/zenodo-eis-storage-corrected-loewner-audit-v1.json)
**Generator:** [storage-corrected population calculation](../../../scripts/run-zenodo-eis-storage-corrected-loewner-audit.mjs)
**Verifier:** [population certificate](../../../verification/admissibility/verify_zenodo_eis_storage_corrected_loewner_audit.mjs)

## Result

The cross-frequency bound is applied to the passive impedance family already fitted to all 54 Zenodo cells. On the positive Laplace axis that family is

\[
Z(s)=R_s+L_s s+
\sum_k\frac{R_k}{1+s/\lambda_k}+
\frac{W}{\sqrt{s}},
\]

with nonnegative fitted coefficients. The constant does not affect divided differences. The Debye and Warburg terms belong to a positive relaxation measure; the linear term is inductive storage and contributes \(-L_s\) to every Loewner-kernel entry.

At the fixed coordinates corresponding to 1 kHz, 3.162 kHz and 10 kHz, the kernel of the complete fitted impedance fails for **54 of 54** cells. After adding each cell's fitted \(L_s\) back to every entry—equivalently testing the response after the inductive term is removed—the kernel passes for **54 of 54**. The smallest corrected eigenvalue is positive, approximately \(1.51\times10^{-12}\).

## Reason

The raw failure is not a defect in passivity. It is a category mistake: a relaxation-only theorem was applied to a response that also stores energy inductively. Once the storage channel is named, the classification reverses across the entire population.

This is the practical meaning of “typed admissibility.” The same numbers can be forbidden or allowed depending on the declared physical question. The correction is not a fitted rescue invented after seeing a failure; the inductive coefficient was already part of the frozen passive model and its sign in the kernel follows analytically.

## What this does not establish

The result certifies the construction of the fitted model. It is not an independent empirical test of the raw spectra, because the source provides neither measured positive-Laplace slopes nor repeat/fixture covariance, and the nonnegative basis already imposes the shared-measure property. A direct experiment must estimate the required local slopes or use a validated finite-sample interpolation test, propagate covariance, and keep storage coefficients independently calibrated.

## Implication and next experiment

The useful detector is a paired verdict:

1. test the raw cross-frequency kernel;
2. remove independently measured resistance, inductance and other named storage channels;
3. test the residual relaxation kernel with covariance;
4. intervene on geometry or fixture inductance and require only the raw verdict to move.

If the corrected residual still fails, ordinary explanations—calibration drift, changing specimen, missing relaxation branches and nonstationarity—come first. A residual becomes frontier evidence only after those alternatives and the detector likelihood close.

## Reproduction

~~~powershell
node scripts/run-zenodo-eis-storage-corrected-loewner-audit.mjs --write
node verification/admissibility/verify_zenodo_eis_storage_corrected_loewner_audit.mjs
~~~
