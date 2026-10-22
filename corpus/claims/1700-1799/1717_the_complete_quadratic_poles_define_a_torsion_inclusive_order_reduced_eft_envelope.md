# The Complete Quadratic Poles Define a Torsion-Inclusive Order-Reduced EFT Envelope

**Date:** 23 October 2026

**Status:** complete universal running envelope; finite matching remains external

**Depends on:** [quadratic-shell closure](1716_two_bianchi_compatible_fourier_probes_close_the_curved_linear_torsion_poles.md) and [the torsionless EFT prescription](../1600-1699/1646_the_generated_curvature_terms_define_a_controlled_order_reduced_eft_but_not_a_new_fundamental_spectrum.md)

**Evidence:** [EFT envelope ledger](../../../evidence/data/spin23-torsion-inclusive-eft-envelope-v1.json) and [verifier](../../../verification/verify/verify_spin23_torsion_inclusive_eft_envelope.py)

## Result

All universal quadratic one-loop running directions are now known.  In the
frozen invariant basis define

\[
\beta_{\max}(a_1)=\max_i|\beta_i(a_1)|,
\]

where the maximum includes \(C^2,R^2\), all nine \((\nabla T)^2\)
coefficients and both \(R\nabla T\) coefficients.  For \(a_1\ge0\), exact
pairwise polynomial comparison gives

\[
\boxed{\beta_{\max}(a_1)
={99a_1^2+196a_1+113\over2304\pi^2}}
\]

and the dominant entry is \(|h^{TT}_9|\).  This is a conservative
basis envelope, not a field-redefinition-invariant operator norm.

For logarithm \(L=\log(\mu/\mu_0)\), a simple basis power-counting parameter
is

\[
\eta_{\rm basis}=\beta_{\max}|L|{E^2\over M_{\rm Pl}^2}.
\]

At \(a_1=2\), \(\beta_{\max}=901/(2304\pi^2)=0.03962\), so the
order-one diagnostic turnover is \(5.024M_{\rm Pl}\).  At \(a_1=4\) it is
\(3.027M_{\rm Pl}\), while a strict ten-percent, one-log cutoff is
\(0.957M_{\rm Pl}\).  Thus a Planck-scale conservative cutoff remains
perturbative over the displayed benchmark interval, with the strictness of
the bound made explicit rather than hidden in an order-one symbol.

## Kernel-invariant condition

Let \(K_2\) be the physical two-derivative quadratic kernel after constraints
and gauge reduction, \(B_4\) the complete four-derivative insertion, and
\(Z_{\min}\) the smallest positive eigenvalue of the normalized leading
kernel in the channel being studied.  A basis-independent sufficient
condition is

\[
\boxed{\kappa E^2|L|{\|B_4\|\over Z_{\min}}\ll1.}
\]

The coefficient maximum above supplies a reproducible first envelope; a
specific observable should use its actual projected norm and tree residue.

## Correct EFT use

The complete four-derivative shell must be inserted perturbatively and
order-reduced with the leading equations.  It must not be inverted as an
exact polynomial propagator.  In particular, the nonzero \(C^2\) running
would create an opposite-residue massive spin-two pole if the truncation
were extrapolated as a fundamental local action; that pole is not part of
the order-reduced EFT spectrum.

The universal running is now exhausted.  Predictions for scattering,
background evolution or torsion correlators additionally require a chosen
observable and finite Wilson coefficients at a matching scale.  Those are
UV matching data, not consequences of the sparse action.

## Reproduction

~~~powershell
python verification/verify/verify_spin23_torsion_inclusive_eft_envelope.py
~~~
