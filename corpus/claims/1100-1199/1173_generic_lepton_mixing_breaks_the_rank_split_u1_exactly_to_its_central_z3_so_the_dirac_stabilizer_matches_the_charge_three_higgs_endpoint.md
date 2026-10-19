# Generic Lepton Mixing Breaks the Rank-Split \(U(1)\) Exactly to Its Central \(\mathbb Z_3\), so the Dirac Stabilizer Matches the Charge-Three Higgs Endpoint

**Date:** 19 October 2026  
**Branches:** finite-Dirac stabilizer, realistic lepton mixing, charge-three flavon, residual \(\mathbb Z_3\), normalizer versus vacuum symmetry  
**Claim status:** exact generic support-graph and stabilizer theorem; microscopic one-form origin remains open  
**Certificate:** [verify_generic_lepton_mixing_breaks_rank_split_u1_exactly_to_central_z3.mjs](../../../verification/verify/verify_generic_lepton_mixing_breaks_rank_split_u1_exactly_to_central_z3.mjs)

## Executive result

The apparent conflict between the rank-split family \(U(1)_X\) and realistic lepton mixing is the expected symmetry-breaking pattern, provided the forbidden Yukawa entries arise through the charge-three flavon.

Let

\[
X=I-3P=\operatorname{diag}(-2,1,1).
\]

At the unbroken level, \(X\) permits a \(1\oplus2\) lepton texture. Generic physical mixing connects the selected line to the complementary plane and therefore does not commute with the continuous group \(\exp(itX)\). But it commutes precisely at

\[
3t=0\pmod{2\pi}.
\]

At those values,

\[
\exp(itX)=e^{it}I_3,
\qquad
t\in\left\{0,\frac{2\pi}{3},\frac{4\pi}{3}\right\}.
\]

Hence

\[
\boxed{
U(1)_X
\xrightarrow{\text{generic cross-block mixing}}
\mathbb Z_3^{\rm central}.
}
\]

This is exactly the subgroup left by a charge-three condensate:

\[
U(1)_X\xrightarrow{\langle S_{q=3}\rangle}\mathbb Z_3.
\]

The fixed physical Dirac operator should therefore not retain the continuous \(U(1)_X\). Its generic stabilizer is expected to retain only the Higgsed discrete subgroup. The continuous symmetry belongs to the covariant ultraviolet field system in which the off-block Yukawa entries contain \(S\) or \(S^\dagger\); after choosing \(\langle S\rangle\), the numerical Dirac matrix has only \(\mathbb Z_3\).

This removes one false no-go. The remaining NCG question is not whether \(I-3P\) commutes with the observed numerical Yukawas. It is whether the finite fluctuation/mediator system contains a charge-three field that makes those Yukawas covariant before its vacuum is fixed.

## 1. Fixed Dirac data versus covariant field data

There are two different symmetry questions.

### Vacuum stabilizer

Given numerical matrices \(Y_e,Y_\nu,M_R\), find family unitaries \(U\) satisfying

\[
U^\dagger H_eU=H_e,
\qquad
U^\dagger H_\nu U=H_\nu,
\]

and the corresponding Majorana condition.

For nondegenerate \(H_e\), its unitary commutant is \(U(1)^3\) in its eigenbasis. If the support graph of a second generic Hermitian spurion is connected, its nonzero off-diagonal entries equate all three phases. The common commutant becomes scalar \(U(1)\). Intersecting with \(SU(3)\) leaves its centre:

\[
U(1)I_3\cap SU(3)=\mathbb Z_3.
\]

### Gauge-covariant ultraviolet system

Before symmetry breaking, Yukawa operators need not be invariant as bare numerical constants. They can be covariant monomials such as

\[
Y_{PQ}\frac{S}{\Lambda},
\qquad
Y_{QP}\frac{S^\dagger}{\Lambda},
\qquad
M_{PP}\frac{S^2}{\Lambda}.
\]

The full expressions are \(U(1)_X\)-invariant. Setting \(S\) to its vacuum value produces generic numerical mixing while reducing the stabilizer to \(\mathbb Z_3\).

Conflating these two questions incorrectly turns ordinary spontaneous breaking into an inconsistency.

## 2. Exact subgroup calculation

Under \(\exp(itX)\), the selected line has phase \(e^{-2it}\) and the complementary plane has phase \(e^{it}\). A nonzero cross-block matrix element transforms with phase

\[
e^{i(1-(-2))t}=e^{3it}
\]

or its inverse. It is invariant exactly when

\[
e^{3it}=1.
\]

For \(t=2\pi m/3\),

\[
e^{-2it}=e^{it},
\]

so the surviving transformation is scalar on family space. This proves both the residual group and its centrality.

## 3. Generic support-graph theorem

Let \(U=\operatorname{diag}(e^{i\theta_1},e^{i\theta_2},e^{i\theta_3})\) commute with a Hermitian family matrix \(H\). Every nonzero entry \(H_{ij}\) imposes

\[
e^{i(\theta_j-\theta_i)}=1.
\]

Construct a graph whose vertices are families and whose edges are the nonzero off-diagonal entries of \(H\). The commutant phases are constant on connected components.

Therefore:

- a \(1\oplus2\) block graph has two independent phases and admits the block-scalar \(U(1)\times U(1)\);
- a connected three-family graph has one common phase;
- imposing determinant one on that common phase gives \(\mathbb Z_3\).

Observed nontrivial lepton mixing strongly motivates the connected case, subject to the usual distinction between support and measured parameter values.

## 4. The flavon insertion pattern is exactly the graph completion

The family weight difference matrix is

\[
q_i-q_j=
\begin{pmatrix}
0&-3&-3\\
3&0&0\\
3&0&0
\end{pmatrix}.
\]

Thus:

- within-block Dirac edges are neutral;
- each edge completing the family graph across \(P|Q\) has charge \(\pm3\);
- one \(S\) or \(S^\dagger\) insertion completes each such edge;
- the exceptional Majorana self-pair has charge six and requires \(S^2\).

The same field that breaks the group therefore fills exactly the edges that reduce the vacuum stabilizer to \(\mathbb Z_3\).

This is stronger than parallel numerology:

\[
\boxed{
\text{the charge-three Higgs graph and the generic-mixing stabilizer graph are the same graph.}
}
\]

## 5. Relation to the finite spectral triple

In an almost-commutative geometry, the bare finite Dirac operator acts like a chosen vacuum datum; inner fluctuations turn suitable Dirac entries into scalar fields. It is therefore reasonable that a continuous gauge group need not stabilize \(D_F\) itself.

However, this does not automatically solve the embedding:

- \(U(1)_X\) must first belong to the admissible gauge/automorphism structure;
- the \(P|Q\) Dirac edge must produce a represented one-form of charge three;
- the junk quotient must not remove it;
- the spectral action must permit a nonzero vacuum;
- the remaining discrete subgroup must act faithfully on the full matter spectrum.

The theorem changes the normalizer target. Requiring the full numerical \(D_F\) to preserve \(U(1)_X\) is too strong. The correct requirement is covariance of the fluctuated field system and \(\mathbb Z_3\) invariance of the chosen vacuum.

## 6. Relation to the central \(\mathbb Z_3\) and BF theory

On family space alone, the residual element is scalar:

\[
e^{2\pi iX/3}=e^{2\pi i/3}I_3.
\]

Across the complete Standard-Model multiplets, \(X=B-2Y-3L_i\) has different integral charges. Its reduction modulo three is the baryon-triality-type discrete gauge action already classified in documents 1092–1097.

Because the ultraviolet charge lattice contains primitive unit charges, this \(\mathbb Z_3\) is faithful. If the broken \(U(1)_X\) is compact and dynamical, its gapped gauge sector has the level-three BF description

\[
\frac3{2\pi}\int b_2\wedge da_1.
\]

The stabilizer theorem therefore connects the observed mixed Dirac vacuum to the same discrete group needed by the nine-state carrier.

## 7. Claim ledger

- **Exact:** nondegenerate \(H_e\) has diagonal phase commutant \(U(1)^3\).
- **Exact:** a connected second family-support graph reduces the common unitary commutant to scalar \(U(1)\).
- **Exact:** its determinant-one subgroup is central \(\mathbb Z_3\).
- **Exact:** \(\exp(it(I-3P))\) commutes with a nonzero cross-block entry iff \(e^{3it}=1\).
- **Exact:** at those three values it acts as a scalar on family space.
- **Exact:** the cross-block charges are \(\pm3\), so one charge-three flavon insertion restores ultraviolet covariance.
- **Exact:** the exceptional Majorana self-entry has charge six and needs two insertions.
- **Conditional:** the physical lepton support graph is generic and connected in the ultraviolet completion.
- **Open:** the charge-three field as a junk-surviving finite one-form.
- **Open:** a spectral potential producing its condensate.
- **Open:** derivation of the selected projector and admissible \(U(1)_X\) gauge action.

## 8. Stop-everything and positive gates

**Wrong-stabilizer stop:** do not require the broken continuous \(U(1)_X\) to commute with the fully mixed numerical Dirac vacuum.

**Spurion stop:** calling \(Y_{PQ}\) a spurion does not supply a dynamical Higgs field; the charged field or mediator must exist.

**Graph stop:** if the physical support graph remains disconnected after symmetry breaking, the residual stabilizer exceeds \(\mathbb Z_3\).

**Discrete stop:** a scalar family-space \(\mathbb Z_3\) is not yet the full matter action; verify all species charges.

**Positive NCG trigger:** the finite one-form module contains the cross-block \(S_{q=3}\), its invariant dressed Yukawa graph is connected, and its vacuum stabilizer is exactly the known faithful \(\mathbb Z_3\).

**Positive BF trigger:** the compact broken gauge field and its vortex sector remain gapped so that the residual discrete gauge theory is dynamical rather than merely a selection rule.

## 9. Verdict

The realistic-Yukawa objection does not close the family route. It produces precisely the desired endpoint:

\[
\boxed{
\begin{array}{c}
\text{rank-split ultraviolet }U(1)_X\\
\xrightarrow{\;S_{q=3}\text{ dresses the cross-blocks}\;}\\
\text{generic mixed Dirac vacuum with exact central }\mathbb Z_3.
\end{array}
}
\]

The unresolved issue has narrowed again. The programme no longer needs an exact continuous family symmetry of the observed numerical mass matrices. It needs a covariant finite geometry that generates the charge-three dressing field before the vacuum is chosen.

## Corpus position

- [unimodular centre of the rank-split stabilizer](1172_the_unique_charge_three_family_u1_is_the_unimodular_centre_of_the_rank_split_stabilizer_not_the_full_tensor_algebra.md)
- [charge-three Higgs and level-three BF](1170_the_anomaly_free_b_minus_3li_charge_three_flavon_is_a_direct_dynamical_origin_of_level_three_bf_if_the_family_algebra_embeds.md)
- [minimal anomaly-free lift and flavon texture](../1000-1099/1096_three_families_admit_a_minimal_anomaly_free_continuous_baryon_triality_lift_but_it_forces_a_one_plus_two_lepton_texture_repaired_by_a_charge_three_flavon.md)
- [charged-lepton projectors and missing one-form](../1000-1099/1099_the_charged_lepton_Dirac_spectrum_canonically_labels_all_three_family_projectors_but_neither_selects_one_B_minus_3Li_vertex_nor_generates_its_charge_three_flavon.md)
