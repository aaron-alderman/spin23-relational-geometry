# The Product Pfaffian–Color Space Is a Symplectic Bath, Not the Typed Carrier, Because Its Color Character Has No Fixed Plane

**Date:** 17 October 2026  
**Branches:** weak/color product sewing, representation typing, color contraction, neutral complement, integral carrier, and claim correction  
**Claim status:** exact characteristic-zero representation no-go; corrected carrier architecture stated explicitly  
**Certificate:** [classify_intertwiners_between_product_weak_color_and_a4_signed_carrier_actions.mjs](../../../verification/classify/classify_intertwiners_between_product_weak_color_and_a4_signed_carrier_actions.mjs)

## Executive result

Document 893 proved a correct statement about forms:

\[
\varepsilon_{\rm weak}\otimes G_{A_2}
\cong_{\mathbb R}
J_0.
\]

But the stronger physical-carrier interpretation fails. The natural color action on the product space is

\[
A_{\rm prod}=I_2\otimes C_{A_2}.

\]

It consists of two nontrivial real \(C_3\) doublets:

\[
E_{\rm prod}\cong I\oplus I,

\]

where \(I\) is the color augmentation representation. Hence

\[
\operatorname{tr}A_{\rm prod}=-2,
\qquad
\dim\ker(A_{\rm prod}-I)=0.

\]

The established four-real carrier has one active color doublet and a two-real-dimensional color-fixed complement:

\[
E_{\rm car}\cong I\oplus\mathbf1^{\oplus2}.

\]

Its color action satisfies

\[
\operatorname{tr}A_{\rm car}=1,
\qquad
\dim\ker(A_{\rm car}-I)=2.

\]

The characters differ. Therefore

\[
\boxed{
E_{\rm prod}\not\cong E_{\rm car}
}

\]

as real or rational color representations. No invertible color intertwiner exists, so no simultaneous signed, symplectic or integral intertwiner can exist either.

The correction is categorical:

\[
\boxed{
\varepsilon\otimes G_{A_2}
\text{ is the symplectic form of the pre-contraction mismatch bath, not yet the typed output carrier.}
}

## 1. Character obstruction

For the product action,

\[
\chi_{\rm prod}(\lambda)
=(\lambda^2+\lambda+1)^2.

\]

For the earlier \(A_4\)/carrier color action,

\[
\chi_{\rm car}(\lambda)
=(\lambda-1)^2(\lambda^2+\lambda+1).

\]

The first representation has no invariant vectors; the second has a fixed plane. Since characteristic polynomials, traces and fixed-space dimensions are invariant under conjugacy, the two actions cannot be related by a change of basis over any characteristic-zero field.

This proves that the two-line completion mismatch found in document 893 was not merely caused by a poor choice of integral congruence. It reflects different representation content.

## 2. Direct intertwiner classification

Let \(R\) denote the earlier \(A_4\) color action and \(S\) its paired anti-symplectic reflection. Let \(A\) and \(T\) denote the natural product color and joint reflection.

The certificate solves

\[
AX=XR,

\]

\[
TX=XS,

\]

and the simultaneous system.

The dimensions of the solution spaces are

\[
\dim\operatorname{Hom}_{C_3}(E_{\rm car},E_{\rm prod})=4,

\]

\[
\dim\operatorname{Hom}_{\langle T\rangle}=8,

\]

and

\[
\dim\operatorname{Hom}_{\langle C_3,T\rangle}=2.

\]

Every simultaneous basis map has rank two; the character obstruction proves every linear combination remains noninvertible. The surviving rank-two maps can only connect the single common color-standard summand.

This identifies exactly what can intertwine:

\[
I_{\rm car}longleftrightarrow
\text{one linear combination of }I\oplus I,

\]

while the carrier’s fixed plane has no image of the correct color type.

## 3. Corrected architecture

The previous documents already contained the needed distinction:

- the raw middle-frame mismatch bath has real dimension four, \(I_{\rm mult}\otimes I_{\rm color}\);
- gauge-singlet color contraction is quadratic, not linear;
- after factorized contraction, the induced channel has Kraus/environment rank two;
- the physical four-real carrier is obtained only after adjoining a separate primitive color-fixed pair.

Therefore the correct chain is

\[
I_{\rm mult}\otimes I_{\rm color}
\xrightarrow{\text{quadratic color contraction}}
I_{\rm relationship}

\]

followed by

\[
I_{\rm relationship}
\oplus
F_{\rm neutral}
\longrightarrow
V_{\rm carrier},

\]

where

\[
\dim_{\mathbb R}I_{\rm relationship}=2,
\qquad
\dim_{\mathbb R}F_{\rm neutral}=2.

\]

Then

\[
V_{\rm carrier}\cong I\oplus\mathbf1^{\oplus2},

\]

the correct color character.

## 4. What remains valuable from the product form

The form identity of document 893 remains exact and useful:

\[
\Omega_{\rm bath}=\varepsilon_{\rm mult}\otimes G_{A_2}.

\]

It says the raw bath already possesses a canonical nondegenerate alternating geometry. It also explains its discriminant three and the index-three arithmetic.

But a Stinespring environment can be symplectic without being the system carrier. The color trace/channel contraction changes representation type and reduces the effective environment rank. One must not transport the raw bath color action directly onto the output carrier.

Thus the corrected claim is:

> the Standard-Model mismatch bath has a canonical \(Sp(4)\)-type form;

not:

> the bath itself is the previously constructed physical four-carrier.

## 5. Consequence for \(Spin(2,3)\)

Abstractly,

\[
\operatorname{Aut}(E_{\rm prod},\Omega_{\rm bath})
\cong Sp(4,\mathbb R).

\]

That statement is correct but insufficient: every nondegenerate four-real alternating space has this automorphism group. The research programme needs a **typed** derivation in which Standard Model color, the neutral complement, the handle exchange and the response channel act in their established roles.

The typed route is therefore

\[
\boxed{
\text{four-dimensional bath}
\to
\text{rank-two relational channel}
\oplus
\text{rank-two neutral complement}
\to
\text{four-dimensional carrier}.
}

\]

The \(Spin(2,3)\) claim should attach to the last object, not automatically to the first.

## 6. Reinterpretation of the two product completions

The two signed-covariant index-three completions of the product bath are genuine arithmetic refinements of the bath. Their failure to match the color-average carrier line is now expected because the bath contains two active color doublets rather than an active/fixed split.

They may still matter as:

- alternative integral dilations of the rank-two channel;
- two coherent environment orientations;
- arithmetic choices exchanged or identified by the quadratic color trace;
- precursors whose quotient produces the carrier completion.

They should not be called competing carrier lattices until such a quotient is constructed.

## 7. New bounded problem

The appropriate sewing calculation is no longer an isomorphism of the raw four-spaces. It is:

1. factor or contract \(I_{\rm mult}\otimes I_{\rm color}\) to the two-dimensional handle/Kraus relationship plane;
2. identify the induced primitive alternating area on that plane;
3. adjoin the established two-dimensional neutral fixed complement;
4. prove the direct-sum form has equal primitive areas;
5. recover the unique index-three completed carrier and its \(J_0\).

This route respects the Choi-rank theorem and the color character simultaneously.

## 8. Stop-everything and falsification criteria

**Contraction trigger:** the quadratic color trace induces a primitive area on the rank-two relationship/Kraus plane rather than only a positive metric.

**Neutral-sewing trigger:** adjoining the canonical fixed \(\nu^c/\nu\) or survivor complement yields equal areas without an inserted normalization.

**Integral trigger:** the contraction sends the two bath completion lines to the same color-average carrier completion.

**Channel trigger:** the resulting direct-sum action is conjugate to the established order-18 selector on \((\mathbb Z^4,J_0)\).

**Negative trigger:** the contracted relationship area and neutral area remain independently scalable. Then the real carrier exists but the arithmetic \(Spin(2,3)\) lattice remains underdetermined.

**Falsifier:** claiming that equality of alternating forms up to real congruence also identifies their attached color representations.

## 9. Verdict

The exact no-go is

\[
\boxed{
\operatorname{tr}A_{\rm prod}=-2\ne1=\operatorname{tr}A_{\rm car}.
}

\]

Hence

\[
\boxed{
\text{raw product bath}\ne\text{typed four-carrier}.
}

\]

The correction does not remove the new Pfaffian/color geometry. It places it at the proper stage of the construction: before quadratic color contraction and neutral-complement sewing.

## 10. Dependencies

- [product-form sewing and arithmetic mismatch](893_the_weak_pfaffian_times_the_a2_color_metric_is_exactly_j0_over_the_reals_but_does_not_select_the_known_integral_completion_equivariantly.md)
- [quadratic color contraction and Kraus rank](881_gauge_singlet_color_contraction_is_necessarily_quadratic_and_does_not_enlarge_the_two_kraus_environment_when_the_response_vertex_factorizes.md)
- [Gaussian reduction to the handle channel](880_isotropic_gaussian_reduction_of_the_signed_multiplicity_mismatch_plane_produces_the_exact_three_handle_class_sum_channel.md)
- [fixed-complement sewing classification](865_a_fixed_rank_two_complement_and_handle_exchange_complete_the_incidence_mode_to_a_unique_unimodular_symplectic_selector.md)
- [canonical integral carrier](../0700-0799/761_the_color_average_completion_has_canonical_sp4z_form_and_primitive_lattice_u_plus_u_plus_minus2_with_signed_o23_action.md)

