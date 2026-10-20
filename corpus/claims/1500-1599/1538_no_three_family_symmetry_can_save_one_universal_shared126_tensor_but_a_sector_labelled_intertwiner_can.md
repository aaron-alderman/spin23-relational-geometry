# No Three-Family Symmetry Can Save One Universal Shared-126 Tensor, but a Sector-Labelled Intertwiner Can

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact bounded family-symmetry no-go and minimal algebraic sector-dependent construction; ultraviolet derivation remains open

**Depends on:** [the rank-one complementary Majorana theorem](../1100-1199/1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md), [the sector-dependent null mask](../1100-1199/1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md), [the multiplicity obstruction](1518_the_available_Jordan_Spin23_data_force_multiplicity_one_only_by_reopening_the_Sp6_mixed_relation.md), and [the compact-parent audit](1535_no_standard_compact_parent_exchanges_the_complete_portals_but_Spin10_and_E6_supply_single_tensor_near_misses.md)

**Evidence:** [shared-126 family-symmetry audit](../../../evidence/data/spin23-spin10-shared126-family-symmetry-audit.json) and [executable verifier](../../../verification/verify/verify_spin23_spin10_shared126_family_symmetry_audit.mjs)

## Result

The leading shared-\(126_H\) Spin(10) route fails with one universal family
Yukawa matrix before any detailed family-group choice is made.

In the ordered family basis \((P,I,N)\), write

\[
Y_{126}=
\begin{pmatrix}
a&b&c\\
b&d&e\\
c&e&f
\end{pmatrix},
\qquad
(a,b,c,d,e,f)
=(Y_{PP},Y_{PI},Y_{PN},Y_{II},Y_{IN},Y_{NN}).
\]

The shared Spin(10) tensor gives the same family matrix to the
\((15,2,2)\) Dirac branch and the \((10,1,3)\) Majorana branch.  With nonzero
branch VEV/Clebsch factors,

\[
D_{PN}=v_DY_{PN},
\qquad
M_{PN}=v_MY_{PN}.
\]

The programme requires

\[
D_{PN}=0,
\qquad
M_{PN}\ne0.
\]

Therefore

\[
\boxed{
\text{one universal }Y_{126}
\text{ cannot preserve the sector-dependent null mask}.}
\]

This contradiction is independent of whether the family symmetry is a
permutation, signed permutation, circle character, rank-one ansatz or larger
compact stabilizer.

The candidate-by-candidate calculation strengthens the result.  Family
permutations and signed permutations preserve the decomposition of
\(\operatorname{Sym}^2\mathbb C^3\) into diagonal and off-diagonal entries.
They can never put \(PP\) and \(PN\) in one orbit.  A \(U(1)\) can permit both
only by assigning \(P\) and \(N\) the same character and still does not equate
their coefficients.  A rank-one family tensor satisfying
\(Y_{PP}=Y_{PN}\ne0\) necessarily has \(Y_{NN}=Y_{PP}\ne0\), violating the
complementary-null mask.

There is a smallest algebraically viable **sector-dependent** construction:

\[
Y_D^{\rm portal}=\Lambda E_{PP},
\qquad
Y_M^{\rm portal}=\Lambda(E_{PN}+E_{NP}).
\]

For example,

\[
D=
\begin{pmatrix}
\Lambda&0&0\\
0&d_I&0\\
0&0&d_N
\end{pmatrix},
\qquad
M=
\begin{pmatrix}
0&0&\Lambda\\
0&\mu&0\\
\Lambda&0&0
\end{pmatrix}.
\]

Then

\[
\det M=-\mu\Lambda^2,
\qquad
\operatorname{rank}(QMQ)=1,
\]

while the forbidden Dirac \(P\)-\(N\) entry remains zero.  This texture gives
the requested common portal ray without activating the forbidden entries.

Its cost is exact: it is not one universal Spin(10) Yukawa matrix.  It needs
a new branch-labelled family intertwiner that knows whether the
\(126_H\) component is Dirac or Majorana.  The next datum is therefore a
sector-dependent natural transformation, not an ordinary family symmetry.

## 1. The two masks that one tensor must satisfy

The selected Dirac portal and block-preserving condition require

\[
D_{PP}\ne0,
\qquad
D_{PI}=D_{PN}=0.
\]

The canonical rank-one-complement Majorana form requires

\[
M_{PN}\ne0,
\qquad
M_{II}\ne0,
\qquad
M_{IN}=M_{NN}=0,
\]

with \(M_{PP}\) and \(M_{PI}\) optional.  The nonzero \(M_{PN}\) sews the
selected line to the null direction and restores full heavy rank.

The same family label \(PN\) is thus forbidden in one operator sector and
required in the other.  Claims 1115 and 1120 already showed that charges
alone cannot distinguish these parallel relations; the distinction resides
in sector-dependent opposite-algebra anchors.

A universal \(Y_{126}\) forgets precisely that extra anchor.  Multiplication
by two different nonzero scalar VEVs changes magnitudes but not support.  It
cannot send one nonzero matrix entry to zero in only one branch.

## 2. Permutation groups

A family permutation \(\pi\in S_3\) acts by congruence,

\[
Y\longmapsto P_\pi^TYP_\pi.
\]

It sends an unordered index pair \(\{i,j\}\) to
\(\{\pi(i),\pi(j)\}\).  Equality of the two indices is preserved.  Hence the
six coefficient coordinates split into invariant sets

\[
\{PP,II,NN\}
\quad\sqcup\quad
\{PI,PN,IN\}.
\]

No permutation orbit contains both \(PP\) and \(PN\).

The exact fixed dimensions are

\[
\begin{array}{c|c|c}
G&\dim(\operatorname{Sym}^2\mathbb C^3)^G&\text{form}\\ \hline
1&6&\text{generic symmetric matrix}\\
\mathbb Z_2\text{ transposition}&4&\text{two paired coordinate orbits}\\
C_3&2&\text{common diagonal + common off diagonal}\\
S_3&2&\text{common diagonal + common off diagonal}.
\end{array}
\]

The two-dimensional \(S_3\) texture is

\[
Y=\alpha I+\beta(\mathbf1\mathbf1^T-I).
\]

It leaves diagonal and off-diagonal amplitudes independent.  If both are
nonzero, it also activates every forbidden diagonal and off-diagonal entry.

Individual transpositions fail more locally:

- \(P\leftrightarrow N\) equates \(PP\) with forbidden \(NN\);
- \(I\leftrightarrow N\) equates \(PI\) with \(PN\); and
- \(P\leftrightarrow I\) equates \(PN\) with forbidden \(IN\).

## 3. Signed permutations

There are

\[
3!\,2^3=48
\]

real signed permutation matrices.  Their congruence action can attach signs
to coordinates, but still maps diagonal entries only to diagonals and
off-diagonals only to off-diagonals.  The verifier exhausts all 48.

Representative fixed spaces illustrate the alternatives:

\[
\operatorname{diag}(1,1,-1)
\]

has fixed dimension four and kills \(PN\) and \(IN\), including the desired
Majorana portal.  Conversely,

\[
\operatorname{diag}(-1,1,-1)
\]

keeps both \(PP\) and \(PN\), but as independent parameters, while killing
\(PI\) and \(IN\).  The full independent-sign group leaves only the three
diagonal entries and again removes \(PN\).

More generally, because the diagonal and off-diagonal representations are a
direct sum, any signed-permutation subgroup with nonzero fixed vectors in
both has fixed dimension at least two.  It cannot produce the desired common
one-dimensional ray.

## 4. U(1) characters

Let the family characters be \(q_P,q_I,q_N\) and the shared scalar character
be \(q_H\).  Keeping \(PP\) and \(PN\) requires

\[
2q_P+q_H=0,
\qquad
q_P+q_N+q_H=0.
\]

Subtracting gives

\[
\boxed{q_N=q_P.}
\]

Thus the circle ceases to distinguish the marked \(P\) and \(N\) lines when
both entries are present.  Moreover, character selection determines which
coefficients may occur, not their numerical equality.  The allowed \(PP\)
and \(PN\) coefficients remain two independent invariant tensors.

Assigning different characters to the Dirac and Majorana scalar branches
could distinguish the two supports, but then the branches no longer form one
universal shared-\(126_H\) coupling.  That is already the sector-dependent
repair, not a solution within the original premise.

## 5. Rank-one family projectors

For

\[
Y=vv^T,
\qquad
v=(v_P,v_I,v_N)^T,
\]

the proposed equality gives

\[
v_P^2=v_Pv_N\ne0
\quad\Longrightarrow\quad
v_N=v_P\ne0.
\]

It follows that

\[
Y_{NN}=v_N^2=v_P^2=Y_{PP}\ne0.
\]

This directly violates the required \(NN\) zero.  Setting \(v_N=0\) restores
the zero but kills \(PN\).  No rank-one family projector solves the problem.

The formal coefficient-space line

\[
\operatorname{span}
\left\{
\begin{pmatrix}
1&0&1\\
0&0&0\\
1&0&0
\end{pmatrix}
\right\}

\]

does have \(PP=PN\) and the desired zeros, but the displayed family matrix
has rank two.  A rank-one projector onto this line in the **six-dimensional
coefficient space** merely inserts the desired tensor by hand.  Used
universally in both 126 branches, it still activates forbidden Dirac \(PN\).

## 6. Natural stabilizer of the marked split

Let \(F=P\oplus Q\), with \(Q=I\oplus N\).  The natural compact stabilizer
of the selected line is

\[
U(1)_P\times U(2)_Q.
\]

Its symmetric square decomposes as

\[
\operatorname{Sym}^2F
=\operatorname{Sym}^2P
\oplus(P\otimes Q)
\oplus\operatorname{Sym}^2Q,
\]

of dimensions

\[
1+2+3.
\]

The \(PP\) coordinate lies in \(\operatorname{Sym}^2P\), while \(PN\) lies
in \(P\otimes Q\).  There is no intertwiner between them under the natural
stabilizer.  Refining to the full marked-flag torus
\(U(1)_P\times U(1)_I\times U(1)_N\) only separates them further.

Any family rotation capable of mixing \(PP\) and \(PN\) must mix the marked
\(P\) and \(N\) lines themselves.  It then moves the null projector and the
sector-dependent anchors whose preservation was the point of the family
construction.

## 7. Minimal viable texture and its exact cost

Introduce a branch label \(s\in\{D,M\}\) and one tensor

\[
\Xi
=E_D\otimes E_{PP}
+E_M\otimes(E_{PN}+E_{NP}).
\]

Then one scalar coefficient \(\Lambda\) gives

\[
\Lambda\Xi:
\qquad
Y_D^{\rm portal}=\Lambda E_{PP},
\qquad
Y_M^{\rm portal}=\Lambda(E_{PN}+E_{NP}).
\]

Adding independent safe complementary entries produces the explicit texture
stated in the Result.  Its Majorana complementary block is

\[
QMQ=
\begin{pmatrix}\mu&0\\0&0\end{pmatrix},

\]

so it has rank one, while

\[
\det M=-\mu\Lambda^2\ne0.
\]

This is an exact algebraic witness satisfying the portal equality, both
masks and full heavy rank.

But \(\Xi\) distinguishes two components of the parent \(126_H\).  It is not
an ordinary family symmetry commuting with Spin(10), because such a symmetry
would act uniformly on the whole irreducible 126.  It must descend from an
enlarged parent representation, a controlled Spin(10)-breaking spurion, or
the sector-dependent finite-geometry anchoring.

## 8. Strongest no-go and reopening datum

Within the bounded class of permutations, signed permutations, \(U(1)\)
characters, rank-one family projectors and compact stabilizers of the marked
split:

\[
\boxed{
\begin{minipage}{0.86\linewidth}
No one-dimensional invariant portal ray relates nonzero \(Y_{PP}\) and
\(Y_{PN}\) while preserving the required zeros.  More strongly, no symmetry
of one universal shared-126 family tensor can make \(Y_{PN}\) absent in its
Dirac component and present in its Majorana component.
\end{minipage}}
\]

The exact reopening datum is a sector-dependent family tensor or natural
transformation

\[
\Xi\in
\operatorname{span}\{D,M\}\otimes\operatorname{Sym}^2(F^*)

\]

whose components are proportional to \(E_{PP}\) and
\(E_{PN}+E_{NP}\), derived rather than postulated.  It must then pass:

1. compatibility with Spin(10) breaking and the 126 kinetic metric;
2. the finite-geometry \(J\), grading and opposite-anchor rules;
3. anomaly cancellation if the family symmetry is gauged;
4. Clebsch, VEV and wavefunction threshold normalization; and
5. radiative tangency of the common coefficient line.

The shared-126 route therefore remains open only after replacing “one
universal Yukawa matrix” by a derived branch-labelled intertwiner.

## Reproduction

Run:

```bash
node verification/verify/verify_spin23_spin10_shared126_family_symmetry_audit.mjs
```

The verifier enumerates all 48 signed permutations, computes the listed
fixed-space dimensions, proves diagonal/off-diagonal orbit separation,
checks the \(U(1)\) character equations and rank-one obstruction, verifies
the universal-tensor contradiction and confirms the determinant and masks of
the explicit sector-dependent texture.
