# The Exact-Four Direct Sum Has a Two-Sided Slot Obstruction to Decorating Physical Standard-Model Fermions

**Date:** 18 October 2026  
**Replacement target:** physical embedding or rigorous exclusion of the connected four-character KO-6 null-mask completion  
**Branches:** Branch R, reduced strict first order, physical bimodule embedding  
**Claim status:** exact ordinary-bimodule support theorem; exceptional self-pair sectors and non-associative/commuting-action exits remain open  
**Certificate:** [prove_direct_sum_family_two_sided_slot_obstruction.mjs](../../../verification/prove/prove_direct_sum_family_two_sided_slot_obstruction.mjs)

## Executive result

The direct sum

\[
\mathcal A_R^{\oplus}
=\mathcal A_{\rm SM}\oplus\mathbb C_P\oplus\mathbb C_I\oplus\mathbb C_N
\]

has exactly the four complex characters required by the toy null-mask geometry, but it does not make \(P,I,N\) into independent family labels on the existing Standard-Model fermions.

Every simple bimodule over a finite direct-sum algebra is supported on one left simple factor and one right simple factor:

\[
H_{ij}=e_iH e_j^\circ.
\]

That gives two algebra slots, not three. A physical fermion sector already supported on two distinct internal factors—for example a weak/internal or weak/color bimodule—cannot also carry an independent direct-sum family character \(P\), \(I\), or \(N\) without replacing one of those internal supports.

Thus the exact-four direct sum solves the character-counting problem only at the abstract Krajewski-point level. It cannot act as a universal family decoration of the physical Standard-Model bimodule table.

This closes the simplest reading of reduced Branch R:

\[
\boxed{
\text{right number of characters}
\not\Longrightarrow
\text{right physical family action}.
}
\]

## 1. The two-sided support theorem

Let

\[
\mathcal A=\bigoplus_{i=1}^r A_i
\]

with central primitive idempotents \(e_i\). Any \(\mathcal A\)-\(\mathcal A\) bimodule decomposes as

\[
H=\bigoplus_{i,j} H_{ij},
\qquad
H_{ij}=e_iH e_j^\circ.
\]

On a simple block \(H_{ij}\), the left action factors through \(A_i\), and the opposite action factors through \(A_j\). All other central idempotents annihilate that block.

Therefore a simple bimodule carries at most two simple-factor supports: one on each side. Multiplicity does not add a third algebra action; it only repeats the same \((i,j)\) representation.

## 2. Why direct-sum family points are not family decoration

Write the reduced internal factors schematically as

\[
S=\mathbb C,
\qquad H=\mathbb H,
\qquad C=M_3(\mathbb C),
\]

and add the family factors \(P,I,N\). The direct sum has six simple-factor labels:

\[
\{S,H,C,P,I,N\}.
\]

Adding \(P,I,N\) adds three new rows and three new columns to the Krajewski diagram. It does not refine every old cell \((i,j)\) into three family-labelled copies \((i,j;P)\), \((i,j;I)\), \((i,j;N)\).

For a sector supported on two different internal factors \((i,j)\), the desired independent family decoration would need three supports:

\[
(i,j;f),
\qquad f\in\{P,I,N\}.
\]

No such simple block exists in an ordinary \(\mathcal A\)-bimodule. One can form \((i,f)\) or \((f,j)\), but either choice replaces one internal support and generally changes the gauge representation.

## 3. The physical consequence

Weak doublets and colored sectors use nontrivial internal left/right support. A family selector intended to distinguish three generations must act without erasing those weak or color actions.

The direct-sum construction cannot do this uniformly. Its options are:

1. **replace an internal support:** the state becomes a different gauge representation;
2. **add crossed modules:** new \((i,P)\), \((i,I)\), \((i,N)\) sectors appear, generally as extra matter rather than labels on the old state;
3. **leave family in multiplicity space:** the physical module is retained, but the algebra acts generation-blindly and the null mask is no longer protected;
4. **introduce a commuting or tensor family action:** the family label can coexist with the internal pair, but the algebra is no longer the exact-four direct sum analyzed in [1123](1123_only_the_direct_sum_reduced_SM_plus_C3_has_the_four_characters_but_it_makes_S_a_genuine_algebra_extension.md).

The obstruction is especially sharp for the project’s purpose. The selector must distinguish Dirac and Majorana family directions inside physical neutrino modules, not merely create new abelian-singlet sectors carrying the same letters.

## 4. The exceptional self-pair boundary

A self-pair \((i,i)\) uses only one distinct simple factor. It may be replaced or crossed with a family factor while retaining one copy of \(i\). This is why some singlet or Majorana sectors can mimic parts of the toy diagram.

But that exception does not give a family action on the full physical spectrum. In particular:

- it does not decorate all weak doublets and colored multiplets;
- it does not preserve both internal supports of a genuinely mixed sector;
- it cannot by itself make the same \(P,I,N\) selector act consistently across Dirac and Majorana blocks.

So a successful embedding cannot be inferred from a right-handed-neutrino or other self-pair coincidence alone.

## 5. Relation to the four-character toy geometry

The toy construction remains mathematically valid. Its sectors

\[
PI,IP,PN,NP,IN,NI,PS,SP
\]

are honest bimodules over four scalar summands, and its connector is an honest first-order Dirac edge.

What fails is the proposed physical identification. Those scalar-scalar cells do not automatically coincide with the Standard-Model particle cells. Adding the internal \(\mathbb H\) and \(M_3(\mathbb C)\) factors beside them leaves the toy cells as new gauge-singlet or abelian sectors; it does not turn them into generation labels on the old nonabelian modules.

Therefore the toy \(A_2\) triangle is a correct incidence model but not a direct-sum subdiagram that can simply be pasted onto every physical fermion.

## 6. Surviving exits

The obstruction redirects rather than ends the target.

### 6.1 Commuting/tensor family action

Let a represented family algebra act on multiplicity space and commute with the internal action. This supplies the missing third datum, but it changes the simple-factor and character count. The six-character real-tensor result of [1123](1123_only_the_direct_sum_reduced_SM_plus_C3_has_the_four_characters_but_it_makes_S_a_genuine_algebra_extension.md) must then be confronted rather than ignored.

### 6.2 Normalizer or groupoid action

A family selector may act by normalizing or permuting multiplicity sectors without becoming a direct summand of the associative coordinate algebra. This preserves the two gauge slots but moves beyond the ordinary direct-sum Krajewski interpretation.

### 6.3 Jordan or conditional selector

The image/null distinction may be encoded by a Jordan projector, conditional expectation or state-dependent operator derived from the Majorana tensor. Then covariance and stability replace ordinary central-character protection.

### 6.4 Generalized unreduced Pati–Salam branch

Retain the generation-blind Pati–Salam representation and test the complete generalized fluctuation \(A_{(1)}+A_{(2)}\). This does not need an independent fourth character, but it must prove directly that dangerous Dirac null support is absent.

## 7. Stop-everything criteria

**Two-slot stop:** do not attach a third direct-sum character to a simple \((i,j)\) bimodule while retaining both original supports.

**Multiplicity stop:** repeated copies of \(H_{ij}\) are not a represented family algebra unless an additional action is specified.

**Singlet stop:** realizing the toy triangle in new scalar-scalar cells is not a physical family embedding of weak and colored fermions.

**Self-pair stop:** success on a self-pair or sterile sector does not establish a spectrum-wide family selector.

**Positive trigger:** exhibit a single faithful real-even representation in which the same represented family distinction acts across the required physical Dirac and Majorana modules while all Standard-Model gauge actions are retained.

## 8. Verdict

The simplest reduced direct-sum embedding is excluded as a universal physical family realization:

\[
\boxed{
\mathcal A_{\rm SM}\oplus\mathbb C^3
\text{ has the four points, but not the third slot needed to decorate }H_{ij}.
}
\]

The research target now has a cleaner fork. Either family is a commuting/tensor or generalized relational action rather than an added direct-sum point, or the unreduced generalized-fluctuation branch must produce the mask without a literal \(S\).

## Corpus position

- [reduced Standard-Model/family character trichotomy](1123_only_the_direct_sum_reduced_SM_plus_C3_has_the_four_characters_but_it_makes_S_a_genuine_algebra_extension.md)
- [Pati–Salam spectator-character obstruction and branch split](1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md)
- [connected four-character null-mask completion](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md)
- [Ophanim nested-commutant/Jordan-triple branch](1125_ophanim_wheels_within_wheels_as_a_nested_commutant_and_Jordan_triple_research_branch.md)
