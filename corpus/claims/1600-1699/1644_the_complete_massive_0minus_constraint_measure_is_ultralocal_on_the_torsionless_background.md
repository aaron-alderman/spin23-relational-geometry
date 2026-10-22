# The Complete Massive (0^-) Constraint Measure Is Ultralocal on the Torsionless Background

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact source transcription, representation count and determinant-structure result on the massive torsionless branch

**Depends on:** [the curved axial determinant reduction](1643_the_curved_axial_connection_determinant_reduces_exactly_to_one_minimal_pseudoscalar.md)

**Evidence:** [constraint-measure ledger](../../../evidence/data/spin23-critical-pgt-second-class-measure-factorization-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_second_class_measure_factorization.mjs)

## Result

The last packet-v1 obstruction can be resolved far enough for the torsionless
one-loop curvature-square question. The massive (0^-) Hamiltonian analysis
does provide the full constraint inventory and all nonzero Poisson-bracket
families. On the torsionless background with pseudoscalar momentum
({}^p\pi=0) and (m=(a_0-a_1)/\ell^2\ne0), the complete 34-constraint
matrix has a universal block form whose determinant contains no differential
operator.

Therefore the Faddeev--Senjanovic factor is ultralocal on this background. It
cannot contribute a (C^2), (R^2), ((DT)^2), or other derivative
counterterm. It may affect normalization and zero-derivative densities and
must still be retained for those questions.

## Complete representation count

The 23 primary-if constraints split as

\[
\begin{aligned}
P_a={}&(\phi_{\mu\perp},\widehat\phi_{\mu\nu},
\vec\phi_\mu,\widehat\phi_{\mu\nu\perp}),
&&\dim P_a=3+3+3+3=12,\\
P_b={}&(\phi_\perp,\widetilde\phi_{\mu\nu\perp},
{}^s\phi_{\sigma\mu\nu}),
&&\dim P_b=1+5+5=11.
\end{aligned}
\]

The 11 secondary constraints are

\[
S=(\chi_\perp,\widetilde\chi_{\mu\nu\perp},
{}^s\chi_{\sigma\mu\nu}),
\qquad\dim S=1+5+5=11.
\]

Thus (12+11+11=34), agreeing with the published phase-space count.

## Background bracket structure

The primary (P_a)-(P_a) block is the published matrix (A). Its
determinant is

\[
\det A=J^{-12}
\left[\left({{}^p\pi\over6J}\right)^2+m^2\right]^6,
\]

and hence (J^{-12}m^{12}) on the torsionless background.

The appendix's algebraic brackets (B.3), (B.6), and (B.9) pair every component
of (P_b) with (S). Denote this invertible (11\times11) multiplication
block by (E). Its three irreducible eigenvalue classes are proportional to

\[
-{6a_0m\over a_1J}quad(1),
\qquad {a_0\ell^2\over J}quad(5),
\qquad {1\over J}quad(5),
\]

where the parenthetical numbers are multiplicities. Irreducible-projector
normalizations change only the overall constant.

The remaining appendix brackets (B.1), (B.4), (B.5), (B.7), and (B.8) form a
possibly differential cross-block (C) between (S) and (P_a). Allow also
an arbitrary antisymmetric (S)-(S) block (F). In the ordered basis
((P_a,P_b,S)),

\[
\Delta=
\begin{pmatrix}
A&0&C^T\\
0&0&E\\
-C&-E^T&F
\end{pmatrix}.
\]

Because both (A) and (E) are invertible,

\[
\boxed{\det\Delta=\det A\,(\det E)^2,}
\]

independently of (C) and (F). This follows by determinant-preserving block
row/column elimination and is checked directly by the verifier on full
34-dimensional matrices.

## Measure factor

Up to constant projector normalizations,

\[
\det E\propto
\left(-{6a_0m\over a_1J}\right)
\left({a_0\ell^2\over J}\right)^5
\left({1\over J}\right)^5.
\]

Thus

\[
\sqrt{\det\Delta}=\sqrt{\det A}\,|\det E|
\]

is a multiplication functional. No spatial Laplacian or other propagating
operator survives, even though derivatives occur in (C). This is precisely
the cancellation that could not be inferred from the earlier isolated
primary sub-block.

In dimensional regularization a bare determinant of a constant
multiplication operator is normally scaleless. The packet does not rely on
discarding it: the stronger statement needed here is only that it has no
derivatives and therefore cannot change the four-derivative bulk normal
coefficients.

## Scope

This factorization is exact for the massive torsionless background used by
the one-loop test. It does not compute:

- the measure on a generic torsionful background;
- the singular massless surface (m=0);
- boundary or zero-mode factors outside the packet domain; or
- possible nonperturbative changes of constraint class.

Those limitations do not reopen cancellation of the torsionless one-loop
(C^2) and (R^2) divergences.

## Source

H.-J. Yo and J. M. Nester, [*Hamiltonian analysis of Poincare gauge theory scalar modes*](https://arxiv.org/abs/gr-qc/9902032), especially equations (4.27)--(4.43), the 23+11 count, and appendix equations (B.1)--(B.9).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_second_class_measure_factorization.mjs
~~~
