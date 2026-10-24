# The Natural Oriented-Relation Rotation Is Dihedral and Blocks the Naïve \(J\rho\) Möbius \(C_6\)

**Date:** 18 October 2026  
**Branches:** KO-6 reality, oriented relationship composition, Real groupoid, Möbius holonomy  
**Claim status:** exact correction and no-go for the natural \(J\rho^k\) construction  
**Certificate:** [prove_natural_relation_rotation_is_dihedral_and_blocks_Jrho_C6.mjs](../../../verification/prove/prove_natural_relation_rotation_is_dihedral_and_blocks_Jrho_C6.mjs)

## Executive result

The abstract construction in [1134](1134_a_minimal_Real_groupoid_realizes_the_Mobius_C6_without_a_linear_anchor_mixing_seam.md) assumed that the sheet flip \(J\) commutes with the cyclic advance. That assumption is not satisfied by the natural oriented-composition cycles of the six KO-6 relation sectors.

The two cycles are

\[
PN\to NI\to IP\to PN
\]

and

\[
NP\to PI\to IN\to NP.
\]

Reality reverses every ordered relation:

\[
J(PN)=NP,\qquad J(NI)=IN,\qquad J(IP)=PI.
\]

If \(r\) advances each cycle in its compositional direction, then

\[
\boxed{JrJ=r^{-1}.}
\]

Consequently,

\[
(Jr^k)^2=1
\]

for every \(k=0,1,2\). None of the natural semilinear candidates \(J\), \(Jr\), or \(Jr^2\) has order six.

Thus:

\[
\boxed{
\text{KO reality plus natural oriented composition generates }D_3,\text{ not }C_6.
}
\]

The naïve Real-groupoid Möbius lift is filtered out.

## 1. Why \(J\) reverses the rotation

Let

\[
r(PN)=NI,\qquad r(NI)=IP,\qquad r(IP)=PN
\]

on the positive orientation cycle, and

\[
r(NP)=PI,\qquad r(PI)=IN,\qquad r(IN)=NP
\]

on the negative cycle.

Then

\[
JrJ(NP)=Jr(PN)=J(NI)=IN.
\]

But

\[
r^{-1}(NP)=IN.
\]

The same identity holds on all six sectors.

This is not an arbitrary sign convention. Reversing an ordered relation reverses the direction in which composable arrows cycle. Reality therefore acts as a reflection of the oriented triangle.

## 2. The dihedral no-go

The relations

\[
r^3=1,\qquad J^2=1,\qquad JrJ=r^{-1}
\]

present the dihedral group

\[
D_3\cong S_3.
\]

Every element outside the rotation subgroup is a reflection:

\[
J,\qquad Jr,\qquad Jr^2.
\]

Each has order two:

\[
(Jr^k)^2
=Jr^kJr^k
=r^{-k}r^k
=1.
\]

No product of one \(J\) with a natural compositional rotation gives the desired order-six transport.

This is stronger than the previous underdetermination. It is an exact no-go for a specific implementation class.

## 3. Why the abstract \(C_6\) construction worked

The construction in [1134](1134_a_minimal_Real_groupoid_realizes_the_Mobius_C6_without_a_linear_anchor_mixing_seam.md) used a **sheet-parallel** rotation \(c\) satisfying

\[
Jc=cJ.
\]

It advances

\[
PN\to NI\to IP
\]

on one sheet but

\[
NP\to IN\to PI
\]

on the other.

The second sequence is the reverse of the natural compositional cycle

\[
NP\to PI\to IN.
\]

For this parallel rotation,

\[
(Jc)^3=J,\qquad (Jc)^6=1.
\]

The mathematics of [1134] is correct, but its \(c\) cannot be identified with the natural relation-composition advance \(r\).

## 4. Updated branch filter

| Candidate transport | Relation with \(J\) | Order | Status |
|---|---|---:|---|
| natural \(r\) | \(JrJ=r^{-1}\) | \(3\) | established composition |
| \(Jr^k\) | reflection | \(2\) | **no-go for Möbius \(C_6\)** |
| sheet-parallel \(c\) | \(JcJ=c\) | \(3\) | abstractly live |
| \(Jc\) | commuting product | \(6\) | abstract \(C_6\), but \(c\) is non-compositional |
| extra normalizer/correspondence | unknown | unknown | live |

The Real branch is therefore narrowed from “use \(J\)” to:

> derive a sheet-parallel cyclic normalizer distinct from natural oriented composition, or add further structure that changes the dihedral relation.

## 5. Physical interpretations of the mismatch

### 5.1 Composition and transport may be different

The compositional rotation \(r\) orders arrows according to source-target matching. A connection transporting a local frame need not use that same orientation. If a physical normalizer implements \(c\), the abstract \(C_6\) remains possible.

### 5.2 One sheet may be contravariant

The negative sheet may naturally represent the opposite category. In that case its compositional arrows run backward while a covariant frame transport runs parallel. The distinction between \(r\) and \(c\) would then be categorical rather than ad hoc.

### 5.3 Additional phase or type data may enlarge \(D_3\)

An extra central extension, grading shift, spectator path or nontrivial natural transformation could lift a reflection to an element of higher order. Such data must be constructed explicitly; it is absent from the current six-sector permutation action.

## 6. Stop-everything criteria

**Dihedral stop:** do not claim \(Jr\) has order six when \(r\) is the natural oriented-composition rotation.

**Direction stop:** do not identify the parallel rotation \(c\) with composition on both sheets; it reverses the negative compositional order.

**Group-order stop:** the six elements of \(D_3\) do not imply the existence of an element of order six. \(S_3\) has no such element.

**Subsequent independent recurrence:** [Mystery Atlas 16](../../programmes/dynatology/mystery_atlas_16_parity_triangle_and_three_step_return.md) finds the same obstruction in the golden matrix's parity shadow. There \(GL(2,2)\cong S_3\) acts transitively on three index-two sublattices, but its trivial center and absence of order-six elements prevent the parity triangle itself from supplying a commuting sheet flip or \(C_6\) lift. The agreement is exact at the finite-group level; the carriers remain different.

**Extension stop:** any proposed order-six lift must exhibit the extra datum that changes the relation \(JrJ=r^{-1}\) or enlarges the group.

**Positive trigger:** derive \(c\) as a covariant frame transport on an opposite-category sheet, or construct a central/type extension in which the lifted reflection genuinely has order six.

## 7. Verdict

The cleanest naïve Real construction has failed against the actual composition orientation:

\[
\boxed{
J+\text{natural relation rotation}
\Longrightarrow D_3,\quad\text{not }C_6.
}
\]

What remains live is narrower and more interesting:

\[
\boxed{
\text{composition is dihedral, while Möbius transport would require a distinct parallel/covariant lift}.
}
\]

This makes “two faces” mathematically consequential. One face carries the opposite composition, and a Möbius connection—if physical—must relate covariant transport to that contravariant algebra rather than merely multiplying the cycle by \(J\).

## Corpus position

- [abstract commuting-rotation Real \(C_6\)](1134_a_minimal_Real_groupoid_realizes_the_Mobius_C6_without_a_linear_anchor_mixing_seam.md)
- [typed TRO third-edge obstruction](1133_the_typed_TRO_preserves_the_null_mask_but_cannot_generate_the_third_odd_Mobius_edge.md)
- [KO-6 reality underdetermination](1130_KO6_reality_supplies_the_sheet_involution_but_does_not_determine_Mobius_holonomy.md)
- [current trivial relation cover](1129_the_current_KO6_triangle_is_two_oriented_C3_sheets_not_yet_a_Mobius_C6_cover.md)
- [parallel deck involutions and their first-order obstruction](1136_every_parallel_deck_involution_gives_C6_but_contains_one_first_order_forbidden_relation_reversal.md)

