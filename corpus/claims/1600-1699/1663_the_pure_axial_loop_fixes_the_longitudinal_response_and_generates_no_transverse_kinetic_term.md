# The Pure Axial Loop Fixes the Longitudinal Response and Generates No Transverse Kinetic Term

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete pure-axial quadratic response through two derivatives

**Depends on:** [the exact reduced axial action](1658_exact_trace_elimination_gives_a_covariant_rational_axial_kinetic_factor.md) and [the pure-axial mass pole](1660_a_constant_axial_background_resums_to_one_scalar_pole_and_fixes_the_pure_axial_mass_response.md)

**Evidence:** [pure-axial response ledger](../../../evidence/data/spin23-pure-axial-two-derivative-loop-response-v1.json) and [verifier](../../../verification/verify/verify_spin23_pure_axial_two_derivative_loop_response.mjs)

## Result

A direct background-field contraction, rather than a frozen-coefficient
approximation, determines the complete one-loop contribution of the pure
trace-reduced axial block to the flat quadratic response through two
derivatives.  It gives

\[
\boxed{
\delta A_{p\text{-loop}}
={A^2\lambda_4\over8\pi^2\epsilon b_X^3},
\qquad
\delta B_{p\text{-loop}}
=-{A\lambda_4\over8\pi^2\epsilon b_X^2},
\qquad
\delta Z_{p\text{-loop}}=0.
}
\]

The first entry agrees with the independent constant-background determinant
of claim 1660.  The second and third entries are new.

## Direct contraction

At quadratic order in a general flat background \(P_\mu\), the only
interaction needed is

\[
\mathcal L_4=\lambda_4p^2(Dp)^2.
\]

Writing \(p=P+s\), its terms quadratic in the quantum fluctuation are

\[
\mathcal L_4^{(2)}=\lambda_4\left[
P^2(\partial\cdot s)^2
+4(P\cdot s)(\partial\cdot P)(\partial\cdot s)
+(\partial\cdot P)^2s^2
\right].
\]

The free axial propagator is

\[
G_{\mu\nu}(k)={P^T_{\mu\nu}\over A}
+{P^L_{\mu\nu}\over A+b_Xk^2}.
\]

The three coincident contractions are

\[
\left\langle(\partial\cdot s)^2\right\rangle
=\int_k{k^2\over A+b_Xk^2},
\]

\[
\left\langle s_\mu\partial\cdot s\right\rangle
=\int_k{ik_\mu\over A+b_Xk^2}=0,
\]

and

\[
\langle s^2\rangle
=\int_k\left[{d-1\over A}+{1\over A+b_Xk^2}\right].
\]

The algebraic transverse terms and polynomial pieces are scaleless.  In
\(d=4-2\epsilon\),

\[
\int_k{1\over A+b_Xk^2}\bigg|_{\rm pole}
=-{A\over16\pi^2\epsilon b_X^2},
\]

\[
\int_k{k^2\over A+b_Xk^2}\bigg|_{\rm pole}
=+{A^2\over16\pi^2\epsilon b_X^3}.
\]

Therefore

\[
{\Gamma^{(1)}_{p,\rm pole}\over\int d^4x}
=\lambda_4\left[
{A^2\over16\pi^2\epsilon b_X^3}P^2
-{A\over16\pi^2\epsilon b_X^2}(\partial\cdot P)^2
\right].
\]

Matching to
\(\tfrac12\delta A P^2+\tfrac12\delta B(\partial\cdot P)^2
+\tfrac14\delta ZF_{\mu\nu}(P)^2\) yields the boxed result.

## Critical-surface form

Using

\[
\lambda_4=-{2b_X^2\over9C_t}
={\kappa b_X^2\over3(a_1+1)},
\]

the longitudinal pole is

\[
\boxed{
\delta B_{p\text{-loop}}
={A\over36\pi^2\epsilon C_t}
=-{\kappa A\over24\pi^2\epsilon(a_1+1)}.
}
\]

The vanishing transverse response is structural at this loop order: the
quartic interaction contains only the divergence of the quantum axial field,
and its sole one-derivative coincident contraction is odd in loop momentum.
It is not a statement that the full PGT value of \(\delta Z\) vanishes;
metric--axial loops can still populate it.

## Updated frontier

The pure reduced-axial block is now exhausted through quadratic background
order and two derivatives.  Its contributions to \((\delta A,\delta B,
\delta Z)\) are all fixed.  Completing the flat derivative responses
requires the external-momentum expansion of the mixed graviton--axial
bubble.  Curved backgrounds are still required for
\((\delta\xi_R,\delta\xi_{\rm Ric})\).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pure_axial_two_derivative_loop_response.mjs
~~~
