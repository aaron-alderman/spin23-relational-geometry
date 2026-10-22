# The Flat Constant Background Closes One of the Five Axial Loop Responses

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete flat constant-background reduced-bosonic mass pole

**Depends on:** [the pure-axial mass pole](1660_a_constant_axial_background_resums_to_one_scalar_pole_and_fixes_the_pure_axial_mass_response.md) and [the exact metric--axial vertices](1661_the_constant_axial_metric_vertices_split_into_harmonic_gauge_and_physical_stress_mixings.md)

**Evidence:** [mixed-bubble ledger](../../../evidence/data/spin23-flat-constant-axial-mixed-bubble-v1.json) and [verifier](../../../verification/verify/verify_spin23_flat_constant_axial_mixed_bubble.mjs)

## Result

On a flat constant axial background, the complete metric correction to the
quadratic axial potential reduces to one mixed graviton--axial bubble.  Every
metric seagull is a massless one-propagator tadpole and vanishes in
dimensional regularization.  Ghost, ordinary-Jacobian and second-class
measure poles are already zero under axial source differentiation.

The remaining bubble can be evaluated exactly.  Combining it with the
pure-axial determinant closes the flat mass response \(\delta A\), the first
of the five quadratic axial loop responses.

## Propagators and vertices

For the Einstein normalization

\[
S_{\rm EH}={1\over2\kappa}\int\sqrt g\,R,
\]

the dimensionless exponential metric fluctuation has the flat de Donder
propagator

\[
G_{h\,\mu\nu,\rho\sigma}(k)
={4\kappa\over k^2}P_{\mu\nu,\rho\sigma},
\]

where

\[
P_{\mu\nu,\rho\sigma}
={1\over2}(\delta_{\mu\rho}\delta_{\nu\sigma}
+\delta_{\mu\sigma}\delta_{\nu\rho})
-{1\over d-2}\delta_{\mu\nu}\delta_{\rho\sigma}.
\]

The zero-background axial propagator is

\[
G_s={P_T\over A}+{P_L\over A+b_Xk^2}.
\]

The source-linear mixed vertex is \(V=V_A+V_X\), with

\[
(V_A)_{\mu\nu,\alpha}
={A\over2}\left[
\delta_{\mu\nu}\bar p_\alpha
-\bar p_\mu\delta_{\nu\alpha}
-\bar p_\nu\delta_{\mu\alpha}
\right],
\]

\[
(V_X)_{\mu\nu,\alpha}
={b_X\over2}k_\alpha\left[
k_\mu\bar p_\nu+k_\nu\bar p_\mu
-(k\cdot\bar p)\delta_{\mu\nu}
\right].
\]

These are precisely the algebraic stress mixing and harmonic-gauge mixing
of claim 1661.

## Exact bubble reduction

Choose the momentum direction as the longitudinal axial direction.  For
each transverse axial component,

\[
V_APV_A={A^2\bar p^2\over2}.
\]

For the longitudinal component the two vertices are antiparallel in
symmetric-tensor space, giving

\[
(V_A+V_X)P(V_A+V_X)
={(b_Xk^2-A)^2\bar p^2\over2}.
\]

Consequently, before integration,

\[
\operatorname{tr}(G_hVG_sV^\dagger)
={4\kappa\bar p^2\over2k^2}
\left[
A(d-1)+{(b_Xk^2-A)^2\over A+b_Xk^2}
\right].
\]

Polynomial division separates this into scaleless terms plus

\[
\left.\operatorname{tr}(G_hVG_sV^\dagger)\right|_{\rm massive}
=-{8\kappa A b_X\bar p^2\over A+b_Xk^2}.
\]

Because the off-diagonal block occurs twice in the Hessian trace, its
quadratic one-loop coefficient is

\[
-{1\over2}\operatorname{Tr}(G_hVG_sV^\dagger).
\]

Using

\[
\int{d^{4-2\epsilon}k\over(2\pi)^{4-2\epsilon}}
{1\over A+b_Xk^2}
\bigg|_{\rm pole}
=-{A\over16\pi^2\epsilon b_X^2},
\]

the raw effective-action pole is

\[
{\Gamma^{(1)}_{h-p,\rm pole}\over\int d^4x}
=-{\kappa A^2\over4\pi^2\epsilon b_X}\bar p^2.
\]

Therefore

\[
\boxed{
\delta A_{h-p}=-{\kappa A^2\over2\pi^2\epsilon b_X}.
}
\]

## Completed flat mass response

Adding the pure-axial result of claim 1660 gives

\[
\boxed{
\delta A_{\rm red,flat}
=-{A^2\over36\pi^2\epsilon b_XC_t}
-{\kappa A^2\over2\pi^2\epsilon b_X}.
}
\]

On the critical surface
\(C_t=-2(a_1+1)/(3\kappa)\), this is

\[
\boxed{
\delta A_{\rm red,flat}
={\kappa A^2\over24\pi^2\epsilon b_X}
\left({1\over a_1+1}-12\right).
}
\]

These are raw effective-action poles; MS-bar counterterms carry the opposite
sign.  The result is tied to the packet's exponential split and de Donder
gauge, as an off-shell Wilson coefficient must be.

## Scope and new frontier

This closes \(\delta A\) in the trace-reduced bosonic theory on the flat
constant-background projection.  No tensor-torsion insertion survives at
this source order when \(\bar X=0\), and the trace channel is already included
through exact elimination.

The remaining response vector is

\[
(\delta B,\delta Z,\delta\xi_R,\delta\xi_{\rm Ric}).
\]

Those four entries require nonconstant and/or curved backgrounds.  Their
calculation cannot reuse the constant-background bubble because derivatives
of the background-dependent Schur coefficients and curvature endomorphisms
enter at the same order.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_flat_constant_axial_mixed_bubble.mjs
~~~
