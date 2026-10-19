# The Inverse-Closed Graded-Real Escape Is the Full Combined Real-Symmetric Algebra

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact graded-algebra, inverse and Schur-closure construction; compatibility with observed flavor CP remains a separate dynamical gate

## 1. Enlarge the selector instead of suppressing the leakage

The simple real-face subspace keeps face-transpose-even matrices

\[
I,\quad\sigma_x,\quad\sigma_z
\]

with arbitrary flavor coefficients. Noncommuting flavor kernels generate the missing face-odd term \(\sigma_y\otimes K_{\rm odd}\) under inversion.

The minimal graded repair pairs transpose parities:

\[
\boxed{
\mathcal A_{\rm gr}
=
(\operatorname{Sym}_2\otimes\operatorname{Sym}_n)
\oplus
(\operatorname{Alt}_2\otimes\operatorname{Alt}_n).}
\]

Here the matrices may be written in a real basis. A face-antisymmetric matrix times a flavor-antisymmetric matrix is symmetric on the combined tensor product.

## 2. The graded algebra is exactly the full real-symmetric combined space

Every real symmetric \(2n\times2n\) block matrix has the form

\[
M=
\begin{pmatrix}
A&B\\
B^T&D
\end{pmatrix},
\qquad A=A^T,\quad D=D^T.
\]

Decompose

\[
B=S+K,
\qquad S^T=S,quad K^T=-K.
\]

Then the diagonal blocks and \(S\) belong to the even--even sector, while \(K\) is represented by an odd--odd tensor. Therefore

\[
\boxed{\mathcal A_{\rm gr}=\operatorname{Sym}_{2n}(\mathbb R).}
\]

For three flavors,

\[
3\times6+1\times3=18+3=21
\]

dimensions, exactly

\[
\dim\operatorname{Sym}_6(\mathbb R)=21.
\]

## 3. Why it is inverse and Schur closed

Real symmetric matrices form a Euclidean Jordan algebra under

\[
A\circ B=\frac12(AB+BA).
\]

If \(M\) is real symmetric and invertible, then \(M^{-1}\) is real symmetric. If \(M\succ0\), its inverse remains positive.

Likewise, the Schur complement of a real symmetric positive block matrix is real symmetric and positive whenever the eliminated pivot is positive:

\[
S=A-YC^{-1}Y^T.
\]

The correlated \(\sigma_y\otimes\tau_y\)-type term that violated factor-local reality is now an allowed odd--odd component. The enlargement solves the algebraic closure problem exactly.

## 4. What is lost

The price is substantial. The carrier is no longer a standalone three-dimensional \(H_2(\mathbb R)\) factor. The full response algebra is

\[
H_{2n}(\mathbb R),
\]

which has dimension \(n(2n+1)\); for \(n=3\), dimension 21.

The desired two-face Jordan carrier survives only as a reduced or distinguished subalgebra. It is not the entire inverse-closed interacting response.

Thus graded closure favors the architecture

\[
\text{large combined real response}
\longrightarrow
\text{reduced external }H_2(\mathbb R),
\]

not exact tensor factorization at every intermediate stage.

## 5. Why the external partial trace can remain real

Every real antisymmetric flavor matrix has zero trace. Therefore the odd--odd sector disappears under an unweighted flavor partial trace:

\[
\operatorname{Tr}_{\rm flavor}
(J_{\rm face}\otimes K_{\rm flavor})
=J_{\rm face}\operatorname{Tr}K_{\rm flavor}=0.
\]

The reduced face response is real and therefore lies in \(H_2(\mathbb R)\) even though the full sewn operator explores the graded 21-dimensional algebra. This statement alone does not prove that the image spans all three carrier directions. If the parent is also required to commute with the realification complex structure \(J\), every positive flavor-state reduction collapses to the scalar ray; see [the shared-index complex-structure obstruction](294_exact_flavor_complex_structure_collapses_the_shared_face_reduction_to_a_scalar.md).

This supplies a controlled sense in which complex/antisymmetric flavor information is hidden internally while the external carrier remains real.

Weighted flavor reductions need not kill the odd sector. If the weight fails to commute with \(K\), the leakage can reappear as a CP-sensitive face observable.

## 6. CP question

Algebraic closure does not settle physical CP.

If the graded reality is imposed as one universal antiunitary symmetry of the complete action and all physical probes are real, it risks making all observable flavor invariants CP even.

Alternatively, CP-odd information may reside in the odd--odd correlations and become visible only through graded or face-conditioned probes. Then the total matrix can be real while the subsystem description uses complex flavor amplitudes.

The decisive calculation is not whether \(\sigma_y\otimes\tau_y\) is allowed. It is whether a basis-invariant Standard-Model CP-odd observable remains nonzero in the complete graded response theory.

## 7. Relation to the complex parent carrier

There are now two exact inverse-closed parents:

1. the complex Hermitian carrier \(H_2(\mathbb C)\) with separate flavor structure;
2. the combined real-symmetric algebra \(H_{2n}(\mathbb R)\) with odd--odd correlations.

They solve different problems. The complex parent preserves face phases directly. The graded-real parent trades them for correlated real antisymmetric structures in the combined space.

Choosing between them requires gauge action, CP observables, locality and spectral normalization—not algebraic closure alone.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the full interacting Furey/Standard-Model response closes on the graded real algebra, its physical reduction is exactly \(H_2(\mathbb R)\), and a nonzero basis-invariant flavor CP observable survives.

**Observable trigger:** a weighted flavor probe exposes the odd--odd sector as a calculable CP-sensitive face response.

**Reduction trigger:** Ward or boundary conditions canonically select the unweighted partial trace that removes all odd--odd leakage externally.

**CP falsifier:** every complete graded-real model forces all Jarlskog-type invariants to vanish.

**Carrier falsifier:** the 21-dimensional parent introduces unphysical response modes with no gap, quotient or source interpretation.

## 9. Certificate

The [graded-real face/flavor algebra certificate](scripts/verify_graded_real_face_flavor_algebra.mjs) verifies the even--even/odd--odd dimension decomposition, Jordan closure, inverse closure, Schur closure and disappearance of odd--odd terms under unweighted flavor trace.

## Companion documents

- [Flavor-noncommutative Schur leakage](288_noncommuting_flavor_kernels_can_break_real_face_closure_under_schur_inversion.md)
- [Real two-face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Full combined response dimension trap](72_furey_track_intertwiner_dimension_trap.md)
- [Twisted \(H_2(\mathbb C)\) parent](219_twisted_helicity_carrier_glues_as_h2c_spin24_before_spin23_reduction.md)
