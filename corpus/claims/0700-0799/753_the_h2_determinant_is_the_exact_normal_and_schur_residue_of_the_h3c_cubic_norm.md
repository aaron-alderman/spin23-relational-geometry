# The \(H_2\) Determinant Is the Exact Normal and Schur Residue of the \(H_3(\mathbb C)\) Cubic Norm

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B09, B10, B11, B12, B13, B14 and the cubic-residue branch  
**Claim status:** exact block-determinant theorem and executable complex-Hermitian certificate; anomaly/logical-phase interpretation remains open  
**Certificate:** [verify_h3c_cubic_determinant_descends_to_h2c_schur_determinant_residue.mjs](../../../verification/verify/verify_h3c_cubic_determinant_descends_to_h2c_schur_determinant_residue.mjs)

## Executive result

The exceptional-style intuition that a cubic consistency law can leave a lower-rank residue has an exact ordinary-Jordan realization.

Let

\[
X=
\begin{pmatrix}
A&w\\
w^\dagger&c
\end{pmatrix}
\in H_3(\mathbb C),
\qquad
A\in H_2(\mathbb C).
\]

Then

\[
\boxed{
\det X
=c\det A-w^\dagger\operatorname{adj}(A)w.
}
\]

For \(c\neq0\), this is equivalently

\[
\boxed{
\det X
=c\det\left(A-\frac{ww^\dagger}{c}\right).
}
\]

The cubic norm is the heavy-face scale times the quadratic determinant of the exact Schur-complement carrier.

## 1. Normal derivative on the rank-two face

On the Peirce face

\[
w=0,
\qquad c=0,
\]

the cubic determinant vanishes identically because every matrix has rank at most two.

But its outward normal derivative is

\[
\boxed{
\left.\frac{\partial}{\partial c}\det
\begin{pmatrix}A&0\\0&c\end{pmatrix}
\right|_{c=0}
=\det A.
}
\]

Thus the \(H_2\) quadratic norm is the first nonzero normal residue of the \(H_3\) cubic at the selected boundary face.

After the conjugation-fixed real slice,

\[
A\in H_2(\mathbb R),
\]

this is exactly the \((1,2)\) Lorentz determinant underlying the \(Spin_0(2,3)\) Jordan carrier.

## 2. Heavy-face Schur residue

For a large positive third-face scale \(c=\Delta\), bounded coupling gives

\[
\frac{\det X}{\Delta}
=\det\left(A-\frac{ww^\dagger}{\Delta}\right)
\longrightarrow
\det A.
\]

This is stronger than an asymptotic analogy: the normalized cubic is exactly the determinant of the Feshbach/Schur effective two-face matrix at finite \(\Delta\).

The coupling correction is

\[
-w^\dagger\operatorname{adj}(A)w.
\]

It records virtual excursions through the eliminated face and supplies the finite-gap deformation of the quadratic residue.

## 3. Tangential and transverse orders

At \(c=0\), a small Peirce-half coupling \(w=\varepsilon u\) contributes

\[
\det X
=-\varepsilon^2u^\dagger\operatorname{adj}(A)u.
\]

Therefore:

- the third-face population enters at first normal order;
- Peirce-half links enter at second order;
- tangential motion within the rank-two face leaves the cubic zero until a normal direction is supplied.

This order structure is useful for effective-field-theory power counting around the selected face.

## 4. Relation to the Prakash–Ramya cubic residue

Prakash and Ramya show that puncturing one coordinate of an anomaly-free cubic lattice leaves a protected logical cubic contribution. The present determinant identity is structurally adjacent:

\[
\text{rank-three cubic norm}
\longrightarrow
\text{rank-two quadratic normal residue}.
\]

But the outputs are not the same type:

- the code residue is an oriented, finite-field/integral cubic phase;
- the Jordan residue here is a real or complex quadratic determinant obtained by differentiation or normalization.

An additional quantized boundary, anomaly or cocycle construction would be required to turn the determinant residue into a logical phase.

## 5. Relation to “the cubic keeps local consistency”

The cubic norm does impose compatibility between the retained carrier, the heavy-face population and the linking amplitudes:

\[
\det X
=c\det A-w^\dagger\operatorname{adj}(A)w.
\]

It does not merely preserve \(\det A\); it corrects it by the exact relational coupling to the eliminated direction. Positivity further requires the Schur complement to remain positive when \(c>0\).

This gives a precise version of local consistency under nesting: the effective quadratic norm is the normalized cubic after the eliminated face and its links are accounted for.

## 6. Exceptional continuation boundary

The same block intuition motivates studying \(H_3(\mathbb O)\), but nonassociativity changes the bookkeeping and the exceptional determinant must be handled through its Jordan definition.

The verified complex-Hermitian identity does not prove that an octonionic Peirce reduction leaves the same physical residue, nor that Furey particle ideals populate the exceptional matrix entries. Those are separate calculations.

## 7. Stop-everything criteria

Stop saying the cubic norm remains nonzero on the rank-two Peirce face; it vanishes there.

Stop calling \(\det A\) a surviving cubic without specifying normal differentiation or division by the heavy-face scale.

Stop identifying the quadratic determinant residue with an anomaly or logical cubic phase without an oriented quantized map.

Stop ignoring the finite-gap correction \(w^\dagger\operatorname{adj}(A)w\).

Stop extending the associative block formula to octonions without verifying the exceptional Jordan determinant identity.

## 8. Highest-value next calculations

1. Derive the corresponding Peirce expansion of the exceptional \(H_3(\mathbb O)\) cubic norm.
2. Test whether the discarded cubic contribution defines a boundary cocycle under the doubled selector.
3. Relate the finite-gap correction to measurable spectral shifts.
4. Determine whether the code puncture variable can supply the normal coordinate \(c\) or its conjugate response.
5. Propagate cubic-residue errors through the finite selector budget of document 752.

## Companion documents

- [Dynamic H3(C) carrier fork](751_adjoining_the_majorana_breaking_channel_creates_an_h3c_carrier_fork_and_spin23_returns_only_after_two_independent_selectors.md)
- [Finite selector error budget](752_the_two_stage_majorana_selector_has_an_additive_finite_gap_coherence_and_exchange_error_budget.md)
- [Prakash–Ramya current-frontier synthesis](../0600-0699/689_prakash_ramya_at_the_current_frontier_two_doublings_one_cubic_residue_and_the_missing_intertwiner.md)
- [Heavy third-face decoupling](../0600-0699/685_a_heavy_third_face_dynamically_selects_the_rank_two_peirce_corner_but_not_its_real_slice.md)
