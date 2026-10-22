# The Five-Response Axial Loop Programme Is Complete in the Reduced Bosonic Theory

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** terminal reduced-bosonic response-vector closure

**Depends on:** [the complete flat response](1665_the_mixed_polarization_closes_both_flat_derivative_responses.md), [the pure-axial curvature response](1666_the_minimal_scalar_heat_kernel_fixes_the_pure_axial_curvature_response.md), and [the complete mixed curvature response](1671_the_off_shell_product_heat_kernel_closes_both_mixed_curvature_responses.md)

**Evidence:** [five-response closure ledger](../../../evidence/data/spin23-complete-five-axial-response-vector-v1.json) and [verifier](../../../verification/verify/verify_spin23_complete_five_axial_response_vector.mjs)

## Result

The five background responses required to identify the quadratic axial EFT
have all been calculated in the trace-reduced Lagrangian bosonic theory.
In the packet's exponential split, de Donder gauge and dimensional
regularization convention, the raw one-loop effective-action poles are

\[
\boxed{
\begin{aligned}
\delta A
&={\kappa A^2\over24\pi^2\epsilon\,b_X(a_1+1)},\\[2mm]
\delta B
&=-{\kappa A\over24\pi^2\epsilon}
\left(6+{1\over a_1+1}\right),\\[2mm]
\delta Z&=0,\\[2mm]
\delta\xi_R
&=-{\kappa A\over\pi^2\epsilon}
\left({7\over96}+{1\over144(a_1+1)}\right),\\[2mm]
\delta\xi_{\rm Ric}
&={3\kappa A\over8\pi^2\epsilon}.
\end{aligned}
}
\]

Counterterms carry the opposite signs.

## Contribution ledger

The result decomposes into independently checked pure-axial and mixed
graviton--axial pieces:

| response | pure axial | mixed graviton--axial |
|---|---:|---:|
| \(\delta A\) | \(\kappa A^2/[24\pi^2\epsilon b_X(a_1+1)]\) | \(0\) |
| \(\delta B\) | \(-\kappa A/[24\pi^2\epsilon(a_1+1)]\) | \(-\kappa A/(4\pi^2\epsilon)\) |
| \(\delta Z\) | \(0\) | \(0\) |
| \(\delta\xi_R\) | \(-\kappa A/[144\pi^2\epsilon(a_1+1)]\) | \(-7\kappa A/(96\pi^2\epsilon)\) |
| \(\delta\xi_{\rm Ric}\) | \(0\) | \(3\kappa A/(8\pi^2\epsilon)\) |

The mixed curvature entries obey the two background checks

\[
\delta\xi_{R,h-p}+{1\over4}\delta\xi_{{\rm Ric},h-p}
={\kappa A\over48\pi^2\epsilon},
\]

and

\[
-12\delta\xi_{R,h-p}-2\delta\xi_{{\rm Ric},h-p}
={\kappa A\over8\pi^2\epsilon}.
\]

They therefore reproduce both the hyperbolic and product responses without
an underdetermined direction.

## Structural conclusions

Three features survive the complete calculation:

1. the transverse flat kinetic response vanishes, (\delta Z=0), after
   both pure and mixed loops are included;
2. the mixed flat mass response vanishes by inverse-kernel cancellation,
   but curvature makes the corresponding inserted graviton trace nonzero;
3. the Ricci-polarized response is entirely gravitational and is invisible
   to the isolated minimal pseudoscalar determinant.

The zero in (\delta Z) is a result at this loop and derivative order, not
an all-orders protection theorem.

## Terminal boundary

There is no remaining quadratic axial response to compute in the reduced
bosonic Lagrangian theory.  The next unresolved quantum object belongs to a
different layer:

\[
\Gamma_{\rm SC}^{(1)}
={1\over2}\operatorname{Tr}
\log\{\chi_A,\chi_B\}_{\rm complete}.
\]

The packet still lacks the complete field-dependent bracket operator for
all 34 second-class constraints.  Consequently the response vector above
must not be promoted to the complete off-shell critical-PGT beta functional
unless that determinant is supplied or an equivalent covariant BV/BFV
conversion is proved.  Further manipulation of the existing reduced
Hessian cannot reconstruct this independent measure input.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_complete_five_axial_response_vector.mjs
~~~
