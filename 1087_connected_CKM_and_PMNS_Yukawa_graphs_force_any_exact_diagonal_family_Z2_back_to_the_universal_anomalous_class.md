# Connected CKM and PMNS Yukawa Graphs Force Any Exact Diagonal Family \(\mathbb Z_2\) Back to the Universal Anomalous Class

**Date:** 18 October 2026  
**Branches:** family-dependent parity, Yukawa connectivity, flavor commutant, anomaly completion  
**Claim status:** exact conditional theorem for connected nondegenerate Yukawa graphs; texture/non-Abelian exits remain open  
**Certificate:** [prove_connected_yukawa_graph_forces_family_universal_z2.mjs](scripts/prove_connected_yukawa_graph_forces_family_universal_z2.mjs)

## Executive result

Document 1086 left one minimal anomaly-free sign pattern: protect an even number of families, for example two of three. Generic flavor connectivity closes that exit for an exact **diagonal** family parity.

Let

\[
S_Q=\operatorname{diag}(s_{Q1},s_{Q2},s_{Q3}),
\qquad
S_L=\operatorname{diag}(s_{L1},s_{L2},s_{L3}),
\qquad s=\pm1,
\]

act on the left quark and lepton family spaces. If the quark mass/Yukawa graph is connected and nondegenerate, any exact sign symmetry commuting with both up- and down-sector Hermitian mass matrices has

\[
S_Q=\pm I_3.
\]

If the charged-lepton and neutrino graphs are likewise connected and nondegenerate,

\[
S_L=\pm I_3.
\]

Therefore the triplet-selection bits

\[
d_i=q_{Q_i}+q_{L_i}pmod2
\]

are universal:

\[
(d_1,d_2,d_3)=(0,0,0)
\quad\text{or}\quad
(1,1,1).
\]

The second pattern is anomalous by document 1086. The first does not distinguish the triplets. Thus:

\[
\boxed{
\text{connected three-family flavor}
+\text{ exact diagonal }\mathbb Z_2
\Longrightarrow
\text{no anomaly-free triplet split}.}
\]

## 1. Support-graph proof

For a Yukawa matrix \(Y\), invariance of a nonzero entry gives

\[
q_{L_i}+q_{R_j}+q_H=0\pmod2.
\]

View every nonzero \(Y_{ij}\) as an edge in a bipartite graph between left and right family vertices. Along an edge,

\[
q_{L_i}=q_{R_j}+q_H.
\]

If this bipartite support graph is connected, every left charge is equal and every right charge is equal. A family-dependent sign requires the support graph to split into disconnected components.

For a fully supported \(3\times3\) matrix, exhaustive enumeration of all

\[
2^3\times2^3\times2=128
\]

left-charge, right-charge and Higgs-charge assignments leaves only universal charges on each side.

## 2. Basis-independent commutant proof

Choose the up-quark mass basis:

\[
H_u=Y_uY_u^\dagger
=\operatorname{diag}(m_u^2,m_c^2,m_t^2),
\]

with nondegenerate eigenvalues. Any exact family sign commuting with \(H_u\) is diagonal in this basis.

The down-sector matrix is

\[
H_d=V_{\rm CKM}
\operatorname{diag}(m_d^2,m_s^2,m_b^2)
V_{\rm CKM}^\dagger.
\]

The equation

\[
[S_Q,H_d]=0
\]

implies

\[
(s_{Qi}-s_{Qj})(H_d)_{ij}=0.
\]

Whenever the off-diagonal support of \(H_d\) connects all three indices, all \(s_{Qi}\) are equal. The common diagonal-sign commutant is exactly

\[
\{+I_3,-I_3\}.
\]

The same proof applies to

\[
H_e=Y_eY_e^\dagger,
\qquad
H_\nu=Y_\nu Y_\nu^\dagger
\]

or to the corresponding effective Majorana mass operator, with PMNS connectivity replacing CKM connectivity.

This formulation does not require every entry of every Yukawa matrix to be nonzero. It requires only that the union of nonzero off-diagonal links connect the three family vertices.

## 3. Collision with the anomaly equation

Connected quark and lepton graphs give

\[
q_{Q_i}=q_Q,
\qquad
q_{L_i}=q_L.
\]

Hence

\[
d_i=q_Q+q_L=d
\]

for every family. The weak anomaly is

\[
\mathcal A_2=d_1+d_2+d_3=3d=d\pmod2.
\]

Anomaly cancellation forces \(d=0\), which removes the leptoquark/diquark distinction.

This joins the flavor and anomaly obstructions into one chain:

\[
\boxed{
\text{mixing connectivity}
\Rightarrow\text{universal parity}
\Rightarrow\text{odd-family anomaly if split}.}
\]

## 4. The exact two-plus-one exit

A disconnected \(2+1\) support graph permits

\[
S=\operatorname{diag}(-1,-1,+1)
\]

or permutations thereof. The two odd families contribute an even mod-two anomaly.

The certificate constructs an explicit block-support graph

\[
\{1,2\}\oplus\{3\}
\]

and finds nonuniversal sign solutions. This is the algebraic core of the family-dependent exit.

But it predicts an exact block structure in every Yukawa matrix on which the symmetry acts diagonally. Cross-block entries must be zero unless they carry an additional symmetry-breaking spurion. Observed three-family mixing therefore demands controlled breaking.

## 5. Spurionic rather than exact protection

Suppose a small off-block Yukawa entry \(\epsilon\) breaks the \(2+1\) parity. Then the forbidden scalar mixing is no longer exactly zero. It can be generated with enough insertions of the same flavor-breaking spurion.

This gives a possible hierarchy mechanism:

\[
\mu_{TD}^2\propto\epsilon^n.
\]

But the exponent \(n\), flavor contractions and proton-decay consequences must be calculated. Calling the parity “approximately exact” without this spurion counting would merely rename the tuning.

The high-value version of this branch is therefore not an arbitrary family sign. It is a flavor model that derives:

- a \(2+1\) leading texture;
- the CKM/PMNS-breaking spurions;
- the first allowed triplet-mixing invariant;
- sufficient suppression after running and threshold matching.

## 6. Non-diagonal family symmetries

The theorem concerns diagonal sign actions. A non-Abelian or permutation symmetry can act non-diagonally on family space and coexist with connected matrices if the Yukawas transform as spurions or occupy invariant tensor structures.

However, for fixed generic nondegenerate numerical mass matrices, the common unitary commutant remains only the overall phase. A non-diagonal exact symmetry requires degeneracy, additional Higgs/flavon fields, or treating Yukawas as symmetry-breaking expectation values.

This is a legitimate larger branch, but it is no longer the minimal parity repair.

## 7. Stop-everything and reopening criteria

**Generic-flavor stop:** do not claim that an exact family-diagonal \(2+1\) parity is compatible with generic connected CKM/PMNS mixing.

**Texture stop:** do not infer an exact symmetry from approximate numerical hierarchies. Exact protection requires exact support zeros or a specified spurion expansion.

**Degeneracy stop:** a non-diagonal exact family transformation requires an actual degeneracy or invariant multi-Higgs/flavon construction.

**Positive reopening trigger:** give an explicit flavor group, field representations and Yukawa spurions that reproduce observed mixing while pushing the first reflection-breaking triplet mass operator to calculably high order.

**Negative trigger:** if the first observed-mixing spurion already permits \(TD\) at first or second order with an unsuppressed coefficient, the family route does not solve proton safety.

## 8. Verdict

The minimal family-dependent repair is closed for generic exact flavor:

\[
\boxed{
\text{two-family anomaly cancellation requires a }2+1\text{ texture,}
\quad
\text{while connected mixing destroys that exact diagonal parity}.}
\]

The remaining flavor branch is necessarily a spurion or non-Abelian model-building problem. The cleaner alternatives are a higher discrete/inflow completion or acceptance of extremely suppressed nonperturbative violation.

## Position in the corpus

- [minimal \(\mathbb Z_9\) baryon-triality lift](1088_Z9_is_the_minimal_family_universal_cyclic_lift_that_protects_triplet_companion_mixing_and_its_three_family_quotient_is_baryon_triality.md)
- [odd-family universal \(\mathbb Z_2\) anomaly no-go](1086_for_an_odd_number_of_families_any_universal_Z2_that_splits_leptoquark_from_diquark_triplets_has_the_same_mod_two_weak_anomaly.md)
- [colour–lepton reflection Ward sector](1085_the_rank_one_spectral_zero_is_the_unbroken_colour_lepton_reflection_Ward_sector_but_three_generation_weak_instantons_make_it_nonperturbatively_anomalous.md)
- [minimal continuous \(U(1)\) protector no-go](1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md)
