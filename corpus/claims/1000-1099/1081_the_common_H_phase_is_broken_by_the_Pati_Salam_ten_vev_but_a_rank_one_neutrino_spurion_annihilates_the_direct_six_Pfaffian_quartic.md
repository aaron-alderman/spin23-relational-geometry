# The Common \(H\) Phase Is Broken by the Pati–Salam \(\mathbf{10}\) VEV, but a Rank-One Neutrino Spurion Annihilates the Direct Six-Pfaffian Quartic

**Date:** 18 October 2026  
**Branches:** spectral Pati–Salam potential, phase grading, vacuum-induced mixing, proton safety  
**Claim status:** exact phase and rank-one contraction theorem; the complete Model C potential remains unpublished/unreconstructed  
**Certificate:** [audit_rank_one_pati_salam_breaking_spurion_against_six_pfaffian_mixing.mjs](../../../verification/audit/audit_rank_one_pati_salam_breaking_spurion_against_six_pfaffian_mixing.mjs)  
**Primary sources:** [Chamseddine–Connes–van Suijlekom 2013](https://arxiv.org/abs/1304.8050), [Chamseddine–Connes–van Suijlekom 2015](https://arxiv.org/abs/1507.08161), [Aydemir–Minic–Sun–Takeuchi 2018](https://arxiv.org/abs/1804.05844)

## Executive result

Document 1080 found a common phase that distinguishes useful Hermitian mixing from dangerous holomorphic Pfaffian mixing of the two complex Pati–Salam sixes. The first action-level audit gives a qualified answer:

1. the phase naturally extends to the complete same-chirality Higgs tensors \(H_{aIbJ}\) and \(H_{\dot aI\dot bJ}\), not to the sixes alone;
2. each such tensor contains both a six and a ten;
3. the Standard-Model-singlet right-neutrino direction in the \(\mathbf{10}\) must acquire a Pati–Salam-breaking VEV;
4. that VEV therefore breaks the continuous common \(H\)-phase;
5. gauge and phase bookkeeping then permit quartics of schematic type
   \[
   \mathbf6\,\mathbf6\,\overline{\mathbf{10}}\,\overline{\mathbf{10}};
   \]
6. nevertheless, every direct index contraction of this type vanishes when the symmetric \(\mathbf{10}\) spurion is rank one.

Thus the simple statement “the common phase protects the six” is too strong, but so is the opposite statement “the breaking VEV immediately regenerates the Pfaffian.” The minimal neutrino VEV sits on a special determinantal stratum where the obvious induced bilinear is annihilated by antisymmetry.

## 1. What the primary literature actually supplies

The 2013 spectral-action calculation writes the scalar mass and quartic terms as Hermitian index traces of the fluctuated Dirac operator. Its displayed fundamental/composite case contains one same-chirality tensor and organizes the potential through expressions of the form \(HH^\dagger\), \(|HH^\dagger|^2\), and mixed Hermitian traces with \(\Sigma\). It does not display a bare holomorphic \(H^TJH\) mass.

The 2015 classification states that the most general left–right finite Dirac operator supplies

\[
H_{aIbJ}=(1,1,6)+(1,3,10),
\qquad
H_{\dot aI\dot bJ}=(1,1,6)+(3,1,10),
\]

as fundamental inner fluctuations. It classifies field content and gauge running; it does not print the full left–right scalar potential.

The 2018 Model C analysis uses precisely those left and right tensors, derives their fermion couplings, and states explicitly that mixing between the safe triplet and its diquark companion is assumed small and that the companion is heavy. It does not derive that suppression from a displayed complete scalar potential.

The honest evidence boundary is therefore:

\[
\boxed{\text{the source split is derived; the complete mixing protection is not.}}
\]

## 2. The phase acts on a larger tensor

Let the same-chirality tensors transform as

\[
H_L\mapsto e^{i\theta}H_L,
\qquad
H_R\mapsto e^{i\theta}H_R.
\]

Their \(SU(4)\) decompositions inherit the same phase:

\[
A_{L/R}\in\mathbf6:\ q=1,
\qquad
S_{L/R}\in\mathbf{10}:\ q=1.
\]

The six Pfaffian has charge two, so it is absent while the phase is unbroken. But the neutral quartic

\[
A,B,S^\dagger S^\dagger
\]

has total charge zero. Once \(S\) acquires a VEV, it is a possible source of a holomorphic \(AB\) bilinear. The putative protector is therefore spontaneously broken by the same sector needed to descend from Pati–Salam to the Standard Model.

This does not yet prove that the spectral action contains the invariant with a nonzero coefficient. It proves that phase counting alone cannot exclude it after symmetry breaking.

## 3. Exact rank-one annihilation

Represent the six by antisymmetric tensors

\[
A^{IJ}=-A^{JI},
\qquad
B^{IJ}=-B^{JI},
\]

and the conjugate ten-spurion by a symmetric tensor \(S^*_{IJ}=S^*_{JI}\).

The Standard-Model-singlet neutrino VEV is rank one in the \(SU(4)\) indices:

\[
S^*_{IJ}=\bar v_I\bar v_J.
\]

Any invariant formed only by Kronecker contractions of

\[
A^{IJ}B^{KL}S^*_{MN}S^*_{PQ}
\]

ultimately feeds two copies of the same vector \(\bar v\) into each antisymmetric tensor. Every term therefore contains a factor

\[
A^{IJ}\bar v_I\bar v_J=0
\]

or its \(B\) analogue.

The certificate enumerates all \(4!=24\) bijective delta-contraction patterns and obtains zero for every one. For a generic higher-rank symmetric spurion, the same enumeration contains nonzero contractions. This is a rank-one theorem, not an identity of the representations.

The other primitive possibility also vanishes:

\[
\epsilon^{IJKL}S^*_{IJ}S^*_{KL}=0,
\]

because each symmetric pair is contracted against an antisymmetric epsilon tensor.

Hence the most direct quartic route obeys

\[
\boxed{
S^*=\bar v\bar v^T
\quad\Longrightarrow\quad
AB(S^*)^2=0
}
\]

for every complete index contraction of the stated type.

## 4. Why this is structurally interesting

The result is a small but literal instance of the programme's singular/relational theme. A generic symmetric background reconnects the two antisymmetric carriers. The rank-one boundary—the singular Jordan stratum—kills that reconnection exactly.

The protection is therefore not simply “continuous phase symmetry.” It is potentially the combination

\[
\text{Hermitian spectral trace}
+
\text{rank-one breaking vacuum}
+
\text{antisymmetric six}.
\]

That is more credible than assigning an unrelated global charge, because all three ingredients already belong to the spectral Pati–Salam construction. It is also more fragile: departures from rank one, additional spurions, mixed left/right vacua, or loop-generated structures can reopen the channel.

## 5. What remains unproved

This document does **not** establish proton safety of Model C. The following are still open:

- whether the complete left–right spectral action contains every gauge-allowed quartic or a smaller closed-path subset;
- whether terms involving \(\Sigma(1+15,2,2)\) and one or more ten-plet spurions induce the forbidden block;
- whether both left and right ten-plets acquire VEVs;
- whether the finite real structure identifies phase-conjugate tensors in a way that removes the nominal \(U(1)\);
- whether radiative corrections with Yukawa insertions generate mixing after Pati–Salam breaking;
- whether the phenomenologically required large mass splitting is stable.

The direct rank-one theorem removes one obvious danger. It does not close the full action audit.

## 6. Stop-everything and reopening criteria

**Phase stop:** do not describe the common \(H\)-phase as unbroken after the charged ten-plet develops a VEV.

**Immediate-mixing stop:** do not infer a six Pfaffian merely from phase breaking; the rank-one neutrino spurion annihilates every direct \(6\,6\,\overline{10}\,\overline{10}\) contraction.

**Literature stop:** do not attribute a complete Model C potential or an exact nonmixing theorem to the cited papers. The 2018 analysis labels the suppression as an assumption.

**Positive reopening trigger:** derive the full left–right fluctuated Dirac operator and show that every closed path contributing to the spectral action either remains Hermitian or vanishes on the rank-one vacuum.

**Negative trigger:** exhibit one nonzero vacuum-expanded term proportional to

\[
H_{3X}H_{\bar3Y}
\]

for \(X,Y\in\{L,R\}\). Then exact source superselection fails and quantitative proton-decay bounds become mandatory.

## 7. Verdict

The first vacuum-spurion audit neither proves nor destroys the phase-grading route. It replaces it with a sharper candidate mechanism:

\[
\boxed{
\text{complex orientation is broken, but the rank-one breaking point may preserve the safe block algebraically.}
}
\]

The next calculation should not be another abstract charge assignment. It should enumerate the closed length-four paths of the full left–right finite Dirac operator and reduce them on the rank-one Pati–Salam-breaking vacuum.

## Position in the corpus

- [complex-six Pfaffian mixing gate](1080_the_complex_Pati_Salam_six_has_a_gauge_invariant_Pfaffian_that_reconnects_leptoquark_and_diquark_sources_unless_a_phase_grading_forbids_it.md)
- [NCG Model C source/Wilson audit](1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md)
- [one-form multiplicity underdetermination](1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
- [minimal spectral closed-path theorem](1082_the_minimal_spectral_Pati_Salam_block_graph_forces_cross_six_mixing_to_be_Hermitian_at_quartic_order.md)
