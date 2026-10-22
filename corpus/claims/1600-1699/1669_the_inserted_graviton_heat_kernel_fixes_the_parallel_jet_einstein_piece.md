# The Inserted Graviton Heat Kernel Fixes the Parallel-Jet Einstein Piece

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete algebraic inserted-graviton contribution; curvature-commutator defect remains

**Depends on:** [the mixed curved operator reduction](1668_the_mixed_curved_response_reduces_to_a_parallel_jet_trace_plus_an_integrability_defect.md)

**Evidence:** [inserted-heat-kernel ledger](../../../evidence/data/spin23-inserted-graviton-einstein-response-v1.json) and [verifier](../../../verification/verify/verify_spin23_inserted_graviton_einstein_response.mjs)

## Result

The ordinary inserted heat-kernel part of the remaining mixed response can
be evaluated exactly on the packet Einstein background.  The parallel-jet
trace isolated in claim 1668 contributes

\[
\Gamma^{(1)}_{\parallel,\rm pole}
= {\kappa A\over96\pi^2\epsilon}
\int\!\sqrt g\,R P^2.
\]

Equivalently, it fixes the Einstein combination

\[
\boxed{
\left(\delta\xi_R+{1\over4}\delta\xi_{\rm Ric}\right)_{\parallel}
={\kappa A\over48\pi^2\epsilon}.
}
\]

This is a component of the mixed graviton--axial response, not its final
value.  The curvature-integrability defect identified in claim 1668 must be
added before matching either Wilson coefficient.

## Packet-normalized graviton coefficient

On an on-shell Einstein background, the de Donder graviton operator is
minimal on symmetric tensors.  In the Riemann-sign convention used here its
first local coefficient is

\[
(a_1^h)_{\mu\nu}{}^{\alpha\beta}
={R\over6}\delta_{\mu\nu}^{\alpha\beta}
+R_\mu{}^\alpha{}_\nu{}^\beta
+R_\mu{}^\beta{}_\nu{}^\alpha.
\]

The overall inverse-Hessian normalization is not imported from another
metric convention.  It is fixed by the packet flat propagator,

\[
G_{h\,\mu\nu,\rho\sigma}(k)
={4\kappa\over k^2}P_{\mu\nu,\rho\sigma},
\]

where

\[
P_{\mu\nu,\rho\sigma}
={1\over2}(g_{\mu\rho}g_{\nu\sigma}
+g_{\mu\sigma}g_{\nu\rho})
-{1\over2}g_{\mu\nu}g_{\rho\sigma}
\]

in four dimensions.  Hence the curvature pole of the coincident propagator
is

\[
G_h(x,x)\big|_{R,\rm pole}
={4\kappa\over16\pi^2\epsilon}\,P\,a_1^h.
\]

The linear and exponential metric splits have the same source-free Hessian
on the Einstein solution: their quadratic difference is proportional to the
background metric equation of motion.  The exponential split remains
essential in the source seagull already included in claim 1668.

## Tensor contraction

Write

\[
(J_Ph)_\alpha=J_\alpha{}^{\mu\nu}h_{\mu\nu},
\]

with

\[
J_\alpha{}^{\mu\nu}
={1\over2}P_\alpha g^{\mu\nu}
-{1\over2}\left(\delta_\alpha^\mu P^\nu
+\delta_\alpha^\nu P^\mu\right).
\]

Before imposing the Einstein relation, the algebraic contraction of the
minimal symmetric-tensor coefficient is

\[
J_\lambda{}^{\mu\nu}
P_{\mu\nu,\rho\sigma}
(a_1^h)^{\rho\sigma}{}_{\alpha\beta}
J^{\lambda,\alpha\beta}
={R\over3}P^2-2R_{\mu\nu}P^\mu P^\nu.
\]

For (R_{\mu\nu}=Rg_{\mu\nu}/4), this becomes

\[
\boxed{-{R\over6}P^2.}
\]

Substitution into the parallel-jet trace

\[
-{A\over4}\operatorname{Tr}
\left(H_h^{-1}J_P^\dagger J_P\right)
\]

gives the stated pole and Einstein response combination.

## What remains

The inserted (a_1) coefficient is now closed.  The unresolved Einstein
number is only the part produced when the covariant derivatives in the
factorized mixed block act on the second source jet and are commuted using

\[
[\nabla_\mu,\nabla_\nu]P_\rho
=R_{\rho\sigma\mu\nu}P^\sigma.
\]

The product-background response additionally needs the off-shell de Donder
graviton endomorphism, because the product is not Einstein.  Thus the next
calculation is narrower than the boundary in claim 1668: derive the
commutator form factor, then combine it with the off-shell product
endomorphism.  The ordinary Einstein graviton heat-kernel insertion is no
longer missing.

## Source

The Einstein-background de Donder operator and its symmetric-tensor
endomorphism are given explicitly in F. Bastianelli, F. Comberiati,
F. Fecit and F. Ori,
[*Six-dimensional one-loop divergences in quantum gravity from the
\(\mathcal N=4\) spinning particle*](https://arxiv.org/abs/2307.09353),
section 3.2.  Only that operator identity is used; the packet propagator
fixes the normalization independently.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_inserted_graviton_einstein_response.mjs
~~~
