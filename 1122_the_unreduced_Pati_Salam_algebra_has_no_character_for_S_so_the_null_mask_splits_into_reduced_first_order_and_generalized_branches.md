# The Unreduced Pati–Salam Algebra Has No Character for \(S\), so the Null Mask Splits into Reduced First-Order and Generalized Branches

**Date:** 18 October 2026  
**Replacement target:** physical embedding or rigorous exclusion of the connected four-character KO-6 null-mask completion  
**Branches:** B-NULL-MASK-A2-KO6-COMPLETION, strict first order, generalized Pati–Salam fluctuations  
**Claim status:** exact finite-algebra representation obstruction plus primary-source-backed branch split; reduced-algebra embedding remains open  
**Certificate:** [prove_unreduced_Pati_Salam_has_no_character_for_the_spectator_S.mjs](scripts/prove_unreduced_Pati_Salam_has_no_character_for_the_spectator_S.mjs)  
**Primary source:** [Chamseddine–Connes–van Suijlekom, *Beyond the Spectral Standard Model: Emergence of Pati-Salam Unification*](https://arxiv.org/abs/1304.8050)

## Executive result

The fourth character \(S\) required by the [connected null-mask completion](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md) cannot be identified literally with an existing summand of the unreduced spectral Pati–Salam algebra.

That algebra is

\[
\mathcal A_{\rm PS}
=\mathbb H_R\oplus\mathbb H_L\oplus M_4(\mathbb C).
\]

None of its three simple factors has a one-dimensional complex representation. Therefore

\[
\boxed{
\operatorname{Hom}_{\rm unital\,*}(\mathcal A_{\rm PS},\mathbb C)=\varnothing.
}
\]

The \(S\) of the four-complex-character toy model is not hiding among \(\mathbb H_R,\mathbb H_L\) or \(M_4(\mathbb C)\).

The obstruction forces a clean branch split:

1. **strict-first-order branch:** reduce to
   
   \[
   \mathcal A_{\rm SM}=\mathbb C\oplus\mathbb H\oplus M_3(\mathbb C),
   \]
   
   whose unique one-dimensional complex summand can be tested as \(S\), while \(P,I,N\) still require an explicit family extension;
2. **unreduced Pati–Salam branch:** retain \(\mathcal A_{\rm PS}\), abandon ordinary first order and recompute the mask in the generalized \(A_{(1)}+A_{(2)}\) fluctuation calculus.

The ordinary Krajewski prohibition of the dangerous Dirac edge is established only in the first branch. It cannot be imported unchanged into the second.

## 1. Why \(M_n(\mathbb C)\) has no character for \(n>1\)

Suppose a unital algebra homomorphism

\[
\phi:M_n(\mathbb C)\to\mathbb C
\]

existed. The diagonal matrix units \(E_{ii}\) are orthogonal idempotents summing to one, so exactly one image, say \(\phi(E_{rr})\), would equal one and another \(\phi(E_{ss})\) would equal zero.

But

\[
E_{rs}E_{sr}=E_{rr},
\qquad
E_{sr}E_{rs}=E_{ss}.
\]

Applying \(\phi\) gives

\[
\phi(E_{rs})\phi(E_{sr})=1,
\qquad
\phi(E_{sr})\phi(E_{rs})=0,
\]

which is impossible in the commutative target \(\mathbb C\). Hence \(M_4(\mathbb C)\) has no character.

## 2. Why \(\mathbb H\) has no complex character

Let a real-unital homomorphism \(\phi:\mathbb H\to\mathbb C\) send the quaternion units \(i,j,k\) to \(a,b,c\). Since

\[
ij=k,
\qquad
ji=-k,
\]

and complex numbers commute,

\[
c=ab=ba=-c.
\]

Thus \(c=0\). But \(k^2=-1\) requires

\[
c^2=-1,
\]

a contradiction. Neither quaternionic summand supplies a character.

## 3. Direct sums do not evade the obstruction

Every irreducible representation of a finite direct sum factors through one simple summand. The minimum complex dimensions in the unreduced algebra are therefore

\[
2, 2, 4,
\]

for \(\mathbb H_R,\mathbb H_L,M_4(\mathbb C)\), respectively. There is no one-dimensional option.

The center

\[
Z(\mathcal A_{\rm PS})\cong\mathbb R\oplus\mathbb R\oplus\mathbb C
\]

does not change this conclusion. A character of the center does not automatically extend to a character of the noncommutative simple factor. Replacing a summand by its central phase would discard the bimodule representation data needed for the physical intersection form.

## 4. The reduced algebra has exactly one candidate

The first-order-compatible reduction associated with the Majorana block is

\[
\mathcal A_{\rm SM}
=\mathbb C\oplus\mathbb H\oplus M_3(\mathbb C).
\]

Only the \(\mathbb C\) summand has a one-dimensional complex representation. Consequently it is the unique existing-algebra candidate for \(S\) in the strict-first-order branch.

This does not finish the embedding. One must still exhibit the sectors

\[
(P,S),\quad (S,P),\quad (S,P)\leftrightarrow(I,P),
\]

inside the enlarged physical Hilbert space. The family characters \(P,I,N\) are not supplied by \(\mathcal A_{\rm SM}\); they remain an explicit family extension.

## 5. Why the two branches cannot be mixed

The primary Pati–Salam construction emphasizes that removing the first-order restriction requires generalized inner fluctuations with both a linear and a quadratic part. The unreduced model contains fundamental Higgs representations including \((2,2,1)\), \((2,1,4)\) and \((1,1,1+15)\), with further fields fundamental or composite depending on the order-one assumptions.

Therefore:

- in the reduced branch, the horizontal/vertical first-order rule can genuinely forbid a diagonal Dirac edge;
- in the unreduced branch, first order is not an axiom, so “diagonal” does not by itself mean absent;
- the generalized \(A_{(2)}\) term can dress a first-order defect and must be checked directly on the dangerous Dirac support.

The physical question in the unreduced theory is not whether the edge is Krajewski-diagonal. It is whether the complete generalized fluctuation has zero projection onto that edge after all linear, quadratic and junk-equivalent contributions are included.

## 6. Revised embedding tree

### Branch R — reduced strict-first-order geometry

\[
\mathcal A_{\rm SM}
\quad+\quad
\text{family }\mathbb C^3
\quad+\quad
S=\text{the existing }\mathbb C\text{ character candidate}.
\]

Next tests:

- construct the complete product/direct-sum representation rather than identifying labels informally;
- locate the required \(J\)-paired spectator sectors;
- compute the represented one-forms and junk quotient;
- check whether the connector is an existing Higgs/Yukawa block;
- recompute the full intersection form with physical multiplicities;
- impose unimodularity and the spin–weak quotient.

### Branch P — unreduced generalized Pati–Salam geometry

\[
\mathcal A_{\rm PS}
\quad+\quad
\text{family extension}
\quad+\quad
A_{(1)}+A_{(2)}.
\]

Next tests:

- specify the family-extended representation;
- compute the first-order defect on the Dirac and Majorana null supports;
- evaluate \(A_{(2)}=\sum\widehat a[A_{(1)},\widehat b]\) explicitly;
- test whether the dangerous Dirac null component is generated even when absent linearly;
- retain the branch only if the full generalized fluctuation preserves the mask.

## 7. Stop-everything criteria

**Character stop:** do not call \(\mathbb H_R,\mathbb H_L\) or \(M_4(\mathbb C)\) the fourth complex character \(S\).

**Center stop:** a central phase or minimal projection is not a one-dimensional algebra representation of the full simple summand.

**First-order stop:** do not use a Krajewski diagonal-edge prohibition as a proof inside the unreduced model that explicitly relaxes first order.

**Reduced-branch stop:** the lone \(\mathbb C\) summand is only a candidate; without the crossed family/internal bimodules and connector it does not realize the four-character geometry.

**Generalized-branch stop:** a vanishing bare Dirac matrix entry is insufficient if \(A_{(2)}\) regenerates that support.

**Positive reduced trigger:** the physical reduced-algebra representation contains the spectator pair and connector, and the junk-quotiented one-form module preserves the null mask.

**Positive generalized trigger:** the complete \(A_{(1)}+A_{(2)}\) support excludes the dangerous Dirac null direction while retaining Majorana sewing.

## 8. Verdict

The first physical embedding attempt produces a no-go and a sharper target:

\[
\boxed{
S\notin\operatorname{Irr}_1(\mathcal A_{\rm PS}).
}
\]

The connected four-character geometry is not a hidden subdiagram of the unreduced Pati–Salam algebra. It belongs either to a reduced Standard-Model-level family extension using the unique \(\mathbb C\) character as a candidate anchor, or to a genuinely different generalized-fluctuation calculation where the first-order mask must be re-proved.

## Corpus position

- [connected four-character null-mask completion](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md)
- [spectral Pati–Salam family-anchor boundary](1104_the_spectral_Pati_Salam_algebra_does_not_supply_the_family_anchor_by_itself_but_its_non_first_order_quadratic_fluctuation_is_the_natural_charge_six_completion.md)
- [generalized quadratic-fluctuation support correction](1105_the_generalized_quadratic_inner_fluctuation_is_a_first_order_defect_dressing_not_the_square_of_the_charge_three_family_edge.md)
- [Pati–Salam Majorana defect and gauge/family separation](1106_the_Pati_Salam_Majorana_block_is_a_genuine_diagonal_A2_defect_but_its_Delta_square_is_gauge_not_family_structure.md)
- [reduced Standard-Model/family character trichotomy](1123_only_the_direct_sum_reduced_SM_plus_C3_has_the_four_characters_but_it_makes_S_a_genuine_algebra_extension.md)
