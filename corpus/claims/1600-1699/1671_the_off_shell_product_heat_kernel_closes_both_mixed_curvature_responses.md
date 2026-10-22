# The Off-Shell Product Heat Kernel Closes Both Mixed Curvature Responses

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete reduced-bosonic quadratic axial response through one curvature

**Depends on:** [the complete Einstein mixed response](1670_the_integrability_defect_has_no_linear_curvature_logarithmic_pole.md) and [the residual inverse](1667_only_two_curved_responses_remain_after_flat_and_pure_axial_subtraction.md)

**Evidence:** [product-response ledger](../../../evidence/data/spin23-off-shell-product-curvature-response-v1.json) and [verifier](../../../verification/verify/verify_spin23_off_shell_product_curvature_response.mjs)

## Result

The last unknown reduced-bosonic response is fixed by the packet's
exponential-split graviton Hessian on
(H^2_{-2}\times H^2_{-4}).  For a unit axial polarization tangent to the
(k=-2) factor, the inserted graviton heat-kernel contraction is

\[
\boxed{C_P=-1.}
\]

It gives the product residual

\[
\boxed{P={\kappa A\over8\pi^2\epsilon}.}
\]

Together with the Einstein residual from claim 1670,

\[
E=-{\kappa A\over4\pi^2\epsilon},
\]

the exact inverse of claim 1667 yields

\[
\boxed{
\delta\xi_{{\rm Ric},h-p}
={3\kappa A\over8\pi^2\epsilon},
\qquad
\delta\xi_{R,h-p}
=-{7\kappa A\over96\pi^2\epsilon}.
}
\]

Adding the pure-axial result gives the complete trace-reduced bosonic pair

\[
\boxed{
\begin{aligned}
\delta\xi_R
&=-{\kappa A\over\pi^2\epsilon}
\left({7\over96}+{1\over144(a_1+1)}\right),\\
\delta\xi_{\rm Ric}
&={3\kappa A\over8\pi^2\epsilon}.
\end{aligned}
}
\]

These are raw one-loop effective-action poles.  Counterterms carry the
opposite sign.

## General de Donder quadratic form

Write the source-free Einstein--Hilbert action as

\[
S_{\rm EH}={1\over2\kappa}\int\sqrt g\,(R-2\Lambda)
\]

before Euclidean continuation, and retain the packet de Donder gauge.  For
a linear metric split, the curvature-dependent part of the gauge-fixed
quadratic density is

\[
\begin{aligned}
Q_{\rm lin}(h)={}&
-{1\over4}(2\Lambda-R)h_{\mu\nu}h^{\mu\nu}
+{1\over8}(2\Lambda-R)h^2\\
&-{1\over2}
\left(h^{\mu\lambda}h_\lambda{}^\nu-hh^{\mu\nu}\right)R_{\mu\nu}
-{1\over2}h^{\mu\lambda}h^{\nu\rho}R_{\mu\nu\lambda\rho}.
\end{aligned}
\]

The packet does not use a linear split.  Since

\[
g'_{\mu\nu}=g_{\mu\rho}(e^h)^\rho{}_{\nu}
=g_{\mu\nu}+h_{\mu\nu}+{1\over2}(h^2)_{\mu\nu}+O(h^3),
\]

the exponential coordinate adds the equation-of-motion term

\[
Q_{\rm exp}(h)=Q_{\rm lin}(h)
+{1\over2}\mathcal E_{\mu\nu}(h^2)^{\mu\nu},
\]

where

\[
\mathcal E_{\mu\nu}
=R_{\mu\nu}-{1\over2}Rg_{\mu\nu}+\Lambda g_{\mu\nu}.
\]

This shift vanishes on the Einstein matching background, but not on the
product background.  Omitting it would implement a different field
coordinate and changes the Ricci-polarized answer.

## Inserted coefficient without an operator-index ambiguity

Let (P_{\rm DW}) be the four-dimensional DeWitt inverse appearing in the
packet propagator and define, for each output one-form index (lambda),

\[
y^{(\lambda)}_{\mu\nu}
=(P_{\rm DW})_{\mu\nu,\alpha\beta}
J_\lambda{}^{\alpha\beta}.
\]

The curvature coefficient of the inserted coincident graviton propagator
can be evaluated directly from the quadratic form:

\[
\boxed{
C(P)={R\over6}
J_\lambda P_{\rm DW}J^\lambda
-4\sum_\lambda Q_{\rm exp}(y^{(\lambda)}).
}
\]

This formula is the first resolvent identity

\[
(Ck^2+N)^{-1}
={P_{\rm DW}\over k^2}
-{P_{\rm DW}NP_{\rm DW}\over k^4}+\cdots
\]

combined with the universal connection term (R/6).  The factor four
relates (Q_{\rm exp}) to the algebraic Hessian in the packet normalization.

As a normalization check, on any four-dimensional Einstein background it
reproduces

\[
C_E=-{R\over6}P^2,
\]

the independent result of claim 1669.

## Product evaluation

For the chosen product,

\[
R=-12,
\qquad
R_{\mu\nu}=\operatorname{diag}(-2,-2,-4,-4),
\qquad
\Lambda=-3.
\]

The exponential-split equation-of-motion tensor is

\[
\mathcal E_{\mu\nu}
=\operatorname{diag}(1,1,-1,-1).
\]

Taking (P_\mu=(1,0,0,0)), direct symmetric-tensor contraction gives

\[
J_\lambda P_{\rm DW}J^\lambda=2,
\qquad
4\sum_\lambda Q_{\rm exp}(y^{(\lambda)})=-3,
\]

and hence

\[
C_P={-12\over6}(2)-(-3)=-1.
\]

The parallel-jet trace of claim 1668 is

\[
-{A\over4}{4\kappa\over16\pi^2\epsilon}C_P P^2
={\kappa A\over16\pi^2\epsilon}P^2.
\]

Matching to (\tfrac12P\,P_\mu P^\mu) gives the displayed residual
(P=\kappa A/(8\pi^2\epsilon)).  Claim 1670 proves that no separate
integrability-defect pole occurs at this curvature order.

## Closure and scope

All five quadratic axial responses of the trace-reduced bosonic theory are
now fixed:

\[
(\delta A,\delta B,\delta Z,\delta\xi_R,\delta\xi_{\rm Ric}).
\]

This does not remove the older full-quantization caveat.  The complete
field-dependent 34-constraint Faddeev--Senjanovic determinant is still not
available in the packet convention.  The result therefore closes the
explicit reduced Lagrangian bosonic loop response, not the missing
second-class measure contribution to the full off-shell PGT beta
functional.

## Source

The general-background de Donder quadratic form is the one displayed in
F. Bastianelli, F. Comberiati, F. Fecit and F. Ori,
[*Six-dimensional one-loop divergences in quantum gravity from the
\(\mathcal N=4\) spinning particle*](https://arxiv.org/abs/2307.09353),
equation (3.18).  The exponential-split shift and all contractions above are
derived in the packet convention.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_off_shell_product_curvature_response.mjs
~~~
