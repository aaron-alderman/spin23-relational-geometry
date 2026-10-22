# Only Two Curved Responses Remain after Flat and Pure-Axial Subtraction

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact residual matching inverse and reduced execution boundary

**Depends on:** [the complete flat response](1665_the_mixed_polarization_closes_both_flat_derivative_responses.md), [the pure-axial curvature response](1666_the_minimal_scalar_heat_kernel_fixes_the_pure_axial_curvature_response.md), and [the compact background suite](1648_compact_hyperbolic_and_product_backgrounds_make_the_five_response_axial_protocol_executable.md)

**Evidence:** [two-response residual ledger](../../../evidence/data/spin23-two-curved-response-residual-inverse-v1.json) and [verifier](../../../verification/verify/verify_spin23_two_curved_response_residual_inverse.mjs)

## Result

The original five-response matching problem has reduced to two genuinely
unknown curved numbers.  The flat calculation fixes

\[
(\delta A,\delta B,\delta Z),
\]

and the pure axial heat kernel fixes

\[
\delta\xi_{R,p},\qquad \delta\xi_{{\rm Ric},p}=0.
\]

Only the mixed graviton--axial curvature coefficients

\[
u\equiv\delta\xi_{R,h-p},
\qquad
v\equiv\delta\xi_{{\rm Ric},h-p}
\]

remain.

They are reconstructed from one Einstein response and one product-background
polarization.  The second Einstein curvature of the original suite becomes
a consistency check rather than an independent input.

## Residual responses

Let \(M_E\) be the one-loop algebraic axial response on an Einstein
background with scalar curvature \(R_E\), and let \(M_P\) be the response on
a product background with scalar curvature \(R_P\) and selected Ricci
eigenvalue \(r_P\).  Subtract the already known pieces:

\[
E=M_E-\delta A-R_E\delta\xi_{R,p},
\]

\[
P=M_P-\delta A-R_P\delta\xi_{R,p}.
\]

Then

\[
E=R_E\left(u+{v\over4}\right),
\qquad
P=R_Pu+r_Pv.
\]

For

\[
R_E\ne0,
\qquad
d_P\equiv r_P-{R_P\over4}\ne0,
\]

the exact inverse is

\[
q_{\rm mix}\equiv u+{v\over4}={E\over R_E},
\]

\[
\boxed{
v={P-R_Pq_{\rm mix}\over d_P},
\qquad
u=q_{\rm mix}-{v\over4}.
}
\]

## Packet background simplification

The chosen backgrounds satisfy

\[
R_E=R_P=-12,
\qquad r_P=-2,
\qquad d_P=1.
\]

Therefore

\[
\boxed{
v=P-E,
\qquad
u=-{E\over12}-{P-E\over4}.
}
\]

Because the two backgrounds have equal scalar curvature, their difference
cancels \(\delta A\), the known pure \(R P^2\) term, and the mixed scalar
curvature term.  It isolates the mixed traceless-Ricci response directly:

\[
\boxed{
\delta\xi_{{\rm Ric},h-p}=M_P-M_E.
}
\]

The second hyperbolic background with \(R=-24\) tests the predicted linear
curvature scaling:

\[
M_{E,2}-\delta A-R_2\delta\xi_{R,p}
={R_2\over R_E}E=2E.
\]

Failure of this identity signals omitted higher-curvature terms, an
inconsistent weak-curvature extraction, or an error in the Hessian trace.

## Final executable boundary

The remaining loop calculation need emit only:

1. the quadratic axial mass response on the \(R=-12\) compact hyperbolic
   background; and
2. the response for an axial polarization tangent to the \(k=-2\) factor of
   the \(H^2_{-2}\times H^2_{-4}\) compact product.

The formulas above reconstruct both missing Wilson coefficients.  No further
flat diagram, rank calculation, or additional background is needed.  Actual
values still require the covariant mixed graviton--axial heat-kernel trace;
that trace is the present irreducible input.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_two_curved_response_residual_inverse.mjs
~~~
