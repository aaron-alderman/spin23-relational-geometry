# A Reciprocal Rational-Inner Two-Character Response Carries Orientation-Odd Coherence and a Positive Matrix Spectral Residue

## Claim status

Explicit constructive existence theorem satisfying reciprocity, passivity, rational inner analyticity and real-time sideband reality. The response parameters and its identification with Furey/checkpoint modes remain unsourced.

## 1. Construction

Choose one even and one odd Walsh character. Let

\[
b_\gamma(z)=\frac{z-i\gamma}{z+i\gamma},
\qquad \gamma>0,
\]

and square it:

\[
f_\gamma(z)=b_\gamma(z)^2.
\]

For a real rotation

\[
U(\theta)=
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix},
\]

define

\[
\boxed{
S_+(z)
=U
\begin{pmatrix}
f_{\gamma_1}(z)&0\\
0&f_{\gamma_2}(z)
\end{pmatrix}
U^T.
}
\]

For \(\gamma_1\ne\gamma_2\) and nontrivial \(\theta\), the even–odd entry is nonzero.

Orientation reversal is

\[
D=\operatorname{diag}(1,-1),
\qquad
S_-(z)=DS_+(z)D.
\]

It reverses only the off-diagonal coherence.

## 2. Analytic gates

Each \(b_\gamma\) is analytic and strictly contractive in the upper half-plane and has unit modulus on the real axis. Squaring preserves those properties. Since \(U\) is real orthogonal:

\[
S_+^T=S_+,
\]

so reciprocity holds, and

\[
S_+(\omega)^\dagger S_+(\omega)=I
\]

for real \(\omega\). In the open upper half-plane,

\[
I-S_+(z)^\dagger S_+(z)>0.
\]

Because the factors are centered at zero,

\[
\boxed{
S_+(z)=\overline{S_+(-\bar z)}.
}

\]

Thus the same two-mode response satisfies real-time positive/negative-frequency reality without adding an independent sideband copy.

All statements remain true for \(S_-\).

## 3. Positive Cayley–Herglotz response

Define

\[
H(z)=i(I+S(z))(I-S(z))^{-1}.
\]

For one squared Blaschke factor,

\[
i\frac{1+f_\gamma(z)}{1-f_\gamma(z)}
=\frac{z}{2\gamma}-\frac{\gamma}{2z}.
\]

Therefore

\[
\boxed{
H_+(z)
=U\operatorname{diag}\left(
\frac{z}{2\gamma_1}-\frac{\gamma_1}{2z},
\frac{z}{2\gamma_2}-\frac{\gamma_2}{2z}
\right)U^T.
}
\]

Its imaginary part is positive definite for \(\operatorname{Im}z>0\). It has the Herglotz representation

\[
H_+(z)=zA+\frac{R}{0-z},
\]

with

\[
A=U\operatorname{diag}\left(
\frac1{2\gamma_1},
\frac1{2\gamma_2}
\right)U^T>0
\]

and positive matrix residue

\[
\boxed{
R=U\operatorname{diag}\left(
\frac{\gamma_1}{2},
\frac{\gamma_2}{2}
\right)U^T>0.
}

Orientation reversal gives

\[
R_-=DR_+D.
\]

The eigenvalues and positivity are unchanged, while the even–odd residue entry changes sign.

## 4. Balanced output witness

Excite the even input port. At real frequency the output amplitude is the first column of \(S\):

\[
a=(S_{ee},S_{oe})^T.
\]

A balanced output analyzer measures

\[
\Delta I
=2\operatorname{Re}(S_{ee}^*S_{oe}).
\]

Under

\[
S_-=DS_+D,
\]

the odd output amplitude reverses, so

\[
\boxed{
\Delta I_-=-\Delta I_+.
}


Unitarity, total intensity and all spectral eigenvalues remain unchanged.

## 5. What has been proved

The analytic constraints do not force dephasing. There exists a response that is simultaneously:

- causal/upper-half-plane analytic;
- strictly passive in the interior;
- lossless and unitary on the real boundary;
- reciprocal;
- real-time sideband compatible;
- equipped with a positive matrix spectral residue;
- nonzero in its even–odd coherence;
- odd under the orientation involution.

This keeps the relational orientation branch alive after every analytic gate considered so far.

## 6. What remains free

The construction contains free data:

\[
\theta,qquad \gamma_1,qquad \gamma_2.
\]

It does not derive:

- which Furey modes are the even and odd ports;
- the mixing angle from the cyclic matter topology;
- the pole scales from Standard-Model thresholds;
- the analyzer phase from an oriented boundary normal;
- compatibility with the full four-channel arithmetic checkpoint.

The result is an existence theorem, not a parameter prediction.

## 7. Dependency graph

\[
\begin{array}{c}
\text{paired Furey amplitude graph}\\
\downarrow\ \text{common phase reference still missing}\\
\text{even/odd character coherence}\\
\downarrow\ \text{this document}\\
\text{reciprocal rational-inner }S_\pm(z)\\
\downarrow\\
\text{positive matrix residue }R_\pm\\
\downarrow\\
\text{balanced orientation-odd intensity}.
\end{array}
\]

## 8. Stop-everything tests

- **Furey embedding success:** a source-derived map fixes \(U(\theta)\) and identifies its two ports.
- **Threshold success:** calculated spectral data fix \(\gamma_1,\gamma_2\).
- **Four-channel success:** the block embeds in the full checkpoint response while preserving every analytic gate.
- **Coherence falsifier:** a physical Ward identity forces \(\theta=0\), \(\gamma_1=\gamma_2\), or otherwise makes the off-diagonal response vanish.
- **Reality falsifier:** an attempted generalization violates \(S(z)=\overline{S(-\bar z)}\).
- **Prediction warning:** free pole scales or mixing angles are labeled Standard-Model masses or mixings.

## 9. Executable certificate

    node verification/construct/construct_a_reciprocal_rational_inner_even_odd_character_interferometer_with_positive_matrix_residue.mjs

The certificate verifies reciprocity, real-axis unitarity, strict interior contractivity, sideband reality, Cayley closed form, positive imaginary part, positive matrix residue and sign reversal of the balanced witness.

## Companion documents

- [Positive even–odd character interferometer](824_a_positive_even_odd_character_interferometer_measures_relational_orientation_by_balanced_output_differences.md)
- [Full Gram retains orientation before dephasing](823_the_paired_furey_graph_retains_the_walsh_orientation_signs_until_separate_channel_gram_packaging_erases_cross_character_coherence.md)
- [Real-time sideband completion](../0700-0799/781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
- [Positive coherent relational residue construction](../0700-0799/792_checkpoint_spectral_projectors_give_an_explicit_positive_rank_one_relational_residue_model_but_not_furey_typing_or_threshold_prediction.md)
