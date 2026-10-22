# The Complete Second-Class Measure Is Ultralocal on the Massive Branch

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact nonlinear measure factorization and complete packet axial-response closure

**Depends on:** [the torsionless 34-constraint factorization](1644_the_complete_massive_0minus_constraint_measure_is_ultralocal_on_the_torsionless_background.md), [the canonical Legendre map](1653_the_native_hamiltonian_legendre_map_reduces_the_measure_bridge_to_one_normalization.md), and [the five-response vector](1672_the_five_response_axial_loop_programme_is_complete_in_the_reduced_bosonic_theory.md)

**Evidence:** [nonlinear-measure ledger](../../../evidence/data/spin23-complete-massive-branch-second-class-measure-v1.json) and [verifier](../../../verification/verify/verify_spin23_complete_massive_branch_second_class_measure.mjs)

## Result

The remaining measure caveat for the quadratic axial response can be
removed.  The massive (0^-) Hamiltonian source states that its appendix
contains all nonzero Poisson brackets.  Those brackets give the same
constraint-matrix pattern at general nonlinear field values as on the
torsionless background:

\[
\Delta=
\begin{pmatrix}
A&0&C^T\\
0&0&E\\
-C&-E^T&F
\end{pmatrix},
\]

with (A) a (12\times12) invertible primary block and (E) the
(11\times11) invertible primary--secondary pairing.  All explicit
torsion and spatial-derivative dependence occurs in (C) or (F), which
drop out of the determinant identically.  Therefore, throughout the
connected massive branch (m\ne0),

\[
\boxed{
\sqrt{\det\Delta}
=\mathcal N\,J^{-17}
\left[m^2+\left({{}^p\!\pi\over6J}\right)^2\right]^3,
}
\]

where (mathcal N) is a field-independent coupling/projector
normalization.

Using the exact packet map

\[
{{}^p\!\pi\over J}=-B\widehat X,
\]

the complete determinant is a multiplication functional,

\[
\boxed{
\sqrt{\det\Delta}
=\mathcal N\,J^{-17}
\left(m^2+{B^2\widehat X^2\over36}\right)^3.
}
\]

Its functional logarithm carries only the scaleless trace
(delta^{(d)}(0)).  Hence it generates no dimensional-regularization
MS-bar pole at any order in the axial source.  In particular it changes
none of the five coefficients in claim 1672.

## Why the nonlinear extension is exact

The 34 second-class constraints split as

\[
12_{P_a}+11_{P_b}+11_S.
\]

Equations (4.34)--(4.37) of the Hamiltonian source give all nonzero brackets
inside (P_a).  They depend only on (J), the mass parameter (m), and
({}^p\!\pi/J), and yield

\[
\det A=J^{-12}
\left[m^2+\left({{}^p\!\pi\over6J}\right)^2\right]^6.
\]

Appendix brackets (B.3), (B.6), and (B.9) pair all eleven components of
(P_b) with all eleven secondaries.  Their determinant is

\[
\det E=\mathcal N_E J^{-11}.
\]

The other listed brackets, (B.1), (B.2), (B.4), (B.5), (B.7), and (B.8),
contain the nonlinear torsion, normal, and derivative dependence.  They lie
in (C).  Possible secondary--secondary brackets lie in the antisymmetric
block (F).  Since the appendix is explicitly the list of all nonzero
brackets, there is no omitted (P_a\!-!P_b) or (P_b\!-!P_b) block that
could spoil the displayed pattern.

For invertible (A) and (E), exact block elimination gives

\[
\boxed{\det\Delta=\det A\,(\det E)^2}
\]

for arbitrary (C) and (F).  This is an algebraic identity; no
torsionless substitution is used.

## Dimensional-regularization consequence

The measure contribution is

\[
\Gamma_{\rm SC}^{(1)}
=-\log\sqrt{\det\Delta}
\]

up to the sign convention fixed when the measure is placed in the
Euclidean exponent.  Either sign multiplies

\[
\operatorname{Tr}_{\rm mult}\log f(x)
=\delta^{(d)}(0)\int d^dx\,\log f(x),
\qquad
\delta^{(d)}(0)=\int{d^dk\over(2\pi)^d}1=0.
\]

Thus the sign is immaterial for MS-bar logarithmic poles.  A hard cutoff
would retain power-divergent local terms, but that is not the packet's
renormalization prescription.

## Promoted response vector

Claims 1651--1654 already establish that the pure axial Hessian, ghosts and
ordinary Jacobians add no omitted axial-source pole.  The mixed bosonic
calculation in claims 1660--1671 supplies all nonzero entries.  The vector
in claim 1672 is therefore the complete packet one-loop quadratic axial
response, not merely a reduced-bosonic provisional result.

What remains open is broader: constructing the full unquotiented beta
functional for every torsion and curvature invariant.  That requires source
projections beyond the axial quadratic sector, but no unknown
Faddeev--Senjanovic logarithmic determinant remains available to alter the
five coefficients already found.

## Source

H.-J. Yo and J. M. Nester,
[*Hamiltonian analysis of Poincaré gauge theory scalar modes*](https://arxiv.org/abs/gr-qc/9902032),
especially equations (4.27)--(4.43) and appendix (B.1)--(B.9).  The paper
describes the appendix as the list of all nonzero Poisson brackets for the
spin-zero modes.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_complete_massive_branch_second_class_measure.mjs
~~~
