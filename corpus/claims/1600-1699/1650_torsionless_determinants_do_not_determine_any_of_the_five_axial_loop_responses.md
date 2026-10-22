# Torsionless Determinants Do Not Determine Any of the Five Axial Loop Responses

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** source-order readiness audit and exact exhaustion boundary

**Depends on:** [the exact response inverse](1649_the_five_axial_responses_have_an_exact_closed_form_inverse.md), [the torsionless axial determinant](1643_the_curved_axial_connection_determinant_reduces_exactly_to_one_minimal_pseudoscalar.md), and [the torsionless constraint measure](1644_the_complete_massive_0minus_constraint_measure_is_ultralocal_on_the_torsionless_background.md)

**Evidence:** [source-order ledger](../../../evidence/data/spin23-torsionful-loop-source-order-readiness-v1.json) and [verifier](../../../verification/verify/verify_spin23_torsionful_loop_source_order_readiness.mjs)

## Result

The observable, background suite and inverse matching map are complete, but
the repository cannot yet produce even one of the five one-loop axial
response coefficients. The obstruction is now exact: every determinant is
known only at zero axial background, whereas a quadratic response needs its
first and second axial-source derivatives.

Consequently the torsionless result “Einstein gravity plus one minimal
pseudoscalar determinant” fixes curvature-only poles but determines none of

\[
(\delta A,\delta B,\delta Z,\delta\xi_R,\delta\xi_{\rm Ric}).
\]

Assigning any of these five values from the existing torsionless determinant
would be an unsupported extrapolation.

## Exact source expansion

Introduce a book-keeping parameter \(\varepsilon\) for the selected axial
background/source and write any operator block as

\[
H(\varepsilon)=H_0+\varepsilon H_1+\varepsilon^2H_2+O(\varepsilon^3),
\qquad G=H_0^{-1}.
\]

Then

\[
\operatorname{Tr}\log H(\varepsilon)
=\operatorname{Tr}\log H_0
+\varepsilon\operatorname{Tr}(GH_1)
+\varepsilon^2\left[
\operatorname{Tr}(GH_2)
-{1\over2}\operatorname{Tr}(GH_1GH_1)
\right]+O(\varepsilon^3).
\]

The statistics-dependent prefactor multiplies the whole expression. Thus
\(H_0\), even when its determinant is known exactly, contains neither term
needed for the quadratic response.

## Four required sectors

The expansion must be supplied consistently for:

1. the gauge-fixed coframe/connection bosonic Hessian;
2. the diffeomorphism and any non-algebraic ghost operators induced by the
   frozen BRST gauge fermion;
3. the complete second-class bracket operator entering the
   Faddeev--Senjanovic factor; and
4. source-dependent measure and irreducible-decomposition Jacobians.

For each sector, both \(H_1\) and \(H_2\) (or the corresponding bracket or
Jacobian derivatives) are required. This gives eight source-derivative
objects. The repository presently contains zero of the eight in packet-v1
conventions.

The torsionless constraint factorization

\[
\det\Delta_0=\det A_0(\det E_0)^2
\]

does not prove the same cancellation after source variation. In particular,
the torsion-dependent variations of the blocks and of the canonical density
\(J\) must be retained before deciding whether this sector contributes to
\(S^2\), \(RS^2\), or derivative torsion operators.

## Minimal executable next payload

No new phenomenological choice is needed. The next calculation must emit:

- \(H_{B,1}\) and \(H_{B,2}\) for the full mixed coframe/connection block;
- \(H_{{\rm gh},1}\) and \(H_{{\rm gh},2}\) from the same BRST fermion;
- \(\Delta_{{\rm SC},1}\) and \(\Delta_{{\rm SC},2}\) for the complete
  34-constraint matrix; and
- the first two axial variations of every retained measure Jacobian.

Those objects are then inserted into the trace formula on the three
backgrounds of claim 1648, projected onto the five responses, and passed
through the exact inverse of claim 1649.

## Exhaustion statement

The matching problem has been driven to its next irreducible input. Further
rank algebra, torsionless heat-kernel reuse, or scalar-dual manipulation
cannot determine the missing responses. Progress now requires a genuinely
new torsionful background-field expansion (or equivalent canonical/BV
calculation), not another inference from the zero-source determinant.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_torsionful_loop_source_order_readiness.mjs
~~~
