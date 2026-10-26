# E8 mixed perturbation corner

**Date:** 26 October 2026

**Status:** planned finite compact-cell stencil closed; intercell gate open

**Evidence:** [mixed-corner ledger](../../../evidence/data/translation-free-e8-mixed-perturbation-corner-v1.json)
**Certificate:** [mixed-corner verifier](../../../verification/verify/verify_translation_free_e8_mixed_perturbation_corner.mjs)

The promoted 10% unequal locking vector and 5% kinetic congruence were applied
together. Complete-shell gaps at cutoffs 6, 8 and 10 are 0.2197313169,
0.2182306718 and 0.2180990361. Successive changes are 0.683% and 0.0603%; the
final value differs from the symmetric reference by only -0.0814%. The first
three residuals are below \(2.5\times10^{-11}\), low-four boundary weight is
below \(8.0\times10^{-6}\), and the odd sine-bright first transition survives.

The near-cancellation of the scalar gap shifts is instructive: it does not
erase the anisotropic eight-channel detector weights. Gap plus resolved drive
vector is therefore the minimally faithful record.

This closes the planned finite compact-cell stencil: five scalar ratios, two
non-collinear amplitude directions, one positive metric direction and one
mixed corner. It does not prove the interior continuous or give a rigorous
lower bound. Further single-cell sampling now has lower value than introducing
an explicit cell index and asking whether local, relative-cell and collective
modes remain separated under intercell coupling.
