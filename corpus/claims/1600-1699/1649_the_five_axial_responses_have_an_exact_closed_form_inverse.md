# The Five Axial Responses Have an Exact Closed-Form Inverse

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact reconstruction certificate for the quadratic axial EFT

**Depends on:** [the full-rank response protocol](1647_one_pseudoscalar_correlator_has_rank_two_but_five_responses_identify_the_quadratic_axial_eft.md) and [its compact background suite](1648_compact_hyperbolic_and_product_backgrounds_make_the_five_response_axial_protocol_executable.md)

**Evidence:** [inverse-map ledger](../../../evidence/data/spin23-axial-torsion-response-inverse-v1.json) and [verifier](../../../verification/verify/verify_spin23_axial_torsion_response_inverse.mjs)

## Result

The five-response protocol does more than pass a rank test. It has a simple
closed-form inverse that reconstructs every coefficient in

\[
\theta=(A,B,Z,\xi_R,\xi_{\rm Ric}).
\]

Write the measured responses as

\[
y=(B_{\rm obs},M_1,M_2,Z_{\rm obs},M_3),
\]

where

\[
M_i=A+R_i\xi_R+{R_i\over4}\xi_{\rm Ric}\quad(i=1,2),
\]

and the product-background response is

\[
M_3=A+R_3\xi_R+r_\parallel\xi_{\rm Ric}.
\]

For

\[
R_1\ne R_2,
\qquad
d_3\equiv r_\parallel-{R_3\over4}\ne0,
\]

the exact inverse is

\[
B=B_{\rm obs},\qquad Z=Z_{\rm obs},
\]

\[
q\equiv\xi_R+{1\over4}\xi_{\rm Ric}
={M_2-M_1\over R_2-R_1},
\]

\[
A=M_1-R_1q,
\]

\[
\xi_{\rm Ric}={M_3-A-R_3q\over d_3},
\qquad
\xi_R=q-{1\over4}\xi_{\rm Ric}.
\]

Thus the only geometric singularities are exactly those already exposed by
the design determinant: coincident Einstein curvatures or a product
polarization with no traceless-Ricci component.

## Witness reconstruction

For the explicit suite

\[
(R_1,R_2,R_3,r_\parallel)=(-12,-24,-12,-2)
\]

and the rational witness

\[
(A,B,Z,\xi_R,\xi_{\rm Ric})=(5,2,3,7,11),
\]

the five responses are

\[
y=(2,-112,-229,3,-101).
\]

The inverse returns the witness exactly. The accompanying verifier also
checks deterministic floating-point trials over nonsingular geometries.

## Interpretation

This closes the algebraic matching problem for the complete quadratic axial
subspace through two source derivatives and one curvature. A future loop
calculation may emit the five response coefficients directly; no symbolic
five-by-five solve or basis-dependent fit is then needed.

This does not supply those loop coefficients. The remaining hard boundary is
the packet-v1 torsionful nonminimal Hessian and heat-kernel/form-factor
calculation on the specified backgrounds.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_torsion_response_inverse.mjs
~~~
