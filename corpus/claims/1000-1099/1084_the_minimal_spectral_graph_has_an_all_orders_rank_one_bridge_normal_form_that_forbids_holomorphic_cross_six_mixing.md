# The Minimal Spectral Graph Has an All-Orders Rank-One Bridge Normal Form That Forbids Holomorphic Cross-Six Mixing

**Date:** 18 October 2026  
**Branches:** all-orders spectral words, rank-one vacuum, finite-Dirac graph, proton safety  
**Claim status:** exact all-orders theorem under an explicit minimal-graph and single-line vacuum contract; quantum stability remains open  
**Certificate:** [prove_all_orders_rank_one_bridge_normal_form_for_minimal_spectral_graph.mjs](../../../verification/prove/prove_all_orders_rank_one_bridge_normal_form_for_minimal_spectral_graph.mjs)  
**Structural source:** [Chamseddine–Connes–van Suijlekom 2015](https://arxiv.org/abs/1507.08161)

## Executive result

The finite scans of document 1083 extend to an all-orders theorem.

Assume:

1. the minimal four-sector finite-Dirac graph
   \[
   L-R-R^c-L^c-L;
   \]
2. exactly one external \(H_L\) six and one external \(H_R\) six;
3. no left same-chirality Higgs VEV;
4. every other right same-chirality insertion is the same rank-one ten-plet vacuum line;
5. the \(\Sigma\) and \(\bar\Sigma\) vacuum transports preserve that line.

Then every closed spectral matrix word that could reduce to a holomorphic cross-six bilinear has zero coefficient:

\[
\boxed{
H_LH_R\text{ coefficient}=0
\quad\text{at every spectral word length}.}
\]

The proof has two independent parts:

- a bridge-crossing normal form forced by the finite graph;
- the rank-one antisymmetric kernel identity
  \[
  P_vM_LA_RM_RP_v=0.
  \]

This closes the bare spectral-action branch under its stated vacuum hypotheses. It does **not** yet prove radiative stability of the broken-phase effective field theory.

## 1. Canonical cut at the unique left-Higgs edge

A candidate closed word contains exactly one \(H_L\) and no \(H_L^\dagger\), because the left same-chirality tensor has zero VEV. Cyclicity of the trace lets us cut the word at that unique edge.

After traversing

\[
L\xrightarrow{H_L}L^c,
\]

the rest of the closed walk is a path from \(L^c\) back to \(L\) that does not use the removed \(H_L\) edge. Deleting that edge turns the square into the tree

\[
L^c-R^c-R-L.
\]

The right-Higgs edge \(R^c-R\) is a bridge of this tree.

## 2. Bridge-crossing lemma

Any path from \(L^c\) to \(L\) must cross the bridge from \(R^c\) to \(R\) one more time than it crosses in the reverse direction. Successive crossings of a bridge necessarily alternate orientation. Therefore the subsequence of right-Higgs labels has the form

\[
H_R^\dagger,
H_R,
H_R^\dagger,
H_R,
\ldots,
H_R^\dagger.
\]

It starts and ends with \(H_R^\dagger\). Every undaggered \(H_R\)—including whichever occurrence is retained as the external right six—is bracketed by two daggered right-Higgs insertions.

Excursions between neighboring bridge crossings cannot cross that bridge. They remain within one of the two components of the cut tree:

\[
\{L^c,R^c\}
\qquad\text{or}\qquad
\{R,L\}.
\]

They consist only of \(\Sigma\)-type backtracks and right-ten vacuum insertions.

## 3. Operator normal form

Let the right-neutrino breaking line be \(\ell=\operatorname{span}(v)\). In a gauge where the single VEV direction is real, its rank-one operator is

\[
P_v=vv^T.
\]

Let \(M_L\) and \(M_R\) be the accumulated vacuum transports on the two sides of a selected external right-six insertion \(A_R\). If every \(\Sigma\)-type vacuum preserves \(\ell\), then

\[
M_Lv=\lambda_Lv,
\qquad
M_Rv=\lambda_Rv,
\]

with the corresponding covector preservation in the Hermitian/diagonal physical vacuum.

The bridge lemma forces the local factor

\[
P_vM_LA_RM_RP_v.
\]

Since \(A_R^T=-A_R\),

\[
v^TA_Rv=0.
\]

Consequently

\[
P_vM_LA_RM_RP_v
=
\lambda_L\lambda_R
v(v^TA_Rv)v^T
=0.
\]

Once one factor in the cyclic matrix product is zero, the complete spectral word vanishes. The placement of the external \(H_L\) six and all remaining excursions is irrelevant.

## 4. All-orders theorem

Every admissible candidate word has exactly the bridge structure above. Hence:

> **Rank-one bridge theorem.** In the minimal spectral Pati–Salam block graph, with no left-Higgs VEV, one right rank-one ten-plet vacuum line, and \(\Sigma\)-type vacuum maps preserving that line, every bare spectral-action contribution to a holomorphic \(H_LH_R\) six bilinear vanishes at every order.

The Hermitian cross channel is not removed. The primitive length-four word still generates

\[
H_L^\dagger\Sigma H_R\bar\Sigma^\dagger+mathrm{h.c.}
\]

and therefore retains the desired left/right leptoquark communication.

The theorem separates the two relationships:

\[
\boxed{
\text{Hermitian cross relation survives},
\qquad
\text{holomorphic Pfaffian relation vanishes}.
}

## 5. Executable stress test

The certificate is not the proof, but it stress-tests every ingredient. It exhausts closed walks at lengths

\[
2,4,6,8,10,12,14,16.
\]

At length sixteen it checks:

- 131,072 closed walks;
- 5,920 candidate words;
- 15,264 possible choices of retained right-six occurrence.

Every candidate has the predicted alternating bridge subsequence and every evaluated component word is zero for two independent diagonal \(\Sigma/\bar\Sigma\) transports.

The finite scan supports the normal-form proof while remaining logically subordinate to it.

## 6. Exact hypothesis boundary

The theorem fails to cover—and may fail physically under—any of the following:

### 6.1 Multiple breaking lines

If the right-ten vacuum has rank at least two,

\[
P=vv^T+ww^T,
\]

then

\[
PA_RP
\]

contains cross terms proportional to \(v^TA_Rw\), which need not vanish.

### 6.2 Line-rotating transport

If a \(\Sigma\) vacuum or another spurion maps \(v\) to an independent vector \(w\), then the kernel becomes

\[
v^TA_Rw,
\]

which is generically nonzero.

### 6.3 Nonzero left-Higgs VEV

Additional \(H_L\) and \(H_L^\dagger\) VEV insertions restore cycles after deleting the external left edge. The residual graph is no longer the same tree, so the bridge lemma must be redone.

### 6.4 Nonminimal finite-Dirac support

One additional edge can turn the right-Higgs bridge into part of a second cycle and destroy the alternating normal form.

### 6.5 Quantum effective action

The spectral action supplies a boundary-condition subspace of couplings at the cutoff. Broken-phase renormalization generally permits every operator compatible with the surviving exact symmetries. The graph proof does not by itself show that loop counterterms remain spectral words or preserve the rank-one line.

## 7. Stop-everything and falsification criteria

**Bare-action promotion:** under the five explicit hypotheses, the all-orders spectral-word zero may now be used as a theorem rather than a conjecture.

**Model C promotion stop:** do not yet state that the physical Model C leptoquark/diquark mixing is exactly zero. The quantum effective action has not been shown to preserve the theorem.

**Vacuum-rank falsifier:** any second independent ten-plet VEV direction invalidates the rank-one kernel.

**Transport falsifier:** any vacuum map with \(Dv\notin\operatorname{span}(v)\) invalidates the line-preservation step.

**Graph falsifier:** any additional finite-Dirac edge connecting the two components of the cut tree invalidates the bridge normal form.

**Quantum reopening trigger:** compute the one-loop two-point function between the safe and companion triplets using the exact Model C Yukawa matrices. If a nonzero divergent coefficient exists, the bare spectral zero is not technically natural without an additional Ward identity.

## 8. Relation to the programme

This theorem realizes the programme's “nested dolls” composition in a precise way:

1. the large gauge representation allows the relationship;
2. the finite graph restricts which words can express it;
3. higher words recover the formal possibility;
4. the singular rank-one vacuum annihilates their component map;
5. quantum dynamics becomes the next larger doll and must decide whether the zero survives.

The Jordan content is equally concrete. Rank one is not decorative language: it is the determinantal boundary on which every alternating self-pairing vanishes. Moving into the interior of the positive cone supplies a second direction and reopens the Pfaffian relationship.

## 9. Verdict

The bare spectral-action question is now closed under a clear contract:

\[
\boxed{
\text{minimal graph}
+\text{ one breaking line}
+\text{ line-preserving transport}
\Longrightarrow
\text{all-orders absence of holomorphic cross-six mixing}.}
\]

The research frontier moves to radiative stability and to verifying that the actual Model C finite Dirac operator and vacuum satisfy the contract without hidden additional directions.

## Position in the corpus

- [higher spectral paths through length eight](1083_the_first_higher_spectral_holomorphic_cross_six_path_occurs_at_length_six_but_rank_one_breaking_kills_every_candidate_through_length_eight.md)
- [minimal length-four spectral square](1082_the_minimal_spectral_Pati_Salam_block_graph_forces_cross_six_mixing_to_be_Hermitian_at_quartic_order.md)
- [rank-one breaking-spurion audit](1081_the_common_H_phase_is_broken_by_the_Pati_Salam_ten_vev_but_a_rank_one_neutrino_spurion_annihilates_the_direct_six_Pfaffian_quartic.md)
- [residual colour–lepton reflection and anomaly](1085_the_rank_one_spectral_zero_is_the_unbroken_colour_lepton_reflection_Ward_sector_but_three_generation_weak_instantons_make_it_nonperturbatively_anomalous.md)
