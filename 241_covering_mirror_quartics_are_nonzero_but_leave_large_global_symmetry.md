# The Covering Mirror Quartics Are Nonzero but Leave a Large Global Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B08, B11 and B13  
**Claim status:** exact Grassmann-contraction and continuous-phase-symmetry calculation; infrared phase remains open

## 1. Closing the contraction loophole

The representation census found that \(QQQL\) and \(u^cu^cd^ce^c\) cover every charged field type. Representation support alone does not guarantee that a one-generation local Grassmann contraction is nonzero.

Two explicit contractions are

\[
\mathcal O_L=
\epsilon_{abc}\epsilon_{ij}\epsilon_{kl}
(Q^{ai}Q^{bj})(Q^{ck}L^l),
\]

and

\[
\mathcal O_R=
\epsilon_{abc}
(d^{c\,a}u^{c\,b})(u^{c\,c}e^c),
\]

where each parenthesis denotes the antisymmetric two-component Lorentz contraction.

An exact exterior-algebra expansion gives 36 nonzero canonical Grassmann monomials for \(\mathcal O_L\) and 18 for \(\mathcal O_R\) in the chosen normalization. Thus neither operator vanishes by one-generation Fermi statistics.

## 2. Hermitian mirror interaction

A local even interaction may contain

\[
H_{\rm int}
=g_L\mathcal O_L+\bar g_L\mathcal O_L^\dagger
+g_R\mathcal O_R+\bar g_R\mathcal O_R^\dagger.
\]

It is Lorentz scalar, gauge invariant and fermion-parity even. This is an explicit finite operator target for a mirror-wall Hamiltonian and for any proposed Furey/TRO realization.

It still has engineering dimension six in four spacetime dimensions, so weak-coupling power counting makes it irrelevant. A mirror gap, if produced, is necessarily a strong-coupling cutoff-scale phenomenon.

## 3. Residual species-phase symmetry

Assign independent phase charges

\[
(x_Q,x_u,x_d,x_L,x_e,x_\nu)
\]

to the six Weyl multiplets. Invariance of the two interactions requires only

\[
3x_Q+x_L=0,
\qquad
2x_u+x_d+x_e=0.
\]

The constraint matrix has rank two, leaving a four-dimensional continuous phase kernel. One direction is gauged hypercharge, so after quotienting the gauge direction at least three continuous species symmetries remain. These include \(B-L\) and an unconstrained sterile-neutrino phase.

Therefore the two-edge cover is interaction-connected but highly non-generic in symmetry space.

## 4. Why the residual symmetry matters

A symmetric short-range-entangled gap must match every exact global anomaly. Extra accidental \(U(1)\) symmetries can forbid the desired phase even when the gauge anomaly vanishes.

There are three possible responses:

1. add further gauge-invariant quartics from the eight-class census to reduce the accidental symmetry;
2. break selected global symmetries explicitly while preserving the gauge group;
3. accept topological order or massless composites required by global anomaly matching.

The next calculation should form the full charge-constraint matrix for a maximal nonvanishing quartic basis, then evaluate perturbative and discrete anomalies of its surviving global group.

## 5. Relation to the Jordan/Furey programme

The explicit contractions refine the proposed ternary route. A Furey/TRO product must reproduce not only the endpoint representations but the invariant tensors

\[
\epsilon_{abc},\qquad \epsilon_{ij},\qquad \epsilon_{\alpha\beta}.
\]

The cubic color epsilon is especially suggestive of determinant-like structure, but resemblance is not derivation. The source-native product must yield the correct antisymmetries and survive Grassmann expansion.

If the Furey cubic norm canonically selects precisely one of these contractions—or a symmetry-completing combination of the eight quartics—that would be a genuine advance beyond Standard-Model representation bookkeeping.

## 6. Stop-everything and falsification gates

**Furey trigger:** the cubic norm or ternary product fixes the relative contraction and coupling pattern of a mirror interaction that removes all accidental anomalous global symmetries.

**Symmetry trigger:** the maximal nonvanishing quartic set leaves exactly a known anomaly-free global subgroup and admits a unique gapped phase.

**Topological trigger:** residual global anomalies force a specific topologically ordered mirror boundary, linking regulator data to the boundary response.

**Falsifier:** a claimed quartic is zero in the exterior algebra, or a claimed unique symmetric gap ignores an exact residual anomalous \(U(1)\).

## 7. Certificate

The [covering-quartic contraction certificate](scripts/verify_mirror_covering_quartic_contractions.mjs) expands both operators in an exact exterior algebra, verifies nonzero one-generation contractions, computes the rank-two species-phase constraint matrix and confirms both hypercharge and \(B-L\) lie in its four-dimensional kernel.

## Companion documents

- [Mirror quartic hypergraph](240_mirror_quartic_hypergraph_covers_generation_but_does_not_prove_gap.md)
- [Mirror bilinear obstruction](239_mirror_wall_has_no_symmetric_bilinear_gap_for_charged_generation.md)
- [Exceptional cubic CP-even selection audit](184_exceptional_cubic_norm_cp_even_and_13_27_selection_audit.md)
- [Furey oriented ternary closure](108_furey_oriented_bimodule_ternary_closure.md)
