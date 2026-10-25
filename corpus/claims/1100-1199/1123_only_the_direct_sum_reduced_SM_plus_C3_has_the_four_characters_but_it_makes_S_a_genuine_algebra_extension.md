# Only the Direct Sum \(\mathcal A_{\rm SM}\oplus\mathbb C^3\) Has the Four Characters, but the Carrier Is a Genuine Algebra Extension

**Date:** 18 October 2026  
**Replacement target:** physical embedding or rigorous exclusion of the connected four-character KO-6 null-mask completion  
**Branches:** Branch R, reduced strict first order, family-selector algebra, gauge-kernel boundary  
**Claim status:** exact finite-real-algebra character-counting theorem; physical bimodule and one-form realization remains open  
**Certificate:** [prove_reduced_SM_family_combination_character_trichotomy.mjs](../../../verification/prove/prove_reduced_SM_family_combination_character_trichotomy.mjs)

## Executive result

The reduced branch cannot proceed with the phrase “Standard Model algebra plus family \(\mathbb C^3\)” left ambiguous. There are at least three natural algebra constructions, and they are not equivalent:

\[
\mathcal A_{\rm SM}
=\mathbb C\oplus\mathbb H\oplus M_3(\mathbb C).
\]

1. The direct sum

   \[
   \mathcal A_R^{\oplus}
   =\mathcal A_{\rm SM}\oplus\mathbb C^3
   \]

   has exactly four complex characters: the existing Standard-Model \(\mathbb C\) character and the three family characters \(P,I,N\).

2. Replication by three real selector points,

   \[
   \mathcal A_R^{\rm rep}
   =\mathcal A_{\rm SM}\otimes_{\mathbb R}\mathbb R^3
   \cong\mathcal A_{\rm SM}^3,
   \]

   has only three complex characters—one in each copy. It does not produce an independent fourth spectator \(S\).

3. The literal real tensor product with \(\mathbb C^3\),

   \[
   \mathcal A_R^{\otimes}
   =\mathcal A_{\rm SM}\otimes_{\mathbb R}\mathbb C^3,
   \]

   has six complex characters because every \(\mathbb C\otimes_{\mathbb R}\mathbb C\) splits as \(\mathbb C\oplus\mathbb C\).

Therefore the only one of these three constructions whose primitive character set is literally \(\{P,I,N,S\}\) is the direct sum. But that result changes the interpretation: \(S\) is not supplied for free by a product geometry. The full algebra has genuinely been enlarged, and the required crossed bimodules and connector must be installed and tested.

## 1. Character-counting rule

For a finite direct sum of simple real \(*\)-algebras, every irreducible representation factors through one simple summand. A one-dimensional complex representation exists for a \(\mathbb C\) summand, but not for \(\mathbb H\) or \(M_n(\mathbb C)\) with \(n>1\), as proved in [1122](1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md).

Character counting therefore reduces to counting scalar \(\mathbb C\) factors after the real algebra has been decomposed into simple factors.

## 2. Direct sum: exactly four characters

The direct sum is

\[
\mathcal A_R^{\oplus}
=\mathbb C_S\oplus\mathbb H\oplus M_3(\mathbb C)
\oplus\mathbb C_P\oplus\mathbb C_I\oplus\mathbb C_N.
\]

It has exactly the four characters

\[
\{S,P,I,N\}.
\]

This is the first reduced algebra in the branch with the correct character cardinality. It also makes the logical cost explicit. The three family points are new summands. The existing internal \(\mathbb C) can be labelled \(S\), but the four-character geometry as a whole is an extension, not a subgeometry already present in \(\mathcal A_{\rm SM}\).

The central idempotents are orthogonal. Consequently the required sectors

\[
(P,S),\quad(S,P),\quad(S,P)\leftrightarrow(I,P)
\]

are crossed bimodules and an off-diagonal finite-Dirac block between distinct summand supports. Their existence is not implied by the character count.

## 3. Real selector replication: three characters, not four

If “three families” means three real selector points, then

\[
\mathcal A_{\rm SM}\otimes_{\mathbb R}\mathbb R^3
\cong
\mathcal A_{\rm SM}\oplus\mathcal A_{\rm SM}\oplus\mathcal A_{\rm SM}.
\]

Each copy contributes one scalar complex character. The total is three. These can label \(P,I,N\), but there is no independent \(S\). Calling the internal \(\mathbb C\) “the spectator” merely relabels one of the same three copywise characters and loses one family point.

Thus replication is not the four-character completion.

## 4. Literal real tensor product with \(\mathbb C^3\): six characters

The finite Standard-Model algebra is a real algebra. Its literal tensor product with a complex family algebra must therefore use the real tensor product. For each family factor,

\[
\mathbb C\otimes_{\mathbb R}\mathbb C
\cong\mathbb C\oplus\mathbb C,
\]

\[
\mathbb H\otimes_{\mathbb R}\mathbb C
\cong M_2(\mathbb C),
\]

and

\[
M_3(\mathbb C)\otimes_{\mathbb R}\mathbb C
\cong M_3(\mathbb C)\oplus M_3(\mathbb C).
\]

Only the first line contributes one-dimensional complex representations, but it contributes two per family point. Three family factors therefore give

\[
3\times2=6
\]

characters. This construction is not the four-character toy algebra either.

The doubling is not cosmetic: it is the algebraic record of the two complex embeddings arising when a complex algebra is complexified as a real algebra.

## 5. Abelian cost of the exact-four construction

Before imposing the Hilbert-space representation kernel or unimodularity, the connected central unitary torus of

\[
\mathcal A_{\rm SM}\oplus\mathbb C^3
\]

has rank five:

- one phase from the internal \(\mathbb C\);
- one central phase from \(U(3)\);
- three phases from \(\mathbb C^3\).

A single determinant-one equation can remove at most one rank. It follows that unimodularity alone cannot reduce this naive rank-five torus directly to the single Standard-Model hypercharge direction.

This is not yet a physical extra-\(U(1)\) count. The gauge map \(u\mapsto uJuJ^{-1}\), its kernel, the fermion multiplicities and possible central identifications must all be computed. It is, however, a hard warning: the exact-four carrier begins with substantial abelian redundancy, and that redundancy cannot be ignored.

## 6. Consequences for the physical embedding

The reduced branch now has a precise algebraic carrier and a precise burden of proof.

Required next:

1. choose a faithful particle/conjugate representation of \(\mathcal A_{\rm SM}\oplus\mathbb C^3\);
2. place the six oriented \(P,I,N\) sectors and the \(P,S\), \(S,P\) pair in physical fermion modules;
3. realize the connector \((S,P)\leftrightarrow(I,P)\) and its real partner as an allowed finite-Dirac block;
4. calculate \(\Omega_D^1\) and quotient by junk;
5. compute the gauge-map kernel and unimodular lattice rather than reading gauge rank from summand count;
6. check anomalies and the spin–weak global quotient on every added module.

The theorem does not yet say that this representation exists. It says exactly which algebraic interpretation can possibly realize the four labels without doubling or losing a point.

## 7. Stop-everything criteria

**Ambiguity stop:** never write \(\mathcal A_{\rm SM}+\mathbb C^3\) without specifying direct sum, real-selector replication or real tensor product.

**Replication stop:** \(\mathcal A_{\rm SM}^3\) has three characters, not four; it cannot contain an independent \(S\).

**Tensor stop:** \(\mathcal A_{\rm SM}\otimes_{\mathbb R}\mathbb C^3\) has six characters, not four; it is not the toy completion.

**Free-spectator stop:** even in the direct sum, relabelling the existing \(\mathbb C\) as \(S\) does not create the crossed spectator modules or connector.

**Gauge stop:** do not identify the naive central torus with the physical gauge group; compute the \(J\)-gauge kernel and unimodularity explicitly.

**Positive trigger:** a faithful real-even representation contains the required crossed modules and connector, its junk-quotiented one-forms preserve the null mask, and its physical abelian quotient has no unacceptable gauge direction.

## 8. Verdict

The reduced branch survives, but in only one precise form among the three natural constructions:

\[
\boxed{
\mathcal A_R^{\oplus}
=\mathcal A_{\rm SM}\oplus\mathbb C^3
\quad\Longrightarrow\quad
\operatorname{Irr}_1=\{S,P,I,N\}.
}
\]

This is progress because it removes an ambiguity that could otherwise fake the embedding. The next object is no longer an unspecified product: it is an explicit direct-sum algebra whose physical bimodule table must now be constructed or ruled out.

## Corpus position

- [Pati–Salam spectator-character obstruction and branch split](1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md)
- [connected four-character null-mask completion](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md)
- [minimal three-line family algebra](1116_the_minimal_associative_family_algebra_that_separates_selected_image_and_null_lines_is_C3_and_it_forces_an_extra_U1_plus_the_odd_KO6_obstruction.md)
- [two-sided direct-sum family-slot obstruction](1124_the_exact_four_direct_sum_has_a_two_sided_slot_obstruction_to_decorating_physical_SM_fermions.md)
