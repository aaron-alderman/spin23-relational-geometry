# Oriented Color \(C_3\) Gives a Two-Area Symplectic Family, and Color Reflection Becomes Anti-Symplectic Only When Paired with Weak Exchange

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B09, B10, B11, B12, B13, B14 and the oriented-color/signed-symplectic branch  
**Claim status:** exact integral-form and finite signed-covariance theorem with executable certificate; physical origin and area-ratio selection remain open  
**Certificate:** [verify_oriented_color_c3_two_area_symplectic_family_and_signed_s3_extension.mjs](../../../verification/verify/verify_oriented_color_c3_two_area_symplectic_family_and_signed_s3_extension.mjs)

## Executive result

The closest viable symmetry reduction found in document 758 can now be written explicitly.

Use the integral basis

\[
b_i=e_i-e_5,
\qquad i=1,\ldots,4,
\]

of the sum-zero standard \(S_5\) module. Let the oriented color cycle be

\[
r=(123).
\]

Its invariant alternating forms are spanned by

\[
J_c=
\begin{pmatrix}
0&1&-1&0\\
-1&0&1&0\\
1&-1&0&0\\
0&0&0&0
\end{pmatrix},
\qquad
J_f=
\begin{pmatrix}
0&0&0&1\\
0&0&0&1\\
0&0&0&1\\
-1&-1&-1&0
\end{pmatrix}.
\]

Here \(J_c\) is the oriented area on the color-difference plane, while \(J_f\) pairs the color-symmetric direction with the remaining weak direction. Every invariant form is

\[
J(a,b)=aJ_c+bJ_f,
\]

and

\[
\boxed{\operatorname{Pf}J(a,b)=3ab.}
\]

Thus \(J(a,b)\) is symplectic exactly when both plane areas are present.

A bare color transposition flips \(J_c\) but fixes \(J_f\), so it is neither symplectic nor anti-symplectic for generic \(a,b\). Pair it with the weak-coordinate swap:

\[
s=(12)(45).
\]

Then

\[
s^*J_c=-J_c,
\qquad
s^*J_f=-J_f,
\]

and hence

\[
\boxed{s^*J(a,b)=-J(a,b).}
\]

The order-six group \(\langle r,s\rangle\) has three symplectic rotations and three anti-symplectic reflections. This gives a precise realization of a “one carrier, two faces, three relationships” pattern: a four-carrier with two invariant plane areas and a three-cycle, extended by a face-exchanging reflection.

## 1. The two invariant planes

Under the color cycle \((123)\), the standard four-module splits over \(\mathbb R\) as

\[
V_4=C\oplus F,
\]

where:

- \(C\) is the two-dimensional nontrivial color rotation plane;
- \(F\) is the two-dimensional fixed plane spanned by the color-symmetric coordinate and the remaining weak coordinate.

Each plane has an invariant oriented area. They are independent, which explains

\[
\dim(\Lambda^2V_4^*)^{C_3}=2.
\]

The total form is nondegenerate only when neither plane is left unpaired.

## 2. The relative-area modulus

Overall scaling of a symplectic form does not change its symplectic group, so the continuous ambiguity is the projective ratio

\[
\rho=\frac ba\in\mathbb R^\times.
\]

The cyclic symmetry permits every nonzero \(\rho\). It does not select \(\rho=1\), \(-1\), \(3\), or any other value.

This is the finite-group version of the programme's recurring sewing ambiguity: the two local relational planes exist, but their relative normalization is additional data.

## 3. Why an unpaired color reflection fails

Let

\[
t=(12).
\]

Then

\[
t^*J(a,b)=-aJ_c+bJ_f.
\]

For \(ab\ne0\), this is neither \(J(a,b)\) nor \(-J(a,b)\). Therefore an ordinary color reflection does not normalize a chosen generic symplectic structure even up to sign.

This explains the failure of full color \(S_3\): its reflections reverse only one of the two required plane orientations.

## 4. Weak exchange repairs the signed covariance

The weak-coordinate swap \((45)\) reverses the complementary plane orientation. Combining it with the color reflection gives the double transposition

\[
s=(12)(45),
\]

which reverses both areas. The generated group obeys the dihedral presentation

\[
r^3=s^2=1,
\qquad
srs=r^{-1}.
\]

Its action has a sign character

\[
g^*J=\chi(g)J,
\qquad
\chi(g)=
\begin{cases}
+1,&g\in C_3,\\
-1,&g\in sC_3.
\end{cases}
\]

So the carrier has an exact signed symplectic covariance:

\[
\langle r,s\rangle
\subset
Sp^{\pm}(V_4,J).
\]

## 5. Passage to the \((2,3)\) module

An anti-symplectic map in four dimensions satisfies

\[
g^*J=-J.
\]

It still preserves the primitive subspace

\[
\Lambda^2_0V^*=J^\perp,
\]

because the line \(\mathbb RJ\) is preserved. Moreover

\[
(g^*\alpha)\wedge(g^*\beta)
=g^*(\alpha\wedge\beta)
\]

and \(\det g=(-1)^2=1\), so the wedge pairing on primitive forms is preserved.

Therefore the signed order-six covariance descends to an orthogonal action on the five-dimensional \((2,3)\) module. The rotations lie in the connected symplectic route; the reflections supply a discrete component outside \(Sp(4,\mathbb R)\) while normalizing its geometry.

This is a mathematically credible home for a face-exchange parity without forcing it into the connected \(Spin_0(2,3)\) group.

## 6. Relation to Furey and octonion orientation

The color three-cycle is structurally compatible with the cyclic orientation of a Fano line. The paired reflection is also suggestive: reversing the color orientation alone is insufficient, but reversing it together with the weak face restores a uniform sign on the carrier form.

This is not yet a Furey-derived theorem. The missing intertwiner must show:

1. which Fano line maps to the three color oscillator coordinates;
2. that Furey conjugation or weak exchange implements the paired transposition;
3. that the same construction selects the ratio \(b/a\);
4. that the action is compatible with the Higgs-selected crossed modules rather than only their coordinate labels.

## 7. Integral normalization

The displayed forms are integral and

\[
\det J(a,b)=9a^2b^2.
\]

For integral \(a,b\), the determinant is divisible by nine whenever the form is nondegenerate. Hence this natural invariant lattice form is not unimodular.

Allowing the normalized fixed-plane form \(J_f/3\) gives Pfaffian \(ab\), but introduces thirds in the original \(b_i\) lattice. This isolates an integral-index issue: the canonical symplectic lattice may require an overlattice containing the color-average direction divided by three.

That index-three feature is potentially relevant to color triality and qutrit code data, but no identification is yet proved.

## 8. Stop-everything and falsification criteria

Stop using a bare color transposition as parity on a generic selected carrier; it is neither symplectic nor anti-symplectic.

Stop claiming the order-six group lies in \(Sp(4,\mathbb R)\); half of it is anti-symplectic.

Stop treating \(C_3\) invariance as a unique carrier selection; the ratio \(b/a\) remains free.

Stop calling the integral form unimodular on the original sum-zero lattice; its determinant is divisible by nine.

Reopen a fully canonical route if Furey/Higgs data simultaneously provide the paired reflection, the area ratio and the required index-three lattice refinement.

## 9. Highest-value continuations

1. Construct the index-three overlattice on which the normalized \(C_3\)-invariant form is unimodular.
2. Compare that overlattice with ternary logical and color-triality data in the Prakash–Ramya code.
3. Compute the induced five-dimensional matrices of the signed order-six group and locate their connected components in \(O(2,3)\).
4. Test whether Furey conjugation realizes \((12)(45)\) on the five oscillator coordinates.
5. Search for a response-kernel or logical-commutator condition fixing \(b/a\).

## Reproducibility

    node verification/verify/verify_oriented_color_c3_two_area_symplectic_family_and_signed_s3_extension.mjs

## Companion documents

- [Higgs crossed-partition stabilizer theorem](758_the_higgs_crossed_octonion_partition_reduces_s5_to_s4_or_physical_s3_but_still_does_not_select_a_symplectic_four_carrier.md)
- [Exhaustive S5 subgroup classification](757_only_four_subgroup_types_of_s5_make_the_standard_four_module_symplectic_and_the_color_weak_stabilizer_is_not_one.md)
- [Primitive two-form Spin(2,3) construction](745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)
- [Prakash–Ramya source re-entry](755_arxiv_2610_21879v1_reentry_audit_and_current_frontier_map.md)
