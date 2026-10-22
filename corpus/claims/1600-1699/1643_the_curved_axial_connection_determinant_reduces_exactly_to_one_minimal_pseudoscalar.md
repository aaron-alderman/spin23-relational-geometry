# The Curved Axial-Connection Determinant Reduces Exactly to One Minimal Pseudoscalar

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact torsionless-background determinant reduction; narrows the unknown one-loop content to gravity plus the constrained measure

**Depends on:** [the packet Hessian principal-symbol audit](1642_the_packet_hessian_has_one_connection_derivative_direction_and_requires_a_measure_preserving_schur_reduction.md)

**Evidence:** [curved determinant ledger](../../../evidence/data/spin23-critical-pgt-curved-axial-determinant-reduction-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_curved_axial_determinant_reduction.mjs)

## Result

The axial reduction is not restricted to flat space. On every torsionless
Riemannian background, the quadratic connection determinant of quantization
packet v1 is exactly one minimally coupled pseudoscalar determinant times an
explicit ultralocal auxiliary factor:

\[
\boxed{
\det_{1}\!left(AI+B D^\dagger D\right)
=A^{N_1-N_0}B^{N_0}
\det_{0}'\!\left(-\nabla^2+{A\over B}\right),
}
\]

where (D:S_\mu\mapsto\nabla_\mu S^\mu), (D^\dagger=-\nabla), and
zero modes are treated according to the packet. Locally in four dimensions,
the auxiliary factor is the curved analogue of (A^3B) per scalar mode.

No vector-curvature endomorphism appears in the propagating determinant. The
only differentiated torsion excitation is therefore the same minimal massive
(0^-) scalar whose counterterm contribution was used in claims 1637--1639.

## Geometric reason

Write the independent connection as

\[
\omega=\mathring\omega(e)+K.
\]

The functional transformation ((e,\omega)\mapsto(e,K)) has block-triangular
Jacobian

\[
\begin{pmatrix}
I&0\\
-\delta\mathring\omega/\delta e&I
\end{pmatrix},
\]

and hence unit coordinate determinant. Measure-metric normalizations remain
those fixed by the packet, but the affine shift itself creates no new
functional determinant.

The Nieh--Yan identity is

\[
d(e_a\wedge T^a)=T_a\wedge T^a-R_{ab}\wedge e^a\wedge e^b.
\]

On a torsionless background, the linear part of
(widehat X=*(R_{ab}\wedge e^a\wedge e^b)) is consequently the covariant
divergence of axial contorsion, up to the sign already frozen by the packet.
Because (ar X=0), the quadratic part of (widehat X^2) is simply
((DS)^2). Metric variations of the Hodge star multiply (ar X) and do
not generate an (hS) quadratic mixing term.

The Einstein--Cartan scalar curvature decomposes into the Levi--Civita scalar
plus a boundary term and algebraic (K^2) terms. The three torsion squares are
also algebraic in (K). Thus, at quadratic order about the torsionless
background, the metric and axial derivative blocks can be diagonalized
without a derivative-valued determinant.

## Determinant proof

Factor (A) and apply the Sylvester determinant identity to the maps between
one-forms and scalars:

\[
\begin{aligned}
\det_1(AI+BD^\dagger D)
&=A^{N_1}\det_1\!\left(I+{B\over A}D^\dagger D\right)\\
&=A^{N_1}\det_0'\!\left(I+{B\over A}DD^\dagger\right)\\
&=A^{N_1-N_0}B^{N_0}
\det_0'\!\left(-\nabla^2+{A\over B}\right).
\end{aligned}
\]

The primed equality pairs only the nonzero singular values of (D). Kernel
dimensions supply the remaining powers of (A) and are handled with the
packet's collective-coordinate rule.

The verifier tests the identity on rectangular discrete divergence matrices
of several ranks. This is a finite-dimensional certificate of the exact
operator identity, not a numerical approximation to the continuum heat
kernel.

## One-loop consequence

Ignoring only the still-unresolved second-class measure, the derivative
determinants on a torsionless Einstein background factor as

\[
Z_{1\text{-loop}}^{\rm deriv}
=Z_{\rm Einstein}^{\rm grav+ghost}
\left[\det_0'(-\nabla^2+m_{0^-}^2)\right]^{-1/2}.
\]

This justifies importing the minimal-scalar (C^2) and (R^2) entries after
the convention map. It also justifies importing a first-order
Einstein--Hilbert graviton/ghost result only for this reduced torsionless
quadratic block. Published first-order calculations independently find the
same off-shell divergence as the metric formalism for Einstein--Hilbert
gravity in harmonic gauge.

It does **not** justify declaring the full critical-PGT beta functional equal
to Einstein plus scalar: the field-dependent second-class determinant and
the full off-shell torsion/background dependence have not been evaluated.

## New exhaustion boundary

The curved Lagrangian Hessian is no longer the principal obstruction. Its
propagating axial determinant is exactly known and its metric part reduces to
the standard first-order Einstein block. The irreducible missing quantum
object has narrowed to

\[
\Gamma_{\rm SC}^{(1)}={1\over2}\operatorname{Tr}
\log\{\chi_A,\chi_B\}_{\rm complete},
\]

together with its combination with all algebraic connection and gauge
factors on a general background. Without the complete constraint list and
bracket operator, the sign and invariant content of this term cannot be
derived.

## Sources

- H. T. Nieh and M. L. Yan, *An Identity in Riemann--Cartan Geometry*, J. Math. Phys. 23 (1982) 373.
- E. Alvarez, J. Anero and R. Santos-Garcia, [*One-loop divergences in first order Einstein-Hilbert gravity*](https://arxiv.org/abs/1706.02622).
- H.-J. Yo and J. M. Nester, [*Hamiltonian analysis of Poincare gauge theory scalar modes*](https://arxiv.org/abs/gr-qc/9902032).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_curved_axial_determinant_reduction.mjs
~~~
