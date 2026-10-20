# Breaking Projectors Can Select the Shared-126 Masks, but Only a Rank-One Family Partial Isometry Can Make Their Coefficient Common

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact no-go in a generous degree-two commuting-projector class; explicit minimum-spurion construction outside that class

**Depends on:** [the sector-dependent null mask](../1100-1199/1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md), [the Spin(10)/E6 parent audit](1535_no_standard_compact_parent_exchanges_the_complete_portals_but_Spin10_and_E6_supply_single_tensor_near_misses.md), and [the shared-126 family-symmetry no-go](1538_no_three_family_symmetry_can_save_one_universal_shared126_tensor_but_a_sector_labelled_intertwiner_can.md)

**Source boundary:** standard Spin(10)-to-Pati--Salam branching and invariant conventions are taken from [Spin(10) in Pati--Salam variables](https://arxiv.org/abs/hep-ph/0204097) and [explicit Spin(10) representation decompositions](https://arxiv.org/abs/hep-ph/0405300).  This claim grants exact branch projectors after a suitable \(45_H\) or \(210_H\) breaking vacuum; it does not assert that a particular published potential produces the required vacuum.

**Evidence:** [breaking-projector polynomial audit](../../../evidence/data/spin23-shared126-breaking-projector-polynomial-audit.json) and [executable verifier](../../../verification/verify/verify_spin23_shared126_breaking_projector_polynomial_audit.mjs)

## Result

Standard Spin(10)-breaking projectors can reproduce the desired **support
pattern** but cannot derive the common portal coefficient.

Let

\[
B=B_D\oplus B_M
\]

be the Dirac/Majorana branch-label space with orthogonal projectors
\(b_D,b_M\).  Let the family space have primitive marked projectors

\[
p_P+p_I+p_N=1,
\qquad
p_rp_s=\delta_{rs}p_r.
\]

Grant the most favorable situation: the \(45_H\) or \(210_H\) vacuum has
already supplied exact projectors onto the \((15,2,2)_D\) and
\((10,1,3)_M\) branches of \(126_H\), and all three primitive family
projectors are available.

For one universal symmetric family tensor

\[
Y=
\begin{pmatrix}
a&b&c\\
b&d&e\\
c&e&f
\end{pmatrix},
\]

the target masks can be written

\[
Y_D=p_PYp_P=aE_{PP},
\]

\[
Y_M=p_PYp_N+p_NYp_P
=c(E_{PN}+E_{NP}).
\]

Thus the projectors can enforce

\[
D_{PN}=M_{NN}=M_{IN}=0

\]

while retaining \(D_{PP}\) and \(M_{PN}\).

But they have selected two independent entries of the universal matrix:

\[
\boxed{(k_D,k_M)=(\alpha a,\beta c).}
\]

Even if one imposes one common Wilson coefficient
\(\alpha=\beta=w\), the map

\[
(a,c)\longmapsto w(a,c)

\]

has rank two.  Writing two projector masks with the same displayed
coefficient does not make \(Y_{PP}=Y_{PN}\).

The no-go is structural.  Every polynomial in commuting branch and family
projectors acts diagonally on the six coordinates

\[
(PP,PI,PN,II,IN,NN).
\]

It may retain, kill or rescale a coordinate, but cannot move the \(PP\)
coefficient into \(PN\).  Degree two is already enough to expose this; higher
degree cannot help while the generators remain commuting idempotents.

The minimum new datum is a rank-one off-diagonal family partial isometry

\[
t_{NP}=|N\rangle\langle P|,
\qquad
t_{NP}^\dagger t_{NP}=p_P,
\qquad
t_{NP}t_{NP}^\dagger=p_N.
\]

For

\[
A=p_PYp_P=aE_{PP},
\]

it gives

\[
t_{NP}A+At_{NP}^T
=a(E_{NP}+E_{PN}).
\]

Consequently the branch-conditioned construction

\[
\boxed{
Y_D^{\rm portal}=b_DA,
\qquad
Y_M^{\rm portal}
=b_M(t_{NP}A+At_{NP}^T)}
\]

uses the **same universal entry** \(a=Y_{PP}\) in both portals and preserves
the forbidden zeros.  Rank one is minimal because any map producing a
\(PN\) component from \(PP\) must contain a nonzero \(P\)-to-\(N\) or
\(N\)-to-\(P\) matrix element.

This solves the bounded algebraic problem, but only by adding precisely the
noncommuting family transporter that the commuting-projector ansatz lacked.

## 1. Bounded operator-polynomial class

The audit allows one projector insertion on each fermion leg and every term
of the form

\[
Y_b=
\sum_{r\le s}c_{b,rs}
\frac{p_rYp_s+p_sYp_r}{1+\delta_{rs}},
\qquad
b\in\{D,M\}.
\]

This is a generous normal form for degree-at-most-two operations in the
commuting primitive projectors.  It is at least as permissive as using one
fixed polynomial in a \(45_H\) or \(210_H\) breaking generator and one
marked family idempotent.  A no-go here is therefore not caused by too few
diagonal projectors.

On the CP-real slice, all \(c_{b,rs}\) may be real.  Over \(\mathbb C\) the
same dimension and support arguments apply.

## 2. Exact normal form of the projector algebra

Because the primitive projectors commute and are idempotent,

\[
p_rp_s=\delta_{rs}p_r,

\]

every polynomial reduces to a linear combination

\[
x_Pp_P+x_Ip_I+x_Np_N.

\]

Left and right multiplication of \(Y\) by such elements acts coordinatewise:

\[
(p_rYp_s)_{uv}
=\delta_{ru}\delta_{sv}Y_{rs}.
\]

After symmetrization, the six matrix coordinates remain six one-dimensional
eigenspaces.  Adding \(b_D,b_M\) gives twelve primitive branch-coordinate
masks.

In the maximally generous independent-mask envelope, any subset of those
twelve coordinates may be retained.  Hence there are

\[
2^{12}=4096

\]

binary support patterns.  The target pattern is among them.  This exhaustive
support freedom still does not mix any two coefficient coordinates.

The distinction is important:

\[
\boxed{
\text{support-SAT does not imply one-ray-SAT}.}

\]

## 3. What the 45H or 210H VEV contributes

A standard adjoint- or higher-tensor breaking VEV can have different
eigenvalues on distinct Pati--Salam subrepresentations.  Polynomial spectral
projectors in that VEV can therefore distinguish the Dirac bidoublet branch
from the right-Majorana branch.

Those projectors act on Spin(10)/Pati--Salam indices.  They are family blind.
In the tensor product of branch and family coefficient spaces their action
has the form

\[
b_D\otimes1_F,
\qquad
b_M\otimes1_F.

\]

They cannot create a family off-diagonal matrix unit.  Additional breaking
eigenvalues from \(210_H\), compared with \(45_H\), only refine the branch
decomposition; they do not change this tensor-factor statement.

Their eigenvalue and wavefunction normalizations may also give distinct
threshold factors \(\alpha\) and \(\beta\).  Without a symmetry fixing those
factors, breaking adds coefficient freedom rather than removing the existing
\(a/c\) freedom.

## 4. Complete support and coefficient classification

For each branch and unordered family pair \(rs\), define

\[
\mathcal M_{b,rs}(Y)
=b_b\otimes
\frac{p_rYp_s+p_sYp_r}{1+\delta_{rs}}.
\]

The twelve maps \(\mathcal M_{b,rs}\) are independent coordinate masks.
Therefore:

- forbidden \(D:PN\) is removed by setting \(c_{D,PN}=0\);
- forbidden \(M:NN\) and \(M:IN\) are removed by setting their coefficients
  to zero;
- selected \(D:PP\) is retained by \(c_{D,PP}\ne0\); and
- selected \(M:PN\) is retained by \(c_{M,PN}\ne0\).

The surviving portal map is

\[
\begin{pmatrix}a\\c\end{pmatrix}
\longmapsto
\begin{pmatrix}\alpha&0\\0&\beta\end{pmatrix}
\begin{pmatrix}a\\c\end{pmatrix}.

\]

For nonzero \(\alpha,\beta\), its rank is two.  The desired common line
requires a new equation

\[
c=\kappa a

\]

or a non-diagonal operator that transports one coordinate to the other.
Neither follows from the projector algebra.

## 5. Why higher projector degree does not help

The degree-two bound is physically natural for at most one insertion on each
fermion leg.  Algebraically, however, the conclusion is stronger.  Since
every higher product of commuting primitive idempotents again reduces to
zero or one primitive idempotent, an arbitrary-degree polynomial remains
diagonal in the same joint spectral basis.

No number of additional \(45_H\) or \(210_H\) VEV insertions can change
\(E_{PP}\) into \(E_{PN}\) unless some insertion fails to commute with the
marked family projector.  Such an insertion is already a new family
transporter.

## 6. Minimum new spurion

The rank-one partial isometry

\[
t_{NP}=E_{NP}

\]

is the smallest operator outside the diagonal projector algebra.  Acting on
one fermion leg and adding the transpose action on the other gives

\[
t_{NP}(aE_{PP})+(aE_{PP})t_{NP}^T
=a(E_{NP}+E_{PN}).

\]

No new family-matrix entry is sampled.  The one universal coefficient \(a\)
is transported.

The branch projectors keep this transport safe:

\[
b_D:quad aE_{PP},
\]

\[
b_M:quad a(E_{PN}+E_{NP}).
\]

Thus the off-diagonal support appears only in the Majorana branch.  The
transpose, or corresponding \(J\)-partner in the full real geometry, is
mandatory for the symmetric Majorana tensor.

Minimality is immediate.  A rank-zero addition does nothing.  Every diagonal
operator has zero \(NP\) and \(PN\) matrix elements.  A rank-one operator is
the first possible nonzero map between the one-dimensional \(P\) and \(N\)
lines, and the displayed \(t_{NP}\) succeeds.

## 7. Explicit full-rank witness

Let \(\Lambda\ne0\) be the selected universal \(PP\) entry and let
\(\mu\ne0\) be an independent safe complementary Majorana mass.  Set

\[
D=
\begin{pmatrix}
\Lambda&0&0\\
0&d_I&0\\
0&0&d_N
\end{pmatrix},

\]

\[
M=
\begin{pmatrix}
0&0&\Lambda\\
0&\mu&0\\
\Lambda&0&0
\end{pmatrix}.

\]

Then

\[
D_{PN}=0,
\qquad
M_{PN}=\Lambda,
\qquad
M_{IN}=M_{NN}=0,

\]

and

\[
QMQ=
\begin{pmatrix}\mu&0\\0&0\end{pmatrix},
\qquad
\det M=-\mu\Lambda^2\ne0.

\]

This witnesses support safety, a common portal coefficient, a rank-one
complement and full heavy rank.

## 8. Status and reopening datum

The commuting-projector programme closes negatively:

\[
\boxed{
\begin{minipage}{0.86\linewidth}
Even with exact \(45_H\)/\(210_H\) branch projectors, all primitive family
idempotents and every degree-two one-leg insertion, the desired supports are
selectable but the portal coefficient map has rank two.  Projectors mask;
they do not transport or equate \(Y_{PP}\) and \(Y_{PN}\).
\end{minipage}}
\]

The exact reopening datum is a normalized branch-conditioned partial
isometry \(t_{NP}\), or an equivalent finite-geometry one-form/natural
transformation, derived from the broken theory rather than added as a free
Wilson tensor.  It must:

1. act only in the Majorana branch;
2. include its transpose and full \(J\)/CP partner;
3. preserve the absence of Dirac \(PN\);
4. have its relative normalization fixed by the parent construction; and
5. remain tangent under threshold matching and renormalization.

The standard breaking VEVs supply the branch selector.  The genuinely new
ingredient is the off-diagonal family transporter.

## Reproduction

Run:

```bash
node verification/verify/verify_spin23_shared126_breaking_projector_polynomial_audit.mjs
```

The verifier reduces all degree-two projector monomials to the diagonal
algebra, counts the twelve primitive branch-coordinate masks and 4096 binary
supports, computes the rank-two selected coefficient map, proves that no
diagonal insertion moves \(PP\) to \(PN\), and checks the rank-one partial
isometry and full-rank texture explicitly.
