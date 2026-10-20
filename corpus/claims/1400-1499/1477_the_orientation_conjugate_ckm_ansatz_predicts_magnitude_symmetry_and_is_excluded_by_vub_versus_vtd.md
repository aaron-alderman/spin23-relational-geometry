# The orientation-conjugate CKM ansatz predicts magnitude symmetry and is excluded by Vub versus Vtd

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact model prediction; empirical exclusion of the direct CKM interpretation

**Depends on:** [the orientation-conjugate Jarlskog construction](1476_orientation_conjugate_triangle_operators_have_nonzero_jarlskog_but_an_isospectral_mass_boundary.md)

**Evidence:** [machine-readable falsifier](../../../evidence/data/spin23-orientation-conjugate-ckm-falsifier.json), [executable verifier](../../../verification/verify/verify_spin23_orientation_conjugate_ckm_falsifier.mjs), and [Particle Data Group 2025 CKM review, Eq. 12.27](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-ckm-matrix.pdf)

## Result

The beautiful orientation-conjugate repair makes a held-out prediction that does not depend on fitting (a,b,c,delta). If

\[
H_+=U\Lambda U^\dagger,
\]

then

\[
H_- = H_+^*
=U^*\Lambda U^T.
\]

Choosing corresponding nondegenerate eigenvalue orderings gives the relative mixing matrix

\[
V=U^\dagger U^*.
\]

It is symmetric:

\[
\boxed{V^T=V,\qquad |V_{ij}|=|V_{ji}|.}
\]

The 2025 Particle Data Group global fit violates this prediction sharply. In particular,

\[
|V_{ub}|=0.003732^{+0.000090}_{-0.000085},
\qquad
|V_{td}|=0.00858^{+0.00019}_{-0.00017}.
\]

Using the larger quoted uncertainty on each entry gives

\[
\frac{|,|V_{td}|-|V_{ub}|,|}
{\sqrt{\sigma_{ub}^2+\sigma_{td}^2}}
\simeq23.06.
\]

Therefore the exact orientation-conjugate triangle pair cannot be the physical up/down CKM construction.

## 1. Symmetry is unavoidable

The transpose identity is algebraic:

\[
(U^\dagger U^*)^T
=(U^*)^T(U^\dagger)^T
=U^\dagger U^*.
\]

Rephasing rows and columns changes phases but not the magnitude relation. Eigenvalue orderings permit row and column permutations. An exhaustive audit of all (6\times6=36) ordering pairs finds no exact symmetrization of the PDG central magnitude matrix; the identity ordering is already the closest.

The dominant failure is

\[
|V_{td}|-|V_{ub}|=0.004848,
\]

far larger than the combined quoted uncertainty. The smaller transpose asymmetries (|V_{us}|-|V_{cd}|) and (|V_{cb}|-|V_{ts}|) do not rescue the model.

## 2. What is falsified

The empirical result falsifies the joint identification

\[
\text{up sector}=H(\delta),
\qquad
\text{down sector}=H(-\delta)
\]

with exact conjugacy and no additional family operator.

It does not falsify:

- the length-three defect middle;
- the (1\oplus A_2) convergence;
- a loop-holonomy source of CP-odd algebra;
- the exact commutator determinant in claim 1476;
- models in which conjugacy is broken by a separately derived noncentral incidence operator.

The algebraic construction survives as a control and boundary point, not as a phenomenological model.

## 3. Why ordinary gauge distinctions cannot repair it

The Standard Model certainly distinguishes up and down sectors. But a generation-universal gauge or Higgs shift acts on family space as a multiple of the identity. Terms of the form

\[
\mu_u I+\beta_uH_+,
\qquad
\mu_d I+\beta_dH_-
\]

change eigenvalues but not eigenvectors. They preserve the symmetric-mixing prediction.

Repair therefore requires a noncentral family operator coupled differently to the two sectors. It must be derived from defect incidence, localization profiles or a higher action. Introducing an arbitrary family spurion would simply put the CKM matrix back in by hand.

## 4. Updated middle

The top-down/bottom-up method has now done exactly what it should:

1. top-down geometry supplied a length-three triangle and orientation;
2. bottom-up flavour demanded two noncommuting sectors;
3. orientation conjugation supplied a minimal middle;
4. fanning downward produced the symmetric-mixing invariant;
5. data rejected that invariant.

The next plausible middle is narrower:

\[
\boxed{
\text{one defect triangle}
+\text{one derived noncentral sector contrast},
}
\]

with fewer free inputs than a generic second Hermitian matrix and one preregistered CKM relation.

## Verdict

\[
\boxed{
\text{direct orientation-conjugate CKM: excluded},\qquad
\text{defect-triangle programme: still open with a derived sector contrast}.}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_orientation_conjugate_ckm_falsifier.mjs
~~~
