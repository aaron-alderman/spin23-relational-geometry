# The Canonical Middle-Slot Frame Factorizes Exactly into Signed Multiplicity Response Times the \(A_2\) Color Metric

**Date:** 17 October 2026  
**Branches:** middle-slot frame, color augmentation, response-vertex factorization, Gaussian/Kraus reduction, and active-module protection  
**Claim status:** exact quadratic-Gram factorization; amplitude-level vertex alignment remains open  
**Certificate:** [factor_the_middle_slot_frame_on_the_color_standard_cycle_kernel_into_multiplicity_and_a2_metrics.mjs](../../../verification/factor/factor_the_middle_slot_frame_on_the_color_standard_cycle_kernel_into_multiplicity_and_a2_metrics.mjs)

## Executive result

The factorization assumed in the gauge-singlet Kraus reduction is exact at the level of the canonical middle-slot quadratic response.

On the full six-real-dimensional color-standard cycle kernel,

\[
\boxed{
H_{\rm phys}=H_{\rm mult}\otimes G_{A_2},
}
\]

and

\[
\boxed{
K_{\rm mid}=K_{\rm mult}\otimes G_{A_2}.
}

Here

\[
H_{\rm mult}=I+vv^T,
\qquad
v=(1,1,-1)^T,
\]

\[
K_{\rm mult}=14I+4vv^T,
\]

and

\[
G_{A_2}=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}
\]

is the unique primitive positive \(C_3\)-invariant metric on the color augmentation ideal.

Consequently the generalized response operator factorizes as

\[
\boxed{
H_{\rm phys}^{-1}K_{\rm mid}
=M_{\rm mult}\otimes1_I.
}

After subtracting the synchronized ground value,

\[
\boxed{
K_{\rm mid}-\frac{13}{2}H_{\rm phys}
=
\left(\frac52S L_{K_3}S\right)
\otimes G_{A_2}.
}

This proves exact separation of multiplicity mismatch and color contraction in the positive quadratic frame. It substantially strengthens—but does not completely prove—the microscopic vertex-factorization hypothesis of document 881.

## 1. Tensor-product embedding

The multiplicity embedding is

\[
E_{\rm mult}:
(u,d,u^c)
\longmapsto
(u,d,u^c,u+d-u^c),
\]

with matrix

\[
E=
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&1\\
1&1&-1
\end{pmatrix}.
\]

The color augmentation embedding is

\[
B_I=
\begin{pmatrix}
1&0\\
-1&1\\
0&-1
\end{pmatrix}.
\]

The complete sector/color embedding is

\[
E\otimes B_I.
\]

Therefore the Euclidean field-coordinate metric pulls back as

\[
(E\otimes B_I)^T(E\otimes B_I)
=(E^TE)\otimes(B_I^TB_I).
\]

This gives \(H_{\rm mult}\otimes G_{A_2}\) exactly.

## 2. Middle-frame response factorization

The middle-slot frame assigns weights

\[
(14,14,14,4)
\]

to \((u,d,u^c,d^c)\), independently of the color sheet. Thus its ambient weight operator is

\[
\operatorname{diag}(14,14,14,4)\otimes I_3.
\]

Pulling it back through \(E\otimes B_I\) yields

\[
\begin{aligned}
K_{\rm mid}
&=(E^T\operatorname{diag}(14,14,14,4)E)
\otimes(B_I^TB_I)\\
&=(14I+4vv^T)\otimes G_{A_2}.
\end{aligned}
\]

No approximation, spectral truncation or fitted factorization is used.

## 3. Generalized response and active projector

Because both physical and response Grams contain the same color factor,

\[
\begin{aligned}
H_{\rm phys}^{-1}K_{\rm mid}
&=(H_{\rm mult}^{-1}K_{\rm mult})
\otimes(G_{A_2}^{-1}G_{A_2})\\
&=M_{\rm mult}\otimes I_2.
\end{aligned}

Color is a spectator in the multiplicity selection, while the selected copy retains the full augmentation module:

\[
L_{\rm inc}
=\ker(BS)\otimes I_{\rm color}.
\]

The low projector is

\[
E_{\rm inc}
=\frac13vv^T\otimes I_2.
\]

This is the precise tensor statement implicit in the earlier spectrum.

## 4. Shifted mismatch action

The synchronized eigenvalue is \(13/2\). Subtracting that universal contribution from the response quadratic form gives

\[
K_{\rm shift}
=K_{\rm mid}-\frac{13}{2}H_{\rm phys}.
\]

The multiplicity factor is

\[
K_{\rm shift}^{\rm mult}
=\frac52S L_{K_3}S.
\]

Hence

\[
K_{\rm shift}
=K_{\rm shift}^{\rm mult}\otimes G_{A_2}.
\]

Its ranks are

\[
\operatorname{rank}K_{\rm shift}^{\rm mult}=2,
\qquad
\operatorname{rank}G_{A_2}=2,
\qquad
\operatorname{rank}K_{\rm shift}=4.
\]

The raw Gaussian mismatch space is therefore four-real-dimensional. The reduction to a two-Kraus colorless environment is a quadratic trace/contraction, not a claim that the raw color factor was absent.

## 5. What factorization now proves

The following statements are exact:

- multiplicity and color separate in the physical metric;
- they separate in the full middle-slot response Gram;
- the signed multiplicity selector acts identically on both color-augmentation directions;
- the shifted Gaussian covariance is a tensor product;
- the unique invariant color metric is precisely the color factor appearing in that product.

Thus the factorized color contraction of document 881 is not an arbitrary ansatz at quadratic level. It is the form actually produced by the canonical middle-frame norm.

## 6. What remains open at amplitude level

A positive Gram determines a coupling amplitude only up to an auxiliary-space partial isometry:

\[
L^*L=K_{\rm mid}.
\]

Even when \(K_{\rm mid}=K_{\rm mult}\otimes G_{A_2}\), a particular microscopic factor \(L\) can mix multiplicity and color inside the unobserved auxiliary space. Such mixing leaves the quadratic norm unchanged.

For observables depending only on the fully traced frame, that is ordinary Stinespring/environment gauge. For a claimed label-by-label identification with the three handle operators, the auxiliary alignment matters.

Therefore the remaining stronger claim is:

> the physical outer-leg coupling admits a factorized representative whose multiplicity frame is aligned with the handle frame.

Existence is strongly suggested by the Gram factorization; canonical physical selection of that representative is not yet proved.

## 7. Protection consequences

Any correction retaining the form

\[
K'_{\rm mult}\otimes G'_{\rm color}
\]

with equal signed row sums in \(K'_{\rm mult}\) preserves the active projector. The color metric may renormalize by an overall positive scale without affecting selection because its invariant space is one-dimensional.

Exact selection fails when corrections introduce:

- unequal primary multiplicity weights;
- multiplicity/color entangling quadratic terms;
- color anisotropy breaking \(C_3\) or full color covariance;
- off-pattern response operators violating signed row sums.

This gives a clean tensor-level Ward target.

## 8. Stop-everything and falsification criteria

**Vertex trigger:** the explicit outer-leg amplitude factorizes, up to environment unitary, as \(L_{\rm mult}\otimes L_{\rm color}\).

**Gauge trigger:** the color factor is promoted from the discrete augmentation metric to the appropriate full-\(SU(3)\) singlet contraction without changing the multiplicity response.

**Alignment trigger:** the multiplicity factor’s three edge amplitudes map to the normalized handle frame.

**RG trigger:** loop corrections preserve tensor factorization and equal signed row sums.

**Negative trigger:** a required mixed multiplicity/color invariant appears in the quadratic response.

**Falsifier:** inferring a unique microscopic amplitude from its Gram. The auxiliary partial-isometry freedom remains.

## 9. Verdict

The canonical middle-slot response has the exact product structure required by the effective matter-to-handle bridge:

\[
\boxed{
K_{\rm shift}
=
\text{signed multiplicity Laplacian}
\otimes
\text{unique color metric}.
}
\]

The color-singlet two-Kraus reduction is therefore supported by the actual quadratic frame, not merely by representation counting. The remaining uncertainty has been pushed to auxiliary-amplitude alignment and microscopic dynamics.

## 10. Dependencies

- [basis-independent middle-slot frame](878_the_basis_independent_middle_slot_frame_of_the_furey_triple_selects_the_same_signed_k3_active_module.md)
- [quadratic color contraction and Kraus rank](881_gauge_singlet_color_contraction_is_necessarily_quadratic_and_does_not_enlarge_the_two_kraus_environment_when_the_response_vertex_factorizes.md)
- [Gaussian mismatch-to-handle channel](880_isotropic_gaussian_reduction_of_the_signed_multiplicity_mismatch_plane_produces_the_exact_three_handle_class_sum_channel.md)
- [color augmentation metric](875_the_color_laplacian_factor_three_is_canonical_hodge_data_but_the_selector_equation_and_index_two_saturation_are_additional_physics.md)
