# Channel Aggregation and Schur Sewing Differ by a Positive Covariance

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B07, B08 and B11  
**Claim status:** exact theorem for positive scalar interior pivots; matrix-interior and physical Standard-Model kernels remain open

## 1. The two possible orders

Once four positive Yukawa-channel responses exist, there are two natural operations:

1. aggregate the channels and then eliminate the hidden/interior degree of freedom;
2. eliminate the interior separately in each channel and then aggregate.

These operations are nonlinear and therefore need not agree. The mismatch can be calculated exactly.

For channel \(f\), take a real symmetric block response

\[
M_f=
\begin{pmatrix}
A_f & x_f\\
x_f^T & c_f
\end{pmatrix},
\qquad c_f>0,
\]

where \(A_f\) acts on the two response faces, \(x_f\in\mathbb R^2\), and the eliminated interior is scalar. Let \(w_f>0\).

The channelwise Schur complement is

\[
S_f=A_f-\frac{x_fx_f^T}{c_f}.
\]

## 2. Exact covariance identity

Define

\[
C=\sum_f w_fc_f,
\qquad
X=\sum_f w_fx_f,
\qquad
r_f=\frac{x_f}{c_f},
\qquad
\bar r=\frac{X}{C}.
\]

Eliminating after aggregation gives

\[
S_{\rm after}
=
\sum_f w_fA_f-\frac{XX^T}{C}.
\]

Aggregating after separate elimination gives

\[
S_{\rm before}
=
\sum_f w_fA_f-\sum_f w_f\frac{x_fx_f^T}{c_f}.
\]

Their difference is

\[
\boxed{
S_{\rm after}-S_{\rm before}
=
\sum_f w_fc_f(r_f-\bar r)(r_f-\bar r)^T
\succeq0.}
\]

Thus the discrepancy is precisely the weighted covariance of the channel coupling ratios.

## 3. Equality condition: a concrete common-kernel criterion

Because every weight and pivot is positive, equality holds exactly when

\[
r_u=r_d=r_e=r_\nu,
\]

or

\[
\frac{x_u}{c_u}
=
\frac{x_d}{c_d}
=
\frac{x_e}{c_e}
=
\frac{x_\nu}{c_\nu}.
\]

This is the first sharp operational definition of a **common sewing kernel** in the four-channel branch. It is much stronger than saying that all channel matrices lie in the same positive cone. The cone gives a shared codomain; equality of coupling ratios gives shared elimination dynamics.

## 4. Physical interpretation

The positive correction has a useful meaning. If the hidden response cannot distinguish channels, the ratios align and aggregation commutes with elimination. If it couples differently to up, down, charged-lepton and neutrino composites, eliminating only after mixing the channels retains a positive between-channel fluctuation term.

Therefore the noncommutation is not a pathology. It is measurable information about channel heterogeneity.

In probabilistic language:

\[
\text{effective response after mixing}
=
\text{mixture of effective responses}
+
\text{coupling covariance}.
\]

## 5. Relation to Herglotz and KMS response

Positive matrix-valued spectral measures add:

\[
d\Sigma_{\rm tot}(s)=\sum_f d\Sigma_f(s)\succeq0.
\]

Hence channel aggregation preserves causality/passivity at the level of a Herglotz representation. At one common temperature, the linear KMS relation is also preserved by summation.

Schur elimination is different because it contains an inverse. Pointwise passivity can survive the elimination while commutation with aggregation fails by the covariance above. A universal scalar spectral shape

\[
d\Sigma_f(s)=w_fK_f\,d\mu(s)
\]

does not by itself guarantee Schur commutation; the normalized boundary/interior ratios must align as well.

## 6. Consequences for the \(Spin(2,3)\) programme

This result separates three increasingly strong claims:

1. **common carrier:** every channel maps into \(H_2(\mathbb R)_+\);
2. **common causal class:** every channel admits compatible positive Herglotz/KMS data;
3. **common sewing kernel:** normalized interior couplings align, so channel aggregation commutes with Schur recursion.

Only the first has been constructed for all four dressed Yukawa cycles. The second is a QFT spectral target. The third is now an exact, falsifiable alignment condition.

## 7. Matrix generalization (resolved in the next cycle)

The matrix-interior extension is positive even when the pivots do not commute. With \(R_f=X_fC_f^{-1}\), its exact discrepancy is

\[
\sum_fw_f(R_f-\bar R)C_f(R_f-\bar R)^T\succeq0.
\]

Thus the scalar theorem was the first case of a full operator covariance identity. The remaining boundary is singular, rank-changing or physically unidentified interior spaces, not finite-dimensional noncommutativity. See [Matrix-interior Schur covariance needs no commutativity](267_matrix_interior_schur_covariance_needs_no_commutativity.md).

The result also assumes that all channel blocks use the same two-face basis. Channel-dependent basis choices must first be related by specified intertwiners; otherwise apparent covariance can be a coordinate artifact.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a Standard-Model stress or boundary calculation produces the same ratio \(x_f/c_f\) in all four channels after canonical normalization.

**Observable trigger:** the positive covariance term can be tied to a channel-mixing spectral feature or sum rule.

**Common-kernel falsifier:** the normalized coupling ratios are physically inequivalent functions of energy in the four channels.

**Reduction falsifier:** singular or indefinite physical interior sectors defeat the range and positivity conditions required by the matrix theorem.

## 9. Certificate

The [aggregation/Schur covariance certificate](../../../verification/verify/verify_channel_aggregation_schur_covariance.mjs) checks a generic strictly positive covariance example, verifies the exact covariance identity and verifies equality for aligned coupling ratios.

## Companion documents

- [Shared-field incidence obstructs naive stress-derived weights](265_shared_field_incidence_obstructs_naive_stress_derived_yukawa_weights.md)
- [Recursive Schur/Jordan descent](201_recursive_schur_jordan_descent_and_functorial_sewing.md)
- [Fixed-temperature KMS/Herglotz Schur sewing](213_fixed_temperature_kms_herglotz_schur_sewing.md)
- [All four Yukawa cycles induce neutral Gram responses](264_all_four_yukawa_cycles_induce_gauge_neutral_two_face_gram_responses.md)
