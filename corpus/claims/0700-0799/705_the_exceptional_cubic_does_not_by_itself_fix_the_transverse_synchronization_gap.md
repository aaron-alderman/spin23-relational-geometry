# The Exceptional Cubic Does Not by Itself Fix the Transverse Synchronization Gap

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B11, B14 and the exceptional-selector branch  
**Claim status:** exact extension-family underdetermination and transverse spectrum  
**Certificate:** [verify_exceptional_cubic_does_not_fix_transverse_synchronization_gap.mjs](../../../verification/verify/verify_exceptional_cubic_does_not_fix_transverse_synchronization_gap.mjs)

## Executive result

The polarized \(H_3(\mathbb O)\) cubic determines the \(H_2(\mathbb O)\) determinant on the Jordan-encoded carrier. It does **not**, by that fact alone, determine a synchronization force on the larger associative CP dilation.

After Haar \(G_2\) averaging, a symmetric ambient response has two independent matrices:

\[
A_{\mathbf1}\in\operatorname{Sym}_2(\mathbb R),
\qquad
A_{\mathbf7}\in\operatorname{Sym}_2(\mathbb R),
\]

acting respectively on the scalar and imaginary octonion sectors. The desired \(H_2(\mathbb R)\) carrier is the diagonal condition

\[
A_{\mathbf1}=A_{\mathbf7}=C.
\]

There is an infinite family of \(G_2\)-invariant extensions

\[
\boxed{
F_\kappa(A_{\mathbf1},A_{\mathbf7})
=
\det\!\left(\frac{A_{\mathbf1}+7A_{\mathbf7}}8\right)
+\frac{\kappa}{2}
\|A_{\mathbf1}-A_{\mathbf7}\|_F^2
}
\]

whose restriction to the synchronized slice is exactly

\[
F_\kappa(C,C)=\det C
\]

for every real \(\kappa\).

The same Jordan determinant is therefore compatible with:

- a stable synchronization gap when \(\kappa>0\);
- a flat transverse sector when \(\kappa=0\);
- or an instability when \(\kappa<0\).

The exceptional cubic can supply the missing selector only if a source-derived construction fixes its off-slice extension. Merely observing that its polarized residue equals the rank-two determinant is insufficient.

## 1. The two surviving response blocks

Document 704 proved that full compact \(G_2\) has the doubled commutant

\[
M_2(\mathbb R)\oplus M_2(\mathbb R).
\]

Restricting to symmetric observables gives

\[
\operatorname{Sym}_2(\mathbb R)
\oplus
\operatorname{Sym}_2(\mathbb R),
\]

of dimension six. Write its elements as

\[
(A_{\mathbf1},A_{\mathbf7}).
\]

The representation dimensions induce the ambient Frobenius metric

\[
\|(A_{\mathbf1},A_{\mathbf7})\|^2
=
\|A_{\mathbf1}\|_F^2
+7\|A_{\mathbf7}\|_F^2.
\]

Introduce the weighted synchronized coordinate and transverse difference

\[
S=\frac{A_{\mathbf1}+7A_{\mathbf7}}8,
\qquad
D=A_{\mathbf1}-A_{\mathbf7}.
\]

Then

\[
A_{\mathbf1}=S+\frac78D,
\qquad
A_{\mathbf7}=S-\frac18D,
\]

and the metric splits orthogonally:

\[
\boxed{
\|A_{\mathbf1}\|_F^2+7\|A_{\mathbf7}\|_F^2
=8\|S\|_F^2+\frac78\|D\|_F^2.
}
\]

The desired carrier is \(D=0\).

## 2. Why the determinant data are boundary data

On the synchronized slice,

\[
S=C,\qquad D=0.
\]

The polarized exceptional cubic gives

\[
\det C.
\]

But knowledge of a function on \(D=0\) does not determine its derivatives transverse to \(D=0\). Every function

\[
F_\kappa(S,D)
=\det S+\frac{\kappa}{2}\|D\|_F^2
\]

has the same restriction to the Jordan slice.

This is not just a generic extension ambiguity. Both \(S\) and \(D\) are built from the two \(G_2\)-isotypic response blocks, and \(\|D\|_F^2\) is \(G_2\)-invariant. Thus \(G_2\) symmetry does not remove the ambiguity.

## 3. Exact transverse spectrum

Using the ambient kinetic metric, a quadratic potential

\[
V_{\rm sync}
=\frac{\kappa}{2}\|D\|_F^2
\]

acts on the three independent components of \(D\in\operatorname{Sym}_2(\mathbb R)\). Since the transverse kinetic coefficient is \(7/8\), all three modes have

\[
\boxed{
m_D^2=\frac{8\kappa}{7}.
}
\]

Therefore:

| \(\kappa\) | transverse behavior | selector consequence |
|---:|---|---|
| \(>0\) | three gapped modes | synchronized carrier is a stable low-energy sector |
| \(=0\) | three flat modes | no selection |
| \(<0\) | three tachyonic modes | synchronized carrier is unstable |

The certificate verifies the weighted orthogonal decomposition, the common determinant restriction and all three spectral cases.

## 4. The circularity trap

One could declare that physical observables are, by definition, in the left-regular Jordan image

\[
\iota(H_2(\mathbb O)).
\]

Then the scalar and imaginary blocks are already tied together and the cubic is well defined. This is a coherent kinematic proposal.

It is not yet a dynamical derivation of that proposal from the full matrix dilation. Extending the cubic away from \(\iota(H_2(\mathbb O))\) requires additional data, and those data are precisely what determine whether deviations from the Jordan image are suppressed.

The prohibited inference is:

\[
\text{cubic agrees with determinant on the Jordan slice}
\quad\Longrightarrow\quad
\text{cubic dynamically selects the Jordan slice}.
\]

The conclusion does not follow without an off-slice action.

## 5. What could fix \(\kappa\)

The ambiguity can be closed only by structure that sees transverse associative directions. Plausible routes are:

1. **Fundamental Jordan observables.**  
   The ambient matrix algebra is only a proof device for complete positivity, not a physical configuration space. Then \(D\) is not a degree of freedom and no gap is required.

2. **A canonical nonassociative-to-associative extension.**  
   A universal enveloping construction, Jordan module or spectral triple might define the action on the entire dilation and fix \(\kappa\).

3. **A source-derived penalty.**  
   Integrating out a massive relational field could produce \(\kappa>0\), with its sign protected by positivity.

4. **A constraint inherited from a larger representation.**  
   The \(H_3(\mathbb O)\) Peirce decomposition might make \(D\neq0\) incompatible with the parent field equations, but this must be calculated on an explicit module rather than asserted from the norm.

## 6. Relation to the existing selector error bound

If \(\kappa>0\) is derived, the transverse gap is

\[
\Delta_{\rm sync}=\sqrt{\frac{8\kappa}{7}}.
\]

It can then enter the programme's existing inverse-gap estimate as another heavy-sector scale. Schematically,

\[
\|\delta\mathcal O\|
\lesssim
\frac{\|V_{\rm mix}\|}{\Delta_{\rm sync}}
+e^{-\gamma t}
+\cdots.
\]

This connection is conditional. Until the sign and normalization of \(\kappa\) are fixed, inserting such a gap would merely rename the missing mechanism.

## 7. Furey compatibility

The transverse coordinate belongs to the response dilation. A synchronization term may be harmless to Furey's matter algebra only if the total space is typed:

\[
\mathcal H_{\rm response}
\otimes
\mathcal H_{\rm matter}.
\]

A penalty applied diagonally to the same octonionic factor that carries the \(SU(3)\)-stabilized complex matter structure risks suppressing the imaginary unit needed for color and charge. The action must show the factorization explicitly.

## 8. Stop-everything criteria

Stop the cubic-synchronizer route if:

- no canonical off-slice extension follows from the parent \(H_3(\mathbb O)\) theory;
- every allowed extension leaves \(\kappa\) arbitrary;
- positivity or radiative stability permits \(\kappa\le0\) without a protecting principle;
- or the only way to obtain \(\kappa>0\) also destroys the Furey matter complex structure.

If this happens, retain the cubic polarization theorem but demote it to a kinematic origin of the carrier norm. Move the selection problem to fundamental Jordan observables or an independently derived relational constraint.

## 9. What changed

Before this calculation, the exceptional cubic was a plausible candidate for the missing synchronization mechanism.

After it:

\[
\boxed{
\text{the cubic fixes the on-slice norm, but the transverse selector remains an independent datum.}
}
\]

This is progress because it prevents the programme from counting the same determinant identity twice—once as kinematics and again, without proof, as dynamics.

## Companion documents

- [Polarizing the rank-three cubic gives the rank-two determinant](701_polarizing_the_rank_three_jordan_cubic_along_the_discarded_face_gives_the_spin23_rank_two_determinant.md)
- [Exceptional cubic polarization and the \(G_2\)-fixed real slice](702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md)
- [Finite \(G_2\)-subgroup CP selector](703_an_eight_element_octonion_automorphism_twirl_is_a_cp_dilation_of_the_h2o_to_h2r_selector.md)
- [Finite-selector fixed algebra and synchronization no-go](704_the_finite_g2_selector_fixed_algebra_is_eight_m2_blocks_and_symmetry_alone_cannot_synchronize_them.md)
- [Two-stage selector error bound](../0600-0699/692_the_full_two_stage_selector_has_a_joint_inverse_gap_and_exponential_time_error_bound.md)
