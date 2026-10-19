# Four Higgs-Dressed Yukawa Gram Sources Can Supply Rank-Four Tomography Only in the \(\nu_R\)-Completed Branch

## Claim status

Exact Standard-Model representation matching and source-rank theorem; physical coupling to the four relational projectors remains unconstructed.

## 1. The missing source directions already exist as composites

For each Yukawa channel, define the matched dressed faces

\[
\begin{array}{c|c|c}
f&\chi_{L,f}&\chi_{R,f}\\ \hline
u&\widetilde H^\dagger Q&u^{c\dagger}\\
d&H^\dagger Q&d^{c\dagger}\\
e&H^\dagger L&e^{c\dagger}\\
\nu&\widetilde H^\dagger L&\nu^{c\dagger}.
\end{array}
\]

Within each row, the two faces have exactly the same color representation and hypercharge. Their contracted Gram entries are therefore gauge singlets.

Each channel supplies a separately sourceable neutral composite response \(G_f\). Treating the four source couplings independently gives the channel observation matrix

\[
A_{\rm Yuk}=I_4,
\]

which has rank four.

This is the source-rank complement missing from vacuum total stress.

## 2. Why the right-handed neutrino matters again

Without \(\nu^c\), only the \(u,d,e\) Dirac-type Gram channels are available:

\[
\operatorname{rank}A_{15}\le3.
\]

At least one direction in a four-projector moment vector remains invisible.

With the independently selected \(\nu_R\) completion,

\[
\operatorname{rank}A_{16}=4.
\]

Thus the same completion previously required by Furey closure, anomaly structure and left-right channel symmetry also supplies the fourth neutral source port needed for relational spectral tomography.

This is a genuine cross-branch convergence. It is not yet an identification of the neutrino Gram source with any particular scattering projector.

## 3. A hybrid stress-plus-contrast architecture

Four completely independent sources are sufficient but may be more than necessary if total stress supplies two aggregates.

Take a simple spin-two color-multiplicity row

\[
w_2=(3,3,1,1)
\]

and a second spin-zero/threshold row

\[
w_0=(a,b,c,d).
\]

Add two neutral Yukawa contrasts

\[
c_q=(1,-1,0,0),
\qquad
c_\ell=(0,0,1,-1).
\]

The resulting \(4\times4\) observation determinant is

\[
\det
\begin{pmatrix}
w_2\\w_0\\c_q\\c_\ell
\end{pmatrix}
=2\bigl[(a+b)-3(c+d)\bigr].
\]

Therefore stress plus two neutral contrasts reaches rank four exactly when the second stress/trace aggregate has a quark-to-lepton ratio different from the color-multiplicity row.

Mass thresholds and Yukawa breaking can make this possible, but the required coefficients must be calculated. In the conformal limit the second independent aggregate disappears and the hybrid rank drops.

## 4. What source rank does and does not prove

Rank four proves only kinematic sufficiency:

\[
\text{four independent neutral source directions}
\Longrightarrow
\text{possible four-channel tomography}.
\]

It does not provide the required map

\[
\{G_u,G_d,G_e,G_\nu\}
\longrightarrow
\{P_1,P_2,P_3,P_4\}.
\]

Document 785 already ruled out a fixed permutation representation under the selector generators. The physical map must instead be background-covariant and may mix the four sources coherently.

Nor does source rank guarantee:

- nonzero spectral weight in every channel;
- contact-independent normalization;
- stable rank after operator mixing and renormalization;
- positive projector-resolved residues;
- a unique assignment of thresholds to projectors.

## 5. Dependency graph

\[
\begin{array}{c}
\nu_R\text{ completion}\\
\downarrow\\
\text{four matched Yukawa face pairs}\\
\downarrow\ \text{Gram contraction}\\
\text{four gauge-neutral source directions}\\
\downarrow\ \text{source-to-projector map still missing}\\
\text{four coherent spectral moment sequences}\\
\downarrow\ \text{Hankel/Prony test}\\
\text{candidate physical thresholds}.
\end{array}
\]

The missing arrow is now sharply located between the neutral source algebra and the relational projector algebra.

## 6. Stop-everything tests

- **Rank-four source success:** the renormalized contact-subtracted correlator matrix of the four Gram probes has rank four in a physical spectral region.
- **Hybrid success:** calculated spin-two/spin-zero weights and two neutral contrasts satisfy the nonzero determinant condition.
- **Fifteen-state falsifier:** four-channel tomography is claimed from only the three \(u,d,e\) Gram sources.
- **Projector-map falsifier:** the identity source basis is silently identified with the four scattering projectors.
- **Renormalization falsifier:** operator mixing or Ward identities reduce the physical source matrix below rank four.

## 7. Executable certificate

    node scripts/verify_four_neutral_yukawa_gram_sources_reach_rank_four_only_with_the_nu_right_completion.mjs

The certificate verifies all four representation matches, compares the 15- and 16-state source ranks and derives the hybrid stress-plus-two-contrast determinant condition.

## Companion documents

- [All four Yukawa cycles induce neutral Gram responses](264_all_four_yukawa_cycles_induce_gauge_neutral_two_face_gram_responses.md)
- [Binary carrier embeddings into neutral Yukawa responses](576_the_binary_peirce_carrier_embeds_in_neutral_yukawa_gram_responses_but_channel_orientation_remains_unselected.md)
- [Vacuum total stress cannot resolve four relational channels](795_vacuum_total_stress_has_at_most_two_nonlocal_form_factor_moments_and_cannot_tomograph_four_relational_projector_channels.md)
- [Positive-threshold moment recovery](794_two_n_moments_generically_recover_n_positive_thresholds_and_weights_per_coherent_channel_while_two_n_minus_one_do_not.md)
