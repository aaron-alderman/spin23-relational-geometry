# Gauge-Singlet Color Contraction Is Necessarily Quadratic and Does Not Enlarge the Two-Kraus Environment When the Response Vertex Factorizes

**Date:** 17 October 2026  
**Branches:** color augmentation, bilocal response, Gaussian mismatch bath, Kraus rank, and gauge-singlet reduction  
**Claim status:** exact representation and channel theorem under factorized response coupling; microscopic factorization remains open  
**Certificate:** [test_gauge_singlet_color_contraction_of_the_mismatch_bath_and_its_kraus_rank.mjs](scripts/test_gauge_singlet_color_contraction_of_the_mismatch_bath_and_its_kraus_rank.mjs)

## Executive result

The extra color-augmentation factor in the matter mismatch bath need not enlarge the handle channel’s minimal environment—but only because the gauge-singlet reduction is quadratic and factorized.

For the augmentation ideal \(I\) with color action

\[
C=
\begin{pmatrix}
0&-1\\
1&-1
\end{pmatrix},
\]

there is no nonzero invariant linear functional:

\[
\boxed{\operatorname{Hom}_{C_3}(I,\mathbf1)=0.}
\]

Thus a single color-standard mismatch cannot couple linearly to a colorless bilocal carrier.

There is, however, a unique invariant symmetric quadratic form up to scale:

\[
\boxed{
G_I=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}.
}
\]

If the reduced response vertex factorizes as

\[
\text{multiplicity Kraus direction}
\otimes
\text{color contraction by }G_I,
\]

then tracing/contracting color only duplicates each of the two relational Kraus operators by scalar weights. The apparent four Kraus labels still span only two operator directions, and the normalized channel is unchanged.

This closes the color-dimension objection for the factorized gauge-singlet model. It does not prove that the microscopic response vertex factorizes.

## 1. No linear color erasure

An invariant row vector \(\ell:I\to\mathbb R\) would satisfy

\[
\ell C=\ell.
\]

But

\[
\det(C-I)=3\ne0.
\]

Therefore

\[
\ell=0.
\]

This is an important typing theorem. The color augmentation mode cannot simply be “summed away” at linear order. Ordinary color summation is precisely the augmentation map, and it annihilates \(I\).

Any nonzero gauge-singlet response of the active or mismatch augmentation modes must therefore be at least bilinear.

## 2. Unique quadratic contraction

Let

\[
G=
\begin{pmatrix}
a&b\\
b&c
\end{pmatrix}.
\]

The invariance equation

\[
C^TGC=G
\]

has a one-dimensional solution space. Its primitive positive integral generator is \(G_I\).

Thus the quadratic color-singlet contraction is unique up to normalization. This is the same \(A_2\) metric that appeared in the color-Hodge calculation.

The gauge-singlet mismatch covariance consequently has the factorized form

\[
P_{\rm std}^{\rm mult}\otimes G_I^{\rm color}
\]

whenever multiplicity and color remain statistically separable.

## 3. Why four labels need not mean Kraus rank four

Let \(K_1,K_2\) be the two minimal relational Kraus operators. Diagonalize the positive color metric. In the chosen Euclidean coordinates its eigenvalues are

\[
1,quad3,
\]

with total trace four.

A normalized factorized color contraction produces the redundant Kraus list

\[
\left{
\frac12K_1,
\frac{\sqrt3}{2}K_1,
\frac12K_2,
\frac{\sqrt3}{2}K_2
\right}.
\]

Although this list contains four labels, its vectorized operator span is still

\[
\operatorname{span}\{K_1,K_2\}.
\]

Therefore

\[
\boxed{\operatorname{rank}_{\rm Choi}=2.}
\]

The corresponding channel is

\[
\begin{aligned}
\Phi_{\rm color}(X)
&=\sum_{\alpha=1}^2\sum_{a=1}^2
\frac{\lambda_a}{\operatorname{Tr}G_I}
K_\alpha X K_\alpha^T\\
&=\sum_{\alpha=1}^2K_\alpha X K_\alpha^T.
\end{aligned}
\]

It is exactly the original handle class-sum channel.

## 4. Why bilocality is structurally required

The chain

\[
I\not\to\mathbf1,
\qquad
I\otimes I\to\mathbf1
\]

is the representation-theoretic reason the response carrier must be relational/bilocal.

A single colored difference cannot become a gauge-singlet amplitude. A pair of such differences can contract through \(G_I\). This mirrors the earlier full-\(SU(3)\) result that no linear four-real singlet carrier exists, while bilocal singlet contractions produce \(\mathbb C^2\).

The present calculation applies that principle specifically to the mismatch bath feeding the handle channel.

## 5. What factorization means

The channel-rank result assumes that color affects only scalar covariance weights and does not change the carrier operator attached to a given multiplicity direction:

\[
K_{\alpha a}=c_aK_\alpha.
\]

This is the natural form after a complete gauge-singlet contraction, because the carrier operator is colorless. But it is still a condition on the effective vertex.

A nonfactorizing vertex could produce distinct color-conditioned carrier operators

\[
K_{\alpha a}\notin\mathbb RK_\alpha,
\]

raising the Choi rank to as much as four. Gauge invariance constrains such a vertex but does not make its absence automatic without the explicit bilocal response construction.

## 6. Refined effective chain

The matter-to-handle route is now

\[
\boxed{
\begin{aligned}
E_{\rm mult}\otimes I_{\rm color}
&\xrightarrow{\text{quadratic color contraction }G_I}
E_{\rm mult}\\
&\xrightarrow{\text{frame isometry}}
E_{\rm Kraus}\\
&\xrightarrow{\text{Stinespring}}
\mathcal E_{\rm handle}.
\end{aligned}}
\]

The first arrow is necessarily quadratic. Under factorization it changes normalization but not Kraus rank.

## 7. Stop-everything and falsification criteria

**Vertex trigger:** the Furey/Jordan outer-leg integration yields a response tensor proportional to \(P_{\rm std}^{\rm mult}\otimes G_I^{\rm color}\).

**Factorization trigger:** after the color contraction, each color eigenmode multiplies the same carrier operator \(K_\alpha\).

**Bilocal trigger:** the required two color legs are precisely the independent covariant pair already demanded by the bilocal \(\mathbb C^2\) carrier.

**Rank trigger:** an explicit microscopic reduction has Choi rank two before any numerical truncation.

**Negative trigger:** independent color-conditioned carrier operators survive the singlet contraction and raise the Choi rank.

**Falsifier:** applying a nonzero linear trace \(I\to\mathbb R\). No such invariant map exists.

## 8. Verdict

Color cannot be erased linearly, but it can be contracted uniquely at quadratic order:

\[
\boxed{
\operatorname{Hom}_{C_3}(I,\mathbf1)=0,
\qquad
\dim\operatorname{Sym}^2(I^*)^{C_3}=1.
}
\]

Under the corresponding factorized bilocal contraction, four apparent color/multiplicity Kraus labels reduce to the same two-dimensional operator span. The color factor is therefore compatible with—not an automatic obstruction to—the exact two-Kraus handle environment.

## 9. Dependencies

- [Gaussian mismatch-to-handle channel](880_isotropic_gaussian_reduction_of_the_signed_multiplicity_mismatch_plane_produces_the_exact_three_handle_class_sum_channel.md)
- [color invariant metric and Hodge structure](875_the_color_laplacian_factor_three_is_canonical_hodge_data_but_the_selector_equation_and_index_two_saturation_are_additional_physics.md)
- [bilocal four-real carrier](855_no_linear_full_color_singlet_four_quotient_exists_but_the_minimal_bilocal_response_is_c2_with_canonical_j0.md)
- [minimal two-Kraus environment](859_the_three_handle_class_sum_has_a_minimal_two_dimensional_relational_environment.md)
