# The Generated Curvature Terms Define a Controlled Order-Reduced EFT but Not a New Fundamental Spectrum

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** constructive low-energy continuation after the one-loop closure no-go

**Depends on:** [the complete torsionless one-loop flow](1645_the_complete_torsionless_one_loop_flow_leaves_the_critical_pgt_surface.md)

**Evidence:** [EFT running and validity ledger](../../../evidence/data/spin23-critical-pgt-order-reduced-eft-window-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_order_reduced_eft_window.mjs)

## Result

The failed critical surface still defines a controlled low-energy EFT. If the
renormalized curvature-square coefficients are matched to zero at a reference
scale (mu_0), one-loop evolution generates the magnitudes

\[
|\Delta c_C|={11/60\over(4\pi)^2}|L|,
\qquad
|\Delta c_R|={5/36\over(4\pi)^2}|L|,
\qquad L=\log(\mu/\mu_0),
\]

up to the stated pole/counterterm sign convention. For one e-fold,

\[
|\Delta c_C|\simeq1.161\times10^{-3},
\qquad
|\Delta c_R|\simeq8.795\times10^{-4}.
\]

At energies (E\lesssim M_{\rm Pl}), the derivative-expansion parameters

\[
\varepsilon_C=|c_C|{E^2\over M_{\rm Pl}^2},
\qquad
\varepsilon_R=|c_R|{E^2\over M_{\rm Pl}^2}
\]

are therefore small for perturbative logarithms. The original massless
graviton plus massive (0^-) pole can be used as the leading spectrum, with
curvature-square insertions treated perturbatively.

This does not turn the loop-corrected local polynomial into a fundamental
ghost-free theory. Resumming the truncated (C^2) series manufactures the
opposite-residue spin-two pole discussed earlier and uses the EFT beyond the
operation that defined it.

## Matching prescription

Write the four-derivative sector as

\[
S_{4\partial}=\int\sqrt{-g},[c_C(\mu)C^2+c_R(\mu)R^2+cdots].
\]

The ellipsis includes the torsionful operators required by the enlarged
closure shell. A matching condition such as
(c_C(\mu_0)=c_R(\mu_0)=0) is a convenient benchmark, not a prediction:
finite UV threshold contributions can shift both coefficients.

Use the counterterms to cancel loop poles and retain their finite logarithms.
For amplitudes or corrected equations through four derivatives:

1. expand to first order in every four-derivative Wilson coefficient;
2. use the leading two-derivative equations to order-reduce higher time
   derivatives;
3. keep only terms through the declared power-counting order; and
4. do not invert the truncated polynomial as an exact propagator.

This prescription preserves the number of initial data and does not count a
spurious high-frequency solution of the truncated equations as a particle.

## Diagnostic resummation scales

Define convention-insensitive order-of-magnitude diagnostics

\[
\Lambda_C^{\rm diag}={M_{\rm Pl}\over\sqrt{|c_C|}},
\qquad
\Lambda_R^{\rm diag}={M_{\rm Pl}\over\sqrt{|c_R|}}.
\]

They are not asserted to be exact pole masses; tensor normalizations can add
order-one factors. For (|L|=1),

\[
\Lambda_C^{\rm diag}\simeq29.35M_{\rm Pl},
\qquad
\Lambda_R^{\rm diag}\simeq33.72M_{\rm Pl}.
\]

Thus a conservative cutoff (Lambda_{\rm EFT}\le M_{\rm Pl}) lies far below
the scale at which a resummed four-derivative denominator would turn over.
This is a consistency check on perturbative use, not evidence that the
diagnostic pole is a UV-complete state.

## AdS and torsion conditions

On the natural AdS background the expansion additionally requires

\[
{|c_C|\over M_{\rm Pl}^2\ell^2}\ll1,
\qquad
{|c_R|\over M_{\rm Pl}^2\ell^2}\ll1,
\qquad
{E^2\over M_{\rm Pl}^2}\max(|c_C|,|c_R|)\ll1.
\]

The torsion pseudoscalar requires (m_{0^-}^2=A/B>0) and energies below any
threshold where the unknown torsionful Wilson coefficients become order one.
Those coefficients must be included in a precision matching calculation;
the torsionless result does not set them to zero.

## Predictive and nonpredictive content

The EFT predicts nonanalytic low-energy loop terms and the scale dependence
needed to cancel the running of its Wilson coefficients. It does not predict
their finite values without UV matching. Nor does it establish a fundamental
fixed point, a positive spectral density for a resummed curvature-square
action, or closure on a finite operator set.

The next useful calculation within this branch is observable-specific:
choose a process involving the gauge-invariant (widehat X) mode or a
gravitational background, enumerate the required torsionful operators at the
same order, and match their finite coefficients. There is no further
universal coefficient to derive from the sparse action alone.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_order_reduced_eft_window.mjs
~~~
