# Freudenthal Parallel Branch 04: Ward/UV Covariance and the Contact Obstruction

**Date:** 17 October 2026  
**Status:** exact transformation comparison; conditional contact calibration, not a derived dynamical law  
**Certificate:** [verify_freudenthal_ward_uv_covariance_and_contact_obstruction.mjs](../../../verification/verify/verify_freudenthal_ward_uv_covariance_and_contact_obstruction.mjs)

## Executive result

The Freudenthal critical-null relation

\[
C=\lambda A^{-1}
\]

is covariant under the natural **dual** change of frame

\[
(A,C)\longmapsto
(GAG^T,G^{-T}CG^{-1}).
\]

This action preserves the trace pairing and the paired-face quartic exactly.

It is not the same as applying the programme's response congruence to both matrices,

\[
(A,C)\longmapsto(GAG^T,GCG^T).
\]

The latter preserves inverse matching for every positive pair only when \(G\) is conformal orthogonal. Real contact translations \(C\mapsto C+Q\) generically destroy both quartic nullity and cubic criticality.

Consequently the exceptional bridge is well typed only if the two Freudenthal slots are genuinely a source and its dual response. It cannot be transferred without proof to two covariantly transforming response sectors.

## 1. Why two kinds of frame change appear

Suppose a source vector is relabelled by an invertible ruler \(G\). A quadratic matrix on the source coordinates changes by congruence,

\[
A\mapsto GAG^T.
\]

The object paired with it must change with the inverse ruler if their scalar contraction is to stay fixed:

\[
C\mapsto G^{-T}CG^{-1}.
\]

This is the ordinary distinction between changing a vector and changing a measuring covector. It is also the action selected by the Freudenthal symplectic pairing.

By contrast, documents 214, 641 and 644 use

\[
Z\mapsto GZG^T+Q

\]

for physical response matrices in the same Siegel/absorptive representation. If two matrices are both responses, both receive the same congruence. Calling one of them the dual Freudenthal slot is therefore additional structure, not notation.

## 2. Exact covariance under the dual action

Let

\[
A'=GAG^T,
\qquad
C'=G^{-T}CG^{-1}.
\]

Then

\[
\operatorname{tr}(A'C')=\operatorname{tr}(AC),
\]

and

\[
\det A'\det C'
=(\det G)^2\det A\, (\det G)^{-2}\det C
=\det A\det C.
\]

Therefore

\[
q(A',C')=q(A,C).
\]

Moreover,

\[
C=\lambda A^{-1}
\quad\Longrightarrow\quad
C'=\lambda(A')^{-1}.
\]

The critical-null locus is a genuine invariant under this typed source/dual-response action.

## 3. Same-congruence obstruction

Now transform both matrices by the same response congruence. Starting from \(C=A^{-1}\), preservation up to a positive scalar would require

\[
GA^{-1}G^T
=\mu(GAG^T)^{-1}
=\mu G^{-T}A^{-1}G^{-1}.
\]

Writing \(H=G^TG\), this becomes

\[
HA^{-1}H=\mu A^{-1}.
\]

For this to hold for every positive \(A\), one must have

\[
H=cI,
\qquad c>0.
\]

Thus

\[
\boxed{G^TG=cI}
\]

is the universal preservation condition: \(G\) is a rotation/reflection times an overall scale. A generic \(GL(2,\mathbb R)\) congruence does not preserve the exceptional inverse match when applied to both slots.

This fits the existing UV hierarchy. Fixing a positive UV metric reduces congruence freedom to an orthogonal group, but the relevant orthogonality is metric dependent. An explicit identification of the UV metric with the Freudenthal pairing frame is still required.

## 4. Contact translations

Let the response slot change by a real symmetric contact term,

\[
C\mapsto C+Q.
\]

For fixed positive \(A\), criticality requires

\[
C+Q=\lambda' A^{-1}.
\]

Therefore the only contact shifts that keep that individual inverse ray are

\[
Q=(\lambda'-\lambda)A^{-1}.
\]

For a family with independently varying \(A\), no nonzero fixed \(Q\) can have this form for every member. Hence a universal contact translation generically leaves the critical-null locus.

The exact Ward/UV stabilizer found in document 658 contains only contact translations. Those transformations are consequently not symmetries of the exceptional matching condition, except trivially or on a fine-tuned single ray. If the subtraction scheme is fixed, even those continuous directions disappear.

## 5. Conditional use as a renormalization condition

One may turn the result around. If microscopic physics independently requires Freudenthal criticality, then

\[
C_{\rm ren}=\lambda A^{-1}
\]

would fix the non-inverse part of the contact ambiguity and leave only the scalar \(\lambda\). In that limited sense, the exceptional condition could be used as a contact calibration.

But this is conditional. The current programme has not derived \(\mathcal T=0\) from an action, Ward identity, spectral sum rule or measured boundary condition. Using it to choose counterterms now would be an ansatz.

## 6. Comparison table

| Operation | Paired quartic | Critical inverse ray | Status in programme |
|---|---:|---:|---|
| dual action \((GAG^T,G^{-T}CG^{-1})\) | preserved | preserved | canonical Freudenthal/source-dual action |
| same congruence on both slots | generally changed | only universally for \(G^TG=cI\) | physical response action needs extra typing |
| fixed contact shift \(C\mapsto C+Q\) | generally changed | generally destroyed | Ward/UV residual or scheme freedom |
| symplectic inversion of a response | changes UV growth class | exchanges large/small response scales | spectrum-generating duality, not fixed-theory symmetry |

## 7. Honest conclusion

The exceptional parent gives a coherent invariant home for the determinant, trace pairing and inverse response **provided** the second matrix is truly dual to the first. Ward and UV results do not establish that identification. Indeed, their surviving physical transformations reveal the mismatch.

So the present outcome is neither “nothing” nor “the universe is \(E_8\)”:

- there is a non-arbitrary mathematical bridge;
- it yields a precise critical-null characterization of inverse response;
- it may conditionally calibrate contacts;
- it does not derive the condition dynamically;
- it does not enlarge the physical symmetry of a normalized theory;
- it supplies no reason to identify the parent automorphism group with a spacetime or gauge symmetry.

## Stop conditions

Do not apply the dual Freudenthal covariance to two response matrices unless a source/dual-response map has been constructed. Do not use exceptional criticality to fix counterterms while presenting the result as a prediction unless an independent action or Ward principle forces it.

## Companion documents

- [Freudenthal paired-face quartic](freudenthal_parallel_01_h2r_source_response_quartic.md)
- [Selector uniqueness and embedding degeneracy](freudenthal_parallel_02_selector_uniqueness_and_embedding_degeneracy.md)
- [Symplectic pairing and triple critical locus](freudenthal_parallel_03_symplectic_pairing_and_triple_critical_locus.md)
- [UV-normalized parabolic reduction](../../claims/0200-0299/214_uv_normalization_reduces_sp4_to_siegel_parabolic.md)
- [Ward/UV stabilizer intersection](../../claims/0600-0699/658_the_ward_and_uv_stabilizer_intersection_contains_only_contact_translations.md)
