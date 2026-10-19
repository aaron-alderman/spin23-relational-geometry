# The Minimal Spectral Pati–Salam Block Graph Forces Cross-Six Mixing to Be Hermitian at Quartic Order

**Date:** 18 October 2026  
**Branches:** finite Dirac graph, spectral closed paths, Model C scalar potential, proton-safe mixing  
**Claim status:** exact theorem for the published minimal four-sector block support and length-four spectral loops  
**Certificate:** [enumerate_minimal_spectral_pati_salam_length_four_closed_paths.mjs](../../../verification/enumerate/enumerate_minimal_spectral_pati_salam_length_four_closed_paths.mjs)  
**Primary sources:** [Chamseddine–Connes–van Suijlekom 2015](https://arxiv.org/abs/1507.08161), [Chamseddine–Connes–van Suijlekom 2013](https://arxiv.org/abs/1304.8050)

## Executive result

The finite Dirac support printed in the spectral Pati–Salam construction has four sectors,

\[
L,\quad R,\quad L^c,\quad R^c,
\]

and four undirected block types,

\[
L\!\leftrightarrow\!R:\Sigma,
\qquad
L\!\leftrightarrow\!L^c:H_L,
\qquad
R\!\leftrightarrow\!R^c:H_R,
\qquad
L^c\!\leftrightarrow\!R^c:\bar\Sigma.
\]

Hermiticity labels the reverse orientation of every edge by the adjoint field. Exhaustive enumeration gives 32 closed walks of length four. Exactly eight traverse all four sectors and contain both \(H_L\) and \(H_R\). Every one contains one daggered and one undaggered \(H\):

\[
H_L\,\bar\Sigma\,H_R^\dagger\,\Sigma^\dagger
\]

or its cyclic rotations and Hermitian reverse.

There is no length-four closed path containing holomorphic \(H_LH_R\) or antiholomorphic \(H_L^\dagger H_R^\dagger\).

Therefore the minimal spectral quartic can communicate the two complex sixes through a Hermitian cross channel, but its block topology does not generate the dangerous cross-Pfaffian channel isolated in document 1080.

## 1. Derivation from the published finite Dirac support

The 2015 paper writes the finite Hilbert-space labels as unprimed particle sectors and primed charge-conjugate sectors. Grading, reality and Hermiticity set the same-chirality particle blocks and the crossed particle/conjugate blocks to zero, leaving three independent kinds of components:

\[
(D_F)_{aI}^{\dot bJ},
\qquad
(D_F)_{aI}^{b'J'},
\qquad
(D_F)_{\dot aI}^{\dot b'J'}.
\]

Their inner fluctuations are respectively

\[
\Sigma_{aI}^{\dot bJ},
\qquad
H_{aIbJ},
\qquad
H_{\dot aI\dot bJ}.
\]

Reality supplies the conjugate-sector \(\bar\Sigma\) edge. This is precisely the four-cycle above.

The result is support-theoretic: it uses which Dirac blocks exist, not a guessed generic Pati–Salam potential.

## 2. Complete length-four enumeration

The graph is the cycle

\[
L- R- R^c- L^c- L.
\]

At length four it has:

- 24 closed walks containing at least one immediate backtrack;
- 8 oriented/start-point versions of the primitive four-sector cycle.

The primitive orientation beginning at \(L\) reads

\[
L\xrightarrow{\Sigma}R
\xrightarrow{H_R}R^c
\xrightarrow{\bar\Sigma^\dagger}L^c
\xrightarrow{H_L^\dagger}L.
\]

The reverse path contains \(H_L\) and \(H_R^\dagger\). Cyclicity of the trace identifies the four start points but does not alter the dagger count.

Thus

\[
\boxed{
\operatorname{Tr}\Phi^4\big|_{H_L,H_R}
\sim
H_L^\dagger\Sigma H_R\bar\Sigma^\dagger+\mathrm{h.c.},
}
\]

up to the detailed index order and coefficients.

It cannot contain

\[
H_L^TJH_R+\mathrm{h.c.}
\]

from this primitive loop alone.

## 3. The node-phase explanation

Assign the same particle-number phase to left and right particle sectors and its inverse to their conjugates. Then

\[
q(H_L)=q(H_R)=2,
\qquad
q(\Sigma)=q(\bar\Sigma)=0.
\]

Every closed walk has total phase charge zero because its field word is produced by conjugation around a closed operator trace. The certificate verifies charge zero for all 32 walks.

This explains the result more deeply than inspection of one term: the block graph realizes the common \(H\)-phase as a node rephasing. Spectral traces cannot violate it before a charged same-chirality field is replaced by a VEV.

Document 1081 remains necessary because self-\(H\) loops contain equal numbers of \(H\) and \(H^\dagger\) but can select two six components and two conjugate ten components. The rank-one vacuum then decides whether a holomorphic effective six bilinear emerges.

## 4. The \(\Sigma\) vacuum preserves the source split

The primitive cross loop contains \(\Sigma\) on both sides. A Standard-Model-preserving \(SU(4)\) singlet/adjoint vacuum has the form

\[
\langle\Sigma\rangle
=\operatorname{diag}(a,a,a,b)
\]

on

\[
\mathbb C^4=\mathbb C_c^3\oplus\mathbb C_\ell.
\]

Its induced action on \(\Lambda^2\mathbb C^4\) has eigenvalues

\[
2a,2a,2a; a+b,a+b,a+b.
\]

It is block diagonal on colour–colour versus colour–lepton bivectors. Consequently, the allowed Hermitian \(H_L\)–\(H_R\) communication remains like-to-like on a colour-preserving vacuum. It can generate the wanted left/right leptoquark communication without itself mixing the leptoquark and diquark halves.

An off-diagonal colour–lepton \(\Sigma\) VEV would evade this result, but it would also break the unbroken colour group and is not the phenomenological vacuum being sought.

## 5. What this closes

At quartic spectral order and for the published minimal block support:

\[
\boxed{
\text{cross-}H_L/H_R\text{ mixing is Hermitian by graph topology.}
}

This is stronger than saying that the displayed 2013 action “looks Hermitian.” It identifies the structural reason and exhausts the relevant length-four walks.

Combined with document 1081, the current tree-level picture is:

1. cross-left/right loops are Hermitian and preserve the six split on a colour-preserving \(\Sigma\) vacuum;
2. direct self-sector Pfaffian induction by the rank-one ten VEV vanishes;
3. no complete theorem yet excludes more complicated mixed-spurion or radiative channels.

## 6. Boundaries

The theorem does not cover:

- higher spectral orders \(\operatorname{Tr}\Phi^{2n}\) with \(n>2\);
- additional nonzero finite Dirac blocks beyond the published minimal support;
- component contractions inside self-\(H\) loops beyond the rank-one audit already performed;
- simultaneous non-rank-one left and right ten-plet VEVs;
- radiative counterterms after spontaneous symmetry breaking;
- the numerical mass hierarchy needed to leave one leptoquark light.

It also does not prove that the Furey finite geometry has this block graph. That comparison still requires explicit Furey spectral data.

## 7. Stop-everything and reopening criteria

**Generic-potential stop:** do not replace the spectral action by the most general gauge-invariant Pati–Salam potential when making an NCG prediction. The finite block graph removes some gauge-allowed words.

**Quartic-cross stop:** do not claim a holomorphic \(H_LH_R\) Pfaffian arises from the primitive length-four spectral square; exhaustive path enumeration excludes it.

**All-orders stop:** do not promote the quartic result to all spectral orders or quantum stability without a longer-loop/counterterm proof.

**Positive reopening trigger:** prove that the node-phase grading and colour-preserving vacuum make every closed spectral path block preserving after all allowed rank-one insertions.

**Negative trigger:** exhibit a closed finite-Dirac path or loop counterterm whose vacuum reduction has a nonzero \(H_{3X}H_{\bar3Y}\) coefficient.

## 8. Verdict

The NCG source-selection precedent is stronger than the phenomenological paper itself demonstrates. In the minimal finite-Dirac graph, the desired left/right relationship and the dangerous Pfaffian relationship occupy different path classes:

\[
\boxed{
\text{closed spectral square}\Rightarrow\text{Hermitian cross relation},
\qquad
\text{Pfaffian reconnection}\Rightarrow\text{additional vacuum/component mechanism}.
}

The next high-value test is all-orders: determine whether longer closed paths reduce to products of the same Hermitian cross maps and rank-one-annihilated self maps, or whether the first genuine escape appears at length six or eight.

## Position in the corpus

- [rank-one breaking-spurion audit](1081_the_common_H_phase_is_broken_by_the_Pati_Salam_ten_vev_but_a_rank_one_neutrino_spurion_annihilates_the_direct_six_Pfaffian_quartic.md)
- [complex-six Pfaffian mixing gate](1080_the_complex_Pati_Salam_six_has_a_gauge_invariant_Pfaffian_that_reconnects_leptoquark_and_diquark_sources_unless_a_phase_grading_forbids_it.md)
- [NCG Model C source/Wilson audit](1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md)
- [higher spectral paths through length eight](1083_the_first_higher_spectral_holomorphic_cross_six_path_occurs_at_length_six_but_rank_one_breaking_kills_every_candidate_through_length_eight.md)
