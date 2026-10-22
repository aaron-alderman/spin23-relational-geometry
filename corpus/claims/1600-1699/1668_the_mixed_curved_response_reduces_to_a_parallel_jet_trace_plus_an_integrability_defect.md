# The Mixed Curved Response Reduces to a Parallel-Jet Trace plus an Integrability Defect

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact covariant operator reduction; identifies the irreducible local heat-kernel insertion

**Depends on:** [the explicit flat mixed vertex](1664_the_flat_derivative_responses_reduce_to_one_explicit_mixed_polarization_tensor.md) and [the two-response residual inverse](1667_only_two_curved_responses_remain_after_flat_and_pure_axial_subtraction.md)

**Evidence:** [operator-reduction ledger](../../../evidence/data/spin23-mixed-curved-operator-reduction-v1.json) and [verifier](../../../verification/verify/verify_spin23_mixed_curved_operator_reduction.mjs)

## Result

The remaining graviton--axial response is not an unspecified curved version
of the flat bubble.  Its source-linear block has an exact covariant
factorization at vanishing first axial jet.  This factorization cancels all
of the apparent nonminimal divergence-channel seagull against the
corresponding part of the mixed bubble.  What remains is

1. one algebraic graviton resolvent trace; and
2. a curvature integrability defect generated when the local zero-first-jet
   condition is extended to second order.

The second term cannot be obtained by pretending that the background axial
one-form is globally covariantly constant.  No nonzero parallel one-form
exists on either curved matching background used by the packet.

## Exact first-jet factorization

For a background one-form (P_\mu), define the maps from symmetric tensors
to one-forms and scalars

\[
(J_P h)_\alpha={1\over2}hP_\alpha-h_{\alpha\mu}P^\mu,
\qquad
Q_P h=P^\mu\left(\nabla^\nu h_{\mu\nu}-{1\over2}\nabla_\mu h\right),
\]

and let (D s=\nabla_\mu s^\mu).  Direct differentiation gives

\[
\boxed{
D J_P=-Q_P+E_P,
}
\]

where

\[
E_P(h)={1\over2}h\,\nabla\!\cdot P
-h^{\mu\nu}\nabla_\mu P_\nu.
\]

At a matching point one may choose the first source jet to vanish,
(\nabla_\mu P_\nu=0).  There (E_P=0) and (Q_P=-D J_P).
The source-linear mixed action is then

\[
\begin{aligned}
S_{hs}^{(2)}
&=A\langle s,J_Ph\rangle-b_X\langle Ds,Q_Ph\rangle\\
&=\langle s,(A I+b_XD^\dagger D)J_Ph\rangle.
\end{aligned}
\]

Thus, with

\[
K_s=A I+b_XD^\dagger D,
\]

the mixed Hessian block factors as

\[
\boxed{V_{sh}=K_sJ_P}
\]

at zero first jet.  This is the covariant form of the inverse-kernel
cancellation seen at zero momentum in flat space.

## Seagull and bubble cancellation

At the same point, the complete source-quadratic metric terms from the
two-derivative reduced action are

\[
S_{hh,P^2}^{(2)}={A\over4}\langle J_Ph,J_Ph\rangle
+{b_X\over2}\langle Q_Ph,Q_Ph\rangle.
\]

If (H_h) denotes the source-free packet graviton Hessian, these terms add

\[
U_{hh}={A\over2}J_P^\dagger J_P+b_XQ_P^\dagger Q_P
\]

to its quadratic operator.  The source-quadratic one-loop expression is

\[
{1\over2}\operatorname{Tr}(H_h^{-1}U_{hh})
-{1\over2}\operatorname{Tr}
\left(H_h^{-1}V_{hs}^\dagger K_s^{-1}V_{sh}\right).
\]

Using (V_{sh}=K_sJ_P) and (Q_P=-DJ_P), the frozen-first-jet part reduces
exactly to

\[
\boxed{
\Gamma^{(1)}_{h-p,\,P^2}\big|_{\text{parallel jet}}
=-{A\over4}\operatorname{Tr}
\left(H_h^{-1}J_P^\dagger J_P\right).
}
\]

All (b_XQ_P^\dagger Q_P) terms cancel.  In flat dimensional
regularization the remaining coincident massless graviton trace is
scaleless, reproducing \(\delta A_{h-p}=0\).  On a curved background its
first heat-kernel coefficient supplies a genuine curvature term.

## Why the parallel-source shortcut is invalid

A nonzero one-form that is parallel on a neighbourhood must obey

\[
0=[\nabla_\mu,\nabla_\nu]P_\rho
=R_{\rho\sigma\mu\nu}P^\sigma.
\]

For four-dimensional constant sectional curvature (K\ne0), contraction
of this equation implies (P=0).  On
(H^2_{-2}\times H^2_{-4}), each factor also has nonzero sectional
curvature, so the curvature action on one-forms again has trivial common
kernel.  Consequently neither required response can be computed by putting
a nonzero globally parallel (P) into an ordinary determinant.

The local matching prescription (\nabla P=0) at one point is valid, but
the antisymmetric second jet is fixed by curvature:

\[
\nabla_{[\mu}\nabla_{\nu]}P_\rho
={1\over2}R_{\rho\sigma\mu\nu}P^\sigma.
\]

When derivatives in (K_sJ_P) are commuted into canonical order, this
second-jet term produces the missing integrability-defect insertion.  It is
of exactly the required order (RP^2) and can distinguish
(RP^2) from (R_{\mu\nu}P^\mu P^\nu).

## Sharpened execution boundary

The two unknown coefficients no longer require constructing a new
34-component Hessian.  They require one local covariant-symbol calculation
for the already reduced pair ((H_h,K_s)):

\[
-{A\over4}\operatorname{Tr}(H_h^{-1}J_P^\dagger J_P)
+\Gamma_{\rm int}[R_{\rho\sigma\mu\nu}P^\sigma],
\]

including the curvature endomorphism of the packet de Donder graviton and
the commutator insertion (\Gamma_{\rm int}).  An ordinary minimal
determinant coefficient by itself is insufficient; the needed datum is a
heat kernel with one (J_P^\dagger J_P) insertion plus the two-resolvent
commutator form factor.

Evaluating that local insertion on the (R=-12) hyperbolic jet and on a
one-form tangent to the (k=-2) product factor emits the two response
numbers used by claim 1667.  Until that inserted coefficient is derived,
assigning numerical values to
(\delta\xi_{R,h-p}) or (\delta\xi_{{\rm Ric},h-p}) would omit a term of
the same derivative order.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_mixed_curved_operator_reduction.mjs
~~~
