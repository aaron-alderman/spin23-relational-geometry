# The First-Order Weak-Weyl Coboundary Exactly Saturates the Index-Two Selector Defect Lost by Quadratic Response

**Date:** 17 October 2026  
**Branches:** weak Weyl reflection, integral cochains, index-two saturation, ribbon orientation, color Laplacian, and signed selector  
**Claim status:** exact integral-chain theorem; physical retention of first-order weak flux remains open  
**Certificate:** [prove_the_first_order_weak_weyl_coboundary_saturates_the_index_two_selector_lattice.mjs](scripts/prove_the_first_order_weak_weyl_coboundary_saturates_the_index_two_selector_lattice.mjs)

## Executive result

The unexplained index two in document 874 now has an exact algebraic origin and an exact primitive repair.

Let \(W\) be the weak Weyl reflection exchanging \(u\) and \(d\) while fixing \(u^c\):

\[
W=
\begin{pmatrix}
0&1&0\\
1&0&0\\
0&0&1
\end{pmatrix}.
\]

Its first-order coboundary is

\[
\delta_W=1-W
=
\begin{pmatrix}
1&-1&0\\
-1&1&0\\
0&0&0
\end{pmatrix}.
\]

Applied to the \(u\) node,

\[
\boxed{\delta_Wu=u-d,}
\]

the missing primitive seam.

But its quadratic Laplacian is

\[
\delta_W^T\delta_W=2\delta_W,
\]

so

\[
\boxed{\delta_W^T\delta_Wu=2(u-d).}
\]

That is exactly the doubled seam produced by the two enriched face equations. The Smith invariant \(2\) is therefore not an accidental arithmetic residue: it is precisely what is lost when a first-order oriented weak flux is replaced by its quadratic reflection-invariant norm.

Retaining \(1-W\), rather than only \((1-W)^T(1-W)\), saturates the constraint lattice:

\[
\boxed{(1,2)\longrightarrow(1,1).}
\]

## 1. The old defect

The color-Laplacian construction used the face rows

\[
F_u=u+u^c,
\qquad
F_{d,\Delta}=-u+2d+u^c.
\]

Their matrix is

\[
D_\Delta=
\begin{pmatrix}
1&0&1\\
-1&2&1
\end{pmatrix}.
\]

Subtracting the rows gives

\[
F_u-F_{d,\Delta}=2(u-d).
\]

The Smith normal form is

\[
\operatorname{SNF}(D_\Delta)=(1,2).
\]

Over a torsion-free real or integral module the kernel is already correct, but the row lattice is not primitive. Modulo two the two rows coincide and the rank drops from two to one.

## 2. Weak-Weyl first difference

On the doublet lattice \(\mathbb Z\{u,d\}\), the reflection is the transposition. The group-ring difference

\[
1-W

\]

is the natural first-order discrete derivative across the weak Weyl edge.

Its image is

\[
\operatorname{im}(1-W)=\mathbb Z(u-d),

\]

which is primitive. Replacing the doubled row by this flux gives

\[
D_{\rm prim}=
\begin{pmatrix}
1&0&1\\
1&-1&0
\end{pmatrix}.
\]

Now

\[
\operatorname{SNF}(D_{\rm prim})=(1,1),

\]

and the matrix retains rank two modulo two.

This is exactly the primitive selector already isolated in document 872, now derived from a named Standard Model operation.

## 3. Why squaring produces the two

Because \(W=W^T=W^{-1}\),

\[
\begin{aligned}
(1-W)^T(1-W)
&=(1-W)^2\\
&=1-2W+W^2\\
&=2(1-W).
\end{aligned}
\]

The factor two is universal for an involutive reflection. It is the discrete analogue of passing from an oriented derivative to an unoriented energy:

\[
\text{flux }\delta_W
\quad\longmapsto\quad
\text{energy }\delta_W^T\delta_W.
\]

The energy knows the odd subspace but doubles its primitive integral generator. It also forgets the sign of the orientation.

This is precisely why earlier positive Gram and Laplacian constructions could find the correct real kernel while leaving a \(\mathbb Z_2\) ambiguity.

## 4. Integration with the weak-center result

Document 889 identified the Furey quartet sign pattern as the weak-center character

\[
z_L=-I\in SU(2)_L:
\qquad
(d^c,u,d,u^c)\mapsto(+,-,-,+).
\]

Document 886 identified a weak Weyl lift \(w\) with

\[
w^2=z_L.
\]

The two first-order data now have distinct roles:

- \(z_L\) supplies the singlet/doublet sign local system;
- \(1-W\) supplies the oriented difference between the two weights inside the doublet.

Together they provide exactly the information erased by the quadratic response:

\[
\boxed{
\text{representation parity} + \text{oriented weak difference}.
}
\]

This is a much sharper realization of the previously conjectured “Pfaffian/orientation” input.

## 5. Revised selector derivation

The primitive flatness system can now be written as

\[
\boxed{
F_u=u+u^c=0,
\qquad
\delta_Wu=u-d=0.
}
\]

Its kernel is

\[
(u,d,u^c)=(w,w,-w).
\]

Furey cycle closure then yields

\[
d^c=u+d-u^c=3w.

\]

Thus:

1. the up face supplies \(u+u^c=0\);
2. the first-order weak Weyl coboundary supplies \(u-d=0\);
3. cycle closure supplies the factor-three sum;
4. the quadratic middle frame supplies positive spectral selection and stability.

The color Laplacian remains an exact parallel realization of multiplication by three, but it is no longer needed to manufacture the weak seam.

## 6. What has been solved

The following formerly open algebraic questions are now closed:

- why the saturated row is \(u-d\);
- which physical symmetry distinguishes the two nodes;
- why a quadratic construction produces twice the primitive row;
- why the defect is specifically two-primary;
- why mod two the distinction disappears;
- which first-order operator restores it.

The answer is the weak Weyl group-ring coboundary.

## 7. What remains physical

An exact integral cochain does not by itself make a term in the Standard Model action. A physical derivation must still explain why the response retains

\[
1-W

\]

as an oriented amplitude or boundary flux rather than only the positive operator

\[
(1-W)^T(1-W).

\]

Candidates include:

- Higgs-oriented weak transport;
- a Wilson line or boundary holonomy carrying the Weyl element;
- a Pfaffian/determinant line that retains the square root of the Gram;
- a chiral first-order Dirac/Yukawa operator;
- an amplitude-level Kraus or transfer map before environment tracing.

After electroweak symmetry breaking, the Higgs vacuum must be transformed or inserted as a spurion, as established in document 886.

## 8. Stop-everything and falsification criteria

**Action trigger:** integrating out a weak/Higgs boundary mode produces the first-order operator \(1-W\) before squaring.

**Pfaffian trigger:** the determinant or Pfaffian line of the middle response has transition function equal to the weak-center character and boundary \(1-W\).

**Channel trigger:** a coherent dilation contains \(1-W\), while tracing its phase produces the established quadratic signed-\(K_3\) selector.

**Higgs trigger:** a covariant Higgs insertion selects the orientation of \(u-d\) and reduces to the primitive seam in unitary gauge.

**Negative trigger:** every admissible observable depends only on \((1-W)^T(1-W)\). Then the real kernel remains selected but the primitive integral saturation has no physical observable.

**Falsifier:** attributing the index two to color multiplicity alone after the identity \((1-W)^T(1-W)=2(1-W)\) is taken into account.

## 9. Verdict

The orientation defect has an exact mathematical solution:

\[
\boxed{
u-d=(1-W_{ud})u,
\qquad
2(u-d)=(1-W_{ud})^T(1-W_{ud})u.
}
\]

The primitive selector is the first-order weak-Weyl cochain; the index-two defect is the cost of forgetting its orientation in a quadratic Gram.

The remaining question is now properly physical, not algebraic:

\[
\boxed{
\text{what dynamical object retains the first-order weak flux?}
}
\]

## 10. Dependencies

- [weak-center twist of the neutral quartet](889_the_furey_incidence_quartet_is_a_weak_center_twist_of_an_exact_spin10_neutral_relation_not_one_of_the_25_minimum_code_logicals.md)
- [weak Weyl reflection](886_the_weak_weyl_reflection_supplies_the_missing_multiplicity_cycle_reversal_before_higgs_vacuum_selection.md)
- [color-Laplacian index-two defect](874_the_c3_color_laplacian_canonically_generates_the_factor_three_selector_but_leaves_an_index_two_orientation_defect.md)
- [minimal primitive cochain selector](872_the_incidence_copy_is_the_primitive_cocycle_kernel_of_a_minimal_two_face_local_coefficient_completion.md)
- [middle-slot quadratic frame](878_the_basis_independent_middle_slot_frame_of_the_furey_triple_selects_the_same_signed_k3_active_module.md)

