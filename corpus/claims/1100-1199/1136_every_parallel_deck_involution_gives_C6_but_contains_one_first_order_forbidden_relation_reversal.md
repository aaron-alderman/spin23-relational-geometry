# Every Parallel Deck Involution Gives \(C_6\) but Contains One First-Order-Forbidden Relation Reversal

**Date:** 18 October 2026  
**Branches:** parallel deck transport, first-order condition, Möbius \(C_6\), typed relation sectors  
**Claim status:** exhaustive six-sector permutation and first-order classification  
**Certificate:** [prove_parallel_deck_involutions_each_hit_one_first_order_forbidden_pair.mjs](../../../verification/prove/prove_parallel_deck_involutions_each_hit_one_first_order_forbidden_pair.mjs)

## Executive result

The dihedral obstruction in [1135](1135_the_natural_oriented_relation_rotation_is_dihedral_and_blocks_the_naive_Jrho_Mobius_C6.md) can be bypassed abstractly by replacing reality \(J\) with a sheet-exchanging involution \(\delta\) that commutes with the natural compositional rotation \(r\):

\[
\delta r=r\delta.
\]

There are exactly three such involutions on the six oriented sectors. For every one,

\[
(\delta r)^6=1
\]

and \(\delta r\) has order six.

But every candidate contains exactly one pair that changes both the left and opposite characters. That pair is forbidden as a complex-linear Dirac edge by the first-order condition.

Therefore:

\[
\boxed{
\text{an abstract parallel }C_6\text{ exists, but no such deck flip is wholly realizable by first-order linear arrows}.
}
\]

The Möbius lift is forced into one of three categories: structural/categorical transport, generalized non-first-order fluctuation, or mediator-assisted transport.

## 1. The three parallel involutions

Let the natural cycles be

\[
\mathcal C_+=(PN,NI,IP),
\qquad
\mathcal C_-=(NP,PI,IN).
\]

A sheet-exchanging involution commuting with the cycle is determined by a relative shift

\[
k\in\mathbb Z_3.
\]

It pairs the \(i\)-th state of \(\mathcal C_+\) with the \((i+k)\)-th state of \(\mathcal C_-\). These are the only possibilities.

Their pairings are:

| Shift | Parallel pairs | First-order status |
|---:|---|---|
| \(0\) | \(PN\leftrightarrow NP\), \(NI\leftrightarrow PI\), \(IP\leftrightarrow IN\) | forbidden, allowed, allowed |
| \(1\) | \(PN\leftrightarrow PI\), \(NI\leftrightarrow IN\), \(IP\leftrightarrow NP\) | allowed, forbidden, allowed |
| \(2\) | \(PN\leftrightarrow IN\), \(NI\leftrightarrow NP\), \(IP\leftrightarrow PI\) | allowed, allowed, forbidden |

Each candidate has precisely two horizontal/vertical pairs and one diagonal relation-reversal pair.

## 2. Why every lift has order six

Because

\[
\delta^2=1,\qquad r^3=1,\qquad \delta r=r\delta,
\]

the product \(\delta r\) has order

\[
\operatorname{lcm}(2,3)=6.
\]

This is the algebraic structure

\[
\langle r,\delta\rangle\cong C_3\times C_2\cong C_6,
\]

in contrast to

\[
\langle r,J\rangle\cong D_3.
\]

The difference between Möbius-compatible and dihedral transport is now one equation:

\[
\boxed{
JrJ=r^{-1},
\qquad
\delta r\delta=r.
}
\]

## 3. First-order obstruction

For bimodule labels \((i,j)\) and \((k,\ell)\), a complex-linear finite-Dirac edge satisfies first order only if

\[
i=k
\qquad\text{or}\qquad
j=\ell.
\]

Each parallel involution necessarily pairs one relation with its reversal:

\[
(i,j)\leftrightarrow(j,i).
\]

For \(i\ne j\), both coordinates change, so this edge is diagonal in the Krajewski grid and violates first order.

The forbidden pair rotates among

\[
PN\leftrightarrow NP,\qquad
NI\leftrightarrow IN,\qquad
IP\leftrightarrow PI
\]

as the shift \(k\) changes. Gauge choice can move the obstruction but cannot remove it.

## 4. What has been filtered out

The following simultaneous claim is now impossible in the strict first-order toy geometry:

> The Möbius deck involution is a complex-linear physical operator made entirely from allowed direct edges on the six oriented sectors.

Every possible commuting deck involution requires one forbidden diagonal block.

This does not rule out the abstract cover and does not rule out generalized Pati–Salam fluctuations. It rules out the simplest strict-first-order linear realization.

## 5. Surviving branches

### 5.1 Structural deck transformation

Treat \(\delta\) as an external type identification or covering-space automorphism, not as a Dirac edge. Then the first-order rule does not apply directly. The physical one-forms remain mask-preserving while the relational category carries \(C_6\).

### 5.2 Generalized non-first-order fluctuation

In the unreduced Pati–Salam branch, diagonal support can participate through \(A_{(2)}\). One may test whether exactly the required reversed pair survives and whether it avoids the dangerous Dirac channel.

### 5.3 Mediator resolution

Replace the forbidden diagonal map by two allowed horizontal/vertical maps through an extra sector such as \(S\):

\[
(i,j)\longrightarrow(i,s)\longrightarrow(j,s)
\]

or its vertical counterpart. The effective transport can exchange the endpoints while each elementary edge satisfies first order.

This is now the precise role a spectator could play. It does not automatically twist the cover; it may resolve the one unavoidable diagonal pair.

## 6. Branch-selection information

The three shifts are equivalent topologically but not necessarily physically. The location of the forbidden pair determines which sector bears the cost:

- \(k=0\): the \(P-N\) reversal is exceptional;
- \(k=1\): the \(N-I\) reversal is exceptional;
- \(k=2\): the \(I-P\) reversal is exceptional.

A physical asymmetry—Majorana support, the spectator connector, or symmetry breaking—may select one shift. Until then, cyclic covariance keeps all three as gauge-related presentations of the same obstruction.

## 7. Stop-everything criteria

**Linear-deck stop:** no \(\delta_k\) is a sum solely of allowed first-order direct edges.

**Gauge stop:** moving the forbidden reversal among the three relations does not remove it.

**Reality stop:** \(\delta\ne J\) for every commuting candidate; do not rename the parallel deck flip as KO reality.

**Mediator stop:** a two-step resolution must be computed in the represented calculus; a drawn intermediate vertex is not enough.

**Positive trigger:** demonstrate that the physical \(S\)-connector or generalized \(A_{(2)}\) support resolves exactly one diagonal reversal while retaining the null mask.

## 8. Verdict

The Möbius branch has survived another filter, but only in a non-naïve form:

\[
\boxed{
C_6\text{ requires a parallel deck flip }\delta,
\quad
\delta\text{ requires one non-first-order direct pair}.
}
\]

That turns the fourth-character spectator and the generalized Pati–Salam branch from peripheral repairs into concrete candidate mechanisms. Their task is no longer vague: resolve one unavoidable reversed-relation block without turning it into a forbidden physical scalar.

## Corpus position

- [dihedral obstruction for \(Jr\)](1135_the_natural_oriented_relation_rotation_is_dihedral_and_blocks_the_naive_Jrho_Mobius_C6.md)
- [abstract Real/groupoid \(C_6\)](1134_a_minimal_Real_groupoid_realizes_the_Mobius_C6_without_a_linear_anchor_mixing_seam.md)
- [typed TRO third-edge obstruction](1133_the_typed_TRO_preserves_the_null_mask_but_cannot_generate_the_third_odd_Mobius_edge.md)
- [four-character spectator completion](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md)
- [minimal spectator Möbius no-go](1137_the_minimal_spectator_completion_cannot_realize_Mobius_holonomy_without_erasing_the_anchor_mask.md)

