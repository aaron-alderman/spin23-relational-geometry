# Generation-Blind Furey/CAR Conjugation Cannot Canonically Fix the Flavor Real Structure or Its Phase Torus

**Date:** 17 October 2026  
**Branches:** B03, B08, B11 and B14  
**Claim status:** exact commutant and equivariant-selection no-go for simple generation replication

## 1. The proposed source of flavor reality

The completed one-generation Furey/CAR system carries internal conjugations, dagger operations and particle–hole maps. Could one of them canonically select the flavor antiunitary needed by the graded-real response?

Under simple three-generation replication, the state space has the form

\[
\mathcal H_{\rm int}\otimes F,
\qquad F\cong\mathbb C^3,
\]

and every one-generation internal operator acts as

\[
A_{\rm int}\otimes I_F.
\]

This factorization gives an exact obstruction.

## 2. Full flavor unitary commutant

For every \(U\in U(3)\),

\[
[A_{\rm int}\otimes I_3, I_{\rm int}\otimes U]=0.
\]

Thus the replicated one-generation algebra is invariant under the full flavor-frame action

\[
I_{\rm int}\otimes U(3).
\]

No datum contained solely in \(A_{\rm int}\otimes I_3\) distinguishes one flavor basis, one flavor conjugation or one set of eigenline phases from another.

## 3. Space of flavor conjugations

An antiunitary involution on \(F\) can be written

\[
J_F=AK,
\]

where \(A\) is unitary and satisfies

\[
A\bar A=I.
\]

Equivalently, after choosing a unitary frame \(U\),

\[
J_F=UKU^\dagger
=(UU^T)K.
\]

Two frames differing by a real orthogonal transformation define the same conjugation. Hence the space of flavor conjugations is

\[
\boxed{
\mathcal C_F\cong U(3)/O(3).
}

The flavor group acts transitively on this space. Choosing one conjugation breaks \(U(3)\) to its orthogonal stabilizer.

## 4. Equivariant-selection no-go

Suppose generation-blind Furey data selected a canonical \(J_F\). Because those data are unchanged by every \(U\in U(3)\), equivariance would require

\[
UJ_FU^{-1}=J_F
\qquad\text{for every }U\in U(3).
\]

No conjugation has full \(U(3)\) stabilizer; its stabilizer is only a conjugate of \(O(3)\). Therefore:

\[
\boxed{
\text{generation-blind internal data cannot canonically select a flavor conjugation.}
}

This is a symmetry obstruction, not a failure to find the correct formula.

## 5. Tensoring the internal conjugation does not solve it

One may write

\[
J_{\rm total}=J_{\rm int}\otimes J_F.
\]

But \(J_{\rm int}\) does not determine \(J_F\). Replacing

\[
J_F\mapsto UJ_FU^{-1}
\]

for arbitrary \(U\in U(3)\) changes the flavor real structure while leaving every generation-blind Furey operator and relation unchanged.

Likewise, choosing

\[
J_{\rm total}=J_{\rm int}\otimes K
\]

merely imports a preferred flavor basis. It is not derived from the one-generation algebra.

## 6. Relation to the eigenline phase torus

Once a Yukawa/mass-squared spurion \(H\) is supplied, it breaks the flavor symmetry and determines spectral projectors. But the involutive antiunitaries fixing a nondegenerate \(H\) still form a \(U(1)^3\) phase family.

Generation-blind Furey conjugation does not fix those three phases because it acts on the other tensor factor. Additional generation-sensitive data are still required.

Therefore neither:

- the abstract flavor conjugation \(U(3)/O(3)\), nor
- the phase torus of conjugations adapted to one \(H\)

is selected by simple replication of the one-generation CAR structure.

## 7. How the obstruction can be evaded

The no-go does not apply if the enlarged theory contains genuine generation-sensitive structure, such as:

- nontrivial operators in the flavor commutant selected by the action;
- generation-coupling Furey arrows rather than a tensor multiplicity;
- a source-defined flavor metric, bilinear form or exceptional flag;
- Yukawa matrices derived as internal operators rather than external coefficients;
- boundary, anomaly or modular data that break \(U(3)\) covariantly;
- a dynamical vacuum in the flavor-conjugation space.

Any such proposal must identify the new datum explicitly. Merely tensoring by \(\mathbb C^3\) cannot do the job.

## 8. Consequence for the current synthesis

The one-generation Furey results remain strong where they apply:

- Standard-Model gauge representations;
- ternary composition;
- puncture-neutral gauge stabilizer;
- completed linking-graph topology.

But flavor reality and CP require an additional layer. The current canonical flavor objects remain the Hermitian spurions, their spectral flags and projector quadrilaterals—not a generation-blind CAR conjugation.

## 9. Branch decision

- **Closed:** simple generation replication leaves a full \(U(3)\) commutant.
- **Closed:** flavor conjugations form \(U(3)/O(3)\).
- **Closed:** no point of that space is invariant under the full flavor group.
- **Closed:** a generation-blind Furey/CAR conjugation cannot canonically select a flavor conjugation or eigenline phase torus.
- **Open:** generation-sensitive internal structure beyond tensor multiplicity.
- **Open:** an exceptional, boundary, anomaly or dynamical selector for flavor real data.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** derive a nontrivial generation operator from Furey/ex-ceptional structure that breaks the flavor commutant and canonically selects the observed relative spectral flags.

**Commutant falsifier:** a purported one-generation operator \(A\otimes I_3\) fails to commute with some \(I\otimes U\).

**Equivariance falsifier:** generation-blind data select one conjugation while remaining invariant under a flavor unitary that moves it.

**Tensoring falsifier:** claim that \(J_{\rm int}\otimes K\) derives \(K\) without supplying a flavor basis.

**Scope warning:** this no-go applies to simple replication; it does not exclude a genuinely generation-sensitive extension of the algebra.

## 11. Certificate

The [generation-blind conjugation no-go certificate](../../../verification/verify/verify_generation_blind_furey_conjugation_cannot_select_flavor_real_structure.mjs) verifies the full flavor commutant, constructs distinct involutive flavor conjugations with identical internal data and confirms their orthogonal rather than unitary stabilizer behavior.

## Companion documents

- [Sector real-structure phase torus](442_sector_real_structures_form_a_phase_torus_so_their_relative_product_is_not_a_canonical_flavor_observable.md)
- [Universal flavor real-structure no-go](441_a_universal_flavor_real_structure_stabilizes_only_an_orthogonal_subgroup_and_forces_the_jarlskog_invariant_to_vanish.md)
- [Completed Furey TRO/five-bit intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Flavor plaquette in the amplified TRO](431_the_flavor_plaquette_lifts_to_an_inner_ternary_automorphism_only_after_generation_amplification_of_the_furey_tro.md)
