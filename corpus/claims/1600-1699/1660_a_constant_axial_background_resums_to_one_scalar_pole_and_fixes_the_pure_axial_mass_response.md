# A Constant Axial Background Resums to One Scalar Pole and Fixes the Pure-Axial Mass Response

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact constant-background determinant in the trace-reduced axial sector

**Depends on:** [the exact trace-reduced action](1658_exact_trace_elimination_gives_a_covariant_rational_axial_kinetic_factor.md) and [the reduced axial symbol](1659_the_reduced_axial_hessian_has_one_propagating_channel_and_a_directional_schur_boundary.md)

**Evidence:** [constant-background pole ledger](../../../evidence/data/spin23-constant-axial-background-pole-v1.json) and [verifier](../../../verification/verify/verify_spin23_constant_axial_background_pole.mjs)

## Result

The pure-axial part of the exact trace-reduced action is

\[
\mathcal L_{p,\rm red}={A\over2}p^2+{F(p^2)\over2}(Dp)^2,
\qquad
F(u)={b_XC_t\over C_t+4b_Xu/9}.
\]

Take a flat Euclidean, covariantly constant axial background \(\bar p\), so
\(D\bar p=0\), and write \(p=\bar p+s\).  Because the background divergence
vanishes, every variation of \(F\) multiplies at least two powers of the
fluctuation divergence.  The exact quadratic action is therefore

\[
\mathcal L^{(2)}={A\over2}s^2+{F(\bar p^2)\over2}(Ds)^2.
\]

The four-by-four Fourier determinant reduces to

\[
\boxed{
\det K=A^3\left[A+F(\bar p^2)k^2\right].
}
\]

Three transverse polarizations are algebraic.  Their contribution is a
scaleless multiplication determinant and vanishes in dimensional
regularization.  The entire background-dependent pole is consequently the
pole of one scalar determinant.

## Exact local pole

With \(d=4-2\epsilon\), the Euclidean convention
\(\Gamma^{(1)}=\tfrac12\operatorname{Tr}\log K\) gives

\[
\Gamma^{(1)}_{\rm pole}/\!\int d^4x
=-{A^2\over64\pi^2\epsilon\,F(\bar p^2)^2}.
\]

Subtracting the zero-background vacuum pole gives the exact expression

\[
\boxed{
{\Delta\Gamma^{(1)}_{\rm pole}\over\int d^4x}
=-{A^2\over64\pi^2\epsilon b_X^2}
\left[
\left(1+{4b_X\bar p^2\over9C_t}\right)^2-1
\right].
}
\]

This formula is exact in the constant background throughout the nonsingular
trace-reduction chart.  It terminates at \((\bar p^2)^2\) because the inverse
kinetic factor is affine in \(\bar p^2\).

The quadratic term is

\[
{\Delta\Gamma^{(1)}_{\rm pole}\over\int d^4x}
\supset -{A^2\over72\pi^2\epsilon b_XC_t}\,\bar p^2.
\]

Writing the quadratic EFT counter-response as
\(\tfrac12\delta A_{p\text{-loop}}\bar p^2\), the raw effective-action pole is

\[
\boxed{
\delta A_{p\text{-loop}}
=-{A^2\over36\pi^2\epsilon b_XC_t}
={A^2\lambda_4\over8\pi^2\epsilon b_X^3}.
}
\]

On the critical surface,

\[
\delta A_{p\text{-loop}}
={A^2\kappa\over24\pi^2\epsilon b_X(a_1+1)}.
\]

The MS-bar counterterm has the opposite sign to the displayed raw pole.

## What this does and does not fix

This is the complete one-loop mass response of the **pure reduced axial
block** on a constant flat background.  Claim 1662 subsequently evaluates
the only possible mixed metric--axial bubble and proves that it is scaleless
in dimensional regularization.  The displayed pole is therefore also the
complete trace-reduced flat \(\delta A\) response.

For a general frozen jet, claim 1659 similarly reduces the determinant to
one anisotropic scalar with kinetic tensor eigenvalues

\[
Z\quad\hbox{and}\quad
q_\perp=Z-{c^2\bar p^2\over\mu^2}
\quad\hbox{(multiplicity three)},
\]

so its frozen-coefficient pole is

\[
-{(\mu^2)^2\over64\pi^2\epsilon\sqrt{Zq_\perp^3}}.
\]

That expression alone is not a complete derivative response: derivatives
of the background-dependent coefficients contribute at the same derivative
order and can populate both \((Dp)^2\) and \(F_{\mu\nu}(p)^2\).  The constant
background result above avoids this ambiguity and fixes only the potential
response.

## Exhaustion boundary

All information obtainable from an exactly constant flat background has now
been extracted.  Further determination of
\((\delta B,\delta Z,\delta\xi_R,\delta\xi_{\rm Ric})\) requires the
covariant coupled metric--axial Hessian with nonconstant and curved source
backgrounds.  Freezing coefficients or setting \(D\bar p=0\) cannot supply
those four responses.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_constant_axial_background_pole.mjs
~~~
