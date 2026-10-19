# The Color-Laplacian Factor Three Is Canonical Hodge Data, but the Selector Equation and Index-Two Saturation Are Additional Physics

**Date:** 17 October 2026  
**Branches:** color Hodge theory, incidence dynamics, local-coefficient topology, ribbon orientation, and protection  
**Claim status:** exact invariant-metric and orientation audit; physical constitutive law remains open  
**Certificate:** [classify_c3_invariant_hodge_metric_and_orientation_of_factor_three_selector.mjs](../../../verification/classify/classify_c3_invariant_hodge_metric_and_orientation_of_factor_three_selector.mjs)

## Executive result

The identity

\[
\Delta_{C_3}|_I=3\,1_I
\]

is more rigid than an arbitrary metric choice but weaker than a topological selection theorem.

On the rank-two augmentation module \(I\), the space of \(C_3\)-invariant real symmetric bilinear forms is one-dimensional. Its primitive positive integral generator is

\[
G_{A_2}=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}.
\]

For the forward color difference \(D=1-g\), the adjoint in this metric is

\[
D^\dagger=1-g^{-1},
\]

and

\[
\boxed{D^\dagger D=3\,1_I.}
\]

Thus the factor three is canonical Hodge/kinetic data of the color augmentation module.

However, the equation

\[
D^\dagger D,d=d^c
\]

is a constitutive or dynamical matching law. It is not forced merely by the existence of the chain complex. Moreover, reversing the color-cycle orientation exchanges \(D\) and \(D^\dagger\) but leaves \(D^\dagger D\) unchanged. Color orientation therefore cannot by itself resolve the remaining index-two saturation defect.

## 1. Unique invariant metric

In the augmentation basis, let color act by

\[
C=
\begin{pmatrix}
0&-1\\
1&-1
\end{pmatrix}.
\]

Write a general symmetric form as

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

has rank two on the three-dimensional space of symmetric forms. Hence the solution space is one-dimensional. Its primitive positive integral generator is \(G_{A_2}\).

This removes a possible objection to the factor-three calculation: within positive \(C_3\)-invariant metrics, there is no independent anisotropy capable of changing the two augmentation directions differently. Overall scale cancels from the adjoint.

## 2. Forward difference, adjoint and Laplacian

Define

\[
D=1-C.
\]

Its metric adjoint is

\[
D^\dagger=G_{A_2}^{-1}D^TG_{A_2}=1-C^{-1}.
\]

Therefore

\[
D^\dagger D
=(1-C^{-1})(1-C)
=3I_2.
\]

The same identity appears in three equivalent languages:

1. the group-ring relation \(3-(1+g+g^2)\);
2. the nonzero spectrum of the three-cycle graph Laplacian;
3. the \(A_2\) Hodge Laplacian on the augmentation plane.

This is a real convergence, not three unrelated numerical threes.

## 3. Why this is not yet a cohomological theorem

A cellular differential satisfies

\[
\delta^2=0.
\]

A Hodge Laplacian is instead

\[
\Delta=\delta^\dagger\delta+\delta\delta^\dagger.
\]

It uses adjacency plus an inner product/adjoint. Even when the invariant metric is unique up to scale, topology alone does not impose an equation equating the Laplacian of one matter coefficient to another coefficient.

Accordingly,

\[
\Delta_{C_3}d-d^c=0
\]

should be called a **color-Hodge constitutive equation**, a kinetic matching condition, or an enriched curvature equation—not an already established cellular boundary relation.

This correction preserves the exact factor-three result while preventing a category error.

## 4. A local auxiliary-flux reading

The second-order operator can be factored through a color-edge flux:

\[
j=(1-g)d,
\qquad
(1-g^{-1})j=d^c.
\]

Eliminating \(j\) gives

\[
(1-g^{-1})(1-g)d=d^c.
\]

This is a plausible local mechanism: a color difference creates an auxiliary flux, and its reverse divergence sources the conjugate-sector response. But the two equations are additional dynamics. The color graph only provides the available operators.

A Jordan-triple realization could potentially supply the flux variable as an inner derivation or quadratic-representation defect. That is now a precise construction target.

## 5. Orientation reversal does not saturate the index two

Reverse the color cycle:

\[
g\leftrightarrow g^{-1}.
\]

Then

\[
D\leftrightarrow D^\dagger,
\]

but

\[
D^\dagger D=DD^\dagger=3I_2.
\]

The Laplacian is orientation even. It therefore cannot distinguish the sign needed to turn

\[
(F_u-F_{d,\Delta})/2
\]

into a primitive oriented seam.

This narrows the proposed Pfaffian connection. If a determinant or Pfaffian line saturates the index-two row lattice, it must enter through the **first-order factorization**, the half-row choice, or an independent seam orientation—not through the Laplacian alone.

## 6. Refined division of labor

The current exact chain is

\[
\boxed{
\begin{aligned}
C_3\text{ augmentation topology}
&\Longrightarrow I,\\
C_3\text{-invariant Hodge structure}
&\Longrightarrow \Delta|_I=3,\\
\text{constitutive matching}
&\Longrightarrow \Delta d=d^c,\\
\text{up-face flatness}
&\Longrightarrow u+u^c=0,\\
\text{torsion-free kernel}
&\Longrightarrow L_{\rm inc},\\
\text{orientation/saturation datum}
&\Longrightarrow \text{primitive constraint sequence}.
\end{aligned}}
\]

Only the first two arrows are currently intrinsic. The third is the principal new physics question.

## 7. Relation to the original incidence Laplacian

There are now two Laplacians in the selector story:

1. the Furey incidence compression on the three-copy multiplicity space;
2. the color Hodge Laplacian inside each augmentation copy.

The first chooses the matter-sector combination \((1,1,-1)\). The second supplies the coefficient three appearing after cycle closure. A successful Jordan/Furey action may derive both from one quadratic or triple-composition operator.

This suggests a concrete “nested Laplacian” branch rather than a loose analogy:

\[
\text{multiplicity incidence}
\otimes
\text{color Hodge response}.
\]

The tensor product and its physical normalization have not yet been derived.

## 8. Stop-everything and falsification criteria

**Constitutive trigger:** a Furey/Jordan action yields the auxiliary-flux equations \(j=(1-g)d\), \((1-g^{-1})j=d^c\).

**Nested-Laplacian trigger:** one natural quadratic/triple operator restricts simultaneously to the multiplicity matrix of document 871 and the color Laplacian of document 874.

**First-order orientation trigger:** the determinant/Pfaffian line or ribbon order chooses a factor \(1-g\) versus \(1-g^{-1}\) and canonically supplies the saturated half-row.

**RG trigger:** the interacting response preserves the constitutive equation as a Ward identity.

**Negative trigger:** the physical color-sheet metric is not \(C_3\)-invariant or contains additional weights that destroy the scalar Laplacian restriction.

**Falsifier:** treating \(D^\dagger D=3\) as proof that the Standard Model enforces \(D^\dagger Dd=d^c\). The former is representation theory; the latter is dynamics.

## 9. Verdict

The factor three is robust:

\[
\boxed{
\text{unique invariant }A_2\text{ metric}
\Longrightarrow
D^\dagger D=3I.
}
\]

But the programme has not yet earned the matching equation or primitive orientation. The highest-value next move is now explicit: derive the first-order auxiliary flux and its coupling to \(d^c\) from Jordan-triple or Furey response composition.

Document 876 subsequently shows that the incidence sector ratio \(d^c=3d\) already follows from signed three-node multiplicity synchronization and cycle closure. The color-Hodge matching should therefore be pursued as a possible unification of two exact threes, not treated as necessary for the selector itself.

## 10. Dependencies

- [color-Laplacian selector and index-two defect](874_the_c3_color_laplacian_canonically_generates_the_factor_three_selector_but_leaves_an_index_two_orientation_defect.md)
- [ordinary Yukawa-face no-go](873_the_existing_yukawa_faces_do_not_select_the_incidence_copy_and_the_missing_face_must_compare_weak_components_or_carry_winding_three.md)
- [multiplicity-space incidence operator](871_on_the_color_resolved_I3_kernel_the_incidence_selector_is_a_rank_one_multiplicity_operator.md)
- [determinant/Pfaffian orientation boundary](../0400-0499/476_the_wilson_takagi_regulator_fixes_relative_pfaffians_but_leaves_the_absolute_majorana_orientation_free.md)
