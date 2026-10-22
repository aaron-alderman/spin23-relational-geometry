# The Minimal-Scalar Heat Kernel Fixes the Pure-Axial Curvature Response

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** complete pure-axial response through one curvature

**Depends on:** [the exact curved scalar determinant reduction](1643_the_curved_axial_connection_determinant_reduces_exactly_to_one_minimal_pseudoscalar.md) and [the complete flat response](1665_the_mixed_polarization_closes_both_flat_derivative_responses.md)

**Evidence:** [pure-axial curvature ledger](../../../evidence/data/spin23-pure-axial-curvature-response-v1.json) and [verifier](../../../verification/verify/verify_spin23_pure_axial_curvature_response.mjs)

## Result

The pure trace-reduced axial loop contributes only to the scalar-curvature
coupling at quadratic axial order:

\[
\boxed{
\delta\xi_{R,p\text{-loop}}
=-{\lambda_4A\over48\pi^2\epsilon b_X^2},
\qquad
\delta\xi_{{\rm Ric},p\text{-loop}}=0.
}
\]

On the critical surface this becomes

\[
\boxed{
\delta\xi_{R,p\text{-loop}}
=-{\kappa A\over144\pi^2\epsilon(a_1+1)},
\qquad
\delta\xi_{{\rm Ric},p\text{-loop}}=0.
}
\]

These are raw effective-action poles; counterterms have the opposite sign.

## Scalar resolvent

On a torsionless curved background, let

\[
D:p_\mu\mapsto\nabla_\mu p^\mu,
\qquad L=DD^\dagger=-\nabla^2.
\]

For the free axial operator

\[
K=AI+b_XD^\dagger D,
\]

the differentiated coincident propagator is

\[
DK^{-1}D^\dagger={L\over A+b_XL}
={1\over b_X}-{A\over b_X^2}(L+m^2)^{-1},
\qquad m^2={A\over b_X}.
\]

The first term is an ultralocal scaleless trace.  For the minimal scalar
resolvent, the local heat-kernel coefficients \(a_0=1\) and \(a_1=R/6\)
give

\[
\left\langle x\left|(L+m^2)^{-1}\right|x\right\rangle_{\rm pole}
={1\over16\pi^2\epsilon}left(-m^2+{R\over6}\right).
\]

Therefore

\[
\left\langle(Ds)^2\right\rangle_{\rm pole}
={1\over16\pi^2\epsilon}left[
{A^2\over b_X^3}-{AR\over6b_X^2}
\right].
\]

The flat term reproduces the mass response already obtained in claims 1660
and 1663.

## Curvature matching

At a chosen point set the first background axial jet to zero,
\(\nabla P=0\), while retaining arbitrary local curvature.  The quadratic
interaction

\[
\lambda_4P^2(Ds)^2
\]

then supplies

\[
\Gamma^{(1)}_{p,\rm pole}
\supset-{\lambda_4A\over96\pi^2\epsilon b_X^2}
RP^2.
\]

Matching this to
\(\tfrac12\delta\xi_R RP^2\) gives the boxed coefficient.

No tensor endomorphism occurs in the propagating determinant: the
longitudinal one-form determinant is exactly a minimal scalar determinant.
Consequently this sub-block cannot distinguish a Ricci eigenvector from any
other polarization and generates no
\(R_{\mu\nu}P^\mu P^\nu\) term.

## Remaining calculation

The pure-axial contribution is now complete for all five responses.  The
only unknown entries are the mixed graviton--axial contributions

\[
(\delta\xi_{R,h-p},\delta\xi_{{\rm Ric},h-p}).
\]

They require covariantizing the mixed polarization operator of claim 1664
on one Einstein and one non-Einstein background, including curvature
endomorphisms and connection commutators.  Flat data cannot determine their
two independent coefficients.

## Source

D. V. Vassilevich, [*Heat kernel expansion: user's manual*](https://arxiv.org/abs/hep-th/0306138), for the local Laplace-type heat-kernel expansion and scalar coefficients.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pure_axial_curvature_response.mjs
~~~
