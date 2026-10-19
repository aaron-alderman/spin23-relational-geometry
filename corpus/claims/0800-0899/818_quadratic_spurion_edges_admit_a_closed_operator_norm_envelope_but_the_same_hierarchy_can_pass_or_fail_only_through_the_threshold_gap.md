# Quadratic Spurion Edges Admit a Closed Operator-Norm Envelope, but the Same Hierarchy Can Pass or Fail Only Through the Threshold Gap

## Claim status

Exact coefficient-independent elementary norm bounds and executable four-channel diagonalization protocol. Numerical examples are illustrative, not a computed Standard-Model anomalous-dimension matrix.

## 1. General quadratic edge matrix

Write the leading cross-channel response as

\[
E_{fg}=c_{fg}y_f^*y_g,
\qquad f\ne g,
\qquad E_{ff}=0,
\]

and assume only

\[
|c_{fg}|\le c_{\max}.
\]

Let

\[
a_f=|y_f|.
\]

No phase or sign assumptions are needed for the following bounds.

## 2. Two closed operator-norm envelopes

The Frobenius bound gives

\[
\boxed{
\|E\|_{\rm op}
\le
c_{\max}
\sqrt{
\left(\sum_fa_f^2\right)^2
-\sum_fa_f^4
}.
}
\]

The maximum-row-sum bound gives

\[
\boxed{
\|E\|_{\rm op}
\le
c_{\max}
\max_f
\left(
a_f\sum_{g\ne f}a_g
\right).
}
\]

For a Hermitian matrix, the row-sum bound also equals the corresponding one-norm/infinity-norm envelope. The best elementary certificate is the minimum of these two quantities.

Combining it with the multichannel threshold gives

\[
\frac{c_{\max}}{\gamma}
\min\left\{
\sqrt{(\sum a_f^2)^2-\sum a_f^4},
\max_f a_f\sum_{g\ne f}a_g
\right\}
<0.039479556.
\]

This is a coefficient-independent sufficient orientation test.

## 3. The hierarchy alone cannot decide stability

The executable example uses the dimensionless illustrative values

\[
a=(1,0.02,0.005,0.001),
\qquad
c_{\max}=\frac1{16\pi^2}.
\]

These values are chosen only to expose scale separation. They are not asserted to be the four physical one-generation Yukawas at any specified renormalization scale.

For diagonal thresholds

\[
D=\operatorname{diag}(0,1,2,3),
\]

the norm-to-gap envelope is far below the uniform threshold, and direct diagonalization leaves every coordinate projector inside its orientation tolerance.

Keeping the identical \(E\) but moving the first two thresholds to

\[
D=\operatorname{diag}(0,10^{-6},2,3)
\]

produces large mixing of the near-degenerate pair and fails the channel-projector tolerance.

Therefore

\[
\boxed{
\text{Yukawa hierarchy does not certify orientation without the response gaps}.}
\]

## 4. Exact versus coefficient-independent tests

The hierarchy of evidence is:

1. **Magnitude envelope:** use only \(|c_{fg}|\le c_{\max}\) and \(|y_f|\).
2. **Actual matrix norm:** insert calculated phases and coefficients.
3. **Direct diagonalization:** compute the transported channel projectors.
4. **Flux-cone certificate:** evaluate the four exact quadratic signed-flux scores.

A failure at level one does not imply physical failure. It only means coefficient-independent control is insufficient. A failure at level four is decisive for the selected orientation map.

## 5. Dependency graph

\[
\begin{array}{c}
\text{rank-four spurion charges}\\
\downarrow\\
E_{fg}=c_{fg}y_f^*y_g\\
\downarrow\ \text{coefficient bound}\\
\|E\|_{\rm op}\text{ envelope}\\
\downarrow\ \text{threshold gaps}\\
\text{approximate spectral projectors}\\
\downarrow\\
\text{orientation flux-cone signs}.
\end{array}
\]

The two missing physical inputs are now explicit: \(c_{fg}\) and the diagonal response spectra.

## 6. Stop-everything tests

- **Uniform success:** the coefficient-independent envelope satisfies the gap ratio bound.
- **Matrix rescue:** the envelope fails but the computed \(E\) has a sufficiently small norm.
- **Direct rescue:** norm bounds fail but exact diagonalization preserves all four signs.
- **Gap failure:** a nonzero edge joins thresholds whose separation is too small.
- **Coefficient falsifier:** calculated \(|c_{fg}|\) exceeds the assumed envelope.
- **Numerical-warning gate:** illustrative dimensionless inputs are presented as measured Standard-Model running parameters.

## 7. Executable certificate

    node verification/bound/bound_and_diagonalize_a_four_channel_quadratic_spurion_response_matrix.mjs

The certificate evaluates both closed norm envelopes, diagonalizes separated and near-degenerate four-channel examples, and compares their projector rotations with the established tolerance.

## Companion documents

- [Crossed gradings and threshold degeneracies](817_the_crossed_furey_and_higgs_gradings_allow_four_independent_thresholds_while_restoring_both_square_flips_forces_complete_degeneracy.md)
- [Approximate-center spectral-gap theorem](816_a_connected_mixing_graph_can_still_leave_an_approximate_channel_center_only_when_off_diagonal_kernels_are_small_relative_to_spectral_gaps.md)
- [Rank-four channel-spurion lattice](815_the_rank_four_channel_spurion_lattice_forces_cross_response_mixing_to_start_quadratically_but_the_single_incidence_grading_is_too_coarse.md)
