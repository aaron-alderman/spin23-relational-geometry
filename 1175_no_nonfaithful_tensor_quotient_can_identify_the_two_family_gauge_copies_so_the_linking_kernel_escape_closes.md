# No Nonfaithful Tensor Quotient Can Identify the Two Family Gauge Copies, so the Linking-Kernel Escape Closes

**Date:** 19 October 2026  
**Branches:** nonfaithful tensor representation, semisimple ideals, diagonal gauge identification, linking algebra  
**Claim status:** exact finite-semisimple quotient no-go; non-algebraic correspondences and diagonal subalgebras remain separate branches  
**Certificate:** [prove_no_tensor_ideal_quotient_can_diagonally_identify_two_family_gauge_copies.mjs](scripts/prove_no_tensor_ideal_quotient_can_diagonally_identify_two_family_gauge_copies.mjs)

## Executive result

Document 1174 left one associative escape open: perhaps a nonfaithful representation of

\[
\mathcal A_{\rm SM}\otimes_{\mathbb R}(\mathbb C_P\oplus\mathbb C_Q)
\]

could kill the unwanted tensor factors while retaining the charge-three \(P|Q\) relation.

That escape does not work if the objective is to keep the Standard-Model gauge action on both family populations but identify it diagonally.

The tensor algebra is finite semisimple. Its simple factors are

\[
\left[\mathbb C^2\oplus M_2(\mathbb C)\oplus M_3(\mathbb C)^2\right]_P
\oplus
\left[\mathbb C^2\oplus M_2(\mathbb C)\oplus M_3(\mathbb C)^2\right]_Q.
\]

Every kernel of a \(*\)-representation is a two-sided ideal, and every ideal is a direct sum of some simple factors. Therefore every quotient merely deletes factors. It cannot identify a \(P\)-labelled factor with its \(Q\)-labelled partner.

If both family populations retain a weak or colour factor, their central idempotents remain orthogonal and their unitary groups remain independent. A quotient cannot turn \(G_P\times G_Q\) into the desired diagonal subgroup \(G_{\rm diag}=\{(g,g)\}\).

Consequently:

\[
\boxed{\text{nonfaithfulness can delete a family gauge copy, but cannot glue two surviving copies diagonally.}}
\]

Deleting one copy destroys the requirement that both populations carry the same Standard-Model gauge representation. Retaining both preserves the duplication. The proposed linking-kernel escape therefore closes for ordinary associative quotients.

## 1. The ten simple factors

For one complex family point,

\[
\mathcal A_{\rm SM}\otimes_{\mathbb R}\mathbb C
\cong
\mathbb C\oplus\mathbb C\oplus M_2(\mathbb C)
\oplus M_3(\mathbb C)\oplus M_3(\mathbb C).
\]

The two family idempotents produce ten simple factors total. Even if a physical representation selects one conjugate branch of each complex-type factor, it still retains at least

\[
[\mathbb C\oplus M_2(\mathbb C)\oplus M_3(\mathbb C)]_P
\oplus
[\mathbb C\oplus M_2(\mathbb C)\oplus M_3(\mathbb C)]_Q.
\]

These are independent summands.

## 2. Classification of kernels

For \(A=\bigoplus_{r=1}^{10}A_r\) with each \(A_r\) simple, every two-sided ideal is

\[
I_S=\bigoplus_{r\in S}A_r,
\]

and

\[
A/I_S\cong\bigoplus_{r\notin S}A_r.
\]

There are \(2^{10}=1024\) ideal quotients. None contains a relation \(a_P=a_Q\). Such equality defines the diagonal subalgebra of \(A_P\oplus A_Q\); it is not obtained by quotienting by a two-sided ideal.

The tempting anti-diagonal set \(\{(a,-a):a\in A\}\) is generally not an ideal: multiplication by \((b,0)\) produces \((ba,0)\), which is not anti-diagonal.

## 3. Why representations cannot secretly perform the identification

Any \(*\)-representation factors through its quotient by the kernel. If the central idempotents \(e_P,e_Q\) both survive, their images remain orthogonal:

\[
\pi(e_P)\pi(e_Q)=0.
\]

The two surviving simple summands act on orthogonal invariant subspaces. Their unitary elements can be varied independently.

To force the same gauge transformation on both subspaces, one must restrict the allowed unitary pairs externally to \((u,u)\). That is a subgroup selection, not a consequence of the representation kernel.

## 4. Why deleting one copy is unacceptable

If the quotient kills the weak or colour factor on the \(P\) population, then its quarks or doublets no longer carry the required Standard-Model representation. Killing it on \(Q\) has the analogous failure.

If a family idempotent itself is killed, one population disappears and the cross-Peirce edge \(PD_FQ\) vanishes.

The quotient therefore cannot simultaneously:

1. keep \(P\) and \(Q\);
2. keep the same internal gauge action on both;
3. retain their charge-three relation;
4. remove independent duplicated gauge transformations.

## 5. What a linking algebra would have to change

A genuine linking or correspondence construction can relate two corners:

\[
\mathcal L=
\begin{pmatrix}
A_P&E\\
E^\ast&A_Q
\end{pmatrix}.
\]

But if \(A_P=A_Q=A\) and \(E\) is an \(A\)-\(A\) Morita equivalence, the full linking algebra is typically a matrix amplification such as \(M_2(A)\), whose unitary group is larger still. Recovering only the diagonal \(A\) action requires a correspondence gauge principle, connection or fixed diagonal embedding.

That is not a quotient of the tensor algebra. The branch remains live only as a genuinely different groupoid/correspondence theory.

## 6. Consequence for the branch tree

The associative options are now sharply classified:

- **direct sum:** cannot decorate occupied physical bimodule slots;
- **faithful tensor product:** decorates them but enlarges and duplicates gauge factors;
- **nonfaithful tensor quotient:** deletes factors but cannot identify surviving family copies diagonally;
- **diagonal subalgebra:** preserves one gauge copy but contains no independent family selector or charge-three inner one-form;
- **full linking algebra:** generally enlarges to a matrix amplification and needs another gauge-selection principle.

No ordinary associative construction considered so far supplies all desired properties.

## 7. Claim ledger

- **Exact:** the tensor algebra has ten simple complex Wedderburn factors.
- **Exact:** every representation kernel is a direct sum of simple factors.
- **Exact:** every quotient only deletes factors.
- **Exact:** a quotient cannot identify \(P\)- and \(Q\)-labelled surviving factors.
- **Exact:** retaining both factors retains independent central idempotents and unitary groups.
- **No-go:** no nonfaithful quotient both preserves the internal action on both populations and forces its diagonal identification.
- **Open:** a correspondence with an independently justified diagonal gauge principle.
- **Open:** outer or Jordan realization.
- **Open:** boundary/defect realization.

## 8. Stop-everything and positive gates

**Kernel stop:** do not claim an unspecified representation kernel identifies duplicated factors; display the ideal and quotient.

**Diagonal stop:** the diagonal subalgebra of \(A\oplus A\) is not a quotient of \(A\oplus A\).

**Deletion stop:** removing one population's gauge factor is not gauge-copy identification.

**Linking stop:** writing a \(2\times2\) linking matrix does not itself restrict its gauge group to the diagonal.

**Positive correspondence trigger:** define the allowed local transformations and prove from correspondence axioms that the internal group acts diagonally while the \(P|Q\) relation retains charge three under an additional compact \(U(1)\).

## 9. Verdict

\[
\boxed{(A_P\oplus A_Q)/I\text{ can retain or delete }A_P,A_Q;\text{ it cannot replace them by }A_{\rm diag}.}
\]

The nonfaithful associative escape is closed. The research frontier has now genuinely left ordinary finite-algebra extensions and moved to outer/normalizer gauging, Jordan/groupoid composition or boundary/defect physics.

## Corpus position

- [faithful associative tensor-envelope no-go](1174_any_faithful_commuting_associative_realization_of_i_minus_3p_regenerates_the_full_tensor_algebra_so_the_minimal_bulk_ncg_route_is_outer_or_nonassociative.md)
- [two-point tensor exact-four/gauge enlargement](1171_the_two_point_tensor_family_has_exactly_four_characters_and_evades_the_slot_obstruction_but_grossly_enlarges_the_gauge_algebra.md)
- [direct-sum two-slot obstruction](1124_the_exact_four_direct_sum_has_a_two_sided_slot_obstruction_to_decorating_physical_SM_fermions.md)
