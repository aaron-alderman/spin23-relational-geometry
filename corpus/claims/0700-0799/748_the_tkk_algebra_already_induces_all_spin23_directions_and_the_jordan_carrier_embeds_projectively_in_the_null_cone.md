# The TKK Algebra Already Induces All \(Spin(2,3)\) Directions, and the Jordan Carrier Embeds Projectively in the Null Cone

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B09, B11, B13, B14 and the cross-branch representation audit  
**Claim status:** exact representation reconciliation and executable certificate; physical Standard-Model covariance remains open  
**Certificate:** [verify_tkk_sp4_basis_induces_full_spin23_and_h2_has_conformal_null_embedding.mjs](../../../verification/verify/verify_tkk_sp4_basis_induces_full_spin23_and_h2_has_conformal_null_embedding.mjs)

## Executive correction

The programme already had an algebraically complete \(Sp(4,\mathbb R)\) construction before the primitive-two-form branch:

- document 42 gave the exact TKK construction for \(H_2(\mathbb R)\);
- documents 653–654 gave a declared fixed-source threshold family spanning the whole carrier and reconstructed all ten TKK generators;
- document 668 identified the triple as polarized Feshbach self-energy.

The new primitive-form construction supplies the missing **representation bridge**, not six additional algebra generators.

The certificate takes the standard TKK basis

\[
3\text{ upper wing}
+4\text{ middle algebra}
+3\text{ lower wing}
=10
\]

and induces it on \(\Lambda_0^2\mathbb R^4\). Its span has rank ten. Relative to the illustrative linear section of document 746, its projections have ranks

\[
\boxed{4\text{ stabilizer}+6\text{ mixing}=10.}
\]

Thus a response family that truly spans \(H_2(\mathbb R)\) already generates all ambient \(Spin(2,3)\) directions through TKK.

## 1. The two representations must remain typed

There are three related but distinct objects:

1. the Jordan algebra \(J=H_2(\mathbb R)\), dimension three;
2. the TKK fundamental symplectic space \(V=\mathbb R^4\), dimension four;
3. the primitive-two-form vector representation \(\Lambda_0^2V^*\), dimension five.

The same group acts differently on them:

- nonlinearly and fractionally on the Jordan/Minkowski patch;
- linearly and symplectically on \(V\);
- linearly and orthogonally on \(\Lambda_0^2V^*\).

Identifying their coordinates directly is a type error.

## 2. Canonical conformal embedding

Write an element of the Jordan carrier in Lorentz coordinates

\[
x=(t,x_1,x_2),
\qquad
q(x)=t^2-x_1^2-x_2^2=\det X.
\]

Use ambient light-cone coordinates

\[
(X^+,X^-,t,x_1,x_2)
\]

with quadratic form

\[
Q=2X^+X^-+t^2-x_1^2-x_2^2.
\]

The affine conformal embedding is

\[
\boxed{
\iota(x)=left(1,-\frac{q(x)}2,x\right).
}
\]

It is null:

\[
Q(\iota(x))=0.
\]

The carrier is therefore an affine chart of the **projective null cone**, not canonically a linear signature-\((1,2)\) subspace.

For two points,

\[
\boxed{
B(\iota(x),\iota(y))
=-\frac12q(x-y),
}

so ambient null geometry encodes Minkowski separation.

## 3. Status of the linear section

The linear embedding used in document 746,

\[
(t,x_1,x_2)\mapsto(t,0,x_1,x_2,0),
\]

is a valid isometric embedding of quadratic spaces. Its stabilizer and six-dimensional orbit are mathematically correct.

It is not, however, the canonical conformal compactification associated with TKK. Generic translations and special-conformal transformations do not preserve that linear section. Therefore:

- its four-plus-six decomposition is a useful symmetric-pair diagnostic;
- it must not be interpreted as the TKK three-grading;
- and its six mixing directions are not six generators absent from a full TKK construction.

## 4. The canonical TKK grading

For \(J=H_2(\mathbb R)\), the canonical grading is

\[
\mathfrak{sp}(4,\mathbb R)
=J^-
\oplus
\mathfrak{str}(J)
\oplus
J^+,
\]

with dimensions

\[
3+4+3.
\]

The two three-dimensional wings are translations and special-conformal directions in the Jordan patch. The four-dimensional middle algebra contains Lorentz structure transformations plus dilation.

This grading is intrinsic to the Jordan triple. The \(4+6\) linear-section decomposition depends on a chosen nondegenerate three-plane in the ambient vector representation.

## 5. What documents 653–654 now prove

For their declared threshold model, the sampled response matrices span all of \(H_2(\mathbb R)\). Consequently they reconstruct:

- all three upper-wing generators;
- all three lower-wing generators;
- all four cross-commutator middle generators;
- the full four-dimensional symplectic fundamental action;
- and, by the primitive-two-form functor, the full five-dimensional \((2,3)\) vector action.

This is a complete algebraic realization of

\[
\text{Jordan response family}
\Longrightarrow
\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3)
\]

for that declared model.

## 6. What remains physically open

The unresolved question has moved. It is no longer whether the algebraic TKK completion contains ten generators. It is whether the Standard-Model/Furey system physically licenses the declared carrier and transformations:

1. Do actual fixed-frame spectral functions span \(H_2(\mathbb R)\)?
2. Does the incidence source survive renormalization and possess operational normalization?
3. Do Ward constraints reduce the accessible algebra, as documents 657–658 found?
4. Are TKK transformations symmetries, dualities between theories, or merely spectrum-generating maps?
5. Is the same symplectic four-space carried by the Furey matter construction?

The distinction between algebra generation and symmetry remains decisive.

## 7. Updated falsification criteria

Stop describing the six linear-section mixing directions as missing if the full TKK basis has already been generated.

Stop identifying Jordan coordinates with primitive-form coordinates; use the null-cone embedding or an explicit intertwiner.

Stop treating the arbitrary linear section as the canonical conformal compactification.

Stop promoting the declared threshold result to Standard-Model symmetry until actual spectral data and Ward-normalized source transformations pass.

Stop the physical branch if real response matrices remain simultaneously diagonalizable or span fewer than three Jordan directions.

## 8. Highest-value next calculations

1. Re-run the primitive-form projection on the Ward-compatible four-dimensional subalgebra of document 657.
2. Determine which TKK grades survive fixed UV normalization and Ward constraints.
3. Map Furey conjugation into the TKK fundamental representation, not directly into ambient Jordan coordinates.
4. Replace declared thresholds with free broken-phase Standard-Model spectral functions.
5. Classify whether surviving transformations are action symmetries, response dualities or theory-space maps.

## Companion documents

- [Threshold response family reconstructs all ten Sp(4,R) generators](../0600-0699/654_the_threshold_response_family_reconstructs_all_ten_sp4_generators.md)
- [Jordan triple as polarized Feshbach self-energy](../0600-0699/668_the_jordan_triple_is_the_polarization_of_feshbach_relational_self_energy.md)
- [Primitive two-forms and the genuine Spin(2,3) module](745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)
- [Linear carrier-section stabilizer](746_an_h2r_carrier_embeds_as_a_signature12_section_of_the_spin23_module_but_leaves_a_six_parameter_embedding_degeneracy.md)
- [Explicit linear-section mixing generators](747_the_six_missing_spin23_generators_are_three_rotations_and_three_boosts_with_explicit_sp4_lifts.md)
