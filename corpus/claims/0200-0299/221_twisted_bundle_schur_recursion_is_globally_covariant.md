# Schur--Jordan Recursion Is Globally Covariant in the Twisted \(H_2(\mathbb C)\) Bundle

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09 and B11  
**Claim status:** exact bundle-covariance theorem for invertible positive/passive interior blocks; real-domain closure requires selector-compatible portals

## 1. Global recursion question

The opposite-helicity carrier has no global fixed \(H_2(\mathbb R)\) coordinate system, but it does form a global \(H_2(\mathbb C)\) Jordan bundle. Does interior elimination depend on the chosen polarization patch?

It does not. Schur elimination is covariant under the bundle transition functions.

## 2. Boundary and interior bundles

Let \(E\) be the boundary face bundle and \(F\) an interior bundle. In one local trivialization write a Hermitian response as

\[
K=
\begin{pmatrix}
A&B\\
B^\dagger&D
\end{pmatrix}.
\]

On a patch overlap, let the frames change by unitary maps \(U\) on \(E\) and \(V\) on \(F\). Then

\[
A'=UAU^\dagger,
\qquad
B'=UBV^\dagger,
\qquad
D'=VDV^\dagger.
\]

## 3. Exact Schur covariance

Because

\[
(VDV^\dagger)^{-1}=VD^{-1}V^\dagger,
\]

the effective boundary response obeys

\[
\begin{aligned}
S'
&=A'-B'(D')^{-1}(B')^\dagger\\
&=U(A-BD^{-1}B^\dagger)U^\dagger\\
&=USU^\dagger.
\end{aligned}
\]

Therefore local Schur complements glue into a global section of \(\operatorname{Herm}(E)\). Positivity, determinant and the Jordan triple operations are preserved on overlaps.

The same argument applies to analytic Herglotz blocks and, on constant-rank Ward patches, to support inverses/pseudoinverses whose projectors transform covariantly.

## 4. Recursive elimination

Successive interior eliminations are associative wherever the pivots exist. Since every step is equivariant, the entire recursive tree is independent of local helicity frames:

\[
\text{twisted parent response}
\longrightarrow
\text{global twisted Schur response}
\longrightarrow
\text{global Jordan invariants}.
\]

Thus global topology does not obstruct recursion itself. It obstructs only the additional reduction to one everywhere-real relationship coordinate.

## 5. Local real selectors and portal compatibility

On a defect-free domain, a selector chooses real structures \(J_E\) and \(J_F\). The Schur complement remains in the selected real form only if

\[
J_E A=A J_E,
\qquad
J_E B=B J_F,
\qquad
J_F D=D J_F.
\]

The middle condition is the portal version of real-structure compatibility. A generic complex \(B\) reintroduces the missing phase even when \(A\) and \(D\) are locally real.

Around a selector defect, the real structures have nontrivial winding. The complex Schur response returns covariantly, but a single real-coordinate description cannot be continued through the loop without its transition data.

## 6. Consequence for Jordan-triple recursion

The central implication is strengthened:

\[
\text{Jordan-triple recursion}
\Longrightarrow
\text{a global twisted }H_2(\mathbb C)\text{ response bundle}
\]

under helicity patching. The further implication

\[
\Longrightarrow H_2(\mathbb R)
\Longrightarrow Sp(4,\mathbb R)\cong Spin_0(2,3)
\]

requires a selector-compatible portal and either defect data or Chern cancellation.

This separates the unconditional composition theorem from the conditional real-form descent.

## 7. Stop-everything and falsification gates

**Global recursion success:** a microscopic stress/interior kernel transforms as the block-bundle law above and its direct elimination matches the patchwise sewn result.

**Real-portal success:** a Furey/external intertwiner obeys \(J_EB=BJ_F\) on every selector domain and has the required transition at defects.

**Falsifier:** local Schur results in different helicity gauges are compared as raw matrices rather than conjugate bundle representatives.

**Defect signal:** real-domain recursion acquires monodromy while trace and determinant remain single-valued.

**Parent-theory gate:** determine whether the action is naturally formulated on the twisted complex bundle, with the real carrier appearing only in selected phases.

## 8. Certificate

The [twisted Schur covariance certificate](../../../verification/verify/verify_twisted_bundle_schur_covariance.mjs) verifies the block transition law, exact covariance of the Schur complement, positivity and invariance of trace and determinant.

## Companion documents

- [Twisted H2(C) parent carrier](219_twisted_helicity_carrier_glues_as_h2c_spin24_before_spin23_reduction.md)
- [Degree-eight real selector](220_degree_eight_selector_gives_eight_local_spin23_defects.md)
- [Peirce--Schur recursion](202_peirce_schur_triple_recursion_to_spin23.md)
- [KMS--Herglotz sewing](213_fixed_temperature_kms_herglotz_schur_sewing.md)
