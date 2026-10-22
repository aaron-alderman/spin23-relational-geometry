# The Integrability Defect Has No Linear-Curvature Logarithmic Pole

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete mixed Einstein response through (RP^2)

**Depends on:** [the operator factorization](1668_the_mixed_curved_response_reduces_to_a_parallel_jet_trace_plus_an_integrability_defect.md) and [the inserted graviton coefficient](1669_the_inserted_graviton_heat_kernel_fixes_the_parallel_jet_einstein_piece.md)

**Evidence:** [integrability-defect ledger](../../../evidence/data/spin23-mixed-integrability-defect-v1.json) and [verifier](../../../verification/verify/verify_spin23_mixed_integrability_defect.mjs)

## Result

The curvature-integrability defect left open in claims 1668--1669 does not
contribute to the logarithmic pole at order (RP^2).  Keeping a general
axial source until after integration by parts shows that the defect is an
algebraic (O(RP)) insertion at the matching point.  Its cross term with
the factorized vertex leaves one massless graviton propagator and is
scaleless in dimensional regularization; its square begins at
(R^2P^2).

Therefore the inserted-graviton value in claim 1669 is the complete mixed
Einstein response through one curvature:

\[
\boxed{
\delta\xi_{R,h-p}+{1\over4}\delta\xi_{{\rm Ric},h-p}
={\kappa A\over48\pi^2\epsilon}.
}
\]

For the packet background (R=-12), the residual response of claim 1667 is

\[
\boxed{
E=-{\kappa A\over4\pi^2\epsilon}.
}
\]

The second Einstein background (R=-24) must give (2E).

## Exact general-source rearrangement

Let

\[
X=DP=\nabla_\mu P^\mu,
\qquad
(J_Ph)_\alpha={1\over2}hP_\alpha-h_{\alpha\mu}P^\mu.
\]

The source-linear kinetic vertex before imposing any jet condition is

\[
\mathcal L_{X,hPs}=b_X\left[
{h\over2}XDs+X\,\delta_hX[s]+Ds\,\delta_hX[P]
\right].
\]

The two identities

\[
\delta_hX[P]=DJ_Ph-{h\over2}X,
\]

and

\[
\delta_hX[s]=-h^{\mu\nu}\nabla_\mu s_\nu
-s_\nu F^\nu(h)
\]

give, on a compact boundaryless background,

\[
\boxed{
\mathcal L_{X,hPs}
=b_X\langle Ds,DJ_Ph\rangle
+b_X\langle s,W_Xh\rangle,
}
\]

where

\[
(W_Xh)^\nu=(\nabla_\mu X)h^{\mu\nu}
+{X\over2}\nabla^\nu h.
\]

Thus the exact mixed block is

\[
V_{sh}=K_sJ_P+b_XW_X,
\qquad
K_s=A I+b_XD^\dagger D.
\]

This identifies the previously unnamed integrability defect explicitly.

## Curvature counting at the matching point

Project onto the coefficient of a curvature invariant without source
derivatives by choosing

\[
\nabla P=0,
\qquad
\nabla_{(\mu}\nabla_{\nu)}P_\rho=0
\]

at the matching point.  Then (X=0), while commutation of the second jet
makes

\[
\nabla_\mu X=O(R_{\mu\nu}P^\nu).
\]

Consequently (W_X) is algebraic and already first order in curvature.
Expanding the mixed bubble gives

\[
\begin{aligned}
&-{1\over2}\operatorname{Tr}
\left[H_h^{-1}(K_sJ_P+b_XW_X)^\dagger
K_s^{-1}(K_sJ_P+b_XW_X)\right]\\
={}&-{1\over2}\operatorname{Tr}(H_h^{-1}J_P^\dagger K_sJ_P)\\
&-{b_X\over2}\operatorname{Tr}
\left[H_h^{-1}(J_P^\dagger W_X+W_X^\dagger J_P)\right]\\
&-{b_X^2\over2}\operatorname{Tr}
\left(H_h^{-1}W_X^\dagger K_s^{-1}W_X\right).
\end{aligned}
\]

The middle line is (O(RP^2)), but contains only the massless coincident
graviton resolvent at heat-kernel order (a_0).  Its momentum integral is
(\int d^dk/k^2), so it has no logarithmic pole in dimensional
regularization.  Taking the curvature correction of that resolvent would
raise it to (O(R^2P^2)).  The last line is already (O(R^2P^2)).

Hence neither defect term changes the response through one curvature.

## Remaining calculation

The mixed Einstein combination is now closed.  Only one independent number
is left: the traceless-Ricci response

\[
v=\delta\xi_{{\rm Ric},h-p}=P-E.
\]

It requires the algebraic inserted-graviton coefficient on the equal-scalar-
curvature product background in the packet's exponential split.  The
integrability defect need not be evaluated again at order (RP^2); the
remaining issue is the off-shell de Donder graviton endomorphism on
(H^2_{-2}\times H^2_{-4}).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_mixed_integrability_defect.mjs
~~~
