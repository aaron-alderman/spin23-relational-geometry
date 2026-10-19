# The Three \(V_4\) Contrasts Match the Dimension but Not the Metric of the \(H_2(\mathbb R)\) Relationship Space or a Canonical \(Spin(2,3)\) Section

## Claim status

Exact invariant-form and signature obstruction. It prevents the new three-contrast sector from being identified with the older three relationships solely by dimension.

## 1. Three different three-dimensional objects

The programme now contains at least three mathematically distinct triads:

1. the nontrivial Walsh characters
   \[
   (v_H,v_C,v_{HC});
   \]
2. the symmetric two-face relationships
   \[
   \operatorname{Sym}^2(\mathbb R^2)\cong H_2(\mathbb R);
   \]
3. a chosen three-dimensional section of the primitive two-form module
   \[
   \Lambda_0^2\mathbb R^4
   \quad\text{with ambient signature }(2,3).
   \]

All have dimension three at the relevant stage. Their bilinear forms are not the same.

## 2. Natural metric on the Walsh contrast space

The Walsh transform is orthogonal. The three nontrivial character vectors therefore inherit the positive Euclidean form

\[
g_{\rm Walsh}=I_3.
\]

The atomic-to-character Fourier transform preserves this norm exactly.

By contrast, the determinant polarization on \(H_2(\mathbb R)\) has signature

\[
(1,2).
\]

Thus no real linear map can be simultaneously invertible and isometric between the natural Walsh metric and the Jordan determinant metric. Sylvester's law of inertia forbids it.

## 3. All \(V_4\)-invariant forms

In the character basis \((H,C,HC)\), the four group elements act by independent diagonal sign patterns. A symmetric bilinear form invariant under all of them must be diagonal:

\[
g=\operatorname{diag}(\alpha_H,\alpha_C,\alpha_{HC}).
\]

Therefore a Lorentzian \((1,2)\) form can be installed, but only by choosing:

- which one of the three characters is positive;
- the three relative scales.

There are three sign choices before scale data. The abstract \(V_4\) action alone selects none of them.

## 4. Character-permutation symmetry makes the obstruction stronger

The automorphism group

\[
\operatorname{Aut}(V_4)\cong S_3
\]

permutes the three nonidentity elements and hence the three nontrivial characters. Invariance under even one three-cycle forces

\[
\alpha_H=\alpha_C=\alpha_{HC}.
\]

Every nonzero invariant form is then a scalar multiple of \(I_3\), hence definite. It cannot have signature \((1,2)\).

Consequently:

\[
\boxed{
\text{a Lorentzian identification requires distinguishing one contrast and breaking the cyclic character symmetry}.}
\]

## 5. Primitive \(Spin(2,3)\) module obstruction

The five-dimensional primitive two-form module has signature

\[
(2,3).
\]

Its maximal positive-definite subspace has dimension two. Therefore the naturally Euclidean three-dimensional Walsh contrast space cannot embed isometrically as a subspace.

A Lorentzian contrast form of signature \((1,2)\) can embed as an \(H_2(\mathbb R)\)-type section, but this again requires the extra choice of one positive character and two negative characters. The six-parameter section ambiguity found earlier is not removed by the Walsh construction.

## 6. Comparison with the original three relationships

The original relationship coordinates are

\[
x^2,quad 2xy,quad y^2,
\]

with determinant cone and rank-one Veronese boundary. The Walsh contrasts are linear combinations of four channel populations. They possess neither a determinant cone nor a rank-one Veronese interpretation by construction.

A valid bridge must supply:

1. an indefinite bilinear form on the contrast space;
2. a map carrying it to the Jordan determinant;
3. a reason one character is time-like;
4. compatibility with the response triple or symplectic carrier.

Absent those data, “three contrasts = three relationships” is only a dimension analogy.

## 7. Stop-everything tests

- **Metric success:** a source-derived contrast Hessian has signature \((1,2)\) and a distinguished positive character.
- **Jordan success:** its null cone maps to rank-one \(H_2(\mathbb R)\) rays.
- **Primitive-module success:** the map embeds that Lorentzian space into \(\Lambda_0^2V^*\) and intertwines the relevant action.
- **Definite falsifier:** the only physical contrast metric is the Walsh Euclidean norm.
- **Symmetry falsifier:** full character-permutation symmetry is retained while a Lorentzian invariant metric is claimed.
- **Dimension-warning gate:** three coordinates are identified without comparing their quadratic forms.

## 8. Executable certificate

    node scripts/classify_v4_contrast_metrics_and_test_embedding_into_h2r_and_the_spin23_primitive_module.mjs

The certificate classifies \(V_4\)-invariant symmetric forms, enumerates the three Lorentzian sign choices and proves that cyclic character invariance forces a definite metric.

## Companion documents

- [Walsh–Hadamard relational eigenchannels](819_restoring_both_square_flips_turns_the_four_channel_response_into_a_v4_convolution_algebra_with_walsh_hadamard_relational_eigenchannels.md)
- [Three relationship rays span \(H_2(\mathbb R)\)](272_three_relationship_rays_span_the_two_face_jordan_space.md)
- [Primitive two-forms give the \(Spin(2,3)\) module](745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)
- [The \(H_2(\mathbb R)\) section remains noncanonical](746_an_h2r_carrier_embeds_as_a_signature12_section_of_the_spin23_module_but_leaves_a_six_parameter_embedding_degeneracy.md)
