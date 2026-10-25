# A Cyclic Symmetry of the Three Walsh Contrasts Would Generate \(A_4\) and Cannot Be the Central \(C_3\) of the Order-18 Selector Group

## Claim status

Exact finite-group comparison. It identifies the symmetry that would make the three contrasts isotropic and proves that this symmetry is not already contained in the known selector group.

## 1. The required cyclic automorphism

The response-square translations form

\[
V_4=\{1,F_H,F_C,F_HF_C\}.
\]

Its three nonidentity elements correspond to the three relational differences:

\[
H,qquad C,qquad HC.
\]

An order-three automorphism can cycle them:

\[
H\longmapsto C
\longmapsto HC
\longmapsto H.
\]

On the Walsh spectrum, the same operation cycles the three nontrivial character lines.

## 2. The extension is \(A_4\)

The order-three element acts nontrivially on \(V_4\), so the generated group is the semidirect product

\[
V_4\rtimes C_3.
\]

This is the alternating group

\[
\boxed{
V_4\rtimes C_3\cong A_4,
}

of order twelve.

The four atomic channels can be viewed as the four vertices of a tetrahedron. The three Walsh contrasts form the standard three-dimensional real representation of its rotational symmetry group.

## 3. Why it forces contrast isotropy

The \(V_4\)-invariant response has three edge parameters

\[
b_H,qquad b_C,qquad b_{HC}.
\]

Cyclic invariance forces

\[
b_H=b_C=b_{HC}=b.
\]

The spectrum becomes

\[
\lambda_{\rm common}=a+3b,
\]

and

\[
\boxed{
\lambda_H=lambda_C=lambda_{HC}=a-b.
}

Thus an \(A_4\)-symmetric response supplies an exact one-plus-three decomposition. The three-dimensional contrast representation is irreducible over \(\mathbb R\), so any invariant symmetric response is scalar on it.

This is the precise discrete symmetry that could justify calling the contrasts a triplet. It still does not produce continuous \(SO(3)\) dynamics or a Lorentzian \((1,2)\) metric.

## 4. It is not the existing selector \(C_3\)

The finite selector background group already established in the corpus is

\[
G_{\rm sel}\cong C_3\times S_3,
\qquad |G_{\rm sel}|=18.
\]

Two immediate obstructions apply.

First, by Lagrange's theorem, a group of order eighteen contains neither a subgroup of order four nor one of order twelve:

\[
4\nmid18,
\qquad
12\nmid18.
\]

Therefore it contains neither the response \(V_4\) nor its \(A_4\) extension.

Second, the selector \(C_3\) is central in \(C_3\times S_3\). A contrast-cycling element cannot be central because

\[
A F_H A^{-1}=F_C,
\]

and cyclically thereafter. It acts by nontrivial conjugation.

Hence

\[
\boxed{
\text{the selector's central phase cannot be reused as the contrast-cycling automorphism}.}
\]

This agrees with the earlier result that the central selector phase is not the primitive mutual shear.

## 5. Consequence for the Walsh transform

The Walsh transform intertwines the regular representation of the abstract response-square \(V_4\) with its character representation. It does **not** presently intertwine the finite selector group acting on the eighteen-background torsor.

The two finite structures live at different levels:

- \(V_4\): hypothetical restored flips of the four response channels;
- \(C_3\times S_3\): arithmetic transport among eighteen checkpoint backgrounds.

Any relation between them requires a new response functor or a larger common group. Cardinality and the presence of order-two/order-three elements are insufficient.

## 6. A credible extension branch

If a physical order-three operation is found that cycles handle, channel and product contrasts, then the response symmetry becomes \(A_4\). This would provide:

- exact degeneracy of the three contrast eigenvalues;
- a canonical discrete triplet;
- a tetrahedral interpretation of the four atomic channel ports;
- a new finite-group object to compare with Furey triality and code automorphisms.

But the operation must be derived independently. The known selector phase cannot perform this role while retaining its proved centrality.

## 7. Stop-everything tests

- **\(A_4\) success:** a physical order-three map cyclically conjugates the two flip generators and preserves the response.
- **Triplet success:** calculated contrast residues or thresholds are equal by that symmetry rather than by tuning.
- **Selector falsifier:** the central selector \(C_3\) is claimed to act noncentrally on \(V_4\).
- **Lagrange falsifier:** \(V_4\) or \(A_4\) is claimed as a subgroup of the order-18 selector group.
- **Continuous-symmetry warning:** an \(A_4\) triplet is promoted to \(SO(3)\) without additional generators.
- **Metric warning:** contrast degeneracy is treated as a Lorentzian Jordan metric despite the invariant form being definite.

## 8. Executable certificate

    node verification/prove/prove_v4_contrast_cycling_generates_a4_and_is_not_the_central_c3_of_the_order18_selector_group.mjs

The certificate constructs the response \(V_4\), adjoins an explicit three-cycle, verifies order twelve and noncentral conjugation, and records the Lagrange-order obstruction to embedding in the selector group.

## Companion documents

- [Walsh–Hadamard relational eigenchannels](819_restoring_both_square_flips_turns_the_four_channel_response_into_a_v4_convolution_algebra_with_walsh_hadamard_relational_eigenchannels.md)
- [Contrast metric obstruction](820_the_three_v4_contrasts_match_the_dimension_but_not_the_metric_of_the_h2r_relationship_space_or_a_canonical_spin23_section.md)
- [Finite eighteen-background selector group](../0700-0799/786_oriented_color_and_handle_exchange_generate_c3_times_s3_and_the_hyperbolic_checkpoint_has_a_regular_18_background_spurion_orbit.md)
- [Central selector phase is not the mutual shear](../0700-0799/790_the_central_selector_c3_is_not_the_primitive_mutual_shear_even_modulo_three_and_cannot_yet_be_called_framing.md)
