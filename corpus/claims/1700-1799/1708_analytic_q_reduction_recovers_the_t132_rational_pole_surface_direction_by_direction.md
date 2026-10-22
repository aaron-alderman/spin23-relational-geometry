# Analytic q Reduction Recovers the t132 Rational Pole Surface Direction by Direction

**Status:** certified analytic-momentum and rational-asymptotic reconstruction

**Depends on:** [the converged coupling scan](1707_the_t132_pole_surface_is_numerically_a_b_independent_quadratic_in_a1.md)

**Evidence:** [analytic-q ledger](../../../evidence/data/spin23-t132-analytic-q-asymptotic-v1.json), [joint surface verifier](../../../verification/verify/verify_spin23_t132_coupling_surface.py), and [analytic-q scan](../../../verification/verify/scan_spin23_t132_analytic_q.py)

The external-momentum finite difference can be removed completely.  Every
source vertex and shifted inverse Hessian is quadratic in \(q\), with maximum
four-node reconstruction residual \(1.93\times10^{-15}\).  Writing

\[
 M(q)=M_0+qM_1+q^2M_2
\]

gives the inverse coefficients

\[
 G_1=-G_0M_1G_0,\qquad
 G_2=G_0M_1G_0M_1G_0-G_0M_2G_0,
\]

so the \(q^2\) trace coefficient follows by a finite convolution of the
matrix Taylor coefficients.

After radial extraction and an independent \(B\to\infty\) extrapolation, the
four angular-cubature directions reconstruct as

\[
\begin{aligned}
c_0&=(45a_1^2+28a_1-11)/72,\\
c_1&=(-54a_1^2-51a_1+7)/144,\\
c_2&=(30a_1^2+17a_1-9)/48,\\
c_3&=(-27a_1^2-19a_1+10)/72.
\end{aligned}
\]

The largest directional residual is \(5.89\times10^{-6}\).  Applying the
exact weights \((1/6,1/3,1/3,1/6)\) yields

\[
 \boxed{h^{TT}_1(a_1)=
 \frac{18a_1^2+3a_1-7}{4608\pi^2\epsilon}}.
\]

This result is now independent of any external-momentum step size and is
recovered separately in every angular direction.  An exact symbolic radial
series would strengthen the certificate, but it is no longer the
highest-impact executable node.  The selected path advances the same
analytic-q engine to the other six flat response profiles.

## Reproduction

~~~powershell
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' verification/verify/verify_spin23_t132_coupling_surface.py
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' verification/verify/scan_spin23_t132_analytic_q.py
~~~
