# The Curvature-Square Integrability Relation Fails and Proves an Independent RTT Counterterm

> **Execution update (claim 1676):** the complete dimension-four quadratic
> shell has dimension thirteen modulo Euler.  The torsionless and axial-flat
> packet responses have rank four there, leaving a strict minimum of nine
> non-axial quadratic responses before the separate cubic and quartic shells
> are addressed.

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact response-map obstruction to curvature-square-only closure

**Depends on:** [the complete torsionless one-loop flow](1645_the_complete_torsionless_one_loop_flow_leaves_the_critical_pgt_surface.md), [the complete packet axial response](1673_the_complete_second_class_measure_is_ultralocal_on_the_massive_branch.md), and [the response-to-normal boundary](1674_the_complete_axial_response_proves_departure_without_closing_the_full_normal_beta_map.md)

**Evidence:** [curvature integrability ledger](../../../evidence/data/spin23-curvature-square-axial-integrability-v1.json) and [verifier](../../../verification/verify/verify_spin23_curvature_square_axial_integrability.mjs)

## Result

The completed torsionless and quadratic-axial poles cannot be the expansion
of a counterterm made only from the six parity-even Riemann--Cartan
curvature-square contractions.  Such a truncation obeys an exact geometric
integrability relation,

\[
\boxed{c_{R^2}=-{3\over2}\,\delta\xi_R,}
\]

in the packet normalization \(\widehat X=\nabla_\mu S^\mu\).  The packet
instead gives

\[
c_{R^2}^{\rm packet}={5\over576\pi^2\epsilon},
\]

while its axial response would require

\[
-{3\over2}\delta\xi_R
={\kappa A\over\pi^2\epsilon}
\left({7\over64}+{1\over96(a_1+1)}\right).
\]

At the healthy witness \(\kappa=A=1\), \(a_1=1\), these are

\[
{5\over576\pi^2\epsilon}
\quad\hbox{and}\quad
{11\over96\pi^2\epsilon},
\]

which differ by \(61/(576\pi^2\epsilon)\).  Therefore at least one
independent curvature--torsion operator, represented in the reduced basis by
an \(RTT\) term, is generated.  The enlarged counterterm shell is now an
explicit calculation result rather than an inference from another PGT.

## Six-contraction response map

Use the raw metric-compatible curvature basis

\[
\begin{aligned}
I_1&=\mathcal R_{abcd}\mathcal R^{abcd},&
I_2&=\mathcal R_{abcd}\mathcal R^{cdab},&
I_3&=\mathcal R_{abcd}\mathcal R^{acbd},\\
I_4&=\mathcal R_{ab}\mathcal R^{ab},&
I_5&=\mathcal R_{ab}\mathcal R^{ba},&
I_6&=\mathcal R^2.
\end{aligned}
\]

For pure axial contorsion, choose the normalization

\[
K_{ab\mu}=-{1\over6}\epsilon_{ab\mu\nu}S^\nu,
\]

for which the packet pseudoscalar curvature has linearization
\(\widehat X=\nabla\cdot S\).  Expanding \(\sum_i x_i I_i\), integrating by
parts, and reducing to

\[
{B\over2}(\nabla\cdot S)^2+{Z\over4}F_S^2
+{\xi_R\over2}RS^2+{\xi_{\rm Ric}\over2}R_{\mu\nu}S^\mu S^\nu
+c_C C^2+c_{R^2}R^2
\]

gives

\[
\begin{pmatrix}
B\\ Z\\ \xi_R\\ \xi_{\rm Ric}\\ c_C\\ c_{R^2}
\end{pmatrix}
=
\begin{pmatrix}
 {2\over3}&0&-{1\over3}&0&0&0\\
 {4\over9}&-{4\over9}&0&{1\over9}&-{1\over9}&0\\
 -{2\over9}&-{2\over9}&-{1\over9}&-{2\over9}&-{2\over9}&-{2\over3}\\
 0&{8\over9}&{2\over9}&{2\over9}&{2\over9}&0\\
 2&2&1&{1\over2}&{1\over2}&0\\
 {1\over3}&{1\over3}&{1\over6}&{1\over3}&{1\over3}&1
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\\x_4\\x_5\\x_6\end{pmatrix}.
\]

The matrix has rank five.  Its kernel is precisely the Euler-density
direction in this response quotient,

\[
e_E=(0,1,0,0,-4,1).
\]

The four axial rows have rank four.  Adding the torsionless \(C^2\) row
raises the rank to five; adding the torsionless \(R^2\) row does not.  In
fact the final row is exactly \(-3/2\) times the \(\xi_R\) row.  This proves
the displayed integrability relation without choosing an irreducible
curvature-projector convention.

## Covariant reduction check

The unreduced local algebraic \(R_{\mu\nu}S^\mu S^\nu\) coefficient does not
annihilate the Euler direction.  The missing cancellation comes from the
derivative sector.  Writing

\[
\alpha\nabla_\mu S_\nu\nabla^\mu S^\nu
+\beta\nabla_\mu S_\nu\nabla^\nu S^\mu
+\gamma(\nabla\cdot S)^2,
\]

the integrated identity

\[
\int\nabla_\mu S_\nu\nabla^\nu S^\mu
=\int\left[(\nabla\cdot S)^2-R_{\mu\nu}S^\mu S^\nu\right]
\]

shifts \(\xi_{\rm Ric}\) by \(-2(\alpha+\beta)\).  After this shift every
row annihilates \(e_E\).  The verifier constructs the curvature and
contorsion tensors explicitly and checks this cancellation, preventing a
spurious rank-six conclusion from a pointwise, non-integrated expansion.

## Consequence for the normal-beta programme

The five axial responses plus torsionless \(C^2\) would determine all five
curvature-square directions modulo Euler **if** the counterterm functional
were restricted to curvature squares.  The failed integrability relation
proves that assumption false.  Independent \(RTT\) operators have the same
quadratic-axial projections and enlarge the domain of the response map.

Accordingly, the next irreducible calculation is not another axial
background.  It is a source suite that separates curvature-square from
independent \(RTT\), \(DTDT\), \(FDT\), and eventually \(T^4\) classes,
using trace and tensor torsion as well as axial torsion.  Until those
projections are computed, the old eight-normal rank must not be upgraded
from the axial data alone.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_curvature_square_axial_integrability.mjs
~~~
