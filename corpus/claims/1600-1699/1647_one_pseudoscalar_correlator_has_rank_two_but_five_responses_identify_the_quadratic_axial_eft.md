# One Pseudoscalar Correlator Has Rank Two, but Five Responses Identify the Quadratic Axial EFT

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact observable-identifiability result for the parity-even quadratic axial-torsion EFT

**Depends on:** [the order-reduced EFT window](1646_the_generated_curvature_terms_define_a_controlled_order_reduced_eft_but_not_a_new_fundamental_spectrum.md)

**Evidence:** [axial matching ledger](../../../evidence/data/spin23-axial-torsion-observable-matching-rank-v1.json) and [verifier](../../../verification/verify/verify_spin23_axial_torsion_observable_matching_rank.mjs)

## Result

The gauge-invariant pseudoscalar-curvature two-point function is the natural
first EFT observable, but on one maximally symmetric AdS background it has
information rank two in the five-parameter quadratic axial basis. It fixes
the longitudinal coefficient \(B\) and one curvature-shifted algebraic
coefficient. It cannot determine the transverse kinetic term or separate the
two curvature couplings.

A minimal five-response protocol has full rank. It uses the longitudinal
response on two distinct constant-curvature backgrounds, one transverse
axial response, and one polarization-sensitive response on a non-Einstein
background.

## Complete quadratic axial basis

Up to integration by parts and terms cubic or higher in torsion, write

\[
\begin{aligned}
\mathcal L_{S}^{(2)}={}&{A\over2}S_\mu S^\mu
+{B\over2}(\nabla_\mu S^\mu)^2
+{Z\over4}F_{\mu\nu}(S)F^{\mu\nu}(S)\\
&+{\xi_R\over2}R S_\mu S^\mu
+{\xi_{\rm Ric}\over2}R_{\mu\nu}S^\mu S^\nu,
\end{aligned}
\]

where \(F_{\mu\nu}(S)=2\nabla_{[\mu}S_{\nu]}\). The parameter vector is

\[
\theta=(A,B,Z,\xi_R,\xi_{\rm Ric}).
\]

This basis is complete for parity-even terms quadratic in the axial vector
with at most two derivatives on \(S\) and one curvature. The apparently
additional contractions
\(\nabla_\mu S_\nu\nabla^\mu S^\nu\) and
\(\nabla_\mu S_\nu\nabla^\nu S^\mu\) reduce to the displayed basis using
\(F^2\), integration by parts, and the commutator of covariant derivatives.
It is not the complete interacting torsion EFT: \(RTT\), \(TT\nabla T\), and
\(T^4\) vertices begin at higher field order.

## What the \(\widehat X\) correlator measures

At quadratic order on a torsionless background,

\[
\widehat X=\nabla_\mu S^\mu
\]

up to the frozen normalization. In flat spectral variables,

\[
\langle\widehat X\widehat X\rangle(p)
={p^2\over A+Bp^2}
={1\over B}-{A/B^2\over p^2+A/B}.
\]

Thus the contact coefficient and pole data determine \(A\) and \(B\) when
the normalization of \(\widehat X\) is fixed.

On a maximally symmetric background,

\[
R_{\mu\nu}={R\over4}g_{\mu\nu},
\qquad
A_R=A+R\left(\xi_R+{1\over4}\xi_{\rm Ric}\right).
\]

The correlator determines \(B\) and \(A_R\). It is exactly insensitive to
\(Z\), and the three parameters \((A,\xi_R,\xi_{\rm Ric})\) enter through
only one combination. Its response matrix therefore has rank two and
nullity three.

## Full-rank matching protocol

Use the following five independent response numbers:

1. \(B\), from the normalized high-eigenvalue/contact part of
   \(\langle\widehat X\widehat X\rangle\);
2. \(A_{R_1}\), from its pole on a constant-curvature background \(R_1\);
3. \(A_{R_2}\), from the pole on a second background \(R_2\ne R_1\);
4. \(Z\), from the momentum dependence of the transverse part of a sourced
   axial-torsion two-point function; and
5. \(A_{R_3,r_\parallel}\), from a polarization aligned with a Ricci
   eigenvector satisfying \(r_\parallel\ne R_3/4\) on a non-Einstein
   background.

Their linear response matrix is

\[
M=
\begin{pmatrix}
0&1&0&0&0\\
1&0&0&R_1&R_1/4\\
1&0&0&R_2&R_2/4\\
0&0&1&0&0\\
1&0&0&R_3&r_\parallel
\end{pmatrix}.
\]

For \(R_1\ne R_2\) and \(r_\parallel\ne R_3/4\),

\[
\operatorname{rank}M=5.
\]

The verifier checks the concrete witness
\((R_1,R_2,R_3,r_\parallel)=(-12,-24,-12,-2)\), for which the Einstein value
at \(R_3\) would be \(-3\).

## Source and gauge status

\(S_\mu\), defined from torsion after selector breaking, is a covariant
Lorentz tensor rather than a connection gauge potential. A local external
source \(J^\mu S_\mu\) is therefore admissible. The transverse/longitudinal
form factors are extracted after the covariant correlator is computed; the
protocol does not introduce a new axial gauge symmetry.

The \(\widehat X\) pole and residue are invariant under local redefinitions
that do not change the normalized source. Contact pieces and individual
off-shell Wilson coefficients retain the packet's scheme dependence and must
be reported with the matching convention.

## New execution boundary

The observable design problem is solved: five responses suffice and fewer
than five cannot identify five unrestricted quadratic coefficients. The
repository does not contain numerical or experimental values for these
responses, nor the exact critical-PGT torsionful one-loop functional needed
to predict their divergent parts beyond the already known longitudinal
scalar contribution.

The next calculation is consequently unambiguous but new: evaluate the
background-field Hessian on a weakly torsionful, non-Einstein background,
project its divergence onto
\((A,B,Z,\xi_R,\xi_{\rm Ric})\), and apply the matrix above. A torsionless AdS
heat kernel cannot supply the missing three responses.

## Source

O. Melichev and R. Percacci, [*On the Renormalization of Poincare Gauge Theories*](https://arxiv.org/abs/2307.02336), especially the Cartan/Einstein-form conversion and the generated \(R^2\), \(R\nabla T\), \((\nabla T)^2\), \(RTT\), \(TT\nabla T\), and \(T^4\) operator classes.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_torsion_observable_matching_rank.mjs
~~~
