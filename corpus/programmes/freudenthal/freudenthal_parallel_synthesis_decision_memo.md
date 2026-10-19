# Freudenthal Parallel Investigation: Decision Memo

**Date:** 17 October 2026  
**Decision:** retain as a typed structural bridge and obstruction result; do not promote it to a physical \(E_7\) or \(E_8\) symmetry claim  
**Scope:** \(F(H_3(\mathbb O))\) restricted through \(H_2(\mathbb O)\) to the programme's \(H_2(\mathbb R)\) source--response carrier

## Bottom line

The Freudenthal extension adds something real but limited.

It unifies three structures already present in the programme:

\[
\text{determinant}
+\text{source--response trace pairing}
+\text{inverse matching}
\]

inside one symplectic/quartic geometry. On the positive \(H_2(\mathbb R)\) carrier, the response relation

\[
C=\lambda A^{-1}
\]

is exactly the critical null locus of the restricted Freudenthal quartic. That is the strongest charitable result: inverse response is not an arbitrary formula pasted into an exceptional algebra; it is a distinguished locus of the parent invariant.

The same calculation also gives the limiting result. Freudenthal geometry does not choose the physical \(H_2(\mathbb R)\) face, does not remove the final Furey-compatible axis ambiguity, does not identify the programme's flux-orientation bit, and does not survive generic physical contact shifts. No action currently forces the critical-locus condition. The result is therefore a structural bridge, not yet a prediction.

## Exact findings

### 1. A bare rank-two face is quartically invisible

Embedding only one \(H_2\) matrix in one Jordan slot gives

\[
q(0,0,\iota(A),0)=0.
\]

Adding the discarded transverse unit recovers the face determinant,

\[
q(1,0,\iota(A)+e_3,0)=-8\det A,
\]

but that lift is additional data.

### 2. Paired source and response produce a discriminant

For source \(A\) and dual response \(C\),

\[
q(A,C)
=-2\left[(\operatorname{tr}AC)^2-4\det A\det C\right].
\]

For \(A,C>0\), this is

\[
-2(\mu_1-\mu_2)^2\le0,
\]

where \(\mu_i\) are the eigenvalues of \(AC\). Hence

\[
q=0\iff C=\lambda A^{-1}.
\]

### 3. The triple product makes the same locus critical

With the normalization

\[
\Omega(\mathcal T(x),\delta x)=\frac14dq_x(\delta x),
\]

the restricted cubic map is

\[
\mathcal T(A,C)=
\left(
-sA+2\det(A)C^\#,
sC-2\det(C)A^\#
\right),
\quad s=\operatorname{tr}(AC).
\]

On the positive cone,

\[
\mathcal T=0\iff q=0\iff C=\lambda A^{-1}.
\]

This supplies a canonical invariant description, although not an additional numerical equation.

### 4. The real-slice selector is relative, not absolute

Relative to a declared conditional expectation \(H_2(\mathbb O)\to H_2(\mathbb R)\), independent positive diagonal probes force discarded imaginary link components to vanish if the quartic is to be preserved.

But every unit octonionic line defines an isomorphic \(H_2(\mathbb R)\) face with the same restricted invariant. The raw embedding degeneracy

\[
\mathbb{RP}^7
\]

survives. The quartic measures relative angles between chosen lines; it supplies no absolute compass direction.

### 5. The symplectic form remembers slot order, not the physical orientation torsor

The restricted pairing is

\[
\Omega(S(A),R(C))=\operatorname{tr}(AC),
\]

and changes sign when source and response slots are exchanged. This is genuine oriented information.

The programme's remaining \(\mathbb Z_2\) ambiguity reverses a channel-to-flux assignment without exchanging source and response roles. No intertwiner between these operations has been derived. The two signs must remain distinct.

### 6. Ward/UV transformations expose a typing boundary

The critical-null locus is invariant under the natural dual action

\[
(A,C)\mapsto(GAG^T,G^{-T}CG^{-1}).
\]

It is not invariant under applying the same generic congruence to both matrices. Universal preservation under same congruence requires

\[
G^TG=cI.
\]

Generic contact shifts also destroy the locus. Thus the exceptional bridge applies naturally to a source and its dual response, not automatically to two response sectors transforming in parallel.

## Claim ladder

| Level | Claim | Verdict |
|---|---|---|
| exact mathematics | the restricted quartic is the characteristic discriminant | established |
| exact mathematics | inverse-matched positive pairs are critical and null | established |
| exact mathematics | factorwise preservation forces the selected slice relative to a projection | established |
| structural interpretation | Freudenthal geometry is a non-arbitrary parent for source/dual-response inversion | supported |
| conditional physics | criticality may calibrate contact terms if an action requires it | open |
| physical selection | the exceptional invariant chooses the Standard-Model face | false with current data |
| orientation | the Freudenthal symplectic sign selects the flux torsor | unsupported |
| symmetry | \(E_7\) is a symmetry of the normalized response theory | unsupported and generically incompatible with fixed Ward/UV data |
| cosmology | the universe is fundamentally \(E_8\) | neither established nor tested by this branch |

## Programme decision

Retain the Freudenthal branch in the main research map under the label:

> **Exceptional invariant completion of the source--dual-response carrier.**

Use it for:

- classifying the inverse-matched locus;
- checking whether a future microscopic action forces quartic nullity or cubic criticality;
- identifying which counterterms or transformations break that locus;
- comparing candidate face selectors without mistaking compatibility for selection.

Do not use it for:

- claiming an \(E_7\) gauge, spacetime or within-theory response symmetry;
- inferring \(E_8\) ontology from an available exceptional completion;
- selecting the scalar versus Furey-imaginary link axis;
- replacing the missing microscopic source/response action;
- counting a reformulation of inverse matching as a new phenomenological prediction.

## The one decisive next experiment

Derive a microscopic or effective action in which variation with respect to the paired carrier gives

\[
\mathcal T(A,C)=0
\]

or an equivalent invariant equation. Then calculate whether the resulting \(\lambda\) is fixed by Ward normalization, a spectral sum rule or boundary data.

If no independent principle produces that equation, the completed Freudenthal branch should be treated as an elegant classifier and enlargement. If one does, it becomes a mechanism and the scalar \(\lambda\) is the first place a genuinely new constraint could appear.

## Evidence bundle

1. [Paired-face quartic and selector defect](freudenthal_parallel_01_h2r_source_response_quartic.md)
2. [Selector uniqueness and embedding degeneracy](freudenthal_parallel_02_selector_uniqueness_and_embedding_degeneracy.md)
3. [Symplectic pairing and triple critical locus](freudenthal_parallel_03_symplectic_pairing_and_triple_critical_locus.md)
4. [Ward/UV covariance and contact obstruction](freudenthal_parallel_04_ward_uv_covariance_and_contact_obstruction.md)

Each note has an executable certificate. The repository-wide Markdown link audit passes with no broken links.
