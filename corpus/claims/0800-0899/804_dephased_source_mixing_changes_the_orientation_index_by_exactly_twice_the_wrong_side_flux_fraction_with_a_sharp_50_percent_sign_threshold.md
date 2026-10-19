# Dephased Source Mixing Changes the Orientation Index by Exactly Twice the Wrong-Side Flux Fraction, with a Sharp 50% Sign Threshold

## Claim status

Exact stochastic-mixing error budget; coherent amplitude interference remains outside the model.

## 1. Approximate rather than exact source maps

The quantized index of document 803 assumes that every source channel lands on its assigned projector. A realistic source map may be imperfect.

Let

\[
M_{jf}\ge0,
\qquad
\sum_jM_{jf}=1,
\]

be the probability that source \(f\) contributes incoherently to projector \(j\). Let \(r_f\ge0\) be the channel spectral strength.

The normalized orientation index becomes

\[
\nu
=
\frac{
\sum_{f,j}r_fM_{jf}\chi_f\delta_j
}{
\sum_{f,j}r_fM_{jf}|\delta_j|
}.
\]

## 2. Correct- and wrong-sign absolute flux

Split the denominator into

\[
A=\sum_{\chi_f\delta_j>0}
r_fM_{jf}|\delta_j|,
\]

and

\[
B=\sum_{\chi_f\delta_j<0}
r_fM_{jf}|\delta_j|.
\]

Then exactly

\[
\nu=\frac{A-B}{A+B}.
\]

Define the wrong-side absolute-flux fraction

\[
\epsilon=\frac{B}{A+B}.
\]

The orientation index obeys the exact error law

\[
\boxed{\nu=1-2\epsilon.}
\]

No norm estimate or perturbative approximation is involved.

## 3. Sharp sign threshold

The sign conditions are

\[
\begin{array}{c|c}
\epsilon<1/2&\nu>0\\
\epsilon=1/2&\nu=0\\
\epsilon>1/2&\nu<0.
\end{array}
\]

Thus the orientation sign is protected whenever less than half of the absolute flux weight has the wrong channel/side alignment.

The threshold is sharp. For one up-channel source leaking between the correct left-biased \(P_1\) and wrong right-biased \(P_0\), the probability threshold is

\[
q_*=
\frac{|\delta_{P_1}|}
{|\delta_{P_1}|+|\delta_{P_0}|}
\approx0.43204.
\]

This probability is below one half because the wrong projector has the larger absolute imbalance. At \(q_*\), the **flux-weighted** wrong fraction is exactly one half and the orientation index vanishes.

This distinction matters: probability leakage and flux-weight leakage are not the same when projector polarizations differ.

## 4. Relation to the exact index

For the ideal map,

\[
B=0,
\qquad
\epsilon=0,
\qquad
\nu=1.
\]

For complete side reversal,

\[
A=0,
\qquad
\epsilon=1,
\qquad
\nu=-1.
\]

The two exact orientations are the endpoints of the stochastic error interval.

## 5. Operational value

The formula supplies an immediate interpretation of a measured nonquantized result:

\[
\epsilon=\frac{1-\nu}{2}.
\]

For example,

\[
\nu=0.8
\quad\Longleftrightarrow\quad
\epsilon=0.1.
\]

The index therefore measures the absolute-flux-weighted failure of the proposed Furey/source intertwiner after dephasing.

## 6. Boundary of the theorem

The matrix \(M\) describes incoherent or dephased mixing. A coherent amplitude map can produce interference terms that are not representable by nonnegative probabilities.

The next extension would bound those terms using:

- the polar decomposition of the source map;
- an operator-norm distance from the ideal signed permutation;
- spectral gaps in the handle/side participation operators;
- positivity of the complete response Gram matrix.

Until that calculation is performed, the 50% theorem should not be applied to coherent mixing.

## 7. Stop-everything tests

- **Stable orientation:** measured or calculated \(\epsilon<1/2\).
- **Critical loss:** \(\epsilon=1/2\), where the orientation signal vanishes.
- **Wrong assignment:** \(\epsilon>1/2\), giving the opposite sign.
- **Dephasing falsifier:** significant coherent cross terms invalidate a stochastic \(M\).
- **Weighting falsifier:** leakage is counted by probability rather than absolute flux contribution.

## 8. Executable certificate

    node verification/derive/derive_the_sharp_stochastic_mixing_error_budget_for_the_flux_orientation_index.mjs

The certificate verifies the exact identity for unequal channel weights and several leakage levels, then constructs the sharp one-channel sign crossing.

## Companion documents

- [Exact positive-weight orientation index](803_positive_channel_weights_cancel_from_a_normalized_orientation_index_leaving_an_exact_plus_or_minus_one_flux_bit.md)
- [Raw orientation-odd source/flux correlation](802_a_higgs_channel_times_flux_imbalance_cross_correlation_is_orientation_odd_and_distinguishes_the_two_global_source_maps.md)
- [Orbit-wide bias-square labelling](../0700-0799/799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
