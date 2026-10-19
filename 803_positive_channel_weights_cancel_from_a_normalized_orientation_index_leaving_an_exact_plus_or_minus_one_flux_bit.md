# Positive Channel Weights Cancel from a Normalized Orientation Index, Leaving an Exact \(\pm1\) Flux Bit

## Claim status

Exact positive-weight robustness theorem for the bias-square source map; coherent cross-channel mixing remains open.

## 1. Weighted physical responses

The unweighted orientation observable of document 802 used normalized rank-one projectors. A physical response will generally attach different positive residue strengths:

\[
r_f\ge0,
\qquad
f\in\{u,d,e,\nu\}.
\]

Define

\[
\mathcal I_r(\Phi)
=\sum_f r_f\chi_f\delta_{\Phi(f)},
\]

where

\[
\chi_{u,\nu}=+1,\qquad
\chi_{d,e}=-1
\]

and

\[
\delta_j=\operatorname{Tr}(P_j\Gamma_R).
\]

## 2. Sign robustness

For the orientation \(\Phi_+\) that maps up channels to left-biased projectors,

\[
\chi_f\delta_{\Phi_+(f)}
=|\delta_{\Phi_+(f)}|
\]

for every field separately. Therefore

\[
\mathcal I_r(\Phi_+)
=\sum_f r_f|\delta_{\Phi_+(f)}|>0
\]

whenever at least one positive-weight channel is present.

For the reversed map,

\[
\mathcal I_r(\Phi_-)
=-\sum_f r_f|\delta_{\Phi_-(f)}|<0.
\]

Arbitrary positive channel rescaling changes the magnitude but cannot change the orientation sign.

## 3. Exact normalized index

Normalize by the positive absolute-flux sum:

\[
\boxed{
\nu_{\rm orient}(\Phi)
=
\frac{
\sum_f r_f\chi_f\delta_{\Phi(f)}
}{
\sum_f r_f|\delta_{\Phi(f)}|
}.
}
\]

Then

\[
\nu_{\rm orient}(\Phi_+)=+1,
\qquad
\nu_{\rm orient}(\Phi_-)=-1.
\]

This holds for every nonzero collection of nonnegative weights. It also holds at every selector background while the four-cell bias square persists.

Flux reversal gives

\[
\nu_{\rm orient}\mapsto-\nu_{\rm orient}.
\]

Thus the last source-map bit admits an exactly normalized \(\mathbb Z_2\) index.

## 4. Why this is more useful than the raw score

The raw value \(\mathcal I_r\) depends on:

- residue magnitudes;
- source normalization;
- frequency;
- background-dependent participation imbalance.

The ratio removes all positive diagonal weights. It tests only whether the matter channel grading and propagation grading are aligned or anti-aligned.

This makes it a better target for comparing different backgrounds, thresholds or normalization conventions.

## 5. Conditions behind the quantization

Exact \(\pm1\) requires:

1. one projector in every handle-side cell;
2. the square-preserving source assignment;
3. nonnegative diagonal spectral weights;
4. correctly identified matter channel signs;
5. no coherent off-diagonal source mixing in the measurement basis.

If source mixing is present, the ratio need not remain exactly quantized. Its deviation from \(\pm1\) becomes a possible measure of intertwiner misalignment.

## 6. Operational interpretation

A measurement would compare channel-resolved injected spectral weight with signed outgoing-minus-incoming flux. The numerator is channel odd and flux odd; the denominator is its positive total variation.

The result is not obtainable from total stress alone. It requires the rank-four neutral source algebra and port-resolved response.

## 7. Stop-everything tests

- **Quantized success:** a source-resolved physical response gives \(\nu_{\rm orient}=\pm1\) within controlled corrections.
- **Reversal test:** reversing the port orientation flips the sign exactly.
- **Mixing signal:** stable \(|\nu_{\rm orient}|<1\) reveals coherent source/projector misalignment.
- **Positivity falsifier:** negative spectral weights are required to reproduce the measured response.
- **Label falsifier:** the supposed field assignment fails the handle-side square and loses termwise sign alignment.

## 8. Executable certificate

    node scripts/prove_the_positive_weight_normalized_channel_flux_orientation_index_is_exactly_plus_or_minus_one.mjs

The certificate checks several highly unequal and partially vanishing positive weight sets and obtains exactly \(+1\) and \(-1\) for the two global maps.

## Companion documents

- [The raw orientation-odd channel/flux correlation](802_a_higgs_channel_times_flux_imbalance_cross_correlation_is_orientation_odd_and_distinguishes_the_two_global_source_maps.md)
- [The flux-orientation torsor](800_flux_reversal_exchanges_the_two_global_furey_to_projector_assignments_so_the_last_bit_is_an_orientation_torsor.md)
- [Orbit-wide bias-square labelling](799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
- [Explicit positive relational residues](792_checkpoint_spectral_projectors_give_an_explicit_positive_rank_one_relational_residue_model_but_not_furey_typing_or_threshold_prediction.md)
