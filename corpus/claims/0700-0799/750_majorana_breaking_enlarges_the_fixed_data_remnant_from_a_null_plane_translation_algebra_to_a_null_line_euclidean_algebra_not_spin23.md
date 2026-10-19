# Majorana Breaking Enlarges the Fixed-Data Remnant from a Null-Plane Translation Algebra to a Null-Line Euclidean Algebra, Not \(Spin(2,3)\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11, B13, B14 and the Majorana/UV conformal branch  
**Claim status:** exact comparison of two previously derived stabilizers in the five-dimensional representation; closed two-source assumption remains conditional after symmetry breaking  
**Certificate:** [compare_ward_uv_and_majorana_fixed_uv_subalgebras_in_spin23.mjs](../../../verification/compare/compare_ward_uv_and_majorana_fixed_uv_subalgebras_in_spin23.mjs)

## Executive result

The effect of Majorana breaking can now be stated geometrically and without exaggeration.

With exact \(B-L\) Ward normalization and one fixed positive UV slope, only two contact translations survive. Their ambient action preserves a maximal null two-plane.

After continuous \(B-L\) is broken, while one whitened UV slope remains fixed, the remnant becomes

\[
\boxed{
\mathbb R T_0\oplus\mathfrak e(2),
}
\]

consisting of three translations and one compact rotation. Its ambient action preserves one projective null line.

This is a genuine enlargement:

\[
\text{null-plane abelian translations}
\longrightarrow
\text{null-line affine Euclidean algebra}.
\]

It is not restoration of \(Spin_0(2,3)\).

## 1. Before Majorana breaking: Ward plus UV

The intersection found in document 658 has TKK grades

\[
\boxed{(2,0,0)}:
\quad
2\text{ upper translations},
\quad0\text{ middle},
\quad0\text{ lower}.
}
\]

It is abelian, with derived series

\[
2\longrightarrow0.
\]

In the primitive vector representation its common kernel is the maximal totally isotropic plane spanned by

\[
(-1,0,0,1,0),
\qquad
(0,-1,0,0,1).
\]

These generators change contact data only. Fixing the subtraction scheme removes both.

## 2. After Majorana breaking: one fixed UV tensor

Removing the continuous-current Ward constraint permits all three upper translations and one compact middle generator. The TKK grades become

\[
\boxed{(3,1,0)}.
\]

The derived series is

\[
4\longrightarrow2\longrightarrow0.
\]

The three translations share only the null line spanned by

\[
(-1,0,0,1,0).
\]

The compact middle generator preserves that line and rotates the two traceless contact directions. Algebraically,

\[
\mathfrak g
\cong
\mathbb RT_0\oplus\mathfrak e(2).
\]

Here \(T_0\) is the trace/time-like contact translation, while \(\mathfrak e(2)\) contains the compact rotation and the two traceless/spatial translations.

## 3. What is still absent

Even after breaking, the fixed-UV remnant contains:

- no dilation;
- no Lorentz boosts in the full \((1,2)\) Jordan patch;
- no lower/special-conformal TKK wing;
- no inversion exchanging the two wings;
- no transitive action on the conformal compactification.

It is an affine subgroup fixing infinity, not the full conformal group.

## 4. Fixed contacts and multiple UV tensors

If contact terms are also fixed, the three translations cease to be symmetries. Only the compact source-plane rotation remains.

If two generic UV slope tensors are independently fixed, that rotation is also lost. The continuous stabilizer is then trivial.

The dimension ladder is therefore

\[
10
\to4
\to1
\to0
\]

as domain, one UV tensor plus free contacts, fixed contacts, and two generic UV tensors are successively imposed.

## 5. The carrier-closure warning

Below the Majorana scale, the old two-source response need not be closed. The broken Ward identity can couple it to:

- the order-parameter phase or longitudinal mode;
- the radial Majorana mode;
- the Majorana mass operator;
- additional contact and mixing operators.

Adjoining those directions may produce a larger Jordan or operator system. The four-dimensional result is exact only for the projected closed-two-source assumption.

This is the next physical branch—not permission to call the projected remnant the final low-energy symmetry.

## 6. Consequences for the central narrative

Majorana breaking changes the geometry of the surviving flag:

\[
\text{protected null plane}
\longrightarrow
\text{protected null line}.
\]

This is a meaningful relaxation of relational constraints. It supports the idea that symmetry breaking can open new carrier motions. But it does so in a controlled, partial way, stopping at an affine Euclidean subgroup under fixed UV data.

## 7. Stop-everything criteria

Stop claiming Majorana restoration of \(Spin(2,3)\) while the lower TKK wing remains zero.

Stop counting contact translations as physical symmetry after fixing their subtraction scheme.

Stop retaining the compact rotation when two distinct physical UV tensors select different source axes.

Stop using the projected two-source result if the broken Ward identity demonstrably requires additional operator channels.

Stop inferring conformal inversion from a null-line stabilizer.

## 8. Highest-value next calculations

1. Add the Majorana order-parameter operator as a third response channel and determine the resulting positive cone.
2. Derive the broken Ward connection and its Schur complement back to two sources.
3. Test whether any lower-wing response emerges after the enlarged carrier is reduced.
4. Compute the compact rotation's breaking by actual masses and thresholds.
5. Compare the enlarged carrier with spin factors and higher-rank Jordan systems.

## Companion documents

- [Ward-plus-UV intersection](../0600-0699/658_the_ward_and_uv_stabilizer_intersection_contains_only_contact_translations.md)
- [Post-Majorana fixed-UV stabilizer](../0600-0699/678_majorana_breaking_removes_the_ward_restriction_but_does_not_restore_full_sp4.md)
- [Ward-compatible null-plane algebra](749_the_bl_ward_compatible_algebra_preserves_a_maximal_null_plane_and_is_affine_not_full_spin23.md)
