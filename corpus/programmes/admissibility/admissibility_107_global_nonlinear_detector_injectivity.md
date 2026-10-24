# Local information is not global identification

**Date:** 25 October 2026

**Status:** OT-034 closed for one declared compact nonlinear history family; physical-carrier and unrestricted-family extensions remain open

**Topic:** OT-034

**Parent:** [AZ-057 coordinated selector closure](admissibility_57_coordinated_selector_closure_and_physical_provenance_boundary.md)

**Evidence:** [global injectivity audit](../../../evidence/data/global-nonlinear-detector-injectivity-v1.json)

**Generator:** [nonlinear history calculation](../../../scripts/run-global-nonlinear-detector-injectivity.mjs)

**Verifier:** [global quotient certificate](../../../verification/admissibility/verify_global_nonlinear_detector_injectivity.mjs)

## Result

AZ-057 separated three nearby declared mechanisms with reversal tomography and process singular values. That was a local-family result. AZ-107 asks the harder question: can two distant parameter points generate exactly the same complete admitted record even when the tangent Fisher matrix has full rank at each point?

The frozen carrier is the smallest history-dependent control model that makes the issue visible,

\[
x_{n+1}=\rho x_n+\beta u_n,
\qquad x_0=0,
\]

followed by a nonlinear power detector \(P_n=g x_n^2\). The compact domain is \(-0.8\leq\rho\leq0.8\), \(0.5\leq|\beta|\leq2\), and \(0.5\leq g\leq2\). A known unit reference calibrates \(g\). One pulse, pulse-then-wait and two-pulse histories then give

\[
P_1=g\beta^2,
\qquad P_{10}=g\rho^2\beta^2,
\qquad P_{11}=g\beta^2(1+\rho)^2.
\]

These records determine \(g\), \(|\beta|\), and \(\rho\) exactly. The last inversion is single-valued because \(1+\rho>0\) throughout the declared domain. The delayed record is a held-out history check.

Yet every power record is exactly invariant under

\[
(\rho,\beta,g)\sim(\rho,-\beta,g).
\]

The power-only Jacobian has full local rank throughout a 34,782-point adversarial audit, while the two sign branches remain record-identical to machine exactness. Local Fisher separation therefore does not imply global injectivity. The residual equivalence class has diameter as large as four in the declared parameter coordinates.

## The missing datum

One phase-referenced amplitude record after the first pulse supplies

\[
Q_1=\sqrt g\,\beta.
\]

It changes sign across the two power-equivalent branches. Because \(g\) is independently calibrated, \(Q_1\) fixes \(\beta\), while the power histories fix \(\rho\) and verify the recurrence. The resulting five-record bundle is globally injective over the declared compact family. Across the audit grid, the smallest coherent separation between an aliased pair is greater than 0.70, and analytic inversion residuals remain below \(3.6\times10^{-15}\).

This is not “more data” in the abstract. It is a different kind of record: power forgets orientation; a coherent reference retains it. If that reference cannot be physically maintained, the honest result is the sign quotient, not a fitted sign.

## Open and closed

**Closed here**

- a power-only nonlinear history detector is locally full-rank but globally two-to-one;
- the complete residual quotient is characterized analytically;
- a finite phase-sensitive augmentation is proved injective on the declared compact family;
- OT-034's declared closure criterion is met for this platform model.

**Still open**

- no unrestricted nonlinear model class is globally identifiable from this example;
- no physical carrier, phase-reference stability, detector saturation or model-discrepancy covariance has been measured;
- a hidden state outside the declared recurrence can reopen equivalence;
- neither new physics nor a \(\operatorname{Spin}_0(2,3)\) realization follows.

## Implication

The detector frontier has a precise shape. Some boundaries are noise-limited and can be moved by precision. Others are quotient boundaries: the apparatus deliberately maps distinct possibilities to one record. Crossing the second kind requires a record that keeps the missing relation—here, phase relative to a reference—not merely a better measurement of the old power channel. The practical next experiment is to repeat this preregistered pulse schedule on a calibrated resonator or oscillator while drifting the phase reference, detector gain and nonlinear response through their covariance ranges. Failure of the augmented model should first be read as a missing state or detector term; only a stable, cross-platform residue earns a new-physics interpretation.

## Reproduction

~~~powershell
node scripts/run-global-nonlinear-detector-injectivity.mjs --write
node verification/admissibility/verify_global_nonlinear_detector_injectivity.mjs
~~~
