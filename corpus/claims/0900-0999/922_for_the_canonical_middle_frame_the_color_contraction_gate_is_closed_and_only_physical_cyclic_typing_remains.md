# For the Canonical Middle Frame, the Color-Contraction Gate Is Closed and Only Physical Cyclic Typing Remains

**Date:** 17 October 2026  
**Branches:** canonical middle frame, quadratic color contraction, mediator Gaussian, Kraus rank, and cyclic response typing  
**Claim status:** exact closure for the fully traced canonical response; noncanonical or partially observed vertices remain open  
**Certificate:** [close_the_color_contraction_gate_for_the_canonical_mediator_to_handle_gaussian_channel.mjs](../../../verification/close/close_the_color_contraction_gate_for_the_canonical_mediator_to_handle_gaussian_channel.mjs)

## Executive result

The color-contraction condition listed in document 921 is already solved for the canonical Furey middle-slot response assembled in documents 881–883.

The raw mismatch covariance factorizes exactly as

\[
P_{\rm std}^{\rm mult}\otimes G_{A_2}^{\rm color},
\]

with ranks two and two, so the uncontracted bath has rank four. There is no invariant linear map from the color augmentation ideal to a singlet, but there is one positive invariant quadratic metric up to scale:

\[
G_{A_2}=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
\]

The normalized quadratic color trace sends

\[
P_{\rm std}\otimes G_{A_2}
\longmapsto
P_{\rm std}.
\]

At amplitude level every minimal factor is environment-gauge equivalent to a multiplicity-times-color factor. After contraction, four redundant color/multiplicity Kraus labels span only the same two operator directions, so the Choi rank remains two and the normalized handle channel is unchanged.

Therefore the canonical effective chain is now

\[
\text{middle-slot Furey frame}
\to
P_{\rm std}\otimes G_{A_2}
\to
P_{\rm std}
\to
\mathcal E_{\rm handle}.
\]

The remaining frame obstruction is not color rank. It is the physical identification of the cyclic mediator/multiplicity labels with the handle-conjugacy labels.

## 1. Why contraction must be quadratic

For the color augmentation cycle

\[
C=\begin{pmatrix}0&-1\\1&-1\end{pmatrix},
\]

one has

\[
\det(C-I)=3.
\]

Thus $C-I$ is invertible and no nonzero invariant linear functional exists. A single color-standard amplitude cannot be erased into a singlet.

But

\[
C^TG_{A_2}C=G_{A_2},
\]

and the invariant symmetric-form space is one-dimensional. Bilocal/quadratic color contraction is therefore both necessary and canonical.

## 2. Exact canonical factorization

Document 882 proved, without fitting, that the shifted middle-frame Gram is

\[
K_{\rm shift}
=\left(\frac52SL_{K_3}S\right)
\otimes G_{A_2}.
\]

After irrelevant scale and sign-coordinate transport, its covariance factor is precisely

\[
P_{\rm std}\otimes G_{A_2}.
\]

This is the factorized covariance assumed in the earlier color-contraction theorem. It is not an additional ansatz for the canonical response.

Document 883 then proved that every minimal amplitude with this Gram differs from a product factor only by an unobserved $O(4)$ environment rotation. Hence apparent amplitude entanglement does not obstruct the fully traced contraction.

## 3. Kraus-rank preservation

Diagonalizing the color metric produces relative scalar weights $1$ and $\sqrt3$. A normalized redundant Kraus list can be written schematically as

\[
\left{
\frac12K_1,
\frac{\sqrt3}{2}K_1,
\frac12K_2,
\frac{\sqrt3}{2}K_2
\right}.
\]

Its four entries span only

\[
\operatorname{span}\{K_1,K_2\}.
\]

The scalar weights satisfy

\[
\frac14+\frac34=1
\]

for each operator direction, so the contracted channel is exactly the original two-Kraus channel.

No numerical truncation or post-selected color erasure is involved.

## 4. Consequence for the mediator bridge

Document 921 showed that the completed mediator root frame pushes an isotropic active-plane Gaussian to $P_{\rm std}$ and hence to the handle class sum.

The present synthesis shows that the canonical Furey middle frame supplies the required colorless $P_{\rm std}$ after its mathematically mandatory quadratic contraction. Thus two formerly separate effective routes meet:

\[
\begin{aligned}
&\text{Furey middle frame}
\to P_{\rm std}\otimes G_{A_2}
\to P_{\rm std},\\
&\text{mediator root Gaussian}
\to P_{\rm std}.
\end{aligned}
\]

Both feed the same handle class-sum channel.

## 5. What remains genuinely open

### Cyclic label identification

The three signed multiplicity edges, mediator roots and handle orientations carry isometric labelled frames, but their cycles have different physical meanings. A source-native boundary, ribbon or Higgs ordering must select the common starting label and orientation.

### Microscopic inclusion of the complete orbit

The Feshbach/Jordan identity derives the third projector operationally. An autonomous effective action must include all three equal-weight relationships or possess the full class-sum Ward symmetry.

### Partial environment observability

The color reduction is exact for a fully traced canonical response. If physical observables resolve the color-conditioned environment before contraction, the $O(4)$ environment gauge may become measurable and the two-factor description requires additional typing.

## 6. Stop-everything and falsification criteria

**Alignment trigger:** derive a unique cyclic identification among Furey edges, mediator roots and handle orientations.

**Autonomy trigger:** obtain the complete equal-weight orbit in one effective generating functional.

**Full-trace trigger:** demonstrate that the relevant observable traces the color environment completely.

**Residual-rank falsifier:** the canonical contracted channel has Choi rank greater than two after exact color singlet reduction.

**Scope warning:** this closure is applied to a nonfactorizing or partially observed color-conditioned vertex without checking its environment observables.

## 7. Verdict

| Gate | Canonical fully traced response |
|---|---|
| Linear color erasure | **impossible** |
| Quadratic singlet contraction | **unique up to scale** |
| Middle-frame Gram factorization | **exact** |
| Minimal amplitude product representative | **exists; unique up to environment gauge** |
| Contracted handle Choi rank | **two** |
| Physical cyclic label alignment | **open** |

## 8. Position in the corpus

- [mediator Gaussian to handle class sum](921_the_completed_mediator_root_gaussian_pushes_forward_to_the_exact_handle_class_sum_channel.md)
- [quadratic color contraction theorem](../0800-0899/881_gauge_singlet_color_contraction_is_necessarily_quadratic_and_does_not_enlarge_the_two_kraus_environment_when_the_response_vertex_factorizes.md)
- [exact middle-frame tensor factorization](../0800-0899/882_the_canonical_middle_slot_frame_factorizes_exactly_into_signed_multiplicity_response_times_the_a2_color_metric.md)
- [minimal-amplitude environment-gauge classification](../0800-0899/883_every_minimal_amplitude_of_the_middle_frame_mismatch_gram_is_environment_gauge_equivalent_to_a_multiplicity_times_color_factorization.md)
