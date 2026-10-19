# The Arithmetic Checkpoint Rejects Two Independent Character Interferometers but Has an Exact Coupled Four-Character Positive-Residue Embedding

## Claim status

Exact computational theorem for the selected arithmetic checkpoint, together with a general constructive interpolation argument for symmetric unitary matrices having real spectral projectors. It is **not** a derivation of the checkpoint, a Standard-Model threshold calculation or a Furey parameter prediction.

## 1. Question inherited from the two-character construction

The previous result proved that one even Walsh character and one odd Walsh character can support a reciprocal, passive, rational-inner orientation interferometer. The immediate four-channel guess is to take two independent copies.

Order the Walsh characters as

\[
(1,H,C,HC),
\]

with orientation parity

\[
D_\chi=\operatorname{diag}(+1,+1,-1,-1).
\]

There are exactly two perfect matchings of the even set \(\{1,H\}\) with the odd set \(\{C,HC\}\):

\[
\mathcal P_1=\{(1,C),(H,HC)\},
\qquad
\mathcal P_2=\{(1,HC),(H,C)\}.
\]

A direct sum of two independent interferometers must be block diagonal for at least one of these decompositions.

## 2. Exact checkpoint audit

The Walsh transform acts on **channel labels**, not directly on the four physical port coordinates. First use the established bias-square assignment

\[
(u,\nu,d,e)\longmapsto(CL,DL,DR,CR)
\]

to type the four spectral lines of \(S_0\). In the resulting atomic eigenchannel basis,

\[
S_{\rm atom}=\operatorname{diag}(\lambda_u,\lambda_\nu,\lambda_d,\lambda_e).
\]

If \(W\) is the normalized Walsh matrix whose rows are the four characters, the correctly typed character response is

\[
S_\chi=W S_{\rm atom}W^T.
\]

Applying \(W\) directly to the raw port matrix would conflate port coordinates with source-channel labels and is not licensed by the bridge.

For each matching, delete the two allowed \(2\times2\) blocks and measure the remaining off-block part. The certificate gives

| matching | off-block Frobenius norm | largest forbidden entry |
|---|---:|---:|
| \((1,C)\oplus(H,HC)\) | \(0.8415248054\) | \(0.3626102818\) |
| \((1,HC)\oplus(H,C)\) | \(1.8534907409\) | \(0.8528603433\) |

Both are decisively nonzero. Therefore

\[
\boxed{S_0\text{ is not a direct sum of two independent even--odd character interferometers.}}
\]

This is not a small numerical imperfection. The restricted two-block architecture omits essential four-character coupling already present in the exact arithmetic matrix.

## 3. Coupled four-character replacement

The failure of factorization does not imply failure of the orientation response. The checkpoint is symmetric and unitary, and its four spectral projectors \(P_j\) are real symmetric rank-one projectors:

\[
S_0=\sum_{j=1}^4\lambda_jP_j,
\qquad
P_jP_k=\delta_{jk}P_j,
\qquad
\sum_jP_j=I.
\]

Write each eigenvalue with a negative phase representative

\[
\lambda_j=e^{i\phi_j},
\qquad -2\pi<\phi_j<0,
\]

and, at checkpoint frequency \(\omega_0>0\), define

\[
\gamma_j=\omega_0\tan\!\left(-\frac{\phi_j}{4}\right)>0.
\]

For

\[
b_\gamma(z)=\frac{z-i\gamma}{z+i\gamma},
\]

one then has

\[
b_{\gamma_j}(\omega_0)^2=e^{-4i\arctan(\gamma_j/\omega_0)}
=e^{i\phi_j}=\lambda_j.
\]

Consequently the four-mode response

\[
\boxed{
S_+(z)=\sum_{j=1}^4b_{\gamma_j}(z)^2P_j
}
\]

recovers the checkpoint exactly:

\[
S_+(\omega_0)=S_0.
\]

For the convention \(\omega_0=1\), the fitted scales are

\[
(\gamma_1,\gamma_2,\gamma_3,\gamma_4)
\approx
(0.7175035,0.2079515,0.1065664,1.3148695).
\]

They are dimensionless interpolation parameters relative to \(\omega_0\). They are **not** four derived particle masses or physical thresholds.

## 4. Analytic gates

Every scalar factor is analytic and strictly contractive in the upper half-plane and is unimodular on the real axis. Orthogonality of the \(P_j\) therefore gives

\[
I-S_+(z)^\dagger S_+(z)
=\sum_j\left(1-|b_{\gamma_j}(z)|^4\right)P_j>0
\qquad(\operatorname{Im}z>0),
\]

and

\[
S_+(\omega)^\dagger S_+(\omega)=I
\qquad(\omega\in\mathbb R).
\]

Because the projectors are real symmetric and the factors are squared,

\[
S_+(z)^T=S_+(z),
\qquad
S_+(z)=\overline{S_+(-\bar z)}.
\]

Thus the construction is reciprocal, rational inner, passive and compatible with the real-time sideband structure.

## 5. Positive matrix residues

The Cayley–Herglotz response is

\[
H_+(z)=i(I+S_+(z))(I-S_+(z))^{-1}
=\sum_j
\left(
\frac{z}{2\gamma_j}-\frac{\gamma_j}{2z}
\right)P_j.
\]

Equivalently,

\[
H_+(z)=zA+\frac{R_+}{0-z},
\]

where

\[
A=\sum_j\frac{1}{2\gamma_j}P_j>0,
\qquad
\boxed{R_+=\sum_j\frac{\gamma_j}{2}P_j>0.}
\]

The residue is positive definite and decomposes into four positive rank-one spectral supports.

## 6. Orientation is stored in the coupled residue

In the Walsh basis define

\[
S_-(z)=D_\chi S_+(z)D_\chi,
\qquad
R_-=D_\chi R_+D_\chi.
\]

This operation preserves eigenvalues, positivity, reciprocity and every analytic gate. It leaves the even--even and odd--odd blocks fixed while reversing every even--odd block.

The computed \(R_+\) has nonzero entries throughout those cross-parity blocks. Hence the orientation bit is not merely supplied after the fact by an analyzer: it is present in the matrix-valued spectral residue itself. A coherent analyzer is still required to read it as an intensity difference.

In the typed character representation, one explicit checkpoint even-input witness has

\[
I_x^+-I_x^-\approx0.1384517,
\qquad
I_y^+-I_y^-\approx0.5088649.
\]

Both change sign under \(D_\chi\).

## 7. What changed in the branch graph

The naive path

\[
\text{two-character witness}
\longrightarrow
\text{two independent copies}
\longrightarrow S_0
\]

is closed by the off-block audit.

It is replaced by

\[
\text{two-character orientation principle}
\longrightarrow
\text{coupled four-character response}
\longrightarrow
\text{real spectral projectors of }S_0
\longrightarrow
\text{positive orientation-carrying residue}.
\]

The replacement is mathematically stronger but physically less factorized: orientation lives in a genuinely relational four-character network.

## 8. Remaining dependencies

The construction still does not answer:

1. why the arithmetic checkpoint \(S_0\) is selected;
2. why its spectral projectors are the physical Furey response supports;
3. whether the phase branches fixing \(\gamma_j\) have a microscopic threshold interpretation;
4. whether a Furey/TRO cyclic path fixes the common character phase convention;
5. whether the same response is compatible with the full eighteen-background transport law;
6. whether stress-tensor form factors can excite and read the required cross-parity coherences.

The fitted \(\gamma_j\) solve interpolation only. Relabeling them as observed masses would be circular.

## 9. Stop-everything and falsification criteria

- **Factorization falsifier:** any claim that the checkpoint is two independent even--odd devices must make one of the two measured off-block norms vanish. Neither does.
- **Analytic falsifier:** a proposed microscopic completion fails if any spectral scalar ceases to be Schur in the upper half-plane or violates sideband reality.
- **Positivity falsifier:** a derived pole with negative matrix residue is incompatible with the present passive Herglotz interpretation.
- **Furey success:** the oriented TRO supplies the same four real supports and fixes their parity phase convention without importing \(S_0\).
- **Threshold success:** independent dynamics reproduce the eigenphases or scale ratios, rather than fitting them from \(S_0\).
- **Orbit success:** the construction transports consistently over all eighteen backgrounds with the established selector action.
- **Stop-everything signal:** the independently derived Standard-Model spectral matrix agrees with the arithmetic spectral projectors and pole ratios. That would convert an interpolation coincidence into a genuine bridge.

## 10. Executable certificate

    node verification/embed/embed_the_arithmetic_checkpoint_in_a_four_character_rational_inner_response_and_test_two_block_factorization.mjs

The certificate checks the two possible factorizations, reconstructs the checkpoint projectors, derives positive \(\gamma_j\), recovers \(S_0\), verifies boundary unitarity, strict interior contractivity, reciprocity, sideband reality, the Cayley closed form, positive residues and an explicit orientation-odd balanced witness.

## Companion documents

- [Two-character rational-inner existence theorem](825_a_reciprocal_rational_inner_two_character_response_carries_orientation_odd_coherence_and_a_positive_matrix_spectral_residue.md)
- [Positive character interferometer](824_a_positive_even_odd_character_interferometer_measures_relational_orientation_by_balanced_output_differences.md)
- [Full Gram retains orientation before dephasing](823_the_paired_furey_graph_retains_the_walsh_orientation_signs_until_separate_channel_gram_packaging_erases_cross_character_coherence.md)
- [Checkpoint projector residue construction](../0700-0799/792_checkpoint_spectral_projectors_give_an_explicit_positive_rank_one_relational_residue_model_but_not_furey_typing_or_threshold_prediction.md)
- [Real-time sideband completion](../0700-0799/781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
