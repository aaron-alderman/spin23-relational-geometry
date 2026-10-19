# One \(S_1\) Mediator Cannot Generate a Pure \(F_Cp\) Pulse, but Two Orthogonal Copies Realize the Exact Oriented Star

> **Forward result (document 1073).** The unpunctured \(Spin(10)\) \(16_F16_F10_H\) Clebsch tensor fixes the two desired arms with the exact opposite orientation, but it does not evade this document's rank-one obstruction. One unified vector mediator still restores the third edge, and its full multiplet also restores diquark channels. See [the exact Clebsch-sign theorem and its cost](1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md).

**Date:** 18 October 2026  
**Branches:** \(S_1\) tree matching, Wilson Gram rank, pure Furey pulse, mediator multiplicity, oriented phase, proton-safe completion  
**Claim status:** exact tree-level rank obstruction and constructive two-mediator repair; source selection of the copies and phases open  
**Certificate:** [derive_the_s1_tree_matching_rank_one_obstruction_and_two_mediator_repair.mjs](scripts/derive_the_s1_tree_matching_rank_one_obstruction_and_two_mediator_repair.mjs)

> **Forward correction (document 1063).** The construction below is an exact
> tree-level existence witness, not a source derivation or a radiatively
> protected completion. The doubled-arrow incidence supplies three coupling
> slots but does not itself supply two propagating \(S_1\) copies. Moreover,
> the shared \(QL\) coupling generates an allowed off-diagonal scalar
> self-energy and hence generically regenerates \(C_{ud}\). The displayed
> ±\(i\) edge phases are also rephasing-conventional on the open star until
> another interaction fixes the source frame. See [the multiplicity,
> mass-metric and loop-stability audit](1063_the_doubled_furey_links_do_not_supply_two_S1_copies_and_the_shared_QL_leg_radiatively_breaks_the_naive_orthogonality.md).

## Executive result

Document 1061 found that one \(S_1\) representation can couple to all three bilinears required by the Furey pulse. Explicit tree matching reveals a necessary correction:

> One \(S_1\) field can generate both desired dimension-six operators, but it cannot generate only those two operators.

Let

\[
B_L=QL,
\qquad
B_u=u^ce^c,
\qquad
B_d=d^c\nu^c.
\]

For one heavy mediator, the tree-level Wilson matrix has rank one:

\[
C_{ij}\propto\lambda_i^*\lambda_j,
\qquad
i,j\in\{L,u,d\}.
\]

If both desired entries

\[
C_{Lu}\ne0,
\qquad
C_{Ld}\ne0
\]

are present, then

\[
\lambda_L,\lambda_u,\lambda_d\ne0,
\]

and therefore

\[
\boxed{
C_{ud}=\lambda_u^*\lambda_d\ne0.
}
\]

The additional operator

\[
B_u^\dagger B_d+\text{h.c.}
\]

is unavoidable. A single mediator cannot realize the pure two-edge \(F_Cp\) star.

Two \(S_1\) copies are necessary and sufficient. In mediator-copy space choose coupling columns

\[
\lambda_L=
\begin{pmatrix}1\\1\end{pmatrix},
\qquad
\lambda_u=
\begin{pmatrix}i\\0\end{pmatrix},
\qquad
\lambda_d=
\begin{pmatrix}0\\-i\end{pmatrix}.
\]

Then

\[
\lambda_L^\dagger\lambda_u=+i,
\qquad
\lambda_L^\dagger\lambda_d=-i,
\qquad
\lambda_u^\dagger\lambda_d=0.
\]

This gives exactly the required opposite oriented phases while eliminating the unwanted right–right edge.

The Wilson Gram matrix is

\[
\boxed{
C=
\begin{pmatrix}
2&i&-i\\
-i&1&0\\
i&0&1
\end{pmatrix},
}
\]

which is positive semidefinite and has rank two.

Thus the minimal pure-pulse UV rank is two. The remaining question is whether the doubled Furey/linking geometry actually derives these two orthogonal mediator directions and their phases, rather than merely permitting them.

## 1. Tree integration as a Gram matrix

For heavy scalars \(S_a\) of common gauge representation \(S_1\), write schematically

\[
\mathcal L_{\rm int}
=\sum_a
\left[
S_a\lambda_{aL}B_L
+S_a^\dagger
\left(
\lambda_{au}B_u+\lambda_{ad}B_d
\right)
+\text{h.c.}
\right].
\]

After integrating out the mediators, the coefficient matrix is, up to the overall Lagrangian sign convention,

\[
C_{ij}
=\sum_a\frac{\lambda_{ai}^*\lambda_{aj}}{M_a^2}.
\]

Absorb \(M_a^{-1}\) into the coupling vectors. Then

\[
C=V^\dagger V.
\]

The mediator number bounds the rank:

\[
\operatorname{rank}C
\le N_{S_1}.
\]

This Gram structure is stronger than the representation audit. It correlates all operators produced by a common mediator.

## 2. Rank-one obstruction

For one mediator,

\[
C=
\begin{pmatrix}
|\lambda_L|^2&
\lambda_L^*\lambda_u&
\lambda_L^*\lambda_d\\
\lambda_u^*\lambda_L&
|\lambda_u|^2&
\lambda_u^*\lambda_d\\
\lambda_d^*\lambda_L&
\lambda_d^*\lambda_u&
|\lambda_d|^2
\end{pmatrix}.
\]

The pure Furey star asks for

\[
C_{Lu}\ne0,
\qquad
C_{Ld}\ne0,
\qquad
C_{ud}=0.
\]

The first two inequalities require all three couplings nonzero. Their product forces the third entry nonzero.

Equivalently, every rank-one Gram matrix satisfies

\[
C_{Lu}^*C_{Ld}
=C_{LL}C_{ud}.
\]

If \(C_{LL}\ne0\), vanishing \(C_{ud}\) forces at least one desired edge to vanish.

This is an exact algebraic no-go independent of coupling magnitude, mediator mass or Fierz convention.

## 3. The unavoidable extra operator

With the one-copy phase choice that would match the desired edges,

\[
\lambda_L=1,
\qquad
\lambda_u=i,
\qquad
\lambda_d=-i,
\]

one gets

\[
C_{Lu}=+i,
\qquad
C_{Ld}=-i,
\]

but also

\[
C_{ud}=-1.
\]

The extra gauge-invariant interaction is schematically

\[
(u^ce^c)^\dagger(d^c\nu^c)+\text{h.c.}
\]

It is not a Fierz rewriting of either desired operator because it contains a different conjugation and channel pairing. It represents a genuinely additional response edge.

Whether that edge is phenomenologically fatal depends on its flavor and kinematic realization, but it means the one-mediator theory does not reduce to the exact sparse generator \(F_Cp\).

## 4. Minimal rank-two repair

In a two-dimensional mediator space, choose the right-bilinear coupling vectors orthogonal:

\[
\lambda_u^\dagger\lambda_d=0.
\]

Let the left vector overlap both:

\[
\lambda_L^\dagger\lambda_u=+i,
\qquad
\lambda_L^\dagger\lambda_d=-i.
\]

The explicit choice in the executive result proves existence. It can be read as:

- \(S_1^{(u)}\) couples to \(QL\) and \(u^ce^c\);
- \(S_1^{(d)}\) couples to \(QL\) and \(d^c\nu^c\);
- no mediator couples to both right bilinears.

The coefficient matrix has rank two. A rank-one completion is impossible, so two copies are minimal.

Unequal masses are harmless algebraically after rescaling the coupling vectors, though they make equal-magnitude matching a nontrivial relation among masses and couplings.

## 5. Relation to the doubled Furey geometry

The appearance of two mediator directions is not arbitrary relative to the programme. The doubled-arrow geometry already distinguishes:

- the \(u^c-e^c\) link;
- the \(d^c-\nu^c\) link;
- their common \(Q-L\) link.

This incidence pattern is exactly a two-leg star with a shared left node. The rank-two repair promotes the two right legs to orthogonal mediator directions while letting the shared \(QL\) bilinear overlap both.

The tempting interpretation is that the doubled Furey construction supplies precisely the needed copy index. That is not yet proved. One must show that its two link directions:

- carry identical \(S_1\) gauge quantum numbers;
- have orthogonal kinetic terms;
- inherit the relative \(\pm i\) orientation;
- do not mix through the scalar mass matrix.

## 6. Proton stability

Each copy can carry

\[
B=-\frac13,
\qquad
L=-1.
\]

The desired couplings conserve \(B\) and \(L\), while diquark couplings remain forbidden if these charges are exact.

The two-copy repair does not itself worsen proton stability. But an off-diagonal scalar mass term

\[
S_1^{(u)\dagger}S_1^{(d)}
\]

is allowed by gauge and \(B,L\) quantum numbers. Such mixing rotates the mediator basis and can reintroduce the unwanted right–right Wilson entry unless the coupling vectors remain orthogonal in the inverse-mass metric.

The correct condition is therefore

\[
\lambda_u^\dagger M^{-2}\lambda_d=0,
\]

not merely orthogonality in an arbitrarily chosen field basis.

## 7. Matching condition in invariant form

Let the mass-weighted inner product be

\[
\langle x,y\rangle_M=x^\dagger M^{-2}y.
\]

The exact pure-pulse conditions are

\[
\langle\lambda_u,\lambda_d\rangle_M=0,
\]

\[
\langle\lambda_L,\lambda_u\rangle_M=+ic,
\]

\[
\langle\lambda_L,\lambda_d\rangle_M=-ic,
\qquad c\in\mathbb R_{>0},
\]

up to the common response and field-phase convention.

These conditions are basis independent in mediator space. They are the proper target for a Furey/linking-algebra derivation.

## 8. Stop-everything tests and falsifiers

**One-mediator falsifier:** one \(S_1\) is claimed to generate both desired edges and no other cross operator. Rank one excludes this.

**Two-copy trigger:** the source geometry produces two orthogonal \(S_1\) modes whose mass-weighted coupling vectors satisfy the three displayed inner products.

**Mass-mixing falsifier:** orthogonality is checked before, but not after, diagonalizing the full \(S_1\) mass matrix.

**Phase trigger:** the Furey orientation or CP structure fixes the two overlaps to \(+ic\) and \(-ic\).

**Extra-edge alternative:** if the right–right operator is observed or required by another branch, the one-mediator model may remain live, but it no longer realizes the pure \(F_Cp\) pulse.

**Loop-stability gate:** radiative corrections must preserve the mass-weighted orthogonality or its violation must lie below the response tolerance.

## Verdict

| Question | Verdict |
|---|---|
| Can one \(S_1\) generate both desired operators? | **Yes** |
| Can it generate only those two crossed operators? | **No** |
| Unavoidable one-copy addition? | **\(B_u^\dagger B_d+\mathrm{h.c.}\)** |
| Minimum mediator rank for the pure star? | **Two** |
| Does a constructive exact repair exist? | **Yes** |
| Are the two copies and phases source-derived? | **No** |

## Position in the corpus

- [minimal dimension-six \(S_1\) completion](1061_the_minimal_sm_field_completion_of_the_furey_channel_pulse_is_a_pair_of_dimension_six_S1_exchange_operators_with_an_underived_relative_phase.md)
- [doubled Furey gauge-dressed links](programme_foundations_parallel_03_gauge_dressing_turns_the_three_extra_furey_links_into_s1_s3_leptoquark_channels.md)
- [positive effective response pulse](1060_a_positive_first_order_response_pulse_generates_the_full_furey_channel_flow_without_bulk_degeneracy_but_needs_microscopic_charge_completion.md)
