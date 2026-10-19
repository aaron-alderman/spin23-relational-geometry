# Coherent Unitary Source Mixing Preserves the Orientation Below an Orbit-Wide Operator-Norm Threshold, with a Sharp Rotation Boundary

## Claim status

Exact sufficient norm bound and sharp single-channel unitary rotation threshold; nonunitary source maps remain open.

## 1. Coherent frame error

Let \(v_f\) be the ideal normalized spectral vector assigned to source \(f\), and let

\[
P_f=v_fv_f^\dagger.
\]

A coherent unitary source-frame error acts as

\[
v_f\longmapsto Wv_f,
\qquad
W^\dagger W=I.
\]

The signed flux imbalance is

\[
\delta_f
=\langle v_f,\Gamma_Rv_f\rangle,
\qquad
\|\Gamma_R\|=1.
\]

## 2. Universal operator-norm bound

For any unit vector,

\[
\begin{aligned}
|\delta_f(W)-\delta_f|
&=
|\langle Wv_f,\Gamma_RWv_f\rangle
-\langle v_f,\Gamma_Rv_f\rangle|\\
&\le2\|(W-I)v_f\|\\
&\le2\|W-I\|_{\rm op}.
\end{aligned}
\]

Therefore the sign of every channel is preserved if

\[
2\|W-I\|_{\rm op}
<
\min_f|\delta_f|.
\]

## 3. Orbit-wide bound

The eighteen-background audit found the minimum side-bias margin

\[
\min_{b,j}|w_{L,j}(b)-1/2|
\approx0.0419469524.
\]

Since

\[
|\delta_j|=2|w_{L,j}-1/2|,
\]

the minimum absolute flux imbalance is

\[
\delta_{\min}\approx0.0838939048.
\]

Hence the simple orbit-wide certificate is

\[
\boxed{
\|W-I\|_{\rm op}<0.0419469524
\quad\Longrightarrow\quad
\text{all 72 bias signs are preserved}.
}
\]

Under this condition the normalized orientation index remains exactly \(\pm1\) for separately addressed pure source channels.

## 4. Exact sharp rotation threshold

For one state, decompose relative to the left/right grading:

\[
v=\cos\theta\,v_L+\sin\theta\,v_R,
\qquad
\delta=\cos2\theta.
\]

The closest balanced state has \(\theta=\pi/4\). The minimal rotation angle needed to reach zero imbalance is

\[
\alpha_*=\frac12\arcsin|\delta|.
\]

A plane rotation through \(\alpha\) obeys

\[
\|W_\alpha-I\|_{\rm op}
=2\sin\frac{|\alpha|}{2}.
\]

For the worst orbit channel,

\[
\|W_{\alpha_*}-I\|_{\rm op}
=2\sin\left(\frac14\arcsin\delta_{\min}\right)
\approx0.0419932279.
\]

The certificate rotates just below, exactly to and just above this value, obtaining positive, zero and negative imbalance. The threshold is therefore sharp for that channel.

The simple \(0.04194695\) bound is only about \(4.63\times10^{-5}\) more conservative.

## 5. Comparison with stochastic mixing

The stochastic theorem used wrong-side absolute-flux fraction:

\[
\nu=1-2\epsilon.
\]

The coherent theorem instead controls the amplitude frame:

\[
\|W-I\|_{\rm op}.
\]

These are different error metrics:

- stochastic mixing adds probabilities after dephasing;
- coherent mixing rotates amplitudes before forming projectors;
- interference makes probability leakage an incomplete description.

Both now have sharp sign boundaries.

## 6. Boundary of the theorem

The result assumes:

- \(W\) is unitary or orthogonal;
- source channels are addressed separately;
- the measured support is rank one;
- the fixed propagation grading \(\Gamma_R\) is physically correct;
- the orbit-wide participation audit uses the physical port frame.

A general invertible source map has polar decomposition

\[
A=WU,
\qquad
U>0.
\]

The positive factor \(U\) introduces anisotropic gain and nonorthogonal source correlations. It requires an additional condition-number and normalization analysis.

## 7. Stop-everything tests

- **Certified stability:** a derived source frame satisfies the orbit-wide norm bound.
- **Sharp crossing:** an admitted coherent rotation reaches the calculated balanced-state distance.
- **Nonunitary trigger:** the polar positive factor has appreciable condition number and invalidates the unitary model.
- **Port-frame falsifier:** physical transport reduces the minimum bias gap below the certified value.
- **Rank falsifier:** source residues are not approximately rank one.

## 8. Executable certificate

    node scripts/derive_operator_norm_and_sharp_rotation_thresholds_for_coherent_orientation_sign_stability.mjs

The certificate checks the universal perturbation bound, computes the orbit-wide sufficient threshold and constructs the sharp worst-channel rotation through its sign crossing.

## Companion documents

- [Exact stochastic-mixing error budget](804_dephased_source_mixing_changes_the_orientation_index_by_exactly_twice_the_wrong_side_flux_fraction_with_a_sharp_50_percent_sign_threshold.md)
- [Exact positive-weight orientation index](803_positive_channel_weights_cancel_from_a_normalized_orientation_index_leaving_an_exact_plus_or_minus_one_flux_bit.md)
- [Orbit-wide bias-square theorem](799_the_handle_by_side_bias_square_survives_all_18_selector_backgrounds_and_globally_labels_the_discrete_eigenbundle.md)
