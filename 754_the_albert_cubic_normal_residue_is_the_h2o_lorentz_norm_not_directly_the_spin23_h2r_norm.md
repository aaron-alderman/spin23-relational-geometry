# The Albert Cubic Normal Residue Is the \(H_2(\mathbb O)\) Lorentz Norm, Not Directly the \(Spin(2,3)\) \(H_2(\mathbb R)\) Norm

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B09, B10, B11, B12, B13, B14 and the exceptional cubic-residue branch  
**Claim status:** independent executable re-derivation of the theorem already established in document 702; the kinematic selector exists by documents 703 and 706, while its microscopic physical origin remains open  
**Certificate:** [verify_albert_cubic_peirce_normal_residue_is_h2o_not_h2r.mjs](scripts/verify_albert_cubic_peirce_normal_residue_is_h2o_not_h2r.mjs)

## Executive result

The cubic-to-quadratic residue mechanism survives in the exceptional Jordan algebra, but it first lands on a much larger Lorentz cone.

Write an Albert-algebra element as

\[
X=
\begin{pmatrix}
\alpha&\bar z&\bar y\\
z&\beta&x\\
y&\bar x&\gamma
\end{pmatrix}
\in H_3(\mathbb O).
\]

Its cubic norm is

\[
N(X)
=\alpha\beta\gamma
+2\operatorname{Re}((xy)z)
-\alpha|x|^2
-\beta|y|^2
-\gamma|z|^2.
\]

On the rank-two Peirce face \(x=y=\gamma=0\), the cubic vanishes. Its outward normal derivative is

\[
\boxed{
\left.\frac{\partial N}{\partial\gamma}\right|_{x=y=\gamma=0}
=\alpha\beta-|z|^2
=\det
\begin{pmatrix}
\alpha&\bar z\\
z&\beta
\end{pmatrix}.
}
\]

This is the determinant of \(H_2(\mathbb O)\), with quadratic signature \((1,9)\), not the \((1,2)\) determinant of \(H_2(\mathbb R)\).

This is not a new algebraic branch relative to document 702. It is an independent certificate, written in the coordinate convention used by the immediately preceding \(H_3(\mathbb C)\) Schur-residue calculation. Agreement between the two scripts is a useful cross-check; novelty should not be claimed twice.

## 1. Exact finite-third-face expansion

For \(\gamma\neq0\), divide the cubic by the third-face coordinate:

\[
\boxed{
\frac{N(X)}{\gamma}
=\alpha\beta-|z|^2
+\frac{2\operatorname{Re}((xy)z)-\alpha|x|^2-\beta|y|^2}{\gamma}.
}
\]

The first term is the rank-two octonionic Lorentz norm. The remaining term is the exact finite-face correction from the two Peirce-half links.

Unlike the associative matrix case, this expression should not be casually rewritten as the determinant of an arbitrary octonionic Schur complement. The Albert determinant and Jordan operations are the safe definitions.

## 2. Why nonassociativity does not spoil the cubic

Although octonion multiplication is nonassociative,

\[
\operatorname{Re}((xy)z)
=\operatorname{Re}(x(yz)).
\]

The associator is purely imaginary, so the real triple product entering the determinant is well defined. The certificate verifies this and octonion norm multiplicativity on explicit nonassociative samples.

## 3. Signature of the residue

Write

\[
\alpha=t+s,
\qquad
\beta=t-s.
\]

Then

\[
\alpha\beta-|z|^2
=t^2-s^2-|z|^2.
\]

Since \(z\in\mathbb O\) has eight real coordinates, the residue has signature

\[
\boxed{(1,9).}
\]

Thus exceptional Peirce descent naturally produces a ten-dimensional spin-factor geometry. It does not single out the three-dimensional \(Spin(2,3)\) carrier.

## 4. The further real restriction

Restricting

\[
z\in\mathbb R\cdot1\subset\mathbb O
\]

gives

\[
\alpha\beta-z^2,
\]

the \(H_2(\mathbb R)\) determinant. The certificate also verifies that the full Albert determinant reduces to the ordinary real symmetric \(3\times3\) determinant when \(x,y,z\) are real scalars.

The scalar line is algebraically canonical as the center fixed by every octonion automorphism. But restricting physical off-diagonal observables to that line is a strong selector: it removes seven imaginary-octonion directions.

## 5. Relation to Furey

Furey's particle construction uses complexified octonions and a chosen complex/octonionic polarization. That structure does not automatically force the Albert off-diagonal entry \(z\) to be real.

The corpus has already tested the principal selector candidates:

- a finite \((\mathbb Z_2)^3\subset G_2\) Reynolds average selects the real Jordan entry and admits a CP dilation (document 703);
- its full associative fixed range is too large, and full Haar \(G_2\) still leaves two independent multiplicity responses (document 704);
- a Clifford-multiplicity conditional expectation has exactly \(H_2(\mathbb R)\) as its symmetric fixed range (document 706);
- conjugation plus topology exchange;
- a mass gap for imaginary-octonion response directions;
- or a boundary observable algebra that sees only the scalar component.

Thus existence of an exact positive kinematic selector is solved. What remains open is why the physical dynamics chooses that typed Clifford expectation, or equivalently why the Jordan-encoded response sector is fundamental. Applying a full \(G_2\) selector to the wrong factor can still erase Standard-Model representation data. Typing remains essential.

## 6. Relation to the “God is a mathematician” ladder

The exceptional cubic does contain the lower quadratic norms as boundary derivatives:

\[
H_3(\mathbb O)\text{ cubic}
\xrightarrow{\text{Peirce normal derivative}}
H_2(\mathbb O)\text{ quadratic}
\xrightarrow{z\in\mathbb R}
H_2(\mathbb R)\text{ quadratic}.
\]

This is a genuine nested consistency law. It also shows why seeing the larger structure makes selection harder: the exceptional cubic naturally retains many more transverse directions than the desired middle carrier.

## 7. Stop-everything criteria

Stop claiming the Albert cubic directly selects \(Spin(2,3)\); its rank-two normal residue is \((1,9)\), not \((1,2)\).

Stop applying associative Schur-complement formulas to arbitrary octonionic blocks without a Jordan-algebra proof.

Stop restricting \(z\) to a real scalar without stating whether the operation is the Jordan Reynolds selector of document 703 or the exact ambient Clifford expectation of document 706, and without identifying its factor typing.

Stop using Furey's octonions as evidence that all imaginary octonion response directions are absent.

Stop a \(G_2\)-averaging proposal if it also erases the Standard-Model representation data carried by the same factor.

## 8. Highest-value next calculations

1. Derive the Clifford-multiplicity expectation of document 706 from an explicit source or action rather than install it kinematically.
2. Determine whether Furey's selected complex direction reduces \(H_2(\mathbb O)\) first to \(H_2(\mathbb C)\), and type that action separately from the external response selector.
3. Compute the actual transverse Hessian of a declared Albert action, rather than infer a gap from the cubic norm alone; document 705 proves that the on-slice determinant does not determine it.
4. Test whether topology exchange commutes with the Clifford selector and can remove a remaining complex direction without mirror matter.
5. Compare the exceptional normal residue with the Prakash–Ramya cubic puncture without identifying their types.

## Companion documents

- [Associative H3(C) cubic residue](753_the_h2_determinant_is_the_exact_normal_and_schur_residue_of_the_h3c_cubic_norm.md)
- [Earlier exceptional polarization theorem](702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md)
- [Finite G2-subgroup Jordan selector and CP dilation](703_an_eight_element_octonion_automorphism_twirl_is_a_cp_dilation_of_the_h2o_to_h2r_selector.md)
- [G2 fixed-range and synchronization no-go](704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md)
- [Exceptional cubic transverse-gap underdetermination](705_the_exceptional_cubic_does_not_by_itself_fix_the_transverse_synchronization_gap.md)
- [Exact Clifford-multiplicity conditional expectation](706_a_clifford_multiplicity_conditional_expectation_exactly_selects_h2r_without_the_g2_fixed_range_excess.md)
- [Dynamic Majorana H3(C) carrier fork](751_adjoining_the_majorana_breaking_channel_creates_an_h3c_carrier_fork_and_spin23_returns_only_after_two_independent_selectors.md)
- [Furey stabilizer and response-line degeneracy](709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md)
