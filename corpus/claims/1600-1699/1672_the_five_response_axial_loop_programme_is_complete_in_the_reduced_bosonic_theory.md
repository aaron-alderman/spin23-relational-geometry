# The Five-Response Axial Loop Programme Is Complete in the Reduced Bosonic Theory

> **Completion note (claim 1673):** the primary Hamiltonian source lists all
> nonzero brackets and proves that the complete massive-branch
> Faddeev--Senjanovic determinant is ultralocal for general field values, not
> only on the torsionless slice.  Its axial-source functional logarithm is
> proportional to \(\delta^{(d)}(0)\) and vanishes in the frozen dimensional
> scheme.  Claim 1673 therefore promotes the response vector below from
> reduced-bosonic closure to the complete packet axial response.

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete packet one-loop quadratic axial-response closure

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

There is no remaining quadratic axial response to compute in the packet.
Claim 1673 proves that the complete 34-constraint Faddeev--Senjanovic
determinant is ultralocal throughout the connected massive branch and has no
dimensional-regularization logarithmic pole.  It therefore cannot alter any
entry above.

The next unresolved quantum object belongs to a broader operator layer: the
unquotiented beta functional for non-axial torsion and curvature invariants.
The five coefficients above are projections of that functional, not a
replacement for it.  In particular, converting the curvature--axial
responses into the eight normal coordinates of claim 1639 requires the
explicit Cartan-invariant expansion and its topological, BRST and
field-redefinition quotient.  Further axial-source projections cannot supply
that missing coupling Jacobian.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_complete_five_axial_response_vector.mjs
~~~
